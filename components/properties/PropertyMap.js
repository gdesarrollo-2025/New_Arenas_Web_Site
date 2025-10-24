import { MapContainer, TileLayer, Marker, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function PropertyMap({ latitude, longitude }) {
  const lat = parseFloat(latitude);
  const lng = parseFloat(longitude);

  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden">
      <MapContainer
        center={[lat, lng]}
        zoom={17}
        style={{ width: '100%', height: '100%' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lng]} />
        <Circle
          center={[lat, lng]}
          radius={20} // 20 metros
          pathOptions={{ color: '#2563eb', fillColor: '#2563eb', fillOpacity: 0.2 }}
        />
      </MapContainer>
    </div>
  );
}