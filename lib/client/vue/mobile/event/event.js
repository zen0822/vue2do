const {
  dropMenu: dropMenuHub,
  inputBox: inputBoxHub,
  bubble: bubbleHub
} = require('components/config/componentHub.json');

COMMON.componentHub[dropMenuHub] = COMMON.componentHub[dropMenuHub] || [];

$(window).on('click', () => {
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
});