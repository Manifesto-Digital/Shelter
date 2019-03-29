import { graphql } from 'gatsby';

export const TwoColumnTextAndImageBlockFragment = graphql`
  fragment TwoColumnTextAndImageBlockFragment on ContentfulTopicTwoColumnTextAndImageBlock {
    id
    internal {
      type
    }
    systemName
    headerText
    leftColumnText {
      childContentfulRichText {
        html
      }
    }
    leftColumnCalloutBanners {
      ...InlineCallout
    }
    rightColumnText {
      childContentfulRichText {
        html
      }
    }
    rightColumnCta {
      ...ctaStandardFragment
    }
    rightColumnImage {
      file {
        url
        fileName
      }
      description
    }
    rightColumnCalloutBanners {
      ...InlineCallout
    }
    backgroundColour
  }
`;