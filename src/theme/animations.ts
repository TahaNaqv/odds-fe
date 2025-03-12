
const animations = {
  keyframes: {
    'accordion-down': {
      from: {
        height: '0'
      },
      to: {
        height: 'var(--radix-accordion-content-height)'
      }
    },
    'accordion-up': {
      from: {
        height: 'var(--radix-accordion-content-height)'
      },
      to: {
        height: '0'
      }
    },
    'fade-in': {
      from: {
        opacity: '0',
        transform: 'translateY(10px)'
      },
      to: {
        opacity: '1',
        transform: 'translateY(0)'
      }
    },
    'fade-out': {
      from: {
        opacity: '1',
        transform: 'translateY(0)'
      },
      to: {
        opacity: '0',
        transform: 'translateY(10px)'
      }
    },
    'pulse-subtle': {
      '0%, 100%': {
        opacity: '1',
      },
      '50%': {
        opacity: '0.8',
      },
    },
    'float': {
      '0%': {
        transform: 'translateY(0px)',
      },
      '50%': {
        transform: 'translateY(-6px)',
      },
      '100%': {
        transform: 'translateY(0px)',
      },
    },
    'bounce': {
      '0%': { transform: 'translateY(0)' },
      '40%': { transform: 'translateY(-4px)' },
      '60%': { transform: 'translateY(-4px)' },
      '100%': { transform: 'translateY(0)' }
    },
    'scale-in': {
      '0%': {
        transform: 'scale(0.95)',
        opacity: '0'
      },
      '100%': {
        transform: 'scale(1)',
        opacity: '1'
      }
    },
    'shimmer': {
      '0%': { backgroundPosition: '-200% 0' },
      '100%': { backgroundPosition: '200% 0' }
    },
    'ripple': {
      '0%': { transform: 'scale(0)', opacity: '1' },
      '100%': { transform: 'scale(4)', opacity: '0' }
    }
  },
  animation: {
    'accordion-down': 'accordion-down 0.2s ease-out',
    'accordion-up': 'accordion-up 0.2s ease-out',
    'fade-in': 'fade-in 0.5s ease-out',
    'fade-out': 'fade-out 0.5s ease-out',
    'pulse-subtle': 'pulse-subtle 3s infinite ease-in-out',
    'float': 'float 4s infinite cubic-bezier(0.41, 0.01, 0.24, 1)',
    'bounce': 'bounce 2s cubic-bezier(0.25, 0.1, 0.25, 1) infinite',
    'scale-in': 'scale-in 0.3s ease-out',
    'shimmer': 'shimmer 2s infinite linear',
    'ripple': 'ripple 0.7s ease-out'
  },
};

export default animations;
