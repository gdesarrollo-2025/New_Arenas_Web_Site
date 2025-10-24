import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaBed, FaBath, FaRuler, FaHeart, FaRegHeart } from 'react-icons/fa';
import PropertyQuickView from './PropertyQuickView';

export default function PropertyCard({ property, loading = false }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Formato de precio
  const formatPrice = (price) => {
    if (typeof price === 'string' && !price.includes('$')) {
      return `$${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
    }
    
    return price;
  };

  // Skeleton loader para estado de carga
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
        <div className="h-48 bg-gray-300"></div>
        <div className="p-4">
          <div className="h-6 bg-gray-300 rounded-sm mb-2"></div>
          <div className="h-4 bg-gray-300 rounded-sm w-3/4 mb-3"></div>
          <div className="flex justify-between">
            <div className="h-4 bg-gray-300 rounded-sm w-1/4"></div>
            <div className="h-4 bg-gray-300 rounded-sm w-1/4"></div>
            <div className="h-4 bg-gray-300 rounded-sm w-1/4"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]">
        {/* Property Image */}
        <div className="relative h-48">
          <a href={`/properties/${property.codpro}`}>
            <div className="relative w-full h-full">
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gray-300 animate-pulse"></div>
              )}
              <img
                src={property.mainImage || '/images/property-placeholder.jpg'}
                alt={property.title}
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setImageLoaded(true)}
              />
            </div>
          </a>
          
          {/* Quick View Button */}
          <button
            onClick={() => setShowQuickView(true)}
            className="group absolute bottom-2 left-2 bg-white/90 hover:bg-primary/60 py-1 px-3 rounded-full text-sm font-medium transition-all duration-200"
          >
            <span className="text-primary group-hover:text-white transition-colors  duration-200">
              Vista Rápida
            </span>
          </button>
          
          {/* Favorite Button */}
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="absolute top-2 right-2 p-2 rounded-full bg-white bg-opacity-70 hover:bg-opacity-100 transition-colors"
          >
            {isFavorite ? (
              <FaHeart className="text-red-500" />
            ) : (
              <FaRegHeart className="text-gray-600" />
            )}
          </button>
          
          {/* Property Status Tag */}
          <div className="absolute top-2 left-2 bg-accent text-white px-2 py-1 rounded-md text-xs font-bold">
            {property.status || 'Venta'}
          </div>
        </div>
        
        {/* Property Details */}
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold truncate">
              <Link prefetch={false} href={`/properties/${property.id}`} className="hover:text-primary transition-colors">
                {property.title}
              </Link>
            </h3>
            <span className="text-primary font-bold">{formatPrice(property.price)}</span>
          </div>
          
          <p className="text-gray-500 text-sm mb-3 truncate">
            {property.location}
          </p>
          
          {/* Property Features */}
          <div className="flex justify-between text-sm text-gray-600">
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
              <span>{property.area} m²</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Quick View Modal */}
      {showQuickView && (
        <PropertyQuickView
          propertyId={property.id}
          property={property}
          onClose={() => setShowQuickView(false)}
        />
      )}
    </>
  );
} 