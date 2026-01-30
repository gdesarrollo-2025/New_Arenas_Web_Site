import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { FaHouseUser, FaKey, FaBriefcase, FaUserTie } from "react-icons/fa"

import InfoSection from "../../components/rent_and_sell/InfoSection"

const InfoPropietarios = {
    name: ["Para propietarios", "Tu arriendo, seguro y sin preocupaciones"],
    description: 'En Arenas sabemos que encontrar el inmueble ideal no es solo cuestión de buscar, sino de sentirse acompañado en cada paso. Por eso ponemos a tu disposición un equipo que te asesora, te guía y te facilita todo el proceso para que arriendes con confianza, rapidez y tranquilidad.',
    cards: [
        {
            title: "Seguridad y Respaldo",
            items: ["Poliza de seguro", "Recaudo y pago mensual puntual", "Anticipos de pagos cuando lo necesite"]
        },
        {
            title: "Comercialización efectiva",
            items: ["Amplia fuerza de ventas", "Publicidad 360 (portales, redes, vallas, prensa)", "Sugerencia de precio según mercado"]
        },
        {
            title: "Gestión total del inmueble",
            items: ["Pago de impuestos, servicios y administración", "Servicio de reparaciones", "Elaboración de documentos legales"]
        },
        {
            title: "Beneficios adicionales",
            items: ["Investigación económica de arrendatarios", "Descuentos especiales en productos y servicios"]
        }
    ],
    link: { href: "", text: "Quiero poner mi inmueble en arriendo" }
}

const infoArrendatarios = {
    name: ["Para arrendatarios", "Encuentra tu hogar facil y sin complicaciones"],
    description: "En Arenas entendemos que tu inmueble es una inversión importante y que administrarlo requiere experiencia, respaldo y seguridad. Por eso te ofrecemos un servicio integral de arriendo que protege tus ingresos, cuida tu propiedad y te libera de preocupaciones.",
    cards: [
        {
            title: "Encuentra rápido",
            items: ["Amplio inventario (+4000 inmuebles)", "Captadores dedicados según tu necesidad", "Resultado rápido del estudio de arrendamiento"]
        },
        {
            title: "Acompañamiento real",
            items: ["Asesoría personalizada", "Acompañamiento en visitas", "Arrendatarios compuestos (más facilidad para aplicar)"]
        },
        {
            title: "Todo más fácil",
            items: ["Pago de impuestos, servicios y administración", "Firma digital desde cualquier lugar", "Múltiples medios de pago (PSE, cajero, bancos, Olímpica)"]
        },
    ],
    link: { href: "", text: "Quiero poner mi inmueble en arriendo" }
}

const infoVendedores = {
    name: ["Para vendedores", "Vende con tranquilidad y  respaldo profesional."],
    description: "Vender un inmueble va más allá de publicarlo. En Arenas combinamos estrategia comercial, asesoría jurídica y una amplia fuerza de ventas para que tu propiedad tenga la visibilidad correcta y logres una negociación segura y exitosa.",
    cards: [{
        title: "Vende con respaldo",
        items: ["+130 colaboradores en fuerza de ventas", "Publicidad 360", "Sugerencia de precio basada en mercado"]
    },
    {
        title: "Tranquilidad legal",
        items: ["Asesoría jurídica", "Elaboración de documentos", "Acompañamiento hasta el cierre del negocio"]
    },
    ],
    link: { href: "", text: "Quiero poner mi inmueble en arriendo" }
}

const infoCompradores = {
    name: ["Para compradores", "Compra con confianza y respaldo profesional."],
    description: "Comprar un inmueble es una de las decisiones más importantes de tu vida. En Arenas te acompañamos desde la búsqueda hasta el cierre del negocio, brindándote asesoría experta, respaldo jurídico y acceso a un amplio portafolio de inmuebles para que compres con total tranquilidad.",
    cards: [{
        title: "Más opciones, menos vueltas",
        items: ["+4.000 inmuebles disponibles", "Captadores según tu demanda"]
    },
    {
        title: "Comercialización efectiva",
        items: ["Asesoría personalizada", "Asesoría jurídica", "Apoyo en créditos hipotecarios", "Documentación legal"]
    },
    ],
    link: { href: "", text: "Quiero poner mi inmueble en arriendo" }
}

