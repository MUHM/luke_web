import React from 'react';
import { ResponsiveGrid } from '@alifd/next';

const { Cell } = ResponsiveGrid;

const Home = () => {
  return (
    <ResponsiveGrid gap={20}>
      <Cell colSpan={12}>
      </Cell>
    </ResponsiveGrid>
  );
};

export default Home;
