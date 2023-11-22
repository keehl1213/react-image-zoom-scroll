module.exports = {
    extends: ['react-app', 'react-app/jest', 'airbnb', 'prettier'],
    plugins: ['prettier'],
    rules: {
        'prettier/prettier': [
            'error',
            { singleQuote: true, tabWidth: 4, endOfLine: 'auto' },
        ],
        semi: 0,
        'react/jsx-filename-extension': [
            1,
            { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
        ],
        'react/require-default-props': [2, { functions: 'ignore' }],
        'import/prefer-default-export': 1,
        camelcase: 1,
        'react/jsx-props-no-spreading': 0,
        'react/destructuring-assignment': 1,
        'no-use-before-define': 0,
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                js: 'never',
                jsx: 'never',
                ts: 'never',
                tsx: 'never',
            },
        ],
        'import/no-cycle': 1,
        'no-unused-expressions': 0,
        'no-unused-vars': 1,
        'react-hooks/exhaustive-deps': 0,
        'dot-notation': 1,
        'no-useless-return': 0,
        'react/no-unused-prop-types': 1,
        'no-param-reassign': 1,
        'jsx-a11y/click-events-have-key-events': 0,
        'jsx-a11y/no-static-element-interactions': 0,
        'react/prop-types': 0,
        'import/no-extraneous-dependencies': [
            'error',
            {
                devDependencies: [
                    '**/*.test.js',
                    '**/*.spec.js',
                    '**/*.test.tsx',
                    '**/*.test.ts',
                ],
            },
        ],
        'react/function-component-definition': [
            2,
            { namedComponents: 'arrow-function' },
        ],
        'react/no-unstable-nested-components': [2, { allowAsProps: true }],
        'no-undef': 0, //  https://typescript-eslint.io/linting/troubleshooting/#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
                moduleDirectory: ['node_modules', 'src/'],
            },
        },
    },
};
