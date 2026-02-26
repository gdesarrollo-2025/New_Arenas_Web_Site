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
