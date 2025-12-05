import { useEffect, useState } from "react";

import MobileMenuButton from "./MobileMenuButton";

export default function MobileMenu({ active, setActive }) {
  const [options, setOptions] = useState({
    inmuebles: false,
    sobrenosotros: false,
  })

  const buttons = [{
    name: "Inmuebles",
    links: [{ title: "Encuentra tu inmueble", href: "/properties" },
    { title: "Comercio e industria", href: "/properties/local" },
    { title: "Inversionista", href: "/properties/lote" },
    { title: "Exclusivos", href: "https://arenasinmobiliaria.co/exclusivos/" },
    ]
  },
  {
    name: "Quienes somos",
    links: [{ title: "Sobre nosotros", href: "/aboutus" },
    { title: "Nuestros asesores", href: "/aboutus" },
    ]
  },
  {
    name: "Clientes",
    links: [{ title: "Propietarios", href: "/owners" },
    { title: "Arrendatario", href: "/tenants" },
    { title: "Consigna tu inmueble", href: "#" }
    ]
  },
  {
    name: "Información",
    links: [{ title: "Nuestras sedes", href: "/location" },
    { title: "Contactanos", href: "/#" },
    ]
  },
  {
    name: "Servicios",
    links: [{ title: "Administracion", href: "#" },
    { title: "Avaluos", href: "#" },
    { title: "Consultoria", href: "#" },
    ]
  },

  ]
  const toggleOptions = (e) => {
    const { name } = e.target;
    setOptions((prev) => ({
      ...prev,
      [name]: !prev[name]
    }))
  }


  // Cierra el menú automáticamente si el viewport pasa de md hacia arriba
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && active) {
        setActive(false); // resetea el estado
        setOptions({
          inmuebles: false,
          servicios: false,
          contacto: false,
          nosotros: false,
        });
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [active, setActive]);

  //Bloquea el scroll del body cuando el menú está abierto (opcional pero recomendado)
  useEffect(() => {
    document.body.style.overflow = active ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [active]);

  return (
    <div
      className={`absolute w-full z-40 bg-white transition-all duration-500 ease-in-out rounded-lg border-b-2
      ${active ? "max-h-150 opacity-100" : "max-h-0 opacity-0 pointer-events-none"}`}
    >
      <div className="flex flex-col items-center">
        {buttons.map((button, index) => (
          <div className="w-full" key={index}>
            <MobileMenuButton name={button.name} links={button.links} />
          </div>
        ))}
      </div>
    </div>
  );
}
