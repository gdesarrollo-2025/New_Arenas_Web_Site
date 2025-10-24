import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { FaSpinner, FaExclamationTriangle } from 'react-icons/fa';
import Script from 'next/script';
import Head from 'next/head';

const Property360Viewer = ({ propertyId }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [images360, setImages360] = useState([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isPannellumLoaded, setIsPannellumLoaded] = useState(false);
  const [isLoadingImages, setIsLoadingImages] = useState(true);
  const containerRef = useRef(null);
  const viewerRef = useRef(null);
  const containerId = useMemo(() => `pannellum-container-${propertyId}`, [propertyId]);

  // Cargar imágenes 360°
  useEffect(() => {
    const fetchImages = async () => {
      if (!propertyId) return;
      try {
        setIsLoadingImages(true);
        setError(null);
        const response = await fetch(`/api/properties/${propertyId}`, {
          headers: { 'ficha': '1' }
        });
        if (!response.ok) throw new Error(`Error al cargar imágenes: ${response.statusText}`);
        const data = await response.json();
        if (!data?.data?.images360?.length) {
          setImages360([]);
          setError('No hay imágenes 360° disponibles para esta propiedad');
          return;
        }
        const validImages = data.data.images360.filter(
          img => img && img.imageurl && img.imageurl.startsWith('http') && img.thumburl && img.thumburl.startsWith('http')
        );
        if (validImages.length === 0) {
          setError('Las imágenes 360° no están disponibles en este momento');
          return;
        }
        setImages360(validImages);
        setError(null);
      } catch (err) {
        setError('Error al cargar las imágenes 360°. Por favor, intente nuevamente.');
      } finally {
        setIsLoadingImages(false);
        setLoading(false);
      }
    };
    fetchImages();
  }, [propertyId]);

  // Inicializar visor Pannellum cuando todo esté listo
  useEffect(() => {
    if (
      isPannellumLoaded &&
      images360.length > 0 &&
      containerRef.current &&
      !loading &&
      !isLoadingImages
    ) {
      try {
        // Limpiar visor anterior si existe
        if (viewerRef.current && viewerRef.current.destroy) {
          viewerRef.current.destroy();
          viewerRef.current = null;
        } else if (window.pannellum && window.pannellum.getViewer) {
          const existing = window.pannellum.getViewer(containerId);
          if (existing) existing.destroy();
        }
        // Inicializar visor
        viewerRef.current = window.pannellum.viewer(containerId, {
          type: 'equirectangular',
          panorama: images360[activeImageIndex].imageurl,
          autoLoad: true,
          showControls: true,
          showZoomCtrl: true,
          showFullscreenCtrl: true,
          compass: true,
          hfov: 100,
          minHfov: 50,
          maxHfov: 120,
          autoRotate: -2,
          backgroundColor: [0, 0, 0],
          onError: (errorMsg) => {
            setError(`Error al cargar la imagen 360°: ${errorMsg}`);
            setLoading(false);
          },
          onLoad: () => {
            setLoading(false);
          }
        });
        // Log para depuración
        console.log('Pannellum inicializado en', containerId, 'con', images360[activeImageIndex].imageurl);
      } catch (err) {
        setError('Error al inicializar el visor 360°. Por favor, recargue la página.');
        setLoading(false);
        console.error('Error al inicializar Pannellum:', err);
      }
    }
    // Cleanup al desmontar
    return () => {
      if (viewerRef.current && viewerRef.current.destroy) {
        viewerRef.current.destroy();
        viewerRef.current = null;
      }
    };
  }, [isPannellumLoaded, images360, activeImageIndex, loading, isLoadingImages, containerId]);

  // Cargar script y CSS de Pannellum
  // Solo se marca como cargado cuando window.pannellum está disponible
  useEffect(() => {
    if (isPannellumLoaded) return;
    const check = setInterval(() => {
      if (window.pannellum) {
        setIsPannellumLoaded(true);
        clearInterval(check);
      }
    }, 200);
    return () => clearInterval(check);
  }, [isPannellumLoaded]);

  return (
    <div className="relative w-full bg-white rounded-lg shadow-md overflow-hidden" data-testid="viewer-wrapper">
      {/* Loading spinner */}
      {(loading || isLoadingImages || !isPannellumLoaded) && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="mt-4 text-gray-600 text-center">
              {!isPannellumLoaded 
                ? 'Cargando visor 360°...' 
                : isLoadingImages 
                  ? 'Cargando imágenes 360°...' 
                  : 'Inicializando visor 360°...'}
            </p>
            <p className="mt-2 text-sm text-gray-500 text-center">
              {!isPannellumLoaded 
                ? 'Cargando biblioteca del visor...' 
                : 'Esto puede tomar unos momentos, por favor espere...'}
            </p>
            {!isPannellumLoaded && (
              <button 
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
              >
                Reintentar carga
              </button>
            )}
          </div>
        </div>
      )}

      {/* Error message */}
      {error && !loading && !isLoadingImages && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-center">{error}</p>
          <p className="text-sm text-red-500 text-center mt-2">
            Si el problema persiste, por favor intente recargar la página.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 w-full px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
          >
            Recargar página
          </button>
        </div>
      )}

      {/* Viewer container */}
      <div 
        ref={containerRef}
        id={containerId}
        className={`w-full transition-opacity duration-500 ${
          loading || isLoadingImages ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ 
          height: '500px',
          visibility: loading || isLoadingImages ? 'hidden' : 'visible'
        }}
        data-testid="pannellum-container"
      />

      {/* Thumbnails */}
      {images360.length > 1 && !loading && !isLoadingImages && !error && (
        <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
          {images360.map((image, index) => (
            <button
              key={index}
              onClick={() => setActiveImageIndex(index)}
              className={`relative shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-colors ${
                activeImageIndex === index
                  ? 'border-primary'
                  : 'border-transparent hover:border-gray-300'
              }`}
            >
              <img
                src={image.thumburl}
                alt={`Vista 360° ${index + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}

      {/* Scripts */}
      <Head>
        <link 
          rel="stylesheet" 
          href="https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css"
        />
      </Head>
      <Script
        id="pannellum-script"
        src="https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (window.pannellum) setIsPannellumLoaded(true);
        }}
        onError={(e) => {
          setError('Error al cargar el visor 360°. Por favor, recargue la página.');
        }}
      />
    </div>
  );
};

export default Property360Viewer;