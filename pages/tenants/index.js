import { useState, useRef } from "react";
import Image from "next/image";
import Head from "next/head";
import Script from "next/script";

import Footer from "../../components/layout/Footer";
import RequestSAC from "../../components/tenants/RequestSAC";
import HubspotForm from "../../components/form/HubspotForm";

import { FaFileInvoiceDollar, FaInstagram, FaTiktok } from "react-icons/fa";
import Link from "next/link";
import TypePaymentsArticle from "../../components/tenants/TypesPaymentsArticle";
import PaymentsSection from "../../components/tenants/PaymentsSection";
import InfographicsArticle from "../../components/tenants/InfographicsArticle";
import StepByStepVideoArticle from "../../components/tenants/StepByStepVideoArticle";



export default function TenantsPage() {
    const formRef = useRef()
    const [open, setOpen] = useState(false)
    const [id, setId] = useState(1)

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
                <title>Arrendatarios | Arenas Inmobiliaria</title>
                <meta name="description" content="En arenas inmobiliaria agradecemos tu confianza brindandote un servicio excepcional podras realizar peticiones como tambien guias para una experiencia optima" />
                <link rel="icon" type="image/webp" href="/FAVICON.webp" />
            </Head>
            <div className="">
                <RequestSAC onShowForm={onShowForm} open={open} />
                <div ref={open ? formRef : null} >
                    <HubspotForm visible={open} />
                </div>
                <PaymentsSection />
                <section className="bg-white py-10">
                    <div className="container-custom flex flex-col gap-5">
                        <div className="flex flex-col items-center">
                            <p className="text-sm text-center md:text-lg">Consulta y paga tus obligaciones de forma sencilla.</p>
                            <h2 className="text-primary text-center">Guia de pagos y gestion para arrendatarios</h2>
                            <hr className="border-2 border-primary w-full sm:w-4/5 lg:w-3/5" />
                        </div>
                        <div className="flex flex-col gap-5  ">
                            <TypePaymentsArticle />
                            <hr className="w-full h-1.5 rounded-full bg-linear-to-r/decreasing from-primary to-accent bg-clip-border" />
                            <InfographicsArticle />
                        </div>
                    </div>
                </section>
            </div>
            <Script charset="utf-8" type="text/javascript" src="//js.hsforms.net/forms/embed/v2.js" />
            <Footer />
        </>
    )
}

{/*  */ }