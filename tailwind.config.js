/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/renderer/index.html', // Caminho para o index.html
    './src/renderer/src/**/*.{js,ts,jsx,tsx}', // Caminho para os arquivos JSX/TSX
  ],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/line-clamp', 'tailwind-scrollbar')],
};
