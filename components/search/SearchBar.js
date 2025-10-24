import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FaSearch, FaMapMarkerAlt, FaBuilding, FaMoneyBillWave } from 'react-icons/fa';

export default function SearchBar() {
  const router = useRouter();
  const [searchParams, setSearchParams] = useState({
    query: '',
    location: '',
    propertyType: 'all',
    bizType: 'all',
    minPrice: '',
    maxPrice: '',
  });
  const [cities, setCities] = useState([]);
  const [types, setTypes] = useState([]);

  useEffect(() => {
    // Fetch cities
    fetch('/api/domus-cities')
      .then(res => res.json())
      .then(data => setCities(data.data || []))
      .catch(err => setCities([]));

    // Fetch property types
    fetch('/api/domus-types')
      .then(res => res.json())
      .then(data => setTypes(data.data || []))
      .catch(err => setTypes([]));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams();
    if (searchParams.query) queryParams.set('q', searchParams.query);
    if (searchParams.location) queryParams.set('location', searchParams.location);
    if (searchParams.propertyType !== 'all') queryParams.set('type', searchParams.propertyType);
    if (searchParams.bizType !== 'all') queryParams.set('biz', searchParams.bizType);
    if (searchParams.bizType === '1') {
      if (searchParams.minPrice) queryParams.set('pvmin', searchParams.minPrice);
      if (searchParams.maxPrice) queryParams.set('pvmax', searchParams.maxPrice);
    } else if (searchParams.bizType === '2') {
      if (searchParams.minPrice) queryParams.set('pcmin', searchParams.minPrice);
      if (searchParams.maxPrice) queryParams.set('pcmax', searchParams.maxPrice);
    } else {
      if (searchParams.minPrice) queryParams.set('minPrice', searchParams.minPrice);
      if (searchParams.maxPrice) queryParams.set('maxPrice', searchParams.maxPrice);
    }
    queryParams.set('page', '1');
    router.push(`/properties?${queryParams.toString()}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 my-4">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Query Input */}
          <div className="relative md:col-span-2">
            <input
              type="text"
              name="query"
              placeholder="Buscar inmuebles..."
              className="w-full border border-gray-300 rounded-md py-2 px-10 focus:outline-hidden focus:ring-2 focus:ring-primary"
              value={searchParams.query}
              onChange={handleChange}
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>

          {/* Location Input (Ciudad) */}
          <div className="relative">
            <select
              name="location"
              className="w-full border border-gray-300 rounded-md py-2 pl-10 pr-3 focus:outline-hidden focus:ring-2 focus:ring-primary appearance-none"
              value={searchParams.location}
              onChange={handleChange}
            >
              <option value="">Ciudad</option>
              {cities.map(city => (
                <option key={city.code} value={city.code}>{city.name}</option>
              ))}
            </select>
            <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
          </div>

          {/* Property Type Select (Tipo de inmueble) */}
          <div className="relative">
            <select
              name="propertyType"
              className="w-full border border-gray-300 rounded-md py-2 pl-10 pr-3 focus:outline-hidden focus:ring-2 focus:ring-primary appearance-none"
              value={searchParams.propertyType}
              onChange={handleChange}
            >
              <option value="all">Cualquier tipo</option>
              {types.map(type => (
                <option key={type.code} value={type.code}>{type.name}</option>
              ))}
            </select>
            <FaBuilding className="absolute left-3 top-3 text-gray-400" />
          </div>

          {/* Search Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/90 transition-colors"
            >
              Buscar
            </button>
          </div>
        </div>

        {/* Advanced Search Toggle */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Tipo de Negocio */}
          <div className="relative">
            <select
              name="bizType"
              className="w-full border border-gray-300 rounded-md py-2 pl-10 pr-3 focus:outline-hidden focus:ring-2 focus:ring-primary appearance-none"
              value={searchParams.bizType}
              onChange={handleChange}
            >
              <option value="all">Venta o Arriendo</option>
              <option value="1">Venta</option>
              <option value="2">Arriendo</option>
              <option value="3">Arriendo/Venta</option>
            </select>
            <FaMoneyBillWave className="absolute left-3 top-3 text-gray-400" />
          </div>

        </div>
      </form>
    </div>
  );
} 