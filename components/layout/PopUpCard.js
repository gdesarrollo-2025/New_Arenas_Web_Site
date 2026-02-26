"use client"

import { createPortal } from "react-dom"
import { useEffect } from "react"

export default function PopUpCard({ onClose, children }) {


    useEffect(()=> {
        document.body.style.overflow = "hidden";

    return () => {
        document.body.style.overflow = "auto";
    };
    },[])

    return createPortal(
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/30 backdrop-blur-sm" onClick={(e) => {e.stopPropagation(); onClose()}}>
            <div className=" max-w-lg md:max-w-2xl lg:max-w-4xl h-fit  bg-light rounded-[10px] border-6 border-double border-accent" onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>, document.body)
}