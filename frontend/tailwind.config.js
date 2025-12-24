/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // --- The "Royal Executive" Palette ---
        
        // 1. Canvas & Surfaces
        pearl: '#F6F7FB',       // Base Canvas
        'pearl-dark': '#EEF1F8', // Hero Mid-tone
        'pearl-deep': '#E6EAF4', // Hero Bottom-tone
        ivory: '#FAFBFD',       // Card Surface
        cloud: '#ECEFF6',       // Soft transitions
        
        // 2. Brand Identity
        royal: '#2D2A5F',   // Primary Brand
        midnight: '#23204A', // Deep Contrast
        dusty: '#4B4FA8',   // Soft Accents
        
        // 3. Typography
        graphite: '#1C1E23', 
        slate: '#4B5563',
        
        // 4. Utility
        lavender: '#C7C9EB',
        sage: '#7FA89C',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        // ✅ THE CORRECT SOLUTION: Layered Gradient + Radial Glow
        'hero-premium': `
          radial-gradient(circle at 50% 30%, rgba(75, 79, 168, 0.10), transparent 60%),
          linear-gradient(180deg, #F6F7FB 0%, #EEF1F8 55%, #E6EAF4 100%)
        `,
        'card-sheen': 'linear-gradient(180deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 100%)',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(45, 42, 95, 0.04)',
        'glow': '0 0 15px rgba(75, 79, 168, 0.1)',
      }
    },
  },
  plugins: [],
}