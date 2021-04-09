import * as React from 'react';
import { Icon } from '@alifd/next';
import { Link } from 'ice';
import styles from './index.module.scss';

export interface ISolutionLinkProps {
  title?: string;
  icon?: string;
  url?: string;
}

const SolutionLink = ({ title, icon, url }: ISolutionLinkProps) => (
  <div className={styles.link}>
    <Link to={url || '/'} title={title || ''}>
      <Icon type={icon || 'smile'} />
    </Link>
  </div >
);

export default SolutionLink;
