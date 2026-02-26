
import Image from "next/image";

const Constructoras = [
    {
        name: "L & A Constructores",
        image: "/images/Constructora_1.webp"
    },
    {
        name: "Constructora ACF",
        image: "/images/Constructora_2.webp"
    },
    {
        name: "OY proyectos",
        image: "/images/Constructora_3.webp"
    },
    {
        name: "Terrapin",
        image: "/images/Constructora_4.webp"
    },
    {
        name: "Arquitectura y Concreto",
        image: "/images/Constructora_5.webp"
    },
    {
        name: "Conconcreto",
        image: "/images/Constructora_6.webp"
    }
]

export default function () {
    return <section className="container-custom flex flex-col items-center gap-2 text-center text-balance ">
        <h2 className="text-2xl md:text-4xl text-primary"> ¿Quienes son nuestros aliados?</h2>
        <hr className="border-2 border-primary w-full md:w-1/2"/>
        <p className="text-sm">
            Gracias a nuestra excelente labor, estas constructoras han depositado su confianza en nosotros, caracterizadas por el compromiso y la responsabilidad con la
            que desarrollan sus proyectos. Siempre garantizando la sostenibilidad y por supuesto cumpliendo sueños a muchas familias
        </p>
        <ul className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 place-items-center py-5 gap-3 ">
            {Constructoras.map((c, idx) => (
                <li key={idx} className="group flex flex-col relative w-36 h-44 bg-white shadow-md rounded-[10px] overflow-hidden">
                    <Image src={c.image} fill className=" object-contain lg:grayscale-100 lg:group-hover:grayscale-0 transition-all" alt={c.name} />
                    <h3 className="absolute w-full bottom-0 text-center text-sm text-accent lg:opacity-0 lg:group-hover:opacity-100 transition-all">{c.name}</h3>
                </li>
            ))}
        </ul>
    </section>
}