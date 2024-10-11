
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{jsx,js}", "./index.html"],
  theme: {

    fontFamily: {
      'poppins': ["Poppins", "sans-serif"],
      'kanit': ["Kanit", "sans-serif"],
    },
    
    extend: {

      colors: {
        primary: {
          black: "#191919",
          white: "#FBFBFB",
          gray: "#242424"
        },
        complementary: {
          blue: "#55AAF9",
          red: "#bf0000",
        }
      },

      backgroundColor: {
        backgroundApp : "#242424"
      }
    },

  },
  plugins: [],
}

