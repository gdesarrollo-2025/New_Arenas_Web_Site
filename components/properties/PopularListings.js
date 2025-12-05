import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Cities = [
  {
    code: 8001,
    name: 'Barranquilla'
  },
  {
    code: 13001,
    name: 'Cartagena'
  }
]
export default function PopularListings({cityname}) {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Función para obtener propiedades por ciudad y página aleatoria
  const fetchPropertiesByCity = async () => {
    try {
      // Generar un número aleatorio entre 5 y 10
      const randomPage = Math.floor(Math.random() * 6) + 5;
      const cityCode = Cities.find((c) => c.name === cityname)?.code;
      const response = await fetch(`/api/properties?city=${cityCode}&perpage=6&page=${randomPage}`);
      if (!response.ok) {
        throw new Error('Error fetching properties');
      }
      const data = await response.json();

      if (data.data && Array.isArray(data.data)) {
        return data.data.map(property => ({
          id: property.codpro,
          title: property.address_alt || property.address,
          price: property.price_format || `$${property.rent || property.saleprice}`,
          img: property.image1 ? property.image1 : '/images/property-placeholder.jpg',
          location: property.city,
          beds: property.bedrooms,
          baths: property.bathrooms,
          area: property.area_cons
        }));
      }
      return [];
    } catch (error) {
      console.error('Error fetching properties by city:', error);
      return [];
    }
  };

  // Cargar propiedades al montar el componente
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const properties = await fetchPropertiesByCity();
        setListings(properties);
      } catch (error) {
        setListings([
          { id: 1, title: 'Sunnywood House', price: '$3,645/mo', img: '/images/house1.jpg', location: 'Barranquilla', beds: 3, baths: 2, area: 120 },
          { id: 2, title: 'Rainstone Residence', price: '$2,500/mo', img: '/images/house2.jpg', location: 'Cartagena', beds: 2, baths: 2, area: 90 },
          { id: 3, title: 'Cedar Grove Estate', price: '$4,380/mo', img: '/images/house3.jpg', location: 'Santa Marta', beds: 4, baths: 3, area: 180 },
        ]);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [cityname]);

  if (loading) {
    return (
      <section className="py-14">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Propiedades en {cityname}
            </h2>
            <button className="text-sm font-semibold text-black border border-gray-300 rounded-sm px-4 py-2 hover:bg-gray-100">
              Ver más
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col animate-pulse">
                <div className="w-full h-48 bg-gray-300"></div>
                <div className="p-4 flex-1 flex flex-col">
                  <div className="h-4 bg-gray-300 rounded-sm mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded-sm mb-2"></div>
                  <div className="flex gap-4 mb-2">
                    <div className="h-3 bg-gray-300 rounded-sm w-16"></div>
                    <div className="h-3 bg-gray-300 rounded-sm w-16"></div>
                    <div className="h-3 bg-gray-300 rounded-sm w-16"></div>
                  </div>
                  <div className="h-4 bg-gray-300 rounded-sm mt-auto"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-14">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Propiedades en {cityname}
          </h2>
          <Link href={`/properties/${cityname}`}className="text-sm font-semibold text-black border border-gray-300 rounded-sm px-4 py-2 hover:bg-gray-100">
            Ver más
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {listings.map(listing => (
            <div key={listing.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col hover:shadow-lg transition-shadow">
              <Link href={`/properties/property/${listing.id}`}>
                <div className=" relative w-full h-48 object-cover hover:opacity-90 transition-opacity">
                  <Image
                    src={listing.img}
                    alt={listing.title}
                    className="object-cover"
                    fill
                  />
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-gray-800 mb-1 hover:text-primary transition-colors">
                    {listing.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-2">{listing.location}</p>
                  <div className="flex gap-4 text-gray-500 text-xs mb-2">
                    <span>{listing.beds} Habitaciones</span>
                    <span>{listing.baths} Baños</span>
                    <span>{listing.area} m²</span>
                  </div>
                  <div className="mt-auto font-semibold text-black">{listing.price}</div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 