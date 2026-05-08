import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zjetdcpwesqnvxjyplch.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpqZXRkY3B3ZXNxbnZ4anlwbGNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc0MTU2MzAsImV4cCI6MjA5Mjk5MTYzMH0.U4H7DGpIOq3AJH5gMNNVjKLfn7UXs2f3OwyaXHhSxz0';

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
    const { data, error } = await supabase.from('profiles').select('*');
    if (error) {
        console.error('Error fetching profiles:', error);
        return;
    }
    console.log('--- ALL PROFILES IN DB ---');
    data.forEach(profile => {
        console.log(`ID: ${profile.id} | Username: ${profile.username} | Role: ${profile.role}`);
    });
}

run();
