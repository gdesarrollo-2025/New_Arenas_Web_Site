import { useState } from "react";

export default function MobileMenuButton({ name, links }) {
    const [open, setOpen] = useState(false);

    const toggle = () => setOpen((prev) => !prev);

    return (
        <div className="w-full text-center border-1 ">
            <button
                name={name}
                onClick={toggle}
                className={`w-full py-3 text-black transiton-all ease-in-out duration-400
                ${open ? 'bg-light text-primary' : ' '} `}
            ><label className={`w-full text-center border-b-2 hover:text-primary transition-[border] duration-500 ease-in-out 
            ${ open ? 'border-primary':'border-white hover:border-primary'}`}>{name}</label></button>
            <div className={`flex flex-col items-center transition-all duration-600 ease-in-out bg-light text-black
            ${open ? 'max-h-100 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'} `}>
                {links.map((link, index) => (
                    <a key={index} href={link.href}
                        className="w-full md:w-1/4 border-b-2  border-light text-center hover:border-primary hover:text-primary transition-[border] duration-500 ease-in-out" >
                        {link.title}
                    </a>
                ))
                }
            </div>
        </div>
    )
}