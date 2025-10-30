export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const CODA_API_KEY = process.env.CODA_API_KEY;
    const DOC_ID = process.env.CODA_DOC_ID;
    const TABLE_ID = process.env.CODA_TABLE_ID;

    if (!CODA_API_KEY || !DOC_ID || !TABLE_ID) {
      return res.status(500).json({ error: 'Missing environment variables' });
    }

    const response = await fetch(
      `https://coda.io/apis/v1/docs/${DOC_ID}/tables/${TABLE_ID}/rows`,
      {
        headers: {
          'Authorization': `Bearer ${CODA_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Coda API error:', response.status, errorText);
      return res.status(response.status).json({ 
        error: `Coda API error: ${response.status}` 
      });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
