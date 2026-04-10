var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/base64-js/index.js
var require_base64_js = __commonJS({
  "node_modules/base64-js/index.js"(exports) {
    "use strict";
    exports.byteLength = byteLength;
    exports.toByteArray = toByteArray;
    exports.fromByteArray = fromByteArray;
    var lookup = [];
    var revLookup = [];
    var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
    var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    for (i = 0, len = code.length; i < len; ++i) {
      lookup[i] = code[i];
      revLookup[code.charCodeAt(i)] = i;
    }
    var i;
    var len;
    revLookup["-".charCodeAt(0)] = 62;
    revLookup["_".charCodeAt(0)] = 63;
    function getLens(b64) {
      var len2 = b64.length;
      if (len2 % 4 > 0) {
        throw new Error("Invalid string. Length must be a multiple of 4");
      }
      var validLen = b64.indexOf("=");
      if (validLen === -1) validLen = len2;
      var placeHoldersLen = validLen === len2 ? 0 : 4 - validLen % 4;
      return [validLen, placeHoldersLen];
    }
    function byteLength(b64) {
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
    }
    function _byteLength(b64, validLen, placeHoldersLen) {
      return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
    }
    function toByteArray(b64) {
      var tmp;
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
      var curByte = 0;
      var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
      var i2;
      for (i2 = 0; i2 < len2; i2 += 4) {
        tmp = revLookup[b64.charCodeAt(i2)] << 18 | revLookup[b64.charCodeAt(i2 + 1)] << 12 | revLookup[b64.charCodeAt(i2 + 2)] << 6 | revLookup[b64.charCodeAt(i2 + 3)];
        arr[curByte++] = tmp >> 16 & 255;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 2) {
        tmp = revLookup[b64.charCodeAt(i2)] << 2 | revLookup[b64.charCodeAt(i2 + 1)] >> 4;
        arr[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 1) {
        tmp = revLookup[b64.charCodeAt(i2)] << 10 | revLookup[b64.charCodeAt(i2 + 1)] << 4 | revLookup[b64.charCodeAt(i2 + 2)] >> 2;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = tmp & 255;
      }
      return arr;
    }
    function tripletToBase64(num) {
      return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
    }
    function encodeChunk(uint8, start, end) {
      var tmp;
      var output = [];
      for (var i2 = start; i2 < end; i2 += 3) {
        tmp = (uint8[i2] << 16 & 16711680) + (uint8[i2 + 1] << 8 & 65280) + (uint8[i2 + 2] & 255);
        output.push(tripletToBase64(tmp));
      }
      return output.join("");
    }
    function fromByteArray(uint8) {
      var tmp;
      var len2 = uint8.length;
      var extraBytes = len2 % 3;
      var parts = [];
      var maxChunkLength = 16383;
      for (var i2 = 0, len22 = len2 - extraBytes; i2 < len22; i2 += maxChunkLength) {
        parts.push(encodeChunk(uint8, i2, i2 + maxChunkLength > len22 ? len22 : i2 + maxChunkLength));
      }
      if (extraBytes === 1) {
        tmp = uint8[len2 - 1];
        parts.push(
          lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "=="
        );
      } else if (extraBytes === 2) {
        tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
        parts.push(
          lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "="
        );
      }
      return parts.join("");
    }
  }
});

// node_modules/ieee754/index.js
var require_ieee754 = __commonJS({
  "node_modules/ieee754/index.js"(exports) {
    exports.read = function(buffer, offset, isLE, mLen, nBytes) {
      var e, m;
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var nBits = -7;
      var i = isLE ? nBytes - 1 : 0;
      var d = isLE ? -1 : 1;
      var s = buffer[offset + i];
      i += d;
      e = s & (1 << -nBits) - 1;
      s >>= -nBits;
      nBits += eLen;
      for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {
      }
      m = e & (1 << -nBits) - 1;
      e >>= -nBits;
      nBits += mLen;
      for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {
      }
      if (e === 0) {
        e = 1 - eBias;
      } else if (e === eMax) {
        return m ? NaN : (s ? -1 : 1) * Infinity;
      } else {
        m = m + Math.pow(2, mLen);
        e = e - eBias;
      }
      return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
    };
    exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
      var e, m, c;
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var rt2 = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
      var i = isLE ? 0 : nBytes - 1;
      var d = isLE ? 1 : -1;
      var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
      value = Math.abs(value);
      if (isNaN(value) || value === Infinity) {
        m = isNaN(value) ? 1 : 0;
        e = eMax;
      } else {
        e = Math.floor(Math.log(value) / Math.LN2);
        if (value * (c = Math.pow(2, -e)) < 1) {
          e--;
          c *= 2;
        }
        if (e + eBias >= 1) {
          value += rt2 / c;
        } else {
          value += rt2 * Math.pow(2, 1 - eBias);
        }
        if (value * c >= 2) {
          e++;
          c /= 2;
        }
        if (e + eBias >= eMax) {
          m = 0;
          e = eMax;
        } else if (e + eBias >= 1) {
          m = (value * c - 1) * Math.pow(2, mLen);
          e = e + eBias;
        } else {
          m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
          e = 0;
        }
      }
      for (; mLen >= 8; buffer[offset + i] = m & 255, i += d, m /= 256, mLen -= 8) {
      }
      e = e << mLen | m;
      eLen += mLen;
      for (; eLen > 0; buffer[offset + i] = e & 255, i += d, e /= 256, eLen -= 8) {
      }
      buffer[offset + i - d] |= s * 128;
    };
  }
});

// node_modules/buffer/index.js
var require_buffer = __commonJS({
  "node_modules/buffer/index.js"(exports) {
    "use strict";
    var base64 = require_base64_js();
    var ieee754 = require_ieee754();
    var customInspectSymbol = typeof Symbol === "function" && typeof Symbol["for"] === "function" ? Symbol["for"]("nodejs.util.inspect.custom") : null;
    exports.Buffer = Buffer2;
    exports.SlowBuffer = SlowBuffer;
    exports.INSPECT_MAX_BYTES = 50;
    var K_MAX_LENGTH = 2147483647;
    exports.kMaxLength = K_MAX_LENGTH;
    Buffer2.TYPED_ARRAY_SUPPORT = typedArraySupport();
    if (!Buffer2.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") {
      console.error(
        "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
      );
    }
    function typedArraySupport() {
      try {
        const arr = new Uint8Array(1);
        const proto = { foo: function() {
          return 42;
        } };
        Object.setPrototypeOf(proto, Uint8Array.prototype);
        Object.setPrototypeOf(arr, proto);
        return arr.foo() === 42;
      } catch (e) {
        return false;
      }
    }
    Object.defineProperty(Buffer2.prototype, "parent", {
      enumerable: true,
      get: function() {
        if (!Buffer2.isBuffer(this)) return void 0;
        return this.buffer;
      }
    });
    Object.defineProperty(Buffer2.prototype, "offset", {
      enumerable: true,
      get: function() {
        if (!Buffer2.isBuffer(this)) return void 0;
        return this.byteOffset;
      }
    });
    function createBuffer(length) {
      if (length > K_MAX_LENGTH) {
        throw new RangeError('The value "' + length + '" is invalid for option "size"');
      }
      const buf = new Uint8Array(length);
      Object.setPrototypeOf(buf, Buffer2.prototype);
      return buf;
    }
    function Buffer2(arg, encodingOrOffset, length) {
      if (typeof arg === "number") {
        if (typeof encodingOrOffset === "string") {
          throw new TypeError(
            'The "string" argument must be of type string. Received type number'
          );
        }
        return allocUnsafe(arg);
      }
      return from(arg, encodingOrOffset, length);
    }
    Buffer2.poolSize = 8192;
    function from(value, encodingOrOffset, length) {
      if (typeof value === "string") {
        return fromString(value, encodingOrOffset);
      }
      if (ArrayBuffer.isView(value)) {
        return fromArrayView(value);
      }
      if (value == null) {
        throw new TypeError(
          "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
        );
      }
      if (isInstance(value, ArrayBuffer) || value && isInstance(value.buffer, ArrayBuffer)) {
        return fromArrayBuffer(value, encodingOrOffset, length);
      }
      if (typeof SharedArrayBuffer !== "undefined" && (isInstance(value, SharedArrayBuffer) || value && isInstance(value.buffer, SharedArrayBuffer))) {
        return fromArrayBuffer(value, encodingOrOffset, length);
      }
      if (typeof value === "number") {
        throw new TypeError(
          'The "value" argument must not be of type number. Received type number'
        );
      }
      const valueOf = value.valueOf && value.valueOf();
      if (valueOf != null && valueOf !== value) {
        return Buffer2.from(valueOf, encodingOrOffset, length);
      }
      const b = fromObject(value);
      if (b) return b;
      if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === "function") {
        return Buffer2.from(value[Symbol.toPrimitive]("string"), encodingOrOffset, length);
      }
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
      );
    }
    Buffer2.from = function(value, encodingOrOffset, length) {
      return from(value, encodingOrOffset, length);
    };
    Object.setPrototypeOf(Buffer2.prototype, Uint8Array.prototype);
    Object.setPrototypeOf(Buffer2, Uint8Array);
    function assertSize(size) {
      if (typeof size !== "number") {
        throw new TypeError('"size" argument must be of type number');
      } else if (size < 0) {
        throw new RangeError('The value "' + size + '" is invalid for option "size"');
      }
    }
    function alloc(size, fill, encoding) {
      assertSize(size);
      if (size <= 0) {
        return createBuffer(size);
      }
      if (fill !== void 0) {
        return typeof encoding === "string" ? createBuffer(size).fill(fill, encoding) : createBuffer(size).fill(fill);
      }
      return createBuffer(size);
    }
    Buffer2.alloc = function(size, fill, encoding) {
      return alloc(size, fill, encoding);
    };
    function allocUnsafe(size) {
      assertSize(size);
      return createBuffer(size < 0 ? 0 : checked(size) | 0);
    }
    Buffer2.allocUnsafe = function(size) {
      return allocUnsafe(size);
    };
    Buffer2.allocUnsafeSlow = function(size) {
      return allocUnsafe(size);
    };
    function fromString(string, encoding) {
      if (typeof encoding !== "string" || encoding === "") {
        encoding = "utf8";
      }
      if (!Buffer2.isEncoding(encoding)) {
        throw new TypeError("Unknown encoding: " + encoding);
      }
      const length = byteLength(string, encoding) | 0;
      let buf = createBuffer(length);
      const actual = buf.write(string, encoding);
      if (actual !== length) {
        buf = buf.slice(0, actual);
      }
      return buf;
    }
    function fromArrayLike(array) {
      const length = array.length < 0 ? 0 : checked(array.length) | 0;
      const buf = createBuffer(length);
      for (let i = 0; i < length; i += 1) {
        buf[i] = array[i] & 255;
      }
      return buf;
    }
    function fromArrayView(arrayView) {
      if (isInstance(arrayView, Uint8Array)) {
        const copy = new Uint8Array(arrayView);
        return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength);
      }
      return fromArrayLike(arrayView);
    }
    function fromArrayBuffer(array, byteOffset, length) {
      if (byteOffset < 0 || array.byteLength < byteOffset) {
        throw new RangeError('"offset" is outside of buffer bounds');
      }
      if (array.byteLength < byteOffset + (length || 0)) {
        throw new RangeError('"length" is outside of buffer bounds');
      }
      let buf;
      if (byteOffset === void 0 && length === void 0) {
        buf = new Uint8Array(array);
      } else if (length === void 0) {
        buf = new Uint8Array(array, byteOffset);
      } else {
        buf = new Uint8Array(array, byteOffset, length);
      }
      Object.setPrototypeOf(buf, Buffer2.prototype);
      return buf;
    }
    function fromObject(obj) {
      if (Buffer2.isBuffer(obj)) {
        const len = checked(obj.length) | 0;
        const buf = createBuffer(len);
        if (buf.length === 0) {
          return buf;
        }
        obj.copy(buf, 0, 0, len);
        return buf;
      }
      if (obj.length !== void 0) {
        if (typeof obj.length !== "number" || numberIsNaN(obj.length)) {
          return createBuffer(0);
        }
        return fromArrayLike(obj);
      }
      if (obj.type === "Buffer" && Array.isArray(obj.data)) {
        return fromArrayLike(obj.data);
      }
    }
    function checked(length) {
      if (length >= K_MAX_LENGTH) {
        throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + K_MAX_LENGTH.toString(16) + " bytes");
      }
      return length | 0;
    }
    function SlowBuffer(length) {
      if (+length != length) {
        length = 0;
      }
      return Buffer2.alloc(+length);
    }
    Buffer2.isBuffer = function isBuffer(b) {
      return b != null && b._isBuffer === true && b !== Buffer2.prototype;
    };
    Buffer2.compare = function compare(a, b) {
      if (isInstance(a, Uint8Array)) a = Buffer2.from(a, a.offset, a.byteLength);
      if (isInstance(b, Uint8Array)) b = Buffer2.from(b, b.offset, b.byteLength);
      if (!Buffer2.isBuffer(a) || !Buffer2.isBuffer(b)) {
        throw new TypeError(
          'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
        );
      }
      if (a === b) return 0;
      let x = a.length;
      let y = b.length;
      for (let i = 0, len = Math.min(x, y); i < len; ++i) {
        if (a[i] !== b[i]) {
          x = a[i];
          y = b[i];
          break;
        }
      }
      if (x < y) return -1;
      if (y < x) return 1;
      return 0;
    };
    Buffer2.isEncoding = function isEncoding(encoding) {
      switch (String(encoding).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return true;
        default:
          return false;
      }
    };
    Buffer2.concat = function concat(list, length) {
      if (!Array.isArray(list)) {
        throw new TypeError('"list" argument must be an Array of Buffers');
      }
      if (list.length === 0) {
        return Buffer2.alloc(0);
      }
      let i;
      if (length === void 0) {
        length = 0;
        for (i = 0; i < list.length; ++i) {
          length += list[i].length;
        }
      }
      const buffer = Buffer2.allocUnsafe(length);
      let pos = 0;
      for (i = 0; i < list.length; ++i) {
        let buf = list[i];
        if (isInstance(buf, Uint8Array)) {
          if (pos + buf.length > buffer.length) {
            if (!Buffer2.isBuffer(buf)) buf = Buffer2.from(buf);
            buf.copy(buffer, pos);
          } else {
            Uint8Array.prototype.set.call(
              buffer,
              buf,
              pos
            );
          }
        } else if (!Buffer2.isBuffer(buf)) {
          throw new TypeError('"list" argument must be an Array of Buffers');
        } else {
          buf.copy(buffer, pos);
        }
        pos += buf.length;
      }
      return buffer;
    };
    function byteLength(string, encoding) {
      if (Buffer2.isBuffer(string)) {
        return string.length;
      }
      if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
        return string.byteLength;
      }
      if (typeof string !== "string") {
        throw new TypeError(
          'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof string
        );
      }
      const len = string.length;
      const mustMatch = arguments.length > 2 && arguments[2] === true;
      if (!mustMatch && len === 0) return 0;
      let loweredCase = false;
      for (; ; ) {
        switch (encoding) {
          case "ascii":
          case "latin1":
          case "binary":
            return len;
          case "utf8":
          case "utf-8":
            return utf8ToBytes(string).length;
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return len * 2;
          case "hex":
            return len >>> 1;
          case "base64":
            return base64ToBytes(string).length;
          default:
            if (loweredCase) {
              return mustMatch ? -1 : utf8ToBytes(string).length;
            }
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    }
    Buffer2.byteLength = byteLength;
    function slowToString(encoding, start, end) {
      let loweredCase = false;
      if (start === void 0 || start < 0) {
        start = 0;
      }
      if (start > this.length) {
        return "";
      }
      if (end === void 0 || end > this.length) {
        end = this.length;
      }
      if (end <= 0) {
        return "";
      }
      end >>>= 0;
      start >>>= 0;
      if (end <= start) {
        return "";
      }
      if (!encoding) encoding = "utf8";
      while (true) {
        switch (encoding) {
          case "hex":
            return hexSlice(this, start, end);
          case "utf8":
          case "utf-8":
            return utf8Slice(this, start, end);
          case "ascii":
            return asciiSlice(this, start, end);
          case "latin1":
          case "binary":
            return latin1Slice(this, start, end);
          case "base64":
            return base64Slice(this, start, end);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return utf16leSlice(this, start, end);
          default:
            if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
            encoding = (encoding + "").toLowerCase();
            loweredCase = true;
        }
      }
    }
    Buffer2.prototype._isBuffer = true;
    function swap(b, n, m) {
      const i = b[n];
      b[n] = b[m];
      b[m] = i;
    }
    Buffer2.prototype.swap16 = function swap16() {
      const len = this.length;
      if (len % 2 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 16-bits");
      }
      for (let i = 0; i < len; i += 2) {
        swap(this, i, i + 1);
      }
      return this;
    };
    Buffer2.prototype.swap32 = function swap32() {
      const len = this.length;
      if (len % 4 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 32-bits");
      }
      for (let i = 0; i < len; i += 4) {
        swap(this, i, i + 3);
        swap(this, i + 1, i + 2);
      }
      return this;
    };
    Buffer2.prototype.swap64 = function swap64() {
      const len = this.length;
      if (len % 8 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 64-bits");
      }
      for (let i = 0; i < len; i += 8) {
        swap(this, i, i + 7);
        swap(this, i + 1, i + 6);
        swap(this, i + 2, i + 5);
        swap(this, i + 3, i + 4);
      }
      return this;
    };
    Buffer2.prototype.toString = function toString() {
      const length = this.length;
      if (length === 0) return "";
      if (arguments.length === 0) return utf8Slice(this, 0, length);
      return slowToString.apply(this, arguments);
    };
    Buffer2.prototype.toLocaleString = Buffer2.prototype.toString;
    Buffer2.prototype.equals = function equals(b) {
      if (!Buffer2.isBuffer(b)) throw new TypeError("Argument must be a Buffer");
      if (this === b) return true;
      return Buffer2.compare(this, b) === 0;
    };
    Buffer2.prototype.inspect = function inspect() {
      let str = "";
      const max = exports.INSPECT_MAX_BYTES;
      str = this.toString("hex", 0, max).replace(/(.{2})/g, "$1 ").trim();
      if (this.length > max) str += " ... ";
      return "<Buffer " + str + ">";
    };
    if (customInspectSymbol) {
      Buffer2.prototype[customInspectSymbol] = Buffer2.prototype.inspect;
    }
    Buffer2.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
      if (isInstance(target, Uint8Array)) {
        target = Buffer2.from(target, target.offset, target.byteLength);
      }
      if (!Buffer2.isBuffer(target)) {
        throw new TypeError(
          'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof target
        );
      }
      if (start === void 0) {
        start = 0;
      }
      if (end === void 0) {
        end = target ? target.length : 0;
      }
      if (thisStart === void 0) {
        thisStart = 0;
      }
      if (thisEnd === void 0) {
        thisEnd = this.length;
      }
      if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
        throw new RangeError("out of range index");
      }
      if (thisStart >= thisEnd && start >= end) {
        return 0;
      }
      if (thisStart >= thisEnd) {
        return -1;
      }
      if (start >= end) {
        return 1;
      }
      start >>>= 0;
      end >>>= 0;
      thisStart >>>= 0;
      thisEnd >>>= 0;
      if (this === target) return 0;
      let x = thisEnd - thisStart;
      let y = end - start;
      const len = Math.min(x, y);
      const thisCopy = this.slice(thisStart, thisEnd);
      const targetCopy = target.slice(start, end);
      for (let i = 0; i < len; ++i) {
        if (thisCopy[i] !== targetCopy[i]) {
          x = thisCopy[i];
          y = targetCopy[i];
          break;
        }
      }
      if (x < y) return -1;
      if (y < x) return 1;
      return 0;
    };
    function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
      if (buffer.length === 0) return -1;
      if (typeof byteOffset === "string") {
        encoding = byteOffset;
        byteOffset = 0;
      } else if (byteOffset > 2147483647) {
        byteOffset = 2147483647;
      } else if (byteOffset < -2147483648) {
        byteOffset = -2147483648;
      }
      byteOffset = +byteOffset;
      if (numberIsNaN(byteOffset)) {
        byteOffset = dir ? 0 : buffer.length - 1;
      }
      if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
      if (byteOffset >= buffer.length) {
        if (dir) return -1;
        else byteOffset = buffer.length - 1;
      } else if (byteOffset < 0) {
        if (dir) byteOffset = 0;
        else return -1;
      }
      if (typeof val === "string") {
        val = Buffer2.from(val, encoding);
      }
      if (Buffer2.isBuffer(val)) {
        if (val.length === 0) {
          return -1;
        }
        return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
      } else if (typeof val === "number") {
        val = val & 255;
        if (typeof Uint8Array.prototype.indexOf === "function") {
          if (dir) {
            return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
          } else {
            return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
          }
        }
        return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
      }
      throw new TypeError("val must be string, number or Buffer");
    }
    function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
      let indexSize = 1;
      let arrLength = arr.length;
      let valLength = val.length;
      if (encoding !== void 0) {
        encoding = String(encoding).toLowerCase();
        if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
          if (arr.length < 2 || val.length < 2) {
            return -1;
          }
          indexSize = 2;
          arrLength /= 2;
          valLength /= 2;
          byteOffset /= 2;
        }
      }
      function read(buf, i2) {
        if (indexSize === 1) {
          return buf[i2];
        } else {
          return buf.readUInt16BE(i2 * indexSize);
        }
      }
      let i;
      if (dir) {
        let foundIndex = -1;
        for (i = byteOffset; i < arrLength; i++) {
          if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
            if (foundIndex === -1) foundIndex = i;
            if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
          } else {
            if (foundIndex !== -1) i -= i - foundIndex;
            foundIndex = -1;
          }
        }
      } else {
        if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
        for (i = byteOffset; i >= 0; i--) {
          let found = true;
          for (let j = 0; j < valLength; j++) {
            if (read(arr, i + j) !== read(val, j)) {
              found = false;
              break;
            }
          }
          if (found) return i;
        }
      }
      return -1;
    }
    Buffer2.prototype.includes = function includes(val, byteOffset, encoding) {
      return this.indexOf(val, byteOffset, encoding) !== -1;
    };
    Buffer2.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
    };
    Buffer2.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
    };
    function hexWrite(buf, string, offset, length) {
      offset = Number(offset) || 0;
      const remaining = buf.length - offset;
      if (!length) {
        length = remaining;
      } else {
        length = Number(length);
        if (length > remaining) {
          length = remaining;
        }
      }
      const strLen = string.length;
      if (length > strLen / 2) {
        length = strLen / 2;
      }
      let i;
      for (i = 0; i < length; ++i) {
        const parsed = parseInt(string.substr(i * 2, 2), 16);
        if (numberIsNaN(parsed)) return i;
        buf[offset + i] = parsed;
      }
      return i;
    }
    function utf8Write(buf, string, offset, length) {
      return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
    }
    function asciiWrite(buf, string, offset, length) {
      return blitBuffer(asciiToBytes(string), buf, offset, length);
    }
    function base64Write(buf, string, offset, length) {
      return blitBuffer(base64ToBytes(string), buf, offset, length);
    }
    function ucs2Write(buf, string, offset, length) {
      return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
    }
    Buffer2.prototype.write = function write(string, offset, length, encoding) {
      if (offset === void 0) {
        encoding = "utf8";
        length = this.length;
        offset = 0;
      } else if (length === void 0 && typeof offset === "string") {
        encoding = offset;
        length = this.length;
        offset = 0;
      } else if (isFinite(offset)) {
        offset = offset >>> 0;
        if (isFinite(length)) {
          length = length >>> 0;
          if (encoding === void 0) encoding = "utf8";
        } else {
          encoding = length;
          length = void 0;
        }
      } else {
        throw new Error(
          "Buffer.write(string, encoding, offset[, length]) is no longer supported"
        );
      }
      const remaining = this.length - offset;
      if (length === void 0 || length > remaining) length = remaining;
      if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
        throw new RangeError("Attempt to write outside buffer bounds");
      }
      if (!encoding) encoding = "utf8";
      let loweredCase = false;
      for (; ; ) {
        switch (encoding) {
          case "hex":
            return hexWrite(this, string, offset, length);
          case "utf8":
          case "utf-8":
            return utf8Write(this, string, offset, length);
          case "ascii":
          case "latin1":
          case "binary":
            return asciiWrite(this, string, offset, length);
          case "base64":
            return base64Write(this, string, offset, length);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return ucs2Write(this, string, offset, length);
          default:
            if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    };
    Buffer2.prototype.toJSON = function toJSON() {
      return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0)
      };
    };
    function base64Slice(buf, start, end) {
      if (start === 0 && end === buf.length) {
        return base64.fromByteArray(buf);
      } else {
        return base64.fromByteArray(buf.slice(start, end));
      }
    }
    function utf8Slice(buf, start, end) {
      end = Math.min(buf.length, end);
      const res = [];
      let i = start;
      while (i < end) {
        const firstByte = buf[i];
        let codePoint = null;
        let bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
        if (i + bytesPerSequence <= end) {
          let secondByte, thirdByte, fourthByte, tempCodePoint;
          switch (bytesPerSequence) {
            case 1:
              if (firstByte < 128) {
                codePoint = firstByte;
              }
              break;
            case 2:
              secondByte = buf[i + 1];
              if ((secondByte & 192) === 128) {
                tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
                if (tempCodePoint > 127) {
                  codePoint = tempCodePoint;
                }
              }
              break;
            case 3:
              secondByte = buf[i + 1];
              thirdByte = buf[i + 2];
              if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
                tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
                if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                  codePoint = tempCodePoint;
                }
              }
              break;
            case 4:
              secondByte = buf[i + 1];
              thirdByte = buf[i + 2];
              fourthByte = buf[i + 3];
              if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
                tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
                if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                  codePoint = tempCodePoint;
                }
              }
          }
        }
        if (codePoint === null) {
          codePoint = 65533;
          bytesPerSequence = 1;
        } else if (codePoint > 65535) {
          codePoint -= 65536;
          res.push(codePoint >>> 10 & 1023 | 55296);
          codePoint = 56320 | codePoint & 1023;
        }
        res.push(codePoint);
        i += bytesPerSequence;
      }
      return decodeCodePointsArray(res);
    }
    var MAX_ARGUMENTS_LENGTH = 4096;
    function decodeCodePointsArray(codePoints) {
      const len = codePoints.length;
      if (len <= MAX_ARGUMENTS_LENGTH) {
        return String.fromCharCode.apply(String, codePoints);
      }
      let res = "";
      let i = 0;
      while (i < len) {
        res += String.fromCharCode.apply(
          String,
          codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
        );
      }
      return res;
    }
    function asciiSlice(buf, start, end) {
      let ret = "";
      end = Math.min(buf.length, end);
      for (let i = start; i < end; ++i) {
        ret += String.fromCharCode(buf[i] & 127);
      }
      return ret;
    }
    function latin1Slice(buf, start, end) {
      let ret = "";
      end = Math.min(buf.length, end);
      for (let i = start; i < end; ++i) {
        ret += String.fromCharCode(buf[i]);
      }
      return ret;
    }
    function hexSlice(buf, start, end) {
      const len = buf.length;
      if (!start || start < 0) start = 0;
      if (!end || end < 0 || end > len) end = len;
      let out = "";
      for (let i = start; i < end; ++i) {
        out += hexSliceLookupTable[buf[i]];
      }
      return out;
    }
    function utf16leSlice(buf, start, end) {
      const bytes = buf.slice(start, end);
      let res = "";
      for (let i = 0; i < bytes.length - 1; i += 2) {
        res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
      }
      return res;
    }
    Buffer2.prototype.slice = function slice(start, end) {
      const len = this.length;
      start = ~~start;
      end = end === void 0 ? len : ~~end;
      if (start < 0) {
        start += len;
        if (start < 0) start = 0;
      } else if (start > len) {
        start = len;
      }
      if (end < 0) {
        end += len;
        if (end < 0) end = 0;
      } else if (end > len) {
        end = len;
      }
      if (end < start) end = start;
      const newBuf = this.subarray(start, end);
      Object.setPrototypeOf(newBuf, Buffer2.prototype);
      return newBuf;
    };
    function checkOffset(offset, ext, length) {
      if (offset % 1 !== 0 || offset < 0) throw new RangeError("offset is not uint");
      if (offset + ext > length) throw new RangeError("Trying to access beyond buffer length");
    }
    Buffer2.prototype.readUintLE = Buffer2.prototype.readUIntLE = function readUIntLE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) checkOffset(offset, byteLength2, this.length);
      let val = this[offset];
      let mul = 1;
      let i = 0;
      while (++i < byteLength2 && (mul *= 256)) {
        val += this[offset + i] * mul;
      }
      return val;
    };
    Buffer2.prototype.readUintBE = Buffer2.prototype.readUIntBE = function readUIntBE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        checkOffset(offset, byteLength2, this.length);
      }
      let val = this[offset + --byteLength2];
      let mul = 1;
      while (byteLength2 > 0 && (mul *= 256)) {
        val += this[offset + --byteLength2] * mul;
      }
      return val;
    };
    Buffer2.prototype.readUint8 = Buffer2.prototype.readUInt8 = function readUInt8(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 1, this.length);
      return this[offset];
    };
    Buffer2.prototype.readUint16LE = Buffer2.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 2, this.length);
      return this[offset] | this[offset + 1] << 8;
    };
    Buffer2.prototype.readUint16BE = Buffer2.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 2, this.length);
      return this[offset] << 8 | this[offset + 1];
    };
    Buffer2.prototype.readUint32LE = Buffer2.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
    };
    Buffer2.prototype.readUint32BE = Buffer2.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
    };
    Buffer2.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const lo = first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24;
      const hi2 = this[++offset] + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + last * 2 ** 24;
      return BigInt(lo) + (BigInt(hi2) << BigInt(32));
    });
    Buffer2.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const hi2 = first * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
      const lo = this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last;
      return (BigInt(hi2) << BigInt(32)) + BigInt(lo);
    });
    Buffer2.prototype.readIntLE = function readIntLE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) checkOffset(offset, byteLength2, this.length);
      let val = this[offset];
      let mul = 1;
      let i = 0;
      while (++i < byteLength2 && (mul *= 256)) {
        val += this[offset + i] * mul;
      }
      mul *= 128;
      if (val >= mul) val -= Math.pow(2, 8 * byteLength2);
      return val;
    };
    Buffer2.prototype.readIntBE = function readIntBE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) checkOffset(offset, byteLength2, this.length);
      let i = byteLength2;
      let mul = 1;
      let val = this[offset + --i];
      while (i > 0 && (mul *= 256)) {
        val += this[offset + --i] * mul;
      }
      mul *= 128;
      if (val >= mul) val -= Math.pow(2, 8 * byteLength2);
      return val;
    };
    Buffer2.prototype.readInt8 = function readInt8(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 1, this.length);
      if (!(this[offset] & 128)) return this[offset];
      return (255 - this[offset] + 1) * -1;
    };
    Buffer2.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 2, this.length);
      const val = this[offset] | this[offset + 1] << 8;
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer2.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 2, this.length);
      const val = this[offset + 1] | this[offset] << 8;
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer2.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
    };
    Buffer2.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
    };
    Buffer2.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const val = this[offset + 4] + this[offset + 5] * 2 ** 8 + this[offset + 6] * 2 ** 16 + (last << 24);
      return (BigInt(val) << BigInt(32)) + BigInt(first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24);
    });
    Buffer2.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const val = (first << 24) + // Overflow
      this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
      return (BigInt(val) << BigInt(32)) + BigInt(this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last);
    });
    Buffer2.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return ieee754.read(this, offset, true, 23, 4);
    };
    Buffer2.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return ieee754.read(this, offset, false, 23, 4);
    };
    Buffer2.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 8, this.length);
      return ieee754.read(this, offset, true, 52, 8);
    };
    Buffer2.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 8, this.length);
      return ieee754.read(this, offset, false, 52, 8);
    };
    function checkInt(buf, value, offset, ext, max, min) {
      if (!Buffer2.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
      if (value > max || value < min) throw new RangeError('"value" argument is out of bounds');
      if (offset + ext > buf.length) throw new RangeError("Index out of range");
    }
    Buffer2.prototype.writeUintLE = Buffer2.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
        checkInt(this, value, offset, byteLength2, maxBytes, 0);
      }
      let mul = 1;
      let i = 0;
      this[offset] = value & 255;
      while (++i < byteLength2 && (mul *= 256)) {
        this[offset + i] = value / mul & 255;
      }
      return offset + byteLength2;
    };
    Buffer2.prototype.writeUintBE = Buffer2.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
        checkInt(this, value, offset, byteLength2, maxBytes, 0);
      }
      let i = byteLength2 - 1;
      let mul = 1;
      this[offset + i] = value & 255;
      while (--i >= 0 && (mul *= 256)) {
        this[offset + i] = value / mul & 255;
      }
      return offset + byteLength2;
    };
    Buffer2.prototype.writeUint8 = Buffer2.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 1, 255, 0);
      this[offset] = value & 255;
      return offset + 1;
    };
    Buffer2.prototype.writeUint16LE = Buffer2.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      return offset + 2;
    };
    Buffer2.prototype.writeUint16BE = Buffer2.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
      this[offset] = value >>> 8;
      this[offset + 1] = value & 255;
      return offset + 2;
    };
    Buffer2.prototype.writeUint32LE = Buffer2.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
      this[offset + 3] = value >>> 24;
      this[offset + 2] = value >>> 16;
      this[offset + 1] = value >>> 8;
      this[offset] = value & 255;
      return offset + 4;
    };
    Buffer2.prototype.writeUint32BE = Buffer2.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
      this[offset] = value >>> 24;
      this[offset + 1] = value >>> 16;
      this[offset + 2] = value >>> 8;
      this[offset + 3] = value & 255;
      return offset + 4;
    };
    function wrtBigUInt64LE(buf, value, offset, min, max) {
      checkIntBI(value, min, max, buf, offset, 7);
      let lo = Number(value & BigInt(4294967295));
      buf[offset++] = lo;
      lo = lo >> 8;
      buf[offset++] = lo;
      lo = lo >> 8;
      buf[offset++] = lo;
      lo = lo >> 8;
      buf[offset++] = lo;
      let hi2 = Number(value >> BigInt(32) & BigInt(4294967295));
      buf[offset++] = hi2;
      hi2 = hi2 >> 8;
      buf[offset++] = hi2;
      hi2 = hi2 >> 8;
      buf[offset++] = hi2;
      hi2 = hi2 >> 8;
      buf[offset++] = hi2;
      return offset;
    }
    function wrtBigUInt64BE(buf, value, offset, min, max) {
      checkIntBI(value, min, max, buf, offset, 7);
      let lo = Number(value & BigInt(4294967295));
      buf[offset + 7] = lo;
      lo = lo >> 8;
      buf[offset + 6] = lo;
      lo = lo >> 8;
      buf[offset + 5] = lo;
      lo = lo >> 8;
      buf[offset + 4] = lo;
      let hi2 = Number(value >> BigInt(32) & BigInt(4294967295));
      buf[offset + 3] = hi2;
      hi2 = hi2 >> 8;
      buf[offset + 2] = hi2;
      hi2 = hi2 >> 8;
      buf[offset + 1] = hi2;
      hi2 = hi2 >> 8;
      buf[offset] = hi2;
      return offset + 8;
    }
    Buffer2.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE(value, offset = 0) {
      return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
    });
    Buffer2.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE(value, offset = 0) {
      return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
    });
    Buffer2.prototype.writeIntLE = function writeIntLE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        const limit = Math.pow(2, 8 * byteLength2 - 1);
        checkInt(this, value, offset, byteLength2, limit - 1, -limit);
      }
      let i = 0;
      let mul = 1;
      let sub = 0;
      this[offset] = value & 255;
      while (++i < byteLength2 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
          sub = 1;
        }
        this[offset + i] = (value / mul >> 0) - sub & 255;
      }
      return offset + byteLength2;
    };
    Buffer2.prototype.writeIntBE = function writeIntBE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        const limit = Math.pow(2, 8 * byteLength2 - 1);
        checkInt(this, value, offset, byteLength2, limit - 1, -limit);
      }
      let i = byteLength2 - 1;
      let mul = 1;
      let sub = 0;
      this[offset + i] = value & 255;
      while (--i >= 0 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
          sub = 1;
        }
        this[offset + i] = (value / mul >> 0) - sub & 255;
      }
      return offset + byteLength2;
    };
    Buffer2.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 1, 127, -128);
      if (value < 0) value = 255 + value + 1;
      this[offset] = value & 255;
      return offset + 1;
    };
    Buffer2.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      return offset + 2;
    };
    Buffer2.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
      this[offset] = value >>> 8;
      this[offset + 1] = value & 255;
      return offset + 2;
    };
    Buffer2.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      this[offset + 2] = value >>> 16;
      this[offset + 3] = value >>> 24;
      return offset + 4;
    };
    Buffer2.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
      if (value < 0) value = 4294967295 + value + 1;
      this[offset] = value >>> 24;
      this[offset + 1] = value >>> 16;
      this[offset + 2] = value >>> 8;
      this[offset + 3] = value & 255;
      return offset + 4;
    };
    Buffer2.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE(value, offset = 0) {
      return wrtBigUInt64LE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    });
    Buffer2.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE(value, offset = 0) {
      return wrtBigUInt64BE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    });
    function checkIEEE754(buf, value, offset, ext, max, min) {
      if (offset + ext > buf.length) throw new RangeError("Index out of range");
      if (offset < 0) throw new RangeError("Index out of range");
    }
    function writeFloat(buf, value, offset, littleEndian, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        checkIEEE754(buf, value, offset, 4, 34028234663852886e22, -34028234663852886e22);
      }
      ieee754.write(buf, value, offset, littleEndian, 23, 4);
      return offset + 4;
    }
    Buffer2.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
      return writeFloat(this, value, offset, true, noAssert);
    };
    Buffer2.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
      return writeFloat(this, value, offset, false, noAssert);
    };
    function writeDouble(buf, value, offset, littleEndian, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        checkIEEE754(buf, value, offset, 8, 17976931348623157e292, -17976931348623157e292);
      }
      ieee754.write(buf, value, offset, littleEndian, 52, 8);
      return offset + 8;
    }
    Buffer2.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
      return writeDouble(this, value, offset, true, noAssert);
    };
    Buffer2.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
      return writeDouble(this, value, offset, false, noAssert);
    };
    Buffer2.prototype.copy = function copy(target, targetStart, start, end) {
      if (!Buffer2.isBuffer(target)) throw new TypeError("argument should be a Buffer");
      if (!start) start = 0;
      if (!end && end !== 0) end = this.length;
      if (targetStart >= target.length) targetStart = target.length;
      if (!targetStart) targetStart = 0;
      if (end > 0 && end < start) end = start;
      if (end === start) return 0;
      if (target.length === 0 || this.length === 0) return 0;
      if (targetStart < 0) {
        throw new RangeError("targetStart out of bounds");
      }
      if (start < 0 || start >= this.length) throw new RangeError("Index out of range");
      if (end < 0) throw new RangeError("sourceEnd out of bounds");
      if (end > this.length) end = this.length;
      if (target.length - targetStart < end - start) {
        end = target.length - targetStart + start;
      }
      const len = end - start;
      if (this === target && typeof Uint8Array.prototype.copyWithin === "function") {
        this.copyWithin(targetStart, start, end);
      } else {
        Uint8Array.prototype.set.call(
          target,
          this.subarray(start, end),
          targetStart
        );
      }
      return len;
    };
    Buffer2.prototype.fill = function fill(val, start, end, encoding) {
      if (typeof val === "string") {
        if (typeof start === "string") {
          encoding = start;
          start = 0;
          end = this.length;
        } else if (typeof end === "string") {
          encoding = end;
          end = this.length;
        }
        if (encoding !== void 0 && typeof encoding !== "string") {
          throw new TypeError("encoding must be a string");
        }
        if (typeof encoding === "string" && !Buffer2.isEncoding(encoding)) {
          throw new TypeError("Unknown encoding: " + encoding);
        }
        if (val.length === 1) {
          const code = val.charCodeAt(0);
          if (encoding === "utf8" && code < 128 || encoding === "latin1") {
            val = code;
          }
        }
      } else if (typeof val === "number") {
        val = val & 255;
      } else if (typeof val === "boolean") {
        val = Number(val);
      }
      if (start < 0 || this.length < start || this.length < end) {
        throw new RangeError("Out of range index");
      }
      if (end <= start) {
        return this;
      }
      start = start >>> 0;
      end = end === void 0 ? this.length : end >>> 0;
      if (!val) val = 0;
      let i;
      if (typeof val === "number") {
        for (i = start; i < end; ++i) {
          this[i] = val;
        }
      } else {
        const bytes = Buffer2.isBuffer(val) ? val : Buffer2.from(val, encoding);
        const len = bytes.length;
        if (len === 0) {
          throw new TypeError('The value "' + val + '" is invalid for argument "value"');
        }
        for (i = 0; i < end - start; ++i) {
          this[i + start] = bytes[i % len];
        }
      }
      return this;
    };
    var errors = {};
    function E(sym, getMessage, Base) {
      errors[sym] = class NodeError extends Base {
        constructor() {
          super();
          Object.defineProperty(this, "message", {
            value: getMessage.apply(this, arguments),
            writable: true,
            configurable: true
          });
          this.name = `${this.name} [${sym}]`;
          this.stack;
          delete this.name;
        }
        get code() {
          return sym;
        }
        set code(value) {
          Object.defineProperty(this, "code", {
            configurable: true,
            enumerable: true,
            value,
            writable: true
          });
        }
        toString() {
          return `${this.name} [${sym}]: ${this.message}`;
        }
      };
    }
    E(
      "ERR_BUFFER_OUT_OF_BOUNDS",
      function(name) {
        if (name) {
          return `${name} is outside of buffer bounds`;
        }
        return "Attempt to access memory outside buffer bounds";
      },
      RangeError
    );
    E(
      "ERR_INVALID_ARG_TYPE",
      function(name, actual) {
        return `The "${name}" argument must be of type number. Received type ${typeof actual}`;
      },
      TypeError
    );
    E(
      "ERR_OUT_OF_RANGE",
      function(str, range, input) {
        let msg = `The value of "${str}" is out of range.`;
        let received = input;
        if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
          received = addNumericalSeparator(String(input));
        } else if (typeof input === "bigint") {
          received = String(input);
          if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) {
            received = addNumericalSeparator(received);
          }
          received += "n";
        }
        msg += ` It must be ${range}. Received ${received}`;
        return msg;
      },
      RangeError
    );
    function addNumericalSeparator(val) {
      let res = "";
      let i = val.length;
      const start = val[0] === "-" ? 1 : 0;
      for (; i >= start + 4; i -= 3) {
        res = `_${val.slice(i - 3, i)}${res}`;
      }
      return `${val.slice(0, i)}${res}`;
    }
    function checkBounds(buf, offset, byteLength2) {
      validateNumber(offset, "offset");
      if (buf[offset] === void 0 || buf[offset + byteLength2] === void 0) {
        boundsError(offset, buf.length - (byteLength2 + 1));
      }
    }
    function checkIntBI(value, min, max, buf, offset, byteLength2) {
      if (value > max || value < min) {
        const n = typeof min === "bigint" ? "n" : "";
        let range;
        if (byteLength2 > 3) {
          if (min === 0 || min === BigInt(0)) {
            range = `>= 0${n} and < 2${n} ** ${(byteLength2 + 1) * 8}${n}`;
          } else {
            range = `>= -(2${n} ** ${(byteLength2 + 1) * 8 - 1}${n}) and < 2 ** ${(byteLength2 + 1) * 8 - 1}${n}`;
          }
        } else {
          range = `>= ${min}${n} and <= ${max}${n}`;
        }
        throw new errors.ERR_OUT_OF_RANGE("value", range, value);
      }
      checkBounds(buf, offset, byteLength2);
    }
    function validateNumber(value, name) {
      if (typeof value !== "number") {
        throw new errors.ERR_INVALID_ARG_TYPE(name, "number", value);
      }
    }
    function boundsError(value, length, type) {
      if (Math.floor(value) !== value) {
        validateNumber(value, type);
        throw new errors.ERR_OUT_OF_RANGE(type || "offset", "an integer", value);
      }
      if (length < 0) {
        throw new errors.ERR_BUFFER_OUT_OF_BOUNDS();
      }
      throw new errors.ERR_OUT_OF_RANGE(
        type || "offset",
        `>= ${type ? 1 : 0} and <= ${length}`,
        value
      );
    }
    var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
    function base64clean(str) {
      str = str.split("=")[0];
      str = str.trim().replace(INVALID_BASE64_RE, "");
      if (str.length < 2) return "";
      while (str.length % 4 !== 0) {
        str = str + "=";
      }
      return str;
    }
    function utf8ToBytes(string, units) {
      units = units || Infinity;
      let codePoint;
      const length = string.length;
      let leadSurrogate = null;
      const bytes = [];
      for (let i = 0; i < length; ++i) {
        codePoint = string.charCodeAt(i);
        if (codePoint > 55295 && codePoint < 57344) {
          if (!leadSurrogate) {
            if (codePoint > 56319) {
              if ((units -= 3) > -1) bytes.push(239, 191, 189);
              continue;
            } else if (i + 1 === length) {
              if ((units -= 3) > -1) bytes.push(239, 191, 189);
              continue;
            }
            leadSurrogate = codePoint;
            continue;
          }
          if (codePoint < 56320) {
            if ((units -= 3) > -1) bytes.push(239, 191, 189);
            leadSurrogate = codePoint;
            continue;
          }
          codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
        } else if (leadSurrogate) {
          if ((units -= 3) > -1) bytes.push(239, 191, 189);
        }
        leadSurrogate = null;
        if (codePoint < 128) {
          if ((units -= 1) < 0) break;
          bytes.push(codePoint);
        } else if (codePoint < 2048) {
          if ((units -= 2) < 0) break;
          bytes.push(
            codePoint >> 6 | 192,
            codePoint & 63 | 128
          );
        } else if (codePoint < 65536) {
          if ((units -= 3) < 0) break;
          bytes.push(
            codePoint >> 12 | 224,
            codePoint >> 6 & 63 | 128,
            codePoint & 63 | 128
          );
        } else if (codePoint < 1114112) {
          if ((units -= 4) < 0) break;
          bytes.push(
            codePoint >> 18 | 240,
            codePoint >> 12 & 63 | 128,
            codePoint >> 6 & 63 | 128,
            codePoint & 63 | 128
          );
        } else {
          throw new Error("Invalid code point");
        }
      }
      return bytes;
    }
    function asciiToBytes(str) {
      const byteArray = [];
      for (let i = 0; i < str.length; ++i) {
        byteArray.push(str.charCodeAt(i) & 255);
      }
      return byteArray;
    }
    function utf16leToBytes(str, units) {
      let c, hi2, lo;
      const byteArray = [];
      for (let i = 0; i < str.length; ++i) {
        if ((units -= 2) < 0) break;
        c = str.charCodeAt(i);
        hi2 = c >> 8;
        lo = c % 256;
        byteArray.push(lo);
        byteArray.push(hi2);
      }
      return byteArray;
    }
    function base64ToBytes(str) {
      return base64.toByteArray(base64clean(str));
    }
    function blitBuffer(src, dst, offset, length) {
      let i;
      for (i = 0; i < length; ++i) {
        if (i + offset >= dst.length || i >= src.length) break;
        dst[i + offset] = src[i];
      }
      return i;
    }
    function isInstance(obj, type) {
      return obj instanceof type || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type.name;
    }
    function numberIsNaN(obj) {
      return obj !== obj;
    }
    var hexSliceLookupTable = (function() {
      const alphabet = "0123456789abcdef";
      const table = new Array(256);
      for (let i = 0; i < 16; ++i) {
        const i16 = i * 16;
        for (let j = 0; j < 16; ++j) {
          table[i16 + j] = alphabet[i] + alphabet[j];
        }
      }
      return table;
    })();
    function defineBigIntMethod(fn2) {
      return typeof BigInt === "undefined" ? BufferBigIntNotDefined : fn2;
    }
    function BufferBigIntNotDefined() {
      throw new Error("BigInt not supported");
    }
  }
});

// node_modules/@nanopub/nanopub-js/dist/validate-BpuR8oEN.js
var import_buffer = __toESM(require_buffer(), 1);
function pt(i) {
  const e = atob(i), t = new Uint8Array(e.length);
  for (let r = 0; r < e.length; r++)
    t[r] = e.charCodeAt(r);
  return t.buffer;
}
function jr(i) {
  const e = new Uint8Array(i);
  let t = "";
  for (let r = 0; r < e.length; r++)
    t += String.fromCharCode(e[r]);
  return btoa(t);
}
var Jn = {
  async extractPublicKey(i) {
    const e = await globalThis.crypto.subtle.importKey(
      "pkcs8",
      pt(i),
      {
        name: "RSASSA-PKCS1-v1_5",
        hash: "SHA-256"
      },
      true,
      ["sign"]
    ), t = await globalThis.crypto.subtle.exportKey("jwk", e), r = await globalThis.crypto.subtle.importKey(
      "jwk",
      {
        kty: t.kty,
        n: t.n,
        e: t.e,
        alg: t.alg,
        ext: true,
        key_ops: ["verify"]
      },
      {
        name: "RSASSA-PKCS1-v1_5",
        hash: "SHA-256"
      },
      true,
      ["verify"]
    ), n = await globalThis.crypto.subtle.exportKey("spki", r);
    return jr(n);
  },
  async sign(i, e) {
    const t = await globalThis.crypto.subtle.importKey(
      "pkcs8",
      pt(e),
      {
        name: "RSASSA-PKCS1-v1_5",
        hash: "SHA-256"
      },
      false,
      ["sign"]
    ), r = await globalThis.crypto.subtle.sign(
      "RSASSA-PKCS1-v1_5",
      t,
      new TextEncoder().encode(i)
    );
    return jr(r);
  },
  async verify(i, e, t) {
    const r = await globalThis.crypto.subtle.importKey(
      "spki",
      pt(t),
      {
        name: "RSASSA-PKCS1-v1_5",
        hash: "SHA-256"
      },
      false,
      ["verify"]
    );
    return globalThis.crypto.subtle.verify(
      "RSASSA-PKCS1-v1_5",
      r,
      pt(e),
      new TextEncoder().encode(i)
    );
  },
  async sha256Base64Url(i) {
    const e = new TextEncoder().encode(i), t = await globalThis.crypto.subtle.digest("SHA-256", e), r = new Uint8Array(t);
    let n = "";
    for (let s = 0; s < r.length; s++)
      n += String.fromCharCode(r[s]);
    return btoa(n).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }
};
var st = null;
function Ci(i) {
  st = i;
}
var Xe = "http://www.w3.org/1999/02/22-rdf-syntax-ns#";
var et = "http://www.w3.org/2001/XMLSchema#";
var _t = "http://www.w3.org/2000/10/swap/";
var pe = {
  xsd: {
    decimal: `${et}decimal`,
    boolean: `${et}boolean`,
    double: `${et}double`,
    integer: `${et}integer`,
    string: `${et}string`
  },
  rdf: {
    type: `${Xe}type`,
    nil: `${Xe}nil`,
    first: `${Xe}first`,
    rest: `${Xe}rest`,
    langString: `${Xe}langString`
  },
  owl: {
    sameAs: "http://www.w3.org/2002/07/owl#sameAs"
  },
  r: {
    forSome: `${_t}reify#forSome`,
    forAll: `${_t}reify#forAll`
  },
  log: {
    implies: `${_t}log#implies`,
    isImpliedBy: `${_t}log#isImpliedBy`
  }
};
var { xsd: bt } = pe;
var Xn = /\\u([a-fA-F0-9]{4})|\\U([a-fA-F0-9]{8})|\\([^])/g;
var Pr = {
  "\\": "\\",
  "'": "'",
  '"': '"',
  n: `
`,
  r: "\r",
  t: "	",
  f: "\f",
  b: "\b",
  _: "_",
  "~": "~",
  ".": ".",
  "-": "-",
  "!": "!",
  $: "$",
  "&": "&",
  "(": "(",
  ")": ")",
  "*": "*",
  "+": "+",
  ",": ",",
  ";": ";",
  "=": "=",
  "/": "/",
  "?": "?",
  "#": "#",
  "@": "@",
  "%": "%"
};
var ei = /[\x00-\x20<>\\"\{\}\|\^\`]/;
var ti = {
  _iri: true,
  _unescapedIri: true,
  _simpleQuotedString: true,
  _langcode: true,
  _blank: true,
  _newline: true,
  _comment: true,
  _whitespace: true,
  _endOfFile: true
};
var ri = /$0^/;
var ni = class {
  constructor(e) {
    if (this._iri = /^<((?:[^ <>{}\\]|\\[uU])+)>[ \t]*/, this._unescapedIri = /^<([^\x00-\x20<>\\"\{\}\|\^\`]*)>[ \t]*/, this._simpleQuotedString = /^"([^"\\\r\n]*)"(?=[^"])/, this._simpleApostropheString = /^'([^'\\\r\n]*)'(?=[^'])/, this._langcode = /^@([a-z]+(?:-[a-z0-9]+)*)(?=[^a-z0-9\-])/i, this._prefix = /^((?:[A-Za-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])(?:\.?[\-0-9A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])*)?:(?=[#\s<])/, this._prefixed = /^((?:[A-Za-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])(?:\.?[\-0-9A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])*)?:((?:(?:[0-:A-Z_a-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff]|%[0-9a-fA-F]{2}|\\[!#-\/;=?\-@_~])(?:(?:[\.\-0-:A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff]|%[0-9a-fA-F]{2}|\\[!#-\/;=?\-@_~])*(?:[\-0-:A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff]|%[0-9a-fA-F]{2}|\\[!#-\/;=?\-@_~]))?)?)(?:[ \t]+|(?=\.?[,;!\^\s#()\[\]\{\}"'<>]))/, this._variable = /^\?(?:(?:[A-Z_a-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])(?:[\-0-:A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])*)(?=[.,;!\^\s#()\[\]\{\}"'<>])/, this._blank = /^_:((?:[0-9A-Z_a-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])(?:\.?[\-0-9A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])*)(?:[ \t]+|(?=\.?[,;:\s#()\[\]\{\}"'<>]))/, this._number = /^[\-+]?(?:(\d+\.\d*|\.?\d+)[eE][\-+]?|\d*(\.)?)\d+(?=\.?[,;:\s#()\[\]\{\}"'<>])/, this._boolean = /^(?:true|false)(?=[.,;\s#()\[\]\{\}"'<>])/, this._keyword = /^@[a-z]+(?=[\s#<:])/i, this._sparqlKeyword = /^(?:PREFIX|BASE|GRAPH)(?=[\s#<])/i, this._shortPredicates = /^a(?=[\s#()\[\]\{\}"'<>])/, this._newline = /^[ \t]*(?:#[^\n\r]*)?(?:\r\n|\n|\r)[ \t]*/, this._comment = /#([^\n\r]*)/, this._whitespace = /^[ \t]+/, this._endOfFile = /^(?:#[^\n\r]*)?$/, e = e || {}, this._isImpliedBy = e.isImpliedBy, this._lineMode = !!e.lineMode) {
      this._n3Mode = false;
      for (const t in this)
        !(t in ti) && this[t] instanceof RegExp && (this[t] = ri);
    } else
      this._n3Mode = e.n3 !== false;
    this.comments = !!e.comments, this._literalClosingPos = 0;
  }
  // ## Private methods
  // ### `_tokenizeToEnd` tokenizes as for as possible, emitting tokens through the callback
  _tokenizeToEnd(e, t) {
    let r = this._input, n = r.length;
    for (; ; ) {
      let a, d;
      for (; a = this._newline.exec(r); )
        this.comments && (d = this._comment.exec(a[0])) && s("comment", d[1], "", this._line, a[0].length), r = r.substr(a[0].length, r.length), n = r.length, this._line++;
      if (!a && (a = this._whitespace.exec(r)) && (r = r.substr(a[0].length, r.length)), this._endOfFile.test(r))
        return t && (this.comments && (d = this._comment.exec(r)) && s("comment", d[1], "", this._line, r.length), r = null, s("eof", "", "", this._line, 0)), this._input = r;
      const u = this._line, _ = r[0];
      let h = "", S = "", N = "", I = null, E = 0, b = false;
      switch (_) {
        case "^":
          if (r.length < 3)
            break;
          if (r[1] === "^") {
            if (this._previousMarker = "^^", r = r.substr(2), r[0] !== "<") {
              b = true;
              break;
            }
          } else {
            this._n3Mode && (E = 1, h = "^");
            break;
          }
        // Fall through in case the type is an IRI
        case "<":
          if (I = this._unescapedIri.exec(r))
            h = "IRI", S = I[1];
          else if (I = this._iri.exec(r)) {
            if (S = this._unescape(I[1]), S === null || ei.test(S))
              return o(this);
            h = "IRI";
          } else r.length > 1 && r[1] === "<" ? (h = "<<", E = 2) : this._n3Mode && r.length > 1 && r[1] === "=" && (E = 2, this._isImpliedBy ? (h = "abbreviation", S = "<") : (h = "inverse", S = ">"));
          break;
        case ">":
          r.length > 1 && r[1] === ">" && (h = ">>", E = 2);
          break;
        case "_":
          ((I = this._blank.exec(r)) || t && (I = this._blank.exec(`${r} `))) && (h = "blank", N = "_", S = I[1]);
          break;
        case '"':
          if (I = this._simpleQuotedString.exec(r))
            S = I[1];
          else if ({ value: S, matchLength: E } = this._parseLiteral(r), S === null)
            return o(this);
          (I !== null || E !== 0) && (h = "literal", this._literalClosingPos = 0);
          break;
        case "'":
          if (!this._lineMode) {
            if (I = this._simpleApostropheString.exec(r))
              S = I[1];
            else if ({ value: S, matchLength: E } = this._parseLiteral(r), S === null)
              return o(this);
            (I !== null || E !== 0) && (h = "literal", this._literalClosingPos = 0);
          }
          break;
        case "?":
          this._n3Mode && (I = this._variable.exec(r)) && (h = "var", S = I[0]);
          break;
        case "@":
          this._previousMarker === "literal" && (I = this._langcode.exec(r)) ? (h = "langcode", S = I[1]) : (I = this._keyword.exec(r)) && (h = I[0]);
          break;
        case ".":
          if (r.length === 1 ? t : r[1] < "0" || r[1] > "9") {
            h = ".", E = 1;
            break;
          }
        // Fall through to numerical case (could be a decimal dot)
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
        case "+":
        case "-":
          (I = this._number.exec(r) || t && (I = this._number.exec(`${r} `))) && (h = "literal", S = I[0], N = typeof I[1] == "string" ? bt.double : typeof I[2] == "string" ? bt.decimal : bt.integer);
          break;
        case "B":
        case "b":
        case "p":
        case "P":
        case "G":
        case "g":
          (I = this._sparqlKeyword.exec(r)) ? h = I[0].toUpperCase() : b = true;
          break;
        case "f":
        case "t":
          (I = this._boolean.exec(r)) ? (h = "literal", S = I[0], N = bt.boolean) : b = true;
          break;
        case "a":
          (I = this._shortPredicates.exec(r)) ? (h = "abbreviation", S = "a") : b = true;
          break;
        case "=":
          this._n3Mode && r.length > 1 && (h = "abbreviation", r[1] !== ">" ? (E = 1, S = "=") : (E = 2, S = ">"));
          break;
        case "!":
          if (!this._n3Mode)
            break;
        case ",":
        case ";":
        case "[":
        case "]":
        case "(":
        case ")":
        case "}":
          this._lineMode || (E = 1, h = _);
          break;
        case "{":
          !this._lineMode && r.length >= 2 && (r[1] === "|" ? (h = "{|", E = 2) : (h = _, E = 1));
          break;
        case "|":
          r.length >= 2 && r[1] === "}" && (h = "|}", E = 2);
          break;
        default:
          b = true;
      }
      if (b && ((this._previousMarker === "@prefix" || this._previousMarker === "PREFIX") && (I = this._prefix.exec(r)) ? (h = "prefix", S = I[1] || "") : ((I = this._prefixed.exec(r)) || t && (I = this._prefixed.exec(`${r} `))) && (h = "prefixed", N = I[1] || "", S = this._unescape(I[2]))), this._previousMarker === "^^")
        switch (h) {
          case "prefixed":
            h = "type";
            break;
          case "IRI":
            h = "typeIRI";
            break;
          default:
            h = "";
        }
      if (!h)
        return t || !/^'''|^"""/.test(r) && /\n|\r/.test(r) ? o(this) : this._input = r;
      const c = E || I[0].length, y = s(h, S, N, u, c);
      this.previousToken = y, this._previousMarker = h, r = r.substr(c, r.length);
    }
    function s(a, d, u, _, h) {
      const S = r ? n - r.length : n, N = S + h, I = { type: a, value: d, prefix: u, line: _, start: S, end: N };
      return e(null, I), I;
    }
    function o(a) {
      e(a._syntaxError(/^\S*/.exec(r)[0]));
    }
  }
  // ### `_unescape` replaces N3 escape codes by their corresponding characters
  _unescape(e) {
    let t = false;
    const r = e.replace(Xn, (n, s, o, a) => {
      if (typeof s == "string")
        return String.fromCharCode(Number.parseInt(s, 16));
      if (typeof o == "string") {
        let d = Number.parseInt(o, 16);
        return d <= 65535 ? String.fromCharCode(Number.parseInt(o, 16)) : String.fromCharCode(55296 + ((d -= 65536) >> 10), 56320 + (d & 1023));
      }
      return a in Pr ? Pr[a] : (t = true, "");
    });
    return t ? null : r;
  }
  // ### `_parseLiteral` parses a literal into an unescaped value
  _parseLiteral(e) {
    if (e.length >= 3) {
      const t = e.match(/^(?:"""|"|'''|'|)/)[0], r = t.length;
      let n = Math.max(this._literalClosingPos, r);
      for (; (n = e.indexOf(t, n)) > 0; ) {
        let s = 0;
        for (; e[n - s - 1] === "\\"; )
          s++;
        if (s % 2 === 0) {
          const o = e.substring(r, n), a = o.split(/\r\n|\r|\n/).length - 1, d = n + r;
          if (r === 1 && a !== 0 || r === 3 && this._lineMode)
            break;
          return this._line += a, { value: this._unescape(o), matchLength: d };
        }
        n++;
      }
      this._literalClosingPos = e.length - r + 1;
    }
    return { value: "", matchLength: 0 };
  }
  // ### `_syntaxError` creates a syntax error for the given issue
  _syntaxError(e) {
    this._input = null;
    const t = new Error(`Unexpected "${e}" on line ${this._line}.`);
    return t.context = {
      token: void 0,
      line: this._line,
      previousToken: this.previousToken
    }, t;
  }
  // ### Strips off any starting UTF BOM mark.
  _readStartingBom(e) {
    return e.startsWith("\uFEFF") ? e.substr(1) : e;
  }
  // ## Public methods
  // ### `tokenize` starts the transformation of an N3 document into an array of tokens.
  // The input can be a string or a stream.
  tokenize(e, t) {
    if (this._line = 1, typeof e == "string")
      if (this._input = this._readStartingBom(e), typeof t == "function")
        queueMicrotask(() => this._tokenizeToEnd(t, true));
      else {
        const r = [];
        let n;
        if (this._tokenizeToEnd((s, o) => s ? n = s : r.push(o), true), n) throw n;
        return r;
      }
    else
      this._pendingBuffer = null, typeof e.setEncoding == "function" && e.setEncoding("utf8"), e.on("data", (r) => {
        this._input !== null && r.length !== 0 && (this._pendingBuffer && (r = import_buffer.Buffer.concat([this._pendingBuffer, r]), this._pendingBuffer = null), r[r.length - 1] & 128 ? this._pendingBuffer = r : (typeof this._input > "u" ? this._input = this._readStartingBom(typeof r == "string" ? r : r.toString()) : this._input += r, this._tokenizeToEnd(t, false)));
      }), e.on("end", () => {
        typeof this._input == "string" && this._tokenizeToEnd(t, true);
      }), e.on("error", t);
  }
};
var { rdf: ii, xsd: Be } = pe;
var Ve;
var si = 0;
var ve = {
  namedNode: mn,
  blankNode: Sn,
  variable: En,
  literal: xn,
  defaultGraph: ui,
  quad: dr,
  triple: dr,
  fromTerm: ot,
  fromQuad: Rn
};
var Ie = class _Ie {
  constructor(e) {
    this.id = e;
  }
  // ### The value of this term
  get value() {
    return this.id;
  }
  // ### Returns whether this object represents the same term as the other
  equals(e) {
    return e instanceof _Ie ? this.id === e.id : !!e && this.termType === e.termType && this.value === e.value;
  }
  // ### Implement hashCode for Immutable.js, since we implement `equals`
  // https://immutable-js.com/docs/v4.0.0/ValueObject/#hashCode()
  hashCode() {
    return 0;
  }
  // ### Returns a plain object representation of this term
  toJSON() {
    return {
      termType: this.termType,
      value: this.value
    };
  }
};
var yn = class extends Ie {
  // ### The term type of this term
  get termType() {
    return "NamedNode";
  }
};
var Ke = class _Ke extends Ie {
  // ### The term type of this term
  get termType() {
    return "Literal";
  }
  // ### The text value of this literal
  get value() {
    return this.id.substring(1, this.id.lastIndexOf('"'));
  }
  // ### The language of this literal
  get language() {
    const e = this.id;
    let t = e.lastIndexOf('"') + 1;
    return t < e.length && e[t++] === "@" ? e.substr(t).toLowerCase() : "";
  }
  // ### The datatype IRI of this literal
  get datatype() {
    return new yn(this.datatypeString);
  }
  // ### The datatype string of this literal
  get datatypeString() {
    const e = this.id, t = e.lastIndexOf('"') + 1, r = t < e.length ? e[t] : "";
    return r === "^" ? e.substr(t + 2) : (
      // If "@" follows, return rdf:langString; xsd:string otherwise
      r !== "@" ? Be.string : ii.langString
    );
  }
  // ### Returns whether this object represents the same term as the other
  equals(e) {
    return e instanceof _Ke ? this.id === e.id : !!e && !!e.datatype && this.termType === e.termType && this.value === e.value && this.language === e.language && this.datatype.value === e.datatype.value;
  }
  toJSON() {
    return {
      termType: this.termType,
      value: this.value,
      language: this.language,
      datatype: { termType: "NamedNode", value: this.datatypeString }
    };
  }
};
var ai = class extends Ie {
  constructor(e) {
    super(`_:${e}`);
  }
  // ### The term type of this term
  get termType() {
    return "BlankNode";
  }
  // ### The name of this blank node
  get value() {
    return this.id.substr(2);
  }
};
var oi = class extends Ie {
  constructor(e) {
    super(`?${e}`);
  }
  // ### The term type of this term
  get termType() {
    return "Variable";
  }
  // ### The name of this variable
  get value() {
    return this.id.substr(1);
  }
};
var li = class extends Ie {
  constructor() {
    return super(""), Ve || this;
  }
  // ### The term type of this term
  get termType() {
    return "DefaultGraph";
  }
  // ### Returns whether this object represents the same term as the other
  equals(e) {
    return this === e || !!e && this.termType === e.termType;
  }
};
Ve = new li();
function at(i, e, t) {
  if (e = e || ve, !i)
    return e.defaultGraph();
  switch (i[0]) {
    case "?":
      return e.variable(i.substr(1));
    case "_":
      return e.blankNode(i.substr(2));
    case '"':
      if (e === ve)
        return new Ke(i);
      if (i[i.length - 1] === '"')
        return e.literal(i.substr(1, i.length - 2));
      const r = i.lastIndexOf('"', i.length - 1);
      return e.literal(
        i.substr(1, r - 1),
        i[r + 1] === "@" ? i.substr(r + 2) : e.namedNode(i.substr(r + 3))
      );
    case "[":
      i = JSON.parse(i);
      break;
    default:
      if (!t || !Array.isArray(i))
        return e.namedNode(i);
  }
  return e.quad(
    at(i[0], e, true),
    at(i[1], e, true),
    at(i[2], e, true),
    i[3] && at(i[3], e, true)
  );
}
function He(i, e) {
  if (typeof i == "string")
    return i;
  if (i instanceof Ie && i.termType !== "Quad")
    return i.id;
  if (!i)
    return Ve.id;
  switch (i.termType) {
    case "NamedNode":
      return i.value;
    case "BlankNode":
      return `_:${i.value}`;
    case "Variable":
      return `?${i.value}`;
    case "DefaultGraph":
      return "";
    case "Literal":
      return `"${i.value}"${i.language ? `@${i.language}` : i.datatype && i.datatype.value !== Be.string ? `^^${i.datatype.value}` : ""}`;
    case "Quad":
      const t = [
        He(i.subject, true),
        He(i.predicate, true),
        He(i.object, true)
      ];
      return i.graph && i.graph.termType !== "DefaultGraph" && t.push(He(i.graph, true)), e ? t : JSON.stringify(t);
    default:
      throw new Error(`Unexpected termType: ${i.termType}`);
  }
}
var wn = class extends Ie {
  constructor(e, t, r, n) {
    super(""), this._subject = e, this._predicate = t, this._object = r, this._graph = n || Ve;
  }
  // ### The term type of this term
  get termType() {
    return "Quad";
  }
  get subject() {
    return this._subject;
  }
  get predicate() {
    return this._predicate;
  }
  get object() {
    return this._object;
  }
  get graph() {
    return this._graph;
  }
  // ### Returns a plain object representation of this quad
  toJSON() {
    return {
      termType: this.termType,
      subject: this._subject.toJSON(),
      predicate: this._predicate.toJSON(),
      object: this._object.toJSON(),
      graph: this._graph.toJSON()
    };
  }
  // ### Returns whether this object represents the same quad as the other
  equals(e) {
    return !!e && this._subject.equals(e.subject) && this._predicate.equals(e.predicate) && this._object.equals(e.object) && this._graph.equals(e.graph);
  }
};
function mn(i) {
  return new yn(i);
}
function Sn(i) {
  return new ai(i || `n3-${si++}`);
}
function xn(i, e) {
  if (typeof e == "string")
    return new Ke(`"${i}"@${e.toLowerCase()}`);
  let t = e ? e.value : "";
  return t === "" && (typeof i == "boolean" ? t = Be.boolean : typeof i == "number" && (Number.isFinite(i) ? t = Number.isInteger(i) ? Be.integer : Be.double : (t = Be.double, Number.isNaN(i) || (i = i > 0 ? "INF" : "-INF")))), t === "" || t === Be.string ? new Ke(`"${i}"`) : new Ke(`"${i}"^^${t}`);
}
function En(i) {
  return new oi(i);
}
function ui() {
  return Ve;
}
function dr(i, e, t, r) {
  return new wn(i, e, t, r);
}
function ot(i) {
  if (i instanceof Ie)
    return i;
  switch (i.termType) {
    case "NamedNode":
      return mn(i.value);
    case "BlankNode":
      return Sn(i.value);
    case "Variable":
      return En(i.value);
    case "DefaultGraph":
      return Ve;
    case "Literal":
      return xn(i.value, i.language || i.datatype);
    case "Quad":
      return Rn(i);
    default:
      throw new Error(`Unexpected termType: ${i.termType}`);
  }
}
function Rn(i) {
  if (i instanceof wn)
    return i;
  if (i.termType !== "Quad")
    throw new Error(`Unexpected termType: ${i.termType}`);
  return dr(ot(i.subject), ot(i.predicate), ot(i.object), ot(i.graph));
}
var Lr = 0;
var vn = class {
  constructor(e) {
    this._contextStack = [], this._graph = null, e = e || {}, this._setBase(e.baseIRI), e.factory && Tn(this, e.factory);
    const t = typeof e.format == "string" ? e.format.match(/\w*$/)[0].toLowerCase() : "", r = /turtle/.test(t), n = /trig/.test(t), s = /triple/.test(t), o = /quad/.test(t), a = this._n3Mode = /n3/.test(t), d = s || o;
    (this._supportsNamedGraphs = !(r || a)) || (this._readPredicateOrNamedGraph = this._readPredicate), this._supportsQuads = !(r || n || s || a), this._isImpliedBy = e.isImpliedBy, this._supportsRDFStar = t === "" || /star|\*$/.test(t), d && (this._resolveRelativeIRI = (u) => null), this._blankNodePrefix = typeof e.blankNodePrefix != "string" ? "" : e.blankNodePrefix.replace(/^(?!_:)/, "_:"), this._lexer = e.lexer || new ni({ lineMode: d, n3: a, isImpliedBy: this._isImpliedBy }), this._explicitQuantifiers = !!e.explicitQuantifiers;
  }
  // ## Static class methods
  // ### `_resetBlankNodePrefix` restarts blank node prefix identification
  static _resetBlankNodePrefix() {
    Lr = 0;
  }
  // ## Private methods
  // ### `_setBase` sets the base IRI to resolve relative IRIs
  _setBase(e) {
    if (!e)
      this._base = "", this._basePath = "";
    else {
      const t = e.indexOf("#");
      t >= 0 && (e = e.substr(0, t)), this._base = e, this._basePath = e.indexOf("/") < 0 ? e : e.replace(/[^\/?]*(?:\?.*)?$/, ""), e = e.match(/^(?:([a-z][a-z0-9+.-]*:))?(?:\/\/[^\/]*)?/i), this._baseRoot = e[0], this._baseScheme = e[1];
    }
  }
  // ### `_saveContext` stores the current parsing context
  // when entering a new scope (list, blank node, formula)
  _saveContext(e, t, r, n, s) {
    const o = this._n3Mode;
    this._contextStack.push({
      type: e,
      subject: r,
      predicate: n,
      object: s,
      graph: t,
      inverse: o ? this._inversePredicate : false,
      blankPrefix: o ? this._prefixes._ : "",
      quantified: o ? this._quantified : null
    }), o && (this._inversePredicate = false, this._prefixes._ = this._graph ? `${this._graph.value}.` : ".", this._quantified = Object.create(this._quantified));
  }
  // ### `_restoreContext` restores the parent context
  // when leaving a scope (list, blank node, formula)
  _restoreContext(e, t) {
    const r = this._contextStack.pop();
    if (!r || r.type !== e)
      return this._error(`Unexpected ${t.type}`, t);
    this._subject = r.subject, this._predicate = r.predicate, this._object = r.object, this._graph = r.graph, this._n3Mode && (this._inversePredicate = r.inverse, this._prefixes._ = r.blankPrefix, this._quantified = r.quantified);
  }
  // ### `_readInTopContext` reads a token when in the top context
  _readInTopContext(e) {
    switch (e.type) {
      // If an EOF token arrives in the top context, signal that we're done
      case "eof":
        return this._graph !== null ? this._error("Unclosed graph", e) : (delete this._prefixes._, this._callback(null, null, this._prefixes));
      // It could be a prefix declaration
      case "PREFIX":
        this._sparqlStyle = true;
      case "@prefix":
        return this._readPrefix;
      // It could be a base declaration
      case "BASE":
        this._sparqlStyle = true;
      case "@base":
        return this._readBaseIRI;
      // It could be a graph
      case "{":
        if (this._supportsNamedGraphs)
          return this._graph = "", this._subject = null, this._readSubject;
      case "GRAPH":
        if (this._supportsNamedGraphs)
          return this._readNamedGraphLabel;
      // Otherwise, the next token must be a subject
      default:
        return this._readSubject(e);
    }
  }
  // ### `_readEntity` reads an IRI, prefixed name, blank node, or variable
  _readEntity(e, t) {
    let r;
    switch (e.type) {
      // Read a relative or absolute IRI
      case "IRI":
      case "typeIRI":
        const n = this._resolveIRI(e.value);
        if (n === null)
          return this._error("Invalid IRI", e);
        r = this._factory.namedNode(n);
        break;
      // Read a prefixed name
      case "type":
      case "prefixed":
        const s = this._prefixes[e.prefix];
        if (s === void 0)
          return this._error(`Undefined prefix "${e.prefix}:"`, e);
        r = this._factory.namedNode(s + e.value);
        break;
      // Read a blank node
      case "blank":
        r = this._factory.blankNode(this._prefixes[e.prefix] + e.value);
        break;
      // Read a variable
      case "var":
        r = this._factory.variable(e.value.substr(1));
        break;
      // Everything else is not an entity
      default:
        return this._error(`Expected entity but got ${e.type}`, e);
    }
    return !t && this._n3Mode && r.id in this._quantified && (r = this._quantified[r.id]), r;
  }
  // ### `_readSubject` reads a quad's subject
  _readSubject(e) {
    switch (this._predicate = null, e.type) {
      case "[":
        return this._saveContext(
          "blank",
          this._graph,
          this._subject = this._factory.blankNode(),
          null,
          null
        ), this._readBlankNodeHead;
      case "(":
        return this._saveContext("list", this._graph, this.RDF_NIL, null, null), this._subject = null, this._readListItem;
      case "{":
        return this._n3Mode ? (this._saveContext(
          "formula",
          this._graph,
          this._graph = this._factory.blankNode(),
          null,
          null
        ), this._readSubject) : this._error("Unexpected graph", e);
      case "}":
        return this._readPunctuation(e);
      case "@forSome":
        return this._n3Mode ? (this._subject = null, this._predicate = this.N3_FORSOME, this._quantifier = "blankNode", this._readQuantifierList) : this._error('Unexpected "@forSome"', e);
      case "@forAll":
        return this._n3Mode ? (this._subject = null, this._predicate = this.N3_FORALL, this._quantifier = "variable", this._readQuantifierList) : this._error('Unexpected "@forAll"', e);
      case "literal":
        if (!this._n3Mode)
          return this._error("Unexpected literal", e);
        if (e.prefix.length === 0)
          return this._literalValue = e.value, this._completeSubjectLiteral;
        this._subject = this._factory.literal(e.value, this._factory.namedNode(e.prefix));
        break;
      case "<<":
        return this._supportsRDFStar ? (this._saveContext("<<", this._graph, null, null, null), this._graph = null, this._readSubject) : this._error("Unexpected RDF-star syntax", e);
      default:
        if ((this._subject = this._readEntity(e)) === void 0)
          return;
        if (this._n3Mode)
          return this._getPathReader(this._readPredicateOrNamedGraph);
    }
    return this._readPredicateOrNamedGraph;
  }
  // ### `_readPredicate` reads a quad's predicate
  _readPredicate(e) {
    const t = e.type;
    switch (t) {
      case "inverse":
        this._inversePredicate = true;
      case "abbreviation":
        this._predicate = this.ABBREVIATIONS[e.value];
        break;
      case ".":
      case "]":
      case "}":
        return this._predicate === null ? this._error(`Unexpected ${t}`, e) : (this._subject = null, t === "]" ? this._readBlankNodeTail(e) : this._readPunctuation(e));
      case ";":
        return this._predicate !== null ? this._readPredicate : this._error("Expected predicate but got ;", e);
      case "[":
        if (this._n3Mode)
          return this._saveContext(
            "blank",
            this._graph,
            this._subject,
            this._subject = this._factory.blankNode(),
            null
          ), this._readBlankNodeHead;
      case "blank":
        if (!this._n3Mode)
          return this._error("Disallowed blank node as predicate", e);
      default:
        if ((this._predicate = this._readEntity(e)) === void 0)
          return;
    }
    return this._readObject;
  }
  // ### `_readObject` reads a quad's object
  _readObject(e) {
    switch (e.type) {
      case "literal":
        if (e.prefix.length === 0)
          return this._literalValue = e.value, this._readDataTypeOrLang;
        this._object = this._factory.literal(e.value, this._factory.namedNode(e.prefix));
        break;
      case "[":
        return this._saveContext(
          "blank",
          this._graph,
          this._subject,
          this._predicate,
          this._subject = this._factory.blankNode()
        ), this._readBlankNodeHead;
      case "(":
        return this._saveContext("list", this._graph, this._subject, this._predicate, this.RDF_NIL), this._subject = null, this._readListItem;
      case "{":
        return this._n3Mode ? (this._saveContext(
          "formula",
          this._graph,
          this._subject,
          this._predicate,
          this._graph = this._factory.blankNode()
        ), this._readSubject) : this._error("Unexpected graph", e);
      case "<<":
        return this._supportsRDFStar ? (this._saveContext("<<", this._graph, this._subject, this._predicate, null), this._graph = null, this._readSubject) : this._error("Unexpected RDF-star syntax", e);
      default:
        if ((this._object = this._readEntity(e)) === void 0)
          return;
        if (this._n3Mode)
          return this._getPathReader(this._getContextEndReader());
    }
    return this._getContextEndReader();
  }
  // ### `_readPredicateOrNamedGraph` reads a quad's predicate, or a named graph
  _readPredicateOrNamedGraph(e) {
    return e.type === "{" ? this._readGraph(e) : this._readPredicate(e);
  }
  // ### `_readGraph` reads a graph
  _readGraph(e) {
    return e.type !== "{" ? this._error(`Expected graph but got ${e.type}`, e) : (this._graph = this._subject, this._subject = null, this._readSubject);
  }
  // ### `_readBlankNodeHead` reads the head of a blank node
  _readBlankNodeHead(e) {
    return e.type === "]" ? (this._subject = null, this._readBlankNodeTail(e)) : (this._predicate = null, this._readPredicate(e));
  }
  // ### `_readBlankNodeTail` reads the end of a blank node
  _readBlankNodeTail(e) {
    if (e.type !== "]")
      return this._readBlankNodePunctuation(e);
    this._subject !== null && this._emit(this._subject, this._predicate, this._object, this._graph);
    const t = this._predicate === null;
    return this._restoreContext("blank", e), this._object !== null ? this._getContextEndReader() : this._predicate !== null ? this._readObject : t ? this._readPredicateOrNamedGraph : this._readPredicateAfterBlank;
  }
  // ### `_readPredicateAfterBlank` reads a predicate after an anonymous blank node
  _readPredicateAfterBlank(e) {
    switch (e.type) {
      case ".":
      case "}":
        return this._subject = null, this._readPunctuation(e);
      default:
        return this._readPredicate(e);
    }
  }
  // ### `_readListItem` reads items from a list
  _readListItem(e) {
    let t = null, r = null, n = this._readListItem;
    const s = this._subject, o = this._contextStack, a = o[o.length - 1];
    switch (e.type) {
      case "[":
        this._saveContext(
          "blank",
          this._graph,
          r = this._factory.blankNode(),
          this.RDF_FIRST,
          this._subject = t = this._factory.blankNode()
        ), n = this._readBlankNodeHead;
        break;
      case "(":
        this._saveContext(
          "list",
          this._graph,
          r = this._factory.blankNode(),
          this.RDF_FIRST,
          this.RDF_NIL
        ), this._subject = null;
        break;
      case ")":
        if (this._restoreContext("list", e), o.length !== 0 && o[o.length - 1].type === "list" && this._emit(this._subject, this._predicate, this._object, this._graph), this._predicate === null) {
          if (n = this._readPredicate, this._subject === this.RDF_NIL)
            return n;
        } else if (n = this._getContextEndReader(), this._object === this.RDF_NIL)
          return n;
        r = this.RDF_NIL;
        break;
      case "literal":
        e.prefix.length === 0 ? (this._literalValue = e.value, n = this._readListItemDataTypeOrLang) : (t = this._factory.literal(e.value, this._factory.namedNode(e.prefix)), n = this._getContextEndReader());
        break;
      case "{":
        return this._n3Mode ? (this._saveContext(
          "formula",
          this._graph,
          this._subject,
          this._predicate,
          this._graph = this._factory.blankNode()
        ), this._readSubject) : this._error("Unexpected graph", e);
      default:
        if ((t = this._readEntity(e)) === void 0)
          return;
    }
    if (r === null && (this._subject = r = this._factory.blankNode()), s === null ? a.predicate === null ? a.subject = r : a.object = r : this._emit(s, this.RDF_REST, r, this._graph), t !== null) {
      if (this._n3Mode && (e.type === "IRI" || e.type === "prefixed"))
        return this._saveContext("item", this._graph, r, this.RDF_FIRST, t), this._subject = t, this._predicate = null, this._getPathReader(this._readListItem);
      this._emit(r, this.RDF_FIRST, t, this._graph);
    }
    return n;
  }
  // ### `_readDataTypeOrLang` reads an _optional_ datatype or language
  _readDataTypeOrLang(e) {
    return this._completeObjectLiteral(e, false);
  }
  // ### `_readListItemDataTypeOrLang` reads an _optional_ datatype or language in a list
  _readListItemDataTypeOrLang(e) {
    return this._completeObjectLiteral(e, true);
  }
  // ### `_completeLiteral` completes a literal with an optional datatype or language
  _completeLiteral(e) {
    let t = this._factory.literal(this._literalValue);
    switch (e.type) {
      // Create a datatyped literal
      case "type":
      case "typeIRI":
        const r = this._readEntity(e);
        if (r === void 0) return;
        t = this._factory.literal(this._literalValue, r), e = null;
        break;
      // Create a language-tagged string
      case "langcode":
        t = this._factory.literal(this._literalValue, e.value), e = null;
        break;
    }
    return { token: e, literal: t };
  }
  // Completes a literal in subject position
  _completeSubjectLiteral(e) {
    return this._subject = this._completeLiteral(e).literal, this._readPredicateOrNamedGraph;
  }
  // Completes a literal in object position
  _completeObjectLiteral(e, t) {
    const r = this._completeLiteral(e);
    if (r)
      return this._object = r.literal, t && this._emit(this._subject, this.RDF_FIRST, this._object, this._graph), r.token === null ? this._getContextEndReader() : (this._readCallback = this._getContextEndReader(), this._readCallback(r.token));
  }
  // ### `_readFormulaTail` reads the end of a formula
  _readFormulaTail(e) {
    return e.type !== "}" ? this._readPunctuation(e) : (this._subject !== null && this._emit(this._subject, this._predicate, this._object, this._graph), this._restoreContext("formula", e), this._object === null ? this._readPredicate : this._getContextEndReader());
  }
  // ### `_readPunctuation` reads punctuation between quads or quad parts
  _readPunctuation(e) {
    let t, r = this._graph;
    const n = this._subject, s = this._inversePredicate;
    switch (e.type) {
      // A closing brace ends a graph
      case "}":
        if (this._graph === null)
          return this._error("Unexpected graph closing", e);
        if (this._n3Mode)
          return this._readFormulaTail(e);
        this._graph = null;
      // A dot just ends the statement, without sharing anything with the next
      case ".":
        this._subject = null, t = this._contextStack.length ? this._readSubject : this._readInTopContext, s && (this._inversePredicate = false);
        break;
      // Semicolon means the subject is shared; predicate and object are different
      case ";":
        t = this._readPredicate;
        break;
      // Comma means both the subject and predicate are shared; the object is different
      case ",":
        t = this._readObject;
        break;
      // {| means that the current triple is annotated with predicate-object pairs.
      case "{|":
        if (!this._supportsRDFStar)
          return this._error("Unexpected RDF-star syntax", e);
        const o = this._predicate, a = this._object;
        this._subject = this._factory.quad(n, o, a, this.DEFAULTGRAPH), t = this._readPredicate;
        break;
      // |} means that the current quoted triple in annotation syntax is finalized.
      case "|}":
        if (this._subject.termType !== "Quad")
          return this._error("Unexpected asserted triple closing", e);
        this._subject = null, t = this._readPunctuation;
        break;
      default:
        if (this._supportsQuads && this._graph === null && (r = this._readEntity(e)) !== void 0) {
          t = this._readQuadPunctuation;
          break;
        }
        return this._error(`Expected punctuation to follow "${this._object.id}"`, e);
    }
    if (n !== null) {
      const o = this._predicate, a = this._object;
      s ? this._emit(a, o, n, r) : this._emit(n, o, a, r);
    }
    return t;
  }
  // ### `_readBlankNodePunctuation` reads punctuation in a blank node
  _readBlankNodePunctuation(e) {
    let t;
    switch (e.type) {
      // Semicolon means the subject is shared; predicate and object are different
      case ";":
        t = this._readPredicate;
        break;
      // Comma means both the subject and predicate are shared; the object is different
      case ",":
        t = this._readObject;
        break;
      default:
        return this._error(`Expected punctuation to follow "${this._object.id}"`, e);
    }
    return this._emit(this._subject, this._predicate, this._object, this._graph), t;
  }
  // ### `_readQuadPunctuation` reads punctuation after a quad
  _readQuadPunctuation(e) {
    return e.type !== "." ? this._error("Expected dot to follow quad", e) : this._readInTopContext;
  }
  // ### `_readPrefix` reads the prefix of a prefix declaration
  _readPrefix(e) {
    return e.type !== "prefix" ? this._error("Expected prefix to follow @prefix", e) : (this._prefix = e.value, this._readPrefixIRI);
  }
  // ### `_readPrefixIRI` reads the IRI of a prefix declaration
  _readPrefixIRI(e) {
    if (e.type !== "IRI")
      return this._error(`Expected IRI to follow prefix "${this._prefix}:"`, e);
    const t = this._readEntity(e);
    return this._prefixes[this._prefix] = t.value, this._prefixCallback(this._prefix, t), this._readDeclarationPunctuation;
  }
  // ### `_readBaseIRI` reads the IRI of a base declaration
  _readBaseIRI(e) {
    const t = e.type === "IRI" && this._resolveIRI(e.value);
    return t ? (this._setBase(t), this._readDeclarationPunctuation) : this._error("Expected valid IRI to follow base declaration", e);
  }
  // ### `_readNamedGraphLabel` reads the label of a named graph
  _readNamedGraphLabel(e) {
    switch (e.type) {
      case "IRI":
      case "blank":
      case "prefixed":
        return this._readSubject(e), this._readGraph;
      case "[":
        return this._readNamedGraphBlankLabel;
      default:
        return this._error("Invalid graph label", e);
    }
  }
  // ### `_readNamedGraphLabel` reads a blank node label of a named graph
  _readNamedGraphBlankLabel(e) {
    return e.type !== "]" ? this._error("Invalid graph label", e) : (this._subject = this._factory.blankNode(), this._readGraph);
  }
  // ### `_readDeclarationPunctuation` reads the punctuation of a declaration
  _readDeclarationPunctuation(e) {
    return this._sparqlStyle ? (this._sparqlStyle = false, this._readInTopContext(e)) : e.type !== "." ? this._error("Expected declaration to end with a dot", e) : this._readInTopContext;
  }
  // Reads a list of quantified symbols from a @forSome or @forAll statement
  _readQuantifierList(e) {
    let t;
    switch (e.type) {
      case "IRI":
      case "prefixed":
        if ((t = this._readEntity(e, true)) !== void 0)
          break;
      default:
        return this._error(`Unexpected ${e.type}`, e);
    }
    return this._explicitQuantifiers ? (this._subject === null ? this._emit(
      this._graph || this.DEFAULTGRAPH,
      this._predicate,
      this._subject = this._factory.blankNode(),
      this.QUANTIFIERS_GRAPH
    ) : this._emit(
      this._subject,
      this.RDF_REST,
      this._subject = this._factory.blankNode(),
      this.QUANTIFIERS_GRAPH
    ), this._emit(this._subject, this.RDF_FIRST, t, this.QUANTIFIERS_GRAPH)) : this._quantified[t.id] = this._factory[this._quantifier](this._factory.blankNode().value), this._readQuantifierPunctuation;
  }
  // Reads punctuation from a @forSome or @forAll statement
  _readQuantifierPunctuation(e) {
    return e.type === "," ? this._readQuantifierList : (this._explicitQuantifiers && (this._emit(this._subject, this.RDF_REST, this.RDF_NIL, this.QUANTIFIERS_GRAPH), this._subject = null), this._readCallback = this._getContextEndReader(), this._readCallback(e));
  }
  // ### `_getPathReader` reads a potential path and then resumes with the given function
  _getPathReader(e) {
    return this._afterPath = e, this._readPath;
  }
  // ### `_readPath` reads a potential path
  _readPath(e) {
    switch (e.type) {
      // Forward path
      case "!":
        return this._readForwardPath;
      // Backward path
      case "^":
        return this._readBackwardPath;
      // Not a path; resume reading where we left off
      default:
        const t = this._contextStack, r = t.length && t[t.length - 1];
        if (r && r.type === "item") {
          const n = this._subject;
          this._restoreContext("item", e), this._emit(this._subject, this.RDF_FIRST, n, this._graph);
        }
        return this._afterPath(e);
    }
  }
  // ### `_readForwardPath` reads a '!' path
  _readForwardPath(e) {
    let t, r;
    const n = this._factory.blankNode();
    if ((r = this._readEntity(e)) !== void 0)
      return this._predicate === null ? (t = this._subject, this._subject = n) : (t = this._object, this._object = n), this._emit(t, r, n, this._graph), this._readPath;
  }
  // ### `_readBackwardPath` reads a '^' path
  _readBackwardPath(e) {
    const t = this._factory.blankNode();
    let r, n;
    if ((r = this._readEntity(e)) !== void 0)
      return this._predicate === null ? (n = this._subject, this._subject = t) : (n = this._object, this._object = t), this._emit(t, r, n, this._graph), this._readPath;
  }
  // ### `_readRDFStarTailOrGraph` reads the graph of a nested RDF-star quad or the end of a nested RDF-star triple
  _readRDFStarTailOrGraph(e) {
    return e.type !== ">>" ? this._supportsQuads && this._graph === null && (this._graph = this._readEntity(e)) !== void 0 ? this._readRDFStarTail : this._error(`Expected >> to follow "${this._object.id}"`, e) : this._readRDFStarTail(e);
  }
  // ### `_readRDFStarTail` reads the end of a nested RDF-star triple
  _readRDFStarTail(e) {
    if (e.type !== ">>")
      return this._error(`Expected >> but got ${e.type}`, e);
    const t = this._factory.quad(
      this._subject,
      this._predicate,
      this._object,
      this._graph || this.DEFAULTGRAPH
    );
    return this._restoreContext("<<", e), this._subject === null ? (this._subject = t, this._readPredicate) : (this._object = t, this._getContextEndReader());
  }
  // ### `_getContextEndReader` gets the next reader function at the end of a context
  _getContextEndReader() {
    const e = this._contextStack;
    if (!e.length)
      return this._readPunctuation;
    switch (e[e.length - 1].type) {
      case "blank":
        return this._readBlankNodeTail;
      case "list":
        return this._readListItem;
      case "formula":
        return this._readFormulaTail;
      case "<<":
        return this._readRDFStarTailOrGraph;
    }
  }
  // ### `_emit` sends a quad through the callback
  _emit(e, t, r, n) {
    this._callback(null, this._factory.quad(e, t, r, n || this.DEFAULTGRAPH));
  }
  // ### `_error` emits an error message through the callback
  _error(e, t) {
    const r = new Error(`${e} on line ${t.line}.`);
    r.context = {
      token: t,
      line: t.line,
      previousToken: this._lexer.previousToken
    }, this._callback(r), this._callback = gt;
  }
  // ### `_resolveIRI` resolves an IRI against the base path
  _resolveIRI(e) {
    return /^[a-z][a-z0-9+.-]*:/i.test(e) ? e : this._resolveRelativeIRI(e);
  }
  // ### `_resolveRelativeIRI` resolves an IRI against the base path,
  // assuming that a base path has been set and that the IRI is indeed relative
  _resolveRelativeIRI(e) {
    if (!e.length)
      return this._base;
    switch (e[0]) {
      // Resolve relative fragment IRIs against the base IRI
      case "#":
        return this._base + e;
      // Resolve relative query string IRIs by replacing the query string
      case "?":
        return this._base.replace(/(?:\?.*)?$/, e);
      // Resolve root-relative IRIs at the root of the base IRI
      case "/":
        return (e[1] === "/" ? this._baseScheme : this._baseRoot) + this._removeDotSegments(e);
      // Resolve all other IRIs at the base IRI's path
      default:
        return /^[^/:]*:/.test(e) ? null : this._removeDotSegments(this._basePath + e);
    }
  }
  // ### `_removeDotSegments` resolves './' and '../' path segments in an IRI as per RFC3986
  _removeDotSegments(e) {
    if (!/(^|\/)\.\.?($|[/#?])/.test(e))
      return e;
    const t = e.length;
    let r = "", n = -1, s = -1, o = 0, a = "/";
    for (; n < t; ) {
      switch (a) {
        // The path starts with the first slash after the authority
        case ":":
          if (s < 0 && e[++n] === "/" && e[++n] === "/")
            for (; (s = n + 1) < t && e[s] !== "/"; )
              n = s;
          break;
        // Don't modify a query string or fragment
        case "?":
        case "#":
          n = t;
          break;
        // Handle '/.' or '/..' path segments
        case "/":
          if (e[n + 1] === ".")
            switch (a = e[++n + 1], a) {
              // Remove a '/.' segment
              case "/":
                r += e.substring(o, n - 1), o = n + 1;
                break;
              // Remove a trailing '/.' segment
              case void 0:
              case "?":
              case "#":
                return r + e.substring(o, n) + e.substr(n + 1);
              // Remove a '/..' segment
              case ".":
                if (a = e[++n + 1], a === void 0 || a === "/" || a === "?" || a === "#") {
                  if (r += e.substring(o, n - 2), (o = r.lastIndexOf("/")) >= s && (r = r.substr(0, o)), a !== "/")
                    return `${r}/${e.substr(n + 1)}`;
                  o = n + 1;
                }
            }
      }
      a = e[++n];
    }
    return r + e.substring(o);
  }
  // ## Public methods
  // ### `parse` parses the N3 input and emits each parsed quad through the onQuad callback.
  parse(e, t, r) {
    let n, s, o;
    if (t && (t.onQuad || t.onPrefix || t.onComment) ? (n = t.onQuad, s = t.onPrefix, o = t.onComment) : (n = t, s = r), this._readCallback = this._readInTopContext, this._sparqlStyle = false, this._prefixes = /* @__PURE__ */ Object.create(null), this._prefixes._ = this._blankNodePrefix ? this._blankNodePrefix.substr(2) : `b${Lr++}_`, this._prefixCallback = s || gt, this._inversePredicate = false, this._quantified = /* @__PURE__ */ Object.create(null), !n) {
      const d = [];
      let u;
      if (this._callback = (_, h) => {
        _ ? u = _ : h && d.push(h);
      }, this._lexer.tokenize(e).every((_) => this._readCallback = this._readCallback(_)), u) throw u;
      return d;
    }
    let a = (d, u) => {
      d !== null ? (this._callback(d), this._callback = gt) : this._readCallback && (this._readCallback = this._readCallback(u));
    };
    o && (this._lexer.comments = true, a = (d, u) => {
      d !== null ? (this._callback(d), this._callback = gt) : this._readCallback && (u.type === "comment" ? o(u.value) : this._readCallback = this._readCallback(u));
    }), this._callback = n, this._lexer.tokenize(e, a);
  }
};
function gt() {
}
function Tn(i, e) {
  i._factory = e, i.DEFAULTGRAPH = e.defaultGraph(), i.RDF_FIRST = e.namedNode(pe.rdf.first), i.RDF_REST = e.namedNode(pe.rdf.rest), i.RDF_NIL = e.namedNode(pe.rdf.nil), i.N3_FORALL = e.namedNode(pe.r.forAll), i.N3_FORSOME = e.namedNode(pe.r.forSome), i.ABBREVIATIONS = {
    a: e.namedNode(pe.rdf.type),
    "=": e.namedNode(pe.owl.sameAs),
    ">": e.namedNode(pe.log.implies),
    "<": e.namedNode(pe.log.isImpliedBy)
  }, i.QUANTIFIERS_GRAPH = e.namedNode("urn:n3:quantifiers");
}
Tn(vn.prototype, ve);
function cr(i) {
  return !!i && i.termType === "DefaultGraph";
}
function Rt(i) {
  return i.replace(/[\]\/\(\)\*\+\?\.\\\$]/g, "\\$&");
}
var fi = /^:?[^:?#]*(?:[?#]|$)|^file:|^[^:]*:\/*[^?#]+?\/(?:\.\.?(?:\/|$)|\/)/i;
var di = /^(?:(?:[^/?#]{3,}|\.?[^/?#.]\.?)(?:\/[^/?#]{3,}|\.?[^/?#.]\.?)*\/?)?(?:[?#]|$)/;
var $r = "./";
var ci = "../";
var Mt = "?";
var Or = "#";
var _r = class __r {
  constructor(e) {
    this.base = e, this._baseLength = 0, this._baseMatcher = null, this._pathReplacements = new Array(e.length + 1);
  }
  static supports(e) {
    return !fi.test(e);
  }
  _getBaseMatcher() {
    if (this._baseMatcher)
      return this._baseMatcher;
    if (!__r.supports(this.base))
      return this._baseMatcher = /.^/;
    const e = /^[^:]*:\/*/.exec(this.base)[0], t = ["^", Rt(e)], r = [], n = [], s = /[^/?#]*([/?#])/y;
    let o, a = 0, d = 0, u = s.lastIndex = e.length;
    for (; !a && !d && (o = s.exec(this.base)); )
      o[1] === Or ? d = s.lastIndex - 1 : (t.push(Rt(o[0]), "(?:"), r.push(")?"), o[1] !== Mt ? n.push(u = s.lastIndex) : (a = u = s.lastIndex, d = this.base.indexOf(Or, a), this._pathReplacements[a] = Mt));
    for (let _ = 0; _ < n.length; _++)
      this._pathReplacements[n[_]] = ci.repeat(n.length - _ - 1);
    return this._pathReplacements[n[n.length - 1]] = $r, this._baseLength = d > 0 ? d : this.base.length, t.push(
      Rt(this.base.substring(u, this._baseLength)),
      a ? "(?:#|$)" : "(?:[?#]|$)"
    ), this._baseMatcher = new RegExp([...t, ...r].join(""));
  }
  toRelative(e) {
    const t = this._getBaseMatcher().exec(e);
    if (!t)
      return e;
    const r = t[0].length;
    if (r === this._baseLength && r === e.length)
      return "";
    const n = this._pathReplacements[r];
    if (n) {
      const s = e.substring(r);
      return n !== Mt && !di.test(s) ? e : n === $r && /^[^?#]/.test(s) ? s : n + s;
    }
    return e.substring(r - 1);
  }
};
var tt = ve.defaultGraph();
var { rdf: hi, xsd: Ue } = pe;
var kr = /["\\\t\n\r\b\f\u0000-\u0019\ud800-\udbff]/;
var Dr = /["\\\t\n\r\b\f\u0000-\u0019]|[\ud800-\udbff][\udc00-\udfff]/g;
var pi = {
  "\\": "\\\\",
  '"': '\\"',
  "	": "\\t",
  "\n": "\\n",
  "\r": "\\r",
  "\b": "\\b",
  "\f": "\\f"
};
var rt = class extends Ie {
  // Pretty-printed nodes are not equal to any other node
  // (e.g., [] does not equal [])
  equals(e) {
    return e === this;
  }
};
var br = class {
  constructor(e, t) {
    if (this._prefixRegex = /$0^/, e && typeof e.write != "function" && (t = e, e = null), t = t || {}, this._lists = t.lists, e)
      this._outputStream = e, this._endStream = t.end === void 0 ? true : !!t.end;
    else {
      let r = "";
      this._outputStream = {
        write(n, s, o) {
          r += n, o && o();
        },
        end: (n) => {
          n && n(null, r);
        }
      }, this._endStream = true;
    }
    this._subject = null, /triple|quad/i.test(t.format) ? (this._lineMode = true, this._writeQuad = this._writeQuadLine) : (this._lineMode = false, this._graph = tt, this._prefixIRIs = /* @__PURE__ */ Object.create(null), t.prefixes && this.addPrefixes(t.prefixes), t.baseIRI && (this._baseIri = new _r(t.baseIRI)));
  }
  // ## Private methods
  // ### Whether the current graph is the default graph
  get _inDefaultGraph() {
    return tt.equals(this._graph);
  }
  // ### `_write` writes the argument to the output stream
  _write(e, t) {
    this._outputStream.write(e, "utf8", t);
  }
  // ### `_writeQuad` writes the quad to the output stream
  _writeQuad(e, t, r, n, s) {
    try {
      n.equals(this._graph) || (this._write((this._subject === null ? "" : this._inDefaultGraph ? `.
` : `
}
`) + (tt.equals(n) ? "" : `${this._encodeIriOrBlank(n)} {
`)), this._graph = n, this._subject = null), e.equals(this._subject) ? t.equals(this._predicate) ? this._write(`, ${this._encodeObject(r)}`, s) : this._write(`;
    ${this._encodePredicate(this._predicate = t)} ${this._encodeObject(r)}`, s) : this._write(`${(this._subject === null ? "" : `.
`) + this._encodeSubject(this._subject = e)} ${this._encodePredicate(this._predicate = t)} ${this._encodeObject(r)}`, s);
    } catch (o) {
      s && s(o);
    }
  }
  // ### `_writeQuadLine` writes the quad to the output stream as a single line
  _writeQuadLine(e, t, r, n, s) {
    delete this._prefixMatch, this._write(this.quadToString(e, t, r, n), s);
  }
  // ### `quadToString` serializes a quad as a string
  quadToString(e, t, r, n) {
    return `${this._encodeSubject(e)} ${this._encodeIriOrBlank(t)} ${this._encodeObject(r)}${n && n.value ? ` ${this._encodeIriOrBlank(n)} .
` : ` .
`}`;
  }
  // ### `quadsToString` serializes an array of quads as a string
  quadsToString(e) {
    let t = "";
    for (const r of e)
      t += this.quadToString(r.subject, r.predicate, r.object, r.graph);
    return t;
  }
  // ### `_encodeSubject` represents a subject
  _encodeSubject(e) {
    return e.termType === "Quad" ? this._encodeQuad(e) : this._encodeIriOrBlank(e);
  }
  // ### `_encodeIriOrBlank` represents an IRI or blank node
  _encodeIriOrBlank(e) {
    if (e.termType !== "NamedNode")
      return this._lists && e.value in this._lists && (e = this.list(this._lists[e.value])), "id" in e ? e.id : `_:${e.value}`;
    let t = e.value;
    this._baseIri && (t = this._baseIri.toRelative(t)), kr.test(t) && (t = t.replace(Dr, Cr));
    const r = this._prefixRegex.exec(t);
    return r ? r[1] ? this._prefixIRIs[r[1]] + r[2] : t : `<${t}>`;
  }
  // ### `_encodeLiteral` represents a literal
  _encodeLiteral(e) {
    let t = e.value;
    if (kr.test(t) && (t = t.replace(Dr, Cr)), e.language)
      return `"${t}"@${e.language}`;
    if (this._lineMode) {
      if (e.datatype.value === Ue.string)
        return `"${t}"`;
    } else
      switch (e.datatype.value) {
        case Ue.string:
          return `"${t}"`;
        case Ue.boolean:
          if (t === "true" || t === "false")
            return t;
          break;
        case Ue.integer:
          if (/^[+-]?\d+$/.test(t))
            return t;
          break;
        case Ue.decimal:
          if (/^[+-]?\d*\.\d+$/.test(t))
            return t;
          break;
        case Ue.double:
          if (/^[+-]?(?:\d+\.\d*|\.?\d+)[eE][+-]?\d+$/.test(t))
            return t;
          break;
      }
    return `"${t}"^^${this._encodeIriOrBlank(e.datatype)}`;
  }
  // ### `_encodePredicate` represents a predicate
  _encodePredicate(e) {
    return e.value === hi.type ? "a" : this._encodeIriOrBlank(e);
  }
  // ### `_encodeObject` represents an object
  _encodeObject(e) {
    switch (e.termType) {
      case "Quad":
        return this._encodeQuad(e);
      case "Literal":
        return this._encodeLiteral(e);
      default:
        return this._encodeIriOrBlank(e);
    }
  }
  // ### `_encodeQuad` encodes an RDF-star quad
  _encodeQuad({ subject: e, predicate: t, object: r, graph: n }) {
    return `<<${this._encodeSubject(e)} ${this._encodePredicate(t)} ${this._encodeObject(r)}${cr(n) ? "" : ` ${this._encodeIriOrBlank(n)}`}>>`;
  }
  // ### `_blockedWrite` replaces `_write` after the writer has been closed
  _blockedWrite() {
    throw new Error("Cannot write because the writer has been closed.");
  }
  // ### `addQuad` adds the quad to the output stream
  addQuad(e, t, r, n, s) {
    r === void 0 ? this._writeQuad(e.subject, e.predicate, e.object, e.graph, t) : typeof n == "function" ? this._writeQuad(e, t, r, tt, n) : this._writeQuad(e, t, r, n || tt, s);
  }
  // ### `addQuads` adds the quads to the output stream
  addQuads(e) {
    for (let t = 0; t < e.length; t++)
      this.addQuad(e[t]);
  }
  // ### `addPrefix` adds the prefix to the output stream
  addPrefix(e, t, r) {
    const n = {};
    n[e] = t, this.addPrefixes(n, r);
  }
  // ### `addPrefixes` adds the prefixes to the output stream
  addPrefixes(e, t) {
    if (!this._prefixIRIs)
      return t && t();
    let r = false;
    for (let n in e) {
      let s = e[n];
      typeof s != "string" && (s = s.value), r = true, this._subject !== null && (this._write(this._inDefaultGraph ? `.
` : `
}
`), this._subject = null, this._graph = ""), this._prefixIRIs[s] = n += ":", this._write(`@prefix ${n} <${s}>.
`);
    }
    if (r) {
      let n = "", s = "";
      for (const o in this._prefixIRIs)
        n += n ? `|${o}` : o, s += (s ? "|" : "") + this._prefixIRIs[o];
      n = Rt(n), this._prefixRegex = new RegExp(`^(?:${s})[^/]*$|^(${n})([_a-zA-Z0-9][\\-_a-zA-Z0-9]*)$`);
    }
    this._write(r ? `
` : "", t);
  }
  // ### `blank` creates a blank node with the given content
  blank(e, t) {
    let r = e, n, s;
    switch (e === void 0 ? r = [] : e.termType ? r = [{ predicate: e, object: t }] : "length" in e || (r = [e]), s = r.length) {
      // Generate an empty blank node
      case 0:
        return new rt("[]");
      // Generate a non-nested one-triple blank node
      case 1:
        if (n = r[0], !(n.object instanceof rt))
          return new rt(`[ ${this._encodePredicate(n.predicate)} ${this._encodeObject(n.object)} ]`);
      // Generate a multi-triple or nested blank node
      default:
        let o = "[";
        for (let a = 0; a < s; a++)
          n = r[a], n.predicate.equals(e) ? o += `, ${this._encodeObject(n.object)}` : (o += `${(a ? `;
  ` : `
  `) + this._encodePredicate(n.predicate)} ${this._encodeObject(n.object)}`, e = n.predicate);
        return new rt(`${o}
]`);
    }
  }
  // ### `list` creates a list node with the given content
  list(e) {
    const t = e && e.length || 0, r = new Array(t);
    for (let n = 0; n < t; n++)
      r[n] = this._encodeObject(e[n]);
    return new rt(`(${r.join(" ")})`);
  }
  // ### `end` signals the end of the output stream
  end(e) {
    this._subject !== null && (this._write(this._inDefaultGraph ? `.
` : `
}
`), this._subject = null), this._write = this._blockedWrite;
    let t = e && ((r, n) => {
      t = null, e(r, n);
    });
    if (this._endStream)
      try {
        return this._outputStream.end(t);
      } catch {
      }
    t && t();
  }
};
function Cr(i) {
  let e = pi[i];
  return e === void 0 && (i.length === 1 ? (e = i.charCodeAt(0).toString(16), e = "\\u0000".substr(0, 6 - e.length) + e) : (e = ((i.charCodeAt(0) - 55296) * 1024 + i.charCodeAt(1) + 9216).toString(16), e = "\\U00000000".substr(0, 10 - e.length) + e)), e;
}
var Ft = { exports: {} };
var Wt = { exports: {} };
var Bt;
var Mr;
function ce() {
  if (Mr) return Bt;
  Mr = 1;
  class i extends Error {
    constructor(t) {
      if (!Array.isArray(t))
        throw new TypeError(`Expected input to be an Array, got ${typeof t}`);
      let r = "";
      for (let n = 0; n < t.length; n++)
        r += `    ${t[n].stack}
`;
      super(r), this.name = "AggregateError", this.errors = t;
    }
  }
  return Bt = {
    AggregateError: i,
    ArrayIsArray(e) {
      return Array.isArray(e);
    },
    ArrayPrototypeIncludes(e, t) {
      return e.includes(t);
    },
    ArrayPrototypeIndexOf(e, t) {
      return e.indexOf(t);
    },
    ArrayPrototypeJoin(e, t) {
      return e.join(t);
    },
    ArrayPrototypeMap(e, t) {
      return e.map(t);
    },
    ArrayPrototypePop(e, t) {
      return e.pop(t);
    },
    ArrayPrototypePush(e, t) {
      return e.push(t);
    },
    ArrayPrototypeSlice(e, t, r) {
      return e.slice(t, r);
    },
    Error,
    FunctionPrototypeCall(e, t, ...r) {
      return e.call(t, ...r);
    },
    FunctionPrototypeSymbolHasInstance(e, t) {
      return Function.prototype[Symbol.hasInstance].call(e, t);
    },
    MathFloor: Math.floor,
    Number,
    NumberIsInteger: Number.isInteger,
    NumberIsNaN: Number.isNaN,
    NumberMAX_SAFE_INTEGER: Number.MAX_SAFE_INTEGER,
    NumberMIN_SAFE_INTEGER: Number.MIN_SAFE_INTEGER,
    NumberParseInt: Number.parseInt,
    ObjectDefineProperties(e, t) {
      return Object.defineProperties(e, t);
    },
    ObjectDefineProperty(e, t, r) {
      return Object.defineProperty(e, t, r);
    },
    ObjectGetOwnPropertyDescriptor(e, t) {
      return Object.getOwnPropertyDescriptor(e, t);
    },
    ObjectKeys(e) {
      return Object.keys(e);
    },
    ObjectSetPrototypeOf(e, t) {
      return Object.setPrototypeOf(e, t);
    },
    Promise,
    PromisePrototypeCatch(e, t) {
      return e.catch(t);
    },
    PromisePrototypeThen(e, t, r) {
      return e.then(t, r);
    },
    PromiseReject(e) {
      return Promise.reject(e);
    },
    PromiseResolve(e) {
      return Promise.resolve(e);
    },
    ReflectApply: Reflect.apply,
    RegExpPrototypeTest(e, t) {
      return e.test(t);
    },
    SafeSet: Set,
    String,
    StringPrototypeSlice(e, t, r) {
      return e.slice(t, r);
    },
    StringPrototypeToLowerCase(e) {
      return e.toLowerCase();
    },
    StringPrototypeToUpperCase(e) {
      return e.toUpperCase();
    },
    StringPrototypeTrim(e) {
      return e.trim();
    },
    Symbol,
    SymbolFor: Symbol.for,
    SymbolAsyncIterator: Symbol.asyncIterator,
    SymbolHasInstance: Symbol.hasInstance,
    SymbolIterator: Symbol.iterator,
    SymbolDispose: Symbol.dispose || /* @__PURE__ */ Symbol("Symbol.dispose"),
    SymbolAsyncDispose: Symbol.asyncDispose || /* @__PURE__ */ Symbol("Symbol.asyncDispose"),
    TypedArrayPrototypeSet(e, t, r) {
      return e.set(t, r);
    },
    Boolean,
    Uint8Array
  }, Bt;
}
var qt = { exports: {} };
var Ut;
var Fr;
function In() {
  return Fr || (Fr = 1, Ut = {
    format(i, ...e) {
      return i.replace(/%([sdifj])/g, function(...[t, r]) {
        const n = e.shift();
        return r === "f" ? n.toFixed(6) : r === "j" ? JSON.stringify(n) : r === "s" && typeof n == "object" ? `${n.constructor !== Object ? n.constructor.name : ""} {}`.trim() : n.toString();
      });
    },
    inspect(i) {
      switch (typeof i) {
        case "string":
          if (i.includes("'"))
            if (i.includes('"')) {
              if (!i.includes("`") && !i.includes("${"))
                return `\`${i}\``;
            } else return `"${i}"`;
          return `'${i}'`;
        case "number":
          return isNaN(i) ? "NaN" : Object.is(i, -0) ? String(i) : i;
        case "bigint":
          return `${String(i)}n`;
        case "boolean":
        case "undefined":
          return String(i);
        case "object":
          return "{}";
      }
    }
  }), Ut;
}
var Gt;
var Wr;
function ge() {
  if (Wr) return Gt;
  Wr = 1;
  const { format: i, inspect: e } = In(), { AggregateError: t } = ce(), r = globalThis.AggregateError || t, n = /* @__PURE__ */ Symbol("kIsNodeError"), s = [
    "string",
    "function",
    "number",
    "object",
    // Accept 'Function' and 'Object' as alternative to the lower cased version.
    "Function",
    "Object",
    "boolean",
    "bigint",
    "symbol"
  ], o = /^([A-Z][a-z0-9]*)+$/, a = "__node_internal_", d = {};
  function u(b, c) {
    if (!b)
      throw new d.ERR_INTERNAL_ASSERTION(c);
  }
  function _(b) {
    let c = "", y = b.length;
    const g = b[0] === "-" ? 1 : 0;
    for (; y >= g + 4; y -= 3)
      c = `_${b.slice(y - 3, y)}${c}`;
    return `${b.slice(0, y)}${c}`;
  }
  function h(b, c, y) {
    if (typeof c == "function")
      return u(
        c.length <= y.length,
        // Default options do not count.
        `Code: ${b}; The provided arguments length (${y.length}) does not match the required ones (${c.length}).`
      ), c(...y);
    const g = (c.match(/%[dfijoOs]/g) || []).length;
    return u(
      g === y.length,
      `Code: ${b}; The provided arguments length (${y.length}) does not match the required ones (${g}).`
    ), y.length === 0 ? c : i(c, ...y);
  }
  function S(b, c, y) {
    y || (y = Error);
    class g extends y {
      constructor(...x) {
        super(h(b, c, x));
      }
      toString() {
        return `${this.name} [${b}]: ${this.message}`;
      }
    }
    Object.defineProperties(g.prototype, {
      name: {
        value: y.name,
        writable: true,
        enumerable: false,
        configurable: true
      },
      toString: {
        value() {
          return `${this.name} [${b}]: ${this.message}`;
        },
        writable: true,
        enumerable: false,
        configurable: true
      }
    }), g.prototype.code = b, g.prototype[n] = true, d[b] = g;
  }
  function N(b) {
    const c = a + b.name;
    return Object.defineProperty(b, "name", {
      value: c
    }), b;
  }
  function I(b, c) {
    if (b && c && b !== c) {
      if (Array.isArray(c.errors))
        return c.errors.push(b), c;
      const y = new r([c, b], c.message);
      return y.code = c.code, y;
    }
    return b || c;
  }
  class E extends Error {
    constructor(c = "The operation was aborted", y = void 0) {
      if (y !== void 0 && typeof y != "object")
        throw new d.ERR_INVALID_ARG_TYPE("options", "Object", y);
      super(c, y), this.code = "ABORT_ERR", this.name = "AbortError";
    }
  }
  return S("ERR_ASSERTION", "%s", Error), S(
    "ERR_INVALID_ARG_TYPE",
    (b, c, y) => {
      u(typeof b == "string", "'name' must be a string"), Array.isArray(c) || (c = [c]);
      let g = "The ";
      b.endsWith(" argument") ? g += `${b} ` : g += `"${b}" ${b.includes(".") ? "property" : "argument"} `, g += "must be ";
      const v = [], x = [], $ = [];
      for (const D of c)
        u(typeof D == "string", "All expected entries have to be of type string"), s.includes(D) ? v.push(D.toLowerCase()) : o.test(D) ? x.push(D) : (u(D !== "object", 'The value "object" should be written as "Object"'), $.push(D));
      if (x.length > 0) {
        const D = v.indexOf("object");
        D !== -1 && (v.splice(v, D, 1), x.push("Object"));
      }
      if (v.length > 0) {
        switch (v.length) {
          case 1:
            g += `of type ${v[0]}`;
            break;
          case 2:
            g += `one of type ${v[0]} or ${v[1]}`;
            break;
          default: {
            const D = v.pop();
            g += `one of type ${v.join(", ")}, or ${D}`;
          }
        }
        (x.length > 0 || $.length > 0) && (g += " or ");
      }
      if (x.length > 0) {
        switch (x.length) {
          case 1:
            g += `an instance of ${x[0]}`;
            break;
          case 2:
            g += `an instance of ${x[0]} or ${x[1]}`;
            break;
          default: {
            const D = x.pop();
            g += `an instance of ${x.join(", ")}, or ${D}`;
          }
        }
        $.length > 0 && (g += " or ");
      }
      switch ($.length) {
        case 0:
          break;
        case 1:
          $[0].toLowerCase() !== $[0] && (g += "an "), g += `${$[0]}`;
          break;
        case 2:
          g += `one of ${$[0]} or ${$[1]}`;
          break;
        default: {
          const D = $.pop();
          g += `one of ${$.join(", ")}, or ${D}`;
        }
      }
      if (y == null)
        g += `. Received ${y}`;
      else if (typeof y == "function" && y.name)
        g += `. Received function ${y.name}`;
      else if (typeof y == "object") {
        var q;
        if ((q = y.constructor) !== null && q !== void 0 && q.name)
          g += `. Received an instance of ${y.constructor.name}`;
        else {
          const D = e(y, {
            depth: -1
          });
          g += `. Received ${D}`;
        }
      } else {
        let D = e(y, {
          colors: false
        });
        D.length > 25 && (D = `${D.slice(0, 25)}...`), g += `. Received type ${typeof y} (${D})`;
      }
      return g;
    },
    TypeError
  ), S(
    "ERR_INVALID_ARG_VALUE",
    (b, c, y = "is invalid") => {
      let g = e(c);
      return g.length > 128 && (g = g.slice(0, 128) + "..."), `The ${b.includes(".") ? "property" : "argument"} '${b}' ${y}. Received ${g}`;
    },
    TypeError
  ), S(
    "ERR_INVALID_RETURN_VALUE",
    (b, c, y) => {
      var g;
      const v = y != null && (g = y.constructor) !== null && g !== void 0 && g.name ? `instance of ${y.constructor.name}` : `type ${typeof y}`;
      return `Expected ${b} to be returned from the "${c}" function but got ${v}.`;
    },
    TypeError
  ), S(
    "ERR_MISSING_ARGS",
    (...b) => {
      u(b.length > 0, "At least one arg needs to be specified");
      let c;
      const y = b.length;
      switch (b = (Array.isArray(b) ? b : [b]).map((g) => `"${g}"`).join(" or "), y) {
        case 1:
          c += `The ${b[0]} argument`;
          break;
        case 2:
          c += `The ${b[0]} and ${b[1]} arguments`;
          break;
        default:
          {
            const g = b.pop();
            c += `The ${b.join(", ")}, and ${g} arguments`;
          }
          break;
      }
      return `${c} must be specified`;
    },
    TypeError
  ), S(
    "ERR_OUT_OF_RANGE",
    (b, c, y) => {
      u(c, 'Missing "range" argument');
      let g;
      if (Number.isInteger(y) && Math.abs(y) > 2 ** 32)
        g = _(String(y));
      else if (typeof y == "bigint") {
        g = String(y);
        const v = BigInt(2) ** BigInt(32);
        (y > v || y < -v) && (g = _(g)), g += "n";
      } else
        g = e(y);
      return `The value of "${b}" is out of range. It must be ${c}. Received ${g}`;
    },
    RangeError
  ), S("ERR_MULTIPLE_CALLBACK", "Callback called multiple times", Error), S("ERR_METHOD_NOT_IMPLEMENTED", "The %s method is not implemented", Error), S("ERR_STREAM_ALREADY_FINISHED", "Cannot call %s after a stream was finished", Error), S("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable", Error), S("ERR_STREAM_DESTROYED", "Cannot call %s after a stream was destroyed", Error), S("ERR_STREAM_NULL_VALUES", "May not write null values to stream", TypeError), S("ERR_STREAM_PREMATURE_CLOSE", "Premature close", Error), S("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF", Error), S("ERR_STREAM_UNSHIFT_AFTER_END_EVENT", "stream.unshift() after end event", Error), S("ERR_STREAM_WRITE_AFTER_END", "write after end", Error), S("ERR_UNKNOWN_ENCODING", "Unknown encoding: %s", TypeError), Gt = {
    AbortError: E,
    aggregateTwoErrors: N(I),
    hideStackFrames: N,
    codes: d
  }, Gt;
}
var nt = { exports: {} };
var Br;
function ft() {
  if (Br) return nt.exports;
  Br = 1;
  const { AbortController: i, AbortSignal: e } = typeof self < "u" ? self : typeof window < "u" ? window : (
    /* otherwise */
    void 0
  );
  return nt.exports = i, nt.exports.AbortSignal = e, nt.exports.default = i, nt.exports;
}
var yt = { exports: {} };
var qr;
function Nt() {
  if (qr) return yt.exports;
  qr = 1;
  var i = typeof Reflect == "object" ? Reflect : null, e = i && typeof i.apply == "function" ? i.apply : function(x, $, q) {
    return Function.prototype.apply.call(x, $, q);
  }, t;
  i && typeof i.ownKeys == "function" ? t = i.ownKeys : Object.getOwnPropertySymbols ? t = function(x) {
    return Object.getOwnPropertyNames(x).concat(Object.getOwnPropertySymbols(x));
  } : t = function(x) {
    return Object.getOwnPropertyNames(x);
  };
  function r(v) {
    console && console.warn && console.warn(v);
  }
  var n = Number.isNaN || function(x) {
    return x !== x;
  };
  function s() {
    s.init.call(this);
  }
  yt.exports = s, yt.exports.once = c, s.EventEmitter = s, s.prototype._events = void 0, s.prototype._eventsCount = 0, s.prototype._maxListeners = void 0;
  var o = 10;
  function a(v) {
    if (typeof v != "function")
      throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof v);
  }
  Object.defineProperty(s, "defaultMaxListeners", {
    enumerable: true,
    get: function() {
      return o;
    },
    set: function(v) {
      if (typeof v != "number" || v < 0 || n(v))
        throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + v + ".");
      o = v;
    }
  }), s.init = function() {
    (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
  }, s.prototype.setMaxListeners = function(x) {
    if (typeof x != "number" || x < 0 || n(x))
      throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + x + ".");
    return this._maxListeners = x, this;
  };
  function d(v) {
    return v._maxListeners === void 0 ? s.defaultMaxListeners : v._maxListeners;
  }
  s.prototype.getMaxListeners = function() {
    return d(this);
  }, s.prototype.emit = function(x) {
    for (var $ = [], q = 1; q < arguments.length; q++) $.push(arguments[q]);
    var D = x === "error", re = this._events;
    if (re !== void 0)
      D = D && re.error === void 0;
    else if (!D)
      return false;
    if (D) {
      var A;
      if ($.length > 0 && (A = $[0]), A instanceof Error)
        throw A;
      var j = new Error("Unhandled error." + (A ? " (" + A.message + ")" : ""));
      throw j.context = A, j;
    }
    var B = re[x];
    if (B === void 0)
      return false;
    if (typeof B == "function")
      e(B, this, $);
    else
      for (var T = B.length, V = I(B, T), q = 0; q < T; ++q)
        e(V[q], this, $);
    return true;
  };
  function u(v, x, $, q) {
    var D, re, A;
    if (a($), re = v._events, re === void 0 ? (re = v._events = /* @__PURE__ */ Object.create(null), v._eventsCount = 0) : (re.newListener !== void 0 && (v.emit(
      "newListener",
      x,
      $.listener ? $.listener : $
    ), re = v._events), A = re[x]), A === void 0)
      A = re[x] = $, ++v._eventsCount;
    else if (typeof A == "function" ? A = re[x] = q ? [$, A] : [A, $] : q ? A.unshift($) : A.push($), D = d(v), D > 0 && A.length > D && !A.warned) {
      A.warned = true;
      var j = new Error("Possible EventEmitter memory leak detected. " + A.length + " " + String(x) + " listeners added. Use emitter.setMaxListeners() to increase limit");
      j.name = "MaxListenersExceededWarning", j.emitter = v, j.type = x, j.count = A.length, r(j);
    }
    return v;
  }
  s.prototype.addListener = function(x, $) {
    return u(this, x, $, false);
  }, s.prototype.on = s.prototype.addListener, s.prototype.prependListener = function(x, $) {
    return u(this, x, $, true);
  };
  function _() {
    if (!this.fired)
      return this.target.removeListener(this.type, this.wrapFn), this.fired = true, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
  }
  function h(v, x, $) {
    var q = { fired: false, wrapFn: void 0, target: v, type: x, listener: $ }, D = _.bind(q);
    return D.listener = $, q.wrapFn = D, D;
  }
  s.prototype.once = function(x, $) {
    return a($), this.on(x, h(this, x, $)), this;
  }, s.prototype.prependOnceListener = function(x, $) {
    return a($), this.prependListener(x, h(this, x, $)), this;
  }, s.prototype.removeListener = function(x, $) {
    var q, D, re, A, j;
    if (a($), D = this._events, D === void 0)
      return this;
    if (q = D[x], q === void 0)
      return this;
    if (q === $ || q.listener === $)
      --this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : (delete D[x], D.removeListener && this.emit("removeListener", x, q.listener || $));
    else if (typeof q != "function") {
      for (re = -1, A = q.length - 1; A >= 0; A--)
        if (q[A] === $ || q[A].listener === $) {
          j = q[A].listener, re = A;
          break;
        }
      if (re < 0)
        return this;
      re === 0 ? q.shift() : E(q, re), q.length === 1 && (D[x] = q[0]), D.removeListener !== void 0 && this.emit("removeListener", x, j || $);
    }
    return this;
  }, s.prototype.off = s.prototype.removeListener, s.prototype.removeAllListeners = function(x) {
    var $, q, D;
    if (q = this._events, q === void 0)
      return this;
    if (q.removeListener === void 0)
      return arguments.length === 0 ? (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0) : q[x] !== void 0 && (--this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : delete q[x]), this;
    if (arguments.length === 0) {
      var re = Object.keys(q), A;
      for (D = 0; D < re.length; ++D)
        A = re[D], A !== "removeListener" && this.removeAllListeners(A);
      return this.removeAllListeners("removeListener"), this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0, this;
    }
    if ($ = q[x], typeof $ == "function")
      this.removeListener(x, $);
    else if ($ !== void 0)
      for (D = $.length - 1; D >= 0; D--)
        this.removeListener(x, $[D]);
    return this;
  };
  function S(v, x, $) {
    var q = v._events;
    if (q === void 0)
      return [];
    var D = q[x];
    return D === void 0 ? [] : typeof D == "function" ? $ ? [D.listener || D] : [D] : $ ? b(D) : I(D, D.length);
  }
  s.prototype.listeners = function(x) {
    return S(this, x, true);
  }, s.prototype.rawListeners = function(x) {
    return S(this, x, false);
  }, s.listenerCount = function(v, x) {
    return typeof v.listenerCount == "function" ? v.listenerCount(x) : N.call(v, x);
  }, s.prototype.listenerCount = N;
  function N(v) {
    var x = this._events;
    if (x !== void 0) {
      var $ = x[v];
      if (typeof $ == "function")
        return 1;
      if ($ !== void 0)
        return $.length;
    }
    return 0;
  }
  s.prototype.eventNames = function() {
    return this._eventsCount > 0 ? t(this._events) : [];
  };
  function I(v, x) {
    for (var $ = new Array(x), q = 0; q < x; ++q)
      $[q] = v[q];
    return $;
  }
  function E(v, x) {
    for (; x + 1 < v.length; x++)
      v[x] = v[x + 1];
    v.pop();
  }
  function b(v) {
    for (var x = new Array(v.length), $ = 0; $ < x.length; ++$)
      x[$] = v[$].listener || v[$];
    return x;
  }
  function c(v, x) {
    return new Promise(function($, q) {
      function D(A) {
        v.removeListener(x, re), q(A);
      }
      function re() {
        typeof v.removeListener == "function" && v.removeListener("error", D), $([].slice.call(arguments));
      }
      g(v, x, re, { once: true }), x !== "error" && y(v, D, { once: true });
    });
  }
  function y(v, x, $) {
    typeof v.on == "function" && g(v, "error", x, $);
  }
  function g(v, x, $, q) {
    if (typeof v.on == "function")
      q.once ? v.once(x, $) : v.on(x, $);
    else if (typeof v.addEventListener == "function")
      v.addEventListener(x, function D(re) {
        q.once && v.removeEventListener(x, D), $(re);
      });
    else
      throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof v);
  }
  return yt.exports;
}
var Ur;
function we() {
  return Ur || (Ur = 1, (function(i) {
    const e = import_buffer.default, { format: t, inspect: r } = In(), {
      codes: { ERR_INVALID_ARG_TYPE: n }
    } = ge(), { kResistStopPropagation: s, AggregateError: o, SymbolDispose: a } = ce(), d = globalThis.AbortSignal || ft().AbortSignal, u = globalThis.AbortController || ft().AbortController, _ = Object.getPrototypeOf(async function() {
    }).constructor, h = globalThis.Blob || e.Blob, S = typeof h < "u" ? function(b) {
      return b instanceof h;
    } : function(b) {
      return false;
    }, N = (E, b) => {
      if (E !== void 0 && (E === null || typeof E != "object" || !("aborted" in E)))
        throw new n(b, "AbortSignal", E);
    }, I = (E, b) => {
      if (typeof E != "function")
        throw new n(b, "Function", E);
    };
    i.exports = {
      AggregateError: o,
      kEmptyObject: Object.freeze({}),
      once(E) {
        let b = false;
        return function(...c) {
          b || (b = true, E.apply(this, c));
        };
      },
      createDeferredPromise: function() {
        let E, b;
        return {
          promise: new Promise((y, g) => {
            E = y, b = g;
          }),
          resolve: E,
          reject: b
        };
      },
      promisify(E) {
        return new Promise((b, c) => {
          E((y, ...g) => y ? c(y) : b(...g));
        });
      },
      debuglog() {
        return function() {
        };
      },
      format: t,
      inspect: r,
      types: {
        isAsyncFunction(E) {
          return E instanceof _;
        },
        isArrayBufferView(E) {
          return ArrayBuffer.isView(E);
        }
      },
      isBlob: S,
      deprecate(E, b) {
        return E;
      },
      addAbortListener: Nt().addAbortListener || function(b, c) {
        if (b === void 0)
          throw new n("signal", "AbortSignal", b);
        N(b, "signal"), I(c, "listener");
        let y;
        return b.aborted ? queueMicrotask(() => c()) : (b.addEventListener("abort", c, {
          __proto__: null,
          once: true,
          [s]: true
        }), y = () => {
          b.removeEventListener("abort", c);
        }), {
          __proto__: null,
          [a]() {
            var g;
            (g = y) === null || g === void 0 || g();
          }
        };
      },
      AbortSignalAny: d.any || function(b) {
        if (b.length === 1)
          return b[0];
        const c = new u(), y = () => c.abort();
        return b.forEach((g) => {
          N(g, "signals"), g.addEventListener("abort", y, {
            once: true
          });
        }), c.signal.addEventListener(
          "abort",
          () => {
            b.forEach((g) => g.removeEventListener("abort", y));
          },
          {
            once: true
          }
        ), c.signal;
      }
    }, i.exports.promisify.custom = /* @__PURE__ */ Symbol.for("nodejs.util.promisify.custom");
  })(qt)), qt.exports;
}
var wt = {};
var Qt;
var Gr;
function ct() {
  if (Gr) return Qt;
  Gr = 1;
  const {
    ArrayIsArray: i,
    ArrayPrototypeIncludes: e,
    ArrayPrototypeJoin: t,
    ArrayPrototypeMap: r,
    NumberIsInteger: n,
    NumberIsNaN: s,
    NumberMAX_SAFE_INTEGER: o,
    NumberMIN_SAFE_INTEGER: a,
    NumberParseInt: d,
    ObjectPrototypeHasOwnProperty: u,
    RegExpPrototypeExec: _,
    String: h,
    StringPrototypeToUpperCase: S,
    StringPrototypeTrim: N
  } = ce(), {
    hideStackFrames: I,
    codes: { ERR_SOCKET_BAD_PORT: E, ERR_INVALID_ARG_TYPE: b, ERR_INVALID_ARG_VALUE: c, ERR_OUT_OF_RANGE: y, ERR_UNKNOWN_SIGNAL: g }
  } = ge(), { normalizeEncoding: v } = we(), { isAsyncFunction: x, isArrayBufferView: $ } = we().types, q = {};
  function D(w) {
    return w === (w | 0);
  }
  function re(w) {
    return w === w >>> 0;
  }
  const A = /^[0-7]+$/, j = "must be a 32-bit unsigned integer or an octal string";
  function B(w, W, G) {
    if (typeof w > "u" && (w = G), typeof w == "string") {
      if (_(A, w) === null)
        throw new c(W, w, j);
      w = d(w, 8);
    }
    return J(w, W), w;
  }
  const T = I((w, W, G = a, k = o) => {
    if (typeof w != "number") throw new b(W, "number", w);
    if (!n(w)) throw new y(W, "an integer", w);
    if (w < G || w > k) throw new y(W, `>= ${G} && <= ${k}`, w);
  }), V = I((w, W, G = -2147483648, k = 2147483647) => {
    if (typeof w != "number")
      throw new b(W, "number", w);
    if (!n(w))
      throw new y(W, "an integer", w);
    if (w < G || w > k)
      throw new y(W, `>= ${G} && <= ${k}`, w);
  }), J = I((w, W, G = false) => {
    if (typeof w != "number")
      throw new b(W, "number", w);
    if (!n(w))
      throw new y(W, "an integer", w);
    const k = G ? 1 : 0, fe = 4294967295;
    if (w < k || w > fe)
      throw new y(W, `>= ${k} && <= ${fe}`, w);
  });
  function ne(w, W) {
    if (typeof w != "string") throw new b(W, "string", w);
  }
  function le(w, W, G = void 0, k) {
    if (typeof w != "number") throw new b(W, "number", w);
    if (G != null && w < G || k != null && w > k || (G != null || k != null) && s(w))
      throw new y(
        W,
        `${G != null ? `>= ${G}` : ""}${G != null && k != null ? " && " : ""}${k != null ? `<= ${k}` : ""}`,
        w
      );
  }
  const C = I((w, W, G) => {
    if (!e(G, w)) {
      const fe = "must be one of: " + t(
        r(G, (ye) => typeof ye == "string" ? `'${ye}'` : h(ye)),
        ", "
      );
      throw new c(W, w, fe);
    }
  });
  function ee(w, W) {
    if (typeof w != "boolean") throw new b(W, "boolean", w);
  }
  function p(w, W, G) {
    return w == null || !u(w, W) ? G : w[W];
  }
  const M = I((w, W, G = null) => {
    const k = p(G, "allowArray", false), fe = p(G, "allowFunction", false);
    if (!p(G, "nullable", false) && w === null || !k && i(w) || typeof w != "object" && (!fe || typeof w != "function"))
      throw new b(W, "Object", w);
  }), Y = I((w, W) => {
    if (w != null && typeof w != "object" && typeof w != "function")
      throw new b(W, "a dictionary", w);
  }), O = I((w, W, G = 0) => {
    if (!i(w))
      throw new b(W, "Array", w);
    if (w.length < G) {
      const k = `must be longer than ${G}`;
      throw new c(W, w, k);
    }
  });
  function X(w, W) {
    O(w, W);
    for (let G = 0; G < w.length; G++)
      ne(w[G], `${W}[${G}]`);
  }
  function ie(w, W) {
    O(w, W);
    for (let G = 0; G < w.length; G++)
      ee(w[G], `${W}[${G}]`);
  }
  function ue(w, W) {
    O(w, W);
    for (let G = 0; G < w.length; G++) {
      const k = w[G], fe = `${W}[${G}]`;
      if (k == null)
        throw new b(fe, "AbortSignal", k);
      ae(k, fe);
    }
  }
  function oe(w, W = "signal") {
    if (ne(w, W), q[w] === void 0)
      throw q[S(w)] !== void 0 ? new g(w + " (signals must use all capital letters)") : new g(w);
  }
  const L = I((w, W = "buffer") => {
    if (!$(w))
      throw new b(W, ["Buffer", "TypedArray", "DataView"], w);
  });
  function F(w, W) {
    const G = v(W), k = w.length;
    if (G === "hex" && k % 2 !== 0)
      throw new c("encoding", W, `is invalid for data of length ${k}`);
  }
  function Z(w, W = "Port", G = true) {
    if (typeof w != "number" && typeof w != "string" || typeof w == "string" && N(w).length === 0 || +w !== +w >>> 0 || w > 65535 || w === 0 && !G)
      throw new E(W, w, G);
    return w | 0;
  }
  const ae = I((w, W) => {
    if (w !== void 0 && (w === null || typeof w != "object" || !("aborted" in w)))
      throw new b(W, "AbortSignal", w);
  }), se = I((w, W) => {
    if (typeof w != "function") throw new b(W, "Function", w);
  }), m = I((w, W) => {
    if (typeof w != "function" || x(w)) throw new b(W, "Function", w);
  }), R = I((w, W) => {
    if (w !== void 0) throw new b(W, "undefined", w);
  });
  function P(w, W, G) {
    if (!e(G, w))
      throw new b(W, `('${t(G, "|")}')`, w);
  }
  const H = /^(?:<[^>]*>)(?:\s*;\s*[^;"\s]+(?:=(")?[^;"\s]*\1)?)*$/;
  function Q(w, W) {
    if (typeof w > "u" || !_(H, w))
      throw new c(
        W,
        w,
        'must be an array or string of format "</styles.css>; rel=preload; as=style"'
      );
  }
  function U(w) {
    if (typeof w == "string")
      return Q(w, "hints"), w;
    if (i(w)) {
      const W = w.length;
      let G = "";
      if (W === 0)
        return G;
      for (let k = 0; k < W; k++) {
        const fe = w[k];
        Q(fe, "hints"), G += fe, k !== W - 1 && (G += ", ");
      }
      return G;
    }
    throw new c(
      "hints",
      w,
      'must be an array or string of format "</styles.css>; rel=preload; as=style"'
    );
  }
  return Qt = {
    isInt32: D,
    isUint32: re,
    parseFileMode: B,
    validateArray: O,
    validateStringArray: X,
    validateBooleanArray: ie,
    validateAbortSignalArray: ue,
    validateBoolean: ee,
    validateBuffer: L,
    validateDictionary: Y,
    validateEncoding: F,
    validateFunction: se,
    validateInt32: V,
    validateInteger: T,
    validateNumber: le,
    validateObject: M,
    validateOneOf: C,
    validatePlainFunction: m,
    validatePort: Z,
    validateSignalName: oe,
    validateString: ne,
    validateUint32: J,
    validateUndefined: R,
    validateUnion: P,
    validateAbortSignal: ae,
    validateLinkHeaderValue: U
  }, Qt;
}
var mt = { exports: {} };
var Ht = { exports: {} };
var Qr;
function qe() {
  if (Qr) return Ht.exports;
  Qr = 1;
  var i = Ht.exports = {}, e, t;
  function r() {
    throw new Error("setTimeout has not been defined");
  }
  function n() {
    throw new Error("clearTimeout has not been defined");
  }
  (function() {
    try {
      typeof setTimeout == "function" ? e = setTimeout : e = r;
    } catch {
      e = r;
    }
    try {
      typeof clearTimeout == "function" ? t = clearTimeout : t = n;
    } catch {
      t = n;
    }
  })();
  function s(E) {
    if (e === setTimeout)
      return setTimeout(E, 0);
    if ((e === r || !e) && setTimeout)
      return e = setTimeout, setTimeout(E, 0);
    try {
      return e(E, 0);
    } catch {
      try {
        return e.call(null, E, 0);
      } catch {
        return e.call(this, E, 0);
      }
    }
  }
  function o(E) {
    if (t === clearTimeout)
      return clearTimeout(E);
    if ((t === n || !t) && clearTimeout)
      return t = clearTimeout, clearTimeout(E);
    try {
      return t(E);
    } catch {
      try {
        return t.call(null, E);
      } catch {
        return t.call(this, E);
      }
    }
  }
  var a = [], d = false, u, _ = -1;
  function h() {
    !d || !u || (d = false, u.length ? a = u.concat(a) : _ = -1, a.length && S());
  }
  function S() {
    if (!d) {
      var E = s(h);
      d = true;
      for (var b = a.length; b; ) {
        for (u = a, a = []; ++_ < b; )
          u && u[_].run();
        _ = -1, b = a.length;
      }
      u = null, d = false, o(E);
    }
  }
  i.nextTick = function(E) {
    var b = new Array(arguments.length - 1);
    if (arguments.length > 1)
      for (var c = 1; c < arguments.length; c++)
        b[c - 1] = arguments[c];
    a.push(new N(E, b)), a.length === 1 && !d && s(S);
  };
  function N(E, b) {
    this.fun = E, this.array = b;
  }
  N.prototype.run = function() {
    this.fun.apply(null, this.array);
  }, i.title = "browser", i.browser = true, i.env = {}, i.argv = [], i.version = "", i.versions = {};
  function I() {
  }
  return i.on = I, i.addListener = I, i.once = I, i.off = I, i.removeListener = I, i.removeAllListeners = I, i.emit = I, i.prependListener = I, i.prependOnceListener = I, i.listeners = function(E) {
    return [];
  }, i.binding = function(E) {
    throw new Error("process.binding is not supported");
  }, i.cwd = function() {
    return "/";
  }, i.chdir = function(E) {
    throw new Error("process.chdir is not supported");
  }, i.umask = function() {
    return 0;
  }, Ht.exports;
}
var zt;
var Hr;
function Le() {
  if (Hr) return zt;
  Hr = 1;
  const { SymbolAsyncIterator: i, SymbolIterator: e, SymbolFor: t } = ce(), r = t("nodejs.stream.destroyed"), n = t("nodejs.stream.errored"), s = t("nodejs.stream.readable"), o = t("nodejs.stream.writable"), a = t("nodejs.stream.disturbed"), d = t("nodejs.webstream.isClosedPromise"), u = t("nodejs.webstream.controllerErrorFunction");
  function _(p, M = false) {
    var Y;
    return !!(p && typeof p.pipe == "function" && typeof p.on == "function" && (!M || typeof p.pause == "function" && typeof p.resume == "function") && (!p._writableState || ((Y = p._readableState) === null || Y === void 0 ? void 0 : Y.readable) !== false) && // Duplex
    (!p._writableState || p._readableState));
  }
  function h(p) {
    var M;
    return !!(p && typeof p.write == "function" && typeof p.on == "function" && (!p._readableState || ((M = p._writableState) === null || M === void 0 ? void 0 : M.writable) !== false));
  }
  function S(p) {
    return !!(p && typeof p.pipe == "function" && p._readableState && typeof p.on == "function" && typeof p.write == "function");
  }
  function N(p) {
    return p && (p._readableState || p._writableState || typeof p.write == "function" && typeof p.on == "function" || typeof p.pipe == "function" && typeof p.on == "function");
  }
  function I(p) {
    return !!(p && !N(p) && typeof p.pipeThrough == "function" && typeof p.getReader == "function" && typeof p.cancel == "function");
  }
  function E(p) {
    return !!(p && !N(p) && typeof p.getWriter == "function" && typeof p.abort == "function");
  }
  function b(p) {
    return !!(p && !N(p) && typeof p.readable == "object" && typeof p.writable == "object");
  }
  function c(p) {
    return I(p) || E(p) || b(p);
  }
  function y(p, M) {
    return p == null ? false : M === true ? typeof p[i] == "function" : M === false ? typeof p[e] == "function" : typeof p[i] == "function" || typeof p[e] == "function";
  }
  function g(p) {
    if (!N(p)) return null;
    const M = p._writableState, Y = p._readableState, O = M || Y;
    return !!(p.destroyed || p[r] || O != null && O.destroyed);
  }
  function v(p) {
    if (!h(p)) return null;
    if (p.writableEnded === true) return true;
    const M = p._writableState;
    return M != null && M.errored ? false : typeof M?.ended != "boolean" ? null : M.ended;
  }
  function x(p, M) {
    if (!h(p)) return null;
    if (p.writableFinished === true) return true;
    const Y = p._writableState;
    return Y != null && Y.errored ? false : typeof Y?.finished != "boolean" ? null : !!(Y.finished || M === false && Y.ended === true && Y.length === 0);
  }
  function $(p) {
    if (!_(p)) return null;
    if (p.readableEnded === true) return true;
    const M = p._readableState;
    return !M || M.errored ? false : typeof M?.ended != "boolean" ? null : M.ended;
  }
  function q(p, M) {
    if (!_(p)) return null;
    const Y = p._readableState;
    return Y != null && Y.errored ? false : typeof Y?.endEmitted != "boolean" ? null : !!(Y.endEmitted || M === false && Y.ended === true && Y.length === 0);
  }
  function D(p) {
    return p && p[s] != null ? p[s] : typeof p?.readable != "boolean" ? null : g(p) ? false : _(p) && p.readable && !q(p);
  }
  function re(p) {
    return p && p[o] != null ? p[o] : typeof p?.writable != "boolean" ? null : g(p) ? false : h(p) && p.writable && !v(p);
  }
  function A(p, M) {
    return N(p) ? g(p) ? true : !(M?.readable !== false && D(p) || M?.writable !== false && re(p)) : null;
  }
  function j(p) {
    var M, Y;
    return N(p) ? p.writableErrored ? p.writableErrored : (M = (Y = p._writableState) === null || Y === void 0 ? void 0 : Y.errored) !== null && M !== void 0 ? M : null : null;
  }
  function B(p) {
    var M, Y;
    return N(p) ? p.readableErrored ? p.readableErrored : (M = (Y = p._readableState) === null || Y === void 0 ? void 0 : Y.errored) !== null && M !== void 0 ? M : null : null;
  }
  function T(p) {
    if (!N(p))
      return null;
    if (typeof p.closed == "boolean")
      return p.closed;
    const M = p._writableState, Y = p._readableState;
    return typeof M?.closed == "boolean" || typeof Y?.closed == "boolean" ? M?.closed || Y?.closed : typeof p._closed == "boolean" && V(p) ? p._closed : null;
  }
  function V(p) {
    return typeof p._closed == "boolean" && typeof p._defaultKeepAlive == "boolean" && typeof p._removedConnection == "boolean" && typeof p._removedContLen == "boolean";
  }
  function J(p) {
    return typeof p._sent100 == "boolean" && V(p);
  }
  function ne(p) {
    var M;
    return typeof p._consuming == "boolean" && typeof p._dumped == "boolean" && ((M = p.req) === null || M === void 0 ? void 0 : M.upgradeOrConnect) === void 0;
  }
  function le(p) {
    if (!N(p)) return null;
    const M = p._writableState, Y = p._readableState, O = M || Y;
    return !O && J(p) || !!(O && O.autoDestroy && O.emitClose && O.closed === false);
  }
  function C(p) {
    var M;
    return !!(p && ((M = p[a]) !== null && M !== void 0 ? M : p.readableDidRead || p.readableAborted));
  }
  function ee(p) {
    var M, Y, O, X, ie, ue, oe, L, F, Z;
    return !!(p && ((M = (Y = (O = (X = (ie = (ue = p[n]) !== null && ue !== void 0 ? ue : p.readableErrored) !== null && ie !== void 0 ? ie : p.writableErrored) !== null && X !== void 0 ? X : (oe = p._readableState) === null || oe === void 0 ? void 0 : oe.errorEmitted) !== null && O !== void 0 ? O : (L = p._writableState) === null || L === void 0 ? void 0 : L.errorEmitted) !== null && Y !== void 0 ? Y : (F = p._readableState) === null || F === void 0 ? void 0 : F.errored) !== null && M !== void 0 ? M : !((Z = p._writableState) === null || Z === void 0) && Z.errored));
  }
  return zt = {
    isDestroyed: g,
    kIsDestroyed: r,
    isDisturbed: C,
    kIsDisturbed: a,
    isErrored: ee,
    kIsErrored: n,
    isReadable: D,
    kIsReadable: s,
    kIsClosedPromise: d,
    kControllerErrorFunction: u,
    kIsWritable: o,
    isClosed: T,
    isDuplexNodeStream: S,
    isFinished: A,
    isIterable: y,
    isReadableNodeStream: _,
    isReadableStream: I,
    isReadableEnded: $,
    isReadableFinished: q,
    isReadableErrored: B,
    isNodeStream: N,
    isWebStream: c,
    isWritable: re,
    isWritableNodeStream: h,
    isWritableStream: E,
    isWritableEnded: v,
    isWritableFinished: x,
    isWritableErrored: j,
    isServerRequest: ne,
    isServerResponse: J,
    willEmitClose: le,
    isTransformStream: b
  }, zt;
}
var zr;
function Ce() {
  if (zr) return mt.exports;
  zr = 1;
  const i = qe(), { AbortError: e, codes: t } = ge(), { ERR_INVALID_ARG_TYPE: r, ERR_STREAM_PREMATURE_CLOSE: n } = t, { kEmptyObject: s, once: o } = we(), { validateAbortSignal: a, validateFunction: d, validateObject: u, validateBoolean: _ } = ct(), { Promise: h, PromisePrototypeThen: S, SymbolDispose: N } = ce(), {
    isClosed: I,
    isReadable: E,
    isReadableNodeStream: b,
    isReadableStream: c,
    isReadableFinished: y,
    isReadableErrored: g,
    isWritable: v,
    isWritableNodeStream: x,
    isWritableStream: $,
    isWritableFinished: q,
    isWritableErrored: D,
    isNodeStream: re,
    willEmitClose: A,
    kIsClosedPromise: j
  } = Le();
  let B;
  function T(C) {
    return C.setHeader && typeof C.abort == "function";
  }
  const V = () => {
  };
  function J(C, ee, p) {
    var M, Y;
    if (arguments.length === 2 ? (p = ee, ee = s) : ee == null ? ee = s : u(ee, "options"), d(p, "callback"), a(ee.signal, "options.signal"), p = o(p), c(C) || $(C))
      return ne(C, ee, p);
    if (!re(C))
      throw new r("stream", ["ReadableStream", "WritableStream", "Stream"], C);
    const O = (M = ee.readable) !== null && M !== void 0 ? M : b(C), X = (Y = ee.writable) !== null && Y !== void 0 ? Y : x(C), ie = C._writableState, ue = C._readableState, oe = () => {
      C.writable || Z();
    };
    let L = A(C) && b(C) === O && x(C) === X, F = q(C, false);
    const Z = () => {
      F = true, C.destroyed && (L = false), !(L && (!C.readable || O)) && (!O || ae) && p.call(C);
    };
    let ae = y(C, false);
    const se = () => {
      ae = true, C.destroyed && (L = false), !(L && (!C.writable || X)) && (!X || F) && p.call(C);
    }, m = (w) => {
      p.call(C, w);
    };
    let R = I(C);
    const P = () => {
      R = true;
      const w = D(C) || g(C);
      if (w && typeof w != "boolean")
        return p.call(C, w);
      if (O && !ae && b(C, true) && !y(C, false))
        return p.call(C, new n());
      if (X && !F && !q(C, false))
        return p.call(C, new n());
      p.call(C);
    }, H = () => {
      R = true;
      const w = D(C) || g(C);
      if (w && typeof w != "boolean")
        return p.call(C, w);
      p.call(C);
    }, Q = () => {
      C.req.on("finish", Z);
    };
    T(C) ? (C.on("complete", Z), L || C.on("abort", P), C.req ? Q() : C.on("request", Q)) : X && !ie && (C.on("end", oe), C.on("close", oe)), !L && typeof C.aborted == "boolean" && C.on("aborted", P), C.on("end", se), C.on("finish", Z), ee.error !== false && C.on("error", m), C.on("close", P), R ? i.nextTick(P) : ie != null && ie.errorEmitted || ue != null && ue.errorEmitted ? L || i.nextTick(H) : (!O && (!L || E(C)) && (F || v(C) === false) || !X && (!L || v(C)) && (ae || E(C) === false) || ue && C.req && C.aborted) && i.nextTick(H);
    const U = () => {
      p = V, C.removeListener("aborted", P), C.removeListener("complete", Z), C.removeListener("abort", P), C.removeListener("request", Q), C.req && C.req.removeListener("finish", Z), C.removeListener("end", oe), C.removeListener("close", oe), C.removeListener("finish", Z), C.removeListener("end", se), C.removeListener("error", m), C.removeListener("close", P);
    };
    if (ee.signal && !R) {
      const w = () => {
        const W = p;
        U(), W.call(
          C,
          new e(void 0, {
            cause: ee.signal.reason
          })
        );
      };
      if (ee.signal.aborted)
        i.nextTick(w);
      else {
        B = B || we().addAbortListener;
        const W = B(ee.signal, w), G = p;
        p = o((...k) => {
          W[N](), G.apply(C, k);
        });
      }
    }
    return U;
  }
  function ne(C, ee, p) {
    let M = false, Y = V;
    if (ee.signal)
      if (Y = () => {
        M = true, p.call(
          C,
          new e(void 0, {
            cause: ee.signal.reason
          })
        );
      }, ee.signal.aborted)
        i.nextTick(Y);
      else {
        B = B || we().addAbortListener;
        const X = B(ee.signal, Y), ie = p;
        p = o((...ue) => {
          X[N](), ie.apply(C, ue);
        });
      }
    const O = (...X) => {
      M || i.nextTick(() => p.apply(C, X));
    };
    return S(C[j].promise, O, O), V;
  }
  function le(C, ee) {
    var p;
    let M = false;
    return ee === null && (ee = s), (p = ee) !== null && p !== void 0 && p.cleanup && (_(ee.cleanup, "cleanup"), M = ee.cleanup), new h((Y, O) => {
      const X = J(C, ee, (ie) => {
        M && X(), ie ? O(ie) : Y();
      });
    });
  }
  return mt.exports = J, mt.exports.finished = le, mt.exports;
}
var Kt;
var Kr;
function Ye() {
  if (Kr) return Kt;
  Kr = 1;
  const i = qe(), {
    aggregateTwoErrors: e,
    codes: { ERR_MULTIPLE_CALLBACK: t },
    AbortError: r
  } = ge(), { Symbol: n } = ce(), { kIsDestroyed: s, isDestroyed: o, isFinished: a, isServerRequest: d } = Le(), u = n("kDestroy"), _ = n("kConstruct");
  function h(A, j, B) {
    A && (A.stack, j && !j.errored && (j.errored = A), B && !B.errored && (B.errored = A));
  }
  function S(A, j) {
    const B = this._readableState, T = this._writableState, V = T || B;
    return T != null && T.destroyed || B != null && B.destroyed ? (typeof j == "function" && j(), this) : (h(A, T, B), T && (T.destroyed = true), B && (B.destroyed = true), V.constructed ? N(this, A, j) : this.once(u, function(J) {
      N(this, e(J, A), j);
    }), this);
  }
  function N(A, j, B) {
    let T = false;
    function V(J) {
      if (T)
        return;
      T = true;
      const ne = A._readableState, le = A._writableState;
      h(J, le, ne), le && (le.closed = true), ne && (ne.closed = true), typeof B == "function" && B(J), J ? i.nextTick(I, A, J) : i.nextTick(E, A);
    }
    try {
      A._destroy(j || null, V);
    } catch (J) {
      V(J);
    }
  }
  function I(A, j) {
    b(A, j), E(A);
  }
  function E(A) {
    const j = A._readableState, B = A._writableState;
    B && (B.closeEmitted = true), j && (j.closeEmitted = true), (B != null && B.emitClose || j != null && j.emitClose) && A.emit("close");
  }
  function b(A, j) {
    const B = A._readableState, T = A._writableState;
    T != null && T.errorEmitted || B != null && B.errorEmitted || (T && (T.errorEmitted = true), B && (B.errorEmitted = true), A.emit("error", j));
  }
  function c() {
    const A = this._readableState, j = this._writableState;
    A && (A.constructed = true, A.closed = false, A.closeEmitted = false, A.destroyed = false, A.errored = null, A.errorEmitted = false, A.reading = false, A.ended = A.readable === false, A.endEmitted = A.readable === false), j && (j.constructed = true, j.destroyed = false, j.closed = false, j.closeEmitted = false, j.errored = null, j.errorEmitted = false, j.finalCalled = false, j.prefinished = false, j.ended = j.writable === false, j.ending = j.writable === false, j.finished = j.writable === false);
  }
  function y(A, j, B) {
    const T = A._readableState, V = A._writableState;
    if (V != null && V.destroyed || T != null && T.destroyed)
      return this;
    T != null && T.autoDestroy || V != null && V.autoDestroy ? A.destroy(j) : j && (j.stack, V && !V.errored && (V.errored = j), T && !T.errored && (T.errored = j), B ? i.nextTick(b, A, j) : b(A, j));
  }
  function g(A, j) {
    if (typeof A._construct != "function")
      return;
    const B = A._readableState, T = A._writableState;
    B && (B.constructed = false), T && (T.constructed = false), A.once(_, j), !(A.listenerCount(_) > 1) && i.nextTick(v, A);
  }
  function v(A) {
    let j = false;
    function B(T) {
      if (j) {
        y(A, T ?? new t());
        return;
      }
      j = true;
      const V = A._readableState, J = A._writableState, ne = J || V;
      V && (V.constructed = true), J && (J.constructed = true), ne.destroyed ? A.emit(u, T) : T ? y(A, T, true) : i.nextTick(x, A);
    }
    try {
      A._construct((T) => {
        i.nextTick(B, T);
      });
    } catch (T) {
      i.nextTick(B, T);
    }
  }
  function x(A) {
    A.emit(_);
  }
  function $(A) {
    return A?.setHeader && typeof A.abort == "function";
  }
  function q(A) {
    A.emit("close");
  }
  function D(A, j) {
    A.emit("error", j), i.nextTick(q, A);
  }
  function re(A, j) {
    !A || o(A) || (!j && !a(A) && (j = new r()), d(A) ? (A.socket = null, A.destroy(j)) : $(A) ? A.abort() : $(A.req) ? A.req.abort() : typeof A.destroy == "function" ? A.destroy(j) : typeof A.close == "function" ? A.close() : j ? i.nextTick(D, A, j) : i.nextTick(q, A), A.destroyed || (A[s] = true));
  }
  return Kt = {
    construct: g,
    destroyer: re,
    destroy: S,
    undestroy: c,
    errorOrDestroy: y
  }, Kt;
}
var Vt;
var Vr;
function gr() {
  if (Vr) return Vt;
  Vr = 1;
  const { ArrayIsArray: i, ObjectSetPrototypeOf: e } = ce(), { EventEmitter: t } = Nt();
  function r(s) {
    t.call(this, s);
  }
  e(r.prototype, t.prototype), e(r, t), r.prototype.pipe = function(s, o) {
    const a = this;
    function d(E) {
      s.writable && s.write(E) === false && a.pause && a.pause();
    }
    a.on("data", d);
    function u() {
      a.readable && a.resume && a.resume();
    }
    s.on("drain", u), !s._isStdio && (!o || o.end !== false) && (a.on("end", h), a.on("close", S));
    let _ = false;
    function h() {
      _ || (_ = true, s.end());
    }
    function S() {
      _ || (_ = true, typeof s.destroy == "function" && s.destroy());
    }
    function N(E) {
      I(), t.listenerCount(this, "error") === 0 && this.emit("error", E);
    }
    n(a, "error", N), n(s, "error", N);
    function I() {
      a.removeListener("data", d), s.removeListener("drain", u), a.removeListener("end", h), a.removeListener("close", S), a.removeListener("error", N), s.removeListener("error", N), a.removeListener("end", I), a.removeListener("close", I), s.removeListener("close", I);
    }
    return a.on("end", I), a.on("close", I), s.on("close", I), s.emit("pipe", a), s;
  };
  function n(s, o, a) {
    if (typeof s.prependListener == "function") return s.prependListener(o, a);
    !s._events || !s._events[o] ? s.on(o, a) : i(s._events[o]) ? s._events[o].unshift(a) : s._events[o] = [a, s._events[o]];
  }
  return Vt = {
    Stream: r,
    prependListener: n
  }, Vt;
}
var Yt = { exports: {} };
var Yr;
function jt() {
  return Yr || (Yr = 1, (function(i) {
    const { SymbolDispose: e } = ce(), { AbortError: t, codes: r } = ge(), { isNodeStream: n, isWebStream: s, kControllerErrorFunction: o } = Le(), a = Ce(), { ERR_INVALID_ARG_TYPE: d } = r;
    let u;
    const _ = (h, S) => {
      if (typeof h != "object" || !("aborted" in h))
        throw new d(S, "AbortSignal", h);
    };
    i.exports.addAbortSignal = function(S, N) {
      if (_(S, "signal"), !n(N) && !s(N))
        throw new d("stream", ["ReadableStream", "WritableStream", "Stream"], N);
      return i.exports.addAbortSignalNoValidate(S, N);
    }, i.exports.addAbortSignalNoValidate = function(h, S) {
      if (typeof h != "object" || !("aborted" in h))
        return S;
      const N = n(S) ? () => {
        S.destroy(
          new t(void 0, {
            cause: h.reason
          })
        );
      } : () => {
        S[o](
          new t(void 0, {
            cause: h.reason
          })
        );
      };
      if (h.aborted)
        N();
      else {
        u = u || we().addAbortListener;
        const I = u(h, N);
        a(S, I[e]);
      }
      return S;
    };
  })(Yt)), Yt.exports;
}
var Zt;
var Zr;
function _i() {
  if (Zr) return Zt;
  Zr = 1;
  const { StringPrototypeSlice: i, SymbolIterator: e, TypedArrayPrototypeSet: t, Uint8Array: r } = ce(), { Buffer: n } = import_buffer.default, { inspect: s } = we();
  return Zt = class {
    constructor() {
      this.head = null, this.tail = null, this.length = 0;
    }
    push(a) {
      const d = {
        data: a,
        next: null
      };
      this.length > 0 ? this.tail.next = d : this.head = d, this.tail = d, ++this.length;
    }
    unshift(a) {
      const d = {
        data: a,
        next: this.head
      };
      this.length === 0 && (this.tail = d), this.head = d, ++this.length;
    }
    shift() {
      if (this.length === 0) return;
      const a = this.head.data;
      return this.length === 1 ? this.head = this.tail = null : this.head = this.head.next, --this.length, a;
    }
    clear() {
      this.head = this.tail = null, this.length = 0;
    }
    join(a) {
      if (this.length === 0) return "";
      let d = this.head, u = "" + d.data;
      for (; (d = d.next) !== null; ) u += a + d.data;
      return u;
    }
    concat(a) {
      if (this.length === 0) return n.alloc(0);
      const d = n.allocUnsafe(a >>> 0);
      let u = this.head, _ = 0;
      for (; u; )
        t(d, u.data, _), _ += u.data.length, u = u.next;
      return d;
    }
    // Consumes a specified amount of bytes or characters from the buffered data.
    consume(a, d) {
      const u = this.head.data;
      if (a < u.length) {
        const _ = u.slice(0, a);
        return this.head.data = u.slice(a), _;
      }
      return a === u.length ? this.shift() : d ? this._getString(a) : this._getBuffer(a);
    }
    first() {
      return this.head.data;
    }
    *[e]() {
      for (let a = this.head; a; a = a.next)
        yield a.data;
    }
    // Consumes a specified amount of characters from the buffered data.
    _getString(a) {
      let d = "", u = this.head, _ = 0;
      do {
        const h = u.data;
        if (a > h.length)
          d += h, a -= h.length;
        else {
          a === h.length ? (d += h, ++_, u.next ? this.head = u.next : this.head = this.tail = null) : (d += i(h, 0, a), this.head = u, u.data = i(h, a));
          break;
        }
        ++_;
      } while ((u = u.next) !== null);
      return this.length -= _, d;
    }
    // Consumes a specified amount of bytes from the buffered data.
    _getBuffer(a) {
      const d = n.allocUnsafe(a), u = a;
      let _ = this.head, h = 0;
      do {
        const S = _.data;
        if (a > S.length)
          t(d, S, u - a), a -= S.length;
        else {
          a === S.length ? (t(d, S, u - a), ++h, _.next ? this.head = _.next : this.head = this.tail = null) : (t(d, new r(S.buffer, S.byteOffset, a), u - a), this.head = _, _.data = S.slice(a));
          break;
        }
        ++h;
      } while ((_ = _.next) !== null);
      return this.length -= h, d;
    }
    // Make sure the linked list only shows the minimal necessary information.
    [/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")](a, d) {
      return s(this, {
        ...d,
        // Only inspect one level.
        depth: 0,
        // It should not recurse.
        customInspect: false
      });
    }
  }, Zt;
}
var Jt;
var Jr;
function Pt() {
  if (Jr) return Jt;
  Jr = 1;
  const { MathFloor: i, NumberIsInteger: e } = ce(), { validateInteger: t } = ct(), { ERR_INVALID_ARG_VALUE: r } = ge().codes;
  let n = 16 * 1024, s = 16;
  function o(_, h, S) {
    return _.highWaterMark != null ? _.highWaterMark : h ? _[S] : null;
  }
  function a(_) {
    return _ ? s : n;
  }
  function d(_, h) {
    t(h, "value", 0), _ ? s = h : n = h;
  }
  function u(_, h, S, N) {
    const I = o(h, N, S);
    if (I != null) {
      if (!e(I) || I < 0) {
        const E = N ? `options.${S}` : "options.highWaterMark";
        throw new r(E, I);
      }
      return i(I);
    }
    return a(_.objectMode);
  }
  return Jt = {
    getHighWaterMark: u,
    getDefaultHighWaterMark: a,
    setDefaultHighWaterMark: d
  }, Jt;
}
var Xt = {};
var St = { exports: {} };
var Xr;
function bi() {
  return Xr || (Xr = 1, (function(i, e) {
    var t = import_buffer.default, r = t.Buffer;
    function n(o, a) {
      for (var d in o)
        a[d] = o[d];
    }
    r.from && r.alloc && r.allocUnsafe && r.allocUnsafeSlow ? i.exports = t : (n(t, e), e.Buffer = s);
    function s(o, a, d) {
      return r(o, a, d);
    }
    s.prototype = Object.create(r.prototype), n(r, s), s.from = function(o, a, d) {
      if (typeof o == "number")
        throw new TypeError("Argument must not be a number");
      return r(o, a, d);
    }, s.alloc = function(o, a, d) {
      if (typeof o != "number")
        throw new TypeError("Argument must be a number");
      var u = r(o);
      return a !== void 0 ? typeof d == "string" ? u.fill(a, d) : u.fill(a) : u.fill(0), u;
    }, s.allocUnsafe = function(o) {
      if (typeof o != "number")
        throw new TypeError("Argument must be a number");
      return r(o);
    }, s.allocUnsafeSlow = function(o) {
      if (typeof o != "number")
        throw new TypeError("Argument must be a number");
      return t.SlowBuffer(o);
    };
  })(St, St.exports)), St.exports;
}
var en;
function gi() {
  if (en) return Xt;
  en = 1;
  var i = bi().Buffer, e = i.isEncoding || function(c) {
    switch (c = "" + c, c && c.toLowerCase()) {
      case "hex":
      case "utf8":
      case "utf-8":
      case "ascii":
      case "binary":
      case "base64":
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
      case "raw":
        return true;
      default:
        return false;
    }
  };
  function t(c) {
    if (!c) return "utf8";
    for (var y; ; )
      switch (c) {
        case "utf8":
        case "utf-8":
          return "utf8";
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return "utf16le";
        case "latin1":
        case "binary":
          return "latin1";
        case "base64":
        case "ascii":
        case "hex":
          return c;
        default:
          if (y) return;
          c = ("" + c).toLowerCase(), y = true;
      }
  }
  function r(c) {
    var y = t(c);
    if (typeof y != "string" && (i.isEncoding === e || !e(c))) throw new Error("Unknown encoding: " + c);
    return y || c;
  }
  Xt.StringDecoder = n;
  function n(c) {
    this.encoding = r(c);
    var y;
    switch (this.encoding) {
      case "utf16le":
        this.text = h, this.end = S, y = 4;
        break;
      case "utf8":
        this.fillLast = d, y = 4;
        break;
      case "base64":
        this.text = N, this.end = I, y = 3;
        break;
      default:
        this.write = E, this.end = b;
        return;
    }
    this.lastNeed = 0, this.lastTotal = 0, this.lastChar = i.allocUnsafe(y);
  }
  n.prototype.write = function(c) {
    if (c.length === 0) return "";
    var y, g;
    if (this.lastNeed) {
      if (y = this.fillLast(c), y === void 0) return "";
      g = this.lastNeed, this.lastNeed = 0;
    } else
      g = 0;
    return g < c.length ? y ? y + this.text(c, g) : this.text(c, g) : y || "";
  }, n.prototype.end = _, n.prototype.text = u, n.prototype.fillLast = function(c) {
    if (this.lastNeed <= c.length)
      return c.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
    c.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, c.length), this.lastNeed -= c.length;
  };
  function s(c) {
    return c <= 127 ? 0 : c >> 5 === 6 ? 2 : c >> 4 === 14 ? 3 : c >> 3 === 30 ? 4 : c >> 6 === 2 ? -1 : -2;
  }
  function o(c, y, g) {
    var v = y.length - 1;
    if (v < g) return 0;
    var x = s(y[v]);
    return x >= 0 ? (x > 0 && (c.lastNeed = x - 1), x) : --v < g || x === -2 ? 0 : (x = s(y[v]), x >= 0 ? (x > 0 && (c.lastNeed = x - 2), x) : --v < g || x === -2 ? 0 : (x = s(y[v]), x >= 0 ? (x > 0 && (x === 2 ? x = 0 : c.lastNeed = x - 3), x) : 0));
  }
  function a(c, y, g) {
    if ((y[0] & 192) !== 128)
      return c.lastNeed = 0, "\uFFFD";
    if (c.lastNeed > 1 && y.length > 1) {
      if ((y[1] & 192) !== 128)
        return c.lastNeed = 1, "\uFFFD";
      if (c.lastNeed > 2 && y.length > 2 && (y[2] & 192) !== 128)
        return c.lastNeed = 2, "\uFFFD";
    }
  }
  function d(c) {
    var y = this.lastTotal - this.lastNeed, g = a(this, c);
    if (g !== void 0) return g;
    if (this.lastNeed <= c.length)
      return c.copy(this.lastChar, y, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
    c.copy(this.lastChar, y, 0, c.length), this.lastNeed -= c.length;
  }
  function u(c, y) {
    var g = o(this, c, y);
    if (!this.lastNeed) return c.toString("utf8", y);
    this.lastTotal = g;
    var v = c.length - (g - this.lastNeed);
    return c.copy(this.lastChar, 0, v), c.toString("utf8", y, v);
  }
  function _(c) {
    var y = c && c.length ? this.write(c) : "";
    return this.lastNeed ? y + "\uFFFD" : y;
  }
  function h(c, y) {
    if ((c.length - y) % 2 === 0) {
      var g = c.toString("utf16le", y);
      if (g) {
        var v = g.charCodeAt(g.length - 1);
        if (v >= 55296 && v <= 56319)
          return this.lastNeed = 2, this.lastTotal = 4, this.lastChar[0] = c[c.length - 2], this.lastChar[1] = c[c.length - 1], g.slice(0, -1);
      }
      return g;
    }
    return this.lastNeed = 1, this.lastTotal = 2, this.lastChar[0] = c[c.length - 1], c.toString("utf16le", y, c.length - 1);
  }
  function S(c) {
    var y = c && c.length ? this.write(c) : "";
    if (this.lastNeed) {
      var g = this.lastTotal - this.lastNeed;
      return y + this.lastChar.toString("utf16le", 0, g);
    }
    return y;
  }
  function N(c, y) {
    var g = (c.length - y) % 3;
    return g === 0 ? c.toString("base64", y) : (this.lastNeed = 3 - g, this.lastTotal = 3, g === 1 ? this.lastChar[0] = c[c.length - 1] : (this.lastChar[0] = c[c.length - 2], this.lastChar[1] = c[c.length - 1]), c.toString("base64", y, c.length - g));
  }
  function I(c) {
    var y = c && c.length ? this.write(c) : "";
    return this.lastNeed ? y + this.lastChar.toString("base64", 0, 3 - this.lastNeed) : y;
  }
  function E(c) {
    return c.toString(this.encoding);
  }
  function b(c) {
    return c && c.length ? this.write(c) : "";
  }
  return Xt;
}
var er;
var tn;
function An() {
  if (tn) return er;
  tn = 1;
  const i = qe(), { PromisePrototypeThen: e, SymbolAsyncIterator: t, SymbolIterator: r } = ce(), { Buffer: n } = import_buffer.default, { ERR_INVALID_ARG_TYPE: s, ERR_STREAM_NULL_VALUES: o } = ge().codes;
  function a(d, u, _) {
    let h;
    if (typeof u == "string" || u instanceof n)
      return new d({
        objectMode: true,
        ..._,
        read() {
          this.push(u), this.push(null);
        }
      });
    let S;
    if (u && u[t])
      S = true, h = u[t]();
    else if (u && u[r])
      S = false, h = u[r]();
    else
      throw new s("iterable", ["Iterable"], u);
    const N = new d({
      objectMode: true,
      highWaterMark: 1,
      // TODO(ronag): What options should be allowed?
      ..._
    });
    let I = false;
    N._read = function() {
      I || (I = true, b());
    }, N._destroy = function(c, y) {
      e(
        E(c),
        () => i.nextTick(y, c),
        // nextTick is here in case cb throws
        (g) => i.nextTick(y, g || c)
      );
    };
    async function E(c) {
      const y = c != null, g = typeof h.throw == "function";
      if (y && g) {
        const { value: v, done: x } = await h.throw(c);
        if (await v, x)
          return;
      }
      if (typeof h.return == "function") {
        const { value: v } = await h.return();
        await v;
      }
    }
    async function b() {
      for (; ; ) {
        try {
          const { value: c, done: y } = S ? await h.next() : h.next();
          if (y)
            N.push(null);
          else {
            const g = c && typeof c.then == "function" ? await c : c;
            if (g === null)
              throw I = false, new o();
            if (N.push(g))
              continue;
            I = false;
          }
        } catch (c) {
          N.destroy(c);
        }
        break;
      }
    }
    return N;
  }
  return er = a, er;
}
var tr;
var rn;
function Lt() {
  if (rn) return tr;
  rn = 1;
  const i = qe(), {
    ArrayPrototypeIndexOf: e,
    NumberIsInteger: t,
    NumberIsNaN: r,
    NumberParseInt: n,
    ObjectDefineProperties: s,
    ObjectKeys: o,
    ObjectSetPrototypeOf: a,
    Promise: d,
    SafeSet: u,
    SymbolAsyncDispose: _,
    SymbolAsyncIterator: h,
    Symbol: S
  } = ce();
  tr = k, k.ReadableState = G;
  const { EventEmitter: N } = Nt(), { Stream: I, prependListener: E } = gr(), { Buffer: b } = import_buffer.default, { addAbortSignal: c } = jt(), y = Ce();
  let g = we().debuglog("stream", (l) => {
    g = l;
  });
  const v = _i(), x = Ye(), { getHighWaterMark: $, getDefaultHighWaterMark: q } = Pt(), {
    aggregateTwoErrors: D,
    codes: {
      ERR_INVALID_ARG_TYPE: re,
      ERR_METHOD_NOT_IMPLEMENTED: A,
      ERR_OUT_OF_RANGE: j,
      ERR_STREAM_PUSH_AFTER_EOF: B,
      ERR_STREAM_UNSHIFT_AFTER_END_EVENT: T
    },
    AbortError: V
  } = ge(), { validateObject: J } = ct(), ne = S("kPaused"), { StringDecoder: le } = gi(), C = An();
  a(k.prototype, I.prototype), a(k, I);
  const ee = () => {
  }, { errorOrDestroy: p } = x, M = 1, Y = 2, O = 4, X = 8, ie = 16, ue = 32, oe = 64, L = 128, F = 256, Z = 512, ae = 1024, se = 2048, m = 4096, R = 8192, P = 16384, H = 32768, Q = 65536, U = 1 << 17, w = 1 << 18;
  function W(l) {
    return {
      enumerable: false,
      get() {
        return (this.state & l) !== 0;
      },
      set(f) {
        f ? this.state |= l : this.state &= ~l;
      }
    };
  }
  s(G.prototype, {
    objectMode: W(M),
    ended: W(Y),
    endEmitted: W(O),
    reading: W(X),
    // Stream is still being constructed and cannot be
    // destroyed until construction finished or failed.
    // Async construction is opt in, therefore we start as
    // constructed.
    constructed: W(ie),
    // A flag to be able to tell if the event 'readable'/'data' is emitted
    // immediately, or on a later tick.  We set this to true at first, because
    // any actions that shouldn't happen until "later" should generally also
    // not happen before the first read call.
    sync: W(ue),
    // Whenever we return null, then we set a flag to say
    // that we're awaiting a 'readable' event emission.
    needReadable: W(oe),
    emittedReadable: W(L),
    readableListening: W(F),
    resumeScheduled: W(Z),
    // True if the error was already emitted and should not be thrown again.
    errorEmitted: W(ae),
    emitClose: W(se),
    autoDestroy: W(m),
    // Has it been destroyed.
    destroyed: W(R),
    // Indicates whether the stream has finished destroying.
    closed: W(P),
    // True if close has been emitted or would have been emitted
    // depending on emitClose.
    closeEmitted: W(H),
    multiAwaitDrain: W(Q),
    // If true, a maybeReadMore has been scheduled.
    readingMore: W(U),
    dataEmitted: W(w)
  });
  function G(l, f, z) {
    typeof z != "boolean" && (z = f instanceof Pe()), this.state = se | m | ie | ue, l && l.objectMode && (this.state |= M), z && l && l.readableObjectMode && (this.state |= M), this.highWaterMark = l ? $(this, l, "readableHighWaterMark", z) : q(false), this.buffer = new v(), this.length = 0, this.pipes = [], this.flowing = null, this[ne] = null, l && l.emitClose === false && (this.state &= ~se), l && l.autoDestroy === false && (this.state &= ~m), this.errored = null, this.defaultEncoding = l && l.defaultEncoding || "utf8", this.awaitDrainWriters = null, this.decoder = null, this.encoding = null, l && l.encoding && (this.decoder = new le(l.encoding), this.encoding = l.encoding);
  }
  function k(l) {
    if (!(this instanceof k)) return new k(l);
    const f = this instanceof Pe();
    this._readableState = new G(l, this, f), l && (typeof l.read == "function" && (this._read = l.read), typeof l.destroy == "function" && (this._destroy = l.destroy), typeof l.construct == "function" && (this._construct = l.construct), l.signal && !f && c(l.signal, this)), I.call(this, l), x.construct(this, () => {
      this._readableState.needReadable && Se(this, this._readableState);
    });
  }
  k.prototype.destroy = x.destroy, k.prototype._undestroy = x.undestroy, k.prototype._destroy = function(l, f) {
    f(l);
  }, k.prototype[N.captureRejectionSymbol] = function(l) {
    this.destroy(l);
  }, k.prototype[_] = function() {
    let l;
    return this.destroyed || (l = this.readableEnded ? null : new V(), this.destroy(l)), new d((f, z) => y(this, (K) => K && K !== l ? z(K) : f(null)));
  }, k.prototype.push = function(l, f) {
    return fe(this, l, f, false);
  }, k.prototype.unshift = function(l, f) {
    return fe(this, l, f, true);
  };
  function fe(l, f, z, K) {
    g("readableAddChunk", f);
    const te = l._readableState;
    let be;
    if ((te.state & M) === 0 && (typeof f == "string" ? (z = z || te.defaultEncoding, te.encoding !== z && (K && te.encoding ? f = b.from(f, z).toString(te.encoding) : (f = b.from(f, z), z = ""))) : f instanceof b ? z = "" : I._isUint8Array(f) ? (f = I._uint8ArrayToBuffer(f), z = "") : f != null && (be = new re("chunk", ["string", "Buffer", "Uint8Array"], f))), be)
      p(l, be);
    else if (f === null)
      te.state &= ~X, Te(l, te);
    else if ((te.state & M) !== 0 || f && f.length > 0)
      if (K)
        if ((te.state & O) !== 0) p(l, new T());
        else {
          if (te.destroyed || te.errored) return false;
          ye(l, te, f, true);
        }
      else if (te.ended)
        p(l, new B());
      else {
        if (te.destroyed || te.errored)
          return false;
        te.state &= ~X, te.decoder && !z ? (f = te.decoder.write(f), te.objectMode || f.length !== 0 ? ye(l, te, f, false) : Se(l, te)) : ye(l, te, f, false);
      }
    else K || (te.state &= ~X, Se(l, te));
    return !te.ended && (te.length < te.highWaterMark || te.length === 0);
  }
  function ye(l, f, z, K) {
    f.flowing && f.length === 0 && !f.sync && l.listenerCount("data") > 0 ? ((f.state & Q) !== 0 ? f.awaitDrainWriters.clear() : f.awaitDrainWriters = null, f.dataEmitted = true, l.emit("data", z)) : (f.length += f.objectMode ? 1 : z.length, K ? f.buffer.unshift(z) : f.buffer.push(z), (f.state & oe) !== 0 && $e(l)), Se(l, f);
  }
  k.prototype.isPaused = function() {
    const l = this._readableState;
    return l[ne] === true || l.flowing === false;
  }, k.prototype.setEncoding = function(l) {
    const f = new le(l);
    this._readableState.decoder = f, this._readableState.encoding = this._readableState.decoder.encoding;
    const z = this._readableState.buffer;
    let K = "";
    for (const te of z)
      K += f.write(te);
    return z.clear(), K !== "" && z.push(K), this._readableState.length = K.length, this;
  };
  const de = 1073741824;
  function me(l) {
    if (l > de)
      throw new j("size", "<= 1GiB", l);
    return l--, l |= l >>> 1, l |= l >>> 2, l |= l >>> 4, l |= l >>> 8, l |= l >>> 16, l++, l;
  }
  function _e(l, f) {
    return l <= 0 || f.length === 0 && f.ended ? 0 : (f.state & M) !== 0 ? 1 : r(l) ? f.flowing && f.length ? f.buffer.first().length : f.length : l <= f.length ? l : f.ended ? f.length : 0;
  }
  k.prototype.read = function(l) {
    g("read", l), l === void 0 ? l = NaN : t(l) || (l = n(l, 10));
    const f = this._readableState, z = l;
    if (l > f.highWaterMark && (f.highWaterMark = me(l)), l !== 0 && (f.state &= ~L), l === 0 && f.needReadable && ((f.highWaterMark !== 0 ? f.length >= f.highWaterMark : f.length > 0) || f.ended))
      return g("read: emitReadable", f.length, f.ended), f.length === 0 && f.ended ? $t(this) : $e(this), null;
    if (l = _e(l, f), l === 0 && f.ended)
      return f.length === 0 && $t(this), null;
    let K = (f.state & oe) !== 0;
    if (g("need readable", K), (f.length === 0 || f.length - l < f.highWaterMark) && (K = true, g("length less than watermark", K)), f.ended || f.reading || f.destroyed || f.errored || !f.constructed)
      K = false, g("reading, ended or constructing", K);
    else if (K) {
      g("do read"), f.state |= X | ue, f.length === 0 && (f.state |= oe);
      try {
        this._read(f.highWaterMark);
      } catch (be) {
        p(this, be);
      }
      f.state &= ~ue, f.reading || (l = _e(z, f));
    }
    let te;
    return l > 0 ? te = Rr(l, f) : te = null, te === null ? (f.needReadable = f.length <= f.highWaterMark, l = 0) : (f.length -= l, f.multiAwaitDrain ? f.awaitDrainWriters.clear() : f.awaitDrainWriters = null), f.length === 0 && (f.ended || (f.needReadable = true), z !== l && f.ended && $t(this)), te !== null && !f.errorEmitted && !f.closeEmitted && (f.dataEmitted = true, this.emit("data", te)), te;
  };
  function Te(l, f) {
    if (g("onEofChunk"), !f.ended) {
      if (f.decoder) {
        const z = f.decoder.end();
        z && z.length && (f.buffer.push(z), f.length += f.objectMode ? 1 : z.length);
      }
      f.ended = true, f.sync ? $e(l) : (f.needReadable = false, f.emittedReadable = true, ht(l));
    }
  }
  function $e(l) {
    const f = l._readableState;
    g("emitReadable", f.needReadable, f.emittedReadable), f.needReadable = false, f.emittedReadable || (g("emitReadable", f.flowing), f.emittedReadable = true, i.nextTick(ht, l));
  }
  function ht(l) {
    const f = l._readableState;
    g("emitReadable_", f.destroyed, f.length, f.ended), !f.destroyed && !f.errored && (f.length || f.ended) && (l.emit("readable"), f.emittedReadable = false), f.needReadable = !f.flowing && !f.ended && f.length <= f.highWaterMark, xr(l);
  }
  function Se(l, f) {
    !f.readingMore && f.constructed && (f.readingMore = true, i.nextTick(qn, l, f));
  }
  function qn(l, f) {
    for (; !f.reading && !f.ended && (f.length < f.highWaterMark || f.flowing && f.length === 0); ) {
      const z = f.length;
      if (g("maybeReadMore read 0"), l.read(0), z === f.length)
        break;
    }
    f.readingMore = false;
  }
  k.prototype._read = function(l) {
    throw new A("_read()");
  }, k.prototype.pipe = function(l, f) {
    const z = this, K = this._readableState;
    K.pipes.length === 1 && (K.multiAwaitDrain || (K.multiAwaitDrain = true, K.awaitDrainWriters = new u(K.awaitDrainWriters ? [K.awaitDrainWriters] : []))), K.pipes.push(l), g("pipe count=%d opts=%j", K.pipes.length, f);
    const be = (!f || f.end !== false) && l !== i.stdout && l !== i.stderr ? Tr : Je;
    K.endEmitted ? i.nextTick(be) : z.once("end", be), l.on("unpipe", Re);
    function Re(Fe, Ne) {
      g("onunpipe"), Fe === z && Ne && Ne.hasUnpiped === false && (Ne.hasUnpiped = true, Yn());
    }
    function Tr() {
      g("onend"), l.end();
    }
    let Me, Ir = false;
    function Yn() {
      g("cleanup"), l.removeListener("close", Dt), l.removeListener("finish", Ct), Me && l.removeListener("drain", Me), l.removeListener("error", kt), l.removeListener("unpipe", Re), z.removeListener("end", Tr), z.removeListener("end", Je), z.removeListener("data", Nr), Ir = true, Me && K.awaitDrainWriters && (!l._writableState || l._writableState.needDrain) && Me();
    }
    function Ar() {
      Ir || (K.pipes.length === 1 && K.pipes[0] === l ? (g("false write response, pause", 0), K.awaitDrainWriters = l, K.multiAwaitDrain = false) : K.pipes.length > 1 && K.pipes.includes(l) && (g("false write response, pause", K.awaitDrainWriters.size), K.awaitDrainWriters.add(l)), z.pause()), Me || (Me = Un(z, l), l.on("drain", Me));
    }
    z.on("data", Nr);
    function Nr(Fe) {
      g("ondata");
      const Ne = l.write(Fe);
      g("dest.write", Ne), Ne === false && Ar();
    }
    function kt(Fe) {
      if (g("onerror", Fe), Je(), l.removeListener("error", kt), l.listenerCount("error") === 0) {
        const Ne = l._writableState || l._readableState;
        Ne && !Ne.errorEmitted ? p(l, Fe) : l.emit("error", Fe);
      }
    }
    E(l, "error", kt);
    function Dt() {
      l.removeListener("finish", Ct), Je();
    }
    l.once("close", Dt);
    function Ct() {
      g("onfinish"), l.removeListener("close", Dt), Je();
    }
    l.once("finish", Ct);
    function Je() {
      g("unpipe"), z.unpipe(l);
    }
    return l.emit("pipe", z), l.writableNeedDrain === true ? Ar() : K.flowing || (g("pipe resume"), z.resume()), l;
  };
  function Un(l, f) {
    return function() {
      const K = l._readableState;
      K.awaitDrainWriters === f ? (g("pipeOnDrain", 1), K.awaitDrainWriters = null) : K.multiAwaitDrain && (g("pipeOnDrain", K.awaitDrainWriters.size), K.awaitDrainWriters.delete(f)), (!K.awaitDrainWriters || K.awaitDrainWriters.size === 0) && l.listenerCount("data") && l.resume();
    };
  }
  k.prototype.unpipe = function(l) {
    const f = this._readableState, z = {
      hasUnpiped: false
    };
    if (f.pipes.length === 0) return this;
    if (!l) {
      const te = f.pipes;
      f.pipes = [], this.pause();
      for (let be = 0; be < te.length; be++)
        te[be].emit("unpipe", this, {
          hasUnpiped: false
        });
      return this;
    }
    const K = e(f.pipes, l);
    return K === -1 ? this : (f.pipes.splice(K, 1), f.pipes.length === 0 && this.pause(), l.emit("unpipe", this, z), this);
  }, k.prototype.on = function(l, f) {
    const z = I.prototype.on.call(this, l, f), K = this._readableState;
    return l === "data" ? (K.readableListening = this.listenerCount("readable") > 0, K.flowing !== false && this.resume()) : l === "readable" && !K.endEmitted && !K.readableListening && (K.readableListening = K.needReadable = true, K.flowing = false, K.emittedReadable = false, g("on readable", K.length, K.reading), K.length ? $e(this) : K.reading || i.nextTick(Gn, this)), z;
  }, k.prototype.addListener = k.prototype.on, k.prototype.removeListener = function(l, f) {
    const z = I.prototype.removeListener.call(this, l, f);
    return l === "readable" && i.nextTick(Sr, this), z;
  }, k.prototype.off = k.prototype.removeListener, k.prototype.removeAllListeners = function(l) {
    const f = I.prototype.removeAllListeners.apply(this, arguments);
    return (l === "readable" || l === void 0) && i.nextTick(Sr, this), f;
  };
  function Sr(l) {
    const f = l._readableState;
    f.readableListening = l.listenerCount("readable") > 0, f.resumeScheduled && f[ne] === false ? f.flowing = true : l.listenerCount("data") > 0 ? l.resume() : f.readableListening || (f.flowing = null);
  }
  function Gn(l) {
    g("readable nexttick read 0"), l.read(0);
  }
  k.prototype.resume = function() {
    const l = this._readableState;
    return l.flowing || (g("resume"), l.flowing = !l.readableListening, Qn(this, l)), l[ne] = false, this;
  };
  function Qn(l, f) {
    f.resumeScheduled || (f.resumeScheduled = true, i.nextTick(Hn, l, f));
  }
  function Hn(l, f) {
    g("resume", f.reading), f.reading || l.read(0), f.resumeScheduled = false, l.emit("resume"), xr(l), f.flowing && !f.reading && l.read(0);
  }
  k.prototype.pause = function() {
    return g("call pause flowing=%j", this._readableState.flowing), this._readableState.flowing !== false && (g("pause"), this._readableState.flowing = false, this.emit("pause")), this._readableState[ne] = true, this;
  };
  function xr(l) {
    const f = l._readableState;
    for (g("flow", f.flowing); f.flowing && l.read() !== null; ) ;
  }
  k.prototype.wrap = function(l) {
    let f = false;
    l.on("data", (K) => {
      !this.push(K) && l.pause && (f = true, l.pause());
    }), l.on("end", () => {
      this.push(null);
    }), l.on("error", (K) => {
      p(this, K);
    }), l.on("close", () => {
      this.destroy();
    }), l.on("destroy", () => {
      this.destroy();
    }), this._read = () => {
      f && l.resume && (f = false, l.resume());
    };
    const z = o(l);
    for (let K = 1; K < z.length; K++) {
      const te = z[K];
      this[te] === void 0 && typeof l[te] == "function" && (this[te] = l[te].bind(l));
    }
    return this;
  }, k.prototype[h] = function() {
    return Er(this);
  }, k.prototype.iterator = function(l) {
    return l !== void 0 && J(l, "options"), Er(this, l);
  };
  function Er(l, f) {
    typeof l.read != "function" && (l = k.wrap(l, {
      objectMode: true
    }));
    const z = zn(l, f);
    return z.stream = l, z;
  }
  async function* zn(l, f) {
    let z = ee;
    function K(Re) {
      this === l ? (z(), z = ee) : z = Re;
    }
    l.on("readable", K);
    let te;
    const be = y(
      l,
      {
        writable: false
      },
      (Re) => {
        te = Re ? D(te, Re) : null, z(), z = ee;
      }
    );
    try {
      for (; ; ) {
        const Re = l.destroyed ? null : l.read();
        if (Re !== null)
          yield Re;
        else {
          if (te)
            throw te;
          if (te === null)
            return;
          await new d(K);
        }
      }
    } catch (Re) {
      throw te = D(te, Re), te;
    } finally {
      (te || f?.destroyOnReturn !== false) && (te === void 0 || l._readableState.autoDestroy) ? x.destroyer(l, null) : (l.off("readable", K), be());
    }
  }
  s(k.prototype, {
    readable: {
      __proto__: null,
      get() {
        const l = this._readableState;
        return !!l && l.readable !== false && !l.destroyed && !l.errorEmitted && !l.endEmitted;
      },
      set(l) {
        this._readableState && (this._readableState.readable = !!l);
      }
    },
    readableDidRead: {
      __proto__: null,
      enumerable: false,
      get: function() {
        return this._readableState.dataEmitted;
      }
    },
    readableAborted: {
      __proto__: null,
      enumerable: false,
      get: function() {
        return !!(this._readableState.readable !== false && (this._readableState.destroyed || this._readableState.errored) && !this._readableState.endEmitted);
      }
    },
    readableHighWaterMark: {
      __proto__: null,
      enumerable: false,
      get: function() {
        return this._readableState.highWaterMark;
      }
    },
    readableBuffer: {
      __proto__: null,
      enumerable: false,
      get: function() {
        return this._readableState && this._readableState.buffer;
      }
    },
    readableFlowing: {
      __proto__: null,
      enumerable: false,
      get: function() {
        return this._readableState.flowing;
      },
      set: function(l) {
        this._readableState && (this._readableState.flowing = l);
      }
    },
    readableLength: {
      __proto__: null,
      enumerable: false,
      get() {
        return this._readableState.length;
      }
    },
    readableObjectMode: {
      __proto__: null,
      enumerable: false,
      get() {
        return this._readableState ? this._readableState.objectMode : false;
      }
    },
    readableEncoding: {
      __proto__: null,
      enumerable: false,
      get() {
        return this._readableState ? this._readableState.encoding : null;
      }
    },
    errored: {
      __proto__: null,
      enumerable: false,
      get() {
        return this._readableState ? this._readableState.errored : null;
      }
    },
    closed: {
      __proto__: null,
      get() {
        return this._readableState ? this._readableState.closed : false;
      }
    },
    destroyed: {
      __proto__: null,
      enumerable: false,
      get() {
        return this._readableState ? this._readableState.destroyed : false;
      },
      set(l) {
        this._readableState && (this._readableState.destroyed = l);
      }
    },
    readableEnded: {
      __proto__: null,
      enumerable: false,
      get() {
        return this._readableState ? this._readableState.endEmitted : false;
      }
    }
  }), s(G.prototype, {
    // Legacy getter for `pipesCount`.
    pipesCount: {
      __proto__: null,
      get() {
        return this.pipes.length;
      }
    },
    // Legacy property for `paused`.
    paused: {
      __proto__: null,
      get() {
        return this[ne] !== false;
      },
      set(l) {
        this[ne] = !!l;
      }
    }
  }), k._fromList = Rr;
  function Rr(l, f) {
    if (f.length === 0) return null;
    let z;
    return f.objectMode ? z = f.buffer.shift() : !l || l >= f.length ? (f.decoder ? z = f.buffer.join("") : f.buffer.length === 1 ? z = f.buffer.first() : z = f.buffer.concat(f.length), f.buffer.clear()) : z = f.buffer.consume(l, f.decoder), z;
  }
  function $t(l) {
    const f = l._readableState;
    g("endReadable", f.endEmitted), f.endEmitted || (f.ended = true, i.nextTick(Kn, f, l));
  }
  function Kn(l, f) {
    if (g("endReadableNT", l.endEmitted, l.length), !l.errored && !l.closeEmitted && !l.endEmitted && l.length === 0) {
      if (l.endEmitted = true, f.emit("end"), f.writable && f.allowHalfOpen === false)
        i.nextTick(Vn, f);
      else if (l.autoDestroy) {
        const z = f._writableState;
        (!z || z.autoDestroy && // We don't expect the writable to ever 'finish'
        // if writable is explicitly set to false.
        (z.finished || z.writable === false)) && f.destroy();
      }
    }
  }
  function Vn(l) {
    l.writable && !l.writableEnded && !l.destroyed && l.end();
  }
  k.from = function(l, f) {
    return C(k, l, f);
  };
  let Ot;
  function vr() {
    return Ot === void 0 && (Ot = {}), Ot;
  }
  return k.fromWeb = function(l, f) {
    return vr().newStreamReadableFromReadableStream(l, f);
  }, k.toWeb = function(l, f) {
    return vr().newReadableStreamFromStreamReadable(l, f);
  }, k.wrap = function(l, f) {
    var z, K;
    return new k({
      objectMode: (z = (K = l.readableObjectMode) !== null && K !== void 0 ? K : l.objectMode) !== null && z !== void 0 ? z : true,
      ...f,
      destroy(te, be) {
        x.destroyer(l, te), be(te);
      }
    }).wrap(l);
  }, tr;
}
var rr;
var nn;
function yr() {
  if (nn) return rr;
  nn = 1;
  const i = qe(), {
    ArrayPrototypeSlice: e,
    Error: t,
    FunctionPrototypeSymbolHasInstance: r,
    ObjectDefineProperty: n,
    ObjectDefineProperties: s,
    ObjectSetPrototypeOf: o,
    StringPrototypeToLowerCase: a,
    Symbol: d,
    SymbolHasInstance: u
  } = ce();
  rr = J, J.WritableState = T;
  const { EventEmitter: _ } = Nt(), h = gr().Stream, { Buffer: S } = import_buffer.default, N = Ye(), { addAbortSignal: I } = jt(), { getHighWaterMark: E, getDefaultHighWaterMark: b } = Pt(), {
    ERR_INVALID_ARG_TYPE: c,
    ERR_METHOD_NOT_IMPLEMENTED: y,
    ERR_MULTIPLE_CALLBACK: g,
    ERR_STREAM_CANNOT_PIPE: v,
    ERR_STREAM_DESTROYED: x,
    ERR_STREAM_ALREADY_FINISHED: $,
    ERR_STREAM_NULL_VALUES: q,
    ERR_STREAM_WRITE_AFTER_END: D,
    ERR_UNKNOWN_ENCODING: re
  } = ge().codes, { errorOrDestroy: A } = N;
  o(J.prototype, h.prototype), o(J, h);
  function j() {
  }
  const B = d("kOnFinished");
  function T(m, R, P) {
    typeof P != "boolean" && (P = R instanceof Pe()), this.objectMode = !!(m && m.objectMode), P && (this.objectMode = this.objectMode || !!(m && m.writableObjectMode)), this.highWaterMark = m ? E(this, m, "writableHighWaterMark", P) : b(false), this.finalCalled = false, this.needDrain = false, this.ending = false, this.ended = false, this.finished = false, this.destroyed = false;
    const H = !!(m && m.decodeStrings === false);
    this.decodeStrings = !H, this.defaultEncoding = m && m.defaultEncoding || "utf8", this.length = 0, this.writing = false, this.corked = 0, this.sync = true, this.bufferProcessing = false, this.onwrite = p.bind(void 0, R), this.writecb = null, this.writelen = 0, this.afterWriteTickInfo = null, V(this), this.pendingcb = 0, this.constructed = true, this.prefinished = false, this.errorEmitted = false, this.emitClose = !m || m.emitClose !== false, this.autoDestroy = !m || m.autoDestroy !== false, this.errored = null, this.closed = false, this.closeEmitted = false, this[B] = [];
  }
  function V(m) {
    m.buffered = [], m.bufferedIndex = 0, m.allBuffers = true, m.allNoop = true;
  }
  T.prototype.getBuffer = function() {
    return e(this.buffered, this.bufferedIndex);
  }, n(T.prototype, "bufferedRequestCount", {
    __proto__: null,
    get() {
      return this.buffered.length - this.bufferedIndex;
    }
  });
  function J(m) {
    const R = this instanceof Pe();
    if (!R && !r(J, this)) return new J(m);
    this._writableState = new T(m, this, R), m && (typeof m.write == "function" && (this._write = m.write), typeof m.writev == "function" && (this._writev = m.writev), typeof m.destroy == "function" && (this._destroy = m.destroy), typeof m.final == "function" && (this._final = m.final), typeof m.construct == "function" && (this._construct = m.construct), m.signal && I(m.signal, this)), h.call(this, m), N.construct(this, () => {
      const P = this._writableState;
      P.writing || X(this, P), L(this, P);
    });
  }
  n(J, u, {
    __proto__: null,
    value: function(m) {
      return r(this, m) ? true : this !== J ? false : m && m._writableState instanceof T;
    }
  }), J.prototype.pipe = function() {
    A(this, new v());
  };
  function ne(m, R, P, H) {
    const Q = m._writableState;
    if (typeof P == "function")
      H = P, P = Q.defaultEncoding;
    else {
      if (!P) P = Q.defaultEncoding;
      else if (P !== "buffer" && !S.isEncoding(P)) throw new re(P);
      typeof H != "function" && (H = j);
    }
    if (R === null)
      throw new q();
    if (!Q.objectMode)
      if (typeof R == "string")
        Q.decodeStrings !== false && (R = S.from(R, P), P = "buffer");
      else if (R instanceof S)
        P = "buffer";
      else if (h._isUint8Array(R))
        R = h._uint8ArrayToBuffer(R), P = "buffer";
      else
        throw new c("chunk", ["string", "Buffer", "Uint8Array"], R);
    let U;
    return Q.ending ? U = new D() : Q.destroyed && (U = new x("write")), U ? (i.nextTick(H, U), A(m, U, true), U) : (Q.pendingcb++, le(m, Q, R, P, H));
  }
  J.prototype.write = function(m, R, P) {
    return ne(this, m, R, P) === true;
  }, J.prototype.cork = function() {
    this._writableState.corked++;
  }, J.prototype.uncork = function() {
    const m = this._writableState;
    m.corked && (m.corked--, m.writing || X(this, m));
  }, J.prototype.setDefaultEncoding = function(R) {
    if (typeof R == "string" && (R = a(R)), !S.isEncoding(R)) throw new re(R);
    return this._writableState.defaultEncoding = R, this;
  };
  function le(m, R, P, H, Q) {
    const U = R.objectMode ? 1 : P.length;
    R.length += U;
    const w = R.length < R.highWaterMark;
    return w || (R.needDrain = true), R.writing || R.corked || R.errored || !R.constructed ? (R.buffered.push({
      chunk: P,
      encoding: H,
      callback: Q
    }), R.allBuffers && H !== "buffer" && (R.allBuffers = false), R.allNoop && Q !== j && (R.allNoop = false)) : (R.writelen = U, R.writecb = Q, R.writing = true, R.sync = true, m._write(P, H, R.onwrite), R.sync = false), w && !R.errored && !R.destroyed;
  }
  function C(m, R, P, H, Q, U, w) {
    R.writelen = H, R.writecb = w, R.writing = true, R.sync = true, R.destroyed ? R.onwrite(new x("write")) : P ? m._writev(Q, R.onwrite) : m._write(Q, U, R.onwrite), R.sync = false;
  }
  function ee(m, R, P, H) {
    --R.pendingcb, H(P), O(R), A(m, P);
  }
  function p(m, R) {
    const P = m._writableState, H = P.sync, Q = P.writecb;
    if (typeof Q != "function") {
      A(m, new g());
      return;
    }
    P.writing = false, P.writecb = null, P.length -= P.writelen, P.writelen = 0, R ? (R.stack, P.errored || (P.errored = R), m._readableState && !m._readableState.errored && (m._readableState.errored = R), H ? i.nextTick(ee, m, P, R, Q) : ee(m, P, R, Q)) : (P.buffered.length > P.bufferedIndex && X(m, P), H ? P.afterWriteTickInfo !== null && P.afterWriteTickInfo.cb === Q ? P.afterWriteTickInfo.count++ : (P.afterWriteTickInfo = {
      count: 1,
      cb: Q,
      stream: m,
      state: P
    }, i.nextTick(M, P.afterWriteTickInfo)) : Y(m, P, 1, Q));
  }
  function M({ stream: m, state: R, count: P, cb: H }) {
    return R.afterWriteTickInfo = null, Y(m, R, P, H);
  }
  function Y(m, R, P, H) {
    for (!R.ending && !m.destroyed && R.length === 0 && R.needDrain && (R.needDrain = false, m.emit("drain")); P-- > 0; )
      R.pendingcb--, H();
    R.destroyed && O(R), L(m, R);
  }
  function O(m) {
    if (m.writing)
      return;
    for (let Q = m.bufferedIndex; Q < m.buffered.length; ++Q) {
      var R;
      const { chunk: U, callback: w } = m.buffered[Q], W = m.objectMode ? 1 : U.length;
      m.length -= W, w(
        (R = m.errored) !== null && R !== void 0 ? R : new x("write")
      );
    }
    const P = m[B].splice(0);
    for (let Q = 0; Q < P.length; Q++) {
      var H;
      P[Q](
        (H = m.errored) !== null && H !== void 0 ? H : new x("end")
      );
    }
    V(m);
  }
  function X(m, R) {
    if (R.corked || R.bufferProcessing || R.destroyed || !R.constructed)
      return;
    const { buffered: P, bufferedIndex: H, objectMode: Q } = R, U = P.length - H;
    if (!U)
      return;
    let w = H;
    if (R.bufferProcessing = true, U > 1 && m._writev) {
      R.pendingcb -= U - 1;
      const W = R.allNoop ? j : (k) => {
        for (let fe = w; fe < P.length; ++fe)
          P[fe].callback(k);
      }, G = R.allNoop && w === 0 ? P : e(P, w);
      G.allBuffers = R.allBuffers, C(m, R, true, R.length, G, "", W), V(R);
    } else {
      do {
        const { chunk: W, encoding: G, callback: k } = P[w];
        P[w++] = null;
        const fe = Q ? 1 : W.length;
        C(m, R, false, fe, W, G, k);
      } while (w < P.length && !R.writing);
      w === P.length ? V(R) : w > 256 ? (P.splice(0, w), R.bufferedIndex = 0) : R.bufferedIndex = w;
    }
    R.bufferProcessing = false;
  }
  J.prototype._write = function(m, R, P) {
    if (this._writev)
      this._writev(
        [
          {
            chunk: m,
            encoding: R
          }
        ],
        P
      );
    else
      throw new y("_write()");
  }, J.prototype._writev = null, J.prototype.end = function(m, R, P) {
    const H = this._writableState;
    typeof m == "function" ? (P = m, m = null, R = null) : typeof R == "function" && (P = R, R = null);
    let Q;
    if (m != null) {
      const U = ne(this, m, R);
      U instanceof t && (Q = U);
    }
    return H.corked && (H.corked = 1, this.uncork()), Q || (!H.errored && !H.ending ? (H.ending = true, L(this, H, true), H.ended = true) : H.finished ? Q = new $("end") : H.destroyed && (Q = new x("end"))), typeof P == "function" && (Q || H.finished ? i.nextTick(P, Q) : H[B].push(P)), this;
  };
  function ie(m) {
    return m.ending && !m.destroyed && m.constructed && m.length === 0 && !m.errored && m.buffered.length === 0 && !m.finished && !m.writing && !m.errorEmitted && !m.closeEmitted;
  }
  function ue(m, R) {
    let P = false;
    function H(Q) {
      if (P) {
        A(m, Q ?? g());
        return;
      }
      if (P = true, R.pendingcb--, Q) {
        const U = R[B].splice(0);
        for (let w = 0; w < U.length; w++)
          U[w](Q);
        A(m, Q, R.sync);
      } else ie(R) && (R.prefinished = true, m.emit("prefinish"), R.pendingcb++, i.nextTick(F, m, R));
    }
    R.sync = true, R.pendingcb++;
    try {
      m._final(H);
    } catch (Q) {
      H(Q);
    }
    R.sync = false;
  }
  function oe(m, R) {
    !R.prefinished && !R.finalCalled && (typeof m._final == "function" && !R.destroyed ? (R.finalCalled = true, ue(m, R)) : (R.prefinished = true, m.emit("prefinish")));
  }
  function L(m, R, P) {
    ie(R) && (oe(m, R), R.pendingcb === 0 && (P ? (R.pendingcb++, i.nextTick(
      (H, Q) => {
        ie(Q) ? F(H, Q) : Q.pendingcb--;
      },
      m,
      R
    )) : ie(R) && (R.pendingcb++, F(m, R))));
  }
  function F(m, R) {
    R.pendingcb--, R.finished = true;
    const P = R[B].splice(0);
    for (let H = 0; H < P.length; H++)
      P[H]();
    if (m.emit("finish"), R.autoDestroy) {
      const H = m._readableState;
      (!H || H.autoDestroy && // We don't expect the readable to ever 'end'
      // if readable is explicitly set to false.
      (H.endEmitted || H.readable === false)) && m.destroy();
    }
  }
  s(J.prototype, {
    closed: {
      __proto__: null,
      get() {
        return this._writableState ? this._writableState.closed : false;
      }
    },
    destroyed: {
      __proto__: null,
      get() {
        return this._writableState ? this._writableState.destroyed : false;
      },
      set(m) {
        this._writableState && (this._writableState.destroyed = m);
      }
    },
    writable: {
      __proto__: null,
      get() {
        const m = this._writableState;
        return !!m && m.writable !== false && !m.destroyed && !m.errored && !m.ending && !m.ended;
      },
      set(m) {
        this._writableState && (this._writableState.writable = !!m);
      }
    },
    writableFinished: {
      __proto__: null,
      get() {
        return this._writableState ? this._writableState.finished : false;
      }
    },
    writableObjectMode: {
      __proto__: null,
      get() {
        return this._writableState ? this._writableState.objectMode : false;
      }
    },
    writableBuffer: {
      __proto__: null,
      get() {
        return this._writableState && this._writableState.getBuffer();
      }
    },
    writableEnded: {
      __proto__: null,
      get() {
        return this._writableState ? this._writableState.ending : false;
      }
    },
    writableNeedDrain: {
      __proto__: null,
      get() {
        const m = this._writableState;
        return m ? !m.destroyed && !m.ending && m.needDrain : false;
      }
    },
    writableHighWaterMark: {
      __proto__: null,
      get() {
        return this._writableState && this._writableState.highWaterMark;
      }
    },
    writableCorked: {
      __proto__: null,
      get() {
        return this._writableState ? this._writableState.corked : 0;
      }
    },
    writableLength: {
      __proto__: null,
      get() {
        return this._writableState && this._writableState.length;
      }
    },
    errored: {
      __proto__: null,
      enumerable: false,
      get() {
        return this._writableState ? this._writableState.errored : null;
      }
    },
    writableAborted: {
      __proto__: null,
      enumerable: false,
      get: function() {
        return !!(this._writableState.writable !== false && (this._writableState.destroyed || this._writableState.errored) && !this._writableState.finished);
      }
    }
  });
  const Z = N.destroy;
  J.prototype.destroy = function(m, R) {
    const P = this._writableState;
    return !P.destroyed && (P.bufferedIndex < P.buffered.length || P[B].length) && i.nextTick(O, P), Z.call(this, m, R), this;
  }, J.prototype._undestroy = N.undestroy, J.prototype._destroy = function(m, R) {
    R(m);
  }, J.prototype[_.captureRejectionSymbol] = function(m) {
    this.destroy(m);
  };
  let ae;
  function se() {
    return ae === void 0 && (ae = {}), ae;
  }
  return J.fromWeb = function(m, R) {
    return se().newStreamWritableFromWritableStream(m, R);
  }, J.toWeb = function(m) {
    return se().newWritableStreamFromStreamWritable(m);
  }, rr;
}
var nr;
var sn;
function yi() {
  if (sn) return nr;
  sn = 1;
  const i = qe(), e = import_buffer.default, {
    isReadable: t,
    isWritable: r,
    isIterable: n,
    isNodeStream: s,
    isReadableNodeStream: o,
    isWritableNodeStream: a,
    isDuplexNodeStream: d,
    isReadableStream: u,
    isWritableStream: _
  } = Le(), h = Ce(), {
    AbortError: S,
    codes: { ERR_INVALID_ARG_TYPE: N, ERR_INVALID_RETURN_VALUE: I }
  } = ge(), { destroyer: E } = Ye(), b = Pe(), c = Lt(), y = yr(), { createDeferredPromise: g } = we(), v = An(), x = globalThis.Blob || e.Blob, $ = typeof x < "u" ? function(T) {
    return T instanceof x;
  } : function(T) {
    return false;
  }, q = globalThis.AbortController || ft().AbortController, { FunctionPrototypeCall: D } = ce();
  class re extends b {
    constructor(T) {
      super(T), T?.readable === false && (this._readableState.readable = false, this._readableState.ended = true, this._readableState.endEmitted = true), T?.writable === false && (this._writableState.writable = false, this._writableState.ending = true, this._writableState.ended = true, this._writableState.finished = true);
    }
  }
  nr = function B(T, V) {
    if (d(T))
      return T;
    if (o(T))
      return j({
        readable: T
      });
    if (a(T))
      return j({
        writable: T
      });
    if (s(T))
      return j({
        writable: false,
        readable: false
      });
    if (u(T))
      return j({
        readable: c.fromWeb(T)
      });
    if (_(T))
      return j({
        writable: y.fromWeb(T)
      });
    if (typeof T == "function") {
      const { value: ne, write: le, final: C, destroy: ee } = A(T);
      if (n(ne))
        return v(re, ne, {
          // TODO (ronag): highWaterMark?
          objectMode: true,
          write: le,
          final: C,
          destroy: ee
        });
      const p = ne?.then;
      if (typeof p == "function") {
        let M;
        const Y = D(
          p,
          ne,
          (O) => {
            if (O != null)
              throw new I("nully", "body", O);
          },
          (O) => {
            E(M, O);
          }
        );
        return M = new re({
          // TODO (ronag): highWaterMark?
          objectMode: true,
          readable: false,
          write: le,
          final(O) {
            C(async () => {
              try {
                await Y, i.nextTick(O, null);
              } catch (X) {
                i.nextTick(O, X);
              }
            });
          },
          destroy: ee
        });
      }
      throw new I("Iterable, AsyncIterable or AsyncFunction", V, ne);
    }
    if ($(T))
      return B(T.arrayBuffer());
    if (n(T))
      return v(re, T, {
        // TODO (ronag): highWaterMark?
        objectMode: true,
        writable: false
      });
    if (u(T?.readable) && _(T?.writable))
      return re.fromWeb(T);
    if (typeof T?.writable == "object" || typeof T?.readable == "object") {
      const ne = T != null && T.readable ? o(T?.readable) ? T?.readable : B(T.readable) : void 0, le = T != null && T.writable ? a(T?.writable) ? T?.writable : B(T.writable) : void 0;
      return j({
        readable: ne,
        writable: le
      });
    }
    const J = T?.then;
    if (typeof J == "function") {
      let ne;
      return D(
        J,
        T,
        (le) => {
          le != null && ne.push(le), ne.push(null);
        },
        (le) => {
          E(ne, le);
        }
      ), ne = new re({
        objectMode: true,
        writable: false,
        read() {
        }
      });
    }
    throw new N(
      V,
      [
        "Blob",
        "ReadableStream",
        "WritableStream",
        "Stream",
        "Iterable",
        "AsyncIterable",
        "Function",
        "{ readable, writable } pair",
        "Promise"
      ],
      T
    );
  };
  function A(B) {
    let { promise: T, resolve: V } = g();
    const J = new q(), ne = J.signal;
    return {
      value: B(
        (async function* () {
          for (; ; ) {
            const C = T;
            T = null;
            const { chunk: ee, done: p, cb: M } = await C;
            if (i.nextTick(M), p) return;
            if (ne.aborted)
              throw new S(void 0, {
                cause: ne.reason
              });
            ({ promise: T, resolve: V } = g()), yield ee;
          }
        })(),
        {
          signal: ne
        }
      ),
      write(C, ee, p) {
        const M = V;
        V = null, M({
          chunk: C,
          done: false,
          cb: p
        });
      },
      final(C) {
        const ee = V;
        V = null, ee({
          done: true,
          cb: C
        });
      },
      destroy(C, ee) {
        J.abort(), ee(C);
      }
    };
  }
  function j(B) {
    const T = B.readable && typeof B.readable.read != "function" ? c.wrap(B.readable) : B.readable, V = B.writable;
    let J = !!t(T), ne = !!r(V), le, C, ee, p, M;
    function Y(O) {
      const X = p;
      p = null, X ? X(O) : O && M.destroy(O);
    }
    return M = new re({
      // TODO (ronag): highWaterMark?
      readableObjectMode: !!(T != null && T.readableObjectMode),
      writableObjectMode: !!(V != null && V.writableObjectMode),
      readable: J,
      writable: ne
    }), ne && (h(V, (O) => {
      ne = false, O && E(T, O), Y(O);
    }), M._write = function(O, X, ie) {
      V.write(O, X) ? ie() : le = ie;
    }, M._final = function(O) {
      V.end(), C = O;
    }, V.on("drain", function() {
      if (le) {
        const O = le;
        le = null, O();
      }
    }), V.on("finish", function() {
      if (C) {
        const O = C;
        C = null, O();
      }
    })), J && (h(T, (O) => {
      J = false, O && E(T, O), Y(O);
    }), T.on("readable", function() {
      if (ee) {
        const O = ee;
        ee = null, O();
      }
    }), T.on("end", function() {
      M.push(null);
    }), M._read = function() {
      for (; ; ) {
        const O = T.read();
        if (O === null) {
          ee = M._read;
          return;
        }
        if (!M.push(O))
          return;
      }
    }), M._destroy = function(O, X) {
      !O && p !== null && (O = new S()), ee = null, le = null, C = null, p === null ? X(O) : (p = X, E(V, O), E(T, O));
    }, M;
  }
  return nr;
}
var ir;
var an;
function Pe() {
  if (an) return ir;
  an = 1;
  const {
    ObjectDefineProperties: i,
    ObjectGetOwnPropertyDescriptor: e,
    ObjectKeys: t,
    ObjectSetPrototypeOf: r
  } = ce();
  ir = o;
  const n = Lt(), s = yr();
  r(o.prototype, n.prototype), r(o, n);
  {
    const _ = t(s.prototype);
    for (let h = 0; h < _.length; h++) {
      const S = _[h];
      o.prototype[S] || (o.prototype[S] = s.prototype[S]);
    }
  }
  function o(_) {
    if (!(this instanceof o)) return new o(_);
    n.call(this, _), s.call(this, _), _ ? (this.allowHalfOpen = _.allowHalfOpen !== false, _.readable === false && (this._readableState.readable = false, this._readableState.ended = true, this._readableState.endEmitted = true), _.writable === false && (this._writableState.writable = false, this._writableState.ending = true, this._writableState.ended = true, this._writableState.finished = true)) : this.allowHalfOpen = true;
  }
  i(o.prototype, {
    writable: {
      __proto__: null,
      ...e(s.prototype, "writable")
    },
    writableHighWaterMark: {
      __proto__: null,
      ...e(s.prototype, "writableHighWaterMark")
    },
    writableObjectMode: {
      __proto__: null,
      ...e(s.prototype, "writableObjectMode")
    },
    writableBuffer: {
      __proto__: null,
      ...e(s.prototype, "writableBuffer")
    },
    writableLength: {
      __proto__: null,
      ...e(s.prototype, "writableLength")
    },
    writableFinished: {
      __proto__: null,
      ...e(s.prototype, "writableFinished")
    },
    writableCorked: {
      __proto__: null,
      ...e(s.prototype, "writableCorked")
    },
    writableEnded: {
      __proto__: null,
      ...e(s.prototype, "writableEnded")
    },
    writableNeedDrain: {
      __proto__: null,
      ...e(s.prototype, "writableNeedDrain")
    },
    destroyed: {
      __proto__: null,
      get() {
        return this._readableState === void 0 || this._writableState === void 0 ? false : this._readableState.destroyed && this._writableState.destroyed;
      },
      set(_) {
        this._readableState && this._writableState && (this._readableState.destroyed = _, this._writableState.destroyed = _);
      }
    }
  });
  let a;
  function d() {
    return a === void 0 && (a = {}), a;
  }
  o.fromWeb = function(_, h) {
    return d().newStreamDuplexFromReadableWritablePair(_, h);
  }, o.toWeb = function(_) {
    return d().newReadableWritablePairFromDuplex(_);
  };
  let u;
  return o.from = function(_) {
    return u || (u = yi()), u(_, "body");
  }, ir;
}
var sr;
var on;
function Nn() {
  if (on) return sr;
  on = 1;
  const { ObjectSetPrototypeOf: i, Symbol: e } = ce();
  sr = o;
  const { ERR_METHOD_NOT_IMPLEMENTED: t } = ge().codes, r = Pe(), { getHighWaterMark: n } = Pt();
  i(o.prototype, r.prototype), i(o, r);
  const s = e("kCallback");
  function o(u) {
    if (!(this instanceof o)) return new o(u);
    const _ = u ? n(this, u, "readableHighWaterMark", true) : null;
    _ === 0 && (u = {
      ...u,
      highWaterMark: null,
      readableHighWaterMark: _,
      // TODO (ronag): 0 is not optimal since we have
      // a "bug" where we check needDrain before calling _write and not after.
      // Refs: https://github.com/nodejs/node/pull/32887
      // Refs: https://github.com/nodejs/node/pull/35941
      writableHighWaterMark: u.writableHighWaterMark || 0
    }), r.call(this, u), this._readableState.sync = false, this[s] = null, u && (typeof u.transform == "function" && (this._transform = u.transform), typeof u.flush == "function" && (this._flush = u.flush)), this.on("prefinish", d);
  }
  function a(u) {
    typeof this._flush == "function" && !this.destroyed ? this._flush((_, h) => {
      if (_) {
        u ? u(_) : this.destroy(_);
        return;
      }
      h != null && this.push(h), this.push(null), u && u();
    }) : (this.push(null), u && u());
  }
  function d() {
    this._final !== a && a.call(this);
  }
  return o.prototype._final = a, o.prototype._transform = function(u, _, h) {
    throw new t("_transform()");
  }, o.prototype._write = function(u, _, h) {
    const S = this._readableState, N = this._writableState, I = S.length;
    this._transform(u, _, (E, b) => {
      if (E) {
        h(E);
        return;
      }
      b != null && this.push(b), N.ended || // Backwards compat.
      I === S.length || // Backwards compat.
      S.length < S.highWaterMark ? h() : this[s] = h;
    });
  }, o.prototype._read = function() {
    if (this[s]) {
      const u = this[s];
      this[s] = null, u();
    }
  }, sr;
}
var ar;
var ln;
function jn() {
  if (ln) return ar;
  ln = 1;
  const { ObjectSetPrototypeOf: i } = ce();
  ar = t;
  const e = Nn();
  i(t.prototype, e.prototype), i(t, e);
  function t(r) {
    if (!(this instanceof t)) return new t(r);
    e.call(this, r);
  }
  return t.prototype._transform = function(r, n, s) {
    s(null, r);
  }, ar;
}
var or;
var un;
function wr() {
  if (un) return or;
  un = 1;
  const i = qe(), { ArrayIsArray: e, Promise: t, SymbolAsyncIterator: r, SymbolDispose: n } = ce(), s = Ce(), { once: o } = we(), a = Ye(), d = Pe(), {
    aggregateTwoErrors: u,
    codes: {
      ERR_INVALID_ARG_TYPE: _,
      ERR_INVALID_RETURN_VALUE: h,
      ERR_MISSING_ARGS: S,
      ERR_STREAM_DESTROYED: N,
      ERR_STREAM_PREMATURE_CLOSE: I
    },
    AbortError: E
  } = ge(), { validateFunction: b, validateAbortSignal: c } = ct(), {
    isIterable: y,
    isReadable: g,
    isReadableNodeStream: v,
    isNodeStream: x,
    isTransformStream: $,
    isWebStream: q,
    isReadableStream: D,
    isReadableFinished: re
  } = Le(), A = globalThis.AbortController || ft().AbortController;
  let j, B, T;
  function V(O, X, ie) {
    let ue = false;
    O.on("close", () => {
      ue = true;
    });
    const oe = s(
      O,
      {
        readable: X,
        writable: ie
      },
      (L) => {
        ue = !L;
      }
    );
    return {
      destroy: (L) => {
        ue || (ue = true, a.destroyer(O, L || new N("pipe")));
      },
      cleanup: oe
    };
  }
  function J(O) {
    return b(O[O.length - 1], "streams[stream.length - 1]"), O.pop();
  }
  function ne(O) {
    if (y(O))
      return O;
    if (v(O))
      return le(O);
    throw new _("val", ["Readable", "Iterable", "AsyncIterable"], O);
  }
  async function* le(O) {
    B || (B = Lt()), yield* B.prototype[r].call(O);
  }
  async function C(O, X, ie, { end: ue }) {
    let oe, L = null;
    const F = (se) => {
      if (se && (oe = se), L) {
        const m = L;
        L = null, m();
      }
    }, Z = () => new t((se, m) => {
      oe ? m(oe) : L = () => {
        oe ? m(oe) : se();
      };
    });
    X.on("drain", F);
    const ae = s(
      X,
      {
        readable: false
      },
      F
    );
    try {
      X.writableNeedDrain && await Z();
      for await (const se of O)
        X.write(se) || await Z();
      ue && (X.end(), await Z()), ie();
    } catch (se) {
      ie(oe !== se ? u(oe, se) : se);
    } finally {
      ae(), X.off("drain", F);
    }
  }
  async function ee(O, X, ie, { end: ue }) {
    $(X) && (X = X.writable);
    const oe = X.getWriter();
    try {
      for await (const L of O)
        await oe.ready, oe.write(L).catch(() => {
        });
      await oe.ready, ue && await oe.close(), ie();
    } catch (L) {
      try {
        await oe.abort(L), ie(L);
      } catch (F) {
        ie(F);
      }
    }
  }
  function p(...O) {
    return M(O, o(J(O)));
  }
  function M(O, X, ie) {
    if (O.length === 1 && e(O[0]) && (O = O[0]), O.length < 2)
      throw new S("streams");
    const ue = new A(), oe = ue.signal, L = ie?.signal, F = [];
    c(L, "options.signal");
    function Z() {
      Q(new E());
    }
    T = T || we().addAbortListener;
    let ae;
    L && (ae = T(L, Z));
    let se, m;
    const R = [];
    let P = 0;
    function H(G) {
      Q(G, --P === 0);
    }
    function Q(G, k) {
      var fe;
      if (G && (!se || se.code === "ERR_STREAM_PREMATURE_CLOSE") && (se = G), !(!se && !k)) {
        for (; R.length; )
          R.shift()(se);
        (fe = ae) === null || fe === void 0 || fe[n](), ue.abort(), k && (se || F.forEach((ye) => ye()), i.nextTick(X, se, m));
      }
    }
    let U;
    for (let G = 0; G < O.length; G++) {
      const k = O[G], fe = G < O.length - 1, ye = G > 0, de = fe || ie?.end !== false, me = G === O.length - 1;
      if (x(k)) {
        let _e = function(Te) {
          Te && Te.name !== "AbortError" && Te.code !== "ERR_STREAM_PREMATURE_CLOSE" && H(Te);
        };
        if (de) {
          const { destroy: Te, cleanup: $e } = V(k, fe, ye);
          R.push(Te), g(k) && me && F.push($e);
        }
        k.on("error", _e), g(k) && me && F.push(() => {
          k.removeListener("error", _e);
        });
      }
      if (G === 0)
        if (typeof k == "function") {
          if (U = k({
            signal: oe
          }), !y(U))
            throw new h("Iterable, AsyncIterable or Stream", "source", U);
        } else y(k) || v(k) || $(k) ? U = k : U = d.from(k);
      else if (typeof k == "function") {
        if ($(U)) {
          var w;
          U = ne((w = U) === null || w === void 0 ? void 0 : w.readable);
        } else
          U = ne(U);
        if (U = k(U, {
          signal: oe
        }), fe) {
          if (!y(U, true))
            throw new h("AsyncIterable", `transform[${G - 1}]`, U);
        } else {
          var W;
          j || (j = jn());
          const _e = new j({
            objectMode: true
          }), Te = (W = U) === null || W === void 0 ? void 0 : W.then;
          if (typeof Te == "function")
            P++, Te.call(
              U,
              (Se) => {
                m = Se, Se != null && _e.write(Se), de && _e.end(), i.nextTick(H);
              },
              (Se) => {
                _e.destroy(Se), i.nextTick(H, Se);
              }
            );
          else if (y(U, true))
            P++, C(U, _e, H, {
              end: de
            });
          else if (D(U) || $(U)) {
            const Se = U.readable || U;
            P++, C(Se, _e, H, {
              end: de
            });
          } else
            throw new h("AsyncIterable or Promise", "destination", U);
          U = _e;
          const { destroy: $e, cleanup: ht } = V(U, false, true);
          R.push($e), me && F.push(ht);
        }
      } else if (x(k)) {
        if (v(U)) {
          P += 2;
          const _e = Y(U, k, H, {
            end: de
          });
          g(k) && me && F.push(_e);
        } else if ($(U) || D(U)) {
          const _e = U.readable || U;
          P++, C(_e, k, H, {
            end: de
          });
        } else if (y(U))
          P++, C(U, k, H, {
            end: de
          });
        else
          throw new _(
            "val",
            ["Readable", "Iterable", "AsyncIterable", "ReadableStream", "TransformStream"],
            U
          );
        U = k;
      } else if (q(k)) {
        if (v(U))
          P++, ee(ne(U), k, H, {
            end: de
          });
        else if (D(U) || y(U))
          P++, ee(U, k, H, {
            end: de
          });
        else if ($(U))
          P++, ee(U.readable, k, H, {
            end: de
          });
        else
          throw new _(
            "val",
            ["Readable", "Iterable", "AsyncIterable", "ReadableStream", "TransformStream"],
            U
          );
        U = k;
      } else
        U = d.from(k);
    }
    return (oe != null && oe.aborted || L != null && L.aborted) && i.nextTick(Z), U;
  }
  function Y(O, X, ie, { end: ue }) {
    let oe = false;
    if (X.on("close", () => {
      oe || ie(new I());
    }), O.pipe(X, {
      end: false
    }), ue) {
      let L = function() {
        oe = true, X.end();
      };
      re(O) ? i.nextTick(L) : O.once("end", L);
    } else
      ie();
    return s(
      O,
      {
        readable: true,
        writable: false
      },
      (L) => {
        const F = O._readableState;
        L && L.code === "ERR_STREAM_PREMATURE_CLOSE" && F && F.ended && !F.errored && !F.errorEmitted ? O.once("end", ie).once("error", ie) : ie(L);
      }
    ), s(
      X,
      {
        readable: false,
        writable: true
      },
      ie
    );
  }
  return or = {
    pipelineImpl: M,
    pipeline: p
  }, or;
}
var lr;
var fn;
function Pn() {
  if (fn) return lr;
  fn = 1;
  const { pipeline: i } = wr(), e = Pe(), { destroyer: t } = Ye(), {
    isNodeStream: r,
    isReadable: n,
    isWritable: s,
    isWebStream: o,
    isTransformStream: a,
    isWritableStream: d,
    isReadableStream: u
  } = Le(), {
    AbortError: _,
    codes: { ERR_INVALID_ARG_VALUE: h, ERR_MISSING_ARGS: S }
  } = ge(), N = Ce();
  return lr = function(...E) {
    if (E.length === 0)
      throw new S("streams");
    if (E.length === 1)
      return e.from(E[0]);
    const b = [...E];
    if (typeof E[0] == "function" && (E[0] = e.from(E[0])), typeof E[E.length - 1] == "function") {
      const j = E.length - 1;
      E[j] = e.from(E[j]);
    }
    for (let j = 0; j < E.length; ++j)
      if (!(!r(E[j]) && !o(E[j]))) {
        if (j < E.length - 1 && !(n(E[j]) || u(E[j]) || a(E[j])))
          throw new h(`streams[${j}]`, b[j], "must be readable");
        if (j > 0 && !(s(E[j]) || d(E[j]) || a(E[j])))
          throw new h(`streams[${j}]`, b[j], "must be writable");
      }
    let c, y, g, v, x;
    function $(j) {
      const B = v;
      v = null, B ? B(j) : j ? x.destroy(j) : !A && !re && x.destroy();
    }
    const q = E[0], D = i(E, $), re = !!(s(q) || d(q) || a(q)), A = !!(n(D) || u(D) || a(D));
    if (x = new e({
      // TODO (ronag): highWaterMark?
      writableObjectMode: !!(q != null && q.writableObjectMode),
      readableObjectMode: !!(D != null && D.readableObjectMode),
      writable: re,
      readable: A
    }), re) {
      if (r(q))
        x._write = function(B, T, V) {
          q.write(B, T) ? V() : c = V;
        }, x._final = function(B) {
          q.end(), y = B;
        }, q.on("drain", function() {
          if (c) {
            const B = c;
            c = null, B();
          }
        });
      else if (o(q)) {
        const T = (a(q) ? q.writable : q).getWriter();
        x._write = async function(V, J, ne) {
          try {
            await T.ready, T.write(V).catch(() => {
            }), ne();
          } catch (le) {
            ne(le);
          }
        }, x._final = async function(V) {
          try {
            await T.ready, T.close().catch(() => {
            }), y = V;
          } catch (J) {
            V(J);
          }
        };
      }
      const j = a(D) ? D.readable : D;
      N(j, () => {
        if (y) {
          const B = y;
          y = null, B();
        }
      });
    }
    if (A) {
      if (r(D))
        D.on("readable", function() {
          if (g) {
            const j = g;
            g = null, j();
          }
        }), D.on("end", function() {
          x.push(null);
        }), x._read = function() {
          for (; ; ) {
            const j = D.read();
            if (j === null) {
              g = x._read;
              return;
            }
            if (!x.push(j))
              return;
          }
        };
      else if (o(D)) {
        const B = (a(D) ? D.readable : D).getReader();
        x._read = async function() {
          for (; ; )
            try {
              const { value: T, done: V } = await B.read();
              if (!x.push(T))
                return;
              if (V) {
                x.push(null);
                return;
              }
            } catch {
              return;
            }
        };
      }
    }
    return x._destroy = function(j, B) {
      !j && v !== null && (j = new _()), g = null, c = null, y = null, v === null ? B(j) : (v = B, r(D) && t(D, j));
    }, x;
  }, lr;
}
var dn;
function wi() {
  if (dn) return wt;
  dn = 1;
  const i = globalThis.AbortController || ft().AbortController, {
    codes: { ERR_INVALID_ARG_VALUE: e, ERR_INVALID_ARG_TYPE: t, ERR_MISSING_ARGS: r, ERR_OUT_OF_RANGE: n },
    AbortError: s
  } = ge(), { validateAbortSignal: o, validateInteger: a, validateObject: d } = ct(), u = ce().Symbol("kWeak"), _ = ce().Symbol("kResistStopPropagation"), { finished: h } = Ce(), S = Pn(), { addAbortSignalNoValidate: N } = jt(), { isWritable: I, isNodeStream: E } = Le(), { deprecate: b } = we(), {
    ArrayPrototypePush: c,
    Boolean: y,
    MathFloor: g,
    Number: v,
    NumberIsNaN: x,
    Promise: $,
    PromiseReject: q,
    PromiseResolve: D,
    PromisePrototypeThen: re,
    Symbol: A
  } = ce(), j = A("kEmpty"), B = A("kEof");
  function T(L, F) {
    if (F != null && d(F, "options"), F?.signal != null && o(F.signal, "options.signal"), E(L) && !I(L))
      throw new e("stream", L, "must be writable");
    const Z = S(this, L);
    return F != null && F.signal && N(F.signal, Z), Z;
  }
  function V(L, F) {
    if (typeof L != "function")
      throw new t("fn", ["Function", "AsyncFunction"], L);
    F != null && d(F, "options"), F?.signal != null && o(F.signal, "options.signal");
    let Z = 1;
    F?.concurrency != null && (Z = g(F.concurrency));
    let ae = Z - 1;
    return F?.highWaterMark != null && (ae = g(F.highWaterMark)), a(Z, "options.concurrency", 1), a(ae, "options.highWaterMark", 0), ae += Z, (async function* () {
      const m = we().AbortSignalAny(
        [F?.signal].filter(y)
      ), R = this, P = [], H = {
        signal: m
      };
      let Q, U, w = false, W = 0;
      function G() {
        w = true, k();
      }
      function k() {
        W -= 1, fe();
      }
      function fe() {
        U && !w && W < Z && P.length < ae && (U(), U = null);
      }
      async function ye() {
        try {
          for await (let de of R) {
            if (w)
              return;
            if (m.aborted)
              throw new s();
            try {
              if (de = L(de, H), de === j)
                continue;
              de = D(de);
            } catch (me) {
              de = q(me);
            }
            W += 1, re(de, k, G), P.push(de), Q && (Q(), Q = null), !w && (P.length >= ae || W >= Z) && await new $((me) => {
              U = me;
            });
          }
          P.push(B);
        } catch (de) {
          const me = q(de);
          re(me, k, G), P.push(me);
        } finally {
          w = true, Q && (Q(), Q = null);
        }
      }
      ye();
      try {
        for (; ; ) {
          for (; P.length > 0; ) {
            const de = await P[0];
            if (de === B)
              return;
            if (m.aborted)
              throw new s();
            de !== j && (yield de), P.shift(), fe();
          }
          await new $((de) => {
            Q = de;
          });
        }
      } finally {
        w = true, U && (U(), U = null);
      }
    }).call(this);
  }
  function J(L = void 0) {
    return L != null && d(L, "options"), L?.signal != null && o(L.signal, "options.signal"), (async function* () {
      let Z = 0;
      for await (const se of this) {
        var ae;
        if (L != null && (ae = L.signal) !== null && ae !== void 0 && ae.aborted)
          throw new s({
            cause: L.signal.reason
          });
        yield [Z++, se];
      }
    }).call(this);
  }
  async function ne(L, F = void 0) {
    for await (const Z of p.call(this, L, F))
      return true;
    return false;
  }
  async function le(L, F = void 0) {
    if (typeof L != "function")
      throw new t("fn", ["Function", "AsyncFunction"], L);
    return !await ne.call(
      this,
      async (...Z) => !await L(...Z),
      F
    );
  }
  async function C(L, F) {
    for await (const Z of p.call(this, L, F))
      return Z;
  }
  async function ee(L, F) {
    if (typeof L != "function")
      throw new t("fn", ["Function", "AsyncFunction"], L);
    async function Z(ae, se) {
      return await L(ae, se), j;
    }
    for await (const ae of V.call(this, Z, F)) ;
  }
  function p(L, F) {
    if (typeof L != "function")
      throw new t("fn", ["Function", "AsyncFunction"], L);
    async function Z(ae, se) {
      return await L(ae, se) ? ae : j;
    }
    return V.call(this, Z, F);
  }
  class M extends r {
    constructor() {
      super("reduce"), this.message = "Reduce of an empty stream requires an initial value";
    }
  }
  async function Y(L, F, Z) {
    var ae;
    if (typeof L != "function")
      throw new t("reducer", ["Function", "AsyncFunction"], L);
    Z != null && d(Z, "options"), Z?.signal != null && o(Z.signal, "options.signal");
    let se = arguments.length > 1;
    if (Z != null && (ae = Z.signal) !== null && ae !== void 0 && ae.aborted) {
      const Q = new s(void 0, {
        cause: Z.signal.reason
      });
      throw this.once("error", () => {
      }), await h(this.destroy(Q)), Q;
    }
    const m = new i(), R = m.signal;
    if (Z != null && Z.signal) {
      const Q = {
        once: true,
        [u]: this,
        [_]: true
      };
      Z.signal.addEventListener("abort", () => m.abort(), Q);
    }
    let P = false;
    try {
      for await (const Q of this) {
        var H;
        if (P = true, Z != null && (H = Z.signal) !== null && H !== void 0 && H.aborted)
          throw new s();
        se ? F = await L(F, Q, {
          signal: R
        }) : (F = Q, se = true);
      }
      if (!P && !se)
        throw new M();
    } finally {
      m.abort();
    }
    return F;
  }
  async function O(L) {
    L != null && d(L, "options"), L?.signal != null && o(L.signal, "options.signal");
    const F = [];
    for await (const ae of this) {
      var Z;
      if (L != null && (Z = L.signal) !== null && Z !== void 0 && Z.aborted)
        throw new s(void 0, {
          cause: L.signal.reason
        });
      c(F, ae);
    }
    return F;
  }
  function X(L, F) {
    const Z = V.call(this, L, F);
    return (async function* () {
      for await (const se of Z)
        yield* se;
    }).call(this);
  }
  function ie(L) {
    if (L = v(L), x(L))
      return 0;
    if (L < 0)
      throw new n("number", ">= 0", L);
    return L;
  }
  function ue(L, F = void 0) {
    return F != null && d(F, "options"), F?.signal != null && o(F.signal, "options.signal"), L = ie(L), (async function* () {
      var ae;
      if (F != null && (ae = F.signal) !== null && ae !== void 0 && ae.aborted)
        throw new s();
      for await (const m of this) {
        var se;
        if (F != null && (se = F.signal) !== null && se !== void 0 && se.aborted)
          throw new s();
        L-- <= 0 && (yield m);
      }
    }).call(this);
  }
  function oe(L, F = void 0) {
    return F != null && d(F, "options"), F?.signal != null && o(F.signal, "options.signal"), L = ie(L), (async function* () {
      var ae;
      if (F != null && (ae = F.signal) !== null && ae !== void 0 && ae.aborted)
        throw new s();
      for await (const m of this) {
        var se;
        if (F != null && (se = F.signal) !== null && se !== void 0 && se.aborted)
          throw new s();
        if (L-- > 0 && (yield m), L <= 0)
          return;
      }
    }).call(this);
  }
  return wt.streamReturningOperators = {
    asIndexedPairs: b(J, "readable.asIndexedPairs will be removed in a future version."),
    drop: ue,
    filter: p,
    flatMap: X,
    map: V,
    take: oe,
    compose: T
  }, wt.promiseReturningOperators = {
    every: le,
    forEach: ee,
    reduce: Y,
    toArray: O,
    some: ne,
    find: C
  }, wt;
}
var ur;
var cn;
function Ln() {
  if (cn) return ur;
  cn = 1;
  const { ArrayPrototypePop: i, Promise: e } = ce(), { isIterable: t, isNodeStream: r, isWebStream: n } = Le(), { pipelineImpl: s } = wr(), { finished: o } = Ce();
  $n();
  function a(...d) {
    return new e((u, _) => {
      let h, S;
      const N = d[d.length - 1];
      if (N && typeof N == "object" && !r(N) && !t(N) && !n(N)) {
        const I = i(d);
        h = I.signal, S = I.end;
      }
      s(
        d,
        (I, E) => {
          I ? _(I) : u(E);
        },
        {
          signal: h,
          end: S
        }
      );
    });
  }
  return ur = {
    finished: o,
    pipeline: a
  }, ur;
}
var hn;
function $n() {
  if (hn) return Wt.exports;
  hn = 1;
  const { Buffer: i } = import_buffer.default, { ObjectDefineProperty: e, ObjectKeys: t, ReflectApply: r } = ce(), {
    promisify: { custom: n }
  } = we(), { streamReturningOperators: s, promiseReturningOperators: o } = wi(), {
    codes: { ERR_ILLEGAL_CONSTRUCTOR: a }
  } = ge(), d = Pn(), { setDefaultHighWaterMark: u, getDefaultHighWaterMark: _ } = Pt(), { pipeline: h } = wr(), { destroyer: S } = Ye(), N = Ce(), I = Ln(), E = Le(), b = Wt.exports = gr().Stream;
  b.isDestroyed = E.isDestroyed, b.isDisturbed = E.isDisturbed, b.isErrored = E.isErrored, b.isReadable = E.isReadable, b.isWritable = E.isWritable, b.Readable = Lt();
  for (const y of t(s)) {
    let v = function(...x) {
      if (new.target)
        throw a();
      return b.Readable.from(r(g, this, x));
    };
    const g = s[y];
    e(v, "name", {
      __proto__: null,
      value: g.name
    }), e(v, "length", {
      __proto__: null,
      value: g.length
    }), e(b.Readable.prototype, y, {
      __proto__: null,
      value: v,
      enumerable: false,
      configurable: true,
      writable: true
    });
  }
  for (const y of t(o)) {
    let v = function(...x) {
      if (new.target)
        throw a();
      return r(g, this, x);
    };
    const g = o[y];
    e(v, "name", {
      __proto__: null,
      value: g.name
    }), e(v, "length", {
      __proto__: null,
      value: g.length
    }), e(b.Readable.prototype, y, {
      __proto__: null,
      value: v,
      enumerable: false,
      configurable: true,
      writable: true
    });
  }
  b.Writable = yr(), b.Duplex = Pe(), b.Transform = Nn(), b.PassThrough = jn(), b.pipeline = h;
  const { addAbortSignal: c } = jt();
  return b.addAbortSignal = c, b.finished = N, b.destroy = S, b.compose = d, b.setDefaultHighWaterMark = u, b.getDefaultHighWaterMark = _, e(b, "promises", {
    __proto__: null,
    configurable: true,
    enumerable: true,
    get() {
      return I;
    }
  }), e(h, n, {
    __proto__: null,
    enumerable: true,
    get() {
      return I.pipeline;
    }
  }), e(N, n, {
    __proto__: null,
    enumerable: true,
    get() {
      return I.finished;
    }
  }), b.Stream = b, b._isUint8Array = function(g) {
    return g instanceof Uint8Array;
  }, b._uint8ArrayToBuffer = function(g) {
    return i.from(g.buffer, g.byteOffset, g.byteLength);
  }, Wt.exports;
}
var pn;
function mi() {
  return pn || (pn = 1, (function(i) {
    const e = $n(), t = Ln(), r = e.Readable.destroy;
    i.exports = e.Readable, i.exports._uint8ArrayToBuffer = e._uint8ArrayToBuffer, i.exports._isUint8Array = e._isUint8Array, i.exports.isDisturbed = e.isDisturbed, i.exports.isErrored = e.isErrored, i.exports.isReadable = e.isReadable, i.exports.Readable = e.Readable, i.exports.Writable = e.Writable, i.exports.Duplex = e.Duplex, i.exports.Transform = e.Transform, i.exports.PassThrough = e.PassThrough, i.exports.addAbortSignal = e.addAbortSignal, i.exports.finished = e.finished, i.exports.destroy = e.destroy, i.exports.destroy = r, i.exports.pipeline = e.pipeline, i.exports.compose = e.compose, Object.defineProperty(e, "promises", {
      configurable: true,
      enumerable: true,
      get() {
        return t;
      }
    }), i.exports.Stream = e.Stream, i.exports.default = i.exports;
  })(Ft)), Ft.exports;
}
var On = mi();
var fr = /* @__PURE__ */ Symbol("iter");
function ut(i, e, t = 4) {
  if (t === 0)
    return Object.assign(i, e);
  for (const r in e)
    i[r] = ut(i[r] || /* @__PURE__ */ Object.create(null), e[r], t - 1);
  return i;
}
function kn(i, e, t = 4) {
  let r = false;
  for (const n in i)
    if (n in e) {
      const s = t === 0 ? null : kn(i[n], e[n], t - 1);
      if (s !== false)
        r = r || /* @__PURE__ */ Object.create(null), r[n] = s;
      else if (t === 3)
        return false;
    }
  return r;
}
function Dn(i, e, t = 4) {
  let r = false;
  for (const n in i)
    if (!(n in e))
      r = r || /* @__PURE__ */ Object.create(null), r[n] = t === 0 ? null : ut({}, i[n], t - 1);
    else if (t !== 0) {
      const s = Dn(i[n], e[n], t - 1);
      if (s !== false)
        r = r || /* @__PURE__ */ Object.create(null), r[n] = s;
      else if (t === 3)
        return false;
    }
  return r;
}
var Si = class {
  constructor(e = {}) {
    this._id = 1, this._ids = /* @__PURE__ */ Object.create(null), this._ids[""] = 1, this._entities = /* @__PURE__ */ Object.create(null), this._entities[1] = "", this._blankNodeIndex = 0, this._factory = e.factory || ve;
  }
  _termFromId(e) {
    if (e[0] === ".") {
      const t = this._entities, r = e.split(".");
      return this._factory.quad(
        this._termFromId(t[r[1]]),
        this._termFromId(t[r[2]]),
        this._termFromId(t[r[3]]),
        r[4] && this._termFromId(t[r[4]])
      );
    }
    return at(e, this._factory);
  }
  _termToNumericId(e) {
    if (e.termType === "Quad") {
      const t = this._termToNumericId(e.subject), r = this._termToNumericId(e.predicate), n = this._termToNumericId(e.object);
      let s;
      return t && r && n && (cr(e.graph) || (s = this._termToNumericId(e.graph))) && this._ids[s ? `.${t}.${r}.${n}.${s}` : `.${t}.${r}.${n}`];
    }
    return this._ids[He(e)];
  }
  _termToNewNumericId(e) {
    const t = e && e.termType === "Quad" ? `.${this._termToNewNumericId(e.subject)}.${this._termToNewNumericId(e.predicate)}.${this._termToNewNumericId(e.object)}${cr(e.graph) ? "" : `.${this._termToNewNumericId(e.graph)}`}` : He(e);
    return this._ids[t] || (this._ids[this._entities[++this._id] = t] = this._id);
  }
  createBlankNode(e) {
    let t, r;
    if (e)
      for (t = e = `_:${e}`, r = 1; this._ids[t]; )
        t = e + r++;
    else
      do
        t = `_:b${this._blankNodeIndex++}`;
      while (this._ids[t]);
    return this._ids[t] = ++this._id, this._entities[this._id] = t, this._factory.blankNode(t.substr(2));
  }
};
var he = class _he {
  constructor(e, t) {
    this._size = 0, this._graphs = /* @__PURE__ */ Object.create(null), !t && e && !e[0] && typeof e.match != "function" && (t = e, e = null), t = t || {}, this._factory = t.factory || ve, this._entityIndex = t.entityIndex || new Si({ factory: this._factory }), this._entities = this._entityIndex._entities, this._termFromId = this._entityIndex._termFromId.bind(this._entityIndex), this._termToNumericId = this._entityIndex._termToNumericId.bind(this._entityIndex), this._termToNewNumericId = this._entityIndex._termToNewNumericId.bind(this._entityIndex), e && this.addAll(e);
  }
  // ## Public properties
  // ### `size` returns the number of quads in the store
  get size() {
    let e = this._size;
    if (e !== null)
      return e;
    e = 0;
    const t = this._graphs;
    let r, n;
    for (const s in t)
      for (const o in r = t[s].subjects)
        for (const a in n = r[o])
          e += Object.keys(n[a]).length;
    return this._size = e;
  }
  // ## Private methods
  // ### `_addToIndex` adds a quad to a three-layered index.
  // Returns if the index has changed, if the entry did not already exist.
  _addToIndex(e, t, r, n) {
    const s = e[t] || (e[t] = {}), o = s[r] || (s[r] = {}), a = n in o;
    return a || (o[n] = null), !a;
  }
  // ### `_removeFromIndex` removes a quad from a three-layered index
  _removeFromIndex(e, t, r, n) {
    const s = e[t], o = s[r];
    delete o[n];
    for (const a in o) return;
    delete s[r];
    for (const a in s) return;
    delete e[t];
  }
  // ### `_findInIndex` finds a set of quads in a three-layered index.
  // The index base is `index0` and the keys at each level are `key0`, `key1`, and `key2`.
  // Any of these keys can be undefined, which is interpreted as a wildcard.
  // `name0`, `name1`, and `name2` are the names of the keys at each level,
  // used when reconstructing the resulting quad
  // (for instance: _subject_, _predicate_, and _object_).
  // Finally, `graphId` will be the graph of the created quads.
  *_findInIndex(e, t, r, n, s, o, a, d) {
    let u, _, h;
    const S = this._entities, N = this._termFromId(S[d]), I = { subject: null, predicate: null, object: null };
    t && ((u = e, e = {})[t] = u[t]);
    for (const E in e)
      if (_ = e[E]) {
        I[s] = this._termFromId(S[E]), r && ((u = _, _ = {})[r] = u[r]);
        for (const b in _)
          if (h = _[b]) {
            I[o] = this._termFromId(S[b]);
            const c = n ? n in h ? [n] : [] : Object.keys(h);
            for (let y = 0; y < c.length; y++)
              I[a] = this._termFromId(S[c[y]]), yield this._factory.quad(I.subject, I.predicate, I.object, N);
          }
      }
  }
  // ### `_loop` executes the callback on all keys of index 0
  _loop(e, t) {
    for (const r in e)
      t(r);
  }
  // ### `_loopByKey0` executes the callback on all keys of a certain entry in index 0
  _loopByKey0(e, t, r) {
    let n, s;
    if (n = e[t])
      for (s in n)
        r(s);
  }
  // ### `_loopByKey1` executes the callback on given keys of all entries in index 0
  _loopByKey1(e, t, r) {
    let n, s;
    for (n in e)
      s = e[n], s[t] && r(n);
  }
  // ### `_loopBy2Keys` executes the callback on given keys of certain entries in index 2
  _loopBy2Keys(e, t, r, n) {
    let s, o, a;
    if ((s = e[t]) && (o = s[r]))
      for (a in o)
        n(a);
  }
  // ### `_countInIndex` counts matching quads in a three-layered index.
  // The index base is `index0` and the keys at each level are `key0`, `key1`, and `key2`.
  // Any of these keys can be undefined, which is interpreted as a wildcard.
  _countInIndex(e, t, r, n) {
    let s = 0, o, a, d;
    t && ((o = e, e = {})[t] = o[t]);
    for (const u in e)
      if (a = e[u]) {
        r && ((o = a, a = {})[r] = o[r]);
        for (const _ in a)
          (d = a[_]) && (n ? n in d && s++ : s += Object.keys(d).length);
      }
    return s;
  }
  // ### `_getGraphs` returns an array with the given graph,
  // or all graphs if the argument is null or undefined.
  _getGraphs(e) {
    return e = e === "" ? 1 : e && (this._termToNumericId(e) || -1), typeof e != "number" ? this._graphs : { [e]: this._graphs[e] };
  }
  // ### `_uniqueEntities` returns a function that accepts an entity ID
  // and passes the corresponding entity to callback if it hasn't occurred before.
  _uniqueEntities(e) {
    const t = /* @__PURE__ */ Object.create(null);
    return (r) => {
      r in t || (t[r] = true, e(this._termFromId(this._entities[r], this._factory)));
    };
  }
  // ## Public methods
  // ### `add` adds the specified quad to the dataset.
  // Returns the dataset instance it was called on.
  // Existing quads, as defined in Quad.equals, will be ignored.
  add(e) {
    return this.addQuad(e), this;
  }
  // ### `addQuad` adds a new quad to the store.
  // Returns if the quad index has changed, if the quad did not already exist.
  addQuad(e, t, r, n) {
    t || (n = e.graph, r = e.object, t = e.predicate, e = e.subject), n = n ? this._termToNewNumericId(n) : 1;
    let s = this._graphs[n];
    return s || (s = this._graphs[n] = { subjects: {}, predicates: {}, objects: {} }, Object.freeze(s)), e = this._termToNewNumericId(e), t = this._termToNewNumericId(t), r = this._termToNewNumericId(r), this._addToIndex(s.subjects, e, t, r) ? (this._addToIndex(s.predicates, t, r, e), this._addToIndex(s.objects, r, e, t), this._size = null, true) : false;
  }
  // ### `addQuads` adds multiple quads to the store
  addQuads(e) {
    for (let t = 0; t < e.length; t++)
      this.addQuad(e[t]);
  }
  // ### `delete` removes the specified quad from the dataset.
  // Returns the dataset instance it was called on.
  delete(e) {
    return this.removeQuad(e), this;
  }
  // ### `has` determines whether a dataset includes a certain quad or quad pattern.
  has(e, t, r, n) {
    return e && e.subject && ({ subject: e, predicate: t, object: r, graph: n } = e), !this.readQuads(e, t, r, n).next().done;
  }
  // ### `import` adds a stream of quads to the store
  import(e) {
    return e.on("data", (t) => {
      this.addQuad(t);
    }), e;
  }
  // ### `removeQuad` removes a quad from the store if it exists
  removeQuad(e, t, r, n) {
    t || ({ subject: e, predicate: t, object: r, graph: n } = e), n = n ? this._termToNumericId(n) : 1;
    const s = this._graphs;
    let o, a, d;
    if (!(e = e && this._termToNumericId(e)) || !(t = t && this._termToNumericId(t)) || !(r = r && this._termToNumericId(r)) || !(o = s[n]) || !(a = o.subjects[e]) || !(d = a[t]) || !(r in d))
      return false;
    this._removeFromIndex(o.subjects, e, t, r), this._removeFromIndex(o.predicates, t, r, e), this._removeFromIndex(o.objects, r, e, t), this._size !== null && this._size--;
    for (e in o.subjects) return true;
    return delete s[n], true;
  }
  // ### `removeQuads` removes multiple quads from the store
  removeQuads(e) {
    for (let t = 0; t < e.length; t++)
      this.removeQuad(e[t]);
  }
  // ### `remove` removes a stream of quads from the store
  remove(e) {
    return e.on("data", (t) => {
      this.removeQuad(t);
    }), e;
  }
  // ### `removeMatches` removes all matching quads from the store
  // Setting any field to `undefined` or `null` indicates a wildcard.
  removeMatches(e, t, r, n) {
    const s = new On.Readable({ objectMode: true }), o = this.readQuads(e, t, r, n);
    return s._read = (a) => {
      for (; --a >= 0; ) {
        const { done: d, value: u } = o.next();
        if (d) {
          s.push(null);
          return;
        }
        s.push(u);
      }
    }, this.remove(s);
  }
  // ### `deleteGraph` removes all triples with the given graph from the store
  deleteGraph(e) {
    return this.removeMatches(null, null, null, e);
  }
  // ### `getQuads` returns an array of quads matching a pattern.
  // Setting any field to `undefined` or `null` indicates a wildcard.
  getQuads(e, t, r, n) {
    return [...this.readQuads(e, t, r, n)];
  }
  /**
   * `readQuads` returns a generator of quads matching a pattern.
   * Setting any field to `undefined` or `null` indicates a wildcard.
   * @deprecated Use `match` instead.
   */
  *readQuads(e, t, r, n) {
    const s = this._getGraphs(n);
    let o, a, d, u;
    if (!(e && !(a = this._termToNumericId(e)) || t && !(d = this._termToNumericId(t)) || r && !(u = this._termToNumericId(r))))
      for (const _ in s)
        (o = s[_]) && (a ? u ? yield* this._findInIndex(
          o.objects,
          u,
          a,
          d,
          "object",
          "subject",
          "predicate",
          _
        ) : yield* this._findInIndex(
          o.subjects,
          a,
          d,
          null,
          "subject",
          "predicate",
          "object",
          _
        ) : d ? yield* this._findInIndex(
          o.predicates,
          d,
          u,
          null,
          "predicate",
          "object",
          "subject",
          _
        ) : u ? yield* this._findInIndex(
          o.objects,
          u,
          null,
          null,
          "object",
          "subject",
          "predicate",
          _
        ) : yield* this._findInIndex(
          o.subjects,
          null,
          null,
          null,
          "subject",
          "predicate",
          "object",
          _
        ));
  }
  // ### `match` returns a new dataset that is comprised of all quads in the current instance matching the given arguments.
  // The logic described in Quad Matching is applied for each quad in this dataset to check if it should be included in the output dataset.
  // Note: This method always returns a new DatasetCore, even if that dataset contains no quads.
  // Note: Since a DatasetCore is an unordered set, the order of the quads within the returned sequence is arbitrary.
  // Setting any field to `undefined` or `null` indicates a wildcard.
  // For backwards compatibility, the object return also implements the Readable stream interface.
  match(e, t, r, n) {
    return new ke(this, e, t, r, n, { entityIndex: this._entityIndex });
  }
  // ### `countQuads` returns the number of quads matching a pattern.
  // Setting any field to `undefined` or `null` indicates a wildcard.
  countQuads(e, t, r, n) {
    const s = this._getGraphs(n);
    let o = 0, a, d, u, _;
    if (e && !(d = this._termToNumericId(e)) || t && !(u = this._termToNumericId(t)) || r && !(_ = this._termToNumericId(r)))
      return 0;
    for (const h in s)
      (a = s[h]) && (e ? r ? o += this._countInIndex(a.objects, _, d, u) : o += this._countInIndex(a.subjects, d, u, _) : t ? o += this._countInIndex(a.predicates, u, _, d) : o += this._countInIndex(a.objects, _, d, u));
    return o;
  }
  // ### `forEach` executes the callback on all quads.
  // Setting any field to `undefined` or `null` indicates a wildcard.
  forEach(e, t, r, n, s) {
    this.some((o) => (e(o, this), false), t, r, n, s);
  }
  // ### `every` executes the callback on all quads,
  // and returns `true` if it returns truthy for all them.
  // Setting any field to `undefined` or `null` indicates a wildcard.
  every(e, t, r, n, s) {
    return !this.some((o) => !e(o, this), t, r, n, s);
  }
  // ### `some` executes the callback on all quads,
  // and returns `true` if it returns truthy for any of them.
  // Setting any field to `undefined` or `null` indicates a wildcard.
  some(e, t, r, n, s) {
    for (const o of this.readQuads(t, r, n, s))
      if (e(o, this))
        return true;
    return false;
  }
  // ### `getSubjects` returns all subjects that match the pattern.
  // Setting any field to `undefined` or `null` indicates a wildcard.
  getSubjects(e, t, r) {
    const n = [];
    return this.forSubjects((s) => {
      n.push(s);
    }, e, t, r), n;
  }
  // ### `forSubjects` executes the callback on all subjects that match the pattern.
  // Setting any field to `undefined` or `null` indicates a wildcard.
  forSubjects(e, t, r, n) {
    const s = this._getGraphs(n);
    let o, a, d;
    if (e = this._uniqueEntities(e), !(t && !(a = this._termToNumericId(t)) || r && !(d = this._termToNumericId(r))))
      for (n in s)
        (o = s[n]) && (a ? d ? this._loopBy2Keys(o.predicates, a, d, e) : this._loopByKey1(o.subjects, a, e) : d ? this._loopByKey0(o.objects, d, e) : this._loop(o.subjects, e));
  }
  // ### `getPredicates` returns all predicates that match the pattern.
  // Setting any field to `undefined` or `null` indicates a wildcard.
  getPredicates(e, t, r) {
    const n = [];
    return this.forPredicates((s) => {
      n.push(s);
    }, e, t, r), n;
  }
  // ### `forPredicates` executes the callback on all predicates that match the pattern.
  // Setting any field to `undefined` or `null` indicates a wildcard.
  forPredicates(e, t, r, n) {
    const s = this._getGraphs(n);
    let o, a, d;
    if (e = this._uniqueEntities(e), !(t && !(a = this._termToNumericId(t)) || r && !(d = this._termToNumericId(r))))
      for (n in s)
        (o = s[n]) && (a ? d ? this._loopBy2Keys(o.objects, d, a, e) : this._loopByKey0(o.subjects, a, e) : d ? this._loopByKey1(o.predicates, d, e) : this._loop(o.predicates, e));
  }
  // ### `getObjects` returns all objects that match the pattern.
  // Setting any field to `undefined` or `null` indicates a wildcard.
  getObjects(e, t, r) {
    const n = [];
    return this.forObjects((s) => {
      n.push(s);
    }, e, t, r), n;
  }
  // ### `forObjects` executes the callback on all objects that match the pattern.
  // Setting any field to `undefined` or `null` indicates a wildcard.
  forObjects(e, t, r, n) {
    const s = this._getGraphs(n);
    let o, a, d;
    if (e = this._uniqueEntities(e), !(t && !(a = this._termToNumericId(t)) || r && !(d = this._termToNumericId(r))))
      for (n in s)
        (o = s[n]) && (a ? d ? this._loopBy2Keys(o.subjects, a, d, e) : this._loopByKey1(o.objects, a, e) : d ? this._loopByKey0(o.predicates, d, e) : this._loop(o.objects, e));
  }
  // ### `getGraphs` returns all graphs that match the pattern.
  // Setting any field to `undefined` or `null` indicates a wildcard.
  getGraphs(e, t, r) {
    const n = [];
    return this.forGraphs((s) => {
      n.push(s);
    }, e, t, r), n;
  }
  // ### `forGraphs` executes the callback on all graphs that match the pattern.
  // Setting any field to `undefined` or `null` indicates a wildcard.
  forGraphs(e, t, r, n) {
    for (const s in this._graphs)
      this.some((o) => (e(o.graph), true), t, r, n, this._termFromId(this._entities[s]));
  }
  // ### `createBlankNode` creates a new blank node, returning its name
  createBlankNode(e) {
    return this._entityIndex.createBlankNode(e);
  }
  // ### `extractLists` finds and removes all list triples
  // and returns the items per list.
  extractLists({ remove: e = false, ignoreErrors: t = false } = {}) {
    const r = {}, n = t ? (() => true) : ((a, d) => {
      throw new Error(`${a.value} ${d}`);
    }), s = this.getQuads(null, pe.rdf.rest, pe.rdf.nil, null), o = e ? [...s] : [];
    return s.forEach((a) => {
      const d = [];
      let u = false, _, h;
      const S = a.graph;
      let N = a.subject;
      for (; N && !u; ) {
        const I = this.getQuads(null, null, N, null), E = this.getQuads(N, null, null, null);
        let b, c = null, y = null, g = null;
        for (let v = 0; v < E.length && !u; v++)
          b = E[v], b.graph.equals(S) ? _ ? u = n(N, "has non-list arcs out") : b.predicate.value === pe.rdf.first ? c ? u = n(N, "has multiple rdf:first arcs") : o.push(c = b) : b.predicate.value === pe.rdf.rest ? y ? u = n(N, "has multiple rdf:rest arcs") : o.push(y = b) : I.length ? u = n(N, "can't be subject and object") : (_ = b, h = "subject") : u = n(N, "not confined to single graph");
        for (let v = 0; v < I.length && !u; ++v)
          b = I[v], _ ? u = n(N, "can't have coreferences") : b.predicate.value === pe.rdf.rest ? g ? u = n(N, "has incoming rdf:rest arcs") : g = b : (_ = b, h = "object");
        c ? d.unshift(c.object) : u = n(N, "has no list head"), N = g && g.subject;
      }
      u ? e = false : _ && (r[_[h].value] = d);
    }), e && this.removeQuads(o), r;
  }
  /**
   * Returns `true` if the current dataset is a superset of the given dataset; in other words, returns `true` if
   * the given dataset is a subset of, i.e., is contained within, the current dataset.
   *
   * Blank Nodes will be normalized.
   */
  addAll(e) {
    if (e instanceof ke && (e = e.filtered), Array.isArray(e))
      this.addQuads(e);
    else if (e instanceof _he && e._entityIndex === this._entityIndex)
      e._size !== 0 && (this._graphs = ut(this._graphs, e._graphs), this._size = null);
    else
      for (const t of e)
        this.add(t);
    return this;
  }
  /**
   * Returns `true` if the current dataset is a superset of the given dataset; in other words, returns `true` if
   * the given dataset is a subset of, i.e., is contained within, the current dataset.
   *
   * Blank Nodes will be normalized.
   */
  contains(e) {
    if (e instanceof ke && (e = e.filtered), e === this)
      return true;
    if (!(e instanceof _he) || this._entityIndex !== e._entityIndex)
      return e.every((u) => this.has(u));
    const t = this._graphs, r = e._graphs;
    let n, s, o, a, d;
    for (const u in r) {
      if (!(n = t[u])) return false;
      n = n.subjects;
      for (const _ in s = r[u].subjects) {
        if (!(o = n[_])) return false;
        for (const h in a = s[_]) {
          if (!(d = o[h])) return false;
          for (const S in a[h])
            if (!(S in d)) return false;
        }
      }
    }
    return true;
  }
  /**
   * This method removes the quads in the current dataset that match the given arguments.
   *
   * The logic described in {@link https://rdf.js.org/dataset-spec/#quad-matching|Quad Matching} is applied for each
   * quad in this dataset, to select the quads which will be deleted.
   *
   * @param subject   The optional exact subject to match.
   * @param predicate The optional exact predicate to match.
   * @param object    The optional exact object to match.
   * @param graph     The optional exact graph to match.
   */
  deleteMatches(e, t, r, n) {
    for (const s of this.match(e, t, r, n))
      this.removeQuad(s);
    return this;
  }
  /**
   * Returns a new dataset that contains all quads from the current dataset that are not included in the given dataset.
   */
  difference(e) {
    if (e && e instanceof ke && (e = e.filtered), e === this)
      return new _he({ entityIndex: this._entityIndex });
    if (e instanceof _he && e._entityIndex === this._entityIndex) {
      const t = new _he({ entityIndex: this._entityIndex }), r = Dn(this._graphs, e._graphs);
      return r && (t._graphs = r, t._size = null), t;
    }
    return this.filter((t) => !e.has(t));
  }
  /**
   * Returns true if the current dataset contains the same graph structure as the given dataset.
   *
   * Blank Nodes will be normalized.
   */
  equals(e) {
    return e instanceof ke && (e = e.filtered), e === this || this.size === e.size && this.contains(e);
  }
  /**
   * Creates a new dataset with all the quads that pass the test implemented by the provided `iteratee`.
   *
   * This method is aligned with Array.prototype.filter() in ECMAScript-262.
   */
  filter(e) {
    const t = new _he({ entityIndex: this._entityIndex });
    for (const r of this)
      e(r, this) && t.add(r);
    return t;
  }
  /**
   * Returns a new dataset containing all quads from the current dataset that are also included in the given dataset.
   */
  intersection(e) {
    if (e instanceof ke && (e = e.filtered), e === this) {
      const t = new _he({ entityIndex: this._entityIndex });
      return t._graphs = ut(/* @__PURE__ */ Object.create(null), this._graphs), t._size = this._size, t;
    } else if (e instanceof _he && this._entityIndex === e._entityIndex) {
      const t = new _he({ entityIndex: this._entityIndex }), r = kn(e._graphs, this._graphs);
      return r && (t._graphs = r, t._size = null), t;
    }
    return this.filter((t) => e.has(t));
  }
  /**
   * Returns a new dataset containing all quads returned by applying `iteratee` to each quad in the current dataset.
   */
  map(e) {
    const t = new _he({ entityIndex: this._entityIndex });
    for (const r of this)
      t.add(e(r, this));
    return t;
  }
  /**
   * This method calls the `iteratee` method on each `quad` of the `Dataset`. The first time the `iteratee` method
   * is called, the `accumulator` value is the `initialValue`, or, if not given, equals the first quad of the `Dataset`.
   * The return value of each call to the `iteratee` method is used as the `accumulator` value for the next call.
   *
   * This method returns the return value of the last `iteratee` call.
   *
   * This method is aligned with `Array.prototype.reduce()` in ECMAScript-262.
   */
  reduce(e, t) {
    const r = this.readQuads();
    let n = t === void 0 ? r.next().value : t;
    for (const s of r)
      n = e(n, s, this);
    return n;
  }
  /**
   * Returns the set of quads within the dataset as a host-language-native sequence, for example an `Array` in
   * ECMAScript-262.
   *
   * Since a `Dataset` is an unordered set, the order of the quads within the returned sequence is arbitrary.
   */
  toArray() {
    return this.getQuads();
  }
  /**
   * Returns an N-Quads string representation of the dataset, preprocessed with the
   * {@link https://json-ld.github.io/normalization/spec/|RDF Dataset Normalization} algorithm.
   */
  toCanonical() {
    throw new Error("not implemented");
  }
  /**
   * Returns a stream that contains all quads of the dataset.
   */
  toStream() {
    return this.match();
  }
  /**
   * Returns an N-Quads string representation of the dataset.
   *
   * No prior normalization is required, therefore the results for the same quads may vary depending on the `Dataset`
   * implementation.
   */
  toString() {
    return new br().quadsToString(this);
  }
  /**
   * Returns a new `Dataset` that is a concatenation of this dataset and the quads given as an argument.
   */
  union(e) {
    const t = new _he({ entityIndex: this._entityIndex });
    return t._graphs = ut(/* @__PURE__ */ Object.create(null), this._graphs), t._size = this._size, t.addAll(e), t;
  }
  // ### Store is an iterable.
  // Can be used where iterables are expected: for...of loops, array spread operator,
  // `yield*`, and destructuring assignment (order is not guaranteed).
  *[Symbol.iterator]() {
    yield* this.readQuads();
  }
};
function Ae(i, e, t = 0) {
  const r = e[t];
  if (r && !(r in i))
    return false;
  let n = false;
  for (const s in r ? { [r]: i[r] } : i) {
    const o = t === 2 ? null : Ae(i[s], e, t + 1);
    o !== false && (n = n || /* @__PURE__ */ Object.create(null), n[s] = o);
  }
  return n;
}
var ke = class _ke extends On.Readable {
  constructor(e, t, r, n, s, o) {
    super({ objectMode: true }), Object.assign(this, { n3Store: e, subject: t, predicate: r, object: n, graph: s, options: o });
  }
  get filtered() {
    if (!this._filtered) {
      const { n3Store: e, graph: t, object: r, predicate: n, subject: s } = this, o = this._filtered = new he({ factory: e._factory, entityIndex: this.options.entityIndex });
      let a, d, u;
      if (s && !(a = o._termToNumericId(s)) || n && !(d = o._termToNumericId(n)) || r && !(u = o._termToNumericId(r)))
        return o;
      const _ = e._getGraphs(t);
      for (const h in _) {
        let S, N, I, E;
        (E = _[h]) && (!a && d ? (N = Ae(E.predicates, [d, u, a])) && (S = Ae(E.subjects, [a, d, u]), I = Ae(E.objects, [u, a, d])) : u ? (I = Ae(E.objects, [u, a, d])) && (S = Ae(E.subjects, [a, d, u]), N = Ae(E.predicates, [d, u, a])) : (S = Ae(E.subjects, [a, d, u])) && (N = Ae(E.predicates, [d, u, a]), I = Ae(E.objects, [u, a, d])), S && (o._graphs[h] = { subjects: S, predicates: N, objects: I }));
      }
      o._size = null;
    }
    return this._filtered;
  }
  get size() {
    return this.filtered.size;
  }
  _read(e) {
    e > 0 && !this[fr] && (this[fr] = this[Symbol.iterator]());
    const t = this[fr];
    for (; --e >= 0; ) {
      const { done: r, value: n } = t.next();
      if (r) {
        this.push(null);
        return;
      }
      this.push(n);
    }
  }
  addAll(e) {
    return this.filtered.addAll(e);
  }
  contains(e) {
    return this.filtered.contains(e);
  }
  deleteMatches(e, t, r, n) {
    return this.filtered.deleteMatches(e, t, r, n);
  }
  difference(e) {
    return this.filtered.difference(e);
  }
  equals(e) {
    return this.filtered.equals(e);
  }
  every(e, t, r, n, s) {
    return this.filtered.every(e, t, r, n, s);
  }
  filter(e) {
    return this.filtered.filter(e);
  }
  forEach(e, t, r, n, s) {
    return this.filtered.forEach(e, t, r, n, s);
  }
  import(e) {
    return this.filtered.import(e);
  }
  intersection(e) {
    return this.filtered.intersection(e);
  }
  map(e) {
    return this.filtered.map(e);
  }
  some(e, t, r, n, s) {
    return this.filtered.some(e, t, r, n, s);
  }
  toCanonical() {
    return this.filtered.toCanonical();
  }
  toStream() {
    return this._filtered ? this._filtered.toStream() : this.n3Store.match(this.subject, this.predicate, this.object, this.graph);
  }
  union(e) {
    return this._filtered ? this._filtered.union(e) : this.n3Store.match(this.subject, this.predicate, this.object, this.graph).addAll(e);
  }
  toArray() {
    return this._filtered ? this._filtered.toArray() : this.n3Store.getQuads(this.subject, this.predicate, this.object, this.graph);
  }
  reduce(e, t) {
    return this.filtered.reduce(e, t);
  }
  toString() {
    return new br().quadsToString(this);
  }
  add(e) {
    return this.filtered.add(e);
  }
  delete(e) {
    return this.filtered.delete(e);
  }
  has(e) {
    return this.filtered.has(e);
  }
  match(e, t, r, n) {
    return new _ke(this.filtered, e, t, r, n, this.options);
  }
  *[Symbol.iterator]() {
    yield* this._filtered || this.n3Store.readQuads(this.subject, this.predicate, this.object, this.graph);
  }
};
var { namedNode: Ri, quad: Cn } = ve;
var { namedNode: ze, quad: mr } = ve;
var { namedNode: ji } = ve;
var Ze = (i) => (e) => ji(`${i}${e}`);
var Fn = Ze("http://www.w3.org/1999/02/22-rdf-syntax-ns#");
var pr = Ze("http://www.w3.org/2001/XMLSchema#");
var lt = Ze("http://www.nanopub.org/nschema#");
var Ee = Ze("http://purl.org/nanopub/x/");
var bn = Ze("http://www.w3.org/ns/prov#");
var Ge = Ze("http://purl.org/dc/terms/");
var { namedNode: xe, literal: Et, quad: Oe } = ve;
var { namedNode: it } = ve;
var { quad: je, literal: gn } = ve;
var Qe = {
  findNanopubsWithText: "RAWruhiSmyzgZhVRs8QY8YQPAgHzTfl7anxII1de-yaCs/fulltext-search-on-labels",
  findValidNanopubsWithText: "RAMJaSqIk4-qgCud7Kf-ltdE3i8DVP239uQv-BiTGvwUU/fulltext-search-on-labels-all",
  findNanopubsWithPattern: "RAuE9jU8LLwco-iJHiNjzQgEHfx5j-XkbzlutT59cQYiU/find_nanopubs_with_pattern",
  findValidNanopubsWithPattern: "RAIDPTdWRrYy-TOcdEVmGi7JHwn8fBriVphmsCy3mn4r0/find_valid_nanopubs_with_pattern",
  findThings: "RA99xFu2qrCrpOYc1zc7h0SYV4m6Z4OE530dguEhYeoOM/find-things",
  findValidThings: "RARqGauUpDMEA1o4KBSKC8AeP694qJjpbf7x7FOWHDfM8/find-valid-things"
};
var Gi = class {
  constructor(e) {
    this.endpoints = e?.endpoints ?? [
      "https://query.knowledgepixels.com/"
    ];
  }
  async fetchNanopub(e, t = "trig") {
    if (t !== "trig" && t !== "jsonld")
      throw new Error(`Unsupported format: ${t}`);
    const n = await fetch(e, { headers: { Accept: t === "trig" ? "application/trig" : "application/ld+json" } });
    if (!n.ok)
      throw new Error(
        `Failed to fetch nanopub: ${n.status} ${n.statusText}`
      );
    return t === "trig" ? await n.text() : await n.json();
  }
  /** Raw SPARQL query */
  async querySparql(e, t = "json") {
    const r = ["https://query.knowledgepixels.com/repo/full"];
    let n;
    for (const s of r)
      try {
        const o = new URL(s);
        o.searchParams.append("query", e);
        const a = await fetch(o.toString(), {
          headers: {
            Accept: t === "json" ? "application/sparql-results+json" : "text/csv"
          }
        });
        if (!a.ok) {
          if (a.status >= 400 && a.status < 500) return [];
          throw n = new Error(`SPARQL query failed: ${a.status} ${a.statusText}`), n;
        }
        return t === "json" ? (await a.json()).results.bindings.map((u) => {
          const _ = {};
          return Object.entries(u).forEach(([h, S]) => {
            _[h] = S.value;
          }), _;
        }) : await a.text();
      } catch {
      }
    throw new Error("SPARQL query failed on all nanopub endpoints");
  }
  /** Text search */
  async *findNanopubsWithText(e, t, r = true) {
    if (!e) return;
    const n = r ? Qe.findValidNanopubsWithText : Qe.findNanopubsWithText, s = { query: e };
    t && (s.pubkey = t), yield* this._search(n, s);
  }
  /** Pattern search (subj, pred, obj) */
  async *findNanopubsWithPattern(e, t, r, n, s = true) {
    const o = s ? Qe.findValidNanopubsWithPattern : Qe.findNanopubsWithPattern, a = {};
    e && (a.subj = e), t && (a.pred = t), r && (a.obj = r), n && (a.pubkey = n), yield* this._search(o, a);
  }
  /** Find "things" (concepts) */
  async *findThings(e, t = "*:*", r, n = true) {
    const s = n ? Qe.findValidThings : Qe.findThings, o = {
      type: e,
      query: t
    };
    r && (o.pubkey = r), yield* this._search(s, o);
  }
  /** Find retractions of a nanopub URI */
  async findRetractionsOf(e) {
    const t = [];
    for await (const r of this.findNanopubsWithPattern(
      void 0,
      "http://www.nanopub.org/nschema#retracts",
      e
    ))
      t.push(r.np);
    return t;
  }
  /** Internal generic search */
  async *_search(e, t = {}) {
    for (const r of this.endpoints) {
      const n = new URL(`api/${e}`, r);
      Object.entries(t).forEach(([s, o]) => n.searchParams.append(s, o));
      try {
        const s = await fetch(n.toString(), {
          headers: { Accept: "application/sparql-results+json" }
        });
        if (!s.ok) throw new Error(`${s.status} ${s.statusText}`);
        const o = await s.json();
        for (const a of o.results.bindings) {
          const d = {};
          for (const [u, _] of Object.entries(a))
            d[u] = _.value;
          yield d;
        }
      } catch {
      }
    }
  }
  async *runQueryTemplate(e, t = {}) {
    yield* this._search(e, t);
  }
};

// node_modules/@nanopub/nanopub-js/dist/index.js
Ci(Jn);

// node_modules/dompurify/dist/purify.es.mjs
var {
  entries,
  setPrototypeOf,
  isFrozen,
  getPrototypeOf,
  getOwnPropertyDescriptor
} = Object;
var {
  freeze,
  seal,
  create
} = Object;
var {
  apply,
  construct
} = typeof Reflect !== "undefined" && Reflect;
if (!freeze) {
  freeze = function freeze2(x) {
    return x;
  };
}
if (!seal) {
  seal = function seal2(x) {
    return x;
  };
}
if (!apply) {
  apply = function apply2(func, thisArg) {
    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }
    return func.apply(thisArg, args);
  };
}
if (!construct) {
  construct = function construct2(Func) {
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }
    return new Func(...args);
  };
}
var arrayForEach = unapply(Array.prototype.forEach);
var arrayLastIndexOf = unapply(Array.prototype.lastIndexOf);
var arrayPop = unapply(Array.prototype.pop);
var arrayPush = unapply(Array.prototype.push);
var arraySplice = unapply(Array.prototype.splice);
var stringToLowerCase = unapply(String.prototype.toLowerCase);
var stringToString = unapply(String.prototype.toString);
var stringMatch = unapply(String.prototype.match);
var stringReplace = unapply(String.prototype.replace);
var stringIndexOf = unapply(String.prototype.indexOf);
var stringTrim = unapply(String.prototype.trim);
var objectHasOwnProperty = unapply(Object.prototype.hasOwnProperty);
var regExpTest = unapply(RegExp.prototype.test);
var typeErrorCreate = unconstruct(TypeError);
function unapply(func) {
  return function(thisArg) {
    if (thisArg instanceof RegExp) {
      thisArg.lastIndex = 0;
    }
    for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      args[_key3 - 1] = arguments[_key3];
    }
    return apply(func, thisArg, args);
  };
}
function unconstruct(Func) {
  return function() {
    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }
    return construct(Func, args);
  };
}
function addToSet(set, array) {
  let transformCaseFunc = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : stringToLowerCase;
  if (setPrototypeOf) {
    setPrototypeOf(set, null);
  }
  let l = array.length;
  while (l--) {
    let element = array[l];
    if (typeof element === "string") {
      const lcElement = transformCaseFunc(element);
      if (lcElement !== element) {
        if (!isFrozen(array)) {
          array[l] = lcElement;
        }
        element = lcElement;
      }
    }
    set[element] = true;
  }
  return set;
}
function cleanArray(array) {
  for (let index = 0; index < array.length; index++) {
    const isPropertyExist = objectHasOwnProperty(array, index);
    if (!isPropertyExist) {
      array[index] = null;
    }
  }
  return array;
}
function clone(object) {
  const newObject = create(null);
  for (const [property, value] of entries(object)) {
    const isPropertyExist = objectHasOwnProperty(object, property);
    if (isPropertyExist) {
      if (Array.isArray(value)) {
        newObject[property] = cleanArray(value);
      } else if (value && typeof value === "object" && value.constructor === Object) {
        newObject[property] = clone(value);
      } else {
        newObject[property] = value;
      }
    }
  }
  return newObject;
}
function lookupGetter(object, prop) {
  while (object !== null) {
    const desc = getOwnPropertyDescriptor(object, prop);
    if (desc) {
      if (desc.get) {
        return unapply(desc.get);
      }
      if (typeof desc.value === "function") {
        return unapply(desc.value);
      }
    }
    object = getPrototypeOf(object);
  }
  function fallbackValue() {
    return null;
  }
  return fallbackValue;
}
var html$1 = freeze(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "search", "section", "select", "shadow", "slot", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]);
var svg$1 = freeze(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "enterkeyhint", "exportparts", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "inputmode", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "part", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]);
var svgFilters = freeze(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]);
var svgDisallowed = freeze(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]);
var mathMl$1 = freeze(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]);
var mathMlDisallowed = freeze(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]);
var text = freeze(["#text"]);
var html = freeze(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "exportparts", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inert", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "part", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "slot", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns", "slot"]);
var svg = freeze(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "mask-type", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]);
var mathMl = freeze(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]);
var xml = freeze(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]);
var MUSTACHE_EXPR = seal(/\{\{[\w\W]*|[\w\W]*\}\}/gm);
var ERB_EXPR = seal(/<%[\w\W]*|[\w\W]*%>/gm);
var TMPLIT_EXPR = seal(/\$\{[\w\W]*/gm);
var DATA_ATTR = seal(/^data-[\-\w.\u00B7-\uFFFF]+$/);
var ARIA_ATTR = seal(/^aria-[\-\w]+$/);
var IS_ALLOWED_URI = seal(
  /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  // eslint-disable-line no-useless-escape
);
var IS_SCRIPT_OR_DATA = seal(/^(?:\w+script|data):/i);
var ATTR_WHITESPACE = seal(
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
  // eslint-disable-line no-control-regex
);
var DOCTYPE_NAME = seal(/^html$/i);
var CUSTOM_ELEMENT = seal(/^[a-z][.\w]*(-[.\w]+)+$/i);
var EXPRESSIONS = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ARIA_ATTR,
  ATTR_WHITESPACE,
  CUSTOM_ELEMENT,
  DATA_ATTR,
  DOCTYPE_NAME,
  ERB_EXPR,
  IS_ALLOWED_URI,
  IS_SCRIPT_OR_DATA,
  MUSTACHE_EXPR,
  TMPLIT_EXPR
});
var NODE_TYPE = {
  element: 1,
  attribute: 2,
  text: 3,
  cdataSection: 4,
  entityReference: 5,
  // Deprecated
  entityNode: 6,
  // Deprecated
  progressingInstruction: 7,
  comment: 8,
  document: 9,
  documentType: 10,
  documentFragment: 11,
  notation: 12
  // Deprecated
};
var getGlobal = function getGlobal2() {
  return typeof window === "undefined" ? null : window;
};
var _createTrustedTypesPolicy = function _createTrustedTypesPolicy2(trustedTypes, purifyHostElement) {
  if (typeof trustedTypes !== "object" || typeof trustedTypes.createPolicy !== "function") {
    return null;
  }
  let suffix = null;
  const ATTR_NAME = "data-tt-policy-suffix";
  if (purifyHostElement && purifyHostElement.hasAttribute(ATTR_NAME)) {
    suffix = purifyHostElement.getAttribute(ATTR_NAME);
  }
  const policyName = "dompurify" + (suffix ? "#" + suffix : "");
  try {
    return trustedTypes.createPolicy(policyName, {
      createHTML(html2) {
        return html2;
      },
      createScriptURL(scriptUrl) {
        return scriptUrl;
      }
    });
  } catch (_) {
    console.warn("TrustedTypes policy " + policyName + " could not be created.");
    return null;
  }
};
var _createHooksMap = function _createHooksMap2() {
  return {
    afterSanitizeAttributes: [],
    afterSanitizeElements: [],
    afterSanitizeShadowDOM: [],
    beforeSanitizeAttributes: [],
    beforeSanitizeElements: [],
    beforeSanitizeShadowDOM: [],
    uponSanitizeAttribute: [],
    uponSanitizeElement: [],
    uponSanitizeShadowNode: []
  };
};
function createDOMPurify() {
  let window2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : getGlobal();
  const DOMPurify = (root) => createDOMPurify(root);
  DOMPurify.version = "3.3.3";
  DOMPurify.removed = [];
  if (!window2 || !window2.document || window2.document.nodeType !== NODE_TYPE.document || !window2.Element) {
    DOMPurify.isSupported = false;
    return DOMPurify;
  }
  let {
    document: document2
  } = window2;
  const originalDocument = document2;
  const currentScript = originalDocument.currentScript;
  const {
    DocumentFragment,
    HTMLTemplateElement: HTMLTemplateElement2,
    Node,
    Element,
    NodeFilter,
    NamedNodeMap = window2.NamedNodeMap || window2.MozNamedAttrMap,
    HTMLFormElement,
    DOMParser,
    trustedTypes
  } = window2;
  const ElementPrototype = Element.prototype;
  const cloneNode = lookupGetter(ElementPrototype, "cloneNode");
  const remove = lookupGetter(ElementPrototype, "remove");
  const getNextSibling = lookupGetter(ElementPrototype, "nextSibling");
  const getChildNodes = lookupGetter(ElementPrototype, "childNodes");
  const getParentNode = lookupGetter(ElementPrototype, "parentNode");
  if (typeof HTMLTemplateElement2 === "function") {
    const template = document2.createElement("template");
    if (template.content && template.content.ownerDocument) {
      document2 = template.content.ownerDocument;
    }
  }
  let trustedTypesPolicy;
  let emptyHTML = "";
  const {
    implementation,
    createNodeIterator,
    createDocumentFragment,
    getElementsByTagName
  } = document2;
  const {
    importNode
  } = originalDocument;
  let hooks = _createHooksMap();
  DOMPurify.isSupported = typeof entries === "function" && typeof getParentNode === "function" && implementation && implementation.createHTMLDocument !== void 0;
  const {
    MUSTACHE_EXPR: MUSTACHE_EXPR2,
    ERB_EXPR: ERB_EXPR2,
    TMPLIT_EXPR: TMPLIT_EXPR2,
    DATA_ATTR: DATA_ATTR2,
    ARIA_ATTR: ARIA_ATTR2,
    IS_SCRIPT_OR_DATA: IS_SCRIPT_OR_DATA2,
    ATTR_WHITESPACE: ATTR_WHITESPACE2,
    CUSTOM_ELEMENT: CUSTOM_ELEMENT2
  } = EXPRESSIONS;
  let {
    IS_ALLOWED_URI: IS_ALLOWED_URI$1
  } = EXPRESSIONS;
  let ALLOWED_TAGS = null;
  const DEFAULT_ALLOWED_TAGS = addToSet({}, [...html$1, ...svg$1, ...svgFilters, ...mathMl$1, ...text]);
  let ALLOWED_ATTR = null;
  const DEFAULT_ALLOWED_ATTR = addToSet({}, [...html, ...svg, ...mathMl, ...xml]);
  let CUSTOM_ELEMENT_HANDLING = Object.seal(create(null, {
    tagNameCheck: {
      writable: true,
      configurable: false,
      enumerable: true,
      value: null
    },
    attributeNameCheck: {
      writable: true,
      configurable: false,
      enumerable: true,
      value: null
    },
    allowCustomizedBuiltInElements: {
      writable: true,
      configurable: false,
      enumerable: true,
      value: false
    }
  }));
  let FORBID_TAGS = null;
  let FORBID_ATTR = null;
  const EXTRA_ELEMENT_HANDLING = Object.seal(create(null, {
    tagCheck: {
      writable: true,
      configurable: false,
      enumerable: true,
      value: null
    },
    attributeCheck: {
      writable: true,
      configurable: false,
      enumerable: true,
      value: null
    }
  }));
  let ALLOW_ARIA_ATTR = true;
  let ALLOW_DATA_ATTR = true;
  let ALLOW_UNKNOWN_PROTOCOLS = false;
  let ALLOW_SELF_CLOSE_IN_ATTR = true;
  let SAFE_FOR_TEMPLATES = false;
  let SAFE_FOR_XML = true;
  let WHOLE_DOCUMENT = false;
  let SET_CONFIG = false;
  let FORCE_BODY = false;
  let RETURN_DOM = false;
  let RETURN_DOM_FRAGMENT = false;
  let RETURN_TRUSTED_TYPE = false;
  let SANITIZE_DOM = true;
  let SANITIZE_NAMED_PROPS = false;
  const SANITIZE_NAMED_PROPS_PREFIX = "user-content-";
  let KEEP_CONTENT = true;
  let IN_PLACE = false;
  let USE_PROFILES = {};
  let FORBID_CONTENTS = null;
  const DEFAULT_FORBID_CONTENTS = addToSet({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
  let DATA_URI_TAGS = null;
  const DEFAULT_DATA_URI_TAGS = addToSet({}, ["audio", "video", "img", "source", "image", "track"]);
  let URI_SAFE_ATTRIBUTES = null;
  const DEFAULT_URI_SAFE_ATTRIBUTES = addToSet({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]);
  const MATHML_NAMESPACE = "http://www.w3.org/1998/Math/MathML";
  const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
  const HTML_NAMESPACE = "http://www.w3.org/1999/xhtml";
  let NAMESPACE = HTML_NAMESPACE;
  let IS_EMPTY_INPUT = false;
  let ALLOWED_NAMESPACES = null;
  const DEFAULT_ALLOWED_NAMESPACES = addToSet({}, [MATHML_NAMESPACE, SVG_NAMESPACE, HTML_NAMESPACE], stringToString);
  let MATHML_TEXT_INTEGRATION_POINTS = addToSet({}, ["mi", "mo", "mn", "ms", "mtext"]);
  let HTML_INTEGRATION_POINTS = addToSet({}, ["annotation-xml"]);
  const COMMON_SVG_AND_HTML_ELEMENTS = addToSet({}, ["title", "style", "font", "a", "script"]);
  let PARSER_MEDIA_TYPE = null;
  const SUPPORTED_PARSER_MEDIA_TYPES = ["application/xhtml+xml", "text/html"];
  const DEFAULT_PARSER_MEDIA_TYPE = "text/html";
  let transformCaseFunc = null;
  let CONFIG = null;
  const formElement = document2.createElement("form");
  const isRegexOrFunction = function isRegexOrFunction2(testValue) {
    return testValue instanceof RegExp || testValue instanceof Function;
  };
  const _parseConfig = function _parseConfig2() {
    let cfg = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (CONFIG && CONFIG === cfg) {
      return;
    }
    if (!cfg || typeof cfg !== "object") {
      cfg = {};
    }
    cfg = clone(cfg);
    PARSER_MEDIA_TYPE = // eslint-disable-next-line unicorn/prefer-includes
    SUPPORTED_PARSER_MEDIA_TYPES.indexOf(cfg.PARSER_MEDIA_TYPE) === -1 ? DEFAULT_PARSER_MEDIA_TYPE : cfg.PARSER_MEDIA_TYPE;
    transformCaseFunc = PARSER_MEDIA_TYPE === "application/xhtml+xml" ? stringToString : stringToLowerCase;
    ALLOWED_TAGS = objectHasOwnProperty(cfg, "ALLOWED_TAGS") ? addToSet({}, cfg.ALLOWED_TAGS, transformCaseFunc) : DEFAULT_ALLOWED_TAGS;
    ALLOWED_ATTR = objectHasOwnProperty(cfg, "ALLOWED_ATTR") ? addToSet({}, cfg.ALLOWED_ATTR, transformCaseFunc) : DEFAULT_ALLOWED_ATTR;
    ALLOWED_NAMESPACES = objectHasOwnProperty(cfg, "ALLOWED_NAMESPACES") ? addToSet({}, cfg.ALLOWED_NAMESPACES, stringToString) : DEFAULT_ALLOWED_NAMESPACES;
    URI_SAFE_ATTRIBUTES = objectHasOwnProperty(cfg, "ADD_URI_SAFE_ATTR") ? addToSet(clone(DEFAULT_URI_SAFE_ATTRIBUTES), cfg.ADD_URI_SAFE_ATTR, transformCaseFunc) : DEFAULT_URI_SAFE_ATTRIBUTES;
    DATA_URI_TAGS = objectHasOwnProperty(cfg, "ADD_DATA_URI_TAGS") ? addToSet(clone(DEFAULT_DATA_URI_TAGS), cfg.ADD_DATA_URI_TAGS, transformCaseFunc) : DEFAULT_DATA_URI_TAGS;
    FORBID_CONTENTS = objectHasOwnProperty(cfg, "FORBID_CONTENTS") ? addToSet({}, cfg.FORBID_CONTENTS, transformCaseFunc) : DEFAULT_FORBID_CONTENTS;
    FORBID_TAGS = objectHasOwnProperty(cfg, "FORBID_TAGS") ? addToSet({}, cfg.FORBID_TAGS, transformCaseFunc) : clone({});
    FORBID_ATTR = objectHasOwnProperty(cfg, "FORBID_ATTR") ? addToSet({}, cfg.FORBID_ATTR, transformCaseFunc) : clone({});
    USE_PROFILES = objectHasOwnProperty(cfg, "USE_PROFILES") ? cfg.USE_PROFILES : false;
    ALLOW_ARIA_ATTR = cfg.ALLOW_ARIA_ATTR !== false;
    ALLOW_DATA_ATTR = cfg.ALLOW_DATA_ATTR !== false;
    ALLOW_UNKNOWN_PROTOCOLS = cfg.ALLOW_UNKNOWN_PROTOCOLS || false;
    ALLOW_SELF_CLOSE_IN_ATTR = cfg.ALLOW_SELF_CLOSE_IN_ATTR !== false;
    SAFE_FOR_TEMPLATES = cfg.SAFE_FOR_TEMPLATES || false;
    SAFE_FOR_XML = cfg.SAFE_FOR_XML !== false;
    WHOLE_DOCUMENT = cfg.WHOLE_DOCUMENT || false;
    RETURN_DOM = cfg.RETURN_DOM || false;
    RETURN_DOM_FRAGMENT = cfg.RETURN_DOM_FRAGMENT || false;
    RETURN_TRUSTED_TYPE = cfg.RETURN_TRUSTED_TYPE || false;
    FORCE_BODY = cfg.FORCE_BODY || false;
    SANITIZE_DOM = cfg.SANITIZE_DOM !== false;
    SANITIZE_NAMED_PROPS = cfg.SANITIZE_NAMED_PROPS || false;
    KEEP_CONTENT = cfg.KEEP_CONTENT !== false;
    IN_PLACE = cfg.IN_PLACE || false;
    IS_ALLOWED_URI$1 = cfg.ALLOWED_URI_REGEXP || IS_ALLOWED_URI;
    NAMESPACE = cfg.NAMESPACE || HTML_NAMESPACE;
    MATHML_TEXT_INTEGRATION_POINTS = cfg.MATHML_TEXT_INTEGRATION_POINTS || MATHML_TEXT_INTEGRATION_POINTS;
    HTML_INTEGRATION_POINTS = cfg.HTML_INTEGRATION_POINTS || HTML_INTEGRATION_POINTS;
    CUSTOM_ELEMENT_HANDLING = cfg.CUSTOM_ELEMENT_HANDLING || {};
    if (cfg.CUSTOM_ELEMENT_HANDLING && isRegexOrFunction(cfg.CUSTOM_ELEMENT_HANDLING.tagNameCheck)) {
      CUSTOM_ELEMENT_HANDLING.tagNameCheck = cfg.CUSTOM_ELEMENT_HANDLING.tagNameCheck;
    }
    if (cfg.CUSTOM_ELEMENT_HANDLING && isRegexOrFunction(cfg.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)) {
      CUSTOM_ELEMENT_HANDLING.attributeNameCheck = cfg.CUSTOM_ELEMENT_HANDLING.attributeNameCheck;
    }
    if (cfg.CUSTOM_ELEMENT_HANDLING && typeof cfg.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements === "boolean") {
      CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements = cfg.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements;
    }
    if (SAFE_FOR_TEMPLATES) {
      ALLOW_DATA_ATTR = false;
    }
    if (RETURN_DOM_FRAGMENT) {
      RETURN_DOM = true;
    }
    if (USE_PROFILES) {
      ALLOWED_TAGS = addToSet({}, text);
      ALLOWED_ATTR = create(null);
      if (USE_PROFILES.html === true) {
        addToSet(ALLOWED_TAGS, html$1);
        addToSet(ALLOWED_ATTR, html);
      }
      if (USE_PROFILES.svg === true) {
        addToSet(ALLOWED_TAGS, svg$1);
        addToSet(ALLOWED_ATTR, svg);
        addToSet(ALLOWED_ATTR, xml);
      }
      if (USE_PROFILES.svgFilters === true) {
        addToSet(ALLOWED_TAGS, svgFilters);
        addToSet(ALLOWED_ATTR, svg);
        addToSet(ALLOWED_ATTR, xml);
      }
      if (USE_PROFILES.mathMl === true) {
        addToSet(ALLOWED_TAGS, mathMl$1);
        addToSet(ALLOWED_ATTR, mathMl);
        addToSet(ALLOWED_ATTR, xml);
      }
    }
    if (!objectHasOwnProperty(cfg, "ADD_TAGS")) {
      EXTRA_ELEMENT_HANDLING.tagCheck = null;
    }
    if (!objectHasOwnProperty(cfg, "ADD_ATTR")) {
      EXTRA_ELEMENT_HANDLING.attributeCheck = null;
    }
    if (cfg.ADD_TAGS) {
      if (typeof cfg.ADD_TAGS === "function") {
        EXTRA_ELEMENT_HANDLING.tagCheck = cfg.ADD_TAGS;
      } else {
        if (ALLOWED_TAGS === DEFAULT_ALLOWED_TAGS) {
          ALLOWED_TAGS = clone(ALLOWED_TAGS);
        }
        addToSet(ALLOWED_TAGS, cfg.ADD_TAGS, transformCaseFunc);
      }
    }
    if (cfg.ADD_ATTR) {
      if (typeof cfg.ADD_ATTR === "function") {
        EXTRA_ELEMENT_HANDLING.attributeCheck = cfg.ADD_ATTR;
      } else {
        if (ALLOWED_ATTR === DEFAULT_ALLOWED_ATTR) {
          ALLOWED_ATTR = clone(ALLOWED_ATTR);
        }
        addToSet(ALLOWED_ATTR, cfg.ADD_ATTR, transformCaseFunc);
      }
    }
    if (cfg.ADD_URI_SAFE_ATTR) {
      addToSet(URI_SAFE_ATTRIBUTES, cfg.ADD_URI_SAFE_ATTR, transformCaseFunc);
    }
    if (cfg.FORBID_CONTENTS) {
      if (FORBID_CONTENTS === DEFAULT_FORBID_CONTENTS) {
        FORBID_CONTENTS = clone(FORBID_CONTENTS);
      }
      addToSet(FORBID_CONTENTS, cfg.FORBID_CONTENTS, transformCaseFunc);
    }
    if (cfg.ADD_FORBID_CONTENTS) {
      if (FORBID_CONTENTS === DEFAULT_FORBID_CONTENTS) {
        FORBID_CONTENTS = clone(FORBID_CONTENTS);
      }
      addToSet(FORBID_CONTENTS, cfg.ADD_FORBID_CONTENTS, transformCaseFunc);
    }
    if (KEEP_CONTENT) {
      ALLOWED_TAGS["#text"] = true;
    }
    if (WHOLE_DOCUMENT) {
      addToSet(ALLOWED_TAGS, ["html", "head", "body"]);
    }
    if (ALLOWED_TAGS.table) {
      addToSet(ALLOWED_TAGS, ["tbody"]);
      delete FORBID_TAGS.tbody;
    }
    if (cfg.TRUSTED_TYPES_POLICY) {
      if (typeof cfg.TRUSTED_TYPES_POLICY.createHTML !== "function") {
        throw typeErrorCreate('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
      }
      if (typeof cfg.TRUSTED_TYPES_POLICY.createScriptURL !== "function") {
        throw typeErrorCreate('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
      }
      trustedTypesPolicy = cfg.TRUSTED_TYPES_POLICY;
      emptyHTML = trustedTypesPolicy.createHTML("");
    } else {
      if (trustedTypesPolicy === void 0) {
        trustedTypesPolicy = _createTrustedTypesPolicy(trustedTypes, currentScript);
      }
      if (trustedTypesPolicy !== null && typeof emptyHTML === "string") {
        emptyHTML = trustedTypesPolicy.createHTML("");
      }
    }
    if (freeze) {
      freeze(cfg);
    }
    CONFIG = cfg;
  };
  const ALL_SVG_TAGS = addToSet({}, [...svg$1, ...svgFilters, ...svgDisallowed]);
  const ALL_MATHML_TAGS = addToSet({}, [...mathMl$1, ...mathMlDisallowed]);
  const _checkValidNamespace = function _checkValidNamespace2(element) {
    let parent = getParentNode(element);
    if (!parent || !parent.tagName) {
      parent = {
        namespaceURI: NAMESPACE,
        tagName: "template"
      };
    }
    const tagName = stringToLowerCase(element.tagName);
    const parentTagName = stringToLowerCase(parent.tagName);
    if (!ALLOWED_NAMESPACES[element.namespaceURI]) {
      return false;
    }
    if (element.namespaceURI === SVG_NAMESPACE) {
      if (parent.namespaceURI === HTML_NAMESPACE) {
        return tagName === "svg";
      }
      if (parent.namespaceURI === MATHML_NAMESPACE) {
        return tagName === "svg" && (parentTagName === "annotation-xml" || MATHML_TEXT_INTEGRATION_POINTS[parentTagName]);
      }
      return Boolean(ALL_SVG_TAGS[tagName]);
    }
    if (element.namespaceURI === MATHML_NAMESPACE) {
      if (parent.namespaceURI === HTML_NAMESPACE) {
        return tagName === "math";
      }
      if (parent.namespaceURI === SVG_NAMESPACE) {
        return tagName === "math" && HTML_INTEGRATION_POINTS[parentTagName];
      }
      return Boolean(ALL_MATHML_TAGS[tagName]);
    }
    if (element.namespaceURI === HTML_NAMESPACE) {
      if (parent.namespaceURI === SVG_NAMESPACE && !HTML_INTEGRATION_POINTS[parentTagName]) {
        return false;
      }
      if (parent.namespaceURI === MATHML_NAMESPACE && !MATHML_TEXT_INTEGRATION_POINTS[parentTagName]) {
        return false;
      }
      return !ALL_MATHML_TAGS[tagName] && (COMMON_SVG_AND_HTML_ELEMENTS[tagName] || !ALL_SVG_TAGS[tagName]);
    }
    if (PARSER_MEDIA_TYPE === "application/xhtml+xml" && ALLOWED_NAMESPACES[element.namespaceURI]) {
      return true;
    }
    return false;
  };
  const _forceRemove = function _forceRemove2(node) {
    arrayPush(DOMPurify.removed, {
      element: node
    });
    try {
      getParentNode(node).removeChild(node);
    } catch (_) {
      remove(node);
    }
  };
  const _removeAttribute = function _removeAttribute2(name, element) {
    try {
      arrayPush(DOMPurify.removed, {
        attribute: element.getAttributeNode(name),
        from: element
      });
    } catch (_) {
      arrayPush(DOMPurify.removed, {
        attribute: null,
        from: element
      });
    }
    element.removeAttribute(name);
    if (name === "is") {
      if (RETURN_DOM || RETURN_DOM_FRAGMENT) {
        try {
          _forceRemove(element);
        } catch (_) {
        }
      } else {
        try {
          element.setAttribute(name, "");
        } catch (_) {
        }
      }
    }
  };
  const _initDocument = function _initDocument2(dirty) {
    let doc = null;
    let leadingWhitespace = null;
    if (FORCE_BODY) {
      dirty = "<remove></remove>" + dirty;
    } else {
      const matches = stringMatch(dirty, /^[\r\n\t ]+/);
      leadingWhitespace = matches && matches[0];
    }
    if (PARSER_MEDIA_TYPE === "application/xhtml+xml" && NAMESPACE === HTML_NAMESPACE) {
      dirty = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + dirty + "</body></html>";
    }
    const dirtyPayload = trustedTypesPolicy ? trustedTypesPolicy.createHTML(dirty) : dirty;
    if (NAMESPACE === HTML_NAMESPACE) {
      try {
        doc = new DOMParser().parseFromString(dirtyPayload, PARSER_MEDIA_TYPE);
      } catch (_) {
      }
    }
    if (!doc || !doc.documentElement) {
      doc = implementation.createDocument(NAMESPACE, "template", null);
      try {
        doc.documentElement.innerHTML = IS_EMPTY_INPUT ? emptyHTML : dirtyPayload;
      } catch (_) {
      }
    }
    const body = doc.body || doc.documentElement;
    if (dirty && leadingWhitespace) {
      body.insertBefore(document2.createTextNode(leadingWhitespace), body.childNodes[0] || null);
    }
    if (NAMESPACE === HTML_NAMESPACE) {
      return getElementsByTagName.call(doc, WHOLE_DOCUMENT ? "html" : "body")[0];
    }
    return WHOLE_DOCUMENT ? doc.documentElement : body;
  };
  const _createNodeIterator = function _createNodeIterator2(root) {
    return createNodeIterator.call(
      root.ownerDocument || root,
      root,
      // eslint-disable-next-line no-bitwise
      NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT | NodeFilter.SHOW_TEXT | NodeFilter.SHOW_PROCESSING_INSTRUCTION | NodeFilter.SHOW_CDATA_SECTION,
      null
    );
  };
  const _isClobbered = function _isClobbered2(element) {
    return element instanceof HTMLFormElement && (typeof element.nodeName !== "string" || typeof element.textContent !== "string" || typeof element.removeChild !== "function" || !(element.attributes instanceof NamedNodeMap) || typeof element.removeAttribute !== "function" || typeof element.setAttribute !== "function" || typeof element.namespaceURI !== "string" || typeof element.insertBefore !== "function" || typeof element.hasChildNodes !== "function");
  };
  const _isNode = function _isNode2(value) {
    return typeof Node === "function" && value instanceof Node;
  };
  function _executeHooks(hooks2, currentNode, data) {
    arrayForEach(hooks2, (hook) => {
      hook.call(DOMPurify, currentNode, data, CONFIG);
    });
  }
  const _sanitizeElements = function _sanitizeElements2(currentNode) {
    let content = null;
    _executeHooks(hooks.beforeSanitizeElements, currentNode, null);
    if (_isClobbered(currentNode)) {
      _forceRemove(currentNode);
      return true;
    }
    const tagName = transformCaseFunc(currentNode.nodeName);
    _executeHooks(hooks.uponSanitizeElement, currentNode, {
      tagName,
      allowedTags: ALLOWED_TAGS
    });
    if (SAFE_FOR_XML && currentNode.hasChildNodes() && !_isNode(currentNode.firstElementChild) && regExpTest(/<[/\w!]/g, currentNode.innerHTML) && regExpTest(/<[/\w!]/g, currentNode.textContent)) {
      _forceRemove(currentNode);
      return true;
    }
    if (currentNode.nodeType === NODE_TYPE.progressingInstruction) {
      _forceRemove(currentNode);
      return true;
    }
    if (SAFE_FOR_XML && currentNode.nodeType === NODE_TYPE.comment && regExpTest(/<[/\w]/g, currentNode.data)) {
      _forceRemove(currentNode);
      return true;
    }
    if (!(EXTRA_ELEMENT_HANDLING.tagCheck instanceof Function && EXTRA_ELEMENT_HANDLING.tagCheck(tagName)) && (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName])) {
      if (!FORBID_TAGS[tagName] && _isBasicCustomElement(tagName)) {
        if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, tagName)) {
          return false;
        }
        if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(tagName)) {
          return false;
        }
      }
      if (KEEP_CONTENT && !FORBID_CONTENTS[tagName]) {
        const parentNode = getParentNode(currentNode) || currentNode.parentNode;
        const childNodes = getChildNodes(currentNode) || currentNode.childNodes;
        if (childNodes && parentNode) {
          const childCount = childNodes.length;
          for (let i = childCount - 1; i >= 0; --i) {
            const childClone = cloneNode(childNodes[i], true);
            childClone.__removalCount = (currentNode.__removalCount || 0) + 1;
            parentNode.insertBefore(childClone, getNextSibling(currentNode));
          }
        }
      }
      _forceRemove(currentNode);
      return true;
    }
    if (currentNode instanceof Element && !_checkValidNamespace(currentNode)) {
      _forceRemove(currentNode);
      return true;
    }
    if ((tagName === "noscript" || tagName === "noembed" || tagName === "noframes") && regExpTest(/<\/no(script|embed|frames)/i, currentNode.innerHTML)) {
      _forceRemove(currentNode);
      return true;
    }
    if (SAFE_FOR_TEMPLATES && currentNode.nodeType === NODE_TYPE.text) {
      content = currentNode.textContent;
      arrayForEach([MUSTACHE_EXPR2, ERB_EXPR2, TMPLIT_EXPR2], (expr) => {
        content = stringReplace(content, expr, " ");
      });
      if (currentNode.textContent !== content) {
        arrayPush(DOMPurify.removed, {
          element: currentNode.cloneNode()
        });
        currentNode.textContent = content;
      }
    }
    _executeHooks(hooks.afterSanitizeElements, currentNode, null);
    return false;
  };
  const _isValidAttribute = function _isValidAttribute2(lcTag, lcName, value) {
    if (FORBID_ATTR[lcName]) {
      return false;
    }
    if (SANITIZE_DOM && (lcName === "id" || lcName === "name") && (value in document2 || value in formElement)) {
      return false;
    }
    if (ALLOW_DATA_ATTR && !FORBID_ATTR[lcName] && regExpTest(DATA_ATTR2, lcName)) ;
    else if (ALLOW_ARIA_ATTR && regExpTest(ARIA_ATTR2, lcName)) ;
    else if (EXTRA_ELEMENT_HANDLING.attributeCheck instanceof Function && EXTRA_ELEMENT_HANDLING.attributeCheck(lcName, lcTag)) ;
    else if (!ALLOWED_ATTR[lcName] || FORBID_ATTR[lcName]) {
      if (
        // First condition does a very basic check if a) it's basically a valid custom element tagname AND
        // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
        // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
        _isBasicCustomElement(lcTag) && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, lcTag) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(lcTag)) && (CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.attributeNameCheck, lcName) || CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.attributeNameCheck(lcName, lcTag)) || // Alternative, second condition checks if it's an `is`-attribute, AND
        // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
        lcName === "is" && CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, value) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(value))
      ) ;
      else {
        return false;
      }
    } else if (URI_SAFE_ATTRIBUTES[lcName]) ;
    else if (regExpTest(IS_ALLOWED_URI$1, stringReplace(value, ATTR_WHITESPACE2, ""))) ;
    else if ((lcName === "src" || lcName === "xlink:href" || lcName === "href") && lcTag !== "script" && stringIndexOf(value, "data:") === 0 && DATA_URI_TAGS[lcTag]) ;
    else if (ALLOW_UNKNOWN_PROTOCOLS && !regExpTest(IS_SCRIPT_OR_DATA2, stringReplace(value, ATTR_WHITESPACE2, ""))) ;
    else if (value) {
      return false;
    } else ;
    return true;
  };
  const _isBasicCustomElement = function _isBasicCustomElement2(tagName) {
    return tagName !== "annotation-xml" && stringMatch(tagName, CUSTOM_ELEMENT2);
  };
  const _sanitizeAttributes = function _sanitizeAttributes2(currentNode) {
    _executeHooks(hooks.beforeSanitizeAttributes, currentNode, null);
    const {
      attributes
    } = currentNode;
    if (!attributes || _isClobbered(currentNode)) {
      return;
    }
    const hookEvent = {
      attrName: "",
      attrValue: "",
      keepAttr: true,
      allowedAttributes: ALLOWED_ATTR,
      forceKeepAttr: void 0
    };
    let l = attributes.length;
    while (l--) {
      const attr = attributes[l];
      const {
        name,
        namespaceURI,
        value: attrValue
      } = attr;
      const lcName = transformCaseFunc(name);
      const initValue = attrValue;
      let value = name === "value" ? initValue : stringTrim(initValue);
      hookEvent.attrName = lcName;
      hookEvent.attrValue = value;
      hookEvent.keepAttr = true;
      hookEvent.forceKeepAttr = void 0;
      _executeHooks(hooks.uponSanitizeAttribute, currentNode, hookEvent);
      value = hookEvent.attrValue;
      if (SANITIZE_NAMED_PROPS && (lcName === "id" || lcName === "name")) {
        _removeAttribute(name, currentNode);
        value = SANITIZE_NAMED_PROPS_PREFIX + value;
      }
      if (SAFE_FOR_XML && regExpTest(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i, value)) {
        _removeAttribute(name, currentNode);
        continue;
      }
      if (lcName === "attributename" && stringMatch(value, "href")) {
        _removeAttribute(name, currentNode);
        continue;
      }
      if (hookEvent.forceKeepAttr) {
        continue;
      }
      if (!hookEvent.keepAttr) {
        _removeAttribute(name, currentNode);
        continue;
      }
      if (!ALLOW_SELF_CLOSE_IN_ATTR && regExpTest(/\/>/i, value)) {
        _removeAttribute(name, currentNode);
        continue;
      }
      if (SAFE_FOR_TEMPLATES) {
        arrayForEach([MUSTACHE_EXPR2, ERB_EXPR2, TMPLIT_EXPR2], (expr) => {
          value = stringReplace(value, expr, " ");
        });
      }
      const lcTag = transformCaseFunc(currentNode.nodeName);
      if (!_isValidAttribute(lcTag, lcName, value)) {
        _removeAttribute(name, currentNode);
        continue;
      }
      if (trustedTypesPolicy && typeof trustedTypes === "object" && typeof trustedTypes.getAttributeType === "function") {
        if (namespaceURI) ;
        else {
          switch (trustedTypes.getAttributeType(lcTag, lcName)) {
            case "TrustedHTML": {
              value = trustedTypesPolicy.createHTML(value);
              break;
            }
            case "TrustedScriptURL": {
              value = trustedTypesPolicy.createScriptURL(value);
              break;
            }
          }
        }
      }
      if (value !== initValue) {
        try {
          if (namespaceURI) {
            currentNode.setAttributeNS(namespaceURI, name, value);
          } else {
            currentNode.setAttribute(name, value);
          }
          if (_isClobbered(currentNode)) {
            _forceRemove(currentNode);
          } else {
            arrayPop(DOMPurify.removed);
          }
        } catch (_) {
          _removeAttribute(name, currentNode);
        }
      }
    }
    _executeHooks(hooks.afterSanitizeAttributes, currentNode, null);
  };
  const _sanitizeShadowDOM = function _sanitizeShadowDOM2(fragment) {
    let shadowNode = null;
    const shadowIterator = _createNodeIterator(fragment);
    _executeHooks(hooks.beforeSanitizeShadowDOM, fragment, null);
    while (shadowNode = shadowIterator.nextNode()) {
      _executeHooks(hooks.uponSanitizeShadowNode, shadowNode, null);
      _sanitizeElements(shadowNode);
      _sanitizeAttributes(shadowNode);
      if (shadowNode.content instanceof DocumentFragment) {
        _sanitizeShadowDOM2(shadowNode.content);
      }
    }
    _executeHooks(hooks.afterSanitizeShadowDOM, fragment, null);
  };
  DOMPurify.sanitize = function(dirty) {
    let cfg = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    let body = null;
    let importedNode = null;
    let currentNode = null;
    let returnNode = null;
    IS_EMPTY_INPUT = !dirty;
    if (IS_EMPTY_INPUT) {
      dirty = "<!-->";
    }
    if (typeof dirty !== "string" && !_isNode(dirty)) {
      if (typeof dirty.toString === "function") {
        dirty = dirty.toString();
        if (typeof dirty !== "string") {
          throw typeErrorCreate("dirty is not a string, aborting");
        }
      } else {
        throw typeErrorCreate("toString is not a function");
      }
    }
    if (!DOMPurify.isSupported) {
      return dirty;
    }
    if (!SET_CONFIG) {
      _parseConfig(cfg);
    }
    DOMPurify.removed = [];
    if (typeof dirty === "string") {
      IN_PLACE = false;
    }
    if (IN_PLACE) {
      if (dirty.nodeName) {
        const tagName = transformCaseFunc(dirty.nodeName);
        if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
          throw typeErrorCreate("root node is forbidden and cannot be sanitized in-place");
        }
      }
    } else if (dirty instanceof Node) {
      body = _initDocument("<!---->");
      importedNode = body.ownerDocument.importNode(dirty, true);
      if (importedNode.nodeType === NODE_TYPE.element && importedNode.nodeName === "BODY") {
        body = importedNode;
      } else if (importedNode.nodeName === "HTML") {
        body = importedNode;
      } else {
        body.appendChild(importedNode);
      }
    } else {
      if (!RETURN_DOM && !SAFE_FOR_TEMPLATES && !WHOLE_DOCUMENT && // eslint-disable-next-line unicorn/prefer-includes
      dirty.indexOf("<") === -1) {
        return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(dirty) : dirty;
      }
      body = _initDocument(dirty);
      if (!body) {
        return RETURN_DOM ? null : RETURN_TRUSTED_TYPE ? emptyHTML : "";
      }
    }
    if (body && FORCE_BODY) {
      _forceRemove(body.firstChild);
    }
    const nodeIterator = _createNodeIterator(IN_PLACE ? dirty : body);
    while (currentNode = nodeIterator.nextNode()) {
      _sanitizeElements(currentNode);
      _sanitizeAttributes(currentNode);
      if (currentNode.content instanceof DocumentFragment) {
        _sanitizeShadowDOM(currentNode.content);
      }
    }
    if (IN_PLACE) {
      return dirty;
    }
    if (RETURN_DOM) {
      if (RETURN_DOM_FRAGMENT) {
        returnNode = createDocumentFragment.call(body.ownerDocument);
        while (body.firstChild) {
          returnNode.appendChild(body.firstChild);
        }
      } else {
        returnNode = body;
      }
      if (ALLOWED_ATTR.shadowroot || ALLOWED_ATTR.shadowrootmode) {
        returnNode = importNode.call(originalDocument, returnNode, true);
      }
      return returnNode;
    }
    let serializedHTML = WHOLE_DOCUMENT ? body.outerHTML : body.innerHTML;
    if (WHOLE_DOCUMENT && ALLOWED_TAGS["!doctype"] && body.ownerDocument && body.ownerDocument.doctype && body.ownerDocument.doctype.name && regExpTest(DOCTYPE_NAME, body.ownerDocument.doctype.name)) {
      serializedHTML = "<!DOCTYPE " + body.ownerDocument.doctype.name + ">\n" + serializedHTML;
    }
    if (SAFE_FOR_TEMPLATES) {
      arrayForEach([MUSTACHE_EXPR2, ERB_EXPR2, TMPLIT_EXPR2], (expr) => {
        serializedHTML = stringReplace(serializedHTML, expr, " ");
      });
    }
    return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(serializedHTML) : serializedHTML;
  };
  DOMPurify.setConfig = function() {
    let cfg = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    _parseConfig(cfg);
    SET_CONFIG = true;
  };
  DOMPurify.clearConfig = function() {
    CONFIG = null;
    SET_CONFIG = false;
  };
  DOMPurify.isValidAttribute = function(tag, attr, value) {
    if (!CONFIG) {
      _parseConfig({});
    }
    const lcTag = transformCaseFunc(tag);
    const lcName = transformCaseFunc(attr);
    return _isValidAttribute(lcTag, lcName, value);
  };
  DOMPurify.addHook = function(entryPoint, hookFunction) {
    if (typeof hookFunction !== "function") {
      return;
    }
    arrayPush(hooks[entryPoint], hookFunction);
  };
  DOMPurify.removeHook = function(entryPoint, hookFunction) {
    if (hookFunction !== void 0) {
      const index = arrayLastIndexOf(hooks[entryPoint], hookFunction);
      return index === -1 ? void 0 : arraySplice(hooks[entryPoint], index, 1)[0];
    }
    return arrayPop(hooks[entryPoint]);
  };
  DOMPurify.removeHooks = function(entryPoint) {
    hooks[entryPoint] = [];
  };
  DOMPurify.removeAllHooks = function() {
    hooks = _createHooksMap();
  };
  return DOMPurify;
}
var purify = createDOMPurify();

// src/nanopub-list.ts
var NanopubList = class extends HTMLElement {
  static observedAttributes = [
    "query-template",
    "params",
    "endpoint",
    "title-field",
    "date-field",
    "link-field",
    "sort",
    "limit",
    "group-by-year"
  ];
  #ac = null;
  connectedCallback() {
    setTimeout(() => this.#load());
  }
  attributeChangedCallback() {
    if (this.isConnected) this.#load();
  }
  // Replace non-template children with node, leaving <template> children untouched.
  #setContent(node) {
    Array.from(this.childNodes).forEach((child) => {
      if (!(child instanceof HTMLTemplateElement)) child.remove();
    });
    if (node) this.appendChild(node);
  }
  disconnectedCallback() {
    this.#ac?.abort();
  }
  async #load() {
    this.#ac?.abort();
    const ac = new AbortController();
    this.#ac = ac;
    const queryTemplateId = this.getAttribute("query-template");
    if (!queryTemplateId) return;
    const endpoint = this.getAttribute("endpoint") ?? "https://query.knowledgepixels.com/";
    const titleField = this.getAttribute("title-field") ?? "label";
    const dateField = this.getAttribute("date-field");
    const linkField = this.getAttribute("link-field");
    const sort = this.getAttribute("sort") ?? "desc";
    const limit = this.hasAttribute("limit") ? parseInt(this.getAttribute("limit"), 10) : null;
    const groupByYear = this.hasAttribute("group-by-year");
    let params = {};
    const rawParams = this.getAttribute("params");
    if (rawParams) {
      try {
        params = JSON.parse(rawParams);
      } catch {
      }
    }
    this.#setContent(Object.assign(document.createElement("p"), { textContent: "Loading\u2026" }));
    const client = new Gi({ endpoints: [endpoint] });
    const rows = [];
    try {
      for await (const row of client.runQueryTemplate(queryTemplateId, params)) {
        if (ac.signal.aborted) return;
        rows.push(row);
      }
    } catch (err) {
      if (ac.signal.aborted) return;
      this.#setContent(Object.assign(document.createElement("p"), { textContent: "Failed to load." }));
      console.error("[nanopub-list]", err);
      return;
    }
    if (ac.signal.aborted) return;
    if (dateField) {
      rows.sort((a, b) => {
        const da = a[dateField] ? new Date(a[dateField]).getTime() : 0;
        const db = b[dateField] ? new Date(b[dateField]).getTime() : 0;
        return sort === "asc" ? da - db : db - da;
      });
    }
    const items = limit != null ? rows.slice(0, limit) : rows;
    const itemTemplate = this.querySelector("template");
    if (!items.length) {
      this.#setContent(Object.assign(document.createElement("p"), { textContent: "No items found." }));
      return;
    }
    if (groupByYear && dateField) {
      this.#setContent(null);
      this.#renderGroupedByYear(items, dateField, sort, titleField, linkField, itemTemplate);
    } else {
      this.#setContent(
        itemTemplate ? this.#buildListFromTemplate(items, itemTemplate) : this.#buildList(items, titleField, dateField, linkField)
      );
    }
  }
  #renderGroupedByYear(items, dateField, sort, titleField, linkField, itemTemplate) {
    const byYear = /* @__PURE__ */ new Map();
    for (const row of items) {
      const year = row[dateField] ? new Date(row[dateField]).getFullYear() : 0;
      const bucket = byYear.get(year) ?? [];
      bucket.push(row);
      byYear.set(year, bucket);
    }
    const years = [...byYear.keys()].sort(
      (a, b) => sort === "asc" ? a - b : b - a
    );
    for (const year of years) {
      const section = document.createElement("section");
      section.dataset.year = String(year);
      const h3 = document.createElement("h3");
      h3.textContent = String(year);
      section.appendChild(h3);
      const list = itemTemplate ? this.#buildListFromTemplate(byYear.get(year), itemTemplate) : this.#buildList(byYear.get(year), titleField, dateField, linkField);
      section.appendChild(list);
      this.appendChild(section);
    }
  }
  #buildListFromTemplate(rows, template) {
    const ul = document.createElement("ul");
    for (const row of rows) {
      const clone2 = template.content.cloneNode(true);
      this.#applyBindings(clone2, row);
      ul.appendChild(clone2);
    }
    return ul;
  }
  // Applies data-bind and data-bind-[attr] to all elements in a fragment.
  // data-bind="Field"      → el.textContent
  // data-bind-href="Field" → el.href  (any attribute name works)
  #applyBindings(root, row) {
    root.querySelectorAll("*").forEach((el) => {
      for (const [key, field] of Object.entries(el.dataset)) {
        if (!field || !key.startsWith("bind")) continue;
        const value = row[field] ?? "";
        if (key === "bind") {
          el.textContent = value;
        } else {
          const attr = key.slice(4).replace(/([A-Z])/g, "-$1").toLowerCase().replace(/^-/, "");
          el.setAttribute(attr, value);
        }
      }
    });
  }
  #buildList(rows, titleField, dateField, linkField) {
    const ul = document.createElement("ul");
    for (const row of rows) {
      ul.appendChild(this.#buildItem(row, titleField, dateField, linkField));
    }
    return ul;
  }
  #buildItem(row, titleField, dateField, linkField) {
    const li2 = document.createElement("li");
    if (dateField && row[dateField]) li2.dataset.date = row[dateField];
    const titleText = row[titleField] ?? "";
    if (titleText) {
      const span = document.createElement("span");
      span.innerHTML = purify.sanitize(titleText);
      li2.appendChild(span);
    }
    if (linkField && row[linkField]) {
      const a = document.createElement("a");
      a.href = row[linkField];
      a.textContent = row[linkField];
      li2.appendChild(a);
    }
    if (dateField && row[dateField]) {
      const time = document.createElement("time");
      time.dateTime = row[dateField];
      time.textContent = row[dateField];
      li2.appendChild(time);
    }
    return li2;
  }
};

// src/nanopub-table.ts
var NanopubTable = class extends HTMLElement {
  static observedAttributes = [
    "query-template",
    "params",
    "endpoint",
    "columns",
    "date-field",
    "sort",
    "limit"
  ];
  #ac = null;
  connectedCallback() {
    setTimeout(() => this.#load());
  }
  attributeChangedCallback() {
    if (this.isConnected) this.#load();
  }
  #setContent(node) {
    while (this.firstChild) this.firstChild.remove();
    if (node) this.appendChild(node);
  }
  disconnectedCallback() {
    this.#ac?.abort();
  }
  async #load() {
    this.#ac?.abort();
    const ac = new AbortController();
    this.#ac = ac;
    const queryTemplateId = this.getAttribute("query-template");
    if (!queryTemplateId) return;
    const endpoint = this.getAttribute("endpoint") ?? "https://query.knowledgepixels.com/";
    const dateField = this.getAttribute("date-field");
    const sort = this.getAttribute("sort") ?? "desc";
    const limit = this.hasAttribute("limit") ? parseInt(this.getAttribute("limit"), 10) : null;
    let columns = [];
    const rawColumns = this.getAttribute("columns");
    if (rawColumns) {
      try {
        columns = JSON.parse(rawColumns);
      } catch {
      }
    }
    let params = {};
    const rawParams = this.getAttribute("params");
    if (rawParams) {
      try {
        params = JSON.parse(rawParams);
      } catch {
      }
    }
    this.#setContent(
      Object.assign(document.createElement("p"), { textContent: "Loading\u2026" })
    );
    const client = new Gi({ endpoints: [endpoint] });
    const rows = [];
    try {
      for await (const row of client.runQueryTemplate(queryTemplateId, params)) {
        if (ac.signal.aborted) return;
        rows.push(row);
      }
    } catch (err) {
      if (ac.signal.aborted) return;
      this.#setContent(
        Object.assign(document.createElement("p"), { textContent: "Failed to load." })
      );
      console.error("[nanopub-table]", err);
      return;
    }
    if (ac.signal.aborted) return;
    if (dateField) {
      rows.sort((a, b) => {
        const da = a[dateField] ? new Date(a[dateField]).getTime() : 0;
        const db = b[dateField] ? new Date(b[dateField]).getTime() : 0;
        return sort === "asc" ? da - db : db - da;
      });
    }
    const items = limit != null ? rows.slice(0, limit) : rows;
    if (!items.length) {
      this.#setContent(
        Object.assign(document.createElement("p"), { textContent: "No items found." })
      );
      return;
    }
    if (!columns.length) {
      columns = Object.keys(items[0]).map((field) => ({ field, label: field }));
    }
    this.#setContent(this.#buildTable(items, columns));
  }
  #buildTable(rows, columns) {
    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    for (const col of columns) {
      const th = document.createElement("th");
      th.textContent = col.label;
      headerRow.appendChild(th);
    }
    thead.appendChild(headerRow);
    table.appendChild(thead);
    const tbody = document.createElement("tbody");
    for (const row of rows) {
      const tr2 = document.createElement("tr");
      for (const col of columns) {
        const td = document.createElement("td");
        const value = row[col.field] ?? "";
        if (col.type === "link" && value) {
          const a = document.createElement("a");
          a.href = value;
          a.textContent = value;
          td.appendChild(a);
        } else if (col.type === "date" && value) {
          const time = document.createElement("time");
          time.dateTime = value;
          time.textContent = value;
          td.appendChild(time);
        } else {
          td.innerHTML = purify.sanitize(value);
        }
        tr2.appendChild(td);
      }
      tbody.appendChild(tr2);
    }
    table.appendChild(tbody);
    return table;
  }
};

// src/index.ts
customElements.define("nanopub-list", NanopubList);
customElements.define("nanopub-table", NanopubTable);
export {
  Gi as NanopubClient,
  NanopubList,
  NanopubTable
};
/*! Bundled license information:

ieee754/index.js:
  (*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> *)

buffer/index.js:
  (*!
   * The buffer module from node.js, for the browser.
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   *)

dompurify/dist/purify.es.mjs:
  (*! @license DOMPurify 3.3.3 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.3.3/LICENSE *)
*/
