import { useState, useRef } from "react";
import Head from "next/head";
import Script from "next/script";


import RequestSection from "../../components/owner/RequestSection";
import StepByStepSection from "../../components/owner/StepByStepSection";
import StateSection from "../../components/owner/StateSection";
import ConceptsSection from "../../components/owner/ConceptsSection";
import ImportantSection from "../../components/owner/ImportantSection";

import Footer from "../../components/layout/Footer";

export default function OwnersPage() {
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
                <title>Propietarios | Arenas Inmobiliaria</title>
                <meta name="description" content="En Arenas Inmobiliaria como propietario podras consultar, realizar peticiones y anticipio de canon de arriendo. " />
                <link rel="icon" type="image/webp" href="/FAVICON.webp" />
            </Head>
            <div className="relative flex flex-col ">
                <RequestSection onShowForm={onShowForm} open={open}/>
                <StepByStepSection open={open} formRef={formRef} />
                <StateSection />
                <ConceptsSection />
                <ImportantSection />
            </div>
            <Script charset="utf-8" type="text/javascript" src="//js.hsforms.net/forms/embed/v2.js" />
            <Footer />
        </>

    )
}