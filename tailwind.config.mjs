/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,mdx,svelte,ts,tsx,vue}'],
	theme: {
		screens: {
			sm: '480px',
			md: '768px',
			lg: '976px',
			xl: '1440px',
		},
		colors: {
			'blue': '#1fb6ff',
			'purple': '#7e5bef',
			'pink': '#ff49db',
			'orange': '#ff7849',
			'green': '#13ce66',
			'yellow': '#ffc82c',
			'gray-dark': '#273444',
			'gray': '#8492a6',
			'gray-light': '#d3dce6',
			'white': '#ffffff',
			'black': '#000000',
		},
		fontFamily: {
			sans: ['Graphik', 'sans-serif'],
			serif: ['Merriweather', 'serif'],
		},
		extend: {
			spacing: {
				'sm': '2rem',
				'md': '4rem',
				'lg': '8rem',
			},
			borderRadius: {
				'4xl': '2rem',
			},
			// Design-system tokens (src/styles/tokens.css), exposed for utility
			// classes. Yellow = the twin, steel blue = the visitor — see
			// tokens.css for the full explanation of the naming.
			colors: {
				ground: 'var(--ground)',
				surface: 'var(--surface)',
				'surface-2': 'var(--surface-2)',
				ink: 'var(--ink)',
				muted: 'var(--muted)',
				faint: 'var(--faint)',
				line: 'var(--line)',
				'line-strong': 'var(--line-strong)',
				'btn-ink': 'var(--btn-ink)',
				accent: 'var(--accent)',
				'accent-ink': 'var(--accent-ink)',
				'accent-tint': 'var(--accent-tint)',
				'accent-line': 'var(--accent-line)',
				accent2: 'var(--accent2)',
				'accent2-ink': 'var(--accent2-ink)',
				'accent2-tint': 'var(--accent2-tint)',
				'accent2-line': 'var(--accent2-line)',
				twin: 'var(--twin)',
				'twin-ink': 'var(--twin-ink)',
				'twin-tint': 'var(--twin-tint)',
				'twin-line': 'var(--twin-line)',
				visitor: 'var(--visitor)',
				'visitor-ink': 'var(--visitor-ink)',
				'visitor-tint': 'var(--visitor-tint)',
				'visitor-line': 'var(--visitor-line)',
			},
		},
	},
	plugins: [],
	important: true,
}
