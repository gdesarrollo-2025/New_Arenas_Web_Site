import { useState, useRef } from "react";
import Image from "next/image";
import Head from "next/head";
import Script from "next/script";

import Footer from "../../components/layout/Footer";
import RequestSAC from "../../components/tenants/RequestSAC";
import HubspotForm from "../../components/form/HubspotForm";


import { FaInstagram, FaTiktok } from "react-icons/fa";
export default function TenantsPage() {
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
                <title>Contact Us | Arenas Real State</title>
                <meta name="description" content="Find and explore the best properties for sale and rent" />
                <link rel="icon" type="image/webp" href="/FAVICON.webp" />
            </Head>
            <div className="pt-32">
                <RequestSAC onShowForm={onShowForm} open={open} />
                <div ref={open ? formRef : null}>
                    <HubspotForm visible={open} />
                </div>
                <section className="container-custom my-10 flex flex-col gap-5">
                    <div className="self-center text-center">
                        <p>Elige cómo deseas gestionar tus pagos</p>
                        <h2 className="text-primary">Pagos y facturación</h2>
                        <hr className="w-full border-2 border-primary" />
                    </div>
                    <div className="flex flex-col items-center lg:items-stretch lg:flex-row gap-8 ">
                        <div className="flex flex-col items-center justify-between min-h-full w-6/7 md:w-2/3 lg:w-1/2 rounded-lg shadow-lg/50 lg:hover:scale-105 animate-basic-pulse lg:animate-none transition-all duration-150 p-4 bg-primary text-white ">
                            <h3 className="text-xl md:text-2xl font-semibold"> PSE </h3>
                            <p className="text-sm md:text-lg"> Paga en linea de forma rapida y segura</p>
                            <div className="relative w-full h-60 lg:h-80 ">
                                <Image src="/images/logo-pse-1.webp" fill className="object-contain" alt="PSE" />
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-between min-h-full w-6/7 md:w-2/3 lg:w-1/2 rounded-lg shadow-lg/50 lg:hover:scale-105 animate-basic-pulse-2 lg:animate-none transition-all duration-150 p-4 bg-secondary text-white">
                            <h3 className="text-xl md:text-2xl font-semibold">Facturas</h3>
                            <p className="text-sm md:text-lg"> Descargas tus facturas y cupones de pago con codigo de barras</p>
                            <div className="relative w-full h-55 lg:h-80 ">
                                <Image src="/images/factura.webp" fill className=" object-scale-down p-5 invert" alt="Facturas y Cupon de pago" />
                            </div>
                        </div>
                    </div>
                </section>
                <section className="container-custom my-15 flex flex-col gap-5">
                    <div className="flex flex-col items-center">
                        <p className="text-sm text-center md:text-lg">Consulta y paga tus obligaciones de forma sencilla.</p>
                        <h2 className="text-primary text-center">Guia de pagos y gestion para arrendatarios</h2>
                        <hr className="border-2 border-primary w-full sm:w-4/5 lg:w-3/5" />
                    </div>
                    <div className="flex flex-col gap-4 md:grid md:grid-cols-12 md:gap-x-4 md:gap-y-6 ">
                        <h3 className="col-span-full text-center font-medium">Opciones de pago disponible</h3>
                        <div className="col-span-4 shadow-lg/30 p-5 text-justify rounded-xl flex flex-col gap-2 items-center justify-between">
                            <h4 className="font-semibold">Cajero Bancolombia</h4>
                            <p>Descarga el cupón de pago, podrá realizar el pago con el código de barras digital
                                en cajeros multifuncionales con lector de código de barras.</p>
                            <a href="https://www.youtube.com/watch?v=Kbi5ZeQfgM8" className="w-fit bg-accent text-primary rounded-lg py-2 px-4 text-center">Boton 1</a>
                        </div>
                        <div className="col-span-4 shadow-lg/30 p-5 text-justify rounded-xl flex flex-col gap-2 items-center justify-between">
                            <h4 className="font-semibold">Efectivo o Cheque</h4>
                            <p>Pague su arriendo en efectivo o cheque en cualquier oficina del grupo Bancolombia
                                del país. Haz clic en el siguiente enlace para hallar la más cercana.</p>
                            <a href="https://www.bancolombia.com/puntos-de-atencion" className="w-fit bg-accent text-primary rounded-lg py-2 px-4 text-center">Boton 2</a>
                        </div>
                        <div className="col-span-4 shadow-lg/30 p-5 text-justify rounded-xl  flex flex-col gap-2 items-center justify-between">
                            <h4 className="font-semibold">Otras alternativas</h4>
                            <p> Puedes hacer tus pagos en sitios autorizados  como <strong>Almacenes Éxito</strong>,
                                <strong> Almacenes Olímpica</strong> o en cualquier <strong> Corresponsal Bancolombia</strong> del país.</p>
                            <a href="https://www.bancolombia.com/puntos-de-atencion" className="w-fit bg-accent text-primary rounded-lg py-2 px-4 text-center">Boton 3</a>
                        </div>
                        <h3 className="col-span-full text-center">Paso a paso: pagos y reembolsos</h3>
                        <div className="col-span-full row-span-2 shadow-lg/30 flex flex-col items-center md:flex-row justify-between p-10 rounded-xl gap-5">
                            <div className="relative  overflow-hidden rounded-3xl border-10 border-gray-500 ">
                                <iframe src="https://www.tiktok.com/player/v1/7234311266234289414" className="mx-auto aspect-9/16 w-[325px] max-w-full" allowFullScreen />
                            </div>
                            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center gap-5">
                                <p className=" text-justify text-balance">
                                    Te presentamos el paso a paso para el pago y reembolso de los servicios públicos.
                                    Si tienes dudas o inquietudes, contáctanos a través de nuestras líneas de atención,
                                    redes sociales y formularios digitales.</p>
                                <div className="flex flex-col md:flex-row gap-3">
                                    <a href="https://www.instagram.com/reel/CsZuhJuANKC/?utm_source=ig_web_copy_link&igshid=MzRlODBiNWFlZA=="
                                        className="group relative flex rounded-2xl p-1 bg-[linear-gradient(50deg,#fed530_0%,#fd7a23_33%,#fc136b_66%,#d11dc3_100%)]">
                                        <div className="bg-light rounded-xl p-2 group-hover:bg-transparent group-active:bg-transparent">
                                            <p className="flex gap-2 items-center text-transparent group-hover:text-white group-active:text-white bg-clip-text bg-[linear-gradient(50deg,#fed530_0%,#fd7a23_33%,#fc136b_66%,#d11dc3_100%)]"><FaInstagram className="text-2xl text-[#fd7a23] group-hover:text-inherit group-active:text-inherit" />Ver en instagram</p>
                                        </div>
                                    </a>
                                    <a href="https://www.tiktok.com/@arenasinmobiliaria/video/7234311266234289414?_d=secCgYIASAHKAESPgo8WXh6zVY5VgVp02CgE2TREFAkGM4V%2BqfMvMunxaFZOSAYCVKzaO07Nx6F021BuN10tMsX%2FoEMLyNms%2FvtGgA%3D&_r=1&share_app_id=1233&share_item_id=7234311266234289414&timestamp=1684369357&u_code=e654d8j38315ae&utm_campaign=client_share&utm_source=short_fallback"
                                        className="group relative flex rounded-2xl p-1 bg-[linear-gradient(346deg,#ff2c55_50%,#25f4ee_50%)] group-hover:bg-black group-active:bg-black">
                                        <div className="w-full bg-light rounded-xl p-2 group-hover:bg-black group-active:bg-black">
                                            <p className="flex justify-between gap-2 items-center text-black group-hover:text-white group-active:text-white bg-clip-text "><FaTiktok className="text-2xl" />Ver en Tiktok</p>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <h3 className="col-span-full text-center">Infografías útiles para arrendatarios</h3>
                        <div className="col-span-3 border-2 border-gray-500 rounded-xl" ></div>
                        <div className="col-span-3 border-2 border-gray-500 rounded-xl"></div>
                        <div className="col-span-3 border-2 border-gray-500 rounded-xl"></div>
                        <div className="col-span-3 border-2 border-gray-500 rounded-xl"></div>
                        <div className="col-start-4 col-span-3 border-2 border-gray-500 rounded-xl"></div>
                        <div className="col-start-7 col-span-3 border-2 border-gray-500 rounded-xl"></div>
                    </div>
                </section>
            </div>
            <Script charset="utf-8" type="text/javascript" src="//js.hsforms.net/forms/embed/v2.js" />
            <Footer />
        </>
    )
}