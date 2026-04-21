import type { VercelRequest, VercelResponse } from '@vercel/node';

const PESAPAL_BASE = 'https://pay.pesapal.com/v3';

async function getToken(): Promise<string> {
  const res = await fetch(`${PESAPAL_BASE}/api/Auth/RequestToken`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      consumer_key: process.env.PESAPAL_CONSUMER_KEY,
      consumer_secret: process.env.PESAPAL_CONSUMER_SECRET,
    }),
  });
  const data = await res.json();
  if (!data.token) throw new Error('PesaPal auth failed: ' + JSON.stringify(data));
  return data.token;
}

async function getIpnId(token: string, origin: string): Promise<string> {
  // Try to list existing IPNs first
  try {
    const listRes = await fetch(`${PESAPAL_BASE}/api/URLSetup/GetIpnList`, {
      headers: { Accept: 'application/json', Authorization: `Bearer ${token}` },
    });
    if (listRes.ok) {
      const list = await listRes.json();
      if (Array.isArray(list) && list.length > 0) return list[0].ipn_id;
    }
  } catch (_) { /* fall through */ }

  // Register fresh IPN
  const res = await fetch(`${PESAPAL_BASE}/api/URLSetup/RegisterIPN`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ url: `${origin}/api/pesapal-ipn`, ipn_notification_type: 'POST' }),
  });
  const data = await res.json();
  if (!data.ipn_id) throw new Error('IPN registration failed: ' + JSON.stringify(data));
  return data.ipn_id;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { amount, email, phone, firstName, lastName, description } = req.body ?? {};
    if (!amount || Number(amount) < 1) return res.status(400).json({ error: 'Invalid amount' });

    const origin =
      (req.headers.origin as string) ||
      'https://' + (process.env.VERCEL_URL ?? 'fundme-lake.vercel.app');

    const token = await getToken();
    const ipnId = await getIpnId(token, origin);
    const orderId = `FMW-${Date.now()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;

    const orderRes = await fetch(`${PESAPAL_BASE}/api/Transactions/SubmitOrderRequest`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id: orderId,
        currency: 'MWK',
        amount: Number(amount),
        description: description || 'FundMe Malawi Donation',
        callback_url: `${origin}/donate?payment=complete&ref=${orderId}`,
        notification_id: ipnId,
        billing_address: {
          email_address: email || 'donor@fundmemalawi.com',
          phone_number: phone || '',
          country_code: 'MW',
          first_name: firstName || 'Donor',
          last_name: lastName || 'Anonymous',
          line_1: 'Lilongwe',
          city: 'Lilongwe',
          state: 'Lilongwe',
          postal_code: '265',
          zip_code: '265',
        },
      }),
    });

    const orderData = await orderRes.json();
    if (!orderData.redirect_url) {
      console.error('PesaPal order error:', orderData);
      return res.status(400).json({ error: orderData?.error?.message || 'Failed to create order', raw: orderData });
    }

    return res.status(200).json({ redirectUrl: orderData.redirect_url, orderId });
  } catch (err: any) {
    console.error('PesaPal handler error:', err);
    return res.status(500).json({ error: err.message });
  }
}
