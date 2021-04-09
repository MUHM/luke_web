import React from 'react';
import { ResponsiveGrid } from '@alifd/next';

const { Cell } = ResponsiveGrid;

const Home = () => {
  return (
    <ResponsiveGrid gap={20}>
      <Cell colSpan={12} />
    </ResponsiveGrid>
  );
};

export default Home;
