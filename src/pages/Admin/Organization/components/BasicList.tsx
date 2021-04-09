import React, { useEffect, useState } from 'react';
import { useUpdateEffect } from 'ahooks';
import {
  Table,
  ResponsiveGrid,
  Pagination,
  Message,
  Button,
  Dialog,
  Divider,
  Search,
} from '@alifd/next';
import { useRequest } from 'ice';
import moment from 'moment';
import organizationService from '@/services/organization';
import AddDialog from './AddDialog';
import EditDialog from './EditDialog';

const { Cell } = ResponsiveGrid;

const BasicList = () => {
  const { request, loading } = useRequest(organizationService.getList);
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
      setTotal(result.data.count);
    }
  };
  const handlePaginationChange = (currentPage: number) =>
    setCurrent(currentPage);
  const handlePageSizeChange = (pageSize: number) => {
    setSize(pageSize);
    setCurrent(1);
  };
  const handleRemove = (id: number) => {
    Dialog.confirm({
      title: '提示',
      content: '确认删除该记录吗？',
      onOk: () => handleRemoveSubmit(id),
    });
  };
  const handleSearch = (value: React.SetStateAction<string>) =>
    setSearch(value);
  const handleRemoveSubmit = async (id: number) => {
    const result = await organizationService.destroy(id);
    if (result?.code === 200) {
      fetchData();
      Message.success(result.message);
    }
  };
  return (
    <ResponsiveGrid gap={20}>
      <Cell colSpan={6}>
        <AddDialog fetchData={fetchData} />
      </Cell>
      <Cell colSpan={6} style={{ textAlign: 'right' }}>
        <Search
          // inputWidth={250}
          shape="simple"
          searchText=""
          placeholder="请输入要搜索的组织名称"
          onSearch={handleSearch}
        />
      </Cell>
      <Cell colSpan={12}>
        <Table loading={loading} dataSource={dataSource}>
          <Table.Column title="组织名称" dataIndex="name" align="center" />
          <Table.Column title="联系人" dataIndex="contact" align="center" />
          <Table.Column title="联系电话" dataIndex="telphone" align="center" />
          <Table.Column title="联系地址" dataIndex="address" align="center" />
          <Table.Column
            title="最后修改日期"
            cell={(
              _value: any,
              _index: number,
              record: { updatedAt: moment.MomentInput }
            ) => moment(record.updatedAt).format('yyyy-MM-DD HH:mm:ss')}
            align="center"
          />
          <Table.Column
            title="操作"
            cell={(_value: any, _index: number, record: { id: number }) => (
              <div>
                <EditDialog recordId={record.id} fetchData={fetchData} />
                <Divider direction="ver" />
                <Button
                  onClick={() => {
                    handleRemove(record.id);
                  }}
                  type="primary"
                  text
                >
                  删除
                </Button>
              </div>
            )}
            align="center"
          />
        </Table>
      </Cell>
      <Cell colSpan={12}>
        <Pagination
          pageSize={size}
          pageSizeSelector="filter"
          pageSizePosition="end"
          onPageSizeChange={handlePageSizeChange}
          total={total}
          totalRender={(totalCount) => ` 总记录数: ${totalCount}`}
          current={current}
          onChange={handlePaginationChange}
        />
      </Cell>
    </ResponsiveGrid>
  );
};

export default BasicList;
