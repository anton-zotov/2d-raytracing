// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/canvas.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Canvas = void 0;
var Canvas = /** @class */function () {
  function Canvas() {
    this._canvas = document.createElement("canvas");
    this._setCanvasSize();
    this._ctx = this._canvas.getContext("2d");
    document.body.appendChild(this._canvas);
  }
  Canvas.prototype._setCanvasSize = function () {
    this._canvas.width = window.innerWidth;
    this._canvas.height = window.innerHeight;
  };
  Canvas.prototype.clear = function () {
    this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
    this._ctx.fillStyle = "black";
    this._ctx.fillRect(0, 0, this._canvas.width, this._canvas.height);
  };
  Canvas.prototype.drawBackground = function (img) {
    this._ctx.globalCompositeOperation = "multiply";
    this._ctx.drawImage(img, 0, 0, this._canvas.width, this._canvas.height);
    this._ctx.globalCompositeOperation = "source-over";
  };
  Canvas.prototype.draw = function (drawables) {
    var _this = this;
    drawables.forEach(function (drawable) {
      return drawable.draw(_this._ctx);
    });
  };
  return Canvas;
}();
exports.Canvas = Canvas;
},{}],"src/math/radian.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAngle = exports.normalize = exports.toRadians = void 0;
var toRadians = function toRadians(angle) {
  return angle * Math.PI / 180;
};
exports.toRadians = toRadians;
var normalize = function normalize(angle) {
  var twoPi = 2 * Math.PI;
  var normalized = angle % twoPi;
  return normalized >= 0 ? normalized : normalized + twoPi;
};
exports.normalize = normalize;
var getAngle = function getAngle(start, end) {
  return (0, exports.normalize)(Math.atan2(end.y - start.y, end.x - start.x));
};
exports.getAngle = getAngle;
},{}],"src/math/intersection.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getIntersection = exports.areParallel = void 0;
var areParallel = function areParallel(ray, segment) {
  return ray.angle === segment.angle;
};
exports.areParallel = areParallel;
var getIntersection = function getIntersection(ray, segment) {
  if ((0, exports.areParallel)(ray, segment)) {
    return null;
  }
  var x1 = ray.start.x;
  var y1 = ray.start.y;
  var x2 = ray.start.x + Math.cos(ray.angle);
  var y2 = ray.start.y + Math.sin(ray.angle);
  var x3 = segment.start.x;
  var y3 = segment.start.y;
  var x4 = segment.end.x;
  var y4 = segment.end.y;
  var denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
  if (denominator === 0) {
    return null;
  }
  var t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denominator;
  var u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / denominator;
  if (t >= 0 && u >= 0 && u <= 1) {
    return {
      x: x1 + t * (x2 - x1),
      y: y1 + t * (y2 - y1),
      distance: t
    };
  }
  return null;
};
exports.getIntersection = getIntersection;
},{}],"src/ray.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Ray = void 0;
var radian_1 = require("./math/radian");
var intersection_1 = require("./math/intersection");
var Ray = /** @class */function () {
  function Ray(start, angle) {
    this.start = start;
    this.angle = angle;
    this._color = "red";
    this._end = null;
    this.angle = (0, radian_1.normalize)(angle);
  }
  Object.defineProperty(Ray.prototype, "end", {
    get: function get() {
      return this._end ? this._end : {
        x: this.start.x + Math.cos(this.angle) * 1000,
        y: this.start.y + Math.sin(this.angle) * 1000
      };
    },
    enumerable: false,
    configurable: true
  });
  Ray.prototype.draw = function (ctx) {
    ctx.strokeStyle = this._color;
    ctx.beginPath();
    ctx.moveTo(this.start.x, this.start.y);
    ctx.lineTo(this.end.x, this.end.y);
    ctx.stroke();
  };
  Ray.prototype.cast = function (segments) {
    var _this = this;
    this._end = null;
    var record = Infinity;
    segments.forEach(function (segment) {
      var intersection = (0, intersection_1.getIntersection)(_this, segment);
      if (intersection && intersection.distance < record) {
        record = intersection.distance;
        _this._end = intersection;
      }
    });
  };
  return Ray;
}();
exports.Ray = Ray;
},{"./math/radian":"src/math/radian.ts","./math/intersection":"src/math/intersection.ts"}],"src/lamp.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Lamp = void 0;
var radian_1 = require("./math/radian");
var ray_1 = require("./ray");
var Lamp = /** @class */function () {
  function Lamp(_getPlace) {
    this._getPlace = _getPlace;
    this._position = {
      x: 0,
      y: 0
    };
  }
  Object.defineProperty(Lamp.prototype, "position", {
    get: function get() {
      return this._position;
    },
    enumerable: false,
    configurable: true
  });
  Lamp.prototype.update = function () {
    this._updatePosition();
  };
  Lamp.prototype.createRays = function (segments) {
    var _this = this;
    var edges = segments.flatMap(function (segment) {
      return [segment.start, segment.end];
    });
    var uniqueAngles = new Set(edges.flatMap(function (edge) {
      var angle = (0, radian_1.getAngle)(_this._position, edge);
      return [angle - 0.0001, angle, angle + 0.0001];
    }));
    return Array.from(uniqueAngles).map(function (angle) {
      return new ray_1.Ray(_this._position, angle);
    });
  };
  Lamp.prototype.draw = function (ctx) {
    ctx.fillStyle = "yellow";
    ctx.beginPath();
    ctx.arc(this._position.x, this._position.y, 5, 0, 2 * Math.PI);
    ctx.fill();
  };
  Lamp.prototype._updatePosition = function () {
    this._position = this._getPlace();
  };
  return Lamp;
}();
exports.Lamp = Lamp;
},{"./math/radian":"src/math/radian.ts","./ray":"src/ray.ts"}],"src/placer/cursor-position.state.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cursorPositionState = void 0;
var CursorPositionState = /** @class */function () {
  function CursorPositionState() {
    var _this = this;
    this._position = {
      x: 0,
      y: 0
    };
    window.addEventListener("mousemove", function (event) {
      _this._position = {
        x: event.clientX,
        y: event.clientY
      };
    });
  }
  Object.defineProperty(CursorPositionState.prototype, "position", {
    get: function get() {
      return this._position;
    },
    enumerable: false,
    configurable: true
  });
  return CursorPositionState;
}();
exports.cursorPositionState = new CursorPositionState();
},{}],"src/placer/mouse.placer.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createMousePlacer = void 0;
var cursor_position_state_1 = require("./cursor-position.state");
var createMousePlacer = function createMousePlacer(offset) {
  if (offset === void 0) {
    offset = {
      x: 0,
      y: 0
    };
  }
  return function () {
    return {
      x: offset.x + cursor_position_state_1.cursorPositionState.position.x,
      y: offset.y + cursor_position_state_1.cursorPositionState.position.y
    };
  };
};
exports.createMousePlacer = createMousePlacer;
},{"./cursor-position.state":"src/placer/cursor-position.state.ts"}],"src/segment.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Segment = void 0;
var radian_1 = require("./math/radian");
var Segment = /** @class */function () {
  function Segment(start, end) {
    this.start = start;
    this.end = end;
    this._color = "black";
    this._angle = (0, radian_1.getAngle)(this.start, this.end);
  }
  Object.defineProperty(Segment.prototype, "angle", {
    get: function get() {
      return this._angle;
    },
    enumerable: false,
    configurable: true
  });
  Segment.prototype.draw = function (ctx) {
    ctx.strokeStyle = this._color;
    ctx.beginPath();
    ctx.moveTo(this.start.x, this.start.y);
    ctx.lineTo(this.end.x, this.end.y);
    ctx.stroke();
  };
  return Segment;
}();
exports.Segment = Segment;
},{"./math/radian":"src/math/radian.ts"}],"src/polygon.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Polygon = void 0;
var segment_1 = require("./segment");
var Polygon = /** @class */function () {
  function Polygon(_points) {
    if (_points === void 0) {
      _points = [];
    }
    this._points = _points;
  }
  Polygon.generateRandom = function () {
    var sides = Math.floor(Math.random() * 5) + 3;
    var polygon = new Polygon();
    var center = {
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight
    };
    for (var i = 0; i < sides - 1; i++) {
      polygon.addPoint({
        x: Math.random() * 200 - 100 + center.x,
        y: Math.random() * 150 - 75 + center.y
      });
    }
    polygon.addPoint(polygon._points[0]);
    return polygon;
  };
  Polygon.generateRegular = function () {
    var width = Math.random() * 100 + 50;
    var height = Math.random() * 100 + 50;
    var cx = Math.random() * window.innerWidth;
    var cy = Math.random() * window.innerHeight;
    var polygon = new Polygon();
    polygon.addPoint({
      x: cx - width / 2,
      y: cy - height / 2
    });
    polygon.addPoint({
      x: cx + width / 2,
      y: cy - height / 2
    });
    polygon.addPoint({
      x: cx + width / 2,
      y: cy + height / 2
    });
    polygon.addPoint({
      x: cx - width / 2,
      y: cy + height / 2
    });
    polygon.addPoint(polygon._points[0]);
    return polygon;
  };
  Object.defineProperty(Polygon.prototype, "segments", {
    get: function get() {
      var segments = [];
      for (var i = 0; i < this._points.length - 1; i++) {
        segments.push(new segment_1.Segment(this._points[i], this._points[i + 1]));
      }
      return segments;
    },
    enumerable: false,
    configurable: true
  });
  Polygon.prototype.addPoint = function (point) {
    this._points.push(point);
  };
  Polygon.prototype.draw = function (ctx) {
    ctx.strokeStyle = "white";
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.moveTo(this._points[0].x, this._points[0].y);
    this._points.forEach(function (point) {
      return ctx.lineTo(point.x, point.y);
    });
    ctx.closePath();
    ctx.stroke();
    // ctx.fill();
  };
  return Polygon;
}();
exports.Polygon = Polygon;
},{"./segment":"src/segment.ts"}],"src/sight-zone.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SightZone = void 0;
var SightZone = /** @class */function () {
  function SightZone(_rayA, _rayB) {
    this._rayA = _rayA;
    this._rayB = _rayB;
  }
  SightZone.prototype.draw = function (ctx) {
    var normalLength = 100;
    var zoneEnd = {
      x: (this._rayA.end.x + this._rayB.end.x) / 2,
      y: (this._rayA.end.y + this._rayB.end.y) / 2
    };
    var length = Math.sqrt(Math.pow(zoneEnd.x - this._rayA.start.x, 2) + Math.pow(zoneEnd.y - this._rayA.start.y, 2)) || 1;
    var normalizedEnd = {
      x: zoneEnd.x + (zoneEnd.x - this._rayA.start.x) / length * normalLength,
      y: zoneEnd.y + (zoneEnd.y - this._rayA.start.y) / length * normalLength
    };
    var gradient = ctx.createLinearGradient(this._rayA.start.x, this._rayA.start.y, normalizedEnd.x, normalizedEnd.y);
    gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(this._rayA.start.x, this._rayA.start.y);
    ctx.lineTo(this._rayA.end.x, this._rayA.end.y);
    ctx.lineTo(this._rayB.end.x, this._rayB.end.y);
    ctx.lineTo(this._rayB.start.x, this._rayB.start.y);
    ctx.fill();
  };
  return SightZone;
}();
exports.SightZone = SightZone;
},{}],"src/scene.ts":[function(require,module,exports) {
"use strict";

var __spreadArray = this && this.__spreadArray || function (to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Scene = void 0;
var lamp_1 = require("./lamp");
var mouse_placer_1 = require("./placer/mouse.placer");
var polygon_1 = require("./polygon");
var sight_zone_1 = require("./sight-zone");
var Scene = /** @class */function () {
  function Scene() {
    this._polygons = [];
    this._lamps = [];
    this._rays = [];
    this._sightZones = [];
    this._addEdgePolygon();
    for (var i = 0; i < 25; i++) {
      this._polygons.push(polygon_1.Polygon.generateRegular());
    }
    this._lamps.push(new lamp_1.Lamp((0, mouse_placer_1.createMousePlacer)()));
    this._lamps.push(new lamp_1.Lamp((0, mouse_placer_1.createMousePlacer)({
      x: -10,
      y: 0
    })));
    this._lamps.push(new lamp_1.Lamp((0, mouse_placer_1.createMousePlacer)({
      x: 10,
      y: 0
    })));
    this._lamps.push(new lamp_1.Lamp((0, mouse_placer_1.createMousePlacer)({
      x: 0,
      y: -10
    })));
    this._lamps.push(new lamp_1.Lamp((0, mouse_placer_1.createMousePlacer)({
      x: 0,
      y: 10
    })));
  }
  Object.defineProperty(Scene.prototype, "sightZones", {
    get: function get() {
      return this._sightZones;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Scene.prototype, "drawables", {
    get: function get() {
      return __spreadArray(__spreadArray([], this._polygons, true), this._lamps, true);
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Scene.prototype, "_segments", {
    get: function get() {
      return this._polygons.flatMap(function (polygon) {
        return polygon.segments;
      });
    },
    enumerable: false,
    configurable: true
  });
  Scene.prototype.update = function () {
    var _this = this;
    var t1 = performance.now();
    this._rays = [];
    this._lamps.forEach(function (lamp) {
      var _a;
      lamp.update();
      (_a = _this._rays).push.apply(_a, lamp.createRays(_this._segments));
    });
    this._rays.forEach(function (ray) {
      ray.cast(_this._segments);
    });
    this._addSightZones();
    this._perfStats(performance.now() - t1);
  };
  Scene.prototype._addEdgePolygon = function () {
    var screenWidth = window.innerWidth;
    var screenHeight = window.innerHeight;
    var edgePolygon = new polygon_1.Polygon([{
      x: 0,
      y: 0
    }, {
      x: screenWidth,
      y: 0
    }, {
      x: screenWidth,
      y: screenHeight
    }, {
      x: 0,
      y: screenHeight
    }, {
      x: 0,
      y: 0
    }]);
    this._polygons.push(edgePolygon);
  };
  Scene.prototype._addSightZones = function () {
    this._sightZones = [];
    var sortedRays = this._rays.sort(function (a, b) {
      return a.angle - b.angle;
    });
    for (var i = 0; i < sortedRays.length; i++) {
      var rayA = sortedRays[i];
      var rayB = sortedRays[(i + 1) % sortedRays.length];
      this._sightZones.push(new sight_zone_1.SightZone(rayA, rayB));
    }
  };
  Scene.prototype._perfStats = function (duration) {
    var performanceElement = document.getElementById("performance");
    if (performanceElement) {
      performanceElement.innerText = "Update duration: ".concat(duration.toFixed(2), "ms");
    }
  };
  return Scene;
}();
exports.Scene = Scene;
},{"./lamp":"src/lamp.ts","./placer/mouse.placer":"src/placer/mouse.placer.ts","./polygon":"src/polygon.ts","./sight-zone":"src/sight-zone.ts"}],"src/game.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Game = void 0;
var canvas_1 = require("./canvas");
var scene_1 = require("./scene");
var Game = /** @class */function () {
  function Game() {
    var _this = this;
    this._canvas = new canvas_1.Canvas();
    this._scene = new scene_1.Scene();
    this._background = new Image();
    this._background.src = "https://steamuserimages-a.akamaihd.net/ugc/2058741574591783688/9C6BAD68B0072EBC34EAEE00DEE08662DE28BB27/";
    this._background.onload = function () {
      _this._loop();
    };
  }
  Game.prototype._loop = function () {
    var _this = this;
    this._update();
    this._draw();
    requestAnimationFrame(function () {
      return _this._loop();
    });
  };
  Game.prototype._update = function () {
    this._scene.update();
  };
  Game.prototype._draw = function () {
    this._canvas.clear();
    this._canvas.draw(this._scene.sightZones);
    this._canvas.drawBackground(this._background);
    this._canvas.draw(this._scene.drawables);
  };
  return Game;
}();
exports.Game = Game;
},{"./canvas":"src/canvas.ts","./scene":"src/scene.ts"}],"src/main.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var game_1 = require("./game");
var game = new game_1.Game();
},{"./game":"src/game.ts"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "57350" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/main.ts"], null)
//# sourceMappingURL=/main.b0a109ad.js.map