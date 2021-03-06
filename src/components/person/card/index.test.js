import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'gatsby';
import { snapshotComponent, mountWithTheme } from 'test-helpers';
import {
  createFactory,
  createPerson,
  createInternalLink,
} from '../../../utils/test-factories';
import PersonCard from '.';
import { hidePascalCaseWarning } from '../../../utils/test-mocks';

const createCardProps = createFactory({
  person: createPerson(),
  link: createInternalLink(),
});

it('renders correctly', () => {
  const mockData = createCardProps();
  snapshotComponent(<PersonCard {...mockData} />);
});

it('renders the persons name and job title', () => {
  const mockData = createCardProps({
    person: {
      firstName: 'first name mock',
      lastName: 'last name moc',
      jobTitle: 'mock job title',
    },
  });
  const wrapper = shallow(<PersonCard {...mockData} />);

  expect(wrapper.text()).toContain(`${mockData.person.firstName}`);
  expect(wrapper.text()).toContain(`${mockData.person.lastName}`);
  expect(wrapper.text()).toContain(`${mockData.person.jobTitle}`);
});

it('renders the persons image', () => {
  const personProps = createPerson({
    photo: {
      description: 'mock description',
      file: {
        url: 'http://mockurl.com',
      },
    },
  });
  const wrapper = mountWithTheme(<PersonCard person={personProps} />);
  expect(wrapper.find('img').prop('src')).toContain(personProps.photo.file.url);
});
hidePascalCaseWarning();

it('renders a link if passed', () => {
  const mockData = createCardProps({
    link: {
      slug: '/mock-page',
    },
  });
  const wrapper = mountWithTheme(<PersonCard {...mockData} />);
  expect(wrapper.find(Link)).toHaveLength(1);
});
