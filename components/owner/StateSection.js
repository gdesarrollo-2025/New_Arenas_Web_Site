import Link from "next/link";
import Lottie from "react-lottie-player";
import Data from "../../public/images/data-1.json";

export default function StateSection() {
    return (
        <section className="bg-white h-auto py-10 px-2">
            <div className="container-custom h-full flex flex-col sm:flex-row gap-5 justify-around items-center">
                <div className="w-full sm:w-1/2 h-full flex flex-col gap-4 justify-center ">
                    <div>
                        <p>Recuerda que puedes descargar tus</p>
                        <h2>Facturas y estado de cuentas</h2>
                    </div>
                    <hr className="w-2/3 border-2 rounded-full border-primary" />
                    <div className="flex flex-col gap-4 items-center ">
                        <p className="text-justify text-balance ">Para ingresar a sus estados de cuenta, en la casilla <strong>Documento </strong>
                            digite su cédula o NIT sin el dígito de verificación, luego en la casilla <strong>Clave</strong> anote
                            <strong> 0000</strong> (esta será su clave inicial). Una vez haya ingresado el sistema le requerirá por su seguridad
                            un <strong>cambio de contraseña</strong>.</p>
                        <Link href="https://simidocs.siminmobiliarias.com/base/simired/simidocsapi1.0/index.php?inmo=667&tipo=1"
                            className="bg-transparent text-black w-fit px-5 py-2 rounded-lg border-2 border-primary  hover:bg-primary hover:text-white active:bg-primary active:text-white">Ingresa aqui</Link>
                    </div>
                </div>
                {/* w-1/3 h-2/3 */}
                <Lottie loop animationData={Data} play className=" w-full sm:w-1/3 h-fit self-center" />
            </div>
        </section>
    )
}