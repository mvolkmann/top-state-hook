import {func, node, string} from 'prop-types';
import React from 'react';
import {useTopState} from './top-state-hook';

export default function Select(props) {
  const {children, id, initialValue = '', name} = props;
  const [value, updater] = useTopState(name, initialValue);

  const handleChange = event => {
    updater.set(event.target.value);
    const {onChange} = props;
    if (onChange) onChange(event);
  };

  return (
    <select
      id={id}
      onBlur={handleChange}
      onChange={handleChange}
      value={value === undefined ? '' : value}
    >
      {children}
    </select>
  );
}

Select.propTypes = {
  children: node,
  id: string,
  initialValue: string,
  name: string.isRequired,
  onChange: func
};
