import exception from './en-US/exception';
import form from './en-US/form';
import globalHeader from './en-US/globalHeader';
import login from './en-US/login';
import menu from './en-US/menu';
import result from './en-US/result';
import settings from './en-US/settings';
import pwa from './en-US/pwa';

export default {
  'navBar.lang': 'Languages',
  'layout.user.link.help': 'Help',
  'layout.user.link.privacy': 'Privacy',
  'layout.user.link.terms': 'Terms',
  ...exception,
  ...form,
  ...globalHeader,
  ...login,
  ...menu,
  ...result,
  ...settings,
  ...pwa,
};
