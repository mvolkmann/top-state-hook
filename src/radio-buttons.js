import {arrayOf, shape, string} from 'prop-types';
// eslint-disable-next-line no-unused-vars
import React from 'react';
import {useTopState} from './top-state-hook';

/**
 * This component renders a set of radio buttons.
 * The `list` prop specifies the text and value
 * for each radio button.
 * Specify a `className` prop to enable styling the radio-buttons.
 */
export default function RadioButtons(props) {
  const {className, initialValue = '', list, name} = props;
  const [value, set] = useTopState(name, initialValue);

  const handleChange = event => set(event.target.value);

  const radioButtons = list.map(item => (
    <div key={item.value}>
      <input
        checked={item.value === value}
        className={item.value}
        name={name}
        onChange={handleChange}
        type="radio"
        value={item.value}
      />
      <label>{item.text}</label>
    </div>
  ));

  return <div className={'radio-buttons ' + className}>{radioButtons}</div>;
}

RadioButtons.propTypes = {
  className: string,
  initialValue: string,
  list: arrayOf(
    shape({
      text: string.isRequired,
      value: string
    })
  ).isRequired,
  name: string.isRequired
};