export default function RentAndSell() {
    const [content, setContent] = useState("Propietario")

    return (
        <>
            <Head>
                <title>Locate Us | Arenas Real State</title>
                <meta name="description" content="Find and explore the best properties for sale and rent" />
                <link rel="icon" type="image/webp" href="/FAVICON.webp" />
            </Head>
            <div className="">
                <section className="relative h-[70vh]  flex flex-col justify-end-safe">
                    <Image src="/images/RentSell.webp" fill className="object-cover" priority />
                    <div className="bg-linear-to-r from-secondary  from-50% to-transparent absolute w-full h-full backdrop-blur-xs mix-blend-multiply" />
                    <div className="container-custom  w-full flex flex-col gap-5 py-5 z-20 text-white mb-15">
                        <h1 className="w-full sm:w-[60%] text-3xl text-balance">Arrienda, vende o encuentra tu inmueble con el respaldo de Arenas</h1>
                        <p>Soluciones inmobiliarias completas para propietarios, compradores, arrendatarios y vendedores.</p>

                    </div>
                </section>
                <section className=" container-custom relative flex flex-col ">
                    <div className="bg-white absolute rounded-sm overflow-hidden -top-4 self-center grid grid-cols-2 sm:flex divide-x-2  h-fit sm:h-10 justify-between text-center">
                        <button type="button"
                            className={`text-sm grow h-full px-2 py-1 flex items-center gap-2 ${content == "Propietario" ? "bg-accent text-white" : "bg-white text-accent"} transition-all`}
                            onClick={() => setContent("Propietario")}> <FaHouseUser className="text-lg" />Quiero arrendar</button>
                        <button type="button"
                            className={`text-sm grow h-full px-2 py-1 flex items-center gap-2 ${content == "Arrendatario" ? "bg-accent text-white" : "bg-white text-accent"} transition-all`}
                            onClick={() => setContent("Arrendatario")}> <FaKey className="text-lg" /> Busco un arriendo</button>
                        <button type="button"
                            className={`text-sm grow h-full px-2 py-1 flex items-center gap-2 ${content == "Vendedor" ? "bg-accent text-white" : "bg-white text-accent"} transition-all`}
                            onClick={() => setContent("Vendedor")}> <FaBriefcase className="text-lg" /> Quiero vender</button>
                        <button type="button"
                            className={`text-sm grow h-full px-2 py-1 flex items-center gap-2 ${content == "Comprador" ? "bg-accent text-white" : "bg-white text-accent"} transition-all`}
                            onClick={() => setContent("Comprador")}> <FaUserTie className="text-lg" /> Quiero Comprar</button>
                    </div>
                    {/* Propietario Arriendos */}
                    {(content == "Propietario") &&
                        <InfoSection Infocard={InfoPropietarios} />
                    }
                    {/* Arrendatario */}
                    {(content == "Arrendatario") &&
                        <InfoSection Infocard={infoArrendatarios} />
                    }
                    {/* Vendedor */}
                    {(content == "Vendedor") &&
                        <InfoSection Infocard={infoVendedores} />
                    }
                    {/* Comprador */}
                    {(content == "Comprador") &&
                        <InfoSection Infocard={infoCompradores} />
                    }
                </section>
                <section className="relative flex justify-center  items-center h-[50vh]">
                    <Image src="/images/RentAndSell_2.webp" fill className="object-cover"/>
                    <div className="absolute bg-secondary mix-blend-multiply backdrop-blur-xs w-full h-full"/>
                    <div className=" w-full h-full bg-linear-to-b from-55% from-light to-transparent flex items-center justify-center z-20 gap-2 ">
                        <hr className="border-2 rounded-full border-primary w-15" />
                        <h2 className="italic text-center text-primary"> En Arenas, acompañamos tus decisiones para construir un futuro seguro </h2>
                        <hr className="border-2 rounded-full border-primary w-15" />
                    </div>
                </section>
            </div>
        </>
    )
}