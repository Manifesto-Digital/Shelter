const path = require('path');
const { getPressReleasePages } = require('../queries/press-release-page');

async function createPressReleasePages(graphql, gatsbyCreatePage) {
  const pressReleasePageTemplate = path.resolve(
    'src/templates/press-release.js'
  );
  const pressReleaseListingPageTemplate = path.resolve(
    'src/templates/press-release-list.js'
  );

  // Get press release pages
  const pressReleasePages = await getPressReleasePages(graphql);

  if (pressReleasePages.errors) {
    throw Error(pressReleasePages.errors);
  }

  const pressReleases =
    pressReleasePages.data.allContentfulPageAssemblyPressReleasePage.edges;

  // Create single pages
  pressReleases.forEach(({ node }) => {
    gatsbyCreatePage({
      path: node.slug,
      component: pressReleasePageTemplate,
      context: {
        slug: node.slug,
      },
    });
  });

  // Create press release list pages
  const postsPerPage = 2; // deliberately low for testing purposes
  const numPages = Math.ceil(pressReleases.length / postsPerPage);

  Array.from({ length: numPages }).forEach((_, i) => {
    gatsbyCreatePage({
      path: i === 0 ? `/press-releases` : `/press-releases/${i + 1}`,
      component: pressReleaseListingPageTemplate,
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    });
  });
}
module.exports = createPressReleasePages;
