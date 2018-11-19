# top-state-hook

This is a module for React that implements a hook
named `useTopState` for managing application state.
It is similar to the provided hook `useState`, but
rather than associating the state with the component that uses the hook,
it stores the state outside of the component
so it can be shared by many components.

To import this hook:

```js
import {useTopState} from 'top-state-hook';
```

Like other hooks, this must be called from a function component.
It takes a state name and an initial value.
The state name can be any string.
It is used to identify a particular piece of state.
The initial value is optional and can be any kind of value.
The hook returns an array containing
the current value of the state and
a function to set the state to a new value.

For example,

```js
const [count, setCount] = useTopState('count', 0);
```

Here is an example of a `Counter` component:

```js
import React from 'react';
import {useTopState} from './top-state-hook';

export default function Counter() {
  const [count, setCount] = useTopState('count', 0);
  return (
    <div>
      <button onClick={() => setCount(count - 1)} disabled={count === 0}>
        -
      </button>
      {count}
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}
```

In a simple component like this,
the provided `useState` hook can be used in place of `useTopState`.
But what if other components need to get or set the count?
This is where `useTopState` shines!

Other components can also include a line like:

```js
const [count, setCount] = useTopState('count', 0);
```

The state used by this is strictly identified
by the string passed as the first argument.
It will see that a state with this name has
already been created, will not initialize it again,
and will share it.

When any component that is sharing this state
calls the set function change the state value,
all the components that are using it will be re-rendered.

A component can make any number of calls to `useTopState`
to use multiple state values and
if the state associated with any of them changes,
the component will be re-rendered.

## Options

The `top-state-hook` package exports a `setOptions` function
that can be passed an object describing options to be used.
Current there are only two options, `log` and `persist`.
Both default to `false`.

The `log` option causes all state changes to be
logged to the devtools console for debugging purposes.

The `persist` option causes all state to be
saved in `sessionStorage` as JSON strings.
See the "SessionStorage" section later.

## Form Elements Tied to State Paths

It is common to have `input`, `select`, and `textarea` elements
with `onChange` handlers that get their value from `event.target.value`
and update the associated state.
An alternative is to use the provided `Input`, `Select`, and `TextArea` components
as follows:

HTML `input` elements can be replaced by the `Input` component.
For example,

```js
<Input name="user.firstName" />
```

The `type` property defaults to `'text'`,
but can be set to any valid value including `'checkbox'`.

The value used by the `input` is the value of the state with the given name.
When the user changes the value, this state value is updated.

To perform additional processing of changes such as validation,
supply an `onChange` prop that refers to a function.

HTML `textarea` elements can be replaced by the `TextArea` component.
For example,

```js
<TextArea name="feedback.comment" />
```

HTML `select` elements can be replaced by the `Select` component.
For example,

```js
<Select name="user.favoriteColor">
  <option>red</option>
  <option>green</option>
  <option>blue</option>
</Select>
```

If the `option` elements have a `value` attribute, that value
will be used instead of the text inside the `option`.

Additional props on the `Input`, `TextArea`, and `Select` components
are applied to the `input`, `textarea`, and `select` elements
that those render. Examples include `id`, `className`, and `placeholder`.

For a set of radio buttons, use the `RadioButtons` component.
For example,

```js
<RadioButtons name="favoriteFlavor" list={radioButtonList} initialValue="van" />
```

where `radioButtonList` is set as follows:

```js
const radioButtonList = [
  {text: 'Chocolate', value: 'choc'},
  {text: 'Strawberry', value: 'straw'},
  {text: 'Vanilla', value: 'van'}
];
```

When a radio button is clicked, the state associated with the
name `favoriteFlavor` will be set the value of that radio button.

For a set of checkboxes, use the `Checkboxes` component.
For example,

```js
<Checkboxes list={checkboxList} />
```

where checkboxList is set as follows:

```js
const checkboxList = [
  {name: 'color.red', text: 'Red', initialValue: true},
  {name: 'color.green', text: 'Green'},
  {name: 'color.blue', text: 'Blue'}
];
```

When a checkbox is clicked the state associated with the
corresponding path name will be toggled between false and true.

All of these components take a `name` prop
that identifies the associated state.

## SessionStorage

Typically React state is lost when users refresh the browser.
To avoid this, `sessionStorage` can be used to save
all the state as JSON strings on every state change.
The state in `sessionStorage` can be automatically reloaded
into the context state if the browser is refreshed.

An extra step is required to get this behavior.
In the top-most component, often named `App`,
import the `refreshState` function from the `top-state-hook` package
and call it when that component is rendered.

The `sessionStorage` property names that are set by this package have
a prefix of "TSH:" to distinguish them from other uses of sessionStorage.

To opt out of this behavior, turn off the `persist` option described earlier.

## Example app

The GitHub repository at <https://github.com/mvolkmann/top-state-hook-demo>
provides an example application that uses top-state-hook.
