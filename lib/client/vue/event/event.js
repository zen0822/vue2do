const {
  dropMenu: dropMenuHub,
  inputBox: inputBoxHub,
  bubble: bubbleHub,
  dataPicker: dataPickerHub,
  selectTree:selectTreeHub
} = require('components/config/componentHub.json');

COMMON.componentHub[dropMenuHub] = COMMON.componentHub[dropMenuHub] || [];

$('body, html').on('click', () => {
  COMMON.componentHub[dropMenuHub].forEach((component, index) => {
    component.hideMenuItem = true;
  });

  COMMON.componentHub[inputBoxHub].forEach((component, index) => {
    component.fold();
  });

  COMMON.componentHub[bubbleHub].forEach((component, index) => {
    clearTimeout(component.bubbleDisplayCounter);
    component.bubbleDisplay = false;
  });

  COMMON.componentHub[dataPickerHub].forEach((component, index) => {
    component.calendar.show = false;
  });
  
  COMMON.componentHub[selectTreeHub].forEach((component, index) => {
      component.open = false;
});
});
