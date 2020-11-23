declare module 'top-state-hook' {
  export type Options = {
    log?: boolean;
    persist?: boolean;
  };

  export type StatePair = [unknown, (value: unknown) => void];

  export function refreshState(): void;
  export function setOptions(opts: Options): void;
  export function useTopState(name: string, initialValue: unknown): StatePair;
}
