import React, { useEffect, useState } from 'react';
import { Table, ResponsiveGrid, Pagination, Message, Button, Dialog, Divider, Search, Switch } from '@alifd/next';
import { store as appStore, useRequest } from 'ice';
import moment from 'moment';
import userService from '@/services/user';
import AddDialog from './AddDialog';
import EditDialog from './EditDialog';

import styles from './index.module.scss';

const { Cell } = ResponsiveGrid;

const BasicList = () => {

  const { request, loading } = useRequest(userService.getList);
  const [roleState, dispatchers] = appStore.useModel('role');
  const [current, setCurrent] = useState(1);
  const [size, setSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [dataSource, setDataSource] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchData();
    dispatchers.fetchRoles();
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
  const handleReset = id => {
    Dialog.confirm({
      title: '提示',
      content: '确认重置该用户密码吗？',
      onOk: () => handleResetSubmit(id)
    });
  }
  const handleResetSubmit = async id => {
    const result = await userService.reset(id);
    if (result?.code === 200) {
      fetchData();
      Message.success(result.message);
    }
  }
  const handleSearch = value => setSearch(value);
  return (
    <ResponsiveGrid gap={20}>
      <Cell colSpan={6}>
        <AddDialog
          fetchData={fetchData}
          roleData={roleState.all}
        />
      </Cell>
      <Cell colSpan={6} style={{ textAlign: "right" }}>
        <Search
          shape="simple"
          searchText=""
          placeholder="请输入要搜索的用户账号或姓名"
          onSearch={handleSearch}
        />
      </Cell>
      <Cell colSpan={12}>
        <Table
          loading={loading}
          dataSource={dataSource}
        >
          <Table.Column title='用户账号' dataIndex='username' align='center' />
          <Table.Column title='用户姓名' dataIndex='truename' align='center' />
          <Table.Column title='状态'
            dataIndex='status'
            cell={(value) => (
              <Switch checked={value === 1} className={styles.tableSwitch} checkedChildren="正常" unCheckedChildren="禁用" />
            )}
            align='center'
          />
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
                  roleData={roleState.all}
                  fetchData={fetchData}
                />
                <Divider direction="ver" />
                <Button onClick={() => { handleReset(record.id) }} type="primary" text>
                  重置密码
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
