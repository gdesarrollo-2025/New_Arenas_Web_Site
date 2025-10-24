import { FaCreditCard, FaSignature, FaGlobe, FaSearchLocation, FaBuilding, FaIndustry } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, EffectCoverflow } from 'swiper/modules';
const services = [
  { icon: <FaBuilding />, title: 'Proyectos', text: 'Conoce los proyectos en Barranquilla, Cartagena y Soledad' },
  { icon: <FaCreditCard />, title: 'Pagos PSE', text: 'Realiza pagos desde la plataforma PSE desde la comodidad de tu casa' },
  { icon: <FaSignature />, title: 'Firma digital', text: 'Ahora podras firmar contratos desde cualquier lugar' },
  { icon: <FaGlobe />, title: 'Publicidad 360', text: 'Tenemos presencia en mas de 10 portales inmobiliarios, Facebook e Instagram' },
  { icon: <FaSearchLocation />, title: 'Atencion 24/7', text: 'Escribenos en cualquier momento, estamos para atenderte' },
  { icon: <FaIndustry />, title: 'Industria y comercio', text: '¿Buscas lote, local comercial, bodega para comprar o arrendar? Estás en el lugar indicado' }
];

export default function QuickServices() {
  return (
    <section className="bg-white px-5">
      <div className="container-custom h-64">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={5}
          navigation
          autoplay={{ delay: 3000, disabledOnInteraction: false }}
          loop
          className="max-w-6xl h-full text-center   "
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}>
          {services.map((service, idx) => (
            <SwiperSlide key={idx} className="  w-1/3 sm:w-1/4 h-full  justify-center content-center">
              <div className="flex flex-col h-56 w-2/3 items-center place-self-center justify-center rounded-2xl shadow-md shadow-gray-500/60 gap-3">
                <div className="text-3xl text-primary">{service.icon}</div>
                <p className="font semibold text-xl text-primary ">{service.title}</p>
                <span className="font-normal text-sm text-gray-700">{service.text}</span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
} 