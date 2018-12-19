import React from 'react'
import 'jest-styled-components'
import { shallow } from 'enzyme'
import {
  renderWithTheme,
  mountWithTheme,
} from '../../../__tests__/helpers/index'
import Hero from './hero-with-card'
import { Title, CardSubtitle } from './styles'
import { createFactory, createImage } from '../../utils/test-factories'

// Default props
export const createHeroWithCard = createFactory({
  title: 'Mock Title',
  subtitle: 'Mock Subtitle',
  cardPosition: 'Right',
  blackText: true,
  image: createImage(),
})

it('renders correctly', () => {
  const mockData = createHeroWithCard()

  const tree = renderWithTheme(<Hero content={mockData} />).toJSON()
  expect(tree).toMatchSnapshot()
})

it('displays the correct title', () => {
  const mockData = createHeroWithCard()

  const wrapper = shallow(<Hero content={mockData} />)
  expect(wrapper.find(Title).text()).toBe(mockData.title)
})

it('displays the correct subtitle', () => {
  const mockData = createHeroWithCard()

  const wrapper = shallow(<Hero content={mockData} />)
  expect(wrapper.find(CardSubtitle).text()).toBe(mockData.subtitle)
})

it('renders an image', () => {
  const mockData = createHeroWithCard()

  const wrapper = mountWithTheme(<Hero content={mockData} />)
  expect(wrapper.find('img')).toHaveLength(1)
})

it('renders the link', () => {
  const mockData = createHeroWithCard({
    externalUrl: 'http://google.com',
    linkText: 'Woo amazing link text',
  })

  const wrapper = mountWithTheme(<Hero content={mockData} />)
  expect(wrapper.find('a')).toHaveLength(1)
})
