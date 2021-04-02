import React, { useEffect, useState } from 'react';
import { Table, ResponsiveGrid, Pagination, Message, Button, Dialog, Divider, Search } from '@alifd/next';
import { useRequest } from 'ice';
import moment from 'moment';
import roleService from '@/services/role';
import AddDrawer from './AddDrawer';
import EditDrawer from './EditDrawer';

const { Cell } = ResponsiveGrid;

const BasicList = () => {

  const { request, loading } = useRequest(roleService.getList);
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
  const handlePaginationChange = current => setCurrent(current);
  const handlePageSizeChange = size => {
    setSize(size);
    setCurrent(1);
  }
  const handleRemove = id => {
    Dialog.confirm({
      title: '提示',
      content: '确认删除该记录吗？',
      onOk: () => handleRemoveSubmit(id)
    });
  }
  const handleSearch = value => setSearch(value);
  const handleRemoveSubmit = async id => {
    const result = await roleService.destroy(id);
    if (result?.code === 200) {
      fetchData();
      Message.success(result.message);
    }
  }
  return (
    <ResponsiveGrid gap={20}>
      <Cell colSpan={6}>
        <AddDrawer fetchData={fetchData} />
      </Cell>
      <Cell colSpan={6} style={{ textAlign: "right" }}>
        <Search
          // inputWidth={250}
          shape="simple"
          searchText=""
          placeholder="请输入要搜索的角色名称"
          onSearch={handleSearch}
        />
      </Cell>
      <Cell colSpan={12}>
        <Table
          loading={loading}
          dataSource={dataSource}
        >
          <Table.Column title='角色名称' dataIndex='name' align='center' />
          <Table.Column title='角色描述' dataIndex='description' align='center' />
          <Table.Column title='最后修改日期' cell={(_value, _index, record) => moment(record.updatedAt).format('yyyy-MM-DD HH:mm:ss')} align='center' />
          <Table.Column title='操作'
            cell={(_value, _index, record) => (
              <div >
                <EditDrawer
                  recordId={record.id}
                  fetchData={fetchData}
                />
                <Divider direction="ver" />
                <Button onClick={() => { handleRemove(record.id) }} type="primary" text>
                  删除
                </Button>
              </div>
            )}
            align='center' />
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
