const path = require('path');
const { getPressReleasePages } = require('../queries/press-release-page');
const {
  getPressReleaseListingsPages,
} = require('../queries/press-release-listings-page');

async function createPressReleasePages(graphql, gatsbyCreatePage) {
  const pressReleasePageTemplate = path.resolve(
    'src/templates/press-release/index.js'
  );

  const pressReleaseListingPageTemplate = path.resolve(
    'src/templates/press-release-list/index.js'
  );

  // Get press release pages
  const pressReleasePages = await getPressReleasePages(graphql);

  if (pressReleasePages.errors) {
    throw Error(pressReleasePages.errors);
  }

  const pressReleases =
    pressReleasePages.data.allContentfulPagePressRelease.edges;

  // Create single pages
  pressReleases.forEach(({ node }) => {
    if (!node.slug) return;
    const { menuParent, slug } = node;

    gatsbyCreatePage({
      path: node.slug,
      component: pressReleasePageTemplate,
      context: {
        slug,
        menuParent,
      },
    });
  });

  // Create press release list pages
  // Grab the page for content to use in listings page
  // Filtered by contentful_id in query to only return one
  const pressReleaseListingsPages = await getPressReleaseListingsPages(graphql);

  const pressReleaseListingPage =
    pressReleaseListingsPages.data.contentfulPagePressReleaseListings;

  const { title, subHeading, slug: listingsSlug } = pressReleaseListingPage;

  const postsPerPage = 3; // deliberately low for testing purposes,
  const numPages = Math.ceil(pressReleases.length / postsPerPage);

  Array.from({ length: numPages }).forEach((_, i) => {
    gatsbyCreatePage({
      path: i === 0 ? `/${listingsSlug}` : `/${listingsSlug}/${i + 1}`,
      component: pressReleaseListingPageTemplate,
      context: {
        slug: listingsSlug,
        title,
        subHeading,
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    });
  });
}
module.exports = createPressReleasePages;
