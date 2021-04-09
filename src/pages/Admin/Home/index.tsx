import React from 'react';
import { ResponsiveGrid } from '@alifd/next';
import WeiboHot from './components/WeiboHot';
import ZhihuHot from './components/ZhihuHot';

const { Cell } = ResponsiveGrid;

const Home = () => {
  return (
    <ResponsiveGrid gap={20}>
      <Cell colSpan={4}>
        <ZhihuHot />
      </Cell>
      <Cell colSpan={4}>
        <WeiboHot />
      </Cell>
      <Cell colSpan={4}>
        {/* <WeiboHot /> */}
      </Cell>
    </ResponsiveGrid>
  );
};

export default Home;
