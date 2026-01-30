import Head from 'next/head';
import HistorySection from '../../components/aboutus/HistorySection';
import MisionSection from '../../components/aboutus/MisionSection';
import VisionSection from "../../components/aboutus/VisionSection";
import OurNumbersSection from "../../components/aboutus/OurNumbersSection";
import Footer from '../../components/layout/Footer';
import IdentitySection from '../../components/aboutus/IdentitySection';
export default function AboutUs() {
    return (
        <>
            <Head>
                <title>About Us | Arenas Real Estate</title>
                <meta name="description" content="Browse our extensive catalog of properties" />
                <link rel="icon" type="image/webp" href="/FAVICON.webp" />
                
            </Head>
            <div className="pt-36">
                <HistorySection/>
                <IdentitySection/>
                <OurNumbersSection/>
            </div>
            <Footer/>
        </>
    )
}