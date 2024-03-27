/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    { pattern: /bg-(red|blue|green)-(200|300|400|500)/ },
    { pattern: /text-(red|blue|green)-(400|500|600|700)/ },
    { pattern: /ring-(red|blue|green)-(200|300|400|500)/ },
    { pattern: /border-(red|blue|green)-(200|300|400|500)/ },
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
