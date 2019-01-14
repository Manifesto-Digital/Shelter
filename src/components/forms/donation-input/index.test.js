import React from 'react';
import DonationInput from '.';
import {
  mountWithTheme,
  snapshotComponent,
} from '../../../../__tests__/helpers';
import { createFactory } from '../../../utils/test-factories';
import { CurrencySymbol } from './styles';

// Default props
export const createDonationInput = createFactory({
  field: { name: 'foo' },
  form: {
    errors: { foo: undefined },
    touched: { foo: false },
  },
});

it('renders correctly', () => {
  const mockData = createDonationInput();
  snapshotComponent(<DonationInput {...mockData} />);
});

it('shows a currency symbol', () => {
  const mockData = createDonationInput();

  const wrapper = mountWithTheme(<DonationInput {...mockData} />);
  const symbol = wrapper.find(CurrencySymbol);
  expect(symbol).toHaveLength(1);
});
