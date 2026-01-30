export default async function handler(req, res) {
  try {
    // Configurar opciones de fetch con los encabezados necesarios
    const options = {
      method: 'GET',
      headers: {
        'Authorization': process.env.DOMUS_API_TOKEN,
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
        { "code": 1, "name": "Apartamento" },
        { "code": 2, "name": "Casa" },
        { "code": 4, "name": "Local" },
        { "code": 5, "name": "Bodega" },
        { "code": 6, "name": "Oficina" },
        { "code": 7, "name": "Lote" },
        { "code": 8, "name": "Finca" },
        { "code": 9, "name": "Edificio" },
        { "code": 10, "name": "Casalote" },
        { "code": 12, "name": "Casa campestre" },
        { "code": 13, "name": "Casa-local" },
        { "code": 14, "name": "Casa condominio" },
        { "code": 15, "name": "Consultorio" },
        { "code": 20, "name": "Hotel" }
      ]
    });
  }
} 