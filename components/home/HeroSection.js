'use client'
import { useState } from 'react';
import Image from 'next/image';
import { FaArrowRight } from 'react-icons/fa';
import dynamic from 'next/dynamic';
import SearchBar from '../layout/SearchBar';
import HeroTitle from './HeroTitle';

const HeroSearch = dynamic(() => import("./HeroSearch"))


export default function HeroSection() {

  const [filtersOn, setFiltersOn] = useState(false);

  return (
    <section className="relative select-none  h-[90vh] lg:h-[80vh]">
      <div className="flex relative h-full overflow-hidden ">
        {/* Imagen de fondo */}
        <Image src="/images/hero-house.webp" alt="Casa hero" fill  className="object-cover" priority />
        {/* Capa oscura solo en la parte inferior */}
        <div className="absolute backdrop-blur-[2px] bg-black/50 h-full w-full" />
        {/* Contenido principal */}
        <div className="z-10 flex flex-col lg:flex-row w-full h-fit self-center justify-self-center items-center justify-around">
          {/* Texto principal */}
          <div className="flex flex-col min-w-1/2 max-w-3xl justify-center h-fit">
            <HeroTitle />
            {!filtersOn &&
              <div className="text-center ">
                <p className="text-white text-center"> Inicia tu búsqueda rápida por ciudad, barrio o código</p>
                <SearchBar />
                <p onClick={() => { setFiltersOn(true); console.log(filtersOn) }} className="text-white hover:text-accent active:text-accent/75">¿Prefieres usar filtros adicionales?</p>
              </div>
            }
          </div>
          {/* Formulario sobre la imagen, alineado a la derecha */}
          {filtersOn &&
            <HeroSearch setFiltersOn={setFiltersOn} />
          }
        </div>
      </div>
    </section>
  );
} 