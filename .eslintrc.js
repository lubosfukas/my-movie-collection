module.exports = {
    extends: [
        'react-app', // Create React App base settings
        'eslint:recommended', // recommended ESLint rules
        'plugin:@typescript-eslint/recommended', // recommended rules from @typescript-eslint/eslint-plugin
        'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with Prettier.
        'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display Prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
        'plugin:react-hooks/recommended' // Enforces the Rules of Hooks
    ],
    rules: {
        quotes: [
            'error',
            'single',
            {
                avoidEscape: true,
                allowTemplateLiterals: true
            }
        ],
        'no-irregular-whitespace': [
            'warn',
            { skipComments: true, skipStrings: false, skipTemplates: false, skipRegExps: false }
        ],
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'no-console': 'warn',
        'comma-dangle': ['error', 'never']
    }
}
