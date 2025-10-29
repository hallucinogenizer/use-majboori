# use-majboori 🤷

> A React hook that forces you to justify your `useEffect` usage

**Majboori** (مجبوری) means "helplessness" or "compulsion" in Urdu/Hindi. This package is for when you have *no choice* but to use `useEffect` - but you better have a good reason! 😤

## Why?

`useEffect` is overused. Developers reach for it when they shouldn't. This hook makes you think twice by requiring you to provide a justification for every effect.

Perfect for teams that want to discourage casual `useEffect` usage and promote better React patterns.

## Installation

```bash
npm install use-majboori
# or
yarn add use-majboori
# or
pnpm add use-majboori
```

## Usage

```tsx
import { useMajboori } from 'use-majboori';

function MyComponent() {
  const [count, setCount] = useState(0);

  // ❌ This won't let you forget why you're using an effect
  useMajboori(
    () => {
      document.title = `Count: ${count}`;
    },
    [count],
    "Need to update document title because browser API can only be accessed in effects"
  );

  return <div>{count}</div>;
}
```

## API

```typescript
useMajboori(
  effect: EffectCallback,
  deps: DependencyList | undefined,
  reason: string
): void
```

### Parameters

- **effect**: The effect function to run (same as `useEffect`)
- **deps**: The dependency array (same as `useEffect`)
- **reason**: **REQUIRED** - A string explaining why you need to use this effect

### Development Mode Warnings

In development mode, `useMajboori` will:
- ⚠️ Warn you if the reason is empty or too short (< 10 characters)
- 📝 Log the reason to the console so your team can see your justifications

In production mode, it silently passes through to `useEffect` with no overhead.

## ESLint Plugin (Enforcement)

This package includes an ESLint plugin to **enforce** the use of `useMajboori` by forbidding direct `useEffect` usage!

### Setup

**1. Install the package** (if you haven't already):

```bash
pnpm add use-majboori
```

**2. Configure ESLint**:

#### Flat Config (ESLint 9.x / eslint.config.mjs) - Recommended

```javascript
// eslint.config.mjs
import useMajbooriPlugin from 'use-majboori/eslint-plugin';

export default [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      'use-majboori': useMajbooriPlugin,
    },
    rules: {
      'use-majboori/no-use-effect': 'error',
    },
  },
];
```

#### Legacy Config (ESLint 8.x / .eslintrc.js)

```javascript
// .eslintrc.js
const useMajbooriPlugin = require('use-majboori/eslint-plugin');

module.exports = {
  plugins: {
    'use-majboori': useMajbooriPlugin,
  },
  rules: {
    'use-majboori/no-use-effect': 'error',
  },
};
```

Or with string-based plugin registration:

```javascript
module.exports = {
  plugins: ['use-majboori'],
  rules: {
    'use-majboori/no-use-effect': 'error',
  },
};
```

### What it Does

The `no-use-effect` rule will error **on the line where `useEffect` is called**, not on the import:

❌ **Direct useEffect calls**:
```typescript
import { useEffect } from 'react'; // Import is fine

function MyComponent() {
  useEffect(() => {  // ❌ Error appears HERE on usage!
    // ...
  }, []);
}
```

❌ **React.useEffect calls**:
```typescript
import React from 'react';

function MyComponent() {
  React.useEffect(() => {  // ❌ Error appears HERE!
    // ...
  }, []);
}
```

✅ **Forces you to use useMajboori**:
```typescript
import { useMajboori } from 'use-majboori';

function MyComponent() {
  useMajboori(() => {  // ✅ Good!
    // ...
  }, [], "Valid reason here");
}
```

**Note**: The rule also handles aliased imports:
```typescript
import { useEffect as useReactEffect } from 'react';

useReactEffect(() => {}, []); // ❌ Still caught!
```

### Alternative: Built-in ESLint Rule

If you prefer not to use the plugin, you can also use ESLint's built-in `no-restricted-imports`:

```json
{
  "rules": {
    "no-restricted-imports": ["error", {
      "paths": [{
        "name": "react",
        "importNames": ["useEffect"],
        "message": "Please use useMajboori instead of useEffect and provide a reason!"
      }]
    }]
  }
}
```

## Examples of Good Reasons

✅ "Syncing with external DOM library that requires imperative setup"  
✅ "Setting up WebSocket connection that needs cleanup"  
✅ "Subscribing to browser API that doesn't have a React equivalent"  
✅ "Third-party analytics library requires DOM to be ready"  

## Examples of Bad Reasons

❌ "idk" (too short, think harder!)  
❌ "because" (not helpful)  
❌ "to fetch data" (consider React Query, SWR, or server components instead)  
❌ "to update state" (probably don't need an effect for this)  

## Philosophy

This package is partly a joke, but also a serious tool. The best code is code that makes you *think* before you write it. If you can't articulate why you need an effect, maybe you don't need it!

Consider alternatives:
- Event handlers for user interactions
- Derived state for computed values
- React Query/SWR for data fetching
- Server Components for initial data
- `useSyncExternalStore` for external subscriptions

## License

MIT

## Contributing

PRs welcome! Especially for:
- Better validation of reasons
- Analysis of common bad reasons
- Integration with popular linters

---

Made with helplessness 🤷 by developers who've seen too many unnecessary `useEffect`s

