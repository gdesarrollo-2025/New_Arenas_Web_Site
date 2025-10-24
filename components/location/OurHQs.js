import { useEffect, useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

import HQMainSwiper from './HQMainSwiper';
import HQInfoSwiper from './HQInfoSwiper';

import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/controller';
import 'swiper/css/effect-fade';

export default function OurHQs() {
    const [firstSwiper, setFirstSwiper] = useState(null);
    const [secondSwiper, setSecondSwiper] = useState(null);

    const HQs = [{ src: "/images/BarranquillaFoto.jpg", title: "Gran Boulevard", city: "Barranquilla", address: "Calle 106 # 50 Esquina", phone: "6053859191", coords: { lat: "11.014136275825265", lng: "-74.83636444272058" } },
    { src: "/images/BarranquillaFoto.jpg", title: "Prado", city: "Barranquilla", address: "Cra. 58 # 75 - 78", phone: "6053859191", coords: { lat: "11.00498530383173", lng: "-74.80089167637064" } },
    { src: "/images/CartagenaFoto.jpg", title: "Sede Cartagena", city: "Cartagena", address: "Cra. 2 # 13 - 81", phone: "6056934000", coords: { lat: "10.411544607739524", lng: "-75.55067562698169" } },
    ]

    useEffect(() => {
        // Safe assignment: only when both swipers and their controllers exist
        if (
            firstSwiper &&
            secondSwiper &&
            firstSwiper.controller &&
            secondSwiper.controller
        ) {
            firstSwiper.controller.control = secondSwiper;
            secondSwiper.controller.control = firstSwiper;
        }
    }, [firstSwiper, secondSwiper]);

    const handleNext = () => {
        firstSwiper?.slideNext();
        // secondSwiper will auto-update via controller
    };

    const handlePrev = () => {
        firstSwiper?.slidePrev();
    };

    return (
        <section >
            <div className="flex relative w-full h-150 rounded-lg ">
                <button onClick={handlePrev} className="hidden lg:flex items-center justify-center w-10 h-10 absolute z-2 left-0 top-1/2 rounded-full border-2 border-white text-white active:text-secondary active:border-secondary"><FaAngleLeft className=" h-10 w-10" /></button>
                <button onClick={handleNext} className="hidden lg:flex items-center justify-center w-10 h-10 absolute z-2 right-0 top-1/2 rounded-full border-2 border-white text-white active:text-secondary active:border-secondary"><FaAngleRight className="  h-10 w-10" /></button>
                <HQMainSwiper array={HQs} controller={setFirstSwiper}/>
                <div className="bottom-0  left-1/6 lg:left-1/4 absolute w-2/3 lg:w-1/2  h-5/9 md:h-1/2 border-0">
                    <HQInfoSwiper array={HQs} controller={setSecondSwiper}/>
                </div>
            </div>
        </section>
    )
}