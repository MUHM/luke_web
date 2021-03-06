import React from 'react';
import { ResponsiveGrid } from '@alifd/next';
import PageHeader from '@/components/PageHeader';
import BasicList from './components/BasicList';

const { Cell } = ResponsiveGrid;

const Organization = () => {
  return (
    <ResponsiveGrid gap={20}>
      <Cell colSpan={12}>
        <PageHeader
          title="组织管理"
          breadcrumbs={[
            {
              name: '组织管理',
            },
            {
              name: '组织列表',
            },
          ]}
        />
      </Cell>
      <Cell colSpan={12}>
        <BasicList />
      </Cell>
    </ResponsiveGrid>
  )
};

export default Organization;
