export default {
  type: 'object',
  title: '自定义表单配置',
  properties: {
    UFORM_NO_NAME_FIELD_$1: {
      type: 'object',
      'x-props': {
        labelCol: 6,
        wrapperCol: 16,
      },
      'x-component': 'layout',
      properties: {
        formKey: {
          type: 'string',
          title: '模板标识（建议填写中文）',
          required: true,
        },
        jsonSchema: {
          title: 'schema配置',
          type: 'json',
          'x-component': 'json',
          required: true,
        },
      },
    },
  },
};
