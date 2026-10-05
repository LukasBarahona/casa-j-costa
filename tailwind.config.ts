import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
        // Titulares de la maqueta
        display: ['Merriweather', 'Georgia', 'serif'],
        // Serif del logotipo "CASA J COSTA"
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      fontSize: {
        // Teléfono: sigue el ancho (10.9vw) para que "Centro de eventos" quepa en una línea desde 320 px.
        'hero': ['clamp(2rem, min(9.4vw, 1.5rem + 3.4vw), 4.5rem)', { lineHeight: '1.08' }],
        // Titular de capítulo ("La Casa", "Qué celebramos"): 78 pt sobre 1440 en la maqueta.
        'title': ['clamp(2.1rem, 5.2vw, 5rem)', { lineHeight: '1.1' }],
        'statement': ['clamp(1.4rem, 2.9vw, 2.6rem)', { lineHeight: '1.35' }],
        'lead': ['clamp(1.05rem, 1.5vw, 1.3rem)', { lineHeight: '1.5' }],
      },
      colors: {
        // Paleta de la maqueta + verdes derivados
        marfil: '#F8F5F1',
        papel: '#FFFFFF',
        ebano: '#2B2B2B',
        verde: {
          DEFAULT: '#526E4E',
          bosque: '#3D5239',
          profundo: '#2A3927',
          salvia: '#A9B8A4',
          niebla: '#E3E9DE',
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
