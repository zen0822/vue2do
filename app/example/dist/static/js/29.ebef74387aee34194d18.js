(window.webpackJsonp=window.webpackJsonp||[]).push([[29],{475:function(e,t,n){"use strict";for(var o=n(84),i=n(10),s=n(136),r=[],c=0;c<33;c++)r.push({text:"test-"+c,name:"name-"+c,size:"size-"+c,en:"en-"+c,value:c});t.a={store:o.a,methods:{_initComp:function(){},anchorLink:function(e){return this.$route.path+"#"+e},goAnchor:function(e){var t=e.currentTarget;this.compStage.scrollTop=t.offsetTop}},computed:{varPrefix:function(){return"VUE2DO"},testOpt:function(){return r},appContent:function(){return this.$store.getters[i.appContent.get]},compStage:function(){return this.$store.getters[i.compStage.get]},typeUI:function(){return this.$store.getters[i.typeUI.get]},typeTheme:function(){return this.$store.getters[i.typeTheme.get]},deviceSize:function(){return this.$store.getters[i.deviceSize]}},mounted:function(){var n=this;this._initComp();var e=function(){var e=document.querySelector(".z-css-device-size"),t="";e&&(t=getComputedStyle(e,":after").getPropertyValue("content"),n.$store.dispatch(i.deviceSize,t))};window.addEventListener("resize",Object(s.a)(e,100)),e()}}},536:function(e,t,n){var s=n(102);e.exports=function(e){var o,i="",t={};return t.section=o=function(e,t){var n=this&&this.block;this&&this.attributes,i=i+'<section><router-link class="anchor-title"'+s.attr("id",e,!0,!0)+' tag="h1"'+s.attr(":to",'anchorLink("'+e+'")',!0,!0)+'><span @click="goAnchor">'+s.escape(null==(o=t)?"":o)+"</span></router-link>",n?n&&n():i+="<p>暂无内容</p>",i+="</section>"},i+='<div class="component-transition"><article class="example-article">',t.section.call({block:function(){i=i+'<z-btn :ui="typeUI" :theme="typeTheme" @click="fold">折叠</z-btn><z-btn class="z-css-m-l" :ui="typeUI" :theme="typeTheme" @click="unfold">展开</z-btn><div class="transitioner"><z-motion-fold display ref="fold" :height="30" :offset="100"><div>我被折叠展开了！</div></z-motion-fold></div><z-code type="html" :theme="typeTheme">'+s.escape(null==(o='<z-btn @click="fold">')?"":o)+"\n  折叠\n"+s.escape(null==(o="</z-btn>")?"":o)+"\n\n"+s.escape(null==(o='<z-btn @click="unfold">')?"":o)+"\n  展开\n"+s.escape(null==(o="</z-btn>")?"":o)+"\n\n"+s.escape(null==(o='<z-motion-fold ref="fold">')?"":o)+"\n  "+s.escape(null==(o="<div>我被折叠展开了！</div>")?"":o)+"\n"+s.escape(null==(o="</z-motion-fold>")?"":o)+'</z-code><z-code type="js" :theme="typeTheme">...\n  methods: {\n    fold() {\n      this.$refs.fold.enter()\n    },\n    unfold() {\n      this.$refs.fold.leave()\n    }\n  }</z-code>'}},"fold","折叠"),i+="</article></div>"}},569:function(e,t,n){"use strict";n.r(t);var o=n(536),i=n.n(o),s=n(475);t.default={name:"PageCompMotionFold",template:i()(),mixins:[s.a],data:function(){return{testName:"test"}},methods:{unfold:function(){this.$refs.fold.enter()},fold:function(){this.$refs.fold.leave()}}}}}]);