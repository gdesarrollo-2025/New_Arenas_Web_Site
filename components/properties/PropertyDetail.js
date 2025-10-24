import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaBed, FaBath, FaRuler, FaMapMarkerAlt, FaCalendar, FaTag, FaHome } from 'react-icons/fa';
import { getPropertyDetails, getBizTypeName, getPropertyTypeName } from '../../lib/api';
import Property360Viewer from './Property360Viewer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import dynamic from 'next/dynamic';
const PropertyMapModal = dynamic(() => import('./PropertyMapModal'), { ssr: false });

const PropertyMap = dynamic(() => import('./PropertyMap'), { ssr: false });

export default function PropertyDetail({ id }) {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [view, setView] = useState('fotos'); // 'fotos' o 'mapa'
  const [showMap, setShowMap] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  // Format price with commas
  const formatPrice = (property) => {
    if (!property) return '';
    
    const price = property.biz_code == "1" ? property.rent : property.sales_price;
    if (!price) return '';
    
    return `$${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
  };

  useEffect(() => {
    console.log('PropertyDetail montado con id:', id);
    
    const fetchPropertyDetails = async () => {
      try {
        console.log('Iniciando fetchPropertyDetails para id:', id);
        const data = await getPropertyDetails(id);
        console.log('Datos recibidos de getPropertyDetails:', data);
        
        if (data) {
          // Transformar los datos de la API al formato esperado por el componente
          const transformedProperty = {
            id: data.idpro,
            codpro: data.codpro,
            title: `${getPropertyTypeName(data.type_code)} en ${data.city || data.city_zone || data.zone}`,
            rent: data.rent,
            sales_price: data.saleprice,
            administration: data.administration,
            price_format: data.price_format,
            biz_code: data.biz_code,
            location: `${data.neighborhood}, ${data.city}`,
            bedrooms: data.bedrooms,
            bathrooms: data.bathrooms,
            area: data.area_cons,
            yearBuilt: data.build_year,
            propertyType: getPropertyTypeName(data.type_code),
            status: getBizTypeName(data.biz_code),
            description: data.description,
            features: data.amenities?.map(amenity => amenity.name) || [],
            images: data.images?.map(img => img.imageurl) || [],
            images360: data.images360 || [],
            latitude: data.latitude || data.lat || 5545032,
            longitude: data.longitude || data.lng || 3230,
            agent: {
              name:  `${data.broker?.[0]?.name} ${data.broker?.[0]?.last_name}` || 'Agente Arenas',
              phone: data.broker?.[0]?.movil_phone || '(123) 456-7890',
              email: data.broker?.[0]?.email || 'contacto@arenasestate.com',
              image: data.broker?.[0]?.picture || '/images/default-agent.png'
            }
          };
          console.log('Propiedad transformada:', transformedProperty);
          setProperty(transformedProperty);
        }
      } catch (error) {
        console.error(`Error fetching property details for ID ${id}:`, error);
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchPropertyDetails();
    }

    return () => {
      console.log('PropertyDetail desmontado');
    };
  }, [id]);

  useEffect(() => {
    console.log('Estado del modal:', {
      showMap,
      hasCoordinates: Boolean(property?.latitude && property?.longitude),
      latitude: property?.latitude,
      longitude: property?.longitude
    });
  }, [showMap, property?.latitude, property?.longitude]);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-600 mb-2">Propiedad No Encontrada</h2>
        <p className="text-gray-500">La propiedad que buscas no existe o ha sido removida.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md select-none">
      {/* Property Images Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        <div className="md:col-span-2">
          <div className="mt-2 relative h-[550px]">
            {/* Ícono de ubicación en la esquina superior derecha */}
            <button
              className="absolute top-4 right-4 z-20 bg-white bg-opacity-80 rounded-full p-2 shadow-sm hover:bg-opacity-100 transition"
              onClick={() => setShowMap(true)}
              title="Ver ubicación en el mapa"
              style={{ outline: 'none' }}
            >
              <FaMapMarkerAlt
                className="text-2xl"
                style={{
                  color: showMap ? '#2563eb' : '#a3a3a3', // primary o gris
                  transition: 'color 0.2s'
                }}
                onMouseOver={e => (e.currentTarget.style.color = '#2563eb')}
                onMouseOut={e => (e.currentTarget.style.color = showMap ? '#2563eb' : '#a3a3a3')}
              />
            </button>

            {/* Botones de selección
            
                        <div className="flex gap-2 mb-4">
              <button
                className={`px-6 py-2 rounded-full font-semibold transition-colors ${
                  view === 'fotos'
                    ? 'bg-primary text-white'
                    : 'bg-white text-primary border border-primary'
                }`}
                onClick={() => setView('fotos')}
              >
                Fotos
              </button>
              <button
                className={`px-6 py-2 rounded-full font-semibold transition-colors ${
                  view === 'mapa'
                    ? 'bg-primary text-white'
                    : 'bg-white text-primary border border-primary'
                }`}
                onClick={() => setView('mapa')}
              >
                Mapa
              </button>
            </div>*/}


            {/* Carrusel de fotos */}
            {view === 'fotos' && (
              (property.images && property.images.length > 0) ? (
                <Swiper
                  modules={[Navigation]}
                  spaceBetween={10}
                  slidesPerView={1}
                  navigation
                  style={{ width: '100%', height: '100%' }}
                  className="rounded-lg h-full"
                >
                  {property.images.map((image, index) => (
                    <SwiperSlide key={index}>
                      <div className="relative w-full h-full">
                        <Image
                          src={image}
                          alt={`${property.title} - Imagen ${index + 1}`}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="rounded-lg object-cover cursor-zoom-in"
                          priority={index === 0}
                          onClick={() => {
                            setModalImage(image);
                            setShowImageModal(true);
                          }}
                        />
                        <div className="absolute top-2 left-2 bg-accent text-white px-3 py-1 rounded-md text-sm font-semibold z-10">
                          {property.status}
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                // Imagen por defecto si no hay imágenes
                <div className="relative w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
                  <Image
                    src="/images/property-placeholder.jpg"
                    alt="Sin imágenes disponibles"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="rounded-lg object-cover"
                    style={{ objectFit: 'contain' }}
                  />
                  <div className="absolute top-2 left-2 bg-accent text-white px-3 py-1 rounded-md text-sm font-semibold z-10">
                    {property.status}
                  </div>
                </div>
              )
            )}

            {/* Mapa dinámico solo en cliente */}
            {view === 'mapa' && property.latitude && property.longitude && (
              <PropertyMap latitude={property.latitude} longitude={property.longitude} />
            )}
          </div>
        </div>

        {/* Property Quick Info */}
        <div className="md:col-span-1 p-4">
          <h1 className="text-2xl font-bold mb-2">{property.title}</h1>
          <div className="flex items-center text-gray-600 mb-4">
            <FaMapMarkerAlt className="mr-2 text-primary" />
            <span>{property.location}</span>
          </div>
          <div className="mb-6 space-y-1">
            {(property.biz_code == 3) &&  property.price_format && (
              <div className="text-2xl font-bold text-primary">
                {property.price_format}
              </div>
            )}
            {(property.biz_code == 1 || property.biz_code == 2) && property.price_format && (
              <div className="text-2xl font-bold text-primary">
                ${property.price_format}
              </div>
            )}
            {/* Administración solo si es mayor a 0 */}
            {property.administration > 0 && (
              <div className="text-lg font-semibold text-secondary-700">
                Admin. ${property.administration.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
              </div>
            )}
          </div>

          <div className="border-t border-b border-gray-200 py-4 my-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <FaBed className="text-primary text-xl mx-auto mb-1" />
                <span className="block text-sm text-gray-600">Habitaciones</span>
                <span className="font-semibold">{property.bedrooms}</span>
              </div>
              <div className="text-center">
                <FaBath className="text-primary text-xl mx-auto mb-1" />
                <span className="block text-sm text-gray-600">Baños</span>
                <span className="font-semibold">{property.bathrooms}</span>
              </div>
              <div className="text-center">
                <FaRuler className="text-primary text-xl mx-auto mb-1" />
                <span className="block text-sm text-gray-600">Área</span>
                <span className="font-semibold">{property.area} m²</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center">
              <FaHome className="text-primary mr-2" />
              <span className="text-sm text-gray-600 w-1/3">Tipo:</span>
              <span className="font-medium capitalize">{property.propertyType}</span>
            </div>
            <div className="flex items-center">
              <FaCalendar className="text-primary mr-2" />
              <span className="text-sm text-gray-600 w-1/3">Año:</span>
              <span className="font-medium">{property.yearBuilt}</span>
            </div>
            <div className="flex items-center">
              <FaTag className="text-primary mr-2" />
              <span className="text-sm text-gray-600 w-1/3">Estado:</span>
              <span className="font-medium">{property.status}</span>
            </div>
          </div>

          <div className="mt-6">
            <button className="bg-primary text-white py-3 px-6 rounded-md w-full font-medium hover:bg-primary/90 mb-2">
              Contactar Agente
            </button>
            <button className="border border-primary text-primary py-3 px-6 rounded-md w-full font-medium hover:bg-primary/10">
              Agendar Visita
            </button>
          </div>
        </div>
      </div>
      {/* Property Description */}
      <div className="p-6 border-t border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Descripción</h2>
        <p className="text-gray-600 leading-relaxed">
          {property.description}
        </p>
      </div>
      {/* 360° Viewer */}
      {property.images360 && property.images360.length > 0 && (
        <div className="p-4 border-t border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Vista 360°</h2>
          {console.log('Renderizando Property360Viewer con:', {
            propertyId: property.codpro,
            hasImages360: property.images360?.length > 0,
            images360: property.images360
          })}
          <Property360Viewer propertyId={property.codpro} />
        </div>
      )}

      {/* Property Features */}
      {property.features && property.features.length > 0 && (
        <div className="p-6 border-t border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Características</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-2">
            {property.features.map((feature, index) => (
              <div key={index} className="flex items-center">
                <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Agent Information 
            <div className="p-6 border-t border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Agente Inmobiliario</h2>
        <div className="flex items-center">
          <div className="relative w-20 h-20 rounded-full overflow-hidden">
            <Image
              src={property.agent.image}
              alt={property.agent.name}
              fill
              sizes="80px"
              className="object-cover"
            />
          </div>
          <div className="ml-4">
            <h3 className="font-semibold text-lg">{property.agent.name}</h3>
            <p className="text-gray-600">{property.agent.phone}</p>
            <p className="text-gray-600">{property.agent.email}</p>
          </div>
        </div>
      </div>

      */}


      {/* Modal del mapa (fuera del grid/carrusel) */}
      {showMap && property.latitude && property.longitude && (
        <PropertyMapModal
          latitude={property.latitude}
          longitude={property.longitude}
          onClose={() => setShowMap(false)}
        />
      )}

      {showImageModal && modalImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
          onClick={() => setShowImageModal(false)}
          style={{ cursor: 'zoom-out' }}
        >
          <img
            src={modalImage}
            alt="Imagen ampliada"
            className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-lg"
            onClick={e => e.stopPropagation()}
            style={{ cursor: 'default' }}
          />
          <button
            className="absolute top-4 right-4 text-white text-3xl font-bold z-60"
            onClick={() => setShowImageModal(false)}
            style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '50%', width: 48, height: 48, lineHeight: '48px', textAlign: 'center' }}
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
} 