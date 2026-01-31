import type { OptionsConfig, TypedFlatConfigItem } from "@antfu/eslint-config";
export declare const sharedOptions: OptionsConfig;
export declare const sharedRules: TypedFlatConfigItem;
export declare function createConfig(options?: OptionsConfig, ...userConfigs: (TypedFlatConfigItem | TypedFlatConfigItem[])[]): Promise<TypedFlatConfigItem[]>;
//# sourceMappingURL=create-config.d.ts.map