import React from 'react';
import PropTypes from 'prop-types';
// Components
import Banner from '../banner';
import InlineCallOut from '../inline-callout';
import RichText from '../rich-text';
import CTABanner from '../cta-banner';
import ContentCardBanner from '../content-card-banner';

const SidebarAssemblies = ({ assemblies }) => {
  if (!assemblies || assemblies.length === 0) return null;

  const AssembliesLoop = () =>
    assemblies.map(assembly => {
      // Make sure an id and name of component have been queried
      if (!assembly.id || !assembly.internal) return null;
      const { id, internal } = assembly;

      if (internal.type === 'ContentfulTopicBanner') {
        return <Banner key={id} banner={assembly} sidebar />;
      }

      if (internal.type === 'ContentfulTopicInlineCallout') {
        return (
          <InlineCallOut key={id} insideContainer>
            <RichText richText={assembly.content} />
          </InlineCallOut>
        );
      }

      if (internal.type === 'ContentfulAssemblyCta') {
        return (
          <CTABanner
            key={id}
            headerText={assembly.ctaHeaderText}
            removeMarginBottom={assembly.removeMarginBottom}
            cta={assembly.cta[0]}
            bannerColour={assembly.bannerColour}
            sidebar
          />
        );
      }

      if (internal.type === 'ContentfulAssemblyContentCardsBanner') {
        return <ContentCardBanner key={id} data={assembly} sidebar />;
      }

      if (internal.type === 'ContentfulTopicSimpleRichTextBlock') {
        return <RichText key={id} richText={assembly.text} sidebar />;
      }

      return null;
    });

  return <AssembliesLoop />;
};

SidebarAssemblies.propTypes = {
  assemblies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      internal: PropTypes.shape({
        type: PropTypes.string.isRequired,
      }),
    })
  ),
};
export default SidebarAssemblies;
