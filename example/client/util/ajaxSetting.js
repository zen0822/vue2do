const token = SAAS.TOKEN;

if (token) {
  $.ajaxSettings.headers = { token: token }
}