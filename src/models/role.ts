import roleService from '@/services/role';
import { ISelectItem } from '@/luke';

interface IState {
  all: [];
}

export default {
  state: {
    all: []
  },

  effects: (dispatch) => ({
    async fetchRoles() {
      const res = await roleService.getAll();
      if (res.code === 200) {
        const data: ISelectItem[] = [];
        for (let i = 0; i < res.data.rows.length; i++) {
          data.push({ label: res.data.rows[i].name, value: res.data.rows[i].id });
        }
        dispatch.role.update({ all: data });
      }
    },
  }),

  reducers: {
    update(prevState: IState, payload: IState) {
      return { ...prevState, ...payload };
    },
  },
};
