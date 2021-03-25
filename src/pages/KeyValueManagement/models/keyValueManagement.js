import { message } from 'antd';
import { getEnv } from '@/utils/utils';
import {
  getEnvList,
  createEnv,
  editEnv,
  getTagList,
  updateTags,
  updateEditors,
  getFormConfig,
  getFormConfigDetail,
  createFormConfig,
  createKeyValue,
  copyKeyValue,
  editKeyValue,
  deleteKeyValue,
  publishKeyValue,
  offlineKeyValue,
  getKeyValueConfig,
  getKeyValueDraft,
  rollbackKeyValue,
} from '@/services/api';
import config from '../../../../config/admin.config.js';

let { apiPrefix } = config;

export default {
  namespace: 'keyValueManagement',

  state: {
    searchKey: '',
    related: 'self',
    searchTag: '',
    pagination: {
      pageSize: 8,
      pageIndex: 1,
      total: 0
    },
    draftPagination: {
      pageSize: 5,
      pageIndex: 1,
      total: 0
    },
    envList: [],
    tagList: [],
    formConfigData: [], // 全部表单数组
    keyValueConfigData: [],
    currentForm: {},
    currentKeyValue: {},
    keyValueDraft: [], // keyValue草稿数据
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {
        if (pathname.indexOf('/keyValueManagement/env') > -1) {
          dispatch({ type: 'getEnvList' });
        }
        if (pathname.indexOf('/keyValueManagement/keyValue') > -1) {
          dispatch({ type: 'getEnvList' });
          dispatch({ type: 'getTagList' });
          dispatch({ type: 'getFormConfig' });
          dispatch({ type: 'getKeyValueConfig' });
        }
      });
    },
  },

  effects: {
    *getEnvList({ payload }, { call, put }) {
      const res = yield call(getEnvList, payload);
      if (res.status) {
        yield put({
          type: 'updateData',
          payload: {
            envList: res.data,
          },
        });
      } else {
        message.error(res.msg);
      }
    },
    *createEnv({ payload }, { call, put }) {
      const res = yield call(createEnv, payload);
      if (res.status) {
        message.success('创建成功');
        yield put({ type: 'getEnvList' });
      } else {
        message.error(res.msg || '创建失败');
      }
    },
    *editEnv({ payload }, { call, put }) {
      const res = yield call(editEnv, payload);
      if (res.status) {
        message.success('更新成功');
        yield put({ type: 'getEnvList' });
      } else {
        message.error(res.msg || '更新失败');
      }
    },
    *getTagList({ payload }, { call, put }) {
      const res = yield call(getTagList, payload);
      if (res.status) {
        yield put({
          type: 'updateData',
          payload: {
            tagList: res.data,
          },
        });
      }
    },
    *updateTags({ payload }, { call, put }) {
      const res = yield call(updateTags, payload);
      if (res.status) {
        yield put({ type: 'getKeyValueConfig' });
      }
    },
    *updateEditors({ payload }, { call, put }) {
      const res = yield call(updateEditors, payload);
      if (res.status) {
        yield put({ type: 'getKeyValueConfig' });
      }
    },
    *getFormConfig({ payload }, { call, put }) {
      const res = yield call(getFormConfig, { envId: getEnv()._id });
      if (res.status) {
        yield put({
          type: 'updateData',
          payload: {
            formConfigData: res.data,
          },
        });
      }
    },
    *createFormConfig({ payload }, { call, put, select }) {
      const res = yield call(createFormConfig, payload);
      if (res.status) {
        yield put({ type: 'getFormConfig' });
        yield put({
          type: 'updateData',
          payload: {
            currentForm: res.data,
          },
        });
      } else {
        message.error(res.msg || '创建失败');
      }
    },
    *getSchema({ payload }, { call, put }) {
      const res = yield call(getFormConfigDetail, payload);
      if (res.status) {
        yield put({
          type: 'updateData',
          payload: {
            currentForm: res.data,
          },
        });
      }
    },
    *getKeyValueConfig({ payload }, { call, put, select }) {
      const { searchKey, searchTag, related, pagination } = yield select(state => state.keyValueManagement);
      const envData = getEnv();
      const res = yield call(getKeyValueConfig, { envId: envData._id, searchKey, tag: searchTag, related, pageSize: pagination.pageSize, pageIndex: pagination.pageIndex });
      if (res.status) {
        yield put({
          type: 'updateData',
          payload: {
            keyValueConfigData: res.data,
            pagination: {
              ...pagination,
              total: res.total
            }
          },
        });
      }
    },
    *getKeyValueDraft({ payload }, { call, put, select }) {
      const { draftPagination } = yield select(state => state.keyValueManagement);
      
      const res = yield call(getKeyValueDraft, { ...payload, pageSize: draftPagination.pageSize, pageIndex: draftPagination.pageIndex });
      if (res.status) {
        yield put({
          type: 'updateData',
          payload: {
            keyValueDraft: res.data,
            draftPagination: {
              ...draftPagination,
              total: res.total
            }
          },
        });
      }
    },
    *rollbackKeyValue({ payload }, { call, put }) {
      const res = yield call(rollbackKeyValue, payload);
      if (res.status) {
        yield put({ type: 'getKeyValueConfig' });
      }
    },
    *createKeyValue({ payload }, { call, put }) {
      const res = yield call(createKeyValue, payload);
      if (res.status) {
        message.success('创建成功');
        yield put({ type: 'getKeyValueConfig' });
      } else {
        message.error(res.msg || '创建失败');
      }
    },
    *copyKeyValue({ payload }, { call, put }) {
      const res = yield call(copyKeyValue, payload);
      if (res.status) {
        message.success('复制成功');
        yield put({ type: 'getKeyValueConfig' });
      } else {
        message.error(res.msg || '复制失败');
      }
    },
    *editKeyValue({ payload }, { call, put }) {
      const res = yield call(editKeyValue, payload);
      if (res.status) {
        message.success('编辑成功');
        yield put({ type: 'getKeyValueConfig' });
      } else {
        message.error(res.msg || '编辑失败');
      }
    },
    *deleteKeyValue({ payload }, { call, put }) {
      const res = yield call(deleteKeyValue, payload);
      if (res.status) {
        message.success('删除成功');
        yield put({ type: 'getKeyValueConfig' });
      } else {
        message.error(res.msg || '删除失败');
      }
    },
    *publishKeyValue({ payload }, { call, put }) {
      message.destroy();
      message.info({
        content: '正在发布，请稍候',
        duration: 0
      });
      const res = yield call(publishKeyValue, payload);
      if (res.status) {
        message.destroy();
        message.success('发布成功');
        yield put({ type: 'getKeyValueConfig' });
      } else {
        message.destroy();
        message.error(res.msg || '发布失败');
      }
    },
    *offlineKeyValue({ payload }, { call, put }) {
      const res = yield call(offlineKeyValue, payload);
      if (res.status) {
        message.success('下线成功');
        yield put({ type: 'getKeyValueConfig' });
      } else {
        message.error(res.msg || '下线失败');
      }
    },
    *previewKeyValue({ payload }) {
      let { grayCdnUrl, cdnUrl, mode, envName, _id } = payload;
      if (mode === 'gray' && grayCdnUrl) {
        window.open(grayCdnUrl);
      } else if (mode === 'publish' && cdnUrl) {
        window.open(cdnUrl);
      } else {
        window.open(`${apiPrefix}/config/${mode}/${_id}`);
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
