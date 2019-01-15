import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
// Components
import Layout from '../components/layout';
import Assemblies from '../components/assemblies';
import { Container, TwoThirds } from '../components/styled/containers';
import PageTitle from '../components/page-title';
import RichText from '../components/rich-text';
import FeedbackModal from '../components/feedback-modal';
import SubpageMenu from '../components/advice-page/subpage-menu';
import SubpagePagination from '../components/advice-page/subpage-pagination';

const AdvicePage = ({ data, pageContext }) => {
  const { assemblies, title, bodyCopy } = data.contentfulPageAssemblyAdvicePage;
  const { subpages, slug } = pageContext;
  console.log('pagecontext', pageContext);

  return (
    <Layout>
      <PageTitle title={title} />
      <Container>
        <SubpageMenu subpages={subpages} activeSlug={slug} />
        <TwoThirds>
          {bodyCopy && <RichText richText={bodyCopy} />}
          <Assemblies assemblies={assemblies} />
          <FeedbackModal />
        </TwoThirds>
      </Container>
      <SubpagePagination subpages={subpages} activeSlug={slug} />
    </Layout>
  );
};

AdvicePage.propTypes = {
  data: PropTypes.shape({
    contentfulPageAssemblyAdvicePage: PropTypes.object,
  }),
  pageContext: PropTypes.object,
};

export default AdvicePage;

export const advicePageQuery = graphql`
  query advicePageTemplateQuery($slug: String!) {
    contentfulPageAssemblyAdvicePage(slug: { eq: $slug }) {
      title
      bodyCopy {
        id
        internal {
          type
        }
        childContentfulRichText {
          html
        }
      }
      assemblies {
        ... on Node {
          ...CtaAssemblyFragment
          ...ContentGrid4Fragment
          ...BannerTopicFragment
          ...InlineCallout
          ...VideoTopicFragment
          ...DownloadBannerAssemblyFragment
          ...LinkBoxFragment
          ...DonationBanner
        }
      }
    }
  }
`;
