
import HubspotForm from "../../components/form/HubspotForm";

export default function StepByStepSection({ open, formRef}) {
    return (
        <section className="container-custom my-10 flex flex-col">
            <div className={`${open ? "overflow-hidden max-h-0 opacity-0" : "max-h-auto opacity-100"} transition-all duration-150 self-center flex flex-col w-full lg:w-2/3`}>
                <div className="self-center text-center">
                    <h2>Paso a Paso</h2>
                    <hr className="w-44 border-2 border-gray-400 rounded-full" />
                </div>
                <div className="w-1/2 border-r-3 border-gray-400 flex pt-5">
                    <div className="rounded-xl shadow-md border-2 text-balance w-40 md:w-70  px-4 py-2 ">
                        <h3 className="font-semibold">Acceso al formulario</h3>
                        <p>Haz click en el boton "Haz tu requirimiento"</p>
                    </div>
                    <hr className="grow self-center border-2 border-gray-400" />
                </div>
                <div className="w-1/2 border-l-3 border-gray-400 flex self-end mr-[2.5px] pt-5">
                    <hr className="grow self-center border-2 border-gray-400" />
                    <div className="rounded-xl shadow-md border-2 text-balance w-40 md:w-70  px-4 py-2 ">
                        <h3 className="font-semibold">Completa el formulario</h3>
                        <p>Rellena con tu información de contacto </p>
                    </div>
                </div>
                <div className="w-1/2 border-r-3 border-gray-400 flex py-5">
                    <div className="rounded-xl shadow-md border-2 text-balance w-40 md:w-70  px-4 py-2 ">
                        <h3 className="font-semibold">Comentanos tu solicitud</h3>
                        <p>Escribe el asunto, tipo y mas detalles sobre tu solicitud</p>
                    </div>
                    <hr className="grow self-center border-2 border-gray-400" />
                </div>
                <div className="flex flex-col self-center gap-2">
                    <hr className="w-1/2 self-center border-2 border-gray-400" />
                    <h3 className="text-center">¡Listo, ahora solo espera nuestra respuesta!</h3>
                </div>
            </div>
            <div ref={open ? formRef : null} className={`${open ? "max-h-auto opacity-100" : " max-h-0 overflow-hidden opacity-0"}`}>
                <HubspotForm visible={open} />
            </div>
        </section>
    )
}