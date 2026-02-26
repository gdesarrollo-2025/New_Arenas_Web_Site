import {
    FaFileContract,
    FaDoorOpen,
    FaLightbulb,
    FaHouseUser,
    FaScrewdriverWrench,
    FaPeopleArrows
} from "react-icons/fa6";
import Image from "next/image";
import { useEffect, useState } from "react";
import PopUpCard from "../layout/PopUpCard";

const Icons = {
    "Terminacion de contrato": <FaFileContract className="size-full" />,
    "Consejos": <FaLightbulb className="size-full" />,
    "Reparaciones Locativas": <FaScrewdriverWrench className="size-full" />,
    "Desocupación": <FaDoorOpen className="size-full" />,
    "Proceso de ocupación": <FaHouseUser className="size-full" />,
    "Cambio de Arrendatario": <FaPeopleArrows className="size-full" />,
}
const Infographics = [
    {
        title: "Terminacion de contrato",
        img: "/images/Terminacion-de-contrato.webp"
    },
    {
        title: "Consejos",
        img: "/images/recomendaciones.webp"
    },
    {
        title: "Reparaciones Locativas",
        img: "/images/Obligaciones-Arrendatarios.webp"
    },
    {
        title: "Desocupación",
        img: "/images/Proceso-entrega-de-inmueble.webp"
    },
    {
        title: "Proceso de ocupación",
        img: "/images/proceso-de-ocupacion.webp"
    },
    {
        title: "Cambio de Arrendatario",
        img: "/images/Requisitos-cambio-de-arrendatarios.webp"
    }
]
export default function InfographicsArticle() {
    const [isOpen, setIsOpen] = useState({})
    
    return (
        <article className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <h3 className="col-span-full text-center font-semibold text-primary ">Infografias utiles</h3>
            {Infographics.map((i, idx) => (
                <div key={idx} className="group w-40 h-40 flex flex-col border-2 bg-light shadow-lg hover:shadow-[0_0px_20px_rgba(0,0,0,0.4)] hover:scale-105 hover:-translate-y-2 items-center justify-around rounded-[10px] place-self-center gap-2 p-3 transition-all ease-in-out cursor-pointer"
                    onClick={() => setIsOpen({ [idx]: true })}>
                    <span className="text-primary  group-hover:text-accent  size-1/2 transition-all ease-in-out" >{Icons[i.title]}</span>
                    <h4 className="text-center h-1/2  place-content-center">{i.title}</h4>
                    {isOpen[idx] &&
                        <PopUpCard  onClose={() => setIsOpen({ [idx]: false })}>
                            <div className="relative size-[80vw] lg:size-[75vh] aspect-square " >
                                <Image src={i.img} fill className="object-cover" alt={i.title} />
                            </div>
                        </PopUpCard>
                    }
                </div>
            ))}
        </article>
    );
}