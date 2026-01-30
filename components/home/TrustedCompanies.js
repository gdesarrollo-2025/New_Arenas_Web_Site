import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import Link from 'next/link';

const companyLogos = Array.from({ length: 15 }, (_, i) => `/images/company${i + 1}.webp`);
const Constructoras = [
  {
    name: "L & A Constructores",
    image: "/images/Constructora_1.webp"
  },
  {
    name: "Constructora ACF",
    image: "/images/Constructora_2.webp"
  },
  {
    name: "OY proyectos",
    image: "/images/Constructora_3.webp"
  },
  {
    name: "Terrapin",
    image: "/images/Constructora_4.webp"
  },
  {
    name: "Arquitectura y Concreto",
    image: "/images/Constructora_5.webp"
  },
  {
    name: "Conconcreto",
    image: "/images/Constructora_6.webp"
  }
]
export default function TrustedCompanies() {
  return (
    <section className="container-custom">
      <div className="container-custom flex flex-col gap-5 items-center py-12">
        <h2 className="text-2xl xl:text-4xl text-bold text-primary ">Proyectos inmobiliarios y constructoras aliadas</h2>
        <hr className="border-2 border-primary w-full lg:w-1/2" />
        <p>Junto a las mejores constructoras, damos forma a los proyectos que impulsan ciudades y sueños.</p>
        <div className="w-full flex flex-col sm:flex-row justify-between  items-center">
          <div className="w-full sm:w-1/2 flex flex-col justify-center text-center md:text-start">
            <div className="text-lg sm:text-2xl">
              <span className="text-7xl font-semibold text-accent">83+</span>
              <p className="font-normal">Años de experiencia en el mercado Inmobiliario</p>
            </div>
            <div className="text-lg sm:text-2xl">
              <span className="text-7xl font-semibold text-accent">15+</span>
              <p className="font-normal">Proyectos inmobiliarios</p>
            </div>
            <div className="text-lg sm:text-2xl">
              <span className="text-7xl font-semibold text-accent">6</span>
              <p className="font-normal">Constructoras aliadas</p>
            </div>
          </div>
          <div className="w-full sm:w-fit grid grid-cols-2 lg:grid-cols-3 gap-4">
            {Constructoras.map((c, idx) => (
              <div key={idx} className="p-2 relative bg-white shadow-md place-self-center flex flex-col items-center rounded-[10px] hover:-translate-y-3 focus-within:-translate-y-3 transition group ">
                <div className="relative size-38 lg:size-35 xl:size-40">
                  <Image src={c.image} fill alt={"Logo " + c.name} className=" object-contain lg:grayscale lg:group-hover:grayscale-0  transition" />
                </div>
                <p className="bottom-0 absolute text-balance text-center opacity-100 lg:opacity-0  lg:group-hover:opacity-100 lg:group-hover:text-accent transition-all duration-300">{c.name}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full">
          <Swiper
            modules={[Navigation, Autoplay]}
            slidesPerView={5}
            spaceBetween={30}
            navigation
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            loop
            className="mt-5 pt-8 "
            breakpoints={{
              320: { slidesPerView: 2 },
              640: { slidesPerView: 3 },
              1024: { slidesPerView: 5 },
            }}
          >
            {companyLogos.map((src, idx) => (
              <SwiperSlide key={idx} className="relative flex items-center justify-items-center ">
                <div className="relative h-14 w-full">
                  <Image src={src} alt={`Company${idx + 1}`} className="object-contain select-none" fill sizes="" />
                </div>

              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div className="h-fit w-full py-10">
        <div className="flex flex-col gap-3 container-custom">
          <h4 className="text-2xl font-normal text-black text-center "> Conoce los proyectos que hoy están transformando la región Caribe</h4>
          <Link href="/#" className="w-fit self-center text-black border-black border-2 hover:text-accent hover:border-accent active:text-accent/75 active:border-accent/75 px-2 py-1 text-balance rounded-[10px] transition-all "> Ver proyectos </Link>
        </div>
      </div>
    </section>
  );
}
