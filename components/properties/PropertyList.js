import { useState, useEffect } from 'react';

import { useRouter } from 'next/router';
import PropertyCard from './PropertyCard';
import { FaSort, FaTh, FaList, FaBed, FaBath, FaRuler, FaAngleLeft, FaAngleRight, FaSearch } from 'react-icons/fa';
import { getProperties, getBizTypeName, getPropertyTypeName } from '../../lib/api';
import Link from 'next/link';
import Image from "next/image";

export default function PropertyList() {
  const router = useRouter();

  // Si estamos en la página de detalle, no renderizar nada
  if (router.query.id) {
    return null;
  }

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('grid'); 
  const [sortBy, setSortBy] = useState('default');
  const [pagination, setPagination] = useState({
    total: 0,
    perPage: 50,
    currentPage: 1,
    lastPage: 1,
  });

  useEffect(() => {
    
    if (!router.isReady) return;
    
    setLoading(true);
    
    const { page = 1, ...queryParams } = router.query;
    
    // Construir objeto de filtros
    const filters = {
      query: queryParams.q || '',
      location: queryParams.location || '',
      propertyType: queryParams.type ? queryParams.type.split(',') : [],
      bizType: queryParams.biz || '',
      sortBy: sortBy,
      // Manejar precios según tipo de negocio
      minPrice: queryParams.pvmin || queryParams.pcmin || queryParams.minPrice || '',
      maxPrice: queryParams.pvmax || queryParams.pcmax || queryParams.maxPrice || '',
      // Habitaciones
      bedrooms: queryParams.bedrooms ? 
        Array.isArray(queryParams.bedrooms) ? queryParams.bedrooms : [queryParams.bedrooms] : [],
      minBedrooms: queryParams.minbed || '',
      maxBedrooms: queryParams.maxbed || '',
      // Baños
      bathrooms: queryParams.bathrooms ? 
        Array.isArray(queryParams.bathrooms) ? queryParams.bathrooms : [queryParams.bathrooms] : [],
      minBathrooms: queryParams.minbath || '',
      maxBathrooms: queryParams.maxbath || '',
      // Área
      minArea: queryParams.minarea || '',
      maxArea: queryParams.maxarea || '',
      // Estrato
      stratum: queryParams.stratum || '',
      // Amenities
      amenities: queryParams.amenities ? queryParams.amenities.split(',') : [],
    };
    
    // Cargar propiedades desde la API
    const fetchData = async () => {
      try {
        const result = await getProperties(filters, page);

        // Filtro adicional según el tipo de negocio y los rangos
        let filtered = result.properties;
        const min = Number(filters.minPrice) || 0;
        const max = Number(filters.maxPrice) || Number.MAX_SAFE_INTEGER;

        if (filters.bizType === '1') { // Arriendo
          filtered = filtered.filter(
            prop => prop.rent && prop.rent >= min && prop.rent <= max
          );
        } else if (filters.bizType === '2') { // Venta
          filtered = filtered.filter(
            prop => prop.saleprice && prop.saleprice >= min && prop.saleprice <= max
          );
        } else if (filters.bizType === '3') { // Arriendo/Venta
          filtered = filtered.filter(
            prop =>
              (prop.rent && prop.rent >= min && prop.rent <= max) ||
              (prop.saleprice && prop.saleprice >= min && prop.saleprice <= max)
          );
        }

        setProperties(filtered);
        setPagination(result.pagination);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching properties:', error);
        setLoading(false);
      }
    };
    
    fetchData();
  }, [router.query, router.isReady, sortBy]);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };
  
  // Manejar cambio de página
  const handlePageChange = (newPage) => {
    const queryParams = new URLSearchParams(router.query);
    queryParams.set('page', newPage);
    router.push(`/properties?${queryParams.toString()}`);
  };
  
  // Formatear precio para mostrar
  const formatPrice = (property) => {
    if (property.biz_code === '1') { // Venta
      return property.saleprice ? 
        `$${property.saleprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}` : '';
    } else if (property.biz_code === '2') { // Arriendo
      return property.rent ? 
        `$${property.rent.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}` : '';
    } else {
      // Si tiene ambos, mostrar el formato de la API
      return property.price_format || '';
    }
  };

  // Renderizar paginación
  const renderPagination = () => {
    const pages = [];
    const { currentPage, lastPage } = pagination;
    
    // Botón anterior
    pages.push(
      <Link key="prev" href={currentPage === 1 ? '#' : `/properties?${new URLSearchParams({ ...router.query, page: Math.max(1, currentPage - 1) }).toString()}`} prefetch={false} className={`px-3 py-1 rounded-md ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-200'}`}><FaAngleLeft /></Link>
    );
    
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(lastPage, startPage + 4);
    
    if (endPage - startPage < 4) {
      startPage = Math.max(1, endPage - 4);
    }
    
    
    if (startPage > 1) {
      pages.push(
        <Link key="first" href={`/properties?${new URLSearchParams({ ...router.query, page: 1 }).toString()}`} prefetch={false} className="px-3 py-1 rounded-md hover:bg-gray-200">1</Link>
      );
      
      // Puntos suspensivos si hay gap
      if (startPage > 2) {
        pages.push(<span key="dots1" className="px-2">...</span>);
      }
    }
    
    // Páginas numéricas
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <a
          key={`page-${i}`}
          href={`/properties?${new URLSearchParams({ ...router.query, page: i }).toString()}`}
          className={`px-3 py-1 rounded-md ${i === currentPage ? 'bg-primary text-white' : 'hover:bg-gray-200'}`}
        >
          {i}
        </a>
      );
    }
    
    // Última página siempre visible si no es la misma que endPage
    if (endPage < lastPage) {
      // Puntos suspensivos si hay gap
      if (endPage < lastPage - 1) {
        pages.push(<span key="dots2" className="px-2">...</span>);
      }
      
      pages.push(
        <Link key="last" href={`/properties?${new URLSearchParams({ ...router.query, page: lastPage }).toString()}`} prefetch={false} className="px-3 py-1 rounded-md hover:bg-gray-200">{lastPage}</Link>
      );
    }
    
    // Botón siguiente
    pages.push(
      <Link key="next" href={currentPage === lastPage ? '#' : `/properties?${new URLSearchParams({ ...router.query, page: Math.min(lastPage, currentPage + 1) }).toString()}`} prefetch={false} className={`px-3 py-1 rounded-md ${currentPage === lastPage ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-200'}`}><FaAngleRight /></Link>
    );
    
    return (
      <div className="flex justify-center items-center space-x-1 mt-8">
        {pages}
      </div>
    );
  };

  const resetFilters = () => {
    router.push('/properties');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      {/* Toolbar */}
      <div className="flex flex-col  gap-4 sm:flex-row justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-semibold">
            {loading ? 'Cargando inmuebles...' : `${pagination.total} Inmuebles Encontrados`}
          </h2>
        </div>
        
        <div className="flex items-center gap-4">
          {/* View Toggle */}
          <div className="hidden sm:flex items-center">
            <button
              onClick={() => setView('grid')}
              className={`p-2 rounded-l-md ${view === 'grid' ? 'bg-primary text-white' : 'bg-gray-100'}`}
            >
              <FaTh />
            </button>
            <button
              onClick={() => setView('list')}
              className={`p-2 rounded-r-md ${view === 'list' ? 'bg-primary text-white' : 'bg-gray-100'}`}
            >
              <FaList />
            </button>
          </div>
          
          {/* Sort Dropdown */}
          <div className="flex items-center">
            <FaSort className="mr-2 text-gray-500" />
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="border border-gray-300 rounded-md p-1"
            >
              <option value="default">Predeterminado</option>
              <option value="price-asc">Precio (Menor a Mayor)</option>
              <option value="price-desc">Precio (Mayor a Menor)</option>
              <option value="newest">Más Recientes</option>
              <option value="area-asc">Área (Menor a Mayor)</option>
              <option value="area-desc">Área (Mayor a Menor)</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Loading State with Skeleton Loaders */}
      {loading && (
        <>
          <div className="flex flex-col items-center justify-center py-6 mb-6">
            <Image src="/images/LogoSolo.png" width={50} height={50} alt="logo cargando"  className="animate-spin" />
            <p className="text-gray-600 text-lg font-medium animate-pulse">Buscando inmuebles...</p>
            <p className="text-gray-500 text-sm mt-2">Esto puede tardar un momento</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6).fill(0).map((_, index) => (
              <PropertyCard key={`skeleton-${index}`} loading={true} />
            ))}
          </div>
        </>
      )}
      
      {/* No Results */}
      {!loading && properties.length === 0 && (
        <div className="text-center py-10 bg-gray-50 rounded-lg shadow-inner">
          <div className="mb-4">
            <FaSearch className="mx-auto text-4xl text-gray-400" />
          </div>
          <h3 className="text-xl font-medium text-gray-600 mb-2">No se encontraron inmuebles</h3>
          <p className="text-gray-500 mb-4">Intenta ajustando los criterios de búsqueda</p>
          <button 
            onClick={resetFilters} 
            className="bg-primary text-white px-4 py-2 rounded-sm hover:bg-primary/90 transition-colors"
          >
            Limpiar filtros
          </button>
        </div>
      )}
      
      {/* Property Grid */}
      {!loading && properties.length > 0 && view === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map(property => (
            <PropertyCard 
              key={property.idpro} 
              property={{
                id: property.idpro,
                title: `${getPropertyTypeName(property.type_code)} en ${property.city || property.city_zone || property.zone || property.city}`,
                codpro: property.codpro,
                price: formatPrice(property),
                location: `${property.neighborhood}, ${property.city}`,
                bedrooms: property.bedrooms,
                bathrooms: property.bathrooms,
                area: property.area_cons,
                biz_code: property.biz_code,
                status: getBizTypeName(property.biz_code),
                mainImage: property.image1 || '/images/property-placeholder.jpg',
                description: property.description,
              }} 
            />
          ))}
        </div>
      )}
      
      {/* Property List */}
      {!loading && properties.length > 0 && view === 'list' && (
        <div className="space-y-4">
          {properties.map(property => (
            <div key={property.id} className="flex flex-col sm:flex-row border rounded-lg overflow-hidden">
              <div className="sm:w-1/3 h-48 sm:h-auto relative">
                <img
                  src={property.image1 || '/images/property-placeholder.jpg'}
                  alt={`${getPropertyTypeName(property.type_code)} en ${property.city_zone || property.zone || property.city}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 sm:w-2/3">
                <div className="flex justify-between mb-2">
                  <h3 className="text-lg font-semibold">
                    <a href={`/properties/${property.codpro}`} className="hover:text-primary transition-colors">
                      {`${getPropertyTypeName(property.type_code)} en ${property.city_zone || property.zone || property.city}`}
                    </a>
                  </h3>
                  <span className="text-primary font-bold">{formatPrice(property)}</span>
                </div>
                <p className="text-gray-500 text-sm mb-3">{`${property.neighborhood}, ${property.city}`}</p>
                <div className="flex gap-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center">
                    <FaBed className="mr-1" />
                    <span>{property.bedrooms} Hab</span>
                  </div>
                  <div className="flex items-center">
                    <FaBath className="mr-1" />
                    <span>{property.bathrooms} Baños</span>
                  </div>
                  <div className="flex items-center">
                    <FaRuler className="mr-1" />
                    <span>{property.area_cons} m²</span>
                  </div>
                </div>
                <div className="flex gap-2 mt-auto">
                  <a 
                    href={`/properties/${property.codpro}`}
                    className="bg-primary text-white px-4 py-2 rounded-sm hover:bg-primary/90 transition-colors"
                  >
                    Ver Detalles
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Pagination */}
      {!loading && properties.length > 0 && pagination.lastPage > 1 && renderPagination()}
    </div>
  );
} 