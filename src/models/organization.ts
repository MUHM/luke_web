import organizationService from '@/services/organization';

interface IState {
  all: [];
}
interface INode {
  label: string;
  value: number;
}

export default {
  state: {
    all: []
  },

  effects: (dispatch) => ({
    async fetchOrganizations() {
      const res = await organizationService.getAll();
      if (res.code === 200) {
        const data: INode[] = [];
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