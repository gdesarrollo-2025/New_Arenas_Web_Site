import {Swiper, SwiperSlide} from 'swiper/react';
import {Autoplay, Controller, EffectFade} from 'swiper/modules';
import dynamic from 'next/dynamic';

const HQCard = dynamic(() => import('./HQCard'), {ssr: false});

import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/controller';
import 'swiper/css/effect-fade';

export default function HQInfoSwiper({ array, controller }) {
    return (
        <Swiper
            onSwiper={controller}
            modules={[Autoplay, Controller, EffectFade]}
            effect="fade"
            slidesPerView={1}
            speed={1500}
            loop
            className="w-full h-full"
            touchRatio={1}
            touchStartPreventDefault={false}
            breakpoints={{
                769: { touchRatio: 0, }
            }}
        >
            {array.map((hq, index) => (
                <SwiperSlide key={index} className="no-swipping w-full h-full flex text-center items-center content-center">
                    <HQCard src={hq.src} title={hq.title} city={hq.city} address={hq.address} phone={hq.phone} latitude={hq.coords.lat} longitude={hq.coords.lng} />
                </SwiperSlide>
            ))}

        </Swiper>
    )
}