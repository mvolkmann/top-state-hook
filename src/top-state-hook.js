import {useState} from 'react';

let options = {
  log: true,
  persist: true
};

const stateMap = {};

const PREFIX = 'TSH:';

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
  const [, updateFn] = useState();

  let state = stateMap[name];

  const render = () => {
    persist(state);
    state.updaters.forEach(fn => fn());
  };

  if (!state) {
    const updater = {
      delete() {
        state.value = undefined;
        log && log('delete', name);
        render();
      },
      set(value) {
        state.value = value;
        log && log('set', name, 'to', value);
        render();
      },
      transform(fn) {
        state.value = fn(state.value);
        log && log('transform', name, 'to', state.value);
        render();
      }
    };

    if (typeof initialValue === 'number') {
      updater.decrement = (delta = 1) => {
        state.value -= delta;
        log && log('decrement', name, 'by', delta, state.value);
        render();
      };
      updater.increment = (delta = 1) => {
        state.value += delta;
        log && log('increment', name, 'by', delta, state.value);
        render();
      };
    } else if (Array.isArray(initialValue)) {
      updater.filter = fn => {
        state.value = state.value.filter(fn);
        log && log('filter', name, 'to', state.value);
        render();
      };
      updater.map = fn => {
        state.value = state.value.map(fn);
        log && log('map', name, 'to', state.value);
        render();
      };
      updater.push = (...newValues) => {
        state.value.push(...newValues);
        log && log('push', name, 'with', newValues, state.value);
        render();
      };
    }

    state = {name, updater, updaters: new Set(), value: initialValue};
    stateMap[name] = state;
    persist(state);
  }

  state.updaters.add(updateFn);
  return [state.value, state.updater];
}
