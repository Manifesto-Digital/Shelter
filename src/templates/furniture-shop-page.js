import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
// Components
import ShopHero from '../components/shop-furniture/hero';
import CenteredSection from '../components/shop-furniture/centered-section';
import ThreeColumn from '../components/shop-furniture/three-column';
import Layout from '../components/layout';

const Page = ({ data }) => {
  const {
    pageHeader,
    subHeader,
    heroImage,
    shop,
    introductoryText,
    whatCanYouDonate,
    yesPleaseList,
    noThanksList,
    howDoesYourDonationHelp,
  } = data.contentfulPageAssemblyFurnitureShopPage;

  console.log('shop', data);

  return (
    <Layout>
      <ShopHero
        header={pageHeader}
        subHeader={subHeader}
        introductoryText={introductoryText.introductoryText}
        image={heroImage}
        contactNumber={shop.contactNumber}
      />
      <CenteredSection
        header="What can you donate"
        text={whatCanYouDonate}
        contactNumber={shop.contactNumber}
      />
      <ThreeColumn
        yesList={yesPleaseList}
        noList={noThanksList}
        donationHelpText={howDoesYourDonationHelp}
      />
    </Layout>
  );
};

Page.propTypes = {
  data: PropTypes.object,
};

export default Page;

export const furnitureShopPageQuery = graphql`
  query furnitureShopPageTemplateQuery($slug: String!) {
    contentfulPageAssemblyFurnitureShopPage(slug: { eq: $slug }) {
      title
      slug
      pageHeader
      subHeader
      introductoryText {
        introductoryText
      }
      heroImage {
        ...ImageFragment
      }
      shop {
        ...ShopTopicFragment
      }
      whatCanYouDonate {
        childContentfulRichText {
          html
        }
      }
      yesPleaseList
      noThanksList
      howDoesYourDonationHelp {
        childContentfulRichText {
          html
        }
      }
      pageInformation {
        id
      }
    }
  }
`;
