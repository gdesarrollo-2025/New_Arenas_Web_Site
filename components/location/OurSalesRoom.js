import { useState } from 'react';
import dynamic from 'next/dynamic';

const SalesCard = dynamic(() => import('./SalesCard'), { ssr: false });

export default function OurSalesRoom() {
  const [selectedCity, setSelectedCity] = useState('Barranquilla');

  const Sales = [
    { title: 'Papaya Aptos', address: 'Cra 68 # 69 - Esq.', city: 'Barranquilla', coords: { latitud: '10.9820', longitud: '-74.7850' } },
    { title: 'Guayacanes C.R.', address: 'C.C. Nuestro Atlántico', city: 'Soledad', coords: { latitud: '10.9685', longitud: '-74.8000' } },
    { title: 'Acuarela del Río', address: 'Cra.66B # 68 - Esq.', city: 'Barranquilla', coords: { latitud: '11.0015', longitud: '-74.8170' } },
    { title: 'Torre44 Aptos', address: 'Calle50 # 44 Esq.', city: 'Barranquilla', coords: { latitud: '10.9920', longitud: '-74.8050' } },
    { title: 'Parque de La Castellana', address: 'Éxito La Castellana', city: 'Cartagena', coords: { latitud: '10.3990', longitud: '-75.5070' } },
    { title: 'Montebianco Aptos', address: 'Los Alpes', city: 'Cartagena', coords: { latitud: '10.4050', longitud: '-75.5140' } },
    { title: 'Almería', address: 'Cra 22 Sur # 80', city: 'Barranquilla', coords: { latitud: '10.9620', longitud: '-74.7840' } },
    { title: 'ICACO', address: 'Cra 50B # 42, Esq.', city: 'Barranquilla', coords: { latitud: '10.9870', longitud: '-74.8060' } },
    { title: 'De Cambil 55', address: 'Cra 55 # 79 - 150', city: 'Barranquilla', coords: { latitud: '10.9950', longitud: '-74.7900' } },
    { title: 'Unique 76', address: 'Cra 39 # 75B', city: 'Barranquilla', coords: { latitud: '10.9810', longitud: '-74.8080' } },
  ];

  const handleChangeCity = (city) => {
    setSelectedCity(city);
  };

  return (
    <section className="flex flex-col bg-white h-auto items-center py-10 gap-10 px-5">
      <div className="flex flex-col items-center border-b-4 rounded-lg px-5 py-2 border-primary">
        <h2 className="text-2xl font-medium">Estas son nuestras</h2>
        <h1 className="text-4xl font-semibold text-primary text-center">Salas de venta de proyectos</h1>
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          className={`px-4 py-2 rounded border ${selectedCity === 'Barranquilla' ? 'bg-primary text-white' : 'bg-gray-100'}`}
          onClick={() => handleChangeCity('Barranquilla')}
        >
          Barranquilla
        </button>
        <button
          className={`px-4 py-2 rounded border ${selectedCity === 'Soledad' ? 'bg-primary text-white' : 'bg-gray-100'}`}
          onClick={() => handleChangeCity('Soledad')}
        >
          Soledad
        </button>
        <button
          className={`px-4 py-2 rounded border ${selectedCity === 'Cartagena' ? 'bg-primary text-white' : 'bg-gray-100'}`}
          onClick={() => handleChangeCity('Cartagena')}
        >
          Cartagena
        </button>
      </div>

      {/* SALES ROOMS GRID */}
      <div className="container-custom flex flex-col gap-5 sm:grid sm:grid-cols-2 sm:gap-10 w-full transition-all duration-1000 ease-in-out">
        {Sales.filter((room) => room.city === selectedCity).map((room) => (
          <SalesCard
            key={room.title}
            title={room.title}
            latitude={room.coords.latitud}
            longitude={room.coords.longitud}
            address={room.address}
          />
        ))}
      </div>
    </section>
  );
}