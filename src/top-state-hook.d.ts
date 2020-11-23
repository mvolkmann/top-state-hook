type Options = {
  log?: boolean;
  persist?: boolean;
};

export declare function refreshState(): void;
export declare function setOptions(opts: Options): void;
export declare function useTopState(name: string, initialValue: unknown): void;

