module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  globals: {
    process: 'readonly',
  },
  env: {
    browser: true,
    es2021: true,
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'], // Your TypeScript files extension

      // You should extend TypeScript plugins here,
      // instead of extending them outside the `overrides`.
      // If you don't want to extend any rules, you don't need an `extends` attribute.
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],
      parserOptions: {
        project: ['./tsconfig.json'], // Specify it only for TypeScript files
        tsconfigRootDir: __dirname,
        sourceType: 'module',
      },
      rules: {
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/no-explicit-any': 'off',

        // Enforce consistent indentation
        indent: ['error', 2],

        // Enforce semicolons at the end of statements
        semi: ['error', 'always'],

        // Enforce single quotes for string literals
        quotes: ['error', 'single'],

        // Enforce a maximum line length
        'max-len': ['error', { code: 120 }],

        // Enforce a consistent spacing before function parenthesis
        'space-before-function-paren': ['error', 'never'],

        // Enforce consistent spacing around operators
        'space-infix-ops': 'error',

        // Enforce the use of camelCase for variable names
        camelcase: [
          'error',
          { properties: 'never', ignoreDestructuring: true },
        ],

        // Disallow unused variables
        'no-unused-vars': [
          'error',
          { vars: 'all', args: 'after-used', ignoreRestSiblings: false },
        ],
      },
    },
    {
      files: ['path/to/ignored/files/**/*.ts'],
      rules: {
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
  ],
};
