import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FaChevronDown, FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt, FaHome, FaDollarSign } from 'react-icons/fa';

import SelectField from './SelectField';

export default function HeroSearch() {
  const router = useRouter();
  const [filters, setFilters] = useState({})
  const [cities, setCities] = useState([]);
  const [types, setTypes] = useState([]);

  const biz = [{ code: 1, name: 'Arriendo' },
  { code: 2, name: 'Venta' },
  { code: 3, name: 'Arriendo/Venta' }
  ]

  useEffect(() => {
  fetch('/api/domus-types')
    .then((res) => res.json())
    .then((data) => {
      setTypes(data.data || []);
    })
    .catch(() => {
      setTypes([]);
    });
}, []);


  //Obtiene los datos segun el input 
  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => {
      let updatedFilters = { ...prev, [name]: value };

      return updatedFilters;
    });
  };

  const Search = () => {
    const queryParams = new URLSearchParams(router.query);
    console.log(filters)
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== '') {
        queryParams.set(key, value);
      }
    });
    //se inicia en pagina 1
    queryParams.set('page', '1');

    console.log(queryParams)
    router.push(`/properties?${queryParams.toString()}`, undefined, { shallow: true });
  }

  return (
    <div className="w-full  max-w-md mt-8 md:mt-0 md:ml-8">
      <form className="bg-white rounded-2xl shadow-xl p-6 flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Encuentra tu inmueble<br />de tus sueños</h2>
        {/* Location */}
        <div className="relative ">
          <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" name="q" placeholder="Ubicación" onChange={handleSelectChange} className="rounded-sm border pl-10 pr-8 py-2 w-full appearance-none"></input>
          {/* <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" /> */}
        </div>
        {/* Property Type */}
        <SelectField name="type" placeholder="Apartamento, Casa, Local . . ." handle={handleSelectChange} options={types}/>
        {/* Biz Type*/}
        <SelectField name="biz" placeholder="Arriendo . . ." handle={handleSelectChange} options={biz}/>
        {/* Features */}
        <div className="flex gap-2">
          {/* Bedrooms*/}
          <div className="relative flex-1">
            <FaBed className="absolute left-3 top-1/2 -translate-y-1/2 texxt-gray-400" />
            <input
              name="bedrooms"
              type="text"
              placeholder="4 Bed"
              onChange={handleSelectChange}
              className="rounded-sm border pl-8 py-2 w-full"
            />
          </div>
          {/* Bathrooms*/}
          <div className="relative flex-1">
            <FaBath className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              name="bathrooms"
              type="text"
              placeholder="2 Bathroom"
              onChange={handleSelectChange}
              className="rounded-sm border pl-8 py-2 w-full"
            />
          </div>
          {/* Area*/}
          <div className="relative flex-1">
            <FaRulerCombined className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              name="minarea"
              type="text"
              placeholder="67.5 m²"
              onChange={handleSelectChange}
              className="rounded-sm border pl-8 py-2 w-full"
            />
          </div>
        </div>
        {/* Min Price */}
        <div className="relative flex flex-col gap-2">
          <div className="flex items-center gap-4">
            <FaDollarSign className="text-gray-400" />
            <label className="text-gray-400"> Precio minimo </label>
          </div>
          <input name="minPrice" placeholder="$10.000.000" type="text" onChange={handleSelectChange} className="rounded-sm border w-full pl-8 py-2"></input>
        </div>
        <button type="button" className="bg-orange-500 text-white font-semibold rounded-full py-2 mt-2 hover:bg-orange-600 transition" onClick={Search}>Buscar</button>
      </form>
    </div>
  );
} 