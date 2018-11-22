import React from 'react'
import PropTypes from 'prop-types'
import { getInternalLink } from '../../utils/links'
// Components
import ResponsiveImage from '../image/responsive'
import LinkHandler from '../link-handler'
// Styles
import {
  HeroWithCard,
  CardContent,
  Title,
  CardSubtitle,
  WithCardMedia,
  CardLink,
} from './styles'
import { Container } from '../styled/containers'

const Hero = ({ content }) => {
  const {
    image,
    title,
    subtitle,
    cardPosition,
    linkText,
    externalUrl,
    internalLink,
  } = content
  console.log('content', content)

  const link = internalLink ? getInternalLink(internalLink.slug) : externalUrl

  return (
    <HeroWithCard>
      <WithCardMedia>
        {image && (
          <ResponsiveImage mobileW={800} desktopW={1600} image={image} />
        )}
      </WithCardMedia>
      <Container padding={false}>
        <CardContent position={cardPosition.toLowerCase()}>
          <Title>{title}</Title>
          {subtitle && <CardSubtitle>{subtitle}</CardSubtitle>}
          {link && linkText && (
            <LinkHandler
              internalLink={internalLink}
              externalUrl={externalUrl}
              text={linkText}
              Styled={CardLink}
            >
              {linkText}
            </LinkHandler>
          )}
        </CardContent>
      </Container>
    </HeroWithCard>
  )
}

Hero.propTypes = {
  content: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    cardPosition: PropTypes.oneOf(['Left', 'Right']),
    linkText: PropTypes.string,
    externalUrl: PropTypes.string,
    internalLink: PropTypes.shape({
      id: PropTypes.string,
      slug: PropTypes.string,
    }),
    image: PropTypes.object,
  }),
}

export default Hero
