import Image from 'next/image';
import Link from 'next/link';

export default function FeaturedProperties() {
  return (
    <section className="h-auto bg-white">
      <div className=" container-custom h-[50vh] flex flex-col justify-center items-center text-center gap-5 py-12">
        <div className="flex flex-col gap-2">
          <p className="text-base xl:text-lg">Te presentamos nuestra oferta de </p>
          <h2 className="text-2xl xl:text-4xl text-bold text-primary ">Proyectos Inmobiliarios</h2>
        </div>
        <hr className="w-1/2 border-2 border-primary" />
        <p className="w-full md:w-1/2 text-balance"><strong>¿Estás interesado en algún proyecto?</strong> Te invitamos a conocer nuestra oferta de
          vivienda nueva, Locales Comerciales y Lotes/Bodegas Industriales.</p>
        <div className="w-full md:w-1/2 flex justify-between items-center">
          <Link href="#" className="w-fit h-fit px-2 py-1 border-2 border-black rounded-[10px] hover:text-accent active:text-accent/75 hover:border-accent active:border-accent/75 transition">Vivienda</Link>
          <Link href="#" className="w-fit h-fit px-2 py-1 border-2 border-black rounded-[10px] hover:text-accent active:text-accent/75 hover:border-accent active:border-accent/75 transition">Comercial</Link>
          <Link href="#" className="w-fit h-fit px-2 py-1 border-2 border-black rounded-[10px] hover:text-accent active:text-accent/75 hover:border-accent active:border-accent/75 transition">Inversión</Link>
        </div>
      </div>
    </section >
  );
}
