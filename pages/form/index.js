import Head from 'next/head';
import Script from 'next/script';
import { useState, useEffect } from 'react';
import HubspotForm from '../../components/form/HubspotForm';
import RequestSAC from '../../components/form/RequestSAC';
import Footer from '../../components/layout/Footer';

export default function Form() {
    const [showForm, setShowForm] = useState(false);
    const handleToggleForm = () => {
        setShowForm(prev => !prev);
    };

    return (
        <>
            <Head>
                <title>Contact Us | Arenas Real State</title>
                <meta name="description" content="Find and explore the best properties for sale and rent" />
                <link rel="icon" type="image/webp" href="/FAVICON.webp" />
            </Head>
            <div className="pt-6">
                <RequestSAC onShowForm={handleToggleForm} />
                <HubspotForm visible={showForm} />
            </div>
            <Script charset="utf-8" type="text/javascript" src="//js.hsforms.net/forms/embed/v2.js" />
            <Footer />
        </>

    )
}