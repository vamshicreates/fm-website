/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        telugu: ['"Noto Sans Telugu"', 'sans-serif'],
      },
      colors: {
        brand: {
          crimson: '#D92D20',
          wine: '#7A1C1C',
          espresso: '#121110',
          coffee: '#1E1B18',
          parchment: '#FAF7F0',
          cream: '#F4EFE6',
          sand: '#E6DEC8',
          ink: '#1A1816',
          gold: '#C59B27',
          charcoal: '#1A1D20',
        }
      }
    },
  },
  plugins: [],
}
