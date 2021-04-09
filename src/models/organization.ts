import organizationService from '@/services/organization';
import { ISelectItem } from '@/luke';

interface IState {
  all: [];
}

export default {
  state: {
    all: []
  },

  effects: (dispatch) => ({
    async fetchOrganizations() {
      const res = await organizationService.getAll();
      if (res.code === 200) {
        const data: ISelectItem[] = [];
        for (let i = 0; i < res.data.rows.length; i++) {
          data.push({ label: res.data.rows[i].name, value: res.data.rows[i].id });
        }
        dispatch.organization.update({ all: data });
      }
    },
  }),

  reducers: {
    update(prevState: IState, payload: IState) {
      return { ...prevState, ...payload };
    },
  },
};
