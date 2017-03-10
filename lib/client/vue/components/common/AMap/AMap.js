/**
 * gdMap 组件
 *
 * @props tools - 地图控件
 *
 * @function getloction - 正向地理编码(由地址获取坐标)
 * @function getAddress - 方向地理编码(由坐标获取地址)
 *
 */
const template = require('./AMap.tpl');
const Vue = require('vue');
const GdMap = {
  replace: true,
  template,
  props: {
    tools: {
      type: Boolean,
      default: true
    },
    markers: {
      type: Array,
      default: null
    },
    zoomBol: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      map: {},
      latitude: null,
      longitude: null,
      AMap: {}
    }
  },
  methods: {
    _init(k) {
      return new Promise(function (resolve, reject) {
        window.initTheMap = function () {
          resolve(AMap)
        }
        let script = document.createElement('script')
        script.type = 'text/javascript'
        script.async = true
        script.src = 'http://webapi.amap.com/maps?v=1.3&callback=initTheMap&key=' + k
        script.onerror = reject
        document.head.appendChild(script)
      })
    },
    getloction(temp) {
      let _self = this;
      try {
        AMap.service('AMap.Geocoder', function () {
          let geocoder = new AMap.Geocoder({
            city: ""
          });
          _self.marker.on('mouseup', function (e) {
            _self.latitude = e.lnglat.getLat();
            _self.longitude = e.lnglat.getLng();
            _self.latlng(_self.latitude, _self.longitude);
          });
          _self.marker.setPosition(temp);
          _self.map.setFitView();
        })
      } catch (err) {
        console.log(err);
      }
    },
    getaddress(temp) {
      let _self = this;
      try {
        AMap.service('AMap.Geocoder', function () {
          let geocoder = new AMap.Geocoder({
            city: ""
          });
          _self.marker.on('mouseup', function(e) {
            _self.latitude = e.lnglat.getLat();
            _self.longitude = e.lnglat.getLng();
            _self.latlng(_self.latitude,_self.longitude);
          });
          _self.marker.setPosition(temp);
          _self.map.setFitView();
        })
      }catch(err){
        console.log(err);
      }
    },
    getaddress(temp){
      let _self = this;
      try{
        AMap.service('AMap.Geocoder', function() {
          let geocoder = new AMap.Geocoder({
            city: "",
          });
          geocoder.getLocation(temp, function(status, result) {
            if(status === 'complete' && result.info === 'OK') {
              _self.latitude = result.geocodes[0].location.lat;
              console.log(result.geocodes[0],_self.latitude)
              _self.longitude = result.geocodes[0].location.lng;
              _self.latlng(_self.latitude, _self.longitude);
              let lnglatXY = [_self.longitude, _self.latitude];
              geocoder.getAddress(lnglatXY, function (status, result) {
                if (status === 'complete' && result.info === 'OK') { } else { }
              });
              _self.marker.on('mouseup', function (e) {
                _self.latitude = e.lnglat.getLat();
                _self.longitude = e.lnglat.getLng();
                _self.latlng(_self.latitude, _self.longitude);
              });
              _self.marker.setPosition(lnglatXY);
              _self.map.setFitView();
            } else {
            }
          });

        })
      } catch (err) {
        console.log(err);
      }
    },
    getAddress(lnglatObj) {
      let _self = this;
      try {
        AMap.service('AMap.Geocoder', function () {
          let geocoder = new AMap.Geocoder({
            city: ""
          });
          _self.latitude = lnglatObj.latitude;
          _self.longitude = lnglatObj.longitude;
          let lnglatXY = [_self.longitude, _self.latitude];
          _self.map.setZoomAndCenter(14, lnglatXY);
          _self.marker.setPosition(lnglatXY);
        })
      } catch (err) {

      }
    },
    search(temp) {
      let _self = this;
      AMap.service(["AMap.PlaceSearch"], function () {
        let placeSearch = new AMap.PlaceSearch({
          pageSize: 1,
          pageIndex: 1,
          city: "",
          map: _self.map,
        });
        placeSearch.search(temp);
      })
    },
    latlng(lat, lon) {
      let obj = {
        lat: lat,
        lng: lon
      }
      this.$dispatch('latlnginfo', obj);
    },
    setmarkers(){
      let markers =[];
      for(let i of this.markers){
        let markerPosition = [i.lat,i.lng];
        let marker = new AMap.Marker({
            position: markerPosition,
            icon: "//amappc.cn-hangzhou.oss-pub.aliyun-inc.com/lbs/static/img/marker.png",
            offset: {x: -8,y: -34},
        });
        marker.setLabel({//label默认蓝框白底左上角显示，样式className为：amap-marker-label
            offset: new AMap.Pixel(0, 0),//修改label相对于maker的位置
            content: `<div class="info">
      <h3> 科苑充电站${i.name} 电桩${i.nums}个</h3>
      <p>${i.address}</p>
      <p>慢速${i.nums}个 快速${i.nums}个 超速${i.nums}个</p>
      <p>空闲${i.nums}个 被占用${i.nums}个 异常${i.nums}个</p>
    </div>`
        });
         markers.push(marker);
      }
      let _self = this;
      this.map.plugin(["AMap.MarkerClusterer"], function() {
        let cluster = new AMap.MarkerClusterer(_self.map, markers);
      });
    }
  },
  ready() {
    let center,zooms;
    this.markers!=null?center=[107.928797,38.819045]:center='';
    this.markers!=null?zooms=4 : zooms=14;
    let _self = this;
    this._init('c90051613092039448a887df151d558e').then(AMap => {
      _self.AMap = AMap;
      _self.map = new AMap.Map(_self.$el, {
        center:center,
        resizeEnable: true,
        zoom: zooms,
        zoomEnable: this.zoomBol,
        dragEnable: this.zoomBol,
      })
      if (_self.tools) {
        AMap.plugin(['AMap.ToolBar', 'AMap.Scale', 'AMap.OverView'],
          function () {
            _self.map.addControl(new AMap.ToolBar());
            _self.map.addControl(new AMap.Scale());
          });
      }
      if (!_self.marker&&!_self.markers) {
        _self.marker = new AMap.Marker({ map: _self.map, draggable: true ,offset: {x: -8,y: -34}})
      }
      _self.$nextTick(function () {
        _self.$dispatch('ready', _self.map)
      })
    })
  },
  watch: {
  }
}
module.exports = Vue.component('gd-map', GdMap);