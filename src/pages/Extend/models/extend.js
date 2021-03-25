import { getFormConfigDetail, submitPageConfig } from '@/services/api';
import { message } from 'antd';

export default {
  namespace: 'extend',

  state: {
    requestUrl: '',
    requestMethod: '',
    jsonSchema: {},
    data: {},
    title: ''
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {
        if (pathname.indexOf('/extend') > -1) {
          dispatch({type: 'getFormConfig', payload: {formKey: pathname.replace('/extend/', '')}})
        }
      });
    },
  },

  effects: {
    *getFormConfig({ payload }, { call, put }) {
      const res = yield call(getFormConfigDetail, payload);
      if (res.status) {
        yield put({
          type: 'updateData',
          payload: {
            requestUrl: '',
            requestMethod: '',
            jsonSchema: {},
            data: {},
            title: '',
            ...res.data
          },
        });
      }
    },
    *submit({ payload }, { call, put, select }) {
      const {requestUrl, requestMethod} = yield select(state => state.extend);
      const res = yield call(submitPageConfig, {
        requestUrl,
        requestMethod,
        payload
      });
      if (res.status) {
        message.success('提交成功');
      } else {
        message.error(res.msg || '提交失败');
      }
    },
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
