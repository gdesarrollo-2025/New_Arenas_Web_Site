import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import ProjectCard from "../projects/ProjectCard"
import Image from "next/image";

export default function SuccesCasesSection({ Projects }) {
    return <section className="container-custom flex flex-col items-center gap-2 py-5">
        <h2 className="text-2xl md:text-4xl text-primary">Casos de exito</h2>
        <hr className="border-2 border-primary w-1/2 rounded-full"/>
        <p className="text-center text-balance text-sm">Estos son algunos de nuestros casos de exito y proyectos que hemos potenciado sus ventas</p>
        <h3 className="text-secondary font-semibold text-xl">Proyectos que hemos impulsado</h3>
        <Swiper
            modules={[Autoplay, Navigation]}
            navigation
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            loop
            breakpoints={{
                320: { slidesPerView: 1 },
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
            }}
            className="w-full"
        >
            <div className="border-2 border-green-500 w-full h-full flex">
                {Projects.filter(p => p.status == "Vendido").map((p, idx) => (
                    <SwiperSlide key={idx} className="grid inset-0 place-items-center" >
                        <ProjectCard project={p} />
                    </SwiperSlide>
                ))}
            </div>
        </Swiper>
        <h3 className="text-xl text-secondary font-semibold"> Logros de nuestros proyectos exclusivos</h3>
        <div className="relative flex flex-col lg:flex-row w-full h-screen lg:h-[50vh] xl:h-[60vh] gap-2 ">
            <div className="relative w-full h-full">
                <Image src="/images/Papaya_Banner.webp" fill className=" object-contain"/>
            </div>
            <div className="relative w-full h-full ">
                <Image src="/images/Torre_44_Banner.webp" fill className=" object-contain"/>
            </div>
        </div>

    </section>
}