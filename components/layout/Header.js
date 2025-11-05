import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { FaSearch, FaUser, FaBars, FaChevronDown, FaTimes } from 'react-icons/fa';
import { useRouter } from 'next/router';

import parseSearchQuery from '../../lib/parserSearchQuery';
import MobileMenu from './MobileMenu';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [desktopMenuOpen, setDesktopMenuOpen] = useState(false);
  const desktopMenuRef = useRef(null);
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [bizType, setBizType] = useState(''); // Estado para el tipo de negocio
  const isHome = router.pathname === '/';

  // Cerrar el menú desplegable al hacer click fuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (desktopMenuRef.current && !desktopMenuRef.current.contains(event.target)) {
        setDesktopMenuOpen(false);
      }
    }
    if (desktopMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [desktopMenuOpen]);

  // Implementar debounce para la búsqueda
  useEffect(() => {
    // No hacer nada si el texto está vacío
    if (!searchQuery.trim()) return;

    // Configurar un temporizador para actualizar la búsqueda después de 500ms
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);

    // Limpiar el temporizador si el texto cambia antes de que expire
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Ejecutar la búsqueda cuando el valor debounced cambia
  useEffect(() => {
    if (!debouncedSearchQuery.trim()) return;

    const query = new URLSearchParams();
    query.set('q', debouncedSearchQuery);

    // Añadir filtro por tipo de negocio si está seleccionado
    if (bizType) {
      query.set('biz', bizType);
    }

    // Solo redirigir si no estamos ya en la página de propiedades con la misma búsqueda
    const currentPath = router.asPath;
    const newPath = `/properties?${query.toString()}`;

    if (currentPath !== newPath) {
      router.push(newPath);
    }
  }, [debouncedSearchQuery, bizType, router]);

  // Manejar cambios en el input
  const handleSearchChange = (e) => {
    console.log(e.target.value)
    setSearchQuery(e.target.value);
  };

  // Manejar cambios en el tipo de negocio
  const handleBizTypeChange = (e) => {
    setBizType(e.target.value);

    // Si ya hay una búsqueda activa, actualizar resultados inmediatamente
    if (searchQuery.trim()) {
      const query = new URLSearchParams();
      query.set('q', searchQuery);

      if (e.target.value) {
        query.set('biz', e.target.value);
      }

      router.push(`/properties?${query.toString()}`);
    }
  };

  // Mantener el handler del formulario para casos donde el usuario presiona Enter
  const handleQuickSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    try {
      // 🧠 Interpretar la frase del usuario usando tu parser
      const result = await parseSearchQuery(searchQuery);

      // 🧩 Crear los parámetros usando las mismas claves del parser
      const query = new URLSearchParams();

      if (result.location) query.set('location', result.location);
      if (result.neighborhood) query.set('neighborhood', result.neighborhood);
      if (result.propertyType) query.set('propertyType', result.propertyType);
      if (result.bizType) query.set('bizType', result.bizType);
      if (result.bedrooms) query.set('bedrooms', result.bedrooms);
      if (result.bathrooms) query.set('bathrooms', result.bathrooms);
      if (result.minPrice) query.set('minPrice', result.minPrice);
      if (result.maxPrice) query.set('maxPrice', result.maxPrice);

      // Guardar la búsqueda original
      query.set('q', searchQuery);
      // 🚀 Redirigir a la página de resultados
      router.push(`/properties?${query.toString()}`);
    } catch (error) {
      console.error("Error interpretando búsqueda:", error);
    }
  };

  const handlePropertiesClick = (e) => {
    if (router.pathname === '/properties') {
      e.preventDefault();
      // Redirigir a la ruta base de properties sin parámetros
      router.push('/properties', undefined, { shallow: false });
    }
  };

  const handleToggleMenu = () => {
    console.log('Toggling Menu');  // For debug
    setMobileMenuOpen(prev => !prev);
  };

  // Al inicio del componente
  const showSearch = router.pathname !== '/';

  return (
    <header
      className="relative bg-white border-b border-gray-100 shadow-xs w-full"
    >
      <div className="container-custom py-4 flex items-center justify-between ">
        {/* Logo */}
        <a href="/" className="flex items-center min-w-[160px]">
          <div className="relative h-12 w-30 rounded-xl bg-white/70 p-1 transition">
            <Image
              src="/images/LOGO_BLACK.webp"
              alt="Arenas Logo"
              fill
              priority
            />
          </div>
        </a>
        {/* Menu */}
        <nav className="hidden lg:flex justify-center gap-8">
          {/* Inmuebles Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 text-black font-medium text-base focus:outline-hidden group-focus-within:text-primary  transition-colors">
              Inmuebles <FaChevronDown className="ml-1 text-xs" />
            </button>
            <div className="absolute left-0 mt-2 w-48 bg-white rounded-sm shadow-lg opacity-0  group-focus-within:opacity-100 lg-group-hover:opacity-100 group-focus-within:visible lg:group-hover:visible  invisible transition-all z-20">
              <a href="/properties" className="block px-4 py-2 text-sm text-gray-800 hover:bg-primary hover:text-white transition-colors">Todos los inmuebles</a>
              <a href="/properties?type=2" className="block px-4 py-2 text-sm text-gray-800 hover:bg-primary hover:text-white transition-colors">Casas</a>
              <a href="/properties?type=1" className="block px-4 py-2 text-sm text-gray-800 hover:bg-primary hover:text-white transition-colors">Apartamentos</a>
              <a href="/properties?type=4" className="block px-4 py-2 text-sm text-gray-800 hover:bg-primary hover:text-white transition-colors">Locales</a>
            </div>
          </div>
          {/* Quienes somos Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 text-black font-medium text-base focus:outline-hidden group-focus-within:text-primary transition-colors">
              Quiénes somos <FaChevronDown className="ml-1 text-xs" />
            </button>
            <div className="absolute left-0 mt-2 w-48 bg-white rounded-sm shadow-lg opacity-0 group-focus-within:opacity-100 lg-group-hover:opacity-100 group-focus-within:visible lg:group-hover:visible invisible transition-all z-20">
              <a href="/aboutus" className="block px-4 py-2 text-sm text-gray-800 hover:bg-primary hover:text-white transition-colors">Historia</a>
              <a href="/aboutus" className="block px-4 py-2 text-sm text-gray-800 hover:bg-primary hover:text-white transition-colors">Equipo</a>
              <a href="/aboutus" className="block px-4 py-2 text-sm text-gray-800 hover:bg-primary hover:text-white transition-colors">Valores</a>
            </div>
          </div>
          {/* Contactanos Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 text-black font-medium text-base focus:outline-hidden group-focus-within:text-primary transition-colors">
              Contáctanos <FaChevronDown className="ml-1 text-xs" />
            </button>
            <div className="absolute left-0 mt-2 w-48 bg-white rounded-sm shadow-lg opacity-0 group-focus-within:opacity-100 lg-group-hover:opacity-100 group-focus-within:visible lg:group-hover:visible invisible transition-all z-20">
              <a href="/form" className="block px-4 py-2 text-sm text-gray-800 hover:bg-primary hover:text-white transition-colors">Formulario</a>
              <a href="/location" className="block px-4 py-2 text-sm text-gray-800 hover:bg-primary hover:text-white transition-colors">Ubicación</a>
            </div>
          </div>
          {/* Servicios Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 text-black font-medium text-base focus:outline-hidden group-focus-within:text-primary transition-colors">
              Servicios <FaChevronDown className="ml-1 text-xs" />
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-sm shadow-lg opacity-0 group-focus-within:opacity-100 lg-group-hover:opacity-100 group-focus-within:visible lg:group-hover:visible invisible transition-all z-20">
              <a href="#" className="block px-4 py-2 text-sm text-gray-800 hover:bg-primary hover:text-white transition-colors">Administración</a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-800 hover:bg-primary hover:text-white transition-colors">Avalúos</a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-800 hover:bg-primary hover:text-white transition-colors">Consultoría</a>
            </div>
          </div>
          <a href="#" className="flex items-center gap-2 text-black text-base font-medium"><FaUser className="text-lg" /> Login / Sign up</a>
        </nav>
        {/* Botones a la derecha */}
        <div className=" block lg:hidden flex items-center gap-4 ml-4">
          <button onClick={handleToggleMenu} className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 text-black hover:bg-gray-100 transition">
            <FaBars className="text-xl" />
          </button>
        </div>
      </div>
      <div>
        <MobileMenu active={mobileMenuOpen} setActive={setMobileMenuOpen} />
      </div>
      {/* Search Bar para móvil y desktop - Solo visible en páginas que no son home */}
      {!isHome && (
        <div className="container-custom py-2">
          <form onSubmit={handleQuickSearch} className="flex w-full gap-2 max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Buscar por ciudad, barrio, código..."
              className="border border-gray-300 rounded-full py-2 px-4 grow text-sm focus:outline-primary"
              value={searchQuery}
              onChange={handleSearchChange}
              style={{ background: 'white', color: 'var(--color-dark)' }}
            />
            <button type="submit" className="rounded-full px-4 py-2 flex items-center justify-center bg-black text-white">
              <FaSearch />
            </button>
          </form>
        </div>
      )}
    </header>
  );
} 