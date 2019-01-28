import React from 'react';
import PropTypes from 'prop-types';

import { SubNavButton, ArrowSVG } from './styles-icons';
import { MenuList, SubMenu, ItemLink, Item } from './styles';
import AngleRight from '../../../assets/svg/icons/chevron-down-light.svg';

const NavigationMenu = ({ pageData, id, menuOpen, setActiveMenu }) => {
  const { menuLabel, navigationLink, subNavigationItems } = pageData;

  return (
    <Item topLevel>
      <MenuList>
        {navigationLink &&
          navigationLink.map((navLink, i) => (
            <Item key={i} role="menuitem" aria-haspopup={!!subNavigationItems}>
              <ItemLink internalLink={navLink}>
                {menuLabel || navLink.title}
              </ItemLink>
              {subNavigationItems && (
                <SubNavButton type="button" onClick={() => setActiveMenu(id)}>
                  <ArrowSVG src={AngleRight} cacheGetRequests />
                </SubNavButton>
              )}
            </Item>
          ))}
        {subNavigationItems && (
          <SubMenu active={menuOpen} aria-hidden="true" role="menu">
            {subNavigationItems.map((item, i) => (
              <Item>
                <ItemLink key={i} internalLink={item} tabindex="-1">
                  {item.title}
                </ItemLink>
              </Item>
            ))}
          </SubMenu>
        )}
      </MenuList>
    </Item>
  );
};

NavigationMenu.propTypes = {
  pageData: PropTypes.shape({
    navigationLink: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired,
      })
    ),
  }),
  id: PropTypes.string.isRequired,
  menuOpen: PropTypes.bool,
  setActiveMenu: PropTypes.func,
};

export default NavigationMenu;
