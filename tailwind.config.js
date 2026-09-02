/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#090a0f',
        surface: {
          50: '#181b26',
          100: '#13151f',
          200: '#0f1118',
          300: '#0b0c12',
          border: 'rgba(255, 255, 255, 0.08)',
          glow: 'rgba(56, 189, 248, 0.15)',
        },
        brand: {
          cyan: '#00f2fe',
          blue: '#4facfe',
          purple: '#7928ca',
          pink: '#ff0080',
          emerald: '#10b981',
          amber: '#f59e0b'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        serif: ['Fraunces', 'Georgia', 'ui-serif', 'serif'],
        display: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'marquee-reverse': 'marquee-reverse 25s linear infinite',
        'spin-slow': 'spin 12s linear infinite',
        'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
        'gradient-x': 'gradient-x 15s ease infinite',
        'shimmer': 'shimmer 2.5s infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        shimmer: {
          '100%': {
            transform: 'translateX(100%)',
          },
        },
      },
    },
  },
  plugins: [],
}
