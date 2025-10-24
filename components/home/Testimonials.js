const testimonials = [
  { name: 'Macha Mila', img: '/images/avatar1.jpg', text: "Working with this team was a pleasure. They understood our vision and helped us find a property that exceeded our expectations. We couldn't have done it without them." },
  { name: 'John Doe', img: '/images/avatar2.jpg', text: 'Great experience! Highly recommended for anyone looking for a new home.' },
  { name: 'Jane Smith', img: '/images/avatar3.jpg', text: 'Professional, efficient, and friendly service. Thank you!' },
];

export default function Testimonials() {
  return (
    <section className="py-14 bg-white px-5">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">What Our Clients Say About Us</h2>
        <div className="grid grid-col-1  sm=grid-cols-2 md:grid-cols-3 gap-8 items-center justify-center">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between items-center h-full">
              <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                <img src={t.img} alt={t.name} className="w-full h-full object-cover" />
              </div>
              <p className="text-gray-700 mb-4 text-center wrap">{t.text}</p>
              <span className="font-semibold text-gray-900">{t.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 