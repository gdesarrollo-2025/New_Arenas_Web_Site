const conceptos = [
    {
        title: "Saldo Anterior",
        text: "Este concepto se refiere al dinero que Arenas le gira el mes anterior."
    },
    {
        title: "Comisión Canon",
        text: "Este concepto se refiere a la comisión que le cobra Arenas al propietario por la administración del inmueble."
    },
    {
        title: "IVA Comisión Canon",
        text: "Este concepto se refiere al descuento que Arenas le realiza y corresponde al 19 % del valor de la comisión del canon."
    },
    {
        title: "Canon de arrendamiento",
        text: "Este concepto hace referencia al pago mensual que realiza el arrendatario por el arrendamiento del inmueble."
    },
    {
        title: "Comisión Admon",
        text: "Este concepto se refiere a la comisión que le cobra Arenas al propietario por las gestiones que se realizan sobre la administración del inmueble."
    },
    {
        title: "IVA comisión Admon",
        text: "Este concepto hace referencia al descuento que Arenas le realiza y corresponde al 19 % del valor de la comisión de la administración."
    },
    {
        title: "Pago Arriendo",
        text: "Este concepto aparece en el estado de cuenta para cruzar con concepto saldo anterior."
    },
    {
        title: "Seguro Canon",
        text: "Este concepto hace referencia a la cuota mensual de la aseguradora por concepto de seguro de arrendamiento."
    },
    {
        title: "Seguro Admon",
        text: "Este concepto hace referencia a la cuota mensual de la aseguradora por concepto de administración."
    },
    {
        title: "Seguro IVA",
        text: "Este concepto hace referencia a la cuota mensual de la seguradora por concepto de seguro de IVA."
    },
    {
        title: "Reembolsos",
        text: "Se refiere a descuentos que se le realizan cuando el arrendatario haya pagado gastos a cargo del propietario, como cambio de contadores."
    },
    {
        title: "Retenciones",
        text: "Este concepto se refiere a las retenciones que por ley se deben aplicar y dependiendo del régimen al que pertenece el arrendatario."
    },
    {
        title: "Promoción y mercadeo",
        text: "Este concepto se refiere al descuento que Arenas le realiza el primer mes de pago una única vez y corresponde al 20 % del valor del canon."
    },
    {
        title: "Cancelación cuota N.",
        text: "Este concepto se refiere al descuento que Arenas le realiza el primer mes de pago una única vez y corresponde al 20 % del valor del canon."
    },
    {
        title: "Cobro de administración de anticipo",
        text: "Este concepto hace referencia al cobro que le realiza Arenas en cuotas por los gastos administrativos generados por los anticipos antes realizados(Cancelación cuota N.)"
    },
]

export default function ConceptsSection() {
    return (
        <section className="container-custom my-10">
            <div className="flex flex-col gap-3">
                <div className="flex flex-col items-center ">
                    <p className="text-lg"> Conoce los conceptos de tu</p>
                    <h2 className="text-3xl"> Estado de cuenta</h2>
                    <hr className="w-3/4 border-2 border-gray-500" />
                </div>
                <div className="grid grid-cols-2 gap-x-1 gap-y-0.5">
                    {conceptos.map((c, id) => (
                        <div key={id} className={`min-h-auto flex flex-col justify-start transition-all duration-150`}>
                            <button className="text-sm sm:text-lg   focus:text-accent sm:p-1 peer w-full items-center border-b rounded-full border-black focus:border-primary focus:font-semibold">{c.title}</button>
                            <div className="text-xs text-balance text-justify sm:text-sm px-2 max-h-0 overflow-hidden peer-focus:max-h-32 transition-all">{c.text}</div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    )
}