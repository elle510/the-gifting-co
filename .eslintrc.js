module.exports = {
    parser: 'babel-eslint',
    extends: [
        'prettier',
        'prettier/react',
        'airbnb',
    ],
    plugins: ['react-hooks'],
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    rules: {
        'max-len': [1, 120, 2, { ignoreComments: true }],
        indent: [1, 4, { SwitchCase: 1 }],
        'arrow-body-style': 'off', // ["error", "as-needed", { "requireReturnForObjectLiteral": true }],
        'arrow-parens': 'off', // Incompatible with prettier
        // 'no-bitwise': 'off', // airbnb use error (확인해보고 off 가 낫으면 off 시키자)
        // "no-useless-constructor": "off",
        'react/jsx-indent': [1, 4],
        'linebreak-style': 'off', // Don't play nicely with Windows.
        // 'operator-linebreak': ['error', 'before', { overrides: { '=': 'none' } }], airbnb use
        'operator-linebreak': [
            'error',
            'before',
            {
                overrides: {
                    '*': 'ignore',
                    '/': 'ignore',
                    '-': 'ignore',
                    '+': 'ignore',
                    '=': 'ignore',
                    '>': 'ignore',
                    '<': 'ignore',
                    '>=': 'ignore',
                    '<=': 'ignore',
                    '+=': 'ignore',
                    '-=': 'ignore',
                    '*=': 'ignore',
                    '&&': 'ignore',
                    '||': 'ignore',
                    '!==': 'ignore',
                    '===': 'ignore',
                },
            },
        ],
        'object-curly-newline': 'off', // airbnb 3개 까지 허용
        // 'object-curly-newline': ['error', {
        //     ObjectExpression: { minProperties: 4, multiline: true, consistent: true },
        //     ObjectPattern: { minProperties: 4, multiline: true, consistent: true },
        //     ImportDeclaration: { minProperties: 4, multiline: true, consistent: true },
        //     ExportDeclaration: { minProperties: 4, multiline: true, consistent: true },
        // }],
        'react/jsx-filename-extension': ['error', { extensions: ['.js'] }], // airbnb is using .jsx
        'react/prefer-stateless-function': 'off',
        'react/prop-types': 'off',
        'react/jsx-indent-props': [2, 4],
        'react/forbid-prop-types': 'off',
        'react/require-default-props': 'off', // airbnb use error
        'react/default-props-match-prop-types': 'off',
        'react/destructuring-assignment': 'off', // airbnb use error always
        'react/no-access-state-in-setstate': 'off', // airbnb use error
        'react/static-property-placement': ['error', 'static public field'], // airbnb use property assignment
        'react/jsx-props-no-spreading': 'off', // airbnb use error
        'react/jsx-fragments': ['off', 'syntax'], // airbnb use error (default error syntax)
        'react/jsx-one-expression-per-line': 'off', // airbnb use ['error', { allow: 'single-child' }],
        'react/no-multi-comp': ['off', { ignoreStateless: true }], // for hoc (airbnb use error)
        'react/no-array-index-key': 'warn',

        'jsx-a11y/label-has-associated-control': 'off', // airbnb use error
        'jsx-a11y/href-no-hash': 'off',
        'jsx-a11y/anchor-is-valid': [
            'error',
            {
                components: ['Link'],
                specialLink: ['to'],
            },
        ],
        'jsx-a11y/no-noninteractive-element-interactions': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
        'jsx-a11y/mouse-events-have-key-events': 'off',
        'jsx-a11y/accessible-emoji': 'off',
        'jsx-a11y/label-has-for': 'off',
        'jsx-a11y/no-static-element-interactions': 'off',

        'import/no-extraneous-dependencies': 'off',
        'import/no-unresolved': 'off',
        'import/extensions': 'off',
        'import/no-cycle': 'off', // airbnb use error
        'no-underscore-dangle': 'off',
        'no-param-reassign': ['error', { props: false }],
        'no-plusplus': 'off',
        'no-multiple-empty-lines': ['error', { max: 2, maxBOF: 1, maxEOF: 0 }],
        'no-console': ['warn', { allow: ['warn', 'error'] }],
        radix: 'off', // airbnb use error (require use of the second argument for parseInt())

        // react-hooks
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
    },
    overrides: [
        {
            files: ['**/*.test.js'],
            env: {
                jest: true, // now **/*.test.js files' env has both es6 *and* jest
            },
            // Can't extend in overrides: https://github.com/eslint/eslint/issues/8813
            // "extends": ["plugin:jest/recommended"]
            plugins: ['jest'],
            rules: {
                'jest/no-disabled-tests': 'warn',
                'jest/no-focused-tests': 'error',
                'jest/no-identical-title': 'error',
                'jest/prefer-to-have-length': 'warn',
                'jest/valid-expect': 'error',
            },
        },
    ],
};
