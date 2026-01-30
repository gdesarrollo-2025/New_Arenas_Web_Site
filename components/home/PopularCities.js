import Image from 'next/image';
import { useState } from 'react';
import PopularListings from '../properties/PopularListings';

const cities = [
  {
    name: 'Barranquilla',
    img: '/images/BarranquillaFoto.webp',
  },
  {
    name: 'Cartagena',
    img: '/images/CartagenaFoto.webp',
  },
];

export default function PopularCities() {
  const [ciudad, setCiudad] = useState("Barranquilla")

  const handleCityClick = (cityname) => {
    setCiudad(cityname)
  }

  return (
    <section className="py-14 px-5">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-medium text-gray-900 mb-8 text-center text-pretty">estan son <strong className="text-accent">las ciudades mas populares</strong> para encontrar tu hogar</h2>
        <div className="flex flex-wrap justify-around">
          {cities.map((city, idx) => (
            <div   key={idx} onClick={() => {handleCityClick(city.name)}} className="relative flex flex-col items-center cursor-pointer transform hover:scale-105 transition-transform">
              <div className=" relative w-40 h-40 rounded-full overflow-hidden mb-3 border-4 border-gray-100 shadow-lg">
                <Image src={city.img} alt={city.name} className="object-cover" sizes="152px" fill />
              </div>
              <span className="font-semibold text-gray-700 text-lg">{city.name}</span>
            </div>
          ))}
        </div>
        <PopularListings cityname={ciudad} />
      </div>
    </section>
  );
} 