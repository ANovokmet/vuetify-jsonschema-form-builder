const production = process.env.NODE_ENV === 'production';

module.exports = {
  publicPath: production
      ? '/vuetify-jsonschema-form-builder/'
      : '/',
  outputDir: 'dist',
  transpileDependencies: [
    'vuetify', '@koumoul/vjsf'
  ]
}
