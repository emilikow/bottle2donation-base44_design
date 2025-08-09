/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    container: { center: true, padding: '1.25rem' },
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial'],
      },
      colors: {
        brand: {
          DEFAULT: '#2563EB',
          50:  '#EEF2FF',
          100: '#E0EAFF',
          200: '#C7D2FE',
          300: '#A5B4FC',
          400: '#818CF8',
          500: '#6366F1',
          600: '#4F46E5',
          700: '#3B82F6',
          800: '#1D4ED8',
          900: '#1E40AF',
        },
        accent: {
          DEFAULT: '#2EC4B6',
          100: '#DFF7F4',
          200: '#BFF0EA',
          300: '#99E6DE',
          400: '#73DBD3',
          500: '#2EC4B6',
          600: '#27AA9E',
          700: '#1F8F86',
          800: '#17756F',
          900: '#115C59',
        },
      },
      boxShadow: {
        card: '0 12px 28px -18px rgba(2,6,23,.15)',
        brandGlow: '0 8px 24px -12px rgba(37,99,235,.35)',
      },
      borderRadius: { '2xl': '1rem' },
    },
  },
  plugins: [],
}
