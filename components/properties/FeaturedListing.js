export default function FeaturedListing() {
  return (
    <section className="py-14 px-5">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg flex flex-col md:flex-row overflow-hidden">
        <img src="/images/house-featured.jpg" alt="Featured" className="w-full md:w-1/2 h-64 md:h-auto object-cover" />
        <div className="p-8 flex-1 flex flex-col justify-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Rainstone Residence</h3>
          <p className="text-gray-600 mb-4">"Extraordinary <span className='text-primary font-semibold'>performance!</span> Quick solutions. Highly recommended."</p>
          <div className="flex gap-8 text-gray-500 text-sm mt-4">
            <div><span className="font-bold text-black">1500+</span> clientes</div>
            <div><span className="font-bold text-black">1.9M+</span> visitas</div>
          </div>
        </div>
      </div>
    </section>
  );
} 