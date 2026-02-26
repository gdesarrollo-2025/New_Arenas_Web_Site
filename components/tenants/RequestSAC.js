import Image from 'next/image';

export default function RequestSAC({ onShowForm, open }) {
    return (
        <section className="relative flex flex-col justify-center h-[70vh]">
            <Image src="/images/Tenants.webp" fill priority className="object-cover" alt="Arrendatarios Arenas SA"/>
            <div className="absolute w-full h-full bg-linear-to-r from-primary to-transparent mix-blend-multiply backdrop-blur-xs"/>
            <div className="z-20 w-full xl:w-2/3 h-full container-custom text-white flex flex-col  gap-3 items-start justify-center pt-10 px-10">
                <div className="flex flex-col gap-5 items-start">
                    <h2 className="text-center sm:text-justify text-lg sm:text-2xl "> Servicio al cliente</h2>
                    <hr className="w-full lg:w-2/3 self-center sm:self-start" />
                    <p className="text-left text-balance text-sm sm:text-base">Gracias por confiar en nosotros, queremos brindarte un servicio excepcional;
                        por eso nuestros canales de comunicación siempre estarán disponibles para ti.
                        Si tienes algún requerimiento puedes radicarlo a través del siguiente formulario.
                    </p>
                    <button onClick={onShowForm} type="button" className="self-start border-2 border-white rounded-full min-w-50 px-2 py-1 hover:bg-accent hover:scale-102 active:scale-98 active:bg-accent/75"> {open ? "Ver menos" : "Haz tu requerimiento"}</button>
                </div>
            </div>
        </section>
    )
}