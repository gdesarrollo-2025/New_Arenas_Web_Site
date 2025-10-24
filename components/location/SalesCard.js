import { useEffect } from 'react';
import { FaLocationArrow } from "react-icons/fa";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function SalesCard({ title, address, latitude, longitude }) {
    const lat = parseFloat(latitude)
    const lng = parseFloat(longitude)

    useEffect(() => {
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
            iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
            iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
            shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        });
    }, []);

    return (
        <div className=" flex flex-col  items-center h-100 w-full p-3 rounded-lg shadow-md/50">
            <h3 className="text-md font-semibold text-primary ">{title}</h3>
            <MapContainer
                center={[lat, lng]}
                zoom={17}
                style={{ width: '100%', height: '100%' }}
                scrollWheelZoom={false}
                className="rounded-lg ">
                <TileLayer
                    attribution='&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png">
                </TileLayer>
                <Marker position={[lat, lng]} />
            </MapContainer>
            <div className="w-full flex items-center gap-2 justify-between ">
                <FaLocationArrow/>
                <p className="text-sm font-medium flex-wrap">{address}</p>
            </div>
        
        </div>
    )
}