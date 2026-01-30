import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FaSearch } from 'react-icons/fa';

import {phraseToUrl} from '../../lib/parserSearchQuery';


export default function SearchBar() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [codPro, setCodPro] = useState('');

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    }

    const handleCodPro = (e) => {
        setCodPro(e.target.value);
    }

    const handleQuickSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim() && !codPro.trim()) return;

        if(codPro.trim()) {
            router.push(`/properties/property/${codPro}`)
            return;
        }
        try {
            // 🧠 Interpretar la frase del usuario usando tu parser
            const result = await phraseToUrl(searchQuery);

            // 🚀 Redirigir a la página de resultados
            router.push(result);
        } catch (error) {
            console.error("Error interpretando búsqueda:", error);
        }
    };

    return (
        <div className="py-2 w-full ">
            <form onSubmit={handleQuickSearch} className="flex w-full gap-2  mx-auto ">
                <input
                    type="text"
                    placeholder="Buscar por ciudad, barrio, tipo de inmueble..."
                    className="border border-gray-300 rounded-full py-2 px-4 grow text-sm focus:outline-primary"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    style={{ background: 'white', color: 'var(--color-dark)' }}
                />
                <input
                type="text"
                placeholder="Codigo del inmueble"
                className="bg-white text-black border border-gray-300 rounded-full py-2 px-4 grow-0.8 text-sm focus:outline-primary"
                value={codPro}
                onChange={handleCodPro}
                />
                <button type="submit" className="rounded-full px-4 py-2 flex items-center justify-center bg-black text-white active:bg-white active:text-black border border-black transition">
                    <FaSearch />
                </button>
            </form>
        </div>
    )
}