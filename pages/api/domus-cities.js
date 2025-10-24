// pages/api/domus-cities.js
export default async function handler(req, res) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/search/cities`, {
      method: 'GET',
      headers: {
        'Authorization': process.env.NEXT_PUBLIC_DOMUS_API_TOKEN,
        'Inmobiliaria': '1',
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      return res.status(response.status).json({ error: 'Error fetching cities' });
    }
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
}


  