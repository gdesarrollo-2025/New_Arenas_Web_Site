import Image from "next/image";

export default function MisionSection() {
    return (
        <section className=" bg-white py-10 px-5">
            <div className="container-custom flex flex-col lg:flex-row justify-between  h-auto ">
                <div className="flex flex-col items-center gap-10 w-full lg:w-5/12 pb-5 lg:pb-0 lg:pr-4">
                    <div className="border-b-4 rounded-b-lg  text-center p-2 border-primary w-11/12">
                        <h2 className="text-2xl font-medium">Conoce nuestra </h2>
                        <h1 className="text-4xl font-semibold text-primary">Mision</h1>
                    </div>
                    <div className="text-lg px- text-justify justify-center">
                        <p>Encaminamos nuestros esfuerzos a lograr un alto grado de satisfacción de
                            nuestros clientes internos y externos en la prestación de servicios de
                            nuestro portafolio inmobiliario especialmente en el de arriendo,
                            venta de inmuebles y la de promoción, administración y
                            venta de proyectos de construcción.
                        </p>
                        <p>Procuramos, para el logro del éxito, superar las expectativas de nuestros clientes,
                            contratistas y proveedores, conforme a los requisitos y expectativas de nuestro
                            mercado en Barranquilla y Cartagena, que cumplan con los estándares de Calidad
                            y el mejor servicio al cliente.</p>
                        <p>Fundamentamos nuestro crecimiento en un desempeño basado en la ética, la
                            transparencia, la densidad de talento de nuestro equipo de trabajo y la
                            aplicación de los desarrollos tecnológicos a las actividades de nuestros clientes.
                        </p>
                    </div>
                </div>
                <div className="relative h-100 md:h-150 w-full lg:h-auto lg:w-6/12">
                    <Image src="/images/mision.webp" className="object-cover lg:object-contain" sizes="(max-width: 768) 90vw, 50vw" alt="mision" fill/>
                </div>
            </div>
        </section>

    )
}