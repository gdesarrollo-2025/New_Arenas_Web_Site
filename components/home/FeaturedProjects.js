import Image from 'next/image';

export default function FeaturedProjects() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
        <div className="md:w-1/2">
          <Image src="/images/featured-project.jpg" alt="Proyecto destacado" width={600} height={400} className="rounded-xl object-cover" />
        </div>
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-3xl font-bold mb-4">Proyectos Inmobiliarios</h2>
          <p className="mb-6 text-gray-700">Ofrecemos proyectos inmobiliarios exclusivos en las mejores zonas. Descubre oportunidades únicas para invertir o vivir.</p>
          <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
            <button className="bg-primary text-white px-6 py-2 rounded-sm font-semibold">Ver todos</button>
            <button className="bg-accent text-white px-6 py-2 rounded-sm font-semibold">Solicita tu avalúo</button>
          </div>
        </div>
      </div>
    </section>
  );
} 