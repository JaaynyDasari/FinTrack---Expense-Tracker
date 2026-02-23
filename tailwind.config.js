/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2E7D32',    
        secondary: '#388E3C',  
        accent: '#43A047',     
        danger: '#FF6B6B',
        purple: '#6A4C93',
        darkText: '#2E2E2E',
        lightBg: '#F9FAFB',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif']
      },
      backgroundImage: {
        'gradient-waves': "url('https://images.pexels.com/photos/7135115/pexels-photo-7135115.jpeg?auto=compress&cs=tinysrgb&w=1600')",
      }
    },
  },
  plugins: [],
}