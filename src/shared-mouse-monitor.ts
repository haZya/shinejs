export class SharedMouseMonitor {
  private subscribers = new Set<(x: number, y: number) => void>();
  private handleMouseMove = (event: MouseEvent) => {
    this.subscribers.forEach(cb => cb(event.clientX, event.clientY));
  };

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

export const sharedMouseMonitor = new SharedMouseMonitor();
