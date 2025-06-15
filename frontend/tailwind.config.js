/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary': '#6366F1', // Trustworthy indigo - indigo-500
        'primary-50': '#EEF2FF', // Light indigo tint - indigo-50
        'primary-100': '#E0E7FF', // Lighter indigo - indigo-100
        'primary-200': '#C7D2FE', // Light indigo - indigo-200
        'primary-300': '#A5B4FC', // Medium light indigo - indigo-300
        'primary-400': '#818CF8', // Medium indigo - indigo-400
        'primary-500': '#6366F1', // Base primary indigo - indigo-500
        'primary-600': '#4F46E5', // Dark indigo - indigo-600
        'primary-700': '#4338CA', // Darker indigo - indigo-700
        'primary-800': '#3730A3', // Very dark indigo - indigo-800
        'primary-900': '#312E81', // Darkest indigo - indigo-900

        // Secondary Colors
        'secondary': '#8B5CF6', // Complementary purple - violet-500
        'secondary-50': '#F5F3FF', // Light purple tint - violet-50
        'secondary-100': '#EDE9FE', // Lighter purple - violet-100
        'secondary-200': '#DDD6FE', // Light purple - violet-200
        'secondary-300': '#C4B5FD', // Medium light purple - violet-300
        'secondary-400': '#A78BFA', // Medium purple - violet-400
        'secondary-500': '#8B5CF6', // Base secondary purple - violet-500
        'secondary-600': '#7C3AED', // Dark purple - violet-600
        'secondary-700': '#6D28D9', // Darker purple - violet-700
        'secondary-800': '#5B21B6', // Very dark purple - violet-800
        'secondary-900': '#4C1D95', // Darkest purple - violet-900

        // Accent Colors
        'accent': '#10B981', // Success green - emerald-500
        'accent-50': '#ECFDF5', // Light green tint - emerald-50
        'accent-100': '#D1FAE5', // Lighter green - emerald-100
        'accent-200': '#A7F3D0', // Light green - emerald-200
        'accent-300': '#6EE7B7', // Medium light green - emerald-300
        'accent-400': '#34D399', // Medium green - emerald-400
        'accent-500': '#10B981', // Base accent green - emerald-500
        'accent-600': '#059669', // Dark green - emerald-600
        'accent-700': '#047857', // Darker green - emerald-700
        'accent-800': '#065F46', // Very dark green - emerald-800
        'accent-900': '#064E3B', // Darkest green - emerald-900

        // Background Colors
        'background': '#FAFBFC', // Soft off-white - slate-50
        'surface': '#FFFFFF', // Pure white - white
        'surface-50': '#F8FAFC', // Very light gray - slate-50
        'surface-100': '#F1F5F9', // Light gray - slate-100
        'surface-200': '#E2E8F0', // Medium light gray - slate-200

        // Text Colors
        'text-primary': '#1F2937', // Dark gray - gray-800
        'text-secondary': '#6B7280', // Medium gray - gray-500
        'text-tertiary': '#9CA3AF', // Light gray - gray-400
        'text-inverse': '#FFFFFF', // White text - white

        // State Colors
        'success': '#059669', // Deeper green - emerald-600
        'success-light': '#D1FAE5', // Light success background - emerald-100
        'warning': '#D97706', // Warm amber - amber-600
        'warning-light': '#FEF3C7', // Light warning background - amber-100
        'error': '#DC2626', // Clear red - red-600
        'error-light': '#FEE2E2', // Light error background - red-100

        // Border Colors
        'border': '#E5E7EB', // Light border - gray-200
        'border-light': '#F3F4F6', // Very light border - gray-100
        'border-focus': '#6366F1', // Focus border - indigo-500
      },
      fontFamily: {
        'sans': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Fira Code', 'Monaco', 'Cascadia Code', 'Roboto Mono', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      fontWeight: {
        'normal': '400',
        'medium': '500',
        'semibold': '600',
      },
      borderRadius: {
        'none': '0',
        'sm': '0.125rem',
        'DEFAULT': '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        'full': '9999px',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'base': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'modal': '0 10px 25px rgba(0, 0, 0, 0.1)',
        'none': 'none',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
        '800': '800',
        '900': '900',
        '1000': '1000',
        '1100': '1100',
      },
      transitionTimingFunction: {
        'gentle': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        '200': '200ms',
        '250': '250ms',
        '300': '300ms',
      },
      animation: {
        'breathing': 'breathing 2s ease-in-out infinite',
        'gentle-shake': 'gentleShake 0.5s ease-in-out',
        'fade-in': 'fadeIn 0.3s ease-in-out',
      },
      keyframes: {
        breathing: {
          '0%, 100%': { opacity: '0.8', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.02)' },
        },
        gentleShake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-4px)' },
          '75%': { transform: 'translateX(4px)' },
        },
        fadeIn: {
          'from': { opacity: '0', transform: 'translateY(4px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}