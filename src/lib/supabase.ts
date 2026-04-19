import { createClient } from '@supabase/supabase-js';

// These would normally be stored in .env or .env.local
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Campaign {
  id: string;
  category: string;
  title: string;
  student_name: string;
  location: string;
  progress: number;
  color: string;
  goal_amount: number;
  raised_amount: number;
}

// Fetch all active campaigns
export const fetchCampaigns = async () => {
  const { data, error } = await supabase
    .from('campaigns')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error("Error fetching campaigns:", error);
    return [];
  }
  return data;
};

// Record a new donation
export const recordDonation = async (campaignId: string, amount: number, paymentMethod: string, donorPhone?: string) => {
  const { data, error } = await supabase
    .from('donations')
    .insert([
      { campaign_id: campaignId, amount, payment_method: paymentMethod, donor_phone: donorPhone }
    ]);
    
  if (error) {
    console.error("Error recording donation:", error);
    throw error;
  }
  return data;
};
