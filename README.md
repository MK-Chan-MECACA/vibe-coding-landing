# Vibe Coding Landing

A modern, responsive landing page built with Next.js 14+, TypeScript, and TailwindCSS.

## Features

- ⚡ Next.js 14+ with TypeScript
- 🎨 TailwindCSS v3.4 for styling
- 🔥 Supabase integration
- 📱 Fully responsive design
- 🚀 Optimized for Netlify deployment
- 🎯 SEO optimized
- 🔧 Custom hooks and utilities

## Project Structure

```
src/
├── components/     # Reusable React components
├── hooks/         # Custom React hooks
├── utils/         # Utility functions and constants
├── types/         # TypeScript type definitions
├── styles/        # Global styles and CSS
└── pages/         # Next.js pages
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd vibe-coding-landing
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

### Netlify

This project is configured for Netlify deployment with static export:

1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `out`
4. Add environment variables in Netlify dashboard

### Other Platforms

The project uses `output: 'export'` in `next.config.ts`, making it compatible with any static hosting platform.

## Customization

### Styling

- Global styles are in `src/styles/globals.css`
- TailwindCSS configuration is in `tailwind.config.js`
- Custom components use TailwindCSS classes

### Components

- Layout component: `src/components/Layout.tsx`
- Add new components in `src/components/`
- Import types from `src/types/index.ts`

### Configuration

- Site constants: `src/utils/constants.ts`
- Supabase client: `src/utils/supabase.ts`
- Custom hooks: `src/hooks/`

## Technologies Used

- **Next.js 15.4.2** - React framework
- **TypeScript 5** - Type safety
- **TailwindCSS 3.4** - Utility-first CSS
- **Supabase** - Backend as a Service
- **React 19.1.0** - UI library

## License

This project is licensed under the MIT License.
