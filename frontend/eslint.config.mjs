import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    languageOptions: { globals: globals.browser },
    rules: {
      ...pluginJs.configs.recommended,
      ...pluginReact.configs.flat.recommended,
      'react/no-unknown-property': 'off',
      'react-hooks/rules-of-hooks': 'error', // Enforce React hooks rules
      'react-hooks/exhaustive-deps': 'warn' // Warn about missing dependencies in useEffect
    }
  }
];
