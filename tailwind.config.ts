import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#05070C',
        midnightNavy: '#0A1226',
        royalNavy: '#0B1830',
        deepBlue: '#15275C',
        obsidianNavy: '#060912',
        slateNavy: '#0F2340',
        sapphire: '#24487A',
        champagneGold: '#B8892F',
        luxuryGold: '#B8892F',
        goldLight: '#E8C878',
        goldPale: '#F0DDA6',
        pearlWhite: '#FFFFFF',
        ivory: '#F7F3EA',
        platinum: '#E0E0E0',
        softSand: '#E4D3B0',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(120deg, #6b4d13 0%, #B8892F 30%, #E8C878 50%, #F0DDA6 58%, #B8892F 78%, #6b4d13 100%)',
        'navy-gradient': 'linear-gradient(135deg, #05070C 0%, #0B1830 35%, #15275C 70%, #05070C 100%)',
        'navy-dark-gradient': 'linear-gradient(180deg, #05070C 0%, #0D1A34 50%, #05070C 100%)',
        'navy-radial': 'radial-gradient(circle at 50% 30%, #15275C 0%, #0D1A34 55%, #05070C 100%)',
        'hero-gradient': 'linear-gradient(125deg, #05070C 0%, #0D1A34 30%, #12356A 55%, #060912 100%)',
      },
      fontFamily: {
        display: ['"Fraunces"', 'Georgia', 'serif'],
        accent: ['"Cinzel"', 'serif'],
        ui: ['Manrope', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
