import Link from "next/link";
import Lottie from "react-lottie-player";
import Data from "../../public/images/data-1.json";
import { FaIdCard, FaLock, FaLockOpen } from "react-icons/fa6";

export default function StateSection() {
    return (
        <section className="bg-secondary h-auto py-10 px-2">
            <div className="container-custom h-full flex flex-col sm:flex-row gap-5 justify-around items-center">
                <div className="w-full sm:w-1/2 h-full flex flex-col gap-4 justify-center ">
                    <div className="text-white">
                        <p className="text-white/75">Recuerda que puedes descargar tus</p>
                        <h2 className="brightness-150 text-accent">Facturas y estado de cuentas</h2>
                    </div>
                    <hr className="w-2/3 border-2 rounded-full border-light" />
                    <div className="flex flex-col gap-4 items-center  text-white">
                        <p className="w-full">Para ingresar y visaulizar los estados de cuenta recuerda que:</p>
                        <ul className="flex flex-col gap-3">
                            <li className="flex items-center gap-2 "> <FaIdCard className="text-xl mix-blend-overlay" /> <p>Digitar su cedula o NIT sin el digito de verificación en el campo <strong className="brightness-150 text-accent">Documento</strong></p></li>
                            <li className="flex items-center gap-2 "> <FaLockOpen className="text-xl mix-blend-overlay" /> <p>Luego en la casilla <strong className="brightness-150 text-accent">Clave</strong> escribes <strong className="brightness-150 text-accent">0000</strong> (esta sera su clave inicial)</p></li>
                            <li className="flex items-center gap-2 "> <FaLock className="text-xl mix-blend-overlay" /> <p>Una vez haya ingresado al sistema, requerirá por su seguridad un <strong className="brightness-150 text-accent">cambio de contraseña</strong></p></li>
                        </ul>
                        <Link href="https://simidocs.siminmobiliarias.com/base/simired/simidocsapi1.0/index.php?inmo=667&tipo=1"
                            className="border-2 px-2 py-1 rounded-[10px]  hover:scale-110 active:scale-105 hover:brightness-150 active:brightness-125 hover:text-accent active:text-accent/75 hover:border-accent active:border-accent/75 transiton-all">Ingresa aqui</Link>
                    </div>
                </div>
                <div className="w-full sm:w-1/2 h-full order-1  bg-white/25 backdrop-blur-xs rounded-[10px]">
                 <Lottie loop animationData={Data} play className=" w-full h-full " />
                </div>
            </div>
        </section>
    )
}