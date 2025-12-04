import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';
import { useEffect, useState } from 'react';

const testimonials = [
  { name: 'Macha Mila', img: '/images/avatar1.webp', text: "Working with this team was a pleasure. They understood our vision and helped us find a property that exceeded our expectations. We couldn't have done it without them." },
  { name: 'John Doe', img: '/images/avatar2.webp', text: 'Great experience! Highly recommended for anyone looking for a new home.' },
  { name: 'Jane Smith', img: '/images/avatar3.webp', text: 'Professional, efficient, and friendly service. Thank you!' },
  { name: 'Emily Johnson', img: '/images/avatar4.webp', text: 'They made the home buying process so easy and stress-free. I am so grateful for their help!' },
  { name: 'Michael Brown', img: '/images/avatar5.webp', text: 'I found my dream home thanks to their dedicated team. Highly recommend!' },
  { name: 'Sarah Davis', img: '/images/avatar6.webp', text: 'Exceptional service and attention to detail. I felt supported every step of the way.' },
];

export default function Testimonials() {
  

  return (
    <section className="py-14 bg-white px-5">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">What Our Clients Say About Us</h2>
        <Swiper
          modules={[FreeMode, Autoplay]}
          freeMode={{ enabled: true, momentum: false }}
          spaceBetween={20}
          speed={12000}
          autoplay={{ delay: 0, disableOnInteraction: false }}
          loop={true}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}>
          {testimonials.map((t, idx) => (
            <SwiperSlide className="h-full py-2" key={idx}>
              <div key={idx} className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between items-center h-80">
                <div className="relative rounded-full overflow-hidden size-24 ">
                  <Image src={t.img} alt={t.name} className="object-cover" fill sizes="96px" />
                </div>
                <p className="text-gray-700 mb-4 text-center wrap text-sm">{t.text}</p>
                <span className="font-semibold text-gray-900">{t.name}</span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
} 