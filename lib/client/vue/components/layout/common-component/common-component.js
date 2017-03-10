require('components/base/pop/pop');
require('components/base/bubble/bubble');

const template = require('./common-component.tpl');

module.exports = {
	name: "CommonComponent",

	template,

	props: {
		loadingTheme: {
			type: String,
			default: "primary"
		}
	},

	data: () => {
    return {
      setTimeoutSecond: 500,
			banBubbleDisplay: false
    }
  },

	methods: {
		isBanBubbleDisplay() {
			if (this.banBubbleDisplay) {
				return false;
			}

			this.banBubbleDisplayTimeout = setTimeout(() => {
				this.banBubbleDisplay = false;
			}, this.setTimeoutSecond);
		}
	}
}