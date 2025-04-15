
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		fontFamily: {
			'pixel': ['"Press Start 2P"', 'cursive'],
			'future': ['"Orbitron"', 'sans-serif'],
		},
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
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
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				cyber: {
					'black': '#0D0D0D',
					'dark': '#1A1A1A',
					'neon-blue': '#00FFFF',
					'neon-pink': '#FF00FF',
					'neon-green': '#00FF00',
					'neon-yellow': '#FFFF00',
					'neon-purple': '#9b87f5',
					'matrix-green': '#00FF41',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'scanline': {
					'0%': { transform: 'translateY(0)' },
					'100%': { transform: 'translateY(100%)' }
				},
				'glitch': {
					'0%': { transform: 'translate(0)' },
					'20%': { transform: 'translate(-5px, 5px)' },
					'40%': { transform: 'translate(-5px, -5px)' },
					'60%': { transform: 'translate(5px, 5px)' },
					'80%': { transform: 'translate(5px, -5px)' },
					'100%': { transform: 'translate(0)' }
				},
				'flicker': {
					'0%': { opacity: '0.8' },
					'5%': { opacity: '0.85' },
					'10%': { opacity: '0.9' },
					'15%': { opacity: '0.85' },
					'20%': { opacity: '0.8' },
					'25%': { opacity: '0.75' },
					'30%': { opacity: '0.9' },
					'35%': { opacity: '0.8' },
					'40%': { opacity: '0.9' },
					'45%': { opacity: '0.85' },
					'50%': { opacity: '0.8' },
					'55%': { opacity: '0.75' },
					'60%': { opacity: '0.9' },
					'65%': { opacity: '0.8' },
					'70%': { opacity: '0.9' },
					'75%': { opacity: '0.85' },
					'80%': { opacity: '0.8' },
					'85%': { opacity: '0.75' },
					'90%': { opacity: '0.9' },
					'95%': { opacity: '0.85' },
					'100%': { opacity: '0.8' }
				},
				'float': {
					'0%': { transform: 'translateY(0px) rotate(0deg)' },
					'50%': { transform: 'translateY(-10px) rotate(5deg)' },
					'100%': { transform: 'translateY(0px) rotate(0deg)' }
				},
				'pulse-glow': {
					'0%': { boxShadow: '0 0 5px 0 rgba(0, 255, 255, 0.5)' },
					'50%': { boxShadow: '0 0 20px 5px rgba(0, 255, 255, 0.8)' },
					'100%': { boxShadow: '0 0 5px 0 rgba(0, 255, 255, 0.5)' }
				},
				'boot-text': {
					'0%': { opacity: '0' },
					'10%': { opacity: '1' },
					'90%': { opacity: '1' },
					'100%': { opacity: '0' }
				},
				'star-twinkle': {
					'0%': { opacity: '0.2' },
					'50%': { opacity: '1' },
					'100%': { opacity: '0.2' }
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'scanline': 'scanline 8s linear infinite',
				'glitch': 'glitch 0.5s linear infinite',
				'flicker': 'flicker 3s linear infinite',
				'float': 'float 6s ease-in-out infinite',
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
				'boot-text': 'boot-text 3s ease-in-out',
				'star-twinkle': 'star-twinkle 3s ease-in-out infinite',
			},
			backgroundImage: {
				'grid-pattern': 'linear-gradient(to right, rgba(0, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 255, 255, 0.1) 1px, transparent 1px)',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
