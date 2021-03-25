const s1 = require('@/assets/doc/s1.png');
const s2 = require('@/assets/doc/s2.png');
const s3 = require('@/assets/doc/s3.png');
const s4 = require('@/assets/doc/s4.png');
const s5 = require('@/assets/doc/s5.png');
const s6 = require('@/assets/doc/s6.png');

export default `

# **欢迎使用pear-config**

pear，雪梨，与键值对（key-value pair）的pair发音相同，是一款企业级Key-Value配置平台。

___

## 我们提供了常用业务场景的解决方案

- ✔ key-value管理
- - ✔ 命名空间管理：为不同业务线分配专属空间
- - ✔ k-v配置
- - - ✔ 基于jsonSchema生成k-v配置表单
- - - ✔ 填写配置表单快速生成k-v配置
- - - ✔ 一键发布，一键回滚
- ✔ 系统管理
- - ✔ 表单管理：基于UForm，以jsonSchema生成表单模板，具体请点击[传送门](https://uformjs.org/#/MpI2Ij/dNFzFyTb)

## 快速上手

### step1. 选择业务空间，每个空间对应一个域名，用于区分业务

![](${s1})

### step2. 进入pear配置平台，选择k-v管理中的k-v配置

[k-v配置](/#/keyValueManagement/keyValue)

### step3. 新建配置，首选选择一个表单模板，你可以选择推荐的表单模板，也可以自定义表单模板

关于更多表单模板的信息，请查看[README文档](https://github.com/bigo-frontend/pear-config-server)

![](${s3})

### step4. 根据表单模板提示，录入配置信息

![](${s4})

### step5. 点击预览，预览配置结果

![](${s5})

### step6. 如果你有权限，可以点击发布按钮

![](${s6})

___


`