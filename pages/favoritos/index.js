import Head from "next/head";
import { usePropertyStore } from '../../store/usePropertyStore';
import PropertyCard from "../../components/properties/PropertyCard";

export default function Favoritos() {

    const { favorites, addFavorite, removeFavorite } = usePropertyStore();
    return <>
        <Head>
            <title>Mis favoritos | Arenas Inmobiliaria</title>
            <meta name="description" content="Aqui puedes encontrar tus inmuebles favoritos " />
            <link rel="icon" type="image/webp" href="/FAVICON.webp" />
        </Head>
        <div className="pt-40 container-custom">
            <h1>Favoritos</h1>
            <div className="container-custom grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 ">
                {favorites.map((f, idx) => (
                    <PropertyCard key={f.codpro} property={f} />
                ))}
            </div>
        </div>
    </>
}