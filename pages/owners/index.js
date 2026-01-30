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
                <title>Contact Us | Arenas Real State</title>
                <meta name="description" content="Find and explore the best properties for sale and rent" />
                <link rel="icon" type="image/webp" href="/FAVICON.webp" />
            </Head>
            <div className="">
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