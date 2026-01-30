import { FaCreditCard, FaSignature, FaGlobe, FaSearchLocation, FaBuilding, FaIndustry } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, EffectCoverflow } from 'swiper/modules';

const services = [
  {
    icon: <FaBuilding className="bg-accent rounded-full p-1" />,
    title: 'Proyectos inmobiliarios',
    text: 'Descubre proyectos nuevos en Barranquilla, Cartagena y Soledad'
  },
  {
    icon: <FaCreditCard className="bg-accent rounded-full p-1" />,
    title: 'Pagos en línea',
    text: 'Paga arriendo y servicios fácilmente a través de PSE'
  },
  {
    icon: <FaSignature className="bg-accent rounded-full p-1" />,
    title: 'Firma digital',
    text: 'Firma contratos de forma segura desde cualquier lugar'
  },
  {
    icon: <FaGlobe className="bg-accent rounded-full p-1" />,
    title: 'Difusión inmobiliaria',
    text: 'Publicamos tu inmueble en portales, redes sociales y canales aliados'
  },
  {
    icon: <FaSearchLocation className="bg-accent rounded-full p-1" />,
    title: 'Atención continua',
    text: 'Estamos disponibles para ayudarte cuando lo necesites'
  },
  {
    icon: <FaIndustry className="bg-accent rounded-full p-1" />,
    title: 'Comercial e industrial',
    text: 'Locales, bodegas y lotes para compra o arriendo'
  }
];

export default function QuickServices() {
  return (
    <section className="container-custom py-10 w-full h-fit sm:h-[50vh]">
      <div className="flex flex-col gap-2  w-full ">
        <h2 className="text-center text-underline ">Algunos de nuestros servicios son:</h2>
        <hr className="border-2 border-primary w-1/2 mx-auto" />
        <div className="w-full h-full">
          <Swiper
            modules={[Navigation]}
            spaceBetween={5}
            navigation
            loop
            className="max-w-6xl h-full text-center "
            breakpoints={{
              320: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}>
            {services.map((service, idx) => (
              <SwiperSlide key={idx} className="w-1/3 sm:w-1/4 h-full  justify-center content-center ">
                <div className="bg-white flex flex-col min-h-60 w-2/3 px-2 items-center place-self-center justify-center rounded-[10px] shadow-md  gap-3 hover:-translate-y-5 transition">
                  <div className="text-5xl text-white">{service.icon}</div>
                  <p className="font semibold text-xl text-primary ">{service.title}</p>
                  <span className="font-normal text-sm text-balance text-gray-700">{service.text}</span>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

    </section>
  );
} 