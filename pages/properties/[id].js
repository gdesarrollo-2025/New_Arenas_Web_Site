import Head from 'next/head';
import { useRouter } from 'next/router';
import PropertyDetail from '../../components/properties/PropertyDetail';
import RelatedProperties from '../../components/properties/RelatedProperties';

export default function PropertyPage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Head>
        <title>Property Details | Arenas Real Estate</title>
        <meta name="description" content="Detailed information about this property" />
      </Head>

      <div className="container-custom py-6">
        {id && <PropertyDetail id={id} />}
        <RelatedProperties />
      </div>
    </>
  );
} 