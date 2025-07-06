import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class', // 👈 Enable dark mode via class
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#f8f9fa',
        primary: '#5A67D8',
        secondary: '#F6AD55',
        card: '#ffffff',
        text: '#2D3748',
        darkBg: '#1a202c',
        darkCard: '#2d3748',
        darkText: '#f7fafc',
        blue: {
  50: "#eff6ff",
  100: "#dbeafe",
  200: "#bfdbfe",
  300: "#93c5fd",
  400: "#60a5fa",
  500: "#3b82f6",
  600: "#2563eb",
  700: "#1d4ed8",
  800: "#1e40af",
  900: "#1e3a8a",
},

      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      borderRadius: {
        xl: '1.25rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        soft: '0 2px 12px rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [],
}

export default config
