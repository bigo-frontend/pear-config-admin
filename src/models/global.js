import queryString from 'query-string';
import router from 'umi/router';
import { setAuthority } from '@/utils/authority';
import { getEnv, setEnv, getToken as readToken, setToken } from '@/utils/utils';
import { getToken, logout, getEnvList } from '@/services/api';
import { message } from 'antd';

export default {
  namespace: 'global',

  state: {
    envList: [],
    collapsed: false,
    currentUser: {}
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {
        if (!readToken()) {
          dispatch({ type: 'getToken' });
        }

        if (!getEnv()) { // 是否缓存
          dispatch({ type: 'getEnvList' }).then(() => {
            dispatch({ type: 'checkEnv', payload: {pathname} });
          });
        }
      });
    },
  },

  effects: {
    *fetchCurrent(_, { put }) {
      yield put({
        type: 'saveCurrentUser',
        payload: {
          name: 'admin',
          role: 'superAdmin'
        }
      });
    },

    *logout({ payload }, { call, put }) {
      // todo 此处处理登出业务
      setToken('');
      setAuthority('');
      location.reload();
    },

    *getEnvList({ payload }, { call, put }) {
      const res = yield call(getEnvList, payload);
      if (res.status) {
        yield put({
          type: 'updateData',
          payload: {
            envList: res.data
          },
        });
      } else {
        message.error(res.msg);
      }
    },

    *checkEnv({ payload }, { call, put, select }) {
      const { envList } = yield select(state => state.global);
      if (envList.length === 0) { // 数据初始化，需要引导新建
        message.info('请先新建业务空间');
        if(payload.pathname.indexOf('/keyValueManagement/env') === -1) {
          router.push('/keyValueManagement/env');
        }
      } else {
        if(payload.pathname.indexOf('/selectEnv') === -1) {
          router.push('/selectEnv'); // 跳转切换空间
        }
        
      }
    }
  },

  reducers: {
    updateData(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    changeLayoutCollapsed(state, { payload }) {
      return {
        ...state,
        collapsed: payload,
      };
    },
    saveCurrentUser(state, { payload }) {
      return {
        ...state,
        currentUser: payload || {},
      };
    },
    getToken(state) {
      // todo 接入cas 此处需要获取token
      setToken('your token');
      setAuthority('superAdmin');
      location.reload();
      return {
        ...state,
      };
    },
    selectEnv(state, { payload }) {
      setEnv(payload.env);
      return {
        ...state
      }
    }
  },
};
