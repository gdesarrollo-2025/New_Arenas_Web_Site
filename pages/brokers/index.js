import Head from "next/head";
import Image from "next/image";
import { useState } from "react";

export default function Brokers() {
    const [id, setId]= useState("1")
    return <>
        <Head>
            <title>Locate Us | Arenas Real State</title>
            <meta name="description" content="Find and explore the best properties for sale and rent" />
            <link rel="icon" type="image/webp" href="/FAVICON.webp" />
        </Head>
        <div className="flex flex-col items-center justify-center h-screen w-screen">
            <div className="flex w-1/2 h-80 border-2 border-red-500 overflow-hidden snap-x scroll-smooth">
                <div className="flex flex-col items-center justify-center snap-center h-full w-full shrink-0 bg-linear-to-b from-yellow-100 from-80% to-yellow-200 " id="1">
                    <h2 >Esta es la pagina 1</h2>
                </div>
                <div className="flex flex-col items-center justify-center snap-center h-full w-full shrink-0 bg-linear-to-b from-yellow-200 from-80% to-yellow-300" id="2">
                    <h2 >Esta es la pagina 2</h2>
                </div>
                <div className="flex flex-col items-center justify-center snap-center h-full w-full shrink-0 bg-linear-to-b from-yellow-300 from-80% to-yellow-400" id="3">
                    <h2 >Esta es la pagina 3</h2>
                </div>
                <div className="flex flex-col items-center justify-center snap-center h-full w-full shrink-0  bg-yellow-400" id="4">
                    <h2 >Esta es la pagina 4</h2>
                </div>
            </div>
            <div className=" top-[37.5vh]  h-fit w-fit border-2 border-black p-2 ">
                <ul className="w-full flex  items-center gap-2 ">
                    <li className={`size-10 border-2 border-black rounded-full ${ id == "1"? "p-1 bg-clip-content bg-accent scale-110 ": "bg-transparent"} transition-all`} onClick={() => setId("1")}><a className="block size-full" href="#1"></a></li>
                    <li className={`size-10 border-2 border-black rounded-full ${ id == "2"? "p-1 bg-clip-content bg-accent scale-110 ": "bg-transparent"} transition-all`} onClick={() => setId("2")}><a className="block size-full" href="#2"></a></li>
                    <li className={`size-10 border-2 border-black rounded-full ${ id == "3"? "p-1 bg-clip-content bg-accent scale-110 ": "bg-transparent"} transition-all`} onClick={() => setId("3")}><a className="block size-full" href="#3"></a></li>
                    <li className={`size-10 border-2 border-black rounded-full ${ id == "4"? "p-1 bg-clip-content bg-accent scale-110 ": "bg-transparent"} transition-all`} onClick={() => setId("4")}><a className="block size-full" href="#4"></a></li>
                </ul>
            </div>

        </div>

    </>
}