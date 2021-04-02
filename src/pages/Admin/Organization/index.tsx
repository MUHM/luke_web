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
          title="单位管理"
          breadcrumbs={[
            {
              name: '单位管理',
            },
            {
              name: '单位列表',
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
