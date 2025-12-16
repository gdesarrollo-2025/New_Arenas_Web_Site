import Lottie from "react-lottie-player";

import Importante from "../../public/images/importante.json";

export default function ImportantSection() {
    return (
        <section className="container-custom h-auto pt-10">
            <div className="bg-primary rounded-lg text-white flex  flex-col sm:flex-row h-full items-center justify-around p-5">
                <Lottie loop animationData={Importante} play className=" w-full sm:w-1/3 h-fit order-1" />
                <div className="w-full sm:w-1/2 order-2  flex flex-col gap-3">
                    <div className="flex flex-col gap-2">
                        <h3 className="font-semibold">Recuerda</h3>
                        <p>En su primer pago únicamente le serán cancelados los días proporcionales y estos se cuentan desde
                            el día que el arrendatario recibió el inmueble hasta el día 30 del mes, es decir, que si el
                            arrendatario ocupó el día 20 le serán cancelados 10 días de arriendo.</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h3 className="font-semibold">Importante</h3>
                        <p>Los pagos son realizados mes vencido, es decir, que usted recibirá cada mes el dinero entre el 6 y 8
                            día hábil del mes siguiente.</p>
                        <p className="text-sm font-extralight text-white/80 ">**La promoción y mercadeo corresponde al cobro que realiza la inmobiliaria al propietario por la publicidad
                            y la gestión comercial realizada para lograr el arrendamiento del inmueble.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
