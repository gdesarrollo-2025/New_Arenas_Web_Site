import Image from "next/image";
import { FaBriefcase, FaBuilding, FaChartLine, FaHandshake, FaUser, FaWrench } from "react-icons/fa";
import { FaShield } from "react-icons/fa6"

export default function IdentitySection() {
    return <section className="container-custom  text-center flex flex-col items-center gap-10 my-10">
        <h2 className="text-2xl sm:text-4xl text-primary"> Un ecosistema inmobiliario en acción</h2>
        <p className="text-lg sm:text-xl w-2/3 ">Conectamos <strong className="text-primary"> personas, negocios, espacios y servicios </strong>para generar valor real,
            impulsar decisiones inteligentes y construir relaciones inmobiliarias sólidas y confiables.</p>
        <div className="flex flex-col sm:flex-row justify-center gap-5">
            <div className="shadow-md rounded-[10px] max-h-52 max-w-50 text-balance  flex flex-col justify-center gap-3 p-2">
                <h3 className="bg-linear-to-tr from-blue-500 to-blue-300 bg-clip-text font-semibold text-transparent ">¿Qué conectamos?</h3>
                <div className="flex justify-center relative w-fit  self-center">
                    <FaBuilding className="size-14 text-blue-300" />
                    <div className="absolute flex gap-2 self-end text-blue-400 ">
                        <FaUser className=" size-10" />
                        <FaWrench className=" size-10" />
                    </div>
                    <FaBriefcase className="absolute size-8 text-blue-500 self-end -bottom-0.5" />
                </div>
                <p> Personas, negocios, espacios y servicios.</p>
            </div>
            <div className="shadow-sm rounded-[10px] max-h-52 w-50 text-balance flex flex-col justify-center gap-3 ">
                <h3 className="bg-linear-to-tr from-orange-500 to-orange-300 bg-clip-text font-semibold text-transparent ">¿Qué generamos?</h3>
                <FaChartLine className="size-14 self-center text-orange-400" />
                <p>Valor socioeconómico y comercial real.</p>
            </div>
            <div className="shadow-sm rounded-[10px] max-h-52 w-50 text-balance flex flex-col justify-center gap-3">
                <h3 className="bg-linear-to-tr from-lime-600 to-lime-300 bg-clip-text font-semibold text-transparent ">¿Cómo lo hacemos?</h3>
                <div className="relative flex justify-center w-fit self-center">
                    <FaShield className="size-14 text-lime-300" />
                    <FaHandshake className="absolute size-12 text-lime-600 self-end" />
                </div>
                <p>Con seguridad, confianza y profesionalismo.</p>
            </div>
        </div>
        <p className="text-lg sm:text-xl w-2/3">Todo esto es posible gracias a un profundo conocimiento del mercado y
            a la innovación constante en nuestros procesos y en la experiencia de cada cliente.</p>
    </section>
}