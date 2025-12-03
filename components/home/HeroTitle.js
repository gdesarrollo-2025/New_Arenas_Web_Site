import { useEffect, useState } from "react";
import useTypewriter from "./useTypeWriter";

export default function HeroTitle() {
  const words = [
    "apartamentos",
    "casas",
    "locales",
    "lotes",
    "oficinas",
    "fincas"
  ]; // <- reemplaza esto con tu array dinámico si quieres
  const text= useTypewriter(words)
  return (
    <h1 className="text-4xl font-bold text-white text-justify flex flex-wrap gap-2">
      Compra, vende y arrienda{" "}
      <span className="text-white text-shadow min-w-36">
        {text}
        <span className="border-r-2 border-white ml-1 animate-blink"/>
      </span>{" "}
    </h1>
    
  );
}
