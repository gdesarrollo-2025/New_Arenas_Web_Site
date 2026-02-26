import Head from "next/head";
import dynamic from 'next/dynamic';

import OurHQs from "../../components/location/OurHQs";
const OurSalesRoom = dynamic(() => import('../../components/location/OurSalesRoom'), { ssr: false, loading: () => <div>Cargando salas...</div> })


import Footer from '../../components/layout/Footer';
export default function Location() {
    return (
        <>
            <Head>
                <title>Contactanos | Arenas Inmobiliaria</title>
                <meta name="description" content="Contacta a Arenas Inmobiliaria para comprar, arrendar, vender tu vivienda o comercializar un proyecto " />
                <meta name="keywords" content="Arenas Inmobiliaria, contacto inmobiliaria, proyectos inmobiliarios, comprar vivienda, comercializar proyecto, asesoría inmobiliaria Colombia"/>
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