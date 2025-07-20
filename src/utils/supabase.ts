import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

// Environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Check if Supabase is properly configured
 */
export const isSupabaseConfigured = (): boolean => {
  const configured = !!(supabaseUrl && supabaseAnonKey);
  console.log('Supabase configuration check:', {
    configured,
    hasUrl: !!supabaseUrl,
    hasKey: !!supabaseAnonKey,
    url: supabaseUrl,
    keyLength: supabaseAnonKey?.length
  });
  return configured;
};

/**
 * Create Supabase client with validation
 */
const createSupabaseClient = () => {
  if (!isSupabaseConfigured()) {
    // Return a mock client for development that simulates connection
    console.warn('Supabase environment variables not found. Using mock client for development.');
    return createClient<Database>(
      'https://mock.supabase.co',
      'mock-key',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
        global: {
          headers: {
            'X-Client-Info': 'supabase-js/2.x.x',
          },
        },
      }
    );
  }

  return createClient<Database>(supabaseUrl!, supabaseAnonKey!, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
    },
  });
};

// Export the configured client
export const supabase = createSupabaseClient();

/**
 * Get Supabase client instance
 */
export const getSupabaseClient = () => supabase;

/**
 * Create a custom Supabase client with specific configuration
 */
export const createCustomSupabaseClient = (
  url: string,
  key: string,
  options?: Parameters<typeof createClient>[2]
) => {
  return createClient<Database>(url, key, options);
};

/**
 * Check if the current environment is development
 */
export const isDevelopment = (): boolean => {
  return process.env.NODE_ENV === 'development';
};

/**
 * Get configuration status
 */
export const getConfigurationStatus = () => {
  return {
    isConfigured: isSupabaseConfigured(),
    hasUrl: !!supabaseUrl,
    hasKey: !!supabaseAnonKey,
    isDevelopment: isDevelopment(),
  };
}; 