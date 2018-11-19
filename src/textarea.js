import {func, string} from 'prop-types';
import React from 'react';
import {useTopState} from './top-state-hook';

export default function TextArea(props) {
  const {initialValue = '', name} = props;
  const [value, setValue] = useTopState(name, initialValue);

  const handleChange = event => {
    setValue(event.target.value);
    const {onChange} = props;
    if (onChange) onChange(event);
  };

  return <textarea onChange={handleChange} value={value} {...props} />;
}

TextArea.propTypes = {
  initialValue: string,
  name: string.isRequired,
  onChange: func
};
