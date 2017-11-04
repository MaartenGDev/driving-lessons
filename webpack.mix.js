let mix = require('laravel-mix')
let tailwindcss = require('tailwindcss');
/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.react('resources/assets/js/index.js', 'public/js/app.js')

mix.postCss('resources/assets/js/index.css', 'public/css/app.css', [
  tailwindcss('./tailwind.js'),
]);