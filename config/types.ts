import { SupabaseClient } from '@supabase/supabase-js';

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string;
          display_name: string;
          avatar_url?: string;
          created_at: string;
          total_earnings: number;
          total_spent: number;
        };
      };
      phillboards: {
        Row: {
          id: string;
          content: string;
          owner_id: string;
          current_price: number;
          location_lat: number;
          location_lng: number;
          location_name: string;
          created_at: string;
          overwrite_count: number;
        };
      };
      transactions: {
        Row: {
          id: string;
          user_id: string;
          phillboard_id: string;
          transaction_type: 'purchase' | 'overwrite' | 'earnings';
          amount: number;
          created_at: string;
        };
      };
    };
  };
};

export type SupabaseClientType = SupabaseClient<Database>; 