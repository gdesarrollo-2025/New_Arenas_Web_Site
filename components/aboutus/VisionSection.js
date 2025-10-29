import Image from "next/image";

export default function VisionSection() {
    return (
        <section className="bg-white py-10 px-5">
            <div className=" container-custom flex flex-col lg:flex-row justify-between h-auto lg:h-150" >
                <div className="relative h-100 md:h-150 w-full lg:h-auto lg:w-6/12 ">
                    <Image src="/images/vision.webp" className="object-cover lg:object-contain" sizes="(max-width: 768) 90vw, 50vw" alt="vision"fill />
                </div>
                <div className="flex flex-col items-center gap-10 order-first lg:order-2  w-full lg:w-5/12  pb-5 lg:pb-0 lg:pl-4 ">
                    <div className="border-b-4 rounded-b-lg  text-center p-2 border-primary w-11/12" >
                        <h2 className="text-2xl font-medium">Te presentamos nuestra</h2>
                        <h1 className="text-4xl font-semibold text-primary">Vision</h1>
                    </div>
                    <p className="text-lg px- text-justify justify-center">
                        GRUPO ARENAS S.A.S., será reconocida como la inmobiliaria líder en el sector de arriendo, ventas, administración y
                        promoción de proyectos de la costa Atlántica, a través del cumplimiento de los mejores estándares de desempeño, la
                        generación de valor en colaboradores y clientes y la sistematización de nuestros procesos para ser más eficiente y
                        oportuna la experiencia con nuestros clientes.
                    </p>
                </div>
            </div>
        </section>
    )
}