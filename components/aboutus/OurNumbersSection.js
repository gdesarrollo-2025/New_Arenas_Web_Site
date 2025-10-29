import Image from "next/image";
import Counter from "./Counter";

export default function OurNumbersSection() {
    const NumbersData = [{ target: 10, label: "sedes y salas de ventas", duration: 100 },
    { target: 3900, label: "inmuebles disponibles", duration: 50 },
    { target: 10, label: "portales inmobiliarios", duration: 100 },
    { target: 76000, label: "likes en fanpage", duration: 1 },
    { target: 82, label: "años de servicio", duration: 75 },
    { target: 12, label: "proyectos en venta", duration: 100 },
    { target: 2800, label: "propietarios activos", duration: 50 },
    { target: 28400, label: "followers en instagram", duration: 1 },
    ]
    return (
        <section className="relative text-white py-10 h-auto lg:h-150">
            <div className="">
                <Image src="/images/numbers1.png" alt="Our numbers" className="md:object-cover mix-blend-multiply " sizes="100vw" fill />
                <div className="absolute inset-0 w-full h-full bg-green-800 mix-blend-multiply" />
            </div>
            <div className="relative custom-container px-5 flex flex-col justify-center items-center gap-10   items-center z-2">
                <div className="border-b-4 rounded-b-lg  text-center p-2">
                    <h2 className="text-xl font-medium"> Nuestras cifras nos respaldan</h2>
                    <h1 className="text-4xl font-semibold"> ¿Por qué elegirnos?</h1>
                </div>
                <div className="flex flex-col gap-10">
                    <p className="text-lg text-justify">Somos tu Solución Inmobiliaria, contamos con más de 80 años
                        de experiencia en el sector, lo que nos convierte en un excelente
                        aliado para ti.</p>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 ">
                        {NumbersData.map((item, index) => (
                            <div key={index} className="text-center">
                                <Counter target={item.target} duration={item.duration} />
                                <p className="text-md md:text-lg">{item.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}