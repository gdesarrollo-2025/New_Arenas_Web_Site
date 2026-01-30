'use client';
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

const Projects=[
    {name:"Guayacanes", around:"P.R. Nuestro Atlántico",city: "08758", area:51, bedrooms:3, bathrooms:2,status:"En Venta", smmlv: true, precio:120, img:""},
    {name:"Guayacanes", around:"P.R. Nuestro Atlántico",city:"08758", area:51, bedrooms:3, bathrooms:2,status:"En Venta", smmlv: true, precio:150, img:""},
    {name:"Unique 76", around:"",city:"", area:0, bedrooms:0, bathrooms:0,status:"Vendido", smmlv: false, precio:0, img:""},
    {name:"Almeria 1", around:"",city:"", area:0, bedrooms:0, bathrooms:0,status:"Vendido", smmlv: false, precio:0, img:""},
    {name:"Icaco", around:"",city:"", area:0, bedrooms:0, bathrooms:0,status:"Vendido", smmlv: false, precio:0, img:""},
    {name:"Parque de La Castellana", around:"",city:"", area:0, bedrooms:0, bathrooms:0,status:"Vendido", smmlv: false, precio:0, img:""},
    {name:"Torre 44", around:"",city:"", area:0, bedrooms:0, bathrooms:0,status:"Vendido", smmlv: false, precio:0, img:""},
    {name:"Almeria 2", around:"",city:"", area:0, bedrooms:0, bathrooms:0,status:"Vendido", smmlv: false, precio:0, img:""},
    {name:"Papaya", around:"",city:"", area:0, bedrooms:0, bathrooms:0,status:"Vendido", smmlv: false, precio:0, img:""},
    {name:"Acuarela del Rio", around:"",city:"", area:0, bedrooms:0, bathrooms:0,status:"Vendido", smmlv: false, precio:0, img:""},
    {name:"Las Acacias", around:"",city:"", area:0, bedrooms:0, bathrooms:0,status:"Vendido", smmlv: false, precio:0, img:""},
    {name:"Montebianco", around:"",city:"", area:0, bedrooms:0, bathrooms:0,status:"Vendido", smmlv: false, precio:0, img:""},
    {name:"Park 68", around:"",city:"", area:0, bedrooms:0, bathrooms:0,status:"Vendido", smmlv: false, precio:0, img:""},
    {name:"Portal del Sol", around:"",city:"", area:0, bedrooms:0, bathrooms:0,status:"Vendido", smmlv: false, precio:0, img:""},
    {name:"", around:"",city:"", area:0, bedrooms:0, bathrooms:0,status:"Vendido", smmlv: false, precio:0, img:""},
]
    


export default function ProjectsAndCompanies() {

    const formRef = useRef()
    const [open, setOpen] = useState(false)

    const onShowForm = () => {
        setOpen(!open);
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
                <title>Locate Us | Arenas Real State</title>
                <meta name="description" content="Find and explore the best properties for sale and rent" />
                <link rel="icon" type="image/webp" href="/FAVICON.webp" />
            </Head>
            <div>
                <section className="relative h-[70vh] flex flex-col justify-center ">
                    <Image src="/images/ProjectsCompanies.webp" fill className="object-cover" priority />
                    <div className="absolute bg-linear-to-r from-secondary from-50% to-transparent backdrop-blur-xs w-full h-full mix-blend-multiply" />
                    <div className="container-custom z-10 w-full h-full flex flex-col justify-center text-white gap-5">
                        <h1>Proyectos inmobiliarios que transforman ciudades</h1>
                        <p>Descubre proyectos desarrollados por constructoras aliadas, seleccionados por su calidad, ubicación y proyección.</p>
                        <button onClick={()=> onShowForm}type="button" className="border-2 rounded-[10px] w-fit px-2 py-1 active:border-accent active:text-accent">Quiero saber mas</button>
                    </div>
                </section>
                <section ref={formRef} className="container-custom" >
                </section>
            </div>
        </>
    )
}