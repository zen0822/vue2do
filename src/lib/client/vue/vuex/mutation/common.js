module.exports = {
  //设置面包屑导航
  SET_BREAD_CRUMB(state, breadCrumbArr) {
    state.breadCrumb = breadCrumbArr;
  },

  //设置alert的message
  SET_ALERT_MESSAGE(state, text) {
    state.alertInfo = text;
  }
}