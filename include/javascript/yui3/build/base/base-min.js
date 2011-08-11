/*
 Copyright (c) 2010, Yahoo! Inc. All rights reserved.
 Code licensed under the BSD License:
 http://developer.yahoo.com/yui/license.html
 version: 3.3.0
 build: 3167
 */
YUI.add("base-base",function(b){var i=b.Object,k=b.Lang,j=".",g="destroy",p="init",o="initialized",h="destroyed",d="initializer",m="bubbleTargets",e="_bubbleTargets",c=Object.prototype.constructor,l="deep",q="shallow",n="destructor",a=b.Attribute;function f(){b.stamp(this);a.call(this);var r=b.Plugin&&b.Plugin.Host;if(this._initPlugins&&r){r.call(this);}if(this._lazyAddAttrs!==false){this._lazyAddAttrs=true;}this.name=this.constructor.NAME;this._eventPrefix=this.constructor.EVENT_PREFIX||this.constructor.NAME;this.init.apply(this,arguments);}f._ATTR_CFG=a._ATTR_CFG.concat("cloneDefaultValue");f.NAME="base";f.ATTRS={initialized:{readOnly:true,value:false},destroyed:{readOnly:true,value:false}};f.prototype={init:function(r){this._yuievt.config.prefix=this._eventPrefix;this.publish(p,{queuable:false,fireOnce:true,defaultTargetOnly:true,defaultFn:this._defInitFn});this._preInitEventCfg(r);this.fire(p,{cfg:r});return this;},_preInitEventCfg:function(s){if(s){if(s.on){this.on(s.on);}if(s.after){this.after(s.after);}}var t,r,v,u=(s&&m in s);if(u||e in this){v=u?(s&&s.bubbleTargets):this._bubbleTargets;if(k.isArray(v)){for(t=0,r=v.length;t<r;t++){this.addTarget(v[t]);}}else{if(v){this.addTarget(v);}}}},destroy:function(){this.publish(g,{queuable:false,fireOnce:true,defaultTargetOnly:true,defaultFn:this._defDestroyFn});this.fire(g);this.detachAll();return this;},_defInitFn:function(r){this._initHierarchy(r.cfg);if(this._initPlugins){this._initPlugins(r.cfg);}this._set(o,true);},_defDestroyFn:function(r){this._destroyHierarchy();if(this._destroyPlugins){this._destroyPlugins();}this._set(h,true);},_getClasses:function(){if(!this._classes){this._initHierarchyData();}return this._classes;},_getAttrCfgs:function(){if(!this._attrs){this._initHierarchyData();}return this._attrs;},_filterAttrCfgs:function(v,s){var t=null,r,u=v.ATTRS;if(u){for(r in u){if(u.hasOwnProperty(r)&&s[r]){t=t||{};t[r]=s[r];delete s[r];}}}return t;},_initHierarchyData:function(){var t=this.constructor,s=[],r=[];while(t){s[s.length]=t;if(t.ATTRS){r[r.length]=t.ATTRS;}t=t.superclass?t.superclass.constructor:null;}this._classes=s;this._attrs=this._aggregateAttrs(r);},_aggregateAttrs:function(y){var v,z,u,r,A,s,x,t=f._ATTR_CFG,w={};if(y){for(s=y.length-1;s>=0;--s){z=y[s];for(v in z){if(z.hasOwnProperty(v)){u=b.mix({},z[v],true,t);r=u.value;x=u.cloneDefaultValue;if(r){if((x===undefined&&(c===r.constructor||k.isArray(r)))||x===l||x===true){u.value=b.clone(r);}else{if(x===q){u.value=b.merge(r);}}}A=null;if(v.indexOf(j)!==-1){A=v.split(j);v=A.shift();}if(A&&w[v]&&w[v].value){i.setValue(w[v].value,A,r);}else{if(!A){if(!w[v]){w[v]=u;}else{b.mix(w[v],u,true,t);}}}}}}}return w;},_initHierarchy:function(w){var t=this._lazyAddAttrs,x,y,z,u,s,v=this._getClasses(),r=this._getAttrCfgs();for(z=v.length-1;z>=0;z--){x=v[z];y=x.prototype;if(x._yuibuild&&x._yuibuild.exts){for(u=0,s=x._yuibuild.exts.length;u<s;u++){x._yuibuild.exts[u].apply(this,arguments);}}this.addAttrs(this._filterAttrCfgs(x,r),w,t);if(y.hasOwnProperty(d)){y.initializer.apply(this,arguments);}}},_destroyHierarchy:function(){var v,s,u,r,t=this._getClasses();for(u=0,r=t.length;u<r;u++){v=t[u];s=v.prototype;if(s.hasOwnProperty(n)){s.destructor.apply(this,arguments);}}},toString:function(){return this.name+"["+b.stamp(this,true)+"]";}};b.mix(f,a,false,null,1);f.prototype.constructor=f;b.Base=f;},"3.3.0",{requires:["attribute-base"]});YUI.add("base-pluginhost",function(c){var a=c.Base,b=c.Plugin.Host;c.mix(a,b,false,null,1);a.plug=b.plug;a.unplug=b.unplug;},"3.3.0",{requires:["base-base","pluginhost"]});YUI.add("base-build",function(d){var b=d.Base,a=d.Lang,c;b._build=function(f,n,r,v,u,q){var w=b._build,g=w._ctor(n,q),k=w._cfg(n,q),t=w._mixCust,p=k.aggregates,e=k.custom,j=g._yuibuild.dynamic,o,m,h,s;if(j&&p){for(o=0,m=p.length;o<m;++o){h=p[o];if(n.hasOwnProperty(h)){g[h]=a.isArray(n[h])?[]:{};}}}for(o=0,m=r.length;o<m;o++){s=r[o];d.mix(g,s,true,null,1);t(g,s,p,e);g._yuibuild.exts.push(s);}if(v){d.mix(g.prototype,v,true);}if(u){d.mix(g,w._clean(u,p,e),true);t(g,u,p,e);}g.prototype.hasImpl=w._impl;if(j){g.NAME=f;g.prototype.constructor=g;}return g;};c=b._build;d.mix(c,{_mixCust:function(g,f,i,h){if(i){d.aggregate(g,f,true,i);}if(h){for(var e in h){if(h.hasOwnProperty(e)){h[e](e,g,f);}}}},_tmpl:function(e){function f(){f.superclass.constructor.apply(this,arguments);}d.extend(f,e);return f;},_impl:function(h){var n=this._getClasses(),m,f,e,k,o,g;for(m=0,f=n.length;m<f;m++){e=n[m];if(e._yuibuild){k=e._yuibuild.exts;o=k.length;for(g=0;g<o;g++){if(k[g]===h){return true;}}}}return false;},_ctor:function(e,f){var h=(f&&false===f.dynamic)?false:true,i=(h)?c._tmpl(e):e,g=i._yuibuild;if(!g){g=i._yuibuild={};}g.id=g.id||null;g.exts=g.exts||[];g.dynamic=h;return i;},_cfg:function(e,f){var g=[],j={},i,h=(f&&f.aggregates),l=(f&&f.custom),k=e;while(k&&k.prototype){i=k._buildCfg;if(i){if(i.aggregates){g=g.concat(i.aggregates);}if(i.custom){d.mix(j,i.custom,true);}}k=k.superclass?k.superclass.constructor:null;}if(h){g=g.concat(h);}if(l){d.mix(j,f.cfgBuild,true);}return{aggregates:g,custom:j};},_clean:function(m,k,g){var j,f,e,h=d.merge(m);for(j in g){if(h.hasOwnProperty(j)){delete h[j];}}for(f=0,e=k.length;f<e;f++){j=k[f];if(h.hasOwnProperty(j)){delete h[j];}}return h;}});b.build=function(g,e,h,f){return c(g,e,h,null,null,f);};b.create=function(e,h,g,f,i){return c(e,h,g,f,i);};b.mix=function(e,f){return c(null,e,f,null,null,{dynamic:false});};b._buildCfg={custom:{ATTRS:function(j,h,f){h.ATTRS=h.ATTRS||{};if(f.ATTRS){var g=f.ATTRS,i=h.ATTRS,e;for(e in g){if(g.hasOwnProperty(e)){i[e]=i[e]||{};d.mix(i[e],g[e],true);}}}}},aggregates:["_PLUG","_UNPLUG"]};},"3.3.0",{requires:["base-base"]});YUI.add("base",function(a){},"3.3.0",{after:["attribute-complex"],use:["base-base","base-pluginhost","base-build"]});
