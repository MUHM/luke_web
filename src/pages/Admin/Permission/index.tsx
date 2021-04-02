import React from 'react';
import { ResponsiveGrid } from '@alifd/next';
import PageHeader from '@/components/PageHeader';
import BasicList from './components/BasicList';

const { Cell } = ResponsiveGrid;

const Permission = () => {
  return (
    <ResponsiveGrid gap={20}>
      <Cell colSpan={12}>
        <PageHeader
          title="权限管理"
          breadcrumbs={[
            {
              name: '权限管理',
            },
            {
              name: '权限列表',
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

export default Permission;
