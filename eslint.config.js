import antfu from '@antfu/eslint-config'

export default antfu(
  {
    formatters: true,
    react: true,
    typescript: true,
    stylistic: {
      indent: 2,
      quotes: 'single',
      maxLen: 80,
    },
  },
  {
    rules: {
      'antfu/top-level-function': 'off',
      'no-labels': 'off',
      'no-lone-blocks': 'off',
      'no-restricted-syntax': 'off',
      'node/prefer-global/buffer': 'off',
      'node/prefer-global/process': 'off',
      'prefer-rest-params': 'off',
      'style/jsx-indent': [2, 2, { indentLogicalExpressions: true }],
      'symbol-description': 'off',
      'ts/no-invalid-this': 'off',
      'ts/no-unnecessary-type-constraint': 'off',
      'ts/ban-types': 'off',
    },
  },
)
