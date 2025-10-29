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
    return {
      ImportDeclaration(node) {
        // Check if importing from 'react'
        if (node.source.value === 'react') {
          // Check each specifier
          node.specifiers.forEach((specifier) => {
            if (
              specifier.type === 'ImportSpecifier' &&
              specifier.imported.type === 'Identifier' &&
              specifier.imported.name === 'useEffect'
            ) {
              context.report({
                node: specifier,
                messageId: 'noUseEffect',
              });
            }
          });
        }
      },
      CallExpression(node) {
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

