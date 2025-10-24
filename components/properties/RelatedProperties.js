import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropertyCard from './PropertyCard';
import apiService from '../../lib/api';

export default function RelatedProperties() {
  const router = useRouter();
  const { id } = router.query;
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data for demo purposes
  const mockProperties = [
    {
      id: 101,
      title: 'Contemporary House with Garden',
      price: 875000,
      location: 'Beverly Hills, CA',
      bedrooms: 3,
      bathrooms: 2.5,
      area: 2800,
      status: 'For Sale',
      mainImage: '/images/property-placeholder.jpg'
    },
    {
      id: 102,
      title: 'Modern Villa with City View',
      price: 1150000,
      location: 'Los Angeles, CA',
      bedrooms: 4,
      bathrooms: 3,
      area: 3500,
      status: 'For Sale',
      mainImage: '/images/property-placeholder.jpg'
    },
    {
      id: 103,
      title: 'Elegant Family Home',
      price: 950000,
      location: 'Malibu, CA',
      bedrooms: 4,
      bathrooms: 2.5,
      area: 3000,
      status: 'For Sale',
      mainImage: '/images/property-placeholder.jpg'
    }
  ];

  useEffect(() => {
    if (!id) return;

    // In a real app, you would fetch related properties from the API
    // const fetchRelatedProperties = async () => {
    //   try {
    //     const data = await apiService.getRelatedProperties(id);
    //     setProperties(data);
    //   } catch (error) {
    //     console.error(`Error fetching related properties for property ${id}:`, error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    
    // fetchRelatedProperties();
    
    // For now, use mock data with a delay to simulate API call
    setTimeout(() => {
      setProperties(mockProperties);
      setLoading(false);
    }, 500);
  }, [id]);

  if (properties.length === 0 && !loading) {
    return null;
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold mb-6">Propiedades similares que te podrían interesar</h2>
      
      {loading ? (
        <div className="flex justify-center py-8">
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