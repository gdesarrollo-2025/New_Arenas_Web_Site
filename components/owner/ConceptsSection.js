import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import PopUpCard from "../layout/PopUpCard";

const conceptos = [
  {
    title: "Saldo Anterior",
    short: "Dinero girado el mes anterior.",
    long: "Se refiere al dinero que Arenas le giró al propietario en el mes anterior y que se refleja en el estado de cuenta actual."
  },
  {
    title: "Comisión Canon",
    short: "Comisión por administrar el canon.",
    long: "Es la comisión que Arenas cobra al propietario por la administración del inmueble, calculada sobre el valor del canon de arrendamiento."
  },
  {
    title: "IVA Comisión Canon",
    short: "IVA sobre la comisión del canon.",
    long: "Corresponde al 19 % de IVA aplicado sobre el valor de la comisión del canon que se cobra al propietario."
  },
  {
    title: "Canon de arrendamiento",
    short: "Pago mensual del inmueble.",
    long: "Es el valor mensual que el arrendatario paga por el uso del inmueble, según lo establecido en el contrato de arrendamiento."
  },
  {
    title: "Comisión Admon",
    short: "Comisión por gestión administrativa.",
    long: "Es la comisión que Arenas cobra al propietario por las gestiones administrativas relacionadas con la administración del inmueble."
  },
  {
    title: "IVA comisión Admon",
    short: "IVA sobre la comisión administrativa.",
    long: "Corresponde al 19 % de IVA aplicado sobre el valor de la comisión por administración del inmueble."
  },
  {
    title: "Pago Arriendo",
    short: "Registro del pago del arriendo.",
    long: "Este concepto se muestra en el estado de cuenta para cruzar o compensar valores con el concepto de saldo anterior."
  },
  {
    title: "Seguro Canon",
    short: "Seguro del arrendamiento.",
    long: "Es la cuota mensual cobrada por la aseguradora correspondiente al seguro de arrendamiento del inmueble."
  },
  {
    title: "Seguro Admon",
    short: "Seguro de administración.",
    long: "Corresponde a la cuota mensual que cobra la aseguradora por el seguro asociado a la administración del inmueble."
  },
  {
    title: "Seguro IVA",
    short: "Seguro asociado al IVA.",
    long: "Es la cuota mensual cobrada por la aseguradora correspondiente al componente de IVA dentro del seguro contratado."
  },
  {
    title: "Reembolsos",
    short: "Devolución de gastos pagados.",
    long: "Se refiere a los descuentos realizados cuando el arrendatario ha pagado gastos que son responsabilidad del propietario, como cambios de contadores."
  },
  {
    title: "Retenciones",
    short: "Descuentos exigidos por ley.",
    long: "Son las retenciones que, por obligación legal, se deben aplicar según el régimen tributario al que pertenece el arrendatario."
  },
  {
    title: "Promoción y mercadeo",
    short: "Descuento promocional inicial.",
    long: "Es un descuento que Arenas aplica una única vez el primer mes de pago y corresponde al 20 % del valor del canon."
  },
  {
    title: "Cancelación cuota ",
    short: "Pago de cuota pendiente.",
    long: "Corresponde al descuento que Arenas aplica para cancelar una cuota previamente generada, usualmente relacionada con promociones o anticipos."
  },
  {
    title: "Cobro de administración de anticipo",
    short: "Cobro por anticipos administrativos.",
    long: "Hace referencia al cobro en cuotas de los gastos administrativos generados por anticipos realizados anteriormente, como la cancelación de la cuota N."
  }
];


export default function ConceptsSection() {
  const [isOpen, setIsOpen] = useState({})

  return (
    <section className="container-custom my-10">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col items-center ">
          <p className="text-lg"> Conoce los conceptos de tu</p>
          <h2 className="text-3xl text-primary"> Estado de cuenta</h2>
          <hr className="w-3/4 border-2 border-primary" />
        </div>
        <div className=" bg-linear-to-tr/decreasing from-primary to-accent bg-clip-text grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-3 gap-y-2  ">
          {conceptos.map((c, id) => (
            <div key={id} className=" h-46 px-2 py-1 flex flex-col gap-1 items-center justify-around shadow-md rounded-[10px]">
              <h3 className="text-lg font-semibold text-center text-pretty text-transparent ">{c.title}</h3>
              <p className="text-sm text-center w-full ">{c.short}</p>
              <button type="button" onClick={() => setIsOpen({ [id]: true })} className="flex items-center gap-2 border-2 px-2 py-1 rounded-[10px] hover:font-semibold text-accent border-accent"> Ver mas <FaPlus className="" /> </button>
              {isOpen[id] &&
                <PopUpCard open={isOpen[id]} onClose={() => setIsOpen({ [id]: false })}>
                  <div className="w-[80vw] sm:w-full h-50 flex flex-col items-center justify-center px-4 py-2 gap-3">
                    <h3 className="text-lg font-semibold text-center text-pretty text-accent ">{c.title}</h3>
                    <p className="text-sm lg:text-base  w-full text-justify text-pretty">{c.long}</p>
                  </div>
                </PopUpCard>
              }
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}