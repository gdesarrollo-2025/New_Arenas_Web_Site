'use client'
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaUsers, FaHouseUser, FaHandsHelping,FaCogs } from "react-icons/fa";
const icons = {
    "Inmuebles":<FaHouseUser/>,
    "Quienes somos":<FaUsers/>,
    "Nuestros Clientes":<FaHandsHelping/>,
    "Servicios":<FaCogs/>,
}

export default function MobileMenuButton({ name, links, reset }) {
    const [open, setOpen] = useState(false);

    const toggle = () => setOpen((prev) => !prev);

    useEffect(()=>{
        setOpen(false)
    },[reset])

    return (
        <div className={`mix-blend-screen w-full text-center ${open ?"bg-gray-100/15":""}  rounded-[10px] transition-all duration-700`}>
            <button
                name={name}
                onClick={toggle}
                className={`w-full py-3 text-white transiton-all ease-in-out duration-400  ${open ? ' text-accent' : ' '} `}>
                <label className={`flex justify-center items-center gap-2 px-10 w-full text-center duration-500 ease-in-out ${ open? "font-semibold":""}`}>
                    <span className="text-2xl"> {icons[name]}</span>
                    <span className={`text-center `}>{name}</span>
                </label>
            </button>
            <div className={`flex flex-col items-center transition-all duration-600 ease-in-out  text-white
            ${open ? 'max-h-100 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'} `}>
                {links.map((link, index) => (
                    <Link key={index} href={link.link}
                        className="w-full md:w-1/4   text-center  active:text-accent/75  duration-500 ease-in-out" >
                        {link.name}
                    </Link>
                ))
                }
            </div>
        </div>
    )
}