const cards = [
  { title: 'Incremento del IPC', desc: 'Consulta el incremento del IPC actualizado.', btn: 'Ver IPC', color: 'bg-primary' },
  { title: 'Realiza tus pagos', desc: 'Paga tu arriendo o administración en línea.', btn: 'Pagar', color: 'bg-accent' },
  { title: 'Herramientas inmobiliarias', desc: 'Accede a herramientas útiles para propietarios y arrendatarios.', btn: 'Ver herramientas', color: 'bg-primary' },
  { title: 'Transacciones', desc: 'Gestiona tus transacciones inmobiliarias.', btn: 'Continuar', color: 'bg-accent' },
  { title: 'Conversor de divisas', desc: 'Convierte monedas fácilmente.', btn: 'Convertir', color: 'bg-primary' },
  { title: 'Estimado Cliente', desc: 'Información importante para nuestros clientes.', btn: 'Ver más', color: 'bg-accent' },
];

export default function QuickAccessCards() {
  return (
    <section className="py-10 bg-gray-50">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, idx) => (
          <div key={idx} className={`rounded-xl shadow-lg p-6 flex flex-col items-start ${card.color} text-white`}>
            <h3 className="text-xl font-bold mb-2">{card.title}</h3>
            <p className="mb-4">{card.desc}</p>
            <button className="bg-white text-primary font-semibold px-4 py-2 rounded-sm hover:bg-gray-100 transition">{card.btn}</button>
          </div>
        ))}
      </div>
    </section>
  );
} 