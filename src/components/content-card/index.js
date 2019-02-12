import React from 'react';
import PropTypes from 'prop-types';
// Styles
import {
  Card,
  CoveringLink,
  CardTitle,
  CardImage,
  SummaryText,
  Wrapper,
} from './styles';

const ContentCard = ({ data }) => {
  const { title, slug, pageInformation = null, cropImageFrom } = data;

  const cardLink = {};
  cardLink.slug = slug;

  // Fallback until all images are set in pageInformation field
  const image = pageInformation.pageThumbnail;

  // Fallback until all descriptions are set in pageInformation field
  const description = pageInformation.shortDescription.shortDescription;

  if (!image) return null;

  return (
    <Card>
      <CardImage
        mobileW={600}
        mobileH={350}
        desktopW={600}
        desktopH={350}
        fit="fill"
        focusArea={cropImageFrom}
        image={image}
        presentational
      />
      <Wrapper>
        {title && <CardTitle>{title}</CardTitle>}
        <SummaryText internalLink={cardLink}>{description}</SummaryText>
      </Wrapper>

      <CoveringLink tabIndex="-1" aria-hidden="true" internalLink={cardLink}>
        {description}
      </CoveringLink>
    </Card>
  );
};

ContentCard.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    slug: PropTypes.string,
    cropImageFrom: PropTypes.string,
    pageInformation: PropTypes.shape({
      shortDescription: PropTypes.object,
      pageThumbnail: PropTypes.object,
    }).isRequired,
  }),
};

export default ContentCard;
