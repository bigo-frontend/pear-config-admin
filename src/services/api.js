import { stringify } from 'qs';
import request from '@/utils/request';
import config from '../../config/admin.config.js';

let { apiPrefix, homePageUrl } = config;

// tag
export async function getTagList(params) {
  return request(`${apiPrefix}/keyValue/tags`, {
    method: 'GET',
  });
}

export async function updateTags(params) {
  let { _id, ...rest } = params;
  return request(`${apiPrefix}/keyValue/${_id}/tags`, {
    method: 'PUT',
    body: rest,
  });
}

// editor
export async function updateEditors(params) {
  let { _id, ...rest } = params;
  return request(`${apiPrefix}/keyValue/${_id}/editors`, {
    method: 'PUT',
    body: rest,
  });
}

// env
export async function getEnvList(params) {
  return request(`${apiPrefix}/env`, {
    method: 'GET',
  });
}

export async function createEnv(params) {
  return request(`${apiPrefix}/env`, {
    method: 'POST',
    body: params,
  });
}

export async function editEnv(params) {
  return request(`${apiPrefix}/env`, {
    method: 'PUT',
    body: params,
  });
}

// form
export async function getFormConfig(params) {
  return request(`${apiPrefix}/form?${stringify(params)}`, {
    method: 'GET',
  });
}

export async function getFormConfigDetail(params) {
  if (params.formId) {
    return request(`${apiPrefix}/form/${params.formId}`, {
      method: 'GET',
    });
  } else {
    return request(`${apiPrefix}/form/detail`, {
      method: 'POST',
      body: params,
    });
  }
}

export async function createFormConfig(params) {
  return request(`${apiPrefix}/form`, {
    method: 'POST',
    body: params,
  });
}

export async function editFormConfig(params) {
  let { _id, ...rest } = params;
  return request(`${apiPrefix}/form/${_id}`, {
    method: 'PUT',
    body: rest,
  });
}

export async function deleteFormConfig({ _id }) {
  return request(`${apiPrefix}/form/${_id}`, {
    method: 'DELETE',
    body: {},
  });
}

export async function submitPageConfig(params) {
  return request(params.requestUrl, {
    method: params.requestMethod,
    body: params.payload,
  });
}

// keyValue
export async function getKeyValueConfig(params) {
  return request(`${apiPrefix}/keyValue?${stringify(params)}`, {
    method: 'GET',
  });
}

export async function createKeyValue(params) {
  return request(`${apiPrefix}/keyValue`, {
    method: 'POST',
    body: params,
  });
}

export async function copyKeyValue(params) {
  return request(`${apiPrefix}/keyValue/copy`, {
    method: 'POST',
    body: params,
  });
}

export async function editKeyValue(params) {
  let { _id, ...rest } = params;
  return request(`${apiPrefix}/keyValue/${_id}`, {
    method: 'PUT',
    body: rest,
  });
}

export async function deleteKeyValue({ _id }) {
  return request(`${apiPrefix}/keyValue/${_id}`, {
    method: 'DELETE',
    body: {},
  });
}

export async function publishKeyValue(params) {
  return request(`${apiPrefix}/keyValue/updateStatus`, {
    method: 'POST',
    body: {
      ...params
    },
  });
}

export async function offlineKeyValue(params) {
  return request(`${apiPrefix}/keyValue/updateStatus`, {
    method: 'POST',
    body: {
      ...params,
      status: 'offline',
    },
  });
}

// keyValueDraft
export async function getKeyValueDraft(params) {
  return request(`${apiPrefix}/keyValueDraft?${stringify(params)}`, {
    method: 'GET',
  });
}

export async function rollbackKeyValue(params) {
  return request(`${apiPrefix}/keyValueDraft/rollback`, {
    method: 'POST',
    body: params,
  });
}
