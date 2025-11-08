/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				serif: ['Playfair Display', 'Lora', 'serif'],
				sans: ['Inter', 'Satoshi', 'system-ui', 'sans-serif'],
			},
			colors: {
				noir: {
					primary: '#FFD700', // Gold accent
					black: '#000000',
					white: '#FFFFFF',
					gray: {
						50: '#FAFAFA',
						100: '#F5F5F5',
						200: '#EEEEEE',
						300: '#E0E0E0',
						400: '#BDBDBD',
						500: '#9E9E9E',
						600: '#757575',
						700: '#616161',
						800: '#424242',
						900: '#212121',
					},
				},
			},
			spacing: {
				// 8px grid system
				18: '4.5rem', // 72px
				22: '5.5rem', // 88px
			},
			fontSize: {
				// Modular 1.25 ratio
				'display-1': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
				'display-2': ['3.6rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
				'display-3': ['2.88rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
			},
			boxShadow: {
				'card': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
				'card-lg': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
			},
		},
	},
	plugins: [],
};
