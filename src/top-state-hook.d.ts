declare module 'top-state-hook' {
  export type Options = {
    log?: boolean;
    persist?: boolean;
  };

  export type StatePair<T> = [T, (value: T) => void];

  export function getState<T>(name: string): T;
  export function refreshState(): void;
  export function setOptions(opts: Options): void;
  export function useTopState<T>(name: string, initialValue: T): StatePair<T>;
}
