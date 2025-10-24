import Image from 'next/image';
import { FaArrowRight } from 'react-icons/fa';
import dynamic from 'next/dynamic';

const HeroSearch = dynamic (() => import("./HeroSearch"))


export default function HeroSection() {
  return (
    <section className="bg-white py-8 px-5 md:py-12 select-none">
      <div className="container-custom relative rounded-3xl overflow-hidden shadow-lg min-h-[600px] flex items-center justify-center">
        {/* Imagen de fondo */}
        <Image
          src="/images/hero-house.jpg"
          alt="Casa hero"
          fill
          sizes="90vw"
          className="object-cover"
          priority
        />
        {/* Capa oscura solo en la parte inferior */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/70 to-transparent z-0" />
        {/* Contenido principal */}
        <div className="relative z-10 flex flex-col md:flex-row w-full h-full items-center justify-between px-8 py-10">
          {/* Texto principal */}
          <div className="flex-1 flex flex-col justify-center">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg leading-tight">Compra, Vende y Renta Propiedades</h1>
            <button className="bg-white text-black font-semibold rounded-full px-5 py-2 w-fit shadow-sm border border-gray-200 hover:bg-gray-100 transition text-sm flex items-center gap-2">
              Explora inmuebles <span className="text-lg"><FaArrowRight/></span>
            </button>
          </div>
          {/* Formulario sobre la imagen, alineado a la derecha */}
          <HeroSearch/>
        </div>
      </div>
    </section>
  );
} 