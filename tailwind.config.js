const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  purge: ['./src/ui/**/*.{ts,tsx,html}'],
  theme: {
    spacing: [
      0,
      1,
      2,
      4,
      6,
      8,
      10,
      12,
      14,
      16,
      18,
      20,
      24,
      28,
      32,
      40,
      60,
      80,
    ].reduce((m, n) => {
      m[n] = `${n}px`;
      return m;
    }, {}),
    screens: {
      sm: { max: '600px' },
      lg: { min: '600px' },
    },
    backgroundImage: {
      refreshGradient: 'linear-gradient(180deg, #A8A29E 0%, #78716C 100%)',
      buttonGradient: 'linear-gradient(180deg, #363636 0%, #292929 100%)',
    },
    colors: {
      form: {
        bg: '#101010',
      },
      label: {
        bg: '#191919',
        text: '#E7E6E4',
      },
      transparent: 'transparent',
      current: 'currentColor',
      main: {
        light: '#666666',
        DEFAULT: '#1E1E1E',
      },
      blue: {
        from: '#8A78FD',
        to: '#796BFD',
        light: '#8697FF',
        DEFAULT: '#796BFD',
        purple: '#5F75FF',
      },
      black: '#707280',
      green: '#27C193',
      white: colors.white,
      yellow: '#F29C1B',
      orange: '#FFB020',
      pink: '#F24822',
      red: {
        light: '#F24822',
        DEFAULT: '#AF160E',
        forbidden: '#EC5151',
      },
      gray: {
        bg2: '#F5F6FA',
        bg: '#F5F6FA',
        divider: '#E5E9EF',
        comment: '#B4BDCC',
        content: '#ccc',
        subTitle: '#7A7A7A',
        title: '#fff',
        light: '#707880',
        common: '#666666',
      },
    },
    boxShadow: {
      default: '0px 1px 0px 0px rgba(0, 0, 0, 0.48)',
    },
    fontSize: {
      12: [
        '12px',
        {
          lineHeight: '14px',
        },
      ],
      13: '13px',
      14: [
        '14px',
        {
          lineHeight: '18px',
        },
      ],
      15: [
        '15px',
        {
          lineHeight: '18px',
        },
      ],
      18: [
        '18px',
        {
          lineHeight: '22px',
        },
      ],
      20: '20px',
      24: [
        '24px',
        {
          lineHeight: '28px',
        },
      ],
      28: [
        '28px',
        {
          lineHeight: '33px',
        },
      ],
    },
  },
  // use media-query prefers-color-scheme
  darkMode: 'media',
  important: true,
};
