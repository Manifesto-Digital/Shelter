import React from 'react';
import PropTypes from 'prop-types';
import { Container } from '../styled/containers';
import { Title, Wrapper, ListWrapper, ListItem, ArrowSVG } from './styles';
import AngleRight from '../../assets/svg/icons/angle-right.svg';

const RelatedAdvice = ({ data }) => {
  const { headerText, columns, links } = data;
  return (
    <Container>
      <Wrapper>
        <Title>{headerText || 'Related advice'}</Title>
        <ListWrapper>
          {links.map((link, i) => (
            <ListItem key={i} columns={columns} href={link.slug}>
              {link.title}
              <ArrowSVG src={AngleRight} cacheGetRequests />
            </ListItem>
          ))}
        </ListWrapper>
      </Wrapper>
    </Container>
  );
};

RelatedAdvice.propTypes = {
  data: PropTypes.shape({
    headerText: PropTypes.string.isRequired,
    columns: PropTypes.number.isRequired,
    links: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired,
      })
    ),
  }),
};

export default RelatedAdvice;
