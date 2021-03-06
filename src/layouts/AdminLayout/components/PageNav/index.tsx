import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { store as appStore, Link, withRouter } from 'ice';
import { Nav } from '@alifd/next';

const SubNav = Nav.SubNav;
const NavItem = Nav.Item;

export interface IMenuItem {
  id: string;
  name: string;
  path: string;
  icon?: string;
  children?: IMenuItem[];
}

function getNavMenuItems(menusData: any[], initIndex?: number | string) {
  if (!menusData) {
    return [];
  }

  return menusData
    .filter(item => item.name && !item.hideInMenu)
    .map((item, index) => {
      return getSubMenuOrItem(item, `${initIndex}-${index}`);
    });
}

function getSubMenuOrItem(item: IMenuItem, index?: number | string) {
  if (item.children && item.children.some(child => child.name)) {
    const childrenItems = getNavMenuItems(item.children, index);
    if (childrenItems && childrenItems.length > 0) {
      const subNav = (
        <SubNav
          key={item.id}
          icon={item.icon}
          label={item.name}
        >
          {childrenItems}
        </SubNav>
      );

      return subNav;
    }
    return null;
  }
  const navItem = (
    <NavItem key={item.path} icon={item.icon}>
      <Link to={item.path}>
        {item.name}
      </Link>
    </NavItem>
  );
  return navItem;
}

const Navigation = (props, context) => {
  const { location } = props;
  const { pathname } = location;
  const { isCollapse } = context;
  const { useModel } = appStore;
  const [state, dispatchers] = useModel('adminMenu');
  useEffect(() => {
    dispatchers.fetchData();
    dispatchers.setOpenKeysByPathname(pathname);
  }, []);

  const onOpenChange = (keys) => {
    dispatchers.setOpenKeys(keys);
  }

  return (
    <Nav
      type="normal"
      selectedKeys={[pathname]}
      defaultSelectedKeys={[pathname]}
      embeddable
      activeDirection="right"
      openMode="single"
      iconOnly={isCollapse}
      onOpen={onOpenChange}
      openKeys={state.openKeys}
      hasArrow={false}
      mode={isCollapse ? 'popup' : 'inline'}
      style={{ overflow: 'hidden' }}
    >
      {getNavMenuItems(state.menuTree, 0)}
    </Nav>
  );
};

Navigation.contextTypes = {
  isCollapse: PropTypes.bool,
};

const PageNav = withRouter(Navigation);

export default PageNav;
