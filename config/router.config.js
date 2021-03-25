/**
 *
 *
 * @param name 路由名称，显示名称
 * @param icon 路由图标
 * @param path 路由地址
 * @param component 组件
 * @param routes 子路由
 * @param authority 权限：满足角色权限的才展示
 * @param hideInMenu 是否隐藏该项
 * @param hideChildrenInMenu 是否隐藏子菜单
 */

export default [
  {
    path: '/exception/401',
    name: '401',
    component: './Exception/401',
  },
  {
    path: '/selectEnv',
    name: 'selectEnv',
    component: './SelectEnv',
    Routes: ['src/pages/Authorized']
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      { path: '/', redirect: '/home' },
      {
        name: '欢迎页',
        icon: 'smile',
        path: '/home',
        component: './Document',
      },
      {
        icon: 'unordered-list',
        name: 'k-v管理',
        path: '/keyValueManagement/',
        routes: [
          {
            name: '命名空间管理',
            path: '/keyValueManagement/env',
            component: './KeyValueManagement/env',
            authority: ['superAdmin'],
          },
          {
            name: 'k-v配置',
            path: '/keyValueManagement/keyValue',
            component: './KeyValueManagement/keyValue',
          },
        ],
      },
      {
        name: '异常页',
        icon: 'warning',
        path: '/exception',
        hideInMenu: true,
        routes: [
          {
            path: '/exception/403',
            name: '403',
            component: './Exception/403',
          },
          {
            path: '/exception/404',
            name: '404',
            component: './Exception/404',
          },
          {
            path: '/exception/500',
            name: '500',
            component: './Exception/500',
          },
        ],
      },
      {
        icon: 'control',
        name: '系统管理',
        path: '/systemManagement/',
        authority: ['superAdmin'],
        routes: [
          {
            name: '表单模板',
            path: '/systemManagement/formManagement',
            component: './FormManagement',
            authority: ['superAdmin'],
          },
        ],
      },
      {
        component: '404',
      },
    ],
  },
];
