import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-primary text-white py-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-5">
        <div>
          <Image src="/images/LOGO_WHITE.webp" alt="Arenas Logo" width={140} height={40} className="mb-4" />
          <p className="text-sm">© {new Date().getFullYear()} Arenas Inmobiliaria. Todos los derechos reservados.</p>
        </div>
        <div>
          <h4 className="font-bold mb-2">Inmuebles</h4>
          <ul className="space-y-1 text-sm">
            <li><a href="#" className="hover:underline">Arriendo</a></li>
            <li><a href="#" className="hover:underline">Venta</a></li>
            <li><a href="#" className="hover:underline">Proyectos</a></li>
            <li><a href="#" className="hover:underline">Exclusivos</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-2">Nosotros</h4>
          <ul className="space-y-1 text-sm">
            <li><a href="#" className="hover:underline">Historia</a></li>
            <li><a href="#" className="hover:underline">Equipo</a></li>
            <li><a href="#" className="hover:underline">Valores</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-2">Contacto</h4>
          <ul className="space-y-1 text-sm">
            <li>Cra 56 # 75-78</li>
            <li>Barranquilla, Colombia</li>
            <li>Tel: (605) 385 5555</li>
            <li className="flex flex-wrap">Email: info@arenasinmobiliaria.com</li>
          </ul>
        </div>
      </div>
    </footer>
  );
} 