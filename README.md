# Arenas Real Estate Website

A modern real estate website built with Next.js and Tailwind CSS, inspired by the Farmatodo e-commerce layout.

## Features

- 🏠 Property search functionality
- 🔍 Advanced filtering system
- 📱 Fully responsive design for mobile and desktop
- 🔄 Quick view for property details
- 🔌 API connection ready for property data integration

## Upcoming Features

- 🔐 User authentication
- 🛒 Favorites/Wishlist functionality

## Project Structure

```
├── components/
│   ├── filters/        # Filter-related components
│   ├── layout/         # Layout components (Header, Footer, etc.)
│   ├── properties/     # Property card, list, and detail components
│   ├── search/         # Search-related components
│   └── ui/             # Reusable UI components
├── context/            # React Context for global state
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and API handlers
├── pages/              # Next.js pages
├── public/             # Static assets
│   └── images/         # Images used throughout the site
└── styles/             # Global styles
```

## Getting Started

### Prerequisites

- Node.js 14.x or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/arenas-real-estate.git
cd arenas-real-estate
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Technologies Used

- **Next.js** - React framework for server-rendered applications
- **Tailwind CSS** - Utility-first CSS framework
- **React Icons** - Popular icon library
- **Axios** - Promise-based HTTP client

## API Integration

This project is set up to connect to a real estate API. You'll need to:

1. Configure your API endpoint in `lib/api.js`
2. Update property fetching logic in the components

## Project Structure Details

### Components

- **Layout Components**: Header, Footer, MobileMenu
- **Property Components**: PropertyCard, PropertyList, PropertyDetail, PropertyQuickView
- **Filter Components**: FilterSidebar
- **Search Components**: SearchBar
- **UI Components**: HeroSection, CategoryNav, PromoSlider

### Pages

- **Home Page**: Featured properties and search functionality
- **Properties Page**: Property listing with filters
- **Property Detail Page**: Detailed information about a specific property

## Customization

- Edit `tailwind.config.js` to customize colors, fonts, and other design elements
- Modify components to match your specific design requirements

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Variables de Entorno

Para configurar las variables de entorno para desarrollo y producción:

1. Para desarrollo:
   - Copia el archivo `env.development.example` y renómbralo a `.env.development.local`
   - Configura los valores según tu entorno de desarrollo

   ```bash
   cp env.development.example .env.development.local
   ```

2. Para producción:
   - Copia el archivo `env.production.example` y renómbralo a `.env.production`
   - Configura los valores para tu entorno de producción

   ```bash
   cp env.production.example .env.production
   ```

> Nota: Los archivos `.env.*.local` y `.env.production` no deben subirse al repositorio por razones de seguridad. Ya están incluidos en el .gitignore. 