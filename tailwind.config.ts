import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			brand: {
  				blue: {
  					'50': '#f0f5fa',
  					'100': '#e0ebf4',
  					'200': '#c1d7e9',
  					'300': '#93b8d7',
  					'400': '#5e93c1',
  					'500': '#3d74a8',
  					'600': '#2f5c8d',
  					'700': '#1e3a5f',
  					'800': '#1a3252',
  					'900': '#162b45',
  					'950': '#0e1c2e',
  					DEFAULT: '#1e3a5f'
  				},
  				orange: {
  					'50': '#fffbeb',
  					'100': '#fef3c7',
  					'200': '#fde68a',
  					'300': '#fcd34d',
  					'400': '#fbbf24',
  					'500': '#f59e0b',
  					'600': '#d97706',
  					'700': '#b45309',
  					'800': '#92400e',
  					'900': '#78350f',
  					'950': '#451a03',
  					DEFAULT: '#f59e0b'
  				},
  				yellow: {
  					'50': '#fefce8',
  					'100': '#fef9c3',
  					'200': '#fef08a',
  					'300': '#fde047',
  					'400': '#facc15',
  					'500': '#eab308',
  					DEFAULT: '#facc15'
  				}
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		fontFamily: {
  			sans: [
  				'var(--font-inter)',
  				'system-ui',
  				'sans-serif'
  			]
  		},
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
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
