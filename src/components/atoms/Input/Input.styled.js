import styled from 'styled-components';
import { Colors } from '../../../globals/colors';

const InputWrapper = styled.input`
  padding: 16px;
  border-radius: 8px;
  border: none;
  outline: 1px solid ${Colors.gray700};
  color: ${Colors.gray900};
  width: 100%;
  font-size: 16px;
  transition: outline 0.1s;
  &::placeholder {
    color: ${Colors.gray800};
  }
  &:focus {
    outline: 1px solid ${Colors.green600};
  }
`;

export { InputWrapper };
