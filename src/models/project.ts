import projectService from '@/services/project';

interface IState {
  all: [];
}
interface INode {
  label: string;
  value: number;
}

interface IProject {
  state: { all: any },
  effects: any,
  reducers: any,
}

const project: IProject = {
  state: {
    all: [],
  },

  effects: (dispatch) => ({
    async fetchProjects() {
      const res = await projectService.getAll();
      if (res.code === 200) {
        const data: INode[] = [];
        for (let i = 0; i < res.data.rows.length; i++) {
          data.push({ label: res.data.rows[i].name, value: res.data.rows[i].id });
        }
        dispatch.project.update({ all: data });
      }
    },
  }),

  reducers: {
    update(prevState: IState, payload: IState) {
      return { ...prevState, ...payload };
    },
  },
};

export default project;
