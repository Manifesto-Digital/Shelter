import React from 'react';
import { shallow } from 'enzyme';
import {
  renderWithProviders,
  snapshotComponent,
} from '../../../__tests__/helpers/index';
import CTABanner from './index';
import { Header } from './styles';
import theme from '../theme/variables';
import { createFactory } from '../../utils/test-factories';
import { createCTA } from '../cta/index.test';

// Default prop values
export const createCtaBanner = createFactory({
  cta: createCTA({ ctaColour: 'White Outline', internalLink: null }),
  bannerColour: 'Blue',
  headerText: 'mock header text',
});

it('renders correctly', () => {
  const mockData = createCtaBanner();

  snapshotComponent(
    <CTABanner
      cta={mockData.cta}
      bannerColour={mockData.bannerColour}
      headerText={mockData.headerText}
    />
  );
});

it('displays the correct header text', () => {
  const mockData = createCtaBanner({ headerText: 'Mock header text' });

  const wrapper = shallow(
    <CTABanner
      cta={mockData.cta}
      bannerColour={mockData.bannerColour}
      headerText={mockData.headerText}
    />
  );
  expect(wrapper.find(Header).text()).toBe(mockData.headerText);
});

it('changes background colour based on props', () => {
  const mockData = createCtaBanner({ bannerColour: 'Red' });

  const { renderer } = renderWithProviders(
    <CTABanner
      cta={mockData.cta}
      bannerColour={mockData.bannerColour}
      headerText={mockData.headerText}
    />
  );
  expect(renderer.toJSON()).toHaveStyleRule(
    'background-color',
    theme.palette.primary
  );

  const updatedMockData = createCtaBanner({ bannerColour: 'Black' });

  const { renderer: changedRenderer } = renderWithProviders(
    <CTABanner
      cta={updatedMockData.cta}
      bannerColour={updatedMockData.bannerColour}
      headerText={updatedMockData.headerText}
    />
  );
  expect(changedRenderer.toJSON()).toHaveStyleRule(
    'background-color',
    theme.palette.black
  );
});
