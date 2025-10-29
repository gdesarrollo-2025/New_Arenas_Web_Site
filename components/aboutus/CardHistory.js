import Image from "next/image";

export default function CardHistory({ title, description, index }) {
    return (
        <div className="flex flex-col gap-5 bg-white rounded-lg shadow-md p-6 h-full w-full justify-between z-1">
            <div className="justify-self-start">
                <h3 className="text-xl font-bold mb-2 text-primary" data-swiper-parallax="-200">{title}</h3>
                <p className="text-justify text-gray-700" data-swiper-parallax="-100">{description}</p>
            </div>
            <div className="relative h-8/12 w-full rounded-lg justify-self-end">
                <Image className="object-cover rounded-lg" src="/images/BarranquillaFoto.webp" priority={index === 0} sizes="(max-width: 768px) 85vw, 50vw" alt={title} fill  />
            </div>
        </div>
    )
}