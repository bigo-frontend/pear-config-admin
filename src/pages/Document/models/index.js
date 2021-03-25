import { getEnv } from '@/utils/utils';
import { message } from 'antd';

export default {
  namespace: 'doc',

  state: {
    type: 'home',
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {
        if (pathname.indexOf('/home') > -1) {
          dispatch({ 
            type: 'updateData',
            payload: { type: 'home' }
          });
        } else if (pathname.indexOf('/doc/')  > -1) {
          dispatch({ 
            type: 'updateData',
            payload: { 
              type: pathname.replace(/(\/doc\/)((\w)+)/, '$2')
            }
          });
        }
      });
    },
  },

  effects: {
  },

  reducers: {
    updateData(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
