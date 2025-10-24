import { MapContainer, TileLayer, Marker, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect } from 'react';

export default function PropertyMapModal({ latitude, longitude, onClose }) {
  const lat = parseFloat(latitude);
  const lng = parseFloat(longitude);

  useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    });
  }, []);

  // Handler para cerrar el modal al hacer click fuera del contenido
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-lg shadow-lg relative w-full max-w-2xl h-[500px] flex flex-col">
        <button
          className="absolute -top-5 right-0 rounded-full shadow-sm p-2 text-gray-500 hover:text-primary text-2xl font-bold z-20"
          onClick={onClose}
          style={{ transform: 'translateY(-50%)' }}
        >
          &times;
        </button>
        <div className="flex-1 rounded-b-lg overflow-hidden">
          <MapContainer
            center={[lat, lng]}
            zoom={17}
            style={{ width: '100%', height: '100%' }}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/*<Marker position={[lat, lng]} />*/}
            <Circle
              center={[lat, lng]}
              radius={100}
              pathOptions={{ color: '#2563eb', fillColor: '#2563eb', fillOpacity: 0.2 }}
            />
          </MapContainer>
        </div>
      </div>
    </div>
  );
}