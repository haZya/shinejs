import type { OptionsConfig, TypedFlatConfigItem } from "@antfu/eslint-config";
/**
 * Shared ESLint options for shinejs packages.
 */
export declare const sharedOptions: OptionsConfig;
/**
 * Shared ESLint rules for shinejs packages.
 */
export declare const sharedRules: TypedFlatConfigItem;
/**
 * Creates an ESLint configuration based on antfu's config with shinejs defaults.
 *
 * @param options Configuration options for @antfu/eslint-config.
 * @param userConfigs Additional flat config items.
 * @returns A promise resolving to the ESLint configuration array.
 */
export declare function createConfig(options?: OptionsConfig, ...userConfigs: (TypedFlatConfigItem | TypedFlatConfigItem[])[]): Promise<TypedFlatConfigItem[]>;
//# sourceMappingURL=create-config.d.ts.map