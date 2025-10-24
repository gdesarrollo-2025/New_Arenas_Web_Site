import Image from 'next/image';

const advisors = [
  { name: 'Ana', img: '/images/advisor1.jpg' },
  { name: 'Luis', img: '/images/advisor2.jpg' },
  { name: 'María', img: '/images/advisor3.jpg' },
  { name: 'Carlos', img: '/images/advisor4.jpg' },
  { name: 'Sofía', img: '/images/advisor5.jpg' },
];

export default function FeaturedAdvisors() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-6">Asesores destacados</h2>
        <div className="flex flex-wrap justify-center gap-6 mb-6">
          {advisors.map((advisor, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full overflow-hidden mb-2">
                <Image src={advisor.img} alt={advisor.name} width={96} height={96} className="object-cover" />
              </div>
              <span className="font-semibold text-gray-700">{advisor.name}</span>
            </div>
          ))}
        </div>
        <button className="bg-primary text-white px-6 py-2 rounded-sm font-semibold">Conócenos</button>
      </div>
    </section>
  );
} 