import { graphql } from 'gatsby';

export const PolicyFragment = graphql`
  fragment PolicyFragment on ContentfulTopicPolicy {
    id
    internal {
      type
    }
    policyName
    author
    publishDate
    displayDate
    summary {
      childContentfulRichText {
        html
      }
    }
    media {
      ...DownloadableFileFragment
    }
  }
`;