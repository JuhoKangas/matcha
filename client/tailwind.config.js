/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'almost-black': '#232931',
        'gray-dark': '#393E46',
        'almost-white': '#EEEEEE',
        'chitty-chitty': '#007991',
        'bang-bang': '#78FFD6',
      },
			backgroundImage: {
				'landing-bg': "url('../public/landing-bg.jpg')",
			},
    },
    fontFamily: {
      montserrat: ['Montserrat', 'sans-serif'],
			script: ['Dancing Script', 'sans-serif']
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
