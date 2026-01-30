import Image from 'next/image';
import Link from 'next/link';

export default function InvestmentSection() {
  return (
    <section className="h-[50vh] bg-[#323d43]/60 bg-[url(/images/Investment.webp)] bg-blend-multiply bg-fixed ">
      <div className="backdrop-blur-md w-full h-full mix-blend-screen">
        <div className="container-custom flex flex-col gap-4 justify-center items-center text-center h-full text-white">
          <div className="flex flex-col gap-2">
            <p className="text-base xl:text-lg">es momento de</p>
            <h2 className="font-bold text-2xl xl:text-4xl text-[#9b7e54]">Invertir</h2>
          </div>
          <hr className="border-2 border-[#9b7e54] w-1/2 self-center" />
          <div className="flex flex-col gap-2 w-full xl:w-1/2 items-center">
            <p className="text-balance">La mejor opción para invertir en finca raíz está aquí. Descubre oportunidades de inversión seguras y rentables con nuestro acompañamiento profesional.</p>
            <Link href="https://arenasinmobiliaria.co/exclusivos/" className="border-2 border-white rounded-[10px] px-2 py-1 hover:border-[#9b7e54] hover:text-[#9b7e54] active:text-[#9b7e54] active:border-[#9b7e54]/75 transition"> Descubrir</Link>
          </div>

        </div>

      </div>
    </section>
  );
}
/* 
<section className="py-12 bg-white px-5 h-200">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-3xl font-bold mb-4">Invertir</h2>
          <p className="mb-6 text-gray-700">La mejor opción para invertir en finca raíz está aquí. Descubre oportunidades de inversión seguras y rentables con nuestro acompañamiento profesional.</p>
          <Link href="https://arenasinmobiliaria.co/exclusivos/" className="bg-white  border-2  border-primary px-6 py-2 rounded-sm font-semibold hover:transform hover:skew-x-12 hover:bg-primary hover:text-white transition-colors "> Descubrir</Link>
        </div>
        <div className=" w-full md:w-1/2">
          <Link className="relative block h-150 w-full" href={'https://arenasinmobiliaria.co/exclusivos/'}>
            <Image src="/images/Investment.webp" alt="Invertir" fill className="rounded-xl object-cover" sizes="(max-width: 768px) 98vw, 50vw"/>
          </Link>
        </div>
      </div>
    </section> */