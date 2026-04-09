# Espace Délice - Digital Menu

A stylish digital menu with QR code and WhatsApp booking system for Espace Délice Café-Restaurant.

![Digital Menu](https://img.shields.io/badge/Digital%20Menu-Online-green)
![WhatsApp Booking](https://img.shields.io/badge/WhatsApp-Booking-25D366?logo=whatsapp)

## Features

- 📱 **QR Code Menu** - Customers can scan to view the menu
- 💬 **WhatsApp Booking** - Direct reservation via WhatsApp (+212663584353)
- 🍕 **Full Menu Categories**:
  - Pizza
  - Sandwich
  - Panini
  - Thé & Café
  - Jus & Limonade
  - Omelettes
  - Suppléments
  - Traditionnel (Msemen, Bissara)
  - Tajine
- 🎨 **Beautiful Design** - Warm peachy theme matching the restaurant branding
- 📱 **Mobile Responsive** - Works perfectly on all devices

## Tech Stack

- React + TypeScript
- Tailwind CSS
- shadcn/ui components
- Vite
- QRCode.react
- Docker

## Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Docker Deployment

```bash
# Build Docker image
docker build -t espace-delice-menu .

# Run container
docker run -p 80:80 espace-delice-menu
```

## WhatsApp Integration

The booking system uses WhatsApp Click-to-Chat:
- Number: +212663584353
- Pre-filled message for reservations

## Menu Data

All menu items are stored in `src/data/menu.ts` with prices in Moroccan Dirhams (dh).

## License

MIT
