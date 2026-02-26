import Image from "next/image";

const Info = [
    {
        text: "Descarga el cupón de pago, podrá realizar el pago con el código de barras digital en cajeros multifuncionales con lector de código de barras.",
        link: "https://www.youtube.com/watch?v=Kbi5ZeQfgM8"
    },
    {
        text: "Pague su arriendo en efectivo o cheque en cualquier oficina del grupo Bancolombia del país. Haz clic en el siguiente enlace para hallar la más cercana.",
        link: "https://www.bancolombia.com/puntos-de-atencion"
    },
    {
        text: "Puedes hacer tus pagos en sitios autorizados como Almacenes Éxito, Almacenes Olímpica o en cualquier Corresponsal Bancolombia del país.",
        link: "https://www.bancolombia.com/puntos-de-atencion"
    },
]

export default function TypePaymentsArticle() {
    return <article className="flex flex-col md:grid md:grid-cols-3 gap-4">
        <h3 className="col-span-full text-center font-semibold text-primary">Opciones de pago disponible</h3>
        <div className="group relative overflow-hidden h-50  shadow-lg/30 text-justify rounded-xl flex flex-col gap-2 items-center justify-center" tabIndex={1}>
            <div className="absolute  w-full h-full ">
                <Image src="/images/Cajero.webp" fill className="object-cover mask-t-from-40% mask-t-to-85% blur-[1px]" alt="Metodo de pago cajero multifuncional"/>
            </div>
            <div className="z-20 absolute inset-0 bg-primary/50 flex flex-col items-center justify-center">
                <div className="absolute flex flex-col  justify-center items-center group-hover:opacity-0  group-focus-within:opacity-0 transition-all">
                    <div className="relative h-10 md:h-8 lg:h-10 w-52 md:w-44 lg:w-52 place-self-center m-2 ">
                        <Image src="/images/Bancolombia_S.A._logo.webp" fill className="object-scale-down" alt="Logo Bancolombia"/>
                    </div>
                    <h4 className="font-semibold text-white text-lg ">Cajero Automatico</h4>
                </div>
                <div className="flex flex-col items-center gap-2 text-white opacity-0 group-hover:opacity-100  group-focus-within:opacity-100 transition-all px-4 ">
                    <p>{Info[0].text}</p>
                    <a href={Info[0].link} className="border-light text-light hover:border-accent hover:text-accent hover:brightness-150 active:border-accent/75 active:text-accent/75 border-2 px-1 py-0.5 rounded-[10px] hidden group-hover:inline-block group-focus-within:inline-block transition-discrete">Ver mas</a>
                </div>
            </div>

        </div>
        <div className="group relative overflow-hidden h-50  shadow-lg/30 text-justify rounded-xl flex flex-col gap-2 items-center justify-center" tabIndex={1}>
            <div className="relative w-full h-full">
                <Image src="/images/Efectivo.webp" fill className="object-cover mask-t-from-40% mask-t-to-85% blur-[2px]" alt="Efectivo o cheque "/>
            </div>
            <div className="z-20 absolute inset-0 bg-primary/50 flex flex-col justify-center items-center">
                <h4 className="absolute font-bold text-xl text-black group-hover:opacity-0 transition-all group-focus-within:opacity-0">Efectivo o Cheque</h4>
                <div className="flex flex-col items-center gap-2 text-white opacity-0 group-hover:opacity-100  group-focus-within:opacity-100 transition-all px-4 ">
                    <p>{Info[1].text}</p>
                    <a href={Info[1].link} className="border-2 border-light text-light hover:border-accent hover:text-accent hover:brightness-150 active:border-accent/75 active:text-accent/75 px-1 py-0.5 rounded-[10px] hidden group-hover:inline-block group-focus-within:inline-block transition-discrete">Ver mas</a>
                </div>
            </div>
        </div>
        <div className="group relative overflow-hidden h-50  shadow-lg/30 text-justify rounded-xl  flex flex-col gap-2 items-center justify-center" tabIndex={1}>
            <div className="relative w-full h-full">
                <Image src="/images/Otros.webp" fill className="object-cover mask-t-from-40% mask-t-to-85% blur-[2px]" alt="Otros supermercados"/>
            </div>
            <div className="z-20 absolute inset-0 bg-primary/50 flex flex-col justify-center items-center">
                <h4 className="absolute font-bold text-xl text-black group-hover:opacity-0 transition-all group-focus-within:opacity-0">Otras alternativas</h4>
                <div className="flex flex-col items-center gap-2 text-white opacity-0 group-hover:opacity-100  group-focus-within:opacity-100 transition-all px-4 ">
                    <p>{Info[2].text}</p>
                    <a href={Info[2].link} className="border-2 border-light text-light hover:border-accent hover:text-accent hover:brightness-150 active:border-accent/75 active:text-accent/75 px-1 py-0.5 rounded-[10px] hidden group-hover:inline-block group-focus-within:inline-block transition-discrete">Ver mas</a>
                </div>
            </div>
        </div>
    </article>
}