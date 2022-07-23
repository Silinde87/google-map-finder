import { func, string, number, oneOfType } from 'prop-types';
import { useState } from 'react';
import { InputWrapper } from './Input.styled';

const Input = ({
  dataTestId = 'input-component',
  placeholder = '',
  value = '',
  id = '',
  name = '',
  onChange = () => {},
  ...otherProps
}) => {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (event) => {
    setInputValue(event.target.value);
    onChange(event);
  };
  return (
    <InputWrapper
      data-testid={dataTestId}
      placeholder={placeholder}
      value={inputValue}
      onChange={handleChange}
      type="text"
      id={id}
      name={name}
      {...otherProps}
    />
  );
};

Input.propTypes = {
  dataTestId: string,
  placeholder: string,
  value: oneOfType([string, number]),
  id: string,
  name: string,
  onChange: func,
};

export default Input;
