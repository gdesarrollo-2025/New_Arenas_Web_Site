import Image from 'next/image';

export default function PromoBanner() {
  return (
    <section className="py-8 bg-white px-5">
      <div className="relative container-custom flex justify-center items-center h-70 px-5">
        <Image src="/images/banner1.webp" alt="App Arenas a Distancia" fill className="rounded-xl object-contain" />
      </div>
    </section>
  );
} 