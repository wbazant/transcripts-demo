var demo =
webpackJsonp_name_([0],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var core = __webpack_require__(23);
var hide = __webpack_require__(13);
var redefine = __webpack_require__(14);
var ctx = __webpack_require__(20);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 2 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(56)('wks');
var uid = __webpack_require__(36);
var Symbol = __webpack_require__(2).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(3)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(1);
var IE8_DOM_DEFINE = __webpack_require__(105);
var toPrimitive = __webpack_require__(24);
var dP = Object.defineProperty;

exports.f = __webpack_require__(6) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(26);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(25);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 10 */,
/* 11 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 12 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(7);
var createDesc = __webpack_require__(35);
module.exports = __webpack_require__(6) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var hide = __webpack_require__(13);
var has = __webpack_require__(12);
var SRC = __webpack_require__(36)('src');
var TO_STRING = 'toString';
var $toString = Function[TO_STRING];
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__(23).inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var fails = __webpack_require__(3);
var defined = __webpack_require__(25);
var quot = /"/g;
// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
var createHTML = function (string, tag, attribute, value) {
  var S = String(defined(string));
  var p1 = '<' + tag;
  if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};
module.exports = function (NAME, exec) {
  var O = {};
  O[NAME] = exec(createHTML);
  $export($export.P + $export.F * fails(function () {
    var test = ''[NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  }), 'String', O);
};


/***/ }),
/* 16 */,
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(51);
var defined = __webpack_require__(25);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(52);
var createDesc = __webpack_require__(35);
var toIObject = __webpack_require__(17);
var toPrimitive = __webpack_require__(24);
var has = __webpack_require__(12);
var IE8_DOM_DEFINE = __webpack_require__(105);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(6) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(12);
var toObject = __webpack_require__(9);
var IE_PROTO = __webpack_require__(76)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(11);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 21 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__(3);

module.exports = function (method, arg) {
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call
    arg ? method.call(null, function () { /* empty */ }, 1) : method.call(null);
  });
};


/***/ }),
/* 23 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.1' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(4);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 25 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 26 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(0);
var core = __webpack_require__(23);
var fails = __webpack_require__(3);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__(20);
var IObject = __webpack_require__(51);
var toObject = __webpack_require__(9);
var toLength = __webpack_require__(8);
var asc = __webpack_require__(93);
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};


/***/ }),
/* 29 */,
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

if (__webpack_require__(6)) {
  var LIBRARY = __webpack_require__(37);
  var global = __webpack_require__(2);
  var fails = __webpack_require__(3);
  var $export = __webpack_require__(0);
  var $typed = __webpack_require__(66);
  var $buffer = __webpack_require__(99);
  var ctx = __webpack_require__(20);
  var anInstance = __webpack_require__(43);
  var propertyDesc = __webpack_require__(35);
  var hide = __webpack_require__(13);
  var redefineAll = __webpack_require__(45);
  var toInteger = __webpack_require__(26);
  var toLength = __webpack_require__(8);
  var toIndex = __webpack_require__(131);
  var toAbsoluteIndex = __webpack_require__(39);
  var toPrimitive = __webpack_require__(24);
  var has = __webpack_require__(12);
  var classof = __webpack_require__(53);
  var isObject = __webpack_require__(4);
  var toObject = __webpack_require__(9);
  var isArrayIter = __webpack_require__(90);
  var create = __webpack_require__(40);
  var getPrototypeOf = __webpack_require__(19);
  var gOPN = __webpack_require__(41).f;
  var getIterFn = __webpack_require__(92);
  var uid = __webpack_require__(36);
  var wks = __webpack_require__(5);
  var createArrayMethod = __webpack_require__(28);
  var createArrayIncludes = __webpack_require__(57);
  var speciesConstructor = __webpack_require__(64);
  var ArrayIterators = __webpack_require__(95);
  var Iterators = __webpack_require__(49);
  var $iterDetect = __webpack_require__(61);
  var setSpecies = __webpack_require__(42);
  var arrayFill = __webpack_require__(94);
  var arrayCopyWithin = __webpack_require__(121);
  var $DP = __webpack_require__(7);
  var $GOPD = __webpack_require__(18);
  var dP = $DP.f;
  var gOPD = $GOPD.f;
  var RangeError = global.RangeError;
  var TypeError = global.TypeError;
  var Uint8Array = global.Uint8Array;
  var ARRAY_BUFFER = 'ArrayBuffer';
  var SHARED_BUFFER = 'Shared' + ARRAY_BUFFER;
  var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
  var PROTOTYPE = 'prototype';
  var ArrayProto = Array[PROTOTYPE];
  var $ArrayBuffer = $buffer.ArrayBuffer;
  var $DataView = $buffer.DataView;
  var arrayForEach = createArrayMethod(0);
  var arrayFilter = createArrayMethod(2);
  var arraySome = createArrayMethod(3);
  var arrayEvery = createArrayMethod(4);
  var arrayFind = createArrayMethod(5);
  var arrayFindIndex = createArrayMethod(6);
  var arrayIncludes = createArrayIncludes(true);
  var arrayIndexOf = createArrayIncludes(false);
  var arrayValues = ArrayIterators.values;
  var arrayKeys = ArrayIterators.keys;
  var arrayEntries = ArrayIterators.entries;
  var arrayLastIndexOf = ArrayProto.lastIndexOf;
  var arrayReduce = ArrayProto.reduce;
  var arrayReduceRight = ArrayProto.reduceRight;
  var arrayJoin = ArrayProto.join;
  var arraySort = ArrayProto.sort;
  var arraySlice = ArrayProto.slice;
  var arrayToString = ArrayProto.toString;
  var arrayToLocaleString = ArrayProto.toLocaleString;
  var ITERATOR = wks('iterator');
  var TAG = wks('toStringTag');
  var TYPED_CONSTRUCTOR = uid('typed_constructor');
  var DEF_CONSTRUCTOR = uid('def_constructor');
  var ALL_CONSTRUCTORS = $typed.CONSTR;
  var TYPED_ARRAY = $typed.TYPED;
  var VIEW = $typed.VIEW;
  var WRONG_LENGTH = 'Wrong length!';

  var $map = createArrayMethod(1, function (O, length) {
    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
  });

  var LITTLE_ENDIAN = fails(function () {
    // eslint-disable-next-line no-undef
    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
  });

  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function () {
    new Uint8Array(1).set({});
  });

  var toOffset = function (it, BYTES) {
    var offset = toInteger(it);
    if (offset < 0 || offset % BYTES) throw RangeError('Wrong offset!');
    return offset;
  };

  var validate = function (it) {
    if (isObject(it) && TYPED_ARRAY in it) return it;
    throw TypeError(it + ' is not a typed array!');
  };

  var allocate = function (C, length) {
    if (!(isObject(C) && TYPED_CONSTRUCTOR in C)) {
      throw TypeError('It is not a typed array constructor!');
    } return new C(length);
  };

  var speciesFromList = function (O, list) {
    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
  };

  var fromList = function (C, list) {
    var index = 0;
    var length = list.length;
    var result = allocate(C, length);
    while (length > index) result[index] = list[index++];
    return result;
  };

  var addGetter = function (it, key, internal) {
    dP(it, key, { get: function () { return this._d[internal]; } });
  };

  var $from = function from(source /* , mapfn, thisArg */) {
    var O = toObject(source);
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var iterFn = getIterFn(O);
    var i, length, values, result, step, iterator;
    if (iterFn != undefined && !isArrayIter(iterFn)) {
      for (iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++) {
        values.push(step.value);
      } O = values;
    }
    if (mapping && aLen > 2) mapfn = ctx(mapfn, arguments[2], 2);
    for (i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++) {
      result[i] = mapping ? mapfn(O[i], i) : O[i];
    }
    return result;
  };

  var $of = function of(/* ...items */) {
    var index = 0;
    var length = arguments.length;
    var result = allocate(this, length);
    while (length > index) result[index] = arguments[index++];
    return result;
  };

  // iOS Safari 6.x fails here
  var TO_LOCALE_BUG = !!Uint8Array && fails(function () { arrayToLocaleString.call(new Uint8Array(1)); });

  var $toLocaleString = function toLocaleString() {
    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
  };

  var proto = {
    copyWithin: function copyWithin(target, start /* , end */) {
      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
    },
    every: function every(callbackfn /* , thisArg */) {
      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    fill: function fill(value /* , start, end */) { // eslint-disable-line no-unused-vars
      return arrayFill.apply(validate(this), arguments);
    },
    filter: function filter(callbackfn /* , thisArg */) {
      return speciesFromList(this, arrayFilter(validate(this), callbackfn,
        arguments.length > 1 ? arguments[1] : undefined));
    },
    find: function find(predicate /* , thisArg */) {
      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    findIndex: function findIndex(predicate /* , thisArg */) {
      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    forEach: function forEach(callbackfn /* , thisArg */) {
      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    indexOf: function indexOf(searchElement /* , fromIndex */) {
      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    includes: function includes(searchElement /* , fromIndex */) {
      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    join: function join(separator) { // eslint-disable-line no-unused-vars
      return arrayJoin.apply(validate(this), arguments);
    },
    lastIndexOf: function lastIndexOf(searchElement /* , fromIndex */) { // eslint-disable-line no-unused-vars
      return arrayLastIndexOf.apply(validate(this), arguments);
    },
    map: function map(mapfn /* , thisArg */) {
      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    reduce: function reduce(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduce.apply(validate(this), arguments);
    },
    reduceRight: function reduceRight(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduceRight.apply(validate(this), arguments);
    },
    reverse: function reverse() {
      var that = this;
      var length = validate(that).length;
      var middle = Math.floor(length / 2);
      var index = 0;
      var value;
      while (index < middle) {
        value = that[index];
        that[index++] = that[--length];
        that[length] = value;
      } return that;
    },
    some: function some(callbackfn /* , thisArg */) {
      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    sort: function sort(comparefn) {
      return arraySort.call(validate(this), comparefn);
    },
    subarray: function subarray(begin, end) {
      var O = validate(this);
      var length = O.length;
      var $begin = toAbsoluteIndex(begin, length);
      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(
        O.buffer,
        O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
        toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - $begin)
      );
    }
  };

  var $slice = function slice(start, end) {
    return speciesFromList(this, arraySlice.call(validate(this), start, end));
  };

  var $set = function set(arrayLike /* , offset */) {
    validate(this);
    var offset = toOffset(arguments[1], 1);
    var length = this.length;
    var src = toObject(arrayLike);
    var len = toLength(src.length);
    var index = 0;
    if (len + offset > length) throw RangeError(WRONG_LENGTH);
    while (index < len) this[offset + index] = src[index++];
  };

  var $iterators = {
    entries: function entries() {
      return arrayEntries.call(validate(this));
    },
    keys: function keys() {
      return arrayKeys.call(validate(this));
    },
    values: function values() {
      return arrayValues.call(validate(this));
    }
  };

  var isTAIndex = function (target, key) {
    return isObject(target)
      && target[TYPED_ARRAY]
      && typeof key != 'symbol'
      && key in target
      && String(+key) == String(key);
  };
  var $getDesc = function getOwnPropertyDescriptor(target, key) {
    return isTAIndex(target, key = toPrimitive(key, true))
      ? propertyDesc(2, target[key])
      : gOPD(target, key);
  };
  var $setDesc = function defineProperty(target, key, desc) {
    if (isTAIndex(target, key = toPrimitive(key, true))
      && isObject(desc)
      && has(desc, 'value')
      && !has(desc, 'get')
      && !has(desc, 'set')
      // TODO: add validation descriptor w/o calling accessors
      && !desc.configurable
      && (!has(desc, 'writable') || desc.writable)
      && (!has(desc, 'enumerable') || desc.enumerable)
    ) {
      target[key] = desc.value;
      return target;
    } return dP(target, key, desc);
  };

  if (!ALL_CONSTRUCTORS) {
    $GOPD.f = $getDesc;
    $DP.f = $setDesc;
  }

  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
    getOwnPropertyDescriptor: $getDesc,
    defineProperty: $setDesc
  });

  if (fails(function () { arrayToString.call({}); })) {
    arrayToString = arrayToLocaleString = function toString() {
      return arrayJoin.call(this);
    };
  }

  var $TypedArrayPrototype$ = redefineAll({}, proto);
  redefineAll($TypedArrayPrototype$, $iterators);
  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
  redefineAll($TypedArrayPrototype$, {
    slice: $slice,
    set: $set,
    constructor: function () { /* noop */ },
    toString: arrayToString,
    toLocaleString: $toLocaleString
  });
  addGetter($TypedArrayPrototype$, 'buffer', 'b');
  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
  addGetter($TypedArrayPrototype$, 'length', 'e');
  dP($TypedArrayPrototype$, TAG, {
    get: function () { return this[TYPED_ARRAY]; }
  });

  // eslint-disable-next-line max-statements
  module.exports = function (KEY, BYTES, wrapper, CLAMPED) {
    CLAMPED = !!CLAMPED;
    var NAME = KEY + (CLAMPED ? 'Clamped' : '') + 'Array';
    var GETTER = 'get' + KEY;
    var SETTER = 'set' + KEY;
    var TypedArray = global[NAME];
    var Base = TypedArray || {};
    var TAC = TypedArray && getPrototypeOf(TypedArray);
    var FORCED = !TypedArray || !$typed.ABV;
    var O = {};
    var TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
    var getter = function (that, index) {
      var data = that._d;
      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
    };
    var setter = function (that, index, value) {
      var data = that._d;
      if (CLAMPED) value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
    };
    var addElement = function (that, index) {
      dP(that, index, {
        get: function () {
          return getter(this, index);
        },
        set: function (value) {
          return setter(this, index, value);
        },
        enumerable: true
      });
    };
    if (FORCED) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME, '_d');
        var index = 0;
        var offset = 0;
        var buffer, byteLength, length, klass;
        if (!isObject(data)) {
          length = toIndex(data);
          byteLength = length * BYTES;
          buffer = new $ArrayBuffer(byteLength);
        } else if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          buffer = data;
          offset = toOffset($offset, BYTES);
          var $len = data.byteLength;
          if ($length === undefined) {
            if ($len % BYTES) throw RangeError(WRONG_LENGTH);
            byteLength = $len - offset;
            if (byteLength < 0) throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if (byteLength + offset > $len) throw RangeError(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if (TYPED_ARRAY in data) {
          return fromList(TypedArray, data);
        } else {
          return $from.call(TypedArray, data);
        }
        hide(that, '_d', {
          b: buffer,
          o: offset,
          l: byteLength,
          e: length,
          v: new $DataView(buffer)
        });
        while (index < length) addElement(that, index++);
      });
      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
      hide(TypedArrayPrototype, 'constructor', TypedArray);
    } else if (!fails(function () {
      TypedArray(1);
    }) || !fails(function () {
      new TypedArray(-1); // eslint-disable-line no-new
    }) || !$iterDetect(function (iter) {
      new TypedArray(); // eslint-disable-line no-new
      new TypedArray(null); // eslint-disable-line no-new
      new TypedArray(1.5); // eslint-disable-line no-new
      new TypedArray(iter); // eslint-disable-line no-new
    }, true)) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME);
        var klass;
        // `ws` module bug, temporarily remove validation length for Uint8Array
        // https://github.com/websockets/ws/pull/645
        if (!isObject(data)) return new Base(toIndex(data));
        if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          return $length !== undefined
            ? new Base(data, toOffset($offset, BYTES), $length)
            : $offset !== undefined
              ? new Base(data, toOffset($offset, BYTES))
              : new Base(data);
        }
        if (TYPED_ARRAY in data) return fromList(TypedArray, data);
        return $from.call(TypedArray, data);
      });
      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function (key) {
        if (!(key in TypedArray)) hide(TypedArray, key, Base[key]);
      });
      TypedArray[PROTOTYPE] = TypedArrayPrototype;
      if (!LIBRARY) TypedArrayPrototype.constructor = TypedArray;
    }
    var $nativeIterator = TypedArrayPrototype[ITERATOR];
    var CORRECT_ITER_NAME = !!$nativeIterator
      && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined);
    var $iterator = $iterators.values;
    hide(TypedArray, TYPED_CONSTRUCTOR, true);
    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
    hide(TypedArrayPrototype, VIEW, true);
    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

    if (CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)) {
      dP(TypedArrayPrototype, TAG, {
        get: function () { return NAME; }
      });
    }

    O[NAME] = TypedArray;

    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

    $export($export.S, NAME, {
      BYTES_PER_ELEMENT: BYTES
    });

    $export($export.S + $export.F * fails(function () { Base.of.call(TypedArray, 1); }), NAME, {
      from: $from,
      of: $of
    });

    if (!(BYTES_PER_ELEMENT in TypedArrayPrototype)) hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

    $export($export.P, NAME, proto);

    setSpecies(NAME);

    $export($export.P + $export.F * FORCED_SET, NAME, { set: $set });

    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);

    if (!LIBRARY && TypedArrayPrototype.toString != arrayToString) TypedArrayPrototype.toString = arrayToString;

    $export($export.P + $export.F * fails(function () {
      new TypedArray(1).slice();
    }), NAME, { slice: $slice });

    $export($export.P + $export.F * (fails(function () {
      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString();
    }) || !fails(function () {
      TypedArrayPrototype.toLocaleString.call([1, 2]);
    })), NAME, { toLocaleString: $toLocaleString });

    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
    if (!LIBRARY && !CORRECT_ITER_NAME) hide(TypedArrayPrototype, ITERATOR, $iterator);
  };
} else module.exports = function () { /* empty */ };


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var Map = __webpack_require__(126);
var $export = __webpack_require__(0);
var shared = __webpack_require__(56)('metadata');
var store = shared.store || (shared.store = new (__webpack_require__(129))());

var getOrCreateMetadataMap = function (target, targetKey, create) {
  var targetMetadata = store.get(target);
  if (!targetMetadata) {
    if (!create) return undefined;
    store.set(target, targetMetadata = new Map());
  }
  var keyMetadata = targetMetadata.get(targetKey);
  if (!keyMetadata) {
    if (!create) return undefined;
    targetMetadata.set(targetKey, keyMetadata = new Map());
  } return keyMetadata;
};
var ordinaryHasOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
};
var ordinaryGetOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
};
var ordinaryDefineOwnMetadata = function (MetadataKey, MetadataValue, O, P) {
  getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
};
var ordinaryOwnMetadataKeys = function (target, targetKey) {
  var metadataMap = getOrCreateMetadataMap(target, targetKey, false);
  var keys = [];
  if (metadataMap) metadataMap.forEach(function (_, key) { keys.push(key); });
  return keys;
};
var toMetaKey = function (it) {
  return it === undefined || typeof it == 'symbol' ? it : String(it);
};
var exp = function (O) {
  $export($export.S, 'Reflect', O);
};

module.exports = {
  store: store,
  map: getOrCreateMetadataMap,
  has: ordinaryHasOwnMetadata,
  get: ordinaryGetOwnMetadata,
  set: ordinaryDefineOwnMetadata,
  keys: ordinaryOwnMetadataKeys,
  key: toMetaKey,
  exp: exp
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(36)('meta');
var isObject = __webpack_require__(4);
var has = __webpack_require__(12);
var setDesc = __webpack_require__(7).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(3)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__(5)('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__(13)(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};


/***/ }),
/* 34 */,
/* 35 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 36 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = false;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(107);
var enumBugKeys = __webpack_require__(77);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(26);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(1);
var dPs = __webpack_require__(108);
var enumBugKeys = __webpack_require__(77);
var IE_PROTO = __webpack_require__(76)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(74)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(78).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(107);
var hiddenKeys = __webpack_require__(77).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(2);
var dP = __webpack_require__(7);
var DESCRIPTORS = __webpack_require__(6);
var SPECIES = __webpack_require__(5)('species');

module.exports = function (KEY) {
  var C = global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),
/* 43 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(20);
var call = __webpack_require__(119);
var isArrayIter = __webpack_require__(90);
var anObject = __webpack_require__(1);
var toLength = __webpack_require__(8);
var getIterFn = __webpack_require__(92);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__(14);
module.exports = function (target, src, safe) {
  for (var key in src) redefine(target, key, src[key], safe);
  return target;
};


/***/ }),
/* 46 */,
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(7).f;
var has = __webpack_require__(12);
var TAG = __webpack_require__(5)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var defined = __webpack_require__(25);
var fails = __webpack_require__(3);
var spaces = __webpack_require__(80);
var space = '[' + spaces + ']';
var non = '\u200b\u0085';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function (KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = fails(function () {
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;


/***/ }),
/* 49 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(21);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 52 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(21);
var TAG = __webpack_require__(5)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 54 */,
/* 55 */,
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(17);
var toLength = __webpack_require__(8);
var toAbsoluteIndex = __webpack_require__(39);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 58 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(21);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.8 IsRegExp(argument)
var isObject = __webpack_require__(4);
var cof = __webpack_require__(21);
var MATCH = __webpack_require__(5)('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(5)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.2.5.3 get RegExp.prototype.flags
var anObject = __webpack_require__(1);
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var hide = __webpack_require__(13);
var redefine = __webpack_require__(14);
var fails = __webpack_require__(3);
var defined = __webpack_require__(25);
var wks = __webpack_require__(5);

module.exports = function (KEY, length, exec) {
  var SYMBOL = wks(KEY);
  var fns = exec(defined, SYMBOL, ''[KEY]);
  var strfn = fns[0];
  var rxfn = fns[1];
  if (fails(function () {
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  })) {
    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return rxfn.call(string, this); }
    );
  }
};


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(1);
var aFunction = __webpack_require__(11);
var SPECIES = __webpack_require__(5)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(2);
var $export = __webpack_require__(0);
var redefine = __webpack_require__(14);
var redefineAll = __webpack_require__(45);
var meta = __webpack_require__(32);
var forOf = __webpack_require__(44);
var anInstance = __webpack_require__(43);
var isObject = __webpack_require__(4);
var fails = __webpack_require__(3);
var $iterDetect = __webpack_require__(61);
var setToStringTag = __webpack_require__(47);
var inheritIfRequired = __webpack_require__(81);

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  var fixMethod = function (KEY) {
    var fn = proto[KEY];
    redefine(proto, KEY,
      KEY == 'delete' ? function (a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a) {
        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a) { fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b) { fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
  };
  if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    var instance = new C();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    var ACCEPT_ITERABLES = $iterDetect(function (iter) { new C(iter); }); // eslint-disable-line no-new
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new C();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
    });
    if (!ACCEPT_ITERABLES) {
      C = wrapper(function (target, iterable) {
        anInstance(target, C, NAME);
        var that = inheritIfRequired(new Base(), target, C);
        if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
    // weak collections should not contains .clear method
    if (IS_WEAK && proto.clear) delete proto.clear;
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F * (C != Base), O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var hide = __webpack_require__(13);
var uid = __webpack_require__(36);
var TYPED = uid('typed_array');
var VIEW = uid('view');
var ABV = !!(global.ArrayBuffer && global.DataView);
var CONSTR = ABV;
var i = 0;
var l = 9;
var Typed;

var TypedArrayConstructors = (
  'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'
).split(',');

while (i < l) {
  if (Typed = global[TypedArrayConstructors[i++]]) {
    hide(Typed.prototype, TYPED, true);
    hide(Typed.prototype, VIEW, true);
  } else CONSTR = false;
}

module.exports = {
  ABV: ABV,
  CONSTR: CONSTR,
  TYPED: TYPED,
  VIEW: VIEW
};


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Forced replacement prototype accessors methods
module.exports = __webpack_require__(37) || !__webpack_require__(3)(function () {
  var K = Math.random();
  // In FF throws only define methods
  // eslint-disable-next-line no-undef, no-useless-call
  __defineSetter__.call(null, K, function () { /* empty */ });
  delete __webpack_require__(2)[K];
});


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(0);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { of: function of() {
    var length = arguments.length;
    var A = Array(length);
    while (length--) A[length] = arguments[length];
    return new this(A);
  } });
};


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(0);
var aFunction = __webpack_require__(11);
var ctx = __webpack_require__(20);
var forOf = __webpack_require__(44);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { from: function from(source /* , mapFn, thisArg */) {
    var mapFn = arguments[1];
    var mapping, A, n, cb;
    aFunction(this);
    mapping = mapFn !== undefined;
    if (mapping) aFunction(mapFn);
    if (source == undefined) return new this();
    A = [];
    if (mapping) {
      n = 0;
      cb = ctx(mapFn, arguments[2], 2);
      forOf(source, false, function (nextItem) {
        A.push(cb(nextItem, n++));
      });
    } else {
      forOf(source, false, A.push, A);
    }
    return new this(A);
  } });
};


/***/ }),
/* 70 */,
/* 71 */,
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(10);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(29);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = __webpack_require__(102);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactInputAutosize = __webpack_require__(382);

var _reactInputAutosize2 = _interopRequireDefault(_reactInputAutosize);

var _classnames = __webpack_require__(73);

var _classnames2 = _interopRequireDefault(_classnames);

var _defaultArrowRenderer = __webpack_require__(383);

var _defaultArrowRenderer2 = _interopRequireDefault(_defaultArrowRenderer);

var _defaultFilterOptions = __webpack_require__(148);

var _defaultFilterOptions2 = _interopRequireDefault(_defaultFilterOptions);

var _defaultMenuRenderer = __webpack_require__(150);

var _defaultMenuRenderer2 = _interopRequireDefault(_defaultMenuRenderer);

var _defaultClearRenderer = __webpack_require__(384);

var _defaultClearRenderer2 = _interopRequireDefault(_defaultClearRenderer);

var _Option = __webpack_require__(385);

var _Option2 = _interopRequireDefault(_Option);

var _Value = __webpack_require__(151);

var _Value2 = _interopRequireDefault(_Value);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*!
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 Copyright (c) 2017 Jed Watson.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 Licensed under the MIT License (MIT), see
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 http://jedwatson.github.io/react-select
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               */


var stringifyValue = function stringifyValue(value) {
	return typeof value === 'string' ? value : value !== null && JSON.stringify(value) || '';
};

var stringOrNode = _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node]);

var instanceId = 1;

var Select = function (_React$Component) {
	_inherits(Select, _React$Component);

	function Select(props) {
		_classCallCheck(this, Select);

		var _this = _possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).call(this, props));

		['clearValue', 'focusOption', 'handleInputBlur', 'handleInputChange', 'handleInputFocus', 'handleInputValueChange', 'handleKeyDown', 'handleMenuScroll', 'handleMouseDown', 'handleMouseDownOnArrow', 'handleMouseDownOnMenu', 'handleRequired', 'handleTouchOutside', 'handleTouchMove', 'handleTouchStart', 'handleTouchEnd', 'handleTouchEndClearValue', 'handleValueClick', 'getOptionLabel', 'onOptionRef', 'removeValue', 'selectValue'].forEach(function (fn) {
			return _this[fn] = _this[fn].bind(_this);
		});

		_this.state = {
			inputValue: '',
			isFocused: false,
			isOpen: false,
			isPseudoFocused: false,
			required: false
		};
		return _this;
	}

	_createClass(Select, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			this._instancePrefix = 'react-select-' + (this.props.instanceId || ++instanceId) + '-';
			var valueArray = this.getValueArray(this.props.value);

			if (this.props.required) {
				this.setState({
					required: this.handleRequired(valueArray[0], this.props.multi)
				});
			}
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			if (this.props.autofocus) {
				this.focus();
			}
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			var valueArray = this.getValueArray(nextProps.value, nextProps);

			if (nextProps.required) {
				this.setState({
					required: this.handleRequired(valueArray[0], nextProps.multi)
				});
			} else if (this.props.required) {
				// Used to be required but it's not any more
				this.setState({ required: false });
			}
		}
	}, {
		key: 'componentWillUpdate',
		value: function componentWillUpdate(nextProps, nextState) {
			if (nextState.isOpen !== this.state.isOpen) {
				this.toggleTouchOutsideEvent(nextState.isOpen);
				var handler = nextState.isOpen ? nextProps.onOpen : nextProps.onClose;
				handler && handler();
			}
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate(prevProps, prevState) {
			// focus to the selected option
			if (this.menu && this.focused && this.state.isOpen && !this.hasScrolledToOption) {
				var focusedOptionNode = _reactDom2.default.findDOMNode(this.focused);
				var menuNode = _reactDom2.default.findDOMNode(this.menu);
				menuNode.scrollTop = focusedOptionNode.offsetTop;
				this.hasScrolledToOption = true;
			} else if (!this.state.isOpen) {
				this.hasScrolledToOption = false;
			}

			if (this._scrollToFocusedOptionOnUpdate && this.focused && this.menu) {
				this._scrollToFocusedOptionOnUpdate = false;
				var focusedDOM = _reactDom2.default.findDOMNode(this.focused);
				var menuDOM = _reactDom2.default.findDOMNode(this.menu);
				var focusedRect = focusedDOM.getBoundingClientRect();
				var menuRect = menuDOM.getBoundingClientRect();
				if (focusedRect.bottom > menuRect.bottom) {
					menuDOM.scrollTop = focusedDOM.offsetTop + focusedDOM.clientHeight - menuDOM.offsetHeight;
				} else if (focusedRect.top < menuRect.top) {
					menuDOM.scrollTop = focusedDOM.offsetTop;
				}
			}
			if (this.props.scrollMenuIntoView && this.menuContainer) {
				var menuContainerRect = this.menuContainer.getBoundingClientRect();
				if (window.innerHeight < menuContainerRect.bottom + this.props.menuBuffer) {
					window.scrollBy(0, menuContainerRect.bottom + this.props.menuBuffer - window.innerHeight);
				}
			}
			if (prevProps.disabled !== this.props.disabled) {
				this.setState({ isFocused: false }); // eslint-disable-line react/no-did-update-set-state
				this.closeMenu();
			}
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			if (!document.removeEventListener && document.detachEvent) {
				document.detachEvent('ontouchstart', this.handleTouchOutside);
			} else {
				document.removeEventListener('touchstart', this.handleTouchOutside);
			}
		}
	}, {
		key: 'toggleTouchOutsideEvent',
		value: function toggleTouchOutsideEvent(enabled) {
			if (enabled) {
				if (!document.addEventListener && document.attachEvent) {
					document.attachEvent('ontouchstart', this.handleTouchOutside);
				} else {
					document.addEventListener('touchstart', this.handleTouchOutside);
				}
			} else {
				if (!document.removeEventListener && document.detachEvent) {
					document.detachEvent('ontouchstart', this.handleTouchOutside);
				} else {
					document.removeEventListener('touchstart', this.handleTouchOutside);
				}
			}
		}
	}, {
		key: 'handleTouchOutside',
		value: function handleTouchOutside(event) {
			// handle touch outside on ios to dismiss menu
			if (this.wrapper && !this.wrapper.contains(event.target)) {
				this.closeMenu();
			}
		}
	}, {
		key: 'focus',
		value: function focus() {
			if (!this.input) return;
			this.input.focus();
		}
	}, {
		key: 'blurInput',
		value: function blurInput() {
			if (!this.input) return;
			this.input.blur();
		}
	}, {
		key: 'handleTouchMove',
		value: function handleTouchMove(event) {
			// Set a flag that the view is being dragged
			this.dragging = true;
		}
	}, {
		key: 'handleTouchStart',
		value: function handleTouchStart(event) {
			// Set a flag that the view is not being dragged
			this.dragging = false;
		}
	}, {
		key: 'handleTouchEnd',
		value: function handleTouchEnd(event) {
			// Check if the view is being dragged, In this case
			// we don't want to fire the click event (because the user only wants to scroll)
			if (this.dragging) return;

			// Fire the mouse events
			this.handleMouseDown(event);
		}
	}, {
		key: 'handleTouchEndClearValue',
		value: function handleTouchEndClearValue(event) {
			// Check if the view is being dragged, In this case
			// we don't want to fire the click event (because the user only wants to scroll)
			if (this.dragging) return;

			// Clear the value
			this.clearValue(event);
		}
	}, {
		key: 'handleMouseDown',
		value: function handleMouseDown(event) {
			// if the event was triggered by a mousedown and not the primary
			// button, or if the component is disabled, ignore it.
			if (this.props.disabled || event.type === 'mousedown' && event.button !== 0) {
				return;
			}

			if (event.target.tagName === 'INPUT') {
				return;
			}

			// prevent default event handlers
			event.stopPropagation();
			event.preventDefault();

			// for the non-searchable select, toggle the menu
			if (!this.props.searchable) {
				// TODO: This code means that if a select is searchable, onClick the options menu will not appear, only on subsequent click will it open.
				this.focus();
				return this.setState({
					isOpen: !this.state.isOpen
				});
			}

			if (this.state.isFocused) {
				// On iOS, we can get into a state where we think the input is focused but it isn't really,
				// since iOS ignores programmatic calls to input.focus() that weren't triggered by a click event.
				// Call focus() again here to be safe.
				this.focus();

				var input = this.input;
				if (typeof input.getInput === 'function') {
					// Get the actual DOM input if the ref is an <AutosizeInput /> component
					input = input.getInput();
				}

				// clears the value so that the cursor will be at the end of input when the component re-renders
				input.value = '';

				// if the input is focused, ensure the menu is open
				this.setState({
					isOpen: true,
					isPseudoFocused: false
				});
			} else {
				// otherwise, focus the input and open the menu
				this._openAfterFocus = this.props.openOnClick;
				this.focus();
			}
		}
	}, {
		key: 'handleMouseDownOnArrow',
		value: function handleMouseDownOnArrow(event) {
			// if the event was triggered by a mousedown and not the primary
			// button, or if the component is disabled, ignore it.
			if (this.props.disabled || event.type === 'mousedown' && event.button !== 0) {
				return;
			}
			// If the menu isn't open, let the event bubble to the main handleMouseDown
			if (!this.state.isOpen) {
				return;
			}
			// prevent default event handlers
			event.stopPropagation();
			event.preventDefault();
			// close the menu
			this.closeMenu();
		}
	}, {
		key: 'handleMouseDownOnMenu',
		value: function handleMouseDownOnMenu(event) {
			// if the event was triggered by a mousedown and not the primary
			// button, or if the component is disabled, ignore it.
			if (this.props.disabled || event.type === 'mousedown' && event.button !== 0) {
				return;
			}
			event.stopPropagation();
			event.preventDefault();

			this._openAfterFocus = true;
			this.focus();
		}
	}, {
		key: 'closeMenu',
		value: function closeMenu() {
			if (this.props.onCloseResetsInput) {
				this.setState({
					isOpen: false,
					isPseudoFocused: this.state.isFocused && !this.props.multi,
					inputValue: this.handleInputValueChange('')
				});
			} else {
				this.setState({
					isOpen: false,
					isPseudoFocused: this.state.isFocused && !this.props.multi
				});
			}
			this.hasScrolledToOption = false;
		}
	}, {
		key: 'handleInputFocus',
		value: function handleInputFocus(event) {
			if (this.props.disabled) return;
			var isOpen = this.state.isOpen || this._openAfterFocus || this.props.openOnFocus;
			if (this.props.onFocus) {
				this.props.onFocus(event);
			}
			this.setState({
				isFocused: true,
				isOpen: isOpen
			});
			this._openAfterFocus = false;
		}
	}, {
		key: 'handleInputBlur',
		value: function handleInputBlur(event) {
			// The check for menu.contains(activeElement) is necessary to prevent IE11's scrollbar from closing the menu in certain contexts.
			if (this.menu && (this.menu === document.activeElement || this.menu.contains(document.activeElement))) {
				this.focus();
				return;
			}

			if (this.props.onBlur) {
				this.props.onBlur(event);
			}
			var onBlurredState = {
				isFocused: false,
				isOpen: false,
				isPseudoFocused: false
			};
			if (this.props.onBlurResetsInput) {
				onBlurredState.inputValue = this.handleInputValueChange('');
			}
			this.setState(onBlurredState);
		}
	}, {
		key: 'handleInputChange',
		value: function handleInputChange(event) {
			var newInputValue = event.target.value;

			if (this.state.inputValue !== event.target.value) {
				newInputValue = this.handleInputValueChange(newInputValue);
			}

			this.setState({
				isOpen: true,
				isPseudoFocused: false,
				inputValue: newInputValue
			});
		}
	}, {
		key: 'handleInputValueChange',
		value: function handleInputValueChange(newValue) {
			if (this.props.onInputChange) {
				var nextState = this.props.onInputChange(newValue);
				// Note: != used deliberately here to catch undefined and null
				if (nextState != null && (typeof nextState === 'undefined' ? 'undefined' : _typeof(nextState)) !== 'object') {
					newValue = '' + nextState;
				}
			}
			return newValue;
		}
	}, {
		key: 'handleKeyDown',
		value: function handleKeyDown(event) {
			if (this.props.disabled) return;

			if (typeof this.props.onInputKeyDown === 'function') {
				this.props.onInputKeyDown(event);
				if (event.defaultPrevented) {
					return;
				}
			}

			switch (event.keyCode) {
				case 8:
					// backspace
					if (!this.state.inputValue && this.props.backspaceRemoves) {
						event.preventDefault();
						this.popValue();
					}
					return;
				case 9:
					// tab
					if (event.shiftKey || !this.state.isOpen || !this.props.tabSelectsValue) {
						return;
					}
					this.selectFocusedOption();
					return;
				case 13:
					// enter
					if (!this.state.isOpen) return;
					event.stopPropagation();
					this.selectFocusedOption();
					break;
				case 27:
					// escape
					if (this.state.isOpen) {
						this.closeMenu();
						event.stopPropagation();
					} else if (this.props.clearable && this.props.escapeClearsValue) {
						this.clearValue(event);
						event.stopPropagation();
					}
					break;
				case 38:
					// up
					this.focusPreviousOption();
					break;
				case 40:
					// down
					this.focusNextOption();
					break;
				case 33:
					// page up
					this.focusPageUpOption();
					break;
				case 34:
					// page down
					this.focusPageDownOption();
					break;
				case 35:
					// end key
					if (event.shiftKey) {
						return;
					}
					this.focusEndOption();
					break;
				case 36:
					// home key
					if (event.shiftKey) {
						return;
					}
					this.focusStartOption();
					break;
				case 46:
					// backspace
					if (!this.state.inputValue && this.props.deleteRemoves) {
						event.preventDefault();
						this.popValue();
					}
					return;
				default:
					return;
			}
			event.preventDefault();
		}
	}, {
		key: 'handleValueClick',
		value: function handleValueClick(option, event) {
			if (!this.props.onValueClick) return;
			this.props.onValueClick(option, event);
		}
	}, {
		key: 'handleMenuScroll',
		value: function handleMenuScroll(event) {
			if (!this.props.onMenuScrollToBottom) return;
			var target = event.target;

			if (target.scrollHeight > target.offsetHeight && target.scrollHeight - target.offsetHeight - target.scrollTop <= 0) {
				this.props.onMenuScrollToBottom();
			}
		}
	}, {
		key: 'handleRequired',
		value: function handleRequired(value, multi) {
			if (!value) return true;
			return multi ? value.length === 0 : Object.keys(value).length === 0;
		}
	}, {
		key: 'getOptionLabel',
		value: function getOptionLabel(op) {
			return op[this.props.labelKey];
		}

		/**
   * Turns a value into an array from the given options
   * @param	{String|Number|Array}	value		- the value of the select input
   * @param	{Object}		nextProps	- optionally specify the nextProps so the returned array uses the latest configuration
   * @returns	{Array}	the value of the select represented in an array
   */

	}, {
		key: 'getValueArray',
		value: function getValueArray(value, nextProps) {
			var _this2 = this;

			/** support optionally passing in the `nextProps` so `componentWillReceiveProps` updates will function as expected */
			var props = (typeof nextProps === 'undefined' ? 'undefined' : _typeof(nextProps)) === 'object' ? nextProps : this.props;
			if (props.multi) {
				if (typeof value === 'string') value = value.split(props.delimiter);
				if (!Array.isArray(value)) {
					if (value === null || value === undefined) return [];
					value = [value];
				}
				return value.map(function (value) {
					return _this2.expandValue(value, props);
				}).filter(function (i) {
					return i;
				});
			}
			var expandedValue = this.expandValue(value, props);
			return expandedValue ? [expandedValue] : [];
		}

		/**
   * Retrieve a value from the given options and valueKey
   * @param	{String|Number|Array}	value	- the selected value(s)
   * @param	{Object}		props	- the Select component's props (or nextProps)
   */

	}, {
		key: 'expandValue',
		value: function expandValue(value, props) {
			var valueType = typeof value === 'undefined' ? 'undefined' : _typeof(value);
			if (valueType !== 'string' && valueType !== 'number' && valueType !== 'boolean') return value;
			var options = props.options,
			    valueKey = props.valueKey;

			if (!options) return;
			for (var i = 0; i < options.length; i++) {
				if (options[i][valueKey] === value) return options[i];
			}
		}
	}, {
		key: 'setValue',
		value: function setValue(value) {
			var _this3 = this;

			if (this.props.autoBlur) {
				this.blurInput();
			}
			if (this.props.required) {
				var required = this.handleRequired(value, this.props.multi);
				this.setState({ required: required });
			}
			if (this.props.onChange) {
				if (this.props.simpleValue && value) {
					value = this.props.multi ? value.map(function (i) {
						return i[_this3.props.valueKey];
					}).join(this.props.delimiter) : value[this.props.valueKey];
				}
				this.props.onChange(value);
			}
		}
	}, {
		key: 'selectValue',
		value: function selectValue(value) {
			var _this4 = this;

			// NOTE: we actually add/set the value in a callback to make sure the
			// input value is empty to avoid styling issues in Chrome
			if (this.props.closeOnSelect) {
				this.hasScrolledToOption = false;
			}
			if (this.props.multi) {
				var updatedValue = this.props.onSelectResetsInput ? '' : this.state.inputValue;
				this.setState({
					focusedIndex: null,
					inputValue: this.handleInputValueChange(updatedValue),
					isOpen: !this.props.closeOnSelect
				}, function () {
					_this4.addValue(value);
				});
			} else {
				this.setState({
					inputValue: this.handleInputValueChange(''),
					isOpen: !this.props.closeOnSelect,
					isPseudoFocused: this.state.isFocused
				}, function () {
					_this4.setValue(value);
				});
			}
		}
	}, {
		key: 'addValue',
		value: function addValue(value) {
			var valueArray = this.getValueArray(this.props.value);
			var visibleOptions = this._visibleOptions.filter(function (val) {
				return !val.disabled;
			});
			var lastValueIndex = visibleOptions.indexOf(value);
			this.setValue(valueArray.concat(value));
			if (visibleOptions.length - 1 === lastValueIndex) {
				// the last option was selected; focus the second-last one
				this.focusOption(visibleOptions[lastValueIndex - 1]);
			} else if (visibleOptions.length > lastValueIndex) {
				// focus the option below the selected one
				this.focusOption(visibleOptions[lastValueIndex + 1]);
			}
		}
	}, {
		key: 'popValue',
		value: function popValue() {
			var valueArray = this.getValueArray(this.props.value);
			if (!valueArray.length) return;
			if (valueArray[valueArray.length - 1].clearableValue === false) return;
			this.setValue(this.props.multi ? valueArray.slice(0, valueArray.length - 1) : null);
		}
	}, {
		key: 'removeValue',
		value: function removeValue(value) {
			var valueArray = this.getValueArray(this.props.value);
			this.setValue(valueArray.filter(function (i) {
				return i !== value;
			}));
			this.focus();
		}
	}, {
		key: 'clearValue',
		value: function clearValue(event) {
			// if the event was triggered by a mousedown and not the primary
			// button, ignore it.
			if (event && event.type === 'mousedown' && event.button !== 0) {
				return;
			}
			event.stopPropagation();
			event.preventDefault();
			this.setValue(this.getResetValue());
			this.setState({
				isOpen: false,
				inputValue: this.handleInputValueChange('')
			}, this.focus);
		}
	}, {
		key: 'getResetValue',
		value: function getResetValue() {
			if (this.props.resetValue !== undefined) {
				return this.props.resetValue;
			} else if (this.props.multi) {
				return [];
			} else {
				return null;
			}
		}
	}, {
		key: 'focusOption',
		value: function focusOption(option) {
			this.setState({
				focusedOption: option
			});
		}
	}, {
		key: 'focusNextOption',
		value: function focusNextOption() {
			this.focusAdjacentOption('next');
		}
	}, {
		key: 'focusPreviousOption',
		value: function focusPreviousOption() {
			this.focusAdjacentOption('previous');
		}
	}, {
		key: 'focusPageUpOption',
		value: function focusPageUpOption() {
			this.focusAdjacentOption('page_up');
		}
	}, {
		key: 'focusPageDownOption',
		value: function focusPageDownOption() {
			this.focusAdjacentOption('page_down');
		}
	}, {
		key: 'focusStartOption',
		value: function focusStartOption() {
			this.focusAdjacentOption('start');
		}
	}, {
		key: 'focusEndOption',
		value: function focusEndOption() {
			this.focusAdjacentOption('end');
		}
	}, {
		key: 'focusAdjacentOption',
		value: function focusAdjacentOption(dir) {
			var options = this._visibleOptions.map(function (option, index) {
				return { option: option, index: index };
			}).filter(function (option) {
				return !option.option.disabled;
			});
			this._scrollToFocusedOptionOnUpdate = true;
			if (!this.state.isOpen) {
				this.setState({
					isOpen: true,
					inputValue: '',
					focusedOption: this._focusedOption || (options.length ? options[dir === 'next' ? 0 : options.length - 1].option : null)
				});
				return;
			}
			if (!options.length) return;
			var focusedIndex = -1;
			for (var i = 0; i < options.length; i++) {
				if (this._focusedOption === options[i].option) {
					focusedIndex = i;
					break;
				}
			}
			if (dir === 'next' && focusedIndex !== -1) {
				focusedIndex = (focusedIndex + 1) % options.length;
			} else if (dir === 'previous') {
				if (focusedIndex > 0) {
					focusedIndex = focusedIndex - 1;
				} else {
					focusedIndex = options.length - 1;
				}
			} else if (dir === 'start') {
				focusedIndex = 0;
			} else if (dir === 'end') {
				focusedIndex = options.length - 1;
			} else if (dir === 'page_up') {
				var potentialIndex = focusedIndex - this.props.pageSize;
				if (potentialIndex < 0) {
					focusedIndex = 0;
				} else {
					focusedIndex = potentialIndex;
				}
			} else if (dir === 'page_down') {
				var potentialIndex = focusedIndex + this.props.pageSize;
				if (potentialIndex > options.length - 1) {
					focusedIndex = options.length - 1;
				} else {
					focusedIndex = potentialIndex;
				}
			}

			if (focusedIndex === -1) {
				focusedIndex = 0;
			}

			this.setState({
				focusedIndex: options[focusedIndex].index,
				focusedOption: options[focusedIndex].option
			});
		}
	}, {
		key: 'getFocusedOption',
		value: function getFocusedOption() {
			return this._focusedOption;
		}
	}, {
		key: 'getInputValue',
		value: function getInputValue() {
			return this.state.inputValue;
		}
	}, {
		key: 'selectFocusedOption',
		value: function selectFocusedOption() {
			if (this._focusedOption) {
				return this.selectValue(this._focusedOption);
			}
		}
	}, {
		key: 'renderLoading',
		value: function renderLoading() {
			if (!this.props.isLoading) return;
			return _react2.default.createElement(
				'span',
				{ className: 'Select-loading-zone', 'aria-hidden': 'true' },
				_react2.default.createElement('span', { className: 'Select-loading' })
			);
		}
	}, {
		key: 'renderValue',
		value: function renderValue(valueArray, isOpen) {
			var _this5 = this;

			var renderLabel = this.props.valueRenderer || this.getOptionLabel;
			var ValueComponent = this.props.valueComponent;
			if (!valueArray.length) {
				return !this.state.inputValue ? _react2.default.createElement(
					'div',
					{ className: 'Select-placeholder' },
					this.props.placeholder
				) : null;
			}
			var onClick = this.props.onValueClick ? this.handleValueClick : null;
			if (this.props.multi) {
				return valueArray.map(function (value, i) {
					return _react2.default.createElement(
						ValueComponent,
						{
							id: _this5._instancePrefix + '-value-' + i,
							instancePrefix: _this5._instancePrefix,
							disabled: _this5.props.disabled || value.clearableValue === false,
							key: 'value-' + i + '-' + value[_this5.props.valueKey],
							onClick: onClick,
							onRemove: _this5.removeValue,
							value: value
						},
						renderLabel(value, i),
						_react2.default.createElement(
							'span',
							{ className: 'Select-aria-only' },
							'\xA0'
						)
					);
				});
			} else if (!this.state.inputValue) {
				if (isOpen) onClick = null;
				return _react2.default.createElement(
					ValueComponent,
					{
						id: this._instancePrefix + '-value-item',
						disabled: this.props.disabled,
						instancePrefix: this._instancePrefix,
						onClick: onClick,
						value: valueArray[0]
					},
					renderLabel(valueArray[0])
				);
			}
		}
	}, {
		key: 'renderInput',
		value: function renderInput(valueArray, focusedOptionIndex) {
			var _classNames,
			    _this6 = this;

			var className = (0, _classnames2.default)('Select-input', this.props.inputProps.className);
			var isOpen = !!this.state.isOpen;

			var ariaOwns = (0, _classnames2.default)((_classNames = {}, _defineProperty(_classNames, this._instancePrefix + '-list', isOpen), _defineProperty(_classNames, this._instancePrefix + '-backspace-remove-message', this.props.multi && !this.props.disabled && this.state.isFocused && !this.state.inputValue), _classNames));

			var inputProps = _extends({}, this.props.inputProps, {
				role: 'combobox',
				'aria-expanded': '' + isOpen,
				'aria-owns': ariaOwns,
				'aria-haspopup': '' + isOpen,
				'aria-activedescendant': isOpen ? this._instancePrefix + '-option-' + focusedOptionIndex : this._instancePrefix + '-value',
				'aria-describedby': this.props['aria-describedby'],
				'aria-labelledby': this.props['aria-labelledby'],
				'aria-label': this.props['aria-label'],
				className: className,
				tabIndex: this.props.tabIndex,
				onBlur: this.handleInputBlur,
				onChange: this.handleInputChange,
				onFocus: this.handleInputFocus,
				ref: function ref(_ref) {
					return _this6.input = _ref;
				},
				required: this.state.required,
				value: this.state.inputValue
			});

			if (this.props.inputRenderer) {
				return this.props.inputRenderer(inputProps);
			}

			if (this.props.disabled || !this.props.searchable) {
				var _props$inputProps = this.props.inputProps,
				    inputClassName = _props$inputProps.inputClassName,
				    divProps = _objectWithoutProperties(_props$inputProps, ['inputClassName']);

				var _ariaOwns = (0, _classnames2.default)(_defineProperty({}, this._instancePrefix + '-list', isOpen));

				return _react2.default.createElement('div', _extends({}, divProps, {
					role: 'combobox',
					'aria-expanded': isOpen,
					'aria-owns': _ariaOwns,
					'aria-activedescendant': isOpen ? this._instancePrefix + '-option-' + focusedOptionIndex : this._instancePrefix + '-value',
					className: className,
					tabIndex: this.props.tabIndex || 0,
					onBlur: this.handleInputBlur,
					onFocus: this.handleInputFocus,
					ref: function ref(_ref2) {
						return _this6.input = _ref2;
					},
					'aria-readonly': '' + !!this.props.disabled,
					style: { border: 0, width: 1, display: 'inline-block' } }));
			}

			if (this.props.autosize) {
				return _react2.default.createElement(_reactInputAutosize2.default, _extends({}, inputProps, { minWidth: '5' }));
			}
			return _react2.default.createElement(
				'div',
				{ className: className },
				_react2.default.createElement('input', inputProps)
			);
		}
	}, {
		key: 'renderClear',
		value: function renderClear() {
			if (!this.props.clearable || this.props.value === undefined || this.props.value === null || this.props.multi && !this.props.value.length || this.props.disabled || this.props.isLoading) return;
			var clear = this.props.clearRenderer();

			return _react2.default.createElement(
				'span',
				{ className: 'Select-clear-zone', title: this.props.multi ? this.props.clearAllText : this.props.clearValueText,
					'aria-label': this.props.multi ? this.props.clearAllText : this.props.clearValueText,
					onMouseDown: this.clearValue,
					onTouchStart: this.handleTouchStart,
					onTouchMove: this.handleTouchMove,
					onTouchEnd: this.handleTouchEndClearValue
				},
				clear
			);
		}
	}, {
		key: 'renderArrow',
		value: function renderArrow() {
			var onMouseDown = this.handleMouseDownOnArrow;
			var isOpen = this.state.isOpen;
			var arrow = this.props.arrowRenderer({ onMouseDown: onMouseDown, isOpen: isOpen });

			return _react2.default.createElement(
				'span',
				{
					className: 'Select-arrow-zone',
					onMouseDown: onMouseDown
				},
				arrow
			);
		}
	}, {
		key: 'filterOptions',
		value: function filterOptions(excludeOptions) {
			var filterValue = this.state.inputValue;
			var options = this.props.options || [];
			if (this.props.filterOptions) {
				// Maintain backwards compatibility with boolean attribute
				var filterOptions = typeof this.props.filterOptions === 'function' ? this.props.filterOptions : _defaultFilterOptions2.default;

				return filterOptions(options, filterValue, excludeOptions, {
					filterOption: this.props.filterOption,
					ignoreAccents: this.props.ignoreAccents,
					ignoreCase: this.props.ignoreCase,
					labelKey: this.props.labelKey,
					matchPos: this.props.matchPos,
					matchProp: this.props.matchProp,
					valueKey: this.props.valueKey
				});
			} else {
				return options;
			}
		}
	}, {
		key: 'onOptionRef',
		value: function onOptionRef(ref, isFocused) {
			if (isFocused) {
				this.focused = ref;
			}
		}
	}, {
		key: 'renderMenu',
		value: function renderMenu(options, valueArray, focusedOption) {
			if (options && options.length) {
				return this.props.menuRenderer({
					focusedOption: focusedOption,
					focusOption: this.focusOption,
					instancePrefix: this._instancePrefix,
					labelKey: this.props.labelKey,
					onFocus: this.focusOption,
					onSelect: this.selectValue,
					optionClassName: this.props.optionClassName,
					optionComponent: this.props.optionComponent,
					optionRenderer: this.props.optionRenderer || this.getOptionLabel,
					options: options,
					selectValue: this.selectValue,
					valueArray: valueArray,
					valueKey: this.props.valueKey,
					onOptionRef: this.onOptionRef
				});
			} else if (this.props.noResultsText) {
				return _react2.default.createElement(
					'div',
					{ className: 'Select-noresults' },
					this.props.noResultsText
				);
			} else {
				return null;
			}
		}
	}, {
		key: 'renderHiddenField',
		value: function renderHiddenField(valueArray) {
			var _this7 = this;

			if (!this.props.name) return;
			if (this.props.joinValues) {
				var value = valueArray.map(function (i) {
					return stringifyValue(i[_this7.props.valueKey]);
				}).join(this.props.delimiter);
				return _react2.default.createElement('input', {
					type: 'hidden',
					ref: function ref(_ref3) {
						return _this7.value = _ref3;
					},
					name: this.props.name,
					value: value,
					disabled: this.props.disabled });
			}
			return valueArray.map(function (item, index) {
				return _react2.default.createElement('input', { key: 'hidden.' + index,
					type: 'hidden',
					ref: 'value' + index,
					name: _this7.props.name,
					value: stringifyValue(item[_this7.props.valueKey]),
					disabled: _this7.props.disabled });
			});
		}
	}, {
		key: 'getFocusableOptionIndex',
		value: function getFocusableOptionIndex(selectedOption) {
			var options = this._visibleOptions;
			if (!options.length) return null;

			var valueKey = this.props.valueKey;
			var focusedOption = this.state.focusedOption || selectedOption;
			if (focusedOption && !focusedOption.disabled) {
				var focusedOptionIndex = -1;
				options.some(function (option, index) {
					var isOptionEqual = option[valueKey] === focusedOption[valueKey];
					if (isOptionEqual) {
						focusedOptionIndex = index;
					}
					return isOptionEqual;
				});
				if (focusedOptionIndex !== -1) {
					return focusedOptionIndex;
				}
			}

			for (var i = 0; i < options.length; i++) {
				if (!options[i].disabled) return i;
			}
			return null;
		}
	}, {
		key: 'renderOuter',
		value: function renderOuter(options, valueArray, focusedOption) {
			var _this8 = this;

			var menu = this.renderMenu(options, valueArray, focusedOption);
			if (!menu) {
				return null;
			}

			return _react2.default.createElement(
				'div',
				{ ref: function ref(_ref5) {
						return _this8.menuContainer = _ref5;
					}, className: 'Select-menu-outer', style: this.props.menuContainerStyle },
				_react2.default.createElement(
					'div',
					{ ref: function ref(_ref4) {
							return _this8.menu = _ref4;
						}, role: 'listbox', tabIndex: -1, className: 'Select-menu', id: this._instancePrefix + '-list',
						style: this.props.menuStyle,
						onScroll: this.handleMenuScroll,
						onMouseDown: this.handleMouseDownOnMenu },
					menu
				)
			);
		}
	}, {
		key: 'render',
		value: function render() {
			var _this9 = this;

			var valueArray = this.getValueArray(this.props.value);
			var options = this._visibleOptions = this.filterOptions(this.props.multi ? this.getValueArray(this.props.value) : null);
			var isOpen = this.state.isOpen;
			if (this.props.multi && !options.length && valueArray.length && !this.state.inputValue) isOpen = false;
			var focusedOptionIndex = this.getFocusableOptionIndex(valueArray[0]);

			var focusedOption = null;
			if (focusedOptionIndex !== null) {
				focusedOption = this._focusedOption = options[focusedOptionIndex];
			} else {
				focusedOption = this._focusedOption = null;
			}
			var className = (0, _classnames2.default)('Select', this.props.className, {
				'Select--multi': this.props.multi,
				'Select--single': !this.props.multi,
				'is-clearable': this.props.clearable,
				'is-disabled': this.props.disabled,
				'is-focused': this.state.isFocused,
				'is-loading': this.props.isLoading,
				'is-open': isOpen,
				'is-pseudo-focused': this.state.isPseudoFocused,
				'is-searchable': this.props.searchable,
				'has-value': valueArray.length
			});

			var removeMessage = null;
			if (this.props.multi && !this.props.disabled && valueArray.length && !this.state.inputValue && this.state.isFocused && this.props.backspaceRemoves) {
				removeMessage = _react2.default.createElement(
					'span',
					{ id: this._instancePrefix + '-backspace-remove-message', className: 'Select-aria-only', 'aria-live': 'assertive' },
					this.props.backspaceToRemoveMessage.replace('{label}', valueArray[valueArray.length - 1][this.props.labelKey])
				);
			}

			return _react2.default.createElement(
				'div',
				{ ref: function ref(_ref7) {
						return _this9.wrapper = _ref7;
					},
					className: className,
					style: this.props.wrapperStyle },
				this.renderHiddenField(valueArray),
				_react2.default.createElement(
					'div',
					{ ref: function ref(_ref6) {
							return _this9.control = _ref6;
						},
						className: 'Select-control',
						style: this.props.style,
						onKeyDown: this.handleKeyDown,
						onMouseDown: this.handleMouseDown,
						onTouchEnd: this.handleTouchEnd,
						onTouchStart: this.handleTouchStart,
						onTouchMove: this.handleTouchMove
					},
					_react2.default.createElement(
						'span',
						{ className: 'Select-multi-value-wrapper', id: this._instancePrefix + '-value' },
						this.renderValue(valueArray, isOpen),
						this.renderInput(valueArray, focusedOptionIndex)
					),
					removeMessage,
					this.renderLoading(),
					this.renderClear(),
					this.renderArrow()
				),
				isOpen ? this.renderOuter(options, !this.props.multi ? valueArray : null, focusedOption) : null
			);
		}
	}]);

	return Select;
}(_react2.default.Component);

;

Select.propTypes = {
	'aria-describedby': _propTypes2.default.string, // HTML ID(s) of element(s) that should be used to describe this input (for assistive tech)
	'aria-label': _propTypes2.default.string, // Aria label (for assistive tech)
	'aria-labelledby': _propTypes2.default.string, // HTML ID of an element that should be used as the label (for assistive tech)
	addLabelText: _propTypes2.default.string, // placeholder displayed when you want to add a label on a multi-value input
	arrowRenderer: _propTypes2.default.func, // Create drop-down caret element
	autoBlur: _propTypes2.default.bool, // automatically blur the component when an option is selected
	autofocus: _propTypes2.default.bool, // autofocus the component on mount
	autosize: _propTypes2.default.bool, // whether to enable autosizing or not
	backspaceRemoves: _propTypes2.default.bool, // whether backspace removes an item if there is no text input
	backspaceToRemoveMessage: _propTypes2.default.string, // Message to use for screenreaders to press backspace to remove the current item - {label} is replaced with the item label
	className: _propTypes2.default.string, // className for the outer element
	clearAllText: stringOrNode, // title for the "clear" control when multi: true
	clearRenderer: _propTypes2.default.func, // create clearable x element
	clearValueText: stringOrNode, // title for the "clear" control
	clearable: _propTypes2.default.bool, // should it be possible to reset value
	closeOnSelect: _propTypes2.default.bool, // whether to close the menu when a value is selected
	deleteRemoves: _propTypes2.default.bool, // whether backspace removes an item if there is no text input
	delimiter: _propTypes2.default.string, // delimiter to use to join multiple values for the hidden field value
	disabled: _propTypes2.default.bool, // whether the Select is disabled or not
	escapeClearsValue: _propTypes2.default.bool, // whether escape clears the value when the menu is closed
	filterOption: _propTypes2.default.func, // method to filter a single option (option, filterString)
	filterOptions: _propTypes2.default.any, // boolean to enable default filtering or function to filter the options array ([options], filterString, [values])
	ignoreAccents: _propTypes2.default.bool, // whether to strip diacritics when filtering
	ignoreCase: _propTypes2.default.bool, // whether to perform case-insensitive filtering
	inputProps: _propTypes2.default.object, // custom attributes for the Input
	inputRenderer: _propTypes2.default.func, // returns a custom input component
	instanceId: _propTypes2.default.string, // set the components instanceId
	isLoading: _propTypes2.default.bool, // whether the Select is loading externally or not (such as options being loaded)
	joinValues: _propTypes2.default.bool, // joins multiple values into a single form field with the delimiter (legacy mode)
	labelKey: _propTypes2.default.string, // path of the label value in option objects
	matchPos: _propTypes2.default.string, // (any|start) match the start or entire string when filtering
	matchProp: _propTypes2.default.string, // (any|label|value) which option property to filter on
	menuBuffer: _propTypes2.default.number, // optional buffer (in px) between the bottom of the viewport and the bottom of the menu
	menuContainerStyle: _propTypes2.default.object, // optional style to apply to the menu container
	menuRenderer: _propTypes2.default.func, // renders a custom menu with options
	menuStyle: _propTypes2.default.object, // optional style to apply to the menu
	multi: _propTypes2.default.bool, // multi-value input
	name: _propTypes2.default.string, // generates a hidden <input /> tag with this field name for html forms
	noResultsText: stringOrNode, // placeholder displayed when there are no matching search results
	onBlur: _propTypes2.default.func, // onBlur handler: function (event) {}
	onBlurResetsInput: _propTypes2.default.bool, // whether input is cleared on blur
	onChange: _propTypes2.default.func, // onChange handler: function (newValue) {}
	onClose: _propTypes2.default.func, // fires when the menu is closed
	onCloseResetsInput: _propTypes2.default.bool, // whether input is cleared when menu is closed through the arrow
	onFocus: _propTypes2.default.func, // onFocus handler: function (event) {}
	onInputChange: _propTypes2.default.func, // onInputChange handler: function (inputValue) {}
	onInputKeyDown: _propTypes2.default.func, // input keyDown handler: function (event) {}
	onMenuScrollToBottom: _propTypes2.default.func, // fires when the menu is scrolled to the bottom; can be used to paginate options
	onOpen: _propTypes2.default.func, // fires when the menu is opened
	onSelectResetsInput: _propTypes2.default.bool, // whether input is cleared on select (works only for multiselect)
	onValueClick: _propTypes2.default.func, // onClick handler for value labels: function (value, event) {}
	openOnClick: _propTypes2.default.bool, // boolean to control opening the menu when the control is clicked
	openOnFocus: _propTypes2.default.bool, // always open options menu on focus
	optionClassName: _propTypes2.default.string, // additional class(es) to apply to the <Option /> elements
	optionComponent: _propTypes2.default.func, // option component to render in dropdown
	optionRenderer: _propTypes2.default.func, // optionRenderer: function (option) {}
	options: _propTypes2.default.array, // array of options
	pageSize: _propTypes2.default.number, // number of entries to page when using page up/down keys
	placeholder: stringOrNode, // field placeholder, displayed when there's no value
	required: _propTypes2.default.bool, // applies HTML5 required attribute when needed
	resetValue: _propTypes2.default.any, // value to use when you clear the control
	scrollMenuIntoView: _propTypes2.default.bool, // boolean to enable the viewport to shift so that the full menu fully visible when engaged
	searchable: _propTypes2.default.bool, // whether to enable searching feature or not
	simpleValue: _propTypes2.default.bool, // pass the value to onChange as a simple value (legacy pre 1.0 mode), defaults to false
	style: _propTypes2.default.object, // optional style to apply to the control
	tabIndex: _propTypes2.default.string, // optional tab index of the control
	tabSelectsValue: _propTypes2.default.bool, // whether to treat tabbing out while focused to be value selection
	value: _propTypes2.default.any, // initial field value
	valueComponent: _propTypes2.default.func, // value component to render
	valueKey: _propTypes2.default.string, // path of the label value in option objects
	valueRenderer: _propTypes2.default.func, // valueRenderer: function (option) {}
	wrapperStyle: _propTypes2.default.object // optional style to apply to the component wrapper
};

Select.defaultProps = {
	addLabelText: 'Add "{label}"?',
	arrowRenderer: _defaultArrowRenderer2.default,
	autosize: true,
	backspaceRemoves: true,
	backspaceToRemoveMessage: 'Press backspace to remove {label}',
	clearable: true,
	clearAllText: 'Clear all',
	clearRenderer: _defaultClearRenderer2.default,
	clearValueText: 'Clear value',
	closeOnSelect: true,
	deleteRemoves: true,
	delimiter: ',',
	disabled: false,
	escapeClearsValue: true,
	filterOptions: _defaultFilterOptions2.default,
	ignoreAccents: true,
	ignoreCase: true,
	inputProps: {},
	isLoading: false,
	joinValues: false,
	labelKey: 'label',
	matchPos: 'any',
	matchProp: 'any',
	menuBuffer: 0,
	menuRenderer: _defaultMenuRenderer2.default,
	multi: false,
	noResultsText: 'No results found',
	onBlurResetsInput: true,
	onSelectResetsInput: true,
	onCloseResetsInput: true,
	openOnClick: true,
	optionComponent: _Option2.default,
	pageSize: 5,
	placeholder: 'Select...',
	required: false,
	scrollMenuIntoView: true,
	searchable: true,
	simpleValue: false,
	tabSelectsValue: true,
	valueComponent: _Value2.default,
	valueKey: 'value'
};

exports.default = Select;

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2016 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				classes.push(classNames.apply(null, arg));
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
			return classNames;
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {
		window.classNames = classNames;
	}
}());


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
var document = __webpack_require__(2).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var core = __webpack_require__(23);
var LIBRARY = __webpack_require__(37);
var wksExt = __webpack_require__(106);
var defineProperty = __webpack_require__(7).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(56)('keys');
var uid = __webpack_require__(36);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 77 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(2).document;
module.exports = document && document.documentElement;


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(4);
var anObject = __webpack_require__(1);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(20)(Function.call, __webpack_require__(18).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),
/* 80 */
/***/ (function(module, exports) {

module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
var setPrototypeOf = __webpack_require__(79).set;
module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toInteger = __webpack_require__(26);
var defined = __webpack_require__(25);

module.exports = function repeat(count) {
  var str = String(defined(this));
  var res = '';
  var n = toInteger(count);
  if (n < 0 || n == Infinity) throw RangeError("Count can't be negative");
  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) res += str;
  return res;
};


/***/ }),
/* 83 */
/***/ (function(module, exports) {

// 20.2.2.28 Math.sign(x)
module.exports = Math.sign || function sign(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};


/***/ }),
/* 84 */
/***/ (function(module, exports) {

// 20.2.2.14 Math.expm1(x)
var $expm1 = Math.expm1;
module.exports = (!$expm1
  // Old FF bug
  || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
  // Tor Browser bug
  || $expm1(-2e-17) != -2e-17
) ? function expm1(x) {
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
} : $expm1;


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(26);
var defined = __webpack_require__(25);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(37);
var $export = __webpack_require__(0);
var redefine = __webpack_require__(14);
var hide = __webpack_require__(13);
var has = __webpack_require__(12);
var Iterators = __webpack_require__(49);
var $iterCreate = __webpack_require__(87);
var setToStringTag = __webpack_require__(47);
var getPrototypeOf = __webpack_require__(19);
var ITERATOR = __webpack_require__(5)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(40);
var descriptor = __webpack_require__(35);
var setToStringTag = __webpack_require__(47);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(13)(IteratorPrototype, __webpack_require__(5)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

// helper for String#{startsWith, endsWith, includes}
var isRegExp = __webpack_require__(60);
var defined = __webpack_require__(25);

module.exports = function (that, searchString, NAME) {
  if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

var MATCH = __webpack_require__(5)('match');
module.exports = function (KEY) {
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch (e) {
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch (f) { /* empty */ }
  } return true;
};


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(49);
var ITERATOR = __webpack_require__(5)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(7);
var createDesc = __webpack_require__(35);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(53);
var ITERATOR = __webpack_require__(5)('iterator');
var Iterators = __webpack_require__(49);
module.exports = __webpack_require__(23).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(248);

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)

var toObject = __webpack_require__(9);
var toAbsoluteIndex = __webpack_require__(39);
var toLength = __webpack_require__(8);
module.exports = function fill(value /* , start = 0, end = @length */) {
  var O = toObject(this);
  var length = toLength(O.length);
  var aLen = arguments.length;
  var index = toAbsoluteIndex(aLen > 1 ? arguments[1] : undefined, length);
  var end = aLen > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
  while (endPos > index) O[index++] = value;
  return O;
};


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(33);
var step = __webpack_require__(122);
var Iterators = __webpack_require__(49);
var toIObject = __webpack_require__(17);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(86)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(20);
var invoke = __webpack_require__(112);
var html = __webpack_require__(78);
var cel = __webpack_require__(74);
var global = __webpack_require__(2);
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(21)(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var macrotask = __webpack_require__(96).set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(21)(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver
  } else if (Observer) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    var promise = Promise.resolve();
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(11);

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(2);
var DESCRIPTORS = __webpack_require__(6);
var LIBRARY = __webpack_require__(37);
var $typed = __webpack_require__(66);
var hide = __webpack_require__(13);
var redefineAll = __webpack_require__(45);
var fails = __webpack_require__(3);
var anInstance = __webpack_require__(43);
var toInteger = __webpack_require__(26);
var toLength = __webpack_require__(8);
var toIndex = __webpack_require__(131);
var gOPN = __webpack_require__(41).f;
var dP = __webpack_require__(7).f;
var arrayFill = __webpack_require__(94);
var setToStringTag = __webpack_require__(47);
var ARRAY_BUFFER = 'ArrayBuffer';
var DATA_VIEW = 'DataView';
var PROTOTYPE = 'prototype';
var WRONG_LENGTH = 'Wrong length!';
var WRONG_INDEX = 'Wrong index!';
var $ArrayBuffer = global[ARRAY_BUFFER];
var $DataView = global[DATA_VIEW];
var Math = global.Math;
var RangeError = global.RangeError;
// eslint-disable-next-line no-shadow-restricted-names
var Infinity = global.Infinity;
var BaseBuffer = $ArrayBuffer;
var abs = Math.abs;
var pow = Math.pow;
var floor = Math.floor;
var log = Math.log;
var LN2 = Math.LN2;
var BUFFER = 'buffer';
var BYTE_LENGTH = 'byteLength';
var BYTE_OFFSET = 'byteOffset';
var $BUFFER = DESCRIPTORS ? '_b' : BUFFER;
var $LENGTH = DESCRIPTORS ? '_l' : BYTE_LENGTH;
var $OFFSET = DESCRIPTORS ? '_o' : BYTE_OFFSET;

// IEEE754 conversions based on https://github.com/feross/ieee754
function packIEEE754(value, mLen, nBytes) {
  var buffer = Array(nBytes);
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0;
  var i = 0;
  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
  var e, m, c;
  value = abs(value);
  // eslint-disable-next-line no-self-compare
  if (value != value || value === Infinity) {
    // eslint-disable-next-line no-self-compare
    m = value != value ? 1 : 0;
    e = eMax;
  } else {
    e = floor(log(value) / LN2);
    if (value * (c = pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }
    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * pow(2, eBias - 1) * pow(2, mLen);
      e = 0;
    }
  }
  for (; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
  e = e << mLen | m;
  eLen += mLen;
  for (; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
  buffer[--i] |= s * 128;
  return buffer;
}
function unpackIEEE754(buffer, mLen, nBytes) {
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = eLen - 7;
  var i = nBytes - 1;
  var s = buffer[i--];
  var e = s & 127;
  var m;
  s >>= 7;
  for (; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : s ? -Infinity : Infinity;
  } else {
    m = m + pow(2, mLen);
    e = e - eBias;
  } return (s ? -1 : 1) * m * pow(2, e - mLen);
}

function unpackI32(bytes) {
  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
}
function packI8(it) {
  return [it & 0xff];
}
function packI16(it) {
  return [it & 0xff, it >> 8 & 0xff];
}
function packI32(it) {
  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
}
function packF64(it) {
  return packIEEE754(it, 52, 8);
}
function packF32(it) {
  return packIEEE754(it, 23, 4);
}

function addGetter(C, key, internal) {
  dP(C[PROTOTYPE], key, { get: function () { return this[internal]; } });
}

function get(view, bytes, index, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = store.slice(start, start + bytes);
  return isLittleEndian ? pack : pack.reverse();
}
function set(view, bytes, index, conversion, value, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = conversion(+value);
  for (var i = 0; i < bytes; i++) store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
}

if (!$typed.ABV) {
  $ArrayBuffer = function ArrayBuffer(length) {
    anInstance(this, $ArrayBuffer, ARRAY_BUFFER);
    var byteLength = toIndex(length);
    this._b = arrayFill.call(Array(byteLength), 0);
    this[$LENGTH] = byteLength;
  };

  $DataView = function DataView(buffer, byteOffset, byteLength) {
    anInstance(this, $DataView, DATA_VIEW);
    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
    var bufferLength = buffer[$LENGTH];
    var offset = toInteger(byteOffset);
    if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset!');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
    if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
    this[$BUFFER] = buffer;
    this[$OFFSET] = offset;
    this[$LENGTH] = byteLength;
  };

  if (DESCRIPTORS) {
    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
    addGetter($DataView, BUFFER, '_b');
    addGetter($DataView, BYTE_LENGTH, '_l');
    addGetter($DataView, BYTE_OFFSET, '_o');
  }

  redefineAll($DataView[PROTOTYPE], {
    getInt8: function getInt8(byteOffset) {
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset) {
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1]));
    },
    getUint32: function getUint32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
    },
    getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
    },
    setInt8: function setInt8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setUint8: function setUint8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packF32, value, arguments[2]);
    },
    setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
      set(this, 8, byteOffset, packF64, value, arguments[2]);
    }
  });
} else {
  if (!fails(function () {
    $ArrayBuffer(1);
  }) || !fails(function () {
    new $ArrayBuffer(-1); // eslint-disable-line no-new
  }) || fails(function () {
    new $ArrayBuffer(); // eslint-disable-line no-new
    new $ArrayBuffer(1.5); // eslint-disable-line no-new
    new $ArrayBuffer(NaN); // eslint-disable-line no-new
    return $ArrayBuffer.name != ARRAY_BUFFER;
  })) {
    $ArrayBuffer = function ArrayBuffer(length) {
      anInstance(this, $ArrayBuffer);
      return new BaseBuffer(toIndex(length));
    };
    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
    for (var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j;) {
      if (!((key = keys[j++]) in $ArrayBuffer)) hide($ArrayBuffer, key, BaseBuffer[key]);
    }
    if (!LIBRARY) ArrayBufferProto.constructor = $ArrayBuffer;
  }
  // iOS Safari 7.x bug
  var view = new $DataView(new $ArrayBuffer(2));
  var $setInt8 = $DataView[PROTOTYPE].setInt8;
  view.setInt8(0, 2147483648);
  view.setInt8(1, 2147483649);
  if (view.getInt8(0) || !view.getInt8(1)) redefineAll($DataView[PROTOTYPE], {
    setInt8: function setInt8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    }
  }, true);
}
setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);
hide($DataView[PROTOTYPE], $typed.VIEW, true);
exports[ARRAY_BUFFER] = $ArrayBuffer;
exports[DATA_VIEW] = $DataView;


/***/ }),
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(6) && !__webpack_require__(3)(function () {
  return Object.defineProperty(__webpack_require__(74)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(5);


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(12);
var toIObject = __webpack_require__(17);
var arrayIndexOf = __webpack_require__(57)(false);
var IE_PROTO = __webpack_require__(76)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(7);
var anObject = __webpack_require__(1);
var getKeys = __webpack_require__(38);

module.exports = __webpack_require__(6) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(17);
var gOPN = __webpack_require__(41).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(38);
var gOPS = __webpack_require__(58);
var pIE = __webpack_require__(52);
var toObject = __webpack_require__(9);
var IObject = __webpack_require__(51);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(3)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var aFunction = __webpack_require__(11);
var isObject = __webpack_require__(4);
var invoke = __webpack_require__(112);
var arraySlice = [].slice;
var factories = {};

var construct = function (F, len, args) {
  if (!(len in factories)) {
    for (var n = [], i = 0; i < len; i++) n[i] = 'a[' + i + ']';
    // eslint-disable-next-line no-new-func
    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  } return factories[len](F, args);
};

module.exports = Function.bind || function bind(that /* , ...args */) {
  var fn = aFunction(this);
  var partArgs = arraySlice.call(arguments, 1);
  var bound = function (/* args... */) {
    var args = partArgs.concat(arraySlice.call(arguments));
    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
  };
  if (isObject(fn.prototype)) bound.prototype = fn.prototype;
  return bound;
};


/***/ }),
/* 112 */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

var $parseInt = __webpack_require__(2).parseInt;
var $trim = __webpack_require__(48).trim;
var ws = __webpack_require__(80);
var hex = /^[-+]?0[xX]/;

module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix) {
  var string = $trim(String(str), 3);
  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
} : $parseInt;


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

var $parseFloat = __webpack_require__(2).parseFloat;
var $trim = __webpack_require__(48).trim;

module.exports = 1 / $parseFloat(__webpack_require__(80) + '-0') !== -Infinity ? function parseFloat(str) {
  var string = $trim(String(str), 3);
  var result = $parseFloat(string);
  return result === 0 && string.charAt(0) == '-' ? -0 : result;
} : $parseFloat;


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

var cof = __webpack_require__(21);
module.exports = function (it, msg) {
  if (typeof it != 'number' && cof(it) != 'Number') throw TypeError(msg);
  return +it;
};


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var isObject = __webpack_require__(4);
var floor = Math.floor;
module.exports = function isInteger(it) {
  return !isObject(it) && isFinite(it) && floor(it) === it;
};


/***/ }),
/* 117 */
/***/ (function(module, exports) {

// 20.2.2.20 Math.log1p(x)
module.exports = Math.log1p || function log1p(x) {
  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
};


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.16 Math.fround(x)
var sign = __webpack_require__(83);
var pow = Math.pow;
var EPSILON = pow(2, -52);
var EPSILON32 = pow(2, -23);
var MAX32 = pow(2, 127) * (2 - EPSILON32);
var MIN32 = pow(2, -126);

var roundTiesToEven = function (n) {
  return n + 1 / EPSILON - 1 / EPSILON;
};

module.exports = Math.fround || function fround(x) {
  var $abs = Math.abs(x);
  var $sign = sign(x);
  var a, result;
  if ($abs < MIN32) return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
  a = (1 + EPSILON32 / EPSILON) * $abs;
  result = a - (a - $abs);
  // eslint-disable-next-line no-self-compare
  if (result > MAX32 || result != result) return $sign * Infinity;
  return $sign * result;
};


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(1);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

var aFunction = __webpack_require__(11);
var toObject = __webpack_require__(9);
var IObject = __webpack_require__(51);
var toLength = __webpack_require__(8);

module.exports = function (that, callbackfn, aLen, memo, isRight) {
  aFunction(callbackfn);
  var O = toObject(that);
  var self = IObject(O);
  var length = toLength(O.length);
  var index = isRight ? length - 1 : 0;
  var i = isRight ? -1 : 1;
  if (aLen < 2) for (;;) {
    if (index in self) {
      memo = self[index];
      index += i;
      break;
    }
    index += i;
    if (isRight ? index < 0 : length <= index) {
      throw TypeError('Reduce of empty array with no initial value');
    }
  }
  for (;isRight ? index >= 0 : length > index; index += i) if (index in self) {
    memo = callbackfn(memo, self[index], index, O);
  }
  return memo;
};


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)

var toObject = __webpack_require__(9);
var toAbsoluteIndex = __webpack_require__(39);
var toLength = __webpack_require__(8);

module.exports = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
  var O = toObject(this);
  var len = toLength(O.length);
  var to = toAbsoluteIndex(target, len);
  var from = toAbsoluteIndex(start, len);
  var end = arguments.length > 2 ? arguments[2] : undefined;
  var count = Math.min((end === undefined ? len : toAbsoluteIndex(end, len)) - from, len - to);
  var inc = 1;
  if (from < to && to < from + count) {
    inc = -1;
    from += count - 1;
    to += count - 1;
  }
  while (count-- > 0) {
    if (from in O) O[to] = O[from];
    else delete O[to];
    to += inc;
    from += inc;
  } return O;
};


/***/ }),
/* 122 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

// 21.2.5.3 get RegExp.prototype.flags()
if (__webpack_require__(6) && /./g.flags != 'g') __webpack_require__(7).f(RegExp.prototype, 'flags', {
  configurable: true,
  get: __webpack_require__(62)
});


/***/ }),
/* 124 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(1);
var isObject = __webpack_require__(4);
var newPromiseCapability = __webpack_require__(98);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(127);
var validate = __webpack_require__(50);
var MAP = 'Map';

// 23.1 Map Objects
module.exports = __webpack_require__(65)(MAP, function (get) {
  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key) {
    var entry = strong.getEntry(validate(this, MAP), key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value) {
    return strong.def(validate(this, MAP), key === 0 ? 0 : key, value);
  }
}, strong, true);


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dP = __webpack_require__(7).f;
var create = __webpack_require__(40);
var redefineAll = __webpack_require__(45);
var ctx = __webpack_require__(20);
var anInstance = __webpack_require__(43);
var forOf = __webpack_require__(44);
var $iterDefine = __webpack_require__(86);
var step = __webpack_require__(122);
var setSpecies = __webpack_require__(42);
var DESCRIPTORS = __webpack_require__(6);
var fastKey = __webpack_require__(32).fastKey;
var validate = __webpack_require__(50);
var SIZE = DESCRIPTORS ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = validate(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        validate(this, NAME);
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (DESCRIPTORS) dP(C.prototype, 'size', {
      get: function () {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); // target
      this._k = kind;                     // kind
      this._l = undefined;                // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if (kind == 'keys') return step(0, entry.k);
      if (kind == 'values') return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(127);
var validate = __webpack_require__(50);
var SET = 'Set';

// 23.2 Set Objects
module.exports = __webpack_require__(65)(SET, function (get) {
  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value) {
    return strong.def(validate(this, SET), value = value === 0 ? 0 : value, value);
  }
}, strong);


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var each = __webpack_require__(28)(0);
var redefine = __webpack_require__(14);
var meta = __webpack_require__(32);
var assign = __webpack_require__(110);
var weak = __webpack_require__(130);
var isObject = __webpack_require__(4);
var fails = __webpack_require__(3);
var validate = __webpack_require__(50);
var WEAK_MAP = 'WeakMap';
var getWeak = meta.getWeak;
var isExtensible = Object.isExtensible;
var uncaughtFrozenStore = weak.ufstore;
var tmp = {};
var InternalMap;

var wrapper = function (get) {
  return function WeakMap() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
};

var methods = {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key) {
    if (isObject(key)) {
      var data = getWeak(key);
      if (data === true) return uncaughtFrozenStore(validate(this, WEAK_MAP)).get(key);
      return data ? data[this._i] : undefined;
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value) {
    return weak.def(validate(this, WEAK_MAP), key, value);
  }
};

// 23.3 WeakMap Objects
var $WeakMap = module.exports = __webpack_require__(65)(WEAK_MAP, wrapper, methods, weak, true, true);

// IE11 WeakMap frozen keys fix
if (fails(function () { return new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7; })) {
  InternalMap = weak.getConstructor(wrapper, WEAK_MAP);
  assign(InternalMap.prototype, methods);
  meta.NEED = true;
  each(['delete', 'has', 'get', 'set'], function (key) {
    var proto = $WeakMap.prototype;
    var method = proto[key];
    redefine(proto, key, function (a, b) {
      // store frozen objects on internal weakmap shim
      if (isObject(a) && !isExtensible(a)) {
        if (!this._f) this._f = new InternalMap();
        var result = this._f[key](a, b);
        return key == 'set' ? this : result;
      // store all the rest on native weakmap
      } return method.call(this, a, b);
    });
  });
}


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var redefineAll = __webpack_require__(45);
var getWeak = __webpack_require__(32).getWeak;
var anObject = __webpack_require__(1);
var isObject = __webpack_require__(4);
var anInstance = __webpack_require__(43);
var forOf = __webpack_require__(44);
var createArrayMethod = __webpack_require__(28);
var $has = __webpack_require__(12);
var validate = __webpack_require__(50);
var arrayFind = createArrayMethod(5);
var arrayFindIndex = createArrayMethod(6);
var id = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function (that) {
  return that._l || (that._l = new UncaughtFrozenStore());
};
var UncaughtFrozenStore = function () {
  this.a = [];
};
var findUncaughtFrozen = function (store, key) {
  return arrayFind(store.a, function (it) {
    return it[0] === key;
  });
};
UncaughtFrozenStore.prototype = {
  get: function (key) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) return entry[1];
  },
  has: function (key) {
    return !!findUncaughtFrozen(this, key);
  },
  set: function (key, value) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) entry[1] = value;
    else this.a.push([key, value]);
  },
  'delete': function (key) {
    var index = arrayFindIndex(this.a, function (it) {
      return it[0] === key;
    });
    if (~index) this.a.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;      // collection type
      that._i = id++;      // collection id
      that._l = undefined; // leak store for uncaught frozen objects
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function (key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME))['delete'](key);
        return data && $has(data, this._i) && delete data[this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME)).has(key);
        return data && $has(data, this._i);
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var data = getWeak(anObject(key), true);
    if (data === true) uncaughtFrozenStore(that).set(key, value);
    else data[that._i] = value;
    return that;
  },
  ufstore: uncaughtFrozenStore
};


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/ecma262/#sec-toindex
var toInteger = __webpack_require__(26);
var toLength = __webpack_require__(8);
module.exports = function (it) {
  if (it === undefined) return 0;
  var number = toInteger(it);
  var length = toLength(number);
  if (number !== length) throw RangeError('Wrong length!');
  return length;
};


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

// all object keys, includes non-enumerable and symbols
var gOPN = __webpack_require__(41);
var gOPS = __webpack_require__(58);
var anObject = __webpack_require__(1);
var Reflect = __webpack_require__(2).Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it) {
  var keys = gOPN.f(anObject(it));
  var getSymbols = gOPS.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray
var isArray = __webpack_require__(59);
var isObject = __webpack_require__(4);
var toLength = __webpack_require__(8);
var ctx = __webpack_require__(20);
var IS_CONCAT_SPREADABLE = __webpack_require__(5)('isConcatSpreadable');

function flattenIntoArray(target, original, source, sourceLen, start, depth, mapper, thisArg) {
  var targetIndex = start;
  var sourceIndex = 0;
  var mapFn = mapper ? ctx(mapper, thisArg, 3) : false;
  var element, spreadable;

  while (sourceIndex < sourceLen) {
    if (sourceIndex in source) {
      element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];

      spreadable = false;
      if (isObject(element)) {
        spreadable = element[IS_CONCAT_SPREADABLE];
        spreadable = spreadable !== undefined ? !!spreadable : isArray(element);
      }

      if (spreadable && depth > 0) {
        targetIndex = flattenIntoArray(target, original, element, toLength(element.length), targetIndex, depth - 1) - 1;
      } else {
        if (targetIndex >= 0x1fffffffffffff) throw TypeError();
        target[targetIndex] = element;
      }

      targetIndex++;
    }
    sourceIndex++;
  }
  return targetIndex;
}

module.exports = flattenIntoArray;


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-string-pad-start-end
var toLength = __webpack_require__(8);
var repeat = __webpack_require__(82);
var defined = __webpack_require__(25);

module.exports = function (that, maxLength, fillString, left) {
  var S = String(defined(that));
  var stringLength = S.length;
  var fillStr = fillString === undefined ? ' ' : String(fillString);
  var intMaxLength = toLength(maxLength);
  if (intMaxLength <= stringLength || fillStr == '') return S;
  var fillLen = intMaxLength - stringLength;
  var stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
  if (stringFiller.length > fillLen) stringFiller = stringFiller.slice(0, fillLen);
  return left ? stringFiller + S : S + stringFiller;
};


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

var getKeys = __webpack_require__(38);
var toIObject = __webpack_require__(17);
var isEnum = __webpack_require__(52).f;
module.exports = function (isEntries) {
  return function (it) {
    var O = toIObject(it);
    var keys = getKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) if (isEnum.call(O, key = keys[i++])) {
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = __webpack_require__(53);
var from = __webpack_require__(137);
module.exports = function (NAME) {
  return function toJSON() {
    if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};


/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

var forOf = __webpack_require__(44);

module.exports = function (iter, ITERATOR) {
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};


/***/ }),
/* 138 */
/***/ (function(module, exports) {

// https://rwaldron.github.io/proposal-math-extensions/
module.exports = Math.scale || function scale(x, inLow, inHigh, outLow, outHigh) {
  if (
    arguments.length === 0
      // eslint-disable-next-line no-self-compare
      || x != x
      // eslint-disable-next-line no-self-compare
      || inLow != inLow
      // eslint-disable-next-line no-self-compare
      || inHigh != inHigh
      // eslint-disable-next-line no-self-compare
      || outLow != outLow
      // eslint-disable-next-line no-self-compare
      || outHigh != outHigh
  ) return NaN;
  if (x === Infinity || x === -Infinity) return x;
  return (x - inLow) * (outHigh - outLow) / (inHigh - inLow) + outLow;
};


/***/ }),
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function(condition, format, a, b, c, d, e, f) {
  if (process.env.NODE_ENV !== 'production') {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)))

/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _stripDiacritics = __webpack_require__(149);

var _stripDiacritics2 = _interopRequireDefault(_stripDiacritics);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function filterOptions(options, filterValue, excludeOptions, props) {
	var _this = this;

	if (props.ignoreAccents) {
		filterValue = (0, _stripDiacritics2.default)(filterValue);
	}

	if (props.ignoreCase) {
		filterValue = filterValue.toLowerCase();
	}

	if (excludeOptions) excludeOptions = excludeOptions.map(function (i) {
		return i[props.valueKey];
	});

	return options.filter(function (option) {
		if (excludeOptions && excludeOptions.indexOf(option[props.valueKey]) > -1) return false;
		if (props.filterOption) return props.filterOption.call(_this, option, filterValue);
		if (!filterValue) return true;
		var valueTest = String(option[props.valueKey]);
		var labelTest = String(option[props.labelKey]);
		if (props.ignoreAccents) {
			if (props.matchProp !== 'label') valueTest = (0, _stripDiacritics2.default)(valueTest);
			if (props.matchProp !== 'value') labelTest = (0, _stripDiacritics2.default)(labelTest);
		}
		if (props.ignoreCase) {
			if (props.matchProp !== 'label') valueTest = valueTest.toLowerCase();
			if (props.matchProp !== 'value') labelTest = labelTest.toLowerCase();
		}
		return props.matchPos === 'start' ? props.matchProp !== 'label' && valueTest.substr(0, filterValue.length) === filterValue || props.matchProp !== 'value' && labelTest.substr(0, filterValue.length) === filterValue : props.matchProp !== 'label' && valueTest.indexOf(filterValue) >= 0 || props.matchProp !== 'value' && labelTest.indexOf(filterValue) >= 0;
	});
}

exports.default = filterOptions;

/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = stripDiacritics;
var map = [{ 'base': 'A', 'letters': /[\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F]/g }, { 'base': 'AA', 'letters': /[\uA732]/g }, { 'base': 'AE', 'letters': /[\u00C6\u01FC\u01E2]/g }, { 'base': 'AO', 'letters': /[\uA734]/g }, { 'base': 'AU', 'letters': /[\uA736]/g }, { 'base': 'AV', 'letters': /[\uA738\uA73A]/g }, { 'base': 'AY', 'letters': /[\uA73C]/g }, { 'base': 'B', 'letters': /[\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181]/g }, { 'base': 'C', 'letters': /[\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E]/g }, { 'base': 'D', 'letters': /[\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779]/g }, { 'base': 'DZ', 'letters': /[\u01F1\u01C4]/g }, { 'base': 'Dz', 'letters': /[\u01F2\u01C5]/g }, { 'base': 'E', 'letters': /[\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E]/g }, { 'base': 'F', 'letters': /[\u0046\u24BB\uFF26\u1E1E\u0191\uA77B]/g }, { 'base': 'G', 'letters': /[\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E]/g }, { 'base': 'H', 'letters': /[\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D]/g }, { 'base': 'I', 'letters': /[\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197]/g }, { 'base': 'J', 'letters': /[\u004A\u24BF\uFF2A\u0134\u0248]/g }, { 'base': 'K', 'letters': /[\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2]/g }, { 'base': 'L', 'letters': /[\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780]/g }, { 'base': 'LJ', 'letters': /[\u01C7]/g }, { 'base': 'Lj', 'letters': /[\u01C8]/g }, { 'base': 'M', 'letters': /[\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C]/g }, { 'base': 'N', 'letters': /[\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4]/g }, { 'base': 'NJ', 'letters': /[\u01CA]/g }, { 'base': 'Nj', 'letters': /[\u01CB]/g }, { 'base': 'O', 'letters': /[\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C]/g }, { 'base': 'OI', 'letters': /[\u01A2]/g }, { 'base': 'OO', 'letters': /[\uA74E]/g }, { 'base': 'OU', 'letters': /[\u0222]/g }, { 'base': 'P', 'letters': /[\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754]/g }, { 'base': 'Q', 'letters': /[\u0051\u24C6\uFF31\uA756\uA758\u024A]/g }, { 'base': 'R', 'letters': /[\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782]/g }, { 'base': 'S', 'letters': /[\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784]/g }, { 'base': 'T', 'letters': /[\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786]/g }, { 'base': 'TZ', 'letters': /[\uA728]/g }, { 'base': 'U', 'letters': /[\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244]/g }, { 'base': 'V', 'letters': /[\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245]/g }, { 'base': 'VY', 'letters': /[\uA760]/g }, { 'base': 'W', 'letters': /[\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72]/g }, { 'base': 'X', 'letters': /[\u0058\u24CD\uFF38\u1E8A\u1E8C]/g }, { 'base': 'Y', 'letters': /[\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE]/g }, { 'base': 'Z', 'letters': /[\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762]/g }, { 'base': 'a', 'letters': /[\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250]/g }, { 'base': 'aa', 'letters': /[\uA733]/g }, { 'base': 'ae', 'letters': /[\u00E6\u01FD\u01E3]/g }, { 'base': 'ao', 'letters': /[\uA735]/g }, { 'base': 'au', 'letters': /[\uA737]/g }, { 'base': 'av', 'letters': /[\uA739\uA73B]/g }, { 'base': 'ay', 'letters': /[\uA73D]/g }, { 'base': 'b', 'letters': /[\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253]/g }, { 'base': 'c', 'letters': /[\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184]/g }, { 'base': 'd', 'letters': /[\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A]/g }, { 'base': 'dz', 'letters': /[\u01F3\u01C6]/g }, { 'base': 'e', 'letters': /[\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD]/g }, { 'base': 'f', 'letters': /[\u0066\u24D5\uFF46\u1E1F\u0192\uA77C]/g }, { 'base': 'g', 'letters': /[\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F]/g }, { 'base': 'h', 'letters': /[\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265]/g }, { 'base': 'hv', 'letters': /[\u0195]/g }, { 'base': 'i', 'letters': /[\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131]/g }, { 'base': 'j', 'letters': /[\u006A\u24D9\uFF4A\u0135\u01F0\u0249]/g }, { 'base': 'k', 'letters': /[\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3]/g }, { 'base': 'l', 'letters': /[\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747]/g }, { 'base': 'lj', 'letters': /[\u01C9]/g }, { 'base': 'm', 'letters': /[\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F]/g }, { 'base': 'n', 'letters': /[\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5]/g }, { 'base': 'nj', 'letters': /[\u01CC]/g }, { 'base': 'o', 'letters': /[\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275]/g }, { 'base': 'oi', 'letters': /[\u01A3]/g }, { 'base': 'ou', 'letters': /[\u0223]/g }, { 'base': 'oo', 'letters': /[\uA74F]/g }, { 'base': 'p', 'letters': /[\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755]/g }, { 'base': 'q', 'letters': /[\u0071\u24E0\uFF51\u024B\uA757\uA759]/g }, { 'base': 'r', 'letters': /[\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783]/g }, { 'base': 's', 'letters': /[\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B]/g }, { 'base': 't', 'letters': /[\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787]/g }, { 'base': 'tz', 'letters': /[\uA729]/g }, { 'base': 'u', 'letters': /[\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289]/g }, { 'base': 'v', 'letters': /[\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C]/g }, { 'base': 'vy', 'letters': /[\uA761]/g }, { 'base': 'w', 'letters': /[\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73]/g }, { 'base': 'x', 'letters': /[\u0078\u24E7\uFF58\u1E8B\u1E8D]/g }, { 'base': 'y', 'letters': /[\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF]/g }, { 'base': 'z', 'letters': /[\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763]/g }];

function stripDiacritics(str) {
	for (var i = 0; i < map.length; i++) {
		str = str.replace(map[i].letters, map[i].base);
	}
	return str;
};

/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _classnames = __webpack_require__(73);

var _classnames2 = _interopRequireDefault(_classnames);

var _react = __webpack_require__(10);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function menuRenderer(_ref) {
	var focusedOption = _ref.focusedOption,
	    instancePrefix = _ref.instancePrefix,
	    labelKey = _ref.labelKey,
	    onFocus = _ref.onFocus,
	    onSelect = _ref.onSelect,
	    optionClassName = _ref.optionClassName,
	    optionComponent = _ref.optionComponent,
	    optionRenderer = _ref.optionRenderer,
	    options = _ref.options,
	    valueArray = _ref.valueArray,
	    valueKey = _ref.valueKey,
	    onOptionRef = _ref.onOptionRef;

	var Option = optionComponent;

	return options.map(function (option, i) {
		var isSelected = valueArray && valueArray.indexOf(option) > -1;
		var isFocused = option === focusedOption;
		var optionClass = (0, _classnames2.default)(optionClassName, {
			'Select-option': true,
			'is-selected': isSelected,
			'is-focused': isFocused,
			'is-disabled': option.disabled
		});

		return _react2.default.createElement(
			Option,
			{
				className: optionClass,
				instancePrefix: instancePrefix,
				isDisabled: option.disabled,
				isFocused: isFocused,
				isSelected: isSelected,
				key: 'option-' + i + '-' + option[valueKey],
				onFocus: onFocus,
				onSelect: onSelect,
				option: option,
				optionIndex: i,
				ref: function ref(_ref2) {
					onOptionRef(_ref2, isFocused);
				}
			},
			optionRenderer(option, i)
		);
	});
}

exports.default = menuRenderer;

/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(10);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(29);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = __webpack_require__(73);

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Value = function (_React$Component) {
	_inherits(Value, _React$Component);

	function Value(props) {
		_classCallCheck(this, Value);

		var _this = _possibleConstructorReturn(this, (Value.__proto__ || Object.getPrototypeOf(Value)).call(this, props));

		_this.handleMouseDown = _this.handleMouseDown.bind(_this);
		_this.onRemove = _this.onRemove.bind(_this);
		_this.handleTouchEndRemove = _this.handleTouchEndRemove.bind(_this);
		_this.handleTouchMove = _this.handleTouchMove.bind(_this);
		_this.handleTouchStart = _this.handleTouchStart.bind(_this);
		return _this;
	}

	_createClass(Value, [{
		key: 'handleMouseDown',
		value: function handleMouseDown(event) {
			if (event.type === 'mousedown' && event.button !== 0) {
				return;
			}
			if (this.props.onClick) {
				event.stopPropagation();
				this.props.onClick(this.props.value, event);
				return;
			}
			if (this.props.value.href) {
				event.stopPropagation();
			}
		}
	}, {
		key: 'onRemove',
		value: function onRemove(event) {
			event.preventDefault();
			event.stopPropagation();
			this.props.onRemove(this.props.value);
		}
	}, {
		key: 'handleTouchEndRemove',
		value: function handleTouchEndRemove(event) {
			// Check if the view is being dragged, In this case
			// we don't want to fire the click event (because the user only wants to scroll)
			if (this.dragging) return;

			// Fire the mouse events
			this.onRemove(event);
		}
	}, {
		key: 'handleTouchMove',
		value: function handleTouchMove(event) {
			// Set a flag that the view is being dragged
			this.dragging = true;
		}
	}, {
		key: 'handleTouchStart',
		value: function handleTouchStart(event) {
			// Set a flag that the view is not being dragged
			this.dragging = false;
		}
	}, {
		key: 'renderRemoveIcon',
		value: function renderRemoveIcon() {
			if (this.props.disabled || !this.props.onRemove) return;
			return _react2.default.createElement(
				'span',
				{ className: 'Select-value-icon',
					'aria-hidden': 'true',
					onMouseDown: this.onRemove,
					onTouchEnd: this.handleTouchEndRemove,
					onTouchStart: this.handleTouchStart,
					onTouchMove: this.handleTouchMove },
				'\xD7'
			);
		}
	}, {
		key: 'renderLabel',
		value: function renderLabel() {
			var className = 'Select-value-label';
			return this.props.onClick || this.props.value.href ? _react2.default.createElement(
				'a',
				{ className: className, href: this.props.value.href, target: this.props.value.target, onMouseDown: this.handleMouseDown, onTouchEnd: this.handleMouseDown },
				this.props.children
			) : _react2.default.createElement(
				'span',
				{ className: className, role: 'option', 'aria-selected': 'true', id: this.props.id },
				this.props.children
			);
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				{ className: (0, _classnames2.default)('Select-value', this.props.value.className),
					style: this.props.value.style,
					title: this.props.value.title
				},
				this.renderRemoveIcon(),
				this.renderLabel()
			);
		}
	}]);

	return Value;
}(_react2.default.Component);

;

Value.propTypes = {
	children: _propTypes2.default.node,
	disabled: _propTypes2.default.bool, // disabled prop passed to ReactSelect
	id: _propTypes2.default.string, // Unique id for the value - used for aria
	onClick: _propTypes2.default.func, // method to handle click on value label
	onRemove: _propTypes2.default.func, // method to handle removal of the value
	value: _propTypes2.default.object.isRequired // the option object for this value
};

exports.default = Value;

/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(10);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(29);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Select = __webpack_require__(72);

var _Select2 = _interopRequireDefault(_Select);

var _stripDiacritics = __webpack_require__(149);

var _stripDiacritics2 = _interopRequireDefault(_stripDiacritics);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
	autoload: _propTypes2.default.bool.isRequired, // automatically call the `loadOptions` prop on-mount; defaults to true
	cache: _propTypes2.default.any, // object to use to cache results; set to null/false to disable caching
	children: _propTypes2.default.func.isRequired, // Child function responsible for creating the inner Select component; (props: Object): PropTypes.element
	ignoreAccents: _propTypes2.default.bool, // strip diacritics when filtering; defaults to true
	ignoreCase: _propTypes2.default.bool, // perform case-insensitive filtering; defaults to true
	loadOptions: _propTypes2.default.func.isRequired, // callback to load options asynchronously; (inputValue: string, callback: Function): ?Promise
	loadingPlaceholder: _propTypes2.default.oneOfType([// replaces the placeholder while options are loading
	_propTypes2.default.string, _propTypes2.default.node]),
	multi: _propTypes2.default.bool, // multi-value input
	noResultsText: _propTypes2.default.oneOfType([// field noResultsText, displayed when no options come back from the server
	_propTypes2.default.string, _propTypes2.default.node]),
	onChange: _propTypes2.default.func, // onChange handler: function (newValue) {}
	onInputChange: _propTypes2.default.func, // optional for keeping track of what is being typed
	options: _propTypes2.default.array.isRequired, // array of options
	placeholder: _propTypes2.default.oneOfType([// field placeholder, displayed when there's no value (shared with Select)
	_propTypes2.default.string, _propTypes2.default.node]),
	searchPromptText: _propTypes2.default.oneOfType([// label to prompt for search input
	_propTypes2.default.string, _propTypes2.default.node]),
	value: _propTypes2.default.any // initial field value
};

var defaultCache = {};

var defaultProps = {
	autoload: true,
	cache: defaultCache,
	children: defaultChildren,
	ignoreAccents: true,
	ignoreCase: true,
	loadingPlaceholder: 'Loading...',
	options: [],
	searchPromptText: 'Type to search'
};

var Async = function (_Component) {
	_inherits(Async, _Component);

	function Async(props, context) {
		_classCallCheck(this, Async);

		var _this = _possibleConstructorReturn(this, (Async.__proto__ || Object.getPrototypeOf(Async)).call(this, props, context));

		_this._cache = props.cache === defaultCache ? {} : props.cache;

		_this.state = {
			inputValue: '',
			isLoading: false,
			options: props.options
		};

		_this.onInputChange = _this.onInputChange.bind(_this);
		return _this;
	}

	_createClass(Async, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var autoload = this.props.autoload;


			if (autoload) {
				this.loadOptions('');
			}
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			if (nextProps.options !== this.props.options) {
				this.setState({
					options: nextProps.options
				});
			}
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			this._callback = null;
		}
	}, {
		key: 'loadOptions',
		value: function loadOptions(inputValue) {
			var _this2 = this;

			var loadOptions = this.props.loadOptions;

			var cache = this._cache;

			if (cache && Object.prototype.hasOwnProperty.call(cache, inputValue)) {
				this.setState({
					options: cache[inputValue]
				});

				return;
			}

			var callback = function callback(error, data) {
				if (callback === _this2._callback) {
					_this2._callback = null;

					var options = data && data.options || [];

					if (cache) {
						cache[inputValue] = options;
					}

					_this2.setState({
						isLoading: false,
						options: options
					});
				}
			};

			// Ignore all but the most recent request
			this._callback = callback;

			var promise = loadOptions(inputValue, callback);
			if (promise) {
				promise.then(function (data) {
					return callback(null, data);
				}, function (error) {
					return callback(error);
				});
			}

			if (this._callback && !this.state.isLoading) {
				this.setState({
					isLoading: true
				});
			}
		}
	}, {
		key: 'onInputChange',
		value: function onInputChange(inputValue) {
			var _props = this.props,
			    ignoreAccents = _props.ignoreAccents,
			    ignoreCase = _props.ignoreCase,
			    onInputChange = _props.onInputChange;

			var transformedInputValue = inputValue;

			if (ignoreAccents) {
				transformedInputValue = (0, _stripDiacritics2.default)(transformedInputValue);
			}

			if (ignoreCase) {
				transformedInputValue = transformedInputValue.toLowerCase();
			}

			if (onInputChange) {
				onInputChange(transformedInputValue);
			}

			this.setState({ inputValue: inputValue });
			this.loadOptions(transformedInputValue);

			// Return the original input value to avoid modifying the user's view of the input while typing.
			return inputValue;
		}
	}, {
		key: 'noResultsText',
		value: function noResultsText() {
			var _props2 = this.props,
			    loadingPlaceholder = _props2.loadingPlaceholder,
			    noResultsText = _props2.noResultsText,
			    searchPromptText = _props2.searchPromptText;
			var _state = this.state,
			    inputValue = _state.inputValue,
			    isLoading = _state.isLoading;


			if (isLoading) {
				return loadingPlaceholder;
			}
			if (inputValue && noResultsText) {
				return noResultsText;
			}
			return searchPromptText;
		}
	}, {
		key: 'focus',
		value: function focus() {
			this.select.focus();
		}
	}, {
		key: 'render',
		value: function render() {
			var _this3 = this;

			var _props3 = this.props,
			    children = _props3.children,
			    loadingPlaceholder = _props3.loadingPlaceholder,
			    multi = _props3.multi,
			    onChange = _props3.onChange,
			    placeholder = _props3.placeholder,
			    value = _props3.value;
			var _state2 = this.state,
			    isLoading = _state2.isLoading,
			    options = _state2.options;


			var props = {
				noResultsText: this.noResultsText(),
				placeholder: isLoading ? loadingPlaceholder : placeholder,
				options: isLoading && loadingPlaceholder ? [] : options,
				ref: function ref(_ref) {
					return _this3.select = _ref;
				}
			};

			return children(_extends({}, this.props, props, {
				isLoading: isLoading,
				onInputChange: this.onInputChange
			}));
		}
	}]);

	return Async;
}(_react.Component);

exports.default = Async;


Async.propTypes = propTypes;
Async.defaultProps = defaultProps;

function defaultChildren(props) {
	return _react2.default.createElement(_Select2.default, props);
}

/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(10);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(29);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Select = __webpack_require__(72);

var _Select2 = _interopRequireDefault(_Select);

var _defaultFilterOptions = __webpack_require__(148);

var _defaultFilterOptions2 = _interopRequireDefault(_defaultFilterOptions);

var _defaultMenuRenderer = __webpack_require__(150);

var _defaultMenuRenderer2 = _interopRequireDefault(_defaultMenuRenderer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CreatableSelect = function (_React$Component) {
	_inherits(CreatableSelect, _React$Component);

	function CreatableSelect(props, context) {
		_classCallCheck(this, CreatableSelect);

		var _this = _possibleConstructorReturn(this, (CreatableSelect.__proto__ || Object.getPrototypeOf(CreatableSelect)).call(this, props, context));

		_this.filterOptions = _this.filterOptions.bind(_this);
		_this.menuRenderer = _this.menuRenderer.bind(_this);
		_this.onInputKeyDown = _this.onInputKeyDown.bind(_this);
		_this.onInputChange = _this.onInputChange.bind(_this);
		_this.onOptionSelect = _this.onOptionSelect.bind(_this);
		return _this;
	}

	_createClass(CreatableSelect, [{
		key: 'createNewOption',
		value: function createNewOption() {
			var _props = this.props,
			    isValidNewOption = _props.isValidNewOption,
			    newOptionCreator = _props.newOptionCreator,
			    onNewOptionClick = _props.onNewOptionClick,
			    _props$options = _props.options,
			    options = _props$options === undefined ? [] : _props$options,
			    shouldKeyDownEventCreateNewOption = _props.shouldKeyDownEventCreateNewOption;


			if (isValidNewOption({ label: this.inputValue })) {
				var option = newOptionCreator({ label: this.inputValue, labelKey: this.labelKey, valueKey: this.valueKey });
				var _isOptionUnique = this.isOptionUnique({ option: option });

				// Don't add the same option twice.
				if (_isOptionUnique) {
					if (onNewOptionClick) {
						onNewOptionClick(option);
					} else {
						options.unshift(option);

						this.select.selectValue(option);
					}
				}
			}
		}
	}, {
		key: 'filterOptions',
		value: function filterOptions() {
			var _props2 = this.props,
			    filterOptions = _props2.filterOptions,
			    isValidNewOption = _props2.isValidNewOption,
			    options = _props2.options,
			    promptTextCreator = _props2.promptTextCreator;

			// TRICKY Check currently selected options as well.
			// Don't display a create-prompt for a value that's selected.
			// This covers async edge-cases where a newly-created Option isn't yet in the async-loaded array.

			var excludeOptions = (arguments.length <= 2 ? undefined : arguments[2]) || [];

			var filteredOptions = filterOptions.apply(undefined, arguments) || [];

			if (isValidNewOption({ label: this.inputValue })) {
				var _newOptionCreator = this.props.newOptionCreator;


				var option = _newOptionCreator({
					label: this.inputValue,
					labelKey: this.labelKey,
					valueKey: this.valueKey
				});

				// TRICKY Compare to all options (not just filtered options) in case option has already been selected).
				// For multi-selects, this would remove it from the filtered list.
				var _isOptionUnique2 = this.isOptionUnique({
					option: option,
					options: excludeOptions.concat(filteredOptions)
				});

				if (_isOptionUnique2) {
					var prompt = promptTextCreator(this.inputValue);

					this._createPlaceholderOption = _newOptionCreator({
						label: prompt,
						labelKey: this.labelKey,
						valueKey: this.valueKey
					});

					filteredOptions.unshift(this._createPlaceholderOption);
				}
			}

			return filteredOptions;
		}
	}, {
		key: 'isOptionUnique',
		value: function isOptionUnique(_ref) {
			var option = _ref.option,
			    options = _ref.options;
			var isOptionUnique = this.props.isOptionUnique;


			options = options || this.select.filterOptions();

			return isOptionUnique({
				labelKey: this.labelKey,
				option: option,
				options: options,
				valueKey: this.valueKey
			});
		}
	}, {
		key: 'menuRenderer',
		value: function menuRenderer(params) {
			var menuRenderer = this.props.menuRenderer;


			return menuRenderer(_extends({}, params, {
				onSelect: this.onOptionSelect,
				selectValue: this.onOptionSelect
			}));
		}
	}, {
		key: 'onInputChange',
		value: function onInputChange(input) {
			var onInputChange = this.props.onInputChange;


			if (onInputChange) {
				onInputChange(input);
			}

			// This value may be needed in between Select mounts (when this.select is null)
			this.inputValue = input;
		}
	}, {
		key: 'onInputKeyDown',
		value: function onInputKeyDown(event) {
			var _props3 = this.props,
			    shouldKeyDownEventCreateNewOption = _props3.shouldKeyDownEventCreateNewOption,
			    onInputKeyDown = _props3.onInputKeyDown;

			var focusedOption = this.select.getFocusedOption();

			if (focusedOption && focusedOption === this._createPlaceholderOption && shouldKeyDownEventCreateNewOption({ keyCode: event.keyCode })) {
				this.createNewOption();

				// Prevent decorated Select from doing anything additional with this keyDown event
				event.preventDefault();
			} else if (onInputKeyDown) {
				onInputKeyDown(event);
			}
		}
	}, {
		key: 'onOptionSelect',
		value: function onOptionSelect(option, event) {
			if (option === this._createPlaceholderOption) {
				this.createNewOption();
			} else {
				this.select.selectValue(option);
			}
		}
	}, {
		key: 'focus',
		value: function focus() {
			this.select.focus();
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props4 = this.props,
			    newOptionCreator = _props4.newOptionCreator,
			    shouldKeyDownEventCreateNewOption = _props4.shouldKeyDownEventCreateNewOption,
			    restProps = _objectWithoutProperties(_props4, ['newOptionCreator', 'shouldKeyDownEventCreateNewOption']);

			var children = this.props.children;

			// We can't use destructuring default values to set the children,
			// because it won't apply work if `children` is null. A falsy check is
			// more reliable in real world use-cases.

			if (!children) {
				children = defaultChildren;
			}

			var props = _extends({}, restProps, {
				allowCreate: true,
				filterOptions: this.filterOptions,
				menuRenderer: this.menuRenderer,
				onInputChange: this.onInputChange,
				onInputKeyDown: this.onInputKeyDown,
				ref: function ref(_ref2) {
					_this2.select = _ref2;

					// These values may be needed in between Select mounts (when this.select is null)
					if (_ref2) {
						_this2.labelKey = _ref2.props.labelKey;
						_this2.valueKey = _ref2.props.valueKey;
					}
				}
			});

			return children(props);
		}
	}]);

	return CreatableSelect;
}(_react2.default.Component);

;

function defaultChildren(props) {
	return _react2.default.createElement(_Select2.default, props);
};

function isOptionUnique(_ref3) {
	var option = _ref3.option,
	    options = _ref3.options,
	    labelKey = _ref3.labelKey,
	    valueKey = _ref3.valueKey;

	return options.filter(function (existingOption) {
		return existingOption[labelKey] === option[labelKey] || existingOption[valueKey] === option[valueKey];
	}).length === 0;
};

function isValidNewOption(_ref4) {
	var label = _ref4.label;

	return !!label;
};

function newOptionCreator(_ref5) {
	var label = _ref5.label,
	    labelKey = _ref5.labelKey,
	    valueKey = _ref5.valueKey;

	var option = {};
	option[valueKey] = label;
	option[labelKey] = label;
	option.className = 'Select-create-option-placeholder';
	return option;
};

function promptTextCreator(label) {
	return 'Create option "' + label + '"';
}

function shouldKeyDownEventCreateNewOption(_ref6) {
	var keyCode = _ref6.keyCode;

	switch (keyCode) {
		case 9: // TAB
		case 13: // ENTER
		case 188:
			// COMMA
			return true;
	}

	return false;
};

// Default prop methods
CreatableSelect.isOptionUnique = isOptionUnique;
CreatableSelect.isValidNewOption = isValidNewOption;
CreatableSelect.newOptionCreator = newOptionCreator;
CreatableSelect.promptTextCreator = promptTextCreator;
CreatableSelect.shouldKeyDownEventCreateNewOption = shouldKeyDownEventCreateNewOption;

CreatableSelect.defaultProps = {
	filterOptions: _defaultFilterOptions2.default,
	isOptionUnique: isOptionUnique,
	isValidNewOption: isValidNewOption,
	menuRenderer: _defaultMenuRenderer2.default,
	newOptionCreator: newOptionCreator,
	promptTextCreator: promptTextCreator,
	shouldKeyDownEventCreateNewOption: shouldKeyDownEventCreateNewOption
};

CreatableSelect.propTypes = {
	// Child function responsible for creating the inner Select component
	// This component can be used to compose HOCs (eg Creatable and Async)
	// (props: Object): PropTypes.element
	children: _propTypes2.default.func,

	// See Select.propTypes.filterOptions
	filterOptions: _propTypes2.default.any,

	// Searches for any matching option within the set of options.
	// This function prevents duplicate options from being created.
	// ({ option: Object, options: Array, labelKey: string, valueKey: string }): boolean
	isOptionUnique: _propTypes2.default.func,

	// Determines if the current input text represents a valid option.
	// ({ label: string }): boolean
	isValidNewOption: _propTypes2.default.func,

	// See Select.propTypes.menuRenderer
	menuRenderer: _propTypes2.default.any,

	// Factory to create new option.
	// ({ label: string, labelKey: string, valueKey: string }): Object
	newOptionCreator: _propTypes2.default.func,

	// input change handler: function (inputValue) {}
	onInputChange: _propTypes2.default.func,

	// input keyDown handler: function (event) {}
	onInputKeyDown: _propTypes2.default.func,

	// new option click handler: function (option) {}
	onNewOptionClick: _propTypes2.default.func,

	// See Select.propTypes.options
	options: _propTypes2.default.array,

	// Creates prompt/placeholder option text.
	// (filterText: string): string
	promptTextCreator: _propTypes2.default.func,

	// Decides if a keyDown event (eg its `keyCode`) should result in the creation of a new option.
	shouldKeyDownEventCreateNewOption: _propTypes2.default.func
};

exports.default = CreatableSelect;

/***/ }),
/* 154 */
/***/ (function(module, exports) {

module.exports = isFunction

var toString = Object.prototype.toString

function isFunction (fn) {
  var string = toString.call(fn)
  return string === '[object Function]' ||
    (typeof fn === 'function' && string !== '[object RegExp]') ||
    (typeof window !== 'undefined' &&
     // IE8 and below
     (fn === window.setTimeout ||
      fn === window.alert ||
      fn === window.confirm ||
      fn === window.prompt))
};


/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(156);
module.exports = __webpack_require__(358);


/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

__webpack_require__(157);

__webpack_require__(354);

__webpack_require__(355);

if (global._babelPolyfill) {
  throw new Error("only one instance of babel-polyfill is allowed");
}
global._babelPolyfill = true;

var DEFINE_PROPERTY = "defineProperty";
function define(O, key, value) {
  O[key] || Object[DEFINE_PROPERTY](O, key, {
    writable: true,
    configurable: true,
    value: value
  });
}

define(String.prototype, "padLeft", "".padStart);
define(String.prototype, "padRight", "".padEnd);

"pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function (key) {
  [][key] && define(Array, key, Function.call.bind([][key]));
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(55)))

/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(158);
__webpack_require__(160);
__webpack_require__(161);
__webpack_require__(162);
__webpack_require__(163);
__webpack_require__(164);
__webpack_require__(165);
__webpack_require__(166);
__webpack_require__(167);
__webpack_require__(168);
__webpack_require__(169);
__webpack_require__(170);
__webpack_require__(171);
__webpack_require__(172);
__webpack_require__(173);
__webpack_require__(174);
__webpack_require__(176);
__webpack_require__(177);
__webpack_require__(178);
__webpack_require__(179);
__webpack_require__(180);
__webpack_require__(181);
__webpack_require__(182);
__webpack_require__(183);
__webpack_require__(184);
__webpack_require__(185);
__webpack_require__(186);
__webpack_require__(187);
__webpack_require__(188);
__webpack_require__(189);
__webpack_require__(190);
__webpack_require__(191);
__webpack_require__(192);
__webpack_require__(193);
__webpack_require__(194);
__webpack_require__(195);
__webpack_require__(196);
__webpack_require__(197);
__webpack_require__(198);
__webpack_require__(199);
__webpack_require__(200);
__webpack_require__(201);
__webpack_require__(202);
__webpack_require__(203);
__webpack_require__(204);
__webpack_require__(205);
__webpack_require__(206);
__webpack_require__(207);
__webpack_require__(208);
__webpack_require__(209);
__webpack_require__(210);
__webpack_require__(211);
__webpack_require__(212);
__webpack_require__(213);
__webpack_require__(214);
__webpack_require__(215);
__webpack_require__(216);
__webpack_require__(217);
__webpack_require__(218);
__webpack_require__(219);
__webpack_require__(220);
__webpack_require__(221);
__webpack_require__(222);
__webpack_require__(223);
__webpack_require__(224);
__webpack_require__(225);
__webpack_require__(226);
__webpack_require__(227);
__webpack_require__(228);
__webpack_require__(229);
__webpack_require__(230);
__webpack_require__(231);
__webpack_require__(232);
__webpack_require__(233);
__webpack_require__(234);
__webpack_require__(235);
__webpack_require__(236);
__webpack_require__(238);
__webpack_require__(239);
__webpack_require__(241);
__webpack_require__(242);
__webpack_require__(243);
__webpack_require__(244);
__webpack_require__(245);
__webpack_require__(246);
__webpack_require__(247);
__webpack_require__(249);
__webpack_require__(250);
__webpack_require__(251);
__webpack_require__(252);
__webpack_require__(253);
__webpack_require__(254);
__webpack_require__(255);
__webpack_require__(256);
__webpack_require__(257);
__webpack_require__(258);
__webpack_require__(259);
__webpack_require__(260);
__webpack_require__(261);
__webpack_require__(95);
__webpack_require__(262);
__webpack_require__(263);
__webpack_require__(123);
__webpack_require__(264);
__webpack_require__(265);
__webpack_require__(266);
__webpack_require__(267);
__webpack_require__(268);
__webpack_require__(126);
__webpack_require__(128);
__webpack_require__(129);
__webpack_require__(269);
__webpack_require__(270);
__webpack_require__(271);
__webpack_require__(272);
__webpack_require__(273);
__webpack_require__(274);
__webpack_require__(275);
__webpack_require__(276);
__webpack_require__(277);
__webpack_require__(278);
__webpack_require__(279);
__webpack_require__(280);
__webpack_require__(281);
__webpack_require__(282);
__webpack_require__(283);
__webpack_require__(284);
__webpack_require__(285);
__webpack_require__(286);
__webpack_require__(287);
__webpack_require__(288);
__webpack_require__(289);
__webpack_require__(290);
__webpack_require__(291);
__webpack_require__(292);
__webpack_require__(293);
__webpack_require__(294);
__webpack_require__(295);
__webpack_require__(296);
__webpack_require__(297);
__webpack_require__(298);
__webpack_require__(299);
__webpack_require__(300);
__webpack_require__(301);
__webpack_require__(302);
__webpack_require__(303);
__webpack_require__(304);
__webpack_require__(305);
__webpack_require__(306);
__webpack_require__(307);
__webpack_require__(308);
__webpack_require__(309);
__webpack_require__(310);
__webpack_require__(311);
__webpack_require__(312);
__webpack_require__(313);
__webpack_require__(314);
__webpack_require__(315);
__webpack_require__(316);
__webpack_require__(317);
__webpack_require__(318);
__webpack_require__(319);
__webpack_require__(320);
__webpack_require__(321);
__webpack_require__(322);
__webpack_require__(323);
__webpack_require__(324);
__webpack_require__(325);
__webpack_require__(326);
__webpack_require__(327);
__webpack_require__(328);
__webpack_require__(329);
__webpack_require__(330);
__webpack_require__(331);
__webpack_require__(332);
__webpack_require__(333);
__webpack_require__(334);
__webpack_require__(335);
__webpack_require__(336);
__webpack_require__(337);
__webpack_require__(338);
__webpack_require__(339);
__webpack_require__(340);
__webpack_require__(341);
__webpack_require__(342);
__webpack_require__(343);
__webpack_require__(344);
__webpack_require__(345);
__webpack_require__(346);
__webpack_require__(347);
__webpack_require__(348);
__webpack_require__(349);
__webpack_require__(350);
__webpack_require__(351);
__webpack_require__(352);
__webpack_require__(353);
module.exports = __webpack_require__(23);


/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(2);
var has = __webpack_require__(12);
var DESCRIPTORS = __webpack_require__(6);
var $export = __webpack_require__(0);
var redefine = __webpack_require__(14);
var META = __webpack_require__(32).KEY;
var $fails = __webpack_require__(3);
var shared = __webpack_require__(56);
var setToStringTag = __webpack_require__(47);
var uid = __webpack_require__(36);
var wks = __webpack_require__(5);
var wksExt = __webpack_require__(106);
var wksDefine = __webpack_require__(75);
var enumKeys = __webpack_require__(159);
var isArray = __webpack_require__(59);
var anObject = __webpack_require__(1);
var toIObject = __webpack_require__(17);
var toPrimitive = __webpack_require__(24);
var createDesc = __webpack_require__(35);
var _create = __webpack_require__(40);
var gOPNExt = __webpack_require__(109);
var $GOPD = __webpack_require__(18);
var $DP = __webpack_require__(7);
var $keys = __webpack_require__(38);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(41).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(52).f = $propertyIsEnumerable;
  __webpack_require__(58).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(37)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    if (it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    replacer = args[1];
    if (typeof replacer == 'function') $replacer = replacer;
    if ($replacer || !isArray(replacer)) replacer = function (key, value) {
      if ($replacer) value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(13)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(38);
var gOPS = __webpack_require__(58);
var pIE = __webpack_require__(52);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(40) });


/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(6), 'Object', { defineProperty: __webpack_require__(7).f });


/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
$export($export.S + $export.F * !__webpack_require__(6), 'Object', { defineProperties: __webpack_require__(108) });


/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = __webpack_require__(17);
var $getOwnPropertyDescriptor = __webpack_require__(18).f;

__webpack_require__(27)('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});


/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(9);
var $getPrototypeOf = __webpack_require__(19);

__webpack_require__(27)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(9);
var $keys = __webpack_require__(38);

__webpack_require__(27)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 Object.getOwnPropertyNames(O)
__webpack_require__(27)('getOwnPropertyNames', function () {
  return __webpack_require__(109).f;
});


/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.5 Object.freeze(O)
var isObject = __webpack_require__(4);
var meta = __webpack_require__(32).onFreeze;

__webpack_require__(27)('freeze', function ($freeze) {
  return function freeze(it) {
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});


/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.17 Object.seal(O)
var isObject = __webpack_require__(4);
var meta = __webpack_require__(32).onFreeze;

__webpack_require__(27)('seal', function ($seal) {
  return function seal(it) {
    return $seal && isObject(it) ? $seal(meta(it)) : it;
  };
});


/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.15 Object.preventExtensions(O)
var isObject = __webpack_require__(4);
var meta = __webpack_require__(32).onFreeze;

__webpack_require__(27)('preventExtensions', function ($preventExtensions) {
  return function preventExtensions(it) {
    return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
  };
});


/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.12 Object.isFrozen(O)
var isObject = __webpack_require__(4);

__webpack_require__(27)('isFrozen', function ($isFrozen) {
  return function isFrozen(it) {
    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
  };
});


/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.13 Object.isSealed(O)
var isObject = __webpack_require__(4);

__webpack_require__(27)('isSealed', function ($isSealed) {
  return function isSealed(it) {
    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
  };
});


/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.11 Object.isExtensible(O)
var isObject = __webpack_require__(4);

__webpack_require__(27)('isExtensible', function ($isExtensible) {
  return function isExtensible(it) {
    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
  };
});


/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(0);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(110) });


/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.10 Object.is(value1, value2)
var $export = __webpack_require__(0);
$export($export.S, 'Object', { is: __webpack_require__(175) });


/***/ }),
/* 175 */
/***/ (function(module, exports) {

// 7.2.9 SameValue(x, y)
module.exports = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};


/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(0);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(79).set });


/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.3.6 Object.prototype.toString()
var classof = __webpack_require__(53);
var test = {};
test[__webpack_require__(5)('toStringTag')] = 'z';
if (test + '' != '[object z]') {
  __webpack_require__(14)(Object.prototype, 'toString', function toString() {
    return '[object ' + classof(this) + ']';
  }, true);
}


/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
var $export = __webpack_require__(0);

$export($export.P, 'Function', { bind: __webpack_require__(111) });


/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(7).f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// 19.2.4.2 name
NAME in FProto || __webpack_require__(6) && dP(FProto, NAME, {
  configurable: true,
  get: function () {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});


/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var isObject = __webpack_require__(4);
var getPrototypeOf = __webpack_require__(19);
var HAS_INSTANCE = __webpack_require__(5)('hasInstance');
var FunctionProto = Function.prototype;
// 19.2.3.6 Function.prototype[@@hasInstance](V)
if (!(HAS_INSTANCE in FunctionProto)) __webpack_require__(7).f(FunctionProto, HAS_INSTANCE, { value: function (O) {
  if (typeof this != 'function' || !isObject(O)) return false;
  if (!isObject(this.prototype)) return O instanceof this;
  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
  while (O = getPrototypeOf(O)) if (this.prototype === O) return true;
  return false;
} });


/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $parseInt = __webpack_require__(113);
// 18.2.5 parseInt(string, radix)
$export($export.G + $export.F * (parseInt != $parseInt), { parseInt: $parseInt });


/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $parseFloat = __webpack_require__(114);
// 18.2.4 parseFloat(string)
$export($export.G + $export.F * (parseFloat != $parseFloat), { parseFloat: $parseFloat });


/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(2);
var has = __webpack_require__(12);
var cof = __webpack_require__(21);
var inheritIfRequired = __webpack_require__(81);
var toPrimitive = __webpack_require__(24);
var fails = __webpack_require__(3);
var gOPN = __webpack_require__(41).f;
var gOPD = __webpack_require__(18).f;
var dP = __webpack_require__(7).f;
var $trim = __webpack_require__(48).trim;
var NUMBER = 'Number';
var $Number = global[NUMBER];
var Base = $Number;
var proto = $Number.prototype;
// Opera ~12 has broken Object#toString
var BROKEN_COF = cof(__webpack_require__(40)(proto)) == NUMBER;
var TRIM = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  if (typeof it == 'string' && it.length > 2) {
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0);
    var third, radix, maxCode;
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default: return +it;
      }
      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
  $Number = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function () { proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for (var keys = __webpack_require__(6) ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(Base, key = keys[j]) && !has($Number, key)) {
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  __webpack_require__(14)(global, NUMBER, $Number);
}


/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toInteger = __webpack_require__(26);
var aNumberValue = __webpack_require__(115);
var repeat = __webpack_require__(82);
var $toFixed = 1.0.toFixed;
var floor = Math.floor;
var data = [0, 0, 0, 0, 0, 0];
var ERROR = 'Number.toFixed: incorrect invocation!';
var ZERO = '0';

var multiply = function (n, c) {
  var i = -1;
  var c2 = c;
  while (++i < 6) {
    c2 += n * data[i];
    data[i] = c2 % 1e7;
    c2 = floor(c2 / 1e7);
  }
};
var divide = function (n) {
  var i = 6;
  var c = 0;
  while (--i >= 0) {
    c += data[i];
    data[i] = floor(c / n);
    c = (c % n) * 1e7;
  }
};
var numToString = function () {
  var i = 6;
  var s = '';
  while (--i >= 0) {
    if (s !== '' || i === 0 || data[i] !== 0) {
      var t = String(data[i]);
      s = s === '' ? t : s + repeat.call(ZERO, 7 - t.length) + t;
    }
  } return s;
};
var pow = function (x, n, acc) {
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};
var log = function (x) {
  var n = 0;
  var x2 = x;
  while (x2 >= 4096) {
    n += 12;
    x2 /= 4096;
  }
  while (x2 >= 2) {
    n += 1;
    x2 /= 2;
  } return n;
};

$export($export.P + $export.F * (!!$toFixed && (
  0.00008.toFixed(3) !== '0.000' ||
  0.9.toFixed(0) !== '1' ||
  1.255.toFixed(2) !== '1.25' ||
  1000000000000000128.0.toFixed(0) !== '1000000000000000128'
) || !__webpack_require__(3)(function () {
  // V8 ~ Android 4.3-
  $toFixed.call({});
})), 'Number', {
  toFixed: function toFixed(fractionDigits) {
    var x = aNumberValue(this, ERROR);
    var f = toInteger(fractionDigits);
    var s = '';
    var m = ZERO;
    var e, z, j, k;
    if (f < 0 || f > 20) throw RangeError(ERROR);
    // eslint-disable-next-line no-self-compare
    if (x != x) return 'NaN';
    if (x <= -1e21 || x >= 1e21) return String(x);
    if (x < 0) {
      s = '-';
      x = -x;
    }
    if (x > 1e-21) {
      e = log(x * pow(2, 69, 1)) - 69;
      z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;
      if (e > 0) {
        multiply(0, z);
        j = f;
        while (j >= 7) {
          multiply(1e7, 0);
          j -= 7;
        }
        multiply(pow(10, j, 1), 0);
        j = e - 1;
        while (j >= 23) {
          divide(1 << 23);
          j -= 23;
        }
        divide(1 << j);
        multiply(1, 1);
        divide(2);
        m = numToString();
      } else {
        multiply(0, z);
        multiply(1 << -e, 0);
        m = numToString() + repeat.call(ZERO, f);
      }
    }
    if (f > 0) {
      k = m.length;
      m = s + (k <= f ? '0.' + repeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
    } else {
      m = s + m;
    } return m;
  }
});


/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $fails = __webpack_require__(3);
var aNumberValue = __webpack_require__(115);
var $toPrecision = 1.0.toPrecision;

$export($export.P + $export.F * ($fails(function () {
  // IE7-
  return $toPrecision.call(1, undefined) !== '1';
}) || !$fails(function () {
  // V8 ~ Android 4.3-
  $toPrecision.call({});
})), 'Number', {
  toPrecision: function toPrecision(precision) {
    var that = aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
    return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision);
  }
});


/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.1 Number.EPSILON
var $export = __webpack_require__(0);

$export($export.S, 'Number', { EPSILON: Math.pow(2, -52) });


/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.2 Number.isFinite(number)
var $export = __webpack_require__(0);
var _isFinite = __webpack_require__(2).isFinite;

$export($export.S, 'Number', {
  isFinite: function isFinite(it) {
    return typeof it == 'number' && _isFinite(it);
  }
});


/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var $export = __webpack_require__(0);

$export($export.S, 'Number', { isInteger: __webpack_require__(116) });


/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.4 Number.isNaN(number)
var $export = __webpack_require__(0);

$export($export.S, 'Number', {
  isNaN: function isNaN(number) {
    // eslint-disable-next-line no-self-compare
    return number != number;
  }
});


/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.5 Number.isSafeInteger(number)
var $export = __webpack_require__(0);
var isInteger = __webpack_require__(116);
var abs = Math.abs;

$export($export.S, 'Number', {
  isSafeInteger: function isSafeInteger(number) {
    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
  }
});


/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.6 Number.MAX_SAFE_INTEGER
var $export = __webpack_require__(0);

$export($export.S, 'Number', { MAX_SAFE_INTEGER: 0x1fffffffffffff });


/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.10 Number.MIN_SAFE_INTEGER
var $export = __webpack_require__(0);

$export($export.S, 'Number', { MIN_SAFE_INTEGER: -0x1fffffffffffff });


/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $parseFloat = __webpack_require__(114);
// 20.1.2.12 Number.parseFloat(string)
$export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', { parseFloat: $parseFloat });


/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $parseInt = __webpack_require__(113);
// 20.1.2.13 Number.parseInt(string, radix)
$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', { parseInt: $parseInt });


/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.3 Math.acosh(x)
var $export = __webpack_require__(0);
var log1p = __webpack_require__(117);
var sqrt = Math.sqrt;
var $acosh = Math.acosh;

$export($export.S + $export.F * !($acosh
  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
  && Math.floor($acosh(Number.MAX_VALUE)) == 710
  // Tor Browser bug: Math.acosh(Infinity) -> NaN
  && $acosh(Infinity) == Infinity
), 'Math', {
  acosh: function acosh(x) {
    return (x = +x) < 1 ? NaN : x > 94906265.62425156
      ? Math.log(x) + Math.LN2
      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
  }
});


/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.5 Math.asinh(x)
var $export = __webpack_require__(0);
var $asinh = Math.asinh;

function asinh(x) {
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
}

// Tor Browser bug: Math.asinh(0) -> -0
$export($export.S + $export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', { asinh: asinh });


/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.7 Math.atanh(x)
var $export = __webpack_require__(0);
var $atanh = Math.atanh;

// Tor Browser bug: Math.atanh(-0) -> 0
$export($export.S + $export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
  atanh: function atanh(x) {
    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
  }
});


/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.9 Math.cbrt(x)
var $export = __webpack_require__(0);
var sign = __webpack_require__(83);

$export($export.S, 'Math', {
  cbrt: function cbrt(x) {
    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
  }
});


/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.11 Math.clz32(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  clz32: function clz32(x) {
    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
  }
});


/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.12 Math.cosh(x)
var $export = __webpack_require__(0);
var exp = Math.exp;

$export($export.S, 'Math', {
  cosh: function cosh(x) {
    return (exp(x = +x) + exp(-x)) / 2;
  }
});


/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.14 Math.expm1(x)
var $export = __webpack_require__(0);
var $expm1 = __webpack_require__(84);

$export($export.S + $export.F * ($expm1 != Math.expm1), 'Math', { expm1: $expm1 });


/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.16 Math.fround(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', { fround: __webpack_require__(118) });


/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
var $export = __webpack_require__(0);
var abs = Math.abs;

$export($export.S, 'Math', {
  hypot: function hypot(value1, value2) { // eslint-disable-line no-unused-vars
    var sum = 0;
    var i = 0;
    var aLen = arguments.length;
    var larg = 0;
    var arg, div;
    while (i < aLen) {
      arg = abs(arguments[i++]);
      if (larg < arg) {
        div = larg / arg;
        sum = sum * div * div + 1;
        larg = arg;
      } else if (arg > 0) {
        div = arg / larg;
        sum += div * div;
      } else sum += arg;
    }
    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
  }
});


/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.18 Math.imul(x, y)
var $export = __webpack_require__(0);
var $imul = Math.imul;

// some WebKit versions fails with big numbers, some has wrong arity
$export($export.S + $export.F * __webpack_require__(3)(function () {
  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
}), 'Math', {
  imul: function imul(x, y) {
    var UINT16 = 0xffff;
    var xn = +x;
    var yn = +y;
    var xl = UINT16 & xn;
    var yl = UINT16 & yn;
    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
  }
});


/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.21 Math.log10(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  log10: function log10(x) {
    return Math.log(x) * Math.LOG10E;
  }
});


/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.20 Math.log1p(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', { log1p: __webpack_require__(117) });


/***/ }),
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.22 Math.log2(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  log2: function log2(x) {
    return Math.log(x) / Math.LN2;
  }
});


/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.28 Math.sign(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', { sign: __webpack_require__(83) });


/***/ }),
/* 209 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.30 Math.sinh(x)
var $export = __webpack_require__(0);
var expm1 = __webpack_require__(84);
var exp = Math.exp;

// V8 near Chromium 38 has a problem with very small numbers
$export($export.S + $export.F * __webpack_require__(3)(function () {
  return !Math.sinh(-2e-17) != -2e-17;
}), 'Math', {
  sinh: function sinh(x) {
    return Math.abs(x = +x) < 1
      ? (expm1(x) - expm1(-x)) / 2
      : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
  }
});


/***/ }),
/* 210 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.33 Math.tanh(x)
var $export = __webpack_require__(0);
var expm1 = __webpack_require__(84);
var exp = Math.exp;

$export($export.S, 'Math', {
  tanh: function tanh(x) {
    var a = expm1(x = +x);
    var b = expm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
  }
});


/***/ }),
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.34 Math.trunc(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  trunc: function trunc(it) {
    return (it > 0 ? Math.floor : Math.ceil)(it);
  }
});


/***/ }),
/* 212 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var toAbsoluteIndex = __webpack_require__(39);
var fromCharCode = String.fromCharCode;
var $fromCodePoint = String.fromCodePoint;

// length should be 1, old FF problem
$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
  // 21.1.2.2 String.fromCodePoint(...codePoints)
  fromCodePoint: function fromCodePoint(x) { // eslint-disable-line no-unused-vars
    var res = [];
    var aLen = arguments.length;
    var i = 0;
    var code;
    while (aLen > i) {
      code = +arguments[i++];
      if (toAbsoluteIndex(code, 0x10ffff) !== code) throw RangeError(code + ' is not a valid code point');
      res.push(code < 0x10000
        ? fromCharCode(code)
        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
      );
    } return res.join('');
  }
});


/***/ }),
/* 213 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var toIObject = __webpack_require__(17);
var toLength = __webpack_require__(8);

$export($export.S, 'String', {
  // 21.1.2.4 String.raw(callSite, ...substitutions)
  raw: function raw(callSite) {
    var tpl = toIObject(callSite.raw);
    var len = toLength(tpl.length);
    var aLen = arguments.length;
    var res = [];
    var i = 0;
    while (len > i) {
      res.push(String(tpl[i++]));
      if (i < aLen) res.push(String(arguments[i]));
    } return res.join('');
  }
});


/***/ }),
/* 214 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.1.3.25 String.prototype.trim()
__webpack_require__(48)('trim', function ($trim) {
  return function trim() {
    return $trim(this, 3);
  };
});


/***/ }),
/* 215 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(85)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(86)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 216 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $at = __webpack_require__(85)(false);
$export($export.P, 'String', {
  // 21.1.3.3 String.prototype.codePointAt(pos)
  codePointAt: function codePointAt(pos) {
    return $at(this, pos);
  }
});


/***/ }),
/* 217 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])

var $export = __webpack_require__(0);
var toLength = __webpack_require__(8);
var context = __webpack_require__(88);
var ENDS_WITH = 'endsWith';
var $endsWith = ''[ENDS_WITH];

$export($export.P + $export.F * __webpack_require__(89)(ENDS_WITH), 'String', {
  endsWith: function endsWith(searchString /* , endPosition = @length */) {
    var that = context(this, searchString, ENDS_WITH);
    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
    var len = toLength(that.length);
    var end = endPosition === undefined ? len : Math.min(toLength(endPosition), len);
    var search = String(searchString);
    return $endsWith
      ? $endsWith.call(that, search, end)
      : that.slice(end - search.length, end) === search;
  }
});


/***/ }),
/* 218 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.7 String.prototype.includes(searchString, position = 0)

var $export = __webpack_require__(0);
var context = __webpack_require__(88);
var INCLUDES = 'includes';

$export($export.P + $export.F * __webpack_require__(89)(INCLUDES), 'String', {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),
/* 219 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);

$export($export.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: __webpack_require__(82)
});


/***/ }),
/* 220 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.18 String.prototype.startsWith(searchString [, position ])

var $export = __webpack_require__(0);
var toLength = __webpack_require__(8);
var context = __webpack_require__(88);
var STARTS_WITH = 'startsWith';
var $startsWith = ''[STARTS_WITH];

$export($export.P + $export.F * __webpack_require__(89)(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString /* , position = 0 */) {
    var that = context(this, searchString, STARTS_WITH);
    var index = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});


/***/ }),
/* 221 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.2 String.prototype.anchor(name)
__webpack_require__(15)('anchor', function (createHTML) {
  return function anchor(name) {
    return createHTML(this, 'a', 'name', name);
  };
});


/***/ }),
/* 222 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.3 String.prototype.big()
__webpack_require__(15)('big', function (createHTML) {
  return function big() {
    return createHTML(this, 'big', '', '');
  };
});


/***/ }),
/* 223 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.4 String.prototype.blink()
__webpack_require__(15)('blink', function (createHTML) {
  return function blink() {
    return createHTML(this, 'blink', '', '');
  };
});


/***/ }),
/* 224 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.5 String.prototype.bold()
__webpack_require__(15)('bold', function (createHTML) {
  return function bold() {
    return createHTML(this, 'b', '', '');
  };
});


/***/ }),
/* 225 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.6 String.prototype.fixed()
__webpack_require__(15)('fixed', function (createHTML) {
  return function fixed() {
    return createHTML(this, 'tt', '', '');
  };
});


/***/ }),
/* 226 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.7 String.prototype.fontcolor(color)
__webpack_require__(15)('fontcolor', function (createHTML) {
  return function fontcolor(color) {
    return createHTML(this, 'font', 'color', color);
  };
});


/***/ }),
/* 227 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.8 String.prototype.fontsize(size)
__webpack_require__(15)('fontsize', function (createHTML) {
  return function fontsize(size) {
    return createHTML(this, 'font', 'size', size);
  };
});


/***/ }),
/* 228 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.9 String.prototype.italics()
__webpack_require__(15)('italics', function (createHTML) {
  return function italics() {
    return createHTML(this, 'i', '', '');
  };
});


/***/ }),
/* 229 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.10 String.prototype.link(url)
__webpack_require__(15)('link', function (createHTML) {
  return function link(url) {
    return createHTML(this, 'a', 'href', url);
  };
});


/***/ }),
/* 230 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.11 String.prototype.small()
__webpack_require__(15)('small', function (createHTML) {
  return function small() {
    return createHTML(this, 'small', '', '');
  };
});


/***/ }),
/* 231 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.12 String.prototype.strike()
__webpack_require__(15)('strike', function (createHTML) {
  return function strike() {
    return createHTML(this, 'strike', '', '');
  };
});


/***/ }),
/* 232 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.13 String.prototype.sub()
__webpack_require__(15)('sub', function (createHTML) {
  return function sub() {
    return createHTML(this, 'sub', '', '');
  };
});


/***/ }),
/* 233 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.14 String.prototype.sup()
__webpack_require__(15)('sup', function (createHTML) {
  return function sup() {
    return createHTML(this, 'sup', '', '');
  };
});


/***/ }),
/* 234 */
/***/ (function(module, exports, __webpack_require__) {

// 20.3.3.1 / 15.9.4.4 Date.now()
var $export = __webpack_require__(0);

$export($export.S, 'Date', { now: function () { return new Date().getTime(); } });


/***/ }),
/* 235 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toObject = __webpack_require__(9);
var toPrimitive = __webpack_require__(24);

$export($export.P + $export.F * __webpack_require__(3)(function () {
  return new Date(NaN).toJSON() !== null
    || Date.prototype.toJSON.call({ toISOString: function () { return 1; } }) !== 1;
}), 'Date', {
  // eslint-disable-next-line no-unused-vars
  toJSON: function toJSON(key) {
    var O = toObject(this);
    var pv = toPrimitive(O);
    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
  }
});


/***/ }),
/* 236 */
/***/ (function(module, exports, __webpack_require__) {

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var $export = __webpack_require__(0);
var toISOString = __webpack_require__(237);

// PhantomJS / old WebKit has a broken implementations
$export($export.P + $export.F * (Date.prototype.toISOString !== toISOString), 'Date', {
  toISOString: toISOString
});


/***/ }),
/* 237 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var fails = __webpack_require__(3);
var getTime = Date.prototype.getTime;
var $toISOString = Date.prototype.toISOString;

var lz = function (num) {
  return num > 9 ? num : '0' + num;
};

// PhantomJS / old WebKit has a broken implementations
module.exports = (fails(function () {
  return $toISOString.call(new Date(-5e13 - 1)) != '0385-07-25T07:06:39.999Z';
}) || !fails(function () {
  $toISOString.call(new Date(NaN));
})) ? function toISOString() {
  if (!isFinite(getTime.call(this))) throw RangeError('Invalid time value');
  var d = this;
  var y = d.getUTCFullYear();
  var m = d.getUTCMilliseconds();
  var s = y < 0 ? '-' : y > 9999 ? '+' : '';
  return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
    '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
    'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
    ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
} : $toISOString;


/***/ }),
/* 238 */
/***/ (function(module, exports, __webpack_require__) {

var DateProto = Date.prototype;
var INVALID_DATE = 'Invalid Date';
var TO_STRING = 'toString';
var $toString = DateProto[TO_STRING];
var getTime = DateProto.getTime;
if (new Date(NaN) + '' != INVALID_DATE) {
  __webpack_require__(14)(DateProto, TO_STRING, function toString() {
    var value = getTime.call(this);
    // eslint-disable-next-line no-self-compare
    return value === value ? $toString.call(this) : INVALID_DATE;
  });
}


/***/ }),
/* 239 */
/***/ (function(module, exports, __webpack_require__) {

var TO_PRIMITIVE = __webpack_require__(5)('toPrimitive');
var proto = Date.prototype;

if (!(TO_PRIMITIVE in proto)) __webpack_require__(13)(proto, TO_PRIMITIVE, __webpack_require__(240));


/***/ }),
/* 240 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var anObject = __webpack_require__(1);
var toPrimitive = __webpack_require__(24);
var NUMBER = 'number';

module.exports = function (hint) {
  if (hint !== 'string' && hint !== NUMBER && hint !== 'default') throw TypeError('Incorrect hint');
  return toPrimitive(anObject(this), hint != NUMBER);
};


/***/ }),
/* 241 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
var $export = __webpack_require__(0);

$export($export.S, 'Array', { isArray: __webpack_require__(59) });


/***/ }),
/* 242 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(20);
var $export = __webpack_require__(0);
var toObject = __webpack_require__(9);
var call = __webpack_require__(119);
var isArrayIter = __webpack_require__(90);
var toLength = __webpack_require__(8);
var createProperty = __webpack_require__(91);
var getIterFn = __webpack_require__(92);

$export($export.S + $export.F * !__webpack_require__(61)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 243 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var createProperty = __webpack_require__(91);

// WebKit Array.of isn't generic
$export($export.S + $export.F * __webpack_require__(3)(function () {
  function F() { /* empty */ }
  return !(Array.of.call(F) instanceof F);
}), 'Array', {
  // 22.1.2.3 Array.of( ...items)
  of: function of(/* ...args */) {
    var index = 0;
    var aLen = arguments.length;
    var result = new (typeof this == 'function' ? this : Array)(aLen);
    while (aLen > index) createProperty(result, index, arguments[index++]);
    result.length = aLen;
    return result;
  }
});


/***/ }),
/* 244 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.13 Array.prototype.join(separator)
var $export = __webpack_require__(0);
var toIObject = __webpack_require__(17);
var arrayJoin = [].join;

// fallback for not array-like strings
$export($export.P + $export.F * (__webpack_require__(51) != Object || !__webpack_require__(22)(arrayJoin)), 'Array', {
  join: function join(separator) {
    return arrayJoin.call(toIObject(this), separator === undefined ? ',' : separator);
  }
});


/***/ }),
/* 245 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var html = __webpack_require__(78);
var cof = __webpack_require__(21);
var toAbsoluteIndex = __webpack_require__(39);
var toLength = __webpack_require__(8);
var arraySlice = [].slice;

// fallback for not array-like ES3 strings and DOM objects
$export($export.P + $export.F * __webpack_require__(3)(function () {
  if (html) arraySlice.call(html);
}), 'Array', {
  slice: function slice(begin, end) {
    var len = toLength(this.length);
    var klass = cof(this);
    end = end === undefined ? len : end;
    if (klass == 'Array') return arraySlice.call(this, begin, end);
    var start = toAbsoluteIndex(begin, len);
    var upTo = toAbsoluteIndex(end, len);
    var size = toLength(upTo - start);
    var cloned = Array(size);
    var i = 0;
    for (; i < size; i++) cloned[i] = klass == 'String'
      ? this.charAt(start + i)
      : this[start + i];
    return cloned;
  }
});


/***/ }),
/* 246 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var aFunction = __webpack_require__(11);
var toObject = __webpack_require__(9);
var fails = __webpack_require__(3);
var $sort = [].sort;
var test = [1, 2, 3];

$export($export.P + $export.F * (fails(function () {
  // IE8-
  test.sort(undefined);
}) || !fails(function () {
  // V8 bug
  test.sort(null);
  // Old WebKit
}) || !__webpack_require__(22)($sort)), 'Array', {
  // 22.1.3.25 Array.prototype.sort(comparefn)
  sort: function sort(comparefn) {
    return comparefn === undefined
      ? $sort.call(toObject(this))
      : $sort.call(toObject(this), aFunction(comparefn));
  }
});


/***/ }),
/* 247 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $forEach = __webpack_require__(28)(0);
var STRICT = __webpack_require__(22)([].forEach, true);

$export($export.P + $export.F * !STRICT, 'Array', {
  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach: function forEach(callbackfn /* , thisArg */) {
    return $forEach(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 248 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
var isArray = __webpack_require__(59);
var SPECIES = __webpack_require__(5)('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),
/* 249 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $map = __webpack_require__(28)(1);

$export($export.P + $export.F * !__webpack_require__(22)([].map, true), 'Array', {
  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 250 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $filter = __webpack_require__(28)(2);

$export($export.P + $export.F * !__webpack_require__(22)([].filter, true), 'Array', {
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 251 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $some = __webpack_require__(28)(3);

$export($export.P + $export.F * !__webpack_require__(22)([].some, true), 'Array', {
  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
  some: function some(callbackfn /* , thisArg */) {
    return $some(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 252 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $every = __webpack_require__(28)(4);

$export($export.P + $export.F * !__webpack_require__(22)([].every, true), 'Array', {
  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
  every: function every(callbackfn /* , thisArg */) {
    return $every(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 253 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $reduce = __webpack_require__(120);

$export($export.P + $export.F * !__webpack_require__(22)([].reduce, true), 'Array', {
  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
  reduce: function reduce(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], false);
  }
});


/***/ }),
/* 254 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $reduce = __webpack_require__(120);

$export($export.P + $export.F * !__webpack_require__(22)([].reduceRight, true), 'Array', {
  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
  reduceRight: function reduceRight(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], true);
  }
});


/***/ }),
/* 255 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $indexOf = __webpack_require__(57)(false);
var $native = [].indexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(22)($native)), 'Array', {
  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? $native.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments[1]);
  }
});


/***/ }),
/* 256 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toIObject = __webpack_require__(17);
var toInteger = __webpack_require__(26);
var toLength = __webpack_require__(8);
var $native = [].lastIndexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].lastIndexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(22)($native)), 'Array', {
  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
  lastIndexOf: function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
    // convert -0 to +0
    if (NEGATIVE_ZERO) return $native.apply(this, arguments) || 0;
    var O = toIObject(this);
    var length = toLength(O.length);
    var index = length - 1;
    if (arguments.length > 1) index = Math.min(index, toInteger(arguments[1]));
    if (index < 0) index = length + index;
    for (;index >= 0; index--) if (index in O) if (O[index] === searchElement) return index || 0;
    return -1;
  }
});


/***/ }),
/* 257 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
var $export = __webpack_require__(0);

$export($export.P, 'Array', { copyWithin: __webpack_require__(121) });

__webpack_require__(33)('copyWithin');


/***/ }),
/* 258 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
var $export = __webpack_require__(0);

$export($export.P, 'Array', { fill: __webpack_require__(94) });

__webpack_require__(33)('fill');


/***/ }),
/* 259 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = __webpack_require__(0);
var $find = __webpack_require__(28)(5);
var KEY = 'find';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(33)(KEY);


/***/ }),
/* 260 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
var $export = __webpack_require__(0);
var $find = __webpack_require__(28)(6);
var KEY = 'findIndex';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  findIndex: function findIndex(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(33)(KEY);


/***/ }),
/* 261 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(42)('Array');


/***/ }),
/* 262 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var inheritIfRequired = __webpack_require__(81);
var dP = __webpack_require__(7).f;
var gOPN = __webpack_require__(41).f;
var isRegExp = __webpack_require__(60);
var $flags = __webpack_require__(62);
var $RegExp = global.RegExp;
var Base = $RegExp;
var proto = $RegExp.prototype;
var re1 = /a/g;
var re2 = /a/g;
// "new" creates a new object, old webkit buggy here
var CORRECT_NEW = new $RegExp(re1) !== re1;

if (__webpack_require__(6) && (!CORRECT_NEW || __webpack_require__(3)(function () {
  re2[__webpack_require__(5)('match')] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
}))) {
  $RegExp = function RegExp(p, f) {
    var tiRE = this instanceof $RegExp;
    var piRE = isRegExp(p);
    var fiU = f === undefined;
    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
      : inheritIfRequired(CORRECT_NEW
        ? new Base(piRE && !fiU ? p.source : p, f)
        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f)
      , tiRE ? this : proto, $RegExp);
  };
  var proxy = function (key) {
    key in $RegExp || dP($RegExp, key, {
      configurable: true,
      get: function () { return Base[key]; },
      set: function (it) { Base[key] = it; }
    });
  };
  for (var keys = gOPN(Base), i = 0; keys.length > i;) proxy(keys[i++]);
  proto.constructor = $RegExp;
  $RegExp.prototype = proto;
  __webpack_require__(14)(global, 'RegExp', $RegExp);
}

__webpack_require__(42)('RegExp');


/***/ }),
/* 263 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__(123);
var anObject = __webpack_require__(1);
var $flags = __webpack_require__(62);
var DESCRIPTORS = __webpack_require__(6);
var TO_STRING = 'toString';
var $toString = /./[TO_STRING];

var define = function (fn) {
  __webpack_require__(14)(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if (__webpack_require__(3)(function () { return $toString.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
  define(function toString() {
    var R = anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if ($toString.name != TO_STRING) {
  define(function toString() {
    return $toString.call(this);
  });
}


/***/ }),
/* 264 */
/***/ (function(module, exports, __webpack_require__) {

// @@match logic
__webpack_require__(63)('match', 1, function (defined, MATCH, $match) {
  // 21.1.3.11 String.prototype.match(regexp)
  return [function match(regexp) {
    'use strict';
    var O = defined(this);
    var fn = regexp == undefined ? undefined : regexp[MATCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
  }, $match];
});


/***/ }),
/* 265 */
/***/ (function(module, exports, __webpack_require__) {

// @@replace logic
__webpack_require__(63)('replace', 2, function (defined, REPLACE, $replace) {
  // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
  return [function replace(searchValue, replaceValue) {
    'use strict';
    var O = defined(this);
    var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
    return fn !== undefined
      ? fn.call(searchValue, O, replaceValue)
      : $replace.call(String(O), searchValue, replaceValue);
  }, $replace];
});


/***/ }),
/* 266 */
/***/ (function(module, exports, __webpack_require__) {

// @@search logic
__webpack_require__(63)('search', 1, function (defined, SEARCH, $search) {
  // 21.1.3.15 String.prototype.search(regexp)
  return [function search(regexp) {
    'use strict';
    var O = defined(this);
    var fn = regexp == undefined ? undefined : regexp[SEARCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
  }, $search];
});


/***/ }),
/* 267 */
/***/ (function(module, exports, __webpack_require__) {

// @@split logic
__webpack_require__(63)('split', 2, function (defined, SPLIT, $split) {
  'use strict';
  var isRegExp = __webpack_require__(60);
  var _split = $split;
  var $push = [].push;
  var $SPLIT = 'split';
  var LENGTH = 'length';
  var LAST_INDEX = 'lastIndex';
  if (
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ) {
    var NPCG = /()??/.exec('')[1] === undefined; // nonparticipating capturing group
    // based on es5-shim implementation, need to rework it
    $split = function (separator, limit) {
      var string = String(this);
      if (separator === undefined && limit === 0) return [];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) return _split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? 4294967295 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var separator2, match, lastIndex, lastLength, i;
      // Doesn't need flags gy, but they don't hurt
      if (!NPCG) separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
      while (match = separatorCopy.exec(string)) {
        // `separatorCopy.lastIndex` is not reliable cross-browser
        lastIndex = match.index + match[0][LENGTH];
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          // Fix browsers whose `exec` methods don't consistently return `undefined` for NPCG
          // eslint-disable-next-line no-loop-func
          if (!NPCG && match[LENGTH] > 1) match[0].replace(separator2, function () {
            for (i = 1; i < arguments[LENGTH] - 2; i++) if (arguments[i] === undefined) match[i] = undefined;
          });
          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if (output[LENGTH] >= splitLimit) break;
        }
        if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if (lastLastIndex === string[LENGTH]) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
    $split = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : _split.call(this, separator, limit);
    };
  }
  // 21.1.3.17 String.prototype.split(separator, limit)
  return [function split(separator, limit) {
    var O = defined(this);
    var fn = separator == undefined ? undefined : separator[SPLIT];
    return fn !== undefined ? fn.call(separator, O, limit) : $split.call(String(O), separator, limit);
  }, $split];
});


/***/ }),
/* 268 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(37);
var global = __webpack_require__(2);
var ctx = __webpack_require__(20);
var classof = __webpack_require__(53);
var $export = __webpack_require__(0);
var isObject = __webpack_require__(4);
var aFunction = __webpack_require__(11);
var anInstance = __webpack_require__(43);
var forOf = __webpack_require__(44);
var speciesConstructor = __webpack_require__(64);
var task = __webpack_require__(96).set;
var microtask = __webpack_require__(97)();
var newPromiseCapabilityModule = __webpack_require__(98);
var perform = __webpack_require__(124);
var promiseResolve = __webpack_require__(125);
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(5)('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value);
            if (domain) domain.exit();
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  if (promise._h == 1) return false;
  var chain = promise._a || promise._c;
  var i = 0;
  var reaction;
  while (chain.length > i) {
    reaction = chain[i++];
    if (reaction.fail || !isUnhandled(reaction.promise)) return false;
  } return true;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(45)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(47)($Promise, PROMISE);
__webpack_require__(42)(PROMISE);
Wrapper = __webpack_require__(23)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(61)(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),
/* 269 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var weak = __webpack_require__(130);
var validate = __webpack_require__(50);
var WEAK_SET = 'WeakSet';

// 23.4 WeakSet Objects
__webpack_require__(65)(WEAK_SET, function (get) {
  return function WeakSet() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.4.3.1 WeakSet.prototype.add(value)
  add: function add(value) {
    return weak.def(validate(this, WEAK_SET), value, true);
  }
}, weak, false, true);


/***/ }),
/* 270 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $typed = __webpack_require__(66);
var buffer = __webpack_require__(99);
var anObject = __webpack_require__(1);
var toAbsoluteIndex = __webpack_require__(39);
var toLength = __webpack_require__(8);
var isObject = __webpack_require__(4);
var ArrayBuffer = __webpack_require__(2).ArrayBuffer;
var speciesConstructor = __webpack_require__(64);
var $ArrayBuffer = buffer.ArrayBuffer;
var $DataView = buffer.DataView;
var $isView = $typed.ABV && ArrayBuffer.isView;
var $slice = $ArrayBuffer.prototype.slice;
var VIEW = $typed.VIEW;
var ARRAY_BUFFER = 'ArrayBuffer';

$export($export.G + $export.W + $export.F * (ArrayBuffer !== $ArrayBuffer), { ArrayBuffer: $ArrayBuffer });

$export($export.S + $export.F * !$typed.CONSTR, ARRAY_BUFFER, {
  // 24.1.3.1 ArrayBuffer.isView(arg)
  isView: function isView(it) {
    return $isView && $isView(it) || isObject(it) && VIEW in it;
  }
});

$export($export.P + $export.U + $export.F * __webpack_require__(3)(function () {
  return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
}), ARRAY_BUFFER, {
  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
  slice: function slice(start, end) {
    if ($slice !== undefined && end === undefined) return $slice.call(anObject(this), start); // FF fix
    var len = anObject(this).byteLength;
    var first = toAbsoluteIndex(start, len);
    var final = toAbsoluteIndex(end === undefined ? len : end, len);
    var result = new (speciesConstructor(this, $ArrayBuffer))(toLength(final - first));
    var viewS = new $DataView(this);
    var viewT = new $DataView(result);
    var index = 0;
    while (first < final) {
      viewT.setUint8(index++, viewS.getUint8(first++));
    } return result;
  }
});

__webpack_require__(42)(ARRAY_BUFFER);


/***/ }),
/* 271 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
$export($export.G + $export.W + $export.F * !__webpack_require__(66).ABV, {
  DataView: __webpack_require__(99).DataView
});


/***/ }),
/* 272 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(30)('Int8', 1, function (init) {
  return function Int8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 273 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(30)('Uint8', 1, function (init) {
  return function Uint8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 274 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(30)('Uint8', 1, function (init) {
  return function Uint8ClampedArray(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
}, true);


/***/ }),
/* 275 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(30)('Int16', 2, function (init) {
  return function Int16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 276 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(30)('Uint16', 2, function (init) {
  return function Uint16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 277 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(30)('Int32', 4, function (init) {
  return function Int32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 278 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(30)('Uint32', 4, function (init) {
  return function Uint32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 279 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(30)('Float32', 4, function (init) {
  return function Float32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 280 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(30)('Float64', 8, function (init) {
  return function Float64Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 281 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
var $export = __webpack_require__(0);
var aFunction = __webpack_require__(11);
var anObject = __webpack_require__(1);
var rApply = (__webpack_require__(2).Reflect || {}).apply;
var fApply = Function.apply;
// MS Edge argumentsList argument is optional
$export($export.S + $export.F * !__webpack_require__(3)(function () {
  rApply(function () { /* empty */ });
}), 'Reflect', {
  apply: function apply(target, thisArgument, argumentsList) {
    var T = aFunction(target);
    var L = anObject(argumentsList);
    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
  }
});


/***/ }),
/* 282 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
var $export = __webpack_require__(0);
var create = __webpack_require__(40);
var aFunction = __webpack_require__(11);
var anObject = __webpack_require__(1);
var isObject = __webpack_require__(4);
var fails = __webpack_require__(3);
var bind = __webpack_require__(111);
var rConstruct = (__webpack_require__(2).Reflect || {}).construct;

// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails(function () {
  function F() { /* empty */ }
  return !(rConstruct(function () { /* empty */ }, [], F) instanceof F);
});
var ARGS_BUG = !fails(function () {
  rConstruct(function () { /* empty */ });
});

$export($export.S + $export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
  construct: function construct(Target, args /* , newTarget */) {
    aFunction(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if (ARGS_BUG && !NEW_TARGET_BUG) return rConstruct(Target, args, newTarget);
    if (Target == newTarget) {
      // w/o altered newTarget, optimization for 0-4 arguments
      switch (args.length) {
        case 0: return new Target();
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args))();
    }
    // with altered newTarget, not support built-in constructors
    var proto = newTarget.prototype;
    var instance = create(isObject(proto) ? proto : Object.prototype);
    var result = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});


/***/ }),
/* 283 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
var dP = __webpack_require__(7);
var $export = __webpack_require__(0);
var anObject = __webpack_require__(1);
var toPrimitive = __webpack_require__(24);

// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
$export($export.S + $export.F * __webpack_require__(3)(function () {
  // eslint-disable-next-line no-undef
  Reflect.defineProperty(dP.f({}, 1, { value: 1 }), 1, { value: 2 });
}), 'Reflect', {
  defineProperty: function defineProperty(target, propertyKey, attributes) {
    anObject(target);
    propertyKey = toPrimitive(propertyKey, true);
    anObject(attributes);
    try {
      dP.f(target, propertyKey, attributes);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),
/* 284 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.4 Reflect.deleteProperty(target, propertyKey)
var $export = __webpack_require__(0);
var gOPD = __webpack_require__(18).f;
var anObject = __webpack_require__(1);

$export($export.S, 'Reflect', {
  deleteProperty: function deleteProperty(target, propertyKey) {
    var desc = gOPD(anObject(target), propertyKey);
    return desc && !desc.configurable ? false : delete target[propertyKey];
  }
});


/***/ }),
/* 285 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 26.1.5 Reflect.enumerate(target)
var $export = __webpack_require__(0);
var anObject = __webpack_require__(1);
var Enumerate = function (iterated) {
  this._t = anObject(iterated); // target
  this._i = 0;                  // next index
  var keys = this._k = [];      // keys
  var key;
  for (key in iterated) keys.push(key);
};
__webpack_require__(87)(Enumerate, 'Object', function () {
  var that = this;
  var keys = that._k;
  var key;
  do {
    if (that._i >= keys.length) return { value: undefined, done: true };
  } while (!((key = keys[that._i++]) in that._t));
  return { value: key, done: false };
});

$export($export.S, 'Reflect', {
  enumerate: function enumerate(target) {
    return new Enumerate(target);
  }
});


/***/ }),
/* 286 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.6 Reflect.get(target, propertyKey [, receiver])
var gOPD = __webpack_require__(18);
var getPrototypeOf = __webpack_require__(19);
var has = __webpack_require__(12);
var $export = __webpack_require__(0);
var isObject = __webpack_require__(4);
var anObject = __webpack_require__(1);

function get(target, propertyKey /* , receiver */) {
  var receiver = arguments.length < 3 ? target : arguments[2];
  var desc, proto;
  if (anObject(target) === receiver) return target[propertyKey];
  if (desc = gOPD.f(target, propertyKey)) return has(desc, 'value')
    ? desc.value
    : desc.get !== undefined
      ? desc.get.call(receiver)
      : undefined;
  if (isObject(proto = getPrototypeOf(target))) return get(proto, propertyKey, receiver);
}

$export($export.S, 'Reflect', { get: get });


/***/ }),
/* 287 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
var gOPD = __webpack_require__(18);
var $export = __webpack_require__(0);
var anObject = __webpack_require__(1);

$export($export.S, 'Reflect', {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
    return gOPD.f(anObject(target), propertyKey);
  }
});


/***/ }),
/* 288 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.8 Reflect.getPrototypeOf(target)
var $export = __webpack_require__(0);
var getProto = __webpack_require__(19);
var anObject = __webpack_require__(1);

$export($export.S, 'Reflect', {
  getPrototypeOf: function getPrototypeOf(target) {
    return getProto(anObject(target));
  }
});


/***/ }),
/* 289 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.9 Reflect.has(target, propertyKey)
var $export = __webpack_require__(0);

$export($export.S, 'Reflect', {
  has: function has(target, propertyKey) {
    return propertyKey in target;
  }
});


/***/ }),
/* 290 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.10 Reflect.isExtensible(target)
var $export = __webpack_require__(0);
var anObject = __webpack_require__(1);
var $isExtensible = Object.isExtensible;

$export($export.S, 'Reflect', {
  isExtensible: function isExtensible(target) {
    anObject(target);
    return $isExtensible ? $isExtensible(target) : true;
  }
});


/***/ }),
/* 291 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.11 Reflect.ownKeys(target)
var $export = __webpack_require__(0);

$export($export.S, 'Reflect', { ownKeys: __webpack_require__(132) });


/***/ }),
/* 292 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.12 Reflect.preventExtensions(target)
var $export = __webpack_require__(0);
var anObject = __webpack_require__(1);
var $preventExtensions = Object.preventExtensions;

$export($export.S, 'Reflect', {
  preventExtensions: function preventExtensions(target) {
    anObject(target);
    try {
      if ($preventExtensions) $preventExtensions(target);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),
/* 293 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
var dP = __webpack_require__(7);
var gOPD = __webpack_require__(18);
var getPrototypeOf = __webpack_require__(19);
var has = __webpack_require__(12);
var $export = __webpack_require__(0);
var createDesc = __webpack_require__(35);
var anObject = __webpack_require__(1);
var isObject = __webpack_require__(4);

function set(target, propertyKey, V /* , receiver */) {
  var receiver = arguments.length < 4 ? target : arguments[3];
  var ownDesc = gOPD.f(anObject(target), propertyKey);
  var existingDescriptor, proto;
  if (!ownDesc) {
    if (isObject(proto = getPrototypeOf(target))) {
      return set(proto, propertyKey, V, receiver);
    }
    ownDesc = createDesc(0);
  }
  if (has(ownDesc, 'value')) {
    if (ownDesc.writable === false || !isObject(receiver)) return false;
    existingDescriptor = gOPD.f(receiver, propertyKey) || createDesc(0);
    existingDescriptor.value = V;
    dP.f(receiver, propertyKey, existingDescriptor);
    return true;
  }
  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
}

$export($export.S, 'Reflect', { set: set });


/***/ }),
/* 294 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.14 Reflect.setPrototypeOf(target, proto)
var $export = __webpack_require__(0);
var setProto = __webpack_require__(79);

if (setProto) $export($export.S, 'Reflect', {
  setPrototypeOf: function setPrototypeOf(target, proto) {
    setProto.check(target, proto);
    try {
      setProto.set(target, proto);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),
/* 295 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/Array.prototype.includes
var $export = __webpack_require__(0);
var $includes = __webpack_require__(57)(true);

$export($export.P, 'Array', {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

__webpack_require__(33)('includes');


/***/ }),
/* 296 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatMap
var $export = __webpack_require__(0);
var flattenIntoArray = __webpack_require__(133);
var toObject = __webpack_require__(9);
var toLength = __webpack_require__(8);
var aFunction = __webpack_require__(11);
var arraySpeciesCreate = __webpack_require__(93);

$export($export.P, 'Array', {
  flatMap: function flatMap(callbackfn /* , thisArg */) {
    var O = toObject(this);
    var sourceLen, A;
    aFunction(callbackfn);
    sourceLen = toLength(O.length);
    A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, 1, callbackfn, arguments[1]);
    return A;
  }
});

__webpack_require__(33)('flatMap');


/***/ }),
/* 297 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatten
var $export = __webpack_require__(0);
var flattenIntoArray = __webpack_require__(133);
var toObject = __webpack_require__(9);
var toLength = __webpack_require__(8);
var toInteger = __webpack_require__(26);
var arraySpeciesCreate = __webpack_require__(93);

$export($export.P, 'Array', {
  flatten: function flatten(/* depthArg = 1 */) {
    var depthArg = arguments[0];
    var O = toObject(this);
    var sourceLen = toLength(O.length);
    var A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, depthArg === undefined ? 1 : toInteger(depthArg));
    return A;
  }
});

__webpack_require__(33)('flatten');


/***/ }),
/* 298 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/mathiasbynens/String.prototype.at
var $export = __webpack_require__(0);
var $at = __webpack_require__(85)(true);

$export($export.P, 'String', {
  at: function at(pos) {
    return $at(this, pos);
  }
});


/***/ }),
/* 299 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var $export = __webpack_require__(0);
var $pad = __webpack_require__(134);

$export($export.P, 'String', {
  padStart: function padStart(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
  }
});


/***/ }),
/* 300 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var $export = __webpack_require__(0);
var $pad = __webpack_require__(134);

$export($export.P, 'String', {
  padEnd: function padEnd(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
  }
});


/***/ }),
/* 301 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
__webpack_require__(48)('trimLeft', function ($trim) {
  return function trimLeft() {
    return $trim(this, 1);
  };
}, 'trimStart');


/***/ }),
/* 302 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
__webpack_require__(48)('trimRight', function ($trim) {
  return function trimRight() {
    return $trim(this, 2);
  };
}, 'trimEnd');


/***/ }),
/* 303 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/String.prototype.matchAll/
var $export = __webpack_require__(0);
var defined = __webpack_require__(25);
var toLength = __webpack_require__(8);
var isRegExp = __webpack_require__(60);
var getFlags = __webpack_require__(62);
var RegExpProto = RegExp.prototype;

var $RegExpStringIterator = function (regexp, string) {
  this._r = regexp;
  this._s = string;
};

__webpack_require__(87)($RegExpStringIterator, 'RegExp String', function next() {
  var match = this._r.exec(this._s);
  return { value: match, done: match === null };
});

$export($export.P, 'String', {
  matchAll: function matchAll(regexp) {
    defined(this);
    if (!isRegExp(regexp)) throw TypeError(regexp + ' is not a regexp!');
    var S = String(this);
    var flags = 'flags' in RegExpProto ? String(regexp.flags) : getFlags.call(regexp);
    var rx = new RegExp(regexp.source, ~flags.indexOf('g') ? flags : 'g' + flags);
    rx.lastIndex = toLength(regexp.lastIndex);
    return new $RegExpStringIterator(rx, S);
  }
});


/***/ }),
/* 304 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(75)('asyncIterator');


/***/ }),
/* 305 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(75)('observable');


/***/ }),
/* 306 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-getownpropertydescriptors
var $export = __webpack_require__(0);
var ownKeys = __webpack_require__(132);
var toIObject = __webpack_require__(17);
var gOPD = __webpack_require__(18);
var createProperty = __webpack_require__(91);

$export($export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIObject(object);
    var getDesc = gOPD.f;
    var keys = ownKeys(O);
    var result = {};
    var i = 0;
    var key, desc;
    while (keys.length > i) {
      desc = getDesc(O, key = keys[i++]);
      if (desc !== undefined) createProperty(result, key, desc);
    }
    return result;
  }
});


/***/ }),
/* 307 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(0);
var $values = __webpack_require__(135)(false);

$export($export.S, 'Object', {
  values: function values(it) {
    return $values(it);
  }
});


/***/ }),
/* 308 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(0);
var $entries = __webpack_require__(135)(true);

$export($export.S, 'Object', {
  entries: function entries(it) {
    return $entries(it);
  }
});


/***/ }),
/* 309 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toObject = __webpack_require__(9);
var aFunction = __webpack_require__(11);
var $defineProperty = __webpack_require__(7);

// B.2.2.2 Object.prototype.__defineGetter__(P, getter)
__webpack_require__(6) && $export($export.P + __webpack_require__(67), 'Object', {
  __defineGetter__: function __defineGetter__(P, getter) {
    $defineProperty.f(toObject(this), P, { get: aFunction(getter), enumerable: true, configurable: true });
  }
});


/***/ }),
/* 310 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toObject = __webpack_require__(9);
var aFunction = __webpack_require__(11);
var $defineProperty = __webpack_require__(7);

// B.2.2.3 Object.prototype.__defineSetter__(P, setter)
__webpack_require__(6) && $export($export.P + __webpack_require__(67), 'Object', {
  __defineSetter__: function __defineSetter__(P, setter) {
    $defineProperty.f(toObject(this), P, { set: aFunction(setter), enumerable: true, configurable: true });
  }
});


/***/ }),
/* 311 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toObject = __webpack_require__(9);
var toPrimitive = __webpack_require__(24);
var getPrototypeOf = __webpack_require__(19);
var getOwnPropertyDescriptor = __webpack_require__(18).f;

// B.2.2.4 Object.prototype.__lookupGetter__(P)
__webpack_require__(6) && $export($export.P + __webpack_require__(67), 'Object', {
  __lookupGetter__: function __lookupGetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.get;
    } while (O = getPrototypeOf(O));
  }
});


/***/ }),
/* 312 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toObject = __webpack_require__(9);
var toPrimitive = __webpack_require__(24);
var getPrototypeOf = __webpack_require__(19);
var getOwnPropertyDescriptor = __webpack_require__(18).f;

// B.2.2.5 Object.prototype.__lookupSetter__(P)
__webpack_require__(6) && $export($export.P + __webpack_require__(67), 'Object', {
  __lookupSetter__: function __lookupSetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.set;
    } while (O = getPrototypeOf(O));
  }
});


/***/ }),
/* 313 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(0);

$export($export.P + $export.R, 'Map', { toJSON: __webpack_require__(136)('Map') });


/***/ }),
/* 314 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(0);

$export($export.P + $export.R, 'Set', { toJSON: __webpack_require__(136)('Set') });


/***/ }),
/* 315 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.of
__webpack_require__(68)('Map');


/***/ }),
/* 316 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.of
__webpack_require__(68)('Set');


/***/ }),
/* 317 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.of
__webpack_require__(68)('WeakMap');


/***/ }),
/* 318 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.of
__webpack_require__(68)('WeakSet');


/***/ }),
/* 319 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.from
__webpack_require__(69)('Map');


/***/ }),
/* 320 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.from
__webpack_require__(69)('Set');


/***/ }),
/* 321 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.from
__webpack_require__(69)('WeakMap');


/***/ }),
/* 322 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.from
__webpack_require__(69)('WeakSet');


/***/ }),
/* 323 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-global
var $export = __webpack_require__(0);

$export($export.G, { global: __webpack_require__(2) });


/***/ }),
/* 324 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-global
var $export = __webpack_require__(0);

$export($export.S, 'System', { global: __webpack_require__(2) });


/***/ }),
/* 325 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/ljharb/proposal-is-error
var $export = __webpack_require__(0);
var cof = __webpack_require__(21);

$export($export.S, 'Error', {
  isError: function isError(it) {
    return cof(it) === 'Error';
  }
});


/***/ }),
/* 326 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  clamp: function clamp(x, lower, upper) {
    return Math.min(upper, Math.max(lower, x));
  }
});


/***/ }),
/* 327 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);

$export($export.S, 'Math', { DEG_PER_RAD: Math.PI / 180 });


/***/ }),
/* 328 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);
var RAD_PER_DEG = 180 / Math.PI;

$export($export.S, 'Math', {
  degrees: function degrees(radians) {
    return radians * RAD_PER_DEG;
  }
});


/***/ }),
/* 329 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);
var scale = __webpack_require__(138);
var fround = __webpack_require__(118);

$export($export.S, 'Math', {
  fscale: function fscale(x, inLow, inHigh, outLow, outHigh) {
    return fround(scale(x, inLow, inHigh, outLow, outHigh));
  }
});


/***/ }),
/* 330 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  iaddh: function iaddh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0;
    var $x1 = x1 >>> 0;
    var $y0 = y0 >>> 0;
    return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
  }
});


/***/ }),
/* 331 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  isubh: function isubh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0;
    var $x1 = x1 >>> 0;
    var $y0 = y0 >>> 0;
    return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
  }
});


/***/ }),
/* 332 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  imulh: function imulh(u, v) {
    var UINT16 = 0xffff;
    var $u = +u;
    var $v = +v;
    var u0 = $u & UINT16;
    var v0 = $v & UINT16;
    var u1 = $u >> 16;
    var v1 = $v >> 16;
    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
  }
});


/***/ }),
/* 333 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);

$export($export.S, 'Math', { RAD_PER_DEG: 180 / Math.PI });


/***/ }),
/* 334 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);
var DEG_PER_RAD = Math.PI / 180;

$export($export.S, 'Math', {
  radians: function radians(degrees) {
    return degrees * DEG_PER_RAD;
  }
});


/***/ }),
/* 335 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);

$export($export.S, 'Math', { scale: __webpack_require__(138) });


/***/ }),
/* 336 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  umulh: function umulh(u, v) {
    var UINT16 = 0xffff;
    var $u = +u;
    var $v = +v;
    var u0 = $u & UINT16;
    var v0 = $v & UINT16;
    var u1 = $u >>> 16;
    var v1 = $v >>> 16;
    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
  }
});


/***/ }),
/* 337 */
/***/ (function(module, exports, __webpack_require__) {

// http://jfbastien.github.io/papers/Math.signbit.html
var $export = __webpack_require__(0);

$export($export.S, 'Math', { signbit: function signbit(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) != x ? x : x == 0 ? 1 / x == Infinity : x > 0;
} });


/***/ }),
/* 338 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__(0);
var core = __webpack_require__(23);
var global = __webpack_require__(2);
var speciesConstructor = __webpack_require__(64);
var promiseResolve = __webpack_require__(125);

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),
/* 339 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__(0);
var newPromiseCapability = __webpack_require__(98);
var perform = __webpack_require__(124);

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),
/* 340 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(31);
var anObject = __webpack_require__(1);
var toMetaKey = metadata.key;
var ordinaryDefineOwnMetadata = metadata.set;

metadata.exp({ defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey) {
  ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), toMetaKey(targetKey));
} });


/***/ }),
/* 341 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(31);
var anObject = __webpack_require__(1);
var toMetaKey = metadata.key;
var getOrCreateMetadataMap = metadata.map;
var store = metadata.store;

metadata.exp({ deleteMetadata: function deleteMetadata(metadataKey, target /* , targetKey */) {
  var targetKey = arguments.length < 3 ? undefined : toMetaKey(arguments[2]);
  var metadataMap = getOrCreateMetadataMap(anObject(target), targetKey, false);
  if (metadataMap === undefined || !metadataMap['delete'](metadataKey)) return false;
  if (metadataMap.size) return true;
  var targetMetadata = store.get(target);
  targetMetadata['delete'](targetKey);
  return !!targetMetadata.size || store['delete'](target);
} });


/***/ }),
/* 342 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(31);
var anObject = __webpack_require__(1);
var getPrototypeOf = __webpack_require__(19);
var ordinaryHasOwnMetadata = metadata.has;
var ordinaryGetOwnMetadata = metadata.get;
var toMetaKey = metadata.key;

var ordinaryGetMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return ordinaryGetOwnMetadata(MetadataKey, O, P);
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
};

metadata.exp({ getMetadata: function getMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryGetMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 343 */
/***/ (function(module, exports, __webpack_require__) {

var Set = __webpack_require__(128);
var from = __webpack_require__(137);
var metadata = __webpack_require__(31);
var anObject = __webpack_require__(1);
var getPrototypeOf = __webpack_require__(19);
var ordinaryOwnMetadataKeys = metadata.keys;
var toMetaKey = metadata.key;

var ordinaryMetadataKeys = function (O, P) {
  var oKeys = ordinaryOwnMetadataKeys(O, P);
  var parent = getPrototypeOf(O);
  if (parent === null) return oKeys;
  var pKeys = ordinaryMetadataKeys(parent, P);
  return pKeys.length ? oKeys.length ? from(new Set(oKeys.concat(pKeys))) : pKeys : oKeys;
};

metadata.exp({ getMetadataKeys: function getMetadataKeys(target /* , targetKey */) {
  return ordinaryMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
} });


/***/ }),
/* 344 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(31);
var anObject = __webpack_require__(1);
var ordinaryGetOwnMetadata = metadata.get;
var toMetaKey = metadata.key;

metadata.exp({ getOwnMetadata: function getOwnMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryGetOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 345 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(31);
var anObject = __webpack_require__(1);
var ordinaryOwnMetadataKeys = metadata.keys;
var toMetaKey = metadata.key;

metadata.exp({ getOwnMetadataKeys: function getOwnMetadataKeys(target /* , targetKey */) {
  return ordinaryOwnMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
} });


/***/ }),
/* 346 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(31);
var anObject = __webpack_require__(1);
var getPrototypeOf = __webpack_require__(19);
var ordinaryHasOwnMetadata = metadata.has;
var toMetaKey = metadata.key;

var ordinaryHasMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return true;
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
};

metadata.exp({ hasMetadata: function hasMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryHasMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 347 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(31);
var anObject = __webpack_require__(1);
var ordinaryHasOwnMetadata = metadata.has;
var toMetaKey = metadata.key;

metadata.exp({ hasOwnMetadata: function hasOwnMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryHasOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 348 */
/***/ (function(module, exports, __webpack_require__) {

var $metadata = __webpack_require__(31);
var anObject = __webpack_require__(1);
var aFunction = __webpack_require__(11);
var toMetaKey = $metadata.key;
var ordinaryDefineOwnMetadata = $metadata.set;

$metadata.exp({ metadata: function metadata(metadataKey, metadataValue) {
  return function decorator(target, targetKey) {
    ordinaryDefineOwnMetadata(
      metadataKey, metadataValue,
      (targetKey !== undefined ? anObject : aFunction)(target),
      toMetaKey(targetKey)
    );
  };
} });


/***/ }),
/* 349 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/rwaldron/tc39-notes/blob/master/es6/2014-09/sept-25.md#510-globalasap-for-enqueuing-a-microtask
var $export = __webpack_require__(0);
var microtask = __webpack_require__(97)();
var process = __webpack_require__(2).process;
var isNode = __webpack_require__(21)(process) == 'process';

$export($export.G, {
  asap: function asap(fn) {
    var domain = isNode && process.domain;
    microtask(domain ? domain.bind(fn) : fn);
  }
});


/***/ }),
/* 350 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/zenparsing/es-observable
var $export = __webpack_require__(0);
var global = __webpack_require__(2);
var core = __webpack_require__(23);
var microtask = __webpack_require__(97)();
var OBSERVABLE = __webpack_require__(5)('observable');
var aFunction = __webpack_require__(11);
var anObject = __webpack_require__(1);
var anInstance = __webpack_require__(43);
var redefineAll = __webpack_require__(45);
var hide = __webpack_require__(13);
var forOf = __webpack_require__(44);
var RETURN = forOf.RETURN;

var getMethod = function (fn) {
  return fn == null ? undefined : aFunction(fn);
};

var cleanupSubscription = function (subscription) {
  var cleanup = subscription._c;
  if (cleanup) {
    subscription._c = undefined;
    cleanup();
  }
};

var subscriptionClosed = function (subscription) {
  return subscription._o === undefined;
};

var closeSubscription = function (subscription) {
  if (!subscriptionClosed(subscription)) {
    subscription._o = undefined;
    cleanupSubscription(subscription);
  }
};

var Subscription = function (observer, subscriber) {
  anObject(observer);
  this._c = undefined;
  this._o = observer;
  observer = new SubscriptionObserver(this);
  try {
    var cleanup = subscriber(observer);
    var subscription = cleanup;
    if (cleanup != null) {
      if (typeof cleanup.unsubscribe === 'function') cleanup = function () { subscription.unsubscribe(); };
      else aFunction(cleanup);
      this._c = cleanup;
    }
  } catch (e) {
    observer.error(e);
    return;
  } if (subscriptionClosed(this)) cleanupSubscription(this);
};

Subscription.prototype = redefineAll({}, {
  unsubscribe: function unsubscribe() { closeSubscription(this); }
});

var SubscriptionObserver = function (subscription) {
  this._s = subscription;
};

SubscriptionObserver.prototype = redefineAll({}, {
  next: function next(value) {
    var subscription = this._s;
    if (!subscriptionClosed(subscription)) {
      var observer = subscription._o;
      try {
        var m = getMethod(observer.next);
        if (m) return m.call(observer, value);
      } catch (e) {
        try {
          closeSubscription(subscription);
        } finally {
          throw e;
        }
      }
    }
  },
  error: function error(value) {
    var subscription = this._s;
    if (subscriptionClosed(subscription)) throw value;
    var observer = subscription._o;
    subscription._o = undefined;
    try {
      var m = getMethod(observer.error);
      if (!m) throw value;
      value = m.call(observer, value);
    } catch (e) {
      try {
        cleanupSubscription(subscription);
      } finally {
        throw e;
      }
    } cleanupSubscription(subscription);
    return value;
  },
  complete: function complete(value) {
    var subscription = this._s;
    if (!subscriptionClosed(subscription)) {
      var observer = subscription._o;
      subscription._o = undefined;
      try {
        var m = getMethod(observer.complete);
        value = m ? m.call(observer, value) : undefined;
      } catch (e) {
        try {
          cleanupSubscription(subscription);
        } finally {
          throw e;
        }
      } cleanupSubscription(subscription);
      return value;
    }
  }
});

var $Observable = function Observable(subscriber) {
  anInstance(this, $Observable, 'Observable', '_f')._f = aFunction(subscriber);
};

redefineAll($Observable.prototype, {
  subscribe: function subscribe(observer) {
    return new Subscription(observer, this._f);
  },
  forEach: function forEach(fn) {
    var that = this;
    return new (core.Promise || global.Promise)(function (resolve, reject) {
      aFunction(fn);
      var subscription = that.subscribe({
        next: function (value) {
          try {
            return fn(value);
          } catch (e) {
            reject(e);
            subscription.unsubscribe();
          }
        },
        error: reject,
        complete: resolve
      });
    });
  }
});

redefineAll($Observable, {
  from: function from(x) {
    var C = typeof this === 'function' ? this : $Observable;
    var method = getMethod(anObject(x)[OBSERVABLE]);
    if (method) {
      var observable = anObject(method.call(x));
      return observable.constructor === C ? observable : new C(function (observer) {
        return observable.subscribe(observer);
      });
    }
    return new C(function (observer) {
      var done = false;
      microtask(function () {
        if (!done) {
          try {
            if (forOf(x, false, function (it) {
              observer.next(it);
              if (done) return RETURN;
            }) === RETURN) return;
          } catch (e) {
            if (done) throw e;
            observer.error(e);
            return;
          } observer.complete();
        }
      });
      return function () { done = true; };
    });
  },
  of: function of() {
    for (var i = 0, l = arguments.length, items = Array(l); i < l;) items[i] = arguments[i++];
    return new (typeof this === 'function' ? this : $Observable)(function (observer) {
      var done = false;
      microtask(function () {
        if (!done) {
          for (var j = 0; j < items.length; ++j) {
            observer.next(items[j]);
            if (done) return;
          } observer.complete();
        }
      });
      return function () { done = true; };
    });
  }
});

hide($Observable.prototype, OBSERVABLE, function () { return this; });

$export($export.G, { Observable: $Observable });

__webpack_require__(42)('Observable');


/***/ }),
/* 351 */
/***/ (function(module, exports, __webpack_require__) {

// ie9- setTimeout & setInterval additional parameters fix
var global = __webpack_require__(2);
var $export = __webpack_require__(0);
var navigator = global.navigator;
var slice = [].slice;
var MSIE = !!navigator && /MSIE .\./.test(navigator.userAgent); // <- dirty ie9- check
var wrap = function (set) {
  return function (fn, time /* , ...args */) {
    var boundArgs = arguments.length > 2;
    var args = boundArgs ? slice.call(arguments, 2) : false;
    return set(boundArgs ? function () {
      // eslint-disable-next-line no-new-func
      (typeof fn == 'function' ? fn : Function(fn)).apply(this, args);
    } : fn, time);
  };
};
$export($export.G + $export.B + $export.F * MSIE, {
  setTimeout: wrap(global.setTimeout),
  setInterval: wrap(global.setInterval)
});


/***/ }),
/* 352 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $task = __webpack_require__(96);
$export($export.G + $export.B, {
  setImmediate: $task.set,
  clearImmediate: $task.clear
});


/***/ }),
/* 353 */
/***/ (function(module, exports, __webpack_require__) {

var $iterators = __webpack_require__(95);
var getKeys = __webpack_require__(38);
var redefine = __webpack_require__(14);
var global = __webpack_require__(2);
var hide = __webpack_require__(13);
var Iterators = __webpack_require__(49);
var wks = __webpack_require__(5);
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}


/***/ }),
/* 354 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    if (typeof global.process === "object" && global.process.domain) {
      invoke = global.process.domain.bind(invoke);
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // Among the various tricks for obtaining a reference to the global
  // object, this seems to be the most reliable technique that does not
  // use indirect eval (which violates Content Security Policy).
  typeof global === "object" ? global :
  typeof window === "object" ? window :
  typeof self === "object" ? self : this
);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(55)))

/***/ }),
/* 355 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(356);
module.exports = __webpack_require__(23).RegExp.escape;


/***/ }),
/* 356 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/benjamingr/RexExp.escape
var $export = __webpack_require__(0);
var $re = __webpack_require__(357)(/[\\^$*+?.()|[\]{}]/g, '\\$&');

$export($export.S, 'RegExp', { escape: function escape(it) { return $re(it); } });


/***/ }),
/* 357 */
/***/ (function(module, exports) {

module.exports = function (regExp, replace) {
  var replacer = replace === Object(replace) ? function (part) {
    return replace[part];
  } : replace;
  return function (it) {
    return String(it).replace(regExp, replacer);
  };
};


/***/ }),
/* 358 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.render = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(10);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(102);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _index = __webpack_require__(373);

var _index2 = _interopRequireDefault(_index);

var _urijs = __webpack_require__(104);

var _urijs2 = _interopRequireDefault(_urijs);

var _canned = __webpack_require__(392);

var _canned2 = _interopRequireDefault(_canned);

var _xhrRequest = __webpack_require__(393);

var _xhrRequest2 = _interopRequireDefault(_xhrRequest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var cannedJson = {
  columnHeaders: [{ "id": "g1" }, { "id": "g2" }, { "id": "g3" }, { "id": "g4" }, { "id": "g5" }, { "id": "g6" }, { "id": "g7" }, { "id": "g8" }, { "id": "g9" }, { "id": "g10" }, { "id": "g11" }, { "id": "g12" }, { "id": "g13" }, { "id": "g14" }, { "id": "g15" }],
  profiles: _canned2.default
};

var fetchResponseJson = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url, cb) {
    var response, responseJson;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fetch(url);

          case 2:
            response = _context.sent;
            _context.next = 5;
            return response.json();

          case 5:
            responseJson = _context.sent;

            cb(responseJson);

          case 7:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function fetchResponseJson(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var ourUrl = function ourUrl(base, experiment, gene) {
  return (0, _urijs2.default)('json/debug-experiments/' + experiment + '/genes/' + gene + '/transcripts?type=RNASEQ_MRNA_BASELINE', base).toString();
};

var Demo = function (_React$Component) {
  _inherits(Demo, _React$Component);

  function Demo(props) {
    _classCallCheck(this, Demo);

    var _this = _possibleConstructorReturn(this, (Demo.__proto__ || Object.getPrototypeOf(Demo)).call(this, props));

    _this.state = {
      experimentAccession: "E-MTAB-4484",
      geneId: "TRIAE_CS42_1AL_TGACv1_000002_AA0000030",
      url: '',
      loading: false,
      data: {}
    };

    _this._handleChangeExperiment = _this._handleChangeExperiment.bind(_this);
    _this._handleChangeGeneId = _this._handleChangeGeneId.bind(_this);
    _this._handleSubmit = _this._handleSubmit.bind(_this);
    return _this;
  }

  _createClass(Demo, [{
    key: '_handleChangeExperiment',
    value: function _handleChangeExperiment(event) {
      this.setState({
        experimentAccession: event.target.value
      });
    }
  }, {
    key: '_handleChangeGeneId',
    value: function _handleChangeGeneId(event) {
      this.setState({
        geneId: event.target.value
      });
    }
  }, {
    key: '_handleSubmit',
    value: function _handleSubmit(event) {
      var _this2 = this;

      event.preventDefault();
      var url = ourUrl("https://www-test.ebi.ac.uk/gxa/", this.state.experimentAccession, this.state.geneId);

      this.setState({
        url: url,
        loading: true
      }, fetchResponseJson.bind(this, url, function (data) {
        return _this2.setState({ data: data, loading: false });
      }));
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'row column' },
        _react2.default.createElement(
          'div',
          { className: 'row column' },
          _react2.default.createElement(
            'form',
            { onSubmit: this._handleSubmit },
            _react2.default.createElement(
              'label',
              null,
              'Experiment'
            ),
            _react2.default.createElement('input', { type: 'text', onChange: this._handleChangeExperiment, value: this.state.experimentAccession }),
            _react2.default.createElement(
              'label',
              null,
              'Gene id'
            ),
            _react2.default.createElement('input', { type: 'text', onChange: this._handleChangeGeneId, value: this.state.geneId }),
            _react2.default.createElement('input', { className: 'button', type: 'submit', value: 'Go!' })
          )
        ),
        this.state.loading ? 'Loading from ' + this.state.url + ' ...' : this.state.url ? _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'i',
            null,
            'Reading from:',
            this.state.url
          ),
          _react2.default.createElement('br', null),
          _react2.default.createElement(_index2.default, this.state.data)
        ) : ""
      );
    }
  }]);

  return Demo;
}(_react2.default.Component);

var render = function render(options, target) {
  _reactDom2.default.render(_react2.default.createElement(Demo, options), document.getElementById(target));
};

exports.render = render;

/***/ }),
/* 359 */,
/* 360 */,
/* 361 */,
/* 362 */,
/* 363 */,
/* 364 */,
/* 365 */,
/* 366 */,
/* 367 */,
/* 368 */,
/* 369 */,
/* 370 */,
/* 371 */,
/* 372 */,
/* 373 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = __webpack_require__(10);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(29);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _urijs = __webpack_require__(104);

var _urijs2 = _interopRequireDefault(_urijs);

var _reactHighcharts = __webpack_require__(375);

var _reactHighcharts2 = _interopRequireDefault(_reactHighcharts);

var _highchartsMore = __webpack_require__(377);

var _highchartsMore2 = _interopRequireDefault(_highchartsMore);

var _uncontrollable = __webpack_require__(378);

var _uncontrollable2 = _interopRequireDefault(_uncontrollable);

var _reactSelect = __webpack_require__(381);

var _reactSelect2 = _interopRequireDefault(_reactSelect);

__webpack_require__(387);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _highchartsMore2.default)(_reactHighcharts2.default.Highcharts);


var SUFFIX = " individual";
var baseConfig = function baseConfig(_ref) {
	var xAxisCategories = _ref.xAxisCategories,
	    useLogarithmicAxis = _ref.useLogarithmicAxis,
	    pointShape = _ref.pointShape;
	return {
		chart: {
			type: 'boxplot',
			zoomType: 'x',
			events: {
				load: function load() {

					//works apart from when you later take some series out with the menu
					//http://jsfiddle.net/sza4odkz/1/
					this.series.forEach(function (series, ix, self) {
						if (series.type == 'scatter') {
							var correspondingBoxplotSeries = self.find(function (otherSeries, otherIx) {
								return otherSeries.name == series.name.replace(SUFFIX, "") && otherIx !== ix;
							});

							if (correspondingBoxplotSeries) {
								series.data.forEach(function (point) {
									point.x = correspondingBoxplotSeries.xAxis.toValue(correspondingBoxplotSeries.data[point.x].shapeArgs.x + correspondingBoxplotSeries.data[point.x].shapeArgs.width / 2 + correspondingBoxplotSeries.group.translateX + correspondingBoxplotSeries.data[point.x].stem.strokeWidth() % 2 / 2);
								});
							}
						}
					});
				}
			}
		},

		title: {
			text: ''
		},

		credits: {
			enabled: false
		},

		legend: {
			enabled: true
		},

		xAxis: {
			categories: xAxisCategories,
			title: {
				text: 'Assay group'
			}
		},

		yAxis: {
			title: {
				text: 'Expression (TPM)'
			},
			type: useLogarithmicAxis ? 'logarithmic' : '',
			min: 0.1
		},

		plotOptions: {
			column: {
				grouping: false,
				shadow: false
			},
			series: {
				animation: false,
				events: {
					legendItemClick: function legendItemClick() {
						return false;
					}
				}
			},
			scatter: {
				marker: {
					symbol: pointShape,
					states: {
						hover: {
							enabled: true
						}
					}
				},
				states: {
					hover: {
						marker: {
							enabled: false
						}
					}
				}
			}
		}
	};
};
var boxPlotConfig = function boxPlotConfig(_ref2) {
	var xAxisCategories = _ref2.xAxisCategories,
	    dataSeries = _ref2.dataSeries,
	    useLogarithmicAxis = _ref2.useLogarithmicAxis;
	return Object.assign(baseConfig({ xAxisCategories: xAxisCategories, useLogarithmicAxis: useLogarithmicAxis }), {
		series: dataSeries
	});
};

//TODO tooltip
var plotConfig = function plotConfig(_ref3) {
	var xAxisCategories = _ref3.xAxisCategories,
	    dataSeries = _ref3.dataSeries,
	    useLogarithmicAxis = _ref3.useLogarithmicAxis,
	    pointShape = _ref3.pointShape;
	return Object.assign(baseConfig({ xAxisCategories: xAxisCategories, useLogarithmicAxis: useLogarithmicAxis, pointShape: pointShape }), {
		series: dataSeries
	});
};

var scatterPlotConfig = function scatterPlotConfig(_ref4) {
	var xAxisCategories = _ref4.xAxisCategories,
	    dataSeries = _ref4.dataSeries,
	    useLogarithmicAxis = _ref4.useLogarithmicAxis;
	return Object.assign(baseConfig({ xAxisCategories: xAxisCategories, useLogarithmicAxis: useLogarithmicAxis }), {
		series: dataSeries,
		tooltip: {
			pointFormat: 'Expression: {point.y} TPM <br/> Assay:  {point.info.assays}'
		}
	});
};

var SelectTranscripts = function SelectTranscripts(_ref5) {
	var rowNames = _ref5.rowNames,
	    currentRowNames = _ref5.currentRowNames,
	    onChangeCurrentRowNames = _ref5.onChangeCurrentRowNames;
	return _react2.default.createElement(_reactSelect2.default, {
		name: '',
		options: rowNames.map(function (name) {
			return { label: name, value: name };
		}),
		multi: true,
		onChange: function onChange(x) {
			onChangeCurrentRowNames(x.map(function (xx) {
				return xx.value;
			}));
		},
		value: currentRowNames
	});
};

var boxPlotDataSeries = function boxPlotDataSeries(_ref6) {
	var rows = _ref6.rows;
	return rows.map(function (_ref7) {
		var id = _ref7.id,
		    name = _ref7.name,
		    expressions = _ref7.expressions;
		return {
			name: id,
			data: expressions.map(function (_ref8) {
				var values = _ref8.values,
				    stats = _ref8.stats;
				return stats ? [stats.min, stats.lower_quartile, stats.median, stats.upper_quartile, stats.max] : [];
			})
		};
	});
};
var BoxPlot = function BoxPlot(_ref9) {
	var rows = _ref9.rows,
	    columnHeaders = _ref9.columnHeaders,
	    useLogarithmicAxis = _ref9.useLogarithmicAxis;
	return _react2.default.createElement(
		'div',
		{ key: 'boxPlot' },
		rows.length && _react2.default.createElement(_reactHighcharts2.default, { config: boxPlotConfig({
				useLogarithmicAxis: useLogarithmicAxis,
				xAxisCategories: columnHeaders.map(function (_ref10) {
					var id = _ref10.id;
					return id;
				}),
				dataSeries: boxPlotDataSeries({ rows: rows })
			}) })
	);
};

var scatterDataSeries = function scatterDataSeries(_ref11) {
	var rows = _ref11.rows,
	    useLogarithmicAxis = _ref11.useLogarithmicAxis;
	return rows.map(function (_ref12, rowIndex) {
		var id = _ref12.id,
		    name = _ref12.name,
		    expressions = _ref12.expressions;
		return {
			type: 'scatter',
			name: id + SUFFIX,
			color: _reactHighcharts2.default.Highcharts.getOptions().colors[rowIndex],
			data: [].concat.apply([], expressions.map(function (_ref13, ix) {
				var values = _ref13.values,
				    stats = _ref13.stats;
				return values ? values.filter(function (_ref14) {
					var value = _ref14.value;
					return !useLogarithmicAxis || value > 0;
				}).map(function (_ref15) {
					var value = _ref15.value,
					    id = _ref15.id,
					    assays = _ref15.assays;
					return {
						x: ix,
						y: value,
						info: { id: id, assays: assays }
					};
				}) : [];
			})),
			marker: {
				lineWidth: 1
			},
			tooltip: {
				pointFormat: 'Expression: {point.y} TPM <br/> Assay:  {point.info.assays}'
			},
			showInLegend: false

		};
	});
};

var ScatterPlot = function ScatterPlot(_ref16) {
	var rows = _ref16.rows,
	    columnHeaders = _ref16.columnHeaders,
	    useLogarithmicAxis = _ref16.useLogarithmicAxis;
	return _react2.default.createElement(
		'div',
		{ key: 'scatterPlot' },
		rows.length && _react2.default.createElement(_reactHighcharts2.default, { config: scatterPlotConfig({
				useLogarithmicAxis: useLogarithmicAxis,
				xAxisCategories: columnHeaders.map(function (_ref17) {
					var id = _ref17.id;
					return id;
				}),
				dataSeries: scatterDataSeries({ rows: rows, useLogarithmicAxis: useLogarithmicAxis })
			}) })
	);
};
var DISPLAY_PLOT_TYPE = {
	BOX: 1, SCATTER: 2, BOTH: 3
};

var _Chart = function _Chart(_ref18) {
	var rows = _ref18.rows,
	    columnHeaders = _ref18.columnHeaders,
	    toDisplay = _ref18.toDisplay,
	    onChangeToDisplay = _ref18.onChangeToDisplay,
	    useLogarithmicAxis = _ref18.useLogarithmicAxis,
	    onChangeUseLogarithmicAxis = _ref18.onChangeUseLogarithmicAxis,
	    pointShape = _ref18.pointShape,
	    onChangePointShape = _ref18.onChangePointShape;
	return _react2.default.createElement(
		'div',
		null,
		_react2.default.createElement('br', null),
		_react2.default.createElement(
			'div',
			{ key: 'chart' },
			rows.length && _react2.default.createElement(_reactHighcharts2.default, { config: plotConfig({
					pointShape: pointShape,
					useLogarithmicAxis: useLogarithmicAxis,
					xAxisCategories: columnHeaders.map(function (_ref19) {
						var id = _ref19.id;
						return id;
					}),
					dataSeries: [].concat(toDisplay == DISPLAY_PLOT_TYPE.SCATTER ? [] : boxPlotDataSeries({ rows: rows })).concat(toDisplay == DISPLAY_PLOT_TYPE.BOX ? [] : scatterDataSeries({ rows: rows, useLogarithmicAxis: useLogarithmicAxis }))
				}) })
		)
	);
};

var Chart = (0, _uncontrollable2.default)(_Chart, { toDisplay: 'onChangeToDisplay', useLogarithmicAxis: 'onChangeUseLogarithmicAxis', pointShape: "onChangePointShape" });

Chart.defaultProps = {
	defaultToDisplay: DISPLAY_PLOT_TYPE.BOTH,
	defaultUseLogarithmicAxis: true,
	defaultPointShape: "circle"
};

var _ChartWithSwitcher = function _ChartWithSwitcher(_ref20) {
	var columnHeaders = _ref20.columnHeaders,
	    rows = _ref20.rows,
	    currentRows = _ref20.currentRows,
	    defaultCurrentRows = _ref20.defaultCurrentRows,
	    onChangeCurrentRows = _ref20.onChangeCurrentRows;
	return _react2.default.createElement(
		'div',
		null,
		_react2.default.createElement(
			'h3',
			null,
			'Show data for transcripts:'
		),
		_react2.default.createElement(SelectTranscripts, {
			rowNames: rows.map(function (row) {
				return row.id;
			}),
			currentRowNames: currentRows.map(function (row) {
				return row.id;
			}),
			onChangeCurrentRowNames: function onChangeCurrentRowNames(rowNames) {
				return onChangeCurrentRows(rows.filter(function (row) {
					return rowNames.includes(row.id);
				}));
			}
		}),
		_react2.default.createElement(Chart, { rows: currentRows, columnHeaders: columnHeaders })
	);
};

var ChartWithSwitcher = (0, _uncontrollable2.default)(_ChartWithSwitcher, { currentRows: "onChangeCurrentRows" });

var Main = function Main(_ref21) {
	var columnHeaders = _ref21.columnHeaders,
	    rows = _ref21.profiles.rows;
	return _react2.default.createElement(
		'div',
		null,
		_react2.default.createElement(ChartWithSwitcher, { columnHeaders: columnHeaders, rows: rows, defaultCurrentRows: rows })
	);
};

exports.default = Main;

/***/ }),
/* 374 */,
/* 375 */
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory(__webpack_require__(10), __webpack_require__(376));
	else if(typeof define === 'function' && define.amd)
		define(["react", "highcharts"], factory);
	else if(typeof exports === 'object')
		exports["ReactHighcharts"] = factory(require("react"), require("highcharts"));
	else
		root["ReactHighcharts"] = factory(root["React"], root["Highcharts"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_17__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 18);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (process.env.NODE_ENV !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var emptyFunction = __webpack_require__(2);

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if (process.env.NODE_ENV !== 'production') {
  (function () {
    var printWarning = function printWarning(format) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var argIndex = 0;
      var message = 'Warning: ' + format.replace(/%s/g, function () {
        return args[argIndex++];
      });
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // --- Welcome to debugging React ---
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch (x) {}
    };

    warning = function warning(condition, format) {
      if (format === undefined) {
        throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
      }

      if (format.indexOf('Failed Composite propType: ') === 0) {
        return; // Ignore CompositeComponent proptype check.
      }

      if (!condition) {
        for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
          args[_key2 - 2] = arguments[_key2];
        }

        printWarning.apply(undefined, [format].concat(args));
      }
    };
  })();
}

module.exports = warning;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var _assign = __webpack_require__(9);

var emptyObject = __webpack_require__(8);
var _invariant = __webpack_require__(1);

if (process.env.NODE_ENV !== 'production') {
  var warning = __webpack_require__(3);
}

var MIXINS_KEY = 'mixins';

// Helper function to allow the creation of anonymous functions which do not
// have .name set to the name of the variable being assigned to.
function identity(fn) {
  return fn;
}

var ReactPropTypeLocationNames;
if (process.env.NODE_ENV !== 'production') {
  ReactPropTypeLocationNames = {
    prop: 'prop',
    context: 'context',
    childContext: 'child context',
  };
} else {
  ReactPropTypeLocationNames = {};
}

function factory(ReactComponent, isValidElement, ReactNoopUpdateQueue) {
  /**
   * Policies that describe methods in `ReactClassInterface`.
   */


  var injectedMixins = [];

  /**
   * Composite components are higher-level components that compose other composite
   * or host components.
   *
   * To create a new type of `ReactClass`, pass a specification of
   * your new class to `React.createClass`. The only requirement of your class
   * specification is that you implement a `render` method.
   *
   *   var MyComponent = React.createClass({
   *     render: function() {
   *       return <div>Hello World</div>;
   *     }
   *   });
   *
   * The class specification supports a specific protocol of methods that have
   * special meaning (e.g. `render`). See `ReactClassInterface` for
   * more the comprehensive protocol. Any other properties and methods in the
   * class specification will be available on the prototype.
   *
   * @interface ReactClassInterface
   * @internal
   */
  var ReactClassInterface = {

    /**
     * An array of Mixin objects to include when defining your component.
     *
     * @type {array}
     * @optional
     */
    mixins: 'DEFINE_MANY',

    /**
     * An object containing properties and methods that should be defined on
     * the component's constructor instead of its prototype (static methods).
     *
     * @type {object}
     * @optional
     */
    statics: 'DEFINE_MANY',

    /**
     * Definition of prop types for this component.
     *
     * @type {object}
     * @optional
     */
    propTypes: 'DEFINE_MANY',

    /**
     * Definition of context types for this component.
     *
     * @type {object}
     * @optional
     */
    contextTypes: 'DEFINE_MANY',

    /**
     * Definition of context types this component sets for its children.
     *
     * @type {object}
     * @optional
     */
    childContextTypes: 'DEFINE_MANY',

    // ==== Definition methods ====

    /**
     * Invoked when the component is mounted. Values in the mapping will be set on
     * `this.props` if that prop is not specified (i.e. using an `in` check).
     *
     * This method is invoked before `getInitialState` and therefore cannot rely
     * on `this.state` or use `this.setState`.
     *
     * @return {object}
     * @optional
     */
    getDefaultProps: 'DEFINE_MANY_MERGED',

    /**
     * Invoked once before the component is mounted. The return value will be used
     * as the initial value of `this.state`.
     *
     *   getInitialState: function() {
     *     return {
     *       isOn: false,
     *       fooBaz: new BazFoo()
     *     }
     *   }
     *
     * @return {object}
     * @optional
     */
    getInitialState: 'DEFINE_MANY_MERGED',

    /**
     * @return {object}
     * @optional
     */
    getChildContext: 'DEFINE_MANY_MERGED',

    /**
     * Uses props from `this.props` and state from `this.state` to render the
     * structure of the component.
     *
     * No guarantees are made about when or how often this method is invoked, so
     * it must not have side effects.
     *
     *   render: function() {
     *     var name = this.props.name;
     *     return <div>Hello, {name}!</div>;
     *   }
     *
     * @return {ReactComponent}
     * @nosideeffects
     * @required
     */
    render: 'DEFINE_ONCE',

    // ==== Delegate methods ====

    /**
     * Invoked when the component is initially created and about to be mounted.
     * This may have side effects, but any external subscriptions or data created
     * by this method must be cleaned up in `componentWillUnmount`.
     *
     * @optional
     */
    componentWillMount: 'DEFINE_MANY',

    /**
     * Invoked when the component has been mounted and has a DOM representation.
     * However, there is no guarantee that the DOM node is in the document.
     *
     * Use this as an opportunity to operate on the DOM when the component has
     * been mounted (initialized and rendered) for the first time.
     *
     * @param {DOMElement} rootNode DOM element representing the component.
     * @optional
     */
    componentDidMount: 'DEFINE_MANY',

    /**
     * Invoked before the component receives new props.
     *
     * Use this as an opportunity to react to a prop transition by updating the
     * state using `this.setState`. Current props are accessed via `this.props`.
     *
     *   componentWillReceiveProps: function(nextProps, nextContext) {
     *     this.setState({
     *       likesIncreasing: nextProps.likeCount > this.props.likeCount
     *     });
     *   }
     *
     * NOTE: There is no equivalent `componentWillReceiveState`. An incoming prop
     * transition may cause a state change, but the opposite is not true. If you
     * need it, you are probably looking for `componentWillUpdate`.
     *
     * @param {object} nextProps
     * @optional
     */
    componentWillReceiveProps: 'DEFINE_MANY',

    /**
     * Invoked while deciding if the component should be updated as a result of
     * receiving new props, state and/or context.
     *
     * Use this as an opportunity to `return false` when you're certain that the
     * transition to the new props/state/context will not require a component
     * update.
     *
     *   shouldComponentUpdate: function(nextProps, nextState, nextContext) {
     *     return !equal(nextProps, this.props) ||
     *       !equal(nextState, this.state) ||
     *       !equal(nextContext, this.context);
     *   }
     *
     * @param {object} nextProps
     * @param {?object} nextState
     * @param {?object} nextContext
     * @return {boolean} True if the component should update.
     * @optional
     */
    shouldComponentUpdate: 'DEFINE_ONCE',

    /**
     * Invoked when the component is about to update due to a transition from
     * `this.props`, `this.state` and `this.context` to `nextProps`, `nextState`
     * and `nextContext`.
     *
     * Use this as an opportunity to perform preparation before an update occurs.
     *
     * NOTE: You **cannot** use `this.setState()` in this method.
     *
     * @param {object} nextProps
     * @param {?object} nextState
     * @param {?object} nextContext
     * @param {ReactReconcileTransaction} transaction
     * @optional
     */
    componentWillUpdate: 'DEFINE_MANY',

    /**
     * Invoked when the component's DOM representation has been updated.
     *
     * Use this as an opportunity to operate on the DOM when the component has
     * been updated.
     *
     * @param {object} prevProps
     * @param {?object} prevState
     * @param {?object} prevContext
     * @param {DOMElement} rootNode DOM element representing the component.
     * @optional
     */
    componentDidUpdate: 'DEFINE_MANY',

    /**
     * Invoked when the component is about to be removed from its parent and have
     * its DOM representation destroyed.
     *
     * Use this as an opportunity to deallocate any external resources.
     *
     * NOTE: There is no `componentDidUnmount` since your component will have been
     * destroyed by that point.
     *
     * @optional
     */
    componentWillUnmount: 'DEFINE_MANY',

    // ==== Advanced methods ====

    /**
     * Updates the component's currently mounted DOM representation.
     *
     * By default, this implements React's rendering and reconciliation algorithm.
     * Sophisticated clients may wish to override this.
     *
     * @param {ReactReconcileTransaction} transaction
     * @internal
     * @overridable
     */
    updateComponent: 'OVERRIDE_BASE'

  };

  /**
   * Mapping from class specification keys to special processing functions.
   *
   * Although these are declared like instance properties in the specification
   * when defining classes using `React.createClass`, they are actually static
   * and are accessible on the constructor instead of the prototype. Despite
   * being static, they must be defined outside of the "statics" key under
   * which all other static methods are defined.
   */
  var RESERVED_SPEC_KEYS = {
    displayName: function (Constructor, displayName) {
      Constructor.displayName = displayName;
    },
    mixins: function (Constructor, mixins) {
      if (mixins) {
        for (var i = 0; i < mixins.length; i++) {
          mixSpecIntoComponent(Constructor, mixins[i]);
        }
      }
    },
    childContextTypes: function (Constructor, childContextTypes) {
      if (process.env.NODE_ENV !== 'production') {
        validateTypeDef(Constructor, childContextTypes, 'childContext');
      }
      Constructor.childContextTypes = _assign({}, Constructor.childContextTypes, childContextTypes);
    },
    contextTypes: function (Constructor, contextTypes) {
      if (process.env.NODE_ENV !== 'production') {
        validateTypeDef(Constructor, contextTypes, 'context');
      }
      Constructor.contextTypes = _assign({}, Constructor.contextTypes, contextTypes);
    },
    /**
     * Special case getDefaultProps which should move into statics but requires
     * automatic merging.
     */
    getDefaultProps: function (Constructor, getDefaultProps) {
      if (Constructor.getDefaultProps) {
        Constructor.getDefaultProps = createMergedResultFunction(Constructor.getDefaultProps, getDefaultProps);
      } else {
        Constructor.getDefaultProps = getDefaultProps;
      }
    },
    propTypes: function (Constructor, propTypes) {
      if (process.env.NODE_ENV !== 'production') {
        validateTypeDef(Constructor, propTypes, 'prop');
      }
      Constructor.propTypes = _assign({}, Constructor.propTypes, propTypes);
    },
    statics: function (Constructor, statics) {
      mixStaticSpecIntoComponent(Constructor, statics);
    },
    autobind: function () {} };

  function validateTypeDef(Constructor, typeDef, location) {
    for (var propName in typeDef) {
      if (typeDef.hasOwnProperty(propName)) {
        // use a warning instead of an _invariant so components
        // don't show up in prod but only in __DEV__
        process.env.NODE_ENV !== 'production' ? warning(typeof typeDef[propName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'React.PropTypes.', Constructor.displayName || 'ReactClass', ReactPropTypeLocationNames[location], propName) : void 0;
      }
    }
  }

  function validateMethodOverride(isAlreadyDefined, name) {
    var specPolicy = ReactClassInterface.hasOwnProperty(name) ? ReactClassInterface[name] : null;

    // Disallow overriding of base class methods unless explicitly allowed.
    if (ReactClassMixin.hasOwnProperty(name)) {
      _invariant(specPolicy === 'OVERRIDE_BASE', 'ReactClassInterface: You are attempting to override ' + '`%s` from your class specification. Ensure that your method names ' + 'do not overlap with React methods.', name);
    }

    // Disallow defining methods more than once unless explicitly allowed.
    if (isAlreadyDefined) {
      _invariant(specPolicy === 'DEFINE_MANY' || specPolicy === 'DEFINE_MANY_MERGED', 'ReactClassInterface: You are attempting to define ' + '`%s` on your component more than once. This conflict may be due ' + 'to a mixin.', name);
    }
  }

  /**
   * Mixin helper which handles policy validation and reserved
   * specification keys when building React classes.
   */
  function mixSpecIntoComponent(Constructor, spec) {
    if (!spec) {
      if (process.env.NODE_ENV !== 'production') {
        var typeofSpec = typeof spec;
        var isMixinValid = typeofSpec === 'object' && spec !== null;

        process.env.NODE_ENV !== 'production' ? warning(isMixinValid, '%s: You\'re attempting to include a mixin that is either null ' + 'or not an object. Check the mixins included by the component, ' + 'as well as any mixins they include themselves. ' + 'Expected object but got %s.', Constructor.displayName || 'ReactClass', spec === null ? null : typeofSpec) : void 0;
      }

      return;
    }

    _invariant(typeof spec !== 'function', 'ReactClass: You\'re attempting to ' + 'use a component class or function as a mixin. Instead, just use a ' + 'regular object.');
    _invariant(!isValidElement(spec), 'ReactClass: You\'re attempting to ' + 'use a component as a mixin. Instead, just use a regular object.');

    var proto = Constructor.prototype;
    var autoBindPairs = proto.__reactAutoBindPairs;

    // By handling mixins before any other properties, we ensure the same
    // chaining order is applied to methods with DEFINE_MANY policy, whether
    // mixins are listed before or after these methods in the spec.
    if (spec.hasOwnProperty(MIXINS_KEY)) {
      RESERVED_SPEC_KEYS.mixins(Constructor, spec.mixins);
    }

    for (var name in spec) {
      if (!spec.hasOwnProperty(name)) {
        continue;
      }

      if (name === MIXINS_KEY) {
        // We have already handled mixins in a special case above.
        continue;
      }

      var property = spec[name];
      var isAlreadyDefined = proto.hasOwnProperty(name);
      validateMethodOverride(isAlreadyDefined, name);

      if (RESERVED_SPEC_KEYS.hasOwnProperty(name)) {
        RESERVED_SPEC_KEYS[name](Constructor, property);
      } else {
        // Setup methods on prototype:
        // The following member methods should not be automatically bound:
        // 1. Expected ReactClass methods (in the "interface").
        // 2. Overridden methods (that were mixed in).
        var isReactClassMethod = ReactClassInterface.hasOwnProperty(name);
        var isFunction = typeof property === 'function';
        var shouldAutoBind = isFunction && !isReactClassMethod && !isAlreadyDefined && spec.autobind !== false;

        if (shouldAutoBind) {
          autoBindPairs.push(name, property);
          proto[name] = property;
        } else {
          if (isAlreadyDefined) {
            var specPolicy = ReactClassInterface[name];

            // These cases should already be caught by validateMethodOverride.
            _invariant(isReactClassMethod && (specPolicy === 'DEFINE_MANY_MERGED' || specPolicy === 'DEFINE_MANY'), 'ReactClass: Unexpected spec policy %s for key %s ' + 'when mixing in component specs.', specPolicy, name);

            // For methods which are defined more than once, call the existing
            // methods before calling the new property, merging if appropriate.
            if (specPolicy === 'DEFINE_MANY_MERGED') {
              proto[name] = createMergedResultFunction(proto[name], property);
            } else if (specPolicy === 'DEFINE_MANY') {
              proto[name] = createChainedFunction(proto[name], property);
            }
          } else {
            proto[name] = property;
            if (process.env.NODE_ENV !== 'production') {
              // Add verbose displayName to the function, which helps when looking
              // at profiling tools.
              if (typeof property === 'function' && spec.displayName) {
                proto[name].displayName = spec.displayName + '_' + name;
              }
            }
          }
        }
      }
    }
  }

  function mixStaticSpecIntoComponent(Constructor, statics) {
    if (!statics) {
      return;
    }
    for (var name in statics) {
      var property = statics[name];
      if (!statics.hasOwnProperty(name)) {
        continue;
      }

      var isReserved = name in RESERVED_SPEC_KEYS;
      _invariant(!isReserved, 'ReactClass: You are attempting to define a reserved ' + 'property, `%s`, that shouldn\'t be on the "statics" key. Define it ' + 'as an instance property instead; it will still be accessible on the ' + 'constructor.', name);

      var isInherited = name in Constructor;
      _invariant(!isInherited, 'ReactClass: You are attempting to define ' + '`%s` on your component more than once. This conflict may be ' + 'due to a mixin.', name);
      Constructor[name] = property;
    }
  }

  /**
   * Merge two objects, but throw if both contain the same key.
   *
   * @param {object} one The first object, which is mutated.
   * @param {object} two The second object
   * @return {object} one after it has been mutated to contain everything in two.
   */
  function mergeIntoWithNoDuplicateKeys(one, two) {
    _invariant(one && two && typeof one === 'object' && typeof two === 'object', 'mergeIntoWithNoDuplicateKeys(): Cannot merge non-objects.');

    for (var key in two) {
      if (two.hasOwnProperty(key)) {
        _invariant(one[key] === undefined, 'mergeIntoWithNoDuplicateKeys(): ' + 'Tried to merge two objects with the same key: `%s`. This conflict ' + 'may be due to a mixin; in particular, this may be caused by two ' + 'getInitialState() or getDefaultProps() methods returning objects ' + 'with clashing keys.', key);
        one[key] = two[key];
      }
    }
    return one;
  }

  /**
   * Creates a function that invokes two functions and merges their return values.
   *
   * @param {function} one Function to invoke first.
   * @param {function} two Function to invoke second.
   * @return {function} Function that invokes the two argument functions.
   * @private
   */
  function createMergedResultFunction(one, two) {
    return function mergedResult() {
      var a = one.apply(this, arguments);
      var b = two.apply(this, arguments);
      if (a == null) {
        return b;
      } else if (b == null) {
        return a;
      }
      var c = {};
      mergeIntoWithNoDuplicateKeys(c, a);
      mergeIntoWithNoDuplicateKeys(c, b);
      return c;
    };
  }

  /**
   * Creates a function that invokes two functions and ignores their return vales.
   *
   * @param {function} one Function to invoke first.
   * @param {function} two Function to invoke second.
   * @return {function} Function that invokes the two argument functions.
   * @private
   */
  function createChainedFunction(one, two) {
    return function chainedFunction() {
      one.apply(this, arguments);
      two.apply(this, arguments);
    };
  }

  /**
   * Binds a method to the component.
   *
   * @param {object} component Component whose method is going to be bound.
   * @param {function} method Method to be bound.
   * @return {function} The bound method.
   */
  function bindAutoBindMethod(component, method) {
    var boundMethod = method.bind(component);
    if (process.env.NODE_ENV !== 'production') {
      boundMethod.__reactBoundContext = component;
      boundMethod.__reactBoundMethod = method;
      boundMethod.__reactBoundArguments = null;
      var componentName = component.constructor.displayName;
      var _bind = boundMethod.bind;
      boundMethod.bind = function (newThis) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        // User is trying to bind() an autobound method; we effectively will
        // ignore the value of "this" that the user is trying to use, so
        // let's warn.
        if (newThis !== component && newThis !== null) {
          process.env.NODE_ENV !== 'production' ? warning(false, 'bind(): React component methods may only be bound to the ' + 'component instance. See %s', componentName) : void 0;
        } else if (!args.length) {
          process.env.NODE_ENV !== 'production' ? warning(false, 'bind(): You are binding a component method to the component. ' + 'React does this for you automatically in a high-performance ' + 'way, so you can safely remove this call. See %s', componentName) : void 0;
          return boundMethod;
        }
        var reboundMethod = _bind.apply(boundMethod, arguments);
        reboundMethod.__reactBoundContext = component;
        reboundMethod.__reactBoundMethod = method;
        reboundMethod.__reactBoundArguments = args;
        return reboundMethod;
      };
    }
    return boundMethod;
  }

  /**
   * Binds all auto-bound methods in a component.
   *
   * @param {object} component Component whose method is going to be bound.
   */
  function bindAutoBindMethods(component) {
    var pairs = component.__reactAutoBindPairs;
    for (var i = 0; i < pairs.length; i += 2) {
      var autoBindKey = pairs[i];
      var method = pairs[i + 1];
      component[autoBindKey] = bindAutoBindMethod(component, method);
    }
  }

  var IsMountedMixin = {
    componentDidMount: function () {
      this.__isMounted = true;
    },
    componentWillUnmount: function () {
      this.__isMounted = false;
    }
  };

  /**
   * Add more to the ReactClass base class. These are all legacy features and
   * therefore not already part of the modern ReactComponent.
   */
  var ReactClassMixin = {

    /**
     * TODO: This will be deprecated because state should always keep a consistent
     * type signature and the only use case for this, is to avoid that.
     */
    replaceState: function (newState, callback) {
      this.updater.enqueueReplaceState(this, newState, callback);
    },

    /**
     * Checks whether or not this composite component is mounted.
     * @return {boolean} True if mounted, false otherwise.
     * @protected
     * @final
     */
    isMounted: function () {
      if (process.env.NODE_ENV !== 'production') {
        process.env.NODE_ENV !== 'production' ? warning(this.__didWarnIsMounted, '%s: isMounted is deprecated. Instead, make sure to clean up ' + 'subscriptions and pending requests in componentWillUnmount to ' + 'prevent memory leaks.', this.constructor && this.constructor.displayName || this.name || 'Component') : void 0;
        this.__didWarnIsMounted = true;
      }
      return !!this.__isMounted;
    }
  };

  var ReactClassComponent = function () {};
  _assign(ReactClassComponent.prototype, ReactComponent.prototype, ReactClassMixin);

  /**
   * Creates a composite component class given a class specification.
   * See https://facebook.github.io/react/docs/top-level-api.html#react.createclass
   *
   * @param {object} spec Class specification (which must define `render`).
   * @return {function} Component constructor function.
   * @public
   */
  function createClass(spec) {
    // To keep our warnings more understandable, we'll use a little hack here to
    // ensure that Constructor.name !== 'Constructor'. This makes sure we don't
    // unnecessarily identify a class without displayName as 'Constructor'.
    var Constructor = identity(function (props, context, updater) {
      // This constructor gets overridden by mocks. The argument is used
      // by mocks to assert on what gets mounted.

      if (process.env.NODE_ENV !== 'production') {
        process.env.NODE_ENV !== 'production' ? warning(this instanceof Constructor, 'Something is calling a React component directly. Use a factory or ' + 'JSX instead. See: https://fb.me/react-legacyfactory') : void 0;
      }

      // Wire up auto-binding
      if (this.__reactAutoBindPairs.length) {
        bindAutoBindMethods(this);
      }

      this.props = props;
      this.context = context;
      this.refs = emptyObject;
      this.updater = updater || ReactNoopUpdateQueue;

      this.state = null;

      // ReactClasses doesn't have constructors. Instead, they use the
      // getInitialState and componentWillMount methods for initialization.

      var initialState = this.getInitialState ? this.getInitialState() : null;
      if (process.env.NODE_ENV !== 'production') {
        // We allow auto-mocks to proceed as if they're returning null.
        if (initialState === undefined && this.getInitialState._isMockFunction) {
          // This is probably bad practice. Consider warning here and
          // deprecating this convenience.
          initialState = null;
        }
      }
      _invariant(typeof initialState === 'object' && !Array.isArray(initialState), '%s.getInitialState(): must return an object or null', Constructor.displayName || 'ReactCompositeComponent');

      this.state = initialState;
    });
    Constructor.prototype = new ReactClassComponent();
    Constructor.prototype.constructor = Constructor;
    Constructor.prototype.__reactAutoBindPairs = [];

    injectedMixins.forEach(mixSpecIntoComponent.bind(null, Constructor));

    mixSpecIntoComponent(Constructor, IsMountedMixin);
    mixSpecIntoComponent(Constructor, spec);

    // Initialize the defaultProps property after all mixins have been merged.
    if (Constructor.getDefaultProps) {
      Constructor.defaultProps = Constructor.getDefaultProps();
    }

    if (process.env.NODE_ENV !== 'production') {
      // This is a tag to indicate that the use of these method names is ok,
      // since it's used with createClass. If it's not, then it's likely a
      // mistake so we'll warn you to use the static property, property
      // initializer or constructor respectively.
      if (Constructor.getDefaultProps) {
        Constructor.getDefaultProps.isReactClassApproved = {};
      }
      if (Constructor.prototype.getInitialState) {
        Constructor.prototype.getInitialState.isReactClassApproved = {};
      }
    }

    _invariant(Constructor.prototype.render, 'createClass(...): Class specification must implement a `render` method.');

    if (process.env.NODE_ENV !== 'production') {
      process.env.NODE_ENV !== 'production' ? warning(!Constructor.prototype.componentShouldUpdate, '%s has a method called ' + 'componentShouldUpdate(). Did you mean shouldComponentUpdate()? ' + 'The name is phrased as a question because the function is ' + 'expected to return a value.', spec.displayName || 'A component') : void 0;
      process.env.NODE_ENV !== 'production' ? warning(!Constructor.prototype.componentWillRecieveProps, '%s has a method called ' + 'componentWillRecieveProps(). Did you mean componentWillReceiveProps()?', spec.displayName || 'A component') : void 0;
    }

    // Reduce time spent doing lookups by setting these on the prototype.
    for (var methodName in ReactClassInterface) {
      if (!Constructor.prototype[methodName]) {
        Constructor.prototype[methodName] = null;
      }
    }

    return Constructor;
  }

  return createClass;
}

module.exports = factory;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var React = __webpack_require__(4);
var factory = __webpack_require__(6);

// Hack to grab NoopUpdateQueue from isomorphic React
var ReactNoopUpdateQueue = new React.Component().updater;

module.exports = factory(
  React.Component,
  React.isValidElement,
  ReactNoopUpdateQueue
);


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var emptyObject = {};

if (process.env.NODE_ENV !== 'production') {
  Object.freeze(emptyObject);
}

module.exports = emptyObject;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = __webpack_require__(4);
var createReactClass = __webpack_require__(7);
var PropTypes = __webpack_require__(14);
var win = typeof global === 'undefined' ? window : global;

module.exports = function (chartType, Highcharts) {
  var displayName = 'Highcharts' + chartType;
  var result = createReactClass({
    displayName: displayName,

    propTypes: {
      config: PropTypes.object,
      isPureConfig: PropTypes.bool,
      neverReflow: PropTypes.bool,
      callback: PropTypes.func,
      domProps: PropTypes.object
    },

    defaultProps: {
      callback: function callback() {},
      domProps: {}
    },

    renderChart: function renderChart(config) {
      var _this = this;

      if (!config) {
        throw new Error('Config must be specified for the ' + displayName + ' component');
      }
      var chartConfig = config.chart;
      this.chart = new Highcharts[chartType](_extends({}, config, {
        chart: _extends({}, chartConfig, {
          renderTo: this.refs.chart
        })
      }), this.props.callback);

      if (!this.props.neverReflow) {
        win && win.requestAnimationFrame && requestAnimationFrame(function () {
          _this.chart && _this.chart.options && _this.chart.reflow();
        });
      }
    },

    shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
      if (nextProps.neverReflow || nextProps.isPureConfig && this.props.config === nextProps.config) {
        return true;
      }
      this.renderChart(nextProps.config);
      return false;
    },


    getChart: function getChart() {
      if (!this.chart) {
        throw new Error('getChart() should not be called before the component is mounted');
      }
      return this.chart;
    },

    componentDidMount: function componentDidMount() {
      this.renderChart(this.props.config);
    },

    componentWillUnmount: function componentWillUnmount() {
      this.chart.destroy();
    },


    render: function render() {
      return React.createElement('div', _extends({ ref: 'chart' }, this.props.domProps));
    }
  });

  result.Highcharts = Highcharts;
  result.withHighcharts = function (Highcharts) {
    return module.exports(chartType, Highcharts);
  };
  return result;
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15)))

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



if (process.env.NODE_ENV !== 'production') {
  var invariant = __webpack_require__(1);
  var warning = __webpack_require__(3);
  var ReactPropTypesSecret = __webpack_require__(5);
  var loggedTypeFailures = {};
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'React.PropTypes.', componentName || 'React class', location, typeSpecName);
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
        }
      }
    }
  }
}

module.exports = checkPropTypes;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var emptyFunction = __webpack_require__(2);
var invariant = __webpack_require__(1);

module.exports = function() {
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  function shim() {
    invariant(
      false,
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var emptyFunction = __webpack_require__(2);
var invariant = __webpack_require__(1);
var warning = __webpack_require__(3);

var ReactPropTypesSecret = __webpack_require__(5);
var checkPropTypes = __webpack_require__(11);

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (process.env.NODE_ENV !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          invariant(
            false,
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            warning(
              false,
              'You are manually calling a React.PropTypes validation ' +
              'function for the `%s` prop on `%s`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
              propFullName,
              componentName
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunction.thatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues);
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

if (process.env.NODE_ENV !== 'production') {
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(13)(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(12)();
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 15 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(10)('Chart', __webpack_require__(17));

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_17__;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(16);


/***/ })
/******/ ]);
});

/***/ }),
/* 376 */
/***/ (function(module, exports) {

/*
 Highcharts JS v5.0.14 (2017-07-28)

 (c) 2009-2016 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(M,S){"object"===typeof module&&module.exports?module.exports=M.document?S(M):S:M.Highcharts=S(M)})("undefined"!==typeof window?window:this,function(M){M=function(){var a=window,C=a.document,A=a.navigator&&a.navigator.userAgent||"",F=C&&C.createElementNS&&!!C.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect,E=/(edge|msie|trident)/i.test(A)&&!window.opera,m=!F,f=/Firefox/.test(A),l=f&&4>parseInt(A.split("Firefox/")[1],10);return a.Highcharts?a.Highcharts.error(16,!0):{product:"Highcharts",
version:"5.0.14",deg2rad:2*Math.PI/360,doc:C,hasBidiBug:l,hasTouch:C&&void 0!==C.documentElement.ontouchstart,isMS:E,isWebKit:/AppleWebKit/.test(A),isFirefox:f,isTouchDevice:/(Mobile|Android|Windows Phone)/.test(A),SVG_NS:"http://www.w3.org/2000/svg",chartCount:0,seriesTypes:{},symbolSizes:{},svg:F,vml:m,win:a,marginNames:["plotTop","marginRight","marginBottom","plotLeft"],noop:function(){},charts:[]}}();(function(a){var C=[],A=a.charts,F=a.doc,E=a.win;a.error=function(m,f){m=a.isNumber(m)?"Highcharts error #"+
m+": www.highcharts.com/errors/"+m:m;if(f)throw Error(m);E.console&&console.log(m)};a.Fx=function(a,f,l){this.options=f;this.elem=a;this.prop=l};a.Fx.prototype={dSetter:function(){var a=this.paths[0],f=this.paths[1],l=[],r=this.now,u=a.length,t;if(1===r)l=this.toD;else if(u===f.length&&1>r)for(;u--;)t=parseFloat(a[u]),l[u]=isNaN(t)?a[u]:r*parseFloat(f[u]-t)+t;else l=f;this.elem.attr("d",l,null,!0)},update:function(){var a=this.elem,f=this.prop,l=this.now,r=this.options.step;if(this[f+"Setter"])this[f+
"Setter"]();else a.attr?a.element&&a.attr(f,l,null,!0):a.style[f]=l+this.unit;r&&r.call(a,l,this)},run:function(a,f,l){var r=this,m=function(a){return m.stopped?!1:r.step(a)},t;this.startTime=+new Date;this.start=a;this.end=f;this.unit=l;this.now=this.start;this.pos=0;m.elem=this.elem;m.prop=this.prop;m()&&1===C.push(m)&&(m.timerId=setInterval(function(){for(t=0;t<C.length;t++)C[t]()||C.splice(t--,1);C.length||clearInterval(m.timerId)},13))},step:function(m){var f=+new Date,l,r=this.options,u=this.elem,
t=r.complete,g=r.duration,d=r.curAnim;u.attr&&!u.element?m=!1:m||f>=g+this.startTime?(this.now=this.end,this.pos=1,this.update(),l=d[this.prop]=!0,a.objectEach(d,function(a){!0!==a&&(l=!1)}),l&&t&&t.call(u),m=!1):(this.pos=r.easing((f-this.startTime)/g),this.now=this.start+(this.end-this.start)*this.pos,this.update(),m=!0);return m},initPath:function(m,f,l){function r(a){var c,e;for(n=a.length;n--;)c="M"===a[n]||"L"===a[n],e=/[a-zA-Z]/.test(a[n+3]),c&&e&&a.splice(n+1,0,a[n+1],a[n+2],a[n+1],a[n+2])}
function u(a,c){for(;a.length<v;){a[0]=c[v-a.length];var b=a.slice(0,e);[].splice.apply(a,[0,0].concat(b));D&&(b=a.slice(a.length-e),[].splice.apply(a,[a.length,0].concat(b)),n--)}a[0]="M"}function t(a,c){for(var q=(v-a.length)/e;0<q&&q--;)y=a.slice().splice(a.length/J-e,e*J),y[0]=c[v-e-q*e],b&&(y[e-6]=y[e-2],y[e-5]=y[e-1]),[].splice.apply(a,[a.length/J,0].concat(y)),D&&q--}f=f||"";var g,d=m.startX,k=m.endX,b=-1<f.indexOf("C"),e=b?7:3,v,y,n;f=f.split(" ");l=l.slice();var D=m.isArea,J=D?2:1,c;b&&(r(f),
r(l));if(d&&k){for(n=0;n<d.length;n++)if(d[n]===k[0]){g=n;break}else if(d[0]===k[k.length-d.length+n]){g=n;c=!0;break}void 0===g&&(f=[])}f.length&&a.isNumber(g)&&(v=l.length+g*J*e,c?(u(f,l),t(l,f)):(u(l,f),t(f,l)));return[f,l]}};a.Fx.prototype.fillSetter=a.Fx.prototype.strokeSetter=function(){this.elem.attr(this.prop,a.color(this.start).tweenTo(a.color(this.end),this.pos),null,!0)};a.extend=function(a,f){var m;a||(a={});for(m in f)a[m]=f[m];return a};a.merge=function(){var m,f=arguments,l,r={},u=
function(f,g){"object"!==typeof f&&(f={});a.objectEach(g,function(d,k){!a.isObject(d,!0)||a.isClass(d)||a.isDOMElement(d)?f[k]=g[k]:f[k]=u(f[k]||{},d)});return f};!0===f[0]&&(r=f[1],f=Array.prototype.slice.call(f,2));l=f.length;for(m=0;m<l;m++)r=u(r,f[m]);return r};a.pInt=function(a,f){return parseInt(a,f||10)};a.isString=function(a){return"string"===typeof a};a.isArray=function(a){a=Object.prototype.toString.call(a);return"[object Array]"===a||"[object Array Iterator]"===a};a.isObject=function(m,
f){return!!m&&"object"===typeof m&&(!f||!a.isArray(m))};a.isDOMElement=function(m){return a.isObject(m)&&"number"===typeof m.nodeType};a.isClass=function(m){var f=m&&m.constructor;return!(!a.isObject(m,!0)||a.isDOMElement(m)||!f||!f.name||"Object"===f.name)};a.isNumber=function(a){return"number"===typeof a&&!isNaN(a)};a.erase=function(a,f){for(var m=a.length;m--;)if(a[m]===f){a.splice(m,1);break}};a.defined=function(a){return void 0!==a&&null!==a};a.attr=function(m,f,l){var r;a.isString(f)?a.defined(l)?
m.setAttribute(f,l):m&&m.getAttribute&&(r=m.getAttribute(f)):a.defined(f)&&a.isObject(f)&&a.objectEach(f,function(a,f){m.setAttribute(f,a)});return r};a.splat=function(m){return a.isArray(m)?m:[m]};a.syncTimeout=function(a,f,l){if(f)return setTimeout(a,f,l);a.call(0,l)};a.pick=function(){var a=arguments,f,l,r=a.length;for(f=0;f<r;f++)if(l=a[f],void 0!==l&&null!==l)return l};a.css=function(m,f){a.isMS&&!a.svg&&f&&void 0!==f.opacity&&(f.filter="alpha(opacity\x3d"+100*f.opacity+")");a.extend(m.style,
f)};a.createElement=function(m,f,l,r,u){m=F.createElement(m);var t=a.css;f&&a.extend(m,f);u&&t(m,{padding:0,border:"none",margin:0});l&&t(m,l);r&&r.appendChild(m);return m};a.extendClass=function(m,f){var l=function(){};l.prototype=new m;a.extend(l.prototype,f);return l};a.pad=function(a,f,l){return Array((f||2)+1-String(a).length).join(l||0)+a};a.relativeLength=function(a,f,l){return/%$/.test(a)?f*parseFloat(a)/100+(l||0):parseFloat(a)};a.wrap=function(a,f,l){var r=a[f];a[f]=function(){var a=Array.prototype.slice.call(arguments),
f=arguments,g=this;g.proceed=function(){r.apply(g,arguments.length?arguments:f)};a.unshift(r);a=l.apply(this,a);g.proceed=null;return a}};a.getTZOffset=function(m){var f=a.Date;return 6E4*(f.hcGetTimezoneOffset&&f.hcGetTimezoneOffset(m)||f.hcTimezoneOffset||0)};a.dateFormat=function(m,f,l){if(!a.defined(f)||isNaN(f))return a.defaultOptions.lang.invalidDate||"";m=a.pick(m,"%Y-%m-%d %H:%M:%S");var r=a.Date,u=new r(f-a.getTZOffset(f)),t=u[r.hcGetHours](),g=u[r.hcGetDay](),d=u[r.hcGetDate](),k=u[r.hcGetMonth](),
b=u[r.hcGetFullYear](),e=a.defaultOptions.lang,v=e.weekdays,y=e.shortWeekdays,n=a.pad,r=a.extend({a:y?y[g]:v[g].substr(0,3),A:v[g],d:n(d),e:n(d,2," "),w:g,b:e.shortMonths[k],B:e.months[k],m:n(k+1),y:b.toString().substr(2,2),Y:b,H:n(t),k:t,I:n(t%12||12),l:t%12||12,M:n(u[r.hcGetMinutes]()),p:12>t?"AM":"PM",P:12>t?"am":"pm",S:n(u.getSeconds()),L:n(Math.round(f%1E3),3)},a.dateFormats);a.objectEach(r,function(a,e){for(;-1!==m.indexOf("%"+e);)m=m.replace("%"+e,"function"===typeof a?a(f):a)});return l?m.substr(0,
1).toUpperCase()+m.substr(1):m};a.formatSingle=function(m,f){var l=/\.([0-9])/,r=a.defaultOptions.lang;/f$/.test(m)?(l=(l=m.match(l))?l[1]:-1,null!==f&&(f=a.numberFormat(f,l,r.decimalPoint,-1<m.indexOf(",")?r.thousandsSep:""))):f=a.dateFormat(m,f);return f};a.format=function(m,f){for(var l="{",r=!1,u,t,g,d,k=[],b;m;){l=m.indexOf(l);if(-1===l)break;u=m.slice(0,l);if(r){u=u.split(":");t=u.shift().split(".");d=t.length;b=f;for(g=0;g<d;g++)b=b[t[g]];u.length&&(b=a.formatSingle(u.join(":"),b));k.push(b)}else k.push(u);
m=m.slice(l+1);l=(r=!r)?"}":"{"}k.push(m);return k.join("")};a.getMagnitude=function(a){return Math.pow(10,Math.floor(Math.log(a)/Math.LN10))};a.normalizeTickInterval=function(m,f,l,r,u){var t,g=m;l=a.pick(l,1);t=m/l;f||(f=u?[1,1.2,1.5,2,2.5,3,4,5,6,8,10]:[1,2,2.5,5,10],!1===r&&(1===l?f=a.grep(f,function(a){return 0===a%1}):.1>=l&&(f=[1/l])));for(r=0;r<f.length&&!(g=f[r],u&&g*l>=m||!u&&t<=(f[r]+(f[r+1]||f[r]))/2);r++);return g=a.correctFloat(g*l,-Math.round(Math.log(.001)/Math.LN10))};a.stableSort=
function(a,f){var l=a.length,r,m;for(m=0;m<l;m++)a[m].safeI=m;a.sort(function(a,g){r=f(a,g);return 0===r?a.safeI-g.safeI:r});for(m=0;m<l;m++)delete a[m].safeI};a.arrayMin=function(a){for(var f=a.length,l=a[0];f--;)a[f]<l&&(l=a[f]);return l};a.arrayMax=function(a){for(var f=a.length,l=a[0];f--;)a[f]>l&&(l=a[f]);return l};a.destroyObjectProperties=function(m,f){a.objectEach(m,function(a,r){a&&a!==f&&a.destroy&&a.destroy();delete m[r]})};a.discardElement=function(m){var f=a.garbageBin;f||(f=a.createElement("div"));
m&&f.appendChild(m);f.innerHTML=""};a.correctFloat=function(a,f){return parseFloat(a.toPrecision(f||14))};a.setAnimation=function(m,f){f.renderer.globalAnimation=a.pick(m,f.options.chart.animation,!0)};a.animObject=function(m){return a.isObject(m)?a.merge(m):{duration:m?500:0}};a.timeUnits={millisecond:1,second:1E3,minute:6E4,hour:36E5,day:864E5,week:6048E5,month:24192E5,year:314496E5};a.numberFormat=function(m,f,l,r){m=+m||0;f=+f;var u=a.defaultOptions.lang,t=(m.toString().split(".")[1]||"").split("e")[0].length,
g,d,k=m.toString().split("e");-1===f?f=Math.min(t,20):a.isNumber(f)||(f=2);d=(Math.abs(k[1]?k[0]:m)+Math.pow(10,-Math.max(f,t)-1)).toFixed(f);t=String(a.pInt(d));g=3<t.length?t.length%3:0;l=a.pick(l,u.decimalPoint);r=a.pick(r,u.thousandsSep);m=(0>m?"-":"")+(g?t.substr(0,g)+r:"");m+=t.substr(g).replace(/(\d{3})(?=\d)/g,"$1"+r);f&&(m+=l+d.slice(-f));k[1]&&(m+="e"+k[1]);return m};Math.easeInOutSine=function(a){return-.5*(Math.cos(Math.PI*a)-1)};a.getStyle=function(m,f,l){if("width"===f)return Math.min(m.offsetWidth,
m.scrollWidth)-a.getStyle(m,"padding-left")-a.getStyle(m,"padding-right");if("height"===f)return Math.min(m.offsetHeight,m.scrollHeight)-a.getStyle(m,"padding-top")-a.getStyle(m,"padding-bottom");if(m=E.getComputedStyle(m,void 0))m=m.getPropertyValue(f),a.pick(l,!0)&&(m=a.pInt(m));return m};a.inArray=function(a,f){return f.indexOf?f.indexOf(a):[].indexOf.call(f,a)};a.grep=function(a,f){return[].filter.call(a,f)};a.find=function(a,f){return[].find.call(a,f)};a.map=function(a,f){for(var l=[],r=0,m=
a.length;r<m;r++)l[r]=f.call(a[r],a[r],r,a);return l};a.offset=function(a){var f=F.documentElement;a=a.getBoundingClientRect();return{top:a.top+(E.pageYOffset||f.scrollTop)-(f.clientTop||0),left:a.left+(E.pageXOffset||f.scrollLeft)-(f.clientLeft||0)}};a.stop=function(a,f){for(var l=C.length;l--;)C[l].elem!==a||f&&f!==C[l].prop||(C[l].stopped=!0)};a.each=function(a,f,l){return Array.prototype.forEach.call(a,f,l)};a.objectEach=function(a,f,l){for(var r in a)a.hasOwnProperty(r)&&f.call(l,a[r],r,a)};
a.addEvent=function(m,f,l){function r(a){a.target=a.srcElement||E;l.call(m,a)}var u=m.hcEvents=m.hcEvents||{};m.addEventListener?m.addEventListener(f,l,!1):m.attachEvent&&(m.hcEventsIE||(m.hcEventsIE={}),l.hcGetKey||(l.hcGetKey=a.uniqueKey()),m.hcEventsIE[l.hcGetKey]=r,m.attachEvent("on"+f,r));u[f]||(u[f]=[]);u[f].push(l);return function(){a.removeEvent(m,f,l)}};a.removeEvent=function(m,f,l){function r(a,b){m.removeEventListener?m.removeEventListener(a,b,!1):m.attachEvent&&(b=m.hcEventsIE[b.hcGetKey],
m.detachEvent("on"+a,b))}function u(){var d,b;m.nodeName&&(f?(d={},d[f]=!0):d=g,a.objectEach(d,function(a,d){if(g[d])for(b=g[d].length;b--;)r(d,g[d][b])}))}var t,g=m.hcEvents,d;g&&(f?(t=g[f]||[],l?(d=a.inArray(l,t),-1<d&&(t.splice(d,1),g[f]=t),r(f,l)):(u(),g[f]=[])):(u(),m.hcEvents={}))};a.fireEvent=function(m,f,l,r){var u;u=m.hcEvents;var t,g;l=l||{};if(F.createEvent&&(m.dispatchEvent||m.fireEvent))u=F.createEvent("Events"),u.initEvent(f,!0,!0),a.extend(u,l),m.dispatchEvent?m.dispatchEvent(u):m.fireEvent(f,
u);else if(u)for(u=u[f]||[],t=u.length,l.target||a.extend(l,{preventDefault:function(){l.defaultPrevented=!0},target:m,type:f}),f=0;f<t;f++)(g=u[f])&&!1===g.call(m,l)&&l.preventDefault();r&&!l.defaultPrevented&&r(l)};a.animate=function(m,f,l){var r,u="",t,g,d;a.isObject(l)||(d=arguments,l={duration:d[2],easing:d[3],complete:d[4]});a.isNumber(l.duration)||(l.duration=400);l.easing="function"===typeof l.easing?l.easing:Math[l.easing]||Math.easeInOutSine;l.curAnim=a.merge(f);a.objectEach(f,function(d,
b){a.stop(m,b);g=new a.Fx(m,l,b);t=null;"d"===b?(g.paths=g.initPath(m,m.d,f.d),g.toD=f.d,r=0,t=1):m.attr?r=m.attr(b):(r=parseFloat(a.getStyle(m,b))||0,"opacity"!==b&&(u="px"));t||(t=d);t&&t.match&&t.match("px")&&(t=t.replace(/px/g,""));g.run(r,t,u)})};a.seriesType=function(m,f,l,r,u){var t=a.getOptions(),g=a.seriesTypes;t.plotOptions[m]=a.merge(t.plotOptions[f],l);g[m]=a.extendClass(g[f]||function(){},r);g[m].prototype.type=m;u&&(g[m].prototype.pointClass=a.extendClass(a.Point,u));return g[m]};a.uniqueKey=
function(){var a=Math.random().toString(36).substring(2,9),f=0;return function(){return"highcharts-"+a+"-"+f++}}();E.jQuery&&(E.jQuery.fn.highcharts=function(){var m=[].slice.call(arguments);if(this[0])return m[0]?(new (a[a.isString(m[0])?m.shift():"Chart"])(this[0],m[0],m[1]),this):A[a.attr(this[0],"data-highcharts-chart")]});F&&!F.defaultView&&(a.getStyle=function(m,f){var l={width:"clientWidth",height:"clientHeight"}[f];if(m.style[f])return a.pInt(m.style[f]);"opacity"===f&&(f="filter");if(l)return m.style.zoom=
1,Math.max(m[l]-2*a.getStyle(m,"padding"),0);m=m.currentStyle[f.replace(/\-(\w)/g,function(a,f){return f.toUpperCase()})];"filter"===f&&(m=m.replace(/alpha\(opacity=([0-9]+)\)/,function(a,f){return f/100}));return""===m?1:a.pInt(m)});Array.prototype.forEach||(a.each=function(a,f,l){for(var r=0,m=a.length;r<m;r++)if(!1===f.call(l,a[r],r,a))return r});Array.prototype.indexOf||(a.inArray=function(a,f){var l,r=0;if(f)for(l=f.length;r<l;r++)if(f[r]===a)return r;return-1});Array.prototype.filter||(a.grep=
function(a,f){for(var l=[],r=0,m=a.length;r<m;r++)f(a[r],r)&&l.push(a[r]);return l});Array.prototype.find||(a.find=function(a,f){var l,r=a.length;for(l=0;l<r;l++)if(f(a[l],l))return a[l]})})(M);(function(a){var C=a.each,A=a.isNumber,F=a.map,E=a.merge,m=a.pInt;a.Color=function(f){if(!(this instanceof a.Color))return new a.Color(f);this.init(f)};a.Color.prototype={parsers:[{regex:/rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,parse:function(a){return[m(a[1]),
m(a[2]),m(a[3]),parseFloat(a[4],10)]}},{regex:/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,parse:function(a){return[m(a[1]),m(a[2]),m(a[3]),1]}}],names:{none:"rgba(255,255,255,0)",white:"#ffffff",black:"#000000"},init:function(f){var l,r,m,t;if((this.input=f=this.names[f&&f.toLowerCase?f.toLowerCase():""]||f)&&f.stops)this.stops=F(f.stops,function(g){return new a.Color(g[1])});else if(f&&"#"===f.charAt()&&(l=f.length,f=parseInt(f.substr(1),16),7===l?r=[(f&16711680)>>16,(f&65280)>>
8,f&255,1]:4===l&&(r=[(f&3840)>>4|(f&3840)>>8,(f&240)>>4|f&240,(f&15)<<4|f&15,1])),!r)for(m=this.parsers.length;m--&&!r;)t=this.parsers[m],(l=t.regex.exec(f))&&(r=t.parse(l));this.rgba=r||[]},get:function(a){var f=this.input,r=this.rgba,m;this.stops?(m=E(f),m.stops=[].concat(m.stops),C(this.stops,function(f,g){m.stops[g]=[m.stops[g][0],f.get(a)]})):m=r&&A(r[0])?"rgb"===a||!a&&1===r[3]?"rgb("+r[0]+","+r[1]+","+r[2]+")":"a"===a?r[3]:"rgba("+r.join(",")+")":f;return m},brighten:function(a){var f,r=this.rgba;
if(this.stops)C(this.stops,function(f){f.brighten(a)});else if(A(a)&&0!==a)for(f=0;3>f;f++)r[f]+=m(255*a),0>r[f]&&(r[f]=0),255<r[f]&&(r[f]=255);return this},setOpacity:function(a){this.rgba[3]=a;return this},tweenTo:function(a,l){var f,m;a.rgba.length?(f=this.rgba,a=a.rgba,m=1!==a[3]||1!==f[3],a=(m?"rgba(":"rgb(")+Math.round(a[0]+(f[0]-a[0])*(1-l))+","+Math.round(a[1]+(f[1]-a[1])*(1-l))+","+Math.round(a[2]+(f[2]-a[2])*(1-l))+(m?","+(a[3]+(f[3]-a[3])*(1-l)):"")+")"):a=a.input||"none";return a}};a.color=
function(f){return new a.Color(f)}})(M);(function(a){var C,A,F=a.addEvent,E=a.animate,m=a.attr,f=a.charts,l=a.color,r=a.css,u=a.createElement,t=a.defined,g=a.deg2rad,d=a.destroyObjectProperties,k=a.doc,b=a.each,e=a.extend,v=a.erase,y=a.grep,n=a.hasTouch,D=a.inArray,J=a.isArray,c=a.isFirefox,G=a.isMS,q=a.isObject,B=a.isString,K=a.isWebKit,p=a.merge,z=a.noop,I=a.objectEach,L=a.pick,h=a.pInt,w=a.removeEvent,P=a.stop,H=a.svg,O=a.SVG_NS,Q=a.symbolSizes,R=a.win;C=a.SVGElement=function(){return this};e(C.prototype,
{opacity:1,SVG_NS:O,textProps:"direction fontSize fontWeight fontFamily fontStyle color lineHeight width textAlign textDecoration textOverflow textOutline".split(" "),init:function(a,h){this.element="span"===h?u(h):k.createElementNS(this.SVG_NS,h);this.renderer=a},animate:function(x,h,c){h=a.animObject(L(h,this.renderer.globalAnimation,!0));0!==h.duration?(c&&(h.complete=c),E(this,x,h)):(this.attr(x,null,c),h.step&&h.step.call(this));return this},colorGradient:function(x,h,c){var w=this.renderer,
e,q,N,d,n,g,k,H,G,v,z=[],f;x.radialGradient?q="radialGradient":x.linearGradient&&(q="linearGradient");q&&(N=x[q],n=w.gradients,k=x.stops,v=c.radialReference,J(N)&&(x[q]=N={x1:N[0],y1:N[1],x2:N[2],y2:N[3],gradientUnits:"userSpaceOnUse"}),"radialGradient"===q&&v&&!t(N.gradientUnits)&&(d=N,N=p(N,w.getRadialAttr(v,d),{gradientUnits:"userSpaceOnUse"})),I(N,function(a,x){"id"!==x&&z.push(x,a)}),I(k,function(a){z.push(a)}),z=z.join(","),n[z]?v=n[z].attr("id"):(N.id=v=a.uniqueKey(),n[z]=g=w.createElement(q).attr(N).add(w.defs),
g.radAttr=d,g.stops=[],b(k,function(x){0===x[1].indexOf("rgba")?(e=a.color(x[1]),H=e.get("rgb"),G=e.get("a")):(H=x[1],G=1);x=w.createElement("stop").attr({offset:x[0],"stop-color":H,"stop-opacity":G}).add(g);g.stops.push(x)})),f="url("+w.url+"#"+v+")",c.setAttribute(h,f),c.gradient=z,x.toString=function(){return f})},applyTextOutline:function(x){var h=this.element,c,w,p,e,q;-1!==x.indexOf("contrast")&&(x=x.replace(/contrast/g,this.renderer.getContrast(h.style.fill)));x=x.split(" ");w=x[x.length-1];
if((p=x[0])&&"none"!==p&&a.svg){this.fakeTS=!0;x=[].slice.call(h.getElementsByTagName("tspan"));this.ySetter=this.xSetter;p=p.replace(/(^[\d\.]+)(.*?)$/g,function(a,x,h){return 2*x+h});for(q=x.length;q--;)c=x[q],"highcharts-text-outline"===c.getAttribute("class")&&v(x,h.removeChild(c));e=h.firstChild;b(x,function(a,x){0===x&&(a.setAttribute("x",h.getAttribute("x")),x=h.getAttribute("y"),a.setAttribute("y",x||0),null===x&&h.setAttribute("y",0));a=a.cloneNode(1);m(a,{"class":"highcharts-text-outline",
fill:w,stroke:w,"stroke-width":p,"stroke-linejoin":"round"});h.insertBefore(a,e)})}},attr:function(a,h,c,w){var x,p=this.element,e,q=this,b,N;"string"===typeof a&&void 0!==h&&(x=a,a={},a[x]=h);"string"===typeof a?q=(this[a+"Getter"]||this._defaultGetter).call(this,a,p):(I(a,function(x,h){b=!1;w||P(this,h);this.symbolName&&/^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)$/.test(h)&&(e||(this.symbolAttr(a),e=!0),b=!0);!this.rotation||"x"!==h&&"y"!==h||(this.doTransform=!0);b||(N=this[h+"Setter"]||
this._defaultSetter,N.call(this,x,h,p),this.shadows&&/^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(h)&&this.updateShadows(h,x,N))},this),this.afterSetters());c&&c();return q},afterSetters:function(){this.doTransform&&(this.updateTransform(),this.doTransform=!1)},updateShadows:function(a,h,c){for(var x=this.shadows,w=x.length;w--;)c.call(x[w],"height"===a?Math.max(h-(x[w].cutHeight||0),0):"d"===a?this.d:h,a,x[w])},addClass:function(a,h){var x=this.attr("class")||"";-1===x.indexOf(a)&&
(h||(a=(x+(x?" ":"")+a).replace("  "," ")),this.attr("class",a));return this},hasClass:function(a){return-1!==D(a,(this.attr("class")||"").split(" "))},removeClass:function(a){return this.attr("class",(this.attr("class")||"").replace(a,""))},symbolAttr:function(a){var x=this;b("x y r start end width height innerR anchorX anchorY".split(" "),function(h){x[h]=L(a[h],x[h])});x.attr({d:x.renderer.symbols[x.symbolName](x.x,x.y,x.width,x.height,x)})},clip:function(a){return this.attr("clip-path",a?"url("+
this.renderer.url+"#"+a.id+")":"none")},crisp:function(a,h){var x=this,c={},w;h=h||a.strokeWidth||0;w=Math.round(h)%2/2;a.x=Math.floor(a.x||x.x||0)+w;a.y=Math.floor(a.y||x.y||0)+w;a.width=Math.floor((a.width||x.width||0)-2*w);a.height=Math.floor((a.height||x.height||0)-2*w);t(a.strokeWidth)&&(a.strokeWidth=h);I(a,function(a,h){x[h]!==a&&(x[h]=c[h]=a)});return c},css:function(a){var x=this.styles,c={},w=this.element,p,q="",b,d=!x,n=["textOutline","textOverflow","width"];a&&a.color&&(a.fill=a.color);
x&&I(a,function(a,h){a!==x[h]&&(c[h]=a,d=!0)});d&&(x&&(a=e(x,c)),p=this.textWidth=a&&a.width&&"auto"!==a.width&&"text"===w.nodeName.toLowerCase()&&h(a.width),this.styles=a,p&&!H&&this.renderer.forExport&&delete a.width,G&&!H?r(this.element,a):(b=function(a,x){return"-"+x.toLowerCase()},I(a,function(a,x){-1===D(x,n)&&(q+=x.replace(/([A-Z])/g,b)+":"+a+";")}),q&&m(w,"style",q)),this.added&&("text"===this.element.nodeName&&this.renderer.buildText(this),a&&a.textOutline&&this.applyTextOutline(a.textOutline)));
return this},strokeWidth:function(){return this["stroke-width"]||0},on:function(a,h){var x=this,c=x.element;n&&"click"===a?(c.ontouchstart=function(a){x.touchEventFired=Date.now();a.preventDefault();h.call(c,a)},c.onclick=function(a){(-1===R.navigator.userAgent.indexOf("Android")||1100<Date.now()-(x.touchEventFired||0))&&h.call(c,a)}):c["on"+a]=h;return this},setRadialReference:function(a){var x=this.renderer.gradients[this.element.gradient];this.element.radialReference=a;x&&x.radAttr&&x.animate(this.renderer.getRadialAttr(a,
x.radAttr));return this},translate:function(a,h){return this.attr({translateX:a,translateY:h})},invert:function(a){this.inverted=a;this.updateTransform();return this},updateTransform:function(){var a=this.translateX||0,h=this.translateY||0,c=this.scaleX,w=this.scaleY,p=this.inverted,e=this.rotation,q=this.element;p&&(a+=this.width,h+=this.height);a=["translate("+a+","+h+")"];p?a.push("rotate(90) scale(-1,1)"):e&&a.push("rotate("+e+" "+(q.getAttribute("x")||0)+" "+(q.getAttribute("y")||0)+")");(t(c)||
t(w))&&a.push("scale("+L(c,1)+" "+L(w,1)+")");a.length&&q.setAttribute("transform",a.join(" "))},toFront:function(){var a=this.element;a.parentNode.appendChild(a);return this},align:function(a,h,c){var x,w,p,e,q={};w=this.renderer;p=w.alignedObjects;var b,d;if(a){if(this.alignOptions=a,this.alignByTranslate=h,!c||B(c))this.alignTo=x=c||"renderer",v(p,this),p.push(this),c=null}else a=this.alignOptions,h=this.alignByTranslate,x=this.alignTo;c=L(c,w[x],w);x=a.align;w=a.verticalAlign;p=(c.x||0)+(a.x||
0);e=(c.y||0)+(a.y||0);"right"===x?b=1:"center"===x&&(b=2);b&&(p+=(c.width-(a.width||0))/b);q[h?"translateX":"x"]=Math.round(p);"bottom"===w?d=1:"middle"===w&&(d=2);d&&(e+=(c.height-(a.height||0))/d);q[h?"translateY":"y"]=Math.round(e);this[this.placed?"animate":"attr"](q);this.placed=!0;this.alignAttr=q;return this},getBBox:function(a,h){var x,c=this.renderer,w,p=this.element,q=this.styles,d,n=this.textStr,k,N=c.cache,H=c.cacheKeys,G;h=L(h,this.rotation);w=h*g;d=q&&q.fontSize;void 0!==n&&(G=n.toString(),
-1===G.indexOf("\x3c")&&(G=G.replace(/[0-9]/g,"0")),G+=["",h||0,d,q&&q.width,q&&q.textOverflow].join());G&&!a&&(x=N[G]);if(!x){if(p.namespaceURI===this.SVG_NS||c.forExport){try{(k=this.fakeTS&&function(a){b(p.querySelectorAll(".highcharts-text-outline"),function(x){x.style.display=a})})&&k("none"),x=p.getBBox?e({},p.getBBox()):{width:p.offsetWidth,height:p.offsetHeight},k&&k("")}catch(W){}if(!x||0>x.width)x={width:0,height:0}}else x=this.htmlGetBBox();c.isSVG&&(a=x.width,c=x.height,q&&"11px"===q.fontSize&&
17===Math.round(c)&&(x.height=c=14),h&&(x.width=Math.abs(c*Math.sin(w))+Math.abs(a*Math.cos(w)),x.height=Math.abs(c*Math.cos(w))+Math.abs(a*Math.sin(w))));if(G&&0<x.height){for(;250<H.length;)delete N[H.shift()];N[G]||H.push(G);N[G]=x}}return x},show:function(a){return this.attr({visibility:a?"inherit":"visible"})},hide:function(){return this.attr({visibility:"hidden"})},fadeOut:function(a){var x=this;x.animate({opacity:0},{duration:a||150,complete:function(){x.attr({y:-9999})}})},add:function(a){var x=
this.renderer,h=this.element,c;a&&(this.parentGroup=a);this.parentInverted=a&&a.inverted;void 0!==this.textStr&&x.buildText(this);this.added=!0;if(!a||a.handleZ||this.zIndex)c=this.zIndexSetter();c||(a?a.element:x.box).appendChild(h);if(this.onAdd)this.onAdd();return this},safeRemoveChild:function(a){var x=a.parentNode;x&&x.removeChild(a)},destroy:function(){var a=this,h=a.element||{},c=a.renderer.isSVG&&"SPAN"===h.nodeName&&a.parentGroup,w=h.ownerSVGElement;h.onclick=h.onmouseout=h.onmouseover=h.onmousemove=
h.point=null;P(a);a.clipPath&&w&&(b(w.querySelectorAll("[clip-path]"),function(x){-1<x.getAttribute("clip-path").indexOf(a.clipPath.element.id+")")&&x.removeAttribute("clip-path")}),a.clipPath=a.clipPath.destroy());if(a.stops){for(w=0;w<a.stops.length;w++)a.stops[w]=a.stops[w].destroy();a.stops=null}a.safeRemoveChild(h);for(a.destroyShadows();c&&c.div&&0===c.div.childNodes.length;)h=c.parentGroup,a.safeRemoveChild(c.div),delete c.div,c=h;a.alignTo&&v(a.renderer.alignedObjects,a);I(a,function(x,h){delete a[h]});
return null},shadow:function(a,h,c){var x=[],w,p,q=this.element,e,b,d,n;if(!a)this.destroyShadows();else if(!this.shadows){b=L(a.width,3);d=(a.opacity||.15)/b;n=this.parentInverted?"(-1,-1)":"("+L(a.offsetX,1)+", "+L(a.offsetY,1)+")";for(w=1;w<=b;w++)p=q.cloneNode(0),e=2*b+1-2*w,m(p,{isShadow:"true",stroke:a.color||"#000000","stroke-opacity":d*w,"stroke-width":e,transform:"translate"+n,fill:"none"}),c&&(m(p,"height",Math.max(m(p,"height")-e,0)),p.cutHeight=e),h?h.element.appendChild(p):q.parentNode.insertBefore(p,
q),x.push(p);this.shadows=x}return this},destroyShadows:function(){b(this.shadows||[],function(a){this.safeRemoveChild(a)},this);this.shadows=void 0},xGetter:function(a){"circle"===this.element.nodeName&&("x"===a?a="cx":"y"===a&&(a="cy"));return this._defaultGetter(a)},_defaultGetter:function(a){a=L(this[a],this.element?this.element.getAttribute(a):null,0);/^[\-0-9\.]+$/.test(a)&&(a=parseFloat(a));return a},dSetter:function(a,h,c){a&&a.join&&(a=a.join(" "));/(NaN| {2}|^$)/.test(a)&&(a="M 0 0");this[h]!==
a&&(c.setAttribute(h,a),this[h]=a)},dashstyleSetter:function(a){var x,c=this["stroke-width"];"inherit"===c&&(c=1);if(a=a&&a.toLowerCase()){a=a.replace("shortdashdotdot","3,1,1,1,1,1,").replace("shortdashdot","3,1,1,1").replace("shortdot","1,1,").replace("shortdash","3,1,").replace("longdash","8,3,").replace(/dot/g,"1,3,").replace("dash","4,3,").replace(/,$/,"").split(",");for(x=a.length;x--;)a[x]=h(a[x])*c;a=a.join(",").replace(/NaN/g,"none");this.element.setAttribute("stroke-dasharray",a)}},alignSetter:function(a){this.element.setAttribute("text-anchor",
{left:"start",center:"middle",right:"end"}[a])},opacitySetter:function(a,h,c){this[h]=a;c.setAttribute(h,a)},titleSetter:function(a){var h=this.element.getElementsByTagName("title")[0];h||(h=k.createElementNS(this.SVG_NS,"title"),this.element.appendChild(h));h.firstChild&&h.removeChild(h.firstChild);h.appendChild(k.createTextNode(String(L(a),"").replace(/<[^>]*>/g,"")))},textSetter:function(a){a!==this.textStr&&(delete this.bBox,this.textStr=a,this.added&&this.renderer.buildText(this))},fillSetter:function(a,
h,c){"string"===typeof a?c.setAttribute(h,a):a&&this.colorGradient(a,h,c)},visibilitySetter:function(a,h,c){"inherit"===a?c.removeAttribute(h):this[h]!==a&&c.setAttribute(h,a);this[h]=a},zIndexSetter:function(a,c){var x=this.renderer,w=this.parentGroup,p=(w||x).element||x.box,q,e=this.element,b;q=this.added;var d;t(a)&&(e.zIndex=a,a=+a,this[c]===a&&(q=!1),this[c]=a);if(q){(a=this.zIndex)&&w&&(w.handleZ=!0);c=p.childNodes;for(d=0;d<c.length&&!b;d++)w=c[d],q=w.zIndex,w!==e&&(h(q)>a||!t(a)&&t(q)||0>
a&&!t(q)&&p!==x.box)&&(p.insertBefore(e,w),b=!0);b||p.appendChild(e)}return b},_defaultSetter:function(a,h,c){c.setAttribute(h,a)}});C.prototype.yGetter=C.prototype.xGetter;C.prototype.translateXSetter=C.prototype.translateYSetter=C.prototype.rotationSetter=C.prototype.verticalAlignSetter=C.prototype.scaleXSetter=C.prototype.scaleYSetter=function(a,h){this[h]=a;this.doTransform=!0};C.prototype["stroke-widthSetter"]=C.prototype.strokeSetter=function(a,h,c){this[h]=a;this.stroke&&this["stroke-width"]?
(C.prototype.fillSetter.call(this,this.stroke,"stroke",c),c.setAttribute("stroke-width",this["stroke-width"]),this.hasStroke=!0):"stroke-width"===h&&0===a&&this.hasStroke&&(c.removeAttribute("stroke"),this.hasStroke=!1)};A=a.SVGRenderer=function(){this.init.apply(this,arguments)};e(A.prototype,{Element:C,SVG_NS:O,init:function(a,h,w,p,q,e){var x;p=this.createElement("svg").attr({version:"1.1","class":"highcharts-root"}).css(this.getStyle(p));x=p.element;a.appendChild(x);-1===a.innerHTML.indexOf("xmlns")&&
m(x,"xmlns",this.SVG_NS);this.isSVG=!0;this.box=x;this.boxWrapper=p;this.alignedObjects=[];this.url=(c||K)&&k.getElementsByTagName("base").length?R.location.href.replace(/#.*?$/,"").replace(/<[^>]*>/g,"").replace(/([\('\)])/g,"\\$1").replace(/ /g,"%20"):"";this.createElement("desc").add().element.appendChild(k.createTextNode("Created with Highcharts 5.0.14"));this.defs=this.createElement("defs").add();this.allowHTML=e;this.forExport=q;this.gradients={};this.cache={};this.cacheKeys=[];this.imgCount=
0;this.setSize(h,w,!1);var b;c&&a.getBoundingClientRect&&(h=function(){r(a,{left:0,top:0});b=a.getBoundingClientRect();r(a,{left:Math.ceil(b.left)-b.left+"px",top:Math.ceil(b.top)-b.top+"px"})},h(),this.unSubPixelFix=F(R,"resize",h))},getStyle:function(a){return this.style=e({fontFamily:'"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',fontSize:"12px"},a)},setStyle:function(a){this.boxWrapper.css(this.getStyle(a))},isHidden:function(){return!this.boxWrapper.getBBox().width},destroy:function(){var a=
this.defs;this.box=null;this.boxWrapper=this.boxWrapper.destroy();d(this.gradients||{});this.gradients=null;a&&(this.defs=a.destroy());this.unSubPixelFix&&this.unSubPixelFix();return this.alignedObjects=null},createElement:function(a){var h=new this.Element;h.init(this,a);return h},draw:z,getRadialAttr:function(a,h){return{cx:a[0]-a[2]/2+h.cx*a[2],cy:a[1]-a[2]/2+h.cy*a[2],r:h.r*a[2]}},getSpanWidth:function(a,h){var c=a.getBBox(!0).width;!H&&this.forExport&&(c=this.measureSpanWidth(h.firstChild.data,
a.styles));return c},applyEllipsis:function(a,h,c,w){var x=a.rotation,p=c,q,e=0,b=c.length,d=function(a){h.removeChild(h.firstChild);a&&h.appendChild(k.createTextNode(a))},n;a.rotation=0;p=this.getSpanWidth(a,h);if(n=p>w){for(;e<=b;)q=Math.ceil((e+b)/2),p=c.substring(0,q)+"\u2026",d(p),p=this.getSpanWidth(a,h),e===b?e=b+1:p>w?b=q-1:e=q;0===b&&d("")}a.rotation=x;return n},buildText:function(a){var c=a.element,w=this,x=w.forExport,p=L(a.textStr,"").toString(),q=-1!==p.indexOf("\x3c"),e=c.childNodes,
d,n,g,G,v=m(c,"x"),z=a.styles,f=a.textWidth,I=z&&z.lineHeight,B=z&&z.textOutline,D=z&&"ellipsis"===z.textOverflow,l=z&&"nowrap"===z.whiteSpace,P=z&&z.fontSize,t,J,u=e.length,z=f&&!a.added&&this.box,K=function(a){var x;x=/(px|em)$/.test(a&&a.style.fontSize)?a.style.fontSize:P||w.style.fontSize||12;return I?h(I):w.fontMetrics(x,a.getAttribute("style")?a:c).h};t=[p,D,l,I,B,P,f].join();if(t!==a.textCache){for(a.textCache=t;u--;)c.removeChild(e[u]);q||B||D||f||-1!==p.indexOf(" ")?(d=/<.*class="([^"]+)".*>/,
n=/<.*style="([^"]+)".*>/,g=/<.*href="([^"]+)".*>/,z&&z.appendChild(c),p=q?p.replace(/<(b|strong)>/g,'\x3cspan style\x3d"font-weight:bold"\x3e').replace(/<(i|em)>/g,'\x3cspan style\x3d"font-style:italic"\x3e').replace(/<a/g,"\x3cspan").replace(/<\/(b|strong|i|em|a)>/g,"\x3c/span\x3e").split(/<br.*?>/g):[p],p=y(p,function(a){return""!==a}),b(p,function(h,p){var q,e=0;h=h.replace(/^\s+|\s+$/g,"").replace(/<span/g,"|||\x3cspan").replace(/<\/span>/g,"\x3c/span\x3e|||");q=h.split("|||");b(q,function(h){if(""!==
h||1===q.length){var b={},z=k.createElementNS(w.SVG_NS,"tspan"),y,I;d.test(h)&&(y=h.match(d)[1],m(z,"class",y));n.test(h)&&(I=h.match(n)[1].replace(/(;| |^)color([ :])/,"$1fill$2"),m(z,"style",I));g.test(h)&&!x&&(m(z,"onclick",'location.href\x3d"'+h.match(g)[1]+'"'),r(z,{cursor:"pointer"}));h=(h.replace(/<(.|\n)*?>/g,"")||" ").replace(/&lt;/g,"\x3c").replace(/&gt;/g,"\x3e");if(" "!==h){z.appendChild(k.createTextNode(h));e?b.dx=0:p&&null!==v&&(b.x=v);m(z,b);c.appendChild(z);!e&&J&&(!H&&x&&r(z,{display:"block"}),
m(z,"dy",K(z)));if(f){b=h.replace(/([^\^])-/g,"$1- ").split(" ");y=1<q.length||p||1<b.length&&!l;var B=[],N,P=K(z),t=a.rotation;for(D&&(G=w.applyEllipsis(a,z,h,f));!D&&y&&(b.length||B.length);)a.rotation=0,N=w.getSpanWidth(a,z),h=N>f,void 0===G&&(G=h),h&&1!==b.length?(z.removeChild(z.firstChild),B.unshift(b.pop())):(b=B,B=[],b.length&&!l&&(z=k.createElementNS(O,"tspan"),m(z,{dy:P,x:v}),I&&m(z,"style",I),c.appendChild(z)),N>f&&(f=N)),b.length&&z.appendChild(k.createTextNode(b.join(" ").replace(/- /g,
"-")));a.rotation=t}e++}}});J=J||c.childNodes.length}),G&&a.attr("title",a.textStr),z&&z.removeChild(c),B&&a.applyTextOutline&&a.applyTextOutline(B)):c.appendChild(k.createTextNode(p.replace(/&lt;/g,"\x3c").replace(/&gt;/g,"\x3e")))}},getContrast:function(a){a=l(a).rgba;return 510<a[0]+a[1]+a[2]?"#000000":"#FFFFFF"},button:function(a,h,c,w,q,b,d,n,g){var x=this.label(a,h,c,g,null,null,null,null,"button"),k=0;x.attr(p({padding:8,r:2},q));var z,H,v,f;q=p({fill:"#f7f7f7",stroke:"#cccccc","stroke-width":1,
style:{color:"#333333",cursor:"pointer",fontWeight:"normal"}},q);z=q.style;delete q.style;b=p(q,{fill:"#e6e6e6"},b);H=b.style;delete b.style;d=p(q,{fill:"#e6ebf5",style:{color:"#000000",fontWeight:"bold"}},d);v=d.style;delete d.style;n=p(q,{style:{color:"#cccccc"}},n);f=n.style;delete n.style;F(x.element,G?"mouseover":"mouseenter",function(){3!==k&&x.setState(1)});F(x.element,G?"mouseout":"mouseleave",function(){3!==k&&x.setState(k)});x.setState=function(a){1!==a&&(x.state=k=a);x.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-"+
["normal","hover","pressed","disabled"][a||0]);x.attr([q,b,d,n][a||0]).css([z,H,v,f][a||0])};x.attr(q).css(e({cursor:"default"},z));return x.on("click",function(a){3!==k&&w.call(x,a)})},crispLine:function(a,h){a[1]===a[4]&&(a[1]=a[4]=Math.round(a[1])-h%2/2);a[2]===a[5]&&(a[2]=a[5]=Math.round(a[2])+h%2/2);return a},path:function(a){var h={fill:"none"};J(a)?h.d=a:q(a)&&e(h,a);return this.createElement("path").attr(h)},circle:function(a,h,c){a=q(a)?a:{x:a,y:h,r:c};h=this.createElement("circle");h.xSetter=
h.ySetter=function(a,h,c){c.setAttribute("c"+h,a)};return h.attr(a)},arc:function(a,h,c,w,p,b){q(a)?(w=a,h=w.y,c=w.r,a=w.x):w={innerR:w,start:p,end:b};a=this.symbol("arc",a,h,c,c,w);a.r=c;return a},rect:function(a,h,c,w,p,b){p=q(a)?a.r:p;var x=this.createElement("rect");a=q(a)?a:void 0===a?{}:{x:a,y:h,width:Math.max(c,0),height:Math.max(w,0)};void 0!==b&&(a.strokeWidth=b,a=x.crisp(a));a.fill="none";p&&(a.r=p);x.rSetter=function(a,h,c){m(c,{rx:a,ry:a})};return x.attr(a)},setSize:function(a,h,c){var w=
this.alignedObjects,p=w.length;this.width=a;this.height=h;for(this.boxWrapper.animate({width:a,height:h},{step:function(){this.attr({viewBox:"0 0 "+this.attr("width")+" "+this.attr("height")})},duration:L(c,!0)?void 0:0});p--;)w[p].align()},g:function(a){var h=this.createElement("g");return a?h.attr({"class":"highcharts-"+a}):h},image:function(a,h,c,w,p){var x={preserveAspectRatio:"none"};1<arguments.length&&e(x,{x:h,y:c,width:w,height:p});x=this.createElement("image").attr(x);x.element.setAttributeNS?
x.element.setAttributeNS("http://www.w3.org/1999/xlink","href",a):x.element.setAttribute("hc-svg-href",a);return x},symbol:function(a,h,c,w,p,q){var x=this,d,n=/^url\((.*?)\)$/,g=n.test(a),z=!g&&(this.symbols[a]?a:"circle"),G=z&&this.symbols[z],H=t(h)&&G&&G.call(this.symbols,Math.round(h),Math.round(c),w,p,q),v,y;G?(d=this.path(H),d.attr("fill","none"),e(d,{symbolName:z,x:h,y:c,width:w,height:p}),q&&e(d,q)):g&&(v=a.match(n)[1],d=this.image(v),d.imgwidth=L(Q[v]&&Q[v].width,q&&q.width),d.imgheight=
L(Q[v]&&Q[v].height,q&&q.height),y=function(){d.attr({width:d.width,height:d.height})},b(["width","height"],function(a){d[a+"Setter"]=function(a,h){var c={},w=this["img"+h],p="width"===h?"translateX":"translateY";this[h]=a;t(w)&&(this.element&&this.element.setAttribute(h,w),this.alignByTranslate||(c[p]=((this[h]||0)-w)/2,this.attr(c)))}}),t(h)&&d.attr({x:h,y:c}),d.isImg=!0,t(d.imgwidth)&&t(d.imgheight)?y():(d.attr({width:0,height:0}),u("img",{onload:function(){var a=f[x.chartIndex];0===this.width&&
(r(this,{position:"absolute",top:"-999em"}),k.body.appendChild(this));Q[v]={width:this.width,height:this.height};d.imgwidth=this.width;d.imgheight=this.height;d.element&&y();this.parentNode&&this.parentNode.removeChild(this);x.imgCount--;if(!x.imgCount&&a&&a.onload)a.onload()},src:v}),this.imgCount++));return d},symbols:{circle:function(a,h,c,w){return this.arc(a+c/2,h+w/2,c/2,w/2,{start:0,end:2*Math.PI,open:!1})},square:function(a,h,c,w){return["M",a,h,"L",a+c,h,a+c,h+w,a,h+w,"Z"]},triangle:function(a,
h,c,w){return["M",a+c/2,h,"L",a+c,h+w,a,h+w,"Z"]},"triangle-down":function(a,h,c,w){return["M",a,h,"L",a+c,h,a+c/2,h+w,"Z"]},diamond:function(a,h,c,w){return["M",a+c/2,h,"L",a+c,h+w/2,a+c/2,h+w,a,h+w/2,"Z"]},arc:function(a,h,c,w,p){var q=p.start,b=p.r||c,x=p.r||w||c,e=p.end-.001;c=p.innerR;w=L(p.open,.001>Math.abs(p.end-p.start-2*Math.PI));var d=Math.cos(q),n=Math.sin(q),g=Math.cos(e),e=Math.sin(e);p=.001>p.end-q-Math.PI?0:1;b=["M",a+b*d,h+x*n,"A",b,x,0,p,1,a+b*g,h+x*e];t(c)&&b.push(w?"M":"L",a+c*
g,h+c*e,"A",c,c,0,p,0,a+c*d,h+c*n);b.push(w?"":"Z");return b},callout:function(a,h,c,w,p){var q=Math.min(p&&p.r||0,c,w),b=q+6,e=p&&p.anchorX;p=p&&p.anchorY;var d;d=["M",a+q,h,"L",a+c-q,h,"C",a+c,h,a+c,h,a+c,h+q,"L",a+c,h+w-q,"C",a+c,h+w,a+c,h+w,a+c-q,h+w,"L",a+q,h+w,"C",a,h+w,a,h+w,a,h+w-q,"L",a,h+q,"C",a,h,a,h,a+q,h];e&&e>c?p>h+b&&p<h+w-b?d.splice(13,3,"L",a+c,p-6,a+c+6,p,a+c,p+6,a+c,h+w-q):d.splice(13,3,"L",a+c,w/2,e,p,a+c,w/2,a+c,h+w-q):e&&0>e?p>h+b&&p<h+w-b?d.splice(33,3,"L",a,p+6,a-6,p,a,p-6,
a,h+q):d.splice(33,3,"L",a,w/2,e,p,a,w/2,a,h+q):p&&p>w&&e>a+b&&e<a+c-b?d.splice(23,3,"L",e+6,h+w,e,h+w+6,e-6,h+w,a+q,h+w):p&&0>p&&e>a+b&&e<a+c-b&&d.splice(3,3,"L",e-6,h,e,h-6,e+6,h,c-q,h);return d}},clipRect:function(h,c,w,p){var q=a.uniqueKey(),b=this.createElement("clipPath").attr({id:q}).add(this.defs);h=this.rect(h,c,w,p,0).add(b);h.id=q;h.clipPath=b;h.count=0;return h},text:function(a,h,c,w){var p=!H&&this.forExport,q={};if(w&&(this.allowHTML||!this.forExport))return this.html(a,h,c);q.x=Math.round(h||
0);c&&(q.y=Math.round(c));if(a||0===a)q.text=a;a=this.createElement("text").attr(q);p&&a.css({position:"absolute"});w||(a.xSetter=function(a,h,c){var w=c.getElementsByTagName("tspan"),p,q=c.getAttribute(h),b;for(b=0;b<w.length;b++)p=w[b],p.getAttribute(h)===q&&p.setAttribute(h,a);c.setAttribute(h,a)});return a},fontMetrics:function(a,c){a=a||c&&c.style&&c.style.fontSize||this.style&&this.style.fontSize;a=/px/.test(a)?h(a):/em/.test(a)?parseFloat(a)*(c?this.fontMetrics(null,c.parentNode).f:16):12;
c=24>a?a+3:Math.round(1.2*a);return{h:c,b:Math.round(.8*c),f:a}},rotCorr:function(a,h,c){var w=a;h&&c&&(w=Math.max(w*Math.cos(h*g),4));return{x:-a/3*Math.sin(h*g),y:w}},label:function(h,c,q,d,n,g,k,z,G){var x=this,H=x.g("button"!==G&&"label"),v=H.text=x.text("",0,0,k).attr({zIndex:1}),f,y,I=0,B=3,D=0,r,l,P,m,J,O={},L,u,N=/^url\((.*?)\)$/.test(d),K=N,U,T,Q,R;G&&H.addClass("highcharts-"+G);K=N;U=function(){return(L||0)%2/2};T=function(){var a=v.element.style,h={};y=(void 0===r||void 0===l||J)&&t(v.textStr)&&
v.getBBox();H.width=(r||y.width||0)+2*B+D;H.height=(l||y.height||0)+2*B;u=B+x.fontMetrics(a&&a.fontSize,v).b;K&&(f||(H.box=f=x.symbols[d]||N?x.symbol(d):x.rect(),f.addClass(("button"===G?"":"highcharts-label-box")+(G?" highcharts-"+G+"-box":"")),f.add(H),a=U(),h.x=a,h.y=(z?-u:0)+a),h.width=Math.round(H.width),h.height=Math.round(H.height),f.attr(e(h,O)),O={})};Q=function(){var a=D+B,h;h=z?0:u;t(r)&&y&&("center"===J||"right"===J)&&(a+={center:.5,right:1}[J]*(r-y.width));if(a!==v.x||h!==v.y)v.attr("x",
a),void 0!==h&&v.attr("y",h);v.x=a;v.y=h};R=function(a,h){f?f.attr(a,h):O[a]=h};H.onAdd=function(){v.add(H);H.attr({text:h||0===h?h:"",x:c,y:q});f&&t(n)&&H.attr({anchorX:n,anchorY:g})};H.widthSetter=function(h){r=a.isNumber(h)?h:null};H.heightSetter=function(a){l=a};H["text-alignSetter"]=function(a){J=a};H.paddingSetter=function(a){t(a)&&a!==B&&(B=H.padding=a,Q())};H.paddingLeftSetter=function(a){t(a)&&a!==D&&(D=a,Q())};H.alignSetter=function(a){a={left:0,center:.5,right:1}[a];a!==I&&(I=a,y&&H.attr({x:P}))};
H.textSetter=function(a){void 0!==a&&v.textSetter(a);T();Q()};H["stroke-widthSetter"]=function(a,h){a&&(K=!0);L=this["stroke-width"]=a;R(h,a)};H.strokeSetter=H.fillSetter=H.rSetter=function(a,h){"r"!==h&&("fill"===h&&a&&(K=!0),H[h]=a);R(h,a)};H.anchorXSetter=function(a,h){n=H.anchorX=a;R(h,Math.round(a)-U()-P)};H.anchorYSetter=function(a,h){g=H.anchorY=a;R(h,a-m)};H.xSetter=function(a){H.x=a;I&&(a-=I*((r||y.width)+2*B));P=Math.round(a);H.attr("translateX",P)};H.ySetter=function(a){m=H.y=Math.round(a);
H.attr("translateY",m)};var V=H.css;return e(H,{css:function(a){if(a){var h={};a=p(a);b(H.textProps,function(c){void 0!==a[c]&&(h[c]=a[c],delete a[c])});v.css(h)}return V.call(H,a)},getBBox:function(){return{width:y.width+2*B,height:y.height+2*B,x:y.x-B,y:y.y-B}},shadow:function(a){a&&(T(),f&&f.shadow(a));return H},destroy:function(){w(H.element,"mouseenter");w(H.element,"mouseleave");v&&(v=v.destroy());f&&(f=f.destroy());C.prototype.destroy.call(H);H=x=T=Q=R=null}})}});a.Renderer=A})(M);(function(a){var C=
a.attr,A=a.createElement,F=a.css,E=a.defined,m=a.each,f=a.extend,l=a.isFirefox,r=a.isMS,u=a.isWebKit,t=a.pInt,g=a.SVGRenderer,d=a.win,k=a.wrap;f(a.SVGElement.prototype,{htmlCss:function(a){var b=this.element;if(b=a&&"SPAN"===b.tagName&&a.width)delete a.width,this.textWidth=b,this.updateTransform();a&&"ellipsis"===a.textOverflow&&(a.whiteSpace="nowrap",a.overflow="hidden");this.styles=f(this.styles,a);F(this.element,a);return this},htmlGetBBox:function(){var a=this.element;"text"===a.nodeName&&(a.style.position=
"absolute");return{x:a.offsetLeft,y:a.offsetTop,width:a.offsetWidth,height:a.offsetHeight}},htmlUpdateTransform:function(){if(this.added){var a=this.renderer,e=this.element,d=this.translateX||0,g=this.translateY||0,n=this.x||0,k=this.y||0,f=this.textAlign||"left",c={left:0,center:.5,right:1}[f],G=this.styles;F(e,{marginLeft:d,marginTop:g});this.shadows&&m(this.shadows,function(a){F(a,{marginLeft:d+1,marginTop:g+1})});this.inverted&&m(e.childNodes,function(c){a.invertChild(c,e)});if("SPAN"===e.tagName){var q=
this.rotation,B=t(this.textWidth),r=G&&G.whiteSpace,p=[q,f,e.innerHTML,this.textWidth,this.textAlign].join();p!==this.cTT&&(G=a.fontMetrics(e.style.fontSize).b,E(q)&&this.setSpanRotation(q,c,G),F(e,{width:"",whiteSpace:r||"nowrap"}),e.offsetWidth>B&&/[ \-]/.test(e.textContent||e.innerText)&&F(e,{width:B+"px",display:"block",whiteSpace:r||"normal"}),this.getSpanCorrection(e.offsetWidth,G,c,q,f));F(e,{left:n+(this.xCorr||0)+"px",top:k+(this.yCorr||0)+"px"});u&&(G=e.offsetHeight);this.cTT=p}}else this.alignOnAdd=
!0},setSpanRotation:function(a,e,g){var b={},n=r?"-ms-transform":u?"-webkit-transform":l?"MozTransform":d.opera?"-o-transform":"";b[n]=b.transform="rotate("+a+"deg)";b[n+(l?"Origin":"-origin")]=b.transformOrigin=100*e+"% "+g+"px";F(this.element,b)},getSpanCorrection:function(a,e,d){this.xCorr=-a*d;this.yCorr=-e}});f(g.prototype,{html:function(a,e,d){var b=this.createElement("span"),n=b.element,g=b.renderer,v=g.isSVG,c=function(a,c){m(["opacity","visibility"],function(q){k(a,q+"Setter",function(a,
p,q,b){a.call(this,p,q,b);c[q]=p})})};b.textSetter=function(a){a!==n.innerHTML&&delete this.bBox;n.innerHTML=this.textStr=a;b.htmlUpdateTransform()};v&&c(b,b.element.style);b.xSetter=b.ySetter=b.alignSetter=b.rotationSetter=function(a,c){"align"===c&&(c="textAlign");b[c]=a;b.htmlUpdateTransform()};b.attr({text:a,x:Math.round(e),y:Math.round(d)}).css({fontFamily:this.style.fontFamily,fontSize:this.style.fontSize,position:"absolute"});n.style.whiteSpace="nowrap";b.css=b.htmlCss;v&&(b.add=function(a){var q,
e=g.box.parentNode,d=[];if(this.parentGroup=a){if(q=a.div,!q){for(;a;)d.push(a),a=a.parentGroup;m(d.reverse(),function(a){var p,n=C(a.element,"class");n&&(n={className:n});q=a.div=a.div||A("div",n,{position:"absolute",left:(a.translateX||0)+"px",top:(a.translateY||0)+"px",display:a.display,opacity:a.opacity,pointerEvents:a.styles&&a.styles.pointerEvents},q||e);p=q.style;f(a,{classSetter:function(a){this.element.setAttribute("class",a);q.className=a},on:function(){d[0].div&&b.on.apply({element:d[0].div},
arguments);return a},translateXSetter:function(c,h){p.left=c+"px";a[h]=c;a.doTransform=!0},translateYSetter:function(c,h){p.top=c+"px";a[h]=c;a.doTransform=!0}});c(a,p)})}}else q=e;q.appendChild(n);b.added=!0;b.alignOnAdd&&b.htmlUpdateTransform();return b});return b}})})(M);(function(a){var C,A,F=a.createElement,E=a.css,m=a.defined,f=a.deg2rad,l=a.discardElement,r=a.doc,u=a.each,t=a.erase,g=a.extend;C=a.extendClass;var d=a.isArray,k=a.isNumber,b=a.isObject,e=a.merge;A=a.noop;var v=a.pick,y=a.pInt,
n=a.SVGElement,D=a.SVGRenderer,J=a.win;a.svg||(A={docMode8:r&&8===r.documentMode,init:function(a,b){var c=["\x3c",b,' filled\x3d"f" stroked\x3d"f"'],e=["position: ","absolute",";"],d="div"===b;("shape"===b||d)&&e.push("left:0;top:0;width:1px;height:1px;");e.push("visibility: ",d?"hidden":"visible");c.push(' style\x3d"',e.join(""),'"/\x3e');b&&(c=d||"span"===b||"img"===b?c.join(""):a.prepVML(c),this.element=F(c));this.renderer=a},add:function(a){var c=this.renderer,b=this.element,e=c.box,d=a&&a.inverted,
e=a?a.element||a:e;a&&(this.parentGroup=a);d&&c.invertChild(b,e);e.appendChild(b);this.added=!0;this.alignOnAdd&&!this.deferUpdateTransform&&this.updateTransform();if(this.onAdd)this.onAdd();this.className&&this.attr("class",this.className);return this},updateTransform:n.prototype.htmlUpdateTransform,setSpanRotation:function(){var a=this.rotation,b=Math.cos(a*f),q=Math.sin(a*f);E(this.element,{filter:a?["progid:DXImageTransform.Microsoft.Matrix(M11\x3d",b,", M12\x3d",-q,", M21\x3d",q,", M22\x3d",
b,", sizingMethod\x3d'auto expand')"].join(""):"none"})},getSpanCorrection:function(a,b,q,e,d){var c=e?Math.cos(e*f):1,n=e?Math.sin(e*f):0,g=v(this.elemHeight,this.element.offsetHeight),k;this.xCorr=0>c&&-a;this.yCorr=0>n&&-g;k=0>c*n;this.xCorr+=n*b*(k?1-q:q);this.yCorr-=c*b*(e?k?q:1-q:1);d&&"left"!==d&&(this.xCorr-=a*q*(0>c?-1:1),e&&(this.yCorr-=g*q*(0>n?-1:1)),E(this.element,{textAlign:d}))},pathToVML:function(a){for(var c=a.length,b=[];c--;)k(a[c])?b[c]=Math.round(10*a[c])-5:"Z"===a[c]?b[c]="x":
(b[c]=a[c],!a.isArc||"wa"!==a[c]&&"at"!==a[c]||(b[c+5]===b[c+7]&&(b[c+7]+=a[c+7]>a[c+5]?1:-1),b[c+6]===b[c+8]&&(b[c+8]+=a[c+8]>a[c+6]?1:-1)));return b.join(" ")||"x"},clip:function(a){var c=this,b;a?(b=a.members,t(b,c),b.push(c),c.destroyClip=function(){t(b,c)},a=a.getCSS(c)):(c.destroyClip&&c.destroyClip(),a={clip:c.docMode8?"inherit":"rect(auto)"});return c.css(a)},css:n.prototype.htmlCss,safeRemoveChild:function(a){a.parentNode&&l(a)},destroy:function(){this.destroyClip&&this.destroyClip();return n.prototype.destroy.apply(this)},
on:function(a,b){this.element["on"+a]=function(){var a=J.event;a.target=a.srcElement;b(a)};return this},cutOffPath:function(a,b){var c;a=a.split(/[ ,]/);c=a.length;if(9===c||11===c)a[c-4]=a[c-2]=y(a[c-2])-10*b;return a.join(" ")},shadow:function(a,b,e){var c=[],q,p=this.element,d=this.renderer,n,g=p.style,h,w=p.path,k,H,f,D;w&&"string"!==typeof w.value&&(w="x");H=w;if(a){f=v(a.width,3);D=(a.opacity||.15)/f;for(q=1;3>=q;q++)k=2*f+1-2*q,e&&(H=this.cutOffPath(w.value,k+.5)),h=['\x3cshape isShadow\x3d"true" strokeweight\x3d"',
k,'" filled\x3d"false" path\x3d"',H,'" coordsize\x3d"10 10" style\x3d"',p.style.cssText,'" /\x3e'],n=F(d.prepVML(h),null,{left:y(g.left)+v(a.offsetX,1),top:y(g.top)+v(a.offsetY,1)}),e&&(n.cutOff=k+1),h=['\x3cstroke color\x3d"',a.color||"#000000",'" opacity\x3d"',D*q,'"/\x3e'],F(d.prepVML(h),null,null,n),b?b.element.appendChild(n):p.parentNode.insertBefore(n,p),c.push(n);this.shadows=c}return this},updateShadows:A,setAttr:function(a,b){this.docMode8?this.element[a]=b:this.element.setAttribute(a,b)},
classSetter:function(a){(this.added?this.element:this).className=a},dashstyleSetter:function(a,b,e){(e.getElementsByTagName("stroke")[0]||F(this.renderer.prepVML(["\x3cstroke/\x3e"]),null,null,e))[b]=a||"solid";this[b]=a},dSetter:function(a,b,e){var c=this.shadows;a=a||[];this.d=a.join&&a.join(" ");e.path=a=this.pathToVML(a);if(c)for(e=c.length;e--;)c[e].path=c[e].cutOff?this.cutOffPath(a,c[e].cutOff):a;this.setAttr(b,a)},fillSetter:function(a,b,e){var c=e.nodeName;"SPAN"===c?e.style.color=a:"IMG"!==
c&&(e.filled="none"!==a,this.setAttr("fillcolor",this.renderer.color(a,e,b,this)))},"fill-opacitySetter":function(a,b,e){F(this.renderer.prepVML(["\x3c",b.split("-")[0],' opacity\x3d"',a,'"/\x3e']),null,null,e)},opacitySetter:A,rotationSetter:function(a,b,e){e=e.style;this[b]=e[b]=a;e.left=-Math.round(Math.sin(a*f)+1)+"px";e.top=Math.round(Math.cos(a*f))+"px"},strokeSetter:function(a,b,e){this.setAttr("strokecolor",this.renderer.color(a,e,b,this))},"stroke-widthSetter":function(a,b,e){e.stroked=!!a;
this[b]=a;k(a)&&(a+="px");this.setAttr("strokeweight",a)},titleSetter:function(a,b){this.setAttr(b,a)},visibilitySetter:function(a,b,e){"inherit"===a&&(a="visible");this.shadows&&u(this.shadows,function(c){c.style[b]=a});"DIV"===e.nodeName&&(a="hidden"===a?"-999em":0,this.docMode8||(e.style[b]=a?"visible":"hidden"),b="top");e.style[b]=a},xSetter:function(a,b,e){this[b]=a;"x"===b?b="left":"y"===b&&(b="top");this.updateClipping?(this[b]=a,this.updateClipping()):e.style[b]=a},zIndexSetter:function(a,
b,e){e.style[b]=a}},A["stroke-opacitySetter"]=A["fill-opacitySetter"],a.VMLElement=A=C(n,A),A.prototype.ySetter=A.prototype.widthSetter=A.prototype.heightSetter=A.prototype.xSetter,A={Element:A,isIE8:-1<J.navigator.userAgent.indexOf("MSIE 8.0"),init:function(a,b,e){var c,d;this.alignedObjects=[];c=this.createElement("div").css({position:"relative"});d=c.element;a.appendChild(c.element);this.isVML=!0;this.box=d;this.boxWrapper=c;this.gradients={};this.cache={};this.cacheKeys=[];this.imgCount=0;this.setSize(b,
e,!1);if(!r.namespaces.hcv){r.namespaces.add("hcv","urn:schemas-microsoft-com:vml");try{r.createStyleSheet().cssText="hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "}catch(p){r.styleSheets[0].cssText+="hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "}}},isHidden:function(){return!this.box.offsetWidth},clipRect:function(a,e,d,n){var c=this.createElement(),p=b(a);return g(c,{members:[],
count:0,left:(p?a.x:a)+1,top:(p?a.y:e)+1,width:(p?a.width:d)-1,height:(p?a.height:n)-1,getCSS:function(a){var c=a.element,b=c.nodeName,h=a.inverted,w=this.top-("shape"===b?c.offsetTop:0),p=this.left,c=p+this.width,e=w+this.height,w={clip:"rect("+Math.round(h?p:w)+"px,"+Math.round(h?e:c)+"px,"+Math.round(h?c:e)+"px,"+Math.round(h?w:p)+"px)"};!h&&a.docMode8&&"DIV"===b&&g(w,{width:c+"px",height:e+"px"});return w},updateClipping:function(){u(c.members,function(a){a.element&&a.css(c.getCSS(a))})}})},color:function(c,
b,e,d){var q=this,p,n=/^rgba/,g,k,h="none";c&&c.linearGradient?k="gradient":c&&c.radialGradient&&(k="pattern");if(k){var w,v,H=c.linearGradient||c.radialGradient,f,D,y,x,r,B="";c=c.stops;var l,G=[],m=function(){g=['\x3cfill colors\x3d"'+G.join(",")+'" opacity\x3d"',y,'" o:opacity2\x3d"',D,'" type\x3d"',k,'" ',B,'focus\x3d"100%" method\x3d"any" /\x3e'];F(q.prepVML(g),null,null,b)};f=c[0];l=c[c.length-1];0<f[0]&&c.unshift([0,f[1]]);1>l[0]&&c.push([1,l[1]]);u(c,function(h,c){n.test(h[1])?(p=a.color(h[1]),
w=p.get("rgb"),v=p.get("a")):(w=h[1],v=1);G.push(100*h[0]+"% "+w);c?(y=v,x=w):(D=v,r=w)});if("fill"===e)if("gradient"===k)e=H.x1||H[0]||0,c=H.y1||H[1]||0,f=H.x2||H[2]||0,H=H.y2||H[3]||0,B='angle\x3d"'+(90-180*Math.atan((H-c)/(f-e))/Math.PI)+'"',m();else{var h=H.r,t=2*h,J=2*h,A=H.cx,C=H.cy,E=b.radialReference,M,h=function(){E&&(M=d.getBBox(),A+=(E[0]-M.x)/M.width-.5,C+=(E[1]-M.y)/M.height-.5,t*=E[2]/M.width,J*=E[2]/M.height);B='src\x3d"'+a.getOptions().global.VMLRadialGradientURL+'" size\x3d"'+t+","+
J+'" origin\x3d"0.5,0.5" position\x3d"'+A+","+C+'" color2\x3d"'+r+'" ';m()};d.added?h():d.onAdd=h;h=x}else h=w}else n.test(c)&&"IMG"!==b.tagName?(p=a.color(c),d[e+"-opacitySetter"](p.get("a"),e,b),h=p.get("rgb")):(h=b.getElementsByTagName(e),h.length&&(h[0].opacity=1,h[0].type="solid"),h=c);return h},prepVML:function(a){var c=this.isIE8;a=a.join("");c?(a=a.replace("/\x3e",' xmlns\x3d"urn:schemas-microsoft-com:vml" /\x3e'),a=-1===a.indexOf('style\x3d"')?a.replace("/\x3e",' style\x3d"display:inline-block;behavior:url(#default#VML);" /\x3e'):
a.replace('style\x3d"','style\x3d"display:inline-block;behavior:url(#default#VML);')):a=a.replace("\x3c","\x3chcv:");return a},text:D.prototype.html,path:function(a){var c={coordsize:"10 10"};d(a)?c.d=a:b(a)&&g(c,a);return this.createElement("shape").attr(c)},circle:function(a,e,d){var c=this.symbol("circle");b(a)&&(d=a.r,e=a.y,a=a.x);c.isCircle=!0;c.r=d;return c.attr({x:a,y:e})},g:function(a){var c;a&&(c={className:"highcharts-"+a,"class":"highcharts-"+a});return this.createElement("div").attr(c)},
image:function(a,b,e,d,n){var c=this.createElement("img").attr({src:a});1<arguments.length&&c.attr({x:b,y:e,width:d,height:n});return c},createElement:function(a){return"rect"===a?this.symbol(a):D.prototype.createElement.call(this,a)},invertChild:function(a,b){var c=this;b=b.style;var e="IMG"===a.tagName&&a.style;E(a,{flip:"x",left:y(b.width)-(e?y(e.top):1),top:y(b.height)-(e?y(e.left):1),rotation:-90});u(a.childNodes,function(b){c.invertChild(b,a)})},symbols:{arc:function(a,b,e,d,n){var c=n.start,
q=n.end,g=n.r||e||d;e=n.innerR;d=Math.cos(c);var k=Math.sin(c),h=Math.cos(q),w=Math.sin(q);if(0===q-c)return["x"];c=["wa",a-g,b-g,a+g,b+g,a+g*d,b+g*k,a+g*h,b+g*w];n.open&&!e&&c.push("e","M",a,b);c.push("at",a-e,b-e,a+e,b+e,a+e*h,b+e*w,a+e*d,b+e*k,"x","e");c.isArc=!0;return c},circle:function(a,b,e,d,n){n&&m(n.r)&&(e=d=2*n.r);n&&n.isCircle&&(a-=e/2,b-=d/2);return["wa",a,b,a+e,b+d,a+e,b+d/2,a+e,b+d/2,"e"]},rect:function(a,b,e,d,n){return D.prototype.symbols[m(n)&&n.r?"callout":"square"].call(0,a,b,
e,d,n)}}},a.VMLRenderer=C=function(){this.init.apply(this,arguments)},C.prototype=e(D.prototype,A),a.Renderer=C);D.prototype.measureSpanWidth=function(a,b){var c=r.createElement("span");a=r.createTextNode(a);c.appendChild(a);E(c,b);this.box.appendChild(c);b=c.offsetWidth;l(c);return b}})(M);(function(a){function C(){var f=a.defaultOptions.global,l=r.moment;if(f.timezone){if(l)return function(a){return-l.tz(a,f.timezone).utcOffset()};a.error(25)}return f.useUTC&&f.getTimezoneOffset}function A(){var f=
a.defaultOptions.global,t,g=f.useUTC,d=g?"getUTC":"get",k=g?"setUTC":"set";a.Date=t=f.Date||r.Date;t.hcTimezoneOffset=g&&f.timezoneOffset;t.hcGetTimezoneOffset=C();t.hcMakeTime=function(a,e,d,k,n,f){var b;g?(b=t.UTC.apply(0,arguments),b+=m(b)):b=(new t(a,e,l(d,1),l(k,0),l(n,0),l(f,0))).getTime();return b};E("Minutes Hours Day Date Month FullYear".split(" "),function(a){t["hcGet"+a]=d+a});E("Milliseconds Seconds Minutes Hours Date Month FullYear".split(" "),function(a){t["hcSet"+a]=k+a})}var F=a.color,
E=a.each,m=a.getTZOffset,f=a.merge,l=a.pick,r=a.win;a.defaultOptions={colors:"#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" "),symbols:["circle","diamond","square","triangle","triangle-down"],lang:{loading:"Loading...",months:"January February March April May June July August September October November December".split(" "),shortMonths:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),weekdays:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
decimalPoint:".",numericSymbols:"kMGTPE".split(""),resetZoom:"Reset zoom",resetZoomTitle:"Reset zoom level 1:1",thousandsSep:" "},global:{useUTC:!0,VMLRadialGradientURL:"http://code.highcharts.com/5.0.14/gfx/vml-radial-gradient.png"},chart:{borderRadius:0,defaultSeriesType:"line",ignoreHiddenSeries:!0,spacing:[10,10,15,10],resetZoomButton:{theme:{zIndex:20},position:{align:"right",x:-10,y:10}},width:null,height:null,borderColor:"#335cad",backgroundColor:"#ffffff",plotBorderColor:"#cccccc"},title:{text:"Chart title",
align:"center",margin:15,widthAdjust:-44},subtitle:{text:"",align:"center",widthAdjust:-44},plotOptions:{},labels:{style:{position:"absolute",color:"#333333"}},legend:{enabled:!0,align:"center",layout:"horizontal",labelFormatter:function(){return this.name},borderColor:"#999999",borderRadius:0,navigation:{activeColor:"#003399",inactiveColor:"#cccccc"},itemStyle:{color:"#333333",fontSize:"12px",fontWeight:"bold",textOverflow:"ellipsis"},itemHoverStyle:{color:"#000000"},itemHiddenStyle:{color:"#cccccc"},
shadow:!1,itemCheckboxStyle:{position:"absolute",width:"13px",height:"13px"},squareSymbol:!0,symbolPadding:5,verticalAlign:"bottom",x:0,y:0,title:{style:{fontWeight:"bold"}}},loading:{labelStyle:{fontWeight:"bold",position:"relative",top:"45%"},style:{position:"absolute",backgroundColor:"#ffffff",opacity:.5,textAlign:"center"}},tooltip:{enabled:!0,animation:a.svg,borderRadius:3,dateTimeLabelFormats:{millisecond:"%A, %b %e, %H:%M:%S.%L",second:"%A, %b %e, %H:%M:%S",minute:"%A, %b %e, %H:%M",hour:"%A, %b %e, %H:%M",
day:"%A, %b %e, %Y",week:"Week from %A, %b %e, %Y",month:"%B %Y",year:"%Y"},footerFormat:"",padding:8,snap:a.isTouchDevice?25:10,backgroundColor:F("#f7f7f7").setOpacity(.85).get(),borderWidth:1,headerFormat:'\x3cspan style\x3d"font-size: 10px"\x3e{point.key}\x3c/span\x3e\x3cbr/\x3e',pointFormat:'\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e',shadow:!0,style:{color:"#333333",cursor:"default",fontSize:"12px",pointerEvents:"none",
whiteSpace:"nowrap"}},credits:{enabled:!0,href:"http://www.highcharts.com",position:{align:"right",x:-10,verticalAlign:"bottom",y:-5},style:{cursor:"pointer",color:"#999999",fontSize:"9px"},text:"Highcharts.com"}};a.setOptions=function(r){a.defaultOptions=f(!0,a.defaultOptions,r);A();return a.defaultOptions};a.getOptions=function(){return a.defaultOptions};a.defaultPlotOptions=a.defaultOptions.plotOptions;A()})(M);(function(a){var C=a.correctFloat,A=a.defined,F=a.destroyObjectProperties,E=a.isNumber,
m=a.merge,f=a.pick,l=a.deg2rad;a.Tick=function(a,f,l,g){this.axis=a;this.pos=f;this.type=l||"";this.isNewLabel=this.isNew=!0;l||g||this.addLabel()};a.Tick.prototype={addLabel:function(){var a=this.axis,l=a.options,t=a.chart,g=a.categories,d=a.names,k=this.pos,b=l.labels,e=a.tickPositions,v=k===e[0],y=k===e[e.length-1],d=g?f(g[k],d[k],k):k,g=this.label,e=e.info,n;a.isDatetimeAxis&&e&&(n=l.dateTimeLabelFormats[e.higherRanks[k]||e.unitName]);this.isFirst=v;this.isLast=y;l=a.labelFormatter.call({axis:a,
chart:t,isFirst:v,isLast:y,dateTimeLabelFormat:n,value:a.isLog?C(a.lin2log(d)):d,pos:k});A(g)?g&&g.attr({text:l}):(this.labelLength=(this.label=g=A(l)&&b.enabled?t.renderer.text(l,0,0,b.useHTML).css(m(b.style)).add(a.labelGroup):null)&&g.getBBox().width,this.rotation=0)},getLabelSize:function(){return this.label?this.label.getBBox()[this.axis.horiz?"height":"width"]:0},handleOverflow:function(a){var r=this.axis,m=a.x,g=r.chart.chartWidth,d=r.chart.spacing,k=f(r.labelLeft,Math.min(r.pos,d[3])),d=f(r.labelRight,
Math.max(r.pos+r.len,g-d[1])),b=this.label,e=this.rotation,v={left:0,center:.5,right:1}[r.labelAlign],y=b.getBBox().width,n=r.getSlotWidth(),D=n,J=1,c,G={};if(e)0>e&&m-v*y<k?c=Math.round(m/Math.cos(e*l)-k):0<e&&m+v*y>d&&(c=Math.round((g-m)/Math.cos(e*l)));else if(g=m+(1-v)*y,m-v*y<k?D=a.x+D*(1-v)-k:g>d&&(D=d-a.x+D*v,J=-1),D=Math.min(n,D),D<n&&"center"===r.labelAlign&&(a.x+=J*(n-D-v*(n-Math.min(y,D)))),y>D||r.autoRotation&&(b.styles||{}).width)c=D;c&&(G.width=c,(r.options.labels.style||{}).textOverflow||
(G.textOverflow="ellipsis"),b.css(G))},getPosition:function(a,f,l,g){var d=this.axis,k=d.chart,b=g&&k.oldChartHeight||k.chartHeight;return{x:a?d.translate(f+l,null,null,g)+d.transB:d.left+d.offset+(d.opposite?(g&&k.oldChartWidth||k.chartWidth)-d.right-d.left:0),y:a?b-d.bottom+d.offset-(d.opposite?d.height:0):b-d.translate(f+l,null,null,g)-d.transB}},getLabelPosition:function(a,f,m,g,d,k,b,e){var v=this.axis,y=v.transA,n=v.reversed,D=v.staggerLines,r=v.tickRotCorr||{x:0,y:0},c=d.y;A(c)||(c=0===v.side?
m.rotation?-8:-m.getBBox().height:2===v.side?r.y+8:Math.cos(m.rotation*l)*(r.y-m.getBBox(!1,0).height/2));a=a+d.x+r.x-(k&&g?k*y*(n?-1:1):0);f=f+c-(k&&!g?k*y*(n?1:-1):0);D&&(m=b/(e||1)%D,v.opposite&&(m=D-m-1),f+=v.labelOffset/D*m);return{x:a,y:Math.round(f)}},getMarkPath:function(a,f,l,g,d,k){return k.crispLine(["M",a,f,"L",a+(d?0:-l),f+(d?l:0)],g)},renderGridLine:function(a,f,l){var g=this.axis,d=g.options,k=this.gridLine,b={},e=this.pos,v=this.type,y=g.tickmarkOffset,n=g.chart.renderer,D=v?v+"Grid":
"grid",r=d[D+"LineWidth"],c=d[D+"LineColor"],d=d[D+"LineDashStyle"];k||(b.stroke=c,b["stroke-width"]=r,d&&(b.dashstyle=d),v||(b.zIndex=1),a&&(b.opacity=0),this.gridLine=k=n.path().attr(b).addClass("highcharts-"+(v?v+"-":"")+"grid-line").add(g.gridGroup));if(!a&&k&&(a=g.getPlotLinePath(e+y,k.strokeWidth()*l,a,!0)))k[this.isNew?"attr":"animate"]({d:a,opacity:f})},renderMark:function(a,l,m){var g=this.axis,d=g.options,k=g.chart.renderer,b=this.type,e=b?b+"Tick":"tick",v=g.tickSize(e),y=this.mark,n=!y,
D=a.x;a=a.y;var r=f(d[e+"Width"],!b&&g.isXAxis?1:0),d=d[e+"Color"];v&&(g.opposite&&(v[0]=-v[0]),n&&(this.mark=y=k.path().addClass("highcharts-"+(b?b+"-":"")+"tick").add(g.axisGroup),y.attr({stroke:d,"stroke-width":r})),y[n?"attr":"animate"]({d:this.getMarkPath(D,a,v[0],y.strokeWidth()*m,g.horiz,k),opacity:l}))},renderLabel:function(a,l,m,g){var d=this.axis,k=d.horiz,b=d.options,e=this.label,v=b.labels,y=v.step,n=d.tickmarkOffset,D=!0,r=a.x;a=a.y;e&&E(r)&&(e.xy=a=this.getLabelPosition(r,a,e,k,v,n,
g,y),this.isFirst&&!this.isLast&&!f(b.showFirstLabel,1)||this.isLast&&!this.isFirst&&!f(b.showLastLabel,1)?D=!1:!k||d.isRadial||v.step||v.rotation||l||0===m||this.handleOverflow(a),y&&g%y&&(D=!1),D&&E(a.y)?(a.opacity=m,e[this.isNewLabel?"attr":"animate"](a),this.isNewLabel=!1):(e.attr("y",-9999),this.isNewLabel=!0),this.isNew=!1)},render:function(a,l,m){var g=this.axis,d=g.horiz,k=this.getPosition(d,this.pos,g.tickmarkOffset,l),b=k.x,e=k.y,g=d&&b===g.pos+g.len||!d&&e===g.pos?-1:1;m=f(m,1);this.isActive=
!0;this.renderGridLine(l,m,g);this.renderMark(k,m,g);this.renderLabel(k,l,m,a)},destroy:function(){F(this,this.axis)}}})(M);var S=function(a){var C=a.addEvent,A=a.animObject,F=a.arrayMax,E=a.arrayMin,m=a.color,f=a.correctFloat,l=a.defaultOptions,r=a.defined,u=a.deg2rad,t=a.destroyObjectProperties,g=a.each,d=a.extend,k=a.fireEvent,b=a.format,e=a.getMagnitude,v=a.grep,y=a.inArray,n=a.isArray,D=a.isNumber,J=a.isString,c=a.merge,G=a.normalizeTickInterval,q=a.objectEach,B=a.pick,K=a.removeEvent,p=a.splat,
z=a.syncTimeout,I=a.Tick,L=function(){this.init.apply(this,arguments)};a.extend(L.prototype,{defaultOptions:{dateTimeLabelFormats:{millisecond:"%H:%M:%S.%L",second:"%H:%M:%S",minute:"%H:%M",hour:"%H:%M",day:"%e. %b",week:"%e. %b",month:"%b '%y",year:"%Y"},endOnTick:!1,labels:{enabled:!0,style:{color:"#666666",cursor:"default",fontSize:"11px"},x:0},minPadding:.01,maxPadding:.01,minorTickLength:2,minorTickPosition:"outside",startOfWeek:1,startOnTick:!1,tickLength:10,tickmarkPlacement:"between",tickPixelInterval:100,
tickPosition:"outside",title:{align:"middle",style:{color:"#666666"}},type:"linear",minorGridLineColor:"#f2f2f2",minorGridLineWidth:1,minorTickColor:"#999999",lineColor:"#ccd6eb",lineWidth:1,gridLineColor:"#e6e6e6",tickColor:"#ccd6eb"},defaultYAxisOptions:{endOnTick:!0,tickPixelInterval:72,showLastLabel:!0,labels:{x:-8},maxPadding:.05,minPadding:.05,startOnTick:!0,title:{rotation:270,text:"Values"},stackLabels:{allowOverlap:!1,enabled:!1,formatter:function(){return a.numberFormat(this.total,-1)},
style:{fontSize:"11px",fontWeight:"bold",color:"#000000",textOutline:"1px contrast"}},gridLineWidth:1,lineWidth:0},defaultLeftAxisOptions:{labels:{x:-15},title:{rotation:270}},defaultRightAxisOptions:{labels:{x:15},title:{rotation:90}},defaultBottomAxisOptions:{labels:{autoRotation:[-45],x:0},title:{rotation:0}},defaultTopAxisOptions:{labels:{autoRotation:[-45],x:0},title:{rotation:0}},init:function(a,c){var h=c.isX,b=this;b.chart=a;b.horiz=a.inverted&&!b.isZAxis?!h:h;b.isXAxis=h;b.coll=b.coll||(h?
"xAxis":"yAxis");b.opposite=c.opposite;b.side=c.side||(b.horiz?b.opposite?0:2:b.opposite?1:3);b.setOptions(c);var w=this.options,e=w.type;b.labelFormatter=w.labels.formatter||b.defaultLabelFormatter;b.userOptions=c;b.minPixelPadding=0;b.reversed=w.reversed;b.visible=!1!==w.visible;b.zoomEnabled=!1!==w.zoomEnabled;b.hasNames="category"===e||!0===w.categories;b.categories=w.categories||b.hasNames;b.names=b.names||[];b.plotLinesAndBandsGroups={};b.isLog="logarithmic"===e;b.isDatetimeAxis="datetime"===
e;b.positiveValuesOnly=b.isLog&&!b.allowNegativeLog;b.isLinked=r(w.linkedTo);b.ticks={};b.labelEdge=[];b.minorTicks={};b.plotLinesAndBands=[];b.alternateBands={};b.len=0;b.minRange=b.userMinRange=w.minRange||w.maxZoom;b.range=w.range;b.offset=w.offset||0;b.stacks={};b.oldStacks={};b.stacksTouched=0;b.max=null;b.min=null;b.crosshair=B(w.crosshair,p(a.options.tooltip.crosshairs)[h?0:1],!1);c=b.options.events;-1===y(b,a.axes)&&(h?a.axes.splice(a.xAxis.length,0,b):a.axes.push(b),a[b.coll].push(b));b.series=
b.series||[];a.inverted&&!b.isZAxis&&h&&void 0===b.reversed&&(b.reversed=!0);q(c,function(a,h){C(b,h,a)});b.lin2log=w.linearToLogConverter||b.lin2log;b.isLog&&(b.val2lin=b.log2lin,b.lin2val=b.lin2log)},setOptions:function(a){this.options=c(this.defaultOptions,"yAxis"===this.coll&&this.defaultYAxisOptions,[this.defaultTopAxisOptions,this.defaultRightAxisOptions,this.defaultBottomAxisOptions,this.defaultLeftAxisOptions][this.side],c(l[this.coll],a))},defaultLabelFormatter:function(){var h=this.axis,
c=this.value,e=h.categories,p=this.dateTimeLabelFormat,d=l.lang,n=d.numericSymbols,d=d.numericSymbolMagnitude||1E3,q=n&&n.length,x,g=h.options.labels.format,h=h.isLog?Math.abs(c):h.tickInterval;if(g)x=b(g,this);else if(e)x=c;else if(p)x=a.dateFormat(p,c);else if(q&&1E3<=h)for(;q--&&void 0===x;)e=Math.pow(d,q+1),h>=e&&0===10*c%e&&null!==n[q]&&0!==c&&(x=a.numberFormat(c/e,-1)+n[q]);void 0===x&&(x=1E4<=Math.abs(c)?a.numberFormat(c,-1):a.numberFormat(c,-1,void 0,""));return x},getSeriesExtremes:function(){var a=
this,b=a.chart;a.hasVisibleSeries=!1;a.dataMin=a.dataMax=a.threshold=null;a.softThreshold=!a.isXAxis;a.buildStacks&&a.buildStacks();g(a.series,function(h){if(h.visible||!b.options.chart.ignoreHiddenSeries){var c=h.options,w=c.threshold,e;a.hasVisibleSeries=!0;a.positiveValuesOnly&&0>=w&&(w=null);if(a.isXAxis)c=h.xData,c.length&&(h=E(c),D(h)||h instanceof Date||(c=v(c,function(a){return D(a)}),h=E(c)),a.dataMin=Math.min(B(a.dataMin,c[0]),h),a.dataMax=Math.max(B(a.dataMax,c[0]),F(c)));else if(h.getExtremes(),
e=h.dataMax,h=h.dataMin,r(h)&&r(e)&&(a.dataMin=Math.min(B(a.dataMin,h),h),a.dataMax=Math.max(B(a.dataMax,e),e)),r(w)&&(a.threshold=w),!c.softThreshold||a.positiveValuesOnly)a.softThreshold=!1}})},translate:function(a,b,c,e,p,d){var h=this.linkedParent||this,w=1,n=0,q=e?h.oldTransA:h.transA;e=e?h.oldMin:h.min;var g=h.minPixelPadding;p=(h.isOrdinal||h.isBroken||h.isLog&&p)&&h.lin2val;q||(q=h.transA);c&&(w*=-1,n=h.len);h.reversed&&(w*=-1,n-=w*(h.sector||h.len));b?(a=(a*w+n-g)/q+e,p&&(a=h.lin2val(a))):
(p&&(a=h.val2lin(a)),a=w*(a-e)*q+n+w*g+(D(d)?q*d:0));return a},toPixels:function(a,b){return this.translate(a,!1,!this.horiz,null,!0)+(b?0:this.pos)},toValue:function(a,b){return this.translate(a-(b?0:this.pos),!0,!this.horiz,null,!0)},getPlotLinePath:function(a,b,c,e,p){var h=this.chart,w=this.left,d=this.top,n,q,g=c&&h.oldChartHeight||h.chartHeight,k=c&&h.oldChartWidth||h.chartWidth,f;n=this.transB;var v=function(a,h,b){if(a<h||a>b)e?a=Math.min(Math.max(h,a),b):f=!0;return a};p=B(p,this.translate(a,
null,null,c));a=c=Math.round(p+n);n=q=Math.round(g-p-n);D(p)?this.horiz?(n=d,q=g-this.bottom,a=c=v(a,w,w+this.width)):(a=w,c=k-this.right,n=q=v(n,d,d+this.height)):f=!0;return f&&!e?null:h.renderer.crispLine(["M",a,n,"L",c,q],b||1)},getLinearTickPositions:function(a,b,c){var h,w=f(Math.floor(b/a)*a);c=f(Math.ceil(c/a)*a);var e=[];if(this.single)return[b];for(b=w;b<=c;){e.push(b);b=f(b+a);if(b===h)break;h=b}return e},getMinorTickPositions:function(){var a=this,b=a.options,c=a.tickPositions,e=a.minorTickInterval,
p=[],d=a.pointRangePadding||0,n=a.min-d,d=a.max+d,q=d-n;if(q&&q/e<a.len/3)if(a.isLog)g(this.paddedTicks,function(h,b,c){b&&p.push.apply(p,a.getLogTickPositions(e,c[b-1],c[b],!0))});else if(a.isDatetimeAxis&&"auto"===b.minorTickInterval)p=p.concat(a.getTimeTicks(a.normalizeTimeTickInterval(e),n,d,b.startOfWeek));else for(b=n+(c[0]-n)%e;b<=d&&b!==p[0];b+=e)p.push(b);0!==p.length&&a.trimTicks(p);return p},adjustForMinRange:function(){var a=this.options,b=this.min,c=this.max,e,p,d,n,q,k,f,v;this.isXAxis&&
void 0===this.minRange&&!this.isLog&&(r(a.min)||r(a.max)?this.minRange=null:(g(this.series,function(a){k=a.xData;for(n=f=a.xIncrement?1:k.length-1;0<n;n--)if(q=k[n]-k[n-1],void 0===d||q<d)d=q}),this.minRange=Math.min(5*d,this.dataMax-this.dataMin)));c-b<this.minRange&&(p=this.dataMax-this.dataMin>=this.minRange,v=this.minRange,e=(v-c+b)/2,e=[b-e,B(a.min,b-e)],p&&(e[2]=this.isLog?this.log2lin(this.dataMin):this.dataMin),b=F(e),c=[b+v,B(a.max,b+v)],p&&(c[2]=this.isLog?this.log2lin(this.dataMax):this.dataMax),
c=E(c),c-b<v&&(e[0]=c-v,e[1]=B(a.min,c-v),b=F(e)));this.min=b;this.max=c},getClosest:function(){var a;this.categories?a=1:g(this.series,function(h){var b=h.closestPointRange,c=h.visible||!h.chart.options.chart.ignoreHiddenSeries;!h.noSharedTooltip&&r(b)&&c&&(a=r(a)?Math.min(a,b):b)});return a},nameToX:function(a){var h=n(this.categories),b=h?this.categories:this.names,c=a.options.x,e;a.series.requireSorting=!1;r(c)||(c=!1===this.options.uniqueNames?a.series.autoIncrement():y(a.name,b));-1===c?h||
(e=b.length):e=c;void 0!==e&&(this.names[e]=a.name);return e},updateNames:function(){var a=this;0<this.names.length&&(this.names.length=0,this.minRange=this.userMinRange,g(this.series||[],function(h){h.xIncrement=null;if(!h.points||h.isDirtyData)h.processData(),h.generatePoints();g(h.points,function(b,c){var e;b.options&&(e=a.nameToX(b),void 0!==e&&e!==b.x&&(b.x=e,h.xData[c]=e))})}))},setAxisTranslation:function(a){var h=this,b=h.max-h.min,c=h.axisPointRange||0,e,p=0,d=0,n=h.linkedParent,q=!!h.categories,
k=h.transA,f=h.isXAxis;if(f||q||c)e=h.getClosest(),n?(p=n.minPointOffset,d=n.pointRangePadding):g(h.series,function(a){var b=q?1:f?B(a.options.pointRange,e,0):h.axisPointRange||0;a=a.options.pointPlacement;c=Math.max(c,b);h.single||(p=Math.max(p,J(a)?0:b/2),d=Math.max(d,"on"===a?0:b))}),n=h.ordinalSlope&&e?h.ordinalSlope/e:1,h.minPointOffset=p*=n,h.pointRangePadding=d*=n,h.pointRange=Math.min(c,b),f&&(h.closestPointRange=e);a&&(h.oldTransA=k);h.translationSlope=h.transA=k=h.options.staticScale||h.len/
(b+d||1);h.transB=h.horiz?h.left:h.bottom;h.minPixelPadding=k*p},minFromRange:function(){return this.max-this.range},setTickInterval:function(h){var b=this,c=b.chart,p=b.options,d=b.isLog,n=b.log2lin,q=b.isDatetimeAxis,x=b.isXAxis,v=b.isLinked,z=p.maxPadding,y=p.minPadding,l=p.tickInterval,I=p.tickPixelInterval,m=b.categories,J=b.threshold,t=b.softThreshold,L,u,K,A;q||m||v||this.getTickAmount();K=B(b.userMin,p.min);A=B(b.userMax,p.max);v?(b.linkedParent=c[b.coll][p.linkedTo],c=b.linkedParent.getExtremes(),
b.min=B(c.min,c.dataMin),b.max=B(c.max,c.dataMax),p.type!==b.linkedParent.options.type&&a.error(11,1)):(!t&&r(J)&&(b.dataMin>=J?(L=J,y=0):b.dataMax<=J&&(u=J,z=0)),b.min=B(K,L,b.dataMin),b.max=B(A,u,b.dataMax));d&&(b.positiveValuesOnly&&!h&&0>=Math.min(b.min,B(b.dataMin,b.min))&&a.error(10,1),b.min=f(n(b.min),15),b.max=f(n(b.max),15));b.range&&r(b.max)&&(b.userMin=b.min=K=Math.max(b.dataMin,b.minFromRange()),b.userMax=A=b.max,b.range=null);k(b,"foundExtremes");b.beforePadding&&b.beforePadding();b.adjustForMinRange();
!(m||b.axisPointRange||b.usePercentage||v)&&r(b.min)&&r(b.max)&&(n=b.max-b.min)&&(!r(K)&&y&&(b.min-=n*y),!r(A)&&z&&(b.max+=n*z));D(p.softMin)&&(b.min=Math.min(b.min,p.softMin));D(p.softMax)&&(b.max=Math.max(b.max,p.softMax));D(p.floor)&&(b.min=Math.max(b.min,p.floor));D(p.ceiling)&&(b.max=Math.min(b.max,p.ceiling));t&&r(b.dataMin)&&(J=J||0,!r(K)&&b.min<J&&b.dataMin>=J?b.min=J:!r(A)&&b.max>J&&b.dataMax<=J&&(b.max=J));b.tickInterval=b.min===b.max||void 0===b.min||void 0===b.max?1:v&&!l&&I===b.linkedParent.options.tickPixelInterval?
l=b.linkedParent.tickInterval:B(l,this.tickAmount?(b.max-b.min)/Math.max(this.tickAmount-1,1):void 0,m?1:(b.max-b.min)*I/Math.max(b.len,I));x&&!h&&g(b.series,function(a){a.processData(b.min!==b.oldMin||b.max!==b.oldMax)});b.setAxisTranslation(!0);b.beforeSetTickPositions&&b.beforeSetTickPositions();b.postProcessTickInterval&&(b.tickInterval=b.postProcessTickInterval(b.tickInterval));b.pointRange&&!l&&(b.tickInterval=Math.max(b.pointRange,b.tickInterval));h=B(p.minTickInterval,b.isDatetimeAxis&&b.closestPointRange);
!l&&b.tickInterval<h&&(b.tickInterval=h);q||d||l||(b.tickInterval=G(b.tickInterval,null,e(b.tickInterval),B(p.allowDecimals,!(.5<b.tickInterval&&5>b.tickInterval&&1E3<b.max&&9999>b.max)),!!this.tickAmount));this.tickAmount||(b.tickInterval=b.unsquish());this.setTickPositions()},setTickPositions:function(){var a=this.options,b,c=a.tickPositions,e=a.tickPositioner,p=a.startOnTick,d=a.endOnTick;this.tickmarkOffset=this.categories&&"between"===a.tickmarkPlacement&&1===this.tickInterval?.5:0;this.minorTickInterval=
"auto"===a.minorTickInterval&&this.tickInterval?this.tickInterval/5:a.minorTickInterval;this.single=this.min===this.max&&r(this.min)&&!this.tickAmount&&(parseInt(this.min,10)===this.min||!1!==a.allowDecimals);this.tickPositions=b=c&&c.slice();!b&&(b=this.isDatetimeAxis?this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval,a.units),this.min,this.max,a.startOfWeek,this.ordinalPositions,this.closestPointRange,!0):this.isLog?this.getLogTickPositions(this.tickInterval,this.min,this.max):this.getLinearTickPositions(this.tickInterval,
this.min,this.max),b.length>this.len&&(b=[b[0],b.pop()]),this.tickPositions=b,e&&(e=e.apply(this,[this.min,this.max])))&&(this.tickPositions=b=e);this.paddedTicks=b.slice(0);this.trimTicks(b,p,d);this.isLinked||(this.single&&2>b.length&&(this.min-=.5,this.max+=.5),c||e||this.adjustTickAmount())},trimTicks:function(a,b,c){var h=a[0],e=a[a.length-1],p=this.minPointOffset||0;if(!this.isLinked){if(b&&-Infinity!==h)this.min=h;else for(;this.min-p>a[0];)a.shift();if(c)this.max=e;else for(;this.max+p<a[a.length-
1];)a.pop();0===a.length&&r(h)&&a.push((e+h)/2)}},alignToOthers:function(){var a={},b,c=this.options;!1===this.chart.options.chart.alignTicks||!1===c.alignTicks||this.isLog||g(this.chart[this.coll],function(h){var c=h.options,c=[h.horiz?c.left:c.top,c.width,c.height,c.pane].join();h.series.length&&(a[c]?b=!0:a[c]=1)});return b},getTickAmount:function(){var a=this.options,b=a.tickAmount,c=a.tickPixelInterval;!r(a.tickInterval)&&this.len<c&&!this.isRadial&&!this.isLog&&a.startOnTick&&a.endOnTick&&(b=
2);!b&&this.alignToOthers()&&(b=Math.ceil(this.len/c)+1);4>b&&(this.finalTickAmt=b,b=5);this.tickAmount=b},adjustTickAmount:function(){var a=this.tickInterval,b=this.tickPositions,c=this.tickAmount,e=this.finalTickAmt,p=b&&b.length;if(p<c){for(;b.length<c;)b.push(f(b[b.length-1]+a));this.transA*=(p-1)/(c-1);this.max=b[b.length-1]}else p>c&&(this.tickInterval*=2,this.setTickPositions());if(r(e)){for(a=c=b.length;a--;)(3===e&&1===a%2||2>=e&&0<a&&a<c-1)&&b.splice(a,1);this.finalTickAmt=void 0}},setScale:function(){var a,
b;this.oldMin=this.min;this.oldMax=this.max;this.oldAxisLength=this.len;this.setAxisSize();b=this.len!==this.oldAxisLength;g(this.series,function(b){if(b.isDirtyData||b.isDirty||b.xAxis.isDirty)a=!0});b||a||this.isLinked||this.forceRedraw||this.userMin!==this.oldUserMin||this.userMax!==this.oldUserMax||this.alignToOthers()?(this.resetStacks&&this.resetStacks(),this.forceRedraw=!1,this.getSeriesExtremes(),this.setTickInterval(),this.oldUserMin=this.userMin,this.oldUserMax=this.userMax,this.isDirty||
(this.isDirty=b||this.min!==this.oldMin||this.max!==this.oldMax)):this.cleanStacks&&this.cleanStacks()},setExtremes:function(a,b,c,e,p){var h=this,n=h.chart;c=B(c,!0);g(h.series,function(a){delete a.kdTree});p=d(p,{min:a,max:b});k(h,"setExtremes",p,function(){h.userMin=a;h.userMax=b;h.eventArgs=p;c&&n.redraw(e)})},zoom:function(a,b){var h=this.dataMin,c=this.dataMax,e=this.options,p=Math.min(h,B(e.min,h)),e=Math.max(c,B(e.max,c));if(a!==this.min||b!==this.max)this.allowZoomOutside||(r(h)&&(a<p&&(a=
p),a>e&&(a=e)),r(c)&&(b<p&&(b=p),b>e&&(b=e))),this.displayBtn=void 0!==a||void 0!==b,this.setExtremes(a,b,!1,void 0,{trigger:"zoom"});return!0},setAxisSize:function(){var b=this.chart,c=this.options,e=c.offsets||[0,0,0,0],p=this.horiz,d=this.width=Math.round(a.relativeLength(B(c.width,b.plotWidth-e[3]+e[1]),b.plotWidth)),n=this.height=Math.round(a.relativeLength(B(c.height,b.plotHeight-e[0]+e[2]),b.plotHeight)),q=this.top=Math.round(a.relativeLength(B(c.top,b.plotTop+e[0]),b.plotHeight,b.plotTop)),
c=this.left=Math.round(a.relativeLength(B(c.left,b.plotLeft+e[3]),b.plotWidth,b.plotLeft));this.bottom=b.chartHeight-n-q;this.right=b.chartWidth-d-c;this.len=Math.max(p?d:n,0);this.pos=p?c:q},getExtremes:function(){var a=this.isLog,b=this.lin2log;return{min:a?f(b(this.min)):this.min,max:a?f(b(this.max)):this.max,dataMin:this.dataMin,dataMax:this.dataMax,userMin:this.userMin,userMax:this.userMax}},getThreshold:function(a){var b=this.isLog,h=this.lin2log,c=b?h(this.min):this.min,b=b?h(this.max):this.max;
null===a?a=c:c>a?a=c:b<a&&(a=b);return this.translate(a,0,1,0,1)},autoLabelAlign:function(a){a=(B(a,0)-90*this.side+720)%360;return 15<a&&165>a?"right":195<a&&345>a?"left":"center"},tickSize:function(a){var b=this.options,h=b[a+"Length"],c=B(b[a+"Width"],"tick"===a&&this.isXAxis?1:0);if(c&&h)return"inside"===b[a+"Position"]&&(h=-h),[h,c]},labelMetrics:function(){var a=this.tickPositions&&this.tickPositions[0]||0;return this.chart.renderer.fontMetrics(this.options.labels.style&&this.options.labels.style.fontSize,
this.ticks[a]&&this.ticks[a].label)},unsquish:function(){var a=this.options.labels,b=this.horiz,c=this.tickInterval,e=c,p=this.len/(((this.categories?1:0)+this.max-this.min)/c),d,n=a.rotation,q=this.labelMetrics(),k,f=Number.MAX_VALUE,v,z=function(a){a/=p||1;a=1<a?Math.ceil(a):1;return a*c};b?(v=!a.staggerLines&&!a.step&&(r(n)?[n]:p<B(a.autoRotationLimit,80)&&a.autoRotation))&&g(v,function(a){var b;if(a===n||a&&-90<=a&&90>=a)k=z(Math.abs(q.h/Math.sin(u*a))),b=k+Math.abs(a/360),b<f&&(f=b,d=a,e=k)}):
a.step||(e=z(q.h));this.autoRotation=v;this.labelRotation=B(d,n);return e},getSlotWidth:function(){var a=this.chart,b=this.horiz,c=this.options.labels,e=Math.max(this.tickPositions.length-(this.categories?0:1),1),p=a.margin[3];return b&&2>(c.step||0)&&!c.rotation&&(this.staggerLines||1)*this.len/e||!b&&(p&&p-a.spacing[3]||.33*a.chartWidth)},renderUnsquish:function(){var a=this.chart,b=a.renderer,e=this.tickPositions,p=this.ticks,d=this.options.labels,n=this.horiz,q=this.getSlotWidth(),k=Math.max(1,
Math.round(q-2*(d.padding||5))),f={},v=this.labelMetrics(),z=d.style&&d.style.textOverflow,D,y=0,l,I;J(d.rotation)||(f.rotation=d.rotation||0);g(e,function(a){(a=p[a])&&a.labelLength>y&&(y=a.labelLength)});this.maxLabelLength=y;if(this.autoRotation)y>k&&y>v.h?f.rotation=this.labelRotation:this.labelRotation=0;else if(q&&(D={width:k+"px"},!z))for(D.textOverflow="clip",l=e.length;!n&&l--;)if(I=e[l],k=p[I].label)k.styles&&"ellipsis"===k.styles.textOverflow?k.css({textOverflow:"clip"}):p[I].labelLength>
q&&k.css({width:q+"px"}),k.getBBox().height>this.len/e.length-(v.h-v.f)&&(k.specCss={textOverflow:"ellipsis"});f.rotation&&(D={width:(y>.5*a.chartHeight?.33*a.chartHeight:a.chartHeight)+"px"},z||(D.textOverflow="ellipsis"));if(this.labelAlign=d.align||this.autoLabelAlign(this.labelRotation))f.align=this.labelAlign;g(e,function(a){var b=(a=p[a])&&a.label;b&&(b.attr(f),D&&b.css(c(D,b.specCss)),delete b.specCss,a.rotation=f.rotation)});this.tickRotCorr=b.rotCorr(v.b,this.labelRotation||0,0!==this.side)},
hasData:function(){return this.hasVisibleSeries||r(this.min)&&r(this.max)&&!!this.tickPositions},addTitle:function(a){var b=this.chart.renderer,c=this.horiz,h=this.opposite,e=this.options.title,p;this.axisTitle||((p=e.textAlign)||(p=(c?{low:"left",middle:"center",high:"right"}:{low:h?"right":"left",middle:"center",high:h?"left":"right"})[e.align]),this.axisTitle=b.text(e.text,0,0,e.useHTML).attr({zIndex:7,rotation:e.rotation||0,align:p}).addClass("highcharts-axis-title").css(e.style).add(this.axisGroup),
this.axisTitle.isNew=!0);e.style.width||this.isRadial||this.axisTitle.css({width:this.len});this.axisTitle[a?"show":"hide"](!0)},generateTick:function(a){var b=this.ticks;b[a]?b[a].addLabel():b[a]=new I(this,a)},getOffset:function(){var a=this,b=a.chart,c=b.renderer,e=a.options,p=a.tickPositions,d=a.ticks,n=a.horiz,k=a.side,f=b.inverted&&!a.isZAxis?[1,0,3,2][k]:k,v,z,D=0,y,l=0,I=e.title,m=e.labels,G=0,J=b.axisOffset,b=b.clipOffset,t=[-1,1,1,-1][k],L=e.className,u=a.axisParent,K=this.tickSize("tick");
v=a.hasData();a.showAxis=z=v||B(e.showEmpty,!0);a.staggerLines=a.horiz&&m.staggerLines;a.axisGroup||(a.gridGroup=c.g("grid").attr({zIndex:e.gridZIndex||1}).addClass("highcharts-"+this.coll.toLowerCase()+"-grid "+(L||"")).add(u),a.axisGroup=c.g("axis").attr({zIndex:e.zIndex||2}).addClass("highcharts-"+this.coll.toLowerCase()+" "+(L||"")).add(u),a.labelGroup=c.g("axis-labels").attr({zIndex:m.zIndex||7}).addClass("highcharts-"+a.coll.toLowerCase()+"-labels "+(L||"")).add(u));v||a.isLinked?(g(p,function(b,
c){a.generateTick(b,c)}),a.renderUnsquish(),!1===m.reserveSpace||0!==k&&2!==k&&{1:"left",3:"right"}[k]!==a.labelAlign&&"center"!==a.labelAlign||g(p,function(a){G=Math.max(d[a].getLabelSize(),G)}),a.staggerLines&&(G*=a.staggerLines,a.labelOffset=G*(a.opposite?-1:1))):q(d,function(a,b){a.destroy();delete d[b]});I&&I.text&&!1!==I.enabled&&(a.addTitle(z),z&&!1!==I.reserveSpace&&(a.titleOffset=D=a.axisTitle.getBBox()[n?"height":"width"],y=I.offset,l=r(y)?0:B(I.margin,n?5:10)));a.renderLine();a.offset=
t*B(e.offset,J[k]);a.tickRotCorr=a.tickRotCorr||{x:0,y:0};c=0===k?-a.labelMetrics().h:2===k?a.tickRotCorr.y:0;l=Math.abs(G)+l;G&&(l=l-c+t*(n?B(m.y,a.tickRotCorr.y+8*t):m.x));a.axisTitleMargin=B(y,l);J[k]=Math.max(J[k],a.axisTitleMargin+D+t*a.offset,l,v&&p.length&&K?K[0]+t*a.offset:0);p=2*Math.floor(a.axisLine.strokeWidth()/2);0<e.offset&&(p-=2*e.offset);b[f]=Math.max(b[f]||p,p)},getLinePath:function(a){var b=this.chart,c=this.opposite,h=this.offset,e=this.horiz,p=this.left+(c?this.width:0)+h,h=b.chartHeight-
this.bottom-(c?this.height:0)+h;c&&(a*=-1);return b.renderer.crispLine(["M",e?this.left:p,e?h:this.top,"L",e?b.chartWidth-this.right:p,e?h:b.chartHeight-this.bottom],a)},renderLine:function(){this.axisLine||(this.axisLine=this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup),this.axisLine.attr({stroke:this.options.lineColor,"stroke-width":this.options.lineWidth,zIndex:7}))},getTitlePosition:function(){var a=this.horiz,b=this.left,c=this.top,e=this.len,p=this.options.title,
d=a?b:c,n=this.opposite,q=this.offset,k=p.x||0,g=p.y||0,f=this.axisTitle,v=this.chart.renderer.fontMetrics(p.style&&p.style.fontSize,f),f=Math.max(f.getBBox(null,0).height-v.h-1,0),e={low:d+(a?0:e),middle:d+e/2,high:d+(a?e:0)}[p.align],b=(a?c+this.height:b)+(a?1:-1)*(n?-1:1)*this.axisTitleMargin+[-f,f,v.f,-f][this.side];return{x:a?e+k:b+(n?this.width:0)+q+k,y:a?b+g-(n?this.height:0)+q:e+g}},renderMinorTick:function(a){var b=this.chart.hasRendered&&D(this.oldMin),c=this.minorTicks;c[a]||(c[a]=new I(this,
a,"minor"));b&&c[a].isNew&&c[a].render(null,!0);c[a].render(null,!1,1)},renderTick:function(a,b){var c=this.isLinked,e=this.ticks,h=this.chart.hasRendered&&D(this.oldMin);if(!c||a>=this.min&&a<=this.max)e[a]||(e[a]=new I(this,a)),h&&e[a].isNew&&e[a].render(b,!0,.1),e[a].render(b)},render:function(){var b=this,c=b.chart,e=b.options,p=b.isLog,d=b.lin2log,n=b.isLinked,k=b.tickPositions,f=b.axisTitle,v=b.ticks,y=b.minorTicks,l=b.alternateBands,m=e.stackLabels,r=e.alternateGridColor,B=b.tickmarkOffset,
G=b.axisLine,J=b.showAxis,t=A(c.renderer.globalAnimation),L,u;b.labelEdge.length=0;b.overlap=!1;g([v,y,l],function(a){q(a,function(a){a.isActive=!1})});if(b.hasData()||n)b.minorTickInterval&&!b.categories&&g(b.getMinorTickPositions(),function(a){b.renderMinorTick(a)}),k.length&&(g(k,function(a,c){b.renderTick(a,c)}),B&&(0===b.min||b.single)&&(v[-1]||(v[-1]=new I(b,-1,null,!0)),v[-1].render(-1))),r&&g(k,function(e,h){u=void 0!==k[h+1]?k[h+1]+B:b.max-B;0===h%2&&e<b.max&&u<=b.max+(c.polar?-B:B)&&(l[e]||
(l[e]=new a.PlotLineOrBand(b)),L=e+B,l[e].options={from:p?d(L):L,to:p?d(u):u,color:r},l[e].render(),l[e].isActive=!0)}),b._addedPlotLB||(g((e.plotLines||[]).concat(e.plotBands||[]),function(a){b.addPlotBandOrLine(a)}),b._addedPlotLB=!0);g([v,y,l],function(a){var b,e=[],h=t.duration;q(a,function(a,b){a.isActive||(a.render(b,!1,0),a.isActive=!1,e.push(b))});z(function(){for(b=e.length;b--;)a[e[b]]&&!a[e[b]].isActive&&(a[e[b]].destroy(),delete a[e[b]])},a!==l&&c.hasRendered&&h?h:0)});G&&(G[G.isPlaced?
"animate":"attr"]({d:this.getLinePath(G.strokeWidth())}),G.isPlaced=!0,G[J?"show":"hide"](!0));f&&J&&(e=b.getTitlePosition(),D(e.y)?(f[f.isNew?"attr":"animate"](e),f.isNew=!1):(f.attr("y",-9999),f.isNew=!0));m&&m.enabled&&b.renderStackTotals();b.isDirty=!1},redraw:function(){this.visible&&(this.render(),g(this.plotLinesAndBands,function(a){a.render()}));g(this.series,function(a){a.isDirty=!0})},keepProps:"extKey hcEvents names series userMax userMin".split(" "),destroy:function(a){var b=this,c=b.stacks,
e=b.plotLinesAndBands,h;a||K(b);q(c,function(a,b){t(a);c[b]=null});g([b.ticks,b.minorTicks,b.alternateBands],function(a){t(a)});if(e)for(a=e.length;a--;)e[a].destroy();g("stackTotalGroup axisLine axisTitle axisGroup gridGroup labelGroup cross".split(" "),function(a){b[a]&&(b[a]=b[a].destroy())});for(h in b.plotLinesAndBandsGroups)b.plotLinesAndBandsGroups[h]=b.plotLinesAndBandsGroups[h].destroy();q(b,function(a,c){-1===y(c,b.keepProps)&&delete b[c]})},drawCrosshair:function(a,b){var c,e=this.crosshair,
h=B(e.snap,!0),p,d=this.cross;a||(a=this.cross&&this.cross.e);this.crosshair&&!1!==(r(b)||!h)?(h?r(b)&&(p=this.isXAxis?b.plotX:this.len-b.plotY):p=a&&(this.horiz?a.chartX-this.pos:this.len-a.chartY+this.pos),r(p)&&(c=this.getPlotLinePath(b&&(this.isXAxis?b.x:B(b.stackY,b.y)),null,null,null,p)||null),r(c)?(b=this.categories&&!this.isRadial,d||(this.cross=d=this.chart.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-"+(b?"category ":"thin ")+e.className).attr({zIndex:B(e.zIndex,2)}).add(),
d.attr({stroke:e.color||(b?m("#ccd6eb").setOpacity(.25).get():"#cccccc"),"stroke-width":B(e.width,1)}),e.dashStyle&&d.attr({dashstyle:e.dashStyle})),d.show().attr({d:c}),b&&!e.width&&d.attr({"stroke-width":this.transA}),this.cross.e=a):this.hideCrosshair()):this.hideCrosshair()},hideCrosshair:function(){this.cross&&this.cross.hide()}});return a.Axis=L}(M);(function(a){var C=a.Axis,A=a.Date,F=a.dateFormat,E=a.defaultOptions,m=a.defined,f=a.each,l=a.extend,r=a.getMagnitude,u=a.getTZOffset,t=a.normalizeTickInterval,
g=a.pick,d=a.timeUnits;C.prototype.getTimeTicks=function(a,b,e,v){var k=[],n={},D=E.global.useUTC,r,c=new A(b-Math.max(u(b),u(e))),G=A.hcMakeTime,q=a.unitRange,B=a.count,t,p;if(m(b)){c[A.hcSetMilliseconds](q>=d.second?0:B*Math.floor(c.getMilliseconds()/B));if(q>=d.second)c[A.hcSetSeconds](q>=d.minute?0:B*Math.floor(c.getSeconds()/B));if(q>=d.minute)c[A.hcSetMinutes](q>=d.hour?0:B*Math.floor(c[A.hcGetMinutes]()/B));if(q>=d.hour)c[A.hcSetHours](q>=d.day?0:B*Math.floor(c[A.hcGetHours]()/B));if(q>=d.day)c[A.hcSetDate](q>=
d.month?1:B*Math.floor(c[A.hcGetDate]()/B));q>=d.month&&(c[A.hcSetMonth](q>=d.year?0:B*Math.floor(c[A.hcGetMonth]()/B)),r=c[A.hcGetFullYear]());if(q>=d.year)c[A.hcSetFullYear](r-r%B);if(q===d.week)c[A.hcSetDate](c[A.hcGetDate]()-c[A.hcGetDay]()+g(v,1));r=c[A.hcGetFullYear]();v=c[A.hcGetMonth]();var z=c[A.hcGetDate](),I=c[A.hcGetHours]();if(A.hcTimezoneOffset||A.hcGetTimezoneOffset)p=(!D||!!A.hcGetTimezoneOffset)&&(e-b>4*d.month||u(b)!==u(e)),c=c.getTime(),t=u(c),c=new A(c+t);D=c.getTime();for(b=1;D<
e;)k.push(D),D=q===d.year?G(r+b*B,0):q===d.month?G(r,v+b*B):!p||q!==d.day&&q!==d.week?p&&q===d.hour?G(r,v,z,I+b*B,0,0,t)-t:D+q*B:G(r,v,z+b*B*(q===d.day?1:7)),b++;k.push(D);q<=d.hour&&1E4>k.length&&f(k,function(a){0===a%18E5&&"000000000"===F("%H%M%S%L",a)&&(n[a]="day")})}k.info=l(a,{higherRanks:n,totalRange:q*B});return k};C.prototype.normalizeTimeTickInterval=function(a,b){var e=b||[["millisecond",[1,2,5,10,20,25,50,100,200,500]],["second",[1,2,5,10,15,30]],["minute",[1,2,5,10,15,30]],["hour",[1,
2,3,4,6,8,12]],["day",[1,2]],["week",[1,2]],["month",[1,2,3,4,6]],["year",null]];b=e[e.length-1];var k=d[b[0]],g=b[1],n;for(n=0;n<e.length&&!(b=e[n],k=d[b[0]],g=b[1],e[n+1]&&a<=(k*g[g.length-1]+d[e[n+1][0]])/2);n++);k===d.year&&a<5*k&&(g=[1,2,5]);a=t(a/k,g,"year"===b[0]?Math.max(r(a/k),1):1);return{unitRange:k,count:a,unitName:b[0]}}})(M);(function(a){var C=a.Axis,A=a.getMagnitude,F=a.map,E=a.normalizeTickInterval,m=a.pick;C.prototype.getLogTickPositions=function(a,l,r,u){var f=this.options,g=this.len,
d=this.lin2log,k=this.log2lin,b=[];u||(this._minorAutoInterval=null);if(.5<=a)a=Math.round(a),b=this.getLinearTickPositions(a,l,r);else if(.08<=a)for(var g=Math.floor(l),e,v,y,n,D,f=.3<a?[1,2,4]:.15<a?[1,2,4,6,8]:[1,2,3,4,5,6,7,8,9];g<r+1&&!D;g++)for(v=f.length,e=0;e<v&&!D;e++)y=k(d(g)*f[e]),y>l&&(!u||n<=r)&&void 0!==n&&b.push(n),n>r&&(D=!0),n=y;else l=d(l),r=d(r),a=f[u?"minorTickInterval":"tickInterval"],a=m("auto"===a?null:a,this._minorAutoInterval,f.tickPixelInterval/(u?5:1)*(r-l)/((u?g/this.tickPositions.length:
g)||1)),a=E(a,null,A(a)),b=F(this.getLinearTickPositions(a,l,r),k),u||(this._minorAutoInterval=a/5);u||(this.tickInterval=a);return b};C.prototype.log2lin=function(a){return Math.log(a)/Math.LN10};C.prototype.lin2log=function(a){return Math.pow(10,a)}})(M);(function(a,C){var A=a.arrayMax,F=a.arrayMin,E=a.defined,m=a.destroyObjectProperties,f=a.each,l=a.erase,r=a.merge,u=a.pick;a.PlotLineOrBand=function(a,g){this.axis=a;g&&(this.options=g,this.id=g.id)};a.PlotLineOrBand.prototype={render:function(){var f=
this,g=f.axis,d=g.horiz,k=f.options,b=k.label,e=f.label,v=k.to,l=k.from,n=k.value,D=E(l)&&E(v),m=E(n),c=f.svgElem,G=!c,q=[],B=k.color,K=u(k.zIndex,0),p=k.events,q={"class":"highcharts-plot-"+(D?"band ":"line ")+(k.className||"")},z={},I=g.chart.renderer,L=D?"bands":"lines",h=g.log2lin;g.isLog&&(l=h(l),v=h(v),n=h(n));m?(q={stroke:B,"stroke-width":k.width},k.dashStyle&&(q.dashstyle=k.dashStyle)):D&&(B&&(q.fill=B),k.borderWidth&&(q.stroke=k.borderColor,q["stroke-width"]=k.borderWidth));z.zIndex=K;L+=
"-"+K;(B=g.plotLinesAndBandsGroups[L])||(g.plotLinesAndBandsGroups[L]=B=I.g("plot-"+L).attr(z).add());G&&(f.svgElem=c=I.path().attr(q).add(B));if(m)q=g.getPlotLinePath(n,c.strokeWidth());else if(D)q=g.getPlotBandPath(l,v,k);else return;G&&q&&q.length?(c.attr({d:q}),p&&a.objectEach(p,function(a,b){c.on(b,function(a){p[b].apply(f,[a])})})):c&&(q?(c.show(),c.animate({d:q})):(c.hide(),e&&(f.label=e=e.destroy())));b&&E(b.text)&&q&&q.length&&0<g.width&&0<g.height&&!q.flat?(b=r({align:d&&D&&"center",x:d?
!D&&4:10,verticalAlign:!d&&D&&"middle",y:d?D?16:10:D?6:-4,rotation:d&&!D&&90},b),this.renderLabel(b,q,D,K)):e&&e.hide();return f},renderLabel:function(a,g,d,k){var b=this.label,e=this.axis.chart.renderer;b||(b={align:a.textAlign||a.align,rotation:a.rotation,"class":"highcharts-plot-"+(d?"band":"line")+"-label "+(a.className||"")},b.zIndex=k,this.label=b=e.text(a.text,0,0,a.useHTML).attr(b).add(),b.css(a.style));k=[g[1],g[4],d?g[6]:g[1]];g=[g[2],g[5],d?g[7]:g[2]];d=F(k);e=F(g);b.align(a,!1,{x:d,y:e,
width:A(k)-d,height:A(g)-e});b.show()},destroy:function(){l(this.axis.plotLinesAndBands,this);delete this.axis;m(this)}};a.extend(C.prototype,{getPlotBandPath:function(a,g){var d=this.getPlotLinePath(g,null,null,!0),k=this.getPlotLinePath(a,null,null,!0),b=this.horiz,e=1;a=a<this.min&&g<this.min||a>this.max&&g>this.max;k&&d?(a&&(k.flat=k.toString()===d.toString(),e=0),k.push(b&&d[4]===k[4]?d[4]+e:d[4],b||d[5]!==k[5]?d[5]:d[5]+e,b&&d[1]===k[1]?d[1]+e:d[1],b||d[2]!==k[2]?d[2]:d[2]+e)):k=null;return k},
addPlotBand:function(a){return this.addPlotBandOrLine(a,"plotBands")},addPlotLine:function(a){return this.addPlotBandOrLine(a,"plotLines")},addPlotBandOrLine:function(f,g){var d=(new a.PlotLineOrBand(this,f)).render(),k=this.userOptions;d&&(g&&(k[g]=k[g]||[],k[g].push(f)),this.plotLinesAndBands.push(d));return d},removePlotBandOrLine:function(a){for(var g=this.plotLinesAndBands,d=this.options,k=this.userOptions,b=g.length;b--;)g[b].id===a&&g[b].destroy();f([d.plotLines||[],k.plotLines||[],d.plotBands||
[],k.plotBands||[]],function(e){for(b=e.length;b--;)e[b].id===a&&l(e,e[b])})},removePlotBand:function(a){this.removePlotBandOrLine(a)},removePlotLine:function(a){this.removePlotBandOrLine(a)}})})(M,S);(function(a){var C=a.dateFormat,A=a.each,F=a.extend,E=a.format,m=a.isNumber,f=a.map,l=a.merge,r=a.pick,u=a.splat,t=a.syncTimeout,g=a.timeUnits;a.Tooltip=function(){this.init.apply(this,arguments)};a.Tooltip.prototype={init:function(a,k){this.chart=a;this.options=k;this.crosshairs=[];this.now={x:0,y:0};
this.isHidden=!0;this.split=k.split&&!a.inverted;this.shared=k.shared||this.split},cleanSplit:function(a){A(this.chart.series,function(d){var b=d&&d.tt;b&&(!b.isActive||a?d.tt=b.destroy():b.isActive=!1)})},getLabel:function(){var a=this.chart.renderer,k=this.options;this.label||(this.split?this.label=a.g("tooltip"):(this.label=a.label("",0,0,k.shape||"callout",null,null,k.useHTML,null,"tooltip").attr({padding:k.padding,r:k.borderRadius}),this.label.attr({fill:k.backgroundColor,"stroke-width":k.borderWidth}).css(k.style).shadow(k.shadow)),
this.label.attr({zIndex:8}).add());return this.label},update:function(a){this.destroy();l(!0,this.chart.options.tooltip.userOptions,a);this.init(this.chart,l(!0,this.options,a))},destroy:function(){this.label&&(this.label=this.label.destroy());this.split&&this.tt&&(this.cleanSplit(this.chart,!0),this.tt=this.tt.destroy());clearTimeout(this.hideTimer);clearTimeout(this.tooltipTimeout)},move:function(a,k,b,e){var d=this,g=d.now,n=!1!==d.options.animation&&!d.isHidden&&(1<Math.abs(a-g.x)||1<Math.abs(k-
g.y)),f=d.followPointer||1<d.len;F(g,{x:n?(2*g.x+a)/3:a,y:n?(g.y+k)/2:k,anchorX:f?void 0:n?(2*g.anchorX+b)/3:b,anchorY:f?void 0:n?(g.anchorY+e)/2:e});d.getLabel().attr(g);n&&(clearTimeout(this.tooltipTimeout),this.tooltipTimeout=setTimeout(function(){d&&d.move(a,k,b,e)},32))},hide:function(a){var d=this;clearTimeout(this.hideTimer);a=r(a,this.options.hideDelay,500);this.isHidden||(this.hideTimer=t(function(){d.getLabel()[a?"fadeOut":"hide"]();d.isHidden=!0},a))},getAnchor:function(a,k){var b,e=this.chart,
d=e.inverted,g=e.plotTop,n=e.plotLeft,l=0,m=0,c,r;a=u(a);b=a[0].tooltipPos;this.followPointer&&k&&(void 0===k.chartX&&(k=e.pointer.normalize(k)),b=[k.chartX-e.plotLeft,k.chartY-g]);b||(A(a,function(a){c=a.series.yAxis;r=a.series.xAxis;l+=a.plotX+(!d&&r?r.left-n:0);m+=(a.plotLow?(a.plotLow+a.plotHigh)/2:a.plotY)+(!d&&c?c.top-g:0)}),l/=a.length,m/=a.length,b=[d?e.plotWidth-m:l,this.shared&&!d&&1<a.length&&k?k.chartY-g:d?e.plotHeight-l:m]);return f(b,Math.round)},getPosition:function(a,g,b){var e=this.chart,
d=this.distance,k={},n=b.h||0,f,l=["y",e.chartHeight,g,b.plotY+e.plotTop,e.plotTop,e.plotTop+e.plotHeight],c=["x",e.chartWidth,a,b.plotX+e.plotLeft,e.plotLeft,e.plotLeft+e.plotWidth],m=!this.followPointer&&r(b.ttBelow,!e.inverted===!!b.negative),q=function(a,b,c,e,p,q){var h=c<e-d,g=e+d+c<b,f=e-d-c;e+=d;if(m&&g)k[a]=e;else if(!m&&h)k[a]=f;else if(h)k[a]=Math.min(q-c,0>f-n?f:f-n);else if(g)k[a]=Math.max(p,e+n+c>b?e:e+n);else return!1},B=function(a,b,c,e){var h;e<d||e>b-d?h=!1:k[a]=e<c/2?1:e>b-c/2?
b-c-2:e-c/2;return h},t=function(a){var b=l;l=c;c=b;f=a},p=function(){!1!==q.apply(0,l)?!1!==B.apply(0,c)||f||(t(!0),p()):f?k.x=k.y=0:(t(!0),p())};(e.inverted||1<this.len)&&t();p();return k},defaultFormatter:function(a){var d=this.points||u(this),b;b=[a.tooltipFooterHeaderFormatter(d[0])];b=b.concat(a.bodyFormatter(d));b.push(a.tooltipFooterHeaderFormatter(d[0],!0));return b},refresh:function(a,g){var b,e=this.options,d,k=a,n,f={},l=[];b=e.formatter||this.defaultFormatter;var f=this.shared,c;e.enabled&&
(clearTimeout(this.hideTimer),this.followPointer=u(k)[0].series.tooltipOptions.followPointer,n=this.getAnchor(k,g),g=n[0],d=n[1],!f||k.series&&k.series.noSharedTooltip?f=k.getLabelConfig():(A(k,function(a){a.setState("hover");l.push(a.getLabelConfig())}),f={x:k[0].category,y:k[0].y},f.points=l,k=k[0]),this.len=l.length,f=b.call(f,this),c=k.series,this.distance=r(c.tooltipOptions.distance,16),!1===f?this.hide():(b=this.getLabel(),this.isHidden&&b.attr({opacity:1}).show(),this.split?this.renderSplit(f,
a):(e.style.width||b.css({width:this.chart.spacingBox.width}),b.attr({text:f&&f.join?f.join(""):f}),b.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-"+r(k.colorIndex,c.colorIndex)),b.attr({stroke:e.borderColor||k.color||c.color||"#666666"}),this.updatePosition({plotX:g,plotY:d,negative:k.negative,ttBelow:k.ttBelow,h:n[2]||0})),this.isHidden=!1))},renderSplit:function(d,k){var b=this,e=[],g=this.chart,f=g.renderer,n=!0,l=this.options,m=0,c=this.getLabel();A(d.slice(0,k.length+1),
function(a,d){if(!1!==a){d=k[d-1]||{isHeader:!0,plotX:k[0].plotX};var q=d.series||b,v=q.tt,p=d.series||{},z="highcharts-color-"+r(d.colorIndex,p.colorIndex,"none");v||(q.tt=v=f.label(null,null,null,"callout").addClass("highcharts-tooltip-box "+z).attr({padding:l.padding,r:l.borderRadius,fill:l.backgroundColor,stroke:l.borderColor||d.color||p.color||"#333333","stroke-width":l.borderWidth}).add(c));v.isActive=!0;v.attr({text:a});v.css(l.style).shadow(l.shadow);a=v.getBBox();p=a.width+v.strokeWidth();
d.isHeader?(m=a.height,p=Math.max(0,Math.min(d.plotX+g.plotLeft-p/2,g.chartWidth-p))):p=d.plotX+g.plotLeft-r(l.distance,16)-p;0>p&&(n=!1);a=(d.series&&d.series.yAxis&&d.series.yAxis.pos)+(d.plotY||0);a-=g.plotTop;e.push({target:d.isHeader?g.plotHeight+m:a,rank:d.isHeader?1:0,size:q.tt.getBBox().height+1,point:d,x:p,tt:v})}});this.cleanSplit();a.distribute(e,g.plotHeight+m);A(e,function(a){var b=a.point,c=b.series;a.tt.attr({visibility:void 0===a.pos?"hidden":"inherit",x:n||b.isHeader?a.x:b.plotX+
g.plotLeft+r(l.distance,16),y:a.pos+g.plotTop,anchorX:b.isHeader?b.plotX+g.plotLeft:b.plotX+c.xAxis.pos,anchorY:b.isHeader?a.pos+g.plotTop-15:b.plotY+c.yAxis.pos})})},updatePosition:function(a){var d=this.chart,b=this.getLabel(),b=(this.options.positioner||this.getPosition).call(this,b.width,b.height,a);this.move(Math.round(b.x),Math.round(b.y||0),a.plotX+d.plotLeft,a.plotY+d.plotTop)},getDateFormat:function(a,k,b,e){var d=C("%m-%d %H:%M:%S.%L",k),f,n,l={millisecond:15,second:12,minute:9,hour:6,day:3},
m="millisecond";for(n in g){if(a===g.week&&+C("%w",k)===b&&"00:00:00.000"===d.substr(6)){n="week";break}if(g[n]>a){n=m;break}if(l[n]&&d.substr(l[n])!=="01-01 00:00:00.000".substr(l[n]))break;"week"!==n&&(m=n)}n&&(f=e[n]);return f},getXDateFormat:function(a,g,b){g=g.dateTimeLabelFormats;var e=b&&b.closestPointRange;return(e?this.getDateFormat(e,a.x,b.options.startOfWeek,g):g.day)||g.year},tooltipFooterHeaderFormatter:function(a,g){var b=g?"footer":"header";g=a.series;var e=g.tooltipOptions,d=e.xDateFormat,
k=g.xAxis,n=k&&"datetime"===k.options.type&&m(a.key),b=e[b+"Format"];n&&!d&&(d=this.getXDateFormat(a,e,k));n&&d&&(b=b.replace("{point.key}","{point.key:"+d+"}"));return E(b,{point:a,series:g})},bodyFormatter:function(a){return f(a,function(a){var b=a.series.tooltipOptions;return(b.pointFormatter||a.point.tooltipFormatter).call(a.point,b.pointFormat)})}}})(M);(function(a){var C=a.addEvent,A=a.attr,F=a.charts,E=a.color,m=a.css,f=a.defined,l=a.each,r=a.extend,u=a.find,t=a.fireEvent,g=a.isObject,d=a.offset,
k=a.pick,b=a.removeEvent,e=a.splat,v=a.Tooltip,y=a.win;a.Pointer=function(a,b){this.init(a,b)};a.Pointer.prototype={init:function(a,b){this.options=b;this.chart=a;this.runChartClick=b.chart.events&&!!b.chart.events.click;this.pinchDown=[];this.lastValidTouch={};v&&(a.tooltip=new v(a,b.tooltip),this.followTouchMove=k(b.tooltip.followTouchMove,!0));this.setDOMEvents()},zoomOption:function(a){var b=this.chart,e=b.options.chart,c=e.zoomType||"",b=b.inverted;/touch/.test(a.type)&&(c=k(e.pinchType,c));
this.zoomX=a=/x/.test(c);this.zoomY=c=/y/.test(c);this.zoomHor=a&&!b||c&&b;this.zoomVert=c&&!b||a&&b;this.hasZoom=a||c},normalize:function(a,b){var e,c;a=a||y.event;a.target||(a.target=a.srcElement);c=a.touches?a.touches.length?a.touches.item(0):a.changedTouches[0]:a;b||(this.chartPosition=b=d(this.chart.container));void 0===c.pageX?(e=Math.max(a.x,a.clientX-b.left),b=a.y):(e=c.pageX-b.left,b=c.pageY-b.top);return r(a,{chartX:Math.round(e),chartY:Math.round(b)})},getCoordinates:function(a){var b=
{xAxis:[],yAxis:[]};l(this.chart.axes,function(e){b[e.isXAxis?"xAxis":"yAxis"].push({axis:e,value:e.toValue(a[e.horiz?"chartX":"chartY"])})});return b},findNearestKDPoint:function(a,b,e){var c;l(a,function(a){var d=!(a.noSharedTooltip&&b)&&0>a.options.findNearestPointBy.indexOf("y");a=a.searchPoint(e,d);if((d=g(a,!0))&&!(d=!g(c,!0)))var d=c.distX-a.distX,n=c.dist-a.dist,k=(a.series.group&&a.series.group.zIndex)-(c.series.group&&c.series.group.zIndex),d=0<(0!==d&&b?d:0!==n?n:0!==k?k:c.series.index>
a.series.index?-1:1);d&&(c=a)});return c},getPointFromEvent:function(a){a=a.target;for(var b;a&&!b;)b=a.point,a=a.parentNode;return b},getChartCoordinatesFromPoint:function(a,b){var e=a.series,c=e.xAxis,e=e.yAxis;if(c&&e)return b?{chartX:c.len+c.pos-a.clientX,chartY:e.len+e.pos-a.plotY}:{chartX:a.clientX+c.pos,chartY:a.plotY+e.pos}},getHoverData:function(b,e,d,c,f,q){var n,v=[];c=!(!c||!b);var p=e&&!e.stickyTracking?[e]:a.grep(d,function(a){return a.visible&&!(!f&&a.directTouch)&&k(a.options.enableMouseTracking,
!0)&&a.stickyTracking});e=(n=c?b:this.findNearestKDPoint(p,f,q))&&n.series;n&&(f&&!e.noSharedTooltip?(p=a.grep(d,function(a){return a.visible&&!(!f&&a.directTouch)&&k(a.options.enableMouseTracking,!0)&&!a.noSharedTooltip}),l(p,function(a){a=u(a.points,function(a){return a.x===n.x});g(a)&&!a.isNull&&v.push(a)})):v.push(n));return{hoverPoint:n,hoverSeries:e,hoverPoints:v}},runPointActions:function(b,e){var d=this.chart,c=d.tooltip,g=c?c.shared:!1,n=e||d.hoverPoint,f=n&&n.series||d.hoverSeries,f=this.getHoverData(n,
f,d.series,!!e||f&&f.directTouch&&this.isDirectTouch,g,b),v,n=f.hoverPoint;v=f.hoverPoints;e=(f=f.hoverSeries)&&f.tooltipOptions.followPointer;g=g&&f&&!f.noSharedTooltip;if(n&&(n!==d.hoverPoint||c&&c.isHidden)){l(d.hoverPoints||[],function(b){-1===a.inArray(b,v)&&b.setState()});l(v||[],function(a){a.setState("hover")});if(d.hoverSeries!==f)f.onMouseOver();d.hoverPoint&&d.hoverPoint.firePointEvent("mouseOut");n.firePointEvent("mouseOver");d.hoverPoints=v;d.hoverPoint=n;c&&c.refresh(g?v:n,b)}else e&&
c&&!c.isHidden&&(n=c.getAnchor([{}],b),c.updatePosition({plotX:n[0],plotY:n[1]}));this.unDocMouseMove||(this.unDocMouseMove=C(d.container.ownerDocument,"mousemove",function(b){var c=F[a.hoverChartIndex];if(c)c.pointer.onDocumentMouseMove(b)}));l(d.axes,function(c){var e=k(c.crosshair.snap,!0),p=e?a.find(v,function(a){return a.series[c.coll]===c}):void 0;p||!e?c.drawCrosshair(b,p):c.hideCrosshair()})},reset:function(a,b){var d=this.chart,c=d.hoverSeries,g=d.hoverPoint,n=d.hoverPoints,f=d.tooltip,k=
f&&f.shared?n:g;a&&k&&l(e(k),function(b){b.series.isCartesian&&void 0===b.plotX&&(a=!1)});if(a)f&&k&&(f.refresh(k),g&&(g.setState(g.state,!0),l(d.axes,function(a){a.crosshair&&a.drawCrosshair(null,g)})));else{if(g)g.onMouseOut();n&&l(n,function(a){a.setState()});if(c)c.onMouseOut();f&&f.hide(b);this.unDocMouseMove&&(this.unDocMouseMove=this.unDocMouseMove());l(d.axes,function(a){a.hideCrosshair()});this.hoverX=d.hoverPoints=d.hoverPoint=null}},scaleGroups:function(a,b){var e=this.chart,c;l(e.series,
function(d){c=a||d.getPlotBox();d.xAxis&&d.xAxis.zoomEnabled&&d.group&&(d.group.attr(c),d.markerGroup&&(d.markerGroup.attr(c),d.markerGroup.clip(b?e.clipRect:null)),d.dataLabelsGroup&&d.dataLabelsGroup.attr(c))});e.clipRect.attr(b||e.clipBox)},dragStart:function(a){var b=this.chart;b.mouseIsDown=a.type;b.cancelClick=!1;b.mouseDownX=this.mouseDownX=a.chartX;b.mouseDownY=this.mouseDownY=a.chartY},drag:function(a){var b=this.chart,e=b.options.chart,c=a.chartX,d=a.chartY,g=this.zoomHor,n=this.zoomVert,
f=b.plotLeft,p=b.plotTop,k=b.plotWidth,v=b.plotHeight,l,h=this.selectionMarker,w=this.mouseDownX,m=this.mouseDownY,r=e.panKey&&a[e.panKey+"Key"];h&&h.touch||(c<f?c=f:c>f+k&&(c=f+k),d<p?d=p:d>p+v&&(d=p+v),this.hasDragged=Math.sqrt(Math.pow(w-c,2)+Math.pow(m-d,2)),10<this.hasDragged&&(l=b.isInsidePlot(w-f,m-p),b.hasCartesianSeries&&(this.zoomX||this.zoomY)&&l&&!r&&!h&&(this.selectionMarker=h=b.renderer.rect(f,p,g?1:k,n?1:v,0).attr({fill:e.selectionMarkerFill||E("#335cad").setOpacity(.25).get(),"class":"highcharts-selection-marker",
zIndex:7}).add()),h&&g&&(c-=w,h.attr({width:Math.abs(c),x:(0<c?0:c)+w})),h&&n&&(c=d-m,h.attr({height:Math.abs(c),y:(0<c?0:c)+m})),l&&!h&&e.panning&&b.pan(a,e.panning)))},drop:function(a){var b=this,e=this.chart,c=this.hasPinched;if(this.selectionMarker){var d={originalEvent:a,xAxis:[],yAxis:[]},g=this.selectionMarker,n=g.attr?g.attr("x"):g.x,k=g.attr?g.attr("y"):g.y,p=g.attr?g.attr("width"):g.width,v=g.attr?g.attr("height"):g.height,I;if(this.hasDragged||c)l(e.axes,function(e){if(e.zoomEnabled&&f(e.min)&&
(c||b[{xAxis:"zoomX",yAxis:"zoomY"}[e.coll]])){var h=e.horiz,g="touchend"===a.type?e.minPixelPadding:0,q=e.toValue((h?n:k)+g),h=e.toValue((h?n+p:k+v)-g);d[e.coll].push({axis:e,min:Math.min(q,h),max:Math.max(q,h)});I=!0}}),I&&t(e,"selection",d,function(a){e.zoom(r(a,c?{animation:!1}:null))});this.selectionMarker=this.selectionMarker.destroy();c&&this.scaleGroups()}e&&(m(e.container,{cursor:e._cursor}),e.cancelClick=10<this.hasDragged,e.mouseIsDown=this.hasDragged=this.hasPinched=!1,this.pinchDown=
[])},onContainerMouseDown:function(a){a=this.normalize(a);this.zoomOption(a);a.preventDefault&&a.preventDefault();this.dragStart(a)},onDocumentMouseUp:function(b){F[a.hoverChartIndex]&&F[a.hoverChartIndex].pointer.drop(b)},onDocumentMouseMove:function(a){var b=this.chart,e=this.chartPosition;a=this.normalize(a,e);!e||this.inClass(a.target,"highcharts-tracker")||b.isInsidePlot(a.chartX-b.plotLeft,a.chartY-b.plotTop)||this.reset()},onContainerMouseLeave:function(b){var e=F[a.hoverChartIndex];e&&(b.relatedTarget||
b.toElement)&&(e.pointer.reset(),e.pointer.chartPosition=null)},onContainerMouseMove:function(b){var e=this.chart;f(a.hoverChartIndex)&&F[a.hoverChartIndex]&&F[a.hoverChartIndex].mouseIsDown||(a.hoverChartIndex=e.index);b=this.normalize(b);b.returnValue=!1;"mousedown"===e.mouseIsDown&&this.drag(b);!this.inClass(b.target,"highcharts-tracker")&&!e.isInsidePlot(b.chartX-e.plotLeft,b.chartY-e.plotTop)||e.openMenu||this.runPointActions(b)},inClass:function(a,b){for(var e;a;){if(e=A(a,"class")){if(-1!==
e.indexOf(b))return!0;if(-1!==e.indexOf("highcharts-container"))return!1}a=a.parentNode}},onTrackerMouseOut:function(a){var b=this.chart.hoverSeries;a=a.relatedTarget||a.toElement;this.isDirectTouch=!1;if(!(!b||!a||b.stickyTracking||this.inClass(a,"highcharts-tooltip")||this.inClass(a,"highcharts-series-"+b.index)&&this.inClass(a,"highcharts-tracker")))b.onMouseOut()},onContainerClick:function(a){var b=this.chart,e=b.hoverPoint,c=b.plotLeft,d=b.plotTop;a=this.normalize(a);b.cancelClick||(e&&this.inClass(a.target,
"highcharts-tracker")?(t(e.series,"click",r(a,{point:e})),b.hoverPoint&&e.firePointEvent("click",a)):(r(a,this.getCoordinates(a)),b.isInsidePlot(a.chartX-c,a.chartY-d)&&t(b,"click",a)))},setDOMEvents:function(){var b=this,e=b.chart.container,d=e.ownerDocument;e.onmousedown=function(a){b.onContainerMouseDown(a)};e.onmousemove=function(a){b.onContainerMouseMove(a)};e.onclick=function(a){b.onContainerClick(a)};C(e,"mouseleave",b.onContainerMouseLeave);1===a.chartCount&&C(d,"mouseup",b.onDocumentMouseUp);
a.hasTouch&&(e.ontouchstart=function(a){b.onContainerTouchStart(a)},e.ontouchmove=function(a){b.onContainerTouchMove(a)},1===a.chartCount&&C(d,"touchend",b.onDocumentTouchEnd))},destroy:function(){var e=this,d=this.chart.container.ownerDocument;e.unDocMouseMove&&e.unDocMouseMove();b(e.chart.container,"mouseleave",e.onContainerMouseLeave);a.chartCount||(b(d,"mouseup",e.onDocumentMouseUp),a.hasTouch&&b(d,"touchend",e.onDocumentTouchEnd));clearInterval(e.tooltipTimeout);a.objectEach(e,function(a,b){e[b]=
null})}}})(M);(function(a){var C=a.charts,A=a.each,F=a.extend,E=a.map,m=a.noop,f=a.pick;F(a.Pointer.prototype,{pinchTranslate:function(a,f,m,t,g,d){this.zoomHor&&this.pinchTranslateDirection(!0,a,f,m,t,g,d);this.zoomVert&&this.pinchTranslateDirection(!1,a,f,m,t,g,d)},pinchTranslateDirection:function(a,f,m,t,g,d,k,b){var e=this.chart,v=a?"x":"y",l=a?"X":"Y",n="chart"+l,r=a?"width":"height",u=e["plot"+(a?"Left":"Top")],c,G,q=b||1,B=e.inverted,K=e.bounds[a?"h":"v"],p=1===f.length,z=f[0][n],I=m[0][n],
L=!p&&f[1][n],h=!p&&m[1][n],w;m=function(){!p&&20<Math.abs(z-L)&&(q=b||Math.abs(I-h)/Math.abs(z-L));G=(u-I)/q+z;c=e["plot"+(a?"Width":"Height")]/q};m();f=G;f<K.min?(f=K.min,w=!0):f+c>K.max&&(f=K.max-c,w=!0);w?(I-=.8*(I-k[v][0]),p||(h-=.8*(h-k[v][1])),m()):k[v]=[I,h];B||(d[v]=G-u,d[r]=c);d=B?1/q:q;g[r]=c;g[v]=f;t[B?a?"scaleY":"scaleX":"scale"+l]=q;t["translate"+l]=d*u+(I-d*z)},pinch:function(a){var l=this,u=l.chart,t=l.pinchDown,g=a.touches,d=g.length,k=l.lastValidTouch,b=l.hasZoom,e=l.selectionMarker,
v={},y=1===d&&(l.inClass(a.target,"highcharts-tracker")&&u.runTrackerClick||l.runChartClick),n={};1<d&&(l.initiated=!0);b&&l.initiated&&!y&&a.preventDefault();E(g,function(a){return l.normalize(a)});"touchstart"===a.type?(A(g,function(a,b){t[b]={chartX:a.chartX,chartY:a.chartY}}),k.x=[t[0].chartX,t[1]&&t[1].chartX],k.y=[t[0].chartY,t[1]&&t[1].chartY],A(u.axes,function(a){if(a.zoomEnabled){var b=u.bounds[a.horiz?"h":"v"],e=a.minPixelPadding,d=a.toPixels(f(a.options.min,a.dataMin)),g=a.toPixels(f(a.options.max,
a.dataMax)),k=Math.max(d,g);b.min=Math.min(a.pos,Math.min(d,g)-e);b.max=Math.max(a.pos+a.len,k+e)}}),l.res=!0):l.followTouchMove&&1===d?this.runPointActions(l.normalize(a)):t.length&&(e||(l.selectionMarker=e=F({destroy:m,touch:!0},u.plotBox)),l.pinchTranslate(t,g,v,e,n,k),l.hasPinched=b,l.scaleGroups(v,n),l.res&&(l.res=!1,this.reset(!1,0)))},touch:function(l,m){var r=this.chart,t,g;if(r.index!==a.hoverChartIndex)this.onContainerMouseLeave({relatedTarget:!0});a.hoverChartIndex=r.index;1===l.touches.length?
(l=this.normalize(l),(g=r.isInsidePlot(l.chartX-r.plotLeft,l.chartY-r.plotTop))&&!r.openMenu?(m&&this.runPointActions(l),"touchmove"===l.type&&(m=this.pinchDown,t=m[0]?4<=Math.sqrt(Math.pow(m[0].chartX-l.chartX,2)+Math.pow(m[0].chartY-l.chartY,2)):!1),f(t,!0)&&this.pinch(l)):m&&this.reset()):2===l.touches.length&&this.pinch(l)},onContainerTouchStart:function(a){this.zoomOption(a);this.touch(a,!0)},onContainerTouchMove:function(a){this.touch(a)},onDocumentTouchEnd:function(f){C[a.hoverChartIndex]&&
C[a.hoverChartIndex].pointer.drop(f)}})})(M);(function(a){var C=a.addEvent,A=a.charts,F=a.css,E=a.doc,m=a.extend,f=a.noop,l=a.Pointer,r=a.removeEvent,u=a.win,t=a.wrap;if(!a.hasTouch&&(u.PointerEvent||u.MSPointerEvent)){var g={},d=!!u.PointerEvent,k=function(){var b=[];b.item=function(a){return this[a]};a.objectEach(g,function(a){b.push({pageX:a.pageX,pageY:a.pageY,target:a.target})});return b},b=function(b,d,g,n){"touch"!==b.pointerType&&b.pointerType!==b.MSPOINTER_TYPE_TOUCH||!A[a.hoverChartIndex]||
(n(b),n=A[a.hoverChartIndex].pointer,n[d]({type:g,target:b.currentTarget,preventDefault:f,touches:k()}))};m(l.prototype,{onContainerPointerDown:function(a){b(a,"onContainerTouchStart","touchstart",function(a){g[a.pointerId]={pageX:a.pageX,pageY:a.pageY,target:a.currentTarget}})},onContainerPointerMove:function(a){b(a,"onContainerTouchMove","touchmove",function(a){g[a.pointerId]={pageX:a.pageX,pageY:a.pageY};g[a.pointerId].target||(g[a.pointerId].target=a.currentTarget)})},onDocumentPointerUp:function(a){b(a,
"onDocumentTouchEnd","touchend",function(a){delete g[a.pointerId]})},batchMSEvents:function(a){a(this.chart.container,d?"pointerdown":"MSPointerDown",this.onContainerPointerDown);a(this.chart.container,d?"pointermove":"MSPointerMove",this.onContainerPointerMove);a(E,d?"pointerup":"MSPointerUp",this.onDocumentPointerUp)}});t(l.prototype,"init",function(a,b,d){a.call(this,b,d);this.hasZoom&&F(b.container,{"-ms-touch-action":"none","touch-action":"none"})});t(l.prototype,"setDOMEvents",function(a){a.apply(this);
(this.hasZoom||this.followTouchMove)&&this.batchMSEvents(C)});t(l.prototype,"destroy",function(a){this.batchMSEvents(r);a.call(this)})}})(M);(function(a){var C=a.addEvent,A=a.css,F=a.discardElement,E=a.defined,m=a.each,f=a.isFirefox,l=a.marginNames,r=a.merge,u=a.pick,t=a.setAnimation,g=a.stableSort,d=a.win,k=a.wrap;a.Legend=function(a,e){this.init(a,e)};a.Legend.prototype={init:function(a,e){this.chart=a;this.setOptions(e);e.enabled&&(this.render(),C(this.chart,"endResize",function(){this.legend.positionCheckboxes()}))},
setOptions:function(a){var b=u(a.padding,8);this.options=a;this.itemStyle=a.itemStyle;this.itemHiddenStyle=r(this.itemStyle,a.itemHiddenStyle);this.itemMarginTop=a.itemMarginTop||0;this.padding=b;this.initialItemY=b-5;this.itemHeight=this.maxItemWidth=0;this.symbolWidth=u(a.symbolWidth,16);this.pages=[]},update:function(a,e){var b=this.chart;this.setOptions(r(!0,this.options,a));this.destroy();b.isDirtyLegend=b.isDirtyBox=!0;u(e,!0)&&b.redraw()},colorizeItem:function(a,e){a.legendGroup[e?"removeClass":
"addClass"]("highcharts-legend-item-hidden");var b=this.options,d=a.legendItem,g=a.legendLine,f=a.legendSymbol,k=this.itemHiddenStyle.color,b=e?b.itemStyle.color:k,c=e?a.color||k:k,l=a.options&&a.options.marker,q={fill:c};d&&d.css({fill:b,color:b});g&&g.attr({stroke:c});f&&(l&&f.isMarker&&(q=a.pointAttribs(),e||(q.stroke=q.fill=k)),f.attr(q))},positionItem:function(a){var b=this.options,d=b.symbolPadding,b=!b.rtl,g=a._legendItemPos,f=g[0],g=g[1],k=a.checkbox;(a=a.legendGroup)&&a.element&&a.translate(b?
f:this.legendWidth-f-2*d-4,g);k&&(k.x=f,k.y=g)},destroyItem:function(a){var b=a.checkbox;m(["legendItem","legendLine","legendSymbol","legendGroup"],function(b){a[b]&&(a[b]=a[b].destroy())});b&&F(a.checkbox)},destroy:function(){function a(a){this[a]&&(this[a]=this[a].destroy())}m(this.getAllItems(),function(b){m(["legendItem","legendGroup"],a,b)});m("clipRect up down pager nav box title group".split(" "),a,this);this.display=null},positionCheckboxes:function(a){var b=this.group&&this.group.alignAttr,
d,g=this.clipHeight||this.legendHeight,f=this.titleHeight;b&&(d=b.translateY,m(this.allItems,function(e){var k=e.checkbox,c;k&&(c=d+f+k.y+(a||0)+3,A(k,{left:b.translateX+e.checkboxOffset+k.x-20+"px",top:c+"px",display:c>d-6&&c<d+g-6?"":"none"}))}))},renderTitle:function(){var a=this.options,e=this.padding,d=a.title,g=0;d.text&&(this.title||(this.title=this.chart.renderer.label(d.text,e-3,e-4,null,null,null,a.useHTML,null,"legend-title").attr({zIndex:1}).css(d.style).add(this.group)),a=this.title.getBBox(),
g=a.height,this.offsetWidth=a.width,this.contentGroup.attr({translateY:g}));this.titleHeight=g},setText:function(b){var e=this.options;b.legendItem.attr({text:e.labelFormat?a.format(e.labelFormat,b):e.labelFormatter.call(b)})},renderItem:function(a){var b=this.chart,d=b.renderer,g=this.options,f="horizontal"===g.layout,k=this.symbolWidth,l=g.symbolPadding,c=this.itemStyle,m=this.itemHiddenStyle,q=this.padding,B=f?u(g.itemDistance,20):0,t=!g.rtl,p=g.width,z=g.itemMarginBottom||0,I=this.itemMarginTop,
L=a.legendItem,h=!a.series,w=!h&&a.series.drawLegendSymbol?a.series:a,P=w.options,H=this.createCheckboxForItem&&P&&P.showCheckbox,P=k+l+B+(H?20:0),O=g.useHTML,A=a.options.className;L||(a.legendGroup=d.g("legend-item").addClass("highcharts-"+w.type+"-series highcharts-color-"+a.colorIndex+(A?" "+A:"")+(h?" highcharts-series-"+a.index:"")).attr({zIndex:1}).add(this.scrollGroup),a.legendItem=L=d.text("",t?k+l:-l,this.baseline||0,O).css(r(a.visible?c:m)).attr({align:t?"left":"right",zIndex:2}).add(a.legendGroup),
this.baseline||(k=c.fontSize,this.fontMetrics=d.fontMetrics(k,L),this.baseline=this.fontMetrics.f+3+I,L.attr("y",this.baseline)),this.symbolHeight=g.symbolHeight||this.fontMetrics.f,w.drawLegendSymbol(this,a),this.setItemEvents&&this.setItemEvents(a,L,O),H&&this.createCheckboxForItem(a));this.colorizeItem(a,a.visible);c.width||L.css({width:(g.itemWidth||g.width||b.spacingBox.width)-P});this.setText(a);d=L.getBBox();c=a.checkboxOffset=g.itemWidth||a.legendItemWidth||d.width+P;this.itemHeight=d=Math.round(a.legendItemHeight||
d.height||this.symbolHeight);f&&this.itemX-q+c>(p||b.spacingBox.width-2*q-g.x)&&(this.itemX=q,this.itemY+=I+this.lastLineHeight+z,this.lastLineHeight=0);this.maxItemWidth=Math.max(this.maxItemWidth,c);this.lastItemY=I+this.itemY+z;this.lastLineHeight=Math.max(d,this.lastLineHeight);a._legendItemPos=[this.itemX,this.itemY];f?this.itemX+=c:(this.itemY+=I+d+z,this.lastLineHeight=d);this.offsetWidth=p||Math.max((f?this.itemX-q-(a.checkbox?0:B):c)+q,this.offsetWidth)},getAllItems:function(){var a=[];m(this.chart.series,
function(b){var e=b&&b.options;b&&u(e.showInLegend,E(e.linkedTo)?!1:void 0,!0)&&(a=a.concat(b.legendItems||("point"===e.legendType?b.data:b)))});return a},adjustMargins:function(a,e){var b=this.chart,d=this.options,g=d.align.charAt(0)+d.verticalAlign.charAt(0)+d.layout.charAt(0);d.floating||m([/(lth|ct|rth)/,/(rtv|rm|rbv)/,/(rbh|cb|lbh)/,/(lbv|lm|ltv)/],function(f,k){f.test(g)&&!E(a[k])&&(b[l[k]]=Math.max(b[l[k]],b.legend[(k+1)%2?"legendHeight":"legendWidth"]+[1,-1,-1,1][k]*d[k%2?"x":"y"]+u(d.margin,
12)+e[k]))})},render:function(){var a=this,e=a.chart,d=e.renderer,f=a.group,k,l,t,c,u=a.box,q=a.options,B=a.padding;a.itemX=B;a.itemY=a.initialItemY;a.offsetWidth=0;a.lastItemY=0;f||(a.group=f=d.g("legend").attr({zIndex:7}).add(),a.contentGroup=d.g().attr({zIndex:1}).add(f),a.scrollGroup=d.g().add(a.contentGroup));a.renderTitle();k=a.getAllItems();g(k,function(a,b){return(a.options&&a.options.legendIndex||0)-(b.options&&b.options.legendIndex||0)});q.reversed&&k.reverse();a.allItems=k;a.display=l=
!!k.length;a.lastLineHeight=0;m(k,function(b){a.renderItem(b)});t=(q.width||a.offsetWidth)+B;c=a.lastItemY+a.lastLineHeight+a.titleHeight;c=a.handleOverflow(c);c+=B;u||(a.box=u=d.rect().addClass("highcharts-legend-box").attr({r:q.borderRadius}).add(f),u.isNew=!0);u.attr({stroke:q.borderColor,"stroke-width":q.borderWidth||0,fill:q.backgroundColor||"none"}).shadow(q.shadow);0<t&&0<c&&(u[u.isNew?"attr":"animate"](u.crisp({x:0,y:0,width:t,height:c},u.strokeWidth())),u.isNew=!1);u[l?"show":"hide"]();a.legendWidth=
t;a.legendHeight=c;m(k,function(b){a.positionItem(b)});l&&f.align(r(q,{width:t,height:c}),!0,"spacingBox");e.isResizing||this.positionCheckboxes()},handleOverflow:function(a){var b=this,d=this.chart,g=d.renderer,f=this.options,k=f.y,l=this.padding,d=d.spacingBox.height+("top"===f.verticalAlign?-k:k)-l,k=f.maxHeight,c,r=this.clipRect,q=f.navigation,B=u(q.animation,!0),t=q.arrowSize||12,p=this.nav,z=this.pages,I,L=this.allItems,h=function(a){"number"===typeof a?r.attr({height:a}):r&&(b.clipRect=r.destroy(),
b.contentGroup.clip());b.contentGroup.div&&(b.contentGroup.div.style.clip=a?"rect("+l+"px,9999px,"+(l+a)+"px,0)":"auto")};"horizontal"!==f.layout||"middle"===f.verticalAlign||f.floating||(d/=2);k&&(d=Math.min(d,k));z.length=0;a>d&&!1!==q.enabled?(this.clipHeight=c=Math.max(d-20-this.titleHeight-l,0),this.currentPage=u(this.currentPage,1),this.fullHeight=a,m(L,function(a,b){var e=a._legendItemPos[1];a=Math.round(a.legendItem.getBBox().height);var d=z.length;if(!d||e-z[d-1]>c&&(I||e)!==z[d-1])z.push(I||
e),d++;b===L.length-1&&e+a-z[d-1]>c&&z.push(e);e!==I&&(I=e)}),r||(r=b.clipRect=g.clipRect(0,l,9999,0),b.contentGroup.clip(r)),h(c),p||(this.nav=p=g.g().attr({zIndex:1}).add(this.group),this.up=g.symbol("triangle",0,0,t,t).on("click",function(){b.scroll(-1,B)}).add(p),this.pager=g.text("",15,10).addClass("highcharts-legend-navigation").css(q.style).add(p),this.down=g.symbol("triangle-down",0,0,t,t).on("click",function(){b.scroll(1,B)}).add(p)),b.scroll(0),a=d):p&&(h(),this.nav=p.destroy(),this.scrollGroup.attr({translateY:1}),
this.clipHeight=0);return a},scroll:function(a,e){var b=this.pages,d=b.length;a=this.currentPage+a;var g=this.clipHeight,f=this.options.navigation,k=this.pager,c=this.padding;a>d&&(a=d);0<a&&(void 0!==e&&t(e,this.chart),this.nav.attr({translateX:c,translateY:g+this.padding+7+this.titleHeight,visibility:"visible"}),this.up.attr({"class":1===a?"highcharts-legend-nav-inactive":"highcharts-legend-nav-active"}),k.attr({text:a+"/"+d}),this.down.attr({x:18+this.pager.getBBox().width,"class":a===d?"highcharts-legend-nav-inactive":
"highcharts-legend-nav-active"}),this.up.attr({fill:1===a?f.inactiveColor:f.activeColor}).css({cursor:1===a?"default":"pointer"}),this.down.attr({fill:a===d?f.inactiveColor:f.activeColor}).css({cursor:a===d?"default":"pointer"}),e=-b[a-1]+this.initialItemY,this.scrollGroup.animate({translateY:e}),this.currentPage=a,this.positionCheckboxes(e))}};a.LegendSymbolMixin={drawRectangle:function(a,e){var b=a.symbolHeight,d=a.options.squareSymbol;e.legendSymbol=this.chart.renderer.rect(d?(a.symbolWidth-b)/
2:0,a.baseline-b+1,d?b:a.symbolWidth,b,u(a.options.symbolRadius,b/2)).addClass("highcharts-point").attr({zIndex:3}).add(e.legendGroup)},drawLineMarker:function(a){var b=this.options,d=b.marker,g=a.symbolWidth,f=a.symbolHeight,k=f/2,l=this.chart.renderer,c=this.legendGroup;a=a.baseline-Math.round(.3*a.fontMetrics.b);var m;m={"stroke-width":b.lineWidth||0};b.dashStyle&&(m.dashstyle=b.dashStyle);this.legendLine=l.path(["M",0,a,"L",g,a]).addClass("highcharts-graph").attr(m).add(c);d&&!1!==d.enabled&&
(b=Math.min(u(d.radius,k),k),0===this.symbol.indexOf("url")&&(d=r(d,{width:f,height:f}),b=0),this.legendSymbol=d=l.symbol(this.symbol,g/2-b,a-b,2*b,2*b,d).addClass("highcharts-point").add(c),d.isMarker=!0)}};(/Trident\/7\.0/.test(d.navigator.userAgent)||f)&&k(a.Legend.prototype,"positionItem",function(a,e){var b=this,d=function(){e._legendItemPos&&a.call(b,e)};d();setTimeout(d)})})(M);(function(a){var C=a.addEvent,A=a.animate,F=a.animObject,E=a.attr,m=a.doc,f=a.Axis,l=a.createElement,r=a.defaultOptions,
u=a.discardElement,t=a.charts,g=a.css,d=a.defined,k=a.each,b=a.extend,e=a.find,v=a.fireEvent,y=a.getStyle,n=a.grep,D=a.isNumber,J=a.isObject,c=a.isString,G=a.Legend,q=a.marginNames,B=a.merge,K=a.objectEach,p=a.Pointer,z=a.pick,I=a.pInt,L=a.removeEvent,h=a.seriesTypes,w=a.splat,P=a.svg,H=a.syncTimeout,O=a.win,Q=a.Renderer,R=a.Chart=function(){this.getArgs.apply(this,arguments)};a.chart=function(a,b,c){return new R(a,b,c)};b(R.prototype,{callbacks:[],getArgs:function(){var a=[].slice.call(arguments);
if(c(a[0])||a[0].nodeName)this.renderTo=a.shift();this.init(a[0],a[1])},init:function(b,c){var e,d,h=b.series,p=b.plotOptions||{};b.series=null;e=B(r,b);for(d in e.plotOptions)e.plotOptions[d].tooltip=p[d]&&B(p[d].tooltip)||void 0;e.tooltip.userOptions=b.chart&&b.chart.forExport&&b.tooltip.userOptions||b.tooltip;e.series=b.series=h;this.userOptions=b;b=e.chart;d=b.events;this.margin=[];this.spacing=[];this.bounds={h:{},v:{}};this.callback=c;this.isResizing=0;this.options=e;this.axes=[];this.series=
[];this.hasCartesianSeries=b.showAxes;var g=this;g.index=t.length;t.push(g);a.chartCount++;d&&K(d,function(a,b){C(g,b,a)});g.xAxis=[];g.yAxis=[];g.pointCount=g.colorCounter=g.symbolCounter=0;g.firstRender()},initSeries:function(b){var c=this.options.chart;(c=h[b.type||c.type||c.defaultSeriesType])||a.error(17,!0);c=new c;c.init(this,b);return c},orderSeries:function(a){var b=this.series;for(a=a||0;a<b.length;a++)b[a]&&(b[a].index=a,b[a].name=b[a].name||"Series "+(b[a].index+1))},isInsidePlot:function(a,
b,c){var e=c?b:a;a=c?a:b;return 0<=e&&e<=this.plotWidth&&0<=a&&a<=this.plotHeight},redraw:function(c){var e=this.axes,d=this.series,h=this.pointer,p=this.legend,g=this.isDirtyLegend,f,q,l=this.hasCartesianSeries,n=this.isDirtyBox,z,m=this.renderer,x=m.isHidden(),w=[];this.setResponsive&&this.setResponsive(!1);a.setAnimation(c,this);x&&this.temporaryDisplay();this.layOutTitles();for(c=d.length;c--;)if(z=d[c],z.options.stacking&&(f=!0,z.isDirty)){q=!0;break}if(q)for(c=d.length;c--;)z=d[c],z.options.stacking&&
(z.isDirty=!0);k(d,function(a){a.isDirty&&"point"===a.options.legendType&&(a.updateTotals&&a.updateTotals(),g=!0);a.isDirtyData&&v(a,"updatedData")});g&&p.options.enabled&&(p.render(),this.isDirtyLegend=!1);f&&this.getStacks();l&&k(e,function(a){a.updateNames();a.setScale()});this.getMargins();l&&(k(e,function(a){a.isDirty&&(n=!0)}),k(e,function(a){var c=a.min+","+a.max;a.extKey!==c&&(a.extKey=c,w.push(function(){v(a,"afterSetExtremes",b(a.eventArgs,a.getExtremes()));delete a.eventArgs}));(n||f)&&
a.redraw()}));n&&this.drawChartBox();v(this,"predraw");k(d,function(a){(n||a.isDirty)&&a.visible&&a.redraw();a.isDirtyData=!1});h&&h.reset(!0);m.draw();v(this,"redraw");v(this,"render");x&&this.temporaryDisplay(!0);k(w,function(a){a.call()})},get:function(a){function b(b){return b.id===a||b.options&&b.options.id===a}var c,d=this.series,h;c=e(this.axes,b)||e(this.series,b);for(h=0;!c&&h<d.length;h++)c=e(d[h].points||[],b);return c},getAxes:function(){var a=this,b=this.options,c=b.xAxis=w(b.xAxis||
{}),b=b.yAxis=w(b.yAxis||{});k(c,function(a,b){a.index=b;a.isX=!0});k(b,function(a,b){a.index=b});c=c.concat(b);k(c,function(b){new f(a,b)})},getSelectedPoints:function(){var a=[];k(this.series,function(b){a=a.concat(n(b.data||[],function(a){return a.selected}))});return a},getSelectedSeries:function(){return n(this.series,function(a){return a.selected})},setTitle:function(a,b,c){var e=this,d=e.options,h;h=d.title=B({style:{color:"#333333",fontSize:d.isStock?"16px":"18px"}},d.title,a);d=d.subtitle=
B({style:{color:"#666666"}},d.subtitle,b);k([["title",a,h],["subtitle",b,d]],function(a,b){var c=a[0],d=e[c],h=a[1];a=a[2];d&&h&&(e[c]=d=d.destroy());a&&a.text&&!d&&(e[c]=e.renderer.text(a.text,0,0,a.useHTML).attr({align:a.align,"class":"highcharts-"+c,zIndex:a.zIndex||4}).add(),e[c].update=function(a){e.setTitle(!b&&a,b&&a)},e[c].css(a.style))});e.layOutTitles(c)},layOutTitles:function(a){var c=0,e,d=this.renderer,h=this.spacingBox;k(["title","subtitle"],function(a){var e=this[a],p=this.options[a];
a="title"===a?-3:p.verticalAlign?0:c+2;var g;e&&(g=p.style.fontSize,g=d.fontMetrics(g,e).b,e.css({width:(p.width||h.width+p.widthAdjust)+"px"}).align(b({y:a+g},p),!1,"spacingBox"),p.floating||p.verticalAlign||(c=Math.ceil(c+e.getBBox(p.useHTML).height)))},this);e=this.titleOffset!==c;this.titleOffset=c;!this.isDirtyBox&&e&&(this.isDirtyBox=e,this.hasRendered&&z(a,!0)&&this.isDirtyBox&&this.redraw())},getChartSize:function(){var b=this.options.chart,c=b.width,b=b.height,e=this.renderTo;d(c)||(this.containerWidth=
y(e,"width"));d(b)||(this.containerHeight=y(e,"height"));this.chartWidth=Math.max(0,c||this.containerWidth||600);this.chartHeight=Math.max(0,a.relativeLength(b,this.chartWidth)||this.containerHeight||400)},temporaryDisplay:function(b){var c=this.renderTo;if(b)for(;c&&c.style;)c.hcOrigStyle&&(a.css(c,c.hcOrigStyle),delete c.hcOrigStyle),c.hcOrigDetached&&(m.body.removeChild(c),c.hcOrigDetached=!1),c=c.parentNode;else for(;c&&c.style;){m.body.contains(c)||(c.hcOrigDetached=!0,m.body.appendChild(c));
if("none"===y(c,"display",!1)||c.hcOricDetached)c.hcOrigStyle={display:c.style.display,height:c.style.height,overflow:c.style.overflow},b={display:"block",overflow:"hidden"},c!==this.renderTo&&(b.height=0),a.css(c,b),c.offsetWidth||c.style.setProperty("display","block","important");c=c.parentNode;if(c===m.body)break}},setClassName:function(a){this.container.className="highcharts-container "+(a||"")},getContainer:function(){var e,d=this.options,h=d.chart,p,g;e=this.renderTo;var f=a.uniqueKey(),k;e||
(this.renderTo=e=h.renderTo);c(e)&&(this.renderTo=e=m.getElementById(e));e||a.error(13,!0);p=I(E(e,"data-highcharts-chart"));D(p)&&t[p]&&t[p].hasRendered&&t[p].destroy();E(e,"data-highcharts-chart",this.index);e.innerHTML="";h.skipClone||e.offsetWidth||this.temporaryDisplay();this.getChartSize();p=this.chartWidth;g=this.chartHeight;k=b({position:"relative",overflow:"hidden",width:p+"px",height:g+"px",textAlign:"left",lineHeight:"normal",zIndex:0,"-webkit-tap-highlight-color":"rgba(0,0,0,0)"},h.style);
this.container=e=l("div",{id:f},k,e);this._cursor=e.style.cursor;this.renderer=new (a[h.renderer]||Q)(e,p,g,null,h.forExport,d.exporting&&d.exporting.allowHTML);this.setClassName(h.className);this.renderer.setStyle(h.style);this.renderer.chartIndex=this.index},getMargins:function(a){var b=this.spacing,c=this.margin,e=this.titleOffset;this.resetMargins();e&&!d(c[0])&&(this.plotTop=Math.max(this.plotTop,e+this.options.title.margin+b[0]));this.legend.display&&this.legend.adjustMargins(c,b);this.extraMargin&&
(this[this.extraMargin.type]=(this[this.extraMargin.type]||0)+this.extraMargin.value);this.extraTopMargin&&(this.plotTop+=this.extraTopMargin);a||this.getAxisMargins()},getAxisMargins:function(){var a=this,b=a.axisOffset=[0,0,0,0],c=a.margin;a.hasCartesianSeries&&k(a.axes,function(a){a.visible&&a.getOffset()});k(q,function(e,h){d(c[h])||(a[e]+=b[h])});a.setChartSize()},reflow:function(a){var b=this,c=b.options.chart,e=b.renderTo,h=d(c.width)&&d(c.height),p=c.width||y(e,"width"),c=c.height||y(e,"height"),
e=a?a.target:O;if(!h&&!b.isPrinting&&p&&c&&(e===O||e===m)){if(p!==b.containerWidth||c!==b.containerHeight)clearTimeout(b.reflowTimeout),b.reflowTimeout=H(function(){b.container&&b.setSize(void 0,void 0,!1)},a?100:0);b.containerWidth=p;b.containerHeight=c}},initReflow:function(){var a=this,b;b=C(O,"resize",function(b){a.reflow(b)});C(a,"destroy",b)},setSize:function(b,c,e){var d=this,h=d.renderer;d.isResizing+=1;a.setAnimation(e,d);d.oldChartHeight=d.chartHeight;d.oldChartWidth=d.chartWidth;void 0!==
b&&(d.options.chart.width=b);void 0!==c&&(d.options.chart.height=c);d.getChartSize();b=h.globalAnimation;(b?A:g)(d.container,{width:d.chartWidth+"px",height:d.chartHeight+"px"},b);d.setChartSize(!0);h.setSize(d.chartWidth,d.chartHeight,e);k(d.axes,function(a){a.isDirty=!0;a.setScale()});d.isDirtyLegend=!0;d.isDirtyBox=!0;d.layOutTitles();d.getMargins();d.redraw(e);d.oldChartHeight=null;v(d,"resize");H(function(){d&&v(d,"endResize",null,function(){--d.isResizing})},F(b).duration)},setChartSize:function(a){function b(a){a=
f[a]||0;return Math.max(m||a,a)/2}var c=this.inverted,e=this.renderer,d=this.chartWidth,h=this.chartHeight,p=this.options.chart,g=this.spacing,f=this.clipOffset,q,n,l,z,m;this.plotLeft=q=Math.round(this.plotLeft);this.plotTop=n=Math.round(this.plotTop);this.plotWidth=l=Math.max(0,Math.round(d-q-this.marginRight));this.plotHeight=z=Math.max(0,Math.round(h-n-this.marginBottom));this.plotSizeX=c?z:l;this.plotSizeY=c?l:z;this.plotBorderWidth=p.plotBorderWidth||0;this.spacingBox=e.spacingBox={x:g[3],y:g[0],
width:d-g[3]-g[1],height:h-g[0]-g[2]};this.plotBox=e.plotBox={x:q,y:n,width:l,height:z};m=2*Math.floor(this.plotBorderWidth/2);c=Math.ceil(b(3));e=Math.ceil(b(0));this.clipBox={x:c,y:e,width:Math.floor(this.plotSizeX-b(1)-c),height:Math.max(0,Math.floor(this.plotSizeY-b(2)-e))};a||k(this.axes,function(a){a.setAxisSize();a.setAxisTranslation()})},resetMargins:function(){var a=this,b=a.options.chart;k(["margin","spacing"],function(c){var e=b[c],d=J(e)?e:[e,e,e,e];k(["Top","Right","Bottom","Left"],function(e,
h){a[c][h]=z(b[c+e],d[h])})});k(q,function(b,c){a[b]=z(a.margin[c],a.spacing[c])});a.axisOffset=[0,0,0,0];a.clipOffset=[]},drawChartBox:function(){var a=this.options.chart,b=this.renderer,c=this.chartWidth,e=this.chartHeight,d=this.chartBackground,h=this.plotBackground,p=this.plotBorder,g,f=this.plotBGImage,k=a.backgroundColor,q=a.plotBackgroundColor,l=a.plotBackgroundImage,n,z=this.plotLeft,m=this.plotTop,w=this.plotWidth,I=this.plotHeight,v=this.plotBox,r=this.clipRect,B=this.clipBox,y="animate";
d||(this.chartBackground=d=b.rect().addClass("highcharts-background").add(),y="attr");g=a.borderWidth||0;n=g+(a.shadow?8:0);k={fill:k||"none"};if(g||d["stroke-width"])k.stroke=a.borderColor,k["stroke-width"]=g;d.attr(k).shadow(a.shadow);d[y]({x:n/2,y:n/2,width:c-n-g%2,height:e-n-g%2,r:a.borderRadius});y="animate";h||(y="attr",this.plotBackground=h=b.rect().addClass("highcharts-plot-background").add());h[y](v);h.attr({fill:q||"none"}).shadow(a.plotShadow);l&&(f?f.animate(v):this.plotBGImage=b.image(l,
z,m,w,I).add());r?r.animate({width:B.width,height:B.height}):this.clipRect=b.clipRect(B);y="animate";p||(y="attr",this.plotBorder=p=b.rect().addClass("highcharts-plot-border").attr({zIndex:1}).add());p.attr({stroke:a.plotBorderColor,"stroke-width":a.plotBorderWidth||0,fill:"none"});p[y](p.crisp({x:z,y:m,width:w,height:I},-p.strokeWidth()));this.isDirtyBox=!1},propFromSeries:function(){var a=this,b=a.options.chart,c,e=a.options.series,d,p;k(["inverted","angular","polar"],function(g){c=h[b.type||b.defaultSeriesType];
p=b[g]||c&&c.prototype[g];for(d=e&&e.length;!p&&d--;)(c=h[e[d].type])&&c.prototype[g]&&(p=!0);a[g]=p})},linkSeries:function(){var a=this,b=a.series;k(b,function(a){a.linkedSeries.length=0});k(b,function(b){var e=b.options.linkedTo;c(e)&&(e=":previous"===e?a.series[b.index-1]:a.get(e))&&e.linkedParent!==b&&(e.linkedSeries.push(b),b.linkedParent=e,b.visible=z(b.options.visible,e.options.visible,b.visible))})},renderSeries:function(){k(this.series,function(a){a.translate();a.render()})},renderLabels:function(){var a=
this,c=a.options.labels;c.items&&k(c.items,function(e){var d=b(c.style,e.style),h=I(d.left)+a.plotLeft,p=I(d.top)+a.plotTop+12;delete d.left;delete d.top;a.renderer.text(e.html,h,p).attr({zIndex:2}).css(d).add()})},render:function(){var a=this.axes,b=this.renderer,c=this.options,e,d,h;this.setTitle();this.legend=new G(this,c.legend);this.getStacks&&this.getStacks();this.getMargins(!0);this.setChartSize();c=this.plotWidth;e=this.plotHeight-=21;k(a,function(a){a.setScale()});this.getAxisMargins();d=
1.1<c/this.plotWidth;h=1.05<e/this.plotHeight;if(d||h)k(a,function(a){(a.horiz&&d||!a.horiz&&h)&&a.setTickInterval(!0)}),this.getMargins();this.drawChartBox();this.hasCartesianSeries&&k(a,function(a){a.visible&&a.render()});this.seriesGroup||(this.seriesGroup=b.g("series-group").attr({zIndex:3}).add());this.renderSeries();this.renderLabels();this.addCredits();this.setResponsive&&this.setResponsive();this.hasRendered=!0},addCredits:function(a){var b=this;a=B(!0,this.options.credits,a);a.enabled&&!this.credits&&
(this.credits=this.renderer.text(a.text+(this.mapCredits||""),0,0).addClass("highcharts-credits").on("click",function(){a.href&&(O.location.href=a.href)}).attr({align:a.position.align,zIndex:8}).css(a.style).add().align(a.position),this.credits.update=function(a){b.credits=b.credits.destroy();b.addCredits(a)})},destroy:function(){var b=this,c=b.axes,e=b.series,d=b.container,h,p=d&&d.parentNode;v(b,"destroy");b.renderer.forExport?a.erase(t,b):t[b.index]=void 0;a.chartCount--;b.renderTo.removeAttribute("data-highcharts-chart");
L(b);for(h=c.length;h--;)c[h]=c[h].destroy();this.scroller&&this.scroller.destroy&&this.scroller.destroy();for(h=e.length;h--;)e[h]=e[h].destroy();k("title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" "),function(a){var c=b[a];c&&c.destroy&&(b[a]=c.destroy())});d&&(d.innerHTML="",L(d),p&&u(d));K(b,function(a,c){delete b[c]})},isReadyToRender:function(){var a=this;return P||O!=O.top||
"complete"===m.readyState?!0:(m.attachEvent("onreadystatechange",function(){m.detachEvent("onreadystatechange",a.firstRender);"complete"===m.readyState&&a.firstRender()}),!1)},firstRender:function(){var a=this,b=a.options;if(a.isReadyToRender()){a.getContainer();v(a,"init");a.resetMargins();a.setChartSize();a.propFromSeries();a.getAxes();k(b.series||[],function(b){a.initSeries(b)});a.linkSeries();v(a,"beforeRender");p&&(a.pointer=new p(a,b));a.render();if(!a.renderer.imgCount&&a.onload)a.onload();
a.temporaryDisplay(!0)}},onload:function(){k([this.callback].concat(this.callbacks),function(a){a&&void 0!==this.index&&a.apply(this,[this])},this);v(this,"load");v(this,"render");d(this.index)&&!1!==this.options.chart.reflow&&this.initReflow();this.onload=null}})})(M);(function(a){var C,A=a.each,F=a.extend,E=a.erase,m=a.fireEvent,f=a.format,l=a.isArray,r=a.isNumber,u=a.pick,t=a.removeEvent;a.Point=C=function(){};a.Point.prototype={init:function(a,d,f){this.series=a;this.color=a.color;this.applyOptions(d,
f);a.options.colorByPoint?(d=a.options.colors||a.chart.options.colors,this.color=this.color||d[a.colorCounter],d=d.length,f=a.colorCounter,a.colorCounter++,a.colorCounter===d&&(a.colorCounter=0)):f=a.colorIndex;this.colorIndex=u(this.colorIndex,f);a.chart.pointCount++;return this},applyOptions:function(a,d){var g=this.series,b=g.options.pointValKey||g.pointValKey;a=C.prototype.optionsToObject.call(this,a);F(this,a);this.options=this.options?F(this.options,a):a;a.group&&delete this.group;b&&(this.y=
this[b]);this.isNull=u(this.isValid&&!this.isValid(),null===this.x||!r(this.y,!0));this.selected&&(this.state="select");"name"in this&&void 0===d&&g.xAxis&&g.xAxis.hasNames&&(this.x=g.xAxis.nameToX(this));void 0===this.x&&g&&(this.x=void 0===d?g.autoIncrement(this):d);return this},optionsToObject:function(a){var d={},g=this.series,b=g.options.keys,e=b||g.pointArrayMap||["y"],f=e.length,m=0,n=0;if(r(a)||null===a)d[e[0]]=a;else if(l(a))for(!b&&a.length>f&&(g=typeof a[0],"string"===g?d.name=a[0]:"number"===
g&&(d.x=a[0]),m++);n<f;)b&&void 0===a[m]||(d[e[n]]=a[m]),m++,n++;else"object"===typeof a&&(d=a,a.dataLabels&&(g._hasPointLabels=!0),a.marker&&(g._hasPointMarkers=!0));return d},getClassName:function(){return"highcharts-point"+(this.selected?" highcharts-point-select":"")+(this.negative?" highcharts-negative":"")+(this.isNull?" highcharts-null-point":"")+(void 0!==this.colorIndex?" highcharts-color-"+this.colorIndex:"")+(this.options.className?" "+this.options.className:"")+(this.zone&&this.zone.className?
" "+this.zone.className.replace("highcharts-negative",""):"")},getZone:function(){var a=this.series,d=a.zones,a=a.zoneAxis||"y",f=0,b;for(b=d[f];this[a]>=b.value;)b=d[++f];b&&b.color&&!this.options.color&&(this.color=b.color);return b},destroy:function(){var a=this.series.chart,d=a.hoverPoints,f;a.pointCount--;d&&(this.setState(),E(d,this),d.length||(a.hoverPoints=null));if(this===a.hoverPoint)this.onMouseOut();if(this.graphic||this.dataLabel)t(this),this.destroyElements();this.legendItem&&a.legend.destroyItem(this);
for(f in this)this[f]=null},destroyElements:function(){for(var a=["graphic","dataLabel","dataLabelUpper","connector","shadowGroup"],d,f=6;f--;)d=a[f],this[d]&&(this[d]=this[d].destroy())},getLabelConfig:function(){return{x:this.category,y:this.y,color:this.color,colorIndex:this.colorIndex,key:this.name||this.category,series:this.series,point:this,percentage:this.percentage,total:this.total||this.stackTotal}},tooltipFormatter:function(a){var d=this.series,g=d.tooltipOptions,b=u(g.valueDecimals,""),
e=g.valuePrefix||"",l=g.valueSuffix||"";A(d.pointArrayMap||["y"],function(d){d="{point."+d;if(e||l)a=a.replace(d+"}",e+d+"}"+l);a=a.replace(d+"}",d+":,."+b+"f}")});return f(a,{point:this,series:this.series})},firePointEvent:function(a,d,f){var b=this,e=this.series.options;(e.point.events[a]||b.options&&b.options.events&&b.options.events[a])&&this.importEvents();"click"===a&&e.allowPointSelect&&(f=function(a){b.select&&b.select(null,a.ctrlKey||a.metaKey||a.shiftKey)});m(this,a,d,f)},visible:!0}})(M);
(function(a){var C=a.addEvent,A=a.animObject,F=a.arrayMax,E=a.arrayMin,m=a.correctFloat,f=a.Date,l=a.defaultOptions,r=a.defaultPlotOptions,u=a.defined,t=a.each,g=a.erase,d=a.extend,k=a.fireEvent,b=a.grep,e=a.isArray,v=a.isNumber,y=a.isString,n=a.merge,D=a.objectEach,J=a.pick,c=a.removeEvent,G=a.splat,q=a.SVGElement,B=a.syncTimeout,K=a.win;a.Series=a.seriesType("line",null,{lineWidth:2,allowPointSelect:!1,showCheckbox:!1,animation:{duration:1E3},events:{},marker:{lineWidth:0,lineColor:"#ffffff",radius:4,
states:{hover:{animation:{duration:50},enabled:!0,radiusPlus:2,lineWidthPlus:1},select:{fillColor:"#cccccc",lineColor:"#000000",lineWidth:2}}},point:{events:{}},dataLabels:{align:"center",formatter:function(){return null===this.y?"":a.numberFormat(this.y,-1)},style:{fontSize:"11px",fontWeight:"bold",color:"contrast",textOutline:"1px contrast"},verticalAlign:"bottom",x:0,y:0,padding:5},cropThreshold:300,pointRange:0,softThreshold:!0,states:{hover:{animation:{duration:50},lineWidthPlus:1,marker:{},
halo:{size:10,opacity:.25}},select:{marker:{}}},stickyTracking:!0,turboThreshold:1E3,findNearestPointBy:"x"},{isCartesian:!0,pointClass:a.Point,sorted:!0,requireSorting:!0,directTouch:!1,axisTypes:["xAxis","yAxis"],colorCounter:0,parallelArrays:["x","y"],coll:"series",init:function(a,b){var c=this,e,h=a.series,p;c.chart=a;c.options=b=c.setOptions(b);c.linkedSeries=[];c.bindAxes();d(c,{name:b.name,state:"",visible:!1!==b.visible,selected:!0===b.selected});e=b.events;D(e,function(a,b){C(c,b,a)});if(e&&
e.click||b.point&&b.point.events&&b.point.events.click||b.allowPointSelect)a.runTrackerClick=!0;c.getColor();c.getSymbol();t(c.parallelArrays,function(a){c[a+"Data"]=[]});c.setData(b.data,!1);c.isCartesian&&(a.hasCartesianSeries=!0);h.length&&(p=h[h.length-1]);c._i=J(p&&p._i,-1)+1;a.orderSeries(this.insert(h))},insert:function(a){var b=this.options.index,c;if(v(b)){for(c=a.length;c--;)if(b>=J(a[c].options.index,a[c]._i)){a.splice(c+1,0,this);break}-1===c&&a.unshift(this);c+=1}else a.push(this);return J(c,
a.length-1)},bindAxes:function(){var b=this,c=b.options,e=b.chart,d;t(b.axisTypes||[],function(h){t(e[h],function(a){d=a.options;if(c[h]===d.index||void 0!==c[h]&&c[h]===d.id||void 0===c[h]&&0===d.index)b.insert(a.series),b[h]=a,a.isDirty=!0});b[h]||b.optionalAxis===h||a.error(18,!0)})},updateParallelArrays:function(a,b){var c=a.series,e=arguments,d=v(b)?function(e){var d="y"===e&&c.toYData?c.toYData(a):a[e];c[e+"Data"][b]=d}:function(a){Array.prototype[b].apply(c[a+"Data"],Array.prototype.slice.call(e,
2))};t(c.parallelArrays,d)},autoIncrement:function(){var a=this.options,b=this.xIncrement,c,e=a.pointIntervalUnit,b=J(b,a.pointStart,0);this.pointInterval=c=J(this.pointInterval,a.pointInterval,1);e&&(a=new f(b),"day"===e?a=+a[f.hcSetDate](a[f.hcGetDate]()+c):"month"===e?a=+a[f.hcSetMonth](a[f.hcGetMonth]()+c):"year"===e&&(a=+a[f.hcSetFullYear](a[f.hcGetFullYear]()+c)),c=a-b);this.xIncrement=b+c;return b},setOptions:function(a){var b=this.chart,c=b.options,e=c.plotOptions,d=(b.userOptions||{}).plotOptions||
{},p=e[this.type];this.userOptions=a;b=n(p,e.series,a);this.tooltipOptions=n(l.tooltip,l.plotOptions.series&&l.plotOptions.series.tooltip,l.plotOptions[this.type].tooltip,c.tooltip.userOptions,e.series&&e.series.tooltip,e[this.type].tooltip,a.tooltip);this.stickyTracking=J(a.stickyTracking,d[this.type]&&d[this.type].stickyTracking,d.series&&d.series.stickyTracking,this.tooltipOptions.shared&&!this.noSharedTooltip?!0:b.stickyTracking);null===p.marker&&delete b.marker;this.zoneAxis=b.zoneAxis;a=this.zones=
(b.zones||[]).slice();!b.negativeColor&&!b.negativeFillColor||b.zones||a.push({value:b[this.zoneAxis+"Threshold"]||b.threshold||0,className:"highcharts-negative",color:b.negativeColor,fillColor:b.negativeFillColor});a.length&&u(a[a.length-1].value)&&a.push({color:this.color,fillColor:this.fillColor});return b},getCyclic:function(a,b,c){var e,d=this.chart,p=this.userOptions,f=a+"Index",g=a+"Counter",k=c?c.length:J(d.options.chart[a+"Count"],d[a+"Count"]);b||(e=J(p[f],p["_"+f]),u(e)||(d.series.length||
(d[g]=0),p["_"+f]=e=d[g]%k,d[g]+=1),c&&(b=c[e]));void 0!==e&&(this[f]=e);this[a]=b},getColor:function(){this.options.colorByPoint?this.options.color=null:this.getCyclic("color",this.options.color||r[this.type].color,this.chart.options.colors)},getSymbol:function(){this.getCyclic("symbol",this.options.marker.symbol,this.chart.options.symbols)},drawLegendSymbol:a.LegendSymbolMixin.drawLineMarker,setData:function(b,c,d,f){var h=this,p=h.points,g=p&&p.length||0,k,q=h.options,l=h.chart,n=null,m=h.xAxis,
z=q.turboThreshold,r=this.xData,B=this.yData,I=(k=h.pointArrayMap)&&k.length;b=b||[];k=b.length;c=J(c,!0);if(!1!==f&&k&&g===k&&!h.cropped&&!h.hasGroupedData&&h.visible)t(b,function(a,b){p[b].update&&a!==q.data[b]&&p[b].update(a,!1,null,!1)});else{h.xIncrement=null;h.colorCounter=0;t(this.parallelArrays,function(a){h[a+"Data"].length=0});if(z&&k>z){for(d=0;null===n&&d<k;)n=b[d],d++;if(v(n))for(d=0;d<k;d++)r[d]=this.autoIncrement(),B[d]=b[d];else if(e(n))if(I)for(d=0;d<k;d++)n=b[d],r[d]=n[0],B[d]=n.slice(1,
I+1);else for(d=0;d<k;d++)n=b[d],r[d]=n[0],B[d]=n[1];else a.error(12)}else for(d=0;d<k;d++)void 0!==b[d]&&(n={series:h},h.pointClass.prototype.applyOptions.apply(n,[b[d]]),h.updateParallelArrays(n,d));y(B[0])&&a.error(14,!0);h.data=[];h.options.data=h.userOptions.data=b;for(d=g;d--;)p[d]&&p[d].destroy&&p[d].destroy();m&&(m.minRange=m.userMinRange);h.isDirty=l.isDirtyBox=!0;h.isDirtyData=!!p;d=!1}"point"===q.legendType&&(this.processData(),this.generatePoints());c&&l.redraw(d)},processData:function(b){var c=
this.xData,e=this.yData,d=c.length,h;h=0;var p,f,g=this.xAxis,k,q=this.options;k=q.cropThreshold;var n=this.getExtremesFromAll||q.getExtremesFromAll,l=this.isCartesian,q=g&&g.val2lin,m=g&&g.isLog,v,r;if(l&&!this.isDirty&&!g.isDirty&&!this.yAxis.isDirty&&!b)return!1;g&&(b=g.getExtremes(),v=b.min,r=b.max);if(l&&this.sorted&&!n&&(!k||d>k||this.forceCrop))if(c[d-1]<v||c[0]>r)c=[],e=[];else if(c[0]<v||c[d-1]>r)h=this.cropData(this.xData,this.yData,v,r),c=h.xData,e=h.yData,h=h.start,p=!0;for(k=c.length||
1;--k;)d=m?q(c[k])-q(c[k-1]):c[k]-c[k-1],0<d&&(void 0===f||d<f)?f=d:0>d&&this.requireSorting&&a.error(15);this.cropped=p;this.cropStart=h;this.processedXData=c;this.processedYData=e;this.closestPointRange=f},cropData:function(a,b,c,e){var d=a.length,p=0,g=d,f=J(this.cropShoulder,1),k;for(k=0;k<d;k++)if(a[k]>=c){p=Math.max(0,k-f);break}for(c=k;c<d;c++)if(a[c]>e){g=c+f;break}return{xData:a.slice(p,g),yData:b.slice(p,g),start:p,end:g}},generatePoints:function(){var a=this.options,b=a.data,c=this.data,
e,d=this.processedXData,g=this.processedYData,f=this.pointClass,k=d.length,q=this.cropStart||0,n,l=this.hasGroupedData,a=a.keys,m,v=[],r;c||l||(c=[],c.length=b.length,c=this.data=c);a&&l&&(this.options.keys=!1);for(r=0;r<k;r++)n=q+r,l?(m=(new f).init(this,[d[r]].concat(G(g[r]))),m.dataGroup=this.groupMap[r]):(m=c[n])||void 0===b[n]||(c[n]=m=(new f).init(this,b[n],d[r])),m&&(m.index=n,v[r]=m);this.options.keys=a;if(c&&(k!==(e=c.length)||l))for(r=0;r<e;r++)r!==q||l||(r+=k),c[r]&&(c[r].destroyElements(),
c[r].plotX=void 0);this.data=c;this.points=v},getExtremes:function(a){var b=this.yAxis,c=this.processedXData,d,h=[],p=0;d=this.xAxis.getExtremes();var g=d.min,f=d.max,k,q,n,l;a=a||this.stackedYData||this.processedYData||[];d=a.length;for(l=0;l<d;l++)if(q=c[l],n=a[l],k=(v(n,!0)||e(n))&&(!b.positiveValuesOnly||n.length||0<n),q=this.getExtremesFromAll||this.options.getExtremesFromAll||this.cropped||(c[l]||q)>=g&&(c[l]||q)<=f,k&&q)if(k=n.length)for(;k--;)null!==n[k]&&(h[p++]=n[k]);else h[p++]=n;this.dataMin=
E(h);this.dataMax=F(h)},translate:function(){this.processedXData||this.processData();this.generatePoints();var a=this.options,b=a.stacking,c=this.xAxis,e=c.categories,d=this.yAxis,g=this.points,f=g.length,k=!!this.modifyValue,q=a.pointPlacement,n="between"===q||v(q),l=a.threshold,r=a.startFromThreshold?l:0,B,y,t,G,D=Number.MAX_VALUE;"between"===q&&(q=.5);v(q)&&(q*=J(a.pointRange||c.pointRange));for(a=0;a<f;a++){var K=g[a],A=K.x,C=K.y;y=K.low;var E=b&&d.stacks[(this.negStacks&&C<(r?0:l)?"-":"")+this.stackKey],
F;d.positiveValuesOnly&&null!==C&&0>=C&&(K.isNull=!0);K.plotX=B=m(Math.min(Math.max(-1E5,c.translate(A,0,0,0,1,q,"flags"===this.type)),1E5));b&&this.visible&&!K.isNull&&E&&E[A]&&(G=this.getStackIndicator(G,A,this.index),F=E[A],C=F.points[G.key],y=C[0],C=C[1],y===r&&G.key===E[A].base&&(y=J(l,d.min)),d.positiveValuesOnly&&0>=y&&(y=null),K.total=K.stackTotal=F.total,K.percentage=F.total&&K.y/F.total*100,K.stackY=C,F.setOffset(this.pointXOffset||0,this.barW||0));K.yBottom=u(y)?d.translate(y,0,1,0,1):
null;k&&(C=this.modifyValue(C,K));K.plotY=y="number"===typeof C&&Infinity!==C?Math.min(Math.max(-1E5,d.translate(C,0,1,0,1)),1E5):void 0;K.isInside=void 0!==y&&0<=y&&y<=d.len&&0<=B&&B<=c.len;K.clientX=n?m(c.translate(A,0,0,0,1,q)):B;K.negative=K.y<(l||0);K.category=e&&void 0!==e[K.x]?e[K.x]:K.x;K.isNull||(void 0!==t&&(D=Math.min(D,Math.abs(B-t))),t=B);K.zone=this.zones.length&&K.getZone()}this.closestPointRangePx=D},getValidPoints:function(a,c){var e=this.chart;return b(a||this.points||[],function(a){return c&&
!e.isInsidePlot(a.plotX,a.plotY,e.inverted)?!1:!a.isNull})},setClip:function(a){var b=this.chart,c=this.options,e=b.renderer,d=b.inverted,p=this.clipBox,g=p||b.clipBox,f=this.sharedClipKey||["_sharedClip",a&&a.duration,a&&a.easing,g.height,c.xAxis,c.yAxis].join(),k=b[f],q=b[f+"m"];k||(a&&(g.width=0,b[f+"m"]=q=e.clipRect(-99,d?-b.plotLeft:-b.plotTop,99,d?b.chartWidth:b.chartHeight)),b[f]=k=e.clipRect(g),k.count={length:0});a&&!k.count[this.index]&&(k.count[this.index]=!0,k.count.length+=1);!1!==c.clip&&
(this.group.clip(a||p?k:b.clipRect),this.markerGroup.clip(q),this.sharedClipKey=f);a||(k.count[this.index]&&(delete k.count[this.index],--k.count.length),0===k.count.length&&f&&b[f]&&(p||(b[f]=b[f].destroy()),b[f+"m"]&&(b[f+"m"]=b[f+"m"].destroy())))},animate:function(a){var b=this.chart,c=A(this.options.animation),e;a?this.setClip(c):(e=this.sharedClipKey,(a=b[e])&&a.animate({width:b.plotSizeX},c),b[e+"m"]&&b[e+"m"].animate({width:b.plotSizeX+99},c),this.animate=null)},afterAnimate:function(){this.setClip();
k(this,"afterAnimate");this.finishedAnimating=!0},drawPoints:function(){var a=this.points,b=this.chart,c,e,d,f,g=this.options.marker,k,q,n,l,m=this[this.specialGroup]||this.markerGroup,r=J(g.enabled,this.xAxis.isRadial?!0:null,this.closestPointRangePx>=2*g.radius);if(!1!==g.enabled||this._hasPointMarkers)for(e=0;e<a.length;e++)d=a[e],c=d.plotY,f=d.graphic,k=d.marker||{},q=!!d.marker,n=r&&void 0===k.enabled||k.enabled,l=d.isInside,n&&v(c)&&null!==d.y?(c=J(k.symbol,this.symbol),d.hasImage=0===c.indexOf("url"),
n=this.markerAttribs(d,d.selected&&"select"),f?f[l?"show":"hide"](!0).animate(n):l&&(0<n.width||d.hasImage)&&(d.graphic=f=b.renderer.symbol(c,n.x,n.y,n.width,n.height,q?k:g).add(m)),f&&f.attr(this.pointAttribs(d,d.selected&&"select")),f&&f.addClass(d.getClassName(),!0)):f&&(d.graphic=f.destroy())},markerAttribs:function(a,b){var c=this.options.marker,e=a.marker||{},d=J(e.radius,c.radius);b&&(c=c.states[b],b=e.states&&e.states[b],d=J(b&&b.radius,c&&c.radius,d+(c&&c.radiusPlus||0)));a.hasImage&&(d=
0);a={x:Math.floor(a.plotX)-d,y:a.plotY-d};d&&(a.width=a.height=2*d);return a},pointAttribs:function(a,b){var c=this.options.marker,e=a&&a.options,d=e&&e.marker||{},f=this.color,g=e&&e.color,p=a&&a.color,e=J(d.lineWidth,c.lineWidth);a=a&&a.zone&&a.zone.color;f=g||a||p||f;a=d.fillColor||c.fillColor||f;f=d.lineColor||c.lineColor||f;b&&(c=c.states[b],b=d.states&&d.states[b]||{},e=J(b.lineWidth,c.lineWidth,e+J(b.lineWidthPlus,c.lineWidthPlus,0)),a=b.fillColor||c.fillColor||a,f=b.lineColor||c.lineColor||
f);return{stroke:f,"stroke-width":e,fill:a}},destroy:function(){var a=this,b=a.chart,e=/AppleWebKit\/533/.test(K.navigator.userAgent),d,h,f=a.data||[],n,l;k(a,"destroy");c(a);t(a.axisTypes||[],function(b){(l=a[b])&&l.series&&(g(l.series,a),l.isDirty=l.forceRedraw=!0)});a.legendItem&&a.chart.legend.destroyItem(a);for(h=f.length;h--;)(n=f[h])&&n.destroy&&n.destroy();a.points=null;clearTimeout(a.animationTimeout);D(a,function(a,b){a instanceof q&&!a.survive&&(d=e&&"group"===b?"hide":"destroy",a[d]())});
b.hoverSeries===a&&(b.hoverSeries=null);g(b.series,a);b.orderSeries();D(a,function(b,c){delete a[c]})},getGraphPath:function(a,b,c){var e=this,d=e.options,f=d.step,g,p=[],k=[],q;a=a||e.points;(g=a.reversed)&&a.reverse();(f={right:1,center:2}[f]||f&&3)&&g&&(f=4-f);!d.connectNulls||b||c||(a=this.getValidPoints(a));t(a,function(h,g){var n=h.plotX,l=h.plotY,m=a[g-1];(h.leftCliff||m&&m.rightCliff)&&!c&&(q=!0);h.isNull&&!u(b)&&0<g?q=!d.connectNulls:h.isNull&&!b?q=!0:(0===g||q?g=["M",h.plotX,h.plotY]:e.getPointSpline?
g=e.getPointSpline(a,h,g):f?(g=1===f?["L",m.plotX,l]:2===f?["L",(m.plotX+n)/2,m.plotY,"L",(m.plotX+n)/2,l]:["L",n,m.plotY],g.push("L",n,l)):g=["L",n,l],k.push(h.x),f&&k.push(h.x),p.push.apply(p,g),q=!1)});p.xMap=k;return e.graphPath=p},drawGraph:function(){var a=this,b=this.options,c=(this.gappedPath||this.getGraphPath).call(this),e=[["graph","highcharts-graph",b.lineColor||this.color,b.dashStyle]];t(this.zones,function(c,d){e.push(["zone-graph-"+d,"highcharts-graph highcharts-zone-graph-"+d+" "+
(c.className||""),c.color||a.color,c.dashStyle||b.dashStyle])});t(e,function(e,d){var h=e[0],f=a[h];f?(f.endX=c.xMap,f.animate({d:c})):c.length&&(a[h]=a.chart.renderer.path(c).addClass(e[1]).attr({zIndex:1}).add(a.group),f={stroke:e[2],"stroke-width":b.lineWidth,fill:a.fillGraph&&a.color||"none"},e[3]?f.dashstyle=e[3]:"square"!==b.linecap&&(f["stroke-linecap"]=f["stroke-linejoin"]="round"),f=a[h].attr(f).shadow(2>d&&b.shadow));f&&(f.startX=c.xMap,f.isArea=c.isArea)})},applyZones:function(){var a=
this,b=this.chart,c=b.renderer,e=this.zones,d,f,g=this.clips||[],k,q=this.graph,n=this.area,l=Math.max(b.chartWidth,b.chartHeight),m=this[(this.zoneAxis||"y")+"Axis"],r,v,B=b.inverted,y,u,G,D,K=!1;e.length&&(q||n)&&m&&void 0!==m.min&&(v=m.reversed,y=m.horiz,q&&q.hide(),n&&n.hide(),r=m.getExtremes(),t(e,function(e,h){d=v?y?b.plotWidth:0:y?0:m.toPixels(r.min);d=Math.min(Math.max(J(f,d),0),l);f=Math.min(Math.max(Math.round(m.toPixels(J(e.value,r.max),!0)),0),l);K&&(d=f=m.toPixels(r.max));u=Math.abs(d-
f);G=Math.min(d,f);D=Math.max(d,f);m.isXAxis?(k={x:B?D:G,y:0,width:u,height:l},y||(k.x=b.plotHeight-k.x)):(k={x:0,y:B?D:G,width:l,height:u},y&&(k.y=b.plotWidth-k.y));B&&c.isVML&&(k=m.isXAxis?{x:0,y:v?G:D,height:k.width,width:b.chartWidth}:{x:k.y-b.plotLeft-b.spacingBox.x,y:0,width:k.height,height:b.chartHeight});g[h]?g[h].animate(k):(g[h]=c.clipRect(k),q&&a["zone-graph-"+h].clip(g[h]),n&&a["zone-area-"+h].clip(g[h]));K=e.value>r.max}),this.clips=g)},invertGroups:function(a){function b(){t(["group",
"markerGroup"],function(b){c[b]&&(e.renderer.isVML&&c[b].attr({width:c.yAxis.len,height:c.xAxis.len}),c[b].width=c.yAxis.len,c[b].height=c.xAxis.len,c[b].invert(a))})}var c=this,e=c.chart,d;c.xAxis&&(d=C(e,"resize",b),C(c,"destroy",d),b(a),c.invertGroups=b)},plotGroup:function(a,b,c,e,d){var h=this[a],f=!h;f&&(this[a]=h=this.chart.renderer.g().attr({zIndex:e||.1}).add(d));h.addClass("highcharts-"+b+" highcharts-series-"+this.index+" highcharts-"+this.type+"-series highcharts-color-"+this.colorIndex+
" "+(this.options.className||""),!0);h.attr({visibility:c})[f?"attr":"animate"](this.getPlotBox());return h},getPlotBox:function(){var a=this.chart,b=this.xAxis,c=this.yAxis;a.inverted&&(b=c,c=this.xAxis);return{translateX:b?b.left:a.plotLeft,translateY:c?c.top:a.plotTop,scaleX:1,scaleY:1}},render:function(){var a=this,b=a.chart,c,e=a.options,d=!!a.animate&&b.renderer.isSVG&&A(e.animation).duration,f=a.visible?"inherit":"hidden",g=e.zIndex,k=a.hasRendered,q=b.seriesGroup,n=b.inverted;c=a.plotGroup("group",
"series",f,g,q);a.markerGroup=a.plotGroup("markerGroup","markers",f,g,q);d&&a.animate(!0);c.inverted=a.isCartesian?n:!1;a.drawGraph&&(a.drawGraph(),a.applyZones());a.drawDataLabels&&a.drawDataLabels();a.visible&&a.drawPoints();a.drawTracker&&!1!==a.options.enableMouseTracking&&a.drawTracker();a.invertGroups(n);!1===e.clip||a.sharedClipKey||k||c.clip(b.clipRect);d&&a.animate();k||(a.animationTimeout=B(function(){a.afterAnimate()},d));a.isDirty=!1;a.hasRendered=!0},redraw:function(){var a=this.chart,
b=this.isDirty||this.isDirtyData,c=this.group,e=this.xAxis,d=this.yAxis;c&&(a.inverted&&c.attr({width:a.plotWidth,height:a.plotHeight}),c.animate({translateX:J(e&&e.left,a.plotLeft),translateY:J(d&&d.top,a.plotTop)}));this.translate();this.render();b&&delete this.kdTree},kdAxisArray:["clientX","plotY"],searchPoint:function(a,b){var c=this.xAxis,e=this.yAxis,d=this.chart.inverted;return this.searchKDTree({clientX:d?c.len-a.chartY+c.pos:a.chartX-c.pos,plotY:d?e.len-a.chartX+e.pos:a.chartY-e.pos},b)},
buildKDTree:function(){function a(c,e,d){var h,f;if(f=c&&c.length)return h=b.kdAxisArray[e%d],c.sort(function(a,b){return a[h]-b[h]}),f=Math.floor(f/2),{point:c[f],left:a(c.slice(0,f),e+1,d),right:a(c.slice(f+1),e+1,d)}}this.buildingKdTree=!0;var b=this,c=-1<b.options.findNearestPointBy.indexOf("y")?2:1;delete b.kdTree;B(function(){b.kdTree=a(b.getValidPoints(null,!b.directTouch),c,c);b.buildingKdTree=!1},b.options.kdNow?0:1)},searchKDTree:function(a,b){function c(a,b,h,k){var p=b.point,q=e.kdAxisArray[h%
k],n,l,m=p;l=u(a[d])&&u(p[d])?Math.pow(a[d]-p[d],2):null;n=u(a[f])&&u(p[f])?Math.pow(a[f]-p[f],2):null;n=(l||0)+(n||0);p.dist=u(n)?Math.sqrt(n):Number.MAX_VALUE;p.distX=u(l)?Math.sqrt(l):Number.MAX_VALUE;q=a[q]-p[q];n=0>q?"left":"right";l=0>q?"right":"left";b[n]&&(n=c(a,b[n],h+1,k),m=n[g]<m[g]?n:p);b[l]&&Math.sqrt(q*q)<m[g]&&(a=c(a,b[l],h+1,k),m=a[g]<m[g]?a:m);return m}var e=this,d=this.kdAxisArray[0],f=this.kdAxisArray[1],g=b?"distX":"dist";b=-1<e.options.findNearestPointBy.indexOf("y")?2:1;this.kdTree||
this.buildingKdTree||this.buildKDTree();if(this.kdTree)return c(a,this.kdTree,b,b)}})})(M);(function(a){var C=a.Axis,A=a.Chart,F=a.correctFloat,E=a.defined,m=a.destroyObjectProperties,f=a.each,l=a.format,r=a.objectEach,u=a.pick,t=a.Series;a.StackItem=function(a,d,f,b,e){var g=a.chart.inverted;this.axis=a;this.isNegative=f;this.options=d;this.x=b;this.total=null;this.points={};this.stack=e;this.rightCliff=this.leftCliff=0;this.alignOptions={align:d.align||(g?f?"left":"right":"center"),verticalAlign:d.verticalAlign||
(g?"middle":f?"bottom":"top"),y:u(d.y,g?4:f?14:-6),x:u(d.x,g?f?-6:6:0)};this.textAlign=d.textAlign||(g?f?"right":"left":"center")};a.StackItem.prototype={destroy:function(){m(this,this.axis)},render:function(a){var d=this.options,f=d.format,f=f?l(f,this):d.formatter.call(this);this.label?this.label.attr({text:f,visibility:"hidden"}):this.label=this.axis.chart.renderer.text(f,null,null,d.useHTML).css(d.style).attr({align:this.textAlign,rotation:d.rotation,visibility:"hidden"}).add(a)},setOffset:function(a,
d){var f=this.axis,b=f.chart,e=f.translate(f.usePercentage?100:this.total,0,0,0,1),f=f.translate(0),f=Math.abs(e-f);a=b.xAxis[0].translate(this.x)+a;e=this.getStackBox(b,this,a,e,d,f);if(d=this.label)d.align(this.alignOptions,null,e),e=d.alignAttr,d[!1===this.options.crop||b.isInsidePlot(e.x,e.y)?"show":"hide"](!0)},getStackBox:function(a,d,f,b,e,l){var g=d.axis.reversed,k=a.inverted;a=a.plotHeight;d=d.isNegative&&!g||!d.isNegative&&g;return{x:k?d?b:b-l:f,y:k?a-f-e:d?a-b-l:a-b,width:k?l:e,height:k?
e:l}}};A.prototype.getStacks=function(){var a=this;f(a.yAxis,function(a){a.stacks&&a.hasVisibleSeries&&(a.oldStacks=a.stacks)});f(a.series,function(d){!d.options.stacking||!0!==d.visible&&!1!==a.options.chart.ignoreHiddenSeries||(d.stackKey=d.type+u(d.options.stack,""))})};C.prototype.buildStacks=function(){var a=this.series,d=u(this.options.reversedStacks,!0),f=a.length,b;if(!this.isXAxis){this.usePercentage=!1;for(b=f;b--;)a[d?b:f-b-1].setStackedPoints();if(this.usePercentage)for(b=0;b<f;b++)a[b].setPercentStacks()}};
C.prototype.renderStackTotals=function(){var a=this.chart,d=a.renderer,f=this.stacks,b=this.stackTotalGroup;b||(this.stackTotalGroup=b=d.g("stack-labels").attr({visibility:"visible",zIndex:6}).add());b.translate(a.plotLeft,a.plotTop);r(f,function(a){r(a,function(a){a.render(b)})})};C.prototype.resetStacks=function(){var a=this,d=a.stacks;a.isXAxis||r(d,function(d){r(d,function(b,e){b.touched<a.stacksTouched?(b.destroy(),delete d[e]):(b.total=null,b.cum=null)})})};C.prototype.cleanStacks=function(){var a;
this.isXAxis||(this.oldStacks&&(a=this.stacks=this.oldStacks),r(a,function(a){r(a,function(a){a.cum=a.total})}))};t.prototype.setStackedPoints=function(){if(this.options.stacking&&(!0===this.visible||!1===this.chart.options.chart.ignoreHiddenSeries)){var f=this.processedXData,d=this.processedYData,k=[],b=d.length,e=this.options,l=e.threshold,m=e.startFromThreshold?l:0,n=e.stack,e=e.stacking,r=this.stackKey,t="-"+r,c=this.negStacks,G=this.yAxis,q=G.stacks,B=G.oldStacks,K,p,z,I,A,h,w;G.stacksTouched+=
1;for(A=0;A<b;A++)h=f[A],w=d[A],K=this.getStackIndicator(K,h,this.index),I=K.key,z=(p=c&&w<(m?0:l))?t:r,q[z]||(q[z]={}),q[z][h]||(B[z]&&B[z][h]?(q[z][h]=B[z][h],q[z][h].total=null):q[z][h]=new a.StackItem(G,G.options.stackLabels,p,h,n)),z=q[z][h],null!==w&&(z.points[I]=z.points[this.index]=[u(z.cum,m)],E(z.cum)||(z.base=I),z.touched=G.stacksTouched,0<K.index&&!1===this.singleStacks&&(z.points[I][0]=z.points[this.index+","+h+",0"][0])),"percent"===e?(p=p?r:t,c&&q[p]&&q[p][h]?(p=q[p][h],z.total=p.total=
Math.max(p.total,z.total)+Math.abs(w)||0):z.total=F(z.total+(Math.abs(w)||0))):z.total=F(z.total+(w||0)),z.cum=u(z.cum,m)+(w||0),null!==w&&(z.points[I].push(z.cum),k[A]=z.cum);"percent"===e&&(G.usePercentage=!0);this.stackedYData=k;G.oldStacks={}}};t.prototype.setPercentStacks=function(){var a=this,d=a.stackKey,k=a.yAxis.stacks,b=a.processedXData,e;f([d,"-"+d],function(d){for(var f=b.length,g,l;f--;)if(g=b[f],e=a.getStackIndicator(e,g,a.index,d),g=(l=k[d]&&k[d][g])&&l.points[e.key])l=l.total?100/
l.total:0,g[0]=F(g[0]*l),g[1]=F(g[1]*l),a.stackedYData[f]=g[1]})};t.prototype.getStackIndicator=function(a,d,f,b){!E(a)||a.x!==d||b&&a.key!==b?a={x:d,index:0,key:b}:a.index++;a.key=[f,d,a.index].join();return a}})(M);(function(a){var C=a.addEvent,A=a.animate,F=a.Axis,E=a.createElement,m=a.css,f=a.defined,l=a.each,r=a.erase,u=a.extend,t=a.fireEvent,g=a.inArray,d=a.isNumber,k=a.isObject,b=a.isArray,e=a.merge,v=a.objectEach,y=a.pick,n=a.Point,D=a.Series,J=a.seriesTypes,c=a.setAnimation,G=a.splat;u(a.Chart.prototype,
{addSeries:function(a,b,c){var e,d=this;a&&(b=y(b,!0),t(d,"addSeries",{options:a},function(){e=d.initSeries(a);d.isDirtyLegend=!0;d.linkSeries();b&&d.redraw(c)}));return e},addAxis:function(a,b,c,d){var f=b?"xAxis":"yAxis",g=this.options;a=e(a,{index:this[f].length,isX:b});b=new F(this,a);g[f]=G(g[f]||{});g[f].push(a);y(c,!0)&&this.redraw(d);return b},showLoading:function(a){var b=this,c=b.options,e=b.loadingDiv,d=c.loading,f=function(){e&&m(e,{left:b.plotLeft+"px",top:b.plotTop+"px",width:b.plotWidth+
"px",height:b.plotHeight+"px"})};e||(b.loadingDiv=e=E("div",{className:"highcharts-loading highcharts-loading-hidden"},null,b.container),b.loadingSpan=E("span",{className:"highcharts-loading-inner"},null,e),C(b,"redraw",f));e.className="highcharts-loading";b.loadingSpan.innerHTML=a||c.lang.loading;m(e,u(d.style,{zIndex:10}));m(b.loadingSpan,d.labelStyle);b.loadingShown||(m(e,{opacity:0,display:""}),A(e,{opacity:d.style.opacity||.5},{duration:d.showDuration||0}));b.loadingShown=!0;f()},hideLoading:function(){var a=
this.options,b=this.loadingDiv;b&&(b.className="highcharts-loading highcharts-loading-hidden",A(b,{opacity:0},{duration:a.loading.hideDuration||100,complete:function(){m(b,{display:"none"})}}));this.loadingShown=!1},propsRequireDirtyBox:"backgroundColor borderColor borderWidth margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),
propsRequireUpdateSeries:"chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions tooltip".split(" "),update:function(a,b,c){var k=this,n={credits:"addCredits",title:"setTitle",subtitle:"setSubtitle"},q=a.chart,m,h,r=[];if(q){e(!0,k.options.chart,q);"className"in q&&k.setClassName(q.className);if("inverted"in q||"polar"in q)k.propFromSeries(),m=!0;"alignTicks"in q&&(m=!0);v(q,function(a,b){-1!==g("chart."+b,k.propsRequireUpdateSeries)&&(h=!0);-1!==g(b,k.propsRequireDirtyBox)&&
(k.isDirtyBox=!0)});"style"in q&&k.renderer.setStyle(q.style)}a.colors&&(this.options.colors=a.colors);a.plotOptions&&e(!0,this.options.plotOptions,a.plotOptions);v(a,function(a,b){if(k[b]&&"function"===typeof k[b].update)k[b].update(a,!1);else if("function"===typeof k[n[b]])k[n[b]](a);"chart"!==b&&-1!==g(b,k.propsRequireUpdateSeries)&&(h=!0)});l("xAxis yAxis zAxis series colorAxis pane".split(" "),function(b){a[b]&&(l(G(a[b]),function(a,e){(e=f(a.id)&&k.get(a.id)||k[b][e])&&e.coll===b&&(e.update(a,
!1),c&&(e.touched=!0));if(!e&&c)if("series"===b)k.addSeries(a,!1).touched=!0;else if("xAxis"===b||"yAxis"===b)k.addAxis(a,"xAxis"===b,!1).touched=!0}),c&&l(k[b],function(a){a.touched?delete a.touched:r.push(a)}))});l(r,function(a){a.remove(!1)});m&&l(k.axes,function(a){a.update({},!1)});h&&l(k.series,function(a){a.update({},!1)});a.loading&&e(!0,k.options.loading,a.loading);m=q&&q.width;q=q&&q.height;d(m)&&m!==k.chartWidth||d(q)&&q!==k.chartHeight?k.setSize(m,q):y(b,!0)&&k.redraw()},setSubtitle:function(a){this.setTitle(void 0,
a)}});u(n.prototype,{update:function(a,b,c,e){function d(){f.applyOptions(a);null===f.y&&h&&(f.graphic=h.destroy());k(a,!0)&&(h&&h.element&&a&&a.marker&&void 0!==a.marker.symbol&&(f.graphic=h.destroy()),a&&a.dataLabels&&f.dataLabel&&(f.dataLabel=f.dataLabel.destroy()));p=f.index;g.updateParallelArrays(f,p);q.data[p]=k(q.data[p],!0)||k(a,!0)?f.options:a;g.isDirty=g.isDirtyData=!0;!g.fixedBox&&g.hasCartesianSeries&&(l.isDirtyBox=!0);"point"===q.legendType&&(l.isDirtyLegend=!0);b&&l.redraw(c)}var f=
this,g=f.series,h=f.graphic,p,l=g.chart,q=g.options;b=y(b,!0);!1===e?d():f.firePointEvent("update",{options:a},d)},remove:function(a,b){this.series.removePoint(g(this,this.series.data),a,b)}});u(D.prototype,{addPoint:function(a,b,c,e){var d=this.options,f=this.data,g=this.chart,h=this.xAxis,h=h&&h.hasNames&&h.names,k=d.data,p,l,q=this.xData,n,m;b=y(b,!0);p={series:this};this.pointClass.prototype.applyOptions.apply(p,[a]);m=p.x;n=q.length;if(this.requireSorting&&m<q[n-1])for(l=!0;n&&q[n-1]>m;)n--;
this.updateParallelArrays(p,"splice",n,0,0);this.updateParallelArrays(p,n);h&&p.name&&(h[m]=p.name);k.splice(n,0,a);l&&(this.data.splice(n,0,null),this.processData());"point"===d.legendType&&this.generatePoints();c&&(f[0]&&f[0].remove?f[0].remove(!1):(f.shift(),this.updateParallelArrays(p,"shift"),k.shift()));this.isDirtyData=this.isDirty=!0;b&&g.redraw(e)},removePoint:function(a,b,e){var d=this,f=d.data,g=f[a],k=d.points,h=d.chart,l=function(){k&&k.length===f.length&&k.splice(a,1);f.splice(a,1);
d.options.data.splice(a,1);d.updateParallelArrays(g||{series:d},"splice",a,1);g&&g.destroy();d.isDirty=!0;d.isDirtyData=!0;b&&h.redraw()};c(e,h);b=y(b,!0);g?g.firePointEvent("remove",null,l):l()},remove:function(a,b,c){function e(){d.destroy();f.isDirtyLegend=f.isDirtyBox=!0;f.linkSeries();y(a,!0)&&f.redraw(b)}var d=this,f=d.chart;!1!==c?t(d,"remove",null,e):e()},update:function(a,b){var c=this,d=c.chart,f=c.userOptions,g=c.oldType||c.type,k=a.type||f.type||d.options.chart.type,h=J[g].prototype,n,
q=["group","markerGroup","dataLabelsGroup","navigatorSeries","baseSeries"],m=c.finishedAnimating&&{animation:!1};if(Object.keys&&"data"===Object.keys(a).toString())return this.setData(a.data,b);if(k&&k!==g||void 0!==a.zIndex)q.length=0;l(q,function(a){q[a]=c[a];delete c[a]});a=e(f,m,{index:c.index,pointStart:c.xData[0]},{data:c.options.data},a);c.remove(!1,null,!1);for(n in h)c[n]=void 0;u(c,J[k||g].prototype);l(q,function(a){c[a]=q[a]});c.init(d,a);c.oldType=g;d.linkSeries();y(b,!0)&&d.redraw(!1)}});
u(F.prototype,{update:function(a,b){var c=this.chart;a=c.options[this.coll][this.options.index]=e(this.userOptions,a);this.destroy(!0);this.init(c,u(a,{events:void 0}));c.isDirtyBox=!0;y(b,!0)&&c.redraw()},remove:function(a){for(var c=this.chart,e=this.coll,d=this.series,f=d.length;f--;)d[f]&&d[f].remove(!1);r(c.axes,this);r(c[e],this);b(c.options[e])?c.options[e].splice(this.options.index,1):delete c.options[e];l(c[e],function(a,b){a.options.index=b});this.destroy();c.isDirtyBox=!0;y(a,!0)&&c.redraw()},
setTitle:function(a,b){this.update({title:a},b)},setCategories:function(a,b){this.update({categories:a},b)}})})(M);(function(a){var C=a.color,A=a.each,F=a.map,E=a.pick,m=a.Series,f=a.seriesType;f("area","line",{softThreshold:!1,threshold:0},{singleStacks:!1,getStackPoints:function(f){var l=[],m=[],t=this.xAxis,g=this.yAxis,d=g.stacks[this.stackKey],k={},b=this.index,e=g.series,v=e.length,y,n=E(g.options.reversedStacks,!0)?1:-1,D;f=f||this.points;if(this.options.stacking){for(D=0;D<f.length;D++)k[f[D].x]=
f[D];a.objectEach(d,function(a,b){null!==a.total&&m.push(b)});m.sort(function(a,b){return a-b});y=F(e,function(){return this.visible});A(m,function(a,c){var e=0,f,r;if(k[a]&&!k[a].isNull)l.push(k[a]),A([-1,1],function(e){var g=1===e?"rightNull":"leftNull",l=0,q=d[m[c+e]];if(q)for(D=b;0<=D&&D<v;)f=q.points[D],f||(D===b?k[a][g]=!0:y[D]&&(r=d[a].points[D])&&(l-=r[1]-r[0])),D+=n;k[a][1===e?"rightCliff":"leftCliff"]=l});else{for(D=b;0<=D&&D<v;){if(f=d[a].points[D]){e=f[1];break}D+=n}e=g.translate(e,0,
1,0,1);l.push({isNull:!0,plotX:t.translate(a,0,0,0,1),x:a,plotY:e,yBottom:e})}})}return l},getGraphPath:function(a){var f=m.prototype.getGraphPath,l=this.options,t=l.stacking,g=this.yAxis,d,k,b=[],e=[],v=this.index,y,n=g.stacks[this.stackKey],D=l.threshold,A=g.getThreshold(l.threshold),c,l=l.connectNulls||"percent"===t,G=function(c,d,f){var k=a[c];c=t&&n[k.x].points[v];var l=k[f+"Null"]||0;f=k[f+"Cliff"]||0;var q,m,k=!0;f||l?(q=(l?c[0]:c[1])+f,m=c[0]+f,k=!!l):!t&&a[d]&&a[d].isNull&&(q=m=D);void 0!==
q&&(e.push({plotX:y,plotY:null===q?A:g.getThreshold(q),isNull:k,isCliff:!0}),b.push({plotX:y,plotY:null===m?A:g.getThreshold(m),doCurve:!1}))};a=a||this.points;t&&(a=this.getStackPoints(a));for(d=0;d<a.length;d++)if(k=a[d].isNull,y=E(a[d].rectPlotX,a[d].plotX),c=E(a[d].yBottom,A),!k||l)l||G(d,d-1,"left"),k&&!t&&l||(e.push(a[d]),b.push({x:d,plotX:y,plotY:c})),l||G(d,d+1,"right");d=f.call(this,e,!0,!0);b.reversed=!0;k=f.call(this,b,!0,!0);k.length&&(k[0]="L");k=d.concat(k);f=f.call(this,e,!1,l);k.xMap=
d.xMap;this.areaPath=k;return f},drawGraph:function(){this.areaPath=[];m.prototype.drawGraph.apply(this);var a=this,f=this.areaPath,u=this.options,t=[["area","highcharts-area",this.color,u.fillColor]];A(this.zones,function(f,d){t.push(["zone-area-"+d,"highcharts-area highcharts-zone-area-"+d+" "+f.className,f.color||a.color,f.fillColor||u.fillColor])});A(t,function(g){var d=g[0],k=a[d];k?(k.endX=f.xMap,k.animate({d:f})):(k=a[d]=a.chart.renderer.path(f).addClass(g[1]).attr({fill:E(g[3],C(g[2]).setOpacity(E(u.fillOpacity,
.75)).get()),zIndex:0}).add(a.group),k.isArea=!0);k.startX=f.xMap;k.shiftUnit=u.step?2:1})},drawLegendSymbol:a.LegendSymbolMixin.drawRectangle})})(M);(function(a){var C=a.pick;a=a.seriesType;a("spline","line",{},{getPointSpline:function(a,F,E){var m=F.plotX,f=F.plotY,l=a[E-1];E=a[E+1];var r,u,t,g;if(l&&!l.isNull&&!1!==l.doCurve&&!F.isCliff&&E&&!E.isNull&&!1!==E.doCurve&&!F.isCliff){a=l.plotY;t=E.plotX;E=E.plotY;var d=0;r=(1.5*m+l.plotX)/2.5;u=(1.5*f+a)/2.5;t=(1.5*m+t)/2.5;g=(1.5*f+E)/2.5;t!==r&&(d=
(g-u)*(t-m)/(t-r)+f-g);u+=d;g+=d;u>a&&u>f?(u=Math.max(a,f),g=2*f-u):u<a&&u<f&&(u=Math.min(a,f),g=2*f-u);g>E&&g>f?(g=Math.max(E,f),u=2*f-g):g<E&&g<f&&(g=Math.min(E,f),u=2*f-g);F.rightContX=t;F.rightContY=g}F=["C",C(l.rightContX,l.plotX),C(l.rightContY,l.plotY),C(r,m),C(u,f),m,f];l.rightContX=l.rightContY=null;return F}})})(M);(function(a){var C=a.seriesTypes.area.prototype,A=a.seriesType;A("areaspline","spline",a.defaultPlotOptions.area,{getStackPoints:C.getStackPoints,getGraphPath:C.getGraphPath,
drawGraph:C.drawGraph,drawLegendSymbol:a.LegendSymbolMixin.drawRectangle})})(M);(function(a){var C=a.animObject,A=a.color,F=a.each,E=a.extend,m=a.isNumber,f=a.merge,l=a.pick,r=a.Series,u=a.seriesType,t=a.svg;u("column","line",{borderRadius:0,crisp:!0,groupPadding:.2,marker:null,pointPadding:.1,minPointLength:0,cropThreshold:50,pointRange:null,states:{hover:{halo:!1,brightness:.1,shadow:!1},select:{color:"#cccccc",borderColor:"#000000",shadow:!1}},dataLabels:{align:null,verticalAlign:null,y:null},
softThreshold:!1,startFromThreshold:!0,stickyTracking:!1,tooltip:{distance:6},threshold:0,borderColor:"#ffffff"},{cropShoulder:0,directTouch:!0,trackerGroups:["group","dataLabelsGroup"],negStacks:!0,init:function(){r.prototype.init.apply(this,arguments);var a=this,d=a.chart;d.hasRendered&&F(d.series,function(d){d.type===a.type&&(d.isDirty=!0)})},getColumnMetrics:function(){var a=this,d=a.options,f=a.xAxis,b=a.yAxis,e=f.reversed,m,r={},n=0;!1===d.grouping?n=1:F(a.chart.series,function(c){var e=c.options,
d=c.yAxis,f;c.type!==a.type||!c.visible&&a.chart.options.chart.ignoreHiddenSeries||b.len!==d.len||b.pos!==d.pos||(e.stacking?(m=c.stackKey,void 0===r[m]&&(r[m]=n++),f=r[m]):!1!==e.grouping&&(f=n++),c.columnIndex=f)});var t=Math.min(Math.abs(f.transA)*(f.ordinalSlope||d.pointRange||f.closestPointRange||f.tickInterval||1),f.len),u=t*d.groupPadding,c=(t-2*u)/(n||1),d=Math.min(d.maxPointWidth||f.len,l(d.pointWidth,c*(1-2*d.pointPadding)));a.columnMetrics={width:d,offset:(c-d)/2+(u+((a.columnIndex||0)+
(e?1:0))*c-t/2)*(e?-1:1)};return a.columnMetrics},crispCol:function(a,d,f,b){var e=this.chart,g=this.borderWidth,k=-(g%2?.5:0),g=g%2?.5:1;e.inverted&&e.renderer.isVML&&(g+=1);this.options.crisp&&(f=Math.round(a+f)+k,a=Math.round(a)+k,f-=a);b=Math.round(d+b)+g;k=.5>=Math.abs(d)&&.5<b;d=Math.round(d)+g;b-=d;k&&b&&(--d,b+=1);return{x:a,y:d,width:f,height:b}},translate:function(){var a=this,d=a.chart,f=a.options,b=a.dense=2>a.closestPointRange*a.xAxis.transA,b=a.borderWidth=l(f.borderWidth,b?0:1),e=a.yAxis,
m=a.translatedThreshold=e.getThreshold(f.threshold),t=l(f.minPointLength,5),n=a.getColumnMetrics(),u=n.width,A=a.barW=Math.max(u,1+2*b),c=a.pointXOffset=n.offset;d.inverted&&(m-=.5);f.pointPadding&&(A=Math.ceil(A));r.prototype.translate.apply(a);F(a.points,function(b){var f=l(b.yBottom,m),g=999+Math.abs(f),g=Math.min(Math.max(-g,b.plotY),e.len+g),k=b.plotX+c,n=A,r=Math.min(g,f),v,y=Math.max(g,f)-r;Math.abs(y)<t&&t&&(y=t,v=!e.reversed&&!b.negative||e.reversed&&b.negative,r=Math.abs(r-m)>t?f-t:m-(v?
t:0));b.barX=k;b.pointWidth=u;b.tooltipPos=d.inverted?[e.len+e.pos-d.plotLeft-g,a.xAxis.len-k-n/2,y]:[k+n/2,g+e.pos-d.plotTop,y];b.shapeType="rect";b.shapeArgs=a.crispCol.apply(a,b.isNull?[k,m,n,0]:[k,r,n,y])})},getSymbol:a.noop,drawLegendSymbol:a.LegendSymbolMixin.drawRectangle,drawGraph:function(){this.group[this.dense?"addClass":"removeClass"]("highcharts-dense-data")},pointAttribs:function(a,d){var g=this.options,b,e=this.pointAttrToOptions||{};b=e.stroke||"borderColor";var l=e["stroke-width"]||
"borderWidth",m=a&&a.color||this.color,n=a[b]||g[b]||this.color||m,r=a[l]||g[l]||this[l]||0,e=g.dashStyle;a&&this.zones.length&&(m=a.getZone(),m=a.options.color||m&&m.color||this.color);d&&(a=f(g.states[d],a.options.states&&a.options.states[d]||{}),d=a.brightness,m=a.color||void 0!==d&&A(m).brighten(a.brightness).get()||m,n=a[b]||n,r=a[l]||r,e=a.dashStyle||e);b={fill:m,stroke:n,"stroke-width":r};e&&(b.dashstyle=e);return b},drawPoints:function(){var a=this,d=this.chart,k=a.options,b=d.renderer,e=
k.animationLimit||250,l;F(a.points,function(g){var n=g.graphic;if(m(g.plotY)&&null!==g.y){l=g.shapeArgs;if(n)n[d.pointCount<e?"animate":"attr"](f(l));else g.graphic=n=b[g.shapeType](l).add(g.group||a.group);k.borderRadius&&n.attr({r:k.borderRadius});n.attr(a.pointAttribs(g,g.selected&&"select")).shadow(k.shadow,null,k.stacking&&!k.borderRadius);n.addClass(g.getClassName(),!0)}else n&&(g.graphic=n.destroy())})},animate:function(a){var d=this,f=this.yAxis,b=d.options,e=this.chart.inverted,g={};t&&(a?
(g.scaleY=.001,a=Math.min(f.pos+f.len,Math.max(f.pos,f.toPixels(b.threshold))),e?g.translateX=a-f.len:g.translateY=a,d.group.attr(g)):(g[e?"translateX":"translateY"]=f.pos,d.group.animate(g,E(C(d.options.animation),{step:function(a,b){d.group.attr({scaleY:Math.max(.001,b.pos)})}})),d.animate=null))},remove:function(){var a=this,d=a.chart;d.hasRendered&&F(d.series,function(d){d.type===a.type&&(d.isDirty=!0)});r.prototype.remove.apply(a,arguments)}})})(M);(function(a){a=a.seriesType;a("bar","column",
null,{inverted:!0})})(M);(function(a){var C=a.Series;a=a.seriesType;a("scatter","line",{lineWidth:0,findNearestPointBy:"xy",marker:{enabled:!0},tooltip:{headerFormat:'\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e \x3cspan style\x3d"font-size: 0.85em"\x3e {series.name}\x3c/span\x3e\x3cbr/\x3e',pointFormat:"x: \x3cb\x3e{point.x}\x3c/b\x3e\x3cbr/\x3ey: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e"}},{sorted:!1,requireSorting:!1,noSharedTooltip:!0,trackerGroups:["group","markerGroup","dataLabelsGroup"],
takeOrdinalPosition:!1,drawGraph:function(){this.options.lineWidth&&C.prototype.drawGraph.call(this)}})})(M);(function(a){var C=a.pick,A=a.relativeLength;a.CenteredSeriesMixin={getCenter:function(){var a=this.options,E=this.chart,m=2*(a.slicedOffset||0),f=E.plotWidth-2*m,E=E.plotHeight-2*m,l=a.center,l=[C(l[0],"50%"),C(l[1],"50%"),a.size||"100%",a.innerSize||0],r=Math.min(f,E),u,t;for(u=0;4>u;++u)t=l[u],a=2>u||2===u&&/%$/.test(t),l[u]=A(t,[f,E,r,l[2]][u])+(a?m:0);l[3]>l[2]&&(l[3]=l[2]);return l}}})(M);
(function(a){var C=a.addEvent,A=a.defined,F=a.each,E=a.extend,m=a.inArray,f=a.noop,l=a.pick,r=a.Point,u=a.Series,t=a.seriesType,g=a.setAnimation;t("pie","line",{center:[null,null],clip:!1,colorByPoint:!0,dataLabels:{distance:30,enabled:!0,formatter:function(){return this.point.isNull?void 0:this.point.name},x:0},ignoreHiddenPoint:!0,legendType:"point",marker:null,size:null,showInLegend:!1,slicedOffset:10,stickyTracking:!1,tooltip:{followPointer:!0},borderColor:"#ffffff",borderWidth:1,states:{hover:{brightness:.1,
shadow:!1}}},{isCartesian:!1,requireSorting:!1,directTouch:!0,noSharedTooltip:!0,trackerGroups:["group","dataLabelsGroup"],axisTypes:[],pointAttribs:a.seriesTypes.column.prototype.pointAttribs,animate:function(a){var d=this,b=d.points,e=d.startAngleRad;a||(F(b,function(a){var b=a.graphic,f=a.shapeArgs;b&&(b.attr({r:a.startR||d.center[3]/2,start:e,end:e}),b.animate({r:f.r,start:f.start,end:f.end},d.options.animation))}),d.animate=null)},updateTotals:function(){var a,f=0,b=this.points,e=b.length,g,
l=this.options.ignoreHiddenPoint;for(a=0;a<e;a++)g=b[a],f+=l&&!g.visible?0:g.isNull?0:g.y;this.total=f;for(a=0;a<e;a++)g=b[a],g.percentage=0<f&&(g.visible||!l)?g.y/f*100:0,g.total=f},generatePoints:function(){u.prototype.generatePoints.call(this);this.updateTotals()},translate:function(a){this.generatePoints();var d=0,b=this.options,e=b.slicedOffset,f=e+(b.borderWidth||0),g,n,m,r=b.startAngle||0,c=this.startAngleRad=Math.PI/180*(r-90),r=(this.endAngleRad=Math.PI/180*(l(b.endAngle,r+360)-90))-c,t=
this.points,q,B=b.dataLabels.distance,b=b.ignoreHiddenPoint,u,p=t.length,z;a||(this.center=a=this.getCenter());this.getX=function(b,c,e){m=Math.asin(Math.min((b-a[1])/(a[2]/2+e.labelDistance),1));return a[0]+(c?-1:1)*Math.cos(m)*(a[2]/2+e.labelDistance)};for(u=0;u<p;u++){z=t[u];z.labelDistance=l(z.options.dataLabels&&z.options.dataLabels.distance,B);this.maxLabelDistance=Math.max(this.maxLabelDistance||0,z.labelDistance);g=c+d*r;if(!b||z.visible)d+=z.percentage/100;n=c+d*r;z.shapeType="arc";z.shapeArgs=
{x:a[0],y:a[1],r:a[2]/2,innerR:a[3]/2,start:Math.round(1E3*g)/1E3,end:Math.round(1E3*n)/1E3};m=(n+g)/2;m>1.5*Math.PI?m-=2*Math.PI:m<-Math.PI/2&&(m+=2*Math.PI);z.slicedTranslation={translateX:Math.round(Math.cos(m)*e),translateY:Math.round(Math.sin(m)*e)};n=Math.cos(m)*a[2]/2;q=Math.sin(m)*a[2]/2;z.tooltipPos=[a[0]+.7*n,a[1]+.7*q];z.half=m<-Math.PI/2||m>Math.PI/2?1:0;z.angle=m;g=Math.min(f,z.labelDistance/5);z.labelPos=[a[0]+n+Math.cos(m)*z.labelDistance,a[1]+q+Math.sin(m)*z.labelDistance,a[0]+n+Math.cos(m)*
g,a[1]+q+Math.sin(m)*g,a[0]+n,a[1]+q,0>z.labelDistance?"center":z.half?"right":"left",m]}},drawGraph:null,drawPoints:function(){var a=this,f=a.chart.renderer,b,e,g,l,n=a.options.shadow;n&&!a.shadowGroup&&(a.shadowGroup=f.g("shadow").add(a.group));F(a.points,function(d){if(!d.isNull){e=d.graphic;l=d.shapeArgs;b=d.getTranslate();var k=d.shadowGroup;n&&!k&&(k=d.shadowGroup=f.g("shadow").add(a.shadowGroup));k&&k.attr(b);g=a.pointAttribs(d,d.selected&&"select");e?e.setRadialReference(a.center).attr(g).animate(E(l,
b)):(d.graphic=e=f[d.shapeType](l).setRadialReference(a.center).attr(b).add(a.group),d.visible||e.attr({visibility:"hidden"}),e.attr(g).attr({"stroke-linejoin":"round"}).shadow(n,k));e.addClass(d.getClassName())}})},searchPoint:f,sortByAngle:function(a,f){a.sort(function(a,e){return void 0!==a.angle&&(e.angle-a.angle)*f})},drawLegendSymbol:a.LegendSymbolMixin.drawRectangle,getCenter:a.CenteredSeriesMixin.getCenter,getSymbol:f},{init:function(){r.prototype.init.apply(this,arguments);var a=this,f;a.name=
l(a.name,"Slice");f=function(b){a.slice("select"===b.type)};C(a,"select",f);C(a,"unselect",f);return a},isValid:function(){return a.isNumber(this.y,!0)&&0<=this.y},setVisible:function(a,f){var b=this,e=b.series,d=e.chart,g=e.options.ignoreHiddenPoint;f=l(f,g);a!==b.visible&&(b.visible=b.options.visible=a=void 0===a?!b.visible:a,e.options.data[m(b,e.data)]=b.options,F(["graphic","dataLabel","connector","shadowGroup"],function(e){if(b[e])b[e][a?"show":"hide"](!0)}),b.legendItem&&d.legend.colorizeItem(b,
a),a||"hover"!==b.state||b.setState(""),g&&(e.isDirty=!0),f&&d.redraw())},slice:function(a,f,b){var e=this.series;g(b,e.chart);l(f,!0);this.sliced=this.options.sliced=A(a)?a:!this.sliced;e.options.data[m(this,e.data)]=this.options;this.graphic.animate(this.getTranslate());this.shadowGroup&&this.shadowGroup.animate(this.getTranslate())},getTranslate:function(){return this.sliced?this.slicedTranslation:{translateX:0,translateY:0}},haloPath:function(a){var d=this.shapeArgs;return this.sliced||!this.visible?
[]:this.series.chart.renderer.symbols.arc(d.x,d.y,d.r+a,d.r+a,{innerR:this.shapeArgs.r,start:d.start,end:d.end})}})})(M);(function(a){var C=a.addEvent,A=a.arrayMax,F=a.defined,E=a.each,m=a.extend,f=a.format,l=a.map,r=a.merge,u=a.noop,t=a.pick,g=a.relativeLength,d=a.Series,k=a.seriesTypes,b=a.stableSort;a.distribute=function(a,d){function e(a,b){return a.target-b.target}var f,g=!0,k=a,c=[],m;m=0;for(f=a.length;f--;)m+=a[f].size;if(m>d){b(a,function(a,b){return(b.rank||0)-(a.rank||0)});for(m=f=0;m<=
d;)m+=a[f].size,f++;c=a.splice(f-1,a.length)}b(a,e);for(a=l(a,function(a){return{size:a.size,targets:[a.target]}});g;){for(f=a.length;f--;)g=a[f],m=(Math.min.apply(0,g.targets)+Math.max.apply(0,g.targets))/2,g.pos=Math.min(Math.max(0,m-g.size/2),d-g.size);f=a.length;for(g=!1;f--;)0<f&&a[f-1].pos+a[f-1].size>a[f].pos&&(a[f-1].size+=a[f].size,a[f-1].targets=a[f-1].targets.concat(a[f].targets),a[f-1].pos+a[f-1].size>d&&(a[f-1].pos=d-a[f-1].size),a.splice(f,1),g=!0)}f=0;E(a,function(a){var b=0;E(a.targets,
function(){k[f].pos=a.pos+b;b+=k[f].size;f++})});k.push.apply(k,c);b(k,e)};d.prototype.drawDataLabels=function(){var b=this,d=b.options,g=d.dataLabels,k=b.points,l,m,c=b.hasRendered||0,u,q,B=t(g.defer,!!d.animation),A=b.chart.renderer;if(g.enabled||b._hasPointLabels)b.dlProcessOptions&&b.dlProcessOptions(g),q=b.plotGroup("dataLabelsGroup","data-labels",B&&!c?"hidden":"visible",g.zIndex||6),B&&(q.attr({opacity:+c}),c||C(b,"afterAnimate",function(){b.visible&&q.show(!0);q[d.animation?"animate":"attr"]({opacity:1},
{duration:200})})),m=g,E(k,function(c){var e,k=c.dataLabel,n,h,p=c.connector,v=!k,B;l=c.dlOptions||c.options&&c.options.dataLabels;if(e=t(l&&l.enabled,m.enabled)&&null!==c.y)g=r(m,l),n=c.getLabelConfig(),u=g.format?f(g.format,n):g.formatter.call(n,g),B=g.style,n=g.rotation,B.color=t(g.color,B.color,b.color,"#000000"),"contrast"===B.color&&(c.contrastColor=A.getContrast(c.color||b.color),B.color=g.inside||0>t(c.labelDistance,g.distance)||d.stacking?c.contrastColor:"#000000"),d.cursor&&(B.cursor=d.cursor),
h={fill:g.backgroundColor,stroke:g.borderColor,"stroke-width":g.borderWidth,r:g.borderRadius||0,rotation:n,padding:g.padding,zIndex:1},a.objectEach(h,function(a,b){void 0===a&&delete h[b]});!k||e&&F(u)?e&&F(u)&&(k?h.text=u:(k=c.dataLabel=A[n?"text":"label"](u,0,-9999,g.shape,null,null,g.useHTML,null,"data-label"),k.addClass("highcharts-data-label-color-"+c.colorIndex+" "+(g.className||"")+(g.useHTML?"highcharts-tracker":""))),k.attr(h),k.css(B).shadow(g.shadow),k.added||k.add(q),b.alignDataLabel(c,
k,g,null,v)):(c.dataLabel=k=k.destroy(),p&&(c.connector=p.destroy()))})};d.prototype.alignDataLabel=function(a,b,d,f,g){var e=this.chart,c=e.inverted,k=t(a.plotX,-9999),l=t(a.plotY,-9999),n=b.getBBox(),r,p=d.rotation,v=d.align,u=this.visible&&(a.series.forceDL||e.isInsidePlot(k,Math.round(l),c)||f&&e.isInsidePlot(k,c?f.x+1:f.y+f.height-1,c)),y="justify"===t(d.overflow,"justify");if(u&&(r=d.style.fontSize,r=e.renderer.fontMetrics(r,b).b,f=m({x:c?this.yAxis.len-l:k,y:Math.round(c?this.xAxis.len-k:l),
width:0,height:0},f),m(d,{width:n.width,height:n.height}),p?(y=!1,k=e.renderer.rotCorr(r,p),k={x:f.x+d.x+f.width/2+k.x,y:f.y+d.y+{top:0,middle:.5,bottom:1}[d.verticalAlign]*f.height},b[g?"attr":"animate"](k).attr({align:v}),l=(p+720)%360,l=180<l&&360>l,"left"===v?k.y-=l?n.height:0:"center"===v?(k.x-=n.width/2,k.y-=n.height/2):"right"===v&&(k.x-=n.width,k.y-=l?0:n.height)):(b.align(d,null,f),k=b.alignAttr),y?a.isLabelJustified=this.justifyDataLabel(b,d,k,n,f,g):t(d.crop,!0)&&(u=e.isInsidePlot(k.x,
k.y)&&e.isInsidePlot(k.x+n.width,k.y+n.height)),d.shape&&!p))b[g?"attr":"animate"]({anchorX:c?e.plotWidth-a.plotY:a.plotX,anchorY:c?e.plotHeight-a.plotX:a.plotY});u||(b.attr({y:-9999}),b.placed=!1)};d.prototype.justifyDataLabel=function(a,b,d,f,g,k){var c=this.chart,e=b.align,l=b.verticalAlign,m,n,p=a.box?0:a.padding||0;m=d.x+p;0>m&&("right"===e?b.align="left":b.x=-m,n=!0);m=d.x+f.width-p;m>c.plotWidth&&("left"===e?b.align="right":b.x=c.plotWidth-m,n=!0);m=d.y+p;0>m&&("bottom"===l?b.verticalAlign=
"top":b.y=-m,n=!0);m=d.y+f.height-p;m>c.plotHeight&&("top"===l?b.verticalAlign="bottom":b.y=c.plotHeight-m,n=!0);n&&(a.placed=!k,a.align(b,null,g));return n};k.pie&&(k.pie.prototype.drawDataLabels=function(){var b=this,f=b.data,g,k=b.chart,l=b.options.dataLabels,m=t(l.connectorPadding,10),c=t(l.connectorWidth,1),r=k.plotWidth,q=k.plotHeight,u,C=b.center,p=C[2]/2,z=C[1],I,L,h,w,M=[[],[]],H,O,Q,R,x=[0,0,0,0];b.visible&&(l.enabled||b._hasPointLabels)&&(E(f,function(a){a.dataLabel&&a.visible&&a.dataLabel.shortened&&
(a.dataLabel.attr({width:"auto"}).css({width:"auto",textOverflow:"clip"}),a.dataLabel.shortened=!1)}),d.prototype.drawDataLabels.apply(b),E(f,function(a){a.dataLabel&&a.visible&&(M[a.half].push(a),a.dataLabel._pos=null)}),E(M,function(c,d){var e,f,n=c.length,v=[],u;if(n)for(b.sortByAngle(c,d-.5),0<b.maxLabelDistance&&(e=Math.max(0,z-p-b.maxLabelDistance),f=Math.min(z+p+b.maxLabelDistance,k.plotHeight),E(c,function(a){0<a.labelDistance&&a.dataLabel&&(a.top=Math.max(0,z-p-a.labelDistance),a.bottom=
Math.min(z+p+a.labelDistance,k.plotHeight),u=a.dataLabel.getBBox().height||21,a.positionsIndex=v.push({target:a.labelPos[1]-a.top+u/2,size:u,rank:a.y})-1)}),a.distribute(v,f+u-e)),R=0;R<n;R++)g=c[R],f=g.positionsIndex,h=g.labelPos,I=g.dataLabel,Q=!1===g.visible?"hidden":"inherit",e=h[1],v&&F(v[f])?void 0===v[f].pos?Q="hidden":(w=v[f].size,O=g.top+v[f].pos):O=e,delete g.positionIndex,H=l.justify?C[0]+(d?-1:1)*(p+g.labelDistance):b.getX(O<g.top+2||O>g.bottom-2?e:O,d,g),I._attr={visibility:Q,align:h[6]},
I._pos={x:H+l.x+({left:m,right:-m}[h[6]]||0),y:O+l.y-10},h.x=H,h.y=O,t(l.crop,!0)&&(L=I.getBBox().width,e=null,H-L<m?(e=Math.round(L-H+m),x[3]=Math.max(e,x[3])):H+L>r-m&&(e=Math.round(H+L-r+m),x[1]=Math.max(e,x[1])),0>O-w/2?x[0]=Math.max(Math.round(-O+w/2),x[0]):O+w/2>q&&(x[2]=Math.max(Math.round(O+w/2-q),x[2])),I.sideOverflow=e)}),0===A(x)||this.verifyDataLabelOverflow(x))&&(this.placeDataLabels(),c&&E(this.points,function(a){var e;u=a.connector;if((I=a.dataLabel)&&I._pos&&a.visible&&0<a.labelDistance){Q=
I._attr.visibility;if(e=!u)a.connector=u=k.renderer.path().addClass("highcharts-data-label-connector highcharts-color-"+a.colorIndex).add(b.dataLabelsGroup),u.attr({"stroke-width":c,stroke:l.connectorColor||a.color||"#666666"});u[e?"attr":"animate"]({d:b.connectorPath(a.labelPos)});u.attr("visibility",Q)}else u&&(a.connector=u.destroy())}))},k.pie.prototype.connectorPath=function(a){var b=a.x,d=a.y;return t(this.options.dataLabels.softConnector,!0)?["M",b+("left"===a[6]?5:-5),d,"C",b,d,2*a[2]-a[4],
2*a[3]-a[5],a[2],a[3],"L",a[4],a[5]]:["M",b+("left"===a[6]?5:-5),d,"L",a[2],a[3],"L",a[4],a[5]]},k.pie.prototype.placeDataLabels=function(){E(this.points,function(a){var b=a.dataLabel;b&&a.visible&&((a=b._pos)?(b.sideOverflow&&(b._attr.width=b.getBBox().width-b.sideOverflow,b.css({width:b._attr.width+"px",textOverflow:"ellipsis"}),b.shortened=!0),b.attr(b._attr),b[b.moved?"animate":"attr"](a),b.moved=!0):b&&b.attr({y:-9999}))},this)},k.pie.prototype.alignDataLabel=u,k.pie.prototype.verifyDataLabelOverflow=
function(a){var b=this.center,d=this.options,e=d.center,f=d.minSize||80,k,c=null!==d.size;c||(null!==e[0]?k=Math.max(b[2]-Math.max(a[1],a[3]),f):(k=Math.max(b[2]-a[1]-a[3],f),b[0]+=(a[3]-a[1])/2),null!==e[1]?k=Math.max(Math.min(k,b[2]-Math.max(a[0],a[2])),f):(k=Math.max(Math.min(k,b[2]-a[0]-a[2]),f),b[1]+=(a[0]-a[2])/2),k<b[2]?(b[2]=k,b[3]=Math.min(g(d.innerSize||0,k),k),this.translate(b),this.drawDataLabels&&this.drawDataLabels()):c=!0);return c});k.column&&(k.column.prototype.alignDataLabel=function(a,
b,f,g,k){var e=this.chart.inverted,c=a.series,l=a.dlBox||a.shapeArgs,m=t(a.below,a.plotY>t(this.translatedThreshold,c.yAxis.len)),n=t(f.inside,!!this.options.stacking);l&&(g=r(l),0>g.y&&(g.height+=g.y,g.y=0),l=g.y+g.height-c.yAxis.len,0<l&&(g.height-=l),e&&(g={x:c.yAxis.len-g.y-g.height,y:c.xAxis.len-g.x-g.width,width:g.height,height:g.width}),n||(e?(g.x+=m?0:g.width,g.width=0):(g.y+=m?g.height:0,g.height=0)));f.align=t(f.align,!e||n?"center":m?"right":"left");f.verticalAlign=t(f.verticalAlign,e||
n?"middle":m?"top":"bottom");d.prototype.alignDataLabel.call(this,a,b,f,g,k);a.isLabelJustified&&a.contrastColor&&a.dataLabel.css({color:a.contrastColor})})})(M);(function(a){var C=a.Chart,A=a.each,F=a.objectEach,E=a.pick,m=a.addEvent;C.prototype.callbacks.push(function(a){function f(){var f=[];A(a.yAxis||[],function(a){a.options.stackLabels&&!a.options.stackLabels.allowOverlap&&F(a.stacks,function(a){F(a,function(a){f.push(a.label)})})});A(a.series||[],function(a){var l=a.options.dataLabels,g=a.dataLabelCollections||
["dataLabel"];(l.enabled||a._hasPointLabels)&&!l.allowOverlap&&a.visible&&A(g,function(d){A(a.points,function(a){a[d]&&(a[d].labelrank=E(a.labelrank,a.shapeArgs&&a.shapeArgs.height),f.push(a[d]))})})});a.hideOverlappingLabels(f)}f();m(a,"redraw",f)});C.prototype.hideOverlappingLabels=function(a){var f=a.length,m,u,t,g,d,k,b,e,v,y=function(a,b,d,c,e,f,g,k){return!(e>a+d||e+g<a||f>b+c||f+k<b)};for(u=0;u<f;u++)if(m=a[u])m.oldOpacity=m.opacity,m.newOpacity=1,m.width||(t=m.getBBox(),m.width=t.width,m.height=
t.height);a.sort(function(a,b){return(b.labelrank||0)-(a.labelrank||0)});for(u=0;u<f;u++)for(t=a[u],m=u+1;m<f;++m)if(g=a[m],t&&g&&t!==g&&t.placed&&g.placed&&0!==t.newOpacity&&0!==g.newOpacity&&(d=t.alignAttr,k=g.alignAttr,b=t.parentGroup,e=g.parentGroup,v=2*(t.box?0:t.padding||0),d=y(d.x+b.translateX,d.y+b.translateY,t.width-v,t.height-v,k.x+e.translateX,k.y+e.translateY,g.width-v,g.height-v)))(t.labelrank<g.labelrank?t:g).newOpacity=0;A(a,function(a){var b,d;a&&(d=a.newOpacity,a.oldOpacity!==d&&
a.placed&&(d?a.show(!0):b=function(){a.hide()},a.alignAttr.opacity=d,a[a.isOld?"animate":"attr"](a.alignAttr,null,b)),a.isOld=!0)})}})(M);(function(a){var C=a.addEvent,A=a.Chart,F=a.createElement,E=a.css,m=a.defaultOptions,f=a.defaultPlotOptions,l=a.each,r=a.extend,u=a.fireEvent,t=a.hasTouch,g=a.inArray,d=a.isObject,k=a.Legend,b=a.merge,e=a.pick,v=a.Point,y=a.Series,n=a.seriesTypes,D=a.svg,J;J=a.TrackerMixin={drawTrackerPoint:function(){var a=this,b=a.chart.pointer,d=function(a){var c=b.getPointFromEvent(a);
void 0!==c&&(b.isDirectTouch=!0,c.onMouseOver(a))};l(a.points,function(a){a.graphic&&(a.graphic.element.point=a);a.dataLabel&&(a.dataLabel.div?a.dataLabel.div.point=a:a.dataLabel.element.point=a)});a._hasTracking||(l(a.trackerGroups,function(c){if(a[c]){a[c].addClass("highcharts-tracker").on("mouseover",d).on("mouseout",function(a){b.onTrackerMouseOut(a)});if(t)a[c].on("touchstart",d);a.options.cursor&&a[c].css(E).css({cursor:a.options.cursor})}}),a._hasTracking=!0)},drawTrackerGraph:function(){var a=
this,b=a.options,d=b.trackByArea,e=[].concat(d?a.areaPath:a.graphPath),f=e.length,g=a.chart,k=g.pointer,m=g.renderer,n=g.options.tooltip.snap,h=a.tracker,r,u=function(){if(g.hoverSeries!==a)a.onMouseOver()},v="rgba(192,192,192,"+(D?.0001:.002)+")";if(f&&!d)for(r=f+1;r--;)"M"===e[r]&&e.splice(r+1,0,e[r+1]-n,e[r+2],"L"),(r&&"M"===e[r]||r===f)&&e.splice(r,0,"L",e[r-2]+n,e[r-1]);h?h.attr({d:e}):a.graph&&(a.tracker=m.path(e).attr({"stroke-linejoin":"round",visibility:a.visible?"visible":"hidden",stroke:v,
fill:d?v:"none","stroke-width":a.graph.strokeWidth()+(d?0:2*n),zIndex:2}).add(a.group),l([a.tracker,a.markerGroup],function(a){a.addClass("highcharts-tracker").on("mouseover",u).on("mouseout",function(a){k.onTrackerMouseOut(a)});b.cursor&&a.css({cursor:b.cursor});if(t)a.on("touchstart",u)}))}};n.column&&(n.column.prototype.drawTracker=J.drawTrackerPoint);n.pie&&(n.pie.prototype.drawTracker=J.drawTrackerPoint);n.scatter&&(n.scatter.prototype.drawTracker=J.drawTrackerPoint);r(k.prototype,{setItemEvents:function(a,
d,e){var c=this,f=c.chart.renderer.boxWrapper,g="highcharts-legend-"+(a.series?"point":"series")+"-active";(e?d:a.legendGroup).on("mouseover",function(){a.setState("hover");f.addClass(g);d.css(c.options.itemHoverStyle)}).on("mouseout",function(){d.css(b(a.visible?c.itemStyle:c.itemHiddenStyle));f.removeClass(g);a.setState()}).on("click",function(b){var c=function(){a.setVisible&&a.setVisible()};b={browserEvent:b};a.firePointEvent?a.firePointEvent("legendItemClick",b,c):u(a,"legendItemClick",b,c)})},
createCheckboxForItem:function(a){a.checkbox=F("input",{type:"checkbox",checked:a.selected,defaultChecked:a.selected},this.options.itemCheckboxStyle,this.chart.container);C(a.checkbox,"click",function(b){u(a.series||a,"checkboxClick",{checked:b.target.checked,item:a},function(){a.select()})})}});m.legend.itemStyle.cursor="pointer";r(A.prototype,{showResetZoom:function(){var a=this,b=m.lang,d=a.options.chart.resetZoomButton,e=d.theme,f=e.states,g="chart"===d.relativeTo?null:"plotBox";this.resetZoomButton=
a.renderer.button(b.resetZoom,null,null,function(){a.zoomOut()},e,f&&f.hover).attr({align:d.position.align,title:b.resetZoomTitle}).addClass("highcharts-reset-zoom").add().align(d.position,!1,g)},zoomOut:function(){var a=this;u(a,"selection",{resetSelection:!0},function(){a.zoom()})},zoom:function(a){var b,c=this.pointer,f=!1,g;!a||a.resetSelection?(l(this.axes,function(a){b=a.zoom()}),c.initiated=!1):l(a.xAxis.concat(a.yAxis),function(a){var d=a.axis;c[d.isXAxis?"zoomX":"zoomY"]&&(b=d.zoom(a.min,
a.max),d.displayBtn&&(f=!0))});g=this.resetZoomButton;f&&!g?this.showResetZoom():!f&&d(g)&&(this.resetZoomButton=g.destroy());b&&this.redraw(e(this.options.chart.animation,a&&a.animation,100>this.pointCount))},pan:function(a,b){var c=this,d=c.hoverPoints,e;d&&l(d,function(a){a.setState()});l("xy"===b?[1,0]:[1],function(b){b=c[b?"xAxis":"yAxis"][0];var d=b.horiz,f=a[d?"chartX":"chartY"],d=d?"mouseDownX":"mouseDownY",g=c[d],h=(b.pointRange||0)/2,k=b.getExtremes(),l=b.toValue(g-f,!0)+h,h=b.toValue(g+
b.len-f,!0)-h,m=h<l,g=m?h:l,l=m?l:h,h=Math.min(k.dataMin,b.toValue(b.toPixels(k.min)-b.minPixelPadding)),m=Math.max(k.dataMax,b.toValue(b.toPixels(k.max)+b.minPixelPadding)),n;n=h-g;0<n&&(l+=n,g=h);n=l-m;0<n&&(l=m,g-=n);b.series.length&&g!==k.min&&l!==k.max&&(b.setExtremes(g,l,!1,!1,{trigger:"pan"}),e=!0);c[d]=f});e&&c.redraw(!1);E(c.container,{cursor:"move"})}});r(v.prototype,{select:function(a,b){var c=this,d=c.series,f=d.chart;a=e(a,!c.selected);c.firePointEvent(a?"select":"unselect",{accumulate:b},
function(){c.selected=c.options.selected=a;d.options.data[g(c,d.data)]=c.options;c.setState(a&&"select");b||l(f.getSelectedPoints(),function(a){a.selected&&a!==c&&(a.selected=a.options.selected=!1,d.options.data[g(a,d.data)]=a.options,a.setState(""),a.firePointEvent("unselect"))})})},onMouseOver:function(a){var b=this.series.chart,c=b.pointer;a=a?c.normalize(a):c.getChartCoordinatesFromPoint(this,b.inverted);c.runPointActions(a,this)},onMouseOut:function(){var a=this.series.chart;this.firePointEvent("mouseOut");
l(a.hoverPoints||[],function(a){a.setState()});a.hoverPoints=a.hoverPoint=null},importEvents:function(){if(!this.hasImportedEvents){var c=this,d=b(c.series.options.point,c.options).events;c.events=d;a.objectEach(d,function(a,b){C(c,b,a)});this.hasImportedEvents=!0}},setState:function(a,b){var c=Math.floor(this.plotX),d=this.plotY,g=this.series,k=g.options.states[a]||{},l=f[g.type].marker&&g.options.marker,m=l&&!1===l.enabled,n=l&&l.states&&l.states[a]||{},h=!1===n.enabled,t=g.stateMarkerGraphic,u=
this.marker||{},v=g.chart,y=g.halo,A,C=l&&g.markerAttribs;a=a||"";if(!(a===this.state&&!b||this.selected&&"select"!==a||!1===k.enabled||a&&(h||m&&!1===n.enabled)||a&&u.states&&u.states[a]&&!1===u.states[a].enabled)){C&&(A=g.markerAttribs(this,a));if(this.graphic)this.state&&this.graphic.removeClass("highcharts-point-"+this.state),a&&this.graphic.addClass("highcharts-point-"+a),this.graphic.animate(g.pointAttribs(this,a),e(v.options.chart.animation,k.animation)),A&&this.graphic.animate(A,e(v.options.chart.animation,
n.animation,l.animation)),t&&t.hide();else{if(a&&n){l=u.symbol||g.symbol;t&&t.currentSymbol!==l&&(t=t.destroy());if(t)t[b?"animate":"attr"]({x:A.x,y:A.y});else l&&(g.stateMarkerGraphic=t=v.renderer.symbol(l,A.x,A.y,A.width,A.height).add(g.markerGroup),t.currentSymbol=l);t&&t.attr(g.pointAttribs(this,a))}t&&(t[a&&v.isInsidePlot(c,d,v.inverted)?"show":"hide"](),t.element.point=this)}(c=k.halo)&&c.size?(y||(g.halo=y=v.renderer.path().add((this.graphic||t).parentGroup)),y[b?"animate":"attr"]({d:this.haloPath(c.size)}),
y.attr({"class":"highcharts-halo highcharts-color-"+e(this.colorIndex,g.colorIndex)}),y.point=this,y.attr(r({fill:this.color||g.color,"fill-opacity":c.opacity,zIndex:-1},c.attributes))):y&&y.point&&y.point.haloPath&&y.animate({d:y.point.haloPath(0)});this.state=a}},haloPath:function(a){return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX)-a,this.plotY-a,2*a,2*a)}});r(y.prototype,{onMouseOver:function(){var a=this.chart,b=a.hoverSeries;if(b&&b!==this)b.onMouseOut();this.options.events.mouseOver&&
u(this,"mouseOver");this.setState("hover");a.hoverSeries=this},onMouseOut:function(){var a=this.options,b=this.chart,d=b.tooltip,e=b.hoverPoint;b.hoverSeries=null;if(e)e.onMouseOut();this&&a.events.mouseOut&&u(this,"mouseOut");!d||this.stickyTracking||d.shared&&!this.noSharedTooltip||d.hide();this.setState()},setState:function(a){var b=this,c=b.options,d=b.graph,f=c.states,g=c.lineWidth,c=0;a=a||"";if(b.state!==a&&(l([b.group,b.markerGroup,b.dataLabelsGroup],function(c){c&&(b.state&&c.removeClass("highcharts-series-"+
b.state),a&&c.addClass("highcharts-series-"+a))}),b.state=a,!f[a]||!1!==f[a].enabled)&&(a&&(g=f[a].lineWidth||g+(f[a].lineWidthPlus||0)),d&&!d.dashstyle))for(g={"stroke-width":g},d.animate(g,e(b.chart.options.chart.animation,f[a]&&f[a].animation));b["zone-graph-"+c];)b["zone-graph-"+c].attr(g),c+=1},setVisible:function(a,b){var c=this,d=c.chart,e=c.legendItem,f,g=d.options.chart.ignoreHiddenSeries,k=c.visible;f=(c.visible=a=c.options.visible=c.userOptions.visible=void 0===a?!k:a)?"show":"hide";l(["group",
"dataLabelsGroup","markerGroup","tracker","tt"],function(a){if(c[a])c[a][f]()});if(d.hoverSeries===c||(d.hoverPoint&&d.hoverPoint.series)===c)c.onMouseOut();e&&d.legend.colorizeItem(c,a);c.isDirty=!0;c.options.stacking&&l(d.series,function(a){a.options.stacking&&a.visible&&(a.isDirty=!0)});l(c.linkedSeries,function(b){b.setVisible(a,!1)});g&&(d.isDirtyBox=!0);!1!==b&&d.redraw();u(c,f)},show:function(){this.setVisible(!0)},hide:function(){this.setVisible(!1)},select:function(a){this.selected=a=void 0===
a?!this.selected:a;this.checkbox&&(this.checkbox.checked=a);u(this,a?"select":"unselect")},drawTracker:J.drawTrackerGraph})})(M);(function(a){var C=a.Chart,A=a.each,F=a.inArray,E=a.isArray,m=a.isObject,f=a.pick,l=a.splat;C.prototype.setResponsive=function(f){var l=this.options.responsive,m=[],g=this.currentResponsive;l&&l.rules&&A(l.rules,function(d){void 0===d._id&&(d._id=a.uniqueKey());this.matchResponsiveRule(d,m,f)},this);var d=a.merge.apply(0,a.map(m,function(d){return a.find(l.rules,function(a){return a._id===
d}).chartOptions})),m=m.toString()||void 0;m!==(g&&g.ruleIds)&&(g&&this.update(g.undoOptions,f),m?(this.currentResponsive={ruleIds:m,mergedOptions:d,undoOptions:this.currentOptions(d)},this.update(d,f)):this.currentResponsive=void 0)};C.prototype.matchResponsiveRule=function(a,l){var m=a.condition;(m.callback||function(){return this.chartWidth<=f(m.maxWidth,Number.MAX_VALUE)&&this.chartHeight<=f(m.maxHeight,Number.MAX_VALUE)&&this.chartWidth>=f(m.minWidth,0)&&this.chartHeight>=f(m.minHeight,0)}).call(this)&&
l.push(a._id)};C.prototype.currentOptions=function(f){function r(f,d,k,b){var e;a.objectEach(f,function(a,g){if(!b&&-1<F(g,["series","xAxis","yAxis"]))for(f[g]=l(f[g]),k[g]=[],e=0;e<f[g].length;e++)d[g][e]&&(k[g][e]={},r(a[e],d[g][e],k[g][e],b+1));else m(a)?(k[g]=E(a)?[]:{},r(a,d[g]||{},k[g],b+1)):k[g]=d[g]||null})}var t={};r(f,this.options,t,0);return t}})(M);return M});


/***/ }),
/* 377 */
/***/ (function(module, exports) {

/*
 Highcharts JS v5.0.14 (2017-07-28)

 (c) 2009-2016 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(x){"object"===typeof module&&module.exports?module.exports=x:x(Highcharts)})(function(x){(function(b){function r(b,a){this.init(b,a)}var v=b.CenteredSeriesMixin,w=b.each,n=b.extend,h=b.merge,g=b.splat;n(r.prototype,{coll:"pane",init:function(b,a){this.chart=a;this.background=[];a.pane.push(this);this.setOptions(b)},setOptions:function(b){this.options=h(this.defaultOptions,this.chart.angular?{background:{}}:void 0,b)},render:function(){var b=this.options,a=this.options.background,c=this.chart.renderer;
this.group||(this.group=c.g("pane-group").attr({zIndex:b.zIndex||0}).add());this.updateCenter();if(a)for(a=g(a),b=Math.max(a.length,this.background.length||0),c=0;c<b;c++)a[c]&&this.axis?this.renderBackground(h(this.defaultBackgroundOptions,a[c]),c):this.background[c]&&(this.background[c]=this.background[c].destroy(),this.background.splice(c,1))},renderBackground:function(b,a){var c="animate";this.background[a]||(this.background[a]=this.chart.renderer.path().add(this.group),c="attr");this.background[a][c]({d:this.axis.getPlotBandPath(b.from,
b.to,b)}).attr({fill:b.backgroundColor,stroke:b.borderColor,"stroke-width":b.borderWidth,"class":"highcharts-pane "+(b.className||"")})},defaultOptions:{center:["50%","50%"],size:"85%",startAngle:0},defaultBackgroundOptions:{shape:"circle",borderWidth:1,borderColor:"#cccccc",backgroundColor:{linearGradient:{x1:0,y1:0,x2:0,y2:1},stops:[[0,"#ffffff"],[1,"#e6e6e6"]]},from:-Number.MAX_VALUE,innerRadius:0,to:Number.MAX_VALUE,outerRadius:"105%"},updateCenter:function(b){this.center=(b||this.axis||{}).center=
v.getCenter.call(this)},update:function(b,a){h(!0,this.options,b);this.setOptions(this.options);this.render();w(this.chart.axes,function(c){c.pane===this&&(c.pane=null,c.update({},a))},this)}});b.Pane=r})(x);(function(b){var r=b.each,v=b.extend,w=b.map,n=b.merge,h=b.noop,g=b.pick,m=b.pInt,a=b.wrap,c,k,f=b.Axis.prototype;b=b.Tick.prototype;c={getOffset:h,redraw:function(){this.isDirty=!1},render:function(){this.isDirty=!1},setScale:h,setCategories:h,setTitle:h};k={defaultRadialGaugeOptions:{labels:{align:"center",
x:0,y:null},minorGridLineWidth:0,minorTickInterval:"auto",minorTickLength:10,minorTickPosition:"inside",minorTickWidth:1,tickLength:10,tickPosition:"inside",tickWidth:2,title:{rotation:0},zIndex:2},defaultRadialXOptions:{gridLineWidth:1,labels:{align:null,distance:15,x:0,y:null},maxPadding:0,minPadding:0,showLastLabel:!1,tickLength:0},defaultRadialYOptions:{gridLineInterpolation:"circle",labels:{align:"right",x:-3,y:-2},showLastLabel:!1,title:{x:4,text:null,rotation:90}},setOptions:function(a){a=
this.options=n(this.defaultOptions,this.defaultRadialOptions,a);a.plotBands||(a.plotBands=[])},getOffset:function(){f.getOffset.call(this);this.chart.axisOffset[this.side]=0},getLinePath:function(a,c){a=this.center;var e=this.chart,d=g(c,a[2]/2-this.offset);this.isCircular||void 0!==c?c=this.chart.renderer.symbols.arc(this.left+a[0],this.top+a[1],d,d,{start:this.startAngleRad,end:this.endAngleRad,open:!0,innerR:0}):(c=this.postTranslate(this.angleRad,d),c=["M",a[0]+e.plotLeft,a[1]+e.plotTop,"L",c.x,
c.y]);return c},setAxisTranslation:function(){f.setAxisTranslation.call(this);this.center&&(this.transA=this.isCircular?(this.endAngleRad-this.startAngleRad)/(this.max-this.min||1):this.center[2]/2/(this.max-this.min||1),this.minPixelPadding=this.isXAxis?this.transA*this.minPointOffset:0)},beforeSetTickPositions:function(){if(this.autoConnect=this.isCircular&&void 0===g(this.userMax,this.options.max)&&this.endAngleRad-this.startAngleRad===2*Math.PI)this.max+=this.categories&&1||this.pointRange||this.closestPointRange||
0},setAxisSize:function(){f.setAxisSize.call(this);this.isRadial&&(this.pane.updateCenter(this),this.isCircular&&(this.sector=this.endAngleRad-this.startAngleRad),this.len=this.width=this.height=this.center[2]*g(this.sector,1)/2)},getPosition:function(a,c){return this.postTranslate(this.isCircular?this.translate(a):this.angleRad,g(this.isCircular?c:this.translate(a),this.center[2]/2)-this.offset)},postTranslate:function(a,c){var e=this.chart,d=this.center;a=this.startAngleRad+a;return{x:e.plotLeft+
d[0]+Math.cos(a)*c,y:e.plotTop+d[1]+Math.sin(a)*c}},getPlotBandPath:function(a,c,p){var e=this.center,d=this.startAngleRad,k=e[2]/2,b=[g(p.outerRadius,"100%"),p.innerRadius,g(p.thickness,10)],f=Math.min(this.offset,0),t=/%$/,h,n=this.isCircular;"polygon"===this.options.gridLineInterpolation?e=this.getPlotLinePath(a).concat(this.getPlotLinePath(c,!0)):(a=Math.max(a,this.min),c=Math.min(c,this.max),n||(b[0]=this.translate(a),b[1]=this.translate(c)),b=w(b,function(a){t.test(a)&&(a=m(a,10)*k/100);return a}),
"circle"!==p.shape&&n?(a=d+this.translate(a),c=d+this.translate(c)):(a=-Math.PI/2,c=1.5*Math.PI,h=!0),b[0]-=f,b[2]-=f,e=this.chart.renderer.symbols.arc(this.left+e[0],this.top+e[1],b[0],b[0],{start:Math.min(a,c),end:Math.max(a,c),innerR:g(b[1],b[0]-b[2]),open:h}));return e},getPlotLinePath:function(a,c){var e=this,d=e.center,b=e.chart,k=e.getPosition(a),f,g,t;e.isCircular?t=["M",d[0]+b.plotLeft,d[1]+b.plotTop,"L",k.x,k.y]:"circle"===e.options.gridLineInterpolation?(a=e.translate(a))&&(t=e.getLinePath(0,
a)):(r(b.xAxis,function(a){a.pane===e.pane&&(f=a)}),t=[],a=e.translate(a),d=f.tickPositions,f.autoConnect&&(d=d.concat([d[0]])),c&&(d=[].concat(d).reverse()),r(d,function(c,e){g=f.getPosition(c,a);t.push(e?"L":"M",g.x,g.y)}));return t},getTitlePosition:function(){var a=this.center,c=this.chart,b=this.options.title;return{x:c.plotLeft+a[0]+(b.x||0),y:c.plotTop+a[1]-{high:.5,middle:.25,low:0}[b.align]*a[2]+(b.y||0)}}};a(f,"init",function(a,d,b){var e=d.angular,p=d.polar,f=b.isX,y=e&&f,h,t=d.options,
m=this.pane=d.pane[b.pane||0],r=m.options;if(e){if(v(this,y?c:k),h=!f)this.defaultRadialOptions=this.defaultRadialGaugeOptions}else p&&(v(this,k),this.defaultRadialOptions=(h=f)?this.defaultRadialXOptions:n(this.defaultYAxisOptions,this.defaultRadialYOptions));e||p?(this.isRadial=!0,d.inverted=!1,t.chart.zoomType=null):this.isRadial=!1;h&&(m.axis=this);a.call(this,d,b);y||!e&&!p||(a=this.options,this.angleRad=(a.angle||0)*Math.PI/180,this.startAngleRad=(r.startAngle-90)*Math.PI/180,this.endAngleRad=
(g(r.endAngle,r.startAngle+360)-90)*Math.PI/180,this.offset=a.offset||0,this.isCircular=h)});a(f,"autoLabelAlign",function(a){if(!this.isRadial)return a.apply(this,[].slice.call(arguments,1))});a(b,"getPosition",function(a,c,b,k,f){var e=this.axis;return e.getPosition?e.getPosition(b):a.call(this,c,b,k,f)});a(b,"getLabelPosition",function(a,c,b,k,f,q,y,h,t){var d=this.axis,e=q.y,p=20,l=q.align,u=(d.translate(this.pos)+d.startAngleRad+Math.PI/2)/Math.PI*180%360;d.isRadial?(a=d.getPosition(this.pos,
d.center[2]/2+g(q.distance,-25)),"auto"===q.rotation?k.attr({rotation:u}):null===e&&(e=d.chart.renderer.fontMetrics(k.styles.fontSize).b-k.getBBox().height/2),null===l&&(d.isCircular?(this.label.getBBox().width>d.len*d.tickInterval/(d.max-d.min)&&(p=0),l=u>p&&u<180-p?"left":u>180+p&&u<360-p?"right":"center"):l="center",k.attr({align:l})),a.x+=q.x,a.y+=e):a=a.call(this,c,b,k,f,q,y,h,t);return a});a(b,"getMarkPath",function(a,c,b,k,f,q,y){var d=this.axis;d.isRadial?(a=d.getPosition(this.pos,d.center[2]/
2+k),c=["M",c,b,"L",a.x,a.y]):c=a.call(this,c,b,k,f,q,y);return c})})(x);(function(b){var r=b.each,v=b.pick,w=b.defined,n=b.seriesType,h=b.seriesTypes,g=b.Series.prototype,m=b.Point.prototype;n("arearange","area",{lineWidth:1,threshold:null,tooltip:{pointFormat:'\x3cspan style\x3d"color:{series.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.low}\x3c/b\x3e - \x3cb\x3e{point.high}\x3c/b\x3e\x3cbr/\x3e'},trackByArea:!0,dataLabels:{align:null,verticalAlign:null,xLow:0,xHigh:0,yLow:0,yHigh:0}},
{pointArrayMap:["low","high"],dataLabelCollections:["dataLabel","dataLabelUpper"],toYData:function(a){return[a.low,a.high]},pointValKey:"low",deferTranslatePolar:!0,highToXY:function(a){var c=this.chart,b=this.xAxis.postTranslate(a.rectPlotX,this.yAxis.len-a.plotHigh);a.plotHighX=b.x-c.plotLeft;a.plotHigh=b.y-c.plotTop;a.plotLowX=a.plotX},translate:function(){var a=this,c=a.yAxis,b=!!a.modifyValue;h.area.prototype.translate.apply(a);r(a.points,function(k){var e=k.low,d=k.high,p=k.plotY;null===d||
null===e?(k.isNull=!0,k.plotY=null):(k.plotLow=p,k.plotHigh=c.translate(b?a.modifyValue(d,k):d,0,1,0,1),b&&(k.yBottom=k.plotHigh))});this.chart.polar&&r(this.points,function(c){a.highToXY(c);c.tooltipPos=[(c.plotHighX+c.plotLowX)/2,(c.plotHigh+c.plotLow)/2]})},getGraphPath:function(a){var c=[],b=[],f,e=h.area.prototype.getGraphPath,d,p,u;u=this.options;var l=this.chart.polar&&!1!==u.connectEnds,q=u.connectNulls,y=u.step;a=a||this.points;for(f=a.length;f--;)d=a[f],d.isNull||l||q||a[f+1]&&!a[f+1].isNull||
b.push({plotX:d.plotX,plotY:d.plotY,doCurve:!1}),p={polarPlotY:d.polarPlotY,rectPlotX:d.rectPlotX,yBottom:d.yBottom,plotX:v(d.plotHighX,d.plotX),plotY:d.plotHigh,isNull:d.isNull},b.push(p),c.push(p),d.isNull||l||q||a[f-1]&&!a[f-1].isNull||b.push({plotX:d.plotX,plotY:d.plotY,doCurve:!1});a=e.call(this,a);y&&(!0===y&&(y="left"),u.step={left:"right",center:"center",right:"left"}[y]);c=e.call(this,c);b=e.call(this,b);u.step=y;u=[].concat(a,c);this.chart.polar||"M"!==b[0]||(b[0]="L");this.graphPath=u;
this.areaPath=this.areaPath.concat(a,b);u.isArea=!0;u.xMap=a.xMap;this.areaPath.xMap=a.xMap;return u},drawDataLabels:function(){var a=this.data,c=a.length,b,f=[],e=this.options.dataLabels,d=e.align,p=e.verticalAlign,u=e.inside,l,q,y=this.chart.inverted;if(e.enabled||this._hasPointLabels){for(b=c;b--;)if(l=a[b])q=u?l.plotHigh<l.plotLow:l.plotHigh>l.plotLow,l.y=l.high,l._plotY=l.plotY,l.plotY=l.plotHigh,f[b]=l.dataLabel,l.dataLabel=l.dataLabelUpper,l.below=q,y?d||(e.align=q?"right":"left"):p||(e.verticalAlign=
q?"top":"bottom"),e.x=e.xHigh,e.y=e.yHigh;g.drawDataLabels&&g.drawDataLabels.apply(this,arguments);for(b=c;b--;)if(l=a[b])q=u?l.plotHigh<l.plotLow:l.plotHigh>l.plotLow,l.dataLabelUpper=l.dataLabel,l.dataLabel=f[b],l.y=l.low,l.plotY=l._plotY,l.below=!q,y?d||(e.align=q?"left":"right"):p||(e.verticalAlign=q?"bottom":"top"),e.x=e.xLow,e.y=e.yLow;g.drawDataLabels&&g.drawDataLabels.apply(this,arguments)}e.align=d;e.verticalAlign=p},alignDataLabel:function(){h.column.prototype.alignDataLabel.apply(this,
arguments)},drawPoints:function(){var a=this.points.length,c,b;g.drawPoints.apply(this,arguments);for(b=0;b<a;)c=this.points[b],c.lowerGraphic=c.graphic,c.graphic=c.upperGraphic,c._plotY=c.plotY,c._plotX=c.plotX,c.plotY=c.plotHigh,w(c.plotHighX)&&(c.plotX=c.plotHighX),b++;g.drawPoints.apply(this,arguments);for(b=0;b<a;)c=this.points[b],c.upperGraphic=c.graphic,c.graphic=c.lowerGraphic,c.plotY=c._plotY,c.plotX=c._plotX,b++},setStackedPoints:b.noop},{setState:function(){var a=this.state,c=this.series,
b=c.chart.polar;w(this.plotHigh)||(this.plotHigh=c.yAxis.toPixels(this.high,!0));w(this.plotLow)||(this.plotLow=this.plotY=c.yAxis.toPixels(this.low,!0));m.setState.apply(this,arguments);this.graphic=this.upperGraphic;this.plotY=this.plotHigh;b&&(this.plotX=this.plotHighX);this.state=a;c.stateMarkerGraphic&&(c.lowerStateMarkerGraphic=c.stateMarkerGraphic,c.stateMarkerGraphic=c.upperStateMarkerGraphic);m.setState.apply(this,arguments);this.plotY=this.plotLow;this.graphic=this.lowerGraphic;b&&(this.plotX=
this.plotLowX);c.stateMarkerGraphic&&(c.upperStateMarkerGraphic=c.stateMarkerGraphic,c.stateMarkerGraphic=c.lowerStateMarkerGraphic)},haloPath:function(){var a=this.series.chart.polar,c;this.plotY=this.plotLow;a&&(this.plotX=this.plotLowX);c=m.haloPath.apply(this,arguments);this.plotY=this.plotHigh;a&&(this.plotX=this.plotHighX);return c=c.concat(m.haloPath.apply(this,arguments))},destroy:function(){this.upperGraphic&&(this.upperGraphic=this.upperGraphic.destroy());return m.destroy.apply(this,arguments)}})})(x);
(function(b){var r=b.seriesType;r("areasplinerange","arearange",null,{getPointSpline:b.seriesTypes.spline.prototype.getPointSpline})})(x);(function(b){var r=b.defaultPlotOptions,v=b.each,w=b.merge,n=b.noop,h=b.pick,g=b.seriesType,m=b.seriesTypes.column.prototype;g("columnrange","arearange",w(r.column,r.arearange,{lineWidth:1,pointRange:null,marker:null,states:{hover:{halo:!1}}}),{translate:function(){var a=this,c=a.yAxis,b=a.xAxis,f=b.startAngleRad,e,d=a.chart,p=a.xAxis.isRadial,u=Math.max(d.chartWidth,
d.chartHeight)+999,l;m.translate.apply(a);v(a.points,function(k){var q=k.shapeArgs,g=a.options.minPointLength,t,m;k.plotHigh=l=Math.min(Math.max(-u,c.translate(k.high,0,1,0,1)),u);k.plotLow=Math.min(Math.max(-u,k.plotY),u);m=l;t=h(k.rectPlotY,k.plotY)-l;Math.abs(t)<g?(g-=t,t+=g,m-=g/2):0>t&&(t*=-1,m-=t);p?(e=k.barX+f,k.shapeType="path",k.shapeArgs={d:a.polarArc(m+t,m,e,e+k.pointWidth)}):(q.height=t,q.y=m,k.tooltipPos=d.inverted?[c.len+c.pos-d.plotLeft-m-t/2,b.len+b.pos-d.plotTop-q.x-q.width/2,t]:
[b.left-d.plotLeft+q.x+q.width/2,c.pos-d.plotTop+m+t/2,t])})},directTouch:!0,trackerGroups:["group","dataLabelsGroup"],drawGraph:n,getSymbol:n,crispCol:m.crispCol,drawPoints:m.drawPoints,drawTracker:m.drawTracker,getColumnMetrics:m.getColumnMetrics,animate:function(){return m.animate.apply(this,arguments)},polarArc:function(){return m.polarArc.apply(this,arguments)},pointAttribs:m.pointAttribs},{setState:m.pointClass.prototype.setState})})(x);(function(b){var r=b.each,v=b.isNumber,w=b.merge,n=b.pick,
h=b.pInt,g=b.Series,m=b.seriesType,a=b.TrackerMixin;m("gauge","line",{dataLabels:{enabled:!0,defer:!1,y:15,borderRadius:3,crop:!1,verticalAlign:"top",zIndex:2,borderWidth:1,borderColor:"#cccccc"},dial:{},pivot:{},tooltip:{headerFormat:""},showInLegend:!1},{angular:!0,directTouch:!0,drawGraph:b.noop,fixedBox:!0,forceDL:!0,noSharedTooltip:!0,trackerGroups:["group","dataLabelsGroup"],translate:function(){var a=this.yAxis,b=this.options,f=a.center;this.generatePoints();r(this.points,function(c){var d=
w(b.dial,c.dial),e=h(n(d.radius,80))*f[2]/200,k=h(n(d.baseLength,70))*e/100,l=h(n(d.rearLength,10))*e/100,q=d.baseWidth||3,g=d.topWidth||1,m=b.overshoot,t=a.startAngleRad+a.translate(c.y,null,null,null,!0);v(m)?(m=m/180*Math.PI,t=Math.max(a.startAngleRad-m,Math.min(a.endAngleRad+m,t))):!1===b.wrap&&(t=Math.max(a.startAngleRad,Math.min(a.endAngleRad,t)));t=180*t/Math.PI;c.shapeType="path";c.shapeArgs={d:d.path||["M",-l,-q/2,"L",k,-q/2,e,-g/2,e,g/2,k,q/2,-l,q/2,"z"],translateX:f[0],translateY:f[1],
rotation:t};c.plotX=f[0];c.plotY=f[1]})},drawPoints:function(){var a=this,b=a.yAxis.center,f=a.pivot,e=a.options,d=e.pivot,p=a.chart.renderer;r(a.points,function(c){var b=c.graphic,d=c.shapeArgs,k=d.d,f=w(e.dial,c.dial);b?(b.animate(d),d.d=k):(c.graphic=p[c.shapeType](d).attr({rotation:d.rotation,zIndex:1}).addClass("highcharts-dial").add(a.group),c.graphic.attr({stroke:f.borderColor||"none","stroke-width":f.borderWidth||0,fill:f.backgroundColor||"#000000"}))});f?f.animate({translateX:b[0],translateY:b[1]}):
(a.pivot=p.circle(0,0,n(d.radius,5)).attr({zIndex:2}).addClass("highcharts-pivot").translate(b[0],b[1]).add(a.group),a.pivot.attr({"stroke-width":d.borderWidth||0,stroke:d.borderColor||"#cccccc",fill:d.backgroundColor||"#000000"}))},animate:function(a){var c=this;a||(r(c.points,function(a){var b=a.graphic;b&&(b.attr({rotation:180*c.yAxis.startAngleRad/Math.PI}),b.animate({rotation:a.shapeArgs.rotation},c.options.animation))}),c.animate=null)},render:function(){this.group=this.plotGroup("group","series",
this.visible?"visible":"hidden",this.options.zIndex,this.chart.seriesGroup);g.prototype.render.call(this);this.group.clip(this.chart.clipRect)},setData:function(a,b){g.prototype.setData.call(this,a,!1);this.processData();this.generatePoints();n(b,!0)&&this.chart.redraw()},drawTracker:a&&a.drawTrackerPoint},{setState:function(a){this.state=a}})})(x);(function(b){var r=b.each,v=b.noop,w=b.pick,n=b.seriesType,h=b.seriesTypes;n("boxplot","column",{threshold:null,tooltip:{pointFormat:'\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e \x3cb\x3e {series.name}\x3c/b\x3e\x3cbr/\x3eMaximum: {point.high}\x3cbr/\x3eUpper quartile: {point.q3}\x3cbr/\x3eMedian: {point.median}\x3cbr/\x3eLower quartile: {point.q1}\x3cbr/\x3eMinimum: {point.low}\x3cbr/\x3e'},
whiskerLength:"50%",fillColor:"#ffffff",lineWidth:1,medianWidth:2,states:{hover:{brightness:-.3}},whiskerWidth:2},{pointArrayMap:["low","q1","median","q3","high"],toYData:function(b){return[b.low,b.q1,b.median,b.q3,b.high]},pointValKey:"high",pointAttribs:function(b){var h=this.options,a=b&&b.color||this.color;return{fill:b.fillColor||h.fillColor||a,stroke:h.lineColor||a,"stroke-width":h.lineWidth||0}},drawDataLabels:v,translate:function(){var b=this.yAxis,m=this.pointArrayMap;h.column.prototype.translate.apply(this);
r(this.points,function(a){r(m,function(c){null!==a[c]&&(a[c+"Plot"]=b.translate(a[c],0,1,0,1))})})},drawPoints:function(){var b=this,h=b.options,a=b.chart.renderer,c,k,f,e,d,p,u=0,l,q,y,n,t=!1!==b.doQuartiles,v,A=b.options.whiskerLength;r(b.points,function(g){var m=g.graphic,r=m?"animate":"attr",J=g.shapeArgs,x={},C={},H={},I=g.color||b.color;void 0!==g.plotY&&(l=J.width,q=Math.floor(J.x),y=q+l,n=Math.round(l/2),c=Math.floor(t?g.q1Plot:g.lowPlot),k=Math.floor(t?g.q3Plot:g.lowPlot),f=Math.floor(g.highPlot),
e=Math.floor(g.lowPlot),m||(g.graphic=m=a.g("point").add(b.group),g.stem=a.path().addClass("highcharts-boxplot-stem").add(m),A&&(g.whiskers=a.path().addClass("highcharts-boxplot-whisker").add(m)),t&&(g.box=a.path(void 0).addClass("highcharts-boxplot-box").add(m)),g.medianShape=a.path(void 0).addClass("highcharts-boxplot-median").add(m)),x.stroke=g.stemColor||h.stemColor||I,x["stroke-width"]=w(g.stemWidth,h.stemWidth,h.lineWidth),x.dashstyle=g.stemDashStyle||h.stemDashStyle,g.stem.attr(x),A&&(C.stroke=
g.whiskerColor||h.whiskerColor||I,C["stroke-width"]=w(g.whiskerWidth,h.whiskerWidth,h.lineWidth),g.whiskers.attr(C)),t&&(m=b.pointAttribs(g),g.box.attr(m)),H.stroke=g.medianColor||h.medianColor||I,H["stroke-width"]=w(g.medianWidth,h.medianWidth,h.lineWidth),g.medianShape.attr(H),p=g.stem.strokeWidth()%2/2,u=q+n+p,g.stem[r]({d:["M",u,k,"L",u,f,"M",u,c,"L",u,e]}),t&&(p=g.box.strokeWidth()%2/2,c=Math.floor(c)+p,k=Math.floor(k)+p,q+=p,y+=p,g.box[r]({d:["M",q,k,"L",q,c,"L",y,c,"L",y,k,"L",q,k,"z"]})),
A&&(p=g.whiskers.strokeWidth()%2/2,f+=p,e+=p,v=/%$/.test(A)?n*parseFloat(A)/100:A/2,g.whiskers[r]({d:["M",u-v,f,"L",u+v,f,"M",u-v,e,"L",u+v,e]})),d=Math.round(g.medianPlot),p=g.medianShape.strokeWidth()%2/2,d+=p,g.medianShape[r]({d:["M",q,d,"L",y,d]}))})},setStackedPoints:v})})(x);(function(b){var r=b.each,v=b.noop,w=b.seriesType,n=b.seriesTypes;w("errorbar","boxplot",{color:"#000000",grouping:!1,linkedTo:":previous",tooltip:{pointFormat:'\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.low}\x3c/b\x3e - \x3cb\x3e{point.high}\x3c/b\x3e\x3cbr/\x3e'},
whiskerWidth:null},{type:"errorbar",pointArrayMap:["low","high"],toYData:function(b){return[b.low,b.high]},pointValKey:"high",doQuartiles:!1,drawDataLabels:n.arearange?function(){var b=this.pointValKey;n.arearange.prototype.drawDataLabels.call(this);r(this.data,function(g){g.y=g[b]})}:v,getColumnMetrics:function(){return this.linkedParent&&this.linkedParent.columnMetrics||n.column.prototype.getColumnMetrics.call(this)}})})(x);(function(b){var r=b.correctFloat,v=b.isNumber,w=b.pick,n=b.Point,h=b.Series,
g=b.seriesType,m=b.seriesTypes;g("waterfall","column",{dataLabels:{inside:!0},lineWidth:1,lineColor:"#333333",dashStyle:"dot",borderColor:"#333333",states:{hover:{lineWidthPlus:0}}},{pointValKey:"y",translate:function(){var a=this.options,c=this.yAxis,b,f,e,d,p,g,l,q,h,n,t=w(a.minPointLength,5),v=t/2,x=a.threshold,D=a.stacking,z;m.column.prototype.translate.apply(this);q=h=x;f=this.points;b=0;for(a=f.length;b<a;b++)e=f[b],l=this.processedYData[b],d=e.shapeArgs,p=D&&c.stacks[(this.negStacks&&l<x?"-":
"")+this.stackKey],z=this.getStackIndicator(z,e.x,this.index),n=p?p[e.x].points[z.key]:[0,l],e.isSum?e.y=r(l):e.isIntermediateSum&&(e.y=r(l-h)),g=Math.max(q,q+e.y)+n[0],d.y=c.translate(g,0,1,0,1),e.isSum?(d.y=c.translate(n[1],0,1,0,1),d.height=Math.min(c.translate(n[0],0,1,0,1),c.len)-d.y):e.isIntermediateSum?(d.y=c.translate(n[1],0,1,0,1),d.height=Math.min(c.translate(h,0,1,0,1),c.len)-d.y,h=n[1]):(d.height=0<l?c.translate(q,0,1,0,1)-d.y:c.translate(q,0,1,0,1)-c.translate(q-l,0,1,0,1),q+=p&&p[e.x]?
p[e.x].total:l),0>d.height&&(d.y+=d.height,d.height*=-1),e.plotY=d.y=Math.round(d.y)-this.borderWidth%2/2,d.height=Math.max(Math.round(d.height),.001),e.yBottom=d.y+d.height,d.height<=t&&!e.isNull?(d.height=t,d.y-=v,e.plotY=d.y,e.minPointLengthOffset=0>e.y?-v:v):e.minPointLengthOffset=0,d=e.plotY+(e.negative?d.height:0),this.chart.inverted?e.tooltipPos[0]=c.len-d:e.tooltipPos[1]=d},processData:function(a){var b=this.yData,k=this.options.data,f,e=b.length,d,p,g,l,q,n;p=d=g=l=this.options.threshold||
0;for(n=0;n<e;n++)q=b[n],f=k&&k[n]?k[n]:{},"sum"===q||f.isSum?b[n]=r(p):"intermediateSum"===q||f.isIntermediateSum?b[n]=r(d):(p+=q,d+=q),g=Math.min(p,g),l=Math.max(p,l);h.prototype.processData.call(this,a);this.options.stacking||(this.dataMin=g,this.dataMax=l)},toYData:function(a){return a.isSum?0===a.x?null:"sum":a.isIntermediateSum?0===a.x?null:"intermediateSum":a.y},pointAttribs:function(a,b){var c=this.options.upColor;c&&!a.options.color&&(a.color=0<a.y?c:null);a=m.column.prototype.pointAttribs.call(this,
a,b);delete a.dashstyle;return a},getGraphPath:function(){return["M",0,0]},getCrispPath:function(){var a=this.data,b=a.length,k=this.graph.strokeWidth()+this.borderWidth,k=Math.round(k)%2/2,f=this.yAxis.reversed,e=[],d,p,g;for(g=1;g<b;g++){p=a[g].shapeArgs;d=a[g-1].shapeArgs;p=["M",d.x+d.width,d.y+a[g-1].minPointLengthOffset+k,"L",p.x,d.y+a[g-1].minPointLengthOffset+k];if(0>a[g-1].y&&!f||0<a[g-1].y&&f)p[2]+=d.height,p[5]+=d.height;e=e.concat(p)}return e},drawGraph:function(){h.prototype.drawGraph.call(this);
this.graph.attr({d:this.getCrispPath()})},setStackedPoints:function(){var a=this.options,b,k;h.prototype.setStackedPoints.apply(this,arguments);b=this.stackedYData?this.stackedYData.length:0;for(k=1;k<b;k++)a.data[k].isSum||a.data[k].isIntermediateSum||(this.stackedYData[k]+=this.stackedYData[k-1])},getExtremes:function(){if(this.options.stacking)return h.prototype.getExtremes.apply(this,arguments)}},{getClassName:function(){var a=n.prototype.getClassName.call(this);this.isSum?a+=" highcharts-sum":
this.isIntermediateSum&&(a+=" highcharts-intermediate-sum");return a},isValid:function(){return v(this.y,!0)||this.isSum||this.isIntermediateSum}})})(x);(function(b){var r=b.Series,v=b.seriesType,w=b.seriesTypes;v("polygon","scatter",{marker:{enabled:!1,states:{hover:{enabled:!1}}},stickyTracking:!1,tooltip:{followPointer:!0,pointFormat:""},trackByArea:!0},{type:"polygon",getGraphPath:function(){for(var b=r.prototype.getGraphPath.call(this),h=b.length+1;h--;)(h===b.length||"M"===b[h])&&0<h&&b.splice(h,
0,"z");return this.areaPath=b},drawGraph:function(){this.options.fillColor=this.color;w.area.prototype.drawGraph.call(this)},drawLegendSymbol:b.LegendSymbolMixin.drawRectangle,drawTracker:r.prototype.drawTracker,setStackedPoints:b.noop})})(x);(function(b){var r=b.arrayMax,v=b.arrayMin,w=b.Axis,n=b.color,h=b.each,g=b.isNumber,m=b.noop,a=b.pick,c=b.pInt,k=b.Point,f=b.Series,e=b.seriesType,d=b.seriesTypes;e("bubble","scatter",{dataLabels:{formatter:function(){return this.point.z},inside:!0,verticalAlign:"middle"},
marker:{lineColor:null,lineWidth:1,radius:null,states:{hover:{radiusPlus:0}},symbol:"circle"},minSize:8,maxSize:"20%",softThreshold:!1,states:{hover:{halo:{size:5}}},tooltip:{pointFormat:"({point.x}, {point.y}), Size: {point.z}"},turboThreshold:0,zThreshold:0,zoneAxis:"z"},{pointArrayMap:["y","z"],parallelArrays:["x","y","z"],trackerGroups:["group","dataLabelsGroup"],specialGroup:"group",bubblePadding:!0,zoneAxis:"z",directTouch:!0,pointAttribs:function(b,c){var d=a(this.options.marker.fillOpacity,
.5);b=f.prototype.pointAttribs.call(this,b,c);1!==d&&(b.fill=n(b.fill).setOpacity(d).get("rgba"));return b},getRadii:function(a,b,c,d){var e,k,f,g=this.zData,p=[],l=this.options,q="width"!==l.sizeBy,h=l.zThreshold,u=b-a;k=0;for(e=g.length;k<e;k++)f=g[k],l.sizeByAbsoluteValue&&null!==f&&(f=Math.abs(f-h),b=Math.max(b-h,Math.abs(a-h)),a=0),null===f?f=null:f<a?f=c/2-1:(f=0<u?(f-a)/u:.5,q&&0<=f&&(f=Math.sqrt(f)),f=Math.ceil(c+f*(d-c))/2),p.push(f);this.radii=p},animate:function(a){var b=this.options.animation;
a||(h(this.points,function(a){var c=a.graphic,d;c&&c.width&&(d={x:c.x,y:c.y,width:c.width,height:c.height},c.attr({x:a.plotX,y:a.plotY,width:1,height:1}),c.animate(d,b))}),this.animate=null)},translate:function(){var a,c=this.data,e,f,k=this.radii;d.scatter.prototype.translate.call(this);for(a=c.length;a--;)e=c[a],f=k?k[a]:0,g(f)&&f>=this.minPxSize/2?(e.marker=b.extend(e.marker,{radius:f,width:2*f,height:2*f}),e.dlBox={x:e.plotX-f,y:e.plotY-f,width:2*f,height:2*f}):e.shapeArgs=e.plotY=e.dlBox=void 0},
alignDataLabel:d.column.prototype.alignDataLabel,buildKDTree:m,applyZones:m},{haloPath:function(a){return k.prototype.haloPath.call(this,0===a?0:(this.marker?this.marker.radius||0:0)+a)},ttBelow:!1});w.prototype.beforePadding=function(){var b=this,d=this.len,e=this.chart,f=0,k=d,n=this.isXAxis,m=n?"xData":"yData",w=this.min,x={},D=Math.min(e.plotWidth,e.plotHeight),z=Number.MAX_VALUE,E=-Number.MAX_VALUE,F=this.max-w,B=d/F,G=[];h(this.series,function(d){var f=d.options;!d.bubblePadding||!d.visible&&
e.options.chart.ignoreHiddenSeries||(b.allowZoomOutside=!0,G.push(d),n&&(h(["minSize","maxSize"],function(a){var b=f[a],d=/%$/.test(b),b=c(b);x[a]=d?D*b/100:b}),d.minPxSize=x.minSize,d.maxPxSize=Math.max(x.maxSize,x.minSize),d=d.zData,d.length&&(z=a(f.zMin,Math.min(z,Math.max(v(d),!1===f.displayNegative?f.zThreshold:-Number.MAX_VALUE))),E=a(f.zMax,Math.max(E,r(d))))))});h(G,function(a){var c=a[m],d=c.length,e;n&&a.getRadii(z,E,a.minPxSize,a.maxPxSize);if(0<F)for(;d--;)g(c[d])&&b.dataMin<=c[d]&&c[d]<=
b.dataMax&&(e=a.radii[d],f=Math.min((c[d]-w)*B-e,f),k=Math.max((c[d]-w)*B+e,k))});G.length&&0<F&&!this.isLog&&(k-=d,B*=(d+f-k)/d,h([["min","userMin",f],["max","userMax",k]],function(c){void 0===a(b.options[c[0]],b[c[1]])&&(b[c[0]]+=c[2]/B)}))}})(x);(function(b){function r(a,b){var c=this.chart,f=this.options.animation,e=this.group,d=this.markerGroup,g=this.xAxis.center,h=c.plotLeft,l=c.plotTop;c.polar?c.renderer.isSVG&&(!0===f&&(f={}),b?(a={translateX:g[0]+h,translateY:g[1]+l,scaleX:.001,scaleY:.001},
e.attr(a),d&&d.attr(a)):(a={translateX:h,translateY:l,scaleX:1,scaleY:1},e.animate(a,f),d&&d.animate(a,f),this.animate=null)):a.call(this,b)}var v=b.each,w=b.pick,n=b.seriesTypes,h=b.wrap,g=b.Series.prototype,m=b.Pointer.prototype;g.searchPointByAngle=function(a){var b=this.chart,k=this.xAxis.pane.center;return this.searchKDTree({clientX:180+-180/Math.PI*Math.atan2(a.chartX-k[0]-b.plotLeft,a.chartY-k[1]-b.plotTop)})};g.getConnectors=function(a,b,k,f){var c,d,g,h,l,n,m,r;d=f?1:0;c=0<=b&&b<=a.length-
1?b:0>b?a.length-1+b:0;b=0>c-1?a.length-(1+d):c-1;d=c+1>a.length-1?d:c+1;g=a[b];d=a[d];h=g.plotX;g=g.plotY;l=d.plotX;n=d.plotY;d=a[c].plotX;c=a[c].plotY;h=(1.5*d+h)/2.5;g=(1.5*c+g)/2.5;l=(1.5*d+l)/2.5;m=(1.5*c+n)/2.5;n=Math.sqrt(Math.pow(h-d,2)+Math.pow(g-c,2));r=Math.sqrt(Math.pow(l-d,2)+Math.pow(m-c,2));h=Math.atan2(g-c,h-d);m=Math.PI/2+(h+Math.atan2(m-c,l-d))/2;Math.abs(h-m)>Math.PI/2&&(m-=Math.PI);h=d+Math.cos(m)*n;g=c+Math.sin(m)*n;l=d+Math.cos(Math.PI+m)*r;m=c+Math.sin(Math.PI+m)*r;d={rightContX:l,
rightContY:m,leftContX:h,leftContY:g,plotX:d,plotY:c};k&&(d.prevPointCont=this.getConnectors(a,b,!1,f));return d};h(g,"buildKDTree",function(a){this.chart.polar&&(this.kdByAngle?this.searchPoint=this.searchPointByAngle:this.options.findNearestPointBy="xy");a.apply(this)});g.toXY=function(a){var b,g=this.chart,f=a.plotX;b=a.plotY;a.rectPlotX=f;a.rectPlotY=b;b=this.xAxis.postTranslate(a.plotX,this.yAxis.len-b);a.plotX=a.polarPlotX=b.x-g.plotLeft;a.plotY=a.polarPlotY=b.y-g.plotTop;this.kdByAngle?(g=
(f/Math.PI*180+this.xAxis.pane.options.startAngle)%360,0>g&&(g+=360),a.clientX=g):a.clientX=a.plotX};n.spline&&(h(n.spline.prototype,"getPointSpline",function(a,b,g,f){this.chart.polar?f?(a=this.getConnectors(b,f,!0,this.connectEnds),a=["C",a.prevPointCont.rightContX,a.prevPointCont.rightContY,a.leftContX,a.leftContY,a.plotX,a.plotY]):a=["M",g.plotX,g.plotY]:a=a.call(this,b,g,f);return a}),n.areasplinerange&&(n.areasplinerange.prototype.getPointSpline=n.spline.prototype.getPointSpline));h(g,"translate",
function(a){var b=this.chart;a.call(this);if(b.polar&&(this.kdByAngle=b.tooltip&&b.tooltip.shared,!this.preventPostTranslate))for(a=this.points,b=a.length;b--;)this.toXY(a[b])});h(g,"getGraphPath",function(a,b){var c=this,f,e,d;if(this.chart.polar){b=b||this.points;for(f=0;f<b.length;f++)if(!b[f].isNull){e=f;break}!1!==this.options.connectEnds&&void 0!==e&&(this.connectEnds=!0,b.splice(b.length,0,b[e]),d=!0);v(b,function(a){void 0===a.polarPlotY&&c.toXY(a)})}f=a.apply(this,[].slice.call(arguments,
1));d&&b.pop();return f});h(g,"animate",r);n.column&&(n=n.column.prototype,n.polarArc=function(a,b,g,f){var c=this.xAxis.center,d=this.yAxis.len;return this.chart.renderer.symbols.arc(c[0],c[1],d-b,null,{start:g,end:f,innerR:d-w(a,d)})},h(n,"animate",r),h(n,"translate",function(a){var b=this.xAxis,g=b.startAngleRad,f,e,d;this.preventPostTranslate=!0;a.call(this);if(b.isRadial)for(f=this.points,d=f.length;d--;)e=f[d],a=e.barX+g,e.shapeType="path",e.shapeArgs={d:this.polarArc(e.yBottom,e.plotY,a,a+
e.pointWidth)},this.toXY(e),e.tooltipPos=[e.plotX,e.plotY],e.ttBelow=e.plotY>b.center[1]}),h(n,"alignDataLabel",function(a,b,k,f,e,d){this.chart.polar?(a=b.rectPlotX/Math.PI*180,null===f.align&&(f.align=20<a&&160>a?"left":200<a&&340>a?"right":"center"),null===f.verticalAlign&&(f.verticalAlign=45>a||315<a?"bottom":135<a&&225>a?"top":"middle"),g.alignDataLabel.call(this,b,k,f,e,d)):a.call(this,b,k,f,e,d)}));h(m,"getCoordinates",function(a,b){var c=this.chart,f={xAxis:[],yAxis:[]};c.polar?v(c.axes,function(a){var d=
a.isXAxis,e=a.center,g=b.chartX-e[0]-c.plotLeft,e=b.chartY-e[1]-c.plotTop;f[d?"xAxis":"yAxis"].push({axis:a,value:a.translate(d?Math.PI-Math.atan2(g,e):Math.sqrt(Math.pow(g,2)+Math.pow(e,2)),!0)})}):f=a.call(this,b);return f});h(b.Chart.prototype,"getAxes",function(a){this.pane||(this.pane=[]);v(b.splat(this.options.pane),function(a){new b.Pane(a,this)},this);a.call(this)});h(b.Chart.prototype,"drawChartBox",function(a){a.call(this);v(this.pane,function(a){a.render()})});h(b.Chart.prototype,"get",
function(a,c){return b.find(this.pane,function(a){return a.options.id===c})||a.call(this,c)})})(x)});


/***/ }),
/* 378 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _createUncontrollable = __webpack_require__(379);

var _createUncontrollable2 = _interopRequireDefault(_createUncontrollable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mixin = {
  shouldComponentUpdate: function shouldComponentUpdate() {
    //let the forceUpdate trigger the update
    return !this._notifying;
  }
};

function set(component, propName, handler, value, args) {
  if (handler) {
    component._notifying = true;
    handler.call.apply(handler, [component, value].concat(args));
    component._notifying = false;
  }

  component._values[propName] = value;

  if (!component.unmounted) component.forceUpdate();
}

exports.default = (0, _createUncontrollable2.default)(mixin, set);
module.exports = exports['default'];

/***/ }),
/* 379 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = createUncontrollable;

var _react = __webpack_require__(10);

var _react2 = _interopRequireDefault(_react);

var _invariant = __webpack_require__(147);

var _invariant2 = _interopRequireDefault(_invariant);

var _utils = __webpack_require__(380);

var utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function createUncontrollable(mixin, set) {

  return uncontrollable;

  function uncontrollable(Component, controlledValues) {
    var _class, _temp;

    var methods = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    var displayName = Component.displayName || Component.name || 'Component',
        basePropTypes = utils.getType(Component).propTypes,
        isCompositeComponent = utils.isReactComponent(Component),
        controlledProps = Object.keys(controlledValues),
        propTypes;

    var OMIT_PROPS = ['valueLink', 'checkedLink'].concat(controlledProps.map(utils.defaultKey));

    propTypes = utils.uncontrolledPropTypes(controlledValues, basePropTypes, displayName);

    (0, _invariant2.default)(isCompositeComponent || !methods.length, '[uncontrollable] stateless function components cannot pass through methods ' + 'because they have no associated instances. Check component: ' + displayName + ', ' + 'attempting to pass through methods: ' + methods.join(', '));

    methods = utils.transform(methods, function (obj, method) {
      obj[method] = function () {
        var _refs$inner;

        return (_refs$inner = this.refs.inner)[method].apply(_refs$inner, arguments);
      };
    }, {});

    var component = (_temp = _class = function (_React$Component) {
      _inherits(component, _React$Component);

      function component() {
        _classCallCheck(this, component);

        return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
      }

      component.prototype.shouldComponentUpdate = function shouldComponentUpdate() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return !mixin.shouldComponentUpdate || mixin.shouldComponentUpdate.apply(this, args);
      };

      component.prototype.componentWillMount = function componentWillMount() {
        var _this2 = this;

        var props = this.props;

        this._values = {};

        controlledProps.forEach(function (key) {
          _this2._values[key] = props[utils.defaultKey(key)];
        });
      };

      /**
       * If a prop switches from controlled to Uncontrolled
       * reset its value to the defaultValue
       */


      component.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        var _this3 = this;

        var props = this.props;

        if (mixin.componentWillReceiveProps) {
          mixin.componentWillReceiveProps.call(this, nextProps);
        }

        controlledProps.forEach(function (key) {
          if (utils.getValue(nextProps, key) === undefined && utils.getValue(props, key) !== undefined) {
            _this3._values[key] = nextProps[utils.defaultKey(key)];
          }
        });
      };

      component.prototype.componentWillUnmount = function componentWillUnmount() {
        this.unmounted = true;
      };

      component.prototype.getControlledInstance = function getControlledInstance() {
        return this.refs.inner;
      };

      component.prototype.render = function render() {
        var _this4 = this;

        var newProps = {},
            props = omitProps(this.props);

        utils.each(controlledValues, function (handle, propName) {
          var linkPropName = utils.getLinkName(propName),
              prop = _this4.props[propName];

          if (linkPropName && !isProp(_this4.props, propName) && isProp(_this4.props, linkPropName)) {
            prop = _this4.props[linkPropName].value;
          }

          newProps[propName] = prop !== undefined ? prop : _this4._values[propName];

          newProps[handle] = setAndNotify.bind(_this4, propName);
        });

        newProps = _extends({}, props, newProps, {
          ref: isCompositeComponent ? 'inner' : null
        });

        return _react2.default.createElement(Component, newProps);
      };

      return component;
    }(_react2.default.Component), _class.displayName = 'Uncontrolled(' + displayName + ')', _class.propTypes = propTypes, _temp);

    _extends(component.prototype, methods);

    component.ControlledComponent = Component;

    /**
     * useful when wrapping a Component and you want to control
     * everything
     */
    component.deferControlTo = function (newComponent) {
      var additions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var nextMethods = arguments[2];

      return uncontrollable(newComponent, _extends({}, controlledValues, additions), nextMethods);
    };

    return component;

    function setAndNotify(propName, value) {
      var linkName = utils.getLinkName(propName),
          handler = this.props[controlledValues[propName]];

      if (linkName && isProp(this.props, linkName) && !handler) {
        handler = this.props[linkName].requestChange;
      }

      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      set(this, propName, handler, value, args);
    }

    function isProp(props, prop) {
      return props[prop] !== undefined;
    }

    function omitProps(props) {
      var result = {};

      utils.each(props, function (value, key) {
        if (OMIT_PROPS.indexOf(key) === -1) result[key] = value;
      });

      return result;
    }
  }
}
module.exports = exports['default'];

/***/ }),
/* 380 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

exports.__esModule = true;
exports.version = undefined;
exports.uncontrolledPropTypes = uncontrolledPropTypes;
exports.getType = getType;
exports.getValue = getValue;
exports.getLinkName = getLinkName;
exports.defaultKey = defaultKey;
exports.chain = chain;
exports.transform = transform;
exports.each = each;
exports.has = has;
exports.isReactComponent = isReactComponent;

var _react = __webpack_require__(10);

var _react2 = _interopRequireDefault(_react);

var _invariant = __webpack_require__(147);

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function readOnlyPropType(handler, name) {
  return function (props, propName) {
    if (props[propName] !== undefined) {
      if (!props[handler]) {
        return new Error('You have provided a `' + propName + '` prop to ' + '`' + name + '` without an `' + handler + '` handler. This will render a read-only field. ' + 'If the field should be mutable use `' + defaultKey(propName) + '`. Otherwise, set `' + handler + '`');
      }
    }
  };
}

function uncontrolledPropTypes(controlledValues, basePropTypes, displayName) {
  var propTypes = {};

  if (process.env.NODE_ENV !== 'production' && basePropTypes) {
    transform(controlledValues, function (obj, handler, prop) {
      (0, _invariant2.default)(typeof handler === 'string' && handler.trim().length, 'Uncontrollable - [%s]: the prop `%s` needs a valid handler key name in order to make it uncontrollable', displayName, prop);

      obj[prop] = readOnlyPropType(handler, displayName);
    }, propTypes);
  }

  return propTypes;
}

var version = exports.version = _react2.default.version.split('.').map(parseFloat);

function getType(component) {
  if (version[0] >= 15 || version[0] === 0 && version[1] >= 13) return component;

  return component.type;
}

function getValue(props, name) {
  var linkPropName = getLinkName(name);

  if (linkPropName && !isProp(props, name) && isProp(props, linkPropName)) return props[linkPropName].value;

  return props[name];
}

function isProp(props, prop) {
  return props[prop] !== undefined;
}

function getLinkName(name) {
  return name === 'value' ? 'valueLink' : name === 'checked' ? 'checkedLink' : null;
}

function defaultKey(key) {
  return 'default' + key.charAt(0).toUpperCase() + key.substr(1);
}

function chain(thisArg, a, b) {
  return function chainedFunction() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    a && a.call.apply(a, [thisArg].concat(args));
    b && b.call.apply(b, [thisArg].concat(args));
  };
}

function transform(obj, cb, seed) {
  each(obj, cb.bind(null, seed = seed || (Array.isArray(obj) ? [] : {})));
  return seed;
}

function each(obj, cb, thisArg) {
  if (Array.isArray(obj)) return obj.forEach(cb, thisArg);

  for (var key in obj) {
    if (has(obj, key)) cb.call(thisArg, obj[key], key, obj);
  }
}

function has(o, k) {
  return o ? Object.prototype.hasOwnProperty.call(o, k) : false;
}

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
function isReactComponent(component) {
  return !!(component && component.prototype && component.prototype.isReactComponent);
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)))

/***/ }),
/* 381 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Value = exports.Creatable = exports.AsyncCreatable = exports.Async = undefined;

var _Select = __webpack_require__(72);

var _Select2 = _interopRequireDefault(_Select);

var _Async = __webpack_require__(152);

var _Async2 = _interopRequireDefault(_Async);

var _AsyncCreatable = __webpack_require__(386);

var _AsyncCreatable2 = _interopRequireDefault(_AsyncCreatable);

var _Creatable = __webpack_require__(153);

var _Creatable2 = _interopRequireDefault(_Creatable);

var _Value = __webpack_require__(151);

var _Value2 = _interopRequireDefault(_Value);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_Select2.default.Async = _Async2.default;
_Select2.default.AsyncCreatable = _AsyncCreatable2.default;
_Select2.default.Creatable = _Creatable2.default;
_Select2.default.Value = _Value2.default;

exports.default = _Select2.default;
exports.Async = _Async2.default;
exports.AsyncCreatable = _AsyncCreatable2.default;
exports.Creatable = _Creatable2.default;
exports.Value = _Value2.default;

/***/ }),
/* 382 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(10);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(29);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var sizerStyle = {
	position: 'absolute',
	top: 0,
	left: 0,
	visibility: 'hidden',
	height: 0,
	overflow: 'scroll',
	whiteSpace: 'pre'
};

var AutosizeInput = function (_Component) {
	_inherits(AutosizeInput, _Component);

	function AutosizeInput(props) {
		_classCallCheck(this, AutosizeInput);

		var _this = _possibleConstructorReturn(this, (AutosizeInput.__proto__ || Object.getPrototypeOf(AutosizeInput)).call(this, props));

		_this.inputRef = function (el) {
			_this.input = el;
			if (typeof _this.props.inputRef === 'function') {
				_this.props.inputRef(el);
			}
		};

		_this.placeHolderSizerRef = function (el) {
			_this.placeHolderSizer = el;
		};

		_this.sizerRef = function (el) {
			_this.sizer = el;
		};

		_this.state = {
			inputWidth: props.minWidth,
			inputId: '_' + Math.random().toString(36).substr(2, 12)
		};
		return _this;
	}

	_createClass(AutosizeInput, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.mounted = true;
			this.copyInputStyles();
			this.updateInputWidth();
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate(prevProps, prevState) {
			if (prevState.inputWidth !== this.state.inputWidth) {
				if (typeof this.props.onAutosize === 'function') {
					this.props.onAutosize(this.state.inputWidth);
				}
			}
			this.updateInputWidth();
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			this.mounted = false;
		}
	}, {
		key: 'copyInputStyles',
		value: function copyInputStyles() {
			if (!this.mounted || !window.getComputedStyle) {
				return;
			}
			var inputStyle = this.input && window.getComputedStyle(this.input);
			if (!inputStyle) {
				return;
			}
			var widthNode = this.sizer;
			widthNode.style.fontSize = inputStyle.fontSize;
			widthNode.style.fontFamily = inputStyle.fontFamily;
			widthNode.style.fontWeight = inputStyle.fontWeight;
			widthNode.style.fontStyle = inputStyle.fontStyle;
			widthNode.style.letterSpacing = inputStyle.letterSpacing;
			widthNode.style.textTransform = inputStyle.textTransform;
			if (this.props.placeholder) {
				var placeholderNode = this.placeHolderSizer;
				placeholderNode.style.fontSize = inputStyle.fontSize;
				placeholderNode.style.fontFamily = inputStyle.fontFamily;
				placeholderNode.style.fontWeight = inputStyle.fontWeight;
				placeholderNode.style.fontStyle = inputStyle.fontStyle;
				placeholderNode.style.letterSpacing = inputStyle.letterSpacing;
				placeholderNode.style.textTransform = inputStyle.textTransform;
			}
		}
	}, {
		key: 'updateInputWidth',
		value: function updateInputWidth() {
			if (!this.mounted || !this.sizer || typeof this.sizer.scrollWidth === 'undefined') {
				return;
			}
			var newInputWidth = void 0;
			if (this.props.placeholder && (!this.props.value || this.props.value && this.props.placeholderIsMinWidth)) {
				newInputWidth = Math.max(this.sizer.scrollWidth, this.placeHolderSizer.scrollWidth) + 2;
			} else {
				newInputWidth = this.sizer.scrollWidth + 2;
			}
			if (newInputWidth < this.props.minWidth) {
				newInputWidth = this.props.minWidth;
			}
			if (newInputWidth !== this.state.inputWidth) {
				this.setState({
					inputWidth: newInputWidth
				});
			}
		}
	}, {
		key: 'getInput',
		value: function getInput() {
			return this.input;
		}
	}, {
		key: 'focus',
		value: function focus() {
			this.input.focus();
		}
	}, {
		key: 'blur',
		value: function blur() {
			this.input.blur();
		}
	}, {
		key: 'select',
		value: function select() {
			this.input.select();
		}
	}, {
		key: 'render',
		value: function render() {
			var sizerValue = [this.props.defaultValue, this.props.value, ''].reduce(function (previousValue, currentValue) {
				if (previousValue !== null && previousValue !== undefined) {
					return previousValue;
				}
				return currentValue;
			});

			var wrapperStyle = _extends({}, this.props.style);
			if (!wrapperStyle.display) wrapperStyle.display = 'inline-block';
			var inputStyle = _extends({}, this.props.inputStyle);
			inputStyle.width = this.state.inputWidth + 'px';
			inputStyle.boxSizing = 'content-box';

			var inputProps = _objectWithoutProperties(this.props, []);

			inputProps.className = this.props.inputClassName;
			inputProps.style = inputStyle;
			// ensure props meant for `AutosizeInput` don't end up on the `input`
			delete inputProps.inputClassName;
			delete inputProps.inputStyle;
			delete inputProps.minWidth;
			delete inputProps.onAutosize;
			delete inputProps.placeholderIsMinWidth;
			delete inputProps.inputRef;
			return _react2.default.createElement(
				'div',
				{ className: this.props.className, style: wrapperStyle },
				_react2.default.createElement('style', { dangerouslySetInnerHTML: {
						__html: ['input#' + this.state.id + '::-ms-clear {display: none;}'].join('\n')
					} }),
				_react2.default.createElement('input', _extends({ id: this.state.id }, inputProps, { ref: this.inputRef })),
				_react2.default.createElement(
					'div',
					{ ref: this.sizerRef, style: sizerStyle },
					sizerValue
				),
				this.props.placeholder ? _react2.default.createElement(
					'div',
					{ ref: this.placeHolderSizerRef, style: sizerStyle },
					this.props.placeholder
				) : null
			);
		}
	}]);

	return AutosizeInput;
}(_react.Component);

;

AutosizeInput.propTypes = {
	className: _propTypes2.default.string, // className for the outer element
	defaultValue: _propTypes2.default.any, // default field value
	inputClassName: _propTypes2.default.string, // className for the input element
	inputRef: _propTypes2.default.func, // ref callback for the input element
	inputStyle: _propTypes2.default.object, // css styles for the input element
	minWidth: _propTypes2.default.oneOfType([// minimum width for input element
	_propTypes2.default.number, _propTypes2.default.string]),
	onAutosize: _propTypes2.default.func, // onAutosize handler: function(newWidth) {}
	onChange: _propTypes2.default.func, // onChange handler: function(newValue) {}
	placeholder: _propTypes2.default.string, // placeholder text
	placeholderIsMinWidth: _propTypes2.default.bool, // don't collapse size to less than the placeholder
	style: _propTypes2.default.object, // css styles for the outer element
	value: _propTypes2.default.any // field value
};
AutosizeInput.defaultProps = {
	minWidth: 1
};

exports.default = AutosizeInput;

/***/ }),
/* 383 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = arrowRenderer;

var _react = __webpack_require__(10);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(29);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function arrowRenderer(_ref) {
	var onMouseDown = _ref.onMouseDown;

	return _react2.default.createElement('span', {
		className: 'Select-arrow',
		onMouseDown: onMouseDown
	});
};

arrowRenderer.propTypes = {
	onMouseDown: _propTypes2.default.func
};

/***/ }),
/* 384 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = clearRenderer;

var _react = __webpack_require__(10);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function clearRenderer() {
	return _react2.default.createElement('span', {
		className: 'Select-clear',
		dangerouslySetInnerHTML: { __html: '&times;' }
	});
};

/***/ }),
/* 385 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(10);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(29);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = __webpack_require__(73);

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Option = function (_React$Component) {
	_inherits(Option, _React$Component);

	function Option(props) {
		_classCallCheck(this, Option);

		var _this = _possibleConstructorReturn(this, (Option.__proto__ || Object.getPrototypeOf(Option)).call(this, props));

		_this.handleMouseDown = _this.handleMouseDown.bind(_this);
		_this.handleMouseEnter = _this.handleMouseEnter.bind(_this);
		_this.handleMouseMove = _this.handleMouseMove.bind(_this);
		_this.handleTouchStart = _this.handleTouchStart.bind(_this);
		_this.handleTouchEnd = _this.handleTouchEnd.bind(_this);
		_this.handleTouchMove = _this.handleTouchMove.bind(_this);
		_this.onFocus = _this.onFocus.bind(_this);
		return _this;
	}

	_createClass(Option, [{
		key: 'blockEvent',
		value: function blockEvent(event) {
			event.preventDefault();
			event.stopPropagation();
			if (event.target.tagName !== 'A' || !('href' in event.target)) {
				return;
			}
			if (event.target.target) {
				window.open(event.target.href, event.target.target);
			} else {
				window.location.href = event.target.href;
			}
		}
	}, {
		key: 'handleMouseDown',
		value: function handleMouseDown(event) {
			event.preventDefault();
			event.stopPropagation();
			this.props.onSelect(this.props.option, event);
		}
	}, {
		key: 'handleMouseEnter',
		value: function handleMouseEnter(event) {
			this.onFocus(event);
		}
	}, {
		key: 'handleMouseMove',
		value: function handleMouseMove(event) {
			this.onFocus(event);
		}
	}, {
		key: 'handleTouchEnd',
		value: function handleTouchEnd(event) {
			// Check if the view is being dragged, In this case
			// we don't want to fire the click event (because the user only wants to scroll)
			if (this.dragging) return;

			this.handleMouseDown(event);
		}
	}, {
		key: 'handleTouchMove',
		value: function handleTouchMove(event) {
			// Set a flag that the view is being dragged
			this.dragging = true;
		}
	}, {
		key: 'handleTouchStart',
		value: function handleTouchStart(event) {
			// Set a flag that the view is not being dragged
			this.dragging = false;
		}
	}, {
		key: 'onFocus',
		value: function onFocus(event) {
			if (!this.props.isFocused) {
				this.props.onFocus(this.props.option, event);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _props = this.props,
			    option = _props.option,
			    instancePrefix = _props.instancePrefix,
			    optionIndex = _props.optionIndex;

			var className = (0, _classnames2.default)(this.props.className, option.className);

			return option.disabled ? _react2.default.createElement(
				'div',
				{ className: className,
					onMouseDown: this.blockEvent,
					onClick: this.blockEvent },
				this.props.children
			) : _react2.default.createElement(
				'div',
				{ className: className,
					style: option.style,
					role: 'option',
					onMouseDown: this.handleMouseDown,
					onMouseEnter: this.handleMouseEnter,
					onMouseMove: this.handleMouseMove,
					onTouchStart: this.handleTouchStart,
					onTouchMove: this.handleTouchMove,
					onTouchEnd: this.handleTouchEnd,
					id: instancePrefix + '-option-' + optionIndex,
					title: option.title },
				this.props.children
			);
		}
	}]);

	return Option;
}(_react2.default.Component);

;

Option.propTypes = {
	children: _propTypes2.default.node,
	className: _propTypes2.default.string, // className (based on mouse position)
	instancePrefix: _propTypes2.default.string.isRequired, // unique prefix for the ids (used for aria)
	isDisabled: _propTypes2.default.bool, // the option is disabled
	isFocused: _propTypes2.default.bool, // the option is focused
	isSelected: _propTypes2.default.bool, // the option is selected
	onFocus: _propTypes2.default.func, // method to handle mouseEnter on option element
	onSelect: _propTypes2.default.func, // method to handle click on option element
	onUnfocus: _propTypes2.default.func, // method to handle mouseLeave on option element
	option: _propTypes2.default.object.isRequired, // object that is base for that option
	optionIndex: _propTypes2.default.number // index of the option, used to generate unique ids for aria
};

exports.default = Option;

/***/ }),
/* 386 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(10);

var _react2 = _interopRequireDefault(_react);

var _Select = __webpack_require__(72);

var _Select2 = _interopRequireDefault(_Select);

var _Async = __webpack_require__(152);

var _Async2 = _interopRequireDefault(_Async);

var _Creatable = __webpack_require__(153);

var _Creatable2 = _interopRequireDefault(_Creatable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function reduce(obj) {
	var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	return Object.keys(obj).reduce(function (props, key) {
		var value = obj[key];
		if (value !== undefined) props[key] = value;
		return props;
	}, props);
}

var AsyncCreatableSelect = function (_React$Component) {
	_inherits(AsyncCreatableSelect, _React$Component);

	function AsyncCreatableSelect() {
		_classCallCheck(this, AsyncCreatableSelect);

		return _possibleConstructorReturn(this, (AsyncCreatableSelect.__proto__ || Object.getPrototypeOf(AsyncCreatableSelect)).apply(this, arguments));
	}

	_createClass(AsyncCreatableSelect, [{
		key: 'focus',
		value: function focus() {
			this.select.focus();
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			return _react2.default.createElement(
				_Async2.default,
				this.props,
				function (asyncProps) {
					return _react2.default.createElement(
						_Creatable2.default,
						_this2.props,
						function (creatableProps) {
							return _react2.default.createElement(_Select2.default, _extends({}, reduce(asyncProps, reduce(creatableProps, {})), {
								onInputChange: function onInputChange(input) {
									creatableProps.onInputChange(input);
									return asyncProps.onInputChange(input);
								},
								ref: function ref(_ref) {
									_this2.select = _ref;
									creatableProps.ref(_ref);
									asyncProps.ref(_ref);
								}
							}));
						}
					);
				}
			);
		}
	}]);

	return AsyncCreatableSelect;
}(_react2.default.Component);

;

exports.default = AsyncCreatableSelect;

/***/ }),
/* 387 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(388);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(390)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../css-loader/index.js!./react-select.css", function() {
			var newContent = require("!!../../css-loader/index.js!./react-select.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 388 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(389)(undefined);
// imports


// module
exports.push([module.i, "/**\n * React Select\n * ============\n * Created by Jed Watson and Joss Mackison for KeystoneJS, http://www.keystonejs.com/\n * https://twitter.com/jedwatson https://twitter.com/jossmackison https://twitter.com/keystonejs\n * MIT License: https://github.com/JedWatson/react-select\n*/\n.Select {\n  position: relative;\n}\n.Select,\n.Select div,\n.Select input,\n.Select span {\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n}\n.Select.is-disabled > .Select-control {\n  background-color: #f9f9f9;\n}\n.Select.is-disabled > .Select-control:hover {\n  box-shadow: none;\n}\n.Select.is-disabled .Select-arrow-zone {\n  cursor: default;\n  pointer-events: none;\n  opacity: 0.35;\n}\n.Select-control {\n  background-color: #fff;\n  border-color: #d9d9d9 #ccc #b3b3b3;\n  border-radius: 4px;\n  border: 1px solid #ccc;\n  color: #333;\n  cursor: default;\n  display: table;\n  border-spacing: 0;\n  border-collapse: separate;\n  height: 36px;\n  outline: none;\n  overflow: hidden;\n  position: relative;\n  width: 100%;\n}\n.Select-control:hover {\n  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.06);\n}\n.Select-control .Select-input:focus {\n  outline: none;\n}\n.is-searchable.is-open > .Select-control {\n  cursor: text;\n}\n.is-open > .Select-control {\n  border-bottom-right-radius: 0;\n  border-bottom-left-radius: 0;\n  background: #fff;\n  border-color: #b3b3b3 #ccc #d9d9d9;\n}\n.is-open > .Select-control .Select-arrow {\n  top: -2px;\n  border-color: transparent transparent #999;\n  border-width: 0 5px 5px;\n}\n.is-searchable.is-focused:not(.is-open) > .Select-control {\n  cursor: text;\n}\n.is-focused:not(.is-open) > .Select-control {\n  border-color: #007eff;\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 0 3px rgba(0, 126, 255, 0.1);\n}\n.Select-placeholder,\n.Select--single > .Select-control .Select-value {\n  bottom: 0;\n  color: #aaa;\n  left: 0;\n  line-height: 34px;\n  padding-left: 10px;\n  padding-right: 10px;\n  position: absolute;\n  right: 0;\n  top: 0;\n  max-width: 100%;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.has-value.is-clearable.Select--single > .Select-control .Select-value {\n  padding-right: 42px;\n}\n.has-value.Select--single > .Select-control .Select-value .Select-value-label,\n.has-value.is-pseudo-focused.Select--single > .Select-control .Select-value .Select-value-label {\n  color: #333;\n}\n.has-value.Select--single > .Select-control .Select-value a.Select-value-label,\n.has-value.is-pseudo-focused.Select--single > .Select-control .Select-value a.Select-value-label {\n  cursor: pointer;\n  text-decoration: none;\n}\n.has-value.Select--single > .Select-control .Select-value a.Select-value-label:hover,\n.has-value.is-pseudo-focused.Select--single > .Select-control .Select-value a.Select-value-label:hover,\n.has-value.Select--single > .Select-control .Select-value a.Select-value-label:focus,\n.has-value.is-pseudo-focused.Select--single > .Select-control .Select-value a.Select-value-label:focus {\n  color: #007eff;\n  outline: none;\n  text-decoration: underline;\n}\n.Select-input {\n  height: 34px;\n  padding-left: 10px;\n  padding-right: 10px;\n  vertical-align: middle;\n}\n.Select-input > input {\n  width: 100%;\n  background: none transparent;\n  border: 0 none;\n  box-shadow: none;\n  cursor: default;\n  display: inline-block;\n  font-family: inherit;\n  font-size: inherit;\n  margin: 0;\n  outline: none;\n  line-height: 14px;\n  /* For IE 8 compatibility */\n  padding: 8px 0 12px;\n  /* For IE 8 compatibility */\n  -webkit-appearance: none;\n}\n.is-focused .Select-input > input {\n  cursor: text;\n}\n.has-value.is-pseudo-focused .Select-input {\n  opacity: 0;\n}\n.Select-control:not(.is-searchable) > .Select-input {\n  outline: none;\n}\n.Select-loading-zone {\n  cursor: pointer;\n  display: table-cell;\n  position: relative;\n  text-align: center;\n  vertical-align: middle;\n  width: 16px;\n}\n.Select-loading {\n  -webkit-animation: Select-animation-spin 400ms infinite linear;\n  -o-animation: Select-animation-spin 400ms infinite linear;\n  animation: Select-animation-spin 400ms infinite linear;\n  width: 16px;\n  height: 16px;\n  box-sizing: border-box;\n  border-radius: 50%;\n  border: 2px solid #ccc;\n  border-right-color: #333;\n  display: inline-block;\n  position: relative;\n  vertical-align: middle;\n}\n.Select-clear-zone {\n  -webkit-animation: Select-animation-fadeIn 200ms;\n  -o-animation: Select-animation-fadeIn 200ms;\n  animation: Select-animation-fadeIn 200ms;\n  color: #999;\n  cursor: pointer;\n  display: table-cell;\n  position: relative;\n  text-align: center;\n  vertical-align: middle;\n  width: 17px;\n}\n.Select-clear-zone:hover {\n  color: #D0021B;\n}\n.Select-clear {\n  display: inline-block;\n  font-size: 18px;\n  line-height: 1;\n}\n.Select--multi .Select-clear-zone {\n  width: 17px;\n}\n.Select-arrow-zone {\n  cursor: pointer;\n  display: table-cell;\n  position: relative;\n  text-align: center;\n  vertical-align: middle;\n  width: 25px;\n  padding-right: 5px;\n}\n.Select-arrow {\n  border-color: #999 transparent transparent;\n  border-style: solid;\n  border-width: 5px 5px 2.5px;\n  display: inline-block;\n  height: 0;\n  width: 0;\n  position: relative;\n}\n.is-open .Select-arrow,\n.Select-arrow-zone:hover > .Select-arrow {\n  border-top-color: #666;\n}\n.Select--multi .Select-multi-value-wrapper {\n  display: inline-block;\n}\n.Select .Select-aria-only {\n  display: inline-block;\n  height: 1px;\n  width: 1px;\n  margin: -1px;\n  clip: rect(0, 0, 0, 0);\n  overflow: hidden;\n  float: left;\n}\n@-webkit-keyframes Select-animation-fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n@keyframes Select-animation-fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n.Select-menu-outer {\n  border-bottom-right-radius: 4px;\n  border-bottom-left-radius: 4px;\n  background-color: #fff;\n  border: 1px solid #ccc;\n  border-top-color: #e6e6e6;\n  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.06);\n  box-sizing: border-box;\n  margin-top: -1px;\n  max-height: 200px;\n  position: absolute;\n  top: 100%;\n  width: 100%;\n  z-index: 1;\n  -webkit-overflow-scrolling: touch;\n}\n.Select-menu {\n  max-height: 198px;\n  overflow-y: auto;\n}\n.Select-option {\n  box-sizing: border-box;\n  background-color: #fff;\n  color: #666666;\n  cursor: pointer;\n  display: block;\n  padding: 8px 10px;\n}\n.Select-option:last-child {\n  border-bottom-right-radius: 4px;\n  border-bottom-left-radius: 4px;\n}\n.Select-option.is-selected {\n  background-color: #f5faff;\n  /* Fallback color for IE 8 */\n  background-color: rgba(0, 126, 255, 0.04);\n  color: #333;\n}\n.Select-option.is-focused {\n  background-color: #ebf5ff;\n  /* Fallback color for IE 8 */\n  background-color: rgba(0, 126, 255, 0.08);\n  color: #333;\n}\n.Select-option.is-disabled {\n  color: #cccccc;\n  cursor: default;\n}\n.Select-noresults {\n  box-sizing: border-box;\n  color: #999999;\n  cursor: default;\n  display: block;\n  padding: 8px 10px;\n}\n.Select--multi .Select-input {\n  vertical-align: middle;\n  margin-left: 10px;\n  padding: 0;\n}\n.Select--multi.has-value .Select-input {\n  margin-left: 5px;\n}\n.Select--multi .Select-value {\n  background-color: #ebf5ff;\n  /* Fallback color for IE 8 */\n  background-color: rgba(0, 126, 255, 0.08);\n  border-radius: 2px;\n  border: 1px solid #c2e0ff;\n  /* Fallback color for IE 8 */\n  border: 1px solid rgba(0, 126, 255, 0.24);\n  color: #007eff;\n  display: inline-block;\n  font-size: 0.9em;\n  line-height: 1.4;\n  margin-left: 5px;\n  margin-top: 5px;\n  vertical-align: top;\n}\n.Select--multi .Select-value-icon,\n.Select--multi .Select-value-label {\n  display: inline-block;\n  vertical-align: middle;\n}\n.Select--multi .Select-value-label {\n  border-bottom-right-radius: 2px;\n  border-top-right-radius: 2px;\n  cursor: default;\n  padding: 2px 5px;\n}\n.Select--multi a.Select-value-label {\n  color: #007eff;\n  cursor: pointer;\n  text-decoration: none;\n}\n.Select--multi a.Select-value-label:hover {\n  text-decoration: underline;\n}\n.Select--multi .Select-value-icon {\n  cursor: pointer;\n  border-bottom-left-radius: 2px;\n  border-top-left-radius: 2px;\n  border-right: 1px solid #c2e0ff;\n  /* Fallback color for IE 8 */\n  border-right: 1px solid rgba(0, 126, 255, 0.24);\n  padding: 1px 5px 3px;\n}\n.Select--multi .Select-value-icon:hover,\n.Select--multi .Select-value-icon:focus {\n  background-color: #d8eafd;\n  /* Fallback color for IE 8 */\n  background-color: rgba(0, 113, 230, 0.08);\n  color: #0071e6;\n}\n.Select--multi .Select-value-icon:active {\n  background-color: #c2e0ff;\n  /* Fallback color for IE 8 */\n  background-color: rgba(0, 126, 255, 0.24);\n}\n.Select--multi.is-disabled .Select-value {\n  background-color: #fcfcfc;\n  border: 1px solid #e3e3e3;\n  color: #333;\n}\n.Select--multi.is-disabled .Select-value-icon {\n  cursor: not-allowed;\n  border-right: 1px solid #e3e3e3;\n}\n.Select--multi.is-disabled .Select-value-icon:hover,\n.Select--multi.is-disabled .Select-value-icon:focus,\n.Select--multi.is-disabled .Select-value-icon:active {\n  background-color: #fcfcfc;\n}\n@keyframes Select-animation-spin {\n  to {\n    transform: rotate(1turn);\n  }\n}\n@-webkit-keyframes Select-animation-spin {\n  to {\n    -webkit-transform: rotate(1turn);\n  }\n}\n", ""]);

// exports


/***/ }),
/* 389 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 390 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			var styleTarget = fn.call(this, selector);
			// Special case to return head of iframe instead of iframe itself
			if (styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[selector] = styleTarget;
		}
		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(391);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 391 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 392 */
/***/ (function(module, exports) {

module.exports = {"searchResultTotal":"0","rows":[{"id":"TRIAE_CS42_1AL_TGACv1_000002_AA0000030.1","name":"TRIAE_CS42_1AL_TGACv1_000002_AA0000030.1","expressions":[{"stats":{"min":7,"lower_quartile":7,"median":9,"upper_quartile":7,"max":11},"values":[{"id":"ERR424774","assays":["ERR424774"],"value":7},{"id":"ERR424772","assays":["ERR424772"],"value":11}]},{"stats":{"min":5,"lower_quartile":5,"median":5.5,"upper_quartile":5,"max":6},"values":[{"id":"ERR424765","assays":["ERR424765"],"value":5},{"id":"ERR424726","assays":["ERR424726"],"value":6}]},{"stats":{"min":7,"lower_quartile":7,"median":7.5,"upper_quartile":7,"max":8},"values":[{"id":"ERR424777","assays":["ERR424777"],"value":8},{"id":"t9","assays":["ERR424770","ERR424737"],"value":7}]},{"stats":{"min":15,"lower_quartile":15,"median":15.5,"upper_quartile":15,"max":16},"values":[{"id":"ERR424730","assays":["ERR424730"],"value":16},{"id":"ERR424769","assays":["ERR424769"],"value":15}]},{"stats":{"min":10,"lower_quartile":10,"median":10.5,"upper_quartile":10,"max":11},"values":[{"id":"t6","assays":["ERR424763","ERR424749"],"value":11},{"id":"ERR424754","assays":["ERR424754"],"value":10}]},{"stats":{"min":3,"lower_quartile":3,"median":3,"upper_quartile":3,"max":3},"values":[{"id":"ERR424776","assays":["ERR424776"],"value":3},{"id":"t2","assays":["ERR424751","ERR424734"],"value":3}]},{"stats":{"min":22,"lower_quartile":22,"median":22.5,"upper_quartile":22,"max":23},"values":[{"id":"ERR424724","assays":["ERR424724"],"value":22},{"id":"ERR424758","assays":["ERR424758"],"value":23}]},{"stats":{"min":26,"lower_quartile":26,"median":28,"upper_quartile":26,"max":30},"values":[{"id":"ERR424721","assays":["ERR424721"],"value":30},{"id":"ERR424750","assays":["ERR424750"],"value":26}]},{"stats":{"min":9,"lower_quartile":9,"median":9.5,"upper_quartile":9,"max":10},"values":[{"id":"ERR424762","assays":["ERR424762"],"value":9},{"id":"ERR424739","assays":["ERR424739"],"value":10}]},{"stats":{"min":10,"lower_quartile":10,"median":10,"upper_quartile":10,"max":10},"values":[{"id":"ERR424743","assays":["ERR424743"],"value":10}]},{"stats":{"min":12,"lower_quartile":12,"median":16.5,"upper_quartile":12,"max":21},"values":[{"id":"ERR424728","assays":["ERR424728"],"value":12},{"id":"ERR424748","assays":["ERR424748"],"value":21}]},{"stats":{"min":20,"lower_quartile":20,"median":20.5,"upper_quartile":20,"max":21},"values":[{"id":"ERR424756","assays":["ERR424756"],"value":20},{"id":"ERR424775","assays":["ERR424775"],"value":21}]},{"stats":{"min":11,"lower_quartile":11,"median":11.5,"upper_quartile":11,"max":12},"values":[{"id":"ERR424733","assays":["ERR424733"],"value":11},{"id":"ERR424767","assays":["ERR424767"],"value":12}]},{"stats":{"min":24,"lower_quartile":24,"median":26.5,"upper_quartile":24,"max":29},"values":[{"id":"ERR424753","assays":["ERR424753"],"value":24},{"id":"t3","assays":["ERR424735","ERR424741"],"value":29}]},{"stats":{"min":5,"lower_quartile":5,"median":7,"upper_quartile":5,"max":9},"values":[{"id":"t7","assays":["ERR424722","ERR424723","ERR424744","ERR424727"],"value":5},{"id":"ERR424732","assays":["ERR424732"],"value":9}]}],"uri":"genes/TRIAE_CS42_1AL_TGACv1_000002_AA0000030.1#information","expressionUnit":"TPM"},{"id":"TRIAE_CS42_1AL_TGACv1_000002_AA0000030.2","name":"TRIAE_CS42_1AL_TGACv1_000002_AA0000030.2","expressions":[{"stats":{"min":0.4,"lower_quartile":0.4,"median":1.2000000000000002,"upper_quartile":0.4,"max":2},"values":[{"id":"ERR424774","assays":["ERR424774"],"value":2},{"id":"ERR424772","assays":["ERR424772"],"value":0.4}]},{"stats":{"min":0.8,"lower_quartile":0.8,"median":0.8,"upper_quartile":0.8,"max":0.8},"values":[{"id":"ERR424765","assays":["ERR424765"],"value":0.8}]},{"stats":{"min":0.3,"lower_quartile":0.3,"median":0.55,"upper_quartile":0.3,"max":0.8},"values":[{"id":"ERR424777","assays":["ERR424777"],"value":0.3},{"id":"t9","assays":["ERR424770","ERR424737"],"value":0.8}]},{"stats":{"min":2,"lower_quartile":2,"median":2,"upper_quartile":2,"max":2},"values":[{"id":"ERR424730","assays":["ERR424730"],"value":2}]},{"stats":{"min":0.6,"lower_quartile":0.6,"median":0.6,"upper_quartile":0.6,"max":0.6},"values":[{"id":"t6","assays":["ERR424763","ERR424749"],"value":0.6}]},{"stats":{"min":0.4,"lower_quartile":0.4,"median":1.2000000000000002,"upper_quartile":0.4,"max":2},"values":[{"id":"ERR424776","assays":["ERR424776"],"value":0.4},{"id":"t2","assays":["ERR424751","ERR424734"],"value":2}]},{"stats":{"min":3,"lower_quartile":3,"median":3,"upper_quartile":3,"max":3},"values":[{"id":"ERR424724","assays":["ERR424724"],"value":3},{"id":"ERR424758","assays":["ERR424758"],"value":3}]},{"stats":{"min":1,"lower_quartile":1,"median":1,"upper_quartile":1,"max":1},"values":[{"id":"ERR424750","assays":["ERR424750"],"value":1}]},{"stats":{"min":0.3,"lower_quartile":0.3,"median":0.5,"upper_quartile":0.3,"max":0.7},"values":[{"id":"ERR424762","assays":["ERR424762"],"value":0.7},{"id":"ERR424739","assays":["ERR424739"],"value":0.3}]},{"stats":{"min":2,"lower_quartile":2,"median":2,"upper_quartile":2,"max":2},"values":[{"id":"ERR424743","assays":["ERR424743"],"value":2}]},{"stats":{"min":2,"lower_quartile":2,"median":2,"upper_quartile":2,"max":2},"values":[{"id":"ERR424728","assays":["ERR424728"],"value":2}]},{"stats":{"min":1,"lower_quartile":1,"median":2,"upper_quartile":1,"max":3},"values":[{"id":"ERR424756","assays":["ERR424756"],"value":3},{"id":"ERR424775","assays":["ERR424775"],"value":1}]},{},{"stats":{"min":1,"lower_quartile":1,"median":1.5,"upper_quartile":1,"max":2},"values":[{"id":"ERR424753","assays":["ERR424753"],"value":2},{"id":"t3","assays":["ERR424735","ERR424741"],"value":1}]},{"stats":{"min":0.4,"lower_quartile":0.4,"median":0.4,"upper_quartile":0.4,"max":0.4},"values":[{"id":"t7","assays":["ERR424722","ERR424723","ERR424744","ERR424727"],"value":0.4}]}],"uri":"genes/TRIAE_CS42_1AL_TGACv1_000002_AA0000030.2#information","expressionUnit":"TPM"},{"id":"TRIAE_CS42_1AL_TGACv1_000002_AA0000030.3","name":"TRIAE_CS42_1AL_TGACv1_000002_AA0000030.3","expressions":[{"stats":{"min":0.9,"lower_quartile":0.9,"median":0.9,"upper_quartile":0.9,"max":0.9},"values":[{"id":"ERR424772","assays":["ERR424772"],"value":0.9}]},{},{"stats":{"min":0.1,"lower_quartile":0.1,"median":0.1,"upper_quartile":0.1,"max":0.1},"values":[{"id":"ERR424777","assays":["ERR424777"],"value":0.1}]},{"stats":{"min":0.3,"lower_quartile":0.3,"median":0.4,"upper_quartile":0.3,"max":0.5},"values":[{"id":"ERR424730","assays":["ERR424730"],"value":0.3},{"id":"ERR424769","assays":["ERR424769"],"value":0.5}]},{"stats":{"min":0.1,"lower_quartile":0.1,"median":0.1,"upper_quartile":0.1,"max":0.1},"values":[{"id":"t6","assays":["ERR424763","ERR424749"],"value":0.1}]},{"stats":{"min":0.1,"lower_quartile":0.1,"median":0.1,"upper_quartile":0.1,"max":0.1},"values":[{"id":"ERR424776","assays":["ERR424776"],"value":0.1}]},{"stats":{"min":0.4,"lower_quartile":0.4,"median":0.4,"upper_quartile":0.4,"max":0.4},"values":[{"id":"ERR424758","assays":["ERR424758"],"value":0.4}]},{"stats":{"min":0.3,"lower_quartile":0.3,"median":0.55,"upper_quartile":0.3,"max":0.8},"values":[{"id":"ERR424721","assays":["ERR424721"],"value":0.8},{"id":"ERR424750","assays":["ERR424750"],"value":0.3}]},{},{"stats":{"min":0.4,"lower_quartile":0.4,"median":0.4,"upper_quartile":0.4,"max":0.4},"values":[{"id":"ERR424743","assays":["ERR424743"],"value":0.4}]},{"stats":{"min":0.1,"lower_quartile":0.1,"median":0.1,"upper_quartile":0.1,"max":0.1},"values":[{"id":"ERR424728","assays":["ERR424728"],"value":0.1}]},{"stats":{"min":0.3,"lower_quartile":0.3,"median":0.4,"upper_quartile":0.3,"max":0.5},"values":[{"id":"ERR424756","assays":["ERR424756"],"value":0.5},{"id":"ERR424775","assays":["ERR424775"],"value":0.3}]},{"stats":{"min":0.3,"lower_quartile":0.3,"median":0.3,"upper_quartile":0.3,"max":0.3},"values":[{"id":"ERR424733","assays":["ERR424733"],"value":0.3}]},{"stats":{"min":0.4,"lower_quartile":0.4,"median":0.45,"upper_quartile":0.4,"max":0.5},"values":[{"id":"ERR424753","assays":["ERR424753"],"value":0.4},{"id":"t3","assays":["ERR424735","ERR424741"],"value":0.5}]},{"stats":{"min":0.1,"lower_quartile":0.1,"median":0.1,"upper_quartile":0.1,"max":0.1},"values":[{"id":"t7","assays":["ERR424722","ERR424723","ERR424744","ERR424727"],"value":0.1}]}],"uri":"genes/TRIAE_CS42_1AL_TGACv1_000002_AA0000030.3#information","expressionUnit":"TPM"},{"id":"TRIAE_CS42_1AL_TGACv1_000002_AA0000030.4","name":"TRIAE_CS42_1AL_TGACv1_000002_AA0000030.4","expressions":[{"stats":{"min":0.1,"lower_quartile":0.1,"median":0.15000000000000002,"upper_quartile":0.1,"max":0.2},"values":[{"id":"ERR424774","assays":["ERR424774"],"value":0.2},{"id":"ERR424772","assays":["ERR424772"],"value":0.1}]},{"stats":{"min":0.6,"lower_quartile":0.6,"median":0.6,"upper_quartile":0.6,"max":0.6},"values":[{"id":"ERR424726","assays":["ERR424726"],"value":0.6}]},{"stats":{"min":0.2,"lower_quartile":0.2,"median":0.35,"upper_quartile":0.2,"max":0.5},"values":[{"id":"ERR424777","assays":["ERR424777"],"value":0.2},{"id":"t9","assays":["ERR424770","ERR424737"],"value":0.5}]},{"stats":{"min":0.3,"lower_quartile":0.3,"median":0.3,"upper_quartile":0.3,"max":0.3},"values":[{"id":"ERR424769","assays":["ERR424769"],"value":0.3}]},{"stats":{"min":0.3,"lower_quartile":0.3,"median":0.3,"upper_quartile":0.3,"max":0.3},"values":[{"id":"t6","assays":["ERR424763","ERR424749"],"value":0.3}]},{},{"stats":{"min":0.2,"lower_quartile":0.2,"median":0.25,"upper_quartile":0.2,"max":0.3},"values":[{"id":"ERR424724","assays":["ERR424724"],"value":0.2},{"id":"ERR424758","assays":["ERR424758"],"value":0.3}]},{"stats":{"min":0.4,"lower_quartile":0.4,"median":0.4,"upper_quartile":0.4,"max":0.4},"values":[{"id":"ERR424721","assays":["ERR424721"],"value":0.4}]},{"stats":{"min":0.3,"lower_quartile":0.3,"median":0.3,"upper_quartile":0.3,"max":0.3},"values":[{"id":"ERR424739","assays":["ERR424739"],"value":0.3}]},{},{"stats":{"min":0.2,"lower_quartile":0.2,"median":0.2,"upper_quartile":0.2,"max":0.2},"values":[{"id":"ERR424728","assays":["ERR424728"],"value":0.2},{"id":"ERR424748","assays":["ERR424748"],"value":0.2}]},{"stats":{"min":0.5,"lower_quartile":0.5,"median":0.75,"upper_quartile":0.5,"max":1},"values":[{"id":"ERR424756","assays":["ERR424756"],"value":1},{"id":"ERR424775","assays":["ERR424775"],"value":0.5}]},{},{"stats":{"min":0.4,"lower_quartile":0.4,"median":0.4,"upper_quartile":0.4,"max":0.4},"values":[{"id":"t3","assays":["ERR424735","ERR424741"],"value":0.4}]},{}],"uri":"genes/TRIAE_CS42_1AL_TGACv1_000002_AA0000030.4#information","expressionUnit":"TPM"},{"id":"TRIAE_CS42_1AL_TGACv1_000002_AA0000030.5","name":"TRIAE_CS42_1AL_TGACv1_000002_AA0000030.5","expressions":[{"stats":{"min":1,"lower_quartile":1,"median":1,"upper_quartile":1,"max":1},"values":[{"id":"ERR424774","assays":["ERR424774"],"value":1},{"id":"ERR424772","assays":["ERR424772"],"value":1}]},{"stats":{"min":1,"lower_quartile":1,"median":1,"upper_quartile":1,"max":1},"values":[{"id":"ERR424765","assays":["ERR424765"],"value":1},{"id":"ERR424726","assays":["ERR424726"],"value":1}]},{"stats":{"min":0.8,"lower_quartile":0.8,"median":1.4,"upper_quartile":0.8,"max":2},"values":[{"id":"ERR424777","assays":["ERR424777"],"value":2},{"id":"t9","assays":["ERR424770","ERR424737"],"value":0.8}]},{"stats":{"min":2,"lower_quartile":2,"median":2.5,"upper_quartile":2,"max":3},"values":[{"id":"ERR424730","assays":["ERR424730"],"value":3},{"id":"ERR424769","assays":["ERR424769"],"value":2}]},{"stats":{"min":1,"lower_quartile":1,"median":1,"upper_quartile":1,"max":1},"values":[{"id":"t6","assays":["ERR424763","ERR424749"],"value":1},{"id":"ERR424754","assays":["ERR424754"],"value":1}]},{"stats":{"min":0.9,"lower_quartile":0.9,"median":0.9,"upper_quartile":0.9,"max":0.9},"values":[{"id":"ERR424776","assays":["ERR424776"],"value":0.9},{"id":"t2","assays":["ERR424751","ERR424734"],"value":0.9}]},{"stats":{"min":3,"lower_quartile":3,"median":3.5,"upper_quartile":3,"max":4},"values":[{"id":"ERR424724","assays":["ERR424724"],"value":3},{"id":"ERR424758","assays":["ERR424758"],"value":4}]},{"stats":{"min":6,"lower_quartile":6,"median":6,"upper_quartile":6,"max":6},"values":[{"id":"ERR424721","assays":["ERR424721"],"value":6},{"id":"ERR424750","assays":["ERR424750"],"value":6}]},{"stats":{"min":1,"lower_quartile":1,"median":1.5,"upper_quartile":1,"max":2},"values":[{"id":"ERR424762","assays":["ERR424762"],"value":2},{"id":"ERR424739","assays":["ERR424739"],"value":1}]},{"stats":{"min":1,"lower_quartile":1,"median":1,"upper_quartile":1,"max":1},"values":[{"id":"ERR424743","assays":["ERR424743"],"value":1}]},{"stats":{"min":2,"lower_quartile":2,"median":2.5,"upper_quartile":2,"max":3},"values":[{"id":"ERR424728","assays":["ERR424728"],"value":2},{"id":"ERR424748","assays":["ERR424748"],"value":3}]},{"stats":{"min":3,"lower_quartile":3,"median":3,"upper_quartile":3,"max":3},"values":[{"id":"ERR424756","assays":["ERR424756"],"value":3},{"id":"ERR424775","assays":["ERR424775"],"value":3}]},{"stats":{"min":2,"lower_quartile":2,"median":2,"upper_quartile":2,"max":2},"values":[{"id":"ERR424733","assays":["ERR424733"],"value":2},{"id":"ERR424767","assays":["ERR424767"],"value":2}]},{"stats":{"min":4,"lower_quartile":4,"median":4,"upper_quartile":4,"max":4},"values":[{"id":"ERR424753","assays":["ERR424753"],"value":4},{"id":"t3","assays":["ERR424735","ERR424741"],"value":4}]},{"stats":{"min":1,"lower_quartile":1,"median":1.5,"upper_quartile":1,"max":2},"values":[{"id":"t7","assays":["ERR424722","ERR424723","ERR424744","ERR424727"],"value":1},{"id":"ERR424732","assays":["ERR424732"],"value":2}]}],"uri":"genes/TRIAE_CS42_1AL_TGACv1_000002_AA0000030.5#information","expressionUnit":"TPM"},{"id":"TRIAE_CS42_1AL_TGACv1_000002_AA0000030.6","name":"TRIAE_CS42_1AL_TGACv1_000002_AA0000030.6","expressions":[{"stats":{"min":0.1,"lower_quartile":0.1,"median":0.1,"upper_quartile":0.1,"max":0.1},"values":[{"id":"ERR424774","assays":["ERR424774"],"value":0.1}]},{"stats":{"min":0.3,"lower_quartile":0.3,"median":0.3,"upper_quartile":0.3,"max":0.3},"values":[{"id":"ERR424765","assays":["ERR424765"],"value":0.3},{"id":"ERR424726","assays":["ERR424726"],"value":0.3}]},{},{"stats":{"min":0.9,"lower_quartile":0.9,"median":0.9,"upper_quartile":0.9,"max":0.9},"values":[{"id":"ERR424769","assays":["ERR424769"],"value":0.9}]},{"stats":{"min":2,"lower_quartile":2,"median":2,"upper_quartile":2,"max":2},"values":[{"id":"ERR424754","assays":["ERR424754"],"value":2}]},{"stats":{"min":0.4,"lower_quartile":0.4,"median":0.7,"upper_quartile":0.4,"max":1},"values":[{"id":"ERR424776","assays":["ERR424776"],"value":1},{"id":"t2","assays":["ERR424751","ERR424734"],"value":0.4}]},{"stats":{"min":0.3,"lower_quartile":0.3,"median":0.3,"upper_quartile":0.3,"max":0.3},"values":[{"id":"ERR424758","assays":["ERR424758"],"value":0.3}]},{"stats":{"min":0.5,"lower_quartile":0.5,"median":0.5,"upper_quartile":0.5,"max":0.5},"values":[{"id":"ERR424721","assays":["ERR424721"],"value":0.5}]},{"stats":{"min":0.4,"lower_quartile":0.4,"median":0.4,"upper_quartile":0.4,"max":0.4},"values":[{"id":"ERR424739","assays":["ERR424739"],"value":0.4}]},{"stats":{"min":1,"lower_quartile":1,"median":1,"upper_quartile":1,"max":1},"values":[{"id":"ERR424743","assays":["ERR424743"],"value":1}]},{},{"stats":{"min":1,"lower_quartile":1,"median":1,"upper_quartile":1,"max":1},"values":[{"id":"ERR424756","assays":["ERR424756"],"value":1}]},{"stats":{"min":0.8,"lower_quartile":0.8,"median":0.8,"upper_quartile":0.8,"max":0.8},"values":[{"id":"ERR424733","assays":["ERR424733"],"value":0.8}]},{"stats":{"min":0.3,"lower_quartile":0.3,"median":0.3,"upper_quartile":0.3,"max":0.3},"values":[{"id":"t3","assays":["ERR424735","ERR424741"],"value":0.3}]},{"stats":{"min":4,"lower_quartile":4,"median":4,"upper_quartile":4,"max":4},"values":[{"id":"t7","assays":["ERR424722","ERR424723","ERR424744","ERR424727"],"value":4}]}],"uri":"genes/TRIAE_CS42_1AL_TGACv1_000002_AA0000030.6#information","expressionUnit":"TPM"}]}

/***/ }),
/* 393 */
/***/ (function(module, exports, __webpack_require__) {

var queryString = __webpack_require__(394)
var setQuery = __webpack_require__(396)
var assign = __webpack_require__(397)
var ensureHeader = __webpack_require__(398)

// this is replaced in the browser
var request = __webpack_require__(399)

var mimeTypeJson = 'application/json'
var noop = function () {}

module.exports = xhrRequest
function xhrRequest (url, opt, cb) {
  if (!url || typeof url !== 'string') {
    throw new TypeError('must specify a URL')
  }
  if (typeof opt === 'function') {
    cb = opt
    opt = {}
  }
  if (cb && typeof cb !== 'function') {
    throw new TypeError('expected cb to be undefined or a function')
  }

  cb = cb || noop
  opt = opt || {}

  var defaultResponse = opt.json ? 'json' : 'text'
  opt = assign({ responseType: defaultResponse }, opt)

  var headers = opt.headers || {}
  var method = (opt.method || 'GET').toUpperCase()
  var query = opt.query
  if (query) {
    if (typeof query !== 'string') {
      query = queryString.stringify(query)
    }
    url = setQuery(url, query)
  }

  // allow json response
  if (opt.responseType === 'json') {
    ensureHeader(headers, 'Accept', mimeTypeJson)
  }

  // if body content is json
  if (opt.json && method !== 'GET' && method !== 'HEAD') {
    ensureHeader(headers, 'Content-Type', mimeTypeJson)
    opt.body = JSON.stringify(opt.body)
  }

  opt.method = method
  opt.url = url
  opt.headers = headers
  delete opt.query
  delete opt.json

  return request(opt, cb)
}


/***/ }),
/* 394 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strictUriEncode = __webpack_require__(395);

exports.extract = function (str) {
	return str.split('?')[1] || '';
};

exports.parse = function (str) {
	if (typeof str !== 'string') {
		return {};
	}

	str = str.trim().replace(/^(\?|#|&)/, '');

	if (!str) {
		return {};
	}

	return str.split('&').reduce(function (ret, param) {
		var parts = param.replace(/\+/g, ' ').split('=');
		// Firefox (pre 40) decodes `%3D` to `=`
		// https://github.com/sindresorhus/query-string/pull/37
		var key = parts.shift();
		var val = parts.length > 0 ? parts.join('=') : undefined;

		key = decodeURIComponent(key);

		// missing `=` should be `null`:
		// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
		val = val === undefined ? null : decodeURIComponent(val);

		if (!ret.hasOwnProperty(key)) {
			ret[key] = val;
		} else if (Array.isArray(ret[key])) {
			ret[key].push(val);
		} else {
			ret[key] = [ret[key], val];
		}

		return ret;
	}, {});
};

exports.stringify = function (obj) {
	return obj ? Object.keys(obj).sort().map(function (key) {
		var val = obj[key];

		if (Array.isArray(val)) {
			return val.sort().map(function (val2) {
				return strictUriEncode(key) + '=' + strictUriEncode(val2);
			}).join('&');
		}

		return strictUriEncode(key) + '=' + strictUriEncode(val);
	}).filter(function (x) {
		return x.length > 0;
	}).join('&') : '';
};


/***/ }),
/* 395 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function (str) {
	return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
		return '%' + c.charCodeAt(0).toString(16).toUpperCase();
	});
};


/***/ }),
/* 396 */
/***/ (function(module, exports) {

module.exports = urlSetQuery
function urlSetQuery (url, query) {
  if (query) {
    // remove optional leading symbols
    query = query.trim().replace(/^(\?|#|&)/, '')

    // don't append empty query
    query = query ? ('?' + query) : query

    var parts = url.split(/[\?\#]/)
    var start = parts[0]
    if (query && /\:\/\/[^\/]*$/.test(start)) {
      // e.g. http://foo.com -> http://foo.com/
      start = start + '/'
    }
    var match = url.match(/(\#.*)$/)
    url = start + query
    if (match) { // add hash back in
      url = url + match[0]
    }
  }
  return url
}


/***/ }),
/* 397 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function ToObject(val) {
	if (val == null) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function ownEnumerableKeys(obj) {
	var keys = Object.getOwnPropertyNames(obj);

	if (Object.getOwnPropertySymbols) {
		keys = keys.concat(Object.getOwnPropertySymbols(obj));
	}

	return keys.filter(function (key) {
		return propIsEnumerable.call(obj, key);
	});
}

module.exports = Object.assign || function (target, source) {
	var from;
	var keys;
	var to = ToObject(target);

	for (var s = 1; s < arguments.length; s++) {
		from = arguments[s];
		keys = ownEnumerableKeys(Object(from));

		for (var i = 0; i < keys.length; i++) {
			to[keys[i]] = from[keys[i]];
		}
	}

	return to;
};


/***/ }),
/* 398 */
/***/ (function(module, exports) {

module.exports = ensureHeader
function ensureHeader (headers, key, value) {
  var lower = key.toLowerCase()
  if (!headers[key] && !headers[lower]) {
    headers[key] = value
  }
}


/***/ }),
/* 399 */
/***/ (function(module, exports, __webpack_require__) {

var xhr = __webpack_require__(400)
var normalize = __webpack_require__(406)

module.exports = xhrRequest
function xhrRequest (opt, cb) {
  delete opt.uri

  // for better JSON.parse error handling than xhr module
  var useJson = false
  if (opt.responseType === 'json') {
    opt.responseType = 'text'
    useJson = true
  }

  return xhr(opt, function xhrRequestResult (err, resp, body) {
    if (useJson && !err) {
      try {
        var text = resp.rawRequest.responseText
        body = JSON.parse(text)
      } catch (e) {
        err = e
      }
    }

    resp = normalize(opt, resp)
    if (err) cb(err, null, resp)
    else cb(err, body, resp)
  })
}


/***/ }),
/* 400 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var window = __webpack_require__(401)
var isFunction = __webpack_require__(154)
var parseHeaders = __webpack_require__(402)
var xtend = __webpack_require__(405)

module.exports = createXHR
createXHR.XMLHttpRequest = window.XMLHttpRequest || noop
createXHR.XDomainRequest = "withCredentials" in (new createXHR.XMLHttpRequest()) ? createXHR.XMLHttpRequest : window.XDomainRequest

forEachArray(["get", "put", "post", "patch", "head", "delete"], function(method) {
    createXHR[method === "delete" ? "del" : method] = function(uri, options, callback) {
        options = initParams(uri, options, callback)
        options.method = method.toUpperCase()
        return _createXHR(options)
    }
})

function forEachArray(array, iterator) {
    for (var i = 0; i < array.length; i++) {
        iterator(array[i])
    }
}

function isEmpty(obj){
    for(var i in obj){
        if(obj.hasOwnProperty(i)) return false
    }
    return true
}

function initParams(uri, options, callback) {
    var params = uri

    if (isFunction(options)) {
        callback = options
        if (typeof uri === "string") {
            params = {uri:uri}
        }
    } else {
        params = xtend(options, {uri: uri})
    }

    params.callback = callback
    return params
}

function createXHR(uri, options, callback) {
    options = initParams(uri, options, callback)
    return _createXHR(options)
}

function _createXHR(options) {
    if(typeof options.callback === "undefined"){
        throw new Error("callback argument missing")
    }

    var called = false
    var callback = function cbOnce(err, response, body){
        if(!called){
            called = true
            options.callback(err, response, body)
        }
    }

    function readystatechange() {
        if (xhr.readyState === 4) {
            setTimeout(loadFunc, 0)
        }
    }

    function getBody() {
        // Chrome with requestType=blob throws errors arround when even testing access to responseText
        var body = undefined

        if (xhr.response) {
            body = xhr.response
        } else {
            body = xhr.responseText || getXml(xhr)
        }

        if (isJson) {
            try {
                body = JSON.parse(body)
            } catch (e) {}
        }

        return body
    }

    function errorFunc(evt) {
        clearTimeout(timeoutTimer)
        if(!(evt instanceof Error)){
            evt = new Error("" + (evt || "Unknown XMLHttpRequest Error") )
        }
        evt.statusCode = 0
        return callback(evt, failureResponse)
    }

    // will load the data & process the response in a special response object
    function loadFunc() {
        if (aborted) return
        var status
        clearTimeout(timeoutTimer)
        if(options.useXDR && xhr.status===undefined) {
            //IE8 CORS GET successful response doesn't have a status field, but body is fine
            status = 200
        } else {
            status = (xhr.status === 1223 ? 204 : xhr.status)
        }
        var response = failureResponse
        var err = null

        if (status !== 0){
            response = {
                body: getBody(),
                statusCode: status,
                method: method,
                headers: {},
                url: uri,
                rawRequest: xhr
            }
            if(xhr.getAllResponseHeaders){ //remember xhr can in fact be XDR for CORS in IE
                response.headers = parseHeaders(xhr.getAllResponseHeaders())
            }
        } else {
            err = new Error("Internal XMLHttpRequest Error")
        }
        return callback(err, response, response.body)
    }

    var xhr = options.xhr || null

    if (!xhr) {
        if (options.cors || options.useXDR) {
            xhr = new createXHR.XDomainRequest()
        }else{
            xhr = new createXHR.XMLHttpRequest()
        }
    }

    var key
    var aborted
    var uri = xhr.url = options.uri || options.url
    var method = xhr.method = options.method || "GET"
    var body = options.body || options.data
    var headers = xhr.headers = options.headers || {}
    var sync = !!options.sync
    var isJson = false
    var timeoutTimer
    var failureResponse = {
        body: undefined,
        headers: {},
        statusCode: 0,
        method: method,
        url: uri,
        rawRequest: xhr
    }

    if ("json" in options && options.json !== false) {
        isJson = true
        headers["accept"] || headers["Accept"] || (headers["Accept"] = "application/json") //Don't override existing accept header declared by user
        if (method !== "GET" && method !== "HEAD") {
            headers["content-type"] || headers["Content-Type"] || (headers["Content-Type"] = "application/json") //Don't override existing accept header declared by user
            body = JSON.stringify(options.json === true ? body : options.json)
        }
    }

    xhr.onreadystatechange = readystatechange
    xhr.onload = loadFunc
    xhr.onerror = errorFunc
    // IE9 must have onprogress be set to a unique function.
    xhr.onprogress = function () {
        // IE must die
    }
    xhr.onabort = function(){
        aborted = true;
    }
    xhr.ontimeout = errorFunc
    xhr.open(method, uri, !sync, options.username, options.password)
    //has to be after open
    if(!sync) {
        xhr.withCredentials = !!options.withCredentials
    }
    // Cannot set timeout with sync request
    // not setting timeout on the xhr object, because of old webkits etc. not handling that correctly
    // both npm's request and jquery 1.x use this kind of timeout, so this is being consistent
    if (!sync && options.timeout > 0 ) {
        timeoutTimer = setTimeout(function(){
            if (aborted) return
            aborted = true//IE9 may still call readystatechange
            xhr.abort("timeout")
            var e = new Error("XMLHttpRequest timeout")
            e.code = "ETIMEDOUT"
            errorFunc(e)
        }, options.timeout )
    }

    if (xhr.setRequestHeader) {
        for(key in headers){
            if(headers.hasOwnProperty(key)){
                xhr.setRequestHeader(key, headers[key])
            }
        }
    } else if (options.headers && !isEmpty(options.headers)) {
        throw new Error("Headers cannot be set on an XDomainRequest object")
    }

    if ("responseType" in options) {
        xhr.responseType = options.responseType
    }

    if ("beforeSend" in options &&
        typeof options.beforeSend === "function"
    ) {
        options.beforeSend(xhr)
    }

    // Microsoft Edge browser sends "undefined" when send is called with undefined value.
    // XMLHttpRequest spec says to pass null as body to indicate no body
    // See https://github.com/naugtur/xhr/issues/100.
    xhr.send(body || null)

    return xhr


}

function getXml(xhr) {
    if (xhr.responseType === "document") {
        return xhr.responseXML
    }
    var firefoxBugTakenEffect = xhr.responseXML && xhr.responseXML.documentElement.nodeName === "parsererror"
    if (xhr.responseType === "" && !firefoxBugTakenEffect) {
        return xhr.responseXML
    }

    return null
}

function noop() {}


/***/ }),
/* 401 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var win;

if (typeof window !== "undefined") {
    win = window;
} else if (typeof global !== "undefined") {
    win = global;
} else if (typeof self !== "undefined"){
    win = self;
} else {
    win = {};
}

module.exports = win;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(55)))

/***/ }),
/* 402 */
/***/ (function(module, exports, __webpack_require__) {

var trim = __webpack_require__(403)
  , forEach = __webpack_require__(404)
  , isArray = function(arg) {
      return Object.prototype.toString.call(arg) === '[object Array]';
    }

module.exports = function (headers) {
  if (!headers)
    return {}

  var result = {}

  forEach(
      trim(headers).split('\n')
    , function (row) {
        var index = row.indexOf(':')
          , key = trim(row.slice(0, index)).toLowerCase()
          , value = trim(row.slice(index + 1))

        if (typeof(result[key]) === 'undefined') {
          result[key] = value
        } else if (isArray(result[key])) {
          result[key].push(value)
        } else {
          result[key] = [ result[key], value ]
        }
      }
  )

  return result
}

/***/ }),
/* 403 */
/***/ (function(module, exports) {


exports = module.exports = trim;

function trim(str){
  return str.replace(/^\s*|\s*$/g, '');
}

exports.left = function(str){
  return str.replace(/^\s*/, '');
};

exports.right = function(str){
  return str.replace(/\s*$/, '');
};


/***/ }),
/* 404 */
/***/ (function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__(154)

module.exports = forEach

var toString = Object.prototype.toString
var hasOwnProperty = Object.prototype.hasOwnProperty

function forEach(list, iterator, context) {
    if (!isFunction(iterator)) {
        throw new TypeError('iterator must be a function')
    }

    if (arguments.length < 3) {
        context = this
    }
    
    if (toString.call(list) === '[object Array]')
        forEachArray(list, iterator, context)
    else if (typeof list === 'string')
        forEachString(list, iterator, context)
    else
        forEachObject(list, iterator, context)
}

function forEachArray(array, iterator, context) {
    for (var i = 0, len = array.length; i < len; i++) {
        if (hasOwnProperty.call(array, i)) {
            iterator.call(context, array[i], i, array)
        }
    }
}

function forEachString(string, iterator, context) {
    for (var i = 0, len = string.length; i < len; i++) {
        // no such thing as a sparse string.
        iterator.call(context, string.charAt(i), i, string)
    }
}

function forEachObject(object, iterator, context) {
    for (var k in object) {
        if (hasOwnProperty.call(object, k)) {
            iterator.call(context, object[k], k, object)
        }
    }
}


/***/ }),
/* 405 */
/***/ (function(module, exports) {

module.exports = extend

var hasOwnProperty = Object.prototype.hasOwnProperty;

function extend() {
    var target = {}

    for (var i = 0; i < arguments.length; i++) {
        var source = arguments[i]

        for (var key in source) {
            if (hasOwnProperty.call(source, key)) {
                target[key] = source[key]
            }
        }
    }

    return target
}


/***/ }),
/* 406 */
/***/ (function(module, exports) {

module.exports = getResponse
function getResponse (opt, resp) {
  if (!resp) return null
  return {
    statusCode: resp.statusCode,
    headers: resp.headers,
    method: opt.method,
    url: opt.url,
    // the XHR object in browser, http response in Node
    rawRequest: resp.rawRequest ? resp.rawRequest : resp
  }
}


/***/ })
],[155]);