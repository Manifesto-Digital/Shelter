import React from 'react';
import { Link } from 'gatsby';
import { snapshotComponent, mountWithTheme } from 'test-helpers';
import {
  createFactory,
  createImage,
  createInternalRef,
} from '../../utils/test-factories';
import { hidePascalCaseWarning } from '../../utils/test-mocks';
import EventCard from './index';

export const createEventCard = createFactory({
  event: {
    thumbnailImage: createImage(),
    eventName: 'My Event',
  },
  cardText: 'Description for my event',
  primaryCtaText: 'Register for event',
  primaryCtaLink: createInternalRef(),
  secondaryCtaText: 'Register for event',
  secondaryCtaLink: createInternalRef(),
});

hidePascalCaseWarning();

it('renders correctly', () => {
  const mockData = createEventCard();

  snapshotComponent(<EventCard data={mockData} />);
});

it('displays the specified image correctly', () => {
  const mockData = createEventCard();
  const wrapper = mountWithTheme(<EventCard data={mockData} />);
  expect(wrapper.find('img').prop('src')).toContain(
    mockData.event.thumbnailImage.file.url
  );
});

it('sets the correct CTA links', () => {
  const mockData = createEventCard({
    primaryCtaLink: createInternalRef({ slug: 'my-test-slug' }),
    secondaryCtaLink: createInternalRef({ slug: 'my-second-test-slug' }),
  });
  const wrapper = mountWithTheme(<EventCard data={mockData} />);

  expect(
    wrapper
      .find(Link)
      .at(0)
      .prop('to')
  ).toContain('my-test-slug');

  expect(
    wrapper
      .find(Link)
      .at(1)
      .prop('to')
  ).toContain('my-second-test-slug');
});
