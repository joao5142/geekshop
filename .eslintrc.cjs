module.exports = {
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    extraFileExtensions: ['.vue'],
  },
  ignorePatterns: ['**/stories/*', 'build', 'dist', 'node_modules'],
  plugins: ['vue', '@typescript-eslint/eslint-plugin'],

  extends: ['plugin:vue/vue3-recommended', 'plugin:prettier/recommended'],
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        'vue/component-name-in-template-casing': [
          'error',
          'kebab-case',
          {
            registeredComponentsOnly: false,
            ignores: [],
          },
        ],

        'vue/valid-v-slot': [
          'error',
          {
            allowModifiers: true,
          },
        ],

        'vue/html-self-closing': [
          'error',
          {
            html: {
              void: 'always',
              normal: 'never',
              component: 'any',
            },
            svg: 'always',
            math: 'always',
          },
        ],

        'vue/html-closing-bracket-newline': [
          'error',
          {
            singleline: 'never',
            multiline: 'always',
          },
        ],
      },
    },
    {
      files: [
        // These pages names and subdirectories can be contain  multiple words in their names
        '**/pages/**/*.{js,ts,jsx,tsx,vue}',
        '**/error.{js,ts,jsx,tsx,vue}',
        '**/stories/**/*.{js,ts,jsx,tsx,vue}',
        '**/layouts/**/*.{js,ts,jsx,tsx,vue}',
        '**/components/*/**/*.{js,ts,jsx,tsx,vue}',
      ],
      rules: { 'vue/multi-word-component-names': 'off' },
    },
    {
      files: ['*.js', '*.ts', '*.tsx', '*.mts', '*.cts', '*.vue'],
      rules: {
        '@typescript-eslint/eslint-plugin/no-unused-vars': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'no-console': 'off',
        'import/no-duplicates': 'off',
        'no-useless-catch': 'off',
        'prettier/prettier': [
          'error',
          {
            endOfLine: 'auto',
            trailingComma: 'es5',
            singleQuote: true,
            semi: false,
            printWidth: 100,
            htmlWhitespaceSensitivity: 'ignore',
          },
        ],
      },
    },
  ],
}
