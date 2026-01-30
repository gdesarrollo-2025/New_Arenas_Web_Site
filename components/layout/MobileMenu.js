import { useEffect, useState } from "react";

import MobileMenuButton from "./MobileMenuButton";

export default function MobileMenu({ active, setActive, buttons }) {
  const [reset, setReset] = useState(false)
  // Cierra el menú automáticamente si el viewport pasa de md hacia arriba
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && active) {
        setActive(false); // resetea el estado
        setReset(true)
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [active, setActive]);

  //Bloquea el scroll del body cuando el menú está abierto (opcional pero recomendado)
  useEffect(() => {
    if(active){
      setReset(false);
    }else{
      setReset(true);
    }
    document.body.style.overflow = active ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [active]);

  return (
    <div
      className={`w-full z-50 transition-all duration-500 ease-in-out rounded-b-xl 
      ${active ? "max-h-150 opacity-100" : "max-h-0 opacity-0 pointer-events-none"}`}
    >
      <div className="flex flex-col items-center">
        {buttons.map((button, index) => (
          <div className="w-full " key={index}>
            <MobileMenuButton name={button.title} links={button.pages} reset={reset}/>
          </div>
        ))}
      </div>
    </div>
  );
}
