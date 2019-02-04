module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-empty-pattern': 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  'globals': {
    "_": true,
    "mfn_ajax": true,
    "jQuery": true,
    "wp": true,
    "ajaxurl": false,
    "Color": false,
    "wpColorPickerL10n": true,

  }
}
