import React, { useEffect, useState } from 'react';
import { useUpdateEffect } from 'ahooks';
import { Table, ResponsiveGrid, Pagination, Message, Button, Dialog, Divider, Search } from '@alifd/next';
import { useRequest } from 'ice';
import moment from 'moment';
import systemConstService from '@/services/systemConst';
import AddDialog from './AddDialog';
import EditDialog from './EditDialog';

const { Cell } = ResponsiveGrid;

const BasicList = () => {

  const { request, loading } = useRequest(systemConstService.getList);
  const [current, setCurrent] = useState(1);
  const [size, setSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [dataSource, setDataSource] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchData();
  }, [current, size]);

  useUpdateEffect(() => {
    if (current !== 1) {
      return setCurrent(1);
    }
    fetchData();
  }, [search]);

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
  const handlePaginationChange = (currentPage: number) =>
    setCurrent(currentPage);
  const handlePageSizeChange = (pageSize: number) => {
    setSize(pageSize);
    setCurrent(1);
  };
  const handleSearch = (value: string) =>
    setSearch(value);
  const handleRemove = (id: number) => {
    Dialog.confirm({
      title: '提示',
      content: '确认删除该记录吗？',
      onOk: () => handleRemoveSubmit(id)
    });
  }
  const handleRemoveSubmit = async (id: number) => {
    const result = await systemConstService.destroy(id);
    if (result?.code === 200) {
      fetchData();
      Message.success(result.message);
    }
  }
  return (
    <ResponsiveGrid gap={20}>
      <Cell colSpan={6}>
        <AddDialog
          fetchData={fetchData}
        />
      </Cell>
      <Cell colSpan={6} style={{ textAlign: 'right' }}>
        <Search
          shape="simple"
          searchText=""
          placeholder="请输入要搜索的Key"
          onSearch={handleSearch}
        />
      </Cell>
      <Cell colSpan={12}>
        <Table
          loading={loading}
          dataSource={dataSource}
        >
          <Table.Column title='Key' dataIndex='constKey' align='center' />
          <Table.Column title='Value' dataIndex='constValue' align='center' />
          <Table.Column title='最后修改日期'
            dataIndex='updatedAt'
            cell={(value) => moment(value).format('yyyy-MM-DD HH:mm:ss')}
            align='center'
          />
          <Table.Column title='操作'
            cell={(_value, _index, record) => (
              <div >
                <EditDialog
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
          totalRender={totalCount => ` 总记录数: ${totalCount}`}
          current={current}
          onChange={handlePaginationChange}
        />
      </Cell>
    </ResponsiveGrid>
  )
};

export default BasicList;
