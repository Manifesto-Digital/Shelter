import React from 'react';
import PropTypes from 'prop-types';
import Image from '../image';
import InlineCallOut from '../inline-callout';
import { richTextPropTypes } from '../../prop-types';
import { consistentString } from '../../utils/content-formatting';
// Styles
import { Container } from '../styled/containers';
import {
  Wrapper,
  HeaderText,
  FlexContainer,
  ContentSemi,
  TextWrapper,
} from './styles';
import RichText from '../rich-text';
import CTA from '../cta';

const TwoColumnTextAndImageBlock = ({ data, insideContainer }) => {
  const {
    headerText,
    leftColumnText,
    leftColumnCalloutBanners,
    rightColumnText,
    rightColumnImage,
    rightColumnCta,
    rightColumnCalloutBanners,
    removeMarginBottom,
  } = data;

  if (!headerText || !leftColumnText) {
    return null;
  }

  const backgroundColour = consistentString(data.backgroundColour);

  return (
    <Wrapper
      backgroundColour={backgroundColour}
      padding={!insideContainer}
      removeMarginBottom={removeMarginBottom}
    >
      <Container>
        <FlexContainer>
          <ContentSemi>
            <HeaderText backgroundColour={backgroundColour}>
              {headerText}
            </HeaderText>
            <TextWrapper
              backgroundColour={backgroundColour}
              richText={leftColumnText}
            />
            {leftColumnCalloutBanners &&
              leftColumnCalloutBanners.map((calloutBanner, i) => (
                <InlineCallOut
                  insideContainer={!insideContainer}
                  key={calloutBanner.id + i}
                  icon={calloutBanner.icon}
                  borderColour={calloutBanner.borderColour}
                  bannerColour={calloutBanner.bannerColour}
                  removeMarginBottom={calloutBanner.removeMarginBottom}
                >
                  <RichText richText={calloutBanner.content} />
                </InlineCallOut>
              ))}
          </ContentSemi>
          <ContentSemi>
            {rightColumnText && (
              <TextWrapper
                backgroundColour={backgroundColour}
                richText={rightColumnText}
              />
            )}
            {rightColumnCta && (
              <CTA marginBottom {...CTA.fromCMS(rightColumnCta)} />
            )}
            {rightColumnImage && (
              <Image image={rightColumnImage} width={1000} />
            )}

            {rightColumnCalloutBanners &&
              rightColumnCalloutBanners.map((calloutBanner, i) => (
                <InlineCallOut
                  insideContainer={!insideContainer}
                  key={calloutBanner.id + i}
                  {...InlineCallOut.fromCMS(calloutBanner)}
                >
                  <RichText richText={calloutBanner.content} />
                </InlineCallOut>
              ))}
          </ContentSemi>
        </FlexContainer>
      </Container>
    </Wrapper>
  );
};

TwoColumnTextAndImageBlock.propTypes = {
  data: PropTypes.shape({
    headerText: PropTypes.string.isRequired,
    leftColumnText: PropTypes.shape(richTextPropTypes).isRequired,
    leftColumnCalloutBanners: PropTypes.array,
    rightColumnText: PropTypes.shape(richTextPropTypes),
    rightColumnImage: PropTypes.object,
    rightColumnCalloutBanners: PropTypes.array,
    rightColumnCta: PropTypes.object,
    backgroundColour: PropTypes.oneOf(['White', 'Black', 'Grey']).isRequired,
    removeMarginBottom: PropTypes.bool,
  }),
  insideContainer: PropTypes.bool,
};

TwoColumnTextAndImageBlock.defaultProps = {
  insideContainer: false,
};

export default TwoColumnTextAndImageBlock;
