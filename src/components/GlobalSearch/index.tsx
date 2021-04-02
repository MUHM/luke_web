import React, { useEffect } from 'react';
import { Search } from '@alifd/next';
import { store as appStore, useHistory } from 'ice';

export default function GlobalSearch() {
  const history = useHistory();
  const [state, dispatchers] = appStore.useModel('adminMenu');
  useEffect(() => {
    dispatchers.fetchData();
  }, []);

  const onSearch = (value) => {
    history.push(value);
  }
  return (
    <Search dataSource={state.menuSearch} shape="simple" type="normal" onSearch={onSearch} onVisibleChange={onSearch} />
  );
}
