import { getEnv } from '@/utils/utils';
import { getFormConfig, createFormConfig, editFormConfig, deleteFormConfig } from '@/services/api';
import { message } from 'antd';

export default {
  namespace: 'formManagement',

  state: {
    formConfigData: [],
    pagination: {
      pageSize: 8,
      pageIndex: 1,
      total: 0
    }
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {
        if (pathname.indexOf('/systemManagement/formManagement') > -1) {
          dispatch({ type: 'getFormConfig' });
        }
      });
    },
  },

  effects: {
    *getFormConfig({ payload }, { call, put, select }) {
      const { pagination } = yield select(state => state.formManagement);
      const res = yield call(getFormConfig, { envId: getEnv()._id, pageSize: pagination.pageSize, pageIndex: pagination.pageIndex });
      if (res.status) {
        yield put({
          type: 'updateData',
          payload: {
            formConfigData: res.data,
            pagination: {
              ...pagination,
              total: res.total
            }
          },
        });
      }
    },
    *createFormConfig({ payload }, { call, put, select }) {
      const res = yield call(createFormConfig, payload);
      if (res.status) {
        message.success('创建成功');
        yield put({ type: 'getFormConfig' });
      } else {
        message.error(res.msg || '创建失败');
      }
    },
    *editFormConfig({ payload }, { call, put, select }) {
      const res = yield call(editFormConfig, payload);
      if (res.status) {
        message.success('更新成功');
        yield put({ type: 'getFormConfig' });
      } else {
        message.error(res.msg || '更新失败');
      }
    },
    *deleteFormConfig({ payload }, { call, put, select }) {
      const res = yield call(deleteFormConfig, payload);
      if (res.status) {
        message.success('删除成功');
        yield put({ type: 'getFormConfig' });
      } else {
        message.error(res.msg || '删除失败');
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
