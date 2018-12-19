import React from 'react'
import 'jest-styled-components'
import { shallow } from 'enzyme'
import {
  renderWithTheme,
  mountWithTheme,
} from '../../../__tests__/helpers/index'
import Hero from './hero-no-card'
import { Title, Subtitle } from './styles'
import { createFactory, createImage } from '../../utils/test-factories'

// Default props
export const createHeroNoCard = createFactory({
  title: 'Mock Title',
  subtitle: 'Mock Subtitle',
  blackText: true,
  image: createImage(),
})

it('renders correctly', () => {
  const mockData = createHeroNoCard()

  const tree = renderWithTheme(<Hero content={mockData} />).toJSON()
  expect(tree).toMatchSnapshot()
})

it('displays the correct title', () => {
  const mockData = createHeroNoCard()

  const wrapper = shallow(<Hero content={mockData} />)
  expect(wrapper.find(Title).text()).toBe(mockData.title)
})

it('displays the correct subtitle', () => {
  const mockData = createHeroNoCard()

  const wrapper = shallow(<Hero content={mockData} />)
  expect(wrapper.find(Subtitle).text()).toBe(mockData.subtitle)
})

it('renders an image', () => {
  const mockData = createHeroNoCard()

  const wrapper = mountWithTheme(<Hero content={mockData} />)
  expect(wrapper.find('img')).toHaveLength(1)
})
