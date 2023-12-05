import { defineConfig } from 'windicss/helpers';

export const colorPanel = {
  rosewater: '#dc8a78',
  flamingo: '#dd7878',
  pink: '#ea76cb',
  mauve: '#8839ef',
  red: '#d20f39',
  maroon: '#e64553',
  peach: '#fe640b',
  yellow: '#df8e1d',
  green: '#40a02b',
  teal: '#179299',
  sky: '#04a5e5',
  sapphire: '#209fb5',
  blue: '#1e66f5',
  lavender: '#7287fd',
  text: '#4c4f69',
  subtext1: '#5c5f77',
  subtext0: '#6c6f85',
  overlay2: '#7c7f93',
  overlay1: '#8c8fa1',
  overlay0: '#9ca0b0',
  surface2: '#acb0be',
  surface1: '#bcc0cc',
  surface0: '#ccd0da',
  base: '#eff1f5',
  mantle: '#e6e9ef',
  crust: '#dce0e8',
  'rosewater-dark': '#f5e0dc',
  'flamingo-dark': '#f2cdcd',
  'pink-dark': '#f5c2e7',
  'mauve-dark': '#cba6f7',
  'red-dark': '#f38ba8',
  'maroon-dark': '#eba0ac',
  'peach-dark': '#fab387',
  'yellow-dark': '#f9e2af',
  'green-dark': '#a6e3a1',
  'teal-dark': '#94e2d5',
  'sky-dark': '#89dceb',
  'sapphire-dark': '#74c7ec',
  'blue-dark': '#89b4fa',
  'lavender-dark': '#b4befe',
  'text-dark': '#cdd6f4',
  'subtext1-dark': '#bac2de',
  'subtext0-dark': '#a6adc8',
  'overlay2-dark': '#9399b2',
  'overlay1-dark': '#7f849c',
  'overlay0-dark': '#6c7086',
  'surface2-dark': '#585b70',
  'surface1-dark': '#45475a',
  'surface0-dark': '#313244',
  'base-dark': '#1e1e2e',
  'mantle-dark': '#181825',
  'crust-dark': '#11111b',
};

export default defineConfig({
  plugins: [
    require('windicss/plugin/aspect-ratio'),
    require('@windicss/plugin-heropatterns')({
      patterns: [],
      colors: {
        default: '#E1F194',
      },
      opacity: {
        default: 0.4,
      },
    }),
  ],

  theme: {
    extend: {
      fontFamily: {
        hl: ['HeadLineA'],
        jd: ['jdlz'],
        pm: ['PangMenZhengDao'],
      },
      colors: {
        ...colorPanel,
      },
      boxShadow: {
        'in-sm': 'inset 0 0 8px rgba(0, 0, 0, 0.06)',
        in: 'inset 0 0 12px rgba(0, 0, 0, 0.06)',
        'in-big': 'inset 0 1px 30px rgba(0, 0, 0, 0.30)',
        'out-big': '0 1px 30px rgba(0, 0, 0, 0.30)',
        out: '0 0 12px rgba(0, 0, 0, 0.06)',
      },
    },
  },

  shortcuts: {
    'text-gradient-blue': 'text-transparent bg-clip-text bg-gradient-to-b from-[#63D2FF] to-[#BDF3FF]',
  },
});
