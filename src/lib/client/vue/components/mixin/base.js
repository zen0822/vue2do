module.exports = {
  methods: {
    _init: function(){
      this._binder();
    },
    _binder: function(){
      //TODO
    },
    transformCssUnit: function(val){
      var type = isNaN(val);
      val = type ? val : val + 'px';
      return val;
    }
  },
  ready: function(){
    this._init();
  }
}