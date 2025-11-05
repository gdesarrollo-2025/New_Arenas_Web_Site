// pages/api/properties.js
import fetch from "node-fetch"; // (o usar "undici" si estás en Node 18+)
const AbortController = globalThis.AbortController || (await import("node-fetch")).AbortController;

export default async function handler(req, res) {
  const controller = new AbortController();
  const timeout = 30000; // (por ejemplo, 30 segundos)
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  try {
    const {q, perpage } = req.query;
    const queryParams = new URLSearchParams(req.query);
//console.log(process.env.NEXT_PUBLIC_DOMUS_API_TOKEN);
//console.log(process.env.NEXT_PUBLIC_API_URL);

    // Configurar opciones de fetch con los encabezados necesarios y el signal de aborto
    const options = {
      method: 'GET',
      headers: {
        'Authorization': process.env.NEXT_PUBLIC_DOMUS_API_TOKEN,
        'Inmobiliaria': '1',
        'Perpage': perpage || '12', // Usar el parámetro perpage de la query o 12 por defecto
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
    };

    // URL base de la API de Domus
    const apiUrl = 'https://api.domus.la/3.0/properties';
    
    // Realizar la solicitud a la API de Domus
    //console.log(queryParams.toString());
    
    const response = await fetch(`${apiUrl}?${queryParams.toString()}`, options);
    clearTimeout(timeoutId);
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }
    
    const data = await response.json();
    
    res.status(200).json(data);
  } catch (error) {
    clearTimeout(timeoutId);
    console.error('Error en proxy de API:', error);
    res.status(500).json({ 
      error: 'Error al comunicarse con la API externa',
      message: error.message
    });
  }
}