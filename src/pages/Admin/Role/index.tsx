import React from 'react';
import { ResponsiveGrid } from '@alifd/next';
import PageHeader from '@/components/PageHeader';
import BasicList from './components/BasicList';

const { Cell } = ResponsiveGrid;

const Role = () => {
  return (
    <ResponsiveGrid gap={20}>
      <Cell colSpan={12}>
        <PageHeader
          title="角色管理"
          breadcrumbs={[
            {
              name: '角色管理',
            },
            {
              name: '角色列表',
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

export default Role;
