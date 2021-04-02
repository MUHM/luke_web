import * as React from 'react';
import { Menu } from '@alifd/next';
import styles from './index.module.scss';

const { Item } = Menu;
const Theme = () => (
  <Menu className={styles.menu}>
    <Item key="sub-1">Sub option 1</Item>
    <Item key="sub-2">Sub option 2</Item>
  </Menu>
);

export default Theme;
