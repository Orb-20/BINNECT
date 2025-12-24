/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Backgrounds
        pearl: '#F6F7FB',
        cloud: '#ECEFF6',
        ivory: '#FAFBFD',
        
        // Brand / Indigos
        royal: '#2D2A5F',
        midnight: '#23204A',
        dusty: '#4B4FA8',
        lavender: '#C7C9EB',
        
        // Text
        graphite: '#1C1E23',
        slate: '#4B5563',
        
        // Success
        sage: '#7FA89C',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'], // Ensure you have a clean font
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow': 'conic-gradient(from 180deg at 50% 50%, #ECEFF6 0deg, #F6F7FB 180deg)',
      }
    },
  },
  plugins: [],
}