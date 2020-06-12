// const IN_PRODUCTION = process.env.NODE_ENV === 'production'

// class TailwindVueExtractor {
//   static extract(content) {
//     const contentWithoutStyleBlocks = content.replace(
//       /<style[^]+?<\/style>/gi,
//       ''
//     )
//     return contentWithoutStyleBlocks.match(/[A-Za-z0-9-_:/]+/g) || []
//   }
// }

// const extensionsUsingCSS = ['vue', 'html']
// const extensionsOfCSS = [
//   'css',
//   'less',
//   'pcss',
//   'postcss',
//   'sass',
//   'scss',
//   'styl'
// ]

// module.exports = {
//   plugins: [
//     require('postcss-preset-env')({ stage: 2 }),
//     require('tailwindcss')('./tailwind.config.js'),
//     IN_PRODUCTION &&
//       require('@fullhuman/postcss-purgecss')({
//         content: [`./@(public|src)/**/*.@(${extensionsUsingCSS.join('|')})`],
//         css: [`./src/**/*.@(${extensionsOfCSS.join('|')})`],
//         extractors: [
//           {
//             extractor: TailwindVueExtractor,
//             extensions: extensionsUsingCSS
//           }
//         ],
//         whitelist: [],
//         whitelistPatterns: [
//           /-(leave|enter|appear)(|-(to|from|active))$/,
//           /^(?!(|.*?:)cursor-move).+-move$/,
//           /^router-link(|-exact)-active$/
//         ]
//       }),
//     require('autoprefixer')()
//   ]
// }

const purgecss = require('@fullhuman/postcss-purgecss')({
  content: [
    // ...Default config
    // Your custom theme file:
    // './myOwnTheme.js',
    // Or the default
    './node_modules/vue-tailwind/node_modules/vue-tailwind/src/themes/default.js'
  ],

  // Include any special characters you're using in this regular expression
  defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
})

module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    ...(process.env.NODE_ENV === 'production' ? [purgecss] : [])
  ]
}
