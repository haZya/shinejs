import antfu from "@antfu/eslint-config";
/**
 * Shared ESLint options for shinejs packages.
 */
export const sharedOptions = {
    type: "lib",
    typescript: true,
    formatters: true,
    isInEditor: false,
    stylistic: {
        indent: 2,
        semi: true,
        quotes: "double",
    },
};
/**
 * Shared ESLint rules for shinejs packages.
 */
export const sharedRules = {
    rules: {
        "ts/no-redeclare": "off",
        "ts/consistent-type-definitions": ["error", "type"],
        "no-console": ["warn", { allow: ["info", "warn", "error"] }],
        "antfu/no-top-level-await": ["off"],
        "node/prefer-global/process": ["off"],
        "node/no-process-env": ["error"],
        "perfectionist/sort-imports": [
            "error",
            {
                tsconfig: { rootDir: "." },
            },
        ],
        "unicorn/filename-case": [
            "error",
            {
                case: "kebabCase",
                ignore: [/\.md$/],
            },
        ],
    },
};
/**
 * Creates an ESLint configuration based on antfu's config with shinejs defaults.
 *
 * @param options Configuration options for @antfu/eslint-config.
 * @param userConfigs Additional flat config items.
 * @returns A promise resolving to the ESLint configuration array.
 */
export async function createConfig(options = {}, ...userConfigs) {
    return antfu({
        ...sharedOptions,
        ...options,
    }, sharedRules, ...userConfigs);
}
