const plugins = {
  tailwindcss: {}
};

if (process.env.NODE_ENV === 'production') {
  plugins.autoprefixer = {};
}

/** @type {import('postcss-load-config').Config} */
export default {
  plugins
};
