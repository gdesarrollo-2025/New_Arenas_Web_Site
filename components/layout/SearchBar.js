import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FaSearch } from 'react-icons/fa';

import parseSearchQuery from '../../lib/parserSearchQuery';


export default function SearchBar() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');

    /*     // Implementar debounce para la búsqueda
    useEffect(() => {
        // No hacer nada si el texto está vacío
        if (!searchQuery.trim()) return;

        // Configurar un temporizador para actualizar la búsqueda después de 500ms
        const timer = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery);
        }, 500);

        // Limpiar el temporizador si el texto cambia antes de que expire
        return () => clearTimeout(timer);
    }, [searchQuery]);

    // Ejecutar la búsqueda cuando el valor debounced cambia
    useEffect(() => {
        if (!debouncedSearchQuery.trim()) return;

        const fetchParsedQuery = async () => {
            try {
                const result = await parseSearchQuery(debouncedSearchQuery);

                const query = new URLSearchParams();

                if (result.q) query.set('q', result.q);
                if (result.location) query.set('location', result.location);
                if (result.neighborhood) query.set('neighborhood', result.neighborhood);
                if (result.propertyType) query.set('type', result.propertyType);
                if (result.bizType) query.set('biz', result.bizType);
                if (result.bedrooms) query.set('bedrooms', result.bedrooms);
                if (result.bathrooms) query.set('bathrooms', result.bathrooms);
                if (result.minPrice) query.set('minPrice', result.minPrice);
                if (result.maxPrice) query.set('maxPrice', result.maxPrice);



                const currentPath = router.asPath;
                const newPath = `/properties?${query.toString()}`;

                if (currentPath !== newPath) {
                    router.push(newPath);
                }
            } catch (error) {
                console.error("Error interpretando búsqueda:", error);
            }
        };

        fetchParsedQuery();
    }, [debouncedSearchQuery]); */
    
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    }

    const handleQuickSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        try {
            // 🧠 Interpretar la frase del usuario usando tu parser
            const result = await parseSearchQuery(searchQuery);

            // 🧩 Crear los parámetros usando las mismas claves del parser
            const query = new URLSearchParams();

            if (result.q) query.set('q', result.q);
            if (result.location) query.set('location', result.location);
            if (result.neighborhood) query.set('neighborhood', result.neighborhood);
            if (result.propertyType) query.set('type', result.propertyType);
            if (result.bizType) query.set('biz', result.bizType);
            if (result.bedrooms) query.set('bedrooms', result.bedrooms);
            if (result.bathrooms) query.set('bathrooms', result.bathrooms);
            if (result.minPrice) query.set('minPrice', result.minPrice);
            if (result.maxPrice) query.set('maxPrice', result.maxPrice);

            // 🚀 Redirigir a la página de resultados
            router.push(`/properties?${query.toString()}`);
        } catch (error) {
            console.error("Error interpretando búsqueda:", error);
        }
    };

    return (
        <div className="container-custom py-2">
            <form onSubmit={handleQuickSearch} className="flex w-full gap-2 max-w-xl mx-auto">
                <input
                    type="text"
                    placeholder="Buscar por ciudad, barrio, código..."
                    className="border border-gray-300 rounded-full py-2 px-4 grow text-sm focus:outline-primary"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    style={{ background: 'white', color: 'var(--color-dark)' }}
                />
                <button type="submit" className="rounded-full px-4 py-2 flex items-center justify-center bg-black text-white active:bg-white active:text-black border border-black transition">
                    <FaSearch />
                </button>
            </form>
        </div>
    )
}