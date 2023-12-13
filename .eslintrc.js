process.env.TAMAGUI_TARGET = 'web'

module.exports = {
  root: true,
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js'],
      extends: [
        '@status-im/eslint-config',
        'plugin:tailwindcss/recommended',
        'next',
        'next/core-web-vitals',
      ],
      rules: {
        'jsx-a11y/alt-text': [
          1,
          {
            img: [],
          },
        ],
      },
    },
    {
      // parser: 'esprima',
      files: ['*.mjs'],
      // env: {
      //   browser: true,
      //   es2021: true,
      // },
      // extends: ['eslint:recommended', 'plugin:import/recommended'],
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    {
      files: ['*.js'],
      parserOptions: {
        ecmaVersion: 'latest',
      },
    },
  ],
}
