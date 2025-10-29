import { ESLint, Rule } from 'eslint';

const rule: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow direct usage of useEffect. Use useMajboori instead.',
      recommended: true,
    },
    messages: {
      noUseEffect: 'Direct usage of useEffect is not allowed. Use useMajboori instead and provide a reason.',
    },
    schema: [],
  },
  create(context: Rule.RuleContext) {
    // Track the local names that refer to useEffect
    const useEffectLocalNames = new Set<string>();

    return {
      ImportDeclaration(node) {
        // Track imports of useEffect from 'react'
        if (node.source.value === 'react') {
          node.specifiers.forEach((specifier) => {
            if (
              specifier.type === 'ImportSpecifier' &&
              specifier.imported.type === 'Identifier' &&
              specifier.imported.name === 'useEffect'
            ) {
              // Track the local name (in case it's aliased)
              useEffectLocalNames.add(specifier.local.name);
            }
          });
        }
      },
      CallExpression(node) {
        // Check for direct useEffect() calls
        if (
          node.callee.type === 'Identifier' &&
          useEffectLocalNames.has(node.callee.name)
        ) {
          context.report({
            node: node.callee,
            messageId: 'noUseEffect',
          });
        }

        // Check for React.useEffect() calls
        if (
          node.callee.type === 'MemberExpression' &&
          node.callee.object.type === 'Identifier' &&
          node.callee.object.name === 'React' &&
          node.callee.property.type === 'Identifier' &&
          node.callee.property.name === 'useEffect'
        ) {
          context.report({
            node: node.callee,
            messageId: 'noUseEffect',
          });
        }
      },
    };
  },
};

export default rule;

