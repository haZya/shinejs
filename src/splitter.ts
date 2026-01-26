export class Splitter {
  domElement: HTMLElement;
  classPrefix: string;
  wrapperElement: HTMLDivElement;
  maskElement: HTMLDivElement;
  wordElements: HTMLSpanElement[] = [];
  elements: HTMLElement[] = [];
  text: string = "";
  originalHTML: string;

  constructor(domElement: HTMLElement, classPrefix = "") {
    this.domElement = domElement;
    this.classPrefix = classPrefix;
    this.wrapperElement = document.createElement("div");
    this.maskElement = document.createElement("div");
    this.originalHTML = domElement.innerHTML;
  }

  destroy(): void {
    if (this.domElement) {
      this.domElement.innerHTML = this.originalHTML;
    }
  }

  split(optText?: string, preserveChildren?: boolean): void {
    this.text = optText || this.domElement.textContent || "";
    this.wordElements = [];
    this.elements = [];
    this.wrapperElement.className = `${this.classPrefix}wrapper`;
    this.wrapperElement.innerHTML = "";

    if (optText) {
      this.domElement.textContent = this.text;
      this.originalHTML = this.domElement.innerHTML;
    }

    if (preserveChildren) {
      this.splitChildren();
    }
    else {
      this.splitText();
    }
  }

  private splitChildren(): void {
    const childNodes = Array.from(this.domElement.childNodes);

    childNodes.forEach((child) => {
      if (child.nodeType !== 1) { // Node.ELEMENT_NODE
        return;
      }
      const element = child as HTMLElement;
      element.className += ` ${this.classPrefix}letter`;
      this.wrapperElement.insertBefore(element, this.wrapperElement.firstChild);
      this.elements.push(element);
    });

    this.elements.reverse(); // maintain original order

    this.finalizeSplit();
  }

  private splitText(): void {
    const text = this.domElement.textContent || "";
    const numLetters = text.length;
    let wordElement: HTMLSpanElement | null = null;

    for (let i = 0; i < numLetters; i++) {
      const letter = text.charAt(i);

      if (!wordElement) {
        wordElement = document.createElement("span");
        wordElement.className = `${this.classPrefix}word`;
        this.wrapperElement.appendChild(wordElement);
        this.wordElements.push(wordElement);
      }

      if (letter.match(/\s/)) {
        const spacerElement = document.createElement("span");
        spacerElement.className = `${this.classPrefix}spacer`;
        spacerElement.innerHTML = letter;
        this.wrapperElement.appendChild(spacerElement);
        wordElement = null;
        continue;
      }

      const letterElement = document.createElement("span");
      letterElement.innerHTML = letter;
      letterElement.className = `${this.classPrefix}letter`;
      this.elements.push(letterElement);
      wordElement.appendChild(letterElement);

      if (letter.match(/\W/)) {
        wordElement = null;
      }
    }

    this.finalizeSplit();
  }

  private finalizeSplit(): void {
    this.maskElement.innerHTML = this.wrapperElement.innerHTML;
    this.maskElement.className = `${this.classPrefix}mask`;
    this.wrapperElement.appendChild(this.maskElement);

    this.domElement.innerHTML = "";
    this.domElement.appendChild(this.wrapperElement);
  }
}
