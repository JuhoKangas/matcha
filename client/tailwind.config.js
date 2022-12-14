/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
	fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif']
      },
	  colors: {
		'black': '#000000',
		'almost-black': '#232931',
		'gray-dark': '#393E46',
		'almost-white': '#EEEEEE',
		'chitty-chitty': '#007991',
		'bang-bang': '#78FFD6',
	  },
  },
  plugins: [require('@tailwindcss/forms'),],
}
