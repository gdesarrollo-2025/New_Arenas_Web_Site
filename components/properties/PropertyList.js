// components/properties/PropertyList.jsx
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaAngleLeft, FaAngleRight, FaTh, FaList, FaSort, FaBed, FaBath, FaRuler, FaSearch } from 'react-icons/fa';
import PropertyCard from './PropertyCard';
import { getPropertyTypeName, getBizTypeName } from '../../lib/api';
import { useRouter } from 'next/router';

export default function PropertyList({ properties = [], pagination = {}, loading = false, sortBy = 'default', onSortChange, onPageChange, onOpenProperty }) {
  const router = useRouter();
  const [view, setView] = useState('grid');

  const formatPrice = (p) => {
    if (!p) return '';
    if (p.biz_code === '1') return p.saleprice ? `$${p.saleprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}` : '';
    if (p.biz_code === '2') return p.rent ? `$${p.rent.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}` : '';
    return p.price_format || '';
  };

  const handleSortChange = (e) => {
    if (onSortChange) onSortChange(e.target.value);
  };

  const renderPagination = () => {
    if (!pagination) return null;
    const currentPage = Number(pagination.currentPage || pagination.current || 1);
    const lastPage = Number(pagination.lastPage || pagination.lastPages || pagination.last || 1);
    if (lastPage <= 1) return null;

    const pages = [];
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(lastPage, startPage + 4);

    const pushButton = (page, content, disabled = false) => (
      <button
        key={`${content}-${page}`}
        onClick={() => !disabled && onPageChange && onPageChange(page)}
        disabled={disabled}
        className={`px-3 py-1 rounded-md ${page === currentPage ? 'bg-primary text-white' : 'hover:bg-gray-200'}`}
      >
        {content}
      </button>
    );

    pages.push(pushButton(Math.max(1, currentPage - 1), '<'));
    if (startPage > 1) {
      pages.push(pushButton(1, '1'));
      if (startPage > 2) pages.push(<span key="dots1" className="px-2">...</span>);
    }
    for (let i = startPage; i <= endPage; i++) pages.push(pushButton(i, i));
    if (endPage < lastPage) {
      if (endPage < lastPage - 1) pages.push(<span key="dots2" className="px-2">...</span>);
      pages.push(pushButton(lastPage, lastPage));
    }
    pages.push(pushButton(Math.min(lastPage, currentPage + 1), '>'));

    return <div className="flex justify-center items-center space-x-1 mt-8">{pages}</div>;
  };

  if (router.query.id) return null;

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex flex-col gap-4 sm:flex-row justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-semibold">{loading ? 'Cargando inmuebles...' : `${pagination.total || properties.length} Inmuebles Encontrados`}</h2>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center">
            <button onClick={() => setView('grid')} className={`p-2 rounded-l-md ${view === 'grid' ? 'bg-primary text-white' : 'bg-gray-100'}`}><FaTh /></button>
            <button onClick={() => setView('list')} className={`p-2 rounded-r-md ${view === 'list' ? 'bg-primary text-white' : 'bg-gray-100'}`}><FaList /></button>
          </div>

          <div className="flex items-center">
            <FaSort className="mr-2 text-gray-500" />
            <select value={sortBy} onChange={handleSortChange} className="border border-gray-300 rounded-md p-1">
              <option value="default">Predeterminado</option>
              <option value="price-asc">Precio (Menor a Mayor)</option>
              <option value="price-desc">Precio (Mayor a Menor)</option>
              <option value="newest">Más Recientes</option>
              <option value="area-asc">Área (Menor a Mayor)</option>
              <option value="area-desc">Área (Mayor a Menor)</option>
            </select>
          </div>
        </div>
      </div>

      {loading && (
        <>
          <div className="flex flex-col items-center justify-center py-6 mb-6">
            <Image src="/images/LogoSolo.webp" width={50} height={50} alt="logo cargando" className="animate-spin" />
            <p className="text-gray-600 text-lg font-medium animate-pulse">Buscando inmuebles...</p>
            <p className="text-gray-500 text-sm mt-2">Esto puede tardar un momento</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6).fill(0).map((_, index) => (
              <PropertyCard key={`skeleton-${index}`} loading={true} />
            ))}
          </div>

          {/* Skeletons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6).fill(0).map((_, i) => <PropertyCard key={`s-${i}`} loading />)}
          </div>
        </>
      )}

      {!loading && properties.length === 0 && (
        <div className="text-center py-10 bg-gray-50 rounded-lg shadow-inner">
          <div className="mb-4"><FaSearch className="mx-auto text-4xl text-gray-400" /></div>
          <h3 className="text-xl font-medium text-gray-600 mb-2">No se encontraron inmuebles</h3>
        </div>
      )}

      {!loading && properties.length > 0 && view === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map(p => (
            <PropertyCard
              key={p.idpro || p.id}
              property={{
                id: p.idpro || p.id,
                title: `${getPropertyTypeName(p.type_code)} en ${p.neighborhood || p.zone || p.city}`,
                codpro: p.codpro,
                price: formatPrice(p),
                location: `${p.neighborhood || ''}, ${p.city || ''}`,
                bedrooms: p.bedrooms,
                bathrooms: p.bathrooms,
                area: p.area_cons,
                biz_code: p.biz_code,
                status: getBizTypeName(p.biz_code),
                mainImage: p.image1 || '/images/property-placeholder.webp',
                description: p.description,
              }}
              onOpen={() => onOpenProperty && onOpenProperty(p.codpro)}
            />
          ))}
        </div>
      )}

      {!loading && properties.length > 0 && view === 'list' && (
        <div className="space-y-4">
          {properties.map(p => (
            <div key={p.idpro || p.id} className="flex flex-col sm:flex-row border rounded-lg overflow-hidden">
              <div className="sm:w-1/3 h-50 sm:h-50 relative">
                <Image src={p.image1 || '/images/property-placeholder.webp'} alt={p.codpro} fill className="object-cover" />
              </div>
              <div className="p-4 sm:w-2/3">
                <div className="flex justify-between mb-2">
                  <h3 className="text-lg font-semibold">
                    <a onClick={() => onOpenProperty && onOpenProperty(p.codpro)} className="hover:text-primary transition-colors cursor-pointer">
                      {`${getPropertyTypeName(p.type_code)} en ${p.city_zone || p.zone || p.city}`}
                    </a>
                  </h3>
                  <span className="text-primary font-bold">{formatPrice(p)}</span>
                </div>
                <p className="text-gray-500 text-sm mb-3">{`${p.neighborhood || ''}, ${p.city || ''}`}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && properties.length > 0 && renderPagination()}
    </div>
  );
}
