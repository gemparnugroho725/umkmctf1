const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://zjetdcpwesqnvxjyplch.supabase.co';
const supabaseAnonKey = 'sb_publishable_YYJg7aSbhsx_8wpfd6m9xg_DCNrvBWs';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkData() {
    const { data, error } = await supabase.from('profiles').select('*');
    if (error) {
        console.error('Error fetching profiles:', error);
    } else {
        console.log('--- DATA PROFILES DI SUPABASE ---');
        console.table(data);
        console.log(`Total: ${data.length} users.`);
    }
}

checkData();
