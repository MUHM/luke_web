const types = [
  "smile",
  "cry",
  "success",
  "warning",
  "prompt",
  "error",
  "help",
  "clock",
  "success-filling",
  "delete-filling",
  "favorites-filling",
  "add",
  "minus",
  "arrow-up",
  "arrow-down",
  "arrow-left",
  "arrow-right",
  "arrow-double-left",
  "arrow-double-right",
  "switch",
  "sorting",
  "descending",
  "ascending",
  "select",
  "semi-select",
  "loading",
  "search",
  "close",
  "ellipsis",
  "picture",
  "calendar",
  "ashbin",
  "upload",
  "download",
  "set",
  "edit",
  "refresh",
  "filter",
  "attachment",
  "account",
  "email",
  "atm",
  "copy",
  "exit",
  "eye",
  "eye-close",
  "toggle-left",
  "toggle-right",
  "lock",
  "unlock",
  "chart-pie",
  "chart-bar",
  "form",
  "detail",
  "list",
  "dashboard"
];

interface ISelect {
  type: string,
  value: string,
  label: string
}

interface IState {
  data: ISelect[],
}

export default {
  state: {
    data: [],
  },

  effects: (dispatch) => ({
    async initSelectData() {
      const data: ISelect[] = types.map(item => {
        return { type: item, value: item, label: item }
      });
      dispatch.icon.update({data});
    },
  }),

  reducers: {
    update(prevState: IState, payload: IState) {
      return { ...prevState, ...payload };
    },
  },
}