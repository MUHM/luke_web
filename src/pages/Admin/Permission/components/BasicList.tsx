import React, { useEffect, useState } from 'react';
import { Table, ResponsiveGrid, Pagination, Search } from '@alifd/next';
import { useRequest } from 'ice';
import moment from 'moment';
import permissionService from '@/services/permission';

const { Cell } = ResponsiveGrid;

const BasicList = () => {

  const { request, loading } = useRequest(permissionService.getList);
  const [current, setCurrent] = useState(1);
  const [size, setSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [dataSource, setDataSource] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchData();
  }, [current, size, search]);

  const fetchData = async () => {
    const result = await request({
      search,
      offset: size * (current - 1),
      limit: size,
    });
    if (result?.code === 200) {
      setDataSource(result.data.rows);
      setTotal(result.data.count)
    }
  }
  const handlePaginationChange = (current: React.SetStateAction<number>) => setCurrent(current);
  const handlePageSizeChange = (size: React.SetStateAction<number>) => {
    setSize(size);
    setCurrent(1);
  }
  const handleSearch = (value: React.SetStateAction<string>) => setSearch(value);

  return (
    <ResponsiveGrid gap={20}>
      <Cell colSpan={12} style={{ textAlign: "right" }}>
        <Search
          shape="simple"
          searchText=""
          placeholder="请输入要搜索的信息"
          onSearch={handleSearch}
        />
      </Cell>
      <Cell colSpan={12}>
        <Table
          loading={loading}
          dataSource={dataSource}
        >
          <Table.Column title='权限名称' dataIndex='name' align='center' />
          <Table.Column title='权限类型' dataIndex='type' align='center' />
          <Table.Column title='权限路径' dataIndex='url' align='center' />
          <Table.Column title='方法' dataIndex='method' align='center' />
          <Table.Column title='详情' cell={(_value, _index, record) => `${record.area}.${record.controller}.${record.action}`} align='center' />
          <Table.Column title='最后修改日期' cell={(_value: any, _index: number, record: { updatedAt: moment.MomentInput; }) => moment(record.updatedAt).format('yyyy-MM-DD HH:mm:ss')} align='center' />
        </Table>
      </Cell>
      <Cell colSpan={12}>
        <Pagination
          pageSize={size}
          pageSizeSelector='filter'
          pageSizePosition='end'
          onPageSizeChange={handlePageSizeChange}
          total={total}
          totalRender={total => ` 总记录数: ${total}`}
          current={current}
          onChange={handlePaginationChange}
        />
      </Cell>
    </ResponsiveGrid>
  )
};

export default BasicList;
