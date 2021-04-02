import moduleService from '@/services/module';
import { WebCache } from '@/utils/cache';

interface IState {
  moduleTree: [];
  openKeys: [];
}

interface ITreeNode {
  value: string;
  label: string;
  key: string;
  children?: Array<ITreeNode>;
}

interface IDataNode {
  id: string,
  parentId: number | null,
  name: string,
}

const initTree = (data: Array<IDataNode>, parentId: number | string | null) => {
  const tree: Array<ITreeNode> = [];
  let temp: Array<ITreeNode>;
  for (let i = 0; i < data.length; i++) {
    if (data[i].parentId === parentId) {
      const obj: ITreeNode = {
        value: String(data[i].id),
        key: String(data[i].id),
        label: data[i].name,
      };
      temp = initTree(data, data[i].id);
      if (temp.length > 0) {
        obj.children = temp;
      }
      tree.push(obj);
    }
  }
  return tree;
};

export default {
  state: {
    tree: [],
  },
  effects: (dispatch) => ({
    async fetchData() {
      const cache = new WebCache<ITreeNode[]>();
      const tree = cache.getJSON('module_tree');
      if (tree) {
        dispatch.module.update({ tree });
        return;
      }
      const result = await moduleService.getAll();
      if (result?.code === 200) {
        const tree = initTree(result.data.rows, null);
        dispatch.module.update({ tree });
        cache.setJSON('module_tree', tree);
      }
    }
  }),
  reducers: {
    update(prevState: IState, payload: IState) {
      return { ...prevState, ...payload };
    },
  },
}
