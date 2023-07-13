/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins"],
      },
      colors: {
        primary: {
          100: "#EFE5E5",
          200: "#E3DADA",
          300: "#D6CECE",
          400: "#CAC3C3",
          500: "#BDB8B8",
          600: "#B1ACAC",
          700: "#A4A1A1",
          800: "#989595",
          900: "#8B8A8A",
        },
        info: {
          100: "#CBF0F4",
          200: "#C1E9ED",
          300: "#B7E1E6",
          400: "#ADDADF",
          500: "#A3D3D8",
          600: "#98CBD0",
          700: "#8EC4C9",
          800: "#84BCC2",
          900: "#7AB5BB",
        },
        danger: {
          100: "#F7D9E3",
          200: "#F7CAD9",
          300: "#F7BBCF",
          400: "#F6ACC5",
          500: "#F69EBB",
          600: "#F68FB1",
          700: "#F680A7",
          800: "#F5719D",
          900: "#F56293",
        },
        success: {
          100: "#E8FFF3",
          200: "#D5F9E6",
          300: "#C2F3D9",
          400: "#AFECCB",
          500: "#9CE6BE",
          600: "#89E0B1",
          700: "#76DAA4",
          800: "#63D396",
          900: "#50CD89",
        }
      },
    },
  },
  plugins: [],
};
