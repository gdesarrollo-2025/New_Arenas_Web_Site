import { Swiper, SwiperSlide } from "swiper/react";
import { Parallax, Autoplay } from "swiper/modules";
import Image from "next/image";

import CardHistory from "./CardHistory";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/parallax";

export default function HistorySection() {
    const CardHistories = [
        {
            title: "Fundación",
            description: "Fundada en 1943 por Jorge Enrique Arenas en el centro de la ciudad de Barranquilla, tenemos 80 Años de Experiencia, nos hicimos miembros fundadores junto a otras inmobiliarias de la Lonja de Propiedad Raíz de Barranquilla.",
        },
        {
            title: "Arenas S.A.",
            description: "En 1989 nos trasladamos al norte de la ciudad, bajo la dirección de Álvaro Arenas.",
        },
        {
            title: "Prado",
            description: "En el 2001 cambiamos nuestro nombre a Arenas S.A. la imagen corporativa y en ese mismo año obtuvimos el certificado de Calidad de ICONTEC.",
        },
        {
            title: "Cartagena",
            description: "En el 2002 Se realizó la apertura de nuestra sede en Cartagena, en el mismo año empezó nuestra alianza con El Libertador de Seguros Bolívar.",
        },
        {
            title: "San Jorge",
            description: "En 2012 nos trasladamos una nueva sede en Barranquilla, más amplia y cómoda.",
        },
        {
            title: "Gran Boulevard",
            description: "En 2014 estrenamos una nueva sede Comercial Gran Boulevard y cambiamos la imagen corporativa.",
        },
        {
            title: "Dirección de proyectos",
            description: "En el año 2014 se crea el departamento de proyectos.",
        },
        {
            title: "Equipo digital",
            description: "Buscando estar a la vanguardia del mercado se crea el equipo de atención digital en diciembre de 2021.",
        },
        {
            title: "Reconocimiento FEDELONJAS",
            description: `Fedelonjas entrega el reconocimiento "Hernando Luque Ospina" en la categoría "Vida y Obra” al Sr. Álvaro Arenas como testimonio a sus años de labor`,
        },
        {
            title: "Arenas Marketing",
            description: "Nace la agencia de Marketing de Arenas y se crea el establecimiento comercial en 2024.",
        }
    ]
    return (
        <section className="container-custom py-10 " >
            <div className="flex flex-col lg:flex-row justify-between gap-4 items-center h-auto lg:h-150 ">
                <div className=" relative flex flex-col items-center gap-10 pr-2  w-full lg:w-5/12 ">
                    <div className=" border-b-4 rounded-b-lg  text-center p-2 border-primary w-11/12 ">
                        <h2 className="text-2xl font-medium">Somos Arenas</h2>
                        <h1 className="text-4xl font-semibold text-primary ">Conoce nuestra historia</h1>
                    </div>
                    <p className="text-lg px- text-justify">Con 82 años de experiencia y presencia en Barranquilla y Cartagena, contamos con 3 sedes,
                        múltiples salas de venta, además de una gran fuerza comercial y un equipo comprometido que nos
                        consolidan como una de las inmobiliarias líderes en la región Caribe.</p>
                </div>
                <div className="relative w-full lg:w-6/12 h-150 lg:h-full  ">
                    <div className="absolute h-full w-full inset-shadow-md  rounded-xl z-3 " />
                    <Swiper
                        modules={[Autoplay, Parallax]}
                        parallax={true}
                        slidesPerView={1}
                        speed={600}
                        autoplay={{ delay: 6000, disabledOnInteraction: false }}
                        loop
                        className="isolate text-center w-full h-full relative rounded-xl flex items-center content-center">
                        <Image src="/images/numbers1.webp" className="object-cover mix-blend-multiply" alt="historia grupos arenas" fill sizes="(max-width: 768) 90vw, 50vw" priority={true} />
                        <div className="absolute inset-0 bg-primary/80"/>
                        {CardHistories.map((card, index) => (
                            <SwiperSlide key={index} className="items-center content-center  p-12 ">
                                <CardHistory title={card.title} description={card.description} index={index}/>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    )
}