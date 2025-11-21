import { useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaUser, FaBars} from 'react-icons/fa';
import { useRouter } from 'next/router';

import SearchBar from './SearchBar';
import MobileMenu from './MobileMenu';
import DropDown from './DropDown';

//Contenido de los dropdowns tanto links como titulos
const Inmuebles = {
  title:"Inmuebles", pages:[
    {name:"Todos los inmuebles", link:"/properties?"},
    {name:"Casas", link:"/properties/casa"},
    {name:"Apartamentos", link:"/properties/apartamento"},
    {name:"Locales", link:"/properties/local"},
  ]
};

const SobreNosotros = {
  title:"Quienes somos", pages:[
    {name:"Historia", link:"/aboutus"},
    {name:"Equipo", link:"/aboutus"},
    {name:"Valores", link:"/aboutus"},
  ]
};

const Contactanos = {
  title:"Contactanos", pages:[
    {name:"Formulario", link:"/form"},
    {name:"Ubicación", link:"/location"},
  ]
};

const Servicios = {
  title:"Servicios", pages:[
    {name:"Administración", link:"#"},
    {name:"Avalúos", link:"#"},
    {name:"Consultoria", link:"#"},
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
    <header
      className="relative bg-white border-b border-gray-100 shadow-xs w-full"
    >
      <div className="container-custom py-4 flex items-center justify-between ">
        {/* Logo */}
        <Link href="/" className="flex items-center min-w-40">
          <div className="relative h-12 w-30 rounded-xl bg-white/70 p-1 transition">
            <Image
              src="/images/LOGO_BLACK.webp"
              alt="Arenas Logo"
              fill
              priority
            />
          </div>
        </Link>
        {/* Menu */}
        <nav className="hidden lg:flex justify-center gap-8">
          {/* Inmuebles Dropdown */}
          <DropDown content= {Inmuebles}/>
          {/* Quienes somos Dropdown */}
          <DropDown content={SobreNosotros}/>
          {/* Contactanos Dropdown */}
          <DropDown content={Contactanos}/>
          {/* Servicios Dropdown */}
          <DropDown content={Servicios}/>
          <a href="#" className="flex items-center gap-2 text-black text-base font-medium"><FaUser className="text-lg" /> Login / Sign up</a>
        </nav>
        {/* Botones a la derecha */}
        <div className="lg:hidden flex items-center gap-4 ml-4">
          <button onClick={handleToggleMenu} className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 text-black hover:bg-gray-100 transition">
            <FaBars className="text-xl" />
          </button>
        </div>
      </div>
      {/* Menu para ambiente movil */}
      <div>
        <MobileMenu active={mobileMenuOpen} setActive={setMobileMenuOpen} />
      </div>
      {/* Search Bar para móvil y desktop - Solo visible en páginas que no son home */}
      {!isHome && (
        <SearchBar />
      )}
    </header>
  );
} 