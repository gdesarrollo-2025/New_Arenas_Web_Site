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
        title: "Expertos en comercialización de proyectos",
        items: ["Equipo especializado y atención personalizada"
            , "Capacitación continua"
            , "Estrategias comerciales dinámicas"
            , "Optimización de procesos"
            , "Conocimiento del journey del cliente"
            , "Protocolos de atención"]
    },
    {
        title: "Proceso comercial disciplinado con CRM propio",
        items: ["Gestión y seguimiento de leads"
            , "Evolución constante del CRM"
            , "Capacitación permanente del equipo"
            , "Monitoreo de uso"
            , "Protocolos de atención"]
    },
    {
        title: "⭐ Hacemos el mercadeo del proyecto ",
        items: ["Agencia especializada in-house"
            , "Sinergia entre marketing y ventas"
            , "Conocimiento del mercado y del producto"]
    },
    {
        title: "⭐ Gestionamos trámites y cartera del proyecto ",
        items: ["Equipo especializado"
            , "Dominio del proceso comercial y fiduciario"
            , "Relación con notaría y fiducia"
            , "Integración CRM y smarthome"]
    },
    {
        title: "⭐ Análisis permanente del mercado ",
        items: ["Equipo experto"
            , "Lectura de tendencias"
            , "Información de galería inmobiliaria"
            , "Tecnología con datos históricos"]
    },
    {
        title: "Asesoría integral y búsqueda del lote ideal",
        items: ["Captación especializada"
            , "Estrategias comerciales dinámicas"]
    },
    {
        title: "Conexión con curaduría, notaría y planeación",
        items: ["Relacionamiento institucional"]
    },

    /*

title:"Expertos en comercialización de proyectos
items:["Equipo especializado y atención personalizada"
,"Capacitación continua"
,"Estrategias comerciales dinámicas"
,"Optimización de procesos"
,"Conocimiento del journey del cliente"
,"Protocolos de atención"]

title:"Proceso comercial disciplinado con CRM propio
items:["Gestión y seguimiento de leads"
,"Evolución constante del CRM"
,"Capacitación permanente del equipo"
,"Monitoreo de uso"
,"Protocolos de atención"]

title:"⭐ Hacemos el mercadeo del proyecto (Destacar)
items:["Agencia especializada in-house"
,"Sinergia entre marketing y ventas"
,"Conocimiento del mercado y del producto"]

title:"⭐ Gestionamos trámites y cartera del proyecto (Destacar)
items:["Equipo especializado"
,"Dominio del proceso comercial y fiduciario"
,"Relación con notaría y fiducia"
,"Integración CRM y smarthome"]

title:"⭐ Análisis permanente del mercado (Destacar)
items:["Equipo experto"
,"Lectura de tendencias"
,"Información de galería inmobiliaria"
,"Tecnología con datos históricos"]

title:"Asesoría integral y búsqueda del lote ideal
items:["Captación especializada"
,"Estrategias comerciales dinámicas"]

title:"Conexión con curaduría, notaría y planeación
items:["Relacionamiento institucional"] 
     */
]

export default function OurServicesSection() {
    return <section className="bg-white py-5 ">
        <div className="container-custom flex flex-col items-center gap-2 text-center text-balance">
            <h2 className="text-primary text-2xl">Nuestros servicios</h2>
            <hr className="border-2 border-primary w-full md:w-1/2 " />
            <p className="text-sm">Ponemos a tu disposicion un equipo integral que se adapta a tu proyecto. Desde la legalización hasta la venta, cubrimos todo el proceso</p>
            <ul className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 ">
                {Services.map((s,idx) => (
                    <li key={idx} className={`shadow-md rounded-[10px] overflow-hidden ${s.title.match("⭐")? "border-accent border-2 ":"border-0"}`}>
                        <h3 className={`font-semibold  p-3 ${s.title.match("⭐")? "bg-accent":"bg-primary text-white"}`}>{s.title}</h3>
                        <ul className="text-left p-3">
                            {s.items.map((i,idx) => (
                                <p key={idx} className="text-sm  ">{i}</p>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    </section>
}