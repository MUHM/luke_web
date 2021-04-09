import React from 'react';
import { ResponsiveGrid } from '@alifd/next';
import PageHeader from '@/components/PageHeader';
import BasicList from './components/BasicList';

const { Cell } = ResponsiveGrid;

const SystemConst = () => {
  return (
    <ResponsiveGrid gap={20}>
      <Cell colSpan={12}>
        <PageHeader
          title="系统常量"
          breadcrumbs={[
            {
              name: '系统常量',
            },
            {
              name: '系统常量列表',
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

export default SystemConst;
