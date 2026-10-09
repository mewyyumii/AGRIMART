/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#123D2A',
          deep: '#0B261A',
          surface: '#1A4F37',
          light: '#235D43',
        },
        leaf: {
          DEFAULT: '#4F8A3D',
          hover: '#437734',
          dark: '#3A672C',
        },
        cta: {
          DEFAULT: '#5C963F',
          hover: '#4F8436',
          active: '#44722E',
        },
        sage: {
          DEFAULT: '#E8F0E5',
          light: '#F2F7F0',
          border: '#D3E2CF',
        },
        offwhite: '#F7F8F3',
        ink: {
          DEFAULT: '#17231B',
          secondary: '#657168',
          muted: '#8A968D',
        },
        accentYellow: '#EAB308',
        // Compatibility aliases for existing classes
        primaryGreen: '#123D2A',
        secondaryGreen: '#4F8A3D',
        lightBg: '#F7F8F3',
      },
      fontFamily: {
        display: ['Manrope', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        pill: '0 10px 30px rgba(18, 61, 42, 0.08), 0 2px 8px rgba(18, 61, 42, 0.04)',
        float: '0 20px 40px rgba(18, 61, 42, 0.12), 0 4px 12px rgba(18, 61, 42, 0.06)',
        card: '0 4px 20px rgba(18, 61, 42, 0.05)',
        'card-hover': '0 12px 30px rgba(18, 61, 42, 0.1)',
      },
      borderRadius: {
        pill: '9999px',
        card: '18px',
      }
    },
  },
  plugins: [],
};