export declare class Color {
    r: number;
    g: number;
    b: number;
    constructor(r?: number, g?: number, b?: number);
    static colorFromHex(hex: string): Color;
    parseHex(hex: string): void;
    getRGBAString(): string;
}
