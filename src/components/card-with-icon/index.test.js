import React from 'react';
import { shallow } from 'enzyme';
import { snapshotComponent } from 'test-helpers';
import { TitleText, SubText, CardCTA } from './styles';
import { createFactory, createExternalRef } from '../../utils/test-factories';
import CardWithIcon from './index';

// Default props
export const createCardWithIcon = createFactory({
  icon: 'Telephone',
  titleText: 'Title text',
  subText: 'Sub text',
  ctaText: 'Click me',
  link: createExternalRef(),
});

it('renders correctly', () => {
  const mockData = createCardWithIcon();
  snapshotComponent(<CardWithIcon data={mockData} />);
});

it('displays the correct icon', () => {
  const mockData = createCardWithIcon({ icon: 'Telephone' });
  snapshotComponent(<CardWithIcon data={mockData} />);
});

it('displays the correct title text', () => {
  const mockData = createCardWithIcon({ titleText: 'Test title text' });
  const wrapper = shallow(<CardWithIcon data={mockData} />);
  expect(wrapper.find(TitleText).text()).toBe(mockData.titleText);
});

it('displays the correct sub text', () => {
  const mockData = createCardWithIcon({ subText: 'Test sub text' });
  const wrapper = shallow(<CardWithIcon data={mockData} />);
  expect(wrapper.find(SubText).text()).toBe(mockData.subText);
});

it('displays the correct cta text', () => {
  const mockData = createCardWithIcon({ ctaText: 'Test CTA text' });
  const wrapper = shallow(<CardWithIcon data={mockData} />);
  expect(wrapper.find(CardCTA).prop('children')).toBe(mockData.ctaText);
});

it('displays the correct internal cta link', () => {
  const mockData = createCardWithIcon({
    ctaLink: { slug: 'https://internal-test-example.com' },
  });
  const wrapper = shallow(<CardWithIcon data={mockData} />);
  expect(wrapper.find(CardCTA).prop('link')).toBe(mockData.link);
});
