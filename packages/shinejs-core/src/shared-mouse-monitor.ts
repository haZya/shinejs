/**
 * Singleton class that tracks mouse movement globally.
 * Allows multiple consumers to subscribe to mouse events without attaching multiple window listeners.
 */
export class SharedMouseMonitor {
  private subscribers = new Set<(x: number, y: number) => void>();
  private handleMouseMove = (event: MouseEvent): void => {
    this.subscribers.forEach(cb => cb(event.clientX, event.clientY));
  };

  /**
   * Subscribes to mouse move events.
   * @param cb Callback function to be invoked with x and y coordinates on mouse move.
   * @returns A function to unsubscribe.
   */
  subscribe(cb: (x: number, y: number) => void): () => void {
    if (this.subscribers.size === 0) {
      window.addEventListener("mousemove", this.handleMouseMove);
    }
    this.subscribers.add(cb);

    return () => {
      this.subscribers.delete(cb);
      if (this.subscribers.size === 0) {
        window.removeEventListener("mousemove", this.handleMouseMove);
      }
    };
  }
}

/**
 * Shared instance of the mouse monitor.
 */
export const sharedMouseMonitor = new SharedMouseMonitor();
