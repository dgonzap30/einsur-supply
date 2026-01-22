# Einsur Supply Website

A modern B2B marketing website for an industrial supplies company specializing in valves and instrumentation for the petrochemical and energy sectors.

## Tech Stack

- **React 18** - UI framework
- **Vite 6** - Build tool and dev server
- **Tailwind CSS 3** - Styling
- **GSAP** - Animations

## Quick Start

### Prerequisites

- Node.js 18+ (or Bun)

### Installation

```bash
# Install dependencies
npm install
# or
bun install
```

### Development

```bash
npm run dev
# or
bun dev
```

Opens at `http://localhost:5173`

### Production Build

```bash
npm run build
```

Output goes to `./dist/` directory.

### Preview Production Build

```bash
npm run preview
```

Opens at `http://localhost:4173`

## Project Structure

```
src/
├── components/
│   ├── layout/         # Navbar, Footer, Logo, MobileMenu
│   ├── sections/       # Hero, Stats, Services, About, Projects, News
│   └── ui/             # Button, Badge, GlassCard, ContactModal
├── hooks/              # useCounter, useScrollAnimation
├── lib/                # Particle system canvas animation
├── styles/             # Global CSS
├── App.jsx             # Main app
└── main.jsx            # Entry point
```

## Deployment

This is a **static site** - no backend or database required.

### Option 1: Static File Hosting (Simplest)

After building, upload the `dist/` folder to any static host:

- **Netlify**: Drag and drop `dist/` folder
- **Vercel**: `npx vercel --prod`
- **GitHub Pages**: Push `dist/` contents to `gh-pages` branch
- **AWS S3**: `aws s3 sync dist/ s3://your-bucket`
- **Any web server**: Serve `dist/` as static files

### Option 2: Simple HTTP Server

```bash
npm run build
npx http-server dist/ -p 3000
```

### Option 3: Nginx

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /path/to/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### Option 4: Docker

```dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Build and run:
```bash
docker build -t einsur-website .
docker run -p 80:80 einsur-website
```

## Configuration

### Environment Variables

None required - this is a static marketing site.

### Customization

| File | Purpose |
|------|---------|
| `tailwind.config.js` | Colors, fonts, breakpoints |
| `src/styles/index.css` | Global styles |
| `src/components/sections/` | Page content |

### Brand Colors (in `tailwind.config.js`)

- Accent Red: `#E63946`
- Navy: `#1B3A6B`
- Dark: `#0D1B2A`
- Gold: `#C9A227`

## Features

- Responsive design (mobile-first)
- Scroll-triggered animations
- Interactive particle background
- Contact form modal (frontend only - no backend submission)
- Lazy-loaded images with error handling
- Partner brand marquee
- Counter animations

## External Dependencies

- **Google Fonts** (Inter, Manrope) - loaded via CDN
- **Unsplash** - project images via public URLs

No API keys required.

## Contact Form

The contact form is **frontend only**. To make it functional:

1. Set up a backend endpoint or use a service like Formspree, Netlify Forms, or EmailJS
2. Update `src/components/ui/ContactModal.jsx` to POST to your endpoint

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with HMR |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

## Browser Support

Modern browsers (Chrome, Firefox, Safari, Edge). IE11 not supported.

## License

Proprietary - All rights reserved.
