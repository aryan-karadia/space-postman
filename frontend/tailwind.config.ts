import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Orbitron', 'sans-serif'],       // headings, logo, UI chrome
        mono: ['"Share Tech Mono"', 'monospace'],   // letter body, code-like text
      },
      colors: {
        // shadcn CSS variable bridge — required for shadcn components to work
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        // SW cyberpunk palette — use these in page/component classes
        neon: {
          cyan:    '#00f5ff',   // primary accent — links, borders, glow
          magenta: '#ff00ff',   // secondary accent — destructive, alerts
          amber:   '#ffb700',   // tertiary accent — hover states, highlights
        },
        void: {
          950: '#02020a',       // page background
          900: '#07071a',       // card background
          800: '#0e0e2e',       // elevated surface
          700: '#1a1a3e',       // border / separator
        },
      },
      // Scanline and glitch animations referenced in animations.css
      keyframes: {
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        glitch: {
          '0%, 100%': { clipPath: 'inset(0 0 98% 0)' },
          '20%': { clipPath: 'inset(33% 0 33% 0)', transform: 'translateX(-4px)' },
          '40%': { clipPath: 'inset(66% 0 5% 0)',  transform: 'translateX(4px)' },
          '60%': { clipPath: 'inset(10% 0 60% 0)', transform: 'translateX(-2px)' },
          '80%': { clipPath: 'inset(50% 0 20% 0)', transform: 'translateX(2px)' },
        },
        flicker: {
          '0%, 19%, 21%, 100%': { opacity: '1' },
          '20%': { opacity: '0.6' },
        },
      },
      animation: {
        scanline: 'scanline 6s linear infinite',
        glitch:   'glitch 2.5s steps(1) infinite',
        flicker:  'flicker 4s ease-in-out infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],  // required by shadcn
}

export default config