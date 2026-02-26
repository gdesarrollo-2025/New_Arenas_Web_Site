import {
    FaRegFileLines,
    FaUsers,
    FaUserCheck,
    FaFolder,
    FaCalendarDays,
    FaBullhorn,
    FaMagnifyingGlass,
    FaHubspot
} from "react-icons/fa6";

const icons = {
    "AsesoriaDocumentos": <FaRegFileLines className="size-full " />,
    "ReunionSemanal": <FaUsers className="size-full " />,
    "IngresosyRequisitos": <FaUserCheck className="size-full " />,
    "TramiteCartera": <FaFolder className="size-full " />,
    "CoordinaciónEventos": <FaCalendarDays className="size-full " />,
    "MarketingInmobiliario": <FaBullhorn className="size-full " />,
    "Auditoria": <FaMagnifyingGlass className="size-full " />,
    "SoftwareComercial": <FaHubspot className="size-full " />,
}

const Services = [
    {
        text: "Asesoria y elaboración de documentos",
        icon: "AsesoriaDocumentos"
    },
    {
        text: "Reunión semanal con gerencia",
        icon: "ReunionSemanal"
    },
    {
        text: "Asesoria a los clientes sobre ingresos y requisitos",
        icon: "IngresosyRequisitos"
    },
    {
        text: "Tramites y cartera",
        icon: "TramiteCartera"
    },
    {
        text: "Coordinación de eventos",
        icon: "CoordinaciónEventos"
    },
    {
        text: "Marketing",
        icon: "MarketingInmobiliario"
    },
    {
        text: "Auditoria de servicio al cliente",
        icon: "Auditoria"
    },
    {
        text: "Nuestro software comercial",
        icon: "SoftwareComercial"
    },
]

export default function OurServicesSection() {
    return <section className="bg-white py-5 ">
        <div className="container-custom flex flex-col items-center gap-2 text-center text-balance">
            <h2 className="text-primary text-2xl">Nuestros servicios</h2>
            <hr className="border-2 border-primary w-full md:w-1/2 " />
            <p className="text-sm">Ponemos a tu disposicion un equipo integral que se adapta a tu proyecto. Desde la legalización hasta la venta, cubrimos todo el proceso</p>
            <ul className="grid grid-flow grid-cols-2 md:grid-cols-4  lg:grid-cols-6 xl:grid-cols-8 gap-3 place-self-center pt-3">
                {Services.map((s, idx) => (
                    <li key={idx} className="shadow-md rounded-[10px] p-3 w-36 h-36 flex flex-col items-stretch justify-center text-center gap-2 ">
                        <span className="w-full h-1/3  text-primary ">{icons[s.icon]}</span>
                        <p className="w-full h-2/3  text-pretty text-xs md:text-sm">{s.text}</p>
                    </li>
                ))}
            </ul>
        </div>
    </section>
}