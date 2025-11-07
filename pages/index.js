import Head from 'next/head';
import HeroSection from '../components/home/HeroSection';
import QuickServices from '../components/home/QuickServices';
import TrustedCompanies from '../components/home/TrustedCompanies';
import PopularListings from '../components/properties/PopularListings';
import InvestmentSection from '../components/home/InvestmentSection';
import PromoBanner from '../components/home/PromoBanner';
import PopularCities from '../components/home/PopularCities';
import FeaturedListing from '../components/properties/FeaturedListing';
import Testimonials from '../components/home/Testimonials';
import OurAgents from '../components/home/OurAgents';
import Newsletter from '../components/home/Newsletter';
import Footer from '../components/layout/Footer';

export default function Home() {
  
  return (
    <>
      <Head>
        <title>Arenas Real Estate - Find Your Dream Property</title>
        <meta name="description" content="Find and explore the best properties for sale and rent" />
        <link rel="icon" type="image/webp" href="/FAVICON.webp" />
      </Head>
      <main className="bg-[#f8f9fa]">
        <HeroSection />
        <QuickServices/>
        <TrustedCompanies />
        <PopularListings />
        <InvestmentSection/>
        <PromoBanner/>
        <PopularCities />
        {/* <FeaturedListing /> */}
        <Testimonials />
        <OurAgents />
       {/*  <Newsletter /> */}
      </main>
      <Footer />
      
    </>
  );
} 