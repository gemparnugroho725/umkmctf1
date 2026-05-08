import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zjetdcpwesqnvxjyplch.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpqZXRkY3B3ZXNxbnZ4anlwbGNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc0MTU2MzAsImV4cCI6MjA5Mjk5MTYzMH0.U4H7DGpIOq3AJH5gMNNVjKLfn7UXs2f3OwyaXHhSxz0';

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
    console.log('Mengubah status moderasi semua produk menjadi "approved"...');
    // We can update using the service_role key or try update on public since we have the anon key.
    // Wait! Does RLS allow updating items? If not, we might need to bypass it or run a direct update.
    // Let's try updating all items where moderation_status is null or 'pending' or 'rejected'.
    const { data, error } = await supabase
        .from('items')
        .update({ moderation_status: 'approved' })
        .neq('id', '00000000-0000-0000-0000-000000000000') // Dummy condition to target all
        .select('id, commodity, moderation_status');

    if (error) {
        console.error('Error updating items:', error);
        return;
    }
    console.log('Berhasil mengupdate produk:', data);
}

run();
