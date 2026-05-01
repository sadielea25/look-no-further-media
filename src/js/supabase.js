import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nhbhlnwknuegurmxcmhf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5oYmhsbndrbnVlZ3VybXhjbWhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc2MjcxMzgsImV4cCI6MjA5MzIwMzEzOH0.8Uny2b0v0s39qcWlZU9SA1l6OCHcTQMHxWQip-m4GxM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
