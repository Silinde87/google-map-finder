import styled from 'styled-components';
import { Colors } from '../../../globals/colors';

const AutoCompleteWrapper = styled.div`
  position: absolute;
  top: 80px;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
  left: 0;
  right: 0;
  z-index: 2;
`;

const OptionsWrapper = styled.div`
  display: grid;
  background-color: ${Colors.gray200};
  width: 100%;
  padding: 16px 16px;
  border-radius: 8px;
  margin-top: 8px;
  row-gap: 8px;
`;

const OptionsElement = styled.p`
  margin: 0;
  cursor: pointer;
  color: ${Colors.gray900};
  background-color: ${Colors.gray200};
  transition: all 0.2s;
  padding: 8px;
  border-radius: 8px;
  &:hover {
    background-color: ${Colors.gray600};
  }
`;

export { AutoCompleteWrapper, OptionsWrapper, OptionsElement };
