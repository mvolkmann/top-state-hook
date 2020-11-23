import {useState} from 'react';

let options = {
  log: false,
  persist: false
};

const stateMap = {};

const PREFIX = 'TSH:';

export function getState(name) {
  return stateMap[name];
}

const log = (method, name, text, input, value) => {
  if (!options.log) return;
  let msg = method + ' ' + name;
  if (text) msg += ' ' + text;
  if (input !== undefined) msg += ' ' + JSON.stringify(input);
  if (value !== undefined) msg += ' to ' + JSON.stringify(value);
  console.info('top-state-hook:', msg);
};

const persist = state => {
  if (!options.persist) return;
  sessionStorage.setItem(PREFIX + state.name, JSON.stringify(state.value));
};

// This refreshes state from sessionStorage.
export function refreshState() {
  if (!options.persist) return;
  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i);
    if (!key.startsWith(PREFIX)) return;
    const name = key.substring(PREFIX.length);
    const value = sessionStorage.getItem(key);
    useTopState(name, JSON.parse(value));
  }
}

/**
 * This sets the options used by this package.
 * log: optional boolean that defaults to true
 *   set to false to avoid logging every state change
 * persist: optional boolean that defaults to true
 *   set to false to not save state to sessionStorage
 */
export const setOptions = opts => (options = opts);

export function useTopState(name, initialValue) {
  // Get a function that can be called later
  // to re-render the calling component.
  const [, setState] = useState();

  let state = stateMap[name];

  if (!state) {
    const setValue = value => {
      state.value = value;
      log && log('set', name, 'to', value);
      persist(state);
      state.updaters.forEach(fn => fn(value));
    };

    state = {name, setValue, updaters: new Set(), value: initialValue};
    stateMap[name] = state;
    persist(state);
  }

  state.updaters.add(setState);
  return [state.value, state.setValue];
}
