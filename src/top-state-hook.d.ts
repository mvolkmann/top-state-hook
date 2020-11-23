declare module 'top-state-hook' {
  export type Options = {
    log?: boolean;
    persist?: boolean;
  };

  export function refreshState(): void;
  export function setOptions(opts: Options): void;
  export function useTopState(name: string, initialValue: unknown): void;
}
