import fetch from "node-fetch";

const MAX_RETRIES = 3;
const TIMEOUT = 60000; 
const RETRY_DELAY = 1000; 

async function fetchWithRetry(url, options, retries = MAX_RETRIES) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }
    console.log(response)
    return response;
  } catch (error) {
    clearTimeout(timeoutId);

    if (error.name === 'AbortError') {
      console.error('Request timeout:', url);
      if (retries > 0) {
        console.log(`Retrying... (${retries} attempts left)`);
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
        return fetchWithRetry(url, options, retries - 1);
      }
      throw new Error('Request timeout after multiple retries');
    }

    if (retries > 0) {
      console.log(`Retrying after error: ${error.message} (${retries} attempts left)`);
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      return fetchWithRetry(url, options, retries - 1);
    }

    throw error;
  }
}

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    const options = {
      method: 'GET',
      headers: {
        'Authorization': process.env.DOMUS_API_TOKEN,
        'Inmobiliaria': '1',
        'Content-Type': 'application/json',
        'ficha': req.headers.ficha || '0',
      }
    };

    const apiUrl = `https://api.domus.la/3.0/properties/${id}`;
    console.log('Iniciando petición a Domus API:', {
      url: apiUrl,
      id,
      timestamp: new Date().toISOString()
    });

    // Realizar la solicitud a la API de Domus con reintentos
    const response = await fetchWithRetry(apiUrl, options);
    console.log(response)
    const data = await response.json();
    console.log('Respuesta recibida de Domus API:', {
      id,
      status: response.status,
      timestamp: new Date().toISOString()
    });

   
    if (!data || !data.data) {
      console.error('Respuesta de API inválida:', data);
      return res.status(500).json({ 
        error: 'Error en la respuesta de la API',
        message: 'La respuesta no tiene el formato esperado'
      });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error('Error en proxy de API:', {
      error: error.message,
      id,
      timestamp: new Date().toISOString()
    });

    let statusCode = 500;
    let errorMessage = 'Error al comunicarse con la API externa';

    if (error.message.includes('timeout')) {
      statusCode = 504; 
      errorMessage = 'La API externa está tardando demasiado en responder';
    } else if (error.message.includes('404')) {
      statusCode = 404;
      errorMessage = 'Propiedad no encontrada';
    } else if (error.message.includes('401') || error.message.includes('403')) {
      statusCode = 401;
      errorMessage = 'Error de autorización';
    }

    res.status(statusCode).json({ 
      error: errorMessage,
      message: error.message,
      id
    });
  }
} 