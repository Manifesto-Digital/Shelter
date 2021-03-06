import React from 'react';
import { snapshotComponent, mountWithTheme } from 'test-helpers';
import { createFactory } from '../../utils/test-factories';
import { createTestimonial } from './testimonial.test';
import Testimonials from './index';
import Testimonial from './testimonial';
import { ImageWrapper } from './styles';
import { sizes, emSize } from '../theme/breakpoint';

export const createTestimonials = createFactory({
  headerText: 'Testimonials about this cool component',
  testimonials: [
    createTestimonial({ loopIndex: 0 }),
    createTestimonial({ loopIndex: 1 }),
  ],
});

it('renders testimonials correctly', () => {
  const mockData = createTestimonials();

  snapshotComponent(<Testimonials data={mockData} />);
});

it('passes the correct order value to the image wrapper', () => {
  const mockData = createTestimonials();
  const wrapper = mountWithTheme(<Testimonials data={mockData} />);

  expect(
    wrapper
      .find(Testimonial)
      .at(0)
      .find(ImageWrapper)
  ).toHaveStyleRule('order', '0', {
    media: `(min-width: ${emSize(sizes.tablet)})`,
  });

  expect(
    wrapper
      .find(Testimonial)
      .at(1)
      .find(ImageWrapper)
  ).toHaveStyleRule('order', '2', {
    media: `(min-width: ${emSize(sizes.tablet)})`,
  });
});
