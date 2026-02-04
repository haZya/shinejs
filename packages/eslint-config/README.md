# @shinejs/eslint-config

Shared ESLint configuration for the `shinejs` monorepo. Built on top of [antfu's eslint-config](https://github.com/antfu/eslint-config).

## Features

- **TypeScript Support**: Native support for TypeScript out of the box.
- **Stylistic Opinions**: 2 spaces, semicolons, and double quotes.
- **Spell Checking**: Integrated `@cspell/eslint-plugin` with a custom word list.
- **Auto-formatting**: Built-in rules for sorting imports and consistent naming.
- **React Support**: Optional React rules available via configuration.

## Usage

In any package or app within the monorepo, create an `eslint.config.mjs` file:

```javascript
import { createConfig } from "@shinejs/eslint-config";

export default createConfig({
  // options passed to @antfu/eslint-config
  react: true, // Enable React rules if needed
}, {
  // your custom flat config items
  rules: {
    "no-console": "off"
  }
});
```

### Custom Words

Each package can have its own `custom-words.txt` file in its root. The spellchecker will look for this file to validate project-specific terminology.

## Development

To build the configuration:

```bash
npm run build
```
