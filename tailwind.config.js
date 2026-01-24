/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          white: '#FFFFFF',
          darkGray: '#1F2937',
          black: '#000000',
          gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        },
        shading: {
          black1: '#1A1A1A',
          black6: '#666666',
          white4: '#F5F5F5',
          white8: '#FAFAFA',
        },
        feedback: {
          success: '#10B981',
          red: '#EF4444',
        },
        neutral: {
          50: '#FAFAFA',
          gray: '#9CA3AF',
          middleGray: '#6B7280',
        }
      },
      fontFamily: {
        sans: ['Switzer', 'SF Pro Display', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '20px',
      },
      spacing: {
        '18': '4.5rem',
      }
    },
  },
  plugins: [],
}
