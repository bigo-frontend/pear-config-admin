export default {
  namespace: 'error',

  state: {
    isloading: false,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {
        if (pathname.indexOf('/exception/401') > -1) {
          dispatch({ type: 'global/getToken' });
        }
      });
    },
  },

  effects: {
  },

  reducers: {
  },
};
