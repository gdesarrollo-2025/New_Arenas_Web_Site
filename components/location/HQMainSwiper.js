import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Controller } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/controller';

export default function HQMainSwiper({ array, controller }) {
    return (
        <Swiper
            onSwiper={controller}
            modules={[Autoplay, Controller]}
            slidesPerView={1}
            speed={1500}
            autoplay={{ delay: 10000, disabledOnInteraction: true }}
            loop
            className="h-full w-full"
            touchRatio={1}
            touchStartPreventDefault={false}
            breakpoints={{
                769: { touchRatio: 0, }
            }}
        >
            {array.map((hq, index) => (
                <SwiperSlide key={index} className="no-swipping w-full h-full flex items-center content-center ">
                    <Image src={hq.src} alt={`Sede ${hq.title}`} fill priority={index === 0}  sizes="100vw" className="object-cover" />
                    <div className={`w-full h-full relative bg-primary mix-blend-multiply backdrop-blur-xs`}/>
                </SwiperSlide>
            ))}
        </Swiper>
    )
}