/** @type {import('tailwindcss').Config} */
export default {
  // Füge diese Zeile hinzu, um Tailwind mitzuteilen, dass es den Dark Mode basierend auf der 'dark'-Klasse im HTML-Element steuern soll.
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          primary: 'rgb(var(--accent-primary-rgb) / <alpha-value>)',
          light: 'rgb(var(--accent-light-rgb) / <alpha-value>)',
          lighter: 'rgb(var(--accent-lighter-rgb) / <alpha-value>)',
          dark: 'rgb(var(--accent-dark-rgb) / <alpha-value>)',
          darker: 'rgb(var(--accent-darker-rgb) / <alpha-value>)',
          'light-mode': 'rgb(var(--accent-lighter-rgb) / <alpha-value>)',
          'light-mode.dark': 'rgb(var(--accent-darker-rgb) / <alpha-value>)',
        }
      },
      boxShadow: {
        'outset-lg': '6px 6px 12px rgba(174, 174, 192, 0.4), -6px -6px 12px rgba(255, 255, 255, 0.7)',
        'outset-md': '4px 4px 8px rgba(174, 174, 192, 0.4), -4px -4px 8px rgba(255, 255, 255, 0.7)',
        'outset-sm': '3px 3px 6px rgba(174, 174, 192, 0.3), -3px -3px 6px rgba(255, 255, 255, 0.6)', // NEU: Small outset
        'outset-xs': '2px 2px 4px rgba(174, 174, 192, 0.3), -2px -2px 4px rgba(255, 255, 255, 0.6)', // NEU: Extra small outset
        'inset-md': 'inset 4px 4px 8px rgba(174, 174, 192, 0.4), inset -4px -4px 8px rgba(255, 255, 255, 0.7)',
        'inset-lg': 'inset 6px 6px 12px rgba(174, 174, 192, 0.5), inset -6px -6px 12px rgba(255, 255, 255, 0.6)',
        'inset-xl': 'inset 8px 8px 16px rgba(174, 174, 192, 0.6), inset -8px -8px 16px rgba(255, 255, 255, 0.7)',
        'inset-xs': 'inset 2px 2px 4px rgba(174, 174, 192, 0.3), inset -2px -2px 4px rgba(255, 255, 255, 0.6)', // NEU: Extra small inset
      },
    }
  },
  plugins: [],
}
