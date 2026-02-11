<p align="center">
  <img src="https://github.com/user-attachments/assets/8e200840-1ec7-4894-95a8-06098b992f4c" alt="Shinejs demo" />
</p>

# ShineJS

A modern monorepo for `shinejs`, a library for creating beautiful, interactive text and box shadows.

## Links

[Getting Started](https://shinejs.vercel.app/docs/getting-started/react-quick-start) | [Docs](https://shinejs.vercel.app/docs) | [Demo](https://shinejs-demo.vercel.app) | [NPM](https://www.npmjs.com/package/@hazya/shinejs)

## Project Structure

This repository is managed as an npm workspace:

- **`packages/shinejs`**: The core library, including the React `Shine` component and `useShine` hook. [Read more](./packages/shinejs/README.md).
- **`apps/demo`**: A Next.js application showcasing various use cases and examples.
- **`packages/eslint-config`**: Shared ESLint configuration used across the project.

## Development

### Prerequisites

- Node.js (Latest LTS recommended)
- npm

### Setup

```bash
npm install
```

### Common Commands

Run these from the root directory:

- **Build the library**: `npm run build`
- **Run the demo app**: `npm run dev`
- **Run tests**: `npm run test`
- **Lint all packages**: `npm run lint`

## Contributing

1.  Make your changes in the relevant package.
2.  Add or update tests if necessary.
3.  Ensure linting passes with `npm run lint`.
4.  Verify changes in the demo app.

## License

MIT
