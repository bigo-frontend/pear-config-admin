const envCreate = {
  "type": "object",
  "properties": {
    "UFORM_NO_NAME_FIELD_$1": {
      "type": "object",
      "x-props": {
        "labelCol": 6,
        "wrapperCol": 16
      },
      "x-component": "layout",
      "properties": {
        "name": {
          "type": "string",
          "title": "空间名称",
          "required": true
        },
        "desc": {
          "type": "string",
          "title": "空间描述"
        },
        "cdnDomain": {
          "type": "string",
          "title": "cdn访问域名",
          "required": true,
          "x-rules": [
            {
              "pattern": "http(s)?:\\/\\/([\\w-]+\\.)+[\\w-]+(\\/[\\w- .\\/?%&=]*)?",
              "message": "必须是有效域名"
            }
          ],
        },
      }
    }
  }
}

const envEdit = JSON.parse(JSON.stringify(envCreate));

envEdit["properties"]["UFORM_NO_NAME_FIELD_$1"]["properties"]["name"]["x-props"] = {
  "editable": false
};

export default {
  envCreate,
  envEdit,
  keyValueDefault: {
    "type": "object",
    "title": "自定义表单配置",
    "properties": {
      "key": {
        "type": "string",
        "title": "键"
      },
      "value": {
        "title": "值",
        "type": "json",
        "x-component": "json",
      },
    }
  },
  keyValueCustom: {
    "type": "object",
    "title": "通用表单配置",
    "properties": {
      "radio": {
        "type": "radio",
        "enum": [
          "1",
          "2",
          "3",
          "4"
        ],
        "title": "Radio"
      },
      "select": {
        "type": "string",
        "enum": [
          "1",
          "2",
          "3",
          "4"
        ],
        "title": "Select",
        "required": true
      },
      "checkbox": {
        "type": "checkbox",
        "enum": [
          "1",
          "2",
          "3",
          "4"
        ],
        "title": "Checkbox",
        "required": true
      },
      "textarea": {
        "type": "string",
        "x-component": "textarea",
        "title": "TextArea"
      },
      "number": {
        "type": "number",
        "title": "数字选择"
      },
      "boolean": {
        "type": "boolean",
        "title": "开关选择"
      },
      "date": {
        "type": "date",
        "title": "日期选择"
      },
      "daterange": {
        "type": "daterange",
        "default": [
          "2018-12-19",
          "2018-12-19"
        ],
        "title": "日期范围"
      },
      "year": {
        "type": "year",
        "title": "年份"
      },
      "time": {
        "type": "time",
        "title": "时间"
      },
      "upload": {
        "type": "uploadImage",
        "x-props": {
          "listType": "card"
        },
        "title": "卡片上传文件"
      },
      "range": {
        "type": "range",
        "x-props": {
          "min": 0,
          "max": 1024,
          "marks": [
            0,
            1024
          ]
        },
        "title": "范围选择"
      },
      "rating": {
        "type": "rating",
        "title": "等级"
      }
    }
  }
}