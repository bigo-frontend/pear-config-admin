import exception from './zh-CN/exception';
import form from './zh-CN/form';
import globalHeader from './zh-CN/globalHeader';
import login from './zh-CN/login';
import menu from './zh-CN/menu';
import result from './zh-CN/result';
import settings from './zh-CN/settings';
import pwa from './zh-CN/pwa';

export default {
  'navBar.lang': '语言',
  'layout.user.link.help': '帮助',
  'layout.user.link.privacy': '隐私',
  'layout.user.link.terms': '条款',
  ...exception,
  ...form,
  ...globalHeader,
  ...login,
  ...menu,
  ...result,
  ...settings,
  ...pwa,
};
