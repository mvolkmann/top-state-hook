import {bool, func, number, string} from 'prop-types';
import React, {useCallback} from 'react';
import {useTopState} from './top-state-hook';

export default function Input(props) {
  const {autoFocus, initialValue = '', name, onChange, onEnter, type} = props;
  const [value, set] = useTopState(name, initialValue);

  const handleChange = useCallback(event => {
    const {checked, value} = event.target;

    let v = value;
    if (type === 'checkbox') {
      v = checked;
    } else if (type === 'number' || type === 'range') {
      if (value.length) v = Number(value);
    }

    set(v);
    if (onChange) onChange(event);
  });

  const isCheckbox = type === 'checkbox';
  const valueToUse = value === undefined ? (isCheckbox ? false : '') : value;

  const propName = isCheckbox ? 'checked' : 'value';
  const inputProps = {
    autoFocus,
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
  autoFocus: bool,
  id: string,
  initialValue: string,
  max: number,
  min: number,
  name: string.isRequired,
  onChange: func, // called if user presses enter key
  onEnter: func, // state name that is updated
  placeholder: string,
  type: string // type of the HTML input
};
