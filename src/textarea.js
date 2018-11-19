import {func, string} from 'prop-types';
import React from 'react';
import {useTopState} from './top-state-hook';

export default function TextArea(props) {
  const {id, initialValue = '', name, placeholder} = props;
  const [value, set] = useTopState(name, initialValue);

  const handleChange = event => {
    set(event.target.value);
    const {onChange} = props;
    if (onChange) onChange(event);
  };

  return (
    <textarea
      id={id}
      name={name}
      onChange={handleChange}
      placeholder={placeholder}
      value={value}
    />
  );
}

TextArea.propTypes = {
  id: string,
  initialValue: string,
  name: string.isRequired,
  onChange: func,
  placeholder: string
};
