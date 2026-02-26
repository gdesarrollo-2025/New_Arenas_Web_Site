import Link from "next/link";
import Image from "next/image";
import { FaFileInvoiceDollar } from "react-icons/fa";

export default function PaymentsSection() {
    return <section className="container-custom flex flex-col gap-5 py-10">
        <div className="h-fit self-center text-center w-full">
            <p>Elige cómo deseas gestionar tus pagos</p>
            <h2 className="text-primary text-3xl">Pagos y facturación</h2>
            <hr className="w-5/6 sm:w-1/2 place-self-center border-2 border-primary" />
        </div>
        <div className="w-full h-fit">
            <div className="flex flex-col gap-5 lg:hidden">
                <Link href="https://www.psepagos.co/PSEHostingUI/ShowTicketOffice.aspx?ID=5025" className="flex border-2 items-center justify-around  p-3 bg-secondary/50 rounded-[10px] text-white">
                    <div className="w-4/5">
                        <h3 className="text-lg font-semibold">PSE</h3>
                        <p className="text-balance ">Paga en linea de forma rapida y segura</p>
                    </div>
                    <div className="relative size-16 ">
                        <Image src="/images/logo-pse-1.webp" fill className="object-contain" alt="PSE" />
                    </div>
                </Link>
                <Link href="https://simidocs.siminmobiliarias.com/base/simired/simidocsapi1.0/index.php?inmo=667&tipo=2" className="flex border-2 items-center justify-around p-3 flex-row-reverse bg-secondary/50 rounded-[10px] text-white">
                    <div className="w-4/5 text-right flex flex-col items-end">
                        <h3 className="text-lg font-semibold">Facturas</h3>
                        <p className="text-balance w-fit ">Descargas tus facturas y cupones de pago con codigo de barras</p>
                    </div>
                    <FaFileInvoiceDollar className="size-16" />
                </Link>
            </div>
            <div className=" hidden w-full lg:flex justify-between overflow-hidden rounded-md">
                <div className="group relative h-[50vh] w-1/2 hover:w-[60%] transition-all overflow-hidden">
                    <Image src="/images/Pse.webp" fill className="object-cover scale-100 group-hover:scale-105 transition-transform duration-700 ease-in-out" />
                    <div className="absolute inset-0 grid bg-primary/75 group-hover:bg-primary/45 backdrop-blur-sm group-hover:backdrop-blur-xs transition-all duration-700 ease-in-out ">
                        <div className="relative size-50 place-self-center opacity-100 group-hover:opacity-0 transition-all duration-600">
                            <Image src="/images/logo-pse-1.webp" fill className="object-cover" />
                        </div>
                        <div className="absolute inset-0  flex flex-col justify-center items-center translate-y-60 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 gap-4">
                            <h3 className="text-3xl text-white font-semibold">Pagos en linea</h3>
                            <p className="text-xl text-white text-balance">Pagas tus servicios de forma rapida y segura</p>
                            <Link className="border-2 border-light text-light hover:border-accent hover:text-accent hover:brightness-150 active:border-accent/75 active:text-accent/75 px-2 py-1 rounded-[10px]" 
                            href="https://www.psepagos.co/PSEHostingUI/ShowTicketOffice.aspx?ID=5025">Realizar mi pago</Link>
                        </div>
                    </div>
                </div>
                <div className="group relative h-[50vh] w-1/2 hover:w-[60%] transition-all overflow-hidden">
                    <Image src="/images/Facturas.webp" fill className="object-cover scale-100 group-hover:scale-105 transition-transform duration-700 ease-in-out" />
                    <div className="absolute inset-0 grid bg-primary/75 group-hover:bg-primary/45 backdrop-blur-sm group-hover:backdrop-blur-xs transition-all duration-700 ease-in-out">
                        <FaFileInvoiceDollar className=" text-white  rounded-full size-40 place-self-center opacity-100 group-hover:opacity-0 transition-all duration-600" />
                        <div className="absolute inset-0  flex flex-col justify-center items-center translate-y-60 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 gap-4">
                            <h3 className="text-3xl text-white font-semibold">Facturas</h3>
                            <p className="text-xl text-white text-balance">Descargas tus facturas y cupones de pago con codigo de barras</p>
                            <Link className="border-2 border-light text-light hover:border-accent hover:text-accent hover:brightness-150 active:border-accent/75 active:text-accent/75 px-2 py-1 rounded-[10px]" 
                            href="https://simidocs.siminmobiliarias.com/base/simired/simidocsapi1.0/index.php?inmo=667&tipo=2">Obtener mi factura / cupon de pago</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
}