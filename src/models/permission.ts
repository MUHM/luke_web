import permissionService from '@/services/permission';
import { WebCache } from '@/utils/cache';

interface IState {
  permissionTree: [];
  openKeys: [];
}

interface ITreeNode {
  value: string;
  label: string;
  key: string;
  disabled?: boolean;
  children?: Array<ITreeNode>;
}

export default {
  state: {
    tree: [],
  },
  effects: (dispatch) => ({
    async fetchData() {
      const cache = new WebCache<ITreeNode[]>();
      const tree = cache.getJSON('permission_tree');
      if (tree) {
        dispatch.permission.update({ tree });
        return;
      }
      const result = await permissionService.getAll();
      if (result?.code === 200) {
        const tree: ITreeNode[] = [];
        const pSet: Set<string> = new Set();
        result.data.rows.map((item) => {
          pSet.add(String(item.type));
        })
        pSet.forEach((item) => {
          let children: ITreeNode[] = [];
          result.data.rows.filter(i => i.type === item).map(j => {
            const { id, name } = j;
            children.push({ value: String(id), label: name, key: String(id) });
          });
          tree.push({
            key: item,
            value: item,
            label: item,
            disabled: true,
            children,
          });
        })
        dispatch.permission.update({ tree });
        cache.setJSON('permission_tree', tree);
      }
    }
  }),
  reducers: {
    update(prevState: IState, payload: IState) {
      return { ...prevState, ...payload };
    },
  },
}
