// Importe o pacote tailwindcss
import type { Config } from 'tailwindcss'

const config: Config = {
   content: [
      './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
   ],
   theme: {
      extend: {
         fontFamily: {
            roboto: ['Roboto', 'sans'], // 'sans' é uma fonte genérica sans-serif
         },
         backgroundImage: {
            'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
            'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
         },
         colors: {
            white: '#FFF',
            gray: {
               900: '#121214',
               800: '#202024',
               300: '#c4c4cc',
               100: '#e1e1e6',
            },
            green: {
               500: '#00875f',
               300: '#00b37e',
            },
         },
         fontSize: {
            md: '1.125rem',
            lg: '1.25rem',
            xl: '1.5rem',
            '2xl': '2rem',
         },
      },
   },
   plugins: [],
}

export default config
