import {func, node, string} from 'prop-types';
import React from 'react';
import {useTopState} from './top-state-hook';

export default function Select(props) {
  const {children, initialValue = '', name} = props;
  const [value, setValue] = useTopState(name, initialValue);

  const handleChange = event => {
    setValue(event.target.value);
    const {onChange} = props;
    if (onChange) onChange(event);
  };

  delete props.initialValue;

  return (
    <select
      onBlur={handleChange}
      onChange={handleChange}
      value={value === undefined ? '' : value}
      {...props}
    >
      {children}
    </select>
  );
}

Select.propTypes = {
  children: node,
  initialValue: string,
  name: string.isRequired,
  onChange: func
};
