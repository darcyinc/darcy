module.exports = {
  ...require('../../.prettierrc.json'),
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindConfig: './tailwind.config.ts'
};
