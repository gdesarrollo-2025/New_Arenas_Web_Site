import { useEffect, useState } from "react";
import useTypewriter from "./useTypeWriter";

export default function HeroTitle() {
  const words = [
    "Apartamentos",
    "Casas",
    "Locales",
    "Lotes",
    "Oficinas",
  ]; // <- reemplaza esto con tu array dinámico si quieres
  const text = useTypewriter(words)
  return (
    <div className="flex flex-col items-center ">
      <h1 className="text-4xl font-bold text-white text-center flex flex-wrap gap-2">
        Compra, vende y arrienda
      </h1>
        <span className="text-4xl font-bold text-white text-shadow min-w-36">
          {text}
          <span className="border-r-2 border-white ml-1 animate-blink" />
        </span>
    </div>


  );
}
