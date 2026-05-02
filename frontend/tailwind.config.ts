import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'neon-cyan': '#00F0FF',
        'neon-magenta': '#FF00DE',
        'neon-yellow': '#FFE81F',
        'holo-blue': '#4A90D9',
        'void-black': '#0A0A0F',
        'space-dark': '#12121A',
        'space-mid': '#1A1A2E',
        'nebula-gray': '#2A2A3E',
        'star-white': '#E0E0FF',
        'dust-gray': '#8888AA',
      },
      fontFamily: {
        display: ['Orbitron', 'sans-serif'],
        mono: ['Share Tech Mono', 'monospace'],
      },
      animation: {
        glitch: 'glitch 0.5s ease-in-out infinite alternate',
        scanline: 'scanline 4s linear infinite',
        'neon-pulse': 'neonPulse 2s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.4s ease-out forwards',
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        glitch: {
          '0%': { textShadow: '2px 0 #FF00DE, -2px 0 #00F0FF' },
          '100%': { textShadow: '-2px 0 #FF00DE, 2px 0 #00F0FF' },
        },
        scanline: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '0 100vh' },
        },
        neonPulse: {
          '0%, 100%': {
            boxShadow: '0 0 5px #00F0FF, 0 0 10px #00F0FF, 0 0 20px #00F0FF',
          },
          '50%': {
            boxShadow: '0 0 10px #00F0FF, 0 0 20px #00F0FF, 0 0 40px #00F0FF',
          },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      borderRadius: {
        cyber: '2px',
      },
      boxShadow: {
        'neon-cyan': '0 0 5px #00F0FF, 0 0 10px #00F0FF',
        'neon-magenta': '0 0 5px #FF00DE, 0 0 10px #FF00DE',
        'neon-yellow': '0 0 5px #FFE81F, 0 0 10px #FFE81F',
        'card-glow': '0 0 15px rgba(0, 240, 255, 0.1), inset 0 0 15px rgba(0, 240, 255, 0.05)',
      },
      backdropBlur: {
        cyber: '12px',
      },
    },
  },
  plugins: [],
};

export default config;
