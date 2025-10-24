import { useEffect } from 'react';
import { FaPhoneAlt, FaLocationArrow } from "react-icons/fa";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function HQCard({ src, title, city, address, phone, latitude, longitude }) {
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
        <div className=" flex flex-col items-center bg-white w-full h-full py-5 px-7 rounded-t-2xl "
        >
            <h2 className="text-lg sm:text-2xl font-medium" >{city}</h2>
            <h1 className="text-2xl sm:text-4xl font-semibold text-primary">{title}</h1>
            <p className="flex text-md sm:text-lg font-medium gap-2 items-center justify-between md:justify-normal w-full md:w-auto"><FaLocationArrow className="text-secondary" />{address}</p>
            <p className="flex text-md sm:text-lg font-medium gap-2 items-center justify-between md:justify-normal w-full md:w-auto"><FaPhoneAlt className="text-secondary" /> {phone}</p>
            <MapContainer
                center={[lat, lng]}
                zoom={17}
                style={{ width: '100%', height: '90%' }}
                scrollWheelZoom={true}
                className="rounded-lg pointer-events-none">
                <TileLayer
                    attribution='&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png">
                </TileLayer>
                <Marker position={[lat, lng]} />
            </MapContainer>
        </div>
    )
}