<p align="center">
  <a href="https://ant.design">
    <img width="200" src="https://static-web.likeevideo.com/as/common-static/pear/img/favicon.png">
  </a>
</p>

<h1 align="center">pear-config</h1>

<div align="center">

前端配置系统，包括但不限于：多语言、图片、文案、链接、时间、活动开关、业务逻辑等功能配置。前端基于配置进行逻辑对接，内容由产品、运营同学维护，分工明确，形成需求闭环，实现一键变更。

![NPM downloads][version-url] ![GitHub last commit](https://img.shields.io/github/last-commit/bigo-frontend/pear-config-admin)

[version-url]: https://img.shields.io/badge/pear--config-v1.0.0-yellow

</div>

## ✨ Features

- 🌈 基于业务需求编写json-schema配置
- 📦 可视化界面，对非技术人员友好
- 🛡 一键变更，历史配置快速回滚
- ⚙️ json静态化，支持高并发
- 🌍 多语言支持
- 🎨 配置diff（todo）

## 🖥 Environment Support

- [Mysql](https://www.mysql.com/)
- [nodejs](https://nodejs.org/en/) (8.0+)

## 📦 Install

```bash
npm install
```

```bash
npm run dev
# open 127.0.0.1:9004
```

## 🔨 Usage

- 新增空间（开源版本暂未对接cdn，故默认填写服务端地址）
![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a33fa9b8a86d42988007024818e15e6a~tplv-k3u1fbpfcp-watermark.image)
- 新增表单配置模板
![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8af504b303c048be87a4e0aef0c846d0~tplv-k3u1fbpfcp-watermark.image)

schema示例：
更多规则请查看：https://uformjs.org/#/MpI2Ij/DVSLSafN
```json
{
  "type": "object",
  "title": "活动表单配置",
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
```
- 新增json内容
![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e1a661b129a84848b16bf5ecacb7151d~tplv-k3u1fbpfcp-watermark.image)
- 发布json
- 业务使用get请求获取json内容
curl http://127.0.0.1:9005/public/json/10000000001.json

## 🔗 Links

- [前端配置系统pear](https://github.com/bigo-frontend/blog/issues/8)
- [记一次页面配置化的实践](https://github.com/bigo-frontend/blog/issues/4)