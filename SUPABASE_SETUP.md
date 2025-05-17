# Phillboard Supabase Setup Guide

This guide will walk you through setting up Supabase for the Phillboard application, including all necessary tables, functions, and triggers to support the core functionality of posting, overwriting, pricing escalation, and revenue sharing.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Setting Up Supabase Project](#setting-up-supabase-project)
3. [Database Schema](#database-schema)
4. [Authentication Setup](#authentication-setup)
5. [Storage Setup](#storage-setup)
6. [Functions and Triggers](#functions-and-triggers)
7. [API Access and Security Rules](#api-access-and-security-rules)
8. [Testing the Setup](#testing-the-setup)

## Prerequisites

- A Supabase account (sign up at [supabase.com](https://supabase.com))
- Basic understanding of SQL
- Phillboard application codebase

## Setting Up Supabase Project

1. Log in to your Supabase account
2. Click "New Project"
3. Enter project details:
   - Name: Phillboard
   - Database Password: (create a strong password)
   - Region: (choose the closest to your target users)
4. Click "Create New Project"
5. Wait for your project to be created (this may take a few minutes)

## Database Schema

### Users Table

The users table will extend Supabase's built-in auth.users table with additional fields:

```sql
-- Create a table for public profiles
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  username TEXT UNIQUE,
  display_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  total_earnings DECIMAL(12,2) DEFAULT 0,
  total_spent DECIMAL(12,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Set up Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Allow users to view any profile
CREATE POLICY "Profiles are viewable by everyone" 
  ON public.profiles FOR SELECT 
  USING (true);

-- Allow users to update their own profile
CREATE POLICY "Users can update their own profile" 
  ON public.profiles FOR UPDATE 
  USING (auth.uid() = id);

-- Create a trigger to create a profile when a user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, display_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger the function every time a user is created
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
```

### Phillboards Table

This table will store information about each phillboard placed in AR:

```sql
CREATE TABLE public.phillboards (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  owner_id UUID REFERENCES public.profiles(id) NOT NULL,
  previous_owner_id UUID REFERENCES public.profiles(id),
  content TEXT NOT NULL,
  current_price DECIMAL(12,2) NOT NULL,
  initial_price DECIMAL(12,2) NOT NULL,
  location_lat DOUBLE PRECISION NOT NULL,
  location_lng DOUBLE PRECISION NOT NULL,
  location_alt DOUBLE PRECISION,
  location_name TEXT,
  ar_anchor_id TEXT,
  ar_transform TEXT,
  likes_count INTEGER DEFAULT 0,
  views_count INTEGER DEFAULT 0,
  overwrite_count INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  
  -- Ensure current_price is at least equal to initial_price
  CONSTRAINT price_validation CHECK (current_price >= initial_price)
);

-- Add spatial index for location-based queries
CREATE INDEX phillboards_location_idx ON public.phillboards USING gist (
  ST_SetSRID(ST_MakePoint(location_lng, location_lat), 4326)
);

-- Set up Row Level Security
ALTER TABLE public.phillboards ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Anyone can view active phillboards
CREATE POLICY "Phillboards are viewable by everyone" 
  ON public.phillboards FOR SELECT 
  USING (is_active = true);

-- Only owners can update their phillboards
CREATE POLICY "Users can update their own phillboards" 
  ON public.phillboards FOR UPDATE 
  USING (auth.uid() = owner_id);

-- Anyone can insert a phillboard (overwrite logic handled by function)
CREATE POLICY "Anyone can create phillboards" 
  ON public.phillboards FOR INSERT 
  WITH CHECK (true);
```

### Transactions Table

This table will track all financial transactions related to phillboards:

```sql
CREATE TABLE public.transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  phillboard_id UUID REFERENCES public.phillboards(id) NOT NULL,
  user_id UUID REFERENCES public.profiles(id) NOT NULL,
  recipient_id UUID REFERENCES public.profiles(id),
  transaction_type TEXT NOT NULL CHECK (
    transaction_type IN ('purchase', 'overwrite', 'earnings')
  ),
  amount DECIMAL(12,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'completed' CHECK (
    status IN ('pending', 'completed', 'failed')
  ),
  payment_method TEXT,
  payment_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Set up Row Level Security
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Users can view their own transactions
CREATE POLICY "Users can view their own transactions" 
  ON public.transactions FOR SELECT 
  USING (auth.uid() = user_id OR auth.uid() = recipient_id);

-- Only system can insert transactions
CREATE POLICY "Only system can create transactions" 
  ON public.transactions FOR INSERT 
  USING (auth.uid() IS NOT NULL);
```

### Overwrite History Table

This table will track the history of phillboard overwrites:

```sql
CREATE TABLE public.overwrite_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  phillboard_id UUID REFERENCES public.phillboards(id) NOT NULL,
  previous_owner_id UUID REFERENCES public.profiles(id) NOT NULL,
  new_owner_id UUID REFERENCES public.profiles(id) NOT NULL,
  previous_content TEXT NOT NULL,
  new_content TEXT NOT NULL,
  previous_price DECIMAL(12,2) NOT NULL,
  new_price DECIMAL(12,2) NOT NULL,
  revenue_share_amount DECIMAL(12,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Set up Row Level Security
ALTER TABLE public.overwrite_history ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Anyone can view overwrite history
CREATE POLICY "Overwrite history is viewable by everyone" 
  ON public.overwrite_history FOR SELECT 
  USING (true);

-- Only system can insert overwrite history
CREATE POLICY "Only system can create overwrite history" 
  ON public.overwrite_history FOR INSERT 
  USING (auth.uid() IS NOT NULL);
```

### Likes Table

This table will track user likes on phillboards:

```sql
CREATE TABLE public.likes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  phillboard_id UUID REFERENCES public.phillboards(id) NOT NULL,
  user_id UUID REFERENCES public.profiles(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  
  -- Ensure a user can only like a phillboard once
  CONSTRAINT unique_likes UNIQUE (phillboard_id, user_id)
);

-- Set up Row Level Security
ALTER TABLE public.likes ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Anyone can view likes
CREATE POLICY "Likes are viewable by everyone" 
  ON public.likes FOR SELECT 
  USING (true);

-- Users can add their own likes
CREATE POLICY "Users can add their own likes" 
  ON public.likes FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own likes
CREATE POLICY "Users can delete their own likes" 
  ON public.likes FOR DELETE 
  USING (auth.uid() = user_id);
```

### Views Table

This table will track phillboard views:

```sql
CREATE TABLE public.views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  phillboard_id UUID REFERENCES public.phillboards(id) NOT NULL,
  user_id UUID REFERENCES public.profiles(id),
  ip_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Set up Row Level Security
ALTER TABLE public.views ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Only aggregated view data is accessible
CREATE POLICY "Views are insertable by anyone" 
  ON public.views FOR INSERT 
  WITH CHECK (true);
```

## Functions and Triggers

### Overwrite Function

This function handles the logic for overwriting a phillboard, including price escalation and revenue sharing:

```sql
CREATE OR REPLACE FUNCTION public.overwrite_phillboard(
  phillboard_id UUID,
  new_content TEXT,
  payment_id TEXT DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  target_phillboard RECORD;
  new_phillboard_id UUID;
  revenue_share DECIMAL(12,2);
BEGIN
  -- Get the target phillboard
  SELECT * INTO target_phillboard FROM public.phillboards
  WHERE id = phillboard_id AND is_active = true;
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Phillboard not found or inactive';
  END IF;
  
  -- Calculate new price (double the current price)
  -- Minimum price is $1
  DECLARE new_price DECIMAL(12,2) := GREATEST(target_phillboard.current_price * 2, 1.0);
  
  -- Calculate revenue share (50% to previous owner)
  revenue_share := target_phillboard.current_price * 0.5;
  
  -- Create transaction record for the purchase
  INSERT INTO public.transactions (
    phillboard_id,
    user_id,
    recipient_id,
    transaction_type,
    amount,
    payment_method,
    payment_id
  ) VALUES (
    phillboard_id,
    auth.uid(),
    target_phillboard.owner_id,
    'overwrite',
    new_price,
    'stripe',
    payment_id
  );
  
  -- Create transaction record for the revenue share
  INSERT INTO public.transactions (
    phillboard_id,
    user_id,
    recipient_id,
    transaction_type,
    amount,
    status
  ) VALUES (
    phillboard_id,
    target_phillboard.owner_id,
    target_phillboard.owner_id,
    'earnings',
    revenue_share,
    'completed'
  );
  
  -- Update user earnings
  UPDATE public.profiles
  SET total_earnings = total_earnings + revenue_share
  WHERE id = target_phillboard.owner_id;
  
  -- Update user spending
  UPDATE public.profiles
  SET total_spent = total_spent + new_price
  WHERE id = auth.uid();
  
  -- Create overwrite history record
  INSERT INTO public.overwrite_history (
    phillboard_id,
    previous_owner_id,
    new_owner_id,
    previous_content,
    new_content,
    previous_price,
    new_price,
    revenue_share_amount
  ) VALUES (
    phillboard_id,
    target_phillboard.owner_id,
    auth.uid(),
    target_phillboard.content,
    new_content,
    target_phillboard.current_price,
    new_price,
    revenue_share
  );
  
  -- Update the phillboard with new owner and content
  UPDATE public.phillboards
  SET 
    owner_id = auth.uid(),
    previous_owner_id = target_phillboard.owner_id,
    content = new_content,
    current_price = new_price,
    overwrite_count = overwrite_count + 1,
    updated_at = now()
  WHERE id = phillboard_id
  RETURNING id INTO new_phillboard_id;
  
  RETURN new_phillboard_id;
END;
$$;
```

### Like Function and Trigger

```sql
-- Function to handle likes and update the likes_count
CREATE OR REPLACE FUNCTION public.handle_phillboard_like()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    -- Increment likes_count
    UPDATE public.phillboards
    SET likes_count = likes_count + 1
    WHERE id = NEW.phillboard_id;
  ELSIF TG_OP = 'DELETE' THEN
    -- Decrement likes_count
    UPDATE public.phillboards
    SET likes_count = likes_count - 1
    WHERE id = OLD.phillboard_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for likes
CREATE TRIGGER on_phillboard_like
  AFTER INSERT OR DELETE ON public.likes
  FOR EACH ROW EXECUTE PROCEDURE public.handle_phillboard_like();
```

### View Function and Trigger

```sql
-- Function to handle views and update the views_count
CREATE OR REPLACE FUNCTION public.handle_phillboard_view()
RETURNS TRIGGER AS $$
BEGIN
  -- Increment views_count
  UPDATE public.phillboards
  SET views_count = views_count + 1
  WHERE id = NEW.phillboard_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for views
CREATE TRIGGER on_phillboard_view
  AFTER INSERT ON public.views
  FOR EACH ROW EXECUTE PROCEDURE public.handle_phillboard_view();
```

### Nearby Phillboards Function

```sql
-- Function to find phillboards near a location
CREATE OR REPLACE FUNCTION public.find_nearby_phillboards(
  lat DOUBLE PRECISION,
  lng DOUBLE PRECISION,
  radius_meters INTEGER DEFAULT 100
)
RETURNS SETOF public.phillboards
LANGUAGE sql
STABLE
AS $$
  SELECT *
  FROM public.phillboards
  WHERE ST_DWithin(
    ST_SetSRID(ST_MakePoint(location_lng, location_lat), 4326),
    ST_SetSRID(ST_MakePoint(lng, lat), 4326),
    radius_meters / 111111.0  -- Convert meters to degrees (approximate)
  )
  AND is_active = true
  ORDER BY 
    ST_Distance(
      ST_SetSRID(ST_MakePoint(location_lng, location_lat), 4326),
      ST_SetSRID(ST_MakePoint(lng, lat), 4326)
    )
  LIMIT 50;
$$;
```

## Authentication Setup

1. In the Supabase dashboard, go to "Authentication" > "Settings"
2. Configure providers:
   - Email: Enable "Enable Email Signup" and "Enable Email Confirmations"
   - Social providers: Add Google, Apple, and other providers as needed

## Storage Setup

Create buckets for storing AR assets:

```sql
-- Create a bucket for phillboard assets
INSERT INTO storage.buckets (id, name, public)
VALUES ('phillboard-assets', 'Phillboard Assets', true);

-- Create a bucket for user avatars
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'User Avatars', true);

-- Set up security policies for phillboard assets
CREATE POLICY "Phillboard assets are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'phillboard-assets');

CREATE POLICY "Users can upload phillboard assets"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'phillboard-assets' AND
  auth.uid() IS NOT NULL
);

CREATE POLICY "Users can update their own phillboard assets"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'phillboard-assets' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Set up security policies for avatars
CREATE POLICY "Avatars are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload their own avatars"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'avatars' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can update their own avatars"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'avatars' AND
  auth.uid()::text = (storage.foldername(name))[1]
);
```

## API Access and Security Rules

### REST API

Enable the following tables for REST API access:

1. In the Supabase dashboard, go to "API" > "Tables and Views"
2. For each table, enable the appropriate operations:
   - profiles: SELECT, UPDATE
   - phillboards: SELECT, INSERT, UPDATE
   - likes: SELECT, INSERT, DELETE
   - views: INSERT
   - overwrite_history: SELECT

### Real-time Subscriptions

Enable real-time for the following tables:

1. In the Supabase dashboard, go to "Database" > "Replication"
2. Enable the following tables for real-time:
   - phillboards
   - overwrite_history
   - likes

## Testing the Setup

To test your setup, you can use the Supabase SQL Editor to run the following queries:

### Create a Test User

```sql
-- This will be handled by the auth system, but you can manually insert a profile
INSERT INTO public.profiles (id, username, display_name)
VALUES 
  ('00000000-0000-0000-0000-000000000001', 'testuser1', 'Test User 1'),
  ('00000000-0000-0000-0000-000000000002', 'testuser2', 'Test User 2');
```

### Create a Test Phillboard

```sql
INSERT INTO public.phillboards (
  owner_id,
  content,
  current_price,
  initial_price,
  location_lat,
  location_lng,
  location_name
)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'This is a test phillboard!',
  1.00,
  1.00,
  40.7128,  -- New York City latitude
  -74.0060, -- New York City longitude
  'New York City'
);
```

### Test Overwrite Function

```sql
-- Set the auth.uid() for testing (you would do this via the client in production)
SET LOCAL role = 'authenticated';
SET LOCAL "request.jwt.claim.sub" = '00000000-0000-0000-0000-000000000002';

-- Call the overwrite function
SELECT public.overwrite_phillboard(
  (SELECT id FROM public.phillboards LIMIT 1),
  'This phillboard has been overwritten!',
  'test_payment_id'
);
```

### Test Nearby Phillboards Function

```sql
-- Find phillboards near a location
SELECT * FROM public.find_nearby_phillboards(
  40.7128,  -- New York City latitude
  -74.0060, -- New York City longitude
  1000      -- 1km radius
);
```

## Connecting to Your App

In your React Native application, you'll need to initialize the Supabase client:

```javascript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';

export const supabase = createClient(supabaseUrl, supabaseKey);
```

Replace `YOUR_SUPABASE_URL` and `YOUR_SUPABASE_ANON_KEY` with the values from your Supabase project dashboard.

## Conclusion

Your Supabase backend is now set up to support the Phillboard application. This setup includes:

- User authentication and profiles
- Phillboard creation and overwriting with price escalation
- Revenue sharing between users
- Likes and views tracking
- Spatial queries for finding nearby phillboards
- Real-time updates for interactive features

As you develop your application, you may need to make adjustments to the schema and functions to better suit your specific requirements. 