export {};

declare global {
    function route(name: string, params?: object, absolute?: boolean): string;
}
