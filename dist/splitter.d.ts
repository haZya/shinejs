export declare class Splitter {
    domElement: HTMLElement;
    classPrefix: string;
    wrapperElement: HTMLDivElement;
    maskElement: HTMLDivElement;
    wordElements: HTMLSpanElement[];
    elements: HTMLElement[];
    text: string;
    constructor(domElement: HTMLElement, classPrefix?: string);
    split(optText?: string, preserveChildren?: boolean): void;
    private splitChildren;
    private splitText;
    private finalizeSplit;
}
