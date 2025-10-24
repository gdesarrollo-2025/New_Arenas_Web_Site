import Image from 'next/image';

export default function Newsletter() {
  return (
    <section className="py-14 px-5">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg flex flex-col md:flex-row overflow-hidden items-center">
        <div className="md:w-1/2 w-full h-56 md:h-full relative">
          <Image src="/images/newsletter.jpg" alt="Newsletter" fill className="object-cover" />
        </div>
        <div className="md:w-1/2 w-full p-8 flex flex-col items-center md:items-start">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Stay Updated on Latest Property</h3>
          <p className="text-gray-600 mb-4">Suscríbete para recibir las mejores ofertas y novedades inmobiliarias.</p>
          <form className="flex w-full max-w-md gap-2">
            <input type="email" placeholder="Tu email" className="rounded-sm border px-4 py-2 w-full" />
            <button type="submit" className="bg-black text-white font-semibold rounded-sm px-6 py-2 hover:bg-gray-800 transition">Suscribirse</button>
          </form>
        </div>
      </div>
    </section>
  );
} 