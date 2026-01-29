export declare class SharedMouseMonitor {
    private subscribers;
    private handleMouseMove;
    subscribe(cb: (x: number, y: number) => void): () => void;
}
export declare const sharedMouseMonitor: SharedMouseMonitor;
