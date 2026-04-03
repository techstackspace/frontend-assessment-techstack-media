import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        ink: '#111827',
        mist: '#f8fafc',
        line: '#e5e7eb'
      },
      boxShadow: {
        soft: '0 10px 30px rgba(2, 6, 23, 0.06)'
      }
    }
  },
  plugins: []
};

export default config;
