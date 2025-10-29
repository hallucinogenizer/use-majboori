// Example ESLint Flat Config for use-majboori plugin
// This is the modern ESLint config format (ESLint 9.x+)
// Copy this to your project as eslint.config.mjs

import useMajbooriPlugin from 'use-majboori/eslint-plugin';

export default [
  {
    // Apply to all JavaScript/TypeScript files
    files: ['**/*.{js,jsx,ts,tsx}'],
    
    plugins: {
      'use-majboori': useMajbooriPlugin,
    },
    
    rules: {
      // Enforce useMajboori instead of useEffect
      'use-majboori/no-use-effect': 'error',
    },
  },
];

