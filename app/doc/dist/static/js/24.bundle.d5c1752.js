(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{540:function(t,e,l){"use strict";l.d(e,"g",(function(){return z})),l.d(e,"f",(function(){return f})),l.d(e,"e",(function(){return u})),l.d(e,"c",(function(){return d})),l.d(e,"a",(function(){return h})),l.d(e,"d",(function(){return g}));for(var o=l(107),c=l(12),a=l(163),n=l(41),i=Object(o.c)(),r=[],b=0;b<33;b++)r.push({text:"test-"+b,name:"name-"+b,size:"size-"+b,en:"en-"+b,value:b});var s=Object(n.e)("VUE2DO"),u=Object(n.e)(r),p=(Object(o.b)(c.appContent.get),Object(o.b)(c.compStage.get)),z=(Object(o.b)(c.deviceSize.get),Object(o.b)(c.typeUI.get)),f=Object(o.b)(c.typeTheme.get),d=function(t){var e=t.currentTarget;p.scrollTop=e.offsetTop},h=function(t,e){return t.path+"#"+e},g=function(){function t(){var t=document.querySelector(".z-css-device-size"),e="";t&&(e=getComputedStyle(t,":after").getPropertyValue("content"),i.dispatch(c.deviceSize,e))}window.addEventListener("resize",Object(a.a)(t,100)),t()},m={store:i,methods:{_initComp:function(){},anchorLink:function(t){return this.$route.path+"#"+t},goAnchor:function(t){var e=t.currentTarget;this.compStage.scrollTop=e.offsetTop}},computed:{varPrefix:function(){return s},testOpt:function(){return r},appContent:function(){return this.$store.getters[c.appContent.get]},compStage:function(){return this.$store.getters[c.compStage.get]},typeUI:function(){return this.$store.getters[c.typeUI.get]},typeTheme:function(){return this.$store.getters[c.typeTheme.get]},deviceSize:function(){return this.$store.getters[c.deviceSize]}},mounted:function(){var t=this;function e(){var e=document.querySelector(".z-css-device-size"),l="";e&&(l=getComputedStyle(e,":after").getPropertyValue("content"),t.$store.dispatch(c.deviceSize,l))}this._initComp(),window.addEventListener("resize",Object(a.a)(e,100)),e()}};e.b=m},588:function(t,e,l){},589:function(t,e,l){var o=l(131);t.exports=function(t){var e,l="",c={};return c.section=e=function(t,c){var a=this&&this.block;this&&this.attributes,l=l+'<section><router-link class="anchor-title"'+o.attr("id",t,!0,!0)+' tag="h1"'+o.attr(":to",'anchorLink("'+t+'")',!0,!0)+'><span @click="goAnchor">'+o.escape(null==(e=c)?"":e)+"</span></router-link>",a?a&&a():l+="<p>暂无内容</p>",l+="</section>"},l+='<div><article class="example-article">',c.section.call({block:function(){l=l+'<z-scroller :height="150"><p>这是滚动内容 请滑动 (滚动)</p><p>这是滚动内容 请滑动 (滚动)</p><p>这是滚动内容 请滑动 (滚动)</p><p>这是滚动内容 请滑动 (滚动)</p><p>这是滚动内容 请滑动 (滚动)</p><p>这是滚动内容 请滑动 (滚动)</p></z-scroller><z-code :theme="typeTheme">'+o.escape(null==(e='<z-scroller :height="150">')?"":e)+"\n  "+o.escape(null==(e="<p>这是滚动内容 请滑动 (滚动)</p>")?"":e)+"\n  "+o.escape(null==(e="<p>这是滚动内容 请滑动 (滚动)</p>")?"":e)+"\n  "+o.escape(null==(e="<p>这是滚动内容 请滑动 (滚动)</p>")?"":e)+"\n  "+o.escape(null==(e="<p>这是滚动内容 请滑动 (滚动)</p>")?"":e)+"\n  "+o.escape(null==(e="<p>这是滚动内容 请滑动 (滚动)</p>")?"":e)+"\n  "+o.escape(null==(e="<p>这是滚动内容 请滑动 (滚动)</p>")?"":e)+"\n"+o.escape(null==(e="</z-scroller>")?"":e)+"</z-code>"}},"start","开始使用"),c.section.call({block:function(){l+='<z-table border="row" auto :pageSize="10"><template slot="thead" v-for="(item, index) in [&quot;名字&quot;, &quot;类型&quot;, &quot;可选值&quot;, &quot;说明&quot;]"><z-table-col :max-width="index === 3 ? &quot;23px&quot; : &quot;&quot;">{{ item }}</z-table-col></template><z-table-row slot="1"><z-table-col>height</z-table-col><z-table-col>String, number</z-table-col><z-table-col>( *\'100%\' | \'auto\' | {Number} )</z-table-col><z-table-col>滚动区域的最大高度</z-table-col></z-table-row><z-table-row slot="2"><z-table-col>width</z-table-col><z-table-col>String, number</z-table-col><z-table-col>( *\'100%\' | \'auto\' | {Number} )</z-table-col><z-table-col>滚动区域的最大宽度</z-table-col></z-table-row><z-table-row slot="3"><z-table-col>autoHide</z-table-col><z-table-col>Boolean</z-table-col><z-table-col>——</z-table-col><z-table-col>自动隐藏滚动条, 默认为 false</z-table-col></z-table-row></z-table>'}},"props","props 数据类型"),c.section.call({block:function(){l+='<z-table border="row" auto :pageSize="10"><template slot="thead" v-for="item in [&quot;名字&quot;, &quot;返回值类型&quot;, &quot;说明&quot;]"><z-table-col>{{ item }}</z-table-col></template><z-table-row slot="1"><z-table-col>scrollY</z-table-col><z-table-col>Object</z-table-col><z-table-col><p>X 轴的滚动事件, 以下的为返回值说明</p><ul><li>isRight - 滚动条是否到结束的地方</li><li>isLeft - 滚动条是否到开始的地方</li><li>top - 滚动条到滚动区域的顶部的当前距离</li><li>offset - 滚动条离滚动区域的顶部的距离</li></ul></z-table-col></z-table-row><z-table-row slot="2"><z-table-col>scrollX</z-table-col><z-table-col>Object</z-table-col><z-table-col><p>Y 轴的滚动事件, 以下的为返回值说明</p><ul><li>isBottom - 滚动条是否到低</li><li>isTop - 滚动条是否到顶</li><li>top - 滚动条到滚动区域的顶部的当前距离</li><li>offset - 滚动条离滚动区域的顶部的距离</li></ul></z-table-col></z-table-row><z-table-row slot="3"><z-table-col>changeYBar</z-table-col><z-table-col>Object</z-table-col><z-table-col><p>x-bar 滚动条改变</p><ul><li>isRight - 滚动条是否到结束的地方</li><li>isLeft - 滚动条是否到开始的地方</li><li>top - 滚动条到滚动区域的顶部的当前距离</li><li>offset - 滚动条离滚动区域的顶部的距离</li></ul></z-table-col></z-table-row><z-table-row slot="4"><z-table-col>scrollX</z-table-col><z-table-col>Object</z-table-col><z-table-col><p>y-bar 滚动条改变</p><ul><li>isBottom - 滚动条是否到低</li><li>isTop - 滚动条是否到顶</li><li>top - 滚动条到滚动区域的顶部的当前距离</li><li>offset - 滚动条离滚动区域的顶部的距离</li></ul></z-table-col></z-table-row><z-table-row slot="5"><z-table-col>changeHeight</z-table-col><z-table-col>Object</z-table-col><z-table-col>滚动内容的高度变化</z-table-col></z-table-row></z-table>'}},"events","events 组件事件"),l+="</article></div>"}},631:function(t,e,l){"use strict";l.r(e),l(588);var o=l(589),c=l.n(o),a=l(540);e.default={name:"PageCompScroller",template:c()(),mixins:[a.b],data:function(){return{testName:"test"}}}}}]);