import Image from 'next/image';
import Link from 'next/link';

const cities = [
  { 
    name: 'Barranquilla', 
    img: '/images/BarranquillaFoto.webp', 
    link: '/properties?q=Barranquilla'
  },
  { 
    name: 'Cartagena', 
    img: '/images/CartagenaFoto.webp', 
    link: '/properties?q=Cartagena'
  },
];

export default function PopularCities() {
  return (
    <section className="bg-white py-14 px-5">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Ciudades Populares</h2>
        <div className="flex flex-wrap justify-around">
          {cities.map(city => (
            <Link href={city.link} key={city.name}>
              <div className="relative flex flex-col items-center cursor-pointer transform hover:scale-105 transition-transform">
                <div className=" relative w-40 h-40 rounded-full overflow-hidden mb-3 border-4 border-gray-100 shadow-lg">
                 <Image src={city.img} alt={city.name} className="object-cover" sizes="152px"fill/>
                </div>
                <span className="font-semibold text-gray-700 text-lg">{city.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
} 