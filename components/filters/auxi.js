import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FaFilter, FaTimes, FaHome, FaBuilding, FaChevronRight, FaChevronDown } from 'react-icons/fa';
import axios from 'axios';
import { getProperties } from '../../lib/api';

export default function FilterSidebar({ initialFilters, onChangeFilters}) {
  const router = useRouter();
  const [filters, setFilters] = useState(initialFilters || { 
    propertyType: [],
    bizType: '',
    bedrooms: [],
    bathrooms: [],
    minPrice: '',
    maxPrice: '',
    stratum: '',
    minArea: '',
    maxArea: '',
  });
  const [localMinPrice, setLocalMinPrice] = useState('');
  const [localMaxPrice, setLocalMaxPrice] = useState('');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 2000000000 });
  const [propertyTypesExpanded, setPropertyTypesExpanded] = useState(false);

  // Los iconos solo para los tipos más comunes
  const typeIcons = {
    1: <FaBuilding className="mr-2" />, // Apartamento
    2: <FaHome className="mr-2" />,     // Casa
  };

  // Cargar tipos de inmueble dinámicamente
  useEffect(() => {
    async function fetchPropertyTypes() {
      try {
        setLoading(true);
        const response = await axios.get('/api/property-types');
        if (response.data && response.data.data) {
          // Asegurarse que los códigos sean strings para comparación consistente
          const typesWithStringCodes = response.data.data.map(type => ({
            ...type,
            code: String(type.code)
          }));
          setPropertyTypes(typesWithStringCodes);
        }
      } catch (error) {
        console.error('Error al cargar tipos de inmueble:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPropertyTypes();
  }, []);

  // Initialize filters from URL query params
  useEffect(() => {
    
  }, [router.query]);

  // Actualizar estados locales cuando cambian los filtros
  useEffect(() => {
    setLocalMinPrice(filters.minPrice);
    setLocalMaxPrice(filters.maxPrice);
  }, [filters.minPrice, filters.maxPrice]);

  // Handle local price input changes
  const handleLocalPriceChange = (e) => {
    const { name, value } = e.target;
    // Solo permitir números
    if (value === '' || /^\d*$/.test(value)) {
      if (name === 'minPrice') {
        setLocalMinPrice(value);
      } else {
        setLocalMaxPrice(value);
      }
    }
  };

  // Actualizar filtros cuando el input pierde el foco
  const handlePriceBlur = (e) => {
    const { name } = e.target;
    const value = name === 'minPrice' ? localMinPrice : localMaxPrice;
    
    if (value === '') {
      setFilters(prev => ({ ...prev, [name]: '' }));
      return;
    }

    const numValue = parseInt(value);
    if (isNaN(numValue)) {
      setFilters(prev => ({ ...prev, [name]: '' }));
      return;
    }

    // Validar límites
    if (name === 'minPrice') {
      const max = filters.maxPrice ? parseInt(filters.maxPrice) : maxPrice;
      setFilters(prev => ({ 
        ...prev, 
        [name]: Math.min(Math.max(0, numValue), max).toString() 
      }));
    } else {
      const min = filters.minPrice ? parseInt(filters.minPrice) : 0;
      setFilters(prev => ({ 
        ...prev, 
        [name]: Math.max(min, Math.min(numValue, maxPrice)).toString() 
      }));
    }
  };

  // Handle checkbox changes
  const handleCheckboxChange = (category, value) => {
    setFilters(prev => {
      const newValues = prev[category].includes(value)
        ? prev[category].filter(item => item !== value)
        : [...prev[category], value];
      
      return { ...prev, [category]: newValues };
    });
  };

  // Handle select input changes
  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  // Define los rangos máximos por tipo de negocio
  const priceRanges = {
    '1': 20000000, // Ariendo
    '2': 2000000000,   // Venta
    '3': 2000000000, // Ambos
    '': 2000000000   // Default
  };

  const maxPrice = priceRanges[filters.bizType] || 2000000000;
  const step = 100000;

  // Apply filters
  const applyFilters = () => {
    const queryParams = new URLSearchParams(router.query);
    
    // Reset existing filter params
    [
      'type', 'biz', 'minPrice', 'maxPrice', 'bedrooms', 'bathrooms', 
      'stratum', 'minarea', 'maxarea'
    ].forEach(param => {
      queryParams.delete(param);
    });
    
    // Tipo de propiedad (múltiples selecciones)
    if (filters.propertyType.length > 0) {
      queryParams.set('type', filters.propertyType.join(','));
    }
    
    // Tipo de negocio (arriendo/venta)
    if (filters.bizType) {
      queryParams.set('biz', filters.bizType);
    }
    
    // Precios (se aplican según tipo de negocio)
    if (filters.bizType === '2') { // Venta
      if (filters.minPrice) queryParams.set('pvmin', filters.minPrice);
      if (filters.maxPrice) queryParams.set('pvmax', filters.maxPrice);
    } else if (filters.bizType === '1') { // Arriendo
      if (filters.minPrice) queryParams.set('pcmin', filters.minPrice);
      if (filters.maxPrice) queryParams.set('pcmax', filters.maxPrice);
    } else {
      // Si no hay tipo de negocio, aplicar a ambos
      if (filters.minPrice) queryParams.set('minPrice', filters.minPrice);
      if (filters.maxPrice) queryParams.set('maxPrice', filters.maxPrice);
    }
    
    // Habitaciones
    if (filters.bedrooms.length === 1) {
      queryParams.set('bedrooms', filters.bedrooms[0]);
    } else if (filters.bedrooms.length > 1) {
      // Si hay múltiples selecciones, establecer min/max
      const bedroomValues = filters.bedrooms.map(b => parseInt(b.replace('+', '')));
      queryParams.set('minbed', Math.min(...bedroomValues));
      if (!filters.bedrooms.includes('5+')) {
        queryParams.set('maxbed', Math.max(...bedroomValues));
      }
    }
    
    // Baños
    if (filters.bathrooms.length === 1) {
      queryParams.set('bathrooms', filters.bathrooms[0]);
    } else if (filters.bathrooms.length > 1) {
      // Si hay múltiples selecciones, establecer min/max
      const bathroomValues = filters.bathrooms.map(b => parseInt(b.replace('+', '')));
      queryParams.set('minbath', Math.min(...bathroomValues));
      if (!filters.bathrooms.includes('4+')) {
        queryParams.set('maxbath', Math.max(...bathroomValues));
      }
    }
    
    // Estrato
    if (filters.stratum) {
      queryParams.set('stratum', filters.stratum);
    }
    
    // Área
    if (filters.minArea) queryParams.set('minarea', filters.minArea);
    if (filters.maxArea) queryParams.set('maxarea', filters.maxArea);
    
    // Mantener en página 1 cuando se aplican filtros
    queryParams.set('page', '1');
    
    // Update URL with new filters
    router.push(`/properties?${queryParams.toString()}`, undefined, { shallow: true });
    
    // Close mobile filter if open
    setMobileFilterOpen(false);
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      propertyType: [],
      bizType: '',
      bedrooms: [],
      bathrooms: [],
      minPrice: '',
      maxPrice: '',
      stratum: '',
      minArea: '',
      maxArea: '',
    });
    
    // Keep the search query and location params
    const { q, location } = router.query;
    const queryParams = new URLSearchParams();
    if (q) queryParams.set('q', q);
    if (location) queryParams.set('location', location);
    
    router.push(`/properties?${queryParams.toString()}`);
  };

  // Formatear precio para mostrar
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const FilterContent = () => (
    <>
        {/* dropdow de properties */}
      <div className="mb-6">
        <div 
          className="flex justify-between items-center cursor-pointer" 
          onClick={() => setPropertyTypesExpanded(!propertyTypesExpanded)}
        >
          <h3 className="font-semibold text-lg mb-2">Tipo de Inmueble</h3>
          {propertyTypesExpanded ? 
            <FaChevronDown className="text-gray-600" /> : 
            <FaChevronRight className="text-gray-600" />
          }
        </div>
        {/* properties */}
        {propertyTypesExpanded && (
          loading ? (
            <div className="animate-pulse space-y-2">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-6 bg-gray-200 rounded-sm"></div>
              ))}
            </div>
          ) : (
            <div className="space-y-2 mt-2">
              {propertyTypes.map(type => (
                <label key={type.code} className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2 h-4 w-4 text-primary"
                    checked={filters.propertyType.includes(type.code)}
                    onChange={() => handleCheckboxChange('propertyType', type.code)}
                  />
                  <div className="flex items-center">
                    {typeIcons[type.code] || null}
                    <span className="capitalize">{type.name.toLowerCase()}</span>
                  </div>
                </label>
              ))}
            </div>
          )
        )}
      </div>
      {/* dropdown arriendos */}
      <div className="mb-6">
        <h3 className="font-semibold text-lg mb-2">Tipo de Negocio</h3>
        <div className="space-x-2">
          <select
            name="bizType"
            className="w-full border border-gray-300 rounded-sm p-2"
            value={filters.bizType}
            onChange={handleSelectChange}
          >
            <option value="">Todos</option>
            <option value="1">Arriendo</option>
            <option value="2">Venta</option>
            <option value="3">Arriendo/Venta</option>
          </select>
        </div>
      </div>
      {/* Precio maximo y minimo */}
      <div className="mb-6">
        <h3 className="font-semibold text-lg mb-2">Rango de Precio</h3>
        <div className="flex justify-between items-center gap-2">
          <div className="flex items-center gap-1 flex-1">
            <span className="text-sm text-gray-600">$</span>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              name="minPrice"
              placeholder="Mín"
              value={localMinPrice}
              onChange={handleLocalPriceChange}
              onBlur={handlePriceBlur}
              className="w-full border border-gray-300 rounded-sm px-2 py-2 text-sm focus:outline-primary"
              style={{ textAlign: 'right' }}
            />
          </div>
          <span className="mx-2 text-gray-400">—</span>
          <div className="flex items-center gap-1 flex-1">
            <span className="text-sm text-gray-600">$</span>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              name="maxPrice"
              placeholder="Máx"
              value={localMaxPrice}
              onChange={handleLocalPriceChange}
              onBlur={handlePriceBlur}
              className="w-full border border-gray-300 rounded-sm px-2 py-2 text-sm focus:outline-primary"
              style={{ textAlign: 'right' }}
            />
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="font-semibold text-lg mb-2">Área (m²)</h3>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            name="minArea"
            placeholder="Mín"
            className="border border-gray-300 rounded-sm p-2"
            value={filters.minArea}
            onChange={handleSelectChange}
          />
          <input
            type="number"
            name="maxArea"
            placeholder="Máx"
            className="border border-gray-300 rounded-sm p-2"
            value={filters.maxArea}
            onChange={handleSelectChange}
          />
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold text-lg mb-2">Habitaciones</h3>
        <div className="flex flex-wrap gap-2">
          {['1', '2', '3', '4', '5+'].map(bedroom => (
            <label
              key={bedroom}
              className={`px-3 py-1 border rounded-full cursor-pointer ${
                filters.bedrooms.includes(bedroom)
                  ? 'bg-primary text-white'
                  : 'border-gray-300 hover:border-primary'
              }`}
            >
              <input
                type="checkbox"
                className="sr-only"
                checked={filters.bedrooms.includes(bedroom)}
                onChange={() => handleCheckboxChange('bedrooms', bedroom)}
              />
              {bedroom}
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold text-lg mb-2">Baños</h3>
        <div className="flex flex-wrap gap-2">
          {['1', '2', '3', '4+'].map(bathroom => (
            <label
              key={bathroom}
              className={`px-3 py-1 border rounded-full cursor-pointer ${
                filters.bathrooms.includes(bathroom)
                  ? 'bg-primary text-white'
                  : 'border-gray-300 hover:border-primary'
              }`}
            >
              <input
                type="checkbox"
                className="sr-only"
                checked={filters.bathrooms.includes(bathroom)}
                onChange={() => handleCheckboxChange('bathrooms', bathroom)}
              />
              {bathroom}
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold text-lg mb-2">Estrato</h3>
        <select
          name="stratum"
          className="w-full border border-gray-300 rounded-sm p-2"
          value={filters.stratum}
          onChange={handleSelectChange}
        >
          <option value="">Todos</option>
          <option value="1">Estrato 1</option>
          <option value="2">Estrato 2</option>
          <option value="3">Estrato 3</option>
          <option value="4">Estrato 4</option>
          <option value="5">Estrato 5</option>
          <option value="6">Estrato 6</option>
        </select>
      </div>

      <div className="flex gap-2">
        <button
          onClick={applyFilters}
          className="bg-primary text-white px-4 py-2 rounded-sm flex-1"
        >
          Aplicar Filtros
        </button>
        <button
          onClick={resetFilters}
          className="border border-gray-300 px-4 py-2 rounded-sm"
        >
          Limpiar
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Filter */}
      <div className="hidden lg:block bg-white rounded-lg shadow-md p-4">
        <h2 className="text-xl font-semibold mb-4">Filtros</h2>
        <FilterContent />
      </div>
      
      {/* Mobile Filter Button */}
      <div className="lg:hidden">
        <button
          onClick={() => setMobileFilterOpen(true)}
          className="fixed bottom-22 right-3 bg-primary text-white p-6 rounded-full shadow-lg z-20"
        >
          <FaFilter />
        </button>
        
        {/* Mobile Filter Panel */}
        {mobileFilterOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-30 flex justify-end">
            <div className="bg-white w-80 h-full overflow-y-auto p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Filtros</h2>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <FaTimes />
                </button>
              </div>
              <FilterContent />
            </div>
          </div>
        )}
      </div>
    </>
  );
} 