/* eslint-disable @typescript-eslint/no-var-requires */
module.exports = function () {
  return {
    name: 'postcss-tailwindcss-loader',
    configurePostCss(postcssOptions) {
      postcssOptions.plugins.push(require("tailwindcss"));
      postcssOptions.plugins.push(require("autoprefixer"));
      // postcssOptions.plugins.push(
      //   // require('postcss-import'),
      //   // require('tailwindcss'),
      //   // require('postcss-preset-env')({
      //   //   autoprefixer: {
      //   //     flexbox: 'no-2009',
      //   //   },
      //   //   stage: 4,
      //   // })
      // );
      return postcssOptions;
    },
  };
};
