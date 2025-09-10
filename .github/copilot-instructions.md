# Portfolio Website - AI Agent Instructions

## 🏗️ Architecture Overview

**Tech Stack**: Vite + React 19 + Tailwind CSS v4 + Framer Motion + Three.js + EmailJS
**Structure**: Single-page portfolio with 8 main sections (Navbar, Hero, About, Experiences, Projects, Testimonial, Contact, Footer)
**Build**: Vite with Vercel deployment, manual chunking for performance

## 🎨 Styling Patterns

### Color System
```css
/* Custom theme colors in index.css */
--color-primary: #030412;    /* Deep dark blue */
--color-midnight: #06091f;   /* Dark navy */
--color-navy: #161a31;       /* Medium navy */
--color-indigo: #1f1e39;     /* Light navy */
--color-storm: #282b4b;      /* Gray-blue */
--color-aqua: #33c2cc;       /* Teal accent */
--color-mint: #57db96;       /* Green accent */
--color-royal: #5c33cc;      /* Purple accent */
```

### Component Styling
- **Cards**: `bg-gradient-to-l from-midnight to-navy border-white/10 rounded-2xl`
- **Hover Effects**: `hover:-translate-y-1 duration-200 transition-transform`
- **Text Colors**: `text-white` (headings), `text-neutral-400` (body), `text-neutral-300` (secondary)
- **Glassmorphism**: `bg-white/10 border-white/20` for modern effects

## 📊 Data Structure Patterns

### Project Data (`src/constants/index.js`)
```javascript
{
  id: 1,
  title: "Project Name",
  description: "Short description (120 chars max for cards)",
  subDescription: ["⚛️ Feature 1", "🎬 Feature 2"], // Array of bullet points
  href: "https://project-url.com",
  image: "/assets/projects/p1.png", // Public assets path
  tags: [
    { id: 1, name: "ReactJs", path: "/assets/logos/react.svg" }
  ]
}
```

### Form Handling
- **EmailJS Integration**: Use `from_name`, `from_email`, `message` field names
- **State Mapping**: Map form fields to EmailJS template variables
- **Environment Variables**: `VITE_EMAILJS_*` for configuration

## ⚡ Performance Optimizations

### Animation System (`src/utils/dramaticScrollAnimations.jsx`)
```jsx
// Use ScrollMotion wrapper for entrance animations
<ScrollMotion variant="dramaticFadeIn" delay={0.2}>
  <Component />
</ScrollMotion>

// Available variants: dramaticFadeIn, cinematicSlideUp, elasticBounce
```

### Build Configuration (`vite.config.js`)
```javascript
// Manual chunking for performance
manualChunks: {
  vendor: ['react', 'react-dom'],
  three: ['three', '@react-three/fiber']
}
```

## 🔧 Development Workflow

### Essential Commands
```bash
npm run dev          # Start dev server (port 5173)
npm run build        # Production build to dist/
npm run preview      # Preview production build
npm run lint         # ESLint checking
```

### File Organization
```
src/
├── components/       # Reusable UI components
├── sections/         # Page sections (Hero, About, etc.)
├── constants/        # Static data and configuration
├── utils/           # Performance and animation utilities
└── main.jsx         # App entry point
```

## 🚀 Deployment

### Vercel Configuration (`vercel.json`)
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "version": 2
}
```

### Environment Variables
```bash
# Required for EmailJS functionality
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_TO_EMAIL=your.email@gmail.com
VITE_TO_NAME=Your Name
```

## 📝 Component Patterns

### Project Cards
- **Short Description**: Truncate at 120 characters with "..."
- **Modal Details**: Use `ProjectDetails` component for full info
- **Tag Display**: Show `tag.name` as text, `tag.path` for icons in modals

### Form Components
- **EmailJS Fields**: Use `from_name`, `from_email`, `message` names
- **State Management**: Local state with `useState`
- **Validation**: HTML5 validation with `required` attribute

### 3D Components
- **Three.js Integration**: Use `@react-three/fiber` and `@react-three/drei`
- **Performance**: Limit pixel ratio to 2, use `devicePixelRatio: Math.min(window.devicePixelRatio, 2)`

## 🎯 Key Conventions

1. **Import Order**: React imports → Third-party → Local components → Utils
2. **Component Naming**: PascalCase for components, camelCase for instances
3. **CSS Classes**: Use Tailwind utility classes, custom theme colors for consistency
4. **Asset Paths**: `/assets/` prefix for public assets, no `src/` in paths
5. **State Updates**: Use functional updates for complex state changes
6. **Error Handling**: Try-catch blocks with user-friendly error messages

## 🔍 Debugging Tips

- **Build Issues**: Check import paths (case-sensitive on Vercel)
- **Styling Problems**: Verify Tailwind classes and custom theme colors
- **EmailJS Errors**: Check environment variables and template field names
- **Performance**: Use React DevTools Profiler for animation bottlenecks

## 📚 Reference Files

- `src/constants/index.js` - Project data structure and content
- `src/utils/dramaticScrollAnimations.jsx` - Animation system
- `src/index.css` - Custom theme and keyframes
- `vite.config.js` - Build configuration and chunking
- `vercel.json` - Deployment configuration
