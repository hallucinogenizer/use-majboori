import noUseEffect from './rules/no-use-effect';

const plugin = {
  meta: {
    name: 'use-majboori',
    version: '1.0.0',
  },
  rules: {
    'no-use-effect': noUseEffect,
  },
  configs: {
    recommended: {
      plugins: ['use-majboori'],
      rules: {
        'use-majboori/no-use-effect': 'error',
      },
    },
  },
};

export default plugin;

