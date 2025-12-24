/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // --- The "Indigo-Purple" Executive Palette ---
        
        // 1. Canvas & Surfaces
        pearl: '#F8F8FC',       // General Page Bg (Soft Off-White/Lavender tint)
        haze: '#E6E6FA',        // Home Page Bg (Lavender Haze)
        ivory: '#FFFFFF',       // Card Surface
        
        // 2. Brand Identity
        royal: '#1B003F',       // "Night Indigo" - Headlines, Trust, Primary Brand
        twilight: '#4B0082',    // "Twilight Purple" - Emphasis, Primary Actions
        midnight: '#191970',    // "Midnight Blue" - Deep Contrast, Filters, Active States
        dusty: '#6495ED',       // "Dusky Blue" - Highlights, Secondary Links
        
        // 3. Typography
        graphite: '#1C1E23',    // Body Text
        slate: '#4B5563',       // Muted Text
        
        // 4. Utility
        lavender: '#C7C9EB',    // Borders/Dividers
        sage: '#7FA89C',        // Verified Status (Keeping for trust)
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        // ✅ NEW: Subtle Lavender-to-White gradient for the Hero
        'hero-premium': `
          radial-gradient(circle at 50% 0%, rgba(75, 0, 130, 0.03), transparent 70%),
          linear-gradient(180deg, #E6E6FA 0%, #F8F8FC 100%)
        `,
        'card-sheen': 'linear-gradient(180deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 100%)',
        // ✅ NEW: Deep Login Gradient (Lavender -> Indigo)
        'auth-gradient': 'linear-gradient(135deg, #2D2A5F 0%, #1B003F 100%)',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(27, 0, 63, 0.04)',
        'glow': '0 0 15px rgba(75, 0, 130, 0.15)',
      }
    },
  },
  plugins: [],
}