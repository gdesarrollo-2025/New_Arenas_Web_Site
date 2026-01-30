import axios from 'axios';
import { ApiError } from 'next/dist/server/api-utils';

const BASE_URL = 'http://localhost:3000/api';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
console.log(BASE_URL);

export async function getProperties(filters = {}, page = 1) {
  try {
    const params = new URLSearchParams();

    params.append('page', page);

    if (filters.query) params.append('keyword', filters.query);
    if (filters.location) params.append('city', filters.location);
    if (filters.neighborhood_code) params.append('neighborhood_code', filters.neighborhood_code);

    if (filters.propertyType && filters.propertyType.length > 0) {
      params.append('type', filters.propertyType.join(','));
    }

    if (filters.bizType) params.append('biz', filters.bizType);


    if (filters.bizType === '1') { // Venta
      if (filters.minPrice) params.append('pvmin', filters.minPrice);
      if (filters.maxPrice) params.append('pvmax', filters.maxPrice);
    } else if (filters.bizType === '2') {
      if (filters.minPrice) params.append('pcmin', filters.minPrice);
      if (filters.maxPrice) params.append('pcmax', filters.maxPrice);
    } else {

      if (filters.minPrice) {
        params.append('pvmin', filters.minPrice);
        params.append('pcmin', filters.minPrice);
      }
      if (filters.maxPrice) {
        params.append('pvmax', filters.maxPrice);
        params.append('pcmax', filters.maxPrice);
      }
    }


    if (filters.minBedrooms) params.append('minbed', filters.minBedrooms);
    if (filters.maxBedrooms) params.append('maxbed', filters.maxBedrooms);
    if (filters.bedrooms && filters.bedrooms.length === 1) {
      params.append('bedrooms', filters.bedrooms[0]);
    }


    if (filters.minBathrooms) params.append('minbath', filters.minBathrooms);
    if (filters.maxBathrooms) params.append('maxbath', filters.maxBathrooms);
    if (filters.bathrooms && filters.bathrooms.length === 1) {
      params.append('bathrooms', filters.bathrooms[0]);
    }


    if (filters.minArea) params.append('minarea', filters.minArea);
    if (filters.maxArea) params.append('maxarea', filters.maxArea);


    if (filters.minStratum) params.append('minstratum', filters.minStratum);
    if (filters.maxStratum) params.append('maxstratum', filters.maxStratum);
    if (filters.stratum) params.append('stratum', filters.stratum);


    if (filters.amenities && filters.amenities.length > 0) {
      params.append('amenities', filters.amenities.join(','));
    }


    if (filters.sortBy) {
      const [order, sort] = mapSortParams(filters.sortBy);
      if (order) params.append('order', order);
      if (sort) params.append('sort', sort);
    }


    const response = await apiClient.get('/properties', { params });

    return {
      properties: response.data.data || [],
      pagination: {
        total: response.data.total || 0,
        perPage: response.data.per_page || 50,
        currentPage: response.data.current_page || 1,
        lastPage: response.data.last_page || 1,
      }
    };
  } catch (error) {
    console.error('Error fetching properties:', error);
    return {
      properties: [],
      pagination: {
        total: 0,
        perPage: 50,
        currentPage: 1,
        lastPage: 1,
      }
    };
  }
}

export async function getPropertyDetails(propertyId) {
  try {
    const response = await apiClient.get(`/properties/${propertyId}`, {
      headers: {
        'ficha': '1'
      }
    });


    if (!response.data || !response.data.data) {
      console.error('Respuesta de API inválida:', response.data);
      return null;
    }

    const propertyData = response.data.data;


    if (!propertyData.images360 || !Array.isArray(propertyData.images360)) {
      console.log('No hay imágenes 360° disponibles para esta propiedad');
      return propertyData;
    }

    propertyData.images360 = propertyData.images360.map(img => ({
      ...img,
      imageurl: img.imageurl.replace('http:', 'https:'),
      thumburl: img.thumburl.replace('http:', 'https:')
    }));

    return propertyData;
  } catch (error) {
    console.error('Error fetching property details:', error);
    throw error;
  }
}


function mapSortParams(sortBy) {
  switch (sortBy) {
    case 'price-asc':
      return ['pricemin', 'asc'];
    case 'price-desc':
      return ['pricemax', 'desc'];
    case 'newest':
      return ['consignation_date', 'desc'];
    case 'area-asc':
      return ['area_cons', 'asc'];
    case 'area-desc':
      return ['area_cons', 'desc'];
    default:
      return [null, null];
  }
}


export function getPropertyTypeName(typeCode) {
  const types = {
    "1": "Apartamento",
    "2": "Casa",
    "4": "Local",
    "5": "Bodega",
    "6": "Oficina",
    "7": "Lote",
    "8": "Finca",
    "9": "Edificio",
    "10": "Casalote",
    "12": "Casa campestre",
    "13": "Casa-local",
    "14": "Casa condominio",
    "15": "Consultorio",
    "20": "Hotel",
  };

  return types[typeCode] || 'Propiedad';
}


export function getBizTypeName(bizCode) {
  const types = {
    '1': 'Arriendo',
    '2': 'Venta',
    '3': 'Arriendo/Venta',
  };

  return types[bizCode] || '';
}



export default {
  getProperties,
  getPropertyDetails,
  getPropertyTypeName,
  getBizTypeName
}; 