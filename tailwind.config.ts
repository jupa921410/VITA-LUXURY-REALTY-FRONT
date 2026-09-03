import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        midnightNavy: '#020712',
        royalNavy: '#061325',
        deepBlue: '#0A1C36',
        obsidianNavy: '#01040A',
        slateNavy: '#0E2344',
        champagneGold: '#D4AF37',
        luxuryGold: '#D4AF37',
        pearlWhite: '#FFFFFF',
        platinum: '#E0E0E0',
        softSand: '#D8CBB5',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(120deg, #815f13 0%, #D4AF37 35%, #fff3b0 55%, #D4AF37 75%, #815f13 100%)',
        'navy-gradient': 'linear-gradient(135deg, #01040A 0%, #061325 35%, #0A1C36 70%, #020712 100%)',
        'navy-dark-gradient': 'linear-gradient(180deg, #01040A 0%, #040D1B 50%, #01040A 100%)',
        'navy-radial': 'radial-gradient(circle at 50% 30%, #0A1C36 0%, #040D1B 55%, #01040A 100%)',
        'hero-gradient': 'linear-gradient(125deg, #01040A 0%, #040D1B 30%, #071830 55%, #030814 100%)',
      },
      fontFamily: {
        display: ['"Bodoni Moda"', 'serif'],
        ui: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
