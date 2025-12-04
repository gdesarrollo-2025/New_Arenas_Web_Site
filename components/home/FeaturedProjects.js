import Image from 'next/image';
import Link from 'next/link';

export default function FeaturedProjects() {
  return (
    <section className="relative flex h-auto  bg-white ">
      <div className="bg-primary/80 w-full bg-[url(/images/inmobiliaria.webp)] bg-cover bg-blend-multiply bg-fixed text-white z-30  h-[500px] ">
        <div className="backdrop-blur-[5px]  h-full flex flex-col justify-center items-center text-center gap-5 py-12">
          <div className="flex flex-col gap-2">
            <p className="text-lg ">  Te presentamos nuestra oferta de</p>
            <h2 className="text-4xl">Proyectos Inmobiliarios</h2>
          </div>
          <hr className="w-1/2 border-2" />
          <p className="w-1/2 text-balance"><strong>¿Estás interesado en algún proyecto?</strong> Te invitamos a conocer nuestra oferta de
            vivienda nueva, Locales Comerciales y Lotes/Bodegas Industriales.</p>
          <div className=" w-1/3 flex justify-between">
            <Link href="#" className="border-2 bg-transparent text-white rounded-lg p-2 text-lg active:bg-red hover:bg-accent transition-colors">Vivienda</Link>
            <Link href="#" className="border-2 bg-transparent text-white rounded-lg p-2 text-lg active:bg-accent hover:bg-accent">Comercio e Industria </Link>
          </div>
        </div>
      </div>
    </section>
  );
} 