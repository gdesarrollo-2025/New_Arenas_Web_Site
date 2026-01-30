import Image from 'next/image';

export default function RequestSAC({ onShowForm, open }) {
    return (
        <section className="h-auto sm:h-125 px-5">
            <div className="container-custom flex flex-col sm:flex-row h-full place-self-center items-center justify-between rounded-xl bg-primary text-white">
                <div className="relative h-80 sm:h-full w-full sm:w-5/12">
                    <Image src="/images/sac1.webp" alt="servicio al cliente" sizes="(max-width: 768) 45vw" className="object-contain" fill priority />
                </div>
                <div className="h-full w-full sm:w-7/12  p-5 sm:p-10 flex flex-col justify-center gap-10 order-first sm:order-2">
                    <div>
                        <h2 className="text-xl md:text-2xl font-medium">Servicio al Cliente</h2>
                        <h1 className="text-2xl md:text-4xl font-semibold">Radique su solicitud</h1>
                        <hr className="border-2  rounded-lg w-3/4" />
                    </div>
                    <p className=" text-sm md:text-lg text-justify font-medium">Gracias por confiar en nosotros, queremos brindarte un servicio excepcional;
                        por eso nuestros canales de comunicación siempre estarán disponibles para ti.
                        Si tienes algún requerimiento puedes radicarlo a través del siguiente formulario.</p>
                    <button onClick={onShowForm} type="button" className="self-center border-2 border-white rounded-full min-w-50 px-2 py-1 hover:bg-accent hover:scale-102 active:scale-98"> {open ? "Ver menos" : "Haz tu requerimiento"}</button>
                </div>
            </div>

        </section>
    )
}