import React, { useState, useEffect } from 'react';
import { Search } from '@alifd/next';
import { store as appStore, useHistory } from 'ice';

export default function GlobalSearch() {
  const history = useHistory();
  const [state, dispatchers] = appStore.useModel('adminMenu');
  const [filter] = useState(['菜单地址']);
  useEffect(() => {
    dispatchers.fetchData();
  }, []);

  const onSearch = (value) => {
    console.log(value);
    history.push(value);
  }
  return (
    <Search filter={filter} filterValue='菜单地址' dataSource={state.menuSearch} shape="simple" type="normal" onSearch={onSearch} />
  );
}
