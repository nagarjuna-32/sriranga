/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dominant: Soft Off-White & Light Gray
        offwhite: {
          DEFAULT: '#F8F9FA',
          50: '#FFFFFF',
          100: '#F8F9FA',
          200: '#F1F3F5',
          300: '#E9ECEF',
          400: '#DEE2E6',
        },
        // Secondary: Charcoal Text & Structured Contrast
        charcoal: {
          950: '#121417',
          900: '#1A1D20',
          850: '#212529',
          800: '#2B3035',
          700: '#343A40',
          600: '#495057',
          500: '#6C757D',
          400: '#868E96',
          300: '#ADB5BD',
          200: '#CED4DA',
          100: '#E9ECEF',
          50: '#F8F9FA',
        },
        // Compatibility alias for navy -> mapping to charcoal
        navy: {
          950: '#121417',
          900: '#1A1D20',
          850: '#212529',
          800: '#2B3035',
          700: '#343A40',
          600: '#495057',
          500: '#6C757D',
          100: '#F1F3F5',
          50: '#F8F9FA',
        },
        // Accents: Vibrant Purple, Coral, and Yellow
        purple: {
          DEFAULT: '#7048E8',
          50: '#F3F0FF',
          100: '#E5DBFF',
          200: '#D0BFFF',
          300: '#B197FC',
          400: '#9775FA',
          500: '#845EF7',
          600: '#7048E8',
          700: '#5F3DC4',
          800: '#4C2EB0',
          900: '#3B1F8C',
        },
        coral: {
          DEFAULT: '#FA5252',
          50: '#FFF5F5',
          100: '#FFE3E3',
          200: '#FFC9C9',
          300: '#FFA8A8',
          400: '#FF8787',
          500: '#FF6B6B',
          600: '#FA5252',
          700: '#F03E3E',
          800: '#E03131',
          900: '#C92A2A',
        },
        yellow: {
          DEFAULT: '#FAB005',
          50: '#FFF9DB',
          100: '#FFF3BF',
          200: '#FFEC99',
          300: '#FFE066',
          400: '#FFD43B',
          500: '#FCC419',
          600: '#FAB005',
          700: '#F59F00',
          800: '#F08C00',
          900: '#E67700',
        },
        // Compatibility alias for gold -> Vibrant Golden Yellow
        gold: {
          DEFAULT: '#FAB005',
          50: '#FFF9DB',
          100: '#FFF3BF',
          200: '#FFEC99',
          300: '#FFE066',
          400: '#FFD43B',
          500: '#FAB005',
          600: '#F59F00',
          700: '#E67700',
        },
        // Primary brand action -> Vibrant Purple
        brand: {
          royal: '#7048E8',
          blue: '#5F3DC4',
          light: '#FA5252',
          sky: '#FAB005',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Outfit', 'Plus Jakarta Sans', 'sans-serif'],
      },
      boxShadow: {
        'premium': '0 10px 30px -10px rgba(0, 0, 0, 0.05), 0 0 1px rgba(0, 0, 0, 0.1)',
        'premium-hover': '0 20px 40px -15px rgba(112, 72, 232, 0.15), 0 0 1px rgba(0, 0, 0, 0.15)',
        'purple-glow': '0 0 25px rgba(112, 72, 232, 0.35)',
        'coral-glow': '0 0 25px rgba(250, 82, 82, 0.35)',
        'yellow-glow': '0 0 25px rgba(250, 176, 5, 0.35)',
        'blue-glow': '0 0 25px rgba(112, 72, 232, 0.35)',
      }
    },
  },
  plugins: [],
}
