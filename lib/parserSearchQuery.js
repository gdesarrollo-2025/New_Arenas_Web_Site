const slugify = (s) =>
    String(s || '')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^\w\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-');

function normalizeString(String) {
    return String
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/,/g, "");

}

export async function phraseToUrl(input) {
    // 🔹 Normalizar texto (quita tildes, comas, etc.)
    let text = normalizeString(input)
    const result = {};
    let url = "/properties";

    // ========================
    // 📦 Datos base
    // ========================

    const [citiesData, neighborhoodsData, propertiesData] = await Promise.all([
        fetch("/api/domus-cities").then((r) => r.json()),
        fetch("/api/domus-neighborhoods").then((r) => r.json()),
        fetch("/api/domus-types").then((r) => r.json()),
    ]);

    const cities = citiesData.data.map(c => ({
        code: c.code,
        name: c.name.toLowerCase().trim(),
    }));

    const neighborhoods = neighborhoodsData.data.map(n => ({
        code: n.code,
        name: n.name.toLowerCase().trim(),
        city_code: n.city_code,
        city_name: n.city_name.toLowerCase(),
    }));

    const propertyTypes = propertiesData.data.map(t => ({
        code: t.code,
        name: t.name.toLowerCase().trim(),
    }));

    const bizVenta = ["venta", "comprar"];
    const bizArriendo = ["arriendo", "alquiler", "arrendar"];

    // ========================
    // 1️⃣ Detectar tipo de propiedad
    // ========================

    for (const type of propertyTypes.sort((a, b) => b.name.length - a.name.length)) {
        const regex = new RegExp(`\\b${type.name.toLowerCase()}\\b`, "i");
        if (regex.test(text)) {
            url += `/${slugify(type.name)}`;
            text = text.replace(regex, "");
            break;
        }
    }

    // ========================
    // 2️⃣ Tipo de negocio
    // ========================

    let foundVenta = false;
    let foundArriendo = false;

    for (const biz of [...bizVenta, ...bizArriendo]) {
        const regex = new RegExp(`\\b${biz}\\b`, "i");
        if (regex.test(text)) {
            if (bizVenta.includes(biz)) foundVenta = true;
            if (bizArriendo.includes(biz)) foundArriendo = true;
            text = text.replace(regex, "");
        }
    }

    if (foundVenta && foundArriendo) {
        url += `/${slugify("venta-arriendo")}`;
    } else if (foundVenta) {
        url += `/${slugify("venta")}`;
    } else if (foundArriendo) {
        url += `/${slugify("arriendo")}`;
    }

    // ========================
    // 3️⃣ Ciudad (antes que barrio)
    // ========================
    for (const c of cities) {
        const regex = new RegExp(`\\b${c.name}\\b`, "i");
        if (regex.test(text)) {
            result["location"] = c.code;
            url += `/${slugify(c.name)}`;
            text = text.replace(regex, "");
            break;
        }
    }

    // ========================
    // 4️⃣ Barrio (con fallback de ciudad)
    // ========================
    for (const n of neighborhoods) {
        const regex = new RegExp(`\\b${n.name}\\b`, "i");
        if (regex.test(text)) {
            if (!result.location) url += `/${slugify(n.city_name)}`;
            url += `/${slugify(n.name)}`;
            text = text.replace(regex, "");
            break;
        }
    }

    // ========================
    // 5️⃣ Datos numéricos (habitaciones, baños, precios)
    // ========================

    const roomMatch = text.match(/(?:de|con)?\s*(\d+)\s*(habitaciones?|alcobas?|dormitorios?|recámaras?|piezas?|cuartos?|aposentos?)/i);

    if (roomMatch) { result["bedrooms"] = parseInt(roomMatch[1]); text = text.replace(roomMatch[0], ""); };

    const bathMatch = text.match(/(?:de|con)?\s*(\d+)\s*(baños?|banos?|sanitarios?|tocadores?)/i);
    if (bathMatch) { result["bathrooms"] = parseInt(bathMatch[1]); text = text.replace(bathMatch[0], ""); };

    const priceRange = text.match(/entre\s+(\d+)\s*(?:y|-)\s*(\d+)\s*(millones|m)/);
    const priceMax = text.match(/(maximo|max|hasta)\s+(\d+)\s*(millones|m)/);
    const priceMin = text.match(/(desde|minimo|min)\s+(\d+)\s*(millones|m)/);

    if (priceRange) {
        result["minPrice"] = parseInt(priceRange[1]) * 1_000_000;
        result["maxPrice"] = parseInt(priceRange[2]) * 1_000_000;
    } else {
        if (priceMin) result["minPrice"] = parseInt(priceMin[2]) * 1_000_000;
        if (priceMax) result["maxPrice"] = parseInt(priceMax[2]) * 1_000_000;
    }

    result['q'] = text.trim();

    //add the rest of params as queryParams
    const query = new URLSearchParams()
    if (result.bedrooms) query.set('bedrooms', result.bedrooms);
    if (result.bathrooms) query.set('bathrooms', result.bathrooms);
    if (result.minPrice) query.set('minPrice', result.minPrice);
    if (result.maxPrice) query.set('maxPrice', result.maxPrice);
    if (result.q) query.set('q', result.q);

    return url + "?" + query.toString();
}

export async function urlToQuery(slug) {
    // 🔹 Normalizar texto (quita tildes, comas, etc.)

    let text = slug.join("/")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/-/g, " ")
        .replace(/\//g, " ")
        .replace(/,/g, "")
        .replace("properties", "");

    const result = {
        location: "",
        neighborhood: "",
        propertyType: "",
        bizType: "",
    };

    // ========================
    // 📦 Datos base
    // ========================
    
    const [citiesData, neighborhoodsData, propertiesData] = await Promise.all([
        fetch("/api/domus-cities").then((r) => r.json()),
        fetch("/api/domus-neighborhoods").then((r) => r.json()),
        fetch("/api/domus-types").then((r) => r.json()),
    ]);
    
    const cities = citiesData.data.map(c => ({
        code: c.code,
        name: c.name.toLowerCase().trim(),
    }));

    const neighborhoods = neighborhoodsData.data.map(n => ({
        code: n.code,
        name: n.name.toLowerCase().trim(),
        city_code: n.city_code,
        city_name: n.city_name.toLowerCase(),
    }));

    const propertyTypes = propertiesData.data.map(t => ({
        code: t.code,
        name: t.name.toLowerCase().trim(),
    }));

    const bizVenta = ["venta", "comprar"];
    const bizArriendo = ["arriendo", "alquiler", "arrendar"];

    // ========================
    // 1️⃣ Detectar tipo de negocio (con código)
    // ========================
    let foundVenta = false;
    let foundArriendo = false;

    for (const biz of [...bizVenta, ...bizArriendo]) {
        const regex = new RegExp(`\\b${biz}\\b`, "i");
        if (regex.test(text)) {
            if (bizVenta.includes(biz)) foundVenta = true;
            if (bizArriendo.includes(biz)) foundArriendo = true;
            text = text.replace(regex, "");
        }
    }

    if (foundVenta && foundArriendo) {
        result.bizType = 3;
    } else if (foundVenta) {
        result.bizType = 2;
    } else if (foundArriendo) {
        result.bizType = 1;
    }

    // ========================
    // 2️⃣ Tipo de propiedad
    // ========================
    for (const type of propertyTypes.sort((a, b) => b.name.length - a.name.length)) {
        const regex = new RegExp(`\\b${type.name.toLowerCase()}\\b`, "i");
        if (regex.test(text)) {
            result.propertyType = type.code;
            text = text.replace(regex, "");
            break;
        }
    }

    // ========================
    // 3️⃣ Ciudad (antes que barrio)
    // ========================
    for (const c of cities) {
        const regex = new RegExp(`\\b${c.name}\\b`, "i");
        if (regex.test(text)) {
            result.location = c.code;
            text = text.replace(regex, "");
            break;
        }
    }

    // ========================
    // 4️⃣ Barrio (con fallback de ciudad)
    // ========================
    for (const n of neighborhoods) {
        const regex = new RegExp(`\\b${n.name}\\b`, "i");
        if (regex.test(text)) {
            result.neighborhood = n.code;
            if (!result.location) result.location = n.city_code;
            text = text.replace(regex, "");
            break;
        }
    }
    return result;
}

export default {
    phraseToUrl,
    urlToQuery
};