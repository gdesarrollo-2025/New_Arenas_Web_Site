import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import Image from 'next/image';


function ListItem({ content }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-lg font-bold">{content.title}</p>
      <ul>
        {content.pages.map((p) => (
          <li className="pl-2">
            <Link href={p.url} className="text-sm text-white hover:text-accent active:text-accent/80 ">{p.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}


function ListDropdown({ }) {

}

const inmuebles = {
  title: "Inmuebles", pages: [{
    title: "Encuentra tu inmueble", url: "#"},
  { title: "Inversionista", url: "#" },
  { title: "Comercio e industria", url: "#" },
  { title: "Exclusivos", url: "#" },
  { title: "Proyectos inmobiliarios", url: "#" },
  { title: "Consigna tu inmueble", url: "#" },
  ]
}

const Nosotros = {
  title: "Nosotros", pages: [
    { title: "Somos Arenas", url: "#" },
    { title: "Asesores inmobiliarios", url: "#" },
    { title: "Trabaja con nosotros", url: "#" }]
}

const Portales = {
  title: "Portales", pages: [
    {title:"Propietarios", url:"#"},
    {title:"Arrendatarios", url:"#"},
    {title:"Pagos PSE", url:"#"},
  ]
}

export default function Footer() {
  return (
    <footer className="bg-primary text-white py-10">
      <div className="flex flex-col gap-6 container-custom">
        <div><Image src="images/Arenas_logo.webp" height={100} width={200} /></div>
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <ListItem content={inmuebles} />
          <ListItem content={Nosotros} />
          <ListItem content={Portales}/>
          <div>
            <p>Contactanos</p>
            <ul>
              <li><Link href="#">Somos Arenas</Link></li>
              <li><Link href="#">Somos Arenas</Link></li>
            </ul>
          </div>
          <div>
            <p>Horarios de atencion</p>
            <ul>
              <li><Link href="#">Sedes Comerciales</Link></li>
              <li><Link href="#">Sedes Administrativas</Link></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div><p>Copyright © 2025 Arenas Inmobiliaria</p></div>
          <div><p>Politica de privacidad 2025</p></div>
          <div>
            <p>Sitio diseñado por Emerson Ojito</p>
            <p>Sitio desarrollado por Carlos Mendoza</p>
          </div>
        </div>
        <div>
          <p className="text-xs text-justify">Las imágenes publicadas, planos, renders y demás piezas publicitarias son simples
            representaciones gráficas de diseño y pueden variar en su percepción y construcción final, están sujetos a modificación
            y/o cambios sin previo aviso o consulta, los mismos no constituyen oferta por parte del Promotor y/o Constructor.
            Los valores aquí presentados son susceptibles a cambios sin previo aviso y no comprometen en ningún momento a Grupo
            Arenas S.A.S. a mantenerlos en el momento de la negociación. La información suministrada en el blog u otros ítems
            informativos son de dominio público y sujeto a la propiedad intelectual de quien lo redacta y no comprometen a GRUPO
            ARENAS S.A.S. bajo ningún motivo.</p>
        </div>
      </div>
    </footer>
  );
} 