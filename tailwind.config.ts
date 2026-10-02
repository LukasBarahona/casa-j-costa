import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        // Titulares: serif de trazo suave
        display: ['Fraunces', 'Georgia', 'serif'],
        // Serif del logotipo "CASA J COSTA"
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      fontSize: {
        // Teléfono: sigue el ancho (10.9vw) para que "Centro de eventos" quepa en una línea desde 320 px.
        'hero': ['clamp(2.1rem, min(10.9vw, 4rem + 3.4vw), 7.75rem)', { lineHeight: '0.98' }],
        'title': ['clamp(2.1rem, 5.2vw, 4.5rem)', { lineHeight: '1.04' }],
        'statement': ['clamp(1.6rem, 3.5vw, 3.25rem)', { lineHeight: '1.16' }],
        'lead': ['clamp(1.125rem, 1.7vw, 1.5rem)', { lineHeight: '1.4' }],
      },
      colors: {
        // Paleta #3 + verdes derivados
        marfil: '#F3EEE4',
        papel: '#FAF6EE',
        ebano: '#1E1C1A',
        verde: {
          DEFAULT: '#596C52',
          bosque: '#3C4A37',
          profundo: '#232B20',
          salvia: '#A9B5A0',
          niebla: '#DCE2D3',
        },
        bronce: {
          DEFAULT: '#A78557',
          claro: '#CDB48C',
        },
        azulado: '#5E6D74',

        // Semánticos: cambian con el tono de cada sección (.tone-*)
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        accent: "hsl(var(--accent))",
        brand: {
          DEFAULT: "hsl(var(--brand))",
          foreground: "hsl(var(--brand-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
      },
      borderRadius: {
        sheet: '3rem',
        card: '2rem',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [animate],
} satisfies Config;
