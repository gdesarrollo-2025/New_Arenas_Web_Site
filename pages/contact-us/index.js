import Head from "next/head";
import dynamic from 'next/dynamic';

import OurHQs from "../../components/location/OurHQs";
const OurSalesRoom = dynamic(() => import('../../components/location/OurSalesRoom'), { ssr: false, loading: () => <div>Cargando salas...</div> })


import Footer from '../../components/layout/Footer';
export default function Location() {
    return (
        <>
            <Head>
                <title>Locate Us | Arenas Real State</title>
                <meta name="description" content="Find and explore the best properties for sale and rent" />
                <link rel="icon" type="image/webp" href="/FAVICON.webp" />
            </Head>
            <div className="">
                <OurHQs />
                <OurSalesRoom />
            </div>
            <Footer />
        </>
    )
}