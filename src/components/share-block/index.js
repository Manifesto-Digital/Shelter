import React from 'react';
import PropTypes from 'prop-types';
import { Location } from '@reach/router';
import Icon from './icon';
import { consistentString } from '../../utils/content-formatting';
import { Wrapper, PrintButton, ShareLink } from './styles';

const ShareBlock = ({ data }) => {
  const { headerText, shareType } = data;
  const url = {
    Print: 'printer',
    Email: 'mailto:?&subject=Shelter&body=',
    WhatsApp: 'https://api.whatsapp.com/send?text=',
    Twitter: 'https://twitter.com/home?status=',
    Facebook: 'https://www.facebook.com/sharer/sharer.php?u=',
  };

  return (
    <>
      <h3>{headerText}</h3>
      <Wrapper>
        {shareType.map(type => (
          <>
            {type === 'Print' ? (
              <PrintButton
                onClick={() => window.print()}
                onKeyDown={event => {
                  if (event.keycode === 13) window.print();
                }}
                type="button"
                tabIndex="0"
              >
                <Icon icon="print" />
                Print this article
              </PrintButton>
            ) : (
              <Location>
                {({ location }) => (
                  <ShareLink
                    href={`${url[type]}${location.href}`}
                    target="_blank"
                    rel="noopener"
                  >
                    {console.log(location)}
                    <Icon icon={consistentString(type)} />
                    {type === 'Email' ? 'Email' : 'Share'}
                    {' this article'}
                  </ShareLink>
                )}
              </Location>
            )}
          </>
        ))}
      </Wrapper>
    </>
  );
};

ShareBlock.propTypes = {
  data: PropTypes.shape({
    headerText: PropTypes.string.isRequired,
    shareType: PropTypes.array.isRequired,
  }),
};

export default ShareBlock;
