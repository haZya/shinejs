/**
 * Singleton utility to inject CSS styles into the document head.
 * Prevents duplicate injections.
 * @internal
 */
export class StyleInjector {
  private injections: { [css: string]: Document } = {};
  private static instance: StyleInjector | null = null;

  private constructor() {
    // private constructor to enforce singleton pattern
  }

  /**
   * Gets the singleton instance.
   */
  static getInstance(): StyleInjector {
    if (!StyleInjector.instance) {
      StyleInjector.instance = new StyleInjector();
    }
    return StyleInjector.instance;
  }

  /**
   * Injects a CSS string into the document.
   * @param css The CSS string to inject.
   * @param doc The document to inject into. Defaults to window.document.
   * @returns The created style element, or undefined if already injected.
   */
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
