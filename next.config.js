/** @type {import('next').NextConfig} */
const nextConfig = {
  output:"standalone",
  i18n:{
    locales:['es'],
    defaultLocale:'es',
  },
  reactStrictMode: true,
  images: {
    domains: [],
    unoptimized: true, // Este parámetro permite utilizar imágenes sin optimizar (útil para desarrollo)
  },
  webpack: (config, { isServer, dev }) => {
    // Cuando estamos en modo desarrollo, habilitamos hot reloading para archivos de configuración
    if (dev) {
      config.watchOptions = {
        ...config.watchOptions,
        ignored: /node_modules/,
        poll: 1000, // Revisa cambios cada segundo
      };
    }
    return config;
  },
}
module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.domus.la/3.0/:path*',
      },
    ];
  },
};

module.exports = nextConfig 