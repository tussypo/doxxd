
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
				// Cyberpunk theme colors
				cyberpink: '#D946EF',
				cyberpurple: '#9b87f5',
				cyberpurple2: '#7E69AB',
				cyberblue: '#0EA5E9',
				cyberblue2: '#1EAEDB',
				cyberdark: '#1A1F2C',
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
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'fade-out': {
					'0%': { opacity: '1' },
					'100%': { opacity: '0' }
				},
				'slide-up': {
					'0%': { transform: 'translateY(10px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'slide-down': {
					'0%': { transform: 'translateY(-10px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'scale-in': {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'reveal': {
					'0%': { 
						filter: 'blur(12px)',
						opacity: '0',
						transform: 'scale(0.9)'
					},
					'100%': { 
						filter: 'blur(0)',
						opacity: '1',
						transform: 'scale(1)'
					}
				},
				'pulse-light': {
					'0%, 100%': { 
						opacity: '1',
						transform: 'scale(1)'
					},
					'50%': { 
						opacity: '0.85',
						transform: 'scale(0.98)'
					}
				},
				'cyber-glow': {
					'0%, 100%': {
						filter: 'drop-shadow(0 0 5px rgba(215, 70, 239, 0.7))'
					},
					'50%': {
						filter: 'drop-shadow(0 0 15px rgba(215, 70, 239, 0.9))'
					}
				},
				'neon-pulse': {
					'0%': { 
						boxShadow: '0 0 5px rgba(215, 70, 239, 0.7), 0 0 10px rgba(215, 70, 239, 0.5), 0 0 15px rgba(215, 70, 239, 0.3)' 
					},
					'50%': { 
						boxShadow: '0 0 10px rgba(215, 70, 239, 0.9), 0 0 20px rgba(215, 70, 239, 0.7), 0 0 30px rgba(215, 70, 239, 0.5)' 
					},
					'100%': { 
						boxShadow: '0 0 5px rgba(215, 70, 239, 0.7), 0 0 10px rgba(215, 70, 239, 0.5), 0 0 15px rgba(215, 70, 239, 0.3)' 
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'fade-out': 'fade-out 0.3s ease-out',
				'slide-up': 'slide-up 0.4s ease-out',
				'slide-down': 'slide-down 0.4s ease-out',
				'scale-in': 'scale-in 0.4s ease-out',
				'reveal': 'reveal 1.2s cubic-bezier(0.22, 1, 0.36, 1)',
				'pulse-light': 'pulse-light 2s infinite',
				'cyber-glow': 'cyber-glow 2s infinite ease-in-out',
				'neon-pulse': 'neon-pulse 2s infinite ease-in-out',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
