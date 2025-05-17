import { createClient } from '@supabase/supabase-js';
import { Database, SupabaseClientType } from './types';

// Supabase configuration
// Note: In a production environment, you should use environment variables for these values
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://your-supabase-url.supabase.co';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key';

// Create a single supabase client for interacting with your database
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey) as SupabaseClientType; 