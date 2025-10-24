import Image from 'next/image';

export default function InvestmentSection() {
  return (
    <section className="py-12 bg-white px-5">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-3xl font-bold mb-4">Invertir</h2>
          <p className="mb-6 text-gray-700">La mejor opción para invertir en finca raíz está aquí. Descubre oportunidades de inversión seguras y rentables con nuestro acompañamiento profesional.</p>
          <a href="https://arenasinmobiliaria.co/exclusivos/" className="bg-white  border-2  border-primary px-6 py-2 rounded-sm font-semibold hover:transform hover:skew-x-12 hover:bg-primary hover:text-white transition-colors "> Descubrir</a>
        </div>
        <div className="relative h-200 w-full md:w-1/2">
          <a href='https://arenasinmobiliaria.co/exclusivos/'>
            <Image src="/images/investment.webp" alt="Invertir" fill  className="rounded-xl object-cover" />
          </a>
        </div>
      </div>
    </section>
  );
} 