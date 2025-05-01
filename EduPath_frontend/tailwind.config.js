/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        fontFamily: {
          kregular: ['Kanit-Regular', 'sans-serif'],
          kblack: ['Kanit-Black', 'sans-serif'],
          kbold: ['Kanit-Bold', 'sans-serif'],
          kbolditalic: ['Kanit-BoldItalic', 'sans-serif'],
          kextralight: ['Kanit-ExtraLight', 'sans-serif'],
          kextralightitalic: ['Kanit-ExtraLightItalic', 'sans-serif'],
          kitalic: ['Kanit-Italic', 'sans-serif'],
          klight: ['Kanit-Light', 'sans-serif'],
          klightitalic: ['Kanit-LightItalic', 'sans-serif'],
          kmedium: ['Kanit-Medium', 'sans-serif'],
          kmediumitalic: ['Kanit-MediumItalic', 'sans-serif'],
          ksemibold: ['Kanit-SemiBold', 'sans-serif'],
          ksemibolditalic: ['Kanit-SemiBoldItalic', 'sans-serif'],
          kthin: ['Kanit-Thin', 'sans-serif'],
          kthinitalic: ['Kanit-ThinItalic', 'sans-serif'],
          kextrabold: ['Kanit-ExtraBold', 'sans-serif'],
          kextrabolditalic: ['Kanit-ExtraBoldItalic', 'sans-serif'],
          kblackitalic: ['Kanit-BlackItalic', 'sans-serif'],
        },
        extend: {
      },
    },
    plugins: [],
  } 
  module.exports = {
    darkMode: 'class',
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
      extend: {},
    },
    plugins: [],
  }