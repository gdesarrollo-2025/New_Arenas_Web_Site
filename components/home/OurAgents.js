import Image from 'next/image';

const agents = [
  { name: 'Derek Lane', img: '/images/agent1.webp', role: 'Senior Estate Agent' },
  { name: 'Wade Warren', img: '/images/agent2.webp', role: 'Estate Agent' },
  { name: 'Cory Valdez', img: '/images/agent3.webp', role: 'Estate Agent' },
];

export default function OurAgents() {
  return (
    <section className="py-14 bg-white px-5">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">Our Agents</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {agents.map((agent, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
              <div className="relative   h-20 w-20 rounded-full overflow-hidden ">
                <Image src={agent.img} alt={agent.name} className="object-cover" fill sizes="80px"/>
              </div>
              <span className="font-semibold text-gray-900 text-lg mb-1">{agent.name}</span>
              <span className="text-gray-500 text-sm mb-4">{agent.role}</span>
              <button className="text-sm font-semibold text-black border border-gray-300 rounded-sm px-4 py-2 hover:bg-gray-100">Ver perfil</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 