import accountService from '@/services/account';
import moduleService from '@/services/module';
import { ISelectItem } from '@/typings';
import { WebCache } from '@/utils/cache';

interface IState {
  menuTree: [];
  openKeys: [];
}
interface ITreeNode {
  id: string;
  parentId?: string;
  name: string;
  icon: string;
  path: string;
  children?: ITreeNode;
}

const initMenu = (data: ITreeNode[], parentId: string | null) => {
  const tree: Array<ITreeNode> = [];
  let temp;
  for (let i = 0; i < data.length; i++) {
    if (data[i].parentId === parentId) {
      const obj: ITreeNode = {
        id: data[i].id,
        parentId: data[i].parentId,
        name: data[i].name,
        icon: data[i].icon,
        path: data[i].path || '#',
      };
      temp = initMenu(data, data[i].id);
      if (temp.length > 0) {
        obj.children = temp;
      }
      tree.push(obj);
    }
  }
  return tree;
};

const getKeys = (data: ITreeNode[], parentId?: string | null) => {
  const keys: Array<string> = [];
  let temp;
  for (let i = 0; i < data.length; i++) {
    if (data[i].id === parentId) {
      keys.push(String(data[i].id));
      if (data[i].parentId) {
        temp = getKeys(data, data[i].parentId);
        temp.forEach(j => keys.push(String(j)));
      }
    }
  }
  return keys;
};

const cache = new WebCache<ITreeNode[]>();
export default {
  state: {
    menuTree: [],
    menuSearch: [],
    openKeys: [],
  },

  effects: (dispatch) => ({
    setOpenKeys(keys: string[]) {
      dispatch.adminMenu.update({ openKeys: keys });
    },

    setOpenKeysByPathname(pathname: string) {
      const credentials = accountService.getCredentials();
      if (credentials == null) {
        return;
      }
      const menuData = cache.getJSON(`${credentials.user.id}_admin_menu_data`);
      if (menuData) {
        const tmp = menuData.find(item => item.path === pathname);
        if (tmp) {
          dispatch.adminMenu.update({ openKeys: getKeys(menuData, tmp.parentId) });
        }
      }
    },

    async fetchData() {
      const credentials = accountService.getCredentials();
      if (credentials === null) {
        return;
      }
      const menuData = cache.getJSON(`${credentials.user.id}_admin_menu_data`);
      if (menuData) {
        const menuSearch: ISelectItem[] = [];
        menuData.forEach(item => {
          if (item.path) {
            menuSearch.push({ label: item.name, value: item.path });
          }
        });
        dispatch.adminMenu.update({
          menuTree: initMenu(menuData, null),
          menuSearch,
        });
        return;
      }
      const result = await moduleService.getAdminMenu();
      if (result?.code === 200) {

        const menuSearch: ISelectItem[] = [];
        result.data.forEach(item => {
          if (item.path) {
            menuSearch.push({ label: item.name, value: item.path });
          }
        });
        dispatch.adminMenu.update({
          menuTree: initMenu(result.data, null),
          menuSearch,
        });
        cache.setJSON(`${credentials.user.id}_admin_menu_data`, result.data);
      }
    },
  }),

  reducers: {
    update(prevState: IState, payload: IState) {
      return { ...prevState, ...payload };
    },
  },
};
