import '../styles/globals.css';
import '../styles/colors.css'; // Este archivo se recarga en caliente
import Layout from '../components/layout/Layout';
import { useEffect } from 'react';
import Script from 'next/script';

function MyApp({ Component, pageProps }) {
  // Esta función fuerza la recarga de estilos CSS en cada cambio de ruta
  useEffect(() => {
    // Esta técnica fuerza la recarga de archivos CSS
    const reloadCSS = () => {
      const links = document.querySelectorAll('link[rel="stylesheet"]');
      links.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.includes('colors.css')) {
          const newHref = `${href.split('?')[0]}?reload=${Date.now()}`;
          link.setAttribute('href', newHref);
        }
      });
    };

    // Recargar en montaje inicial 
    reloadCSS();

    // Recargar cada 2 segundos para detectar cambios
    const interval = setInterval(() => {
      reloadCSS();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div >
        <Layout>
          <Component {...pageProps} />
        </Layout>

      </div>
      {/* <!-- Start of HubSpot Embed Code --> */}
      <Script id="hs-script-loader" strategy="afterInteractive" src="//js-na1.hs-scripts.com/8765689.js"/>
      {/* <!-- End of HubSpot Embed Code --> */}
    </>
  );
}

export default MyApp; 