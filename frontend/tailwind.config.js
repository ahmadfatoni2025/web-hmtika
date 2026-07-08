// #tailwind.config.js
/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Google Sans", ...defaultTheme.fontFamily.sans],
                display: ["Google Sans", ...defaultTheme.fontFamily.sans],
            },
            colors: {
                zinc: {
                    950: "#050505",
                    900: "#0A0A0A",
                },
            },
        },
    },
    plugins: [],
}