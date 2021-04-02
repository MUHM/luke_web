import React from 'react';
import { ResponsiveGrid } from '@alifd/next';
// import Theme from '@/components/Theme';

const { Cell } = ResponsiveGrid;

const Home = () => {
  return (
    <ResponsiveGrid gap={20}>
      <Cell colSpan={12}>
        {/* <Theme /> */}
      </Cell>
    </ResponsiveGrid>
  );
};

export default Home;
