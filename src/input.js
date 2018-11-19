import {func, string} from 'prop-types';
import React, {useCallback} from 'react';
import {useTopState} from './top-state-hook';

export default function Input(props) {
  const {initialValue = '', name, onChange, onEnter, type} = props;
  const [value, setValue] = useTopState(name, initialValue);

  const handleChange = useCallback(event => {
    const {checked, value} = event.target;

    let v = value;
    if (type === 'checkbox') {
      v = checked;
    } else if (type === 'number' || type === 'range') {
      if (value.length) v = Number(value);
    }

    setValue(v);
    if (onChange) onChange(event);
  });

  const isCheckbox = type === 'checkbox';
  const valueToUse = value === undefined ? (isCheckbox ? false : '') : value;

  const propName = isCheckbox ? 'checked' : 'value';
  const inputProps = {
    type: 'text',
    ...props,
    [propName]: valueToUse
  };

  if (onEnter) {
    inputProps.onKeyPress = event => {
      if (event.key === 'Enter') onEnter();
    };
    delete inputProps.onEnter;
  }

  return <input {...inputProps} onChange={handleChange} />;
}

Input.propTypes = {
  initialValue: string,
  name: string.isRequired,
  onChange: func, // called if user presses enter key
  onEnter: func, // state name that is updated
  type: string // type of the HTML input
};
