import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaBed, FaBath, FaRuler, FaTimes, FaMapMarkerAlt } from 'react-icons/fa';

export default function PropertyQuickView({ property, onClose }) {
  // Format price with commas
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
console.log(property);

  // Prevent body scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Handle click outside to close
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="relative">
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-2 right-2 z-10 bg-white rounded-full p-2 shadow-md"
          >
            <FaTimes className="text-gray-600" />
          </button>
          
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Property Image */}
            <div className="relative h-64 md:h-full">
              <Image
                src={property.mainImage || '/images/property-placeholder.jpg'}
                alt={property.title}
                layout="fill"
                objectFit="cover"
              />
              
              {/* Property Status Tag */}
              <div className="absolute top-2 left-2 bg-accent text-white px-2 py-1 rounded-md text-xs font-bold">
                {property.status || 'For Sale'}
              </div>
            </div>
            
            {/* Property Details */}
            <div className="p-6">
              <div className="mb-4">
                <h2 className="text-2xl font-bold mb-2">{property.title}</h2>
                <p className="text-sm text-gray-500 mb-2">Cod: {property.codpro}</p>
                <div className="flex items-center text-gray-600 mb-4">
                  <FaMapMarkerAlt className="mr-1 text-primary" />
                  <span>{property.location}</span>
                </div>
                <div className="text-2xl font-bold text-primary mb-4">
                  {(property.biz_code!==3)? ("$"+property.price): property.price}
                </div>
              </div>
              
              {/* Property Features */}
              <div className="flex justify-between text-gray-600 mb-6 border-t border-b border-gray-200 py-3">
                <div className="flex flex-col items-center">
                  <FaBed className="text-xl mb-1" />
                  <span>{property.bedrooms} Habs</span>
                </div>
                <div className="flex flex-col items-center">
                  <FaBath className="text-xl mb-1" />
                  <span>{property.bathrooms} Baños</span>
                </div>
                <div className="flex flex-col items-center">
                  <FaRuler className="text-xl mb-1" />
                  <span>{property.area} m²</span>
                </div>
              </div>
              
              {/* Property Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Descripción</h3>
                <p className="text-gray-600">
                  {(property.description || 
                    'This beautiful property offers modern living with all the amenities you need for comfortable living. Located in a prime area with easy access to shopping, schools, and entertainment.').length > 250 
                    ? (property.description || 
                      'This beautiful property offers modern living with all the amenities you need for comfortable living. Located in a prime area with easy access to shopping, schools, and entertainment.').substring(0, 250) + '...'
                    : (property.description || 
                      'This beautiful property offers modern living with all the amenities you need for comfortable living. Located in a prime area with easy access to shopping, schools, and entertainment.')
                  }
                </p>
              </div>
              
              {/* Call to Action Buttons */}
              <div className="flex gap-3">
                <a
                  href={`/properties/${property.codpro}`}
                  className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90 transition-colors flex-1 text-center hover:scale-105 select-none"
                >
                  Ver detalles
                </a>
                <button
                  onClick={() => alert('Contact feature will be available soon!')}
                  className="border border-primary text-primary px-6 py-2 rounded-md hover:bg-primary/10 transition-colors hover:scale-105 flex-1 select-none"
                >
                  Contactar agente
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 