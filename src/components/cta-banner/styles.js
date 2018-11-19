import styled from 'styled-components'

export const Banner = styled.div`
  padding: ${props => props.theme.spacing.padding} 0;
  background-color: ${props =>
    (props.bannerColour === 'red' && props.theme.palette.primary) ||
    (props.bannerColour === 'blue' && props.theme.palette.link) ||
    (props.bannerColour === 'black' && props.theme.palette.black) ||
    (props.bannerColour === 'green' && props.theme.palette.donate)};
`

export const Header = styled.h3`
  color: ${props =>
    (props.bannerColour === 'red' && props.theme.palette.white) ||
    (props.bannerColour === 'blue' && props.theme.palette.white) ||
    (props.bannerColour === 'black' && props.theme.palette.white) ||
    (props.bannerColour === 'green' && props.theme.palette.white)};
`