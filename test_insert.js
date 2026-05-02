import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nhbhlnwknuegurmxcmhf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5oYmhsbndrbnVlZ3VybXhjbWhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc2MjcxMzgsImV4cCI6MjA5MzIwMzEzOH0.8Uny2b0v0s39qcWlZU9SA1l6OCHcTQMHxWQip-m4GxM';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testInsert() {
    const dummyLead = {
        full_name: 'Test User',
        email: 'test@example.com',
        marketing_challenge: 'Testing Supabase connection'
    };

    const { data, error } = await supabase.from('leads').insert([dummyLead]);

    if (error) {
        console.error('Insert Error:', error);
    } else {
        console.log('Insert Success:', data);
    }
}

testInsert();
