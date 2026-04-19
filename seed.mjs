import { createClient } from '@supabase/supabase-js';

// Use the env variables if available or hardcode for this script
const supabaseUrl = 'https://bvlnzesxuhoapngxoixf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2bG56ZXN4dWhvYXBuZ3hvaXhmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjYyODE0NywiZXhwIjoyMDkyMjA0MTQ3fQ.MNeNKlQ6SzcqP5GEgr18FlO7RCWfCEeXwtulIADleVY';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkAndSeed() {
  const { data, error } = await supabase.from('campaigns').select('id').limit(1);
  
  if (error) {
    console.error("Error querying campaigns:", error.message);
    process.exit(1);
  }
  
  console.log("Query successful, table exists.");
  
  if (data.length === 0) {
    console.log("Seeding campaigns...");
    const { error: seedError } = await supabase.from('campaigns').insert([
      { category: '4 Education', title: 'Final Year UNIMA Fees', student_name: 'Chikondi M.', location: 'Zomba', color: '#c5192d', goal_amount: 500000, raised_amount: 350000 },
      { category: '9 Innovation', title: 'Laptop for CompSci Degree', student_name: 'Dalitso K.', location: 'Blantyre', color: '#fd6925', goal_amount: 800000, raised_amount: 320000 },
      { category: '1 Poverty', title: 'Emergency Housing Rent', student_name: 'Yamikani D.', location: 'Lilongwe', color: '#e5243b', goal_amount: 250000, raised_amount: 220000 }
    ]);
    
    if (seedError) {
      console.error("Error seeding:", seedError.message);
    } else {
      console.log("Seeding successful.");
    }
  } else {
    console.log("Data already exists. Skipping seed.");
  }
}

checkAndSeed();
