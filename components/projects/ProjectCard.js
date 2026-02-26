import Image from "next/image";
import Link from "next/link";
import { FaBath, FaBed, FaCropSimple } from "react-icons/fa6";

const Badges = {
    "#1 en galeria": <div className="absolute top-1 right-1 z-10 size-18 rounded-full border border-yellow-950 bg-[linear-gradient(45deg,#5a2f07_0%,#d4a017_25%,#fff3b0_50%,#d4a017_75%,#5a2f07_100%)] bg-[length:200%_100%] animate-shiny flex flex-col items-center justify-center text-xs font-medium text-shadow-sm/50 text-shadow-yellow-900 text-yellow-950 "><span className="text-xl font-bold ">#1</span> <p >en galeria</p> </div>,
    "Record en ventas 2022": <div className="absolute top-1 right-1 z-10 size-18 rounded-full border border-yellow-950 bg-[linear-gradient(45deg,#5a2f07_0%,#d4a017_25%,#fff3b0_50%,#d4a017_75%,#5a2f07_100%)] bg-[length:200%_100%] animate-shiny flex flex-col items-center justify-center text-xs font-medium text-shadow-sm/50 text-shadow-yellow-900 text-yellow-950 text-center tracking-tighter leading-3 "><p>Record en ventas</p><span className="text-2xl font-bold">2022</span></div>
}

export default function ProjectCard({ project }) {
    let price = "Desde ";

    if (project.precio != 0 && project.smmlv) {
        price += project.precio + " SMML"
    } else if (project.precio != 0 && (!project.smmlv)) {
        price += "$ " + project.precio
    } else {
        price = project.status
    }

    const Tag = () => {
        if (project.status == "Lanzamiento") {
            return <div className="absolute w-36 h-36 top-0 left-0 overflow-hidden">
                <p className=" mix-blend-hard-light absolute z-20 bg-linear-to-r/decreasing from-primary to-accent border-6 border-double border-white  -bottom-1 -left-1 w-52 origin-bottom-left -rotate-45 text-center text-lg font-semibold text-white">{project.status}</p>
            </div>
        }
        if (project.status == "Ultimas Unidades") {
            return <div className="absolute w-36 h-36 top-0 left-0 overflow-hidden">
                <p className=" mix-blend-hard-light absolute z-20 bg-linear-to-r/decreasing from-primary to-secondary border-6 border-double border-white  -bottom-1 -left-1 w-52 origin-bottom-left -rotate-45 text-center text-lg font-semibold text-white">{project.status}</p>
            </div>
        }
    }

    const Badge = () => {
        if (project.badge != "") {
            return Badges[project.badge]
        }
    }
    return <article className="relative flex flex-col items-start justify-end  border-2 w-70 h-100 ">
        <Image src={project.img} fill className="-z-10 object-cover" alt={`${project.name } en ${project.around}, ${project.city}`}/>
        <div className="w-full h-full flex flex-col items-start justify-end gap-1 p-4 bg-linear-to-t from-black/70 from-30% to-transparent text-white">
            <p className="text-lg ">{project.city}</p>
            <h4 className="text-2xl font-bold">{project.name}</h4>
            <p className="text-lg font-extralight">{project.around}</p>
            <span className="text-xl font-semibold">{price}</span>
            <ul className="flex gap-2 w-full ">
                <li className="flex items-center text-base gap-1 "><FaCropSimple className="text-lg" /> Desde {project.area}m²</li>
                <li className="flex items-center text-base gap-1 "><FaBed className="text-lg" />{project.bedrooms}</li>
                <li className="flex items-center text-base gap-1 "><FaBath className="text-lg" />{project.bathrooms}</li>
            </ul>
            <Link href="/" className=" border-2 w-full px-2 py-1 text-center">Ver detalles</Link>
        </div>
        <Tag />
        <Badge/>
    </article>
}