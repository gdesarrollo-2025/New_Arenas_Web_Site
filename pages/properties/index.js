import Head from 'next/head';
import PropertyList from '../../components/properties/PropertyList';
import FilterSidebar from '../../components/filters/FilterSidebar';

export default function Properties() {
  return (
    <>
      <Head>
        <title>Properties | Arenas Real Estate</title>
        <meta name="description" content="Browse our extensive catalog of properties" />
        <link rel="icon" type="image/webp" href="/FAVICON.webp" />
      </Head>

      <div className="container-custom py-6">

        {/* Query Input  <SearchBar />*/}
        <div className="flex flex-col lg:flex-row gap-6 mt-6">
          <div className="w-full lg:w-1/4">
            <FilterSidebar />
          </div>
          <div className="w-full lg:w-3/4">
            <PropertyList />
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  return {
    props: {},
  };
} 