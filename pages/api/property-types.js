export default async function handler(req, res) {
  try {
    // Configurar opciones de fetch con los encabezados necesarios
    const options = {
      method: 'GET',
      headers: {
        'Authorization': process.env.NEXT_PUBLIC_DOMUS_API_TOKEN,
        'Inmobiliaria': '1',
        'Content-Type': 'application/json',
      },
    };

    // URL para obtener tipos de inmueble disponibles
    const apiUrl = 'https://api.domus.la/3.0/search/types';
    
    // Realizar la solicitud a la API de Domus
    const response = await fetch(apiUrl, options);
    
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }
    
    const data = await response.json();
    
    res.status(200).json(data);
  } catch (error) {
    console.error('Error obteniendo tipos de inmuebles:', error);
    
    // Si falla la API, devolver tipos estáticos como fallback
    res.status(200).json({
      data: [
        { code: 1, name: "APARTAMENTO" },
        { code: 2, name: "CASA" },
        { code: 3, name: "LOCAL" },
        { code: 4, name: "OFICINA" },
        { code: 5, name: "BODEGA" },
        { code: 6, name: "LOTE" },
        { code: 7, name: "FINCA" },
        { code: 8, name: "EDIFICIO" },
        { code: 9, name: "CONSULTORIO" },
        { code: 10, name: "PARQUEADERO" },
      ]
    });
  }
} 