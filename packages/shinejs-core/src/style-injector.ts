export class StyleInjector {
  private injections: { [css: string]: Document } = {};
  private static instance: StyleInjector | null = null;

  private constructor() {
    // private constructor to enforce singleton pattern
  }

  static getInstance(): StyleInjector {
    if (!StyleInjector.instance) {
      StyleInjector.instance = new StyleInjector();
    }
    return StyleInjector.instance;
  }

  inject(css: string, doc: Document = window.document): HTMLStyleElement | undefined {
    if (this.injections[css] === doc) {
      return;
    }

    const domElement = document.createElement("style");
    domElement.innerHTML = css;

    const head = doc.getElementsByTagName("head")[0];
    if (head) {
      const firstChild = head.firstChild;
      head.insertBefore(domElement, firstChild);
    }

    this.injections[css] = doc;
    return domElement;
  }
}
