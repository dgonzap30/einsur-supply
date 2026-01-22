/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.5rem',
        sm: '2rem',
        lg: '3rem',
        xl: '4rem',
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        // Industrial color palette
        navy: {
          50: '#E8EDF5',
          100: '#C5D3E8',
          200: '#9FB5D6',
          300: '#7A97C4',
          400: '#5479B2',
          500: '#1E3A6E', // Primary brand blue
          600: '#1A3260',
          700: '#152A52',
          800: '#112244',
          900: '#0D1A36',
        },
        red: {
          50: '#FBEAEA',
          100: '#F5CACA',
          200: '#E99A97',
          300: '#DD6A64',
          400: '#D15A52',
          500: '#C44536', // Primary CTA
          600: '#B03D30',
          700: '#9C352A',
          800: '#882D24',
          900: '#74251E',
        },
        gray: {
          50: '#F9FAFB',  // Alt backgrounds
          100: '#F3F4F6', // Card backgrounds
          200: '#E5E7EB', // Borders, dividers
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280', // Body text
          600: '#4B5563',
          700: '#374151', // Section headings
          800: '#1F2937',
          900: '#111827', // Dark text, main headings
        },
        yellow: {
          300: '#FFF066',
          400: '#FFE833',
          500: '#FFE600',
          600: '#E6CF00',
          700: '#CCB800',
        },
        emerald: {
          DEFAULT: '#10B981',
          400: '#34d399',
          500: '#10b981',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Manrope', 'sans-serif'],
      },
      lineHeight: {
        'loose-plus': '2.2',
      },
      backgroundImage: {},
      animation: {
        'scroll': 'scroll 30s linear infinite',
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    }
  },
  plugins: [],
}
