import Image from "next/image";

export default function RequestSection({ open, onShowForm }) {
    return (
        <section className="container-custom ">
            <div className="bg-primary rounded-lg text-white flex flex-col sm:flex-row  gap-3 justify-center py-10 px-10 ">
                <div className="relative h-[500px] w-full sm:w-1/2 order-2 sm:order-1">
                    <Image src="/images/propietarios.webp" fill alt="imagen" className="object-contain" />
                </div>
                <div className="flex flex-col gap-5 w-full sm:w-1/2 justify-center order-1 sm:order-2">
                    <h2 className="text-center sm:text-justify text-2xl"> Estimados propietarios</h2>
                    <hr className="w-full lg:w-2/3 self-center sm:self-start" />
                    <p className="text-justify text-base">Gracias por confiar en Arenas Inmobiliaria, en este
                        espacio, como propietario, podrás realizar consultas, peticiones, solicitudes o
                        realizar anticipo del canon de arriendo de tu inmueble. También podrás descargar
                        tu estado de cuenta y conocer los conceptos
                    </p>
                    <button onClick={onShowForm} type="button" className="self-center border-2 border-white rounded-full min-w-50 px-2 py-1 hover:bg-accent hover:scale-102 active:scale-98"> {open ? "Ver menos" : "Haz tu requerimiento"}</button>
                </div>
            </div>
        </section>
    )
}