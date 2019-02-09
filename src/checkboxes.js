import {arrayOf, bool, shape, string} from 'prop-types';
import {useCallback} from 'react';
import {useTopState} from './top-state-hook';

const getName = index => 'cb' + index;

/**
 * This component renders a set of checkboxes.
 * The `list` prop specifies the state name and text for each checkbox.
 * Specify a `className` prop to enable styling the checkboxes.
 */
export default function Checkboxes(props) {
  const {className, list} = props;
  for (const item of list) {
    [item.value, item.set] = useTopState(item.name, Boolean(item.initialValue));
  }

  const handleChange = useCallback((text, event) => {
    const {set} = list.find(obj => obj.text === text);
    set(event.target.checked);
  });

  const checkboxes = list.map((item, index) => {
    const {text, value} = item;
    const valueToUse = Boolean(value);
    const id = getName(index);
    return (
      <div key={id}>
        <input
          className={className}
          checked={valueToUse}
          id={id}
          onChange={e => handleChange(text, e)}
          type="checkbox"
        />
        <label htmlFor={id}>{text}</label>
      </div>
    );
  });

  return <div className={'checkboxes ' + className}>{checkboxes}</div>;
}

Checkboxes.propTypes = {
  className: string,
  list: arrayOf(
    shape({
      initialValue: bool,
      name: string.isRequired,
      text: string.isRequired
    })
  ).isRequired
};
