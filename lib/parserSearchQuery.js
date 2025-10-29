async function getNeighborhoods() {
  try {
    const response = await fetch("https://api.domus.la/3.0/search/neighborhoods", {
      method: "GET",
      headers: {
        'authorization': "APP_USR_48e424da7415e4fce486a3ddd4cc1283",
        'inmobiliaria': "1",
        "Content-Type": "application/json"
      },
    });

    const data = await response.json();
    console.log("Datos recibidos:", data);
    return data;
  } catch (err) {
    console.error("Error:", err);
  }
}

async function getCities(){
  
}
async function parseSearchQuery(input) {
  const text = input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, ""); // elimina tildes

  const result = {
    city: null,
    type: null,
    biz: null,
    rooms: null,
    baths: null,
    price_min: null,
    price_max: null,
  };

  // 🔹 Listas base (puedes ampliarlas con tus datos reales)
  const cities = ["barranquilla", "cartagena", "soledad"];

  const propertyTypes = [
    "apartamento",
    "casa",
    "local",
    "bodega",
    "oficina",
    "lote",
    "finca",
    "edificio",
    "casalote",
    "condominio",
    "consultorio",
    "hotel"
  ];

  const bizTypes = ["arriendo", "venta", "alquiler", "arrendar", "comprar"];

  // Detectar ciudad
  for (const city of cities) {
    if (text.includes(city)) {
      result.city = city;
      break;
    }
  }

  for (const city of cities) {
    if (text.includes(city)) {
      result.city = city;
      break;
    }
  }

  // Detectar tipo de inmueble
  for (const type of propertyTypes) {
    if (text.includes(type)) {
      result.type = type;
      break;
    }
  }

  // Detectar tipo de negocio
  for (const biz of bizTypes) {
    if (text.includes(biz)) {
      // Normalizamos "alquiler" o "arrendar" como "arriendo"
      result.biz = biz === "alquiler" || biz === "arrendar" ? "arriendo" : biz;
      break;
    }
  }

  // Detectar número de habitaciones
  const roomMatch = text.match(/(\d+)\s*(habitaciones|cuartos|hab|alcobas)/);
  if (roomMatch) result.rooms = parseInt(roomMatch[1]);

  // Detectar número de baños
  const bathMatch = text.match(/(\d+)\s*(baños|bano|baño)/);
  if (bathMatch) result.baths = parseInt(bathMatch[1]);

  // Detectar precios (min y max)
  // Ejemplos: "entre 300 y 500 millones", "máximo 600 millones", "desde 200 millones"
  const priceRange = text.match(/entre\s+(\d+)\s*(?:y|-)\s*(\d+)\s*(millones|m)/);
  const priceMax = text.match(/(maximo|max|hasta)\s+(\d+)\s*(millones|m)/);
  const priceMin = text.match(/(desde|minimo|min)\s+(\d+)\s*(millones|m)/);

  if (priceRange) {
    result.price_min = parseInt(priceRange[1]) * 1_000_000;
    result.price_max = parseInt(priceRange[2]) * 1_000_000;
  } else {
    if (priceMin) result.price_min = parseInt(priceMin[2]) * 1_000_000;
    if (priceMax) result.price_max = parseInt(priceMax[2]) * 1_000_000;
  }

  return result;
}
