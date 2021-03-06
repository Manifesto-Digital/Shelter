import styled from 'styled-components';
import { inputStyles } from '../../styled/inputs';

export const Wrapper = styled.div`
  position: relative;
`;

export const Input = styled.input`
  ${inputStyles}
  padding-left: 30px;
  max-width: ${({ fullWidth }) => (fullWidth ? '100%' : '10em')};

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const CurrencySymbol = styled.span`
  left: 12px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  font-size: ${({ theme }) => theme.fontsize.small};
`;
