parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"qKVu":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Canvas=void 0;var t=function(){function t(){this._canvas=document.createElement("canvas"),this._setCanvasSize(),this._ctx=this._canvas.getContext("2d"),document.body.appendChild(this._canvas)}return t.prototype._setCanvasSize=function(){this._canvas.width=window.innerWidth,this._canvas.height=window.innerHeight},t.prototype.clear=function(){this._ctx.clearRect(0,0,this._canvas.width,this._canvas.height),this._ctx.fillStyle="black",this._ctx.fillRect(0,0,this._canvas.width,this._canvas.height)},t.prototype.drawBackground=function(t){this._ctx.globalCompositeOperation="multiply",this._ctx.drawImage(t,0,0,this._canvas.width,this._canvas.height),this._ctx.globalCompositeOperation="source-over"},t.prototype.draw=function(t){var i=this;t.forEach(function(t){return t.draw(i._ctx)})},t}();exports.Canvas=t;
},{}],"t7BI":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.getAngle=exports.normalize=exports.toRadians=void 0;var e=function(e){return e*Math.PI/180};exports.toRadians=e;var t=function(e){var t=2*Math.PI,r=e%t;return r>=0?r:r+t};exports.normalize=t;var r=function(e,t){return(0,exports.normalize)(Math.atan2(t.y-e.y,t.x-e.x))};exports.getAngle=r;
},{}],"LgWH":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.getIntersection=exports.areParallel=void 0;var e=function(e,t){return e.angle===t.angle};exports.areParallel=e;var t=function(e,t){if((0,exports.areParallel)(e,t))return null;var r=e.start.x,a=e.start.y,n=e.start.x+Math.cos(e.angle),l=e.start.y+Math.sin(e.angle),s=t.start.x,o=t.start.y,u=t.end.x,i=t.end.y,x=(r-n)*(o-i)-(a-l)*(s-u);if(0===x)return null;var c=((r-s)*(o-i)-(a-o)*(s-u))/x,p=-((r-n)*(a-o)-(a-l)*(r-s))/x;return c>=0&&p>=0&&p<=1?{x:r+c*(n-r),y:a+c*(l-a),distance:c}:null};exports.getIntersection=t;
},{}],"y8I9":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Ray=void 0;var t=require("./math/radian"),e=require("./math/intersection"),n=function(){function n(e,n){this.start=e,this.angle=n,this._color="red",this._end=null,this.angle=(0,t.normalize)(n)}return Object.defineProperty(n.prototype,"end",{get:function(){return this._end?this._end:{x:this.start.x+1e3*Math.cos(this.angle),y:this.start.y+1e3*Math.sin(this.angle)}},enumerable:!1,configurable:!0}),n.prototype.draw=function(t){t.strokeStyle=this._color,t.beginPath(),t.moveTo(this.start.x,this.start.y),t.lineTo(this.end.x,this.end.y),t.stroke()},n.prototype.cast=function(t){var n=this;this._end=null;var i=1/0;t.forEach(function(t){var r=(0,e.getIntersection)(n,t);r&&r.distance<i&&(i=r.distance,n._end=r)})},n}();exports.Ray=n;
},{"./math/radian":"t7BI","./math/intersection":"LgWH"}],"q2x3":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Lamp=void 0;var t=require("./math/radian"),e=require("./ray"),i=function(){function i(t){this._getPlace=t,this._position={x:0,y:0}}return Object.defineProperty(i.prototype,"position",{get:function(){return this._position},enumerable:!1,configurable:!0}),i.prototype.update=function(){this._updatePosition()},i.prototype.createRays=function(i){var o=this,n=i.flatMap(function(t){return[t.start,t.end]}),r=new Set(n.flatMap(function(e){var i=(0,t.getAngle)(o._position,e);return[i-1e-4,i,i+1e-4]}));return Array.from(r).map(function(t){return new e.Ray(o._position,t)})},i.prototype.draw=function(t){t.fillStyle="yellow",t.beginPath(),t.arc(this._position.x,this._position.y,5,0,2*Math.PI),t.fill()},i.prototype._updatePosition=function(){this._position=this._getPlace()},i}();exports.Lamp=i;
},{"./math/radian":"t7BI","./ray":"y8I9"}],"NEjJ":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.cursorPositionState=void 0;var t=function(){function t(){var t=this;this._position={x:0,y:0},window.addEventListener("mousemove",function(e){t._position={x:e.clientX,y:e.clientY}})}return Object.defineProperty(t.prototype,"position",{get:function(){return this._position},enumerable:!1,configurable:!0}),t}();exports.cursorPositionState=new t;
},{}],"o9fH":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.createMousePlacer=void 0;var e=require("./cursor-position.state"),o=function(o){return void 0===o&&(o={x:0,y:0}),function(){return{x:o.x+e.cursorPositionState.position.x,y:o.y+e.cursorPositionState.position.y}}};exports.createMousePlacer=o;
},{"./cursor-position.state":"NEjJ"}],"N2SL":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Segment=void 0;var t=require("./math/radian"),e=function(){function e(e,r){this.start=e,this.end=r,this._color="black",this._angle=(0,t.getAngle)(this.start,this.end)}return Object.defineProperty(e.prototype,"angle",{get:function(){return this._angle},enumerable:!1,configurable:!0}),e.prototype.draw=function(t){t.strokeStyle=this._color,t.beginPath(),t.moveTo(this.start.x,this.start.y),t.lineTo(this.end.x,this.end.y),t.stroke()},e}();exports.Segment=e;
},{"./math/radian":"t7BI"}],"Ckis":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Polygon=void 0;var t=require("./segment"),n=function(){function n(t){void 0===t&&(t=[]),this._points=t}return n.generateRandom=function(){for(var t=Math.floor(5*Math.random())+3,o=new n,e=Math.random()*window.innerWidth,i=Math.random()*window.innerHeight,r=0;r<t-1;r++)o.addPoint({x:200*Math.random()-100+e,y:150*Math.random()-75+i});return o.addPoint(o._points[0]),o},n.generateRegular=function(){var t=100*Math.random()+50,o=100*Math.random()+50,e=Math.random()*window.innerWidth,i=Math.random()*window.innerHeight,r=new n;return r.addPoint({x:e-t/2,y:i-o/2}),r.addPoint({x:e+t/2,y:i-o/2}),r.addPoint({x:e+t/2,y:i+o/2}),r.addPoint({x:e-t/2,y:i+o/2}),r.addPoint(r._points[0]),r},Object.defineProperty(n.prototype,"segments",{get:function(){for(var n=[],o=0;o<this._points.length-1;o++)n.push(new t.Segment(this._points[o],this._points[o+1]));return n},enumerable:!1,configurable:!0}),n.prototype.addPoint=function(t){this._points.push(t)},n.prototype.draw=function(t){t.strokeStyle="white",t.fillStyle="blue",t.beginPath(),t.moveTo(this._points[0].x,this._points[0].y),this._points.forEach(function(n){return t.lineTo(n.x,n.y)}),t.closePath(),t.stroke()},n}();exports.Polygon=n;
},{"./segment":"N2SL"}],"QXgC":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.SightZone=void 0;var t=function(){function t(t,r){this._rayA=t,this._rayB=r}return t.prototype.draw=function(t){var r=(this._rayA.end.x+this._rayB.end.x)/2,a=(this._rayA.end.y+this._rayB.end.y)/2,i={x:r+1*(r-this._rayA.start.x),y:a+1*(a-this._rayA.start.y)},e=t.createLinearGradient(this._rayA.start.x,this._rayA.start.y,i.x,i.y);e.addColorStop(0,"rgba(255, 255, 255, 1)"),e.addColorStop(1,"rgba(0, 0, 0, 0)"),t.fillStyle=e,t.beginPath(),t.moveTo(this._rayA.start.x,this._rayA.start.y),t.lineTo(this._rayA.end.x,this._rayA.end.y),t.lineTo(this._rayB.end.x,this._rayB.end.y),t.lineTo(this._rayB.start.x,this._rayB.start.y),t.fill()},t}();exports.SightZone=t;
},{}],"sMw1":[function(require,module,exports) {
"use strict";var e=this&&this.__spreadArray||function(e,t,r){if(r||2===arguments.length)for(var n,o=0,s=t.length;o<s;o++)!n&&o in t||(n||(n=Array.prototype.slice.call(t,0,o)),n[o]=t[o]);return e.concat(n||Array.prototype.slice.call(t))};Object.defineProperty(exports,"__esModule",{value:!0}),exports.Scene=void 0;var t=require("./lamp"),r=require("./placer/mouse.placer"),n=require("./polygon"),o=require("./sight-zone"),s=function(){function s(){this._polygons=[],this._lamps=[],this._rays=[],this._sightZones=[],this._addEdgePolygon();for(var e=0;e<25;e++)this._polygons.push(n.Polygon.generateRegular());this._lamps.push(new t.Lamp((0,r.createMousePlacer)())),this._lamps.push(new t.Lamp((0,r.createMousePlacer)({x:-10,y:0}))),this._lamps.push(new t.Lamp((0,r.createMousePlacer)({x:10,y:0}))),this._lamps.push(new t.Lamp((0,r.createMousePlacer)({x:0,y:-10}))),this._lamps.push(new t.Lamp((0,r.createMousePlacer)({x:0,y:10})))}return Object.defineProperty(s.prototype,"sightZones",{get:function(){return this._sightZones},enumerable:!1,configurable:!0}),Object.defineProperty(s.prototype,"drawables",{get:function(){return e(e([],this._polygons,!0),this._lamps,!0)},enumerable:!1,configurable:!0}),Object.defineProperty(s.prototype,"_segments",{get:function(){return this._polygons.flatMap(function(e){return e.segments})},enumerable:!1,configurable:!0}),s.prototype.update=function(){var e=this,t=performance.now();this._rays=[],this._lamps.forEach(function(t){var r;t.update(),(r=e._rays).push.apply(r,t.createRays(e._segments))}),this._rays.forEach(function(t){t.cast(e._segments)}),this._addSightZones(),this._perfStats(performance.now()-t)},s.prototype._addEdgePolygon=function(){var e=window.innerWidth,t=window.innerHeight,r=new n.Polygon([{x:0,y:0},{x:e,y:0},{x:e,y:t},{x:0,y:t},{x:0,y:0}]);this._polygons.push(r)},s.prototype._addSightZones=function(){this._sightZones=[];for(var e=this._rays.sort(function(e,t){return e.angle-t.angle}),t=0;t<e.length;t++){var r=e[t],n=e[(t+1)%e.length];this._sightZones.push(new o.SightZone(r,n))}},s.prototype._perfStats=function(e){var t=document.getElementById("performance");t&&(t.innerText="Update duration: ".concat(e.toFixed(2),"ms"))},s}();exports.Scene=s;
},{"./lamp":"q2x3","./placer/mouse.placer":"o9fH","./polygon":"Ckis","./sight-zone":"QXgC"}],"dgAm":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Game=void 0;var e=require("./canvas"),t=require("./scene"),a=function(){function a(){var a=this;this._canvas=new e.Canvas,this._scene=new t.Scene,this._background=new Image,this._background.src="https://steamuserimages-a.akamaihd.net/ugc/2058741574591783688/9C6BAD68B0072EBC34EAEE00DEE08662DE28BB27/",this._background.onload=function(){a._loop()}}return a.prototype._loop=function(){var e=this;this._update(),this._draw(),requestAnimationFrame(function(){return e._loop()})},a.prototype._update=function(){this._scene.update()},a.prototype._draw=function(){this._canvas.clear(),this._canvas.draw(this._scene.sightZones),this._canvas.drawBackground(this._background),this._canvas.draw(this._scene.drawables)},a}();exports.Game=a;
},{"./canvas":"qKVu","./scene":"sMw1"}],"jP6t":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./game"),r=new e.Game;
},{"./game":"dgAm"}]},{},["jP6t"], null)
//# sourceMappingURL=main.cbb2f42d.js.map