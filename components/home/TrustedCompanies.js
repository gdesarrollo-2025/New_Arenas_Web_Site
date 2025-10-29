import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay} from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

const companyLogos = Array.from({ length: 15 }, (_, i) => `/images/company${i + 1}.webp`);

export default function TrustedCompanies() {
  return (
    <section className="bg-white py-16 select-none">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
          {/* Columna izquierda */}
          <div className="flex-1 flex flex-col gap-2">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              15+ Constructoras <br />Confían en nosotros.
            </h2>
            <div className="flex items-center gap-2 mt-2">
              {/* Avatares */}
              <Image src="/images/avatar1.webp" alt="user1" className="w-8 h-8 rounded-full border-2 border-white -ml-0" width={32} height={32}/>
              <Image src="/images/avatar2.webp" alt="user2" className="w-8 h-8 rounded-full border-2 border-white -ml-2" width={32} height={32}/>
              <Image src="/images/avatar3.webp" alt="user3" className="w-8 h-8 rounded-full border-2 border-white -ml-2" width={32} height={32}/>
              <span className="ml-2 text-xs text-gray-500">3K+ Clientes</span>
              <span className="ml-1 text-orange-500 text-lg font-bold">★</span>
            </div>
          </div>
          {/* Acento */}
          <div className="hidden md:block text-orange-500 text-6xl font-bold">*</div>
          {/* Columna derecha */}
          <div className="flex-1 flex flex-col gap-4 md:items-end">
            <p className="text-gray-700 text-base md:text-right">
              Your leading real estate advocate, transforming houses into dreams. Trust us to expertly guide you home. 45,000 apartments & home for sell, rent & mortgage.
            </p>
            <div className="flex gap-4 mt-2">
              <button className="bg-black text-white rounded-full px-6 py-2 font-semibold text-sm hover:bg-gray-900 transition">More Listing</button>
              <button className="text-gray-900 font-semibold text-sm flex items-center gap-1 hover:underline transition">
                Request a Callback <span className="text-lg">&rarr;</span>
              </button>
            </div>
          </div>
        </div>
        {/* Carrusel de logos */}
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
                <Image src={src} alt={`Company${idx + 1}`} className="object-contain select-none" fill sizes=""/>
              </div>
              
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
} 