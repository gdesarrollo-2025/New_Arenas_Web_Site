import Image from 'next/image';
import { FaArrowRight } from 'react-icons/fa';
import dynamic from 'next/dynamic';
import SearchBar from '../layout/SearchBar';
import HeroTitle from './HeroTitle';

const HeroSearch = dynamic (() => import("./HeroSearch"))


export default function HeroSection() {
  return (
    <section className="bg-white  select-none ">
      <div className="relative overflow-hidden  h-full lg:h-[600px] flex items-center justify-center">
        {/* Imagen de fondo */}
        <Image
          src="/images/hero-house.webp"
          alt="Casa hero"
          fill
          sizes="100vw"
          className="mask-b-from-80% mask-b-to-95% object-cover"
          priority
        />
        {/* Capa oscura solo en la parte inferior */}
        <div className="absolute bg-black/50 mask-b-from-80% mask-b-to-95% h-full w-full" />
        {/* Contenido principal */}
        <div className="relative z-10 flex flex-col lg:flex-row w-full h-full items-center justify-around px-8 py-10 ">
          {/* Texto principal */}
          <div className="flex-1 flex flex-col max-w-2xl justify-center ">
            <HeroTitle/>
            <p className="text-white"> Inicia con tu busqueda rapida</p>
            <SearchBar/>
          </div>
          {/* Formulario sobre la imagen, alineado a la derecha */}
          <HeroSearch/>
        </div>
      </div>
    </section>
  );
} 