//设置面包屑导航 curmbs导航数组
const setBreadCrumb = ({dispatch, state}, breadCrumbArr) => {
  return dispatch('SET_BREAD_CRUMB', breadCrumbArr);
}

//设置alert的message
const setAlertInfo = ({dispatch, state}, text) => {
  return dispatch('SET_ALERT_MESSAGE', text)
}

module.exports = {
  setBreadCrumb,
  setAlertInfo
}