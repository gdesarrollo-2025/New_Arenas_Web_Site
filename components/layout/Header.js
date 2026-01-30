import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaUser, FaBars } from 'react-icons/fa';
import { useRouter } from 'next/router';

import SearchBar from './SearchBar';
import MobileMenu from './MobileMenu';
import DropDown from './DropDown';

//Contenido de los dropdowns tanto links como titulos
const Inmuebles = {
  title: "Inmuebles", pages: [
    { name: "Encuentra tu inmueble", link: "/properties?" },
    { name: "Comercio e industria", link: "/properties/local" },
    { name: "Inversionista", link: "/properties/lote" },
    { name: "Exclusivos", link: "https://arenasinmobiliaria.co/exclusivos/" },
  ]
};

const SobreNosotros = {
  title: "Quienes somos", pages: [
    { name: "Sobre Nosotros", link: "/about-us" },
    { name: "Nuestros asesores", link: "/about-us" },
    { name: "Contactanos", link: "/contact-us" }
  ]
};

const Clientes = {
  title: "Nuestros Clientes", pages: [
    { name: "Propietarios", link: "/owners" },
    { name: "Arrendatarios", link: "/tenants" },
    { name: "Consigna tu inmueble", link: "/#" }
  ]
}

const Servicios = {
  title: "Servicios", pages: [
    { name: "Arriendo y Venta", link: "/rent-and-sell" },
    { name: "Proyectos y Constructoras", link: "/projects-and-companies" },
    { name: "Marketing Inmobiliario", link: "#" },
    { name: "Perfilador de credito", link: "#" }
  ]
};

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const isHome = router.pathname === '/';

  const handleToggleMenu = () => {
    setMobileMenuOpen(prev => !prev);
  };

  return (
    <header className="fixed  backdrop-blur-sm bg-linear-to-b from-5% from-black to-black/20  w-full z-50 rounded-b-xl" >
      <div className="container-custom py-4 flex items-center justify-between ">
        {/* Logo */}
        <Link href="/" className="flex items-center min-w-40">
          <div className="relative h-12 w-30 rounded-xl 0 p-1 transition">
            <Image
              src="/images/LOGO_WHITE.webp"
              alt="Arenas Logo"
              fill
              priority
              className="object-contain"
            />
          </div>
        </Link>
        {/* Menu */}
        <nav className="hidden lg:flex justify-center gap-8">
          {/* Inmuebles Dropdown */}
          <DropDown content={Inmuebles} />
          {/* Quienes somos Dropdown */}
          <DropDown content={SobreNosotros} />
          {/* Clientes Dropdown*/}
          <DropDown content={Clientes} />
          {/* Servicios Dropdown */}
          <DropDown content={Servicios} />
          <a href="#" className="flex items-center gap-2 text-white text-base font-medium"><FaUser className="text-lg text-primary" /> Login / Sign up</a>
        </nav>
        {/* Botones a la derecha */}
        <div className="lg:hidden flex items-center gap-4 ml-4">
          <button onClick={handleToggleMenu} className={`w-10 h-10 flex items-center justify-center rounded-full border-2 border-white text-white transition ${mobileMenuOpen ? "text-accent border-accent" : ""}`}>
            <FaBars className="text-xl" />
          </button>
        </div>
      </div>
      {/* Menu para ambiente movil */}
      <div >
        <MobileMenu active={mobileMenuOpen} setActive={setMobileMenuOpen} buttons={[Inmuebles, SobreNosotros, Clientes, Servicios]} />
      </div>
      {/* Search Bar para móvil y desktop - Solo visible en páginas que no son home */}
      {!isHome && (
        <div className="bg-accent/50 container-custom rounded-[10px]"> 
          <SearchBar />
        </div>
      )}
    </header>
  );
} 