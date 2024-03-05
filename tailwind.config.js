/** @type {import('tailwindcss').Config} */
export default {
	purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	content: [],
	theme: {
		extend: {
			fontFamily: {
				'sans': ['noto-sans', 'sans-serif']
			},
			colors: {
				'matisse': {
					'50': 'hsl(207, 73%, 97%)',
					'100': 'hsl(210, 69%, 94%)',
					'200': 'hsl(206, 69%, 86%)',
					'300': 'hsl(204, 70%, 74%)',
					'400': 'hsl(203, 69%, 60%)',
					'500': 'hsl(203, 65%, 48%)',
					'600': 'hsl(205, 72%, 39%)',
					'700': 'hsl(206, 71%, 34%)',
					'800': 'hsl(205, 66%, 27%)',
					'850': 'hsl(206, 63%, 25%)',
					'900': 'hsl(207, 59%, 24%)',
					'950': 'hsl(209, 58%, 16%)',
				},
			},
			spacing: {}
		},
	},
	plugins: [],
}

