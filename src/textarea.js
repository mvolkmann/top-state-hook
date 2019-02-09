import {func, string} from 'prop-types';
import {useTopState} from './top-state-hook';

export default function TextArea(props) {
  const {initialValue = '', name} = props;
  const [value, setValue] = useTopState(name, initialValue);

  const handleChange = event => {
    setValue(event.target.value);
    const {onChange} = props;
    if (onChange) onChange(event);
  };

  const textareaProps = {...props};
  delete textareaProps.initialValue;

  return <textarea onChange={handleChange} value={value} {...textareaProps} />;
}

TextArea.propTypes = {
  initialValue: string,
  name: string.isRequired,
  onChange: func
};
