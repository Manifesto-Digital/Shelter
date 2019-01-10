import React from 'react';
import { snapshotComponent, mountWithTheme } from '../../../__tests__/helpers';
import DonationForm from './donation-form';

it('renders correctly', () => {
  snapshotComponent(<DonationForm />);
});

it('has all the necessary fields', () => {
  const fieldNames = [
    'cid',
    'free_amount',
    'amount',
    'reserved_appeal_code',
    'frequency',
    'amount-holder',
  ];
  const wrapper = mountWithTheme(<DonationForm />);
  fieldNames.forEach(name => {
    expect(wrapper.find(`input[name="${name}"]`)).toHaveLength(1);
  });
});

it('has a default value set in amount field', () => {
  const wrapper = mountWithTheme(<DonationForm />);
  const hiddenInput = wrapper.find('input[name="amount"]');
  expect(parseInt(hiddenInput.props().value)).toBeGreaterThan(0);
});

it('updates the hidden amount field when visible donation amount field changes', () => {
  const wrapper = mountWithTheme(<DonationForm />);
  const visibleInput = wrapper.find('input[name="amount-holder"]');

  visibleInput.simulate('change', { target: { value: '25' } });

  const hiddenInput = wrapper.find('input[name="amount"]');
  // Expect the amount hidden field to be the pence value of the visible field
  expect(hiddenInput.props().value).toEqual((25 * 100).toString());
});

it('has the correct form method', () => {
  const wrapper = mountWithTheme(<DonationForm />);
  // Check method is GET
  expect(wrapper.find('form').props().method).toEqual('GET');
});

it('has the correct form action', () => {
  const wrapper = mountWithTheme(<DonationForm />);
  // Check the action URL is correct
  expect(wrapper.find('form').props().action).toEqual(
    'https://donate.shelter.org.uk/b'
  );
});

it('has submit button', () => {
  const wrapper = mountWithTheme(<DonationForm />);
  expect(wrapper.find('button[type="submit"]')).toHaveLength(1);
});

it('shows the placeholder based on prop', () => {
  const mockPlaceholder = 30;
  const wrapper = mountWithTheme(
    <DonationForm placeholder={mockPlaceholder} />
  );
  expect(
    wrapper.find('input[name="amount-holder"]').props().placeholder
  ).toEqual(mockPlaceholder.toString());
});
