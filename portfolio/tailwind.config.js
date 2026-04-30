/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        ink: {
          950: '#06070d',
          900: '#0a0c16',
          800: '#11142233',
          700: '#1a1e30',
        },
        neon: {
          blue: '#3b82ff',
          violet: '#8b5cf6',
          cyan: '#22d3ee',
        }
      },
      animation: {
        'aurora': 'aurora 18s ease-in-out infinite',
        'float': 'float 9s ease-in-out infinite',
        'float-slow': 'float 14s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
        'spin-slow': 'spin 24s linear infinite',
        'marquee': 'marquee 40s linear infinite',
        'fade-up': 'fadeUp 0.8s cubic-bezier(.2,.8,.2,1) both',
      },
      keyframes: {
        aurora: {
          '0%, 100%': { transform: 'translate3d(-8%, -4%, 0) scale(1)', opacity: '.55' },
          '33%': { transform: 'translate3d(10%, 6%, 0) scale(1.15)', opacity: '.75' },
          '66%': { transform: 'translate3d(-4%, 10%, 0) scale(1.05)', opacity: '.6' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-18px) rotate(1.2deg)' },
        },
        pulseGlow: {
          '0%,100%': { boxShadow: '0 0 0 0 rgba(59,130,255,.45), 0 0 60px rgba(139,92,246,.25)' },
          '50%': { boxShadow: '0 0 0 12px rgba(59,130,255,0), 0 0 90px rgba(34,211,238,.35)' },
        },
        marquee: {
          'from': { transform: 'translateX(0)' },
          'to': { transform: 'translateX(-50%)' },
        },
        fadeUp: {
          'from': { opacity: '0', transform: 'translateY(28px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
      }
    }
  },
  plugins: [],
}
