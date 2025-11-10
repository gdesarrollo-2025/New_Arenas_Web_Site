/// pages/properties/index.js (fragmento)
import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getProperties } from '../../lib/api';
import PropertyList from '../../components/properties/PropertyList';
import FilterSidebar from '../../components/filters/FilterSidebar';

export default function Properties({ initialProperties, initialPagination, initialFilters, fetchError }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState(initialFilters?.sortBy || 'default');

  const handlePageChange = async (page) => {
    // normalizar page
    const nextPage = Math.max(1, Number(page) || 1);
    const query = { ...router.query, page: nextPage };
    setLoading(true);
    await router.push({ pathname: router.pathname, query }, undefined, { shallow: false });
    setLoading(false);
  };

  const handleSortChange = async (value) => {
    const query = { ...router.query, sortBy: value, page: 1 };
    setLoading(true);
    await router.push({ pathname: router.pathname, query }, undefined, { shallow: false });
    setLoading(false);
  };

  const handleFiltersChange = async (newFilters) => {
    const query = { ...router.query, ...newFilters, page: 1 };
    setLoading(true);
    await router.push({ pathname: router.pathname, query }, undefined, { shallow: false });
    setLoading(false);
  };

  const handleOpenProperty = (codpro) => {
    router.push(`/properties/${codpro}`);
  };

  return (
    <>
      <Head>
        <title>Properties | Arenas Real Estate</title>
      </Head>

      <div className="container-custom py-6">
        <div className="flex flex-col lg:flex-row gap-6 mt-6">
          <div className="w-full lg:w-1/4">
            <FilterSidebar initialFilters={initialFilters} onChangeFilters={handleFiltersChange} />
          </div>
          <div className="w-full lg:w-3/4">
            <PropertyList
              properties={initialProperties}
              pagination={initialPagination}
              loading={loading || fetchError}
              sortBy={sortBy}
              onSortChange={handleSortChange}
              onPageChange={handlePageChange}
              onOpenProperty={handleOpenProperty}
            />
          </div>
        </div>
      </div>
    </>
  );
}

// getServerSideProps queda igual que tu versión robusta anterior (valida y normaliza query)
export async function getServerSideProps(context) {
  const { query } = context;

  const page = query.page || 1;

  const sortBy = query.sortBy || 'default';

  const filters = {
    query: query.q || '',
    location: query.location || '',
    neighborhood_code: query.neighborhood || '',
    propertyType: query.type ? query.type.split(',') : [],
    bizType: query.biz || '',
    sortBy: sortBy,
    // Manejar precios según tipo de negocio
    minPrice: query.pvmin || query.pcmin || query.minPrice || '',
    maxPrice: query.pvmax || query.pcmax || query.maxPrice || '',
    // Habitaciones
    bedrooms: query.bedrooms ?
      Array.isArray(query.bedrooms) ? query.bedrooms : [query.bedrooms] : [],
    minBedrooms: query.minbed || '',
    maxBedrooms: query.maxbed || '',
    // Baños
    bathrooms: query.bathrooms ?
      Array.isArray(query.bathrooms) ? query.bathrooms : [query.bathrooms] : [],
    minBathrooms: query.minbath || '',
    maxBathrooms: query.maxbath || '',
    // Área
    minArea: query.minarea || '',
    maxArea: query.maxarea || '',
    // Estrato
    stratum: query.stratum || '',
    // Amenities
    amenities: query.amenities ? query.amenities.split(',') : [],
  };

  try {
    // Pide a la API ya paginada y filtrada si es posible
    const results = await getProperties(filters, page);

    // Si la API no soporta cierto filtrado (ej. min/max price por bizType),
    // filtrar localmente como fallback pero **no** alterar el total devuelto por la API.
    let properties = results.properties || [];

    const min = Number(filters.minPrice) || 0;
    const max = Number(filters.maxPrice) || Number.MAX_SAFE_INTEGER;

    if (filters.bizType) {
      properties = properties.filter((prop) => {
        const rent = Number(prop.rent) || 0;
        const sale = Number(prop.saleprice) || 0;
        if (filters.bizType === '1') return rent >= min && rent <= max;
        if (filters.bizType === '2') return sale >= min && sale <= max;
        return (rent >= min && rent <= max) || (sale >= min && sale <= max);
      });
    }

    return {
      props: {
        initialProperties: properties,
        initialPagination: {
          total: results.pagination?.total || results.total || properties.length || 0,
          perPage: results.pagination?.perPage || results.pagination?.per_page || 50,
          currentPage: Number(results.pagination?.currentPage || results.pagination?.current || page),
          lastPage: Number(results.pagination?.lastPage || results.pagination?.last || Math.ceil((results.total || properties.length) / 50)),
        },
        initialFilters: filters,
      },
    };
  } catch (error) {
    console.error('Error fetching properties:', error);
    return {
      props: {
        initialProperties: [],
        initialPagination: { total: 0, perPage: 50, currentPage: page, lastPages: 1 },
        initialFilters: filters,
        fetchError: true,
      },
    };
  }
}
