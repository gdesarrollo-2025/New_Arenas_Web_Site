'use client';


import Head from "next/head";
import Image from "next/image";
import { useRef, useState } from "react";
import ProjectCard from "../../components/projects/ProjectCard";
import Footer from "../../components/layout/Footer";

import SearchProjectsSection from "../../components/projects/SearchProjectsSection";
import SuccesCasesSection from "../../components/Companies/SuccessCasesSection";
import OurServicesSection from "../../components/Companies/OurServicesSection";
import OurAlliesSection from "../../components/Companies/OurAlliesSection";

const Projects = [
    { name: "Guayacanes Aptos", around: "P.R. Nuestro Atlántico", city: "Soledad", area: 51, bedrooms: 3, bathrooms: 2, status: "En Venta", smmlv: true, precio: 120, img: "/images/Guayacanes_Aptos.webp", badge: "" , link:""},
    { name: "Guayacanes Casas", around: "P.R. Nuestro Atlántico", city: "Soledad", area: 51, bedrooms: 3, bathrooms: 2, status: "En Venta", smmlv: true, precio: 150, img: "/images/Guayacanes_Casas.webp", badge: "" , link:""},
    { name: "Unique 76", around: "Betania", city: "Barranquilla", area: 32, bedrooms: 3, bathrooms: 2, status: "Ultimas Unidades", smmlv: false, precio: 520000000, img: "/images/Unique_76.webp", badge: "#1 en galeria" , link:""},
    { name: "Almeria 1", around: "Sevilla Real / Los Almendros", city: "Barranquilla", area: 53, bedrooms: 3, bathrooms: 2, status: "Vendido", smmlv: false, precio: 0, img: "/images/Almeria.webp", badge: "" , link:""},
    { name: "Icaco Apartamentos", around: "Barrio Abajo", city: "Barranquilla", area: 56, bedrooms: 2, bathrooms: 2, status: "Lanzamiento", smmlv: true, precio: 145, img: "/images/Icaco.webp", badge: "" , link:"https://arenasinmobiliaria.co/proyecto/icaco-apartamentos/"},
    { name: "Parque de La Castellana", around: "La Castellana", city: "Cartagena", area: 63.31, bedrooms: 3, bathrooms: 2, status: "Lanzamiento", smmlv: false, precio: 0, img: "/images/Parque_de_la_castellana.webp", badge: "" , link:""},
    { name: "Torre 44 Apartamentos", around: "Plaza de la Paz", city: "Barranquilla", area: 59, bedrooms: 3, bathrooms: 2, status: "Vendido", smmlv: false, precio: 0, img: "/images/Torre_44.webp", badge: "#1 en galeria" , link:""},
    { name: "Almeria 2 Apartamentos", around: "Sevilla Real", city: "Barranquilla", area: 54, bedrooms: 3, bathrooms: 2, status: "En Venta", smmlv: true, precio: 116, img: "/images/Almeria_2.webp", badge: "" , link:""},
    { name: "De Cambil 55 Luxury", around: "El Golf", city: "Barranquilla", area: 146.09, bedrooms: 3, bathrooms: 2, status: "En Venta", smmlv: false, precio: 1700000000, img: "/images/DeCambil_55.webp", badge: "" , link:""},
    { name: "Papaya Apartamentos", around: "San francisco", city: "Barranquilla", area: 54, bedrooms: 2, bathrooms: 2, status: "Vendido", smmlv: false, precio: 0, img: "/images/Papaya.webp", badge: "Record en ventas 2022" , link:"https://arenasinmobiliaria.co/proyecto/papaya-apartamentos/"},
    { name: "Acuarela del Rio", around: "Bellavista", city: "Barranquilla", area: 68, bedrooms: 3, bathrooms: 2, status: "En Venta", smmlv: false, precio: 457000000, img: "/images/Acuarela.webp", badge: "" , link:""},
    { name: "Las Acacias Casas", around: "P.R. Nuestro Atlántico", city: "Soledad", area: 64, bedrooms: 3, bathrooms: 1, status: "Vendido", smmlv: false, precio: 0, img: "/images/Las_acacias.webp", badge: "" , link:""},
    { name: "Montebianco", around: "Los Alpes", city: "Cartagena", area: 50, bedrooms: 2, bathrooms: 2, status: "Vendido", smmlv: false, precio: 0, img: "/images/Montebianco.webp", badge: "" , link:""},
    { name: "Park 68", around: "Bellavista", city: "Barranquilla", area: 89, bedrooms: 2, bathrooms: 3, status: "Vendido", smmlv: false, precio: 0, img: "/images/Park_68.webp", badge: "" , link:""},
    { name: "Portal del Sol", around: "Soledad", city: "Soledad", area: 54, bedrooms: 3, bathrooms: 1, status: "Vendido", smmlv: false, precio: 0, img: "/images/Portal_del_sol.webp", badge: "" , link:""},
]



export default function ProjectsAndCompanies() {

    const [state, setState] = useState("Comprador")

    const formRef = useRef()

    const onShowForm = () => {
        setTimeout(() => {
            formRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            })
        }, 50);
    }


    return (
        <>
            <Head>
                <title>Constructoras y Proyectos | Arenas Inmobiliaria</title>
                <meta name="description" content="Find and explore the best properties for sale and rent" />
                <link rel="icon" type="image/webp" href="/FAVICON.webp" />
            </Head>
            <div className="scroll-smooth">
                <section className="relative h-[70vh] flex flex-col justify-center ">
                    <Image src="/images/ProjectsCompanies.webp" fill className="object-cover" priority />
                    <div className="absolute bg-linear-to-r from-secondary from-50% to-transparent backdrop-blur-xs w-full h-full mix-blend-multiply" />
                    <div className="container-custom z-10 w-full h-full flex flex-col justify-center text-white gap-2">
                        <h1 className="text-2xl">Proyectos inmobiliarios </h1>
                        <div className="flex flex-col gap-1">
                            <p className="w-full lg:w-3/4 text-sm">  Con mas 83 años de experiencia inmobiliaria, comercializamos e impulsamos proyectos que transforman ciudades y tus sueños.</p>
                            <p className="w-full text-sm">Que esperas para unirte y comprar la vivienda de tus sueños o comercializar un proyecto con confianza</p>
                        </div>

                        <div className="flex gap-4">
                            <button onClick={() => { setState("Constructora"); onShowForm() }} type="button" className=" rounded-[10px] w-fit px-3 py-2 border-2 border-black bg-accent text-black hover:brightness-110 hover:text-white active:brightness-90 hover:scale-105 active:scale-95 active:text-white/75 transition-all">Quiero buscar un proyecto </button>
                            <button onClick={() => { setState("Comprador"); onShowForm() }} type="button" className=" rounded-[10px] w-fit px-3 py-2 border-2 border-white text-white hover:brightness-150 hover:text-accent hover:border-accent active:brightness-90 hover:scale-105 active:scale-95 active:text-accent/75 transition-all"> Quiero comercializar un proyecto</button>
                        </div>
                    </div>
                </section>
                {(state == "Comprador") && (
                    <div ref={formRef}>
                        <SuccesCasesSection Projects={Projects} />
                        <OurServicesSection />
                        <OurAlliesSection />
                    </div>
                )}
                {(state == "Constructora") && (
                    <SearchProjectsSection formRef={formRef} Projects={Projects} />
                )}
                {/* BUSCADOR */}

                {/* CASOS DE EXITO */}


                <Footer />
            </div>
        </>
    )
}