import { useState, useEffect } from 'react';
import Link from 'next/link';
import PropertyCard from './PropertyCard';
import apiService from '../../lib/api';

export default function FeaturedProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Mock data for demo purposes
  const mockProperties = [
    {
      id: 1,
      title: 'Modern Apartment with Ocean View',
      price: 350000,
      location: 'Miami Beach, FL',
      bedrooms: 2,
      bathrooms: 2,
      area: 1200,
      status: 'For Sale',
      mainImage: '/images/property-placeholder.jpg'
    },
    {
      id: 2,
      title: 'Luxury Penthouse in Downtown',
      price: 1200000,
      location: 'New York, NY',
      bedrooms: 3,
      bathrooms: 3.5,
      area: 2500,
      status: 'For Sale',
      mainImage: '/images/property-placeholder.jpg'
    },
    {
      id: 3,
      title: 'Cozy Cottage with Garden',
      price: 220000,
      location: 'Portland, OR',
      bedrooms: 2,
      bathrooms: 1,
      area: 950,
      status: 'For Sale',
      mainImage: '/images/property-placeholder.jpg'
    }
  ];

  useEffect(() => {
    // In a real app, you would fetch featured properties from the API
    // const fetchFeaturedProperties = async () => {
    //   try {
    //     const data = await apiService.getFeaturedProperties();
    //     setProperties(data);
    //   } catch (error) {
    //     console.error('Error fetching featured properties:', error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    
    // fetchFeaturedProperties();
    
    // For now, use mock data with a delay to simulate API call
    setTimeout(() => {
      setProperties(mockProperties);
      setLoading(false);
    }, 500);
  }, []);

  return (
    <div className="my-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Featured Properties</h2>
        <Link 
          prefetch={false}
          href="/properties" 
          className="text-primary hover:underline"
        >
          View All Properties
        </Link>
      </div>
      
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
} 