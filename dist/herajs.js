/*!
 * herajs v0.1.3
 * (c) 2018 AERGO
 * Released under MIT license.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('http'), require('https'), require('url')) :
	typeof define === 'function' && define.amd ? define(['exports', 'http', 'https', 'url'], factory) :
	(factory((global.herajs = {}),global.http,global.https,global.url));
}(this, (function (exports,http,https,url) { 'use strict';

	http = http && http.hasOwnProperty('default') ? http['default'] : http;
	https = https && https.hasOwnProperty('default') ? https['default'] : https;
	url = url && url.hasOwnProperty('default') ? url['default'] : url;

	var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var runtime = createCommonjsModule(function (module) {
	/**
	 * Copyright (c) 2014-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	!(function(global) {

	  var Op = Object.prototype;
	  var hasOwn = Op.hasOwnProperty;
	  var undefined; // More compressible than void 0.
	  var $Symbol = typeof Symbol === "function" ? Symbol : {};
	  var iteratorSymbol = $Symbol.iterator || "@@iterator";
	  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
	  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
	  var runtime = global.regeneratorRuntime;
	  if (runtime) {
	    {
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
	  runtime = global.regeneratorRuntime = module.exports;

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
	          // current iteration.
	          result.value = unwrapped;
	          resolve(result);
	        }, function(error) {
	          // If a rejected Promise was yielded, throw the rejection back
	          // into the async generator function so it can be handled there.
	          return invoke("throw", error, resolve, reject);
	        });
	      }
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
	  // In sloppy mode, unbound `this` refers to the global object, fallback to
	  // Function constructor if we're in global strict mode. That is sadly a form
	  // of indirect eval which violates Content Security Policy.
	  (function() {
	    return this || (typeof self === "object" && self);
	  })() || Function("return this")()
	);
	});

	var global$1 = (typeof global !== "undefined" ? global :
	            typeof self !== "undefined" ? self :
	            typeof window !== "undefined" ? window : {});

	var lookup = [];
	var revLookup = [];
	var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;
	var inited = false;
	function init () {
	  inited = true;
	  var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
	  for (var i = 0, len = code.length; i < len; ++i) {
	    lookup[i] = code[i];
	    revLookup[code.charCodeAt(i)] = i;
	  }

	  revLookup['-'.charCodeAt(0)] = 62;
	  revLookup['_'.charCodeAt(0)] = 63;
	}

	function toByteArray (b64) {
	  if (!inited) {
	    init();
	  }
	  var i, j, l, tmp, placeHolders, arr;
	  var len = b64.length;

	  if (len % 4 > 0) {
	    throw new Error('Invalid string. Length must be a multiple of 4')
	  }

	  // the number of equal signs (place holders)
	  // if there are two placeholders, than the two characters before it
	  // represent one byte
	  // if there is only one, then the three characters before it represent 2 bytes
	  // this is just a cheap hack to not do indexOf twice
	  placeHolders = b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0;

	  // base64 is 4/3 + up to two characters of the original data
	  arr = new Arr(len * 3 / 4 - placeHolders);

	  // if there are placeholders, only get up to the last complete 4 chars
	  l = placeHolders > 0 ? len - 4 : len;

	  var L = 0;

	  for (i = 0, j = 0; i < l; i += 4, j += 3) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)];
	    arr[L++] = (tmp >> 16) & 0xFF;
	    arr[L++] = (tmp >> 8) & 0xFF;
	    arr[L++] = tmp & 0xFF;
	  }

	  if (placeHolders === 2) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4);
	    arr[L++] = tmp & 0xFF;
	  } else if (placeHolders === 1) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2);
	    arr[L++] = (tmp >> 8) & 0xFF;
	    arr[L++] = tmp & 0xFF;
	  }

	  return arr
	}

	function tripletToBase64 (num) {
	  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
	}

	function encodeChunk (uint8, start, end) {
	  var tmp;
	  var output = [];
	  for (var i = start; i < end; i += 3) {
	    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2]);
	    output.push(tripletToBase64(tmp));
	  }
	  return output.join('')
	}

	function fromByteArray (uint8) {
	  if (!inited) {
	    init();
	  }
	  var tmp;
	  var len = uint8.length;
	  var extraBytes = len % 3; // if we have 1 byte left, pad 2 bytes
	  var output = '';
	  var parts = [];
	  var maxChunkLength = 16383; // must be multiple of 3

	  // go through the array every three bytes, we'll deal with trailing stuff later
	  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
	    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)));
	  }

	  // pad the end with zeros, but make sure to not forget the extra bytes
	  if (extraBytes === 1) {
	    tmp = uint8[len - 1];
	    output += lookup[tmp >> 2];
	    output += lookup[(tmp << 4) & 0x3F];
	    output += '==';
	  } else if (extraBytes === 2) {
	    tmp = (uint8[len - 2] << 8) + (uint8[len - 1]);
	    output += lookup[tmp >> 10];
	    output += lookup[(tmp >> 4) & 0x3F];
	    output += lookup[(tmp << 2) & 0x3F];
	    output += '=';
	  }

	  parts.push(output);

	  return parts.join('')
	}

	function read (buffer, offset, isLE, mLen, nBytes) {
	  var e, m;
	  var eLen = nBytes * 8 - mLen - 1;
	  var eMax = (1 << eLen) - 1;
	  var eBias = eMax >> 1;
	  var nBits = -7;
	  var i = isLE ? (nBytes - 1) : 0;
	  var d = isLE ? -1 : 1;
	  var s = buffer[offset + i];

	  i += d;

	  e = s & ((1 << (-nBits)) - 1);
	  s >>= (-nBits);
	  nBits += eLen;
	  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  m = e & ((1 << (-nBits)) - 1);
	  e >>= (-nBits);
	  nBits += mLen;
	  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  if (e === 0) {
	    e = 1 - eBias;
	  } else if (e === eMax) {
	    return m ? NaN : ((s ? -1 : 1) * Infinity)
	  } else {
	    m = m + Math.pow(2, mLen);
	    e = e - eBias;
	  }
	  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
	}

	function write (buffer, value, offset, isLE, mLen, nBytes) {
	  var e, m, c;
	  var eLen = nBytes * 8 - mLen - 1;
	  var eMax = (1 << eLen) - 1;
	  var eBias = eMax >> 1;
	  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0);
	  var i = isLE ? 0 : (nBytes - 1);
	  var d = isLE ? 1 : -1;
	  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;

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
	      value += rt / c;
	    } else {
	      value += rt * Math.pow(2, 1 - eBias);
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

	  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

	  e = (e << mLen) | m;
	  eLen += mLen;
	  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

	  buffer[offset + i - d] |= s * 128;
	}

	var toString = {}.toString;

	var isArray = Array.isArray || function (arr) {
	  return toString.call(arr) == '[object Array]';
	};

	var INSPECT_MAX_BYTES = 50;

	/**
	 * If `Buffer.TYPED_ARRAY_SUPPORT`:
	 *   === true    Use Uint8Array implementation (fastest)
	 *   === false   Use Object implementation (most compatible, even IE6)
	 *
	 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	 * Opera 11.6+, iOS 4.2+.
	 *
	 * Due to various browser bugs, sometimes the Object implementation will be used even
	 * when the browser supports typed arrays.
	 *
	 * Note:
	 *
	 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
	 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
	 *
	 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
	 *
	 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
	 *     incorrect length in some situations.

	 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
	 * get the Object implementation, which is slower but behaves correctly.
	 */
	Buffer$1.TYPED_ARRAY_SUPPORT = global$1.TYPED_ARRAY_SUPPORT !== undefined
	  ? global$1.TYPED_ARRAY_SUPPORT
	  : true;

	/*
	 * Export kMaxLength after typed array support is determined.
	 */
	var _kMaxLength = kMaxLength();

	function kMaxLength () {
	  return Buffer$1.TYPED_ARRAY_SUPPORT
	    ? 0x7fffffff
	    : 0x3fffffff
	}

	function createBuffer (that, length) {
	  if (kMaxLength() < length) {
	    throw new RangeError('Invalid typed array length')
	  }
	  if (Buffer$1.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = new Uint8Array(length);
	    that.__proto__ = Buffer$1.prototype;
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    if (that === null) {
	      that = new Buffer$1(length);
	    }
	    that.length = length;
	  }

	  return that
	}

	/**
	 * The Buffer constructor returns instances of `Uint8Array` that have their
	 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
	 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
	 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
	 * returns a single octet.
	 *
	 * The `Uint8Array` prototype remains unmodified.
	 */

	function Buffer$1 (arg, encodingOrOffset, length) {
	  if (!Buffer$1.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer$1)) {
	    return new Buffer$1(arg, encodingOrOffset, length)
	  }

	  // Common case.
	  if (typeof arg === 'number') {
	    if (typeof encodingOrOffset === 'string') {
	      throw new Error(
	        'If encoding is specified then the first argument must be a string'
	      )
	    }
	    return allocUnsafe(this, arg)
	  }
	  return from(this, arg, encodingOrOffset, length)
	}

	Buffer$1.poolSize = 8192; // not used by this implementation

	// TODO: Legacy, not needed anymore. Remove in next major version.
	Buffer$1._augment = function (arr) {
	  arr.__proto__ = Buffer$1.prototype;
	  return arr
	};

	function from (that, value, encodingOrOffset, length) {
	  if (typeof value === 'number') {
	    throw new TypeError('"value" argument must not be a number')
	  }

	  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
	    return fromArrayBuffer(that, value, encodingOrOffset, length)
	  }

	  if (typeof value === 'string') {
	    return fromString(that, value, encodingOrOffset)
	  }

	  return fromObject(that, value)
	}

	/**
	 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
	 * if value is a number.
	 * Buffer.from(str[, encoding])
	 * Buffer.from(array)
	 * Buffer.from(buffer)
	 * Buffer.from(arrayBuffer[, byteOffset[, length]])
	 **/
	Buffer$1.from = function (value, encodingOrOffset, length) {
	  return from(null, value, encodingOrOffset, length)
	};

	if (Buffer$1.TYPED_ARRAY_SUPPORT) {
	  Buffer$1.prototype.__proto__ = Uint8Array.prototype;
	  Buffer$1.__proto__ = Uint8Array;
	}

	function assertSize (size) {
	  if (typeof size !== 'number') {
	    throw new TypeError('"size" argument must be a number')
	  } else if (size < 0) {
	    throw new RangeError('"size" argument must not be negative')
	  }
	}

	function alloc (that, size, fill, encoding) {
	  assertSize(size);
	  if (size <= 0) {
	    return createBuffer(that, size)
	  }
	  if (fill !== undefined) {
	    // Only pay attention to encoding if it's a string. This
	    // prevents accidentally sending in a number that would
	    // be interpretted as a start offset.
	    return typeof encoding === 'string'
	      ? createBuffer(that, size).fill(fill, encoding)
	      : createBuffer(that, size).fill(fill)
	  }
	  return createBuffer(that, size)
	}

	/**
	 * Creates a new filled Buffer instance.
	 * alloc(size[, fill[, encoding]])
	 **/
	Buffer$1.alloc = function (size, fill, encoding) {
	  return alloc(null, size, fill, encoding)
	};

	function allocUnsafe (that, size) {
	  assertSize(size);
	  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0);
	  if (!Buffer$1.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < size; ++i) {
	      that[i] = 0;
	    }
	  }
	  return that
	}

	/**
	 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
	 * */
	Buffer$1.allocUnsafe = function (size) {
	  return allocUnsafe(null, size)
	};
	/**
	 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
	 */
	Buffer$1.allocUnsafeSlow = function (size) {
	  return allocUnsafe(null, size)
	};

	function fromString (that, string, encoding) {
	  if (typeof encoding !== 'string' || encoding === '') {
	    encoding = 'utf8';
	  }

	  if (!Buffer$1.isEncoding(encoding)) {
	    throw new TypeError('"encoding" must be a valid string encoding')
	  }

	  var length = byteLength(string, encoding) | 0;
	  that = createBuffer(that, length);

	  var actual = that.write(string, encoding);

	  if (actual !== length) {
	    // Writing a hex string, for example, that contains invalid characters will
	    // cause everything after the first invalid character to be ignored. (e.g.
	    // 'abxxcd' will be treated as 'ab')
	    that = that.slice(0, actual);
	  }

	  return that
	}

	function fromArrayLike (that, array) {
	  var length = array.length < 0 ? 0 : checked(array.length) | 0;
	  that = createBuffer(that, length);
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255;
	  }
	  return that
	}

	function fromArrayBuffer (that, array, byteOffset, length) {
	  array.byteLength; // this throws if `array` is not a valid ArrayBuffer

	  if (byteOffset < 0 || array.byteLength < byteOffset) {
	    throw new RangeError('\'offset\' is out of bounds')
	  }

	  if (array.byteLength < byteOffset + (length || 0)) {
	    throw new RangeError('\'length\' is out of bounds')
	  }

	  if (byteOffset === undefined && length === undefined) {
	    array = new Uint8Array(array);
	  } else if (length === undefined) {
	    array = new Uint8Array(array, byteOffset);
	  } else {
	    array = new Uint8Array(array, byteOffset, length);
	  }

	  if (Buffer$1.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = array;
	    that.__proto__ = Buffer$1.prototype;
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that = fromArrayLike(that, array);
	  }
	  return that
	}

	function fromObject (that, obj) {
	  if (internalIsBuffer(obj)) {
	    var len = checked(obj.length) | 0;
	    that = createBuffer(that, len);

	    if (that.length === 0) {
	      return that
	    }

	    obj.copy(that, 0, 0, len);
	    return that
	  }

	  if (obj) {
	    if ((typeof ArrayBuffer !== 'undefined' &&
	        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
	      if (typeof obj.length !== 'number' || isnan(obj.length)) {
	        return createBuffer(that, 0)
	      }
	      return fromArrayLike(that, obj)
	    }

	    if (obj.type === 'Buffer' && isArray(obj.data)) {
	      return fromArrayLike(that, obj.data)
	    }
	  }

	  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
	}

	function checked (length) {
	  // Note: cannot use `length < kMaxLength()` here because that fails when
	  // length is NaN (which is otherwise coerced to zero.)
	  if (length >= kMaxLength()) {
	    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
	                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
	  }
	  return length | 0
	}

	function SlowBuffer (length) {
	  if (+length != length) { // eslint-disable-line eqeqeq
	    length = 0;
	  }
	  return Buffer$1.alloc(+length)
	}
	Buffer$1.isBuffer = isBuffer;
	function internalIsBuffer (b) {
	  return !!(b != null && b._isBuffer)
	}

	Buffer$1.compare = function compare (a, b) {
	  if (!internalIsBuffer(a) || !internalIsBuffer(b)) {
	    throw new TypeError('Arguments must be Buffers')
	  }

	  if (a === b) return 0

	  var x = a.length;
	  var y = b.length;

	  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
	    if (a[i] !== b[i]) {
	      x = a[i];
	      y = b[i];
	      break
	    }
	  }

	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	};

	Buffer$1.isEncoding = function isEncoding (encoding) {
	  switch (String(encoding).toLowerCase()) {
	    case 'hex':
	    case 'utf8':
	    case 'utf-8':
	    case 'ascii':
	    case 'latin1':
	    case 'binary':
	    case 'base64':
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return true
	    default:
	      return false
	  }
	};

	Buffer$1.concat = function concat (list, length) {
	  if (!isArray(list)) {
	    throw new TypeError('"list" argument must be an Array of Buffers')
	  }

	  if (list.length === 0) {
	    return Buffer$1.alloc(0)
	  }

	  var i;
	  if (length === undefined) {
	    length = 0;
	    for (i = 0; i < list.length; ++i) {
	      length += list[i].length;
	    }
	  }

	  var buffer = Buffer$1.allocUnsafe(length);
	  var pos = 0;
	  for (i = 0; i < list.length; ++i) {
	    var buf = list[i];
	    if (!internalIsBuffer(buf)) {
	      throw new TypeError('"list" argument must be an Array of Buffers')
	    }
	    buf.copy(buffer, pos);
	    pos += buf.length;
	  }
	  return buffer
	};

	function byteLength (string, encoding) {
	  if (internalIsBuffer(string)) {
	    return string.length
	  }
	  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
	      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
	    return string.byteLength
	  }
	  if (typeof string !== 'string') {
	    string = '' + string;
	  }

	  var len = string.length;
	  if (len === 0) return 0

	  // Use a for loop to avoid recursion
	  var loweredCase = false;
	  for (;;) {
	    switch (encoding) {
	      case 'ascii':
	      case 'latin1':
	      case 'binary':
	        return len
	      case 'utf8':
	      case 'utf-8':
	      case undefined:
	        return utf8ToBytes(string).length
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return len * 2
	      case 'hex':
	        return len >>> 1
	      case 'base64':
	        return base64ToBytes(string).length
	      default:
	        if (loweredCase) return utf8ToBytes(string).length // assume utf8
	        encoding = ('' + encoding).toLowerCase();
	        loweredCase = true;
	    }
	  }
	}
	Buffer$1.byteLength = byteLength;

	function slowToString (encoding, start, end) {
	  var loweredCase = false;

	  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
	  // property of a typed array.

	  // This behaves neither like String nor Uint8Array in that we set start/end
	  // to their upper/lower bounds if the value passed is out of range.
	  // undefined is handled specially as per ECMA-262 6th Edition,
	  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
	  if (start === undefined || start < 0) {
	    start = 0;
	  }
	  // Return early if start > this.length. Done here to prevent potential uint32
	  // coercion fail below.
	  if (start > this.length) {
	    return ''
	  }

	  if (end === undefined || end > this.length) {
	    end = this.length;
	  }

	  if (end <= 0) {
	    return ''
	  }

	  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
	  end >>>= 0;
	  start >>>= 0;

	  if (end <= start) {
	    return ''
	  }

	  if (!encoding) encoding = 'utf8';

	  while (true) {
	    switch (encoding) {
	      case 'hex':
	        return hexSlice(this, start, end)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Slice(this, start, end)

	      case 'ascii':
	        return asciiSlice(this, start, end)

	      case 'latin1':
	      case 'binary':
	        return latin1Slice(this, start, end)

	      case 'base64':
	        return base64Slice(this, start, end)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return utf16leSlice(this, start, end)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = (encoding + '').toLowerCase();
	        loweredCase = true;
	    }
	  }
	}

	// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
	// Buffer instances.
	Buffer$1.prototype._isBuffer = true;

	function swap (b, n, m) {
	  var i = b[n];
	  b[n] = b[m];
	  b[m] = i;
	}

	Buffer$1.prototype.swap16 = function swap16 () {
	  var len = this.length;
	  if (len % 2 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 16-bits')
	  }
	  for (var i = 0; i < len; i += 2) {
	    swap(this, i, i + 1);
	  }
	  return this
	};

	Buffer$1.prototype.swap32 = function swap32 () {
	  var len = this.length;
	  if (len % 4 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 32-bits')
	  }
	  for (var i = 0; i < len; i += 4) {
	    swap(this, i, i + 3);
	    swap(this, i + 1, i + 2);
	  }
	  return this
	};

	Buffer$1.prototype.swap64 = function swap64 () {
	  var len = this.length;
	  if (len % 8 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 64-bits')
	  }
	  for (var i = 0; i < len; i += 8) {
	    swap(this, i, i + 7);
	    swap(this, i + 1, i + 6);
	    swap(this, i + 2, i + 5);
	    swap(this, i + 3, i + 4);
	  }
	  return this
	};

	Buffer$1.prototype.toString = function toString () {
	  var length = this.length | 0;
	  if (length === 0) return ''
	  if (arguments.length === 0) return utf8Slice(this, 0, length)
	  return slowToString.apply(this, arguments)
	};

	Buffer$1.prototype.equals = function equals (b) {
	  if (!internalIsBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return true
	  return Buffer$1.compare(this, b) === 0
	};

	Buffer$1.prototype.inspect = function inspect () {
	  var str = '';
	  var max = INSPECT_MAX_BYTES;
	  if (this.length > 0) {
	    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ');
	    if (this.length > max) str += ' ... ';
	  }
	  return '<Buffer ' + str + '>'
	};

	Buffer$1.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
	  if (!internalIsBuffer(target)) {
	    throw new TypeError('Argument must be a Buffer')
	  }

	  if (start === undefined) {
	    start = 0;
	  }
	  if (end === undefined) {
	    end = target ? target.length : 0;
	  }
	  if (thisStart === undefined) {
	    thisStart = 0;
	  }
	  if (thisEnd === undefined) {
	    thisEnd = this.length;
	  }

	  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
	    throw new RangeError('out of range index')
	  }

	  if (thisStart >= thisEnd && start >= end) {
	    return 0
	  }
	  if (thisStart >= thisEnd) {
	    return -1
	  }
	  if (start >= end) {
	    return 1
	  }

	  start >>>= 0;
	  end >>>= 0;
	  thisStart >>>= 0;
	  thisEnd >>>= 0;

	  if (this === target) return 0

	  var x = thisEnd - thisStart;
	  var y = end - start;
	  var len = Math.min(x, y);

	  var thisCopy = this.slice(thisStart, thisEnd);
	  var targetCopy = target.slice(start, end);

	  for (var i = 0; i < len; ++i) {
	    if (thisCopy[i] !== targetCopy[i]) {
	      x = thisCopy[i];
	      y = targetCopy[i];
	      break
	    }
	  }

	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	};

	// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
	// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
	//
	// Arguments:
	// - buffer - a Buffer to search
	// - val - a string, Buffer, or number
	// - byteOffset - an index into `buffer`; will be clamped to an int32
	// - encoding - an optional encoding, relevant is val is a string
	// - dir - true for indexOf, false for lastIndexOf
	function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
	  // Empty buffer means no match
	  if (buffer.length === 0) return -1

	  // Normalize byteOffset
	  if (typeof byteOffset === 'string') {
	    encoding = byteOffset;
	    byteOffset = 0;
	  } else if (byteOffset > 0x7fffffff) {
	    byteOffset = 0x7fffffff;
	  } else if (byteOffset < -0x80000000) {
	    byteOffset = -0x80000000;
	  }
	  byteOffset = +byteOffset;  // Coerce to Number.
	  if (isNaN(byteOffset)) {
	    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
	    byteOffset = dir ? 0 : (buffer.length - 1);
	  }

	  // Normalize byteOffset: negative offsets start from the end of the buffer
	  if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
	  if (byteOffset >= buffer.length) {
	    if (dir) return -1
	    else byteOffset = buffer.length - 1;
	  } else if (byteOffset < 0) {
	    if (dir) byteOffset = 0;
	    else return -1
	  }

	  // Normalize val
	  if (typeof val === 'string') {
	    val = Buffer$1.from(val, encoding);
	  }

	  // Finally, search either indexOf (if dir is true) or lastIndexOf
	  if (internalIsBuffer(val)) {
	    // Special case: looking for empty string/buffer always fails
	    if (val.length === 0) {
	      return -1
	    }
	    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
	  } else if (typeof val === 'number') {
	    val = val & 0xFF; // Search for a byte value [0-255]
	    if (Buffer$1.TYPED_ARRAY_SUPPORT &&
	        typeof Uint8Array.prototype.indexOf === 'function') {
	      if (dir) {
	        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
	      } else {
	        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
	      }
	    }
	    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
	  }

	  throw new TypeError('val must be string, number or Buffer')
	}

	function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
	  var indexSize = 1;
	  var arrLength = arr.length;
	  var valLength = val.length;

	  if (encoding !== undefined) {
	    encoding = String(encoding).toLowerCase();
	    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
	        encoding === 'utf16le' || encoding === 'utf-16le') {
	      if (arr.length < 2 || val.length < 2) {
	        return -1
	      }
	      indexSize = 2;
	      arrLength /= 2;
	      valLength /= 2;
	      byteOffset /= 2;
	    }
	  }

	  function read$$1 (buf, i) {
	    if (indexSize === 1) {
	      return buf[i]
	    } else {
	      return buf.readUInt16BE(i * indexSize)
	    }
	  }

	  var i;
	  if (dir) {
	    var foundIndex = -1;
	    for (i = byteOffset; i < arrLength; i++) {
	      if (read$$1(arr, i) === read$$1(val, foundIndex === -1 ? 0 : i - foundIndex)) {
	        if (foundIndex === -1) foundIndex = i;
	        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
	      } else {
	        if (foundIndex !== -1) i -= i - foundIndex;
	        foundIndex = -1;
	      }
	    }
	  } else {
	    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
	    for (i = byteOffset; i >= 0; i--) {
	      var found = true;
	      for (var j = 0; j < valLength; j++) {
	        if (read$$1(arr, i + j) !== read$$1(val, j)) {
	          found = false;
	          break
	        }
	      }
	      if (found) return i
	    }
	  }

	  return -1
	}

	Buffer$1.prototype.includes = function includes (val, byteOffset, encoding) {
	  return this.indexOf(val, byteOffset, encoding) !== -1
	};

	Buffer$1.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
	};

	Buffer$1.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
	};

	function hexWrite (buf, string, offset, length) {
	  offset = Number(offset) || 0;
	  var remaining = buf.length - offset;
	  if (!length) {
	    length = remaining;
	  } else {
	    length = Number(length);
	    if (length > remaining) {
	      length = remaining;
	    }
	  }

	  // must be an even number of digits
	  var strLen = string.length;
	  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

	  if (length > strLen / 2) {
	    length = strLen / 2;
	  }
	  for (var i = 0; i < length; ++i) {
	    var parsed = parseInt(string.substr(i * 2, 2), 16);
	    if (isNaN(parsed)) return i
	    buf[offset + i] = parsed;
	  }
	  return i
	}

	function utf8Write (buf, string, offset, length) {
	  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
	}

	function asciiWrite (buf, string, offset, length) {
	  return blitBuffer(asciiToBytes(string), buf, offset, length)
	}

	function latin1Write (buf, string, offset, length) {
	  return asciiWrite(buf, string, offset, length)
	}

	function base64Write (buf, string, offset, length) {
	  return blitBuffer(base64ToBytes(string), buf, offset, length)
	}

	function ucs2Write (buf, string, offset, length) {
	  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
	}

	Buffer$1.prototype.write = function write$$1 (string, offset, length, encoding) {
	  // Buffer#write(string)
	  if (offset === undefined) {
	    encoding = 'utf8';
	    length = this.length;
	    offset = 0;
	  // Buffer#write(string, encoding)
	  } else if (length === undefined && typeof offset === 'string') {
	    encoding = offset;
	    length = this.length;
	    offset = 0;
	  // Buffer#write(string, offset[, length][, encoding])
	  } else if (isFinite(offset)) {
	    offset = offset | 0;
	    if (isFinite(length)) {
	      length = length | 0;
	      if (encoding === undefined) encoding = 'utf8';
	    } else {
	      encoding = length;
	      length = undefined;
	    }
	  // legacy write(string, encoding, offset, length) - remove in v0.13
	  } else {
	    throw new Error(
	      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
	    )
	  }

	  var remaining = this.length - offset;
	  if (length === undefined || length > remaining) length = remaining;

	  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
	    throw new RangeError('Attempt to write outside buffer bounds')
	  }

	  if (!encoding) encoding = 'utf8';

	  var loweredCase = false;
	  for (;;) {
	    switch (encoding) {
	      case 'hex':
	        return hexWrite(this, string, offset, length)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Write(this, string, offset, length)

	      case 'ascii':
	        return asciiWrite(this, string, offset, length)

	      case 'latin1':
	      case 'binary':
	        return latin1Write(this, string, offset, length)

	      case 'base64':
	        // Warning: maxLength not taken into account in base64Write
	        return base64Write(this, string, offset, length)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return ucs2Write(this, string, offset, length)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = ('' + encoding).toLowerCase();
	        loweredCase = true;
	    }
	  }
	};

	Buffer$1.prototype.toJSON = function toJSON () {
	  return {
	    type: 'Buffer',
	    data: Array.prototype.slice.call(this._arr || this, 0)
	  }
	};

	function base64Slice (buf, start, end) {
	  if (start === 0 && end === buf.length) {
	    return fromByteArray(buf)
	  } else {
	    return fromByteArray(buf.slice(start, end))
	  }
	}

	function utf8Slice (buf, start, end) {
	  end = Math.min(buf.length, end);
	  var res = [];

	  var i = start;
	  while (i < end) {
	    var firstByte = buf[i];
	    var codePoint = null;
	    var bytesPerSequence = (firstByte > 0xEF) ? 4
	      : (firstByte > 0xDF) ? 3
	      : (firstByte > 0xBF) ? 2
	      : 1;

	    if (i + bytesPerSequence <= end) {
	      var secondByte, thirdByte, fourthByte, tempCodePoint;

	      switch (bytesPerSequence) {
	        case 1:
	          if (firstByte < 0x80) {
	            codePoint = firstByte;
	          }
	          break
	        case 2:
	          secondByte = buf[i + 1];
	          if ((secondByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F);
	            if (tempCodePoint > 0x7F) {
	              codePoint = tempCodePoint;
	            }
	          }
	          break
	        case 3:
	          secondByte = buf[i + 1];
	          thirdByte = buf[i + 2];
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F);
	            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
	              codePoint = tempCodePoint;
	            }
	          }
	          break
	        case 4:
	          secondByte = buf[i + 1];
	          thirdByte = buf[i + 2];
	          fourthByte = buf[i + 3];
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F);
	            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
	              codePoint = tempCodePoint;
	            }
	          }
	      }
	    }

	    if (codePoint === null) {
	      // we did not generate a valid codePoint so insert a
	      // replacement char (U+FFFD) and advance only 1 byte
	      codePoint = 0xFFFD;
	      bytesPerSequence = 1;
	    } else if (codePoint > 0xFFFF) {
	      // encode to utf16 (surrogate pair dance)
	      codePoint -= 0x10000;
	      res.push(codePoint >>> 10 & 0x3FF | 0xD800);
	      codePoint = 0xDC00 | codePoint & 0x3FF;
	    }

	    res.push(codePoint);
	    i += bytesPerSequence;
	  }

	  return decodeCodePointsArray(res)
	}

	// Based on http://stackoverflow.com/a/22747272/680742, the browser with
	// the lowest limit is Chrome, with 0x10000 args.
	// We go 1 magnitude less, for safety
	var MAX_ARGUMENTS_LENGTH = 0x1000;

	function decodeCodePointsArray (codePoints) {
	  var len = codePoints.length;
	  if (len <= MAX_ARGUMENTS_LENGTH) {
	    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
	  }

	  // Decode in chunks to avoid "call stack size exceeded".
	  var res = '';
	  var i = 0;
	  while (i < len) {
	    res += String.fromCharCode.apply(
	      String,
	      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
	    );
	  }
	  return res
	}

	function asciiSlice (buf, start, end) {
	  var ret = '';
	  end = Math.min(buf.length, end);

	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i] & 0x7F);
	  }
	  return ret
	}

	function latin1Slice (buf, start, end) {
	  var ret = '';
	  end = Math.min(buf.length, end);

	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i]);
	  }
	  return ret
	}

	function hexSlice (buf, start, end) {
	  var len = buf.length;

	  if (!start || start < 0) start = 0;
	  if (!end || end < 0 || end > len) end = len;

	  var out = '';
	  for (var i = start; i < end; ++i) {
	    out += toHex(buf[i]);
	  }
	  return out
	}

	function utf16leSlice (buf, start, end) {
	  var bytes = buf.slice(start, end);
	  var res = '';
	  for (var i = 0; i < bytes.length; i += 2) {
	    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
	  }
	  return res
	}

	Buffer$1.prototype.slice = function slice (start, end) {
	  var len = this.length;
	  start = ~~start;
	  end = end === undefined ? len : ~~end;

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

	  var newBuf;
	  if (Buffer$1.TYPED_ARRAY_SUPPORT) {
	    newBuf = this.subarray(start, end);
	    newBuf.__proto__ = Buffer$1.prototype;
	  } else {
	    var sliceLen = end - start;
	    newBuf = new Buffer$1(sliceLen, undefined);
	    for (var i = 0; i < sliceLen; ++i) {
	      newBuf[i] = this[i + start];
	    }
	  }

	  return newBuf
	};

	/*
	 * Need to make sure that buffer isn't trying to write out of bounds.
	 */
	function checkOffset (offset, ext, length) {
	  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
	  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
	}

	Buffer$1.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0;
	  byteLength = byteLength | 0;
	  if (!noAssert) checkOffset(offset, byteLength, this.length);

	  var val = this[offset];
	  var mul = 1;
	  var i = 0;
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul;
	  }

	  return val
	};

	Buffer$1.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0;
	  byteLength = byteLength | 0;
	  if (!noAssert) {
	    checkOffset(offset, byteLength, this.length);
	  }

	  var val = this[offset + --byteLength];
	  var mul = 1;
	  while (byteLength > 0 && (mul *= 0x100)) {
	    val += this[offset + --byteLength] * mul;
	  }

	  return val
	};

	Buffer$1.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length);
	  return this[offset]
	};

	Buffer$1.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length);
	  return this[offset] | (this[offset + 1] << 8)
	};

	Buffer$1.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length);
	  return (this[offset] << 8) | this[offset + 1]
	};

	Buffer$1.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);

	  return ((this[offset]) |
	      (this[offset + 1] << 8) |
	      (this[offset + 2] << 16)) +
	      (this[offset + 3] * 0x1000000)
	};

	Buffer$1.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);

	  return (this[offset] * 0x1000000) +
	    ((this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    this[offset + 3])
	};

	Buffer$1.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0;
	  byteLength = byteLength | 0;
	  if (!noAssert) checkOffset(offset, byteLength, this.length);

	  var val = this[offset];
	  var mul = 1;
	  var i = 0;
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul;
	  }
	  mul *= 0x80;

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength);

	  return val
	};

	Buffer$1.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0;
	  byteLength = byteLength | 0;
	  if (!noAssert) checkOffset(offset, byteLength, this.length);

	  var i = byteLength;
	  var mul = 1;
	  var val = this[offset + --i];
	  while (i > 0 && (mul *= 0x100)) {
	    val += this[offset + --i] * mul;
	  }
	  mul *= 0x80;

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength);

	  return val
	};

	Buffer$1.prototype.readInt8 = function readInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length);
	  if (!(this[offset] & 0x80)) return (this[offset])
	  return ((0xff - this[offset] + 1) * -1)
	};

	Buffer$1.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length);
	  var val = this[offset] | (this[offset + 1] << 8);
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	};

	Buffer$1.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length);
	  var val = this[offset + 1] | (this[offset] << 8);
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	};

	Buffer$1.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);

	  return (this[offset]) |
	    (this[offset + 1] << 8) |
	    (this[offset + 2] << 16) |
	    (this[offset + 3] << 24)
	};

	Buffer$1.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);

	  return (this[offset] << 24) |
	    (this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    (this[offset + 3])
	};

	Buffer$1.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);
	  return read(this, offset, true, 23, 4)
	};

	Buffer$1.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);
	  return read(this, offset, false, 23, 4)
	};

	Buffer$1.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length);
	  return read(this, offset, true, 52, 8)
	};

	Buffer$1.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length);
	  return read(this, offset, false, 52, 8)
	};

	function checkInt (buf, value, offset, ext, max, min) {
	  if (!internalIsBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
	  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	}

	Buffer$1.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  byteLength = byteLength | 0;
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
	    checkInt(this, value, offset, byteLength, maxBytes, 0);
	  }

	  var mul = 1;
	  var i = 0;
	  this[offset] = value & 0xFF;
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF;
	  }

	  return offset + byteLength
	};

	Buffer$1.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  byteLength = byteLength | 0;
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
	    checkInt(this, value, offset, byteLength, maxBytes, 0);
	  }

	  var i = byteLength - 1;
	  var mul = 1;
	  this[offset + i] = value & 0xFF;
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF;
	  }

	  return offset + byteLength
	};

	Buffer$1.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0);
	  if (!Buffer$1.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
	  this[offset] = (value & 0xff);
	  return offset + 1
	};

	function objectWriteUInt16 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffff + value + 1;
	  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
	    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
	      (littleEndian ? i : 1 - i) * 8;
	  }
	}

	Buffer$1.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
	  if (Buffer$1.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff);
	    this[offset + 1] = (value >>> 8);
	  } else {
	    objectWriteUInt16(this, value, offset, true);
	  }
	  return offset + 2
	};

	Buffer$1.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
	  if (Buffer$1.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8);
	    this[offset + 1] = (value & 0xff);
	  } else {
	    objectWriteUInt16(this, value, offset, false);
	  }
	  return offset + 2
	};

	function objectWriteUInt32 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffffffff + value + 1;
	  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
	    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff;
	  }
	}

	Buffer$1.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
	  if (Buffer$1.TYPED_ARRAY_SUPPORT) {
	    this[offset + 3] = (value >>> 24);
	    this[offset + 2] = (value >>> 16);
	    this[offset + 1] = (value >>> 8);
	    this[offset] = (value & 0xff);
	  } else {
	    objectWriteUInt32(this, value, offset, true);
	  }
	  return offset + 4
	};

	Buffer$1.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
	  if (Buffer$1.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24);
	    this[offset + 1] = (value >>> 16);
	    this[offset + 2] = (value >>> 8);
	    this[offset + 3] = (value & 0xff);
	  } else {
	    objectWriteUInt32(this, value, offset, false);
	  }
	  return offset + 4
	};

	Buffer$1.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1);

	    checkInt(this, value, offset, byteLength, limit - 1, -limit);
	  }

	  var i = 0;
	  var mul = 1;
	  var sub = 0;
	  this[offset] = value & 0xFF;
	  while (++i < byteLength && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
	      sub = 1;
	    }
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
	  }

	  return offset + byteLength
	};

	Buffer$1.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1);

	    checkInt(this, value, offset, byteLength, limit - 1, -limit);
	  }

	  var i = byteLength - 1;
	  var mul = 1;
	  var sub = 0;
	  this[offset + i] = value & 0xFF;
	  while (--i >= 0 && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
	      sub = 1;
	    }
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
	  }

	  return offset + byteLength
	};

	Buffer$1.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80);
	  if (!Buffer$1.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
	  if (value < 0) value = 0xff + value + 1;
	  this[offset] = (value & 0xff);
	  return offset + 1
	};

	Buffer$1.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
	  if (Buffer$1.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff);
	    this[offset + 1] = (value >>> 8);
	  } else {
	    objectWriteUInt16(this, value, offset, true);
	  }
	  return offset + 2
	};

	Buffer$1.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
	  if (Buffer$1.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8);
	    this[offset + 1] = (value & 0xff);
	  } else {
	    objectWriteUInt16(this, value, offset, false);
	  }
	  return offset + 2
	};

	Buffer$1.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
	  if (Buffer$1.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff);
	    this[offset + 1] = (value >>> 8);
	    this[offset + 2] = (value >>> 16);
	    this[offset + 3] = (value >>> 24);
	  } else {
	    objectWriteUInt32(this, value, offset, true);
	  }
	  return offset + 4
	};

	Buffer$1.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
	  if (value < 0) value = 0xffffffff + value + 1;
	  if (Buffer$1.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24);
	    this[offset + 1] = (value >>> 16);
	    this[offset + 2] = (value >>> 8);
	    this[offset + 3] = (value & 0xff);
	  } else {
	    objectWriteUInt32(this, value, offset, false);
	  }
	  return offset + 4
	};

	function checkIEEE754 (buf, value, offset, ext, max, min) {
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	  if (offset < 0) throw new RangeError('Index out of range')
	}

	function writeFloat (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38);
	  }
	  write(buf, value, offset, littleEndian, 23, 4);
	  return offset + 4
	}

	Buffer$1.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, true, noAssert)
	};

	Buffer$1.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, false, noAssert)
	};

	function writeDouble (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308);
	  }
	  write(buf, value, offset, littleEndian, 52, 8);
	  return offset + 8
	}

	Buffer$1.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, true, noAssert)
	};

	Buffer$1.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, false, noAssert)
	};

	// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
	Buffer$1.prototype.copy = function copy (target, targetStart, start, end) {
	  if (!start) start = 0;
	  if (!end && end !== 0) end = this.length;
	  if (targetStart >= target.length) targetStart = target.length;
	  if (!targetStart) targetStart = 0;
	  if (end > 0 && end < start) end = start;

	  // Copy 0 bytes; we're done
	  if (end === start) return 0
	  if (target.length === 0 || this.length === 0) return 0

	  // Fatal error conditions
	  if (targetStart < 0) {
	    throw new RangeError('targetStart out of bounds')
	  }
	  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
	  if (end < 0) throw new RangeError('sourceEnd out of bounds')

	  // Are we oob?
	  if (end > this.length) end = this.length;
	  if (target.length - targetStart < end - start) {
	    end = target.length - targetStart + start;
	  }

	  var len = end - start;
	  var i;

	  if (this === target && start < targetStart && targetStart < end) {
	    // descending copy from end
	    for (i = len - 1; i >= 0; --i) {
	      target[i + targetStart] = this[i + start];
	    }
	  } else if (len < 1000 || !Buffer$1.TYPED_ARRAY_SUPPORT) {
	    // ascending copy from start
	    for (i = 0; i < len; ++i) {
	      target[i + targetStart] = this[i + start];
	    }
	  } else {
	    Uint8Array.prototype.set.call(
	      target,
	      this.subarray(start, start + len),
	      targetStart
	    );
	  }

	  return len
	};

	// Usage:
	//    buffer.fill(number[, offset[, end]])
	//    buffer.fill(buffer[, offset[, end]])
	//    buffer.fill(string[, offset[, end]][, encoding])
	Buffer$1.prototype.fill = function fill (val, start, end, encoding) {
	  // Handle string cases:
	  if (typeof val === 'string') {
	    if (typeof start === 'string') {
	      encoding = start;
	      start = 0;
	      end = this.length;
	    } else if (typeof end === 'string') {
	      encoding = end;
	      end = this.length;
	    }
	    if (val.length === 1) {
	      var code = val.charCodeAt(0);
	      if (code < 256) {
	        val = code;
	      }
	    }
	    if (encoding !== undefined && typeof encoding !== 'string') {
	      throw new TypeError('encoding must be a string')
	    }
	    if (typeof encoding === 'string' && !Buffer$1.isEncoding(encoding)) {
	      throw new TypeError('Unknown encoding: ' + encoding)
	    }
	  } else if (typeof val === 'number') {
	    val = val & 255;
	  }

	  // Invalid ranges are not set to a default, so can range check early.
	  if (start < 0 || this.length < start || this.length < end) {
	    throw new RangeError('Out of range index')
	  }

	  if (end <= start) {
	    return this
	  }

	  start = start >>> 0;
	  end = end === undefined ? this.length : end >>> 0;

	  if (!val) val = 0;

	  var i;
	  if (typeof val === 'number') {
	    for (i = start; i < end; ++i) {
	      this[i] = val;
	    }
	  } else {
	    var bytes = internalIsBuffer(val)
	      ? val
	      : utf8ToBytes(new Buffer$1(val, encoding).toString());
	    var len = bytes.length;
	    for (i = 0; i < end - start; ++i) {
	      this[i + start] = bytes[i % len];
	    }
	  }

	  return this
	};

	// HELPER FUNCTIONS
	// ================

	var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;

	function base64clean (str) {
	  // Node strips out invalid characters like \n and \t from the string, base64-js does not
	  str = stringtrim(str).replace(INVALID_BASE64_RE, '');
	  // Node converts strings with length < 2 to ''
	  if (str.length < 2) return ''
	  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
	  while (str.length % 4 !== 0) {
	    str = str + '=';
	  }
	  return str
	}

	function stringtrim (str) {
	  if (str.trim) return str.trim()
	  return str.replace(/^\s+|\s+$/g, '')
	}

	function toHex (n) {
	  if (n < 16) return '0' + n.toString(16)
	  return n.toString(16)
	}

	function utf8ToBytes (string, units) {
	  units = units || Infinity;
	  var codePoint;
	  var length = string.length;
	  var leadSurrogate = null;
	  var bytes = [];

	  for (var i = 0; i < length; ++i) {
	    codePoint = string.charCodeAt(i);

	    // is surrogate component
	    if (codePoint > 0xD7FF && codePoint < 0xE000) {
	      // last char was a lead
	      if (!leadSurrogate) {
	        // no lead yet
	        if (codePoint > 0xDBFF) {
	          // unexpected trail
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
	          continue
	        } else if (i + 1 === length) {
	          // unpaired lead
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
	          continue
	        }

	        // valid lead
	        leadSurrogate = codePoint;

	        continue
	      }

	      // 2 leads in a row
	      if (codePoint < 0xDC00) {
	        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
	        leadSurrogate = codePoint;
	        continue
	      }

	      // valid surrogate pair
	      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
	    } else if (leadSurrogate) {
	      // valid bmp char, but last char was a lead
	      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
	    }

	    leadSurrogate = null;

	    // encode utf8
	    if (codePoint < 0x80) {
	      if ((units -= 1) < 0) break
	      bytes.push(codePoint);
	    } else if (codePoint < 0x800) {
	      if ((units -= 2) < 0) break
	      bytes.push(
	        codePoint >> 0x6 | 0xC0,
	        codePoint & 0x3F | 0x80
	      );
	    } else if (codePoint < 0x10000) {
	      if ((units -= 3) < 0) break
	      bytes.push(
	        codePoint >> 0xC | 0xE0,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      );
	    } else if (codePoint < 0x110000) {
	      if ((units -= 4) < 0) break
	      bytes.push(
	        codePoint >> 0x12 | 0xF0,
	        codePoint >> 0xC & 0x3F | 0x80,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      );
	    } else {
	      throw new Error('Invalid code point')
	    }
	  }

	  return bytes
	}

	function asciiToBytes (str) {
	  var byteArray = [];
	  for (var i = 0; i < str.length; ++i) {
	    // Node's code seems to be doing this and not & 0x7F..
	    byteArray.push(str.charCodeAt(i) & 0xFF);
	  }
	  return byteArray
	}

	function utf16leToBytes (str, units) {
	  var c, hi, lo;
	  var byteArray = [];
	  for (var i = 0; i < str.length; ++i) {
	    if ((units -= 2) < 0) break

	    c = str.charCodeAt(i);
	    hi = c >> 8;
	    lo = c % 256;
	    byteArray.push(lo);
	    byteArray.push(hi);
	  }

	  return byteArray
	}


	function base64ToBytes (str) {
	  return toByteArray(base64clean(str))
	}

	function blitBuffer (src, dst, offset, length) {
	  for (var i = 0; i < length; ++i) {
	    if ((i + offset >= dst.length) || (i >= src.length)) break
	    dst[i + offset] = src[i];
	  }
	  return i
	}

	function isnan (val) {
	  return val !== val // eslint-disable-line no-self-compare
	}


	// the following is from is-buffer, also by Feross Aboukhadijeh and with same lisence
	// The _isBuffer check is for Safari 5-7 support, because it's missing
	// Object.prototype.constructor. Remove this eventually
	function isBuffer(obj) {
	  return obj != null && (!!obj._isBuffer || isFastBuffer(obj) || isSlowBuffer(obj))
	}

	function isFastBuffer (obj) {
	  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
	}

	// For Node v0.10 support. Remove this eventually.
	function isSlowBuffer (obj) {
	  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isFastBuffer(obj.slice(0, 0))
	}

	var bufferEs6 = /*#__PURE__*/Object.freeze({
		INSPECT_MAX_BYTES: INSPECT_MAX_BYTES,
		kMaxLength: _kMaxLength,
		Buffer: Buffer$1,
		SlowBuffer: SlowBuffer,
		isBuffer: isBuffer
	});

	function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
	  try {
	    var info = gen[key](arg);
	    var value = info.value;
	  } catch (error) {
	    reject(error);
	    return;
	  }

	  if (info.done) {
	    resolve(value);
	  } else {
	    Promise.resolve(value).then(_next, _throw);
	  }
	}

	function _asyncToGenerator(fn) {
	  return function () {
	    var self = this,
	        args = arguments;
	    return new Promise(function (resolve, reject) {
	      var gen = fn.apply(self, args);

	      function _next(value) {
	        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
	      }

	      function _throw(err) {
	        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
	      }

	      _next(undefined);
	    });
	  };
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	function _defineProperties(target, props) {
	  for (var i = 0; i < props.length; i++) {
	    var descriptor = props[i];
	    descriptor.enumerable = descriptor.enumerable || false;
	    descriptor.configurable = true;
	    if ("value" in descriptor) descriptor.writable = true;
	    Object.defineProperty(target, descriptor.key, descriptor);
	  }
	}

	function _createClass(Constructor, protoProps, staticProps) {
	  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	  if (staticProps) _defineProperties(Constructor, staticProps);
	  return Constructor;
	}

	function _defineProperty(obj, key, value) {
	  if (key in obj) {
	    Object.defineProperty(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	}

	function _objectSpread(target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i] != null ? arguments[i] : {};
	    var ownKeys = Object.keys(source);

	    if (typeof Object.getOwnPropertySymbols === 'function') {
	      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
	        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
	      }));
	    }

	    ownKeys.forEach(function (key) {
	      _defineProperty(target, key, source[key]);
	    });
	  }

	  return target;
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function");
	  }

	  subClass.prototype = Object.create(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _setPrototypeOf(subClass, superClass);
	}

	function _getPrototypeOf(o) {
	  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
	    return o.__proto__ || Object.getPrototypeOf(o);
	  };
	  return _getPrototypeOf(o);
	}

	function _setPrototypeOf(o, p) {
	  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
	    o.__proto__ = p;
	    return o;
	  };

	  return _setPrototypeOf(o, p);
	}

	function _assertThisInitialized(self) {
	  if (self === void 0) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return self;
	}

	function _possibleConstructorReturn(self, call) {
	  if (call && (typeof call === "object" || typeof call === "function")) {
	    return call;
	  }

	  return _assertThisInitialized(self);
	}

	var $jscomp={scope:{},getGlobal:function(a){return "undefined"!=typeof window&&window===a?a:"undefined"!=typeof commonjsGlobal?commonjsGlobal:a}};$jscomp.global=$jscomp.getGlobal(commonjsGlobal);$jscomp.initSymbol=function(){$jscomp.global.Symbol||($jscomp.global.Symbol=$jscomp.Symbol);$jscomp.initSymbol=function(){};};$jscomp.symbolCounter_=0;$jscomp.Symbol=function(a){return "jscomp_symbol_"+a+$jscomp.symbolCounter_++};
	$jscomp.initSymbolIterator=function(){$jscomp.initSymbol();$jscomp.global.Symbol.iterator||($jscomp.global.Symbol.iterator=$jscomp.global.Symbol("iterator"));$jscomp.initSymbolIterator=function(){};};$jscomp.makeIterator=function(a){$jscomp.initSymbolIterator();$jscomp.initSymbol();$jscomp.initSymbolIterator();var b=a[Symbol.iterator];if(b)return b.call(a);var c=0;return {next:function(){return c<a.length?{done:!1,value:a[c++]}:{done:!0}}}};
	$jscomp.arrayFromIterator=function(a){for(var b,c=[];!(b=a.next()).done;)c.push(b.value);return c};$jscomp.arrayFromIterable=function(a){return a instanceof Array?a:$jscomp.arrayFromIterator($jscomp.makeIterator(a))};$jscomp.inherits=function(a,b){function c(){}c.prototype=b.prototype;a.prototype=new c;a.prototype.constructor=a;for(var d in b)if(Object.defineProperties){var e=Object.getOwnPropertyDescriptor(b,d);e&&Object.defineProperty(a,d,e);}else a[d]=b[d];};$jscomp.array=$jscomp.array||{};
	$jscomp.iteratorFromArray=function(a,b){$jscomp.initSymbolIterator();a instanceof String&&(a+="");var c=0,d={next:function(){if(c<a.length){var e=c++;return {value:b(e,a[e]),done:!1}}d.next=function(){return {done:!0,value:void 0}};return d.next()}};$jscomp.initSymbol();$jscomp.initSymbolIterator();d[Symbol.iterator]=function(){return d};return d};
	$jscomp.findInternal=function(a,b,c){a instanceof String&&(a=String(a));for(var d=a.length,e=0;e<d;e++){var f=a[e];if(b.call(c,f,e,a))return {i:e,v:f}}return {i:-1,v:void 0}};
	$jscomp.array.from=function(a,b,c){$jscomp.initSymbolIterator();b=null!=b?b:function(a){return a};var d=[];$jscomp.initSymbol();$jscomp.initSymbolIterator();var e=a[Symbol.iterator];"function"==typeof e&&(a=e.call(a));if("function"==typeof a.next)for(;!(e=a.next()).done;)d.push(b.call(c,e.value));else for(var e=a.length,f=0;f<e;f++)d.push(b.call(c,a[f]));return d};$jscomp.array.of=function(a){return $jscomp.array.from(arguments)};
	$jscomp.array.entries=function(){return $jscomp.iteratorFromArray(this,function(a,b){return [a,b]})};$jscomp.array.installHelper_=function(a,b){!Array.prototype[a]&&Object.defineProperties&&Object.defineProperty&&Object.defineProperty(Array.prototype,a,{configurable:!0,enumerable:!1,writable:!0,value:b});};$jscomp.array.entries$install=function(){$jscomp.array.installHelper_("entries",$jscomp.array.entries);};$jscomp.array.keys=function(){return $jscomp.iteratorFromArray(this,function(a){return a})};
	$jscomp.array.keys$install=function(){$jscomp.array.installHelper_("keys",$jscomp.array.keys);};$jscomp.array.values=function(){return $jscomp.iteratorFromArray(this,function(a,b){return b})};$jscomp.array.values$install=function(){$jscomp.array.installHelper_("values",$jscomp.array.values);};
	$jscomp.array.copyWithin=function(a,b,c){var d=this.length;a=Number(a);b=Number(b);c=Number(null!=c?c:d);if(a<b)for(c=Math.min(c,d);b<c;)b in this?this[a++]=this[b++]:(delete this[a++],b++);else for(c=Math.min(c,d+b-a),a+=c-b;c>b;)--c in this?this[--a]=this[c]:delete this[a];return this};$jscomp.array.copyWithin$install=function(){$jscomp.array.installHelper_("copyWithin",$jscomp.array.copyWithin);};
	$jscomp.array.fill=function(a,b,c){var d=this.length||0;0>b&&(b=Math.max(0,d+b));if(null==c||c>d)c=d;c=Number(c);0>c&&(c=Math.max(0,d+c));for(b=Number(b||0);b<c;b++)this[b]=a;return this};$jscomp.array.fill$install=function(){$jscomp.array.installHelper_("fill",$jscomp.array.fill);};$jscomp.array.find=function(a,b){return $jscomp.findInternal(this,a,b).v};$jscomp.array.find$install=function(){$jscomp.array.installHelper_("find",$jscomp.array.find);};
	$jscomp.array.findIndex=function(a,b){return $jscomp.findInternal(this,a,b).i};$jscomp.array.findIndex$install=function(){$jscomp.array.installHelper_("findIndex",$jscomp.array.findIndex);};$jscomp.ASSUME_NO_NATIVE_MAP=!1;
	$jscomp.Map$isConformant=function(){if($jscomp.ASSUME_NO_NATIVE_MAP)return !1;var a=$jscomp.global.Map;if(!a||!a.prototype.entries||"function"!=typeof Object.seal)return !1;try{var b=Object.seal({x:4}),c=new a($jscomp.makeIterator([[b,"s"]]));if("s"!=c.get(b)||1!=c.size||c.get({x:4})||c.set({x:4},"t")!=c||2!=c.size)return !1;var d=c.entries(),e=d.next();if(e.done||e.value[0]!=b||"s"!=e.value[1])return !1;e=d.next();return e.done||4!=e.value[0].x||"t"!=e.value[1]||!d.next().done?!1:!0}catch(f){return !1}};
	$jscomp.Map=function(a){this.data_={};this.head_=$jscomp.Map.createHead();this.size=0;if(a){a=$jscomp.makeIterator(a);for(var b;!(b=a.next()).done;)b=b.value,this.set(b[0],b[1]);}};
	$jscomp.Map.prototype.set=function(a,b){var c=$jscomp.Map.maybeGetEntry(this,a);c.list||(c.list=this.data_[c.id]=[]);c.entry?c.entry.value=b:(c.entry={next:this.head_,previous:this.head_.previous,head:this.head_,key:a,value:b},c.list.push(c.entry),this.head_.previous.next=c.entry,this.head_.previous=c.entry,this.size++);return this};
	$jscomp.Map.prototype["delete"]=function(a){a=$jscomp.Map.maybeGetEntry(this,a);return a.entry&&a.list?(a.list.splice(a.index,1),a.list.length||delete this.data_[a.id],a.entry.previous.next=a.entry.next,a.entry.next.previous=a.entry.previous,a.entry.head=null,this.size--,!0):!1};$jscomp.Map.prototype.clear=function(){this.data_={};this.head_=this.head_.previous=$jscomp.Map.createHead();this.size=0;};$jscomp.Map.prototype.has=function(a){return !!$jscomp.Map.maybeGetEntry(this,a).entry};
	$jscomp.Map.prototype.get=function(a){return (a=$jscomp.Map.maybeGetEntry(this,a).entry)&&a.value};$jscomp.Map.prototype.entries=function(){return $jscomp.Map.makeIterator_(this,function(a){return [a.key,a.value]})};$jscomp.Map.prototype.keys=function(){return $jscomp.Map.makeIterator_(this,function(a){return a.key})};$jscomp.Map.prototype.values=function(){return $jscomp.Map.makeIterator_(this,function(a){return a.value})};
	$jscomp.Map.prototype.forEach=function(a,b){for(var c=this.entries(),d;!(d=c.next()).done;)d=d.value,a.call(b,d[1],d[0],this);};$jscomp.Map.maybeGetEntry=function(a,b){var c=$jscomp.Map.getId(b),d=a.data_[c];if(d&&Object.prototype.hasOwnProperty.call(a.data_,c))for(var e=0;e<d.length;e++){var f=d[e];if(b!==b&&f.key!==f.key||b===f.key)return {id:c,list:d,index:e,entry:f}}return {id:c,list:d,index:-1,entry:void 0}};
	$jscomp.Map.makeIterator_=function(a,b){var c=a.head_,d={next:function(){if(c){for(;c.head!=a.head_;)c=c.previous;for(;c.next!=c.head;)return c=c.next,{done:!1,value:b(c)};c=null;}return {done:!0,value:void 0}}};$jscomp.initSymbol();$jscomp.initSymbolIterator();d[Symbol.iterator]=function(){return d};return d};$jscomp.Map.mapIndex_=0;$jscomp.Map.createHead=function(){var a={};return a.previous=a.next=a.head=a};
	$jscomp.Map.getId=function(a){if(!(a instanceof Object))return "p_"+a;if(!($jscomp.Map.idKey in a))try{$jscomp.Map.defineProperty(a,$jscomp.Map.idKey,{value:++$jscomp.Map.mapIndex_});}catch(b){}return $jscomp.Map.idKey in a?a[$jscomp.Map.idKey]:"o_ "+a};$jscomp.Map.defineProperty=Object.defineProperty?function(a,b,c){Object.defineProperty(a,b,{value:String(c)});}:function(a,b,c){a[b]=String(c);};$jscomp.Map.Entry=function(){};
	$jscomp.Map$install=function(){$jscomp.initSymbol();$jscomp.initSymbolIterator();$jscomp.Map$isConformant()?$jscomp.Map=$jscomp.global.Map:($jscomp.initSymbol(),$jscomp.initSymbolIterator(),$jscomp.Map.prototype[Symbol.iterator]=$jscomp.Map.prototype.entries,$jscomp.initSymbol(),$jscomp.Map.idKey=Symbol("map-id-key"),$jscomp.Map$install=function(){});};$jscomp.math=$jscomp.math||{};
	$jscomp.math.clz32=function(a){a=Number(a)>>>0;if(0===a)return 32;var b=0;0===(a&4294901760)&&(a<<=16,b+=16);0===(a&4278190080)&&(a<<=8,b+=8);0===(a&4026531840)&&(a<<=4,b+=4);0===(a&3221225472)&&(a<<=2,b+=2);0===(a&2147483648)&&b++;return b};$jscomp.math.imul=function(a,b){a=Number(a);b=Number(b);var c=a&65535,d=b&65535;return c*d+((a>>>16&65535)*d+c*(b>>>16&65535)<<16>>>0)|0};$jscomp.math.sign=function(a){a=Number(a);return 0===a||isNaN(a)?a:0<a?1:-1};
	$jscomp.math.log10=function(a){return Math.log(a)/Math.LN10};$jscomp.math.log2=function(a){return Math.log(a)/Math.LN2};$jscomp.math.log1p=function(a){a=Number(a);if(.25>a&&-.25<a){for(var b=a,c=1,d=a,e=0,f=1;e!=d;)b*=a,f*=-1,d=(e=d)+f*b/++c;return d}return Math.log(1+a)};$jscomp.math.expm1=function(a){a=Number(a);if(.25>a&&-.25<a){for(var b=a,c=1,d=a,e=0;e!=d;)b*=a/++c,d=(e=d)+b;return d}return Math.exp(a)-1};$jscomp.math.cosh=function(a){a=Number(a);return (Math.exp(a)+Math.exp(-a))/2};
	$jscomp.math.sinh=function(a){a=Number(a);return 0===a?a:(Math.exp(a)-Math.exp(-a))/2};$jscomp.math.tanh=function(a){a=Number(a);if(0===a)return a;var b=Math.exp(-2*Math.abs(a)),b=(1-b)/(1+b);return 0>a?-b:b};$jscomp.math.acosh=function(a){a=Number(a);return Math.log(a+Math.sqrt(a*a-1))};$jscomp.math.asinh=function(a){a=Number(a);if(0===a)return a;var b=Math.log(Math.abs(a)+Math.sqrt(a*a+1));return 0>a?-b:b};
	$jscomp.math.atanh=function(a){a=Number(a);return ($jscomp.math.log1p(a)-$jscomp.math.log1p(-a))/2};$jscomp.math.hypot=function(a,b,c){a=Number(a);b=Number(b);var d,e,f,g=Math.max(Math.abs(a),Math.abs(b));for(d=2;d<arguments.length;d++)g=Math.max(g,Math.abs(arguments[d]));if(1E100<g||1E-100>g){a/=g;b/=g;f=a*a+b*b;for(d=2;d<arguments.length;d++)e=Number(arguments[d])/g,f+=e*e;return Math.sqrt(f)*g}f=a*a+b*b;for(d=2;d<arguments.length;d++)e=Number(arguments[d]),f+=e*e;return Math.sqrt(f)};
	$jscomp.math.trunc=function(a){a=Number(a);if(isNaN(a)||Infinity===a||-Infinity===a||0===a)return a;var b=Math.floor(Math.abs(a));return 0>a?-b:b};$jscomp.math.cbrt=function(a){if(0===a)return a;a=Number(a);var b=Math.pow(Math.abs(a),1/3);return 0>a?-b:b};$jscomp.number=$jscomp.number||{};$jscomp.number.isFinite=function(a){return "number"!==typeof a?!1:!isNaN(a)&&Infinity!==a&&-Infinity!==a};$jscomp.number.isInteger=function(a){return $jscomp.number.isFinite(a)?a===Math.floor(a):!1};
	$jscomp.number.isNaN=function(a){return "number"===typeof a&&isNaN(a)};$jscomp.number.isSafeInteger=function(a){return $jscomp.number.isInteger(a)&&Math.abs(a)<=$jscomp.number.MAX_SAFE_INTEGER};$jscomp.number.EPSILON=function(){return Math.pow(2,-52)}();$jscomp.number.MAX_SAFE_INTEGER=function(){return 9007199254740991}();$jscomp.number.MIN_SAFE_INTEGER=function(){return -9007199254740991}();$jscomp.object=$jscomp.object||{};
	$jscomp.object.assign=function(a,b){for(var c=1;c<arguments.length;c++){var d=arguments[c];if(d)for(var e in d)Object.prototype.hasOwnProperty.call(d,e)&&(a[e]=d[e]);}return a};$jscomp.object.is=function(a,b){return a===b?0!==a||1/a===1/b:a!==a&&b!==b};$jscomp.ASSUME_NO_NATIVE_SET=!1;
	$jscomp.Set$isConformant=function(){if($jscomp.ASSUME_NO_NATIVE_SET)return !1;var a=$jscomp.global.Set;if(!a||!a.prototype.entries||"function"!=typeof Object.seal)return !1;try{var b=Object.seal({x:4}),c=new a($jscomp.makeIterator([b]));if(!c.has(b)||1!=c.size||c.add(b)!=c||1!=c.size||c.add({x:4})!=c||2!=c.size)return !1;var d=c.entries(),e=d.next();if(e.done||e.value[0]!=b||e.value[1]!=b)return !1;e=d.next();return e.done||e.value[0]==b||4!=e.value[0].x||e.value[1]!=e.value[0]?!1:d.next().done}catch(f){return !1}};
	$jscomp.Set=function(a){this.map_=new $jscomp.Map;if(a){a=$jscomp.makeIterator(a);for(var b;!(b=a.next()).done;)this.add(b.value);}this.size=this.map_.size;};$jscomp.Set.prototype.add=function(a){this.map_.set(a,a);this.size=this.map_.size;return this};$jscomp.Set.prototype["delete"]=function(a){a=this.map_["delete"](a);this.size=this.map_.size;return a};$jscomp.Set.prototype.clear=function(){this.map_.clear();this.size=0;};$jscomp.Set.prototype.has=function(a){return this.map_.has(a)};
	$jscomp.Set.prototype.entries=function(){return this.map_.entries()};$jscomp.Set.prototype.values=function(){return this.map_.values()};$jscomp.Set.prototype.forEach=function(a,b){var c=this;this.map_.forEach(function(d){return a.call(b,d,d,c)});};$jscomp.Set$install=function(){$jscomp.Map$install();$jscomp.Set$isConformant()?$jscomp.Set=$jscomp.global.Set:($jscomp.initSymbol(),$jscomp.initSymbolIterator(),$jscomp.Set.prototype[Symbol.iterator]=$jscomp.Set.prototype.values,$jscomp.Set$install=function(){});};
	$jscomp.string=$jscomp.string||{};$jscomp.checkStringArgs=function(a,b,c){if(null==a)throw new TypeError("The 'this' value for String.prototype."+c+" must not be null or undefined");if(b instanceof RegExp)throw new TypeError("First argument to String.prototype."+c+" must not be a regular expression");return a+""};
	$jscomp.string.fromCodePoint=function(a){for(var b="",c=0;c<arguments.length;c++){var d=Number(arguments[c]);if(0>d||1114111<d||d!==Math.floor(d))throw new RangeError("invalid_code_point "+d);65535>=d?b+=String.fromCharCode(d):(d-=65536,b+=String.fromCharCode(d>>>10&1023|55296),b+=String.fromCharCode(d&1023|56320));}return b};
	$jscomp.string.repeat=function(a){var b=$jscomp.checkStringArgs(this,null,"repeat");if(0>a||1342177279<a)throw new RangeError("Invalid count value");a|=0;for(var c="";a;)if(a&1&&(c+=b),a>>>=1)b+=b;return c};$jscomp.string.repeat$install=function(){String.prototype.repeat||(String.prototype.repeat=$jscomp.string.repeat);};
	$jscomp.string.codePointAt=function(a){var b=$jscomp.checkStringArgs(this,null,"codePointAt"),c=b.length;a=Number(a)||0;if(0<=a&&a<c){a|=0;var d=b.charCodeAt(a);if(55296>d||56319<d||a+1===c)return d;a=b.charCodeAt(a+1);return 56320>a||57343<a?d:1024*(d-55296)+a+9216}};$jscomp.string.codePointAt$install=function(){String.prototype.codePointAt||(String.prototype.codePointAt=$jscomp.string.codePointAt);};
	$jscomp.string.includes=function(a,b){return -1!==$jscomp.checkStringArgs(this,a,"includes").indexOf(a,b||0)};$jscomp.string.includes$install=function(){String.prototype.includes||(String.prototype.includes=$jscomp.string.includes);};$jscomp.string.startsWith=function(a,b){var c=$jscomp.checkStringArgs(this,a,"startsWith");a+="";for(var d=c.length,e=a.length,f=Math.max(0,Math.min(b|0,c.length)),g=0;g<e&&f<d;)if(c[f++]!=a[g++])return !1;return g>=e};
	$jscomp.string.startsWith$install=function(){String.prototype.startsWith||(String.prototype.startsWith=$jscomp.string.startsWith);};$jscomp.string.endsWith=function(a,b){var c=$jscomp.checkStringArgs(this,a,"endsWith");a+="";void 0===b&&(b=c.length);for(var d=Math.max(0,Math.min(b|0,c.length)),e=a.length;0<e&&0<d;)if(c[--d]!=a[--e])return !1;return 0>=e};$jscomp.string.endsWith$install=function(){String.prototype.endsWith||(String.prototype.endsWith=$jscomp.string.endsWith);};
	var COMPILED$1=!0,goog=goog||{};goog.global=commonjsGlobal;goog.isDef=function(a){return void 0!==a};goog.exportPath_=function(a,b,c){a=a.split(".");c=c||goog.global;a[0]in c||!c.execScript||c.execScript("var "+a[0]);for(var d;a.length&&(d=a.shift());)!a.length&&goog.isDef(b)?c[d]=b:c=c[d]?c[d]:c[d]={};};
	goog.define=function(a,b){var c=b;goog.exportPath_(a,c);};goog.DEBUG=!0;goog.LOCALE="en";goog.TRUSTED_SITE=!0;goog.STRICT_MODE_COMPATIBLE=!1;goog.DISALLOW_TEST_ONLY_CODE=!goog.DEBUG;
	goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING=!1;goog.provide=function(a){goog.constructNamespace_(a);};goog.constructNamespace_=function(a,b){goog.exportPath_(a,b);};goog.VALID_MODULE_RE_=/^[a-zA-Z_$][a-zA-Z0-9._$]*$/;
	goog.module=function(a){if(!goog.isString(a)||!a||-1==a.search(goog.VALID_MODULE_RE_))throw Error("Invalid module identifier");if(!goog.isInModuleLoader_())throw Error("Module "+a+" has been loaded incorrectly.");if(goog.moduleLoaderState_.moduleName)throw Error("goog.module may only be called once per module.");goog.moduleLoaderState_.moduleName=a;};goog.module.get=function(a){return goog.module.getInternal_(a)};
	goog.module.getInternal_=function(a){};goog.moduleLoaderState_=null;goog.isInModuleLoader_=function(){return null!=goog.moduleLoaderState_};
	goog.module.declareLegacyNamespace=function(){goog.moduleLoaderState_.declareLegacyNamespace=!0;};
	goog.setTestOnly=function(a){if(goog.DISALLOW_TEST_ONLY_CODE)throw a=a||"",Error("Importing test-only code into non-debug environment"+(a?": "+a:"."));};goog.forwardDeclare=function(a){};goog.getObjectByName=function(a,b){for(var c=a.split("."),d=b||goog.global,e;e=c.shift();)if(goog.isDefAndNotNull(d[e]))d=d[e];else return null;return d};goog.globalize=function(a,b){var c=b||goog.global,d;for(d in a)c[d]=a[d];};goog.addDependency=function(a,b,c,d){if(goog.DEPENDENCIES_ENABLED){var e;a=a.replace(/\\/g,"/");for(var f=goog.dependencies_,g=0;e=b[g];g++)f.nameToPath[e]=a,f.pathIsModule[a]=!!d;for(d=0;b=c[d];d++)a in f.requires||(f.requires[a]={}),f.requires[a][b]=!0;}};
	goog.ENABLE_DEBUG_LOADER=!0;goog.logToConsole_=function(a){goog.global.console&&goog.global.console.error(a);};goog.require=function(a){};
	goog.basePath="";goog.nullFunction=function(){};goog.abstractMethod=function(){throw Error("unimplemented abstract method");};goog.addSingletonGetter=function(a){a.getInstance=function(){if(a.instance_)return a.instance_;goog.DEBUG&&(goog.instantiatedSingletons_[goog.instantiatedSingletons_.length]=a);return a.instance_=new a};};goog.instantiatedSingletons_=[];goog.LOAD_MODULE_USING_EVAL=!0;goog.SEAL_MODULE_EXPORTS=goog.DEBUG;goog.loadedModules_={};goog.DEPENDENCIES_ENABLED=!COMPILED$1;
	goog.DEPENDENCIES_ENABLED&&(goog.dependencies_={pathIsModule:{},nameToPath:{},requires:{},visited:{},written:{},deferred:{}},goog.inHtmlDocument_=function(){var a=goog.global.document;return null!=a&&"write"in a},goog.findBasePath_=function(){if(goog.isDef(goog.global.CLOSURE_BASE_PATH))goog.basePath=goog.global.CLOSURE_BASE_PATH;else if(goog.inHtmlDocument_())for(var a=goog.global.document.getElementsByTagName("SCRIPT"),b=a.length-1;0<=b;--b){var c=a[b].src,d=c.lastIndexOf("?"),d=-1==d?c.length:
	d;if("base.js"==c.substr(d-7,7)){goog.basePath=c.substr(0,d-7);break}}},goog.importScript_=function(a,b){(goog.global.CLOSURE_IMPORT_SCRIPT||goog.writeScriptTag_)(a,b)&&(goog.dependencies_.written[a]=!0);},goog.IS_OLD_IE_=!(goog.global.atob||!goog.global.document||!goog.global.document.all),goog.importModule_=function(a){goog.importScript_("",'goog.retrieveAndExecModule_("'+a+'");')&&(goog.dependencies_.written[a]=!0);},goog.queuedModules_=[],goog.wrapModule_=function(a,b){return goog.LOAD_MODULE_USING_EVAL&&
	goog.isDef(goog.global.JSON)?"goog.loadModule("+goog.global.JSON.stringify(b+"\n//# sourceURL="+a+"\n")+");":'goog.loadModule(function(exports) {"use strict";'+b+"\n;return exports});\n//# sourceURL="+a+"\n"},goog.loadQueuedModules_=function(){var a=goog.queuedModules_.length;if(0<a){var b=goog.queuedModules_;goog.queuedModules_=[];for(var c=0;c<a;c++)goog.maybeProcessDeferredPath_(b[c]);}},goog.maybeProcessDeferredDep_=function(a){goog.isDeferredModule_(a)&&goog.allDepsAreAvailable_(a)&&(a=goog.getPathFromDeps_(a),
	goog.maybeProcessDeferredPath_(goog.basePath+a));},goog.isDeferredModule_=function(a){return (a=goog.getPathFromDeps_(a))&&goog.dependencies_.pathIsModule[a]?goog.basePath+a in goog.dependencies_.deferred:!1},goog.allDepsAreAvailable_=function(a){if((a=goog.getPathFromDeps_(a))&&a in goog.dependencies_.requires)for(var b in goog.dependencies_.requires[a])if(!goog.isProvided_(b)&&!goog.isDeferredModule_(b))return !1;return !0},goog.maybeProcessDeferredPath_=function(a){if(a in goog.dependencies_.deferred){var b=
	goog.dependencies_.deferred[a];delete goog.dependencies_.deferred[a];goog.globalEval(b);}},goog.loadModuleFromUrl=function(a){goog.retrieveAndExecModule_(a);},goog.loadModule=function(a){var b=goog.moduleLoaderState_;try{goog.moduleLoaderState_={moduleName:void 0,declareLegacyNamespace:!1};var c;if(goog.isFunction(a))c=a.call(goog.global,{});else if(goog.isString(a))c=goog.loadModuleFromSource_.call(goog.global,a);else throw Error("Invalid module definition");var d=goog.moduleLoaderState_.moduleName;
	if(!goog.isString(d)||!d)throw Error('Invalid module name "'+d+'"');goog.moduleLoaderState_.declareLegacyNamespace?goog.constructNamespace_(d,c):goog.SEAL_MODULE_EXPORTS&&Object.seal&&Object.seal(c);goog.loadedModules_[d]=c;}finally{goog.moduleLoaderState_=b;}},goog.loadModuleFromSource_=function(a){eval(a);return {}},goog.writeScriptSrcNode_=function(a){goog.global.document.write('<script type="text/javascript" src="'+a+'">\x3c/script>');},goog.appendScriptSrcNode_=function(a){var b=goog.global.document,
	c=b.createElement("script");c.type="text/javascript";c.src=a;c.defer=!1;c.async=!1;b.head.appendChild(c);},goog.writeScriptTag_=function(a,b){if(goog.inHtmlDocument_()){var c=goog.global.document;if(!goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING&&"complete"==c.readyState){if(/\bdeps.js$/.test(a))return !1;throw Error('Cannot write "'+a+'" after document load');}var d=goog.IS_OLD_IE_;void 0===b?d?(d=" onreadystatechange='goog.onScriptLoad_(this, "+ ++goog.lastNonModuleScriptIndex_+")' ",c.write('<script type="text/javascript" src="'+
	a+'"'+d+">\x3c/script>")):goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING?goog.appendScriptSrcNode_(a):goog.writeScriptSrcNode_(a):c.write('<script type="text/javascript">'+b+"\x3c/script>");return !0}return !1},goog.lastNonModuleScriptIndex_=0,goog.onScriptLoad_=function(a,b){"complete"==a.readyState&&goog.lastNonModuleScriptIndex_==b&&goog.loadQueuedModules_();return !0},goog.writeScripts_=function(a){function b(a){if(!(a in e.written||a in e.visited)){e.visited[a]=!0;if(a in e.requires)for(var f in e.requires[a])if(!goog.isProvided_(f))if(f in
	e.nameToPath)b(e.nameToPath[f]);else throw Error("Undefined nameToPath for "+f);a in d||(d[a]=!0,c.push(a));}}var c=[],d={},e=goog.dependencies_;b(a);for(a=0;a<c.length;a++){var f=c[a];goog.dependencies_.written[f]=!0;}var g=goog.moduleLoaderState_;goog.moduleLoaderState_=null;for(a=0;a<c.length;a++)if(f=c[a])e.pathIsModule[f]?goog.importModule_(goog.basePath+f):goog.importScript_(goog.basePath+f);else throw goog.moduleLoaderState_=g,Error("Undefined script input");goog.moduleLoaderState_=g;},goog.getPathFromDeps_=
	function(a){return a in goog.dependencies_.nameToPath?goog.dependencies_.nameToPath[a]:null},goog.findBasePath_(),goog.global.CLOSURE_NO_DEPS||goog.importScript_(goog.basePath+"deps.js"));goog.normalizePath_=function(a){a=a.split("/");for(var b=0;b<a.length;)"."==a[b]?a.splice(b,1):b&&".."==a[b]&&a[b-1]&&".."!=a[b-1]?a.splice(--b,2):b++;return a.join("/")};
	goog.loadFileSync_=function(a){if(goog.global.CLOSURE_LOAD_FILE_SYNC)return goog.global.CLOSURE_LOAD_FILE_SYNC(a);var b=new goog.global.XMLHttpRequest;b.open("get",a,!1);b.send();return b.responseText};
	goog.retrieveAndExecModule_=function(a){};
	goog.typeOf=function(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return "array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return "object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return "array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return "function"}else return "null";
	else if("function"==b&&"undefined"==typeof a.call)return "object";return b};goog.isNull=function(a){return null===a};goog.isDefAndNotNull=function(a){return null!=a};goog.isArray=function(a){return "array"==goog.typeOf(a)};goog.isArrayLike=function(a){var b=goog.typeOf(a);return "array"==b||"object"==b&&"number"==typeof a.length};goog.isDateLike=function(a){return goog.isObject(a)&&"function"==typeof a.getFullYear};goog.isString=function(a){return "string"==typeof a};
	goog.isBoolean=function(a){return "boolean"==typeof a};goog.isNumber=function(a){return "number"==typeof a};goog.isFunction=function(a){return "function"==goog.typeOf(a)};goog.isObject=function(a){var b=typeof a;return "object"==b&&null!=a||"function"==b};goog.getUid=function(a){return a[goog.UID_PROPERTY_]||(a[goog.UID_PROPERTY_]=++goog.uidCounter_)};goog.hasUid=function(a){return !!a[goog.UID_PROPERTY_]};
	goog.removeUid=function(a){null!==a&&"removeAttribute"in a&&a.removeAttribute(goog.UID_PROPERTY_);try{delete a[goog.UID_PROPERTY_];}catch(b){}};goog.UID_PROPERTY_="closure_uid_"+(1E9*Math.random()>>>0);goog.uidCounter_=0;goog.getHashCode=goog.getUid;goog.removeHashCode=goog.removeUid;goog.cloneObject=function(a){var b=goog.typeOf(a);if("object"==b||"array"==b){if(a.clone)return a.clone();var b="array"==b?[]:{},c;for(c in a)b[c]=goog.cloneObject(a[c]);return b}return a};
	goog.bindNative_=function(a,b,c){return a.call.apply(a.bind,arguments)};goog.bindJs_=function(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}};
	goog.bind=function(a,b,c){Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?goog.bind=goog.bindNative_:goog.bind=goog.bindJs_;return goog.bind.apply(null,arguments)};goog.partial=function(a,b){var c=Array.prototype.slice.call(arguments,1);return function(){var b=c.slice();b.push.apply(b,arguments);return a.apply(this,b)}};goog.mixin=function(a,b){for(var c in b)a[c]=b[c];};goog.now=goog.TRUSTED_SITE&&Date.now||function(){return +new Date};
	goog.globalEval=function(a){if(goog.global.execScript)goog.global.execScript(a,"JavaScript");else if(goog.global.eval){if(null==goog.evalWorksForGlobals_)if(goog.global.eval("var _evalTest_ = 1;"),"undefined"!=typeof goog.global._evalTest_){try{delete goog.global._evalTest_;}catch(d){}goog.evalWorksForGlobals_=!0;}else goog.evalWorksForGlobals_=!1;if(goog.evalWorksForGlobals_)goog.global.eval(a);else{var b=goog.global.document,c=b.createElement("SCRIPT");c.type="text/javascript";c.defer=!1;c.appendChild(b.createTextNode(a));
	b.body.appendChild(c);b.body.removeChild(c);}}else throw Error("goog.globalEval not available");};goog.evalWorksForGlobals_=null;goog.getCssName=function(a,b){var c=function(a){return goog.cssNameMapping_[a]||a},d=function(a){a=a.split("-");for(var b=[],d=0;d<a.length;d++)b.push(c(a[d]));return b.join("-")},d=goog.cssNameMapping_?"BY_WHOLE"==goog.cssNameMappingStyle_?c:d:function(a){return a};return b?a+"-"+d(b):d(a)};
	goog.setCssNameMapping=function(a,b){goog.cssNameMapping_=a;goog.cssNameMappingStyle_=b;};goog.getMsg=function(a,b){b&&(a=a.replace(/\{\$([^}]+)}/g,function(a,d){return null!=b&&d in b?b[d]:a}));return a};goog.getMsgWithFallback=function(a,b){return a};goog.exportSymbol=function(a,b,c){goog.exportPath_(a,b,c);};goog.exportProperty=function(a,b,c){a[b]=c;};
	goog.inherits=function(a,b){function c(){}c.prototype=b.prototype;a.superClass_=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.base=function(a,c,f){for(var g=Array(arguments.length-2),h=2;h<arguments.length;h++)g[h-2]=arguments[h];return b.prototype[c].apply(a,g)};};
	goog.base=function(a,b,c){var d=arguments.callee.caller;if(goog.STRICT_MODE_COMPATIBLE||goog.DEBUG&&!d)throw Error("arguments.caller not defined.  goog.base() cannot be used with strict mode code. See http://www.ecma-international.org/ecma-262/5.1/#sec-C");if(d.superClass_){for(var e=Array(arguments.length-1),f=1;f<arguments.length;f++)e[f-1]=arguments[f];return d.superClass_.constructor.apply(a,e)}e=Array(arguments.length-2);for(f=2;f<arguments.length;f++)e[f-2]=arguments[f];for(var f=!1,g=a.constructor;g;g=
	g.superClass_&&g.superClass_.constructor)if(g.prototype[b]===d)f=!0;else if(f)return g.prototype[b].apply(a,e);if(a[b]===d)return a.constructor.prototype[b].apply(a,e);throw Error("goog.base called from a method of one name to a method of a different name");};goog.scope=function(a){a.call(goog.global);};goog.defineClass=function(a,b){var c=b.constructor,d=b.statics;c&&c!=Object.prototype.constructor||(c=function(){throw Error("cannot instantiate an interface (no constructor defined).");});c=goog.defineClass.createSealingConstructor_(c,a);a&&goog.inherits(c,a);delete b.constructor;delete b.statics;goog.defineClass.applyProperties_(c.prototype,b);null!=d&&(d instanceof Function?d(c):goog.defineClass.applyProperties_(c,d));return c};goog.defineClass.SEAL_CLASS_INSTANCES=goog.DEBUG;
	goog.defineClass.createSealingConstructor_=function(a,b){if(goog.defineClass.SEAL_CLASS_INSTANCES&&Object.seal instanceof Function){if(b&&b.prototype&&b.prototype[goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_])return a;var c=function(){var b=a.apply(this,arguments)||this;b[goog.UID_PROPERTY_]=b[goog.UID_PROPERTY_];this.constructor===c&&Object.seal(b);return b};return c}return a};goog.defineClass.OBJECT_PROTOTYPE_FIELDS_="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
	goog.defineClass.applyProperties_=function(a,b){for(var c in b)Object.prototype.hasOwnProperty.call(b,c)&&(a[c]=b[c]);for(var d=0;d<goog.defineClass.OBJECT_PROTOTYPE_FIELDS_.length;d++)c=goog.defineClass.OBJECT_PROTOTYPE_FIELDS_[d],Object.prototype.hasOwnProperty.call(b,c)&&(a[c]=b[c]);};goog.tagUnsealableClass=function(a){};goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_="goog_defineClass_legacy_unsealable";goog.dom={};goog.dom.NodeType={ELEMENT:1,ATTRIBUTE:2,TEXT:3,CDATA_SECTION:4,ENTITY_REFERENCE:5,ENTITY:6,PROCESSING_INSTRUCTION:7,COMMENT:8,DOCUMENT:9,DOCUMENT_TYPE:10,DOCUMENT_FRAGMENT:11,NOTATION:12};goog.debug={};goog.debug.Error=function(a){if(Error.captureStackTrace)Error.captureStackTrace(this,goog.debug.Error);else{var b=Error().stack;b&&(this.stack=b);}a&&(this.message=String(a));this.reportErrorToServer=!0;};goog.inherits(goog.debug.Error,Error);goog.debug.Error.prototype.name="CustomError";goog.string={};goog.string.DETECT_DOUBLE_ESCAPING=!1;goog.string.FORCE_NON_DOM_HTML_UNESCAPING=!1;goog.string.Unicode={NBSP:"\u00a0"};goog.string.startsWith=function(a,b){return 0==a.lastIndexOf(b,0)};goog.string.endsWith=function(a,b){var c=a.length-b.length;return 0<=c&&a.indexOf(b,c)==c};goog.string.caseInsensitiveStartsWith=function(a,b){return 0==goog.string.caseInsensitiveCompare(b,a.substr(0,b.length))};
	goog.string.caseInsensitiveEndsWith=function(a,b){return 0==goog.string.caseInsensitiveCompare(b,a.substr(a.length-b.length,b.length))};goog.string.caseInsensitiveEquals=function(a,b){return a.toLowerCase()==b.toLowerCase()};goog.string.subs=function(a,b){for(var c=a.split("%s"),d="",e=Array.prototype.slice.call(arguments,1);e.length&&1<c.length;)d+=c.shift()+e.shift();return d+c.join("%s")};goog.string.collapseWhitespace=function(a){return a.replace(/[\s\xa0]+/g," ").replace(/^\s+|\s+$/g,"")};
	goog.string.isEmptyOrWhitespace=function(a){return /^[\s\xa0]*$/.test(a)};goog.string.isEmptyString=function(a){return 0==a.length};goog.string.isEmpty=goog.string.isEmptyOrWhitespace;goog.string.isEmptyOrWhitespaceSafe=function(a){return goog.string.isEmptyOrWhitespace(goog.string.makeSafe(a))};goog.string.isEmptySafe=goog.string.isEmptyOrWhitespaceSafe;goog.string.isBreakingWhitespace=function(a){return !/[^\t\n\r ]/.test(a)};goog.string.isAlpha=function(a){return !/[^a-zA-Z]/.test(a)};
	goog.string.isNumeric=function(a){return !/[^0-9]/.test(a)};goog.string.isAlphaNumeric=function(a){return !/[^a-zA-Z0-9]/.test(a)};goog.string.isSpace=function(a){return " "==a};goog.string.isUnicodeChar=function(a){return 1==a.length&&" "<=a&&"~">=a||"\u0080"<=a&&"\ufffd">=a};goog.string.stripNewlines=function(a){return a.replace(/(\r\n|\r|\n)+/g," ")};goog.string.canonicalizeNewlines=function(a){return a.replace(/(\r\n|\r|\n)/g,"\n")};
	goog.string.normalizeWhitespace=function(a){return a.replace(/\xa0|\s/g," ")};goog.string.normalizeSpaces=function(a){return a.replace(/\xa0|[ \t]+/g," ")};goog.string.collapseBreakingSpaces=function(a){return a.replace(/[\t\r\n ]+/g," ").replace(/^[\t\r\n ]+|[\t\r\n ]+$/g,"")};goog.string.trim=goog.TRUSTED_SITE&&String.prototype.trim?function(a){return a.trim()}:function(a){return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")};goog.string.trimLeft=function(a){return a.replace(/^[\s\xa0]+/,"")};
	goog.string.trimRight=function(a){return a.replace(/[\s\xa0]+$/,"")};goog.string.caseInsensitiveCompare=function(a,b){var c=String(a).toLowerCase(),d=String(b).toLowerCase();return c<d?-1:c==d?0:1};
	goog.string.numberAwareCompare_=function(a,b,c){if(a==b)return 0;if(!a)return -1;if(!b)return 1;for(var d=a.toLowerCase().match(c),e=b.toLowerCase().match(c),f=Math.min(d.length,e.length),g=0;g<f;g++){c=d[g];var h=e[g];if(c!=h)return a=parseInt(c,10),!isNaN(a)&&(b=parseInt(h,10),!isNaN(b)&&a-b)?a-b:c<h?-1:1}return d.length!=e.length?d.length-e.length:a<b?-1:1};goog.string.intAwareCompare=function(a,b){return goog.string.numberAwareCompare_(a,b,/\d+|\D+/g)};
	goog.string.floatAwareCompare=function(a,b){return goog.string.numberAwareCompare_(a,b,/\d+|\.\d+|\D+/g)};goog.string.numerateCompare=goog.string.floatAwareCompare;goog.string.urlEncode=function(a){return encodeURIComponent(String(a))};goog.string.urlDecode=function(a){return decodeURIComponent(a.replace(/\+/g," "))};goog.string.newLineToBr=function(a,b){return a.replace(/(\r\n|\r|\n)/g,b?"<br />":"<br>")};
	goog.string.htmlEscape=function(a,b){if(b)a=a.replace(goog.string.AMP_RE_,"&amp;").replace(goog.string.LT_RE_,"&lt;").replace(goog.string.GT_RE_,"&gt;").replace(goog.string.QUOT_RE_,"&quot;").replace(goog.string.SINGLE_QUOTE_RE_,"&#39;").replace(goog.string.NULL_RE_,"&#0;"),goog.string.DETECT_DOUBLE_ESCAPING&&(a=a.replace(goog.string.E_RE_,"&#101;"));else{if(!goog.string.ALL_RE_.test(a))return a;-1!=a.indexOf("&")&&(a=a.replace(goog.string.AMP_RE_,"&amp;"));-1!=a.indexOf("<")&&(a=a.replace(goog.string.LT_RE_,
	"&lt;"));-1!=a.indexOf(">")&&(a=a.replace(goog.string.GT_RE_,"&gt;"));-1!=a.indexOf('"')&&(a=a.replace(goog.string.QUOT_RE_,"&quot;"));-1!=a.indexOf("'")&&(a=a.replace(goog.string.SINGLE_QUOTE_RE_,"&#39;"));-1!=a.indexOf("\x00")&&(a=a.replace(goog.string.NULL_RE_,"&#0;"));goog.string.DETECT_DOUBLE_ESCAPING&&-1!=a.indexOf("e")&&(a=a.replace(goog.string.E_RE_,"&#101;"));}return a};goog.string.AMP_RE_=/&/g;goog.string.LT_RE_=/</g;goog.string.GT_RE_=/>/g;goog.string.QUOT_RE_=/"/g;
	goog.string.SINGLE_QUOTE_RE_=/'/g;goog.string.NULL_RE_=/\x00/g;goog.string.E_RE_=/e/g;goog.string.ALL_RE_=goog.string.DETECT_DOUBLE_ESCAPING?/[\x00&<>"'e]/:/[\x00&<>"']/;goog.string.unescapeEntities=function(a){return goog.string.contains(a,"&")?!goog.string.FORCE_NON_DOM_HTML_UNESCAPING&&"document"in goog.global?goog.string.unescapeEntitiesUsingDom_(a):goog.string.unescapePureXmlEntities_(a):a};
	goog.string.unescapeEntitiesWithDocument=function(a,b){return goog.string.contains(a,"&")?goog.string.unescapeEntitiesUsingDom_(a,b):a};
	goog.string.unescapeEntitiesUsingDom_=function(a,b){var c={"&amp;":"&","&lt;":"<","&gt;":">","&quot;":'"'},d;d=b?b.createElement("div"):goog.global.document.createElement("div");return a.replace(goog.string.HTML_ENTITY_PATTERN_,function(a,b){var g=c[a];if(g)return g;if("#"==b.charAt(0)){var h=Number("0"+b.substr(1));isNaN(h)||(g=String.fromCharCode(h));}g||(d.innerHTML=a+" ",g=d.firstChild.nodeValue.slice(0,-1));return c[a]=g})};
	goog.string.unescapePureXmlEntities_=function(a){return a.replace(/&([^;]+);/g,function(a,c){switch(c){case "amp":return "&";case "lt":return "<";case "gt":return ">";case "quot":return '"';default:if("#"==c.charAt(0)){var d=Number("0"+c.substr(1));if(!isNaN(d))return String.fromCharCode(d)}return a}})};goog.string.HTML_ENTITY_PATTERN_=/&([^;\s<&]+);?/g;goog.string.whitespaceEscape=function(a,b){return goog.string.newLineToBr(a.replace(/  /g," &#160;"),b)};
	goog.string.preserveSpaces=function(a){return a.replace(/(^|[\n ]) /g,"$1"+goog.string.Unicode.NBSP)};goog.string.stripQuotes=function(a,b){for(var c=b.length,d=0;d<c;d++){var e=1==c?b:b.charAt(d);if(a.charAt(0)==e&&a.charAt(a.length-1)==e)return a.substring(1,a.length-1)}return a};goog.string.truncate=function(a,b,c){c&&(a=goog.string.unescapeEntities(a));a.length>b&&(a=a.substring(0,b-3)+"...");c&&(a=goog.string.htmlEscape(a));return a};
	goog.string.truncateMiddle=function(a,b,c,d){c&&(a=goog.string.unescapeEntities(a));if(d&&a.length>b){d>b&&(d=b);var e=a.length-d;a=a.substring(0,b-d)+"..."+a.substring(e);}else a.length>b&&(d=Math.floor(b/2),e=a.length-d,a=a.substring(0,d+b%2)+"..."+a.substring(e));c&&(a=goog.string.htmlEscape(a));return a};goog.string.specialEscapeChars_={"\x00":"\\0","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\x0B":"\\x0B",'"':'\\"',"\\":"\\\\","<":"<"};goog.string.jsEscapeCache_={"'":"\\'"};
	goog.string.quote=function(a){a=String(a);for(var b=['"'],c=0;c<a.length;c++){var d=a.charAt(c),e=d.charCodeAt(0);b[c+1]=goog.string.specialEscapeChars_[d]||(31<e&&127>e?d:goog.string.escapeChar(d));}b.push('"');return b.join("")};goog.string.escapeString=function(a){for(var b=[],c=0;c<a.length;c++)b[c]=goog.string.escapeChar(a.charAt(c));return b.join("")};
	goog.string.escapeChar=function(a){if(a in goog.string.jsEscapeCache_)return goog.string.jsEscapeCache_[a];if(a in goog.string.specialEscapeChars_)return goog.string.jsEscapeCache_[a]=goog.string.specialEscapeChars_[a];var b,c=a.charCodeAt(0);if(31<c&&127>c)b=a;else{if(256>c){if(b="\\x",16>c||256<c)b+="0";}else b="\\u",4096>c&&(b+="0");b+=c.toString(16).toUpperCase();}return goog.string.jsEscapeCache_[a]=b};goog.string.contains=function(a,b){return -1!=a.indexOf(b)};
	goog.string.caseInsensitiveContains=function(a,b){return goog.string.contains(a.toLowerCase(),b.toLowerCase())};goog.string.countOf=function(a,b){return a&&b?a.split(b).length-1:0};goog.string.removeAt=function(a,b,c){var d=a;0<=b&&b<a.length&&0<c&&(d=a.substr(0,b)+a.substr(b+c,a.length-b-c));return d};goog.string.remove=function(a,b){var c=new RegExp(goog.string.regExpEscape(b),"");return a.replace(c,"")};
	goog.string.removeAll=function(a,b){var c=new RegExp(goog.string.regExpEscape(b),"g");return a.replace(c,"")};goog.string.regExpEscape=function(a){return String(a).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g,"\\$1").replace(/\x08/g,"\\x08")};goog.string.repeat=String.prototype.repeat?function(a,b){return a.repeat(b)}:function(a,b){return Array(b+1).join(a)};
	goog.string.padNumber=function(a,b,c){a=goog.isDef(c)?a.toFixed(c):String(a);c=a.indexOf(".");-1==c&&(c=a.length);return goog.string.repeat("0",Math.max(0,b-c))+a};goog.string.makeSafe=function(a){return null==a?"":String(a)};goog.string.buildString=function(a){return Array.prototype.join.call(arguments,"")};goog.string.getRandomString=function(){return Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^goog.now()).toString(36)};
	goog.string.compareVersions=function(a,b){for(var c=0,d=goog.string.trim(String(a)).split("."),e=goog.string.trim(String(b)).split("."),f=Math.max(d.length,e.length),g=0;0==c&&g<f;g++){var h=d[g]||"",k=e[g]||"",l=RegExp("(\\d*)(\\D*)","g"),p=RegExp("(\\d*)(\\D*)","g");do{var m=l.exec(h)||["","",""],n=p.exec(k)||["","",""];if(0==m[0].length&&0==n[0].length)break;var c=0==m[1].length?0:parseInt(m[1],10),q=0==n[1].length?0:parseInt(n[1],10),c=goog.string.compareElements_(c,q)||goog.string.compareElements_(0==
	m[2].length,0==n[2].length)||goog.string.compareElements_(m[2],n[2]);}while(0==c)}return c};goog.string.compareElements_=function(a,b){return a<b?-1:a>b?1:0};goog.string.hashCode=function(a){for(var b=0,c=0;c<a.length;++c)b=31*b+a.charCodeAt(c)>>>0;return b};goog.string.uniqueStringCounter_=2147483648*Math.random()|0;goog.string.createUniqueString=function(){return "goog_"+goog.string.uniqueStringCounter_++};
	goog.string.toNumber=function(a){var b=Number(a);return 0==b&&goog.string.isEmptyOrWhitespace(a)?NaN:b};goog.string.isLowerCamelCase=function(a){return /^[a-z]+([A-Z][a-z]*)*$/.test(a)};goog.string.isUpperCamelCase=function(a){return /^([A-Z][a-z]*)+$/.test(a)};goog.string.toCamelCase=function(a){return String(a).replace(/\-([a-z])/g,function(a,c){return c.toUpperCase()})};goog.string.toSelectorCase=function(a){return String(a).replace(/([A-Z])/g,"-$1").toLowerCase()};
	goog.string.toTitleCase=function(a,b){var c=goog.isString(b)?goog.string.regExpEscape(b):"\\s";return a.replace(new RegExp("(^"+(c?"|["+c+"]+":"")+")([a-z])","g"),function(a,b,c){return b+c.toUpperCase()})};goog.string.capitalize=function(a){return String(a.charAt(0)).toUpperCase()+String(a.substr(1)).toLowerCase()};goog.string.parseInt=function(a){isFinite(a)&&(a=String(a));return goog.isString(a)?/^\s*-?0x/i.test(a)?parseInt(a,16):parseInt(a,10):NaN};
	goog.string.splitLimit=function(a,b,c){a=a.split(b);for(var d=[];0<c&&a.length;)d.push(a.shift()),c--;a.length&&d.push(a.join(b));return d};goog.string.editDistance=function(a,b){var c=[],d=[];if(a==b)return 0;if(!a.length||!b.length)return Math.max(a.length,b.length);for(var e=0;e<b.length+1;e++)c[e]=e;for(e=0;e<a.length;e++){d[0]=e+1;for(var f=0;f<b.length;f++)d[f+1]=Math.min(d[f]+1,c[f+1]+1,c[f]+Number(a[e]!=b[f]));for(f=0;f<c.length;f++)c[f]=d[f];}return d[b.length]};goog.asserts={};goog.asserts.ENABLE_ASSERTS=goog.DEBUG;goog.asserts.AssertionError=function(a,b){b.unshift(a);goog.debug.Error.call(this,goog.string.subs.apply(null,b));b.shift();this.messagePattern=a;};goog.inherits(goog.asserts.AssertionError,goog.debug.Error);goog.asserts.AssertionError.prototype.name="AssertionError";goog.asserts.DEFAULT_ERROR_HANDLER=function(a){throw a;};goog.asserts.errorHandler_=goog.asserts.DEFAULT_ERROR_HANDLER;
	goog.asserts.doAssertFailure_=function(a,b,c,d){var e="Assertion failed";if(c)var e=e+(": "+c),f=d;else a&&(e+=": "+a,f=b);a=new goog.asserts.AssertionError(""+e,f||[]);goog.asserts.errorHandler_(a);};goog.asserts.setErrorHandler=function(a){goog.asserts.ENABLE_ASSERTS&&(goog.asserts.errorHandler_=a);};goog.asserts.assert=function(a,b,c){goog.asserts.ENABLE_ASSERTS&&!a&&goog.asserts.doAssertFailure_("",null,b,Array.prototype.slice.call(arguments,2));return a};
	goog.asserts.fail=function(a,b){goog.asserts.ENABLE_ASSERTS&&goog.asserts.errorHandler_(new goog.asserts.AssertionError("Failure"+(a?": "+a:""),Array.prototype.slice.call(arguments,1)));};goog.asserts.assertNumber=function(a,b,c){goog.asserts.ENABLE_ASSERTS&&!goog.isNumber(a)&&goog.asserts.doAssertFailure_("Expected number but got %s: %s.",[goog.typeOf(a),a],b,Array.prototype.slice.call(arguments,2));return a};
	goog.asserts.assertString=function(a,b,c){goog.asserts.ENABLE_ASSERTS&&!goog.isString(a)&&goog.asserts.doAssertFailure_("Expected string but got %s: %s.",[goog.typeOf(a),a],b,Array.prototype.slice.call(arguments,2));return a};goog.asserts.assertFunction=function(a,b,c){goog.asserts.ENABLE_ASSERTS&&!goog.isFunction(a)&&goog.asserts.doAssertFailure_("Expected function but got %s: %s.",[goog.typeOf(a),a],b,Array.prototype.slice.call(arguments,2));return a};
	goog.asserts.assertObject=function(a,b,c){goog.asserts.ENABLE_ASSERTS&&!goog.isObject(a)&&goog.asserts.doAssertFailure_("Expected object but got %s: %s.",[goog.typeOf(a),a],b,Array.prototype.slice.call(arguments,2));return a};goog.asserts.assertArray=function(a,b,c){goog.asserts.ENABLE_ASSERTS&&!goog.isArray(a)&&goog.asserts.doAssertFailure_("Expected array but got %s: %s.",[goog.typeOf(a),a],b,Array.prototype.slice.call(arguments,2));return a};
	goog.asserts.assertBoolean=function(a,b,c){goog.asserts.ENABLE_ASSERTS&&!goog.isBoolean(a)&&goog.asserts.doAssertFailure_("Expected boolean but got %s: %s.",[goog.typeOf(a),a],b,Array.prototype.slice.call(arguments,2));return a};goog.asserts.assertElement=function(a,b,c){!goog.asserts.ENABLE_ASSERTS||goog.isObject(a)&&a.nodeType==goog.dom.NodeType.ELEMENT||goog.asserts.doAssertFailure_("Expected Element but got %s: %s.",[goog.typeOf(a),a],b,Array.prototype.slice.call(arguments,2));return a};
	goog.asserts.assertInstanceof=function(a,b,c,d){!goog.asserts.ENABLE_ASSERTS||a instanceof b||goog.asserts.doAssertFailure_("Expected instanceof %s but got %s.",[goog.asserts.getType_(b),goog.asserts.getType_(a)],c,Array.prototype.slice.call(arguments,3));return a};goog.asserts.assertObjectPrototypeIsIntact=function(){for(var a in Object.prototype)goog.asserts.fail(a+" should not be enumerable in Object.prototype.");};
	goog.asserts.getType_=function(a){return a instanceof Function?a.displayName||a.name||"unknown type name":a instanceof Object?a.constructor.displayName||a.constructor.name||Object.prototype.toString.call(a):null===a?"null":typeof a};var jspb={Map:function(a,b){this.arr_=a;this.valueCtor_=b;this.map_={};this.arrClean=!0;0<this.arr_.length&&this.loadFromArray_();}};jspb.Map.prototype.loadFromArray_=function(){for(var a=0;a<this.arr_.length;a++){var b=this.arr_[a],c=b[0];this.map_[c.toString()]=new jspb.Map.Entry_(c,b[1]);}this.arrClean=!0;};
	jspb.Map.prototype.toArray=function(){if(this.arrClean){if(this.valueCtor_){var a=this.map_,b;for(b in a)if(Object.prototype.hasOwnProperty.call(a,b)){var c=a[b].valueWrapper;c&&c.toArray();}}}else{this.arr_.length=0;a=this.stringKeys_();a.sort();for(b=0;b<a.length;b++){var d=this.map_[a[b]];(c=d.valueWrapper)&&c.toArray();this.arr_.push([d.key,d.value]);}this.arrClean=!0;}return this.arr_};
	jspb.Map.prototype.toObject=function(a,b){for(var c=this.toArray(),d=[],e=0;e<c.length;e++){var f=this.map_[c[e][0].toString()];this.wrapEntry_(f);var g=f.valueWrapper;g?(goog.asserts.assert(b),d.push([f.key,b(a,g)])):d.push([f.key,f.value]);}return d};jspb.Map.fromObject=function(a,b,c){b=new jspb.Map([],b);for(var d=0;d<a.length;d++){var e=a[d][0],f=c(a[d][1]);b.set(e,f);}return b};jspb.Map.ArrayIteratorIterable_=function(a){this.idx_=0;this.arr_=a;};
	jspb.Map.ArrayIteratorIterable_.prototype.next=function(){return this.idx_<this.arr_.length?{done:!1,value:this.arr_[this.idx_++]}:{done:!0,value:void 0}};$jscomp.initSymbol();"undefined"!=typeof Symbol&&($jscomp.initSymbol(),$jscomp.initSymbolIterator(),jspb.Map.ArrayIteratorIterable_.prototype[Symbol.iterator]=function(){return this});jspb.Map.prototype.getLength=function(){return this.stringKeys_().length};jspb.Map.prototype.clear=function(){this.map_={};this.arrClean=!1;};
	jspb.Map.prototype.del=function(a){a=a.toString();var b=this.map_.hasOwnProperty(a);delete this.map_[a];this.arrClean=!1;return b};jspb.Map.prototype.getEntryList=function(){var a=[],b=this.stringKeys_();b.sort();for(var c=0;c<b.length;c++){var d=this.map_[b[c]];a.push([d.key,d.value]);}return a};jspb.Map.prototype.entries=function(){var a=[],b=this.stringKeys_();b.sort();for(var c=0;c<b.length;c++){var d=this.map_[b[c]];a.push([d.key,this.wrapEntry_(d)]);}return new jspb.Map.ArrayIteratorIterable_(a)};
	jspb.Map.prototype.keys=function(){var a=[],b=this.stringKeys_();b.sort();for(var c=0;c<b.length;c++)a.push(this.map_[b[c]].key);return new jspb.Map.ArrayIteratorIterable_(a)};jspb.Map.prototype.values=function(){var a=[],b=this.stringKeys_();b.sort();for(var c=0;c<b.length;c++)a.push(this.wrapEntry_(this.map_[b[c]]));return new jspb.Map.ArrayIteratorIterable_(a)};
	jspb.Map.prototype.forEach=function(a,b){var c=this.stringKeys_();c.sort();for(var d=0;d<c.length;d++){var e=this.map_[c[d]];a.call(b,this.wrapEntry_(e),e.key,this);}};jspb.Map.prototype.set=function(a,b){var c=new jspb.Map.Entry_(a);this.valueCtor_?(c.valueWrapper=b,c.value=b.toArray()):c.value=b;this.map_[a.toString()]=c;this.arrClean=!1;return this};jspb.Map.prototype.wrapEntry_=function(a){return this.valueCtor_?(a.valueWrapper||(a.valueWrapper=new this.valueCtor_(a.value)),a.valueWrapper):a.value};
	jspb.Map.prototype.get=function(a){if(a=this.map_[a.toString()])return this.wrapEntry_(a)};jspb.Map.prototype.has=function(a){return a.toString()in this.map_};jspb.Map.prototype.serializeBinary=function(a,b,c,d,e){var f=this.stringKeys_();f.sort();for(var g=0;g<f.length;g++){var h=this.map_[f[g]];b.beginSubMessage(a);c.call(b,1,h.key);this.valueCtor_?d.call(b,2,this.wrapEntry_(h),e):d.call(b,2,h.value);b.endSubMessage();}};
	jspb.Map.deserializeBinary=function(a,b,c,d,e,f){for(var g=void 0;b.nextField()&&!b.isEndGroup();){var h=b.getFieldNumber();1==h?f=c.call(b):2==h&&(a.valueCtor_?(goog.asserts.assert(e),g=new a.valueCtor_,d.call(b,g,e)):g=d.call(b));}goog.asserts.assert(void 0!=f);goog.asserts.assert(void 0!=g);a.set(f,g);};jspb.Map.prototype.stringKeys_=function(){var a=this.map_,b=[],c;for(c in a)Object.prototype.hasOwnProperty.call(a,c)&&b.push(c);return b};
	jspb.Map.Entry_=function(a,b){this.key=a;this.value=b;this.valueWrapper=void 0;};goog.array={};goog.NATIVE_ARRAY_PROTOTYPES=goog.TRUSTED_SITE;goog.array.ASSUME_NATIVE_FUNCTIONS=!1;goog.array.peek=function(a){return a[a.length-1]};goog.array.last=goog.array.peek;
	goog.array.indexOf=goog.NATIVE_ARRAY_PROTOTYPES&&(goog.array.ASSUME_NATIVE_FUNCTIONS||Array.prototype.indexOf)?function(a,b,c){goog.asserts.assert(null!=a.length);return Array.prototype.indexOf.call(a,b,c)}:function(a,b,c){c=null==c?0:0>c?Math.max(0,a.length+c):c;if(goog.isString(a))return goog.isString(b)&&1==b.length?a.indexOf(b,c):-1;for(;c<a.length;c++)if(c in a&&a[c]===b)return c;return -1};
	goog.array.lastIndexOf=goog.NATIVE_ARRAY_PROTOTYPES&&(goog.array.ASSUME_NATIVE_FUNCTIONS||Array.prototype.lastIndexOf)?function(a,b,c){goog.asserts.assert(null!=a.length);return Array.prototype.lastIndexOf.call(a,b,null==c?a.length-1:c)}:function(a,b,c){c=null==c?a.length-1:c;0>c&&(c=Math.max(0,a.length+c));if(goog.isString(a))return goog.isString(b)&&1==b.length?a.lastIndexOf(b,c):-1;for(;0<=c;c--)if(c in a&&a[c]===b)return c;return -1};
	goog.array.forEach=goog.NATIVE_ARRAY_PROTOTYPES&&(goog.array.ASSUME_NATIVE_FUNCTIONS||Array.prototype.forEach)?function(a,b,c){goog.asserts.assert(null!=a.length);Array.prototype.forEach.call(a,b,c);}:function(a,b,c){for(var d=a.length,e=goog.isString(a)?a.split(""):a,f=0;f<d;f++)f in e&&b.call(c,e[f],f,a);};goog.array.forEachRight=function(a,b,c){for(var d=a.length,e=goog.isString(a)?a.split(""):a,d=d-1;0<=d;--d)d in e&&b.call(c,e[d],d,a);};
	goog.array.filter=goog.NATIVE_ARRAY_PROTOTYPES&&(goog.array.ASSUME_NATIVE_FUNCTIONS||Array.prototype.filter)?function(a,b,c){goog.asserts.assert(null!=a.length);return Array.prototype.filter.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=[],f=0,g=goog.isString(a)?a.split(""):a,h=0;h<d;h++)if(h in g){var k=g[h];b.call(c,k,h,a)&&(e[f++]=k);}return e};
	goog.array.map=goog.NATIVE_ARRAY_PROTOTYPES&&(goog.array.ASSUME_NATIVE_FUNCTIONS||Array.prototype.map)?function(a,b,c){goog.asserts.assert(null!=a.length);return Array.prototype.map.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=Array(d),f=goog.isString(a)?a.split(""):a,g=0;g<d;g++)g in f&&(e[g]=b.call(c,f[g],g,a));return e};
	goog.array.reduce=goog.NATIVE_ARRAY_PROTOTYPES&&(goog.array.ASSUME_NATIVE_FUNCTIONS||Array.prototype.reduce)?function(a,b,c,d){goog.asserts.assert(null!=a.length);d&&(b=goog.bind(b,d));return Array.prototype.reduce.call(a,b,c)}:function(a,b,c,d){var e=c;goog.array.forEach(a,function(c,g){e=b.call(d,e,c,g,a);});return e};
	goog.array.reduceRight=goog.NATIVE_ARRAY_PROTOTYPES&&(goog.array.ASSUME_NATIVE_FUNCTIONS||Array.prototype.reduceRight)?function(a,b,c,d){goog.asserts.assert(null!=a.length);goog.asserts.assert(null!=b);d&&(b=goog.bind(b,d));return Array.prototype.reduceRight.call(a,b,c)}:function(a,b,c,d){var e=c;goog.array.forEachRight(a,function(c,g){e=b.call(d,e,c,g,a);});return e};
	goog.array.some=goog.NATIVE_ARRAY_PROTOTYPES&&(goog.array.ASSUME_NATIVE_FUNCTIONS||Array.prototype.some)?function(a,b,c){goog.asserts.assert(null!=a.length);return Array.prototype.some.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=goog.isString(a)?a.split(""):a,f=0;f<d;f++)if(f in e&&b.call(c,e[f],f,a))return !0;return !1};
	goog.array.every=goog.NATIVE_ARRAY_PROTOTYPES&&(goog.array.ASSUME_NATIVE_FUNCTIONS||Array.prototype.every)?function(a,b,c){goog.asserts.assert(null!=a.length);return Array.prototype.every.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=goog.isString(a)?a.split(""):a,f=0;f<d;f++)if(f in e&&!b.call(c,e[f],f,a))return !1;return !0};goog.array.count=function(a,b,c){var d=0;goog.array.forEach(a,function(a,f,g){b.call(c,a,f,g)&&++d;},c);return d};
	goog.array.find=function(a,b,c){b=goog.array.findIndex(a,b,c);return 0>b?null:goog.isString(a)?a.charAt(b):a[b]};goog.array.findIndex=function(a,b,c){for(var d=a.length,e=goog.isString(a)?a.split(""):a,f=0;f<d;f++)if(f in e&&b.call(c,e[f],f,a))return f;return -1};goog.array.findRight=function(a,b,c){b=goog.array.findIndexRight(a,b,c);return 0>b?null:goog.isString(a)?a.charAt(b):a[b]};
	goog.array.findIndexRight=function(a,b,c){for(var d=a.length,e=goog.isString(a)?a.split(""):a,d=d-1;0<=d;d--)if(d in e&&b.call(c,e[d],d,a))return d;return -1};goog.array.contains=function(a,b){return 0<=goog.array.indexOf(a,b)};goog.array.isEmpty=function(a){return 0==a.length};goog.array.clear=function(a){if(!goog.isArray(a))for(var b=a.length-1;0<=b;b--)delete a[b];a.length=0;};goog.array.insert=function(a,b){goog.array.contains(a,b)||a.push(b);};
	goog.array.insertAt=function(a,b,c){goog.array.splice(a,c,0,b);};goog.array.insertArrayAt=function(a,b,c){goog.partial(goog.array.splice,a,c,0).apply(null,b);};goog.array.insertBefore=function(a,b,c){var d;2==arguments.length||0>(d=goog.array.indexOf(a,c))?a.push(b):goog.array.insertAt(a,b,d);};goog.array.remove=function(a,b){var c=goog.array.indexOf(a,b),d;(d=0<=c)&&goog.array.removeAt(a,c);return d};
	goog.array.removeAt=function(a,b){goog.asserts.assert(null!=a.length);return 1==Array.prototype.splice.call(a,b,1).length};goog.array.removeIf=function(a,b,c){b=goog.array.findIndex(a,b,c);return 0<=b?(goog.array.removeAt(a,b),!0):!1};goog.array.removeAllIf=function(a,b,c){var d=0;goog.array.forEachRight(a,function(e,f){b.call(c,e,f,a)&&goog.array.removeAt(a,f)&&d++;});return d};goog.array.concat=function(a){return Array.prototype.concat.apply(Array.prototype,arguments)};
	goog.array.join=function(a){return Array.prototype.concat.apply(Array.prototype,arguments)};goog.array.toArray=function(a){var b=a.length;if(0<b){for(var c=Array(b),d=0;d<b;d++)c[d]=a[d];return c}return []};goog.array.clone=goog.array.toArray;goog.array.extend=function(a,b){for(var c=1;c<arguments.length;c++){var d=arguments[c];if(goog.isArrayLike(d)){var e=a.length||0,f=d.length||0;a.length=e+f;for(var g=0;g<f;g++)a[e+g]=d[g];}else a.push(d);}};
	goog.array.splice=function(a,b,c,d){goog.asserts.assert(null!=a.length);return Array.prototype.splice.apply(a,goog.array.slice(arguments,1))};goog.array.slice=function(a,b,c){goog.asserts.assert(null!=a.length);return 2>=arguments.length?Array.prototype.slice.call(a,b):Array.prototype.slice.call(a,b,c)};
	goog.array.removeDuplicates=function(a,b,c){b=b||a;var d=function(a){return goog.isObject(a)?"o"+goog.getUid(a):(typeof a).charAt(0)+a};c=c||d;for(var d={},e=0,f=0;f<a.length;){var g=a[f++],h=c(g);Object.prototype.hasOwnProperty.call(d,h)||(d[h]=!0,b[e++]=g);}b.length=e;};goog.array.binarySearch=function(a,b,c){return goog.array.binarySearch_(a,c||goog.array.defaultCompare,!1,b)};goog.array.binarySelect=function(a,b,c){return goog.array.binarySearch_(a,b,!0,void 0,c)};
	goog.array.binarySearch_=function(a,b,c,d,e){for(var f=0,g=a.length,h;f<g;){var k=f+g>>1,l;l=c?b.call(e,a[k],k,a):b(d,a[k]);0<l?f=k+1:(g=k,h=!l);}return h?f:~f};goog.array.sort=function(a,b){a.sort(b||goog.array.defaultCompare);};goog.array.stableSort=function(a,b){for(var c=0;c<a.length;c++)a[c]={index:c,value:a[c]};var d=b||goog.array.defaultCompare;goog.array.sort(a,function(a,b){return d(a.value,b.value)||a.index-b.index});for(c=0;c<a.length;c++)a[c]=a[c].value;};
	goog.array.sortByKey=function(a,b,c){var d=c||goog.array.defaultCompare;goog.array.sort(a,function(a,c){return d(b(a),b(c))});};goog.array.sortObjectsByKey=function(a,b,c){goog.array.sortByKey(a,function(a){return a[b]},c);};goog.array.isSorted=function(a,b,c){b=b||goog.array.defaultCompare;for(var d=1;d<a.length;d++){var e=b(a[d-1],a[d]);if(0<e||0==e&&c)return !1}return !0};
	goog.array.equals=function(a,b,c){if(!goog.isArrayLike(a)||!goog.isArrayLike(b)||a.length!=b.length)return !1;var d=a.length;c=c||goog.array.defaultCompareEquality;for(var e=0;e<d;e++)if(!c(a[e],b[e]))return !1;return !0};goog.array.compare3=function(a,b,c){c=c||goog.array.defaultCompare;for(var d=Math.min(a.length,b.length),e=0;e<d;e++){var f=c(a[e],b[e]);if(0!=f)return f}return goog.array.defaultCompare(a.length,b.length)};goog.array.defaultCompare=function(a,b){return a>b?1:a<b?-1:0};
	goog.array.inverseDefaultCompare=function(a,b){return -goog.array.defaultCompare(a,b)};goog.array.defaultCompareEquality=function(a,b){return a===b};goog.array.binaryInsert=function(a,b,c){c=goog.array.binarySearch(a,b,c);return 0>c?(goog.array.insertAt(a,b,-(c+1)),!0):!1};goog.array.binaryRemove=function(a,b,c){b=goog.array.binarySearch(a,b,c);return 0<=b?goog.array.removeAt(a,b):!1};
	goog.array.bucket=function(a,b,c){for(var d={},e=0;e<a.length;e++){var f=a[e],g=b.call(c,f,e,a);goog.isDef(g)&&(d[g]||(d[g]=[])).push(f);}return d};goog.array.toObject=function(a,b,c){var d={};goog.array.forEach(a,function(e,f){d[b.call(c,e,f,a)]=e;});return d};goog.array.range=function(a,b,c){var d=[],e=0,f=a;c=c||1;void 0!==b&&(e=a,f=b);if(0>c*(f-e))return [];if(0<c)for(a=e;a<f;a+=c)d.push(a);else for(a=e;a>f;a+=c)d.push(a);return d};
	goog.array.repeat=function(a,b){for(var c=[],d=0;d<b;d++)c[d]=a;return c};goog.array.flatten=function(a){for(var b=[],c=0;c<arguments.length;c++){var d=arguments[c];if(goog.isArray(d))for(var e=0;e<d.length;e+=8192)for(var f=goog.array.slice(d,e,e+8192),f=goog.array.flatten.apply(null,f),g=0;g<f.length;g++)b.push(f[g]);else b.push(d);}return b};
	goog.array.rotate=function(a,b){goog.asserts.assert(null!=a.length);a.length&&(b%=a.length,0<b?Array.prototype.unshift.apply(a,a.splice(-b,b)):0>b&&Array.prototype.push.apply(a,a.splice(0,-b)));return a};goog.array.moveItem=function(a,b,c){goog.asserts.assert(0<=b&&b<a.length);goog.asserts.assert(0<=c&&c<a.length);b=Array.prototype.splice.call(a,b,1);Array.prototype.splice.call(a,c,0,b[0]);};
	goog.array.zip=function(a){if(!arguments.length)return [];for(var b=[],c=arguments[0].length,d=1;d<arguments.length;d++)arguments[d].length<c&&(c=arguments[d].length);for(d=0;d<c;d++){for(var e=[],f=0;f<arguments.length;f++)e.push(arguments[f][d]);b.push(e);}return b};goog.array.shuffle=function(a,b){for(var c=b||Math.random,d=a.length-1;0<d;d--){var e=Math.floor(c()*(d+1)),f=a[d];a[d]=a[e];a[e]=f;}};goog.array.copyByIndex=function(a,b){var c=[];goog.array.forEach(b,function(b){c.push(a[b]);});return c};goog.crypt={};goog.crypt.stringToByteArray=function(a){for(var b=[],c=0,d=0;d<a.length;d++){for(var e=a.charCodeAt(d);255<e;)b[c++]=e&255,e>>=8;b[c++]=e;}return b};goog.crypt.byteArrayToString=function(a){if(8192>=a.length)return String.fromCharCode.apply(null,a);for(var b="",c=0;c<a.length;c+=8192)var d=goog.array.slice(a,c,c+8192),b=b+String.fromCharCode.apply(null,d);return b};goog.crypt.byteArrayToHex=function(a){return goog.array.map(a,function(a){a=a.toString(16);return 1<a.length?a:"0"+a}).join("")};
	goog.crypt.hexToByteArray=function(a){goog.asserts.assert(0==a.length%2,"Key string length must be multiple of 2");for(var b=[],c=0;c<a.length;c+=2)b.push(parseInt(a.substring(c,c+2),16));return b};
	goog.crypt.stringToUtf8ByteArray=function(a){for(var b=[],c=0,d=0;d<a.length;d++){var e=a.charCodeAt(d);128>e?b[c++]=e:(2048>e?b[c++]=e>>6|192:(55296==(e&64512)&&d+1<a.length&&56320==(a.charCodeAt(d+1)&64512)?(e=65536+((e&1023)<<10)+(a.charCodeAt(++d)&1023),b[c++]=e>>18|240,b[c++]=e>>12&63|128):b[c++]=e>>12|224,b[c++]=e>>6&63|128),b[c++]=e&63|128);}return b};
	goog.crypt.utf8ByteArrayToString=function(a){for(var b=[],c=0,d=0;c<a.length;){var e=a[c++];if(128>e)b[d++]=String.fromCharCode(e);else if(191<e&&224>e){var f=a[c++];b[d++]=String.fromCharCode((e&31)<<6|f&63);}else if(239<e&&365>e){var f=a[c++],g=a[c++],h=a[c++],e=((e&7)<<18|(f&63)<<12|(g&63)<<6|h&63)-65536;b[d++]=String.fromCharCode(55296+(e>>10));b[d++]=String.fromCharCode(56320+(e&1023));}else f=a[c++],g=a[c++],b[d++]=String.fromCharCode((e&15)<<12|(f&63)<<6|g&63);}return b.join("")};
	goog.crypt.xorByteArray=function(a,b){goog.asserts.assert(a.length==b.length,"XOR array lengths must match");for(var c=[],d=0;d<a.length;d++)c.push(a[d]^b[d]);return c};goog.labs={};goog.labs.userAgent={};goog.labs.userAgent.util={};goog.labs.userAgent.util.getNativeUserAgentString_=function(){var a=goog.labs.userAgent.util.getNavigator_();return a&&(a=a.userAgent)?a:""};goog.labs.userAgent.util.getNavigator_=function(){return goog.global.navigator};goog.labs.userAgent.util.userAgent_=goog.labs.userAgent.util.getNativeUserAgentString_();goog.labs.userAgent.util.setUserAgent=function(a){goog.labs.userAgent.util.userAgent_=a||goog.labs.userAgent.util.getNativeUserAgentString_();};
	goog.labs.userAgent.util.getUserAgent=function(){return goog.labs.userAgent.util.userAgent_};goog.labs.userAgent.util.matchUserAgent=function(a){var b=goog.labs.userAgent.util.getUserAgent();return goog.string.contains(b,a)};goog.labs.userAgent.util.matchUserAgentIgnoreCase=function(a){var b=goog.labs.userAgent.util.getUserAgent();return goog.string.caseInsensitiveContains(b,a)};
	goog.labs.userAgent.util.extractVersionTuples=function(a){for(var b=RegExp("(\\w[\\w ]+)/([^\\s]+)\\s*(?:\\((.*?)\\))?","g"),c=[],d;d=b.exec(a);)c.push([d[1],d[2],d[3]||void 0]);return c};goog.labs.userAgent.platform={};goog.labs.userAgent.platform.isAndroid=function(){return goog.labs.userAgent.util.matchUserAgent("Android")};goog.labs.userAgent.platform.isIpod=function(){return goog.labs.userAgent.util.matchUserAgent("iPod")};goog.labs.userAgent.platform.isIphone=function(){return goog.labs.userAgent.util.matchUserAgent("iPhone")&&!goog.labs.userAgent.util.matchUserAgent("iPod")&&!goog.labs.userAgent.util.matchUserAgent("iPad")};goog.labs.userAgent.platform.isIpad=function(){return goog.labs.userAgent.util.matchUserAgent("iPad")};
	goog.labs.userAgent.platform.isIos=function(){return goog.labs.userAgent.platform.isIphone()||goog.labs.userAgent.platform.isIpad()||goog.labs.userAgent.platform.isIpod()};goog.labs.userAgent.platform.isMacintosh=function(){return goog.labs.userAgent.util.matchUserAgent("Macintosh")};goog.labs.userAgent.platform.isLinux=function(){return goog.labs.userAgent.util.matchUserAgent("Linux")};goog.labs.userAgent.platform.isWindows=function(){return goog.labs.userAgent.util.matchUserAgent("Windows")};
	goog.labs.userAgent.platform.isChromeOS=function(){return goog.labs.userAgent.util.matchUserAgent("CrOS")};
	goog.labs.userAgent.platform.getVersion=function(){var a=goog.labs.userAgent.util.getUserAgent(),b="";goog.labs.userAgent.platform.isWindows()?(b=/Windows (?:NT|Phone) ([0-9.]+)/,b=(a=b.exec(a))?a[1]:"0.0"):goog.labs.userAgent.platform.isIos()?(b=/(?:iPhone|iPod|iPad|CPU)\s+OS\s+(\S+)/,b=(a=b.exec(a))&&a[1].replace(/_/g,".")):goog.labs.userAgent.platform.isMacintosh()?(b=/Mac OS X ([0-9_.]+)/,b=(a=b.exec(a))?a[1].replace(/_/g,"."):"10"):goog.labs.userAgent.platform.isAndroid()?(b=/Android\s+([^\);]+)(\)|;)/,
	b=(a=b.exec(a))&&a[1]):goog.labs.userAgent.platform.isChromeOS()&&(b=/(?:CrOS\s+(?:i686|x86_64)\s+([0-9.]+))/,b=(a=b.exec(a))&&a[1]);return b||""};goog.labs.userAgent.platform.isVersionOrHigher=function(a){return 0<=goog.string.compareVersions(goog.labs.userAgent.platform.getVersion(),a)};goog.object={};goog.object.forEach=function(a,b,c){for(var d in a)b.call(c,a[d],d,a);};goog.object.filter=function(a,b,c){var d={},e;for(e in a)b.call(c,a[e],e,a)&&(d[e]=a[e]);return d};goog.object.map=function(a,b,c){var d={},e;for(e in a)d[e]=b.call(c,a[e],e,a);return d};goog.object.some=function(a,b,c){for(var d in a)if(b.call(c,a[d],d,a))return !0;return !1};goog.object.every=function(a,b,c){for(var d in a)if(!b.call(c,a[d],d,a))return !1;return !0};
	goog.object.getCount=function(a){var b=0,c;for(c in a)b++;return b};goog.object.getAnyKey=function(a){for(var b in a)return b};goog.object.getAnyValue=function(a){for(var b in a)return a[b]};goog.object.contains=function(a,b){return goog.object.containsValue(a,b)};goog.object.getValues=function(a){var b=[],c=0,d;for(d in a)b[c++]=a[d];return b};goog.object.getKeys=function(a){var b=[],c=0,d;for(d in a)b[c++]=d;return b};
	goog.object.getValueByKeys=function(a,b){for(var c=goog.isArrayLike(b),d=c?b:arguments,c=c?0:1;c<d.length&&(a=a[d[c]],goog.isDef(a));c++);return a};goog.object.containsKey=function(a,b){return null!==a&&b in a};goog.object.containsValue=function(a,b){for(var c in a)if(a[c]==b)return !0;return !1};goog.object.findKey=function(a,b,c){for(var d in a)if(b.call(c,a[d],d,a))return d};goog.object.findValue=function(a,b,c){return (b=goog.object.findKey(a,b,c))&&a[b]};
	goog.object.isEmpty=function(a){for(var b in a)return !1;return !0};goog.object.clear=function(a){for(var b in a)delete a[b];};goog.object.remove=function(a,b){var c;(c=b in a)&&delete a[b];return c};goog.object.add=function(a,b,c){if(null!==a&&b in a)throw Error('The object already contains the key "'+b+'"');goog.object.set(a,b,c);};goog.object.get=function(a,b,c){return null!==a&&b in a?a[b]:c};goog.object.set=function(a,b,c){a[b]=c;};
	goog.object.setIfUndefined=function(a,b,c){return b in a?a[b]:a[b]=c};goog.object.setWithReturnValueIfNotSet=function(a,b,c){if(b in a)return a[b];c=c();return a[b]=c};goog.object.equals=function(a,b){for(var c in a)if(!(c in b)||a[c]!==b[c])return !1;for(c in b)if(!(c in a))return !1;return !0};goog.object.clone=function(a){var b={},c;for(c in a)b[c]=a[c];return b};
	goog.object.unsafeClone=function(a){var b=goog.typeOf(a);if("object"==b||"array"==b){if(goog.isFunction(a.clone))return a.clone();var b="array"==b?[]:{},c;for(c in a)b[c]=goog.object.unsafeClone(a[c]);return b}return a};goog.object.transpose=function(a){var b={},c;for(c in a)b[a[c]]=c;return b};goog.object.PROTOTYPE_FIELDS_="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
	goog.object.extend=function(a,b){for(var c,d,e=1;e<arguments.length;e++){d=arguments[e];for(c in d)a[c]=d[c];for(var f=0;f<goog.object.PROTOTYPE_FIELDS_.length;f++)c=goog.object.PROTOTYPE_FIELDS_[f],Object.prototype.hasOwnProperty.call(d,c)&&(a[c]=d[c]);}};
	goog.object.create=function(a){var b=arguments.length;if(1==b&&goog.isArray(arguments[0]))return goog.object.create.apply(null,arguments[0]);if(b%2)throw Error("Uneven number of arguments");for(var c={},d=0;d<b;d+=2)c[arguments[d]]=arguments[d+1];return c};goog.object.createSet=function(a){var b=arguments.length;if(1==b&&goog.isArray(arguments[0]))return goog.object.createSet.apply(null,arguments[0]);for(var c={},d=0;d<b;d++)c[arguments[d]]=!0;return c};
	goog.object.createImmutableView=function(a){var b=a;Object.isFrozen&&!Object.isFrozen(a)&&(b=Object.create(a),Object.freeze(b));return b};goog.object.isImmutableView=function(a){return !!Object.isFrozen&&Object.isFrozen(a)};goog.labs.userAgent.browser={};goog.labs.userAgent.browser.matchOpera_=function(){return goog.labs.userAgent.util.matchUserAgent("Opera")||goog.labs.userAgent.util.matchUserAgent("OPR")};goog.labs.userAgent.browser.matchIE_=function(){return goog.labs.userAgent.util.matchUserAgent("Trident")||goog.labs.userAgent.util.matchUserAgent("MSIE")};goog.labs.userAgent.browser.matchEdge_=function(){return goog.labs.userAgent.util.matchUserAgent("Edge")};goog.labs.userAgent.browser.matchFirefox_=function(){return goog.labs.userAgent.util.matchUserAgent("Firefox")};
	goog.labs.userAgent.browser.matchSafari_=function(){return goog.labs.userAgent.util.matchUserAgent("Safari")&&!(goog.labs.userAgent.browser.matchChrome_()||goog.labs.userAgent.browser.matchCoast_()||goog.labs.userAgent.browser.matchOpera_()||goog.labs.userAgent.browser.matchEdge_()||goog.labs.userAgent.browser.isSilk()||goog.labs.userAgent.util.matchUserAgent("Android"))};goog.labs.userAgent.browser.matchCoast_=function(){return goog.labs.userAgent.util.matchUserAgent("Coast")};
	goog.labs.userAgent.browser.matchIosWebview_=function(){return (goog.labs.userAgent.util.matchUserAgent("iPad")||goog.labs.userAgent.util.matchUserAgent("iPhone"))&&!goog.labs.userAgent.browser.matchSafari_()&&!goog.labs.userAgent.browser.matchChrome_()&&!goog.labs.userAgent.browser.matchCoast_()&&goog.labs.userAgent.util.matchUserAgent("AppleWebKit")};
	goog.labs.userAgent.browser.matchChrome_=function(){return (goog.labs.userAgent.util.matchUserAgent("Chrome")||goog.labs.userAgent.util.matchUserAgent("CriOS"))&&!goog.labs.userAgent.browser.matchOpera_()&&!goog.labs.userAgent.browser.matchEdge_()};goog.labs.userAgent.browser.matchAndroidBrowser_=function(){return goog.labs.userAgent.util.matchUserAgent("Android")&&!(goog.labs.userAgent.browser.isChrome()||goog.labs.userAgent.browser.isFirefox()||goog.labs.userAgent.browser.isOpera()||goog.labs.userAgent.browser.isSilk())};
	goog.labs.userAgent.browser.isOpera=goog.labs.userAgent.browser.matchOpera_;goog.labs.userAgent.browser.isIE=goog.labs.userAgent.browser.matchIE_;goog.labs.userAgent.browser.isEdge=goog.labs.userAgent.browser.matchEdge_;goog.labs.userAgent.browser.isFirefox=goog.labs.userAgent.browser.matchFirefox_;goog.labs.userAgent.browser.isSafari=goog.labs.userAgent.browser.matchSafari_;goog.labs.userAgent.browser.isCoast=goog.labs.userAgent.browser.matchCoast_;goog.labs.userAgent.browser.isIosWebview=goog.labs.userAgent.browser.matchIosWebview_;
	goog.labs.userAgent.browser.isChrome=goog.labs.userAgent.browser.matchChrome_;goog.labs.userAgent.browser.isAndroidBrowser=goog.labs.userAgent.browser.matchAndroidBrowser_;goog.labs.userAgent.browser.isSilk=function(){return goog.labs.userAgent.util.matchUserAgent("Silk")};
	goog.labs.userAgent.browser.getVersion=function(){function a(a){a=goog.array.find(a,d);return c[a]||""}var b=goog.labs.userAgent.util.getUserAgent();if(goog.labs.userAgent.browser.isIE())return goog.labs.userAgent.browser.getIEVersion_(b);var b=goog.labs.userAgent.util.extractVersionTuples(b),c={};goog.array.forEach(b,function(a){c[a[0]]=a[1];});var d=goog.partial(goog.object.containsKey,c);return goog.labs.userAgent.browser.isOpera()?a(["Version","Opera","OPR"]):goog.labs.userAgent.browser.isEdge()?
	a(["Edge"]):goog.labs.userAgent.browser.isChrome()?a(["Chrome","CriOS"]):(b=b[2])&&b[1]||""};goog.labs.userAgent.browser.isVersionOrHigher=function(a){return 0<=goog.string.compareVersions(goog.labs.userAgent.browser.getVersion(),a)};
	goog.labs.userAgent.browser.getIEVersion_=function(a){var b=/rv: *([\d\.]*)/.exec(a);if(b&&b[1])return b[1];var b="",c=/MSIE +([\d\.]+)/.exec(a);if(c&&c[1])if(a=/Trident\/(\d.\d)/.exec(a),"7.0"==c[1])if(a&&a[1])switch(a[1]){case "4.0":b="8.0";break;case "5.0":b="9.0";break;case "6.0":b="10.0";break;case "7.0":b="11.0";}else b="7.0";else b=c[1];return b};goog.labs.userAgent.engine={};goog.labs.userAgent.engine.isPresto=function(){return goog.labs.userAgent.util.matchUserAgent("Presto")};goog.labs.userAgent.engine.isTrident=function(){return goog.labs.userAgent.util.matchUserAgent("Trident")||goog.labs.userAgent.util.matchUserAgent("MSIE")};goog.labs.userAgent.engine.isEdge=function(){return goog.labs.userAgent.util.matchUserAgent("Edge")};
	goog.labs.userAgent.engine.isWebKit=function(){return goog.labs.userAgent.util.matchUserAgentIgnoreCase("WebKit")&&!goog.labs.userAgent.engine.isEdge()};goog.labs.userAgent.engine.isGecko=function(){return goog.labs.userAgent.util.matchUserAgent("Gecko")&&!goog.labs.userAgent.engine.isWebKit()&&!goog.labs.userAgent.engine.isTrident()&&!goog.labs.userAgent.engine.isEdge()};
	goog.labs.userAgent.engine.getVersion=function(){var a=goog.labs.userAgent.util.getUserAgent();if(a){var a=goog.labs.userAgent.util.extractVersionTuples(a),b=goog.labs.userAgent.engine.getEngineTuple_(a);if(b)return "Gecko"==b[0]?goog.labs.userAgent.engine.getVersionForKey_(a,"Firefox"):b[1];var a=a[0],c;if(a&&(c=a[2])&&(c=/Trident\/([^\s;]+)/.exec(c)))return c[1]}return ""};
	goog.labs.userAgent.engine.getEngineTuple_=function(a){if(!goog.labs.userAgent.engine.isEdge())return a[1];for(var b=0;b<a.length;b++){var c=a[b];if("Edge"==c[0])return c}};goog.labs.userAgent.engine.isVersionOrHigher=function(a){return 0<=goog.string.compareVersions(goog.labs.userAgent.engine.getVersion(),a)};goog.labs.userAgent.engine.getVersionForKey_=function(a,b){var c=goog.array.find(a,function(a){return b==a[0]});return c&&c[1]||""};goog.userAgent={};goog.userAgent.ASSUME_IE=!1;goog.userAgent.ASSUME_EDGE=!1;goog.userAgent.ASSUME_GECKO=!1;goog.userAgent.ASSUME_WEBKIT=!1;goog.userAgent.ASSUME_MOBILE_WEBKIT=!1;goog.userAgent.ASSUME_OPERA=!1;goog.userAgent.ASSUME_ANY_VERSION=!1;goog.userAgent.BROWSER_KNOWN_=goog.userAgent.ASSUME_IE||goog.userAgent.ASSUME_EDGE||goog.userAgent.ASSUME_GECKO||goog.userAgent.ASSUME_MOBILE_WEBKIT||goog.userAgent.ASSUME_WEBKIT||goog.userAgent.ASSUME_OPERA;goog.userAgent.getUserAgentString=function(){return goog.labs.userAgent.util.getUserAgent()};
	goog.userAgent.getNavigator=function(){return goog.global.navigator||null};goog.userAgent.OPERA=goog.userAgent.BROWSER_KNOWN_?goog.userAgent.ASSUME_OPERA:goog.labs.userAgent.browser.isOpera();goog.userAgent.IE=goog.userAgent.BROWSER_KNOWN_?goog.userAgent.ASSUME_IE:goog.labs.userAgent.browser.isIE();goog.userAgent.EDGE=goog.userAgent.BROWSER_KNOWN_?goog.userAgent.ASSUME_EDGE:goog.labs.userAgent.engine.isEdge();goog.userAgent.EDGE_OR_IE=goog.userAgent.EDGE||goog.userAgent.IE;
	goog.userAgent.GECKO=goog.userAgent.BROWSER_KNOWN_?goog.userAgent.ASSUME_GECKO:goog.labs.userAgent.engine.isGecko();goog.userAgent.WEBKIT=goog.userAgent.BROWSER_KNOWN_?goog.userAgent.ASSUME_WEBKIT||goog.userAgent.ASSUME_MOBILE_WEBKIT:goog.labs.userAgent.engine.isWebKit();goog.userAgent.isMobile_=function(){return goog.userAgent.WEBKIT&&goog.labs.userAgent.util.matchUserAgent("Mobile")};goog.userAgent.MOBILE=goog.userAgent.ASSUME_MOBILE_WEBKIT||goog.userAgent.isMobile_();goog.userAgent.SAFARI=goog.userAgent.WEBKIT;
	goog.userAgent.determinePlatform_=function(){var a=goog.userAgent.getNavigator();return a&&a.platform||""};goog.userAgent.PLATFORM=goog.userAgent.determinePlatform_();goog.userAgent.ASSUME_MAC=!1;goog.userAgent.ASSUME_WINDOWS=!1;goog.userAgent.ASSUME_LINUX=!1;goog.userAgent.ASSUME_X11=!1;goog.userAgent.ASSUME_ANDROID=!1;goog.userAgent.ASSUME_IPHONE=!1;goog.userAgent.ASSUME_IPAD=!1;
	goog.userAgent.PLATFORM_KNOWN_=goog.userAgent.ASSUME_MAC||goog.userAgent.ASSUME_WINDOWS||goog.userAgent.ASSUME_LINUX||goog.userAgent.ASSUME_X11||goog.userAgent.ASSUME_ANDROID||goog.userAgent.ASSUME_IPHONE||goog.userAgent.ASSUME_IPAD;goog.userAgent.MAC=goog.userAgent.PLATFORM_KNOWN_?goog.userAgent.ASSUME_MAC:goog.labs.userAgent.platform.isMacintosh();goog.userAgent.WINDOWS=goog.userAgent.PLATFORM_KNOWN_?goog.userAgent.ASSUME_WINDOWS:goog.labs.userAgent.platform.isWindows();
	goog.userAgent.isLegacyLinux_=function(){return goog.labs.userAgent.platform.isLinux()||goog.labs.userAgent.platform.isChromeOS()};goog.userAgent.LINUX=goog.userAgent.PLATFORM_KNOWN_?goog.userAgent.ASSUME_LINUX:goog.userAgent.isLegacyLinux_();goog.userAgent.isX11_=function(){var a=goog.userAgent.getNavigator();return !!a&&goog.string.contains(a.appVersion||"","X11")};goog.userAgent.X11=goog.userAgent.PLATFORM_KNOWN_?goog.userAgent.ASSUME_X11:goog.userAgent.isX11_();
	goog.userAgent.ANDROID=goog.userAgent.PLATFORM_KNOWN_?goog.userAgent.ASSUME_ANDROID:goog.labs.userAgent.platform.isAndroid();goog.userAgent.IPHONE=goog.userAgent.PLATFORM_KNOWN_?goog.userAgent.ASSUME_IPHONE:goog.labs.userAgent.platform.isIphone();goog.userAgent.IPAD=goog.userAgent.PLATFORM_KNOWN_?goog.userAgent.ASSUME_IPAD:goog.labs.userAgent.platform.isIpad();goog.userAgent.operaVersion_=function(){var a=goog.global.opera.version;try{return a()}catch(b){return a}};
	goog.userAgent.determineVersion_=function(){if(goog.userAgent.OPERA&&goog.global.opera)return goog.userAgent.operaVersion_();var a="",b=goog.userAgent.getVersionRegexResult_();b&&(a=b?b[1]:"");return goog.userAgent.IE&&(b=goog.userAgent.getDocumentMode_(),b>parseFloat(a))?String(b):a};
	goog.userAgent.getVersionRegexResult_=function(){var a=goog.userAgent.getUserAgentString();if(goog.userAgent.GECKO)return /rv\:([^\);]+)(\)|;)/.exec(a);if(goog.userAgent.EDGE)return /Edge\/([\d\.]+)/.exec(a);if(goog.userAgent.IE)return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);if(goog.userAgent.WEBKIT)return /WebKit\/(\S+)/.exec(a)};goog.userAgent.getDocumentMode_=function(){var a=goog.global.document;return a?a.documentMode:void 0};goog.userAgent.VERSION=goog.userAgent.determineVersion_();
	goog.userAgent.compare=function(a,b){return goog.string.compareVersions(a,b)};goog.userAgent.isVersionOrHigherCache_={};goog.userAgent.isVersionOrHigher=function(a){return goog.userAgent.ASSUME_ANY_VERSION||goog.userAgent.isVersionOrHigherCache_[a]||(goog.userAgent.isVersionOrHigherCache_[a]=0<=goog.string.compareVersions(goog.userAgent.VERSION,a))};goog.userAgent.isVersion=goog.userAgent.isVersionOrHigher;
	goog.userAgent.isDocumentModeOrHigher=function(a){return Number(goog.userAgent.DOCUMENT_MODE)>=a};goog.userAgent.isDocumentMode=goog.userAgent.isDocumentModeOrHigher;goog.userAgent.DOCUMENT_MODE=function(){var a=goog.global.document,b=goog.userAgent.getDocumentMode_();return a&&goog.userAgent.IE?b||("CSS1Compat"==a.compatMode?parseInt(goog.userAgent.VERSION,10):5):void 0}();goog.userAgent.product={};goog.userAgent.product.ASSUME_FIREFOX=!1;goog.userAgent.product.ASSUME_IPHONE=!1;goog.userAgent.product.ASSUME_IPAD=!1;goog.userAgent.product.ASSUME_ANDROID=!1;goog.userAgent.product.ASSUME_CHROME=!1;goog.userAgent.product.ASSUME_SAFARI=!1;
	goog.userAgent.product.PRODUCT_KNOWN_=goog.userAgent.ASSUME_IE||goog.userAgent.ASSUME_EDGE||goog.userAgent.ASSUME_OPERA||goog.userAgent.product.ASSUME_FIREFOX||goog.userAgent.product.ASSUME_IPHONE||goog.userAgent.product.ASSUME_IPAD||goog.userAgent.product.ASSUME_ANDROID||goog.userAgent.product.ASSUME_CHROME||goog.userAgent.product.ASSUME_SAFARI;goog.userAgent.product.OPERA=goog.userAgent.OPERA;goog.userAgent.product.IE=goog.userAgent.IE;goog.userAgent.product.EDGE=goog.userAgent.EDGE;
	goog.userAgent.product.FIREFOX=goog.userAgent.product.PRODUCT_KNOWN_?goog.userAgent.product.ASSUME_FIREFOX:goog.labs.userAgent.browser.isFirefox();goog.userAgent.product.isIphoneOrIpod_=function(){return goog.labs.userAgent.platform.isIphone()||goog.labs.userAgent.platform.isIpod()};goog.userAgent.product.IPHONE=goog.userAgent.product.PRODUCT_KNOWN_?goog.userAgent.product.ASSUME_IPHONE:goog.userAgent.product.isIphoneOrIpod_();
	goog.userAgent.product.IPAD=goog.userAgent.product.PRODUCT_KNOWN_?goog.userAgent.product.ASSUME_IPAD:goog.labs.userAgent.platform.isIpad();goog.userAgent.product.ANDROID=goog.userAgent.product.PRODUCT_KNOWN_?goog.userAgent.product.ASSUME_ANDROID:goog.labs.userAgent.browser.isAndroidBrowser();goog.userAgent.product.CHROME=goog.userAgent.product.PRODUCT_KNOWN_?goog.userAgent.product.ASSUME_CHROME:goog.labs.userAgent.browser.isChrome();
	goog.userAgent.product.isSafariDesktop_=function(){return goog.labs.userAgent.browser.isSafari()&&!goog.labs.userAgent.platform.isIos()};goog.userAgent.product.SAFARI=goog.userAgent.product.PRODUCT_KNOWN_?goog.userAgent.product.ASSUME_SAFARI:goog.userAgent.product.isSafariDesktop_();goog.crypt.base64={};goog.crypt.base64.byteToCharMap_=null;goog.crypt.base64.charToByteMap_=null;goog.crypt.base64.byteToCharMapWebSafe_=null;goog.crypt.base64.ENCODED_VALS_BASE="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";goog.crypt.base64.ENCODED_VALS=goog.crypt.base64.ENCODED_VALS_BASE+"+/=";goog.crypt.base64.ENCODED_VALS_WEBSAFE=goog.crypt.base64.ENCODED_VALS_BASE+"-_.";
	goog.crypt.base64.ASSUME_NATIVE_SUPPORT_=goog.userAgent.GECKO||goog.userAgent.WEBKIT&&!goog.userAgent.product.SAFARI||goog.userAgent.OPERA;goog.crypt.base64.HAS_NATIVE_ENCODE_=goog.crypt.base64.ASSUME_NATIVE_SUPPORT_||"function"==typeof goog.global.btoa;goog.crypt.base64.HAS_NATIVE_DECODE_=goog.crypt.base64.ASSUME_NATIVE_SUPPORT_||!goog.userAgent.product.SAFARI&&!goog.userAgent.IE&&"function"==typeof goog.global.atob;
	goog.crypt.base64.encodeByteArray=function(a,b){goog.asserts.assert(goog.isArrayLike(a),"encodeByteArray takes an array as a parameter");goog.crypt.base64.init_();for(var c=b?goog.crypt.base64.byteToCharMapWebSafe_:goog.crypt.base64.byteToCharMap_,d=[],e=0;e<a.length;e+=3){var f=a[e],g=e+1<a.length,h=g?a[e+1]:0,k=e+2<a.length,l=k?a[e+2]:0,p=f>>2,f=(f&3)<<4|h>>4,h=(h&15)<<2|l>>6,l=l&63;k||(l=64,g||(h=64));d.push(c[p],c[f],c[h],c[l]);}return d.join("")};
	goog.crypt.base64.encodeString=function(a,b){return goog.crypt.base64.HAS_NATIVE_ENCODE_&&!b?goog.global.btoa(a):goog.crypt.base64.encodeByteArray(goog.crypt.stringToByteArray(a),b)};goog.crypt.base64.decodeString=function(a,b){if(goog.crypt.base64.HAS_NATIVE_DECODE_&&!b)return goog.global.atob(a);var c="";goog.crypt.base64.decodeStringInternal_(a,function(a){c+=String.fromCharCode(a);});return c};
	goog.crypt.base64.decodeStringToByteArray=function(a,b){var c=[];goog.crypt.base64.decodeStringInternal_(a,function(a){c.push(a);});return c};goog.crypt.base64.decodeStringToUint8Array=function(a){goog.asserts.assert(!goog.userAgent.IE||goog.userAgent.isVersionOrHigher("10"),"Browser does not support typed arrays");var b=new Uint8Array(Math.ceil(3*a.length/4)),c=0;goog.crypt.base64.decodeStringInternal_(a,function(a){b[c++]=a;});return b.subarray(0,c)};
	goog.crypt.base64.decodeStringInternal_=function(a,b){function c(b){for(;d<a.length;){var c=a.charAt(d++),e=goog.crypt.base64.charToByteMap_[c];if(null!=e)return e;if(!goog.string.isEmptyOrWhitespace(c))throw Error("Unknown base64 encoding at char: "+c);}return b}goog.crypt.base64.init_();for(var d=0;;){var e=c(-1),f=c(0),g=c(64),h=c(64);if(64===h&&-1===e)break;b(e<<2|f>>4);64!=g&&(b(f<<4&240|g>>2),64!=h&&b(g<<6&192|h));}};
	goog.crypt.base64.init_=function(){if(!goog.crypt.base64.byteToCharMap_){goog.crypt.base64.byteToCharMap_={};goog.crypt.base64.charToByteMap_={};goog.crypt.base64.byteToCharMapWebSafe_={};for(var a=0;a<goog.crypt.base64.ENCODED_VALS.length;a++)goog.crypt.base64.byteToCharMap_[a]=goog.crypt.base64.ENCODED_VALS.charAt(a),goog.crypt.base64.charToByteMap_[goog.crypt.base64.byteToCharMap_[a]]=a,goog.crypt.base64.byteToCharMapWebSafe_[a]=goog.crypt.base64.ENCODED_VALS_WEBSAFE.charAt(a),a>=goog.crypt.base64.ENCODED_VALS_BASE.length&&
	(goog.crypt.base64.charToByteMap_[goog.crypt.base64.ENCODED_VALS_WEBSAFE.charAt(a)]=a);}};jspb.ExtensionFieldInfo=function(a,b,c,d,e){this.fieldIndex=a;this.fieldName=b;this.ctor=c;this.toObjectFn=d;this.isRepeated=e;};jspb.ExtensionFieldBinaryInfo=function(a,b,c,d,e,f){this.fieldInfo=a;this.binaryReaderFn=b;this.binaryWriterFn=c;this.binaryMessageSerializeFn=d;this.binaryMessageDeserializeFn=e;this.isPacked=f;};jspb.ExtensionFieldInfo.prototype.isMessageType=function(){return !!this.ctor};jspb.Message=function(){};jspb.Message.GENERATE_TO_OBJECT=!0;jspb.Message.GENERATE_FROM_OBJECT=!goog.DISALLOW_TEST_ONLY_CODE;
	jspb.Message.GENERATE_TO_STRING=!0;jspb.Message.ASSUME_LOCAL_ARRAYS=!1;jspb.Message.SERIALIZE_EMPTY_TRAILING_FIELDS=!0;jspb.Message.SUPPORTS_UINT8ARRAY_="function"==typeof Uint8Array;jspb.Message.prototype.getJsPbMessageId=function(){return this.messageId_};jspb.Message.getIndex_=function(a,b){return b+a.arrayIndexOffset_};jspb.Message.getFieldNumber_=function(a,b){return b-a.arrayIndexOffset_};
	jspb.Message.initialize=function(a,b,c,d,e,f){a.wrappers_=null;b||(b=c?[c]:[]);a.messageId_=c?String(c):void 0;a.arrayIndexOffset_=0===c?-1:0;a.array=b;jspb.Message.initPivotAndExtensionObject_(a,d);a.convertedFloatingPointFields_={};jspb.Message.SERIALIZE_EMPTY_TRAILING_FIELDS||(a.repeatedFields=e);if(e)for(b=0;b<e.length;b++)c=e[b],c<a.pivot_?(c=jspb.Message.getIndex_(a,c),a.array[c]=a.array[c]||jspb.Message.EMPTY_LIST_SENTINEL_):(jspb.Message.maybeInitEmptyExtensionObject_(a),a.extensionObject_[c]=
	a.extensionObject_[c]||jspb.Message.EMPTY_LIST_SENTINEL_);if(f&&f.length)for(b=0;b<f.length;b++)jspb.Message.computeOneofCase(a,f[b]);};jspb.Message.EMPTY_LIST_SENTINEL_=goog.DEBUG&&Object.freeze?Object.freeze([]):[];jspb.Message.isArray_=function(a){return jspb.Message.ASSUME_LOCAL_ARRAYS?a instanceof Array:goog.isArray(a)};
	jspb.Message.initPivotAndExtensionObject_=function(a,b){if(a.array.length){var c=a.array.length-1,d=a.array[c];if(d&&"object"==typeof d&&!jspb.Message.isArray_(d)&&!(jspb.Message.SUPPORTS_UINT8ARRAY_&&d instanceof Uint8Array)){a.pivot_=jspb.Message.getFieldNumber_(a,c);a.extensionObject_=d;return}}-1<b?(a.pivot_=b,a.extensionObject_=null):a.pivot_=Number.MAX_VALUE;};
	jspb.Message.maybeInitEmptyExtensionObject_=function(a){var b=jspb.Message.getIndex_(a,a.pivot_);a.array[b]||(a.extensionObject_=a.array[b]={});};jspb.Message.toObjectList=function(a,b,c){for(var d=[],e=0;e<a.length;e++)d[e]=b.call(a[e],c,a[e]);return d};
	jspb.Message.toObjectExtension=function(a,b,c,d,e){for(var f in c){var g=c[f],h=d.call(a,g);if(null!=h){for(var k in g.fieldName)if(g.fieldName.hasOwnProperty(k))break;b[k]=g.toObjectFn?g.isRepeated?jspb.Message.toObjectList(h,g.toObjectFn,e):g.toObjectFn(e,h):h;}}};
	jspb.Message.serializeBinaryExtensions=function(a,b,c,d){for(var e in c){var f=c[e],g=f.fieldInfo;if(!f.binaryWriterFn)throw Error("Message extension present that was generated without binary serialization support");var h=d.call(a,g);if(null!=h)if(g.isMessageType())if(f.binaryMessageSerializeFn)f.binaryWriterFn.call(b,g.fieldIndex,h,f.binaryMessageSerializeFn);else throw Error("Message extension present holding submessage without binary support enabled, and message is being serialized to binary format");
	else f.binaryWriterFn.call(b,g.fieldIndex,h);}};jspb.Message.readBinaryExtension=function(a,b,c,d,e){var f=c[b.getFieldNumber()];if(f){c=f.fieldInfo;if(!f.binaryReaderFn)throw Error("Deserializing extension whose generated code does not support binary format");var g;c.isMessageType()?(g=new c.ctor,f.binaryReaderFn.call(b,g,f.binaryMessageDeserializeFn)):g=f.binaryReaderFn.call(b);c.isRepeated&&!f.isPacked?(b=d.call(a,c))?b.push(g):e.call(a,c,[g]):e.call(a,c,g);}else b.skipField();};
	jspb.Message.getField=function(a,b){if(b<a.pivot_){var c=jspb.Message.getIndex_(a,b),d=a.array[c];return d===jspb.Message.EMPTY_LIST_SENTINEL_?a.array[c]=[]:d}if(a.extensionObject_)return d=a.extensionObject_[b],d===jspb.Message.EMPTY_LIST_SENTINEL_?a.extensionObject_[b]=[]:d};
	jspb.Message.getRepeatedField=function(a,b){if(b<a.pivot_){var c=jspb.Message.getIndex_(a,b),d=a.array[c];return d===jspb.Message.EMPTY_LIST_SENTINEL_?a.array[c]=[]:d}d=a.extensionObject_[b];return d===jspb.Message.EMPTY_LIST_SENTINEL_?a.extensionObject_[b]=[]:d};jspb.Message.getOptionalFloatingPointField=function(a,b){var c=jspb.Message.getField(a,b);return null==c?c:+c};
	jspb.Message.getRepeatedFloatingPointField=function(a,b){var c=jspb.Message.getRepeatedField(a,b);a.convertedFloatingPointFields_||(a.convertedFloatingPointFields_={});if(!a.convertedFloatingPointFields_[b]){for(var d=0;d<c.length;d++)c[d]=+c[d];a.convertedFloatingPointFields_[b]=!0;}return c};
	jspb.Message.bytesAsB64=function(a){if(null==a||goog.isString(a))return a;if(jspb.Message.SUPPORTS_UINT8ARRAY_&&a instanceof Uint8Array)return goog.crypt.base64.encodeByteArray(a);goog.asserts.fail("Cannot coerce to b64 string: "+goog.typeOf(a));return null};jspb.Message.bytesAsU8=function(a){if(null==a||a instanceof Uint8Array)return a;if(goog.isString(a))return goog.crypt.base64.decodeStringToUint8Array(a);goog.asserts.fail("Cannot coerce to Uint8Array: "+goog.typeOf(a));return null};
	jspb.Message.bytesListAsB64=function(a){jspb.Message.assertConsistentTypes_(a);return !a.length||goog.isString(a[0])?a:goog.array.map(a,jspb.Message.bytesAsB64)};jspb.Message.bytesListAsU8=function(a){jspb.Message.assertConsistentTypes_(a);return !a.length||a[0]instanceof Uint8Array?a:goog.array.map(a,jspb.Message.bytesAsU8)};
	jspb.Message.assertConsistentTypes_=function(a){if(goog.DEBUG&&a&&1<a.length){var b=goog.typeOf(a[0]);goog.array.forEach(a,function(a){goog.typeOf(a)!=b&&goog.asserts.fail("Inconsistent type in JSPB repeated field array. Got "+goog.typeOf(a)+" expected "+b);});}};jspb.Message.getFieldWithDefault=function(a,b,c){a=jspb.Message.getField(a,b);return null==a?c:a};jspb.Message.getFieldProto3=jspb.Message.getFieldWithDefault;
	jspb.Message.getMapField=function(a,b,c,d){a.wrappers_||(a.wrappers_={});if(b in a.wrappers_)return a.wrappers_[b];if(!c)return c=jspb.Message.getField(a,b),c||(c=[],jspb.Message.setField(a,b,c)),a.wrappers_[b]=new jspb.Map(c,d)};jspb.Message.setField=function(a,b,c){b<a.pivot_?a.array[jspb.Message.getIndex_(a,b)]=c:(jspb.Message.maybeInitEmptyExtensionObject_(a),a.extensionObject_[b]=c);};jspb.Message.setProto3IntField=function(a,b,c){jspb.Message.setFieldIgnoringDefault_(a,b,c,0);};
	jspb.Message.setProto3StringIntField=function(a,b,c){jspb.Message.setFieldIgnoringDefault_(a,b,c,"0");};jspb.Message.setProto3FloatField=function(a,b,c){jspb.Message.setFieldIgnoringDefault_(a,b,c,0);};jspb.Message.setProto3BooleanField=function(a,b,c){jspb.Message.setFieldIgnoringDefault_(a,b,c,!1);};jspb.Message.setProto3StringField=function(a,b,c){jspb.Message.setFieldIgnoringDefault_(a,b,c,"");};jspb.Message.setProto3BytesField=function(a,b,c){jspb.Message.setFieldIgnoringDefault_(a,b,c,"");};
	jspb.Message.setProto3EnumField=function(a,b,c){jspb.Message.setFieldIgnoringDefault_(a,b,c,0);};jspb.Message.setFieldIgnoringDefault_=function(a,b,c,d){c!=d?jspb.Message.setField(a,b,c):a.array[jspb.Message.getIndex_(a,b)]=null;};jspb.Message.addToRepeatedField=function(a,b,c,d){a=jspb.Message.getRepeatedField(a,b);void 0!=d?a.splice(d,0,c):a.push(c);};
	jspb.Message.setOneofField=function(a,b,c,d){(c=jspb.Message.computeOneofCase(a,c))&&c!==b&&void 0!==d&&(a.wrappers_&&c in a.wrappers_&&(a.wrappers_[c]=void 0),jspb.Message.setField(a,c,void 0));jspb.Message.setField(a,b,d);};jspb.Message.computeOneofCase=function(a,b){for(var c,d,e=0;e<b.length;e++){var f=b[e],g=jspb.Message.getField(a,f);null!=g&&(c=f,d=g,jspb.Message.setField(a,f,void 0));}return c?(jspb.Message.setField(a,c,d),c):0};
	jspb.Message.getWrapperField=function(a,b,c,d){a.wrappers_||(a.wrappers_={});if(!a.wrappers_[c]){var e=jspb.Message.getField(a,c);if(d||e)a.wrappers_[c]=new b(e);}return a.wrappers_[c]};jspb.Message.getRepeatedWrapperField=function(a,b,c){jspb.Message.wrapRepeatedField_(a,b,c);b=a.wrappers_[c];b==jspb.Message.EMPTY_LIST_SENTINEL_&&(b=a.wrappers_[c]=[]);return b};
	jspb.Message.wrapRepeatedField_=function(a,b,c){a.wrappers_||(a.wrappers_={});if(!a.wrappers_[c]){for(var d=jspb.Message.getRepeatedField(a,c),e=[],f=0;f<d.length;f++)e[f]=new b(d[f]);a.wrappers_[c]=e;}};jspb.Message.setWrapperField=function(a,b,c){a.wrappers_||(a.wrappers_={});var d=c?c.toArray():c;a.wrappers_[b]=c;jspb.Message.setField(a,b,d);};
	jspb.Message.setOneofWrapperField=function(a,b,c,d){a.wrappers_||(a.wrappers_={});var e=d?d.toArray():d;a.wrappers_[b]=d;jspb.Message.setOneofField(a,b,c,e);};jspb.Message.setRepeatedWrapperField=function(a,b,c){a.wrappers_||(a.wrappers_={});c=c||[];for(var d=[],e=0;e<c.length;e++)d[e]=c[e].toArray();a.wrappers_[b]=c;jspb.Message.setField(a,b,d);};
	jspb.Message.addToRepeatedWrapperField=function(a,b,c,d,e){jspb.Message.wrapRepeatedField_(a,d,b);var f=a.wrappers_[b];f||(f=a.wrappers_[b]=[]);c=c?c:new d;a=jspb.Message.getRepeatedField(a,b);void 0!=e?(f.splice(e,0,c),a.splice(e,0,c.toArray())):(f.push(c),a.push(c.toArray()));return c};jspb.Message.toMap=function(a,b,c,d){for(var e={},f=0;f<a.length;f++)e[b.call(a[f])]=c?c.call(a[f],d,a[f]):a[f];return e};
	jspb.Message.prototype.syncMapFields_=function(){if(this.wrappers_)for(var a in this.wrappers_){var b=this.wrappers_[a];if(goog.isArray(b))for(var c=0;c<b.length;c++)b[c]&&b[c].toArray();else b&&b.toArray();}};jspb.Message.prototype.toArray=function(){this.syncMapFields_();return this.array};jspb.Message.GENERATE_TO_STRING&&(jspb.Message.prototype.toString=function(){this.syncMapFields_();return this.array.toString()});
	jspb.Message.prototype.getExtension=function(a){if(this.extensionObject_){this.wrappers_||(this.wrappers_={});var b=a.fieldIndex;if(a.isRepeated){if(a.isMessageType())return this.wrappers_[b]||(this.wrappers_[b]=goog.array.map(this.extensionObject_[b]||[],function(b){return new a.ctor(b)})),this.wrappers_[b]}else if(a.isMessageType())return !this.wrappers_[b]&&this.extensionObject_[b]&&(this.wrappers_[b]=new a.ctor(this.extensionObject_[b])),this.wrappers_[b];return this.extensionObject_[b]}};
	jspb.Message.prototype.setExtension=function(a,b){this.wrappers_||(this.wrappers_={});jspb.Message.maybeInitEmptyExtensionObject_(this);var c=a.fieldIndex;a.isRepeated?(b=b||[],a.isMessageType()?(this.wrappers_[c]=b,this.extensionObject_[c]=goog.array.map(b,function(a){return a.toArray()})):this.extensionObject_[c]=b):a.isMessageType()?(this.wrappers_[c]=b,this.extensionObject_[c]=b?b.toArray():b):this.extensionObject_[c]=b;return this};
	jspb.Message.difference=function(a,b){if(!(a instanceof b.constructor))throw Error("Messages have different types.");var c=a.toArray(),d=b.toArray(),e=[],f=0,g=c.length>d.length?c.length:d.length;a.getJsPbMessageId()&&(e[0]=a.getJsPbMessageId(),f=1);for(;f<g;f++)jspb.Message.compareFields(c[f],d[f])||(e[f]=d[f]);return new a.constructor(e)};jspb.Message.equals=function(a,b){return a==b||!(!a||!b)&&a instanceof b.constructor&&jspb.Message.compareFields(a.toArray(),b.toArray())};
	jspb.Message.compareExtensions=function(a,b){a=a||{};b=b||{};var c={},d;for(d in a)c[d]=0;for(d in b)c[d]=0;for(d in c)if(!jspb.Message.compareFields(a[d],b[d]))return !1;return !0};
	jspb.Message.compareFields=function(a,b){if(a==b)return !0;if(!goog.isObject(a)||!goog.isObject(b))return goog.isNumber(a)&&isNaN(a)||goog.isNumber(b)&&isNaN(b)?String(a)==String(b):!1;if(a.constructor!=b.constructor)return !1;if(jspb.Message.SUPPORTS_UINT8ARRAY_&&a.constructor===Uint8Array){if(a.length!=b.length)return !1;for(var c=0;c<a.length;c++)if(a[c]!=b[c])return !1;return !0}if(a.constructor===Array){for(var d=void 0,e=void 0,f=Math.max(a.length,b.length),c=0;c<f;c++){var g=a[c],h=b[c];g&&g.constructor==
	Object&&(goog.asserts.assert(void 0===d),goog.asserts.assert(c===a.length-1),d=g,g=void 0);h&&h.constructor==Object&&(goog.asserts.assert(void 0===e),goog.asserts.assert(c===b.length-1),e=h,h=void 0);if(!jspb.Message.compareFields(g,h))return !1}return d||e?(d=d||{},e=e||{},jspb.Message.compareExtensions(d,e)):!0}if(a.constructor===Object)return jspb.Message.compareExtensions(a,b);throw Error("Invalid type in JSPB array");};jspb.Message.prototype.cloneMessage=function(){return jspb.Message.cloneMessage(this)};
	jspb.Message.prototype.clone=function(){return jspb.Message.cloneMessage(this)};jspb.Message.clone=function(a){return jspb.Message.cloneMessage(a)};jspb.Message.cloneMessage=function(a){return new a.constructor(jspb.Message.clone_(a.toArray()))};
	jspb.Message.copyInto=function(a,b){goog.asserts.assertInstanceof(a,jspb.Message);goog.asserts.assertInstanceof(b,jspb.Message);goog.asserts.assert(a.constructor==b.constructor,"Copy source and target message should have the same type.");for(var c=jspb.Message.clone(a),d=b.toArray(),e=c.toArray(),f=d.length=0;f<e.length;f++)d[f]=e[f];b.wrappers_=c.wrappers_;b.extensionObject_=c.extensionObject_;};
	jspb.Message.clone_=function(a){var b;if(goog.isArray(a)){for(var c=Array(a.length),d=0;d<a.length;d++)b=a[d],null!=b&&(c[d]="object"==typeof b?jspb.Message.clone_(goog.asserts.assert(b)):b);return c}if(jspb.Message.SUPPORTS_UINT8ARRAY_&&a instanceof Uint8Array)return new Uint8Array(a);c={};for(d in a)b=a[d],null!=b&&(c[d]="object"==typeof b?jspb.Message.clone_(goog.asserts.assert(b)):b);return c};jspb.Message.registerMessageType=function(a,b){jspb.Message.registry_[a]=b;b.messageId=a;};
	jspb.Message.registry_={};jspb.Message.messageSetExtensions={};jspb.Message.messageSetExtensionsBinary={};jspb.arith={};jspb.arith.UInt64=function(a,b){this.lo=a;this.hi=b;};jspb.arith.UInt64.prototype.cmp=function(a){return this.hi<a.hi||this.hi==a.hi&&this.lo<a.lo?-1:this.hi==a.hi&&this.lo==a.lo?0:1};jspb.arith.UInt64.prototype.rightShift=function(){return new jspb.arith.UInt64((this.lo>>>1|(this.hi&1)<<31)>>>0,this.hi>>>1>>>0)};jspb.arith.UInt64.prototype.leftShift=function(){return new jspb.arith.UInt64(this.lo<<1>>>0,(this.hi<<1|this.lo>>>31)>>>0)};
	jspb.arith.UInt64.prototype.msb=function(){return !!(this.hi&2147483648)};jspb.arith.UInt64.prototype.lsb=function(){return !!(this.lo&1)};jspb.arith.UInt64.prototype.zero=function(){return 0==this.lo&&0==this.hi};jspb.arith.UInt64.prototype.add=function(a){return new jspb.arith.UInt64((this.lo+a.lo&4294967295)>>>0>>>0,((this.hi+a.hi&4294967295)>>>0)+(4294967296<=this.lo+a.lo?1:0)>>>0)};
	jspb.arith.UInt64.prototype.sub=function(a){return new jspb.arith.UInt64((this.lo-a.lo&4294967295)>>>0>>>0,((this.hi-a.hi&4294967295)>>>0)-(0>this.lo-a.lo?1:0)>>>0)};jspb.arith.UInt64.mul32x32=function(a,b){for(var c=a&65535,d=a>>>16,e=b&65535,f=b>>>16,g=c*e+65536*(c*f&65535)+65536*(d*e&65535),c=d*f+(c*f>>>16)+(d*e>>>16);4294967296<=g;)g-=4294967296,c+=1;return new jspb.arith.UInt64(g>>>0,c>>>0)};
	jspb.arith.UInt64.prototype.mul=function(a){var b=jspb.arith.UInt64.mul32x32(this.lo,a);a=jspb.arith.UInt64.mul32x32(this.hi,a);a.hi=a.lo;a.lo=0;return b.add(a)};
	jspb.arith.UInt64.prototype.div=function(a){if(0==a)return [];var b=new jspb.arith.UInt64(0,0),c=new jspb.arith.UInt64(this.lo,this.hi);a=new jspb.arith.UInt64(a,0);for(var d=new jspb.arith.UInt64(1,0);!a.msb();)a=a.leftShift(),d=d.leftShift();for(;!d.zero();)0>=a.cmp(c)&&(b=b.add(d),c=c.sub(a)),a=a.rightShift(),d=d.rightShift();return [b,c]};jspb.arith.UInt64.prototype.toString=function(){for(var a="",b=this;!b.zero();)var b=b.div(10),c=b[0],a=b[1].lo+a,b=c;""==a&&(a="0");return a};
	jspb.arith.UInt64.fromString=function(a){for(var b=new jspb.arith.UInt64(0,0),c=new jspb.arith.UInt64(0,0),d=0;d<a.length;d++){if("0">a[d]||"9"<a[d])return null;var e=parseInt(a[d],10);c.lo=e;b=b.mul(10).add(c);}return b};jspb.arith.UInt64.prototype.clone=function(){return new jspb.arith.UInt64(this.lo,this.hi)};jspb.arith.Int64=function(a,b){this.lo=a;this.hi=b;};
	jspb.arith.Int64.prototype.add=function(a){return new jspb.arith.Int64((this.lo+a.lo&4294967295)>>>0>>>0,((this.hi+a.hi&4294967295)>>>0)+(4294967296<=this.lo+a.lo?1:0)>>>0)};jspb.arith.Int64.prototype.sub=function(a){return new jspb.arith.Int64((this.lo-a.lo&4294967295)>>>0>>>0,((this.hi-a.hi&4294967295)>>>0)-(0>this.lo-a.lo?1:0)>>>0)};jspb.arith.Int64.prototype.clone=function(){return new jspb.arith.Int64(this.lo,this.hi)};
	jspb.arith.Int64.prototype.toString=function(){var a=0!=(this.hi&2147483648),b=new jspb.arith.UInt64(this.lo,this.hi);a&&(b=(new jspb.arith.UInt64(0,0)).sub(b));return (a?"-":"")+b.toString()};jspb.arith.Int64.fromString=function(a){var b=0<a.length&&"-"==a[0];b&&(a=a.substring(1));a=jspb.arith.UInt64.fromString(a);if(null===a)return null;b&&(a=(new jspb.arith.UInt64(0,0)).sub(a));return new jspb.arith.Int64(a.lo,a.hi)};jspb.BinaryConstants={};jspb.ConstBinaryMessage=function(){};jspb.BinaryMessage=function(){};jspb.BinaryConstants.FieldType={INVALID:-1,DOUBLE:1,FLOAT:2,INT64:3,UINT64:4,INT32:5,FIXED64:6,FIXED32:7,BOOL:8,STRING:9,GROUP:10,MESSAGE:11,BYTES:12,UINT32:13,ENUM:14,SFIXED32:15,SFIXED64:16,SINT32:17,SINT64:18,FHASH64:30,VHASH64:31};jspb.BinaryConstants.WireType={INVALID:-1,VARINT:0,FIXED64:1,DELIMITED:2,START_GROUP:3,END_GROUP:4,FIXED32:5};
	jspb.BinaryConstants.FieldTypeToWireType=function(a){var b=jspb.BinaryConstants.FieldType,c=jspb.BinaryConstants.WireType;switch(a){case b.INT32:case b.INT64:case b.UINT32:case b.UINT64:case b.SINT32:case b.SINT64:case b.BOOL:case b.ENUM:case b.VHASH64:return c.VARINT;case b.DOUBLE:case b.FIXED64:case b.SFIXED64:case b.FHASH64:return c.FIXED64;case b.STRING:case b.MESSAGE:case b.BYTES:return c.DELIMITED;case b.FLOAT:case b.FIXED32:case b.SFIXED32:return c.FIXED32;default:return c.INVALID}};
	jspb.BinaryConstants.INVALID_FIELD_NUMBER=-1;jspb.BinaryConstants.FLOAT32_EPS=1.401298464324817E-45;jspb.BinaryConstants.FLOAT32_MIN=1.1754943508222875E-38;jspb.BinaryConstants.FLOAT32_MAX=3.4028234663852886E38;jspb.BinaryConstants.FLOAT64_EPS=4.9E-324;jspb.BinaryConstants.FLOAT64_MIN=2.2250738585072014E-308;jspb.BinaryConstants.FLOAT64_MAX=1.7976931348623157E308;jspb.BinaryConstants.TWO_TO_20=1048576;jspb.BinaryConstants.TWO_TO_23=8388608;jspb.BinaryConstants.TWO_TO_31=2147483648;
	jspb.BinaryConstants.TWO_TO_32=4294967296;jspb.BinaryConstants.TWO_TO_52=4503599627370496;jspb.BinaryConstants.TWO_TO_63=0x7fffffffffffffff;jspb.BinaryConstants.TWO_TO_64=1.8446744073709552E19;jspb.BinaryConstants.ZERO_HASH="\x00\x00\x00\x00\x00\x00\x00\x00";jspb.utils={};jspb.utils.split64Low=0;jspb.utils.split64High=0;jspb.utils.splitUint64=function(a){var b=a>>>0;a=Math.floor((a-b)/jspb.BinaryConstants.TWO_TO_32)>>>0;jspb.utils.split64Low=b;jspb.utils.split64High=a;};jspb.utils.splitInt64=function(a){var b=0>a;a=Math.abs(a);var c=a>>>0;a=Math.floor((a-c)/jspb.BinaryConstants.TWO_TO_32);a>>>=0;b&&(a=~a>>>0,c=(~c>>>0)+1,4294967295<c&&(c=0,a++,4294967295<a&&(a=0)));jspb.utils.split64Low=c;jspb.utils.split64High=a;};
	jspb.utils.splitZigzag64=function(a){var b=0>a;a=2*Math.abs(a);jspb.utils.splitUint64(a);a=jspb.utils.split64Low;var c=jspb.utils.split64High;b&&(0==a?0==c?c=a=4294967295:(c--,a=4294967295):a--);jspb.utils.split64Low=a;jspb.utils.split64High=c;};
	jspb.utils.splitFloat32=function(a){var b=0>a?1:0;a=b?-a:a;var c;0===a?0<1/a?(jspb.utils.split64High=0,jspb.utils.split64Low=0):(jspb.utils.split64High=0,jspb.utils.split64Low=2147483648):isNaN(a)?(jspb.utils.split64High=0,jspb.utils.split64Low=2147483647):a>jspb.BinaryConstants.FLOAT32_MAX?(jspb.utils.split64High=0,jspb.utils.split64Low=(b<<31|2139095040)>>>0):a<jspb.BinaryConstants.FLOAT32_MIN?(a=Math.round(a/Math.pow(2,-149)),jspb.utils.split64High=0,jspb.utils.split64Low=(b<<31|a)>>>0):(c=Math.floor(Math.log(a)/
	Math.LN2),a*=Math.pow(2,-c),a=Math.round(a*jspb.BinaryConstants.TWO_TO_23)&8388607,jspb.utils.split64High=0,jspb.utils.split64Low=(b<<31|c+127<<23|a)>>>0);};
	jspb.utils.splitFloat64=function(a){var b=0>a?1:0;a=b?-a:a;if(0===a)jspb.utils.split64High=0<1/a?0:2147483648,jspb.utils.split64Low=0;else if(isNaN(a))jspb.utils.split64High=2147483647,jspb.utils.split64Low=4294967295;else if(a>jspb.BinaryConstants.FLOAT64_MAX)jspb.utils.split64High=(b<<31|2146435072)>>>0,jspb.utils.split64Low=0;else if(a<jspb.BinaryConstants.FLOAT64_MIN){var c=a/Math.pow(2,-1074);a=c/jspb.BinaryConstants.TWO_TO_32;jspb.utils.split64High=(b<<31|a)>>>0;jspb.utils.split64Low=c>>>0;}else{var d=
	Math.floor(Math.log(a)/Math.LN2);1024==d&&(d=1023);c=a*Math.pow(2,-d);a=c*jspb.BinaryConstants.TWO_TO_20&1048575;c=c*jspb.BinaryConstants.TWO_TO_52>>>0;jspb.utils.split64High=(b<<31|d+1023<<20|a)>>>0;jspb.utils.split64Low=c;}};
	jspb.utils.splitHash64=function(a){var b=a.charCodeAt(0),c=a.charCodeAt(1),d=a.charCodeAt(2),e=a.charCodeAt(3),f=a.charCodeAt(4),g=a.charCodeAt(5),h=a.charCodeAt(6);a=a.charCodeAt(7);jspb.utils.split64Low=b+(c<<8)+(d<<16)+(e<<24)>>>0;jspb.utils.split64High=f+(g<<8)+(h<<16)+(a<<24)>>>0;};jspb.utils.joinUint64=function(a,b){return b*jspb.BinaryConstants.TWO_TO_32+a};
	jspb.utils.joinInt64=function(a,b){var c=b&2147483648;c&&(a=~a+1>>>0,b=~b>>>0,0==a&&(b=b+1>>>0));var d=jspb.utils.joinUint64(a,b);return c?-d:d};jspb.utils.joinZigzag64=function(a,b){var c=a&1;a=(a>>>1|b<<31)>>>0;b>>>=1;c&&(a=a+1>>>0,0==a&&(b=b+1>>>0));var d=jspb.utils.joinUint64(a,b);return c?-d:d};jspb.utils.joinFloat32=function(a,b){var c=2*(a>>31)+1,d=a>>>23&255,e=a&8388607;return 255==d?e?NaN:Infinity*c:0==d?c*Math.pow(2,-149)*e:c*Math.pow(2,d-150)*(e+Math.pow(2,23))};
	jspb.utils.joinFloat64=function(a,b){var c=2*(b>>31)+1,d=b>>>20&2047,e=jspb.BinaryConstants.TWO_TO_32*(b&1048575)+a;return 2047==d?e?NaN:Infinity*c:0==d?c*Math.pow(2,-1074)*e:c*Math.pow(2,d-1075)*(e+jspb.BinaryConstants.TWO_TO_52)};jspb.utils.joinHash64=function(a,b){return String.fromCharCode(a>>>0&255,a>>>8&255,a>>>16&255,a>>>24&255,b>>>0&255,b>>>8&255,b>>>16&255,b>>>24&255)};jspb.utils.DIGITS="0123456789abcdef".split("");
	jspb.utils.joinUnsignedDecimalString=function(a,b){function c(a){for(var b=1E7,c=0;7>c;c++){var b=b/10,d=a/b%10>>>0;if(0!=d||h)h=!0,k+=g[d];}}if(2097151>=b)return ""+(jspb.BinaryConstants.TWO_TO_32*b+a);var d=(a>>>24|b<<8)>>>0&16777215,e=b>>16&65535,f=(a&16777215)+6777216*d+6710656*e,d=d+8147497*e,e=2*e;1E7<=f&&(d+=Math.floor(f/1E7),f%=1E7);1E7<=d&&(e+=Math.floor(d/1E7),d%=1E7);var g=jspb.utils.DIGITS,h=!1,k="";(e||h)&&c(e);(d||h)&&c(d);(f||h)&&c(f);return k};
	jspb.utils.joinSignedDecimalString=function(a,b){var c=b&2147483648;c&&(a=~a+1>>>0,b=~b+(0==a?1:0)>>>0);var d=jspb.utils.joinUnsignedDecimalString(a,b);return c?"-"+d:d};jspb.utils.hash64ToDecimalString=function(a,b){jspb.utils.splitHash64(a);var c=jspb.utils.split64Low,d=jspb.utils.split64High;return b?jspb.utils.joinSignedDecimalString(c,d):jspb.utils.joinUnsignedDecimalString(c,d)};
	jspb.utils.hash64ArrayToDecimalStrings=function(a,b){for(var c=Array(a.length),d=0;d<a.length;d++)c[d]=jspb.utils.hash64ToDecimalString(a[d],b);return c};
	jspb.utils.decimalStringToHash64=function(a){function b(a,b){for(var c=0;8>c&&(1!==a||0<b);c++){var d=a*e[c]+b;e[c]=d&255;b=d>>>8;}}function c(){for(var a=0;8>a;a++)e[a]=~e[a]&255;}goog.asserts.assert(0<a.length);var d=!1;"-"===a[0]&&(d=!0,a=a.slice(1));for(var e=[0,0,0,0,0,0,0,0],f=0;f<a.length;f++)b(10,jspb.utils.DIGITS.indexOf(a[f]));d&&(c(),b(1,1));return goog.crypt.byteArrayToString(e)};jspb.utils.splitDecimalString=function(a){jspb.utils.splitHash64(jspb.utils.decimalStringToHash64(a));};
	jspb.utils.hash64ToHexString=function(a){var b=Array(18);b[0]="0";b[1]="x";for(var c=0;8>c;c++){var d=a.charCodeAt(7-c);b[2*c+2]=jspb.utils.DIGITS[d>>4];b[2*c+3]=jspb.utils.DIGITS[d&15];}return b.join("")};jspb.utils.hexStringToHash64=function(a){a=a.toLowerCase();goog.asserts.assert(18==a.length);goog.asserts.assert("0"==a[0]);goog.asserts.assert("x"==a[1]);for(var b="",c=0;8>c;c++)var d=jspb.utils.DIGITS.indexOf(a[2*c+2]),e=jspb.utils.DIGITS.indexOf(a[2*c+3]),b=String.fromCharCode(16*d+e)+b;return b};
	jspb.utils.hash64ToNumber=function(a,b){jspb.utils.splitHash64(a);var c=jspb.utils.split64Low,d=jspb.utils.split64High;return b?jspb.utils.joinInt64(c,d):jspb.utils.joinUint64(c,d)};jspb.utils.numberToHash64=function(a){jspb.utils.splitInt64(a);return jspb.utils.joinHash64(jspb.utils.split64Low,jspb.utils.split64High)};jspb.utils.countVarints=function(a,b,c){for(var d=0,e=b;e<c;e++)d+=a[e]>>7;return c-b-d};
	jspb.utils.countVarintFields=function(a,b,c,d){var e=0;d=8*d+jspb.BinaryConstants.WireType.VARINT;if(128>d)for(;b<c&&a[b++]==d;)for(e++;;){var f=a[b++];if(0==(f&128))break}else for(;b<c;){for(f=d;128<f;){if(a[b]!=(f&127|128))return e;b++;f>>=7;}if(a[b++]!=f)break;for(e++;f=a[b++],0!=(f&128););}return e};jspb.utils.countFixedFields_=function(a,b,c,d,e){var f=0;if(128>d)for(;b<c&&a[b++]==d;)f++,b+=e;else for(;b<c;){for(var g=d;128<g;){if(a[b++]!=(g&127|128))return f;g>>=7;}if(a[b++]!=g)break;f++;b+=e;}return f};
	jspb.utils.countFixed32Fields=function(a,b,c,d){return jspb.utils.countFixedFields_(a,b,c,8*d+jspb.BinaryConstants.WireType.FIXED32,4)};jspb.utils.countFixed64Fields=function(a,b,c,d){return jspb.utils.countFixedFields_(a,b,c,8*d+jspb.BinaryConstants.WireType.FIXED64,8)};
	jspb.utils.countDelimitedFields=function(a,b,c,d){var e=0;for(d=8*d+jspb.BinaryConstants.WireType.DELIMITED;b<c;){for(var f=d;128<f;){if(a[b++]!=(f&127|128))return e;f>>=7;}if(a[b++]!=f)break;e++;for(var g=0,h=1;f=a[b++],g+=(f&127)*h,h*=128,0!=(f&128););b+=g;}return e};jspb.utils.debugBytesToTextFormat=function(a){var b='"';if(a){a=jspb.utils.byteSourceToUint8Array(a);for(var c=0;c<a.length;c++)b+="\\x",16>a[c]&&(b+="0"),b+=a[c].toString(16);}return b+'"'};
	jspb.utils.debugScalarToTextFormat=function(a){return goog.isString(a)?goog.string.quote(a):a.toString()};jspb.utils.stringToByteArray=function(a){for(var b=new Uint8Array(a.length),c=0;c<a.length;c++){var d=a.charCodeAt(c);if(255<d)throw Error("Conversion error: string contains codepoint outside of byte range");b[c]=d;}return b};
	jspb.utils.byteSourceToUint8Array=function(a){if(a.constructor===Uint8Array)return a;if(a.constructor===ArrayBuffer||a.constructor===Buffer$1||a.constructor===Array)return new Uint8Array(a);if(a.constructor===String)return goog.crypt.base64.decodeStringToUint8Array(a);goog.asserts.fail("Type not convertible to Uint8Array.");return new Uint8Array(0)};jspb.BinaryEncoder=function(){this.buffer_=[];};jspb.BinaryEncoder.prototype.length=function(){return this.buffer_.length};jspb.BinaryEncoder.prototype.end=function(){var a=this.buffer_;this.buffer_=[];return a};
	jspb.BinaryEncoder.prototype.writeSplitVarint64=function(a,b){goog.asserts.assert(a==Math.floor(a));goog.asserts.assert(b==Math.floor(b));goog.asserts.assert(0<=a&&a<jspb.BinaryConstants.TWO_TO_32);for(goog.asserts.assert(0<=b&&b<jspb.BinaryConstants.TWO_TO_32);0<b||127<a;)this.buffer_.push(a&127|128),a=(a>>>7|b<<25)>>>0,b>>>=7;this.buffer_.push(a);};
	jspb.BinaryEncoder.prototype.writeSplitFixed64=function(a,b){goog.asserts.assert(a==Math.floor(a));goog.asserts.assert(b==Math.floor(b));goog.asserts.assert(0<=a&&a<jspb.BinaryConstants.TWO_TO_32);goog.asserts.assert(0<=b&&b<jspb.BinaryConstants.TWO_TO_32);this.writeUint32(a);this.writeUint32(b);};
	jspb.BinaryEncoder.prototype.writeUnsignedVarint32=function(a){goog.asserts.assert(a==Math.floor(a));for(goog.asserts.assert(0<=a&&a<jspb.BinaryConstants.TWO_TO_32);127<a;)this.buffer_.push(a&127|128),a>>>=7;this.buffer_.push(a);};
	jspb.BinaryEncoder.prototype.writeSignedVarint32=function(a){goog.asserts.assert(a==Math.floor(a));goog.asserts.assert(a>=-jspb.BinaryConstants.TWO_TO_31&&a<jspb.BinaryConstants.TWO_TO_31);if(0<=a)this.writeUnsignedVarint32(a);else{for(var b=0;9>b;b++)this.buffer_.push(a&127|128),a>>=7;this.buffer_.push(1);}};
	jspb.BinaryEncoder.prototype.writeUnsignedVarint64=function(a){goog.asserts.assert(a==Math.floor(a));goog.asserts.assert(0<=a&&a<jspb.BinaryConstants.TWO_TO_64);jspb.utils.splitInt64(a);this.writeSplitVarint64(jspb.utils.split64Low,jspb.utils.split64High);};
	jspb.BinaryEncoder.prototype.writeSignedVarint64=function(a){goog.asserts.assert(a==Math.floor(a));goog.asserts.assert(a>=-jspb.BinaryConstants.TWO_TO_63&&a<jspb.BinaryConstants.TWO_TO_63);jspb.utils.splitInt64(a);this.writeSplitVarint64(jspb.utils.split64Low,jspb.utils.split64High);};
	jspb.BinaryEncoder.prototype.writeZigzagVarint32=function(a){goog.asserts.assert(a==Math.floor(a));goog.asserts.assert(a>=-jspb.BinaryConstants.TWO_TO_31&&a<jspb.BinaryConstants.TWO_TO_31);this.writeUnsignedVarint32((a<<1^a>>31)>>>0);};jspb.BinaryEncoder.prototype.writeZigzagVarint64=function(a){goog.asserts.assert(a==Math.floor(a));goog.asserts.assert(a>=-jspb.BinaryConstants.TWO_TO_63&&a<jspb.BinaryConstants.TWO_TO_63);jspb.utils.splitZigzag64(a);this.writeSplitVarint64(jspb.utils.split64Low,jspb.utils.split64High);};
	jspb.BinaryEncoder.prototype.writeZigzagVarint64String=function(a){this.writeZigzagVarint64(parseInt(a,10));};jspb.BinaryEncoder.prototype.writeUint8=function(a){goog.asserts.assert(a==Math.floor(a));goog.asserts.assert(0<=a&&256>a);this.buffer_.push(a>>>0&255);};jspb.BinaryEncoder.prototype.writeUint16=function(a){goog.asserts.assert(a==Math.floor(a));goog.asserts.assert(0<=a&&65536>a);this.buffer_.push(a>>>0&255);this.buffer_.push(a>>>8&255);};
	jspb.BinaryEncoder.prototype.writeUint32=function(a){goog.asserts.assert(a==Math.floor(a));goog.asserts.assert(0<=a&&a<jspb.BinaryConstants.TWO_TO_32);this.buffer_.push(a>>>0&255);this.buffer_.push(a>>>8&255);this.buffer_.push(a>>>16&255);this.buffer_.push(a>>>24&255);};jspb.BinaryEncoder.prototype.writeUint64=function(a){goog.asserts.assert(a==Math.floor(a));goog.asserts.assert(0<=a&&a<jspb.BinaryConstants.TWO_TO_64);jspb.utils.splitUint64(a);this.writeUint32(jspb.utils.split64Low);this.writeUint32(jspb.utils.split64High);};
	jspb.BinaryEncoder.prototype.writeInt8=function(a){goog.asserts.assert(a==Math.floor(a));goog.asserts.assert(-128<=a&&128>a);this.buffer_.push(a>>>0&255);};jspb.BinaryEncoder.prototype.writeInt16=function(a){goog.asserts.assert(a==Math.floor(a));goog.asserts.assert(-32768<=a&&32768>a);this.buffer_.push(a>>>0&255);this.buffer_.push(a>>>8&255);};
	jspb.BinaryEncoder.prototype.writeInt32=function(a){goog.asserts.assert(a==Math.floor(a));goog.asserts.assert(a>=-jspb.BinaryConstants.TWO_TO_31&&a<jspb.BinaryConstants.TWO_TO_31);this.buffer_.push(a>>>0&255);this.buffer_.push(a>>>8&255);this.buffer_.push(a>>>16&255);this.buffer_.push(a>>>24&255);};
	jspb.BinaryEncoder.prototype.writeInt64=function(a){goog.asserts.assert(a==Math.floor(a));goog.asserts.assert(a>=-jspb.BinaryConstants.TWO_TO_63&&a<jspb.BinaryConstants.TWO_TO_63);jspb.utils.splitInt64(a);this.writeSplitFixed64(jspb.utils.split64Low,jspb.utils.split64High);};
	jspb.BinaryEncoder.prototype.writeInt64String=function(a){goog.asserts.assert(a==Math.floor(a));goog.asserts.assert(+a>=-jspb.BinaryConstants.TWO_TO_63&&+a<jspb.BinaryConstants.TWO_TO_63);jspb.utils.splitHash64(jspb.utils.decimalStringToHash64(a));this.writeSplitFixed64(jspb.utils.split64Low,jspb.utils.split64High);};jspb.BinaryEncoder.prototype.writeFloat=function(a){goog.asserts.assert(a>=-jspb.BinaryConstants.FLOAT32_MAX&&a<=jspb.BinaryConstants.FLOAT32_MAX);jspb.utils.splitFloat32(a);this.writeUint32(jspb.utils.split64Low);};
	jspb.BinaryEncoder.prototype.writeDouble=function(a){goog.asserts.assert(a>=-jspb.BinaryConstants.FLOAT64_MAX&&a<=jspb.BinaryConstants.FLOAT64_MAX);jspb.utils.splitFloat64(a);this.writeUint32(jspb.utils.split64Low);this.writeUint32(jspb.utils.split64High);};jspb.BinaryEncoder.prototype.writeBool=function(a){goog.asserts.assert(goog.isBoolean(a)||goog.isNumber(a));this.buffer_.push(a?1:0);};
	jspb.BinaryEncoder.prototype.writeEnum=function(a){goog.asserts.assert(a==Math.floor(a));goog.asserts.assert(a>=-jspb.BinaryConstants.TWO_TO_31&&a<jspb.BinaryConstants.TWO_TO_31);this.writeSignedVarint32(a);};jspb.BinaryEncoder.prototype.writeBytes=function(a){this.buffer_.push.apply(this.buffer_,a);};jspb.BinaryEncoder.prototype.writeVarintHash64=function(a){jspb.utils.splitHash64(a);this.writeSplitVarint64(jspb.utils.split64Low,jspb.utils.split64High);};
	jspb.BinaryEncoder.prototype.writeFixedHash64=function(a){jspb.utils.splitHash64(a);this.writeUint32(jspb.utils.split64Low);this.writeUint32(jspb.utils.split64High);};
	jspb.BinaryEncoder.prototype.writeString=function(a){for(var b=this.buffer_.length,c=0;c<a.length;c++){var d=a.charCodeAt(c);if(128>d)this.buffer_.push(d);else if(2048>d)this.buffer_.push(d>>6|192),this.buffer_.push(d&63|128);else if(65536>d)if(55296<=d&&56319>=d&&c+1<a.length){var e=a.charCodeAt(c+1);56320<=e&&57343>=e&&(d=1024*(d-55296)+e-56320+65536,this.buffer_.push(d>>18|240),this.buffer_.push(d>>12&63|128),this.buffer_.push(d>>6&63|128),this.buffer_.push(d&63|128),c++);}else this.buffer_.push(d>>
	12|224),this.buffer_.push(d>>6&63|128),this.buffer_.push(d&63|128);}return this.buffer_.length-b};jspb.BinaryWriter=function(){this.blocks_=[];this.totalLength_=0;this.encoder_=new jspb.BinaryEncoder;this.bookmarks_=[];};jspb.BinaryWriter.prototype.appendUint8Array_=function(a){var b=this.encoder_.end();this.blocks_.push(b);this.blocks_.push(a);this.totalLength_+=b.length+a.length;};
	jspb.BinaryWriter.prototype.beginDelimited_=function(a){this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.DELIMITED);a=this.encoder_.end();this.blocks_.push(a);this.totalLength_+=a.length;a.push(this.totalLength_);return a};jspb.BinaryWriter.prototype.endDelimited_=function(a){var b=a.pop(),b=this.totalLength_+this.encoder_.length()-b;for(goog.asserts.assert(0<=b);127<b;)a.push(b&127|128),b>>>=7,this.totalLength_++;a.push(b);this.totalLength_++;};
	jspb.BinaryWriter.prototype.writeSerializedMessage=function(a,b,c){this.appendUint8Array_(a.subarray(b,c));};jspb.BinaryWriter.prototype.maybeWriteSerializedMessage=function(a,b,c){null!=a&&null!=b&&null!=c&&this.writeSerializedMessage(a,b,c);};jspb.BinaryWriter.prototype.reset=function(){this.blocks_=[];this.encoder_.end();this.totalLength_=0;this.bookmarks_=[];};
	jspb.BinaryWriter.prototype.getResultBuffer=function(){goog.asserts.assert(0==this.bookmarks_.length);for(var a=new Uint8Array(this.totalLength_+this.encoder_.length()),b=this.blocks_,c=b.length,d=0,e=0;e<c;e++){var f=b[e];a.set(f,d);d+=f.length;}b=this.encoder_.end();a.set(b,d);d+=b.length;goog.asserts.assert(d==a.length);this.blocks_=[a];return a};jspb.BinaryWriter.prototype.getResultBase64String=function(a){return goog.crypt.base64.encodeByteArray(this.getResultBuffer(),a)};
	jspb.BinaryWriter.prototype.beginSubMessage=function(a){this.bookmarks_.push(this.beginDelimited_(a));};jspb.BinaryWriter.prototype.endSubMessage=function(){goog.asserts.assert(0<=this.bookmarks_.length);this.endDelimited_(this.bookmarks_.pop());};jspb.BinaryWriter.prototype.writeFieldHeader_=function(a,b){goog.asserts.assert(1<=a&&a==Math.floor(a));this.encoder_.writeUnsignedVarint32(8*a+b);};
	jspb.BinaryWriter.prototype.writeAny=function(a,b,c){var d=jspb.BinaryConstants.FieldType;switch(a){case d.DOUBLE:this.writeDouble(b,c);break;case d.FLOAT:this.writeFloat(b,c);break;case d.INT64:this.writeInt64(b,c);break;case d.UINT64:this.writeUint64(b,c);break;case d.INT32:this.writeInt32(b,c);break;case d.FIXED64:this.writeFixed64(b,c);break;case d.FIXED32:this.writeFixed32(b,c);break;case d.BOOL:this.writeBool(b,c);break;case d.STRING:this.writeString(b,c);break;case d.GROUP:goog.asserts.fail("Group field type not supported in writeAny()");
	break;case d.MESSAGE:goog.asserts.fail("Message field type not supported in writeAny()");break;case d.BYTES:this.writeBytes(b,c);break;case d.UINT32:this.writeUint32(b,c);break;case d.ENUM:this.writeEnum(b,c);break;case d.SFIXED32:this.writeSfixed32(b,c);break;case d.SFIXED64:this.writeSfixed64(b,c);break;case d.SINT32:this.writeSint32(b,c);break;case d.SINT64:this.writeSint64(b,c);break;case d.FHASH64:this.writeFixedHash64(b,c);break;case d.VHASH64:this.writeVarintHash64(b,c);break;default:goog.asserts.fail("Invalid field type in writeAny()");}};
	jspb.BinaryWriter.prototype.writeUnsignedVarint32_=function(a,b){null!=b&&(this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.VARINT),this.encoder_.writeUnsignedVarint32(b));};jspb.BinaryWriter.prototype.writeSignedVarint32_=function(a,b){null!=b&&(this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.VARINT),this.encoder_.writeSignedVarint32(b));};jspb.BinaryWriter.prototype.writeUnsignedVarint64_=function(a,b){null!=b&&(this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.VARINT),this.encoder_.writeUnsignedVarint64(b));};
	jspb.BinaryWriter.prototype.writeSignedVarint64_=function(a,b){null!=b&&(this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.VARINT),this.encoder_.writeSignedVarint64(b));};jspb.BinaryWriter.prototype.writeZigzagVarint32_=function(a,b){null!=b&&(this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.VARINT),this.encoder_.writeZigzagVarint32(b));};jspb.BinaryWriter.prototype.writeZigzagVarint64_=function(a,b){null!=b&&(this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.VARINT),this.encoder_.writeZigzagVarint64(b));};
	jspb.BinaryWriter.prototype.writeZigzagVarint64String_=function(a,b){null!=b&&(this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.VARINT),this.encoder_.writeZigzagVarint64String(b));};jspb.BinaryWriter.prototype.writeInt32=function(a,b){null!=b&&(goog.asserts.assert(b>=-jspb.BinaryConstants.TWO_TO_31&&b<jspb.BinaryConstants.TWO_TO_31),this.writeSignedVarint32_(a,b));};
	jspb.BinaryWriter.prototype.writeInt32String=function(a,b){if(null!=b){var c=parseInt(b,10);goog.asserts.assert(c>=-jspb.BinaryConstants.TWO_TO_31&&c<jspb.BinaryConstants.TWO_TO_31);this.writeSignedVarint32_(a,c);}};jspb.BinaryWriter.prototype.writeInt64=function(a,b){null!=b&&(goog.asserts.assert(b>=-jspb.BinaryConstants.TWO_TO_63&&b<jspb.BinaryConstants.TWO_TO_63),this.writeSignedVarint64_(a,b));};
	jspb.BinaryWriter.prototype.writeInt64String=function(a,b){if(null!=b){var c=jspb.arith.Int64.fromString(b);this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.VARINT);this.encoder_.writeSplitVarint64(c.lo,c.hi);}};jspb.BinaryWriter.prototype.writeUint32=function(a,b){null!=b&&(goog.asserts.assert(0<=b&&b<jspb.BinaryConstants.TWO_TO_32),this.writeUnsignedVarint32_(a,b));};
	jspb.BinaryWriter.prototype.writeUint32String=function(a,b){if(null!=b){var c=parseInt(b,10);goog.asserts.assert(0<=c&&c<jspb.BinaryConstants.TWO_TO_32);this.writeUnsignedVarint32_(a,c);}};jspb.BinaryWriter.prototype.writeUint64=function(a,b){null!=b&&(goog.asserts.assert(0<=b&&b<jspb.BinaryConstants.TWO_TO_64),this.writeUnsignedVarint64_(a,b));};
	jspb.BinaryWriter.prototype.writeUint64String=function(a,b){if(null!=b){var c=jspb.arith.UInt64.fromString(b);this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.VARINT);this.encoder_.writeSplitVarint64(c.lo,c.hi);}};jspb.BinaryWriter.prototype.writeSint32=function(a,b){null!=b&&(goog.asserts.assert(b>=-jspb.BinaryConstants.TWO_TO_31&&b<jspb.BinaryConstants.TWO_TO_31),this.writeZigzagVarint32_(a,b));};
	jspb.BinaryWriter.prototype.writeSint64=function(a,b){null!=b&&(goog.asserts.assert(b>=-jspb.BinaryConstants.TWO_TO_63&&b<jspb.BinaryConstants.TWO_TO_63),this.writeZigzagVarint64_(a,b));};jspb.BinaryWriter.prototype.writeSint64String=function(a,b){null!=b&&(goog.asserts.assert(+b>=-jspb.BinaryConstants.TWO_TO_63&&+b<jspb.BinaryConstants.TWO_TO_63),this.writeZigzagVarint64String_(a,b));};
	jspb.BinaryWriter.prototype.writeFixed32=function(a,b){null!=b&&(goog.asserts.assert(0<=b&&b<jspb.BinaryConstants.TWO_TO_32),this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.FIXED32),this.encoder_.writeUint32(b));};jspb.BinaryWriter.prototype.writeFixed64=function(a,b){null!=b&&(goog.asserts.assert(0<=b&&b<jspb.BinaryConstants.TWO_TO_64),this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.FIXED64),this.encoder_.writeUint64(b));};
	jspb.BinaryWriter.prototype.writeFixed64String=function(a,b){if(null!=b){var c=jspb.arith.UInt64.fromString(b);this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.FIXED64);this.encoder_.writeSplitFixed64(c.lo,c.hi);}};jspb.BinaryWriter.prototype.writeSfixed32=function(a,b){null!=b&&(goog.asserts.assert(b>=-jspb.BinaryConstants.TWO_TO_31&&b<jspb.BinaryConstants.TWO_TO_31),this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.FIXED32),this.encoder_.writeInt32(b));};
	jspb.BinaryWriter.prototype.writeSfixed64=function(a,b){null!=b&&(goog.asserts.assert(b>=-jspb.BinaryConstants.TWO_TO_63&&b<jspb.BinaryConstants.TWO_TO_63),this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.FIXED64),this.encoder_.writeInt64(b));};jspb.BinaryWriter.prototype.writeSfixed64String=function(a,b){if(null!=b){var c=jspb.arith.Int64.fromString(b);this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.FIXED64);this.encoder_.writeSplitFixed64(c.lo,c.hi);}};
	jspb.BinaryWriter.prototype.writeFloat=function(a,b){null!=b&&(this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.FIXED32),this.encoder_.writeFloat(b));};jspb.BinaryWriter.prototype.writeDouble=function(a,b){null!=b&&(this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.FIXED64),this.encoder_.writeDouble(b));};jspb.BinaryWriter.prototype.writeBool=function(a,b){null!=b&&(goog.asserts.assert(goog.isBoolean(b)||goog.isNumber(b)),this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.VARINT),this.encoder_.writeBool(b));};
	jspb.BinaryWriter.prototype.writeEnum=function(a,b){null!=b&&(goog.asserts.assert(b>=-jspb.BinaryConstants.TWO_TO_31&&b<jspb.BinaryConstants.TWO_TO_31),this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.VARINT),this.encoder_.writeSignedVarint32(b));};jspb.BinaryWriter.prototype.writeString=function(a,b){if(null!=b){var c=this.beginDelimited_(a);this.encoder_.writeString(b);this.endDelimited_(c);}};
	jspb.BinaryWriter.prototype.writeBytes=function(a,b){if(null!=b){var c=jspb.utils.byteSourceToUint8Array(b);this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.DELIMITED);this.encoder_.writeUnsignedVarint32(c.length);this.appendUint8Array_(c);}};jspb.BinaryWriter.prototype.writeMessage=function(a,b,c){null!=b&&(a=this.beginDelimited_(a),c(b,this),this.endDelimited_(a));};
	jspb.BinaryWriter.prototype.writeGroup=function(a,b,c){null!=b&&(this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.START_GROUP),c(b,this),this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.END_GROUP));};jspb.BinaryWriter.prototype.writeFixedHash64=function(a,b){null!=b&&(goog.asserts.assert(8==b.length),this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.FIXED64),this.encoder_.writeFixedHash64(b));};
	jspb.BinaryWriter.prototype.writeVarintHash64=function(a,b){null!=b&&(goog.asserts.assert(8==b.length),this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.VARINT),this.encoder_.writeVarintHash64(b));};jspb.BinaryWriter.prototype.writeRepeatedInt32=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeSignedVarint32_(a,b[c]);};jspb.BinaryWriter.prototype.writeRepeatedInt32String=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeInt32String(a,b[c]);};
	jspb.BinaryWriter.prototype.writeRepeatedInt64=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeSignedVarint64_(a,b[c]);};jspb.BinaryWriter.prototype.writeRepeatedInt64String=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeInt64String(a,b[c]);};jspb.BinaryWriter.prototype.writeRepeatedUint32=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeUnsignedVarint32_(a,b[c]);};
	jspb.BinaryWriter.prototype.writeRepeatedUint32String=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeUint32String(a,b[c]);};jspb.BinaryWriter.prototype.writeRepeatedUint64=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeUnsignedVarint64_(a,b[c]);};jspb.BinaryWriter.prototype.writeRepeatedUint64String=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeUint64String(a,b[c]);};
	jspb.BinaryWriter.prototype.writeRepeatedSint32=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeZigzagVarint32_(a,b[c]);};jspb.BinaryWriter.prototype.writeRepeatedSint64=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeZigzagVarint64_(a,b[c]);};jspb.BinaryWriter.prototype.writeRepeatedSint64String=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeZigzagVarint64String_(a,b[c]);};
	jspb.BinaryWriter.prototype.writeRepeatedFixed32=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeFixed32(a,b[c]);};jspb.BinaryWriter.prototype.writeRepeatedFixed64=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeFixed64(a,b[c]);};jspb.BinaryWriter.prototype.writeRepeatedFixed64String=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeFixed64String(a,b[c]);};
	jspb.BinaryWriter.prototype.writeRepeatedSfixed32=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeSfixed32(a,b[c]);};jspb.BinaryWriter.prototype.writeRepeatedSfixed64=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeSfixed64(a,b[c]);};jspb.BinaryWriter.prototype.writeRepeatedSfixed64String=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeSfixed64String(a,b[c]);};
	jspb.BinaryWriter.prototype.writeRepeatedFloat=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeFloat(a,b[c]);};jspb.BinaryWriter.prototype.writeRepeatedDouble=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeDouble(a,b[c]);};jspb.BinaryWriter.prototype.writeRepeatedBool=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeBool(a,b[c]);};jspb.BinaryWriter.prototype.writeRepeatedEnum=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeEnum(a,b[c]);};
	jspb.BinaryWriter.prototype.writeRepeatedString=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeString(a,b[c]);};jspb.BinaryWriter.prototype.writeRepeatedBytes=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeBytes(a,b[c]);};jspb.BinaryWriter.prototype.writeRepeatedMessage=function(a,b,c){if(null!=b)for(var d=0;d<b.length;d++){var e=this.beginDelimited_(a);c(b[d],this);this.endDelimited_(e);}};
	jspb.BinaryWriter.prototype.writeRepeatedGroup=function(a,b,c){if(null!=b)for(var d=0;d<b.length;d++)this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.START_GROUP),c(b[d],this),this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.END_GROUP);};jspb.BinaryWriter.prototype.writeRepeatedFixedHash64=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeFixedHash64(a,b[c]);};
	jspb.BinaryWriter.prototype.writeRepeatedVarintHash64=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeVarintHash64(a,b[c]);};jspb.BinaryWriter.prototype.writePackedInt32=function(a,b){if(null!=b&&b.length){for(var c=this.beginDelimited_(a),d=0;d<b.length;d++)this.encoder_.writeSignedVarint32(b[d]);this.endDelimited_(c);}};
	jspb.BinaryWriter.prototype.writePackedInt32String=function(a,b){if(null!=b&&b.length){for(var c=this.beginDelimited_(a),d=0;d<b.length;d++)this.encoder_.writeSignedVarint32(parseInt(b[d],10));this.endDelimited_(c);}};jspb.BinaryWriter.prototype.writePackedInt64=function(a,b){if(null!=b&&b.length){for(var c=this.beginDelimited_(a),d=0;d<b.length;d++)this.encoder_.writeSignedVarint64(b[d]);this.endDelimited_(c);}};
	jspb.BinaryWriter.prototype.writePackedInt64String=function(a,b){if(null!=b&&b.length){for(var c=this.beginDelimited_(a),d=0;d<b.length;d++){var e=jspb.arith.Int64.fromString(b[d]);this.encoder_.writeSplitVarint64(e.lo,e.hi);}this.endDelimited_(c);}};jspb.BinaryWriter.prototype.writePackedUint32=function(a,b){if(null!=b&&b.length){for(var c=this.beginDelimited_(a),d=0;d<b.length;d++)this.encoder_.writeUnsignedVarint32(b[d]);this.endDelimited_(c);}};
	jspb.BinaryWriter.prototype.writePackedUint32String=function(a,b){if(null!=b&&b.length){for(var c=this.beginDelimited_(a),d=0;d<b.length;d++)this.encoder_.writeUnsignedVarint32(parseInt(b[d],10));this.endDelimited_(c);}};jspb.BinaryWriter.prototype.writePackedUint64=function(a,b){if(null!=b&&b.length){for(var c=this.beginDelimited_(a),d=0;d<b.length;d++)this.encoder_.writeUnsignedVarint64(b[d]);this.endDelimited_(c);}};
	jspb.BinaryWriter.prototype.writePackedUint64String=function(a,b){if(null!=b&&b.length){for(var c=this.beginDelimited_(a),d=0;d<b.length;d++){var e=jspb.arith.UInt64.fromString(b[d]);this.encoder_.writeSplitVarint64(e.lo,e.hi);}this.endDelimited_(c);}};jspb.BinaryWriter.prototype.writePackedSint32=function(a,b){if(null!=b&&b.length){for(var c=this.beginDelimited_(a),d=0;d<b.length;d++)this.encoder_.writeZigzagVarint32(b[d]);this.endDelimited_(c);}};
	jspb.BinaryWriter.prototype.writePackedSint64=function(a,b){if(null!=b&&b.length){for(var c=this.beginDelimited_(a),d=0;d<b.length;d++)this.encoder_.writeZigzagVarint64(b[d]);this.endDelimited_(c);}};jspb.BinaryWriter.prototype.writePackedSint64String=function(a,b){if(null!=b&&b.length){for(var c=this.beginDelimited_(a),d=0;d<b.length;d++)this.encoder_.writeZigzagVarint64(parseInt(b[d],10));this.endDelimited_(c);}};
	jspb.BinaryWriter.prototype.writePackedFixed32=function(a,b){if(null!=b&&b.length){this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.DELIMITED);this.encoder_.writeUnsignedVarint32(4*b.length);for(var c=0;c<b.length;c++)this.encoder_.writeUint32(b[c]);}};jspb.BinaryWriter.prototype.writePackedFixed64=function(a,b){if(null!=b&&b.length){this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.DELIMITED);this.encoder_.writeUnsignedVarint32(8*b.length);for(var c=0;c<b.length;c++)this.encoder_.writeUint64(b[c]);}};
	jspb.BinaryWriter.prototype.writePackedFixed64String=function(a,b){if(null!=b&&b.length){this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.DELIMITED);this.encoder_.writeUnsignedVarint32(8*b.length);for(var c=0;c<b.length;c++){var d=jspb.arith.UInt64.fromString(b[c]);this.encoder_.writeSplitFixed64(d.lo,d.hi);}}};
	jspb.BinaryWriter.prototype.writePackedSfixed32=function(a,b){if(null!=b&&b.length){this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.DELIMITED);this.encoder_.writeUnsignedVarint32(4*b.length);for(var c=0;c<b.length;c++)this.encoder_.writeInt32(b[c]);}};jspb.BinaryWriter.prototype.writePackedSfixed64=function(a,b){if(null!=b&&b.length){this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.DELIMITED);this.encoder_.writeUnsignedVarint32(8*b.length);for(var c=0;c<b.length;c++)this.encoder_.writeInt64(b[c]);}};
	jspb.BinaryWriter.prototype.writePackedSfixed64String=function(a,b){if(null!=b&&b.length){this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.DELIMITED);this.encoder_.writeUnsignedVarint32(8*b.length);for(var c=0;c<b.length;c++)this.encoder_.writeInt64String(b[c]);}};jspb.BinaryWriter.prototype.writePackedFloat=function(a,b){if(null!=b&&b.length){this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.DELIMITED);this.encoder_.writeUnsignedVarint32(4*b.length);for(var c=0;c<b.length;c++)this.encoder_.writeFloat(b[c]);}};
	jspb.BinaryWriter.prototype.writePackedDouble=function(a,b){if(null!=b&&b.length){this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.DELIMITED);this.encoder_.writeUnsignedVarint32(8*b.length);for(var c=0;c<b.length;c++)this.encoder_.writeDouble(b[c]);}};jspb.BinaryWriter.prototype.writePackedBool=function(a,b){if(null!=b&&b.length){this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.DELIMITED);this.encoder_.writeUnsignedVarint32(b.length);for(var c=0;c<b.length;c++)this.encoder_.writeBool(b[c]);}};
	jspb.BinaryWriter.prototype.writePackedEnum=function(a,b){if(null!=b&&b.length){for(var c=this.beginDelimited_(a),d=0;d<b.length;d++)this.encoder_.writeEnum(b[d]);this.endDelimited_(c);}};jspb.BinaryWriter.prototype.writePackedFixedHash64=function(a,b){if(null!=b&&b.length){this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.DELIMITED);this.encoder_.writeUnsignedVarint32(8*b.length);for(var c=0;c<b.length;c++)this.encoder_.writeFixedHash64(b[c]);}};
	jspb.BinaryWriter.prototype.writePackedVarintHash64=function(a,b){if(null!=b&&b.length){for(var c=this.beginDelimited_(a),d=0;d<b.length;d++)this.encoder_.writeVarintHash64(b[d]);this.endDelimited_(c);}};jspb.BinaryIterator=function(a,b,c){this.elements_=this.nextMethod_=this.decoder_=null;this.cursor_=0;this.nextValue_=null;this.atEnd_=!0;this.init_(a,b,c);};jspb.BinaryIterator.prototype.init_=function(a,b,c){a&&b&&(this.decoder_=a,this.nextMethod_=b);this.elements_=c||null;this.cursor_=0;this.nextValue_=null;this.atEnd_=!this.decoder_&&!this.elements_;this.next();};jspb.BinaryIterator.instanceCache_=[];
	jspb.BinaryIterator.alloc=function(a,b,c){if(jspb.BinaryIterator.instanceCache_.length){var d=jspb.BinaryIterator.instanceCache_.pop();d.init_(a,b,c);return d}return new jspb.BinaryIterator(a,b,c)};jspb.BinaryIterator.prototype.free=function(){this.clear();100>jspb.BinaryIterator.instanceCache_.length&&jspb.BinaryIterator.instanceCache_.push(this);};
	jspb.BinaryIterator.prototype.clear=function(){this.decoder_&&this.decoder_.free();this.elements_=this.nextMethod_=this.decoder_=null;this.cursor_=0;this.nextValue_=null;this.atEnd_=!0;};jspb.BinaryIterator.prototype.get=function(){return this.nextValue_};jspb.BinaryIterator.prototype.atEnd=function(){return this.atEnd_};
	jspb.BinaryIterator.prototype.next=function(){var a=this.nextValue_;this.decoder_?this.decoder_.atEnd()?(this.nextValue_=null,this.atEnd_=!0):this.nextValue_=this.nextMethod_.call(this.decoder_):this.elements_&&(this.cursor_==this.elements_.length?(this.nextValue_=null,this.atEnd_=!0):this.nextValue_=this.elements_[this.cursor_++]);return a};jspb.BinaryDecoder=function(a,b,c){this.bytes_=null;this.tempHigh_=this.tempLow_=this.cursor_=this.end_=this.start_=0;this.error_=!1;a&&this.setBlock(a,b,c);};
	jspb.BinaryDecoder.instanceCache_=[];jspb.BinaryDecoder.alloc=function(a,b,c){if(jspb.BinaryDecoder.instanceCache_.length){var d=jspb.BinaryDecoder.instanceCache_.pop();a&&d.setBlock(a,b,c);return d}return new jspb.BinaryDecoder(a,b,c)};jspb.BinaryDecoder.prototype.free=function(){this.clear();100>jspb.BinaryDecoder.instanceCache_.length&&jspb.BinaryDecoder.instanceCache_.push(this);};jspb.BinaryDecoder.prototype.clone=function(){return jspb.BinaryDecoder.alloc(this.bytes_,this.start_,this.end_-this.start_)};
	jspb.BinaryDecoder.prototype.clear=function(){this.bytes_=null;this.cursor_=this.end_=this.start_=0;this.error_=!1;};jspb.BinaryDecoder.prototype.getBuffer=function(){return this.bytes_};jspb.BinaryDecoder.prototype.setBlock=function(a,b,c){this.bytes_=jspb.utils.byteSourceToUint8Array(a);this.start_=goog.isDef(b)?b:0;this.end_=goog.isDef(c)?this.start_+c:this.bytes_.length;this.cursor_=this.start_;};jspb.BinaryDecoder.prototype.getEnd=function(){return this.end_};
	jspb.BinaryDecoder.prototype.setEnd=function(a){this.end_=a;};jspb.BinaryDecoder.prototype.reset=function(){this.cursor_=this.start_;};jspb.BinaryDecoder.prototype.getCursor=function(){return this.cursor_};jspb.BinaryDecoder.prototype.setCursor=function(a){this.cursor_=a;};jspb.BinaryDecoder.prototype.advance=function(a){this.cursor_+=a;goog.asserts.assert(this.cursor_<=this.end_);};jspb.BinaryDecoder.prototype.atEnd=function(){return this.cursor_==this.end_};
	jspb.BinaryDecoder.prototype.pastEnd=function(){return this.cursor_>this.end_};jspb.BinaryDecoder.prototype.getError=function(){return this.error_||0>this.cursor_||this.cursor_>this.end_};
	jspb.BinaryDecoder.prototype.readSplitVarint64_=function(){for(var a,b=0,c,d=0;4>d;d++)if(a=this.bytes_[this.cursor_++],b|=(a&127)<<7*d,128>a){this.tempLow_=b>>>0;this.tempHigh_=0;return}a=this.bytes_[this.cursor_++];b|=(a&127)<<28;c=0|(a&127)>>4;if(128>a)this.tempLow_=b>>>0,this.tempHigh_=c>>>0;else{for(d=0;5>d;d++)if(a=this.bytes_[this.cursor_++],c|=(a&127)<<7*d+3,128>a){this.tempLow_=b>>>0;this.tempHigh_=c>>>0;return}goog.asserts.fail("Failed to read varint, encoding is invalid.");this.error_=
	!0;}};jspb.BinaryDecoder.prototype.skipVarint=function(){for(;this.bytes_[this.cursor_]&128;)this.cursor_++;this.cursor_++;};jspb.BinaryDecoder.prototype.unskipVarint=function(a){for(;128<a;)this.cursor_--,a>>>=7;this.cursor_--;};
	jspb.BinaryDecoder.prototype.readUnsignedVarint32=function(){var a,b=this.bytes_;a=b[this.cursor_+0];var c=a&127;if(128>a)return this.cursor_+=1,goog.asserts.assert(this.cursor_<=this.end_),c;a=b[this.cursor_+1];c|=(a&127)<<7;if(128>a)return this.cursor_+=2,goog.asserts.assert(this.cursor_<=this.end_),c;a=b[this.cursor_+2];c|=(a&127)<<14;if(128>a)return this.cursor_+=3,goog.asserts.assert(this.cursor_<=this.end_),c;a=b[this.cursor_+3];c|=(a&127)<<21;if(128>a)return this.cursor_+=4,goog.asserts.assert(this.cursor_<=
	this.end_),c;a=b[this.cursor_+4];c|=(a&15)<<28;if(128>a)return this.cursor_+=5,goog.asserts.assert(this.cursor_<=this.end_),c>>>0;this.cursor_+=5;128<=b[this.cursor_++]&&128<=b[this.cursor_++]&&128<=b[this.cursor_++]&&128<=b[this.cursor_++]&&128<=b[this.cursor_++]&&goog.asserts.assert(!1);goog.asserts.assert(this.cursor_<=this.end_);return c};jspb.BinaryDecoder.prototype.readSignedVarint32=jspb.BinaryDecoder.prototype.readUnsignedVarint32;jspb.BinaryDecoder.prototype.readUnsignedVarint32String=function(){return this.readUnsignedVarint32().toString()};
	jspb.BinaryDecoder.prototype.readSignedVarint32String=function(){return this.readSignedVarint32().toString()};jspb.BinaryDecoder.prototype.readZigzagVarint32=function(){var a=this.readUnsignedVarint32();return a>>>1^-(a&1)};jspb.BinaryDecoder.prototype.readUnsignedVarint64=function(){this.readSplitVarint64_();return jspb.utils.joinUint64(this.tempLow_,this.tempHigh_)};
	jspb.BinaryDecoder.prototype.readUnsignedVarint64String=function(){this.readSplitVarint64_();return jspb.utils.joinUnsignedDecimalString(this.tempLow_,this.tempHigh_)};jspb.BinaryDecoder.prototype.readSignedVarint64=function(){this.readSplitVarint64_();return jspb.utils.joinInt64(this.tempLow_,this.tempHigh_)};jspb.BinaryDecoder.prototype.readSignedVarint64String=function(){this.readSplitVarint64_();return jspb.utils.joinSignedDecimalString(this.tempLow_,this.tempHigh_)};
	jspb.BinaryDecoder.prototype.readZigzagVarint64=function(){this.readSplitVarint64_();return jspb.utils.joinZigzag64(this.tempLow_,this.tempHigh_)};jspb.BinaryDecoder.prototype.readZigzagVarint64String=function(){return this.readZigzagVarint64().toString()};jspb.BinaryDecoder.prototype.readUint8=function(){var a=this.bytes_[this.cursor_+0];this.cursor_+=1;goog.asserts.assert(this.cursor_<=this.end_);return a};
	jspb.BinaryDecoder.prototype.readUint16=function(){var a=this.bytes_[this.cursor_+0],b=this.bytes_[this.cursor_+1];this.cursor_+=2;goog.asserts.assert(this.cursor_<=this.end_);return a<<0|b<<8};jspb.BinaryDecoder.prototype.readUint32=function(){var a=this.bytes_[this.cursor_+0],b=this.bytes_[this.cursor_+1],c=this.bytes_[this.cursor_+2],d=this.bytes_[this.cursor_+3];this.cursor_+=4;goog.asserts.assert(this.cursor_<=this.end_);return (a<<0|b<<8|c<<16|d<<24)>>>0};
	jspb.BinaryDecoder.prototype.readUint64=function(){var a=this.readUint32(),b=this.readUint32();return jspb.utils.joinUint64(a,b)};jspb.BinaryDecoder.prototype.readUint64String=function(){var a=this.readUint32(),b=this.readUint32();return jspb.utils.joinUnsignedDecimalString(a,b)};jspb.BinaryDecoder.prototype.readInt8=function(){var a=this.bytes_[this.cursor_+0];this.cursor_+=1;goog.asserts.assert(this.cursor_<=this.end_);return a<<24>>24};
	jspb.BinaryDecoder.prototype.readInt16=function(){var a=this.bytes_[this.cursor_+0],b=this.bytes_[this.cursor_+1];this.cursor_+=2;goog.asserts.assert(this.cursor_<=this.end_);return (a<<0|b<<8)<<16>>16};jspb.BinaryDecoder.prototype.readInt32=function(){var a=this.bytes_[this.cursor_+0],b=this.bytes_[this.cursor_+1],c=this.bytes_[this.cursor_+2],d=this.bytes_[this.cursor_+3];this.cursor_+=4;goog.asserts.assert(this.cursor_<=this.end_);return a<<0|b<<8|c<<16|d<<24};
	jspb.BinaryDecoder.prototype.readInt64=function(){var a=this.readUint32(),b=this.readUint32();return jspb.utils.joinInt64(a,b)};jspb.BinaryDecoder.prototype.readInt64String=function(){var a=this.readUint32(),b=this.readUint32();return jspb.utils.joinSignedDecimalString(a,b)};jspb.BinaryDecoder.prototype.readFloat=function(){var a=this.readUint32();return jspb.utils.joinFloat32(a,0)};
	jspb.BinaryDecoder.prototype.readDouble=function(){var a=this.readUint32(),b=this.readUint32();return jspb.utils.joinFloat64(a,b)};jspb.BinaryDecoder.prototype.readBool=function(){return !!this.bytes_[this.cursor_++]};jspb.BinaryDecoder.prototype.readEnum=function(){return this.readSignedVarint32()};
	jspb.BinaryDecoder.prototype.readString=function(a){var b=this.bytes_,c=this.cursor_;a=c+a;for(var d=[],e="";c<a;){var f=b[c++];if(128>f)d.push(f);else if(192>f)continue;else if(224>f){var g=b[c++];d.push((f&31)<<6|g&63);}else if(240>f){var g=b[c++],h=b[c++];d.push((f&15)<<12|(g&63)<<6|h&63);}else if(248>f){var g=b[c++],h=b[c++],k=b[c++],f=(f&7)<<18|(g&63)<<12|(h&63)<<6|k&63,f=f-65536;d.push((f>>10&1023)+55296,(f&1023)+56320);}8192<=d.length&&(e+=String.fromCharCode.apply(null,d),d.length=0);}e+=goog.crypt.byteArrayToString(d);
	this.cursor_=c;return e};jspb.BinaryDecoder.prototype.readStringWithLength=function(){var a=this.readUnsignedVarint32();return this.readString(a)};jspb.BinaryDecoder.prototype.readBytes=function(a){if(0>a||this.cursor_+a>this.bytes_.length)return this.error_=!0,goog.asserts.fail("Invalid byte length!"),new Uint8Array(0);var b=this.bytes_.subarray(this.cursor_,this.cursor_+a);this.cursor_+=a;goog.asserts.assert(this.cursor_<=this.end_);return b};
	jspb.BinaryDecoder.prototype.readVarintHash64=function(){this.readSplitVarint64_();return jspb.utils.joinHash64(this.tempLow_,this.tempHigh_)};jspb.BinaryDecoder.prototype.readFixedHash64=function(){var a=this.bytes_,b=this.cursor_,c=a[b+0],d=a[b+1],e=a[b+2],f=a[b+3],g=a[b+4],h=a[b+5],k=a[b+6],a=a[b+7];this.cursor_+=8;return String.fromCharCode(c,d,e,f,g,h,k,a)};jspb.BinaryReader=function(a,b,c){this.decoder_=jspb.BinaryDecoder.alloc(a,b,c);this.fieldCursor_=this.decoder_.getCursor();this.nextField_=jspb.BinaryConstants.INVALID_FIELD_NUMBER;this.nextWireType_=jspb.BinaryConstants.WireType.INVALID;this.error_=!1;this.readCallbacks_=null;};jspb.BinaryReader.instanceCache_=[];
	jspb.BinaryReader.alloc=function(a,b,c){if(jspb.BinaryReader.instanceCache_.length){var d=jspb.BinaryReader.instanceCache_.pop();a&&d.decoder_.setBlock(a,b,c);return d}return new jspb.BinaryReader(a,b,c)};jspb.BinaryReader.prototype.alloc=jspb.BinaryReader.alloc;
	jspb.BinaryReader.prototype.free=function(){this.decoder_.clear();this.nextField_=jspb.BinaryConstants.INVALID_FIELD_NUMBER;this.nextWireType_=jspb.BinaryConstants.WireType.INVALID;this.error_=!1;this.readCallbacks_=null;100>jspb.BinaryReader.instanceCache_.length&&jspb.BinaryReader.instanceCache_.push(this);};jspb.BinaryReader.prototype.getFieldCursor=function(){return this.fieldCursor_};jspb.BinaryReader.prototype.getCursor=function(){return this.decoder_.getCursor()};
	jspb.BinaryReader.prototype.getBuffer=function(){return this.decoder_.getBuffer()};jspb.BinaryReader.prototype.getFieldNumber=function(){return this.nextField_};jspb.BinaryReader.prototype.getWireType=function(){return this.nextWireType_};jspb.BinaryReader.prototype.isEndGroup=function(){return this.nextWireType_==jspb.BinaryConstants.WireType.END_GROUP};jspb.BinaryReader.prototype.getError=function(){return this.error_||this.decoder_.getError()};
	jspb.BinaryReader.prototype.setBlock=function(a,b,c){this.decoder_.setBlock(a,b,c);this.nextField_=jspb.BinaryConstants.INVALID_FIELD_NUMBER;this.nextWireType_=jspb.BinaryConstants.WireType.INVALID;};jspb.BinaryReader.prototype.reset=function(){this.decoder_.reset();this.nextField_=jspb.BinaryConstants.INVALID_FIELD_NUMBER;this.nextWireType_=jspb.BinaryConstants.WireType.INVALID;};jspb.BinaryReader.prototype.advance=function(a){this.decoder_.advance(a);};
	jspb.BinaryReader.prototype.nextField=function(){if(this.decoder_.atEnd())return !1;if(this.getError())return goog.asserts.fail("Decoder hit an error"),!1;this.fieldCursor_=this.decoder_.getCursor();var a=this.decoder_.readUnsignedVarint32(),b=a>>>3,a=a&7;if(a!=jspb.BinaryConstants.WireType.VARINT&&a!=jspb.BinaryConstants.WireType.FIXED32&&a!=jspb.BinaryConstants.WireType.FIXED64&&a!=jspb.BinaryConstants.WireType.DELIMITED&&a!=jspb.BinaryConstants.WireType.START_GROUP&&a!=jspb.BinaryConstants.WireType.END_GROUP)return goog.asserts.fail("Invalid wire type"),
	this.error_=!0,!1;this.nextField_=b;this.nextWireType_=a;return !0};jspb.BinaryReader.prototype.unskipHeader=function(){this.decoder_.unskipVarint(this.nextField_<<3|this.nextWireType_);};jspb.BinaryReader.prototype.skipMatchingFields=function(){var a=this.nextField_;for(this.unskipHeader();this.nextField()&&this.getFieldNumber()==a;)this.skipField();this.decoder_.atEnd()||this.unskipHeader();};
	jspb.BinaryReader.prototype.skipVarintField=function(){this.nextWireType_!=jspb.BinaryConstants.WireType.VARINT?(goog.asserts.fail("Invalid wire type for skipVarintField"),this.skipField()):this.decoder_.skipVarint();};jspb.BinaryReader.prototype.skipDelimitedField=function(){if(this.nextWireType_!=jspb.BinaryConstants.WireType.DELIMITED)goog.asserts.fail("Invalid wire type for skipDelimitedField"),this.skipField();else{var a=this.decoder_.readUnsignedVarint32();this.decoder_.advance(a);}};
	jspb.BinaryReader.prototype.skipFixed32Field=function(){this.nextWireType_!=jspb.BinaryConstants.WireType.FIXED32?(goog.asserts.fail("Invalid wire type for skipFixed32Field"),this.skipField()):this.decoder_.advance(4);};jspb.BinaryReader.prototype.skipFixed64Field=function(){this.nextWireType_!=jspb.BinaryConstants.WireType.FIXED64?(goog.asserts.fail("Invalid wire type for skipFixed64Field"),this.skipField()):this.decoder_.advance(8);};
	jspb.BinaryReader.prototype.skipGroup=function(){var a=[this.nextField_];do{if(!this.nextField()){goog.asserts.fail("Unmatched start-group tag: stream EOF");this.error_=!0;break}if(this.nextWireType_==jspb.BinaryConstants.WireType.START_GROUP)a.push(this.nextField_);else if(this.nextWireType_==jspb.BinaryConstants.WireType.END_GROUP&&this.nextField_!=a.pop()){goog.asserts.fail("Unmatched end-group tag");this.error_=!0;break}}while(0<a.length)};
	jspb.BinaryReader.prototype.skipField=function(){switch(this.nextWireType_){case jspb.BinaryConstants.WireType.VARINT:this.skipVarintField();break;case jspb.BinaryConstants.WireType.FIXED64:this.skipFixed64Field();break;case jspb.BinaryConstants.WireType.DELIMITED:this.skipDelimitedField();break;case jspb.BinaryConstants.WireType.FIXED32:this.skipFixed32Field();break;case jspb.BinaryConstants.WireType.START_GROUP:this.skipGroup();break;default:goog.asserts.fail("Invalid wire encoding for field.");}};
	jspb.BinaryReader.prototype.registerReadCallback=function(a,b){goog.isNull(this.readCallbacks_)&&(this.readCallbacks_={});goog.asserts.assert(!this.readCallbacks_[a]);this.readCallbacks_[a]=b;};jspb.BinaryReader.prototype.runReadCallback=function(a){goog.asserts.assert(!goog.isNull(this.readCallbacks_));a=this.readCallbacks_[a];goog.asserts.assert(a);return a(this)};
	jspb.BinaryReader.prototype.readAny=function(a){this.nextWireType_=jspb.BinaryConstants.FieldTypeToWireType(a);var b=jspb.BinaryConstants.FieldType;switch(a){case b.DOUBLE:return this.readDouble();case b.FLOAT:return this.readFloat();case b.INT64:return this.readInt64();case b.UINT64:return this.readUint64();case b.INT32:return this.readInt32();case b.FIXED64:return this.readFixed64();case b.FIXED32:return this.readFixed32();case b.BOOL:return this.readBool();case b.STRING:return this.readString();
	case b.GROUP:goog.asserts.fail("Group field type not supported in readAny()");case b.MESSAGE:goog.asserts.fail("Message field type not supported in readAny()");case b.BYTES:return this.readBytes();case b.UINT32:return this.readUint32();case b.ENUM:return this.readEnum();case b.SFIXED32:return this.readSfixed32();case b.SFIXED64:return this.readSfixed64();case b.SINT32:return this.readSint32();case b.SINT64:return this.readSint64();case b.FHASH64:return this.readFixedHash64();case b.VHASH64:return this.readVarintHash64();
	default:goog.asserts.fail("Invalid field type in readAny()");}return 0};jspb.BinaryReader.prototype.readMessage=function(a,b){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.DELIMITED);var c=this.decoder_.getEnd(),d=this.decoder_.readUnsignedVarint32(),d=this.decoder_.getCursor()+d;this.decoder_.setEnd(d);b(a,this);this.decoder_.setCursor(d);this.decoder_.setEnd(c);};
	jspb.BinaryReader.prototype.readGroup=function(a,b,c){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.START_GROUP);goog.asserts.assert(this.nextField_==a);c(b,this);this.error_||this.nextWireType_==jspb.BinaryConstants.WireType.END_GROUP||(goog.asserts.fail("Group submessage did not end with an END_GROUP tag"),this.error_=!0);};
	jspb.BinaryReader.prototype.getFieldDecoder=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.DELIMITED);var a=this.decoder_.readUnsignedVarint32(),b=this.decoder_.getCursor(),c=b+a,a=jspb.BinaryDecoder.alloc(this.decoder_.getBuffer(),b,a);this.decoder_.setCursor(c);return a};jspb.BinaryReader.prototype.readInt32=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.VARINT);return this.decoder_.readSignedVarint32()};
	jspb.BinaryReader.prototype.readInt32String=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.VARINT);return this.decoder_.readSignedVarint32String()};jspb.BinaryReader.prototype.readInt64=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.VARINT);return this.decoder_.readSignedVarint64()};jspb.BinaryReader.prototype.readInt64String=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.VARINT);return this.decoder_.readSignedVarint64String()};
	jspb.BinaryReader.prototype.readUint32=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.VARINT);return this.decoder_.readUnsignedVarint32()};jspb.BinaryReader.prototype.readUint32String=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.VARINT);return this.decoder_.readUnsignedVarint32String()};jspb.BinaryReader.prototype.readUint64=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.VARINT);return this.decoder_.readUnsignedVarint64()};
	jspb.BinaryReader.prototype.readUint64String=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.VARINT);return this.decoder_.readUnsignedVarint64String()};jspb.BinaryReader.prototype.readSint32=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.VARINT);return this.decoder_.readZigzagVarint32()};jspb.BinaryReader.prototype.readSint64=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.VARINT);return this.decoder_.readZigzagVarint64()};
	jspb.BinaryReader.prototype.readSint64String=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.VARINT);return this.decoder_.readZigzagVarint64String()};jspb.BinaryReader.prototype.readFixed32=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.FIXED32);return this.decoder_.readUint32()};jspb.BinaryReader.prototype.readFixed64=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.FIXED64);return this.decoder_.readUint64()};
	jspb.BinaryReader.prototype.readFixed64String=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.FIXED64);return this.decoder_.readUint64String()};jspb.BinaryReader.prototype.readSfixed32=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.FIXED32);return this.decoder_.readInt32()};jspb.BinaryReader.prototype.readSfixed32String=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.FIXED32);return this.decoder_.readInt32().toString()};
	jspb.BinaryReader.prototype.readSfixed64=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.FIXED64);return this.decoder_.readInt64()};jspb.BinaryReader.prototype.readSfixed64String=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.FIXED64);return this.decoder_.readInt64String()};jspb.BinaryReader.prototype.readFloat=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.FIXED32);return this.decoder_.readFloat()};
	jspb.BinaryReader.prototype.readDouble=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.FIXED64);return this.decoder_.readDouble()};jspb.BinaryReader.prototype.readBool=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.VARINT);return !!this.decoder_.readUnsignedVarint32()};jspb.BinaryReader.prototype.readEnum=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.VARINT);return this.decoder_.readSignedVarint64()};
	jspb.BinaryReader.prototype.readString=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.DELIMITED);var a=this.decoder_.readUnsignedVarint32();return this.decoder_.readString(a)};jspb.BinaryReader.prototype.readBytes=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.DELIMITED);var a=this.decoder_.readUnsignedVarint32();return this.decoder_.readBytes(a)};
	jspb.BinaryReader.prototype.readVarintHash64=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.VARINT);return this.decoder_.readVarintHash64()};jspb.BinaryReader.prototype.readFixedHash64=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.FIXED64);return this.decoder_.readFixedHash64()};
	jspb.BinaryReader.prototype.readPackedField_=function(a){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.DELIMITED);for(var b=this.decoder_.readUnsignedVarint32(),b=this.decoder_.getCursor()+b,c=[];this.decoder_.getCursor()<b;)c.push(a.call(this.decoder_));return c};jspb.BinaryReader.prototype.readPackedInt32=function(){return this.readPackedField_(this.decoder_.readSignedVarint32)};jspb.BinaryReader.prototype.readPackedInt32String=function(){return this.readPackedField_(this.decoder_.readSignedVarint32String)};
	jspb.BinaryReader.prototype.readPackedInt64=function(){return this.readPackedField_(this.decoder_.readSignedVarint64)};jspb.BinaryReader.prototype.readPackedInt64String=function(){return this.readPackedField_(this.decoder_.readSignedVarint64String)};jspb.BinaryReader.prototype.readPackedUint32=function(){return this.readPackedField_(this.decoder_.readUnsignedVarint32)};jspb.BinaryReader.prototype.readPackedUint32String=function(){return this.readPackedField_(this.decoder_.readUnsignedVarint32String)};
	jspb.BinaryReader.prototype.readPackedUint64=function(){return this.readPackedField_(this.decoder_.readUnsignedVarint64)};jspb.BinaryReader.prototype.readPackedUint64String=function(){return this.readPackedField_(this.decoder_.readUnsignedVarint64String)};jspb.BinaryReader.prototype.readPackedSint32=function(){return this.readPackedField_(this.decoder_.readZigzagVarint32)};jspb.BinaryReader.prototype.readPackedSint64=function(){return this.readPackedField_(this.decoder_.readZigzagVarint64)};
	jspb.BinaryReader.prototype.readPackedSint64String=function(){return this.readPackedField_(this.decoder_.readZigzagVarint64String)};jspb.BinaryReader.prototype.readPackedFixed32=function(){return this.readPackedField_(this.decoder_.readUint32)};jspb.BinaryReader.prototype.readPackedFixed64=function(){return this.readPackedField_(this.decoder_.readUint64)};jspb.BinaryReader.prototype.readPackedFixed64String=function(){return this.readPackedField_(this.decoder_.readUint64String)};
	jspb.BinaryReader.prototype.readPackedSfixed32=function(){return this.readPackedField_(this.decoder_.readInt32)};jspb.BinaryReader.prototype.readPackedSfixed64=function(){return this.readPackedField_(this.decoder_.readInt64)};jspb.BinaryReader.prototype.readPackedSfixed64String=function(){return this.readPackedField_(this.decoder_.readInt64String)};jspb.BinaryReader.prototype.readPackedFloat=function(){return this.readPackedField_(this.decoder_.readFloat)};
	jspb.BinaryReader.prototype.readPackedDouble=function(){return this.readPackedField_(this.decoder_.readDouble)};jspb.BinaryReader.prototype.readPackedBool=function(){return this.readPackedField_(this.decoder_.readBool)};jspb.BinaryReader.prototype.readPackedEnum=function(){return this.readPackedField_(this.decoder_.readEnum)};jspb.BinaryReader.prototype.readPackedVarintHash64=function(){return this.readPackedField_(this.decoder_.readVarintHash64)};
	jspb.BinaryReader.prototype.readPackedFixedHash64=function(){return this.readPackedField_(this.decoder_.readFixedHash64)};jspb.Export={};var Map$1=jspb.Map;var Message=jspb.Message;var BinaryReader=jspb.BinaryReader;var BinaryWriter=jspb.BinaryWriter;var ExtensionFieldInfo=jspb.ExtensionFieldInfo;var ExtensionFieldBinaryInfo=jspb.ExtensionFieldBinaryInfo;var exportSymbol=goog.exportSymbol;var inherits=goog.inherits;var object={extend:goog.object.extend};var typeOf=goog.typeOf;

	var googleProtobuf = {
		Map: Map$1,
		Message: Message,
		BinaryReader: BinaryReader,
		BinaryWriter: BinaryWriter,
		ExtensionFieldInfo: ExtensionFieldInfo,
		ExtensionFieldBinaryInfo: ExtensionFieldBinaryInfo,
		exportSymbol: exportSymbol,
		inherits: inherits,
		object: object,
		typeOf: typeOf
	};

	var blockchain_pb = createCommonjsModule(function (module, exports) {
	  /**
	   * @fileoverview
	   * @enhanceable
	   * @suppress {messageConventions} JS Compiler reports an error if a variable or
	   *     field starts with 'MSG_' and isn't a translatable message.
	   * @public
	   */
	  // GENERATED CODE -- DO NOT EDIT!
	  var goog = googleProtobuf;
	  var global = Function('return this')();
	  goog.exportSymbol('proto.types.ABI', null, global);
	  goog.exportSymbol('proto.types.Block', null, global);
	  goog.exportSymbol('proto.types.BlockBody', null, global);
	  goog.exportSymbol('proto.types.BlockHeader', null, global);
	  goog.exportSymbol('proto.types.FnArgument', null, global);
	  goog.exportSymbol('proto.types.Function', null, global);
	  goog.exportSymbol('proto.types.Query', null, global);
	  goog.exportSymbol('proto.types.Receipt', null, global);
	  goog.exportSymbol('proto.types.State', null, global);
	  goog.exportSymbol('proto.types.StateProof', null, global);
	  goog.exportSymbol('proto.types.Tx', null, global);
	  goog.exportSymbol('proto.types.TxBody', null, global);
	  goog.exportSymbol('proto.types.TxIdx', null, global);
	  goog.exportSymbol('proto.types.TxInBlock', null, global);
	  goog.exportSymbol('proto.types.TxList', null, global);
	  goog.exportSymbol('proto.types.TxType', null, global);
	  /**
	   * Generated by JsPbCodeGenerator.
	   * @param {Array=} opt_data Optional initial data array, typically from a
	   * server response, or constructed directly in Javascript. The array is used
	   * in place and becomes part of the constructed object. It is not cloned.
	   * If no data is provided, the constructed object will be empty, but still
	   * valid.
	   * @extends {jspb.Message}
	   * @constructor
	   */

	  proto.types.Block = function (opt_data) {
	    googleProtobuf.Message.initialize(this, opt_data, 0, -1, null, null);
	  };

	  goog.inherits(proto.types.Block, googleProtobuf.Message);

	  if (googleProtobuf.Message.GENERATE_TO_OBJECT) {
	    /**
	     * Creates an object representation of this proto suitable for use in Soy templates.
	     * Field names that are reserved in JavaScript and will be renamed to pb_name.
	     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	     * For the list of reserved names please see:
	     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
	     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
	     *     for transitional soy proto support: http://goto/soy-param-migration
	     * @return {!Object}
	     */
	    proto.types.Block.prototype.toObject = function (opt_includeInstance) {
	      return proto.types.Block.toObject(opt_includeInstance, this);
	    };
	    /**
	     * Static version of the {@see toObject} method.
	     * @param {boolean|undefined} includeInstance Whether to include the JSPB
	     *     instance for transitional soy proto support:
	     *     http://goto/soy-param-migration
	     * @param {!proto.types.Block} msg The msg instance to transform.
	     * @return {!Object}
	     * @suppress {unusedLocalVariables} f is only used for nested messages
	     */


	    proto.types.Block.toObject = function (includeInstance, msg) {
	      var f,
	          obj = {
	        hash: msg.getHash_asB64(),
	        header: (f = msg.getHeader()) && proto.types.BlockHeader.toObject(includeInstance, f),
	        body: (f = msg.getBody()) && proto.types.BlockBody.toObject(includeInstance, f)
	      };

	      if (includeInstance) {
	        obj.$jspbMessageInstance = msg;
	      }

	      return obj;
	    };
	  }
	  /**
	   * Deserializes binary data (in protobuf wire format).
	   * @param {jspb.ByteSource} bytes The bytes to deserialize.
	   * @return {!proto.types.Block}
	   */


	  proto.types.Block.deserializeBinary = function (bytes) {
	    var reader = new googleProtobuf.BinaryReader(bytes);
	    var msg = new proto.types.Block();
	    return proto.types.Block.deserializeBinaryFromReader(msg, reader);
	  };
	  /**
	   * Deserializes binary data (in protobuf wire format) from the
	   * given reader into the given message object.
	   * @param {!proto.types.Block} msg The message object to deserialize into.
	   * @param {!jspb.BinaryReader} reader The BinaryReader to use.
	   * @return {!proto.types.Block}
	   */


	  proto.types.Block.deserializeBinaryFromReader = function (msg, reader) {
	    while (reader.nextField()) {
	      if (reader.isEndGroup()) {
	        break;
	      }

	      var field = reader.getFieldNumber();

	      switch (field) {
	        case 1:
	          var value =
	          /** @type {!Uint8Array} */
	          reader.readBytes();
	          msg.setHash(value);
	          break;

	        case 2:
	          var value = new proto.types.BlockHeader();
	          reader.readMessage(value, proto.types.BlockHeader.deserializeBinaryFromReader);
	          msg.setHeader(value);
	          break;

	        case 3:
	          var value = new proto.types.BlockBody();
	          reader.readMessage(value, proto.types.BlockBody.deserializeBinaryFromReader);
	          msg.setBody(value);
	          break;

	        default:
	          reader.skipField();
	          break;
	      }
	    }

	    return msg;
	  };
	  /**
	   * Serializes the message to binary data (in protobuf wire format).
	   * @return {!Uint8Array}
	   */


	  proto.types.Block.prototype.serializeBinary = function () {
	    var writer = new googleProtobuf.BinaryWriter();
	    proto.types.Block.serializeBinaryToWriter(this, writer);
	    return writer.getResultBuffer();
	  };
	  /**
	   * Serializes the given message to binary data (in protobuf wire
	   * format), writing to the given BinaryWriter.
	   * @param {!proto.types.Block} message
	   * @param {!jspb.BinaryWriter} writer
	   * @suppress {unusedLocalVariables} f is only used for nested messages
	   */


	  proto.types.Block.serializeBinaryToWriter = function (message, writer) {
	    var f = undefined;
	    f = message.getHash_asU8();

	    if (f.length > 0) {
	      writer.writeBytes(1, f);
	    }

	    f = message.getHeader();

	    if (f != null) {
	      writer.writeMessage(2, f, proto.types.BlockHeader.serializeBinaryToWriter);
	    }

	    f = message.getBody();

	    if (f != null) {
	      writer.writeMessage(3, f, proto.types.BlockBody.serializeBinaryToWriter);
	    }
	  };
	  /**
	   * optional bytes hash = 1;
	   * @return {!(string|Uint8Array)}
	   */


	  proto.types.Block.prototype.getHash = function () {
	    return (
	      /** @type {!(string|Uint8Array)} */
	      googleProtobuf.Message.getFieldWithDefault(this, 1, "")
	    );
	  };
	  /**
	   * optional bytes hash = 1;
	   * This is a type-conversion wrapper around `getHash()`
	   * @return {string}
	   */


	  proto.types.Block.prototype.getHash_asB64 = function () {
	    return (
	      /** @type {string} */
	      googleProtobuf.Message.bytesAsB64(this.getHash())
	    );
	  };
	  /**
	   * optional bytes hash = 1;
	   * Note that Uint8Array is not supported on all browsers.
	   * @see http://caniuse.com/Uint8Array
	   * This is a type-conversion wrapper around `getHash()`
	   * @return {!Uint8Array}
	   */


	  proto.types.Block.prototype.getHash_asU8 = function () {
	    return (
	      /** @type {!Uint8Array} */
	      googleProtobuf.Message.bytesAsU8(this.getHash())
	    );
	  };
	  /** @param {!(string|Uint8Array)} value */


	  proto.types.Block.prototype.setHash = function (value) {
	    googleProtobuf.Message.setField(this, 1, value);
	  };
	  /**
	   * optional BlockHeader header = 2;
	   * @return {?proto.types.BlockHeader}
	   */


	  proto.types.Block.prototype.getHeader = function () {
	    return (
	      /** @type{?proto.types.BlockHeader} */
	      googleProtobuf.Message.getWrapperField(this, proto.types.BlockHeader, 2)
	    );
	  };
	  /** @param {?proto.types.BlockHeader|undefined} value */


	  proto.types.Block.prototype.setHeader = function (value) {
	    googleProtobuf.Message.setWrapperField(this, 2, value);
	  };

	  proto.types.Block.prototype.clearHeader = function () {
	    this.setHeader(undefined);
	  };
	  /**
	   * Returns whether this field is set.
	   * @return {!boolean}
	   */


	  proto.types.Block.prototype.hasHeader = function () {
	    return googleProtobuf.Message.getField(this, 2) != null;
	  };
	  /**
	   * optional BlockBody body = 3;
	   * @return {?proto.types.BlockBody}
	   */


	  proto.types.Block.prototype.getBody = function () {
	    return (
	      /** @type{?proto.types.BlockBody} */
	      googleProtobuf.Message.getWrapperField(this, proto.types.BlockBody, 3)
	    );
	  };
	  /** @param {?proto.types.BlockBody|undefined} value */


	  proto.types.Block.prototype.setBody = function (value) {
	    googleProtobuf.Message.setWrapperField(this, 3, value);
	  };

	  proto.types.Block.prototype.clearBody = function () {
	    this.setBody(undefined);
	  };
	  /**
	   * Returns whether this field is set.
	   * @return {!boolean}
	   */


	  proto.types.Block.prototype.hasBody = function () {
	    return googleProtobuf.Message.getField(this, 3) != null;
	  };
	  /**
	   * Generated by JsPbCodeGenerator.
	   * @param {Array=} opt_data Optional initial data array, typically from a
	   * server response, or constructed directly in Javascript. The array is used
	   * in place and becomes part of the constructed object. It is not cloned.
	   * If no data is provided, the constructed object will be empty, but still
	   * valid.
	   * @extends {jspb.Message}
	   * @constructor
	   */


	  proto.types.BlockHeader = function (opt_data) {
	    googleProtobuf.Message.initialize(this, opt_data, 0, -1, null, null);
	  };

	  goog.inherits(proto.types.BlockHeader, googleProtobuf.Message);

	  if (googleProtobuf.Message.GENERATE_TO_OBJECT) {
	    /**
	     * Creates an object representation of this proto suitable for use in Soy templates.
	     * Field names that are reserved in JavaScript and will be renamed to pb_name.
	     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	     * For the list of reserved names please see:
	     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
	     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
	     *     for transitional soy proto support: http://goto/soy-param-migration
	     * @return {!Object}
	     */
	    proto.types.BlockHeader.prototype.toObject = function (opt_includeInstance) {
	      return proto.types.BlockHeader.toObject(opt_includeInstance, this);
	    };
	    /**
	     * Static version of the {@see toObject} method.
	     * @param {boolean|undefined} includeInstance Whether to include the JSPB
	     *     instance for transitional soy proto support:
	     *     http://goto/soy-param-migration
	     * @param {!proto.types.BlockHeader} msg The msg instance to transform.
	     * @return {!Object}
	     * @suppress {unusedLocalVariables} f is only used for nested messages
	     */


	    proto.types.BlockHeader.toObject = function (includeInstance, msg) {
	      var obj = {
	        prevblockhash: msg.getPrevblockhash_asB64(),
	        blockno: googleProtobuf.Message.getFieldWithDefault(msg, 2, 0),
	        timestamp: googleProtobuf.Message.getFieldWithDefault(msg, 3, 0),
	        blocksroothash: msg.getBlocksroothash_asB64(),
	        txsroothash: msg.getTxsroothash_asB64(),
	        receiptsroothash: msg.getReceiptsroothash_asB64(),
	        confirms: googleProtobuf.Message.getFieldWithDefault(msg, 7, 0),
	        pubkey: msg.getPubkey_asB64(),
	        sign: msg.getSign_asB64(),
	        coinbaseaccount: msg.getCoinbaseaccount_asB64()
	      };

	      if (includeInstance) {
	        obj.$jspbMessageInstance = msg;
	      }

	      return obj;
	    };
	  }
	  /**
	   * Deserializes binary data (in protobuf wire format).
	   * @param {jspb.ByteSource} bytes The bytes to deserialize.
	   * @return {!proto.types.BlockHeader}
	   */


	  proto.types.BlockHeader.deserializeBinary = function (bytes) {
	    var reader = new googleProtobuf.BinaryReader(bytes);
	    var msg = new proto.types.BlockHeader();
	    return proto.types.BlockHeader.deserializeBinaryFromReader(msg, reader);
	  };
	  /**
	   * Deserializes binary data (in protobuf wire format) from the
	   * given reader into the given message object.
	   * @param {!proto.types.BlockHeader} msg The message object to deserialize into.
	   * @param {!jspb.BinaryReader} reader The BinaryReader to use.
	   * @return {!proto.types.BlockHeader}
	   */


	  proto.types.BlockHeader.deserializeBinaryFromReader = function (msg, reader) {
	    while (reader.nextField()) {
	      if (reader.isEndGroup()) {
	        break;
	      }

	      var field = reader.getFieldNumber();

	      switch (field) {
	        case 1:
	          var value =
	          /** @type {!Uint8Array} */
	          reader.readBytes();
	          msg.setPrevblockhash(value);
	          break;

	        case 2:
	          var value =
	          /** @type {number} */
	          reader.readUint64();
	          msg.setBlockno(value);
	          break;

	        case 3:
	          var value =
	          /** @type {number} */
	          reader.readInt64();
	          msg.setTimestamp(value);
	          break;

	        case 4:
	          var value =
	          /** @type {!Uint8Array} */
	          reader.readBytes();
	          msg.setBlocksroothash(value);
	          break;

	        case 5:
	          var value =
	          /** @type {!Uint8Array} */
	          reader.readBytes();
	          msg.setTxsroothash(value);
	          break;

	        case 6:
	          var value =
	          /** @type {!Uint8Array} */
	          reader.readBytes();
	          msg.setReceiptsroothash(value);
	          break;

	        case 7:
	          var value =
	          /** @type {number} */
	          reader.readUint64();
	          msg.setConfirms(value);
	          break;

	        case 8:
	          var value =
	          /** @type {!Uint8Array} */
	          reader.readBytes();
	          msg.setPubkey(value);
	          break;

	        case 9:
	          var value =
	          /** @type {!Uint8Array} */
	          reader.readBytes();
	          msg.setSign(value);
	          break;

	        case 10:
	          var value =
	          /** @type {!Uint8Array} */
	          reader.readBytes();
	          msg.setCoinbaseaccount(value);
	          break;

	        default:
	          reader.skipField();
	          break;
	      }
	    }

	    return msg;
	  };
	  /**
	   * Serializes the message to binary data (in protobuf wire format).
	   * @return {!Uint8Array}
	   */


	  proto.types.BlockHeader.prototype.serializeBinary = function () {
	    var writer = new googleProtobuf.BinaryWriter();
	    proto.types.BlockHeader.serializeBinaryToWriter(this, writer);
	    return writer.getResultBuffer();
	  };
	  /**
	   * Serializes the given message to binary data (in protobuf wire
	   * format), writing to the given BinaryWriter.
	   * @param {!proto.types.BlockHeader} message
	   * @param {!jspb.BinaryWriter} writer
	   * @suppress {unusedLocalVariables} f is only used for nested messages
	   */


	  proto.types.BlockHeader.serializeBinaryToWriter = function (message, writer) {
	    var f = undefined;
	    f = message.getPrevblockhash_asU8();

	    if (f.length > 0) {
	      writer.writeBytes(1, f);
	    }

	    f = message.getBlockno();

	    if (f !== 0) {
	      writer.writeUint64(2, f);
	    }

	    f = message.getTimestamp();

	    if (f !== 0) {
	      writer.writeInt64(3, f);
	    }

	    f = message.getBlocksroothash_asU8();

	    if (f.length > 0) {
	      writer.writeBytes(4, f);
	    }

	    f = message.getTxsroothash_asU8();

	    if (f.length > 0) {
	      writer.writeBytes(5, f);
	    }

	    f = message.getReceiptsroothash_asU8();

	    if (f.length > 0) {
	      writer.writeBytes(6, f);
	    }

	    f = message.getConfirms();

	    if (f !== 0) {
	      writer.writeUint64(7, f);
	    }

	    f = message.getPubkey_asU8();

	    if (f.length > 0) {
	      writer.writeBytes(8, f);
	    }

	    f = message.getSign_asU8();

	    if (f.length > 0) {
	      writer.writeBytes(9, f);
	    }

	    f = message.getCoinbaseaccount_asU8();

	    if (f.length > 0) {
	      writer.writeBytes(10, f);
	    }
	  };
	  /**
	   * optional bytes prevBlockHash = 1;
	   * @return {!(string|Uint8Array)}
	   */


	  proto.types.BlockHeader.prototype.getPrevblockhash = function () {
	    return (
	      /** @type {!(string|Uint8Array)} */
	      googleProtobuf.Message.getFieldWithDefault(this, 1, "")
	    );
	  };
	  /**
	   * optional bytes prevBlockHash = 1;
	   * This is a type-conversion wrapper around `getPrevblockhash()`
	   * @return {string}
	   */


	  proto.types.BlockHeader.prototype.getPrevblockhash_asB64 = function () {
	    return (
	      /** @type {string} */
	      googleProtobuf.Message.bytesAsB64(this.getPrevblockhash())
	    );
	  };
	  /**
	   * optional bytes prevBlockHash = 1;
	   * Note that Uint8Array is not supported on all browsers.
	   * @see http://caniuse.com/Uint8Array
	   * This is a type-conversion wrapper around `getPrevblockhash()`
	   * @return {!Uint8Array}
	   */


	  proto.types.BlockHeader.prototype.getPrevblockhash_asU8 = function () {
	    return (
	      /** @type {!Uint8Array} */
	      googleProtobuf.Message.bytesAsU8(this.getPrevblockhash())
	    );
	  };
	  /** @param {!(string|Uint8Array)} value */


	  proto.types.BlockHeader.prototype.setPrevblockhash = function (value) {
	    googleProtobuf.Message.setField(this, 1, value);
	  };
	  /**
	   * optional uint64 blockNo = 2;
	   * @return {number}
	   */


	  proto.types.BlockHeader.prototype.getBlockno = function () {
	    return (
	      /** @type {number} */
	      googleProtobuf.Message.getFieldWithDefault(this, 2, 0)
	    );
	  };
	  /** @param {number} value */


	  proto.types.BlockHeader.prototype.setBlockno = function (value) {
	    googleProtobuf.Message.setField(this, 2, value);
	  };
	  /**
	   * optional int64 timestamp = 3;
	   * @return {number}
	   */


	  proto.types.BlockHeader.prototype.getTimestamp = function () {
	    return (
	      /** @type {number} */
	      googleProtobuf.Message.getFieldWithDefault(this, 3, 0)
	    );
	  };
	  /** @param {number} value */


	  proto.types.BlockHeader.prototype.setTimestamp = function (value) {
	    googleProtobuf.Message.setField(this, 3, value);
	  };
	  /**
	   * optional bytes blocksRootHash = 4;
	   * @return {!(string|Uint8Array)}
	   */


	  proto.types.BlockHeader.prototype.getBlocksroothash = function () {
	    return (
	      /** @type {!(string|Uint8Array)} */
	      googleProtobuf.Message.getFieldWithDefault(this, 4, "")
	    );
	  };
	  /**
	   * optional bytes blocksRootHash = 4;
	   * This is a type-conversion wrapper around `getBlocksroothash()`
	   * @return {string}
	   */


	  proto.types.BlockHeader.prototype.getBlocksroothash_asB64 = function () {
	    return (
	      /** @type {string} */
	      googleProtobuf.Message.bytesAsB64(this.getBlocksroothash())
	    );
	  };
	  /**
	   * optional bytes blocksRootHash = 4;
	   * Note that Uint8Array is not supported on all browsers.
	   * @see http://caniuse.com/Uint8Array
	   * This is a type-conversion wrapper around `getBlocksroothash()`
	   * @return {!Uint8Array}
	   */


	  proto.types.BlockHeader.prototype.getBlocksroothash_asU8 = function () {
	    return (
	      /** @type {!Uint8Array} */
	      googleProtobuf.Message.bytesAsU8(this.getBlocksroothash())
	    );
	  };
	  /** @param {!(string|Uint8Array)} value */


	  proto.types.BlockHeader.prototype.setBlocksroothash = function (value) {
	    googleProtobuf.Message.setField(this, 4, value);
	  };
	  /**
	   * optional bytes txsRootHash = 5;
	   * @return {!(string|Uint8Array)}
	   */


	  proto.types.BlockHeader.prototype.getTxsroothash = function () {
	    return (
	      /** @type {!(string|Uint8Array)} */
	      googleProtobuf.Message.getFieldWithDefault(this, 5, "")
	    );
	  };
	  /**
	   * optional bytes txsRootHash = 5;
	   * This is a type-conversion wrapper around `getTxsroothash()`
	   * @return {string}
	   */


	  proto.types.BlockHeader.prototype.getTxsroothash_asB64 = function () {
	    return (
	      /** @type {string} */
	      googleProtobuf.Message.bytesAsB64(this.getTxsroothash())
	    );
	  };
	  /**
	   * optional bytes txsRootHash = 5;
	   * Note that Uint8Array is not supported on all browsers.
	   * @see http://caniuse.com/Uint8Array
	   * This is a type-conversion wrapper around `getTxsroothash()`
	   * @return {!Uint8Array}
	   */


	  proto.types.BlockHeader.prototype.getTxsroothash_asU8 = function () {
	    return (
	      /** @type {!Uint8Array} */
	      googleProtobuf.Message.bytesAsU8(this.getTxsroothash())
	    );
	  };
	  /** @param {!(string|Uint8Array)} value */


	  proto.types.BlockHeader.prototype.setTxsroothash = function (value) {
	    googleProtobuf.Message.setField(this, 5, value);
	  };
	  /**
	   * optional bytes receiptsRootHash = 6;
	   * @return {!(string|Uint8Array)}
	   */


	  proto.types.BlockHeader.prototype.getReceiptsroothash = function () {
	    return (
	      /** @type {!(string|Uint8Array)} */
	      googleProtobuf.Message.getFieldWithDefault(this, 6, "")
	    );
	  };
	  /**
	   * optional bytes receiptsRootHash = 6;
	   * This is a type-conversion wrapper around `getReceiptsroothash()`
	   * @return {string}
	   */


	  proto.types.BlockHeader.prototype.getReceiptsroothash_asB64 = function () {
	    return (
	      /** @type {string} */
	      googleProtobuf.Message.bytesAsB64(this.getReceiptsroothash())
	    );
	  };
	  /**
	   * optional bytes receiptsRootHash = 6;
	   * Note that Uint8Array is not supported on all browsers.
	   * @see http://caniuse.com/Uint8Array
	   * This is a type-conversion wrapper around `getReceiptsroothash()`
	   * @return {!Uint8Array}
	   */


	  proto.types.BlockHeader.prototype.getReceiptsroothash_asU8 = function () {
	    return (
	      /** @type {!Uint8Array} */
	      googleProtobuf.Message.bytesAsU8(this.getReceiptsroothash())
	    );
	  };
	  /** @param {!(string|Uint8Array)} value */


	  proto.types.BlockHeader.prototype.setReceiptsroothash = function (value) {
	    googleProtobuf.Message.setField(this, 6, value);
	  };
	  /**
	   * optional uint64 confirms = 7;
	   * @return {number}
	   */


	  proto.types.BlockHeader.prototype.getConfirms = function () {
	    return (
	      /** @type {number} */
	      googleProtobuf.Message.getFieldWithDefault(this, 7, 0)
	    );
	  };
	  /** @param {number} value */


	  proto.types.BlockHeader.prototype.setConfirms = function (value) {
	    googleProtobuf.Message.setField(this, 7, value);
	  };
	  /**
	   * optional bytes pubKey = 8;
	   * @return {!(string|Uint8Array)}
	   */


	  proto.types.BlockHeader.prototype.getPubkey = function () {
	    return (
	      /** @type {!(string|Uint8Array)} */
	      googleProtobuf.Message.getFieldWithDefault(this, 8, "")
	    );
	  };
	  /**
	   * optional bytes pubKey = 8;
	   * This is a type-conversion wrapper around `getPubkey()`
	   * @return {string}
	   */


	  proto.types.BlockHeader.prototype.getPubkey_asB64 = function () {
	    return (
	      /** @type {string} */
	      googleProtobuf.Message.bytesAsB64(this.getPubkey())
	    );
	  };
	  /**
	   * optional bytes pubKey = 8;
	   * Note that Uint8Array is not supported on all browsers.
	   * @see http://caniuse.com/Uint8Array
	   * This is a type-conversion wrapper around `getPubkey()`
	   * @return {!Uint8Array}
	   */


	  proto.types.BlockHeader.prototype.getPubkey_asU8 = function () {
	    return (
	      /** @type {!Uint8Array} */
	      googleProtobuf.Message.bytesAsU8(this.getPubkey())
	    );
	  };
	  /** @param {!(string|Uint8Array)} value */


	  proto.types.BlockHeader.prototype.setPubkey = function (value) {
	    googleProtobuf.Message.setField(this, 8, value);
	  };
	  /**
	   * optional bytes sign = 9;
	   * @return {!(string|Uint8Array)}
	   */


	  proto.types.BlockHeader.prototype.getSign = function () {
	    return (
	      /** @type {!(string|Uint8Array)} */
	      googleProtobuf.Message.getFieldWithDefault(this, 9, "")
	    );
	  };
	  /**
	   * optional bytes sign = 9;
	   * This is a type-conversion wrapper around `getSign()`
	   * @return {string}
	   */


	  proto.types.BlockHeader.prototype.getSign_asB64 = function () {
	    return (
	      /** @type {string} */
	      googleProtobuf.Message.bytesAsB64(this.getSign())
	    );
	  };
	  /**
	   * optional bytes sign = 9;
	   * Note that Uint8Array is not supported on all browsers.
	   * @see http://caniuse.com/Uint8Array
	   * This is a type-conversion wrapper around `getSign()`
	   * @return {!Uint8Array}
	   */


	  proto.types.BlockHeader.prototype.getSign_asU8 = function () {
	    return (
	      /** @type {!Uint8Array} */
	      googleProtobuf.Message.bytesAsU8(this.getSign())
	    );
	  };
	  /** @param {!(string|Uint8Array)} value */


	  proto.types.BlockHeader.prototype.setSign = function (value) {
	    googleProtobuf.Message.setField(this, 9, value);
	  };
	  /**
	   * optional bytes coinbaseAccount = 10;
	   * @return {!(string|Uint8Array)}
	   */


	  proto.types.BlockHeader.prototype.getCoinbaseaccount = function () {
	    return (
	      /** @type {!(string|Uint8Array)} */
	      googleProtobuf.Message.getFieldWithDefault(this, 10, "")
	    );
	  };
	  /**
	   * optional bytes coinbaseAccount = 10;
	   * This is a type-conversion wrapper around `getCoinbaseaccount()`
	   * @return {string}
	   */


	  proto.types.BlockHeader.prototype.getCoinbaseaccount_asB64 = function () {
	    return (
	      /** @type {string} */
	      googleProtobuf.Message.bytesAsB64(this.getCoinbaseaccount())
	    );
	  };
	  /**
	   * optional bytes coinbaseAccount = 10;
	   * Note that Uint8Array is not supported on all browsers.
	   * @see http://caniuse.com/Uint8Array
	   * This is a type-conversion wrapper around `getCoinbaseaccount()`
	   * @return {!Uint8Array}
	   */


	  proto.types.BlockHeader.prototype.getCoinbaseaccount_asU8 = function () {
	    return (
	      /** @type {!Uint8Array} */
	      googleProtobuf.Message.bytesAsU8(this.getCoinbaseaccount())
	    );
	  };
	  /** @param {!(string|Uint8Array)} value */


	  proto.types.BlockHeader.prototype.setCoinbaseaccount = function (value) {
	    googleProtobuf.Message.setField(this, 10, value);
	  };
	  /**
	   * Generated by JsPbCodeGenerator.
	   * @param {Array=} opt_data Optional initial data array, typically from a
	   * server response, or constructed directly in Javascript. The array is used
	   * in place and becomes part of the constructed object. It is not cloned.
	   * If no data is provided, the constructed object will be empty, but still
	   * valid.
	   * @extends {jspb.Message}
	   * @constructor
	   */


	  proto.types.BlockBody = function (opt_data) {
	    googleProtobuf.Message.initialize(this, opt_data, 0, -1, proto.types.BlockBody.repeatedFields_, null);
	  };

	  goog.inherits(proto.types.BlockBody, googleProtobuf.Message);
	  /**
	   * List of repeated fields within this message type.
	   * @private {!Array<number>}
	   * @const
	   */


	  proto.types.BlockBody.repeatedFields_ = [1];

	  if (googleProtobuf.Message.GENERATE_TO_OBJECT) {
	    /**
	     * Creates an object representation of this proto suitable for use in Soy templates.
	     * Field names that are reserved in JavaScript and will be renamed to pb_name.
	     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	     * For the list of reserved names please see:
	     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
	     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
	     *     for transitional soy proto support: http://goto/soy-param-migration
	     * @return {!Object}
	     */
	    proto.types.BlockBody.prototype.toObject = function (opt_includeInstance) {
	      return proto.types.BlockBody.toObject(opt_includeInstance, this);
	    };
	    /**
	     * Static version of the {@see toObject} method.
	     * @param {boolean|undefined} includeInstance Whether to include the JSPB
	     *     instance for transitional soy proto support:
	     *     http://goto/soy-param-migration
	     * @param {!proto.types.BlockBody} msg The msg instance to transform.
	     * @return {!Object}
	     * @suppress {unusedLocalVariables} f is only used for nested messages
	     */


	    proto.types.BlockBody.toObject = function (includeInstance, msg) {
	      var obj = {
	        txsList: googleProtobuf.Message.toObjectList(msg.getTxsList(), proto.types.Tx.toObject, includeInstance)
	      };

	      if (includeInstance) {
	        obj.$jspbMessageInstance = msg;
	      }

	      return obj;
	    };
	  }
	  /**
	   * Deserializes binary data (in protobuf wire format).
	   * @param {jspb.ByteSource} bytes The bytes to deserialize.
	   * @return {!proto.types.BlockBody}
	   */


	  proto.types.BlockBody.deserializeBinary = function (bytes) {
	    var reader = new googleProtobuf.BinaryReader(bytes);
	    var msg = new proto.types.BlockBody();
	    return proto.types.BlockBody.deserializeBinaryFromReader(msg, reader);
	  };
	  /**
	   * Deserializes binary data (in protobuf wire format) from the
	   * given reader into the given message object.
	   * @param {!proto.types.BlockBody} msg The message object to deserialize into.
	   * @param {!jspb.BinaryReader} reader The BinaryReader to use.
	   * @return {!proto.types.BlockBody}
	   */


	  proto.types.BlockBody.deserializeBinaryFromReader = function (msg, reader) {
	    while (reader.nextField()) {
	      if (reader.isEndGroup()) {
	        break;
	      }

	      var field = reader.getFieldNumber();

	      switch (field) {
	        case 1:
	          var value = new proto.types.Tx();
	          reader.readMessage(value, proto.types.Tx.deserializeBinaryFromReader);
	          msg.addTxs(value);
	          break;

	        default:
	          reader.skipField();
	          break;
	      }
	    }

	    return msg;
	  };
	  /**
	   * Serializes the message to binary data (in protobuf wire format).
	   * @return {!Uint8Array}
	   */


	  proto.types.BlockBody.prototype.serializeBinary = function () {
	    var writer = new googleProtobuf.BinaryWriter();
	    proto.types.BlockBody.serializeBinaryToWriter(this, writer);
	    return writer.getResultBuffer();
	  };
	  /**
	   * Serializes the given message to binary data (in protobuf wire
	   * format), writing to the given BinaryWriter.
	   * @param {!proto.types.BlockBody} message
	   * @param {!jspb.BinaryWriter} writer
	   * @suppress {unusedLocalVariables} f is only used for nested messages
	   */


	  proto.types.BlockBody.serializeBinaryToWriter = function (message, writer) {
	    var f = undefined;
	    f = message.getTxsList();

	    if (f.length > 0) {
	      writer.writeRepeatedMessage(1, f, proto.types.Tx.serializeBinaryToWriter);
	    }
	  };
	  /**
	   * repeated Tx txs = 1;
	   * @return {!Array.<!proto.types.Tx>}
	   */


	  proto.types.BlockBody.prototype.getTxsList = function () {
	    return (
	      /** @type{!Array.<!proto.types.Tx>} */
	      googleProtobuf.Message.getRepeatedWrapperField(this, proto.types.Tx, 1)
	    );
	  };
	  /** @param {!Array.<!proto.types.Tx>} value */


	  proto.types.BlockBody.prototype.setTxsList = function (value) {
	    googleProtobuf.Message.setRepeatedWrapperField(this, 1, value);
	  };
	  /**
	   * @param {!proto.types.Tx=} opt_value
	   * @param {number=} opt_index
	   * @return {!proto.types.Tx}
	   */


	  proto.types.BlockBody.prototype.addTxs = function (opt_value, opt_index) {
	    return googleProtobuf.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.types.Tx, opt_index);
	  };

	  proto.types.BlockBody.prototype.clearTxsList = function () {
	    this.setTxsList([]);
	  };
	  /**
	   * Generated by JsPbCodeGenerator.
	   * @param {Array=} opt_data Optional initial data array, typically from a
	   * server response, or constructed directly in Javascript. The array is used
	   * in place and becomes part of the constructed object. It is not cloned.
	   * If no data is provided, the constructed object will be empty, but still
	   * valid.
	   * @extends {jspb.Message}
	   * @constructor
	   */


	  proto.types.TxList = function (opt_data) {
	    googleProtobuf.Message.initialize(this, opt_data, 0, -1, proto.types.TxList.repeatedFields_, null);
	  };

	  goog.inherits(proto.types.TxList, googleProtobuf.Message);
	  /**
	   * List of repeated fields within this message type.
	   * @private {!Array<number>}
	   * @const
	   */


	  proto.types.TxList.repeatedFields_ = [1];

	  if (googleProtobuf.Message.GENERATE_TO_OBJECT) {
	    /**
	     * Creates an object representation of this proto suitable for use in Soy templates.
	     * Field names that are reserved in JavaScript and will be renamed to pb_name.
	     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	     * For the list of reserved names please see:
	     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
	     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
	     *     for transitional soy proto support: http://goto/soy-param-migration
	     * @return {!Object}
	     */
	    proto.types.TxList.prototype.toObject = function (opt_includeInstance) {
	      return proto.types.TxList.toObject(opt_includeInstance, this);
	    };
	    /**
	     * Static version of the {@see toObject} method.
	     * @param {boolean|undefined} includeInstance Whether to include the JSPB
	     *     instance for transitional soy proto support:
	     *     http://goto/soy-param-migration
	     * @param {!proto.types.TxList} msg The msg instance to transform.
	     * @return {!Object}
	     * @suppress {unusedLocalVariables} f is only used for nested messages
	     */


	    proto.types.TxList.toObject = function (includeInstance, msg) {
	      var obj = {
	        txsList: googleProtobuf.Message.toObjectList(msg.getTxsList(), proto.types.Tx.toObject, includeInstance)
	      };

	      if (includeInstance) {
	        obj.$jspbMessageInstance = msg;
	      }

	      return obj;
	    };
	  }
	  /**
	   * Deserializes binary data (in protobuf wire format).
	   * @param {jspb.ByteSource} bytes The bytes to deserialize.
	   * @return {!proto.types.TxList}
	   */


	  proto.types.TxList.deserializeBinary = function (bytes) {
	    var reader = new googleProtobuf.BinaryReader(bytes);
	    var msg = new proto.types.TxList();
	    return proto.types.TxList.deserializeBinaryFromReader(msg, reader);
	  };
	  /**
	   * Deserializes binary data (in protobuf wire format) from the
	   * given reader into the given message object.
	   * @param {!proto.types.TxList} msg The message object to deserialize into.
	   * @param {!jspb.BinaryReader} reader The BinaryReader to use.
	   * @return {!proto.types.TxList}
	   */


	  proto.types.TxList.deserializeBinaryFromReader = function (msg, reader) {
	    while (reader.nextField()) {
	      if (reader.isEndGroup()) {
	        break;
	      }

	      var field = reader.getFieldNumber();

	      switch (field) {
	        case 1:
	          var value = new proto.types.Tx();
	          reader.readMessage(value, proto.types.Tx.deserializeBinaryFromReader);
	          msg.addTxs(value);
	          break;

	        default:
	          reader.skipField();
	          break;
	      }
	    }

	    return msg;
	  };
	  /**
	   * Serializes the message to binary data (in protobuf wire format).
	   * @return {!Uint8Array}
	   */


	  proto.types.TxList.prototype.serializeBinary = function () {
	    var writer = new googleProtobuf.BinaryWriter();
	    proto.types.TxList.serializeBinaryToWriter(this, writer);
	    return writer.getResultBuffer();
	  };
	  /**
	   * Serializes the given message to binary data (in protobuf wire
	   * format), writing to the given BinaryWriter.
	   * @param {!proto.types.TxList} message
	   * @param {!jspb.BinaryWriter} writer
	   * @suppress {unusedLocalVariables} f is only used for nested messages
	   */


	  proto.types.TxList.serializeBinaryToWriter = function (message, writer) {
	    var f = undefined;
	    f = message.getTxsList();

	    if (f.length > 0) {
	      writer.writeRepeatedMessage(1, f, proto.types.Tx.serializeBinaryToWriter);
	    }
	  };
	  /**
	   * repeated Tx txs = 1;
	   * @return {!Array.<!proto.types.Tx>}
	   */


	  proto.types.TxList.prototype.getTxsList = function () {
	    return (
	      /** @type{!Array.<!proto.types.Tx>} */
	      googleProtobuf.Message.getRepeatedWrapperField(this, proto.types.Tx, 1)
	    );
	  };
	  /** @param {!Array.<!proto.types.Tx>} value */


	  proto.types.TxList.prototype.setTxsList = function (value) {
	    googleProtobuf.Message.setRepeatedWrapperField(this, 1, value);
	  };
	  /**
	   * @param {!proto.types.Tx=} opt_value
	   * @param {number=} opt_index
	   * @return {!proto.types.Tx}
	   */


	  proto.types.TxList.prototype.addTxs = function (opt_value, opt_index) {
	    return googleProtobuf.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.types.Tx, opt_index);
	  };

	  proto.types.TxList.prototype.clearTxsList = function () {
	    this.setTxsList([]);
	  };
	  /**
	   * Generated by JsPbCodeGenerator.
	   * @param {Array=} opt_data Optional initial data array, typically from a
	   * server response, or constructed directly in Javascript. The array is used
	   * in place and becomes part of the constructed object. It is not cloned.
	   * If no data is provided, the constructed object will be empty, but still
	   * valid.
	   * @extends {jspb.Message}
	   * @constructor
	   */


	  proto.types.Tx = function (opt_data) {
	    googleProtobuf.Message.initialize(this, opt_data, 0, -1, null, null);
	  };

	  goog.inherits(proto.types.Tx, googleProtobuf.Message);

	  if (googleProtobuf.Message.GENERATE_TO_OBJECT) {
	    /**
	     * Creates an object representation of this proto suitable for use in Soy templates.
	     * Field names that are reserved in JavaScript and will be renamed to pb_name.
	     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	     * For the list of reserved names please see:
	     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
	     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
	     *     for transitional soy proto support: http://goto/soy-param-migration
	     * @return {!Object}
	     */
	    proto.types.Tx.prototype.toObject = function (opt_includeInstance) {
	      return proto.types.Tx.toObject(opt_includeInstance, this);
	    };
	    /**
	     * Static version of the {@see toObject} method.
	     * @param {boolean|undefined} includeInstance Whether to include the JSPB
	     *     instance for transitional soy proto support:
	     *     http://goto/soy-param-migration
	     * @param {!proto.types.Tx} msg The msg instance to transform.
	     * @return {!Object}
	     * @suppress {unusedLocalVariables} f is only used for nested messages
	     */


	    proto.types.Tx.toObject = function (includeInstance, msg) {
	      var f,
	          obj = {
	        hash: msg.getHash_asB64(),
	        body: (f = msg.getBody()) && proto.types.TxBody.toObject(includeInstance, f)
	      };

	      if (includeInstance) {
	        obj.$jspbMessageInstance = msg;
	      }

	      return obj;
	    };
	  }
	  /**
	   * Deserializes binary data (in protobuf wire format).
	   * @param {jspb.ByteSource} bytes The bytes to deserialize.
	   * @return {!proto.types.Tx}
	   */


	  proto.types.Tx.deserializeBinary = function (bytes) {
	    var reader = new googleProtobuf.BinaryReader(bytes);
	    var msg = new proto.types.Tx();
	    return proto.types.Tx.deserializeBinaryFromReader(msg, reader);
	  };
	  /**
	   * Deserializes binary data (in protobuf wire format) from the
	   * given reader into the given message object.
	   * @param {!proto.types.Tx} msg The message object to deserialize into.
	   * @param {!jspb.BinaryReader} reader The BinaryReader to use.
	   * @return {!proto.types.Tx}
	   */


	  proto.types.Tx.deserializeBinaryFromReader = function (msg, reader) {
	    while (reader.nextField()) {
	      if (reader.isEndGroup()) {
	        break;
	      }

	      var field = reader.getFieldNumber();

	      switch (field) {
	        case 1:
	          var value =
	          /** @type {!Uint8Array} */
	          reader.readBytes();
	          msg.setHash(value);
	          break;

	        case 2:
	          var value = new proto.types.TxBody();
	          reader.readMessage(value, proto.types.TxBody.deserializeBinaryFromReader);
	          msg.setBody(value);
	          break;

	        default:
	          reader.skipField();
	          break;
	      }
	    }

	    return msg;
	  };
	  /**
	   * Serializes the message to binary data (in protobuf wire format).
	   * @return {!Uint8Array}
	   */


	  proto.types.Tx.prototype.serializeBinary = function () {
	    var writer = new googleProtobuf.BinaryWriter();
	    proto.types.Tx.serializeBinaryToWriter(this, writer);
	    return writer.getResultBuffer();
	  };
	  /**
	   * Serializes the given message to binary data (in protobuf wire
	   * format), writing to the given BinaryWriter.
	   * @param {!proto.types.Tx} message
	   * @param {!jspb.BinaryWriter} writer
	   * @suppress {unusedLocalVariables} f is only used for nested messages
	   */


	  proto.types.Tx.serializeBinaryToWriter = function (message, writer) {
	    var f = undefined;
	    f = message.getHash_asU8();

	    if (f.length > 0) {
	      writer.writeBytes(1, f);
	    }

	    f = message.getBody();

	    if (f != null) {
	      writer.writeMessage(2, f, proto.types.TxBody.serializeBinaryToWriter);
	    }
	  };
	  /**
	   * optional bytes hash = 1;
	   * @return {!(string|Uint8Array)}
	   */


	  proto.types.Tx.prototype.getHash = function () {
	    return (
	      /** @type {!(string|Uint8Array)} */
	      googleProtobuf.Message.getFieldWithDefault(this, 1, "")
	    );
	  };
	  /**
	   * optional bytes hash = 1;
	   * This is a type-conversion wrapper around `getHash()`
	   * @return {string}
	   */


	  proto.types.Tx.prototype.getHash_asB64 = function () {
	    return (
	      /** @type {string} */
	      googleProtobuf.Message.bytesAsB64(this.getHash())
	    );
	  };
	  /**
	   * optional bytes hash = 1;
	   * Note that Uint8Array is not supported on all browsers.
	   * @see http://caniuse.com/Uint8Array
	   * This is a type-conversion wrapper around `getHash()`
	   * @return {!Uint8Array}
	   */


	  proto.types.Tx.prototype.getHash_asU8 = function () {
	    return (
	      /** @type {!Uint8Array} */
	      googleProtobuf.Message.bytesAsU8(this.getHash())
	    );
	  };
	  /** @param {!(string|Uint8Array)} value */


	  proto.types.Tx.prototype.setHash = function (value) {
	    googleProtobuf.Message.setField(this, 1, value);
	  };
	  /**
	   * optional TxBody body = 2;
	   * @return {?proto.types.TxBody}
	   */


	  proto.types.Tx.prototype.getBody = function () {
	    return (
	      /** @type{?proto.types.TxBody} */
	      googleProtobuf.Message.getWrapperField(this, proto.types.TxBody, 2)
	    );
	  };
	  /** @param {?proto.types.TxBody|undefined} value */


	  proto.types.Tx.prototype.setBody = function (value) {
	    googleProtobuf.Message.setWrapperField(this, 2, value);
	  };

	  proto.types.Tx.prototype.clearBody = function () {
	    this.setBody(undefined);
	  };
	  /**
	   * Returns whether this field is set.
	   * @return {!boolean}
	   */


	  proto.types.Tx.prototype.hasBody = function () {
	    return googleProtobuf.Message.getField(this, 2) != null;
	  };
	  /**
	   * Generated by JsPbCodeGenerator.
	   * @param {Array=} opt_data Optional initial data array, typically from a
	   * server response, or constructed directly in Javascript. The array is used
	   * in place and becomes part of the constructed object. It is not cloned.
	   * If no data is provided, the constructed object will be empty, but still
	   * valid.
	   * @extends {jspb.Message}
	   * @constructor
	   */


	  proto.types.TxBody = function (opt_data) {
	    googleProtobuf.Message.initialize(this, opt_data, 0, -1, null, null);
	  };

	  goog.inherits(proto.types.TxBody, googleProtobuf.Message);

	  if (googleProtobuf.Message.GENERATE_TO_OBJECT) {
	    /**
	     * Creates an object representation of this proto suitable for use in Soy templates.
	     * Field names that are reserved in JavaScript and will be renamed to pb_name.
	     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	     * For the list of reserved names please see:
	     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
	     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
	     *     for transitional soy proto support: http://goto/soy-param-migration
	     * @return {!Object}
	     */
	    proto.types.TxBody.prototype.toObject = function (opt_includeInstance) {
	      return proto.types.TxBody.toObject(opt_includeInstance, this);
	    };
	    /**
	     * Static version of the {@see toObject} method.
	     * @param {boolean|undefined} includeInstance Whether to include the JSPB
	     *     instance for transitional soy proto support:
	     *     http://goto/soy-param-migration
	     * @param {!proto.types.TxBody} msg The msg instance to transform.
	     * @return {!Object}
	     * @suppress {unusedLocalVariables} f is only used for nested messages
	     */


	    proto.types.TxBody.toObject = function (includeInstance, msg) {
	      var obj = {
	        nonce: googleProtobuf.Message.getFieldWithDefault(msg, 1, 0),
	        account: msg.getAccount_asB64(),
	        recipient: msg.getRecipient_asB64(),
	        amount: googleProtobuf.Message.getFieldWithDefault(msg, 4, 0),
	        payload: msg.getPayload_asB64(),
	        limit: googleProtobuf.Message.getFieldWithDefault(msg, 6, 0),
	        price: googleProtobuf.Message.getFieldWithDefault(msg, 7, 0),
	        type: googleProtobuf.Message.getFieldWithDefault(msg, 8, 0),
	        sign: msg.getSign_asB64()
	      };

	      if (includeInstance) {
	        obj.$jspbMessageInstance = msg;
	      }

	      return obj;
	    };
	  }
	  /**
	   * Deserializes binary data (in protobuf wire format).
	   * @param {jspb.ByteSource} bytes The bytes to deserialize.
	   * @return {!proto.types.TxBody}
	   */


	  proto.types.TxBody.deserializeBinary = function (bytes) {
	    var reader = new googleProtobuf.BinaryReader(bytes);
	    var msg = new proto.types.TxBody();
	    return proto.types.TxBody.deserializeBinaryFromReader(msg, reader);
	  };
	  /**
	   * Deserializes binary data (in protobuf wire format) from the
	   * given reader into the given message object.
	   * @param {!proto.types.TxBody} msg The message object to deserialize into.
	   * @param {!jspb.BinaryReader} reader The BinaryReader to use.
	   * @return {!proto.types.TxBody}
	   */


	  proto.types.TxBody.deserializeBinaryFromReader = function (msg, reader) {
	    while (reader.nextField()) {
	      if (reader.isEndGroup()) {
	        break;
	      }

	      var field = reader.getFieldNumber();

	      switch (field) {
	        case 1:
	          var value =
	          /** @type {number} */
	          reader.readUint64();
	          msg.setNonce(value);
	          break;

	        case 2:
	          var value =
	          /** @type {!Uint8Array} */
	          reader.readBytes();
	          msg.setAccount(value);
	          break;

	        case 3:
	          var value =
	          /** @type {!Uint8Array} */
	          reader.readBytes();
	          msg.setRecipient(value);
	          break;

	        case 4:
	          var value =
	          /** @type {number} */
	          reader.readUint64();
	          msg.setAmount(value);
	          break;

	        case 5:
	          var value =
	          /** @type {!Uint8Array} */
	          reader.readBytes();
	          msg.setPayload(value);
	          break;

	        case 6:
	          var value =
	          /** @type {number} */
	          reader.readUint64();
	          msg.setLimit(value);
	          break;

	        case 7:
	          var value =
	          /** @type {number} */
	          reader.readUint64();
	          msg.setPrice(value);
	          break;

	        case 8:
	          var value =
	          /** @type {!proto.types.TxType} */
	          reader.readEnum();
	          msg.setType(value);
	          break;

	        case 9:
	          var value =
	          /** @type {!Uint8Array} */
	          reader.readBytes();
	          msg.setSign(value);
	          break;

	        default:
	          reader.skipField();
	          break;
	      }
	    }

	    return msg;
	  };
	  /**
	   * Serializes the message to binary data (in protobuf wire format).
	   * @return {!Uint8Array}
	   */


	  proto.types.TxBody.prototype.serializeBinary = function () {
	    var writer = new googleProtobuf.BinaryWriter();
	    proto.types.TxBody.serializeBinaryToWriter(this, writer);
	    return writer.getResultBuffer();
	  };
	  /**
	   * Serializes the given message to binary data (in protobuf wire
	   * format), writing to the given BinaryWriter.
	   * @param {!proto.types.TxBody} message
	   * @param {!jspb.BinaryWriter} writer
	   * @suppress {unusedLocalVariables} f is only used for nested messages
	   */


	  proto.types.TxBody.serializeBinaryToWriter = function (message, writer) {
	    var f = undefined;
	    f = message.getNonce();

	    if (f !== 0) {
	      writer.writeUint64(1, f);
	    }

	    f = message.getAccount_asU8();

	    if (f.length > 0) {
	      writer.writeBytes(2, f);
	    }

	    f = message.getRecipient_asU8();

	    if (f.length > 0) {
	      writer.writeBytes(3, f);
	    }

	    f = message.getAmount();

	    if (f !== 0) {
	      writer.writeUint64(4, f);
	    }

	    f = message.getPayload_asU8();

	    if (f.length > 0) {
	      writer.writeBytes(5, f);
	    }

	    f = message.getLimit();

	    if (f !== 0) {
	      writer.writeUint64(6, f);
	    }

	    f = message.getPrice();

	    if (f !== 0) {
	      writer.writeUint64(7, f);
	    }

	    f = message.getType();

	    if (f !== 0.0) {
	      writer.writeEnum(8, f);
	    }

	    f = message.getSign_asU8();

	    if (f.length > 0) {
	      writer.writeBytes(9, f);
	    }
	  };
	  /**
	   * optional uint64 nonce = 1;
	   * @return {number}
	   */


	  proto.types.TxBody.prototype.getNonce = function () {
	    return (
	      /** @type {number} */
	      googleProtobuf.Message.getFieldWithDefault(this, 1, 0)
	    );
	  };
	  /** @param {number} value */


	  proto.types.TxBody.prototype.setNonce = function (value) {
	    googleProtobuf.Message.setField(this, 1, value);
	  };
	  /**
	   * optional bytes account = 2;
	   * @return {!(string|Uint8Array)}
	   */


	  proto.types.TxBody.prototype.getAccount = function () {
	    return (
	      /** @type {!(string|Uint8Array)} */
	      googleProtobuf.Message.getFieldWithDefault(this, 2, "")
	    );
	  };
	  /**
	   * optional bytes account = 2;
	   * This is a type-conversion wrapper around `getAccount()`
	   * @return {string}
	   */


	  proto.types.TxBody.prototype.getAccount_asB64 = function () {
	    return (
	      /** @type {string} */
	      googleProtobuf.Message.bytesAsB64(this.getAccount())
	    );
	  };
	  /**
	   * optional bytes account = 2;
	   * Note that Uint8Array is not supported on all browsers.
	   * @see http://caniuse.com/Uint8Array
	   * This is a type-conversion wrapper around `getAccount()`
	   * @return {!Uint8Array}
	   */


	  proto.types.TxBody.prototype.getAccount_asU8 = function () {
	    return (
	      /** @type {!Uint8Array} */
	      googleProtobuf.Message.bytesAsU8(this.getAccount())
	    );
	  };
	  /** @param {!(string|Uint8Array)} value */


	  proto.types.TxBody.prototype.setAccount = function (value) {
	    googleProtobuf.Message.setField(this, 2, value);
	  };
	  /**
	   * optional bytes recipient = 3;
	   * @return {!(string|Uint8Array)}
	   */


	  proto.types.TxBody.prototype.getRecipient = function () {
	    return (
	      /** @type {!(string|Uint8Array)} */
	      googleProtobuf.Message.getFieldWithDefault(this, 3, "")
	    );
	  };
	  /**
	   * optional bytes recipient = 3;
	   * This is a type-conversion wrapper around `getRecipient()`
	   * @return {string}
	   */


	  proto.types.TxBody.prototype.getRecipient_asB64 = function () {
	    return (
	      /** @type {string} */
	      googleProtobuf.Message.bytesAsB64(this.getRecipient())
	    );
	  };
	  /**
	   * optional bytes recipient = 3;
	   * Note that Uint8Array is not supported on all browsers.
	   * @see http://caniuse.com/Uint8Array
	   * This is a type-conversion wrapper around `getRecipient()`
	   * @return {!Uint8Array}
	   */


	  proto.types.TxBody.prototype.getRecipient_asU8 = function () {
	    return (
	      /** @type {!Uint8Array} */
	      googleProtobuf.Message.bytesAsU8(this.getRecipient())
	    );
	  };
	  /** @param {!(string|Uint8Array)} value */


	  proto.types.TxBody.prototype.setRecipient = function (value) {
	    googleProtobuf.Message.setField(this, 3, value);
	  };
	  /**
	   * optional uint64 amount = 4;
	   * @return {number}
	   */


	  proto.types.TxBody.prototype.getAmount = function () {
	    return (
	      /** @type {number} */
	      googleProtobuf.Message.getFieldWithDefault(this, 4, 0)
	    );
	  };
	  /** @param {number} value */


	  proto.types.TxBody.prototype.setAmount = function (value) {
	    googleProtobuf.Message.setField(this, 4, value);
	  };
	  /**
	   * optional bytes payload = 5;
	   * @return {!(string|Uint8Array)}
	   */


	  proto.types.TxBody.prototype.getPayload = function () {
	    return (
	      /** @type {!(string|Uint8Array)} */
	      googleProtobuf.Message.getFieldWithDefault(this, 5, "")
	    );
	  };
	  /**
	   * optional bytes payload = 5;
	   * This is a type-conversion wrapper around `getPayload()`
	   * @return {string}
	   */


	  proto.types.TxBody.prototype.getPayload_asB64 = function () {
	    return (
	      /** @type {string} */
	      googleProtobuf.Message.bytesAsB64(this.getPayload())
	    );
	  };
	  /**
	   * optional bytes payload = 5;
	   * Note that Uint8Array is not supported on all browsers.
	   * @see http://caniuse.com/Uint8Array
	   * This is a type-conversion wrapper around `getPayload()`
	   * @return {!Uint8Array}
	   */


	  proto.types.TxBody.prototype.getPayload_asU8 = function () {
	    return (
	      /** @type {!Uint8Array} */
	      googleProtobuf.Message.bytesAsU8(this.getPayload())
	    );
	  };
	  /** @param {!(string|Uint8Array)} value */


	  proto.types.TxBody.prototype.setPayload = function (value) {
	    googleProtobuf.Message.setField(this, 5, value);
	  };
	  /**
	   * optional uint64 limit = 6;
	   * @return {number}
	   */


	  proto.types.TxBody.prototype.getLimit = function () {
	    return (
	      /** @type {number} */
	      googleProtobuf.Message.getFieldWithDefault(this, 6, 0)
	    );
	  };
	  /** @param {number} value */


	  proto.types.TxBody.prototype.setLimit = function (value) {
	    googleProtobuf.Message.setField(this, 6, value);
	  };
	  /**
	   * optional uint64 price = 7;
	   * @return {number}
	   */


	  proto.types.TxBody.prototype.getPrice = function () {
	    return (
	      /** @type {number} */
	      googleProtobuf.Message.getFieldWithDefault(this, 7, 0)
	    );
	  };
	  /** @param {number} value */


	  proto.types.TxBody.prototype.setPrice = function (value) {
	    googleProtobuf.Message.setField(this, 7, value);
	  };
	  /**
	   * optional TxType type = 8;
	   * @return {!proto.types.TxType}
	   */


	  proto.types.TxBody.prototype.getType = function () {
	    return (
	      /** @type {!proto.types.TxType} */
	      googleProtobuf.Message.getFieldWithDefault(this, 8, 0)
	    );
	  };
	  /** @param {!proto.types.TxType} value */


	  proto.types.TxBody.prototype.setType = function (value) {
	    googleProtobuf.Message.setField(this, 8, value);
	  };
	  /**
	   * optional bytes sign = 9;
	   * @return {!(string|Uint8Array)}
	   */


	  proto.types.TxBody.prototype.getSign = function () {
	    return (
	      /** @type {!(string|Uint8Array)} */
	      googleProtobuf.Message.getFieldWithDefault(this, 9, "")
	    );
	  };
	  /**
	   * optional bytes sign = 9;
	   * This is a type-conversion wrapper around `getSign()`
	   * @return {string}
	   */


	  proto.types.TxBody.prototype.getSign_asB64 = function () {
	    return (
	      /** @type {string} */
	      googleProtobuf.Message.bytesAsB64(this.getSign())
	    );
	  };
	  /**
	   * optional bytes sign = 9;
	   * Note that Uint8Array is not supported on all browsers.
	   * @see http://caniuse.com/Uint8Array
	   * This is a type-conversion wrapper around `getSign()`
	   * @return {!Uint8Array}
	   */


	  proto.types.TxBody.prototype.getSign_asU8 = function () {
	    return (
	      /** @type {!Uint8Array} */
	      googleProtobuf.Message.bytesAsU8(this.getSign())
	    );
	  };
	  /** @param {!(string|Uint8Array)} value */


	  proto.types.TxBody.prototype.setSign = function (value) {
	    googleProtobuf.Message.setField(this, 9, value);
	  };
	  /**
	   * Generated by JsPbCodeGenerator.
	   * @param {Array=} opt_data Optional initial data array, typically from a
	   * server response, or constructed directly in Javascript. The array is used
	   * in place and becomes part of the constructed object. It is not cloned.
	   * If no data is provided, the constructed object will be empty, but still
	   * valid.
	   * @extends {jspb.Message}
	   * @constructor
	   */


	  proto.types.TxIdx = function (opt_data) {
	    googleProtobuf.Message.initialize(this, opt_data, 0, -1, null, null);
	  };

	  goog.inherits(proto.types.TxIdx, googleProtobuf.Message);

	  if (googleProtobuf.Message.GENERATE_TO_OBJECT) {
	    /**
	     * Creates an object representation of this proto suitable for use in Soy templates.
	     * Field names that are reserved in JavaScript and will be renamed to pb_name.
	     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	     * For the list of reserved names please see:
	     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
	     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
	     *     for transitional soy proto support: http://goto/soy-param-migration
	     * @return {!Object}
	     */
	    proto.types.TxIdx.prototype.toObject = function (opt_includeInstance) {
	      return proto.types.TxIdx.toObject(opt_includeInstance, this);
	    };
	    /**
	     * Static version of the {@see toObject} method.
	     * @param {boolean|undefined} includeInstance Whether to include the JSPB
	     *     instance for transitional soy proto support:
	     *     http://goto/soy-param-migration
	     * @param {!proto.types.TxIdx} msg The msg instance to transform.
	     * @return {!Object}
	     * @suppress {unusedLocalVariables} f is only used for nested messages
	     */


	    proto.types.TxIdx.toObject = function (includeInstance, msg) {
	      var obj = {
	        blockhash: msg.getBlockhash_asB64(),
	        idx: googleProtobuf.Message.getFieldWithDefault(msg, 2, 0)
	      };

	      if (includeInstance) {
	        obj.$jspbMessageInstance = msg;
	      }

	      return obj;
	    };
	  }
	  /**
	   * Deserializes binary data (in protobuf wire format).
	   * @param {jspb.ByteSource} bytes The bytes to deserialize.
	   * @return {!proto.types.TxIdx}
	   */


	  proto.types.TxIdx.deserializeBinary = function (bytes) {
	    var reader = new googleProtobuf.BinaryReader(bytes);
	    var msg = new proto.types.TxIdx();
	    return proto.types.TxIdx.deserializeBinaryFromReader(msg, reader);
	  };
	  /**
	   * Deserializes binary data (in protobuf wire format) from the
	   * given reader into the given message object.
	   * @param {!proto.types.TxIdx} msg The message object to deserialize into.
	   * @param {!jspb.BinaryReader} reader The BinaryReader to use.
	   * @return {!proto.types.TxIdx}
	   */


	  proto.types.TxIdx.deserializeBinaryFromReader = function (msg, reader) {
	    while (reader.nextField()) {
	      if (reader.isEndGroup()) {
	        break;
	      }

	      var field = reader.getFieldNumber();

	      switch (field) {
	        case 1:
	          var value =
	          /** @type {!Uint8Array} */
	          reader.readBytes();
	          msg.setBlockhash(value);
	          break;

	        case 2:
	          var value =
	          /** @type {number} */
	          reader.readInt32();
	          msg.setIdx(value);
	          break;

	        default:
	          reader.skipField();
	          break;
	      }
	    }

	    return msg;
	  };
	  /**
	   * Serializes the message to binary data (in protobuf wire format).
	   * @return {!Uint8Array}
	   */


	  proto.types.TxIdx.prototype.serializeBinary = function () {
	    var writer = new googleProtobuf.BinaryWriter();
	    proto.types.TxIdx.serializeBinaryToWriter(this, writer);
	    return writer.getResultBuffer();
	  };
	  /**
	   * Serializes the given message to binary data (in protobuf wire
	   * format), writing to the given BinaryWriter.
	   * @param {!proto.types.TxIdx} message
	   * @param {!jspb.BinaryWriter} writer
	   * @suppress {unusedLocalVariables} f is only used for nested messages
	   */


	  proto.types.TxIdx.serializeBinaryToWriter = function (message, writer) {
	    var f = undefined;
	    f = message.getBlockhash_asU8();

	    if (f.length > 0) {
	      writer.writeBytes(1, f);
	    }

	    f = message.getIdx();

	    if (f !== 0) {
	      writer.writeInt32(2, f);
	    }
	  };
	  /**
	   * optional bytes blockHash = 1;
	   * @return {!(string|Uint8Array)}
	   */


	  proto.types.TxIdx.prototype.getBlockhash = function () {
	    return (
	      /** @type {!(string|Uint8Array)} */
	      googleProtobuf.Message.getFieldWithDefault(this, 1, "")
	    );
	  };
	  /**
	   * optional bytes blockHash = 1;
	   * This is a type-conversion wrapper around `getBlockhash()`
	   * @return {string}
	   */


	  proto.types.TxIdx.prototype.getBlockhash_asB64 = function () {
	    return (
	      /** @type {string} */
	      googleProtobuf.Message.bytesAsB64(this.getBlockhash())
	    );
	  };
	  /**
	   * optional bytes blockHash = 1;
	   * Note that Uint8Array is not supported on all browsers.
	   * @see http://caniuse.com/Uint8Array
	   * This is a type-conversion wrapper around `getBlockhash()`
	   * @return {!Uint8Array}
	   */


	  proto.types.TxIdx.prototype.getBlockhash_asU8 = function () {
	    return (
	      /** @type {!Uint8Array} */
	      googleProtobuf.Message.bytesAsU8(this.getBlockhash())
	    );
	  };
	  /** @param {!(string|Uint8Array)} value */


	  proto.types.TxIdx.prototype.setBlockhash = function (value) {
	    googleProtobuf.Message.setField(this, 1, value);
	  };
	  /**
	   * optional int32 idx = 2;
	   * @return {number}
	   */


	  proto.types.TxIdx.prototype.getIdx = function () {
	    return (
	      /** @type {number} */
	      googleProtobuf.Message.getFieldWithDefault(this, 2, 0)
	    );
	  };
	  /** @param {number} value */


	  proto.types.TxIdx.prototype.setIdx = function (value) {
	    googleProtobuf.Message.setField(this, 2, value);
	  };
	  /**
	   * Generated by JsPbCodeGenerator.
	   * @param {Array=} opt_data Optional initial data array, typically from a
	   * server response, or constructed directly in Javascript. The array is used
	   * in place and becomes part of the constructed object. It is not cloned.
	   * If no data is provided, the constructed object will be empty, but still
	   * valid.
	   * @extends {jspb.Message}
	   * @constructor
	   */


	  proto.types.TxInBlock = function (opt_data) {
	    googleProtobuf.Message.initialize(this, opt_data, 0, -1, null, null);
	  };

	  goog.inherits(proto.types.TxInBlock, googleProtobuf.Message);

	  if (googleProtobuf.Message.GENERATE_TO_OBJECT) {
	    /**
	     * Creates an object representation of this proto suitable for use in Soy templates.
	     * Field names that are reserved in JavaScript and will be renamed to pb_name.
	     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	     * For the list of reserved names please see:
	     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
	     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
	     *     for transitional soy proto support: http://goto/soy-param-migration
	     * @return {!Object}
	     */
	    proto.types.TxInBlock.prototype.toObject = function (opt_includeInstance) {
	      return proto.types.TxInBlock.toObject(opt_includeInstance, this);
	    };
	    /**
	     * Static version of the {@see toObject} method.
	     * @param {boolean|undefined} includeInstance Whether to include the JSPB
	     *     instance for transitional soy proto support:
	     *     http://goto/soy-param-migration
	     * @param {!proto.types.TxInBlock} msg The msg instance to transform.
	     * @return {!Object}
	     * @suppress {unusedLocalVariables} f is only used for nested messages
	     */


	    proto.types.TxInBlock.toObject = function (includeInstance, msg) {
	      var f,
	          obj = {
	        txidx: (f = msg.getTxidx()) && proto.types.TxIdx.toObject(includeInstance, f),
	        tx: (f = msg.getTx()) && proto.types.Tx.toObject(includeInstance, f)
	      };

	      if (includeInstance) {
	        obj.$jspbMessageInstance = msg;
	      }

	      return obj;
	    };
	  }
	  /**
	   * Deserializes binary data (in protobuf wire format).
	   * @param {jspb.ByteSource} bytes The bytes to deserialize.
	   * @return {!proto.types.TxInBlock}
	   */


	  proto.types.TxInBlock.deserializeBinary = function (bytes) {
	    var reader = new googleProtobuf.BinaryReader(bytes);
	    var msg = new proto.types.TxInBlock();
	    return proto.types.TxInBlock.deserializeBinaryFromReader(msg, reader);
	  };
	  /**
	   * Deserializes binary data (in protobuf wire format) from the
	   * given reader into the given message object.
	   * @param {!proto.types.TxInBlock} msg The message object to deserialize into.
	   * @param {!jspb.BinaryReader} reader The BinaryReader to use.
	   * @return {!proto.types.TxInBlock}
	   */


	  proto.types.TxInBlock.deserializeBinaryFromReader = function (msg, reader) {
	    while (reader.nextField()) {
	      if (reader.isEndGroup()) {
	        break;
	      }

	      var field = reader.getFieldNumber();

	      switch (field) {
	        case 1:
	          var value = new proto.types.TxIdx();
	          reader.readMessage(value, proto.types.TxIdx.deserializeBinaryFromReader);
	          msg.setTxidx(value);
	          break;

	        case 2:
	          var value = new proto.types.Tx();
	          reader.readMessage(value, proto.types.Tx.deserializeBinaryFromReader);
	          msg.setTx(value);
	          break;

	        default:
	          reader.skipField();
	          break;
	      }
	    }

	    return msg;
	  };
	  /**
	   * Serializes the message to binary data (in protobuf wire format).
	   * @return {!Uint8Array}
	   */


	  proto.types.TxInBlock.prototype.serializeBinary = function () {
	    var writer = new googleProtobuf.BinaryWriter();
	    proto.types.TxInBlock.serializeBinaryToWriter(this, writer);
	    return writer.getResultBuffer();
	  };
	  /**
	   * Serializes the given message to binary data (in protobuf wire
	   * format), writing to the given BinaryWriter.
	   * @param {!proto.types.TxInBlock} message
	   * @param {!jspb.BinaryWriter} writer
	   * @suppress {unusedLocalVariables} f is only used for nested messages
	   */


	  proto.types.TxInBlock.serializeBinaryToWriter = function (message, writer) {
	    var f = undefined;
	    f = message.getTxidx();

	    if (f != null) {
	      writer.writeMessage(1, f, proto.types.TxIdx.serializeBinaryToWriter);
	    }

	    f = message.getTx();

	    if (f != null) {
	      writer.writeMessage(2, f, proto.types.Tx.serializeBinaryToWriter);
	    }
	  };
	  /**
	   * optional TxIdx txIdx = 1;
	   * @return {?proto.types.TxIdx}
	   */


	  proto.types.TxInBlock.prototype.getTxidx = function () {
	    return (
	      /** @type{?proto.types.TxIdx} */
	      googleProtobuf.Message.getWrapperField(this, proto.types.TxIdx, 1)
	    );
	  };
	  /** @param {?proto.types.TxIdx|undefined} value */


	  proto.types.TxInBlock.prototype.setTxidx = function (value) {
	    googleProtobuf.Message.setWrapperField(this, 1, value);
	  };

	  proto.types.TxInBlock.prototype.clearTxidx = function () {
	    this.setTxidx(undefined);
	  };
	  /**
	   * Returns whether this field is set.
	   * @return {!boolean}
	   */


	  proto.types.TxInBlock.prototype.hasTxidx = function () {
	    return googleProtobuf.Message.getField(this, 1) != null;
	  };
	  /**
	   * optional Tx tx = 2;
	   * @return {?proto.types.Tx}
	   */


	  proto.types.TxInBlock.prototype.getTx = function () {
	    return (
	      /** @type{?proto.types.Tx} */
	      googleProtobuf.Message.getWrapperField(this, proto.types.Tx, 2)
	    );
	  };
	  /** @param {?proto.types.Tx|undefined} value */


	  proto.types.TxInBlock.prototype.setTx = function (value) {
	    googleProtobuf.Message.setWrapperField(this, 2, value);
	  };

	  proto.types.TxInBlock.prototype.clearTx = function () {
	    this.setTx(undefined);
	  };
	  /**
	   * Returns whether this field is set.
	   * @return {!boolean}
	   */


	  proto.types.TxInBlock.prototype.hasTx = function () {
	    return googleProtobuf.Message.getField(this, 2) != null;
	  };
	  /**
	   * Generated by JsPbCodeGenerator.
	   * @param {Array=} opt_data Optional initial data array, typically from a
	   * server response, or constructed directly in Javascript. The array is used
	   * in place and becomes part of the constructed object. It is not cloned.
	   * If no data is provided, the constructed object will be empty, but still
	   * valid.
	   * @extends {jspb.Message}
	   * @constructor
	   */


	  proto.types.State = function (opt_data) {
	    googleProtobuf.Message.initialize(this, opt_data, 0, -1, null, null);
	  };

	  goog.inherits(proto.types.State, googleProtobuf.Message);

	  if (googleProtobuf.Message.GENERATE_TO_OBJECT) {
	    /**
	     * Creates an object representation of this proto suitable for use in Soy templates.
	     * Field names that are reserved in JavaScript and will be renamed to pb_name.
	     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	     * For the list of reserved names please see:
	     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
	     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
	     *     for transitional soy proto support: http://goto/soy-param-migration
	     * @return {!Object}
	     */
	    proto.types.State.prototype.toObject = function (opt_includeInstance) {
	      return proto.types.State.toObject(opt_includeInstance, this);
	    };
	    /**
	     * Static version of the {@see toObject} method.
	     * @param {boolean|undefined} includeInstance Whether to include the JSPB
	     *     instance for transitional soy proto support:
	     *     http://goto/soy-param-migration
	     * @param {!proto.types.State} msg The msg instance to transform.
	     * @return {!Object}
	     * @suppress {unusedLocalVariables} f is only used for nested messages
	     */


	    proto.types.State.toObject = function (includeInstance, msg) {
	      var obj = {
	        nonce: googleProtobuf.Message.getFieldWithDefault(msg, 1, 0),
	        balance: googleProtobuf.Message.getFieldWithDefault(msg, 2, 0),
	        codehash: msg.getCodehash_asB64(),
	        storageroot: msg.getStorageroot_asB64(),
	        sqlrecoverypoint: googleProtobuf.Message.getFieldWithDefault(msg, 5, 0)
	      };

	      if (includeInstance) {
	        obj.$jspbMessageInstance = msg;
	      }

	      return obj;
	    };
	  }
	  /**
	   * Deserializes binary data (in protobuf wire format).
	   * @param {jspb.ByteSource} bytes The bytes to deserialize.
	   * @return {!proto.types.State}
	   */


	  proto.types.State.deserializeBinary = function (bytes) {
	    var reader = new googleProtobuf.BinaryReader(bytes);
	    var msg = new proto.types.State();
	    return proto.types.State.deserializeBinaryFromReader(msg, reader);
	  };
	  /**
	   * Deserializes binary data (in protobuf wire format) from the
	   * given reader into the given message object.
	   * @param {!proto.types.State} msg The message object to deserialize into.
	   * @param {!jspb.BinaryReader} reader The BinaryReader to use.
	   * @return {!proto.types.State}
	   */


	  proto.types.State.deserializeBinaryFromReader = function (msg, reader) {
	    while (reader.nextField()) {
	      if (reader.isEndGroup()) {
	        break;
	      }

	      var field = reader.getFieldNumber();

	      switch (field) {
	        case 1:
	          var value =
	          /** @type {number} */
	          reader.readUint64();
	          msg.setNonce(value);
	          break;

	        case 2:
	          var value =
	          /** @type {number} */
	          reader.readUint64();
	          msg.setBalance(value);
	          break;

	        case 3:
	          var value =
	          /** @type {!Uint8Array} */
	          reader.readBytes();
	          msg.setCodehash(value);
	          break;

	        case 4:
	          var value =
	          /** @type {!Uint8Array} */
	          reader.readBytes();
	          msg.setStorageroot(value);
	          break;

	        case 5:
	          var value =
	          /** @type {number} */
	          reader.readUint64();
	          msg.setSqlrecoverypoint(value);
	          break;

	        default:
	          reader.skipField();
	          break;
	      }
	    }

	    return msg;
	  };
	  /**
	   * Serializes the message to binary data (in protobuf wire format).
	   * @return {!Uint8Array}
	   */


	  proto.types.State.prototype.serializeBinary = function () {
	    var writer = new googleProtobuf.BinaryWriter();
	    proto.types.State.serializeBinaryToWriter(this, writer);
	    return writer.getResultBuffer();
	  };
	  /**
	   * Serializes the given message to binary data (in protobuf wire
	   * format), writing to the given BinaryWriter.
	   * @param {!proto.types.State} message
	   * @param {!jspb.BinaryWriter} writer
	   * @suppress {unusedLocalVariables} f is only used for nested messages
	   */


	  proto.types.State.serializeBinaryToWriter = function (message, writer) {
	    var f = undefined;
	    f = message.getNonce();

	    if (f !== 0) {
	      writer.writeUint64(1, f);
	    }

	    f = message.getBalance();

	    if (f !== 0) {
	      writer.writeUint64(2, f);
	    }

	    f = message.getCodehash_asU8();

	    if (f.length > 0) {
	      writer.writeBytes(3, f);
	    }

	    f = message.getStorageroot_asU8();

	    if (f.length > 0) {
	      writer.writeBytes(4, f);
	    }

	    f = message.getSqlrecoverypoint();

	    if (f !== 0) {
	      writer.writeUint64(5, f);
	    }
	  };
	  /**
	   * optional uint64 nonce = 1;
	   * @return {number}
	   */


	  proto.types.State.prototype.getNonce = function () {
	    return (
	      /** @type {number} */
	      googleProtobuf.Message.getFieldWithDefault(this, 1, 0)
	    );
	  };
	  /** @param {number} value */


	  proto.types.State.prototype.setNonce = function (value) {
	    googleProtobuf.Message.setField(this, 1, value);
	  };
	  /**
	   * optional uint64 balance = 2;
	   * @return {number}
	   */


	  proto.types.State.prototype.getBalance = function () {
	    return (
	      /** @type {number} */
	      googleProtobuf.Message.getFieldWithDefault(this, 2, 0)
	    );
	  };
	  /** @param {number} value */


	  proto.types.State.prototype.setBalance = function (value) {
	    googleProtobuf.Message.setField(this, 2, value);
	  };
	  /**
	   * optional bytes codeHash = 3;
	   * @return {!(string|Uint8Array)}
	   */


	  proto.types.State.prototype.getCodehash = function () {
	    return (
	      /** @type {!(string|Uint8Array)} */
	      googleProtobuf.Message.getFieldWithDefault(this, 3, "")
	    );
	  };
	  /**
	   * optional bytes codeHash = 3;
	   * This is a type-conversion wrapper around `getCodehash()`
	   * @return {string}
	   */


	  proto.types.State.prototype.getCodehash_asB64 = function () {
	    return (
	      /** @type {string} */
	      googleProtobuf.Message.bytesAsB64(this.getCodehash())
	    );
	  };
	  /**
	   * optional bytes codeHash = 3;
	   * Note that Uint8Array is not supported on all browsers.
	   * @see http://caniuse.com/Uint8Array
	   * This is a type-conversion wrapper around `getCodehash()`
	   * @return {!Uint8Array}
	   */


	  proto.types.State.prototype.getCodehash_asU8 = function () {
	    return (
	      /** @type {!Uint8Array} */
	      googleProtobuf.Message.bytesAsU8(this.getCodehash())
	    );
	  };
	  /** @param {!(string|Uint8Array)} value */


	  proto.types.State.prototype.setCodehash = function (value) {
	    googleProtobuf.Message.setField(this, 3, value);
	  };
	  /**
	   * optional bytes storageRoot = 4;
	   * @return {!(string|Uint8Array)}
	   */


	  proto.types.State.prototype.getStorageroot = function () {
	    return (
	      /** @type {!(string|Uint8Array)} */
	      googleProtobuf.Message.getFieldWithDefault(this, 4, "")
	    );
	  };
	  /**
	   * optional bytes storageRoot = 4;
	   * This is a type-conversion wrapper around `getStorageroot()`
	   * @return {string}
	   */


	  proto.types.State.prototype.getStorageroot_asB64 = function () {
	    return (
	      /** @type {string} */
	      googleProtobuf.Message.bytesAsB64(this.getStorageroot())
	    );
	  };
	  /**
	   * optional bytes storageRoot = 4;
	   * Note that Uint8Array is not supported on all browsers.
	   * @see http://caniuse.com/Uint8Array
	   * This is a type-conversion wrapper around `getStorageroot()`
	   * @return {!Uint8Array}
	   */


	  proto.types.State.prototype.getStorageroot_asU8 = function () {
	    return (
	      /** @type {!Uint8Array} */
	      googleProtobuf.Message.bytesAsU8(this.getStorageroot())
	    );
	  };
	  /** @param {!(string|Uint8Array)} value */


	  proto.types.State.prototype.setStorageroot = function (value) {
	    googleProtobuf.Message.setField(this, 4, value);
	  };
	  /**
	   * optional uint64 sqlRecoveryPoint = 5;
	   * @return {number}
	   */


	  proto.types.State.prototype.getSqlrecoverypoint = function () {
	    return (
	      /** @type {number} */
	      googleProtobuf.Message.getFieldWithDefault(this, 5, 0)
	    );
	  };
	  /** @param {number} value */


	  proto.types.State.prototype.setSqlrecoverypoint = function (value) {
	    googleProtobuf.Message.setField(this, 5, value);
	  };
	  /**
	   * Generated by JsPbCodeGenerator.
	   * @param {Array=} opt_data Optional initial data array, typically from a
	   * server response, or constructed directly in Javascript. The array is used
	   * in place and becomes part of the constructed object. It is not cloned.
	   * If no data is provided, the constructed object will be empty, but still
	   * valid.
	   * @extends {jspb.Message}
	   * @constructor
	   */


	  proto.types.StateProof = function (opt_data) {
	    googleProtobuf.Message.initialize(this, opt_data, 0, -1, proto.types.StateProof.repeatedFields_, null);
	  };

	  goog.inherits(proto.types.StateProof, googleProtobuf.Message);
	  /**
	   * List of repeated fields within this message type.
	   * @private {!Array<number>}
	   * @const
	   */


	  proto.types.StateProof.repeatedFields_ = [7];

	  if (googleProtobuf.Message.GENERATE_TO_OBJECT) {
	    /**
	     * Creates an object representation of this proto suitable for use in Soy templates.
	     * Field names that are reserved in JavaScript and will be renamed to pb_name.
	     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	     * For the list of reserved names please see:
	     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
	     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
	     *     for transitional soy proto support: http://goto/soy-param-migration
	     * @return {!Object}
	     */
	    proto.types.StateProof.prototype.toObject = function (opt_includeInstance) {
	      return proto.types.StateProof.toObject(opt_includeInstance, this);
	    };
	    /**
	     * Static version of the {@see toObject} method.
	     * @param {boolean|undefined} includeInstance Whether to include the JSPB
	     *     instance for transitional soy proto support:
	     *     http://goto/soy-param-migration
	     * @param {!proto.types.StateProof} msg The msg instance to transform.
	     * @return {!Object}
	     * @suppress {unusedLocalVariables} f is only used for nested messages
	     */


	    proto.types.StateProof.toObject = function (includeInstance, msg) {
	      var f,
	          obj = {
	        state: (f = msg.getState()) && proto.types.State.toObject(includeInstance, f),
	        inclusion: googleProtobuf.Message.getFieldWithDefault(msg, 2, false),
	        proofkey: msg.getProofkey_asB64(),
	        proofval: msg.getProofval_asB64(),
	        bitmap: msg.getBitmap_asB64(),
	        height: googleProtobuf.Message.getFieldWithDefault(msg, 6, 0),
	        auditpathList: msg.getAuditpathList_asB64()
	      };

	      if (includeInstance) {
	        obj.$jspbMessageInstance = msg;
	      }

	      return obj;
	    };
	  }
	  /**
	   * Deserializes binary data (in protobuf wire format).
	   * @param {jspb.ByteSource} bytes The bytes to deserialize.
	   * @return {!proto.types.StateProof}
	   */


	  proto.types.StateProof.deserializeBinary = function (bytes) {
	    var reader = new googleProtobuf.BinaryReader(bytes);
	    var msg = new proto.types.StateProof();
	    return proto.types.StateProof.deserializeBinaryFromReader(msg, reader);
	  };
	  /**
	   * Deserializes binary data (in protobuf wire format) from the
	   * given reader into the given message object.
	   * @param {!proto.types.StateProof} msg The message object to deserialize into.
	   * @param {!jspb.BinaryReader} reader The BinaryReader to use.
	   * @return {!proto.types.StateProof}
	   */


	  proto.types.StateProof.deserializeBinaryFromReader = function (msg, reader) {
	    while (reader.nextField()) {
	      if (reader.isEndGroup()) {
	        break;
	      }

	      var field = reader.getFieldNumber();

	      switch (field) {
	        case 1:
	          var value = new proto.types.State();
	          reader.readMessage(value, proto.types.State.deserializeBinaryFromReader);
	          msg.setState(value);
	          break;

	        case 2:
	          var value =
	          /** @type {boolean} */
	          reader.readBool();
	          msg.setInclusion(value);
	          break;

	        case 3:
	          var value =
	          /** @type {!Uint8Array} */
	          reader.readBytes();
	          msg.setProofkey(value);
	          break;

	        case 4:
	          var value =
	          /** @type {!Uint8Array} */
	          reader.readBytes();
	          msg.setProofval(value);
	          break;

	        case 5:
	          var value =
	          /** @type {!Uint8Array} */
	          reader.readBytes();
	          msg.setBitmap(value);
	          break;

	        case 6:
	          var value =
	          /** @type {number} */
	          reader.readUint32();
	          msg.setHeight(value);
	          break;

	        case 7:
	          var value =
	          /** @type {!Uint8Array} */
	          reader.readBytes();
	          msg.addAuditpath(value);
	          break;

	        default:
	          reader.skipField();
	          break;
	      }
	    }

	    return msg;
	  };
	  /**
	   * Serializes the message to binary data (in protobuf wire format).
	   * @return {!Uint8Array}
	   */


	  proto.types.StateProof.prototype.serializeBinary = function () {
	    var writer = new googleProtobuf.BinaryWriter();
	    proto.types.StateProof.serializeBinaryToWriter(this, writer);
	    return writer.getResultBuffer();
	  };
	  /**
	   * Serializes the given message to binary data (in protobuf wire
	   * format), writing to the given BinaryWriter.
	   * @param {!proto.types.StateProof} message
	   * @param {!jspb.BinaryWriter} writer
	   * @suppress {unusedLocalVariables} f is only used for nested messages
	   */


	  proto.types.StateProof.serializeBinaryToWriter = function (message, writer) {
	    var f = undefined;
	    f = message.getState();

	    if (f != null) {
	      writer.writeMessage(1, f, proto.types.State.serializeBinaryToWriter);
	    }

	    f = message.getInclusion();

	    if (f) {
	      writer.writeBool(2, f);
	    }

	    f = message.getProofkey_asU8();

	    if (f.length > 0) {
	      writer.writeBytes(3, f);
	    }

	    f = message.getProofval_asU8();

	    if (f.length > 0) {
	      writer.writeBytes(4, f);
	    }

	    f = message.getBitmap_asU8();

	    if (f.length > 0) {
	      writer.writeBytes(5, f);
	    }

	    f = message.getHeight();

	    if (f !== 0) {
	      writer.writeUint32(6, f);
	    }

	    f = message.getAuditpathList_asU8();

	    if (f.length > 0) {
	      writer.writeRepeatedBytes(7, f);
	    }
	  };
	  /**
	   * optional State State = 1;
	   * @return {?proto.types.State}
	   */


	  proto.types.StateProof.prototype.getState = function () {
	    return (
	      /** @type{?proto.types.State} */
	      googleProtobuf.Message.getWrapperField(this, proto.types.State, 1)
	    );
	  };
	  /** @param {?proto.types.State|undefined} value */


	  proto.types.StateProof.prototype.setState = function (value) {
	    googleProtobuf.Message.setWrapperField(this, 1, value);
	  };

	  proto.types.StateProof.prototype.clearState = function () {
	    this.setState(undefined);
	  };
	  /**
	   * Returns whether this field is set.
	   * @return {!boolean}
	   */


	  proto.types.StateProof.prototype.hasState = function () {
	    return googleProtobuf.Message.getField(this, 1) != null;
	  };
	  /**
	   * optional bool inclusion = 2;
	   * Note that Boolean fields may be set to 0/1 when serialized from a Java server.
	   * You should avoid comparisons like {@code val === true/false} in those cases.
	   * @return {boolean}
	   */


	  proto.types.StateProof.prototype.getInclusion = function () {
	    return (
	      /** @type {boolean} */
	      googleProtobuf.Message.getFieldWithDefault(this, 2, false)
	    );
	  };
	  /** @param {boolean} value */


	  proto.types.StateProof.prototype.setInclusion = function (value) {
	    googleProtobuf.Message.setField(this, 2, value);
	  };
	  /**
	   * optional bytes proofKey = 3;
	   * @return {!(string|Uint8Array)}
	   */


	  proto.types.StateProof.prototype.getProofkey = function () {
	    return (
	      /** @type {!(string|Uint8Array)} */
	      googleProtobuf.Message.getFieldWithDefault(this, 3, "")
	    );
	  };
	  /**
	   * optional bytes proofKey = 3;
	   * This is a type-conversion wrapper around `getProofkey()`
	   * @return {string}
	   */


	  proto.types.StateProof.prototype.getProofkey_asB64 = function () {
	    return (
	      /** @type {string} */
	      googleProtobuf.Message.bytesAsB64(this.getProofkey())
	    );
	  };
	  /**
	   * optional bytes proofKey = 3;
	   * Note that Uint8Array is not supported on all browsers.
	   * @see http://caniuse.com/Uint8Array
	   * This is a type-conversion wrapper around `getProofkey()`
	   * @return {!Uint8Array}
	   */


	  proto.types.StateProof.prototype.getProofkey_asU8 = function () {
	    return (
	      /** @type {!Uint8Array} */
	      googleProtobuf.Message.bytesAsU8(this.getProofkey())
	    );
	  };
	  /** @param {!(string|Uint8Array)} value */


	  proto.types.StateProof.prototype.setProofkey = function (value) {
	    googleProtobuf.Message.setField(this, 3, value);
	  };
	  /**
	   * optional bytes proofVal = 4;
	   * @return {!(string|Uint8Array)}
	   */


	  proto.types.StateProof.prototype.getProofval = function () {
	    return (
	      /** @type {!(string|Uint8Array)} */
	      googleProtobuf.Message.getFieldWithDefault(this, 4, "")
	    );
	  };
	  /**
	   * optional bytes proofVal = 4;
	   * This is a type-conversion wrapper around `getProofval()`
	   * @return {string}
	   */


	  proto.types.StateProof.prototype.getProofval_asB64 = function () {
	    return (
	      /** @type {string} */
	      googleProtobuf.Message.bytesAsB64(this.getProofval())
	    );
	  };
	  /**
	   * optional bytes proofVal = 4;
	   * Note that Uint8Array is not supported on all browsers.
	   * @see http://caniuse.com/Uint8Array
	   * This is a type-conversion wrapper around `getProofval()`
	   * @return {!Uint8Array}
	   */


	  proto.types.StateProof.prototype.getProofval_asU8 = function () {
	    return (
	      /** @type {!Uint8Array} */
	      googleProtobuf.Message.bytesAsU8(this.getProofval())
	    );
	  };
	  /** @param {!(string|Uint8Array)} value */


	  proto.types.StateProof.prototype.setProofval = function (value) {
	    googleProtobuf.Message.setField(this, 4, value);
	  };
	  /**
	   * optional bytes bitmap = 5;
	   * @return {!(string|Uint8Array)}
	   */


	  proto.types.StateProof.prototype.getBitmap = function () {
	    return (
	      /** @type {!(string|Uint8Array)} */
	      googleProtobuf.Message.getFieldWithDefault(this, 5, "")
	    );
	  };
	  /**
	   * optional bytes bitmap = 5;
	   * This is a type-conversion wrapper around `getBitmap()`
	   * @return {string}
	   */


	  proto.types.StateProof.prototype.getBitmap_asB64 = function () {
	    return (
	      /** @type {string} */
	      googleProtobuf.Message.bytesAsB64(this.getBitmap())
	    );
	  };
	  /**
	   * optional bytes bitmap = 5;
	   * Note that Uint8Array is not supported on all browsers.
	   * @see http://caniuse.com/Uint8Array
	   * This is a type-conversion wrapper around `getBitmap()`
	   * @return {!Uint8Array}
	   */


	  proto.types.StateProof.prototype.getBitmap_asU8 = function () {
	    return (
	      /** @type {!Uint8Array} */
	      googleProtobuf.Message.bytesAsU8(this.getBitmap())
	    );
	  };
	  /** @param {!(string|Uint8Array)} value */


	  proto.types.StateProof.prototype.setBitmap = function (value) {
	    googleProtobuf.Message.setField(this, 5, value);
	  };
	  /**
	   * optional uint32 height = 6;
	   * @return {number}
	   */


	  proto.types.StateProof.prototype.getHeight = function () {
	    return (
	      /** @type {number} */
	      googleProtobuf.Message.getFieldWithDefault(this, 6, 0)
	    );
	  };
	  /** @param {number} value */


	  proto.types.StateProof.prototype.setHeight = function (value) {
	    googleProtobuf.Message.setField(this, 6, value);
	  };
	  /**
	   * repeated bytes auditPath = 7;
	   * @return {!(Array<!Uint8Array>|Array<string>)}
	   */


	  proto.types.StateProof.prototype.getAuditpathList = function () {
	    return (
	      /** @type {!(Array<!Uint8Array>|Array<string>)} */
	      googleProtobuf.Message.getRepeatedField(this, 7)
	    );
	  };
	  /**
	   * repeated bytes auditPath = 7;
	   * This is a type-conversion wrapper around `getAuditpathList()`
	   * @return {!Array.<string>}
	   */


	  proto.types.StateProof.prototype.getAuditpathList_asB64 = function () {
	    return (
	      /** @type {!Array.<string>} */
	      googleProtobuf.Message.bytesListAsB64(this.getAuditpathList())
	    );
	  };
	  /**
	   * repeated bytes auditPath = 7;
	   * Note that Uint8Array is not supported on all browsers.
	   * @see http://caniuse.com/Uint8Array
	   * This is a type-conversion wrapper around `getAuditpathList()`
	   * @return {!Array.<!Uint8Array>}
	   */


	  proto.types.StateProof.prototype.getAuditpathList_asU8 = function () {
	    return (
	      /** @type {!Array.<!Uint8Array>} */
	      googleProtobuf.Message.bytesListAsU8(this.getAuditpathList())
	    );
	  };
	  /** @param {!(Array<!Uint8Array>|Array<string>)} value */


	  proto.types.StateProof.prototype.setAuditpathList = function (value) {
	    googleProtobuf.Message.setField(this, 7, value || []);
	  };
	  /**
	   * @param {!(string|Uint8Array)} value
	   * @param {number=} opt_index
	   */


	  proto.types.StateProof.prototype.addAuditpath = function (value, opt_index) {
	    googleProtobuf.Message.addToRepeatedField(this, 7, value, opt_index);
	  };

	  proto.types.StateProof.prototype.clearAuditpathList = function () {
	    this.setAuditpathList([]);
	  };
	  /**
	   * Generated by JsPbCodeGenerator.
	   * @param {Array=} opt_data Optional initial data array, typically from a
	   * server response, or constructed directly in Javascript. The array is used
	   * in place and becomes part of the constructed object. It is not cloned.
	   * If no data is provided, the constructed object will be empty, but still
	   * valid.
	   * @extends {jspb.Message}
	   * @constructor
	   */


	  proto.types.Receipt = function (opt_data) {
	    googleProtobuf.Message.initialize(this, opt_data, 0, -1, null, null);
	  };

	  goog.inherits(proto.types.Receipt, googleProtobuf.Message);

	  if (googleProtobuf.Message.GENERATE_TO_OBJECT) {
	    /**
	     * Creates an object representation of this proto suitable for use in Soy templates.
	     * Field names that are reserved in JavaScript and will be renamed to pb_name.
	     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	     * For the list of reserved names please see:
	     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
	     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
	     *     for transitional soy proto support: http://goto/soy-param-migration
	     * @return {!Object}
	     */
	    proto.types.Receipt.prototype.toObject = function (opt_includeInstance) {
	      return proto.types.Receipt.toObject(opt_includeInstance, this);
	    };
	    /**
	     * Static version of the {@see toObject} method.
	     * @param {boolean|undefined} includeInstance Whether to include the JSPB
	     *     instance for transitional soy proto support:
	     *     http://goto/soy-param-migration
	     * @param {!proto.types.Receipt} msg The msg instance to transform.
	     * @return {!Object}
	     * @suppress {unusedLocalVariables} f is only used for nested messages
	     */


	    proto.types.Receipt.toObject = function (includeInstance, msg) {
	      var obj = {
	        contractaddress: msg.getContractaddress_asB64(),
	        status: googleProtobuf.Message.getFieldWithDefault(msg, 2, ""),
	        ret: googleProtobuf.Message.getFieldWithDefault(msg, 3, "")
	      };

	      if (includeInstance) {
	        obj.$jspbMessageInstance = msg;
	      }

	      return obj;
	    };
	  }
	  /**
	   * Deserializes binary data (in protobuf wire format).
	   * @param {jspb.ByteSource} bytes The bytes to deserialize.
	   * @return {!proto.types.Receipt}
	   */


	  proto.types.Receipt.deserializeBinary = function (bytes) {
	    var reader = new googleProtobuf.BinaryReader(bytes);
	    var msg = new proto.types.Receipt();
	    return proto.types.Receipt.deserializeBinaryFromReader(msg, reader);
	  };
	  /**
	   * Deserializes binary data (in protobuf wire format) from the
	   * given reader into the given message object.
	   * @param {!proto.types.Receipt} msg The message object to deserialize into.
	   * @param {!jspb.BinaryReader} reader The BinaryReader to use.
	   * @return {!proto.types.Receipt}
	   */


	  proto.types.Receipt.deserializeBinaryFromReader = function (msg, reader) {
	    while (reader.nextField()) {
	      if (reader.isEndGroup()) {
	        break;
	      }

	      var field = reader.getFieldNumber();

	      switch (field) {
	        case 1:
	          var value =
	          /** @type {!Uint8Array} */
	          reader.readBytes();
	          msg.setContractaddress(value);
	          break;

	        case 2:
	          var value =
	          /** @type {string} */
	          reader.readString();
	          msg.setStatus(value);
	          break;

	        case 3:
	          var value =
	          /** @type {string} */
	          reader.readString();
	          msg.setRet(value);
	          break;

	        default:
	          reader.skipField();
	          break;
	      }
	    }

	    return msg;
	  };
	  /**
	   * Serializes the message to binary data (in protobuf wire format).
	   * @return {!Uint8Array}
	   */


	  proto.types.Receipt.prototype.serializeBinary = function () {
	    var writer = new googleProtobuf.BinaryWriter();
	    proto.types.Receipt.serializeBinaryToWriter(this, writer);
	    return writer.getResultBuffer();
	  };
	  /**
	   * Serializes the given message to binary data (in protobuf wire
	   * format), writing to the given BinaryWriter.
	   * @param {!proto.types.Receipt} message
	   * @param {!jspb.BinaryWriter} writer
	   * @suppress {unusedLocalVariables} f is only used for nested messages
	   */


	  proto.types.Receipt.serializeBinaryToWriter = function (message, writer) {
	    var f = undefined;
	    f = message.getContractaddress_asU8();

	    if (f.length > 0) {
	      writer.writeBytes(1, f);
	    }

	    f = message.getStatus();

	    if (f.length > 0) {
	      writer.writeString(2, f);
	    }

	    f = message.getRet();

	    if (f.length > 0) {
	      writer.writeString(3, f);
	    }
	  };
	  /**
	   * optional bytes contractAddress = 1;
	   * @return {!(string|Uint8Array)}
	   */


	  proto.types.Receipt.prototype.getContractaddress = function () {
	    return (
	      /** @type {!(string|Uint8Array)} */
	      googleProtobuf.Message.getFieldWithDefault(this, 1, "")
	    );
	  };
	  /**
	   * optional bytes contractAddress = 1;
	   * This is a type-conversion wrapper around `getContractaddress()`
	   * @return {string}
	   */


	  proto.types.Receipt.prototype.getContractaddress_asB64 = function () {
	    return (
	      /** @type {string} */
	      googleProtobuf.Message.bytesAsB64(this.getContractaddress())
	    );
	  };
	  /**
	   * optional bytes contractAddress = 1;
	   * Note that Uint8Array is not supported on all browsers.
	   * @see http://caniuse.com/Uint8Array
	   * This is a type-conversion wrapper around `getContractaddress()`
	   * @return {!Uint8Array}
	   */


	  proto.types.Receipt.prototype.getContractaddress_asU8 = function () {
	    return (
	      /** @type {!Uint8Array} */
	      googleProtobuf.Message.bytesAsU8(this.getContractaddress())
	    );
	  };
	  /** @param {!(string|Uint8Array)} value */


	  proto.types.Receipt.prototype.setContractaddress = function (value) {
	    googleProtobuf.Message.setField(this, 1, value);
	  };
	  /**
	   * optional string status = 2;
	   * @return {string}
	   */


	  proto.types.Receipt.prototype.getStatus = function () {
	    return (
	      /** @type {string} */
	      googleProtobuf.Message.getFieldWithDefault(this, 2, "")
	    );
	  };
	  /** @param {string} value */


	  proto.types.Receipt.prototype.setStatus = function (value) {
	    googleProtobuf.Message.setField(this, 2, value);
	  };
	  /**
	   * optional string ret = 3;
	   * @return {string}
	   */


	  proto.types.Receipt.prototype.getRet = function () {
	    return (
	      /** @type {string} */
	      googleProtobuf.Message.getFieldWithDefault(this, 3, "")
	    );
	  };
	  /** @param {string} value */


	  proto.types.Receipt.prototype.setRet = function (value) {
	    googleProtobuf.Message.setField(this, 3, value);
	  };
	  /**
	   * Generated by JsPbCodeGenerator.
	   * @param {Array=} opt_data Optional initial data array, typically from a
	   * server response, or constructed directly in Javascript. The array is used
	   * in place and becomes part of the constructed object. It is not cloned.
	   * If no data is provided, the constructed object will be empty, but still
	   * valid.
	   * @extends {jspb.Message}
	   * @constructor
	   */


	  proto.types.FnArgument = function (opt_data) {
	    googleProtobuf.Message.initialize(this, opt_data, 0, -1, null, null);
	  };

	  goog.inherits(proto.types.FnArgument, googleProtobuf.Message);

	  if (googleProtobuf.Message.GENERATE_TO_OBJECT) {
	    /**
	     * Creates an object representation of this proto suitable for use in Soy templates.
	     * Field names that are reserved in JavaScript and will be renamed to pb_name.
	     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	     * For the list of reserved names please see:
	     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
	     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
	     *     for transitional soy proto support: http://goto/soy-param-migration
	     * @return {!Object}
	     */
	    proto.types.FnArgument.prototype.toObject = function (opt_includeInstance) {
	      return proto.types.FnArgument.toObject(opt_includeInstance, this);
	    };
	    /**
	     * Static version of the {@see toObject} method.
	     * @param {boolean|undefined} includeInstance Whether to include the JSPB
	     *     instance for transitional soy proto support:
	     *     http://goto/soy-param-migration
	     * @param {!proto.types.FnArgument} msg The msg instance to transform.
	     * @return {!Object}
	     * @suppress {unusedLocalVariables} f is only used for nested messages
	     */


	    proto.types.FnArgument.toObject = function (includeInstance, msg) {
	      var obj = {
	        name: googleProtobuf.Message.getFieldWithDefault(msg, 1, "")
	      };

	      if (includeInstance) {
	        obj.$jspbMessageInstance = msg;
	      }

	      return obj;
	    };
	  }
	  /**
	   * Deserializes binary data (in protobuf wire format).
	   * @param {jspb.ByteSource} bytes The bytes to deserialize.
	   * @return {!proto.types.FnArgument}
	   */


	  proto.types.FnArgument.deserializeBinary = function (bytes) {
	    var reader = new googleProtobuf.BinaryReader(bytes);
	    var msg = new proto.types.FnArgument();
	    return proto.types.FnArgument.deserializeBinaryFromReader(msg, reader);
	  };
	  /**
	   * Deserializes binary data (in protobuf wire format) from the
	   * given reader into the given message object.
	   * @param {!proto.types.FnArgument} msg The message object to deserialize into.
	   * @param {!jspb.BinaryReader} reader The BinaryReader to use.
	   * @return {!proto.types.FnArgument}
	   */


	  proto.types.FnArgument.deserializeBinaryFromReader = function (msg, reader) {
	    while (reader.nextField()) {
	      if (reader.isEndGroup()) {
	        break;
	      }

	      var field = reader.getFieldNumber();

	      switch (field) {
	        case 1:
	          var value =
	          /** @type {string} */
	          reader.readString();
	          msg.setName(value);
	          break;

	        default:
	          reader.skipField();
	          break;
	      }
	    }

	    return msg;
	  };
	  /**
	   * Serializes the message to binary data (in protobuf wire format).
	   * @return {!Uint8Array}
	   */


	  proto.types.FnArgument.prototype.serializeBinary = function () {
	    var writer = new googleProtobuf.BinaryWriter();
	    proto.types.FnArgument.serializeBinaryToWriter(this, writer);
	    return writer.getResultBuffer();
	  };
	  /**
	   * Serializes the given message to binary data (in protobuf wire
	   * format), writing to the given BinaryWriter.
	   * @param {!proto.types.FnArgument} message
	   * @param {!jspb.BinaryWriter} writer
	   * @suppress {unusedLocalVariables} f is only used for nested messages
	   */


	  proto.types.FnArgument.serializeBinaryToWriter = function (message, writer) {
	    var f = undefined;
	    f = message.getName();

	    if (f.length > 0) {
	      writer.writeString(1, f);
	    }
	  };
	  /**
	   * optional string name = 1;
	   * @return {string}
	   */


	  proto.types.FnArgument.prototype.getName = function () {
	    return (
	      /** @type {string} */
	      googleProtobuf.Message.getFieldWithDefault(this, 1, "")
	    );
	  };
	  /** @param {string} value */


	  proto.types.FnArgument.prototype.setName = function (value) {
	    googleProtobuf.Message.setField(this, 1, value);
	  };
	  /**
	   * Generated by JsPbCodeGenerator.
	   * @param {Array=} opt_data Optional initial data array, typically from a
	   * server response, or constructed directly in Javascript. The array is used
	   * in place and becomes part of the constructed object. It is not cloned.
	   * If no data is provided, the constructed object will be empty, but still
	   * valid.
	   * @extends {jspb.Message}
	   * @constructor
	   */


	  proto.types.Function = function (opt_data) {
	    googleProtobuf.Message.initialize(this, opt_data, 0, -1, proto.types.Function.repeatedFields_, null);
	  };

	  goog.inherits(proto.types.Function, googleProtobuf.Message);
	  /**
	   * List of repeated fields within this message type.
	   * @private {!Array<number>}
	   * @const
	   */


	  proto.types.Function.repeatedFields_ = [2];

	  if (googleProtobuf.Message.GENERATE_TO_OBJECT) {
	    /**
	     * Creates an object representation of this proto suitable for use in Soy templates.
	     * Field names that are reserved in JavaScript and will be renamed to pb_name.
	     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	     * For the list of reserved names please see:
	     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
	     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
	     *     for transitional soy proto support: http://goto/soy-param-migration
	     * @return {!Object}
	     */
	    proto.types.Function.prototype.toObject = function (opt_includeInstance) {
	      return proto.types.Function.toObject(opt_includeInstance, this);
	    };
	    /**
	     * Static version of the {@see toObject} method.
	     * @param {boolean|undefined} includeInstance Whether to include the JSPB
	     *     instance for transitional soy proto support:
	     *     http://goto/soy-param-migration
	     * @param {!proto.types.Function} msg The msg instance to transform.
	     * @return {!Object}
	     * @suppress {unusedLocalVariables} f is only used for nested messages
	     */


	    proto.types.Function.toObject = function (includeInstance, msg) {
	      var obj = {
	        name: googleProtobuf.Message.getFieldWithDefault(msg, 1, ""),
	        argumentsList: googleProtobuf.Message.toObjectList(msg.getArgumentsList(), proto.types.FnArgument.toObject, includeInstance)
	      };

	      if (includeInstance) {
	        obj.$jspbMessageInstance = msg;
	      }

	      return obj;
	    };
	  }
	  /**
	   * Deserializes binary data (in protobuf wire format).
	   * @param {jspb.ByteSource} bytes The bytes to deserialize.
	   * @return {!proto.types.Function}
	   */


	  proto.types.Function.deserializeBinary = function (bytes) {
	    var reader = new googleProtobuf.BinaryReader(bytes);
	    var msg = new proto.types.Function();
	    return proto.types.Function.deserializeBinaryFromReader(msg, reader);
	  };
	  /**
	   * Deserializes binary data (in protobuf wire format) from the
	   * given reader into the given message object.
	   * @param {!proto.types.Function} msg The message object to deserialize into.
	   * @param {!jspb.BinaryReader} reader The BinaryReader to use.
	   * @return {!proto.types.Function}
	   */


	  proto.types.Function.deserializeBinaryFromReader = function (msg, reader) {
	    while (reader.nextField()) {
	      if (reader.isEndGroup()) {
	        break;
	      }

	      var field = reader.getFieldNumber();

	      switch (field) {
	        case 1:
	          var value =
	          /** @type {string} */
	          reader.readString();
	          msg.setName(value);
	          break;

	        case 2:
	          var value = new proto.types.FnArgument();
	          reader.readMessage(value, proto.types.FnArgument.deserializeBinaryFromReader);
	          msg.addArguments(value);
	          break;

	        default:
	          reader.skipField();
	          break;
	      }
	    }

	    return msg;
	  };
	  /**
	   * Serializes the message to binary data (in protobuf wire format).
	   * @return {!Uint8Array}
	   */


	  proto.types.Function.prototype.serializeBinary = function () {
	    var writer = new googleProtobuf.BinaryWriter();
	    proto.types.Function.serializeBinaryToWriter(this, writer);
	    return writer.getResultBuffer();
	  };
	  /**
	   * Serializes the given message to binary data (in protobuf wire
	   * format), writing to the given BinaryWriter.
	   * @param {!proto.types.Function} message
	   * @param {!jspb.BinaryWriter} writer
	   * @suppress {unusedLocalVariables} f is only used for nested messages
	   */


	  proto.types.Function.serializeBinaryToWriter = function (message, writer) {
	    var f = undefined;
	    f = message.getName();

	    if (f.length > 0) {
	      writer.writeString(1, f);
	    }

	    f = message.getArgumentsList();

	    if (f.length > 0) {
	      writer.writeRepeatedMessage(2, f, proto.types.FnArgument.serializeBinaryToWriter);
	    }
	  };
	  /**
	   * optional string name = 1;
	   * @return {string}
	   */


	  proto.types.Function.prototype.getName = function () {
	    return (
	      /** @type {string} */
	      googleProtobuf.Message.getFieldWithDefault(this, 1, "")
	    );
	  };
	  /** @param {string} value */


	  proto.types.Function.prototype.setName = function (value) {
	    googleProtobuf.Message.setField(this, 1, value);
	  };
	  /**
	   * repeated FnArgument arguments = 2;
	   * @return {!Array.<!proto.types.FnArgument>}
	   */


	  proto.types.Function.prototype.getArgumentsList = function () {
	    return (
	      /** @type{!Array.<!proto.types.FnArgument>} */
	      googleProtobuf.Message.getRepeatedWrapperField(this, proto.types.FnArgument, 2)
	    );
	  };
	  /** @param {!Array.<!proto.types.FnArgument>} value */


	  proto.types.Function.prototype.setArgumentsList = function (value) {
	    googleProtobuf.Message.setRepeatedWrapperField(this, 2, value);
	  };
	  /**
	   * @param {!proto.types.FnArgument=} opt_value
	   * @param {number=} opt_index
	   * @return {!proto.types.FnArgument}
	   */


	  proto.types.Function.prototype.addArguments = function (opt_value, opt_index) {
	    return googleProtobuf.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.types.FnArgument, opt_index);
	  };

	  proto.types.Function.prototype.clearArgumentsList = function () {
	    this.setArgumentsList([]);
	  };
	  /**
	   * Generated by JsPbCodeGenerator.
	   * @param {Array=} opt_data Optional initial data array, typically from a
	   * server response, or constructed directly in Javascript. The array is used
	   * in place and becomes part of the constructed object. It is not cloned.
	   * If no data is provided, the constructed object will be empty, but still
	   * valid.
	   * @extends {jspb.Message}
	   * @constructor
	   */


	  proto.types.ABI = function (opt_data) {
	    googleProtobuf.Message.initialize(this, opt_data, 0, -1, proto.types.ABI.repeatedFields_, null);
	  };

	  goog.inherits(proto.types.ABI, googleProtobuf.Message);
	  /**
	   * List of repeated fields within this message type.
	   * @private {!Array<number>}
	   * @const
	   */


	  proto.types.ABI.repeatedFields_ = [3];

	  if (googleProtobuf.Message.GENERATE_TO_OBJECT) {
	    /**
	     * Creates an object representation of this proto suitable for use in Soy templates.
	     * Field names that are reserved in JavaScript and will be renamed to pb_name.
	     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	     * For the list of reserved names please see:
	     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
	     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
	     *     for transitional soy proto support: http://goto/soy-param-migration
	     * @return {!Object}
	     */
	    proto.types.ABI.prototype.toObject = function (opt_includeInstance) {
	      return proto.types.ABI.toObject(opt_includeInstance, this);
	    };
	    /**
	     * Static version of the {@see toObject} method.
	     * @param {boolean|undefined} includeInstance Whether to include the JSPB
	     *     instance for transitional soy proto support:
	     *     http://goto/soy-param-migration
	     * @param {!proto.types.ABI} msg The msg instance to transform.
	     * @return {!Object}
	     * @suppress {unusedLocalVariables} f is only used for nested messages
	     */


	    proto.types.ABI.toObject = function (includeInstance, msg) {
	      var obj = {
	        version: googleProtobuf.Message.getFieldWithDefault(msg, 1, ""),
	        language: googleProtobuf.Message.getFieldWithDefault(msg, 2, ""),
	        functionsList: googleProtobuf.Message.toObjectList(msg.getFunctionsList(), proto.types.Function.toObject, includeInstance)
	      };

	      if (includeInstance) {
	        obj.$jspbMessageInstance = msg;
	      }

	      return obj;
	    };
	  }
	  /**
	   * Deserializes binary data (in protobuf wire format).
	   * @param {jspb.ByteSource} bytes The bytes to deserialize.
	   * @return {!proto.types.ABI}
	   */


	  proto.types.ABI.deserializeBinary = function (bytes) {
	    var reader = new googleProtobuf.BinaryReader(bytes);
	    var msg = new proto.types.ABI();
	    return proto.types.ABI.deserializeBinaryFromReader(msg, reader);
	  };
	  /**
	   * Deserializes binary data (in protobuf wire format) from the
	   * given reader into the given message object.
	   * @param {!proto.types.ABI} msg The message object to deserialize into.
	   * @param {!jspb.BinaryReader} reader The BinaryReader to use.
	   * @return {!proto.types.ABI}
	   */


	  proto.types.ABI.deserializeBinaryFromReader = function (msg, reader) {
	    while (reader.nextField()) {
	      if (reader.isEndGroup()) {
	        break;
	      }

	      var field = reader.getFieldNumber();

	      switch (field) {
	        case 1:
	          var value =
	          /** @type {string} */
	          reader.readString();
	          msg.setVersion(value);
	          break;

	        case 2:
	          var value =
	          /** @type {string} */
	          reader.readString();
	          msg.setLanguage(value);
	          break;

	        case 3:
	          var value = new proto.types.Function();
	          reader.readMessage(value, proto.types.Function.deserializeBinaryFromReader);
	          msg.addFunctions(value);
	          break;

	        default:
	          reader.skipField();
	          break;
	      }
	    }

	    return msg;
	  };
	  /**
	   * Serializes the message to binary data (in protobuf wire format).
	   * @return {!Uint8Array}
	   */


	  proto.types.ABI.prototype.serializeBinary = function () {
	    var writer = new googleProtobuf.BinaryWriter();
	    proto.types.ABI.serializeBinaryToWriter(this, writer);
	    return writer.getResultBuffer();
	  };
	  /**
	   * Serializes the given message to binary data (in protobuf wire
	   * format), writing to the given BinaryWriter.
	   * @param {!proto.types.ABI} message
	   * @param {!jspb.BinaryWriter} writer
	   * @suppress {unusedLocalVariables} f is only used for nested messages
	   */


	  proto.types.ABI.serializeBinaryToWriter = function (message, writer) {
	    var f = undefined;
	    f = message.getVersion();

	    if (f.length > 0) {
	      writer.writeString(1, f);
	    }

	    f = message.getLanguage();

	    if (f.length > 0) {
	      writer.writeString(2, f);
	    }

	    f = message.getFunctionsList();

	    if (f.length > 0) {
	      writer.writeRepeatedMessage(3, f, proto.types.Function.serializeBinaryToWriter);
	    }
	  };
	  /**
	   * optional string version = 1;
	   * @return {string}
	   */


	  proto.types.ABI.prototype.getVersion = function () {
	    return (
	      /** @type {string} */
	      googleProtobuf.Message.getFieldWithDefault(this, 1, "")
	    );
	  };
	  /** @param {string} value */


	  proto.types.ABI.prototype.setVersion = function (value) {
	    googleProtobuf.Message.setField(this, 1, value);
	  };
	  /**
	   * optional string language = 2;
	   * @return {string}
	   */


	  proto.types.ABI.prototype.getLanguage = function () {
	    return (
	      /** @type {string} */
	      googleProtobuf.Message.getFieldWithDefault(this, 2, "")
	    );
	  };
	  /** @param {string} value */


	  proto.types.ABI.prototype.setLanguage = function (value) {
	    googleProtobuf.Message.setField(this, 2, value);
	  };
	  /**
	   * repeated Function functions = 3;
	   * @return {!Array.<!proto.types.Function>}
	   */


	  proto.types.ABI.prototype.getFunctionsList = function () {
	    return (
	      /** @type{!Array.<!proto.types.Function>} */
	      googleProtobuf.Message.getRepeatedWrapperField(this, proto.types.Function, 3)
	    );
	  };
	  /** @param {!Array.<!proto.types.Function>} value */


	  proto.types.ABI.prototype.setFunctionsList = function (value) {
	    googleProtobuf.Message.setRepeatedWrapperField(this, 3, value);
	  };
	  /**
	   * @param {!proto.types.Function=} opt_value
	   * @param {number=} opt_index
	   * @return {!proto.types.Function}
	   */


	  proto.types.ABI.prototype.addFunctions = function (opt_value, opt_index) {
	    return googleProtobuf.Message.addToRepeatedWrapperField(this, 3, opt_value, proto.types.Function, opt_index);
	  };

	  proto.types.ABI.prototype.clearFunctionsList = function () {
	    this.setFunctionsList([]);
	  };
	  /**
	   * Generated by JsPbCodeGenerator.
	   * @param {Array=} opt_data Optional initial data array, typically from a
	   * server response, or constructed directly in Javascript. The array is used
	   * in place and becomes part of the constructed object. It is not cloned.
	   * If no data is provided, the constructed object will be empty, but still
	   * valid.
	   * @extends {jspb.Message}
	   * @constructor
	   */


	  proto.types.Query = function (opt_data) {
	    googleProtobuf.Message.initialize(this, opt_data, 0, -1, null, null);
	  };

	  goog.inherits(proto.types.Query, googleProtobuf.Message);

	  if (googleProtobuf.Message.GENERATE_TO_OBJECT) {
	    /**
	     * Creates an object representation of this proto suitable for use in Soy templates.
	     * Field names that are reserved in JavaScript and will be renamed to pb_name.
	     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	     * For the list of reserved names please see:
	     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
	     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
	     *     for transitional soy proto support: http://goto/soy-param-migration
	     * @return {!Object}
	     */
	    proto.types.Query.prototype.toObject = function (opt_includeInstance) {
	      return proto.types.Query.toObject(opt_includeInstance, this);
	    };
	    /**
	     * Static version of the {@see toObject} method.
	     * @param {boolean|undefined} includeInstance Whether to include the JSPB
	     *     instance for transitional soy proto support:
	     *     http://goto/soy-param-migration
	     * @param {!proto.types.Query} msg The msg instance to transform.
	     * @return {!Object}
	     * @suppress {unusedLocalVariables} f is only used for nested messages
	     */


	    proto.types.Query.toObject = function (includeInstance, msg) {
	      var obj = {
	        contractaddress: msg.getContractaddress_asB64(),
	        queryinfo: msg.getQueryinfo_asB64()
	      };

	      if (includeInstance) {
	        obj.$jspbMessageInstance = msg;
	      }

	      return obj;
	    };
	  }
	  /**
	   * Deserializes binary data (in protobuf wire format).
	   * @param {jspb.ByteSource} bytes The bytes to deserialize.
	   * @return {!proto.types.Query}
	   */


	  proto.types.Query.deserializeBinary = function (bytes) {
	    var reader = new googleProtobuf.BinaryReader(bytes);
	    var msg = new proto.types.Query();
	    return proto.types.Query.deserializeBinaryFromReader(msg, reader);
	  };
	  /**
	   * Deserializes binary data (in protobuf wire format) from the
	   * given reader into the given message object.
	   * @param {!proto.types.Query} msg The message object to deserialize into.
	   * @param {!jspb.BinaryReader} reader The BinaryReader to use.
	   * @return {!proto.types.Query}
	   */


	  proto.types.Query.deserializeBinaryFromReader = function (msg, reader) {
	    while (reader.nextField()) {
	      if (reader.isEndGroup()) {
	        break;
	      }

	      var field = reader.getFieldNumber();

	      switch (field) {
	        case 1:
	          var value =
	          /** @type {!Uint8Array} */
	          reader.readBytes();
	          msg.setContractaddress(value);
	          break;

	        case 2:
	          var value =
	          /** @type {!Uint8Array} */
	          reader.readBytes();
	          msg.setQueryinfo(value);
	          break;

	        default:
	          reader.skipField();
	          break;
	      }
	    }

	    return msg;
	  };
	  /**
	   * Serializes the message to binary data (in protobuf wire format).
	   * @return {!Uint8Array}
	   */


	  proto.types.Query.prototype.serializeBinary = function () {
	    var writer = new googleProtobuf.BinaryWriter();
	    proto.types.Query.serializeBinaryToWriter(this, writer);
	    return writer.getResultBuffer();
	  };
	  /**
	   * Serializes the given message to binary data (in protobuf wire
	   * format), writing to the given BinaryWriter.
	   * @param {!proto.types.Query} message
	   * @param {!jspb.BinaryWriter} writer
	   * @suppress {unusedLocalVariables} f is only used for nested messages
	   */


	  proto.types.Query.serializeBinaryToWriter = function (message, writer) {
	    var f = undefined;
	    f = message.getContractaddress_asU8();

	    if (f.length > 0) {
	      writer.writeBytes(1, f);
	    }

	    f = message.getQueryinfo_asU8();

	    if (f.length > 0) {
	      writer.writeBytes(2, f);
	    }
	  };
	  /**
	   * optional bytes contractAddress = 1;
	   * @return {!(string|Uint8Array)}
	   */


	  proto.types.Query.prototype.getContractaddress = function () {
	    return (
	      /** @type {!(string|Uint8Array)} */
	      googleProtobuf.Message.getFieldWithDefault(this, 1, "")
	    );
	  };
	  /**
	   * optional bytes contractAddress = 1;
	   * This is a type-conversion wrapper around `getContractaddress()`
	   * @return {string}
	   */


	  proto.types.Query.prototype.getContractaddress_asB64 = function () {
	    return (
	      /** @type {string} */
	      googleProtobuf.Message.bytesAsB64(this.getContractaddress())
	    );
	  };
	  /**
	   * optional bytes contractAddress = 1;
	   * Note that Uint8Array is not supported on all browsers.
	   * @see http://caniuse.com/Uint8Array
	   * This is a type-conversion wrapper around `getContractaddress()`
	   * @return {!Uint8Array}
	   */


	  proto.types.Query.prototype.getContractaddress_asU8 = function () {
	    return (
	      /** @type {!Uint8Array} */
	      googleProtobuf.Message.bytesAsU8(this.getContractaddress())
	    );
	  };
	  /** @param {!(string|Uint8Array)} value */


	  proto.types.Query.prototype.setContractaddress = function (value) {
	    googleProtobuf.Message.setField(this, 1, value);
	  };
	  /**
	   * optional bytes queryinfo = 2;
	   * @return {!(string|Uint8Array)}
	   */


	  proto.types.Query.prototype.getQueryinfo = function () {
	    return (
	      /** @type {!(string|Uint8Array)} */
	      googleProtobuf.Message.getFieldWithDefault(this, 2, "")
	    );
	  };
	  /**
	   * optional bytes queryinfo = 2;
	   * This is a type-conversion wrapper around `getQueryinfo()`
	   * @return {string}
	   */


	  proto.types.Query.prototype.getQueryinfo_asB64 = function () {
	    return (
	      /** @type {string} */
	      googleProtobuf.Message.bytesAsB64(this.getQueryinfo())
	    );
	  };
	  /**
	   * optional bytes queryinfo = 2;
	   * Note that Uint8Array is not supported on all browsers.
	   * @see http://caniuse.com/Uint8Array
	   * This is a type-conversion wrapper around `getQueryinfo()`
	   * @return {!Uint8Array}
	   */


	  proto.types.Query.prototype.getQueryinfo_asU8 = function () {
	    return (
	      /** @type {!Uint8Array} */
	      googleProtobuf.Message.bytesAsU8(this.getQueryinfo())
	    );
	  };
	  /** @param {!(string|Uint8Array)} value */


	  proto.types.Query.prototype.setQueryinfo = function (value) {
	    googleProtobuf.Message.setField(this, 2, value);
	  };
	  /**
	   * @enum {number}
	   */


	  proto.types.TxType = {
	    NORMAL: 0,
	    GOVERNANCE: 1
	  };
	  goog.object.extend(exports, proto.types);
	});
	var blockchain_pb_1 = blockchain_pb.TxList;
	var blockchain_pb_2 = blockchain_pb.TxBody;
	var blockchain_pb_3 = blockchain_pb.Tx;
	var blockchain_pb_4 = blockchain_pb.Block;

	var account_pb = createCommonjsModule(function (module, exports) {
	  /**
	   * @fileoverview
	   * @enhanceable
	   * @suppress {messageConventions} JS Compiler reports an error if a variable or
	   *     field starts with 'MSG_' and isn't a translatable message.
	   * @public
	   */
	  // GENERATED CODE -- DO NOT EDIT!
	  var goog = googleProtobuf;
	  var global = Function('return this')();
	  goog.exportSymbol('proto.types.Account', null, global);
	  goog.exportSymbol('proto.types.AccountList', null, global);
	  /**
	   * Generated by JsPbCodeGenerator.
	   * @param {Array=} opt_data Optional initial data array, typically from a
	   * server response, or constructed directly in Javascript. The array is used
	   * in place and becomes part of the constructed object. It is not cloned.
	   * If no data is provided, the constructed object will be empty, but still
	   * valid.
	   * @extends {jspb.Message}
	   * @constructor
	   */

	  proto.types.Account = function (opt_data) {
	    googleProtobuf.Message.initialize(this, opt_data, 0, -1, null, null);
	  };

	  goog.inherits(proto.types.Account, googleProtobuf.Message);

	  if (googleProtobuf.Message.GENERATE_TO_OBJECT) {
	    /**
	     * Creates an object representation of this proto suitable for use in Soy templates.
	     * Field names that are reserved in JavaScript and will be renamed to pb_name.
	     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	     * For the list of reserved names please see:
	     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
	     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
	     *     for transitional soy proto support: http://goto/soy-param-migration
	     * @return {!Object}
	     */
	    proto.types.Account.prototype.toObject = function (opt_includeInstance) {
	      return proto.types.Account.toObject(opt_includeInstance, this);
	    };
	    /**
	     * Static version of the {@see toObject} method.
	     * @param {boolean|undefined} includeInstance Whether to include the JSPB
	     *     instance for transitional soy proto support:
	     *     http://goto/soy-param-migration
	     * @param {!proto.types.Account} msg The msg instance to transform.
	     * @return {!Object}
	     * @suppress {unusedLocalVariables} f is only used for nested messages
	     */


	    proto.types.Account.toObject = function (includeInstance, msg) {
	      var obj = {
	        address: msg.getAddress_asB64()
	      };

	      if (includeInstance) {
	        obj.$jspbMessageInstance = msg;
	      }

	      return obj;
	    };
	  }
	  /**
	   * Deserializes binary data (in protobuf wire format).
	   * @param {jspb.ByteSource} bytes The bytes to deserialize.
	   * @return {!proto.types.Account}
	   */


	  proto.types.Account.deserializeBinary = function (bytes) {
	    var reader = new googleProtobuf.BinaryReader(bytes);
	    var msg = new proto.types.Account();
	    return proto.types.Account.deserializeBinaryFromReader(msg, reader);
	  };
	  /**
	   * Deserializes binary data (in protobuf wire format) from the
	   * given reader into the given message object.
	   * @param {!proto.types.Account} msg The message object to deserialize into.
	   * @param {!jspb.BinaryReader} reader The BinaryReader to use.
	   * @return {!proto.types.Account}
	   */


	  proto.types.Account.deserializeBinaryFromReader = function (msg, reader) {
	    while (reader.nextField()) {
	      if (reader.isEndGroup()) {
	        break;
	      }

	      var field = reader.getFieldNumber();

	      switch (field) {
	        case 1:
	          var value =
	          /** @type {!Uint8Array} */
	          reader.readBytes();
	          msg.setAddress(value);
	          break;

	        default:
	          reader.skipField();
	          break;
	      }
	    }

	    return msg;
	  };
	  /**
	   * Serializes the message to binary data (in protobuf wire format).
	   * @return {!Uint8Array}
	   */


	  proto.types.Account.prototype.serializeBinary = function () {
	    var writer = new googleProtobuf.BinaryWriter();
	    proto.types.Account.serializeBinaryToWriter(this, writer);
	    return writer.getResultBuffer();
	  };
	  /**
	   * Serializes the given message to binary data (in protobuf wire
	   * format), writing to the given BinaryWriter.
	   * @param {!proto.types.Account} message
	   * @param {!jspb.BinaryWriter} writer
	   * @suppress {unusedLocalVariables} f is only used for nested messages
	   */


	  proto.types.Account.serializeBinaryToWriter = function (message, writer) {
	    var f = undefined;
	    f = message.getAddress_asU8();

	    if (f.length > 0) {
	      writer.writeBytes(1, f);
	    }
	  };
	  /**
	   * optional bytes address = 1;
	   * @return {!(string|Uint8Array)}
	   */


	  proto.types.Account.prototype.getAddress = function () {
	    return (
	      /** @type {!(string|Uint8Array)} */
	      googleProtobuf.Message.getFieldWithDefault(this, 1, "")
	    );
	  };
	  /**
	   * optional bytes address = 1;
	   * This is a type-conversion wrapper around `getAddress()`
	   * @return {string}
	   */


	  proto.types.Account.prototype.getAddress_asB64 = function () {
	    return (
	      /** @type {string} */
	      googleProtobuf.Message.bytesAsB64(this.getAddress())
	    );
	  };
	  /**
	   * optional bytes address = 1;
	   * Note that Uint8Array is not supported on all browsers.
	   * @see http://caniuse.com/Uint8Array
	   * This is a type-conversion wrapper around `getAddress()`
	   * @return {!Uint8Array}
	   */


	  proto.types.Account.prototype.getAddress_asU8 = function () {
	    return (
	      /** @type {!Uint8Array} */
	      googleProtobuf.Message.bytesAsU8(this.getAddress())
	    );
	  };
	  /** @param {!(string|Uint8Array)} value */


	  proto.types.Account.prototype.setAddress = function (value) {
	    googleProtobuf.Message.setField(this, 1, value);
	  };
	  /**
	   * Generated by JsPbCodeGenerator.
	   * @param {Array=} opt_data Optional initial data array, typically from a
	   * server response, or constructed directly in Javascript. The array is used
	   * in place and becomes part of the constructed object. It is not cloned.
	   * If no data is provided, the constructed object will be empty, but still
	   * valid.
	   * @extends {jspb.Message}
	   * @constructor
	   */


	  proto.types.AccountList = function (opt_data) {
	    googleProtobuf.Message.initialize(this, opt_data, 0, -1, proto.types.AccountList.repeatedFields_, null);
	  };

	  goog.inherits(proto.types.AccountList, googleProtobuf.Message);
	  /**
	   * List of repeated fields within this message type.
	   * @private {!Array<number>}
	   * @const
	   */


	  proto.types.AccountList.repeatedFields_ = [1];

	  if (googleProtobuf.Message.GENERATE_TO_OBJECT) {
	    /**
	     * Creates an object representation of this proto suitable for use in Soy templates.
	     * Field names that are reserved in JavaScript and will be renamed to pb_name.
	     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	     * For the list of reserved names please see:
	     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
	     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
	     *     for transitional soy proto support: http://goto/soy-param-migration
	     * @return {!Object}
	     */
	    proto.types.AccountList.prototype.toObject = function (opt_includeInstance) {
	      return proto.types.AccountList.toObject(opt_includeInstance, this);
	    };
	    /**
	     * Static version of the {@see toObject} method.
	     * @param {boolean|undefined} includeInstance Whether to include the JSPB
	     *     instance for transitional soy proto support:
	     *     http://goto/soy-param-migration
	     * @param {!proto.types.AccountList} msg The msg instance to transform.
	     * @return {!Object}
	     * @suppress {unusedLocalVariables} f is only used for nested messages
	     */


	    proto.types.AccountList.toObject = function (includeInstance, msg) {
	      var obj = {
	        accountsList: googleProtobuf.Message.toObjectList(msg.getAccountsList(), proto.types.Account.toObject, includeInstance)
	      };

	      if (includeInstance) {
	        obj.$jspbMessageInstance = msg;
	      }

	      return obj;
	    };
	  }
	  /**
	   * Deserializes binary data (in protobuf wire format).
	   * @param {jspb.ByteSource} bytes The bytes to deserialize.
	   * @return {!proto.types.AccountList}
	   */


	  proto.types.AccountList.deserializeBinary = function (bytes) {
	    var reader = new googleProtobuf.BinaryReader(bytes);
	    var msg = new proto.types.AccountList();
	    return proto.types.AccountList.deserializeBinaryFromReader(msg, reader);
	  };
	  /**
	   * Deserializes binary data (in protobuf wire format) from the
	   * given reader into the given message object.
	   * @param {!proto.types.AccountList} msg The message object to deserialize into.
	   * @param {!jspb.BinaryReader} reader The BinaryReader to use.
	   * @return {!proto.types.AccountList}
	   */


	  proto.types.AccountList.deserializeBinaryFromReader = function (msg, reader) {
	    while (reader.nextField()) {
	      if (reader.isEndGroup()) {
	        break;
	      }

	      var field = reader.getFieldNumber();

	      switch (field) {
	        case 1:
	          var value = new proto.types.Account();
	          reader.readMessage(value, proto.types.Account.deserializeBinaryFromReader);
	          msg.addAccounts(value);
	          break;

	        default:
	          reader.skipField();
	          break;
	      }
	    }

	    return msg;
	  };
	  /**
	   * Serializes the message to binary data (in protobuf wire format).
	   * @return {!Uint8Array}
	   */


	  proto.types.AccountList.prototype.serializeBinary = function () {
	    var writer = new googleProtobuf.BinaryWriter();
	    proto.types.AccountList.serializeBinaryToWriter(this, writer);
	    return writer.getResultBuffer();
	  };
	  /**
	   * Serializes the given message to binary data (in protobuf wire
	   * format), writing to the given BinaryWriter.
	   * @param {!proto.types.AccountList} message
	   * @param {!jspb.BinaryWriter} writer
	   * @suppress {unusedLocalVariables} f is only used for nested messages
	   */


	  proto.types.AccountList.serializeBinaryToWriter = function (message, writer) {
	    var f = undefined;
	    f = message.getAccountsList();

	    if (f.length > 0) {
	      writer.writeRepeatedMessage(1, f, proto.types.Account.serializeBinaryToWriter);
	    }
	  };
	  /**
	   * repeated Account accounts = 1;
	   * @return {!Array.<!proto.types.Account>}
	   */


	  proto.types.AccountList.prototype.getAccountsList = function () {
	    return (
	      /** @type{!Array.<!proto.types.Account>} */
	      googleProtobuf.Message.getRepeatedWrapperField(this, proto.types.Account, 1)
	    );
	  };
	  /** @param {!Array.<!proto.types.Account>} value */


	  proto.types.AccountList.prototype.setAccountsList = function (value) {
	    googleProtobuf.Message.setRepeatedWrapperField(this, 1, value);
	  };
	  /**
	   * @param {!proto.types.Account=} opt_value
	   * @param {number=} opt_index
	   * @return {!proto.types.Account}
	   */


	  proto.types.AccountList.prototype.addAccounts = function (opt_value, opt_index) {
	    return googleProtobuf.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.types.Account, opt_index);
	  };

	  proto.types.AccountList.prototype.clearAccountsList = function () {
	    this.setAccountsList([]);
	  };

	  goog.object.extend(exports, proto.types);
	});
	var account_pb_1 = account_pb.Account;

	var node_pb = createCommonjsModule(function (module, exports) {
	  /**
	   * @fileoverview
	   * @enhanceable
	   * @suppress {messageConventions} JS Compiler reports an error if a variable or
	   *     field starts with 'MSG_' and isn't a translatable message.
	   * @public
	   */
	  // GENERATED CODE -- DO NOT EDIT!
	  var goog = googleProtobuf;
	  var global = Function('return this')();
	  goog.exportSymbol('proto.types.PeerAddress', null, global);
	  /**
	   * Generated by JsPbCodeGenerator.
	   * @param {Array=} opt_data Optional initial data array, typically from a
	   * server response, or constructed directly in Javascript. The array is used
	   * in place and becomes part of the constructed object. It is not cloned.
	   * If no data is provided, the constructed object will be empty, but still
	   * valid.
	   * @extends {jspb.Message}
	   * @constructor
	   */

	  proto.types.PeerAddress = function (opt_data) {
	    googleProtobuf.Message.initialize(this, opt_data, 0, -1, null, null);
	  };

	  goog.inherits(proto.types.PeerAddress, googleProtobuf.Message);

	  if (googleProtobuf.Message.GENERATE_TO_OBJECT) {
	    /**
	     * Creates an object representation of this proto suitable for use in Soy templates.
	     * Field names that are reserved in JavaScript and will be renamed to pb_name.
	     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	     * For the list of reserved names please see:
	     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
	     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
	     *     for transitional soy proto support: http://goto/soy-param-migration
	     * @return {!Object}
	     */
	    proto.types.PeerAddress.prototype.toObject = function (opt_includeInstance) {
	      return proto.types.PeerAddress.toObject(opt_includeInstance, this);
	    };
	    /**
	     * Static version of the {@see toObject} method.
	     * @param {boolean|undefined} includeInstance Whether to include the JSPB
	     *     instance for transitional soy proto support:
	     *     http://goto/soy-param-migration
	     * @param {!proto.types.PeerAddress} msg The msg instance to transform.
	     * @return {!Object}
	     * @suppress {unusedLocalVariables} f is only used for nested messages
	     */


	    proto.types.PeerAddress.toObject = function (includeInstance, msg) {
	      var obj = {
	        address: msg.getAddress_asB64(),
	        port: googleProtobuf.Message.getFieldWithDefault(msg, 2, 0),
	        peerid: msg.getPeerid_asB64()
	      };

	      if (includeInstance) {
	        obj.$jspbMessageInstance = msg;
	      }

	      return obj;
	    };
	  }
	  /**
	   * Deserializes binary data (in protobuf wire format).
	   * @param {jspb.ByteSource} bytes The bytes to deserialize.
	   * @return {!proto.types.PeerAddress}
	   */


	  proto.types.PeerAddress.deserializeBinary = function (bytes) {
	    var reader = new googleProtobuf.BinaryReader(bytes);
	    var msg = new proto.types.PeerAddress();
	    return proto.types.PeerAddress.deserializeBinaryFromReader(msg, reader);
	  };
	  /**
	   * Deserializes binary data (in protobuf wire format) from the
	   * given reader into the given message object.
	   * @param {!proto.types.PeerAddress} msg The message object to deserialize into.
	   * @param {!jspb.BinaryReader} reader The BinaryReader to use.
	   * @return {!proto.types.PeerAddress}
	   */


	  proto.types.PeerAddress.deserializeBinaryFromReader = function (msg, reader) {
	    while (reader.nextField()) {
	      if (reader.isEndGroup()) {
	        break;
	      }

	      var field = reader.getFieldNumber();

	      switch (field) {
	        case 1:
	          var value =
	          /** @type {!Uint8Array} */
	          reader.readBytes();
	          msg.setAddress(value);
	          break;

	        case 2:
	          var value =
	          /** @type {number} */
	          reader.readUint32();
	          msg.setPort(value);
	          break;

	        case 3:
	          var value =
	          /** @type {!Uint8Array} */
	          reader.readBytes();
	          msg.setPeerid(value);
	          break;

	        default:
	          reader.skipField();
	          break;
	      }
	    }

	    return msg;
	  };
	  /**
	   * Serializes the message to binary data (in protobuf wire format).
	   * @return {!Uint8Array}
	   */


	  proto.types.PeerAddress.prototype.serializeBinary = function () {
	    var writer = new googleProtobuf.BinaryWriter();
	    proto.types.PeerAddress.serializeBinaryToWriter(this, writer);
	    return writer.getResultBuffer();
	  };
	  /**
	   * Serializes the given message to binary data (in protobuf wire
	   * format), writing to the given BinaryWriter.
	   * @param {!proto.types.PeerAddress} message
	   * @param {!jspb.BinaryWriter} writer
	   * @suppress {unusedLocalVariables} f is only used for nested messages
	   */


	  proto.types.PeerAddress.serializeBinaryToWriter = function (message, writer) {
	    var f = undefined;
	    f = message.getAddress_asU8();

	    if (f.length > 0) {
	      writer.writeBytes(1, f);
	    }

	    f = message.getPort();

	    if (f !== 0) {
	      writer.writeUint32(2, f);
	    }

	    f = message.getPeerid_asU8();

	    if (f.length > 0) {
	      writer.writeBytes(3, f);
	    }
	  };
	  /**
	   * optional bytes address = 1;
	   * @return {!(string|Uint8Array)}
	   */


	  proto.types.PeerAddress.prototype.getAddress = function () {
	    return (
	      /** @type {!(string|Uint8Array)} */
	      googleProtobuf.Message.getFieldWithDefault(this, 1, "")
	    );
	  };
	  /**
	   * optional bytes address = 1;
	   * This is a type-conversion wrapper around `getAddress()`
	   * @return {string}
	   */


	  proto.types.PeerAddress.prototype.getAddress_asB64 = function () {
	    return (
	      /** @type {string} */
	      googleProtobuf.Message.bytesAsB64(this.getAddress())
	    );
	  };
	  /**
	   * optional bytes address = 1;
	   * Note that Uint8Array is not supported on all browsers.
	   * @see http://caniuse.com/Uint8Array
	   * This is a type-conversion wrapper around `getAddress()`
	   * @return {!Uint8Array}
	   */


	  proto.types.PeerAddress.prototype.getAddress_asU8 = function () {
	    return (
	      /** @type {!Uint8Array} */
	      googleProtobuf.Message.bytesAsU8(this.getAddress())
	    );
	  };
	  /** @param {!(string|Uint8Array)} value */


	  proto.types.PeerAddress.prototype.setAddress = function (value) {
	    googleProtobuf.Message.setField(this, 1, value);
	  };
	  /**
	   * optional uint32 port = 2;
	   * @return {number}
	   */


	  proto.types.PeerAddress.prototype.getPort = function () {
	    return (
	      /** @type {number} */
	      googleProtobuf.Message.getFieldWithDefault(this, 2, 0)
	    );
	  };
	  /** @param {number} value */


	  proto.types.PeerAddress.prototype.setPort = function (value) {
	    googleProtobuf.Message.setField(this, 2, value);
	  };
	  /**
	   * optional bytes peerID = 3;
	   * @return {!(string|Uint8Array)}
	   */


	  proto.types.PeerAddress.prototype.getPeerid = function () {
	    return (
	      /** @type {!(string|Uint8Array)} */
	      googleProtobuf.Message.getFieldWithDefault(this, 3, "")
	    );
	  };
	  /**
	   * optional bytes peerID = 3;
	   * This is a type-conversion wrapper around `getPeerid()`
	   * @return {string}
	   */


	  proto.types.PeerAddress.prototype.getPeerid_asB64 = function () {
	    return (
	      /** @type {string} */
	      googleProtobuf.Message.bytesAsB64(this.getPeerid())
	    );
	  };
	  /**
	   * optional bytes peerID = 3;
	   * Note that Uint8Array is not supported on all browsers.
	   * @see http://caniuse.com/Uint8Array
	   * This is a type-conversion wrapper around `getPeerid()`
	   * @return {!Uint8Array}
	   */


	  proto.types.PeerAddress.prototype.getPeerid_asU8 = function () {
	    return (
	      /** @type {!Uint8Array} */
	      googleProtobuf.Message.bytesAsU8(this.getPeerid())
	    );
	  };
	  /** @param {!(string|Uint8Array)} value */


	  proto.types.PeerAddress.prototype.setPeerid = function (value) {
	    googleProtobuf.Message.setField(this, 3, value);
	  };

	  goog.object.extend(exports, proto.types);
	});

	var p2p_pb = createCommonjsModule(function (module, exports) {
	  /**
	   * @fileoverview
	   * @enhanceable
	   * @suppress {messageConventions} JS Compiler reports an error if a variable or
	   *     field starts with 'MSG_' and isn't a translatable message.
	   * @public
	   */
	  // GENERATED CODE -- DO NOT EDIT!
	  var goog = googleProtobuf;
	  var global = Function('return this')();
	  goog.exportSymbol('proto.types.AddressesRequest', null, global);
	  goog.exportSymbol('proto.types.AddressesResponse', null, global);
	  goog.exportSymbol('proto.types.GetBlockHeadersRequest', null, global);
	  goog.exportSymbol('proto.types.GetBlockHeadersResponse', null, global);
	  goog.exportSymbol('proto.types.GetBlockRequest', null, global);
	  goog.exportSymbol('proto.types.GetBlockResponse', null, global);
	  goog.exportSymbol('proto.types.GetMissingRequest', null, global);
	  goog.exportSymbol('proto.types.GetTransactionsRequest', null, global);
	  goog.exportSymbol('proto.types.GetTransactionsResponse', null, global);
	  goog.exportSymbol('proto.types.GoAwayNotice', null, global);
	  goog.exportSymbol('proto.types.MsgHeader', null, global);
	  goog.exportSymbol('proto.types.NewBlockNotice', null, global);
	  goog.exportSymbol('proto.types.NewTransactionsNotice', null, global);
	  goog.exportSymbol('proto.types.P2PMessage', null, global);
	  goog.exportSymbol('proto.types.Ping', null, global);
	  goog.exportSymbol('proto.types.Pong', null, global);
	  goog.exportSymbol('proto.types.ResultStatus', null, global);
	  goog.exportSymbol('proto.types.Status', null, global);
	  /**
	   * Generated by JsPbCodeGenerator.
	   * @param {Array=} opt_data Optional initial data array, typically from a
	   * server response, or constructed directly in Javascript. The array is used
	   * in place and becomes part of the constructed object. It is not cloned.
	   * If no data is provided, the constructed object will be empty, but still
	   * valid.
	   * @extends {jspb.Message}
	   * @constructor
	   */

	  proto.types.MsgHeader = function (opt_data) {
	    googleProtobuf.Message.initialize(this, opt_data, 0, -1, null, null);
	  };

	  goog.inherits(proto.types.MsgHeader, googleProtobuf.Message);

	  if (googleProtobuf.Message.GENERATE_TO_OBJECT) {
	    /**
	     * Creates an object representation of this proto suitable for use in Soy templates.
	     * Field names that are reserved in JavaScript and will be renamed to pb_name.
	     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	     * For the list of reserved names please see:
	     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
	     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
	     *     for transitional soy proto support: http://goto/soy-param-migration
	     * @return {!Object}
	     */
	    proto.types.MsgHeader.prototype.toObject = function (opt_includeInstance) {
	      return proto.types.MsgHeader.toObject(opt_includeInstance, this);
	    };
	    /**
	     * Static version of the {@see toObject} method.
	     * @param {boolean|undefined} includeInstance Whether to include the JSPB
	     *     instance for transitional soy proto support:
	     *     http://goto/soy-param-migration
	     * @param {!proto.types.MsgHeader} msg The msg instance to transform.
	     * @return {!Object}
	     * @suppress {unusedLocalVariables} f is only used for nested messages
	     */


	    proto.types.MsgHeader.toObject = function (includeInstance, msg) {
	      var obj = {
	        clientversion: googleProtobuf.Message.getFieldWithDefault(msg, 1, ""),
	        timestamp: googleProtobuf.Message.getFieldWithDefault(msg, 2, 0),
	        id: googleProtobuf.Message.getFieldWithDefault(msg, 3, ""),
	        gossip: googleProtobuf.Message.getFieldWithDefault(msg, 4, false),
	        peerid: msg.getPeerid_asB64(),
	        nodepubkey: msg.getNodepubkey_asB64(),
	        sign: msg.getSign_asB64(),
	        subprotocol: googleProtobuf.Message.getFieldWithDefault(msg, 8, 0),
	        length: googleProtobuf.Message.getFieldWithDefault(msg, 9, 0)
	      };

	      if (includeInstance) {
	        obj.$jspbMessageInstance = msg;
	      }

	      return obj;
	    };
	  }
	  /**
	   * Deserializes binary data (in protobuf wire format).
	   * @param {jspb.ByteSource} bytes The bytes to deserialize.
	   * @return {!proto.types.MsgHeader}
	   */


	  proto.types.MsgHeader.deserializeBinary = function (bytes) {
	    var reader = new googleProtobuf.BinaryReader(bytes);
	    var msg = new proto.types.MsgHeader();
	    return proto.types.MsgHeader.deserializeBinaryFromReader(msg, reader);
	  };
	  /**
	   * Deserializes binary data (in protobuf wire format) from the
	   * given reader into the given message object.
	   * @param {!proto.types.MsgHeader} msg The message object to deserialize into.
	   * @param {!jspb.BinaryReader} reader The BinaryReader to use.
	   * @return {!proto.types.MsgHeader}
	   */


	  proto.types.MsgHeader.deserializeBinaryFromReader = function (msg, reader) {
	    while (reader.nextField()) {
	      if (reader.isEndGroup()) {
	        break;
	      }

	      var field = reader.getFieldNumber();

	      switch (field) {
	        case 1:
	          var value =
	          /** @type {string} */
	          reader.readString();
	          msg.setClientversion(value);
	          break;

	        case 2:
	          var value =
	          /** @type {number} */
	          reader.readInt64();
	          msg.setTimestamp(value);
	          break;

	        case 3:
	          var value =
	          /** @type {string} */
	          reader.readString();
	          msg.setId(value);
	          break;

	        case 4:
	          var value =
	          /** @type {boolean} */
	          reader.readBool();
	          msg.setGossip(value);
	          break;

	        case 5:
	          var value =
	          /** @type {!Uint8Array} */
	          reader.readBytes();
	          msg.setPeerid(value);
	          break;

	        case 6:
	          var value =
	          /** @type {!Uint8Array} */
	          reader.readBytes();
	          msg.setNodepubkey(value);
	          break;

	        case 7:
	          var value =
	          /** @type {!Uint8Array} */
	          reader.readBytes();
	          msg.setSign(value);
	          break;

	        case 8:
	          var value =
	          /** @type {number} */
	          reader.readUint32();
	          msg.setSubprotocol(value);
	          break;

	        case 9:
	          var value =
	          /** @type {number} */
	          reader.readUint32();
	          msg.setLength(value);
	          break;

	        default:
	          reader.skipField();
	          break;
	      }
	    }

	    return msg;
	  };
	  /**
	   * Serializes the message to binary data (in protobuf wire format).
	   * @return {!Uint8Array}
	   */


	  proto.types.MsgHeader.prototype.serializeBinary = function () {
	    var writer = new googleProtobuf.BinaryWriter();
	    proto.types.MsgHeader.serializeBinaryToWriter(this, writer);
	    return writer.getResultBuffer();
	  };
	  /**
	   * Serializes the given message to binary data (in protobuf wire
	   * format), writing to the given BinaryWriter.
	   * @param {!proto.types.MsgHeader} message
	   * @param {!jspb.BinaryWriter} writer
	   * @suppress {unusedLocalVariables} f is only used for nested messages
	   */


	  proto.types.MsgHeader.serializeBinaryToWriter = function (message, writer) {
	    var f = undefined;
	    f = message.getClientversion();

	    if (f.length > 0) {
	      writer.writeString(1, f);
	    }

	    f = message.getTimestamp();

	    if (f !== 0) {
	      writer.writeInt64(2, f);
	    }

	    f = message.getId();

	    if (f.length > 0) {
	      writer.writeString(3, f);
	    }

	    f = message.getGossip();

	    if (f) {
	      writer.writeBool(4, f);
	    }

	    f = message.getPeerid_asU8();

	    if (f.length > 0) {
	      writer.writeBytes(5, f);
	    }

	    f = message.getNodepubkey_asU8();

	    if (f.length > 0) {
	      writer.writeBytes(6, f);
	    }

	    f = message.getSign_asU8();

	    if (f.length > 0) {
	      writer.writeBytes(7, f);
	    }

	    f = message.getSubprotocol();

	    if (f !== 0) {
	      writer.writeUint32(8, f);
	    }

	    f = message.getLength();

	    if (f !== 0) {
	      writer.writeUint32(9, f);
	    }
	  };
	  /**
	   * optional string clientVersion = 1;
	   * @return {string}
	   */


	  proto.types.MsgHeader.prototype.getClientversion = function () {
	    return (
	      /** @type {string} */
	      googleProtobuf.Message.getFieldWithDefault(this, 1, "")
	    );
	  };
	  /** @param {string} value */


	  proto.types.MsgHeader.prototype.setClientversion = function (value) {
	    googleProtobuf.Message.setField(this, 1, value);
	  };
	  /**
	   * optional int64 timestamp = 2;
	   * @return {number}
	   */


	  proto.types.MsgHeader.prototype.getTimestamp = function () {
	    return (
	      /** @type {number} */
	      googleProtobuf.Message.getFieldWithDefault(this, 2, 0)
	    );
	  };
	  /** @param {number} value */


	  proto.types.MsgHeader.prototype.setTimestamp = function (value) {
	    googleProtobuf.Message.setField(this, 2, value);
	  };
	  /**
	   * optional string id = 3;
	   * @return {string}
	   */


	  proto.types.MsgHeader.prototype.getId = function () {
	    return (
	      /** @type {string} */
	      googleProtobuf.Message.getFieldWithDefault(this, 3, "")
	    );
	  };
	  /** @param {string} value */


	  proto.types.MsgHeader.prototype.setId = function (value) {
	    googleProtobuf.Message.setField(this, 3, value);
	  };
	  /**
	   * optional bool gossip = 4;
	   * Note that Boolean fields may be set to 0/1 when serialized from a Java server.
	   * You should avoid comparisons like {@code val === true/false} in those cases.
	   * @return {boolean}
	   */


	  proto.types.MsgHeader.prototype.getGossip = function () {
	    return (
	      /** @type {boolean} */
	      googleProtobuf.Message.getFieldWithDefault(this, 4, false)
	    );
	  };
	  /** @param {boolean} value */


	  proto.types.MsgHeader.prototype.setGossip = function (value) {
	    googleProtobuf.Message.setField(this, 4, value);
	  };
	  /**
	   * optional bytes peerID = 5;
	   * @return {!(string|Uint8Array)}
	   */


	  proto.types.MsgHeader.prototype.getPeerid = function () {
	    return (
	      /** @type {!(string|Uint8Array)} */
	      googleProtobuf.Message.getFieldWithDefault(this, 5, "")
	    );
	  };
	  /**
	   * optional bytes peerID = 5;
	   * This is a type-conversion wrapper around `getPeerid()`
	   * @return {string}
	   */


	  proto.types.MsgHeader.prototype.getPeerid_asB64 = function () {
	    return (
	      /** @type {string} */
	      googleProtobuf.Message.bytesAsB64(this.getPeerid())
	    );
	  };
	  /**
	   * optional bytes peerID = 5;
	   * Note that Uint8Array is not supported on all browsers.
	   * @see http://caniuse.com/Uint8Array
	   * This is a type-conversion wrapper around `getPeerid()`
	   * @return {!Uint8Array}
	   */


	  proto.types.MsgHeader.prototype.getPeerid_asU8 = function () {
	    return (
	      /** @type {!Uint8Array} */
	      googleProtobuf.Message.bytesAsU8(this.getPeerid())
	    );
	  };
	  /** @param {!(string|Uint8Array)} value */


	  proto.types.MsgHeader.prototype.setPeerid = function (value) {
	    googleProtobuf.Message.setField(this, 5, value);
	  };
	  /**
	   * optional bytes nodePubKey = 6;
	   * @return {!(string|Uint8Array)}
	   */


	  proto.types.MsgHeader.prototype.getNodepubkey = function () {
	    return (
	      /** @type {!(string|Uint8Array)} */
	      googleProtobuf.Message.getFieldWithDefault(this, 6, "")
	    );
	  };
	  /**
	   * optional bytes nodePubKey = 6;
	   * This is a type-conversion wrapper around `getNodepubkey()`
	   * @return {string}
	   */


	  proto.types.MsgHeader.prototype.getNodepubkey_asB64 = function () {
	    return (
	      /** @type {string} */
	      googleProtobuf.Message.bytesAsB64(this.getNodepubkey())
	    );
	  };
	  /**
	   * optional bytes nodePubKey = 6;
	   * Note that Uint8Array is not supported on all browsers.
	   * @see http://caniuse.com/Uint8Array
	   * This is a type-conversion wrapper around `getNodepubkey()`
	   * @return {!Uint8Array}
	   */


	  proto.types.MsgHeader.prototype.getNodepubkey_asU8 = function () {
	    return (
	      /** @type {!Uint8Array} */
	      googleProtobuf.Message.bytesAsU8(this.getNodepubkey())
	    );
	  };
	  /** @param {!(string|Uint8Array)} value */


	  proto.types.MsgHeader.prototype.setNodepubkey = function (value) {
	    googleProtobuf.Message.setField(this, 6, value);
	  };
	  /**
	   * optional bytes sign = 7;
	   * @return {!(string|Uint8Array)}
	   */


	  proto.types.MsgHeader.prototype.getSign = function () {
	    return (
	      /** @type {!(string|Uint8Array)} */
	      googleProtobuf.Message.getFieldWithDefault(this, 7, "")
	    );
	  };
	  /**
	   * optional bytes sign = 7;
	   * This is a type-conversion wrapper around `getSign()`
	   * @return {string}
	   */


	  proto.types.MsgHeader.prototype.getSign_asB64 = function () {
	    return (
	      /** @type {string} */
	      googleProtobuf.Message.bytesAsB64(this.getSign())
	    );
	  };
	  /**
	   * optional bytes sign = 7;
	   * Note that Uint8Array is not supported on all browsers.
	   * @see http://caniuse.com/Uint8Array
	   * This is a type-conversion wrapper around `getSign()`
	   * @return {!Uint8Array}
	   */


	  proto.types.MsgHeader.prototype.getSign_asU8 = function () {
	    return (
	      /** @type {!Uint8Array} */
	      googleProtobuf.Message.bytesAsU8(this.getSign())
	    );
	  };
	  /** @param {!(string|Uint8Array)} value */


	  proto.types.MsgHeader.prototype.setSign = function (value) {
	    googleProtobuf.Message.setField(this, 7, value);
	  };
	  /**
	   * optional uint32 subprotocol = 8;
	   * @return {number}
	   */


	  proto.types.MsgHeader.prototype.getSubprotocol = function () {
	    return (
	      /** @type {number} */
	      googleProtobuf.Message.getFieldWithDefault(this, 8, 0)
	    );
	  };
	  /** @param {number} value */


	  proto.types.MsgHeader.prototype.setSubprotocol = function (value) {
	    googleProtobuf.Message.setField(this, 8, value);
	  };
	  /**
	   * optional uint32 length = 9;
	   * @return {number}
	   */


	  proto.types.MsgHeader.prototype.getLength = function () {
	    return (
	      /** @type {number} */
	      googleProtobuf.Message.getFieldWithDefault(this, 9, 0)
	    );
	  };
	  /** @param {number} value */


	  proto.types.MsgHeader.prototype.setLength = function (value) {
	    googleProtobuf.Message.setField(this, 9, value);
	  };
	  /**
	   * Generated by JsPbCodeGenerator.
	   * @param {Array=} opt_data Optional initial data array, typically from a
	   * server response, or constructed directly in Javascript. The array is used
	   * in place and becomes part of the constructed object. It is not cloned.
	   * If no data is provided, the constructed object will be empty, but still
	   * valid.
	   * @extends {jspb.Message}
	   * @constructor
	   */


	  proto.types.P2PMessage = function (opt_data) {
	    googleProtobuf.Message.initialize(this, opt_data, 0, -1, null, null);
	  };

	  goog.inherits(proto.types.P2PMessage, googleProtobuf.Message);

	  if (googleProtobuf.Message.GENERATE_TO_OBJECT) {
	    /**
	     * Creates an object representation of this proto suitable for use in Soy templates.
	     * Field names that are reserved in JavaScript and will be renamed to pb_name.
	     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	     * For the list of reserved names please see:
	     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
	     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
	     *     for transitional soy proto support: http://goto/soy-param-migration
	     * @return {!Object}
	     */
	    proto.types.P2PMessage.prototype.toObject = function (opt_includeInstance) {
	      return proto.types.P2PMessage.toObject(opt_includeInstance, this);
	    };
	    /**
	     * Static version of the {@see toObject} method.
	     * @param {boolean|undefined} includeInstance Whether to include the JSPB
	     *     instance for transitional soy proto support:
	     *     http://goto/soy-param-migration
	     * @param {!proto.types.P2PMessage} msg The msg instance to transform.
	     * @return {!Object}
	     * @suppress {unusedLocalVariables} f is only used for nested messages
	     */


	    proto.types.P2PMessage.toObject = function (includeInstance, msg) {
	      var f,
	          obj = {
	        header: (f = msg.getHeader()) && proto.types.MsgHeader.toObject(includeInstance, f),
	        data: msg.getData_asB64()
	      };

	      if (includeInstance) {
	        obj.$jspbMessageInstance = msg;
	      }

	      return obj;
	    };
	  }
	  /**
	   * Deserializes binary data (in protobuf wire format).
	   * @param {jspb.ByteSource} bytes The bytes to deserialize.
	   * @return {!proto.types.P2PMessage}
	   */


	  proto.types.P2PMessage.deserializeBinary = function (bytes) {
	    var reader = new googleProtobuf.BinaryReader(bytes);
	    var msg = new proto.types.P2PMessage();
	    return proto.types.P2PMessage.deserializeBinaryFromReader(msg, reader);
	  };
	  /**
	   * Deserializes binary data (in protobuf wire format) from the
	   * given reader into the given message object.
	   * @param {!proto.types.P2PMessage} msg The message object to deserialize into.
	   * @param {!jspb.BinaryReader} reader The BinaryReader to use.
	   * @return {!proto.types.P2PMessage}
	   */


	  proto.types.P2PMessage.deserializeBinaryFromReader = function (msg, reader) {
	    while (reader.nextField()) {
	      if (reader.isEndGroup()) {
	        break;
	      }

	      var field = reader.getFieldNumber();

	      switch (field) {
	        case 1:
	          var value = new proto.types.MsgHeader();
	          reader.readMessage(value, proto.types.MsgHeader.deserializeBinaryFromReader);
	          msg.setHeader(value);
	          break;

	        case 2:
	          var value =
	          /** @type {!Uint8Array} */
	          reader.readBytes();
	          msg.setData(value);
	          break;

	        default:
	          reader.skipField();
	          break;
	      }
	    }

	    return msg;
	  };
	  /**
	   * Serializes the message to binary data (in protobuf wire format).
	   * @return {!Uint8Array}
	   */


	  proto.types.P2PMessage.prototype.serializeBinary = function () {
	    var writer = new googleProtobuf.BinaryWriter();
	    proto.types.P2PMessage.serializeBinaryToWriter(this, writer);
	    return writer.getResultBuffer();
	  };
	  /**
	   * Serializes the given message to binary data (in protobuf wire
	   * format), writing to the given BinaryWriter.
	   * @param {!proto.types.P2PMessage} message
	   * @param {!jspb.BinaryWriter} writer
	   * @suppress {unusedLocalVariables} f is only used for nested messages
	   */


	  proto.types.P2PMessage.serializeBinaryToWriter = function (message, writer) {
	    var f = undefined;
	    f = message.getHeader();

	    if (f != null) {
	      writer.writeMessage(1, f, proto.types.MsgHeader.serializeBinaryToWriter);
	    }

	    f = message.getData_asU8();

	    if (f.length > 0) {
	      writer.writeBytes(2, f);
	    }
	  };
	  /**
	   * optional MsgHeader header = 1;
	   * @return {?proto.types.MsgHeader}
	   */


	  proto.types.P2PMessage.prototype.getHeader = function () {
	    return (
	      /** @type{?proto.types.MsgHeader} */
	      googleProtobuf.Message.getWrapperField(this, proto.types.MsgHeader, 1)
	    );
	  };
	  /** @param {?proto.types.MsgHeader|undefined} value */


	  proto.types.P2PMessage.prototype.setHeader = function (value) {
	    googleProtobuf.Message.setWrapperField(this, 1, value);
	  };

	  proto.types.P2PMessage.prototype.clearHeader = function () {
	    this.setHeader(undefined);
	  };
	  /**
	   * Returns whether this field is set.
	   * @return {!boolean}
	   */


	  proto.types.P2PMessage.prototype.hasHeader = function () {
	    return googleProtobuf.Message.getField(this, 1) != null;
	  };
	  /**
	   * optional bytes data = 2;
	   * @return {!(string|Uint8Array)}
	   */


	  proto.types.P2PMessage.prototype.getData = function () {
	    return (
	      /** @type {!(string|Uint8Array)} */
	      googleProtobuf.Message.getFieldWithDefault(this, 2, "")
	    );
	  };
	  /**
	   * optional bytes data = 2;
	   * This is a type-conversion wrapper around `getData()`
	   * @return {string}
	   */


	  proto.types.P2PMessage.prototype.getData_asB64 = function () {
	    return (
	      /** @type {string} */
	      googleProtobuf.Message.bytesAsB64(this.getData())
	    );
	  };
	  /**
	   * optional bytes data = 2;
	   * Note that Uint8Array is not supported on all browsers.
	   * @see http://caniuse.com/Uint8Array
	   * This is a type-conversion wrapper around `getData()`
	   * @return {!Uint8Array}
	   */


	  proto.types.P2PMessage.prototype.getData_asU8 = function () {
	    return (
	      /** @type {!Uint8Array} */
	      googleProtobuf.Message.bytesAsU8(this.getData())
	    );
	  };
	  /** @param {!(string|Uint8Array)} value */


	  proto.types.P2PMessage.prototype.setData = function (value) {
	    googleProtobuf.Message.setField(this, 2, value);
	  };
	  /**
	   * Generated by JsPbCodeGenerator.
	   * @param {Array=} opt_data Optional initial data array, typically from a
	   * server response, or constructed directly in Javascript. The array is used
	   * in place and becomes part of the constructed object. It is not cloned.
	   * If no data is provided, the constructed object will be empty, but still
	   * valid.
	   * @extends {jspb.Message}
	   * @constructor
	   */


	  proto.types.Ping = function (opt_data) {
	    googleProtobuf.Message.initialize(this, opt_data, 0, -1, null, null);
	  };

	  goog.inherits(proto.types.Ping, googleProtobuf.Message);

	  if (googleProtobuf.Message.GENERATE_TO_OBJECT) {
	    /**
	     * Creates an object representation of this proto suitable for use in Soy templates.
	     * Field names that are reserved in JavaScript and will be renamed to pb_name.
	     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	     * For the list of reserved names please see:
	     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
	     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
	     *     for transitional soy proto support: http://goto/soy-param-migration
	     * @return {!Object}
	     */
	    proto.types.Ping.prototype.toObject = function (opt_includeInstance) {
	      return proto.types.Ping.toObject(opt_includeInstance, this);
	    };
	    /**
	     * Static version of the {@see toObject} method.
	     * @param {boolean|undefined} includeInstance Whether to include the JSPB
	     *     instance for transitional soy proto support:
	     *     http://goto/soy-param-migration
	     * @param {!proto.types.Ping} msg The msg instance to transform.
	     * @return {!Object}
	     * @suppress {unusedLocalVariables} f is only used for nested messages
	     */


	    proto.types.Ping.toObject = function (includeInstance, msg) {
	      var obj = {
	        bestBlockHash: msg.getBestBlockHash_asB64(),
	        bestHeight: googleProtobuf.Message.getFieldWithDefault(msg, 2, 0)
	      };

	      if (includeInstance) {
	        obj.$jspbMessageInstance = msg;
	      }

	      return obj;
	    };
	  }
	  /**
	   * Deserializes binary data (in protobuf wire format).
	   * @param {jspb.ByteSource} bytes The bytes to deserialize.
	   * @return {!proto.types.Ping}
	   */


	  proto.types.Ping.deserializeBinary = function (bytes) {
	    var reader = new googleProtobuf.BinaryReader(bytes);
	    var msg = new proto.types.Ping();
	    return proto.types.Ping.deserializeBinaryFromReader(msg, reader);
	  };
	  /**
	   * Deserializes binary data (in protobuf wire format) from the
	   * given reader into the given message object.
	   * @param {!proto.types.Ping} msg The message object to deserialize into.
	   * @param {!jspb.BinaryReader} reader The BinaryReader to use.
	   * @return {!proto.types.Ping}
	   */


	  proto.types.Ping.deserializeBinaryFromReader = function (msg, reader) {
	    while (reader.nextField()) {
	      if (reader.isEndGroup()) {
	        break;
	      }

	      var field = reader.getFieldNumber();

	      switch (field) {
	        case 1:
	          var value =
	          /** @type {!Uint8Array} */
	          reader.readBytes();
	          msg.setBestBlockHash(value);
	          break;

	        case 2:
	          var value =
	          /** @type {number} */
	          reader.readUint64();
	          msg.setBestHeight(value);
	          break;

	        default:
	          reader.skipField();
	          break;
	      }
	    }

	    return msg;
	  };
	  /**
	   * Serializes the message to binary data (in protobuf wire format).
	   * @return {!Uint8Array}
	   */


	  proto.types.Ping.prototype.serializeBinary = function () {
	    var writer = new googleProtobuf.BinaryWriter();
	    proto.types.Ping.serializeBinaryToWriter(this, writer);
	    return writer.getResultBuffer();
	  };
	  /**
	   * Serializes the given message to binary data (in protobuf wire
	   * format), writing to the given BinaryWriter.
	   * @param {!proto.types.Ping} message
	   * @param {!jspb.BinaryWriter} writer
	   * @suppress {unusedLocalVariables} f is only used for nested messages
	   */


	  proto.types.Ping.serializeBinaryToWriter = function (message, writer) {
	    var f = undefined;
	    f = message.getBestBlockHash_asU8();

	    if (f.length > 0) {
	      writer.writeBytes(1, f);
	    }

	    f = message.getBestHeight();

	    if (f !== 0) {
	      writer.writeUint64(2, f);
	    }
	  };
	  /**
	   * optional bytes best_block_hash = 1;
	   * @return {!(string|Uint8Array)}
	   */


	  proto.types.Ping.prototype.getBestBlockHash = function () {
	    return (
	      /** @type {!(string|Uint8Array)} */
	      googleProtobuf.Message.getFieldWithDefault(this, 1, "")
	    );
	  };
	  /**
	   * optional bytes best_block_hash = 1;
	   * This is a type-conversion wrapper around `getBestBlockHash()`
	   * @return {string}
	   */


	  proto.types.Ping.prototype.getBestBlockHash_asB64 = function () {
	    return (
	      /** @type {string} */
	      googleProtobuf.Message.bytesAsB64(this.getBestBlockHash())
	    );
	  };
	  /**
	   * optional bytes best_block_hash = 1;
	   * Note that Uint8Array is not supported on all browsers.
	   * @see http://caniuse.com/Uint8Array
	   * This is a type-conversion wrapper around `getBestBlockHash()`
	   * @return {!Uint8Array}
	   */


	  proto.types.Ping.prototype.getBestBlockHash_asU8 = function () {
	    return (
	      /** @type {!Uint8Array} */
	      googleProtobuf.Message.bytesAsU8(this.getBestBlockHash())
	    );
	  };
	  /** @param {!(string|Uint8Array)} value */


	  proto.types.Ping.prototype.setBestBlockHash = function (value) {
	    googleProtobuf.Message.setField(this, 1, value);
	  };
	  /**
	   * optional uint64 best_height = 2;
	   * @return {number}
	   */


	  proto.types.Ping.prototype.getBestHeight = function () {
	    return (
	      /** @type {number} */
	      googleProtobuf.Message.getFieldWithDefault(this, 2, 0)
	    );
	  };
	  /** @param {number} value */


	  proto.types.Ping.prototype.setBestHeight = function (value) {
	    googleProtobuf.Message.setField(this, 2, value);
	  };
	  /**
	   * Generated by JsPbCodeGenerator.
	   * @param {Array=} opt_data Optional initial data array, typically from a
	   * server response, or constructed directly in Javascript. The array is used
	   * in place and becomes part of the constructed object. It is not cloned.
	   * If no data is provided, the constructed object will be empty, but still
	   * valid.
	   * @extends {jspb.Message}
	   * @constructor
	   */


	  proto.types.Pong = function (opt_data) {
	    googleProtobuf.Message.initialize(this, opt_data, 0, -1, null, null);
	  };

	  goog.inherits(proto.types.Pong, googleProtobuf.Message);

	  if (googleProtobuf.Message.GENERATE_TO_OBJECT) {
	    /**
	     * Creates an object representation of this proto suitable for use in Soy templates.
	     * Field names that are reserved in JavaScript and will be renamed to pb_name.
	     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	     * For the list of reserved names please see:
	     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
	     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
	     *     for transitional soy proto support: http://goto/soy-param-migration
	     * @return {!Object}
	     */
	    proto.types.Pong.prototype.toObject = function (opt_includeInstance) {
	      return proto.types.Pong.toObject(opt_includeInstance, this);
	    };
	    /**
	     * Static version of the {@see toObject} method.
	     * @param {boolean|undefined} includeInstance Whether to include the JSPB
	     *     instance for transitional soy proto support:
	     *     http://goto/soy-param-migration
	     * @param {!proto.types.Pong} msg The msg instance to transform.
	     * @return {!Object}
	     * @suppress {unusedLocalVariables} f is only used for nested messages
	     */


	    proto.types.Pong.toObject = function (includeInstance, msg) {
	      var obj = {
	        bestblockhash: msg.getBestblockhash_asB64(),
	        bestheight: googleProtobuf.Message.getFieldWithDefault(msg, 2, 0)
	      };

	      if (includeInstance) {
	        obj.$jspbMessageInstance = msg;
	      }

	      return obj;
	    };
	  }
	  /**
	   * Deserializes binary data (in protobuf wire format).
	   * @param {jspb.ByteSource} bytes The bytes to deserialize.
	   * @return {!proto.types.Pong}
	   */


	  proto.types.Pong.deserializeBinary = function (bytes) {
	    var reader = new googleProtobuf.BinaryReader(bytes);
	    var msg = new proto.types.Pong();
	    return proto.types.Pong.deserializeBinaryFromReader(msg, reader);
	  };
	  /**
	   * Deserializes binary data (in protobuf wire format) from the
	   * given reader into the given message object.
	   * @param {!proto.types.Pong} msg The message object to deserialize into.
	   * @param {!jspb.BinaryReader} reader The BinaryReader to use.
	   * @return {!proto.types.Pong}
	   */


	  proto.types.Pong.deserializeBinaryFromReader = function (msg, reader) {
	    while (reader.nextField()) {
	      if (reader.isEndGroup()) {
	        break;
	      }

	      var field = reader.getFieldNumber();

	      switch (field) {
	        case 1:
	          var value =
	          /** @type {!Uint8Array} */
	          reader.readBytes();
	          msg.setBestblockhash(value);
	          break;

	        case 2:
	          var value =
	          /** @type {number} */
	          reader.readUint64();
	          msg.setBestheight(value);
	          break;

	        default:
	          reader.skipField();
	          break;
	      }
	    }

	    return msg;
	  };
	  /**
	   * Serializes the message to binary data (in protobuf wire format).
	   * @return {!Uint8Array}
	   */


	  proto.types.Pong.prototype.serializeBinary = function () {
	    var writer = new googleProtobuf.BinaryWriter();
	    proto.types.Pong.serializeBinaryToWriter(this, writer);
	    return writer.getResultBuffer();
	  };
	  /**
	   * Serializes the given message to binary data (in protobuf wire
	   * format), writing to the given BinaryWriter.
	   * @param {!proto.types.Pong} message
	   * @param {!jspb.BinaryWriter} writer
	   * @suppress {unusedLocalVariables} f is only used for nested messages
	   */


	  proto.types.Pong.serializeBinaryToWriter = function (message, writer) {
	    var f = undefined;
	    f = message.getBestblockhash_asU8();

	    if (f.length > 0) {
	      writer.writeBytes(1, f);
	    }

	    f = message.getBestheight();

	    if (f !== 0) {
	      writer.writeUint64(2, f);
	    }
	  };
	  /**
	   * optional bytes bestBlockHash = 1;
	   * @return {!(string|Uint8Array)}
	   */


	  proto.types.Pong.prototype.getBestblockhash = function () {
	    return (
	      /** @type {!(string|Uint8Array)} */
	      googleProtobuf.Message.getFieldWithDefault(this, 1, "")
	    );
	  };
	  /**
	   * optional bytes bestBlockHash = 1;
	   * This is a type-conversion wrapper around `getBestblockhash()`
	   * @return {string}
	   */


	  proto.types.Pong.prototype.getBestblockhash_asB64 = function () {
	    return (
	      /** @type {string} */
	      googleProtobuf.Message.bytesAsB64(this.getBestblockhash())
	    );
	  };
	  /**
	   * optional bytes bestBlockHash = 1;
	   * Note that Uint8Array is not supported on all browsers.
	   * @see http://caniuse.com/Uint8Array
	   * This is a type-conversion wrapper around `getBestblockhash()`
	   * @return {!Uint8Array}
	   */


	  proto.types.Pong.prototype.getBestblockhash_asU8 = function () {
	    return (
	      /** @type {!Uint8Array} */
	      googleProtobuf.Message.bytesAsU8(this.getBestblockhash())
	    );
	  };
	  /** @param {!(string|Uint8Array)} value */


	  proto.types.Pong.prototype.setBestblockhash = function (value) {
	    googleProtobuf.Message.setField(this, 1, value);
	  };
	  /**
	   * optional uint64 bestHeight = 2;
	   * @return {number}
	   */


	  proto.types.Pong.prototype.getBestheight = function () {
	    return (
	      /** @type {number} */
	      googleProtobuf.Message.getFieldWithDefault(this, 2, 0)
	    );
	  };
	  /** @param {number} value */


	  proto.types.Pong.prototype.setBestheight = function (value) {
	    googleProtobuf.Message.setField(this, 2, value);
	  };
	  /**
	   * Generated by JsPbCodeGenerator.
	   * @param {Array=} opt_data Optional initial data array, typically from a
	   * server response, or constructed directly in Javascript. The array is used
	   * in place and becomes part of the constructed object. It is not cloned.
	   * If no data is provided, the constructed object will be empty, but still
	   * valid.
	   * @extends {jspb.Message}
	   * @constructor
	   */


	  proto.types.Status = function (opt_data) {
	    googleProtobuf.Message.initialize(this, opt_data, 0, -1, null, null);
	  };

	  goog.inherits(proto.types.Status, googleProtobuf.Message);

	  if (googleProtobuf.Message.GENERATE_TO_OBJECT) {
	    /**
	     * Creates an object representation of this proto suitable for use in Soy templates.
	     * Field names that are reserved in JavaScript and will be renamed to pb_name.
	     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	     * For the list of reserved names please see:
	     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
	     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
	     *     for transitional soy proto support: http://goto/soy-param-migration
	     * @return {!Object}
	     */
	    proto.types.Status.prototype.toObject = function (opt_includeInstance) {
	      return proto.types.Status.toObject(opt_includeInstance, this);
	    };
	    /**
	     * Static version of the {@see toObject} method.
	     * @param {boolean|undefined} includeInstance Whether to include the JSPB
	     *     instance for transitional soy proto support:
	     *     http://goto/soy-param-migration
	     * @param {!proto.types.Status} msg The msg instance to transform.
	     * @return {!Object}
	     * @suppress {unusedLocalVariables} f is only used for nested messages
	     */


	    proto.types.Status.toObject = function (includeInstance, msg) {
	      var f,
	          obj = {
	        sender: (f = msg.getSender()) && node_pb.PeerAddress.toObject(includeInstance, f),
	        bestblockhash: msg.getBestblockhash_asB64(),
	        bestheight: googleProtobuf.Message.getFieldWithDefault(msg, 3, 0)
	      };

	      if (includeInstance) {
	        obj.$jspbMessageInstance = msg;
	      }

	      return obj;
	    };
	  }
	  /**
	   * Deserializes binary data (in protobuf wire format).
	   * @param {jspb.ByteSource} bytes The bytes to deserialize.
	   * @return {!proto.types.Status}
	   */


	  proto.types.Status.deserializeBinary = function (bytes) {
	    var reader = new googleProtobuf.BinaryReader(bytes);
	    var msg = new proto.types.Status();
	    return proto.types.Status.deserializeBinaryFromReader(msg, reader);
	  };
	  /**
	   * Deserializes binary data (in protobuf wire format) from the
	   * given reader into the given message object.
	   * @param {!proto.types.Status} msg The message object to deserialize into.
	   * @param {!jspb.BinaryReader} reader The BinaryReader to use.
	   * @return {!proto.types.Status}
	   */


	  proto.types.Status.deserializeBinaryFromReader = function (msg, reader) {
	    while (reader.nextField()) {
	      if (reader.isEndGroup()) {
	        break;
	      }

	      var field = reader.getFieldNumber();

	      switch (field) {
	        case 1:
	          var value = new node_pb.PeerAddress();
	          reader.readMessage(value, node_pb.PeerAddress.deserializeBinaryFromReader);
	          msg.setSender(value);
	          break;

	        case 2:
	          var value =
	          /** @type {!Uint8Array} */
	          reader.readBytes();
	          msg.setBestblockhash(value);
	          break;

	        case 3:
	          var value =
	          /** @type {number} */
	          reader.readUint64();
	          msg.setBestheight(value);
	          break;

	        default:
	          reader.skipField();
	          break;
	      }
	    }

	    return msg;
	  };
	  /**
	   * Serializes the message to binary data (in protobuf wire format).
	   * @return {!Uint8Array}
	   */


	  proto.types.Status.prototype.serializeBinary = function () {
	    var writer = new googleProtobuf.BinaryWriter();
	    proto.types.Status.serializeBinaryToWriter(this, writer);
	    return writer.getResultBuffer();
	  };
	  /**
	   * Serializes the given message to binary data (in protobuf wire
	   * format), writing to the given BinaryWriter.
	   * @param {!proto.types.Status} message
	   * @param {!jspb.BinaryWriter} writer
	   * @suppress {unusedLocalVariables} f is only used for nested messages
	   */


	  proto.types.Status.serializeBinaryToWriter = function (message, writer) {
	    var f = undefined;
	    f = message.getSender();

	    if (f != null) {
	      writer.writeMessage(1, f, node_pb.PeerAddress.serializeBinaryToWriter);
	    }

	    f = message.getBestblockhash_asU8();

	    if (f.length > 0) {
	      writer.writeBytes(2, f);
	    }

	    f = message.getBestheight();

	    if (f !== 0) {
	      writer.writeUint64(3, f);
	    }
	  };
	  /**
	   * optional PeerAddress sender = 1;
	   * @return {?proto.types.PeerAddress}
	   */


	  proto.types.Status.prototype.getSender = function () {
	    return (
	      /** @type{?proto.types.PeerAddress} */
	      googleProtobuf.Message.getWrapperField(this, node_pb.PeerAddress, 1)
	    );
	  };
	  /** @param {?proto.types.PeerAddress|undefined} value */


	  proto.types.Status.prototype.setSender = function (value) {
	    googleProtobuf.Message.setWrapperField(this, 1, value);
	  };

	  proto.types.Status.prototype.clearSender = function () {
	    this.setSender(undefined);
	  };
	  /**
	   * Returns whether this field is set.
	   * @return {!boolean}
	   */


	  proto.types.Status.prototype.hasSender = function () {
	    return googleProtobuf.Message.getField(this, 1) != null;
	  };
	  /**
	   * optional bytes bestBlockHash = 2;
	   * @return {!(string|Uint8Array)}
	   */


	  proto.types.Status.prototype.getBestblockhash = function () {
	    return (
	      /** @type {!(string|Uint8Array)} */
	      googleProtobuf.Message.getFieldWithDefault(this, 2, "")
	    );
	  };
	  /**
	   * optional bytes bestBlockHash = 2;
	   * This is a type-conversion wrapper around `getBestblockhash()`
	   * @return {string}
	   */


	  proto.types.Status.prototype.getBestblockhash_asB64 = function () {
	    return (
	      /** @type {string} */
	      googleProtobuf.Message.bytesAsB64(this.getBestblockhash())
	    );
	  };
	  /**
	   * optional bytes bestBlockHash = 2;
	   * Note that Uint8Array is not supported on all browsers.
	   * @see http://caniuse.com/Uint8Array
	   * This is a type-conversion wrapper around `getBestblockhash()`
	   * @return {!Uint8Array}
	   */


	  proto.types.Status.prototype.getBestblockhash_asU8 = function () {
	    return (
	      /** @type {!Uint8Array} */
	      googleProtobuf.Message.bytesAsU8(this.getBestblockhash())
	    );
	  };
	  /** @param {!(string|Uint8Array)} value */


	  proto.types.Status.prototype.setBestblockhash = function (value) {
	    googleProtobuf.Message.setField(this, 2, value);
	  };
	  /**
	   * optional uint64 bestHeight = 3;
	   * @return {number}
	   */


	  proto.types.Status.prototype.getBestheight = function () {
	    return (
	      /** @type {number} */
	      googleProtobuf.Message.getFieldWithDefault(this, 3, 0)
	    );
	  };
	  /** @param {number} value */


	  proto.types.Status.prototype.setBestheight = function (value) {
	    googleProtobuf.Message.setField(this, 3, value);
	  };
	  /**
	   * Generated by JsPbCodeGenerator.
	   * @param {Array=} opt_data Optional initial data array, typically from a
	   * server response, or constructed directly in Javascript. The array is used
	   * in place and becomes part of the constructed object. It is not cloned.
	   * If no data is provided, the constructed object will be empty, but still
	   * valid.
	   * @extends {jspb.Message}
	   * @constructor
	   */


	  proto.types.GoAwayNotice = function (opt_data) {
	    googleProtobuf.Message.initialize(this, opt_data, 0, -1, null, null);
	  };

	  goog.inherits(proto.types.GoAwayNotice, googleProtobuf.Message);

	  if (googleProtobuf.Message.GENERATE_TO_OBJECT) {
	    /**
	     * Creates an object representation of this proto suitable for use in Soy templates.
	     * Field names that are reserved in JavaScript and will be renamed to pb_name.
	     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	     * For the list of reserved names please see:
	     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
	     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
	     *     for transitional soy proto support: http://goto/soy-param-migration
	     * @return {!Object}
	     */
	    proto.types.GoAwayNotice.prototype.toObject = function (opt_includeInstance) {
	      return proto.types.GoAwayNotice.toObject(opt_includeInstance, this);
	    };
	    /**
	     * Static version of the {@see toObject} method.
	     * @param {boolean|undefined} includeInstance Whether to include the JSPB
	     *     instance for transitional soy proto support:
	     *     http://goto/soy-param-migration
	     * @param {!proto.types.GoAwayNotice} msg The msg instance to transform.
	     * @return {!Object}
	     * @suppress {unusedLocalVariables} f is only used for nested messages
	     */


	    proto.types.GoAwayNotice.toObject = function (includeInstance, msg) {
	      var obj = {
	        message: googleProtobuf.Message.getFieldWithDefault(msg, 1, "")
	      };

	      if (includeInstance) {
	        obj.$jspbMessageInstance = msg;
	      }

	      return obj;
	    };
	  }
	  /**
	   * Deserializes binary data (in protobuf wire format).
	   * @param {jspb.ByteSource} bytes The bytes to deserialize.
	   * @return {!proto.types.GoAwayNotice}
	   */


	  proto.types.GoAwayNotice.deserializeBinary = function (bytes) {
	    var reader = new googleProtobuf.BinaryReader(bytes);
	    var msg = new proto.types.GoAwayNotice();
	    return proto.types.GoAwayNotice.deserializeBinaryFromReader(msg, reader);
	  };
	  /**
	   * Deserializes binary data (in protobuf wire format) from the
	   * given reader into the given message object.
	   * @param {!proto.types.GoAwayNotice} msg The message object to deserialize into.
	   * @param {!jspb.BinaryReader} reader The BinaryReader to use.
	   * @return {!proto.types.GoAwayNotice}
	   */


	  proto.types.GoAwayNotice.deserializeBinaryFromReader = function (msg, reader) {
	    while (reader.nextField()) {
	      if (reader.isEndGroup()) {
	        break;
	      }

	      var field = reader.getFieldNumber();

	      switch (field) {
	        case 1:
	          var value =
	          /** @type {string} */
	          reader.readString();
	          msg.setMessage(value);
	          break;

	        default:
	          reader.skipField();
	          break;
	      }
	    }

	    return msg;
	  };
	  /**
	   * Serializes the message to binary data (in protobuf wire format).
	   * @return {!Uint8Array}
	   */


	  proto.types.GoAwayNotice.prototype.serializeBinary = function () {
	    var writer = new googleProtobuf.BinaryWriter();
	    proto.types.GoAwayNotice.serializeBinaryToWriter(this, writer);
	    return writer.getResultBuffer();
	  };
	  /**
	   * Serializes the given message to binary data (in protobuf wire
	   * format), writing to the given BinaryWriter.
	   * @param {!proto.types.GoAwayNotice} message
	   * @param {!jspb.BinaryWriter} writer
	   * @suppress {unusedLocalVariables} f is only used for nested messages
	   */


	  proto.types.GoAwayNotice.serializeBinaryToWriter = function (message, writer) {
	    var f = undefined;
	    f = message.getMessage();

	    if (f.length > 0) {
	      writer.writeString(1, f);
	    }
	  };
	  /**
	   * optional string message = 1;
	   * @return {string}
	   */


	  proto.types.GoAwayNotice.prototype.getMessage = function () {
	    return (
	      /** @type {string} */
	      googleProtobuf.Message.getFieldWithDefault(this, 1, "")
	    );
	  };
	  /** @param {string} value */


	  proto.types.GoAwayNotice.prototype.setMessage = function (value) {
	    googleProtobuf.Message.setField(this, 1, value);
	  };
	  /**
	   * Generated by JsPbCodeGenerator.
	   * @param {Array=} opt_data Optional initial data array, typically from a
	   * server response, or constructed directly in Javascript. The array is used
	   * in place and becomes part of the constructed object. It is not cloned.
	   * If no data is provided, the constructed object will be empty, but still
	   * valid.
	   * @extends {jspb.Message}
	   * @constructor
	   */


	  proto.types.AddressesRequest = function (opt_data) {
	    googleProtobuf.Message.initialize(this, opt_data, 0, -1, null, null);
	  };

	  goog.inherits(proto.types.AddressesRequest, googleProtobuf.Message);

	  if (googleProtobuf.Message.GENERATE_TO_OBJECT) {
	    /**
	     * Creates an object representation of this proto suitable for use in Soy templates.
	     * Field names that are reserved in JavaScript and will be renamed to pb_name.
	     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	     * For the list of reserved names please see:
	     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
	     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
	     *     for transitional soy proto support: http://goto/soy-param-migration
	     * @return {!Object}
	     */
	    proto.types.AddressesRequest.prototype.toObject = function (opt_includeInstance) {
	      return proto.types.AddressesRequest.toObject(opt_includeInstance, this);
	    };
	    /**
	     * Static version of the {@see toObject} method.
	     * @param {boolean|undefined} includeInstance Whether to include the JSPB
	     *     instance for transitional soy proto support:
	     *     http://goto/soy-param-migration
	     * @param {!proto.types.AddressesRequest} msg The msg instance to transform.
	     * @return {!Object}
	     * @suppress {unusedLocalVariables} f is only used for nested messages
	     */


	    proto.types.AddressesRequest.toObject = function (includeInstance, msg) {
	      var f,
	          obj = {
	        sender: (f = msg.getSender()) && node_pb.PeerAddress.toObject(includeInstance, f),
	        maxsize: googleProtobuf.Message.getFieldWithDefault(msg, 2, 0)
	      };

	      if (includeInstance) {
	        obj.$jspbMessageInstance = msg;
	      }

	      return obj;
	    };
	  }
	  /**
	   * Deserializes binary data (in protobuf wire format).
	   * @param {jspb.ByteSource} bytes The bytes to deserialize.
	   * @return {!proto.types.AddressesRequest}
	   */


	  proto.types.AddressesRequest.deserializeBinary = function (bytes) {
	    var reader = new googleProtobuf.BinaryReader(bytes);
	    var msg = new proto.types.AddressesRequest();
	    return proto.types.AddressesRequest.deserializeBinaryFromReader(msg, reader);
	  };
	  /**
	   * Deserializes binary data (in protobuf wire format) from the
	   * given reader into the given message object.
	   * @param {!proto.types.AddressesRequest} msg The message object to deserialize into.
	   * @param {!jspb.BinaryReader} reader The BinaryReader to use.
	   * @return {!proto.types.AddressesRequest}
	   */


	  proto.types.AddressesRequest.deserializeBinaryFromReader = function (msg, reader) {
	    while (reader.nextField()) {
	      if (reader.isEndGroup()) {
	        break;
	      }

	      var field = reader.getFieldNumber();

	      switch (field) {
	        case 1:
	          var value = new node_pb.PeerAddress();
	          reader.readMessage(value, node_pb.PeerAddress.deserializeBinaryFromReader);
	          msg.setSender(value);
	          break;

	        case 2:
	          var value =
	          /** @type {number} */
	          reader.readUint32();
	          msg.setMaxsize(value);
	          break;

	        default:
	          reader.skipField();
	          break;
	      }
	    }

	    return msg;
	  };
	  /**
	   * Serializes the message to binary data (in protobuf wire format).
	   * @return {!Uint8Array}
	   */


	  proto.types.AddressesRequest.prototype.serializeBinary = function () {
	    var writer = new googleProtobuf.BinaryWriter();
	    proto.types.AddressesRequest.serializeBinaryToWriter(this, writer);
	    return writer.getResultBuffer();
	  };
	  /**
	   * Serializes the given message to binary data (in protobuf wire
	   * format), writing to the given BinaryWriter.
	   * @param {!proto.types.AddressesRequest} message
	   * @param {!jspb.BinaryWriter} writer
	   * @suppress {unusedLocalVariables} f is only used for nested messages
	   */


	  proto.types.AddressesRequest.serializeBinaryToWriter = function (message, writer) {
	    var f = undefined;
	    f = message.getSender();

	    if (f != null) {
	      writer.writeMessage(1, f, node_pb.PeerAddress.serializeBinaryToWriter);
	    }

	    f = message.getMaxsize();

	    if (f !== 0) {
	      writer.writeUint32(2, f);
	    }
	  };
	  /**
	   * optional PeerAddress sender = 1;
	   * @return {?proto.types.PeerAddress}
	   */


	  proto.types.AddressesRequest.prototype.getSender = function () {
	    return (
	      /** @type{?proto.types.PeerAddress} */
	      googleProtobuf.Message.getWrapperField(this, node_pb.PeerAddress, 1)
	    );
	  };
	  /** @param {?proto.types.PeerAddress|undefined} value */


	  proto.types.AddressesRequest.prototype.setSender = function (value) {
	    googleProtobuf.Message.setWrapperField(this, 1, value);
	  };

	  proto.types.AddressesRequest.prototype.clearSender = function () {
	    this.setSender(undefined);
	  };
	  /**
	   * Returns whether this field is set.
	   * @return {!boolean}
	   */


	  proto.types.AddressesRequest.prototype.hasSender = function () {
	    return googleProtobuf.Message.getField(this, 1) != null;
	  };
	  /**
	   * optional uint32 maxSize = 2;
	   * @return {number}
	   */


	  proto.types.AddressesRequest.prototype.getMaxsize = function () {
	    return (
	      /** @type {number} */
	      googleProtobuf.Message.getFieldWithDefault(this, 2, 0)
	    );
	  };
	  /** @param {number} value */


	  proto.types.AddressesRequest.prototype.setMaxsize = function (value) {
	    googleProtobuf.Message.setField(this, 2, value);
	  };
	  /**
	   * Generated by JsPbCodeGenerator.
	   * @param {Array=} opt_data Optional initial data array, typically from a
	   * server response, or constructed directly in Javascript. The array is used
	   * in place and becomes part of the constructed object. It is not cloned.
	   * If no data is provided, the constructed object will be empty, but still
	   * valid.
	   * @extends {jspb.Message}
	   * @constructor
	   */


	  proto.types.AddressesResponse = function (opt_data) {
	    googleProtobuf.Message.initialize(this, opt_data, 0, -1, proto.types.AddressesResponse.repeatedFields_, null);
	  };

	  goog.inherits(proto.types.AddressesResponse, googleProtobuf.Message);
	  /**
	   * List of repeated fields within this message type.
	   * @private {!Array<number>}
	   * @const
	   */


	  proto.types.AddressesResponse.repeatedFields_ = [2];

	  if (googleProtobuf.Message.GENERATE_TO_OBJECT) {
	    /**
	     * Creates an object representation of this proto suitable for use in Soy templates.
	     * Field names that are reserved in JavaScript and will be renamed to pb_name.
	     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	     * For the list of reserved names please see:
	     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
	     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
	     *     for transitional soy proto support: http://goto/soy-param-migration
	     * @return {!Object}
	     */
	    proto.types.AddressesResponse.prototype.toObject = function (opt_includeInstance) {
	      return proto.types.AddressesResponse.toObject(opt_includeInstance, this);
	    };
	    /**
	     * Static version of the {@see toObject} method.
	     * @param {boolean|undefined} includeInstance Whether to include the JSPB
	     *     instance for transitional soy proto support:
	     *     http://goto/soy-param-migration
	     * @param {!proto.types.AddressesResponse} msg The msg instance to transform.
	     * @return {!Object}
	     * @suppress {unusedLocalVariables} f is only used for nested messages
	     */


	    proto.types.AddressesResponse.toObject = function (includeInstance, msg) {
	      var obj = {
	        status: googleProtobuf.Message.getFieldWithDefault(msg, 1, 0),
	        peersList: googleProtobuf.Message.toObjectList(msg.getPeersList(), node_pb.PeerAddress.toObject, includeInstance)
	      };

	      if (includeInstance) {
	        obj.$jspbMessageInstance = msg;
	      }

	      return obj;
	    };
	  }
	  /**
	   * Deserializes binary data (in protobuf wire format).
	   * @param {jspb.ByteSource} bytes The bytes to deserialize.
	   * @return {!proto.types.AddressesResponse}
	   */


	  proto.types.AddressesResponse.deserializeBinary = function (bytes) {
	    var reader = new googleProtobuf.BinaryReader(bytes);
	    var msg = new proto.types.AddressesResponse();
	    return proto.types.AddressesResponse.deserializeBinaryFromReader(msg, reader);
	  };
	  /**
	   * Deserializes binary data (in protobuf wire format) from the
	   * given reader into the given message object.
	   * @param {!proto.types.AddressesResponse} msg The message object to deserialize into.
	   * @param {!jspb.BinaryReader} reader The BinaryReader to use.
	   * @return {!proto.types.AddressesResponse}
	   */


	  proto.types.AddressesResponse.deserializeBinaryFromReader = function (msg, reader) {
	    while (reader.nextField()) {
	      if (reader.isEndGroup()) {
	        break;
	      }

	      var field = reader.getFieldNumber();

	      switch (field) {
	        case 1:
	          var value =
	          /** @type {!proto.types.ResultStatus} */
	          reader.readEnum();
	          msg.setStatus(value);
	          break;

	        case 2:
	          var value = new node_pb.PeerAddress();
	          reader.readMessage(value, node_pb.PeerAddress.deserializeBinaryFromReader);
	          msg.addPeers(value);
	          break;

	        default:
	          reader.skipField();
	          break;
	      }
	    }

	    return msg;
	  };
	  /**
	   * Serializes the message to binary data (in protobuf wire format).
	   * @return {!Uint8Array}
	   */


	  proto.types.AddressesResponse.prototype.serializeBinary = function () {
	    var writer = new googleProtobuf.BinaryWriter();
	    proto.types.AddressesResponse.serializeBinaryToWriter(this, writer);
	    return writer.getResultBuffer();
	  };
	  /**
	   * Serializes the given message to binary data (in protobuf wire
	   * format), writing to the given BinaryWriter.
	   * @param {!proto.types.AddressesResponse} message
	   * @param {!jspb.BinaryWriter} writer
	   * @suppress {unusedLocalVariables} f is only used for nested messages
	   */


	  proto.types.AddressesResponse.serializeBinaryToWriter = function (message, writer) {
	    var f = undefined;
	    f = message.getStatus();

	    if (f !== 0.0) {
	      writer.writeEnum(1, f);
	    }

	    f = message.getPeersList();

	    if (f.length > 0) {
	      writer.writeRepeatedMessage(2, f, node_pb.PeerAddress.serializeBinaryToWriter);
	    }
	  };
	  /**
	   * optional ResultStatus status = 1;
	   * @return {!proto.types.ResultStatus}
	   */


	  proto.types.AddressesResponse.prototype.getStatus = function () {
	    return (
	      /** @type {!proto.types.ResultStatus} */
	      googleProtobuf.Message.getFieldWithDefault(this, 1, 0)
	    );
	  };
	  /** @param {!proto.types.ResultStatus} value */


	  proto.types.AddressesResponse.prototype.setStatus = function (value) {
	    googleProtobuf.Message.setField(this, 1, value);
	  };
	  /**
	   * repeated PeerAddress peers = 2;
	   * @return {!Array.<!proto.types.PeerAddress>}
	   */


	  proto.types.AddressesResponse.prototype.getPeersList = function () {
	    return (
	      /** @type{!Array.<!proto.types.PeerAddress>} */
	      googleProtobuf.Message.getRepeatedWrapperField(this, node_pb.PeerAddress, 2)
	    );
	  };
	  /** @param {!Array.<!proto.types.PeerAddress>} value */


	  proto.types.AddressesResponse.prototype.setPeersList = function (value) {
	    googleProtobuf.Message.setRepeatedWrapperField(this, 2, value);
	  };
	  /**
	   * @param {!proto.types.PeerAddress=} opt_value
	   * @param {number=} opt_index
	   * @return {!proto.types.PeerAddress}
	   */


	  proto.types.AddressesResponse.prototype.addPeers = function (opt_value, opt_index) {
	    return googleProtobuf.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.types.PeerAddress, opt_index);
	  };

	  proto.types.AddressesResponse.prototype.clearPeersList = function () {
	    this.setPeersList([]);
	  };
	  /**
	   * Generated by JsPbCodeGenerator.
	   * @param {Array=} opt_data Optional initial data array, typically from a
	   * server response, or constructed directly in Javascript. The array is used
	   * in place and becomes part of the constructed object. It is not cloned.
	   * If no data is provided, the constructed object will be empty, but still
	   * valid.
	   * @extends {jspb.Message}
	   * @constructor
	   */


	  proto.types.NewBlockNotice = function (opt_data) {
	    googleProtobuf.Message.initialize(this, opt_data, 0, -1, null, null);
	  };

	  goog.inherits(proto.types.NewBlockNotice, googleProtobuf.Message);

	  if (googleProtobuf.Message.GENERATE_TO_OBJECT) {
	    /**
	     * Creates an object representation of this proto suitable for use in Soy templates.
	     * Field names that are reserved in JavaScript and will be renamed to pb_name.
	     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	     * For the list of reserved names please see:
	     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
	     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
	     *     for transitional soy proto support: http://goto/soy-param-migration
	     * @return {!Object}
	     */
	    proto.types.NewBlockNotice.prototype.toObject = function (opt_includeInstance) {
	      return proto.types.NewBlockNotice.toObject(opt_includeInstance, this);
	    };
	    /**
	     * Static version of the {@see toObject} method.
	     * @param {boolean|undefined} includeInstance Whether to include the JSPB
	     *     instance for transitional soy proto support:
	     *     http://goto/soy-param-migration
	     * @param {!proto.types.NewBlockNotice} msg The msg instance to transform.
	     * @return {!Object}
	     * @suppress {unusedLocalVariables} f is only used for nested messages
	     */


	    proto.types.NewBlockNotice.toObject = function (includeInstance, msg) {
	      var obj = {
	        blockhash: msg.getBlockhash_asB64(),
	        blockno: googleProtobuf.Message.getFieldWithDefault(msg, 2, 0)
	      };

	      if (includeInstance) {
	        obj.$jspbMessageInstance = msg;
	      }

	      return obj;
	    };
	  }
	  /**
	   * Deserializes binary data (in protobuf wire format).
	   * @param {jspb.ByteSource} bytes The bytes to deserialize.
	   * @return {!proto.types.NewBlockNotice}
	   */


	  proto.types.NewBlockNotice.deserializeBinary = function (bytes) {
	    var reader = new googleProtobuf.BinaryReader(bytes);
	    var msg = new proto.types.NewBlockNotice();
	    return proto.types.NewBlockNotice.deserializeBinaryFromReader(msg, reader);
	  };
	  /**
	   * Deserializes binary data (in protobuf wire format) from the
	   * given reader into the given message object.
	   * @param {!proto.types.NewBlockNotice} msg The message object to deserialize into.
	   * @param {!jspb.BinaryReader} reader The BinaryReader to use.
	   * @return {!proto.types.NewBlockNotice}
	   */


	  proto.types.NewBlockNotice.deserializeBinaryFromReader = function (msg, reader) {
	    while (reader.nextField()) {
	      if (reader.isEndGroup()) {
	        break;
	      }

	      var field = reader.getFieldNumber();

	      switch (field) {
	        case 1:
	          var value =
	          /** @type {!Uint8Array} */
	          reader.readBytes();
	          msg.setBlockhash(value);
	          break;

	        case 2:
	          var value =
	          /** @type {number} */
	          reader.readUint64();
	          msg.setBlockno(value);
	          break;

	        default:
	          reader.skipField();
	          break;
	      }
	    }

	    return msg;
	  };
	  /**
	   * Serializes the message to binary data (in protobuf wire format).
	   * @return {!Uint8Array}
	   */


	  proto.types.NewBlockNotice.prototype.serializeBinary = function () {
	    var writer = new googleProtobuf.BinaryWriter();
	    proto.types.NewBlockNotice.serializeBinaryToWriter(this, writer);
	    return writer.getResultBuffer();
	  };
	  /**
	   * Serializes the given message to binary data (in protobuf wire
	   * format), writing to the given BinaryWriter.
	   * @param {!proto.types.NewBlockNotice} message
	   * @param {!jspb.BinaryWriter} writer
	   * @suppress {unusedLocalVariables} f is only used for nested messages
	   */


	  proto.types.NewBlockNotice.serializeBinaryToWriter = function (message, writer) {
	    var f = undefined;
	    f = message.getBlockhash_asU8();

	    if (f.length > 0) {
	      writer.writeBytes(1, f);
	    }

	    f = message.getBlockno();

	    if (f !== 0) {
	      writer.writeUint64(2, f);
	    }
	  };
	  /**
	   * optional bytes blockHash = 1;
	   * @return {!(string|Uint8Array)}
	   */


	  proto.types.NewBlockNotice.prototype.getBlockhash = function () {
	    return (
	      /** @type {!(string|Uint8Array)} */
	      googleProtobuf.Message.getFieldWithDefault(this, 1, "")
	    );
	  };
	  /**
	   * optional bytes blockHash = 1;
	   * This is a type-conversion wrapper around `getBlockhash()`
	   * @return {string}
	   */


	  proto.types.NewBlockNotice.prototype.getBlockhash_asB64 = function () {
	    return (
	      /** @type {string} */
	      googleProtobuf.Message.bytesAsB64(this.getBlockhash())
	    );
	  };
	  /**
	   * optional bytes blockHash = 1;
	   * Note that Uint8Array is not supported on all browsers.
	   * @see http://caniuse.com/Uint8Array
	   * This is a type-conversion wrapper around `getBlockhash()`
	   * @return {!Uint8Array}
	   */


	  proto.types.NewBlockNotice.prototype.getBlockhash_asU8 = function () {
	    return (
	      /** @type {!Uint8Array} */
	      googleProtobuf.Message.bytesAsU8(this.getBlockhash())
	    );
	  };
	  /** @param {!(string|Uint8Array)} value */


	  proto.types.NewBlockNotice.prototype.setBlockhash = function (value) {
	    googleProtobuf.Message.setField(this, 1, value);
	  };
	  /**
	   * optional uint64 blockNo = 2;
	   * @return {number}
	   */


	  proto.types.NewBlockNotice.prototype.getBlockno = function () {
	    return (
	      /** @type {number} */
	      googleProtobuf.Message.getFieldWithDefault(this, 2, 0)
	    );
	  };
	  /** @param {number} value */


	  proto.types.NewBlockNotice.prototype.setBlockno = function (value) {
	    googleProtobuf.Message.setField(this, 2, value);
	  };
	  /**
	   * Generated by JsPbCodeGenerator.
	   * @param {Array=} opt_data Optional initial data array, typically from a
	   * server response, or constructed directly in Javascript. The array is used
	   * in place and becomes part of the constructed object. It is not cloned.
	   * If no data is provided, the constructed object will be empty, but still
	   * valid.
	   * @extends {jspb.Message}
	   * @constructor
	   */


	  proto.types.GetBlockHeadersRequest = function (opt_data) {
	    googleProtobuf.Message.initialize(this, opt_data, 0, -1, null, null);
	  };

	  goog.inherits(proto.types.GetBlockHeadersRequest, googleProtobuf.Message);

	  if (googleProtobuf.Message.GENERATE_TO_OBJECT) {
	    /**
	     * Creates an object representation of this proto suitable for use in Soy templates.
	     * Field names that are reserved in JavaScript and will be renamed to pb_name.
	     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	     * For the list of reserved names please see:
	     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
	     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
	     *     for transitional soy proto support: http://goto/soy-param-migration
	     * @return {!Object}
	     */
	    proto.types.GetBlockHeadersRequest.prototype.toObject = function (opt_includeInstance) {
	      return proto.types.GetBlockHeadersRequest.toObject(opt_includeInstance, this);
	    };
	    /**
	     * Static version of the {@see toObject} method.
	     * @param {boolean|undefined} includeInstance Whether to include the JSPB
	     *     instance for transitional soy proto support:
	     *     http://goto/soy-param-migration
	     * @param {!proto.types.GetBlockHeadersRequest} msg The msg instance to transform.
	     * @return {!Object}
	     * @suppress {unusedLocalVariables} f is only used for nested messages
	     */


	    proto.types.GetBlockHeadersRequest.toObject = function (includeInstance, msg) {
	      var obj = {
	        hash: msg.getHash_asB64(),
	        height: googleProtobuf.Message.getFieldWithDefault(msg, 2, 0),
	        offset: googleProtobuf.Message.getFieldWithDefault(msg, 3, 0),
	        size: googleProtobuf.Message.getFieldWithDefault(msg, 4, 0),
	        asc: googleProtobuf.Message.getFieldWithDefault(msg, 5, false)
	      };

	      if (includeInstance) {
	        obj.$jspbMessageInstance = msg;
	      }

	      return obj;
	    };
	  }
	  /**
	   * Deserializes binary data (in protobuf wire format).
	   * @param {jspb.ByteSource} bytes The bytes to deserialize.
	   * @return {!proto.types.GetBlockHeadersRequest}
	   */


	  proto.types.GetBlockHeadersRequest.deserializeBinary = function (bytes) {
	    var reader = new googleProtobuf.BinaryReader(bytes);
	    var msg = new proto.types.GetBlockHeadersRequest();
	    return proto.types.GetBlockHeadersRequest.deserializeBinaryFromReader(msg, reader);
	  };
	  /**
	   * Deserializes binary data (in protobuf wire format) from the
	   * given reader into the given message object.
	   * @param {!proto.types.GetBlockHeadersRequest} msg The message object to deserialize into.
	   * @param {!jspb.BinaryReader} reader The BinaryReader to use.
	   * @return {!proto.types.GetBlockHeadersRequest}
	   */


	  proto.types.GetBlockHeadersRequest.deserializeBinaryFromReader = function (msg, reader) {
	    while (reader.nextField()) {
	      if (reader.isEndGroup()) {
	        break;
	      }

	      var field = reader.getFieldNumber();

	      switch (field) {
	        case 1:
	          var value =
	          /** @type {!Uint8Array} */
	          reader.readBytes();
	          msg.setHash(value);
	          break;

	        case 2:
	          var value =
	          /** @type {number} */
	          reader.readUint64();
	          msg.setHeight(value);
	          break;

	        case 3:
	          var value =
	          /** @type {number} */
	          reader.readUint64();
	          msg.setOffset(value);
	          break;

	        case 4:
	          var value =
	          /** @type {number} */
	          reader.readUint32();
	          msg.setSize(value);
	          break;

	        case 5:
	          var value =
	          /** @type {boolean} */
	          reader.readBool();
	          msg.setAsc(value);
	          break;

	        default:
	          reader.skipField();
	          break;
	      }
	    }

	    return msg;
	  };
	  /**
	   * Serializes the message to binary data (in protobuf wire format).
	   * @return {!Uint8Array}
	   */


	  proto.types.GetBlockHeadersRequest.prototype.serializeBinary = function () {
	    var writer = new googleProtobuf.BinaryWriter();
	    proto.types.GetBlockHeadersRequest.serializeBinaryToWriter(this, writer);
	    return writer.getResultBuffer();
	  };
	  /**
	   * Serializes the given message to binary data (in protobuf wire
	   * format), writing to the given BinaryWriter.
	   * @param {!proto.types.GetBlockHeadersRequest} message
	   * @param {!jspb.BinaryWriter} writer
	   * @suppress {unusedLocalVariables} f is only used for nested messages
	   */


	  proto.types.GetBlockHeadersRequest.serializeBinaryToWriter = function (message, writer) {
	    var f = undefined;
	    f = message.getHash_asU8();

	    if (f.length > 0) {
	      writer.writeBytes(1, f);
	    }

	    f = message.getHeight();

	    if (f !== 0) {
	      writer.writeUint64(2, f);
	    }

	    f = message.getOffset();

	    if (f !== 0) {
	      writer.writeUint64(3, f);
	    }

	    f = message.getSize();

	    if (f !== 0) {
	      writer.writeUint32(4, f);
	    }

	    f = message.getAsc();

	    if (f) {
	      writer.writeBool(5, f);
	    }
	  };
	  /**
	   * optional bytes hash = 1;
	   * @return {!(string|Uint8Array)}
	   */


	  proto.types.GetBlockHeadersRequest.prototype.getHash = function () {
	    return (
	      /** @type {!(string|Uint8Array)} */
	      googleProtobuf.Message.getFieldWithDefault(this, 1, "")
	    );
	  };
	  /**
	   * optional bytes hash = 1;
	   * This is a type-conversion wrapper around `getHash()`
	   * @return {string}
	   */


	  proto.types.GetBlockHeadersRequest.prototype.getHash_asB64 = function () {
	    return (
	      /** @type {string} */
	      googleProtobuf.Message.bytesAsB64(this.getHash())
	    );
	  };
	  /**
	   * optional bytes hash = 1;
	   * Note that Uint8Array is not supported on all browsers.
	   * @see http://caniuse.com/Uint8Array
	   * This is a type-conversion wrapper around `getHash()`
	   * @return {!Uint8Array}
	   */


	  proto.types.GetBlockHeadersRequest.prototype.getHash_asU8 = function () {
	    return (
	      /** @type {!Uint8Array} */
	      googleProtobuf.Message.bytesAsU8(this.getHash())
	    );
	  };
	  /** @param {!(string|Uint8Array)} value */


	  proto.types.GetBlockHeadersRequest.prototype.setHash = function (value) {
	    googleProtobuf.Message.setField(this, 1, value);
	  };
	  /**
	   * optional uint64 height = 2;
	   * @return {number}
	   */


	  proto.types.GetBlockHeadersRequest.prototype.getHeight = function () {
	    return (
	      /** @type {number} */
	      googleProtobuf.Message.getFieldWithDefault(this, 2, 0)
	    );
	  };
	  /** @param {number} value */


	  proto.types.GetBlockHeadersRequest.prototype.setHeight = function (value) {
	    googleProtobuf.Message.setField(this, 2, value);
	  };
	  /**
	   * optional uint64 offset = 3;
	   * @return {number}
	   */


	  proto.types.GetBlockHeadersRequest.prototype.getOffset = function () {
	    return (
	      /** @type {number} */
	      googleProtobuf.Message.getFieldWithDefault(this, 3, 0)
	    );
	  };
	  /** @param {number} value */


	  proto.types.GetBlockHeadersRequest.prototype.setOffset = function (value) {
	    googleProtobuf.Message.setField(this, 3, value);
	  };
	  /**
	   * optional uint32 size = 4;
	   * @return {number}
	   */


	  proto.types.GetBlockHeadersRequest.prototype.getSize = function () {
	    return (
	      /** @type {number} */
	      googleProtobuf.Message.getFieldWithDefault(this, 4, 0)
	    );
	  };
	  /** @param {number} value */


	  proto.types.GetBlockHeadersRequest.prototype.setSize = function (value) {
	    googleProtobuf.Message.setField(this, 4, value);
	  };
	  /**
	   * optional bool asc = 5;
	   * Note that Boolean fields may be set to 0/1 when serialized from a Java server.
	   * You should avoid comparisons like {@code val === true/false} in those cases.
	   * @return {boolean}
	   */


	  proto.types.GetBlockHeadersRequest.prototype.getAsc = function () {
	    return (
	      /** @type {boolean} */
	      googleProtobuf.Message.getFieldWithDefault(this, 5, false)
	    );
	  };
	  /** @param {boolean} value */


	  proto.types.GetBlockHeadersRequest.prototype.setAsc = function (value) {
	    googleProtobuf.Message.setField(this, 5, value);
	  };
	  /**
	   * Generated by JsPbCodeGenerator.
	   * @param {Array=} opt_data Optional initial data array, typically from a
	   * server response, or constructed directly in Javascript. The array is used
	   * in place and becomes part of the constructed object. It is not cloned.
	   * If no data is provided, the constructed object will be empty, but still
	   * valid.
	   * @extends {jspb.Message}
	   * @constructor
	   */


	  proto.types.GetBlockHeadersResponse = function (opt_data) {
	    googleProtobuf.Message.initialize(this, opt_data, 0, -1, proto.types.GetBlockHeadersResponse.repeatedFields_, null);
	  };

	  goog.inherits(proto.types.GetBlockHeadersResponse, googleProtobuf.Message);
	  /**
	   * List of repeated fields within this message type.
	   * @private {!Array<number>}
	   * @const
	   */


	  proto.types.GetBlockHeadersResponse.repeatedFields_ = [2, 3];

	  if (googleProtobuf.Message.GENERATE_TO_OBJECT) {
	    /**
	     * Creates an object representation of this proto suitable for use in Soy templates.
	     * Field names that are reserved in JavaScript and will be renamed to pb_name.
	     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	     * For the list of reserved names please see:
	     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
	     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
	     *     for transitional soy proto support: http://goto/soy-param-migration
	     * @return {!Object}
	     */
	    proto.types.GetBlockHeadersResponse.prototype.toObject = function (opt_includeInstance) {
	      return proto.types.GetBlockHeadersResponse.toObject(opt_includeInstance, this);
	    };
	    /**
	     * Static version of the {@see toObject} method.
	     * @param {boolean|undefined} includeInstance Whether to include the JSPB
	     *     instance for transitional soy proto support:
	     *     http://goto/soy-param-migration
	     * @param {!proto.types.GetBlockHeadersResponse} msg The msg instance to transform.
	     * @return {!Object}
	     * @suppress {unusedLocalVariables} f is only used for nested messages
	     */


	    proto.types.GetBlockHeadersResponse.toObject = function (includeInstance, msg) {
	      var obj = {
	        status: googleProtobuf.Message.getFieldWithDefault(msg, 1, 0),
	        hashesList: msg.getHashesList_asB64(),
	        headersList: googleProtobuf.Message.toObjectList(msg.getHeadersList(), blockchain_pb.BlockHeader.toObject, includeInstance),
	        hasnext: googleProtobuf.Message.getFieldWithDefault(msg, 4, false)
	      };

	      if (includeInstance) {
	        obj.$jspbMessageInstance = msg;
	      }

	      return obj;
	    };
	  }
	  /**
	   * Deserializes binary data (in protobuf wire format).
	   * @param {jspb.ByteSource} bytes The bytes to deserialize.
	   * @return {!proto.types.GetBlockHeadersResponse}
	   */


	  proto.types.GetBlockHeadersResponse.deserializeBinary = function (bytes) {
	    var reader = new googleProtobuf.BinaryReader(bytes);
	    var msg = new proto.types.GetBlockHeadersResponse();
	    return proto.types.GetBlockHeadersResponse.deserializeBinaryFromReader(msg, reader);
	  };
	  /**
	   * Deserializes binary data (in protobuf wire format) from the
	   * given reader into the given message object.
	   * @param {!proto.types.GetBlockHeadersResponse} msg The message object to deserialize into.
	   * @param {!jspb.BinaryReader} reader The BinaryReader to use.
	   * @return {!proto.types.GetBlockHeadersResponse}
	   */


	  proto.types.GetBlockHeadersResponse.deserializeBinaryFromReader = function (msg, reader) {
	    while (reader.nextField()) {
	      if (reader.isEndGroup()) {
	        break;
	      }

	      var field = reader.getFieldNumber();

	      switch (field) {
	        case 1:
	          var value =
	          /** @type {!proto.types.ResultStatus} */
	          reader.readEnum();
	          msg.setStatus(value);
	          break;

	        case 2:
	          var value =
	          /** @type {!Uint8Array} */
	          reader.readBytes();
	          msg.addHashes(value);
	          break;

	        case 3:
	          var value = new blockchain_pb.BlockHeader();
	          reader.readMessage(value, blockchain_pb.BlockHeader.deserializeBinaryFromReader);
	          msg.addHeaders(value);
	          break;

	        case 4:
	          var value =
	          /** @type {boolean} */
	          reader.readBool();
	          msg.setHasnext(value);
	          break;

	        default:
	          reader.skipField();
	          break;
	      }
	    }

	    return msg;
	  };
	  /**
	   * Serializes the message to binary data (in protobuf wire format).
	   * @return {!Uint8Array}
	   */


	  proto.types.GetBlockHeadersResponse.prototype.serializeBinary = function () {
	    var writer = new googleProtobuf.BinaryWriter();
	    proto.types.GetBlockHeadersResponse.serializeBinaryToWriter(this, writer);
	    return writer.getResultBuffer();
	  };
	  /**
	   * Serializes the given message to binary data (in protobuf wire
	   * format), writing to the given BinaryWriter.
	   * @param {!proto.types.GetBlockHeadersResponse} message
	   * @param {!jspb.BinaryWriter} writer
	   * @suppress {unusedLocalVariables} f is only used for nested messages
	   */


	  proto.types.GetBlockHeadersResponse.serializeBinaryToWriter = function (message, writer) {
	    var f = undefined;
	    f = message.getStatus();

	    if (f !== 0.0) {
	      writer.writeEnum(1, f);
	    }

	    f = message.getHashesList_asU8();

	    if (f.length > 0) {
	      writer.writeRepeatedBytes(2, f);
	    }

	    f = message.getHeadersList();

	    if (f.length > 0) {
	      writer.writeRepeatedMessage(3, f, blockchain_pb.BlockHeader.serializeBinaryToWriter);
	    }

	    f = message.getHasnext();

	    if (f) {
	      writer.writeBool(4, f);
	    }
	  };
	  /**
	   * optional ResultStatus status = 1;
	   * @return {!proto.types.ResultStatus}
	   */


	  proto.types.GetBlockHeadersResponse.prototype.getStatus = function () {
	    return (
	      /** @type {!proto.types.ResultStatus} */
	      googleProtobuf.Message.getFieldWithDefault(this, 1, 0)
	    );
	  };
	  /** @param {!proto.types.ResultStatus} value */


	  proto.types.GetBlockHeadersResponse.prototype.setStatus = function (value) {
	    googleProtobuf.Message.setField(this, 1, value);
	  };
	  /**
	   * repeated bytes hashes = 2;
	   * @return {!(Array<!Uint8Array>|Array<string>)}
	   */


	  proto.types.GetBlockHeadersResponse.prototype.getHashesList = function () {
	    return (
	      /** @type {!(Array<!Uint8Array>|Array<string>)} */
	      googleProtobuf.Message.getRepeatedField(this, 2)
	    );
	  };
	  /**
	   * repeated bytes hashes = 2;
	   * This is a type-conversion wrapper around `getHashesList()`
	   * @return {!Array.<string>}
	   */


	  proto.types.GetBlockHeadersResponse.prototype.getHashesList_asB64 = function () {
	    return (
	      /** @type {!Array.<string>} */
	      googleProtobuf.Message.bytesListAsB64(this.getHashesList())
	    );
	  };
	  /**
	   * repeated bytes hashes = 2;
	   * Note that Uint8Array is not supported on all browsers.
	   * @see http://caniuse.com/Uint8Array
	   * This is a type-conversion wrapper around `getHashesList()`
	   * @return {!Array.<!Uint8Array>}
	   */


	  proto.types.GetBlockHeadersResponse.prototype.getHashesList_asU8 = function () {
	    return (
	      /** @type {!Array.<!Uint8Array>} */
	      googleProtobuf.Message.bytesListAsU8(this.getHashesList())
	    );
	  };
	  /** @param {!(Array<!Uint8Array>|Array<string>)} value */


	  proto.types.GetBlockHeadersResponse.prototype.setHashesList = function (value) {
	    googleProtobuf.Message.setField(this, 2, value || []);
	  };
	  /**
	   * @param {!(string|Uint8Array)} value
	   * @param {number=} opt_index
	   */


	  proto.types.GetBlockHeadersResponse.prototype.addHashes = function (value, opt_index) {
	    googleProtobuf.Message.addToRepeatedField(this, 2, value, opt_index);
	  };

	  proto.types.GetBlockHeadersResponse.prototype.clearHashesList = function () {
	    this.setHashesList([]);
	  };
	  /**
	   * repeated BlockHeader headers = 3;
	   * @return {!Array.<!proto.types.BlockHeader>}
	   */


	  proto.types.GetBlockHeadersResponse.prototype.getHeadersList = function () {
	    return (
	      /** @type{!Array.<!proto.types.BlockHeader>} */
	      googleProtobuf.Message.getRepeatedWrapperField(this, blockchain_pb.BlockHeader, 3)
	    );
	  };
	  /** @param {!Array.<!proto.types.BlockHeader>} value */


	  proto.types.GetBlockHeadersResponse.prototype.setHeadersList = function (value) {
	    googleProtobuf.Message.setRepeatedWrapperField(this, 3, value);
	  };
	  /**
	   * @param {!proto.types.BlockHeader=} opt_value
	   * @param {number=} opt_index
	   * @return {!proto.types.BlockHeader}
	   */


	  proto.types.GetBlockHeadersResponse.prototype.addHeaders = function (opt_value, opt_index) {
	    return googleProtobuf.Message.addToRepeatedWrapperField(this, 3, opt_value, proto.types.BlockHeader, opt_index);
	  };

	  proto.types.GetBlockHeadersResponse.prototype.clearHeadersList = function () {
	    this.setHeadersList([]);
	  };
	  /**
	   * optional bool hasNext = 4;
	   * Note that Boolean fields may be set to 0/1 when serialized from a Java server.
	   * You should avoid comparisons like {@code val === true/false} in those cases.
	   * @return {boolean}
	   */


	  proto.types.GetBlockHeadersResponse.prototype.getHasnext = function () {
	    return (
	      /** @type {boolean} */
	      googleProtobuf.Message.getFieldWithDefault(this, 4, false)
	    );
	  };
	  /** @param {boolean} value */


	  proto.types.GetBlockHeadersResponse.prototype.setHasnext = function (value) {
	    googleProtobuf.Message.setField(this, 4, value);
	  };
	  /**
	   * Generated by JsPbCodeGenerator.
	   * @param {Array=} opt_data Optional initial data array, typically from a
	   * server response, or constructed directly in Javascript. The array is used
	   * in place and becomes part of the constructed object. It is not cloned.
	   * If no data is provided, the constructed object will be empty, but still
	   * valid.
	   * @extends {jspb.Message}
	   * @constructor
	   */


	  proto.types.GetBlockRequest = function (opt_data) {
	    googleProtobuf.Message.initialize(this, opt_data, 0, -1, proto.types.GetBlockRequest.repeatedFields_, null);
	  };

	  goog.inherits(proto.types.GetBlockRequest, googleProtobuf.Message);
	  /**
	   * List of repeated fields within this message type.
	   * @private {!Array<number>}
	   * @const
	   */


	  proto.types.GetBlockRequest.repeatedFields_ = [1];

	  if (googleProtobuf.Message.GENERATE_TO_OBJECT) {
	    /**
	     * Creates an object representation of this proto suitable for use in Soy templates.
	     * Field names that are reserved in JavaScript and will be renamed to pb_name.
	     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	     * For the list of reserved names please see:
	     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
	     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
	     *     for transitional soy proto support: http://goto/soy-param-migration
	     * @return {!Object}
	     */
	    proto.types.GetBlockRequest.prototype.toObject = function (opt_includeInstance) {
	      return proto.types.GetBlockRequest.toObject(opt_includeInstance, this);
	    };
	    /**
	     * Static version of the {@see toObject} method.
	     * @param {boolean|undefined} includeInstance Whether to include the JSPB
	     *     instance for transitional soy proto support:
	     *     http://goto/soy-param-migration
	     * @param {!proto.types.GetBlockRequest} msg The msg instance to transform.
	     * @return {!Object}
	     * @suppress {unusedLocalVariables} f is only used for nested messages
	     */


	    proto.types.GetBlockRequest.toObject = function (includeInstance, msg) {
	      var obj = {
	        hashesList: msg.getHashesList_asB64()
	      };

	      if (includeInstance) {
	        obj.$jspbMessageInstance = msg;
	      }

	      return obj;
	    };
	  }
	  /**
	   * Deserializes binary data (in protobuf wire format).
	   * @param {jspb.ByteSource} bytes The bytes to deserialize.
	   * @return {!proto.types.GetBlockRequest}
	   */


	  proto.types.GetBlockRequest.deserializeBinary = function (bytes) {
	    var reader = new googleProtobuf.BinaryReader(bytes);
	    var msg = new proto.types.GetBlockRequest();
	    return proto.types.GetBlockRequest.deserializeBinaryFromReader(msg, reader);
	  };
	  /**
	   * Deserializes binary data (in protobuf wire format) from the
	   * given reader into the given message object.
	   * @param {!proto.types.GetBlockRequest} msg The message object to deserialize into.
	   * @param {!jspb.BinaryReader} reader The BinaryReader to use.
	   * @return {!proto.types.GetBlockRequest}
	   */


	  proto.types.GetBlockRequest.deserializeBinaryFromReader = function (msg, reader) {
	    while (reader.nextField()) {
	      if (reader.isEndGroup()) {
	        break;
	      }

	      var field = reader.getFieldNumber();

	      switch (field) {
	        case 1:
	          var value =
	          /** @type {!Uint8Array} */
	          reader.readBytes();
	          msg.addHashes(value);
	          break;

	        default:
	          reader.skipField();
	          break;
	      }
	    }

	    return msg;
	  };
	  /**
	   * Serializes the message to binary data (in protobuf wire format).
	   * @return {!Uint8Array}
	   */


	  proto.types.GetBlockRequest.prototype.serializeBinary = function () {
	    var writer = new googleProtobuf.BinaryWriter();
	    proto.types.GetBlockRequest.serializeBinaryToWriter(this, writer);
	    return writer.getResultBuffer();
	  };
	  /**
	   * Serializes the given message to binary data (in protobuf wire
	   * format), writing to the given BinaryWriter.
	   * @param {!proto.types.GetBlockRequest} message
	   * @param {!jspb.BinaryWriter} writer
	   * @suppress {unusedLocalVariables} f is only used for nested messages
	   */


	  proto.types.GetBlockRequest.serializeBinaryToWriter = function (message, writer) {
	    var f = undefined;
	    f = message.getHashesList_asU8();

	    if (f.length > 0) {
	      writer.writeRepeatedBytes(1, f);
	    }
	  };
	  /**
	   * repeated bytes hashes = 1;
	   * @return {!(Array<!Uint8Array>|Array<string>)}
	   */


	  proto.types.GetBlockRequest.prototype.getHashesList = function () {
	    return (
	      /** @type {!(Array<!Uint8Array>|Array<string>)} */
	      googleProtobuf.Message.getRepeatedField(this, 1)
	    );
	  };
	  /**
	   * repeated bytes hashes = 1;
	   * This is a type-conversion wrapper around `getHashesList()`
	   * @return {!Array.<string>}
	   */


	  proto.types.GetBlockRequest.prototype.getHashesList_asB64 = function () {
	    return (
	      /** @type {!Array.<string>} */
	      googleProtobuf.Message.bytesListAsB64(this.getHashesList())
	    );
	  };
	  /**
	   * repeated bytes hashes = 1;
	   * Note that Uint8Array is not supported on all browsers.
	   * @see http://caniuse.com/Uint8Array
	   * This is a type-conversion wrapper around `getHashesList()`
	   * @return {!Array.<!Uint8Array>}
	   */


	  proto.types.GetBlockRequest.prototype.getHashesList_asU8 = function () {
	    return (
	      /** @type {!Array.<!Uint8Array>} */
	      googleProtobuf.Message.bytesListAsU8(this.getHashesList())
	    );
	  };
	  /** @param {!(Array<!Uint8Array>|Array<string>)} value */


	  proto.types.GetBlockRequest.prototype.setHashesList = function (value) {
	    googleProtobuf.Message.setField(this, 1, value || []);
	  };
	  /**
	   * @param {!(string|Uint8Array)} value
	   * @param {number=} opt_index
	   */


	  proto.types.GetBlockRequest.prototype.addHashes = function (value, opt_index) {
	    googleProtobuf.Message.addToRepeatedField(this, 1, value, opt_index);
	  };

	  proto.types.GetBlockRequest.prototype.clearHashesList = function () {
	    this.setHashesList([]);
	  };
	  /**
	   * Generated by JsPbCodeGenerator.
	   * @param {Array=} opt_data Optional initial data array, typically from a
	   * server response, or constructed directly in Javascript. The array is used
	   * in place and becomes part of the constructed object. It is not cloned.
	   * If no data is provided, the constructed object will be empty, but still
	   * valid.
	   * @extends {jspb.Message}
	   * @constructor
	   */


	  proto.types.GetBlockResponse = function (opt_data) {
	    googleProtobuf.Message.initialize(this, opt_data, 0, -1, proto.types.GetBlockResponse.repeatedFields_, null);
	  };

	  goog.inherits(proto.types.GetBlockResponse, googleProtobuf.Message);
	  /**
	   * List of repeated fields within this message type.
	   * @private {!Array<number>}
	   * @const
	   */


	  proto.types.GetBlockResponse.repeatedFields_ = [2];

	  if (googleProtobuf.Message.GENERATE_TO_OBJECT) {
	    /**
	     * Creates an object representation of this proto suitable for use in Soy templates.
	     * Field names that are reserved in JavaScript and will be renamed to pb_name.
	     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	     * For the list of reserved names please see:
	     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
	     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
	     *     for transitional soy proto support: http://goto/soy-param-migration
	     * @return {!Object}
	     */
	    proto.types.GetBlockResponse.prototype.toObject = function (opt_includeInstance) {
	      return proto.types.GetBlockResponse.toObject(opt_includeInstance, this);
	    };
	    /**
	     * Static version of the {@see toObject} method.
	     * @param {boolean|undefined} includeInstance Whether to include the JSPB
	     *     instance for transitional soy proto support:
	     *     http://goto/soy-param-migration
	     * @param {!proto.types.GetBlockResponse} msg The msg instance to transform.
	     * @return {!Object}
	     * @suppress {unusedLocalVariables} f is only used for nested messages
	     */


	    proto.types.GetBlockResponse.toObject = function (includeInstance, msg) {
	      var obj = {
	        status: googleProtobuf.Message.getFieldWithDefault(msg, 1, 0),
	        blocksList: googleProtobuf.Message.toObjectList(msg.getBlocksList(), blockchain_pb.Block.toObject, includeInstance),
	        hasnext: googleProtobuf.Message.getFieldWithDefault(msg, 3, false)
	      };

	      if (includeInstance) {
	        obj.$jspbMessageInstance = msg;
	      }

	      return obj;
	    };
	  }
	  /**
	   * Deserializes binary data (in protobuf wire format).
	   * @param {jspb.ByteSource} bytes The bytes to deserialize.
	   * @return {!proto.types.GetBlockResponse}
	   */


	  proto.types.GetBlockResponse.deserializeBinary = function (bytes) {
	    var reader = new googleProtobuf.BinaryReader(bytes);
	    var msg = new proto.types.GetBlockResponse();
	    return proto.types.GetBlockResponse.deserializeBinaryFromReader(msg, reader);
	  };
	  /**
	   * Deserializes binary data (in protobuf wire format) from the
	   * given reader into the given message object.
	   * @param {!proto.types.GetBlockResponse} msg The message object to deserialize into.
	   * @param {!jspb.BinaryReader} reader The BinaryReader to use.
	   * @return {!proto.types.GetBlockResponse}
	   */


	  proto.types.GetBlockResponse.deserializeBinaryFromReader = function (msg, reader) {
	    while (reader.nextField()) {
	      if (reader.isEndGroup()) {
	        break;
	      }

	      var field = reader.getFieldNumber();

	      switch (field) {
	        case 1:
	          var value =
	          /** @type {!proto.types.ResultStatus} */
	          reader.readEnum();
	          msg.setStatus(value);
	          break;

	        case 2:
	          var value = new blockchain_pb.Block();
	          reader.readMessage(value, blockchain_pb.Block.deserializeBinaryFromReader);
	          msg.addBlocks(value);
	          break;

	        case 3:
	          var value =
	          /** @type {boolean} */
	          reader.readBool();
	          msg.setHasnext(value);
	          break;

	        default:
	          reader.skipField();
	          break;
	      }
	    }

	    return msg;
	  };
	  /**
	   * Serializes the message to binary data (in protobuf wire format).
	   * @return {!Uint8Array}
	   */


	  proto.types.GetBlockResponse.prototype.serializeBinary = function () {
	    var writer = new googleProtobuf.BinaryWriter();
	    proto.types.GetBlockResponse.serializeBinaryToWriter(this, writer);
	    return writer.getResultBuffer();
	  };
	  /**
	   * Serializes the given message to binary data (in protobuf wire
	   * format), writing to the given BinaryWriter.
	   * @param {!proto.types.GetBlockResponse} message
	   * @param {!jspb.BinaryWriter} writer
	   * @suppress {unusedLocalVariables} f is only used for nested messages
	   */


	  proto.types.GetBlockResponse.serializeBinaryToWriter = function (message, writer) {
	    var f = undefined;
	    f = message.getStatus();

	    if (f !== 0.0) {
	      writer.writeEnum(1, f);
	    }

	    f = message.getBlocksList();

	    if (f.length > 0) {
	      writer.writeRepeatedMessage(2, f, blockchain_pb.Block.serializeBinaryToWriter);
	    }

	    f = message.getHasnext();

	    if (f) {
	      writer.writeBool(3, f);
	    }
	  };
	  /**
	   * optional ResultStatus status = 1;
	   * @return {!proto.types.ResultStatus}
	   */


	  proto.types.GetBlockResponse.prototype.getStatus = function () {
	    return (
	      /** @type {!proto.types.ResultStatus} */
	      googleProtobuf.Message.getFieldWithDefault(this, 1, 0)
	    );
	  };
	  /** @param {!proto.types.ResultStatus} value */


	  proto.types.GetBlockResponse.prototype.setStatus = function (value) {
	    googleProtobuf.Message.setField(this, 1, value);
	  };
	  /**
	   * repeated Block blocks = 2;
	   * @return {!Array.<!proto.types.Block>}
	   */


	  proto.types.GetBlockResponse.prototype.getBlocksList = function () {
	    return (
	      /** @type{!Array.<!proto.types.Block>} */
	      googleProtobuf.Message.getRepeatedWrapperField(this, blockchain_pb.Block, 2)
	    );
	  };
	  /** @param {!Array.<!proto.types.Block>} value */


	  proto.types.GetBlockResponse.prototype.setBlocksList = function (value) {
	    googleProtobuf.Message.setRepeatedWrapperField(this, 2, value);
	  };
	  /**
	   * @param {!proto.types.Block=} opt_value
	   * @param {number=} opt_index
	   * @return {!proto.types.Block}
	   */


	  proto.types.GetBlockResponse.prototype.addBlocks = function (opt_value, opt_index) {
	    return googleProtobuf.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.types.Block, opt_index);
	  };

	  proto.types.GetBlockResponse.prototype.clearBlocksList = function () {
	    this.setBlocksList([]);
	  };
	  /**
	   * optional bool hasNext = 3;
	   * Note that Boolean fields may be set to 0/1 when serialized from a Java server.
	   * You should avoid comparisons like {@code val === true/false} in those cases.
	   * @return {boolean}
	   */


	  proto.types.GetBlockResponse.prototype.getHasnext = function () {
	    return (
	      /** @type {boolean} */
	      googleProtobuf.Message.getFieldWithDefault(this, 3, false)
	    );
	  };
	  /** @param {boolean} value */


	  proto.types.GetBlockResponse.prototype.setHasnext = function (value) {
	    googleProtobuf.Message.setField(this, 3, value);
	  };
	  /**
	   * Generated by JsPbCodeGenerator.
	   * @param {Array=} opt_data Optional initial data array, typically from a
	   * server response, or constructed directly in Javascript. The array is used
	   * in place and becomes part of the constructed object. It is not cloned.
	   * If no data is provided, the constructed object will be empty, but still
	   * valid.
	   * @extends {jspb.Message}
	   * @constructor
	   */


	  proto.types.NewTransactionsNotice = function (opt_data) {
	    googleProtobuf.Message.initialize(this, opt_data, 0, -1, proto.types.NewTransactionsNotice.repeatedFields_, null);
	  };

	  goog.inherits(proto.types.NewTransactionsNotice, googleProtobuf.Message);
	  /**
	   * List of repeated fields within this message type.
	   * @private {!Array<number>}
	   * @const
	   */


	  proto.types.NewTransactionsNotice.repeatedFields_ = [1];

	  if (googleProtobuf.Message.GENERATE_TO_OBJECT) {
	    /**
	     * Creates an object representation of this proto suitable for use in Soy templates.
	     * Field names that are reserved in JavaScript and will be renamed to pb_name.
	     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	     * For the list of reserved names please see:
	     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
	     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
	     *     for transitional soy proto support: http://goto/soy-param-migration
	     * @return {!Object}
	     */
	    proto.types.NewTransactionsNotice.prototype.toObject = function (opt_includeInstance) {
	      return proto.types.NewTransactionsNotice.toObject(opt_includeInstance, this);
	    };
	    /**
	     * Static version of the {@see toObject} method.
	     * @param {boolean|undefined} includeInstance Whether to include the JSPB
	     *     instance for transitional soy proto support:
	     *     http://goto/soy-param-migration
	     * @param {!proto.types.NewTransactionsNotice} msg The msg instance to transform.
	     * @return {!Object}
	     * @suppress {unusedLocalVariables} f is only used for nested messages
	     */


	    proto.types.NewTransactionsNotice.toObject = function (includeInstance, msg) {
	      var obj = {
	        txhashesList: msg.getTxhashesList_asB64()
	      };

	      if (includeInstance) {
	        obj.$jspbMessageInstance = msg;
	      }

	      return obj;
	    };
	  }
	  /**
	   * Deserializes binary data (in protobuf wire format).
	   * @param {jspb.ByteSource} bytes The bytes to deserialize.
	   * @return {!proto.types.NewTransactionsNotice}
	   */


	  proto.types.NewTransactionsNotice.deserializeBinary = function (bytes) {
	    var reader = new googleProtobuf.BinaryReader(bytes);
	    var msg = new proto.types.NewTransactionsNotice();
	    return proto.types.NewTransactionsNotice.deserializeBinaryFromReader(msg, reader);
	  };
	  /**
	   * Deserializes binary data (in protobuf wire format) from the
	   * given reader into the given message object.
	   * @param {!proto.types.NewTransactionsNotice} msg The message object to deserialize into.
	   * @param {!jspb.BinaryReader} reader The BinaryReader to use.
	   * @return {!proto.types.NewTransactionsNotice}
	   */


	  proto.types.NewTransactionsNotice.deserializeBinaryFromReader = function (msg, reader) {
	    while (reader.nextField()) {
	      if (reader.isEndGroup()) {
	        break;
	      }

	      var field = reader.getFieldNumber();

	      switch (field) {
	        case 1:
	          var value =
	          /** @type {!Uint8Array} */
	          reader.readBytes();
	          msg.addTxhashes(value);
	          break;

	        default:
	          reader.skipField();
	          break;
	      }
	    }

	    return msg;
	  };
	  /**
	   * Serializes the message to binary data (in protobuf wire format).
	   * @return {!Uint8Array}
	   */


	  proto.types.NewTransactionsNotice.prototype.serializeBinary = function () {
	    var writer = new googleProtobuf.BinaryWriter();
	    proto.types.NewTransactionsNotice.serializeBinaryToWriter(this, writer);
	    return writer.getResultBuffer();
	  };
	  /**
	   * Serializes the given message to binary data (in protobuf wire
	   * format), writing to the given BinaryWriter.
	   * @param {!proto.types.NewTransactionsNotice} message
	   * @param {!jspb.BinaryWriter} writer
	   * @suppress {unusedLocalVariables} f is only used for nested messages
	   */


	  proto.types.NewTransactionsNotice.serializeBinaryToWriter = function (message, writer) {
	    var f = undefined;
	    f = message.getTxhashesList_asU8();

	    if (f.length > 0) {
	      writer.writeRepeatedBytes(1, f);
	    }
	  };
	  /**
	   * repeated bytes txHashes = 1;
	   * @return {!(Array<!Uint8Array>|Array<string>)}
	   */


	  proto.types.NewTransactionsNotice.prototype.getTxhashesList = function () {
	    return (
	      /** @type {!(Array<!Uint8Array>|Array<string>)} */
	      googleProtobuf.Message.getRepeatedField(this, 1)
	    );
	  };
	  /**
	   * repeated bytes txHashes = 1;
	   * This is a type-conversion wrapper around `getTxhashesList()`
	   * @return {!Array.<string>}
	   */


	  proto.types.NewTransactionsNotice.prototype.getTxhashesList_asB64 = function () {
	    return (
	      /** @type {!Array.<string>} */
	      googleProtobuf.Message.bytesListAsB64(this.getTxhashesList())
	    );
	  };
	  /**
	   * repeated bytes txHashes = 1;
	   * Note that Uint8Array is not supported on all browsers.
	   * @see http://caniuse.com/Uint8Array
	   * This is a type-conversion wrapper around `getTxhashesList()`
	   * @return {!Array.<!Uint8Array>}
	   */


	  proto.types.NewTransactionsNotice.prototype.getTxhashesList_asU8 = function () {
	    return (
	      /** @type {!Array.<!Uint8Array>} */
	      googleProtobuf.Message.bytesListAsU8(this.getTxhashesList())
	    );
	  };
	  /** @param {!(Array<!Uint8Array>|Array<string>)} value */


	  proto.types.NewTransactionsNotice.prototype.setTxhashesList = function (value) {
	    googleProtobuf.Message.setField(this, 1, value || []);
	  };
	  /**
	   * @param {!(string|Uint8Array)} value
	   * @param {number=} opt_index
	   */


	  proto.types.NewTransactionsNotice.prototype.addTxhashes = function (value, opt_index) {
	    googleProtobuf.Message.addToRepeatedField(this, 1, value, opt_index);
	  };

	  proto.types.NewTransactionsNotice.prototype.clearTxhashesList = function () {
	    this.setTxhashesList([]);
	  };
	  /**
	   * Generated by JsPbCodeGenerator.
	   * @param {Array=} opt_data Optional initial data array, typically from a
	   * server response, or constructed directly in Javascript. The array is used
	   * in place and becomes part of the constructed object. It is not cloned.
	   * If no data is provided, the constructed object will be empty, but still
	   * valid.
	   * @extends {jspb.Message}
	   * @constructor
	   */


	  proto.types.GetTransactionsRequest = function (opt_data) {
	    googleProtobuf.Message.initialize(this, opt_data, 0, -1, proto.types.GetTransactionsRequest.repeatedFields_, null);
	  };

	  goog.inherits(proto.types.GetTransactionsRequest, googleProtobuf.Message);
	  /**
	   * List of repeated fields within this message type.
	   * @private {!Array<number>}
	   * @const
	   */


	  proto.types.GetTransactionsRequest.repeatedFields_ = [1];

	  if (googleProtobuf.Message.GENERATE_TO_OBJECT) {
	    /**
	     * Creates an object representation of this proto suitable for use in Soy templates.
	     * Field names that are reserved in JavaScript and will be renamed to pb_name.
	     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	     * For the list of reserved names please see:
	     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
	     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
	     *     for transitional soy proto support: http://goto/soy-param-migration
	     * @return {!Object}
	     */
	    proto.types.GetTransactionsRequest.prototype.toObject = function (opt_includeInstance) {
	      return proto.types.GetTransactionsRequest.toObject(opt_includeInstance, this);
	    };
	    /**
	     * Static version of the {@see toObject} method.
	     * @param {boolean|undefined} includeInstance Whether to include the JSPB
	     *     instance for transitional soy proto support:
	     *     http://goto/soy-param-migration
	     * @param {!proto.types.GetTransactionsRequest} msg The msg instance to transform.
	     * @return {!Object}
	     * @suppress {unusedLocalVariables} f is only used for nested messages
	     */


	    proto.types.GetTransactionsRequest.toObject = function (includeInstance, msg) {
	      var obj = {
	        hashesList: msg.getHashesList_asB64()
	      };

	      if (includeInstance) {
	        obj.$jspbMessageInstance = msg;
	      }

	      return obj;
	    };
	  }
	  /**
	   * Deserializes binary data (in protobuf wire format).
	   * @param {jspb.ByteSource} bytes The bytes to deserialize.
	   * @return {!proto.types.GetTransactionsRequest}
	   */


	  proto.types.GetTransactionsRequest.deserializeBinary = function (bytes) {
	    var reader = new googleProtobuf.BinaryReader(bytes);
	    var msg = new proto.types.GetTransactionsRequest();
	    return proto.types.GetTransactionsRequest.deserializeBinaryFromReader(msg, reader);
	  };
	  /**
	   * Deserializes binary data (in protobuf wire format) from the
	   * given reader into the given message object.
	   * @param {!proto.types.GetTransactionsRequest} msg The message object to deserialize into.
	   * @param {!jspb.BinaryReader} reader The BinaryReader to use.
	   * @return {!proto.types.GetTransactionsRequest}
	   */


	  proto.types.GetTransactionsRequest.deserializeBinaryFromReader = function (msg, reader) {
	    while (reader.nextField()) {
	      if (reader.isEndGroup()) {
	        break;
	      }

	      var field = reader.getFieldNumber();

	      switch (field) {
	        case 1:
	          var value =
	          /** @type {!Uint8Array} */
	          reader.readBytes();
	          msg.addHashes(value);
	          break;

	        default:
	          reader.skipField();
	          break;
	      }
	    }

	    return msg;
	  };
	  /**
	   * Serializes the message to binary data (in protobuf wire format).
	   * @return {!Uint8Array}
	   */


	  proto.types.GetTransactionsRequest.prototype.serializeBinary = function () {
	    var writer = new googleProtobuf.BinaryWriter();
	    proto.types.GetTransactionsRequest.serializeBinaryToWriter(this, writer);
	    return writer.getResultBuffer();
	  };
	  /**
	   * Serializes the given message to binary data (in protobuf wire
	   * format), writing to the given BinaryWriter.
	   * @param {!proto.types.GetTransactionsRequest} message
	   * @param {!jspb.BinaryWriter} writer
	   * @suppress {unusedLocalVariables} f is only used for nested messages
	   */


	  proto.types.GetTransactionsRequest.serializeBinaryToWriter = function (message, writer) {
	    var f = undefined;
	    f = message.getHashesList_asU8();

	    if (f.length > 0) {
	      writer.writeRepeatedBytes(1, f);
	    }
	  };
	  /**
	   * repeated bytes hashes = 1;
	   * @return {!(Array<!Uint8Array>|Array<string>)}
	   */


	  proto.types.GetTransactionsRequest.prototype.getHashesList = function () {
	    return (
	      /** @type {!(Array<!Uint8Array>|Array<string>)} */
	      googleProtobuf.Message.getRepeatedField(this, 1)
	    );
	  };
	  /**
	   * repeated bytes hashes = 1;
	   * This is a type-conversion wrapper around `getHashesList()`
	   * @return {!Array.<string>}
	   */


	  proto.types.GetTransactionsRequest.prototype.getHashesList_asB64 = function () {
	    return (
	      /** @type {!Array.<string>} */
	      googleProtobuf.Message.bytesListAsB64(this.getHashesList())
	    );
	  };
	  /**
	   * repeated bytes hashes = 1;
	   * Note that Uint8Array is not supported on all browsers.
	   * @see http://caniuse.com/Uint8Array
	   * This is a type-conversion wrapper around `getHashesList()`
	   * @return {!Array.<!Uint8Array>}
	   */


	  proto.types.GetTransactionsRequest.prototype.getHashesList_asU8 = function () {
	    return (
	      /** @type {!Array.<!Uint8Array>} */
	      googleProtobuf.Message.bytesListAsU8(this.getHashesList())
	    );
	  };
	  /** @param {!(Array<!Uint8Array>|Array<string>)} value */


	  proto.types.GetTransactionsRequest.prototype.setHashesList = function (value) {
	    googleProtobuf.Message.setField(this, 1, value || []);
	  };
	  /**
	   * @param {!(string|Uint8Array)} value
	   * @param {number=} opt_index
	   */


	  proto.types.GetTransactionsRequest.prototype.addHashes = function (value, opt_index) {
	    googleProtobuf.Message.addToRepeatedField(this, 1, value, opt_index);
	  };

	  proto.types.GetTransactionsRequest.prototype.clearHashesList = function () {
	    this.setHashesList([]);
	  };
	  /**
	   * Generated by JsPbCodeGenerator.
	   * @param {Array=} opt_data Optional initial data array, typically from a
	   * server response, or constructed directly in Javascript. The array is used
	   * in place and becomes part of the constructed object. It is not cloned.
	   * If no data is provided, the constructed object will be empty, but still
	   * valid.
	   * @extends {jspb.Message}
	   * @constructor
	   */


	  proto.types.GetTransactionsResponse = function (opt_data) {
	    googleProtobuf.Message.initialize(this, opt_data, 0, -1, proto.types.GetTransactionsResponse.repeatedFields_, null);
	  };

	  goog.inherits(proto.types.GetTransactionsResponse, googleProtobuf.Message);
	  /**
	   * List of repeated fields within this message type.
	   * @private {!Array<number>}
	   * @const
	   */


	  proto.types.GetTransactionsResponse.repeatedFields_ = [2, 3];

	  if (googleProtobuf.Message.GENERATE_TO_OBJECT) {
	    /**
	     * Creates an object representation of this proto suitable for use in Soy templates.
	     * Field names that are reserved in JavaScript and will be renamed to pb_name.
	     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	     * For the list of reserved names please see:
	     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
	     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
	     *     for transitional soy proto support: http://goto/soy-param-migration
	     * @return {!Object}
	     */
	    proto.types.GetTransactionsResponse.prototype.toObject = function (opt_includeInstance) {
	      return proto.types.GetTransactionsResponse.toObject(opt_includeInstance, this);
	    };
	    /**
	     * Static version of the {@see toObject} method.
	     * @param {boolean|undefined} includeInstance Whether to include the JSPB
	     *     instance for transitional soy proto support:
	     *     http://goto/soy-param-migration
	     * @param {!proto.types.GetTransactionsResponse} msg The msg instance to transform.
	     * @return {!Object}
	     * @suppress {unusedLocalVariables} f is only used for nested messages
	     */


	    proto.types.GetTransactionsResponse.toObject = function (includeInstance, msg) {
	      var obj = {
	        status: googleProtobuf.Message.getFieldWithDefault(msg, 1, 0),
	        hashesList: msg.getHashesList_asB64(),
	        txsList: googleProtobuf.Message.toObjectList(msg.getTxsList(), blockchain_pb.Tx.toObject, includeInstance),
	        hasnext: googleProtobuf.Message.getFieldWithDefault(msg, 4, false)
	      };

	      if (includeInstance) {
	        obj.$jspbMessageInstance = msg;
	      }

	      return obj;
	    };
	  }
	  /**
	   * Deserializes binary data (in protobuf wire format).
	   * @param {jspb.ByteSource} bytes The bytes to deserialize.
	   * @return {!proto.types.GetTransactionsResponse}
	   */


	  proto.types.GetTransactionsResponse.deserializeBinary = function (bytes) {
	    var reader = new googleProtobuf.BinaryReader(bytes);
	    var msg = new proto.types.GetTransactionsResponse();
	    return proto.types.GetTransactionsResponse.deserializeBinaryFromReader(msg, reader);
	  };
	  /**
	   * Deserializes binary data (in protobuf wire format) from the
	   * given reader into the given message object.
	   * @param {!proto.types.GetTransactionsResponse} msg The message object to deserialize into.
	   * @param {!jspb.BinaryReader} reader The BinaryReader to use.
	   * @return {!proto.types.GetTransactionsResponse}
	   */


	  proto.types.GetTransactionsResponse.deserializeBinaryFromReader = function (msg, reader) {
	    while (reader.nextField()) {
	      if (reader.isEndGroup()) {
	        break;
	      }

	      var field = reader.getFieldNumber();

	      switch (field) {
	        case 1:
	          var value =
	          /** @type {!proto.types.ResultStatus} */
	          reader.readEnum();
	          msg.setStatus(value);
	          break;

	        case 2:
	          var value =
	          /** @type {!Uint8Array} */
	          reader.readBytes();
	          msg.addHashes(value);
	          break;

	        case 3:
	          var value = new blockchain_pb.Tx();
	          reader.readMessage(value, blockchain_pb.Tx.deserializeBinaryFromReader);
	          msg.addTxs(value);
	          break;

	        case 4:
	          var value =
	          /** @type {boolean} */
	          reader.readBool();
	          msg.setHasnext(value);
	          break;

	        default:
	          reader.skipField();
	          break;
	      }
	    }

	    return msg;
	  };
	  /**
	   * Serializes the message to binary data (in protobuf wire format).
	   * @return {!Uint8Array}
	   */


	  proto.types.GetTransactionsResponse.prototype.serializeBinary = function () {
	    var writer = new googleProtobuf.BinaryWriter();
	    proto.types.GetTransactionsResponse.serializeBinaryToWriter(this, writer);
	    return writer.getResultBuffer();
	  };
	  /**
	   * Serializes the given message to binary data (in protobuf wire
	   * format), writing to the given BinaryWriter.
	   * @param {!proto.types.GetTransactionsResponse} message
	   * @param {!jspb.BinaryWriter} writer
	   * @suppress {unusedLocalVariables} f is only used for nested messages
	   */


	  proto.types.GetTransactionsResponse.serializeBinaryToWriter = function (message, writer) {
	    var f = undefined;
	    f = message.getStatus();

	    if (f !== 0.0) {
	      writer.writeEnum(1, f);
	    }

	    f = message.getHashesList_asU8();

	    if (f.length > 0) {
	      writer.writeRepeatedBytes(2, f);
	    }

	    f = message.getTxsList();

	    if (f.length > 0) {
	      writer.writeRepeatedMessage(3, f, blockchain_pb.Tx.serializeBinaryToWriter);
	    }

	    f = message.getHasnext();

	    if (f) {
	      writer.writeBool(4, f);
	    }
	  };
	  /**
	   * optional ResultStatus status = 1;
	   * @return {!proto.types.ResultStatus}
	   */


	  proto.types.GetTransactionsResponse.prototype.getStatus = function () {
	    return (
	      /** @type {!proto.types.ResultStatus} */
	      googleProtobuf.Message.getFieldWithDefault(this, 1, 0)
	    );
	  };
	  /** @param {!proto.types.ResultStatus} value */


	  proto.types.GetTransactionsResponse.prototype.setStatus = function (value) {
	    googleProtobuf.Message.setField(this, 1, value);
	  };
	  /**
	   * repeated bytes hashes = 2;
	   * @return {!(Array<!Uint8Array>|Array<string>)}
	   */


	  proto.types.GetTransactionsResponse.prototype.getHashesList = function () {
	    return (
	      /** @type {!(Array<!Uint8Array>|Array<string>)} */
	      googleProtobuf.Message.getRepeatedField(this, 2)
	    );
	  };
	  /**
	   * repeated bytes hashes = 2;
	   * This is a type-conversion wrapper around `getHashesList()`
	   * @return {!Array.<string>}
	   */


	  proto.types.GetTransactionsResponse.prototype.getHashesList_asB64 = function () {
	    return (
	      /** @type {!Array.<string>} */
	      googleProtobuf.Message.bytesListAsB64(this.getHashesList())
	    );
	  };
	  /**
	   * repeated bytes hashes = 2;
	   * Note that Uint8Array is not supported on all browsers.
	   * @see http://caniuse.com/Uint8Array
	   * This is a type-conversion wrapper around `getHashesList()`
	   * @return {!Array.<!Uint8Array>}
	   */


	  proto.types.GetTransactionsResponse.prototype.getHashesList_asU8 = function () {
	    return (
	      /** @type {!Array.<!Uint8Array>} */
	      googleProtobuf.Message.bytesListAsU8(this.getHashesList())
	    );
	  };
	  /** @param {!(Array<!Uint8Array>|Array<string>)} value */


	  proto.types.GetTransactionsResponse.prototype.setHashesList = function (value) {
	    googleProtobuf.Message.setField(this, 2, value || []);
	  };
	  /**
	   * @param {!(string|Uint8Array)} value
	   * @param {number=} opt_index
	   */


	  proto.types.GetTransactionsResponse.prototype.addHashes = function (value, opt_index) {
	    googleProtobuf.Message.addToRepeatedField(this, 2, value, opt_index);
	  };

	  proto.types.GetTransactionsResponse.prototype.clearHashesList = function () {
	    this.setHashesList([]);
	  };
	  /**
	   * repeated Tx txs = 3;
	   * @return {!Array.<!proto.types.Tx>}
	   */


	  proto.types.GetTransactionsResponse.prototype.getTxsList = function () {
	    return (
	      /** @type{!Array.<!proto.types.Tx>} */
	      googleProtobuf.Message.getRepeatedWrapperField(this, blockchain_pb.Tx, 3)
	    );
	  };
	  /** @param {!Array.<!proto.types.Tx>} value */


	  proto.types.GetTransactionsResponse.prototype.setTxsList = function (value) {
	    googleProtobuf.Message.setRepeatedWrapperField(this, 3, value);
	  };
	  /**
	   * @param {!proto.types.Tx=} opt_value
	   * @param {number=} opt_index
	   * @return {!proto.types.Tx}
	   */


	  proto.types.GetTransactionsResponse.prototype.addTxs = function (opt_value, opt_index) {
	    return googleProtobuf.Message.addToRepeatedWrapperField(this, 3, opt_value, proto.types.Tx, opt_index);
	  };

	  proto.types.GetTransactionsResponse.prototype.clearTxsList = function () {
	    this.setTxsList([]);
	  };
	  /**
	   * optional bool hasNext = 4;
	   * Note that Boolean fields may be set to 0/1 when serialized from a Java server.
	   * You should avoid comparisons like {@code val === true/false} in those cases.
	   * @return {boolean}
	   */


	  proto.types.GetTransactionsResponse.prototype.getHasnext = function () {
	    return (
	      /** @type {boolean} */
	      googleProtobuf.Message.getFieldWithDefault(this, 4, false)
	    );
	  };
	  /** @param {boolean} value */


	  proto.types.GetTransactionsResponse.prototype.setHasnext = function (value) {
	    googleProtobuf.Message.setField(this, 4, value);
	  };
	  /**
	   * Generated by JsPbCodeGenerator.
	   * @param {Array=} opt_data Optional initial data array, typically from a
	   * server response, or constructed directly in Javascript. The array is used
	   * in place and becomes part of the constructed object. It is not cloned.
	   * If no data is provided, the constructed object will be empty, but still
	   * valid.
	   * @extends {jspb.Message}
	   * @constructor
	   */


	  proto.types.GetMissingRequest = function (opt_data) {
	    googleProtobuf.Message.initialize(this, opt_data, 0, -1, proto.types.GetMissingRequest.repeatedFields_, null);
	  };

	  goog.inherits(proto.types.GetMissingRequest, googleProtobuf.Message);
	  /**
	   * List of repeated fields within this message type.
	   * @private {!Array<number>}
	   * @const
	   */


	  proto.types.GetMissingRequest.repeatedFields_ = [1];

	  if (googleProtobuf.Message.GENERATE_TO_OBJECT) {
	    /**
	     * Creates an object representation of this proto suitable for use in Soy templates.
	     * Field names that are reserved in JavaScript and will be renamed to pb_name.
	     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	     * For the list of reserved names please see:
	     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
	     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
	     *     for transitional soy proto support: http://goto/soy-param-migration
	     * @return {!Object}
	     */
	    proto.types.GetMissingRequest.prototype.toObject = function (opt_includeInstance) {
	      return proto.types.GetMissingRequest.toObject(opt_includeInstance, this);
	    };
	    /**
	     * Static version of the {@see toObject} method.
	     * @param {boolean|undefined} includeInstance Whether to include the JSPB
	     *     instance for transitional soy proto support:
	     *     http://goto/soy-param-migration
	     * @param {!proto.types.GetMissingRequest} msg The msg instance to transform.
	     * @return {!Object}
	     * @suppress {unusedLocalVariables} f is only used for nested messages
	     */


	    proto.types.GetMissingRequest.toObject = function (includeInstance, msg) {
	      var obj = {
	        hashesList: msg.getHashesList_asB64(),
	        stophash: msg.getStophash_asB64()
	      };

	      if (includeInstance) {
	        obj.$jspbMessageInstance = msg;
	      }

	      return obj;
	    };
	  }
	  /**
	   * Deserializes binary data (in protobuf wire format).
	   * @param {jspb.ByteSource} bytes The bytes to deserialize.
	   * @return {!proto.types.GetMissingRequest}
	   */


	  proto.types.GetMissingRequest.deserializeBinary = function (bytes) {
	    var reader = new googleProtobuf.BinaryReader(bytes);
	    var msg = new proto.types.GetMissingRequest();
	    return proto.types.GetMissingRequest.deserializeBinaryFromReader(msg, reader);
	  };
	  /**
	   * Deserializes binary data (in protobuf wire format) from the
	   * given reader into the given message object.
	   * @param {!proto.types.GetMissingRequest} msg The message object to deserialize into.
	   * @param {!jspb.BinaryReader} reader The BinaryReader to use.
	   * @return {!proto.types.GetMissingRequest}
	   */


	  proto.types.GetMissingRequest.deserializeBinaryFromReader = function (msg, reader) {
	    while (reader.nextField()) {
	      if (reader.isEndGroup()) {
	        break;
	      }

	      var field = reader.getFieldNumber();

	      switch (field) {
	        case 1:
	          var value =
	          /** @type {!Uint8Array} */
	          reader.readBytes();
	          msg.addHashes(value);
	          break;

	        case 2:
	          var value =
	          /** @type {!Uint8Array} */
	          reader.readBytes();
	          msg.setStophash(value);
	          break;

	        default:
	          reader.skipField();
	          break;
	      }
	    }

	    return msg;
	  };
	  /**
	   * Serializes the message to binary data (in protobuf wire format).
	   * @return {!Uint8Array}
	   */


	  proto.types.GetMissingRequest.prototype.serializeBinary = function () {
	    var writer = new googleProtobuf.BinaryWriter();
	    proto.types.GetMissingRequest.serializeBinaryToWriter(this, writer);
	    return writer.getResultBuffer();
	  };
	  /**
	   * Serializes the given message to binary data (in protobuf wire
	   * format), writing to the given BinaryWriter.
	   * @param {!proto.types.GetMissingRequest} message
	   * @param {!jspb.BinaryWriter} writer
	   * @suppress {unusedLocalVariables} f is only used for nested messages
	   */


	  proto.types.GetMissingRequest.serializeBinaryToWriter = function (message, writer) {
	    var f = undefined;
	    f = message.getHashesList_asU8();

	    if (f.length > 0) {
	      writer.writeRepeatedBytes(1, f);
	    }

	    f = message.getStophash_asU8();

	    if (f.length > 0) {
	      writer.writeBytes(2, f);
	    }
	  };
	  /**
	   * repeated bytes hashes = 1;
	   * @return {!(Array<!Uint8Array>|Array<string>)}
	   */


	  proto.types.GetMissingRequest.prototype.getHashesList = function () {
	    return (
	      /** @type {!(Array<!Uint8Array>|Array<string>)} */
	      googleProtobuf.Message.getRepeatedField(this, 1)
	    );
	  };
	  /**
	   * repeated bytes hashes = 1;
	   * This is a type-conversion wrapper around `getHashesList()`
	   * @return {!Array.<string>}
	   */


	  proto.types.GetMissingRequest.prototype.getHashesList_asB64 = function () {
	    return (
	      /** @type {!Array.<string>} */
	      googleProtobuf.Message.bytesListAsB64(this.getHashesList())
	    );
	  };
	  /**
	   * repeated bytes hashes = 1;
	   * Note that Uint8Array is not supported on all browsers.
	   * @see http://caniuse.com/Uint8Array
	   * This is a type-conversion wrapper around `getHashesList()`
	   * @return {!Array.<!Uint8Array>}
	   */


	  proto.types.GetMissingRequest.prototype.getHashesList_asU8 = function () {
	    return (
	      /** @type {!Array.<!Uint8Array>} */
	      googleProtobuf.Message.bytesListAsU8(this.getHashesList())
	    );
	  };
	  /** @param {!(Array<!Uint8Array>|Array<string>)} value */


	  proto.types.GetMissingRequest.prototype.setHashesList = function (value) {
	    googleProtobuf.Message.setField(this, 1, value || []);
	  };
	  /**
	   * @param {!(string|Uint8Array)} value
	   * @param {number=} opt_index
	   */


	  proto.types.GetMissingRequest.prototype.addHashes = function (value, opt_index) {
	    googleProtobuf.Message.addToRepeatedField(this, 1, value, opt_index);
	  };

	  proto.types.GetMissingRequest.prototype.clearHashesList = function () {
	    this.setHashesList([]);
	  };
	  /**
	   * optional bytes stophash = 2;
	   * @return {!(string|Uint8Array)}
	   */


	  proto.types.GetMissingRequest.prototype.getStophash = function () {
	    return (
	      /** @type {!(string|Uint8Array)} */
	      googleProtobuf.Message.getFieldWithDefault(this, 2, "")
	    );
	  };
	  /**
	   * optional bytes stophash = 2;
	   * This is a type-conversion wrapper around `getStophash()`
	   * @return {string}
	   */


	  proto.types.GetMissingRequest.prototype.getStophash_asB64 = function () {
	    return (
	      /** @type {string} */
	      googleProtobuf.Message.bytesAsB64(this.getStophash())
	    );
	  };
	  /**
	   * optional bytes stophash = 2;
	   * Note that Uint8Array is not supported on all browsers.
	   * @see http://caniuse.com/Uint8Array
	   * This is a type-conversion wrapper around `getStophash()`
	   * @return {!Uint8Array}
	   */


	  proto.types.GetMissingRequest.prototype.getStophash_asU8 = function () {
	    return (
	      /** @type {!Uint8Array} */
	      googleProtobuf.Message.bytesAsU8(this.getStophash())
	    );
	  };
	  /** @param {!(string|Uint8Array)} value */


	  proto.types.GetMissingRequest.prototype.setStophash = function (value) {
	    googleProtobuf.Message.setField(this, 2, value);
	  };
	  /**
	   * @enum {number}
	   */


	  proto.types.ResultStatus = {
	    OK: 0,
	    CANCELED: 1,
	    UNKNOWN: 2,
	    INVALID_ARGUMENT: 3,
	    DEADLINE_EXCEEDED: 4,
	    NOT_FOUND: 5,
	    ALREADY_EXISTS: 6,
	    PERMISSION_DENIED: 7,
	    RESOURCE_EXHAUSTED: 8,
	    FAILED_PRECONDITION: 9,
	    ABORTED: 10,
	    OUT_OF_RANGE: 11,
	    UNIMPLEMENTED: 12,
	    INTERNAL: 13,
	    UNAVAILABLE: 14,
	    DATA_LOSS: 15,
	    UNAUTHENTICATED: 16
	  };
	  goog.object.extend(exports, proto.types);
	});

	var rpc_pb = createCommonjsModule(function (module, exports) {
	  /**
	   * @fileoverview
	   * @enhanceable
	   * @suppress {messageConventions} JS Compiler reports an error if a variable or
	   *     field starts with 'MSG_' and isn't a translatable message.
	   * @public
	   */
	  // GENERATED CODE -- DO NOT EDIT!
	  var goog = googleProtobuf;
	  var global = Function('return this')();
	  goog.exportSymbol('proto.types.AccountAndRoot', null, global);
	  goog.exportSymbol('proto.types.BlockHeaderList', null, global);
	  goog.exportSymbol('proto.types.BlockchainStatus', null, global);
	  goog.exportSymbol('proto.types.CommitResult', null, global);
	  goog.exportSymbol('proto.types.CommitResultList', null, global);
	  goog.exportSymbol('proto.types.CommitStatus', null, global);
	  goog.exportSymbol('proto.types.Empty', null, global);
	  goog.exportSymbol('proto.types.ImportFormat', null, global);
	  goog.exportSymbol('proto.types.Input', null, global);
	  goog.exportSymbol('proto.types.ListParams', null, global);
	  goog.exportSymbol('proto.types.Output', null, global);
	  goog.exportSymbol('proto.types.Peer', null, global);
	  goog.exportSymbol('proto.types.PeerList', null, global);
	  goog.exportSymbol('proto.types.Personal', null, global);
	  goog.exportSymbol('proto.types.SingleBytes', null, global);
	  goog.exportSymbol('proto.types.Staking', null, global);
	  goog.exportSymbol('proto.types.VerifyResult', null, global);
	  goog.exportSymbol('proto.types.VerifyStatus', null, global);
	  goog.exportSymbol('proto.types.Vote', null, global);
	  goog.exportSymbol('proto.types.VoteList', null, global);
	  /**
	   * Generated by JsPbCodeGenerator.
	   * @param {Array=} opt_data Optional initial data array, typically from a
	   * server response, or constructed directly in Javascript. The array is used
	   * in place and becomes part of the constructed object. It is not cloned.
	   * If no data is provided, the constructed object will be empty, but still
	   * valid.
	   * @extends {jspb.Message}
	   * @constructor
	   */

	  proto.types.BlockchainStatus = function (opt_data) {
	    googleProtobuf.Message.initialize(this, opt_data, 0, -1, null, null);
	  };

	  goog.inherits(proto.types.BlockchainStatus, googleProtobuf.Message);

	  if (googleProtobuf.Message.GENERATE_TO_OBJECT) {
	    /**
	     * Creates an object representation of this proto suitable for use in Soy templates.
	     * Field names that are reserved in JavaScript and will be renamed to pb_name.
	     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	     * For the list of reserved names please see:
	     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
	     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
	     *     for transitional soy proto support: http://goto/soy-param-migration
	     * @return {!Object}
	     */
	    proto.types.BlockchainStatus.prototype.toObject = function (opt_includeInstance) {
	      return proto.types.BlockchainStatus.toObject(opt_includeInstance, this);
	    };
	    /**
	     * Static version of the {@see toObject} method.
	     * @param {boolean|undefined} includeInstance Whether to include the JSPB
	     *     instance for transitional soy proto support:
	     *     http://goto/soy-param-migration
	     * @param {!proto.types.BlockchainStatus} msg The msg instance to transform.
	     * @return {!Object}
	     * @suppress {unusedLocalVariables} f is only used for nested messages
	     */


	    proto.types.BlockchainStatus.toObject = function (includeInstance, msg) {
	      var obj = {
	        bestBlockHash: msg.getBestBlockHash_asB64(),
	        bestHeight: googleProtobuf.Message.getFieldWithDefault(msg, 2, 0)
	      };

	      if (includeInstance) {
	        obj.$jspbMessageInstance = msg;
	      }

	      return obj;
	    };
	  }
	  /**
	   * Deserializes binary data (in protobuf wire format).
	   * @param {jspb.ByteSource} bytes The bytes to deserialize.
	   * @return {!proto.types.BlockchainStatus}
	   */


	  proto.types.BlockchainStatus.deserializeBinary = function (bytes) {
	    var reader = new googleProtobuf.BinaryReader(bytes);
	    var msg = new proto.types.BlockchainStatus();
	    return proto.types.BlockchainStatus.deserializeBinaryFromReader(msg, reader);
	  };
	  /**
	   * Deserializes binary data (in protobuf wire format) from the
	   * given reader into the given message object.
	   * @param {!proto.types.BlockchainStatus} msg The message object to deserialize into.
	   * @param {!jspb.BinaryReader} reader The BinaryReader to use.
	   * @return {!proto.types.BlockchainStatus}
	   */


	  proto.types.BlockchainStatus.deserializeBinaryFromReader = function (msg, reader) {
	    while (reader.nextField()) {
	      if (reader.isEndGroup()) {
	        break;
	      }

	      var field = reader.getFieldNumber();

	      switch (field) {
	        case 1:
	          var value =
	          /** @type {!Uint8Array} */
	          reader.readBytes();
	          msg.setBestBlockHash(value);
	          break;

	        case 2:
	          var value =
	          /** @type {number} */
	          reader.readUint64();
	          msg.setBestHeight(value);
	          break;

	        default:
	          reader.skipField();
	          break;
	      }
	    }

	    return msg;
	  };
	  /**
	   * Serializes the message to binary data (in protobuf wire format).
	   * @return {!Uint8Array}
	   */


	  proto.types.BlockchainStatus.prototype.serializeBinary = function () {
	    var writer = new googleProtobuf.BinaryWriter();
	    proto.types.BlockchainStatus.serializeBinaryToWriter(this, writer);
	    return writer.getResultBuffer();
	  };
	  /**
	   * Serializes the given message to binary data (in protobuf wire
	   * format), writing to the given BinaryWriter.
	   * @param {!proto.types.BlockchainStatus} message
	   * @param {!jspb.BinaryWriter} writer
	   * @suppress {unusedLocalVariables} f is only used for nested messages
	   */


	  proto.types.BlockchainStatus.serializeBinaryToWriter = function (message, writer) {
	    var f = undefined;
	    f = message.getBestBlockHash_asU8();

	    if (f.length > 0) {
	      writer.writeBytes(1, f);
	    }

	    f = message.getBestHeight();

	    if (f !== 0) {
	      writer.writeUint64(2, f);
	    }
	  };
	  /**
	   * optional bytes best_block_hash = 1;
	   * @return {!(string|Uint8Array)}
	   */


	  proto.types.BlockchainStatus.prototype.getBestBlockHash = function () {
	    return (
	      /** @type {!(string|Uint8Array)} */
	      googleProtobuf.Message.getFieldWithDefault(this, 1, "")
	    );
	  };
	  /**
	   * optional bytes best_block_hash = 1;
	   * This is a type-conversion wrapper around `getBestBlockHash()`
	   * @return {string}
	   */


	  proto.types.BlockchainStatus.prototype.getBestBlockHash_asB64 = function () {
	    return (
	      /** @type {string} */
	      googleProtobuf.Message.bytesAsB64(this.getBestBlockHash())
	    );
	  };
	  /**
	   * optional bytes best_block_hash = 1;
	   * Note that Uint8Array is not supported on all browsers.
	   * @see http://caniuse.com/Uint8Array
	   * This is a type-conversion wrapper around `getBestBlockHash()`
	   * @return {!Uint8Array}
	   */


	  proto.types.BlockchainStatus.prototype.getBestBlockHash_asU8 = function () {
	    return (
	      /** @type {!Uint8Array} */
	      googleProtobuf.Message.bytesAsU8(this.getBestBlockHash())
	    );
	  };
	  /** @param {!(string|Uint8Array)} value */


	  proto.types.BlockchainStatus.prototype.setBestBlockHash = function (value) {
	    googleProtobuf.Message.setField(this, 1, value);
	  };
	  /**
	   * optional uint64 best_height = 2;
	   * @return {number}
	   */


	  proto.types.BlockchainStatus.prototype.getBestHeight = function () {
	    return (
	      /** @type {number} */
	      googleProtobuf.Message.getFieldWithDefault(this, 2, 0)
	    );
	  };
	  /** @param {number} value */


	  proto.types.BlockchainStatus.prototype.setBestHeight = function (value) {
	    googleProtobuf.Message.setField(this, 2, value);
	  };
	  /**
	   * Generated by JsPbCodeGenerator.
	   * @param {Array=} opt_data Optional initial data array, typically from a
	   * server response, or constructed directly in Javascript. The array is used
	   * in place and becomes part of the constructed object. It is not cloned.
	   * If no data is provided, the constructed object will be empty, but still
	   * valid.
	   * @extends {jspb.Message}
	   * @constructor
	   */


	  proto.types.Input = function (opt_data) {
	    googleProtobuf.Message.initialize(this, opt_data, 0, -1, proto.types.Input.repeatedFields_, null);
	  };

	  goog.inherits(proto.types.Input, googleProtobuf.Message);
	  /**
	   * List of repeated fields within this message type.
	   * @private {!Array<number>}
	   * @const
	   */


	  proto.types.Input.repeatedFields_ = [2];

	  if (googleProtobuf.Message.GENERATE_TO_OBJECT) {
	    /**
	     * Creates an object representation of this proto suitable for use in Soy templates.
	     * Field names that are reserved in JavaScript and will be renamed to pb_name.
	     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	     * For the list of reserved names please see:
	     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
	     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
	     *     for transitional soy proto support: http://goto/soy-param-migration
	     * @return {!Object}
	     */
	    proto.types.Input.prototype.toObject = function (opt_includeInstance) {
	      return proto.types.Input.toObject(opt_includeInstance, this);
	    };
	    /**
	     * Static version of the {@see toObject} method.
	     * @param {boolean|undefined} includeInstance Whether to include the JSPB
	     *     instance for transitional soy proto support:
	     *     http://goto/soy-param-migration
	     * @param {!proto.types.Input} msg The msg instance to transform.
	     * @return {!Object}
	     * @suppress {unusedLocalVariables} f is only used for nested messages
	     */


	    proto.types.Input.toObject = function (includeInstance, msg) {
	      var obj = {
	        hash: msg.getHash_asB64(),
	        addressList: msg.getAddressList_asB64(),
	        value: msg.getValue_asB64(),
	        script: msg.getScript_asB64()
	      };

	      if (includeInstance) {
	        obj.$jspbMessageInstance = msg;
	      }

	      return obj;
	    };
	  }
	  /**
	   * Deserializes binary data (in protobuf wire format).
	   * @param {jspb.ByteSource} bytes The bytes to deserialize.
	   * @return {!proto.types.Input}
	   */


	  proto.types.Input.deserializeBinary = function (bytes) {
	    var reader = new googleProtobuf.BinaryReader(bytes);
	    var msg = new proto.types.Input();
	    return proto.types.Input.deserializeBinaryFromReader(msg, reader);
	  };
	  /**
	   * Deserializes binary data (in protobuf wire format) from the
	   * given reader into the given message object.
	   * @param {!proto.types.Input} msg The message object to deserialize into.
	   * @param {!jspb.BinaryReader} reader The BinaryReader to use.
	   * @return {!proto.types.Input}
	   */


	  proto.types.Input.deserializeBinaryFromReader = function (msg, reader) {
	    while (reader.nextField()) {
	      if (reader.isEndGroup()) {
	        break;
	      }

	      var field = reader.getFieldNumber();

	      switch (field) {
	        case 1:
	          var value =
	          /** @type {!Uint8Array} */
	          reader.readBytes();
	          msg.setHash(value);
	          break;

	        case 2:
	          var value =
	          /** @type {!Uint8Array} */
	          reader.readBytes();
	          msg.addAddress(value);
	          break;

	        case 3:
	          var value =
	          /** @type {!Uint8Array} */
	          reader.readBytes();
	          msg.setValue(value);
	          break;

	        case 4:
	          var value =
	          /** @type {!Uint8Array} */
	          reader.readBytes();
	          msg.setScript(value);
	          break;

	        default:
	          reader.skipField();
	          break;
	      }
	    }

	    return msg;
	  };
	  /**
	   * Serializes the message to binary data (in protobuf wire format).
	   * @return {!Uint8Array}
	   */


	  proto.types.Input.prototype.serializeBinary = function () {
	    var writer = new googleProtobuf.BinaryWriter();
	    proto.types.Input.serializeBinaryToWriter(this, writer);
	    return writer.getResultBuffer();
	  };
	  /**
	   * Serializes the given message to binary data (in protobuf wire
	   * format), writing to the given BinaryWriter.
	   * @param {!proto.types.Input} message
	   * @param {!jspb.BinaryWriter} writer
	   * @suppress {unusedLocalVariables} f is only used for nested messages
	   */


	  proto.types.Input.serializeBinaryToWriter = function (message, writer) {
	    var f = undefined;
	    f = message.getHash_asU8();

	    if (f.length > 0) {
	      writer.writeBytes(1, f);
	    }

	    f = message.getAddressList_asU8();

	    if (f.length > 0) {
	      writer.writeRepeatedBytes(2, f);
	    }

	    f = message.getValue_asU8();

	    if (f.length > 0) {
	      writer.writeBytes(3, f);
	    }

	    f = message.getScript_asU8();

	    if (f.length > 0) {
	      writer.writeBytes(4, f);
	    }
	  };
	  /**
	   * optional bytes hash = 1;
	   * @return {!(string|Uint8Array)}
	   */


	  proto.types.Input.prototype.getHash = function () {
	    return (
	      /** @type {!(string|Uint8Array)} */
	      googleProtobuf.Message.getFieldWithDefault(this, 1, "")
	    );
	  };
	  /**
	   * optional bytes hash = 1;
	   * This is a type-conversion wrapper around `getHash()`
	   * @return {string}
	   */


	  proto.types.Input.prototype.getHash_asB64 = function () {
	    return (
	      /** @type {string} */
	      googleProtobuf.Message.bytesAsB64(this.getHash())
	    );
	  };
	  /**
	   * optional bytes hash = 1;
	   * Note that Uint8Array is not supported on all browsers.
	   * @see http://caniuse.com/Uint8Array
	   * This is a type-conversion wrapper around `getHash()`
	   * @return {!Uint8Array}
	   */


	  proto.types.Input.prototype.getHash_asU8 = function () {
	    return (
	      /** @type {!Uint8Array} */
	      googleProtobuf.Message.bytesAsU8(this.getHash())
	    );
	  };
	  /** @param {!(string|Uint8Array)} value */


	  proto.types.Input.prototype.setHash = function (value) {
	    googleProtobuf.Message.setField(this, 1, value);
	  };
	  /**
	   * repeated bytes address = 2;
	   * @return {!(Array<!Uint8Array>|Array<string>)}
	   */


	  proto.types.Input.prototype.getAddressList = function () {
	    return (
	      /** @type {!(Array<!Uint8Array>|Array<string>)} */
	      googleProtobuf.Message.getRepeatedField(this, 2)
	    );
	  };
	  /**
	   * repeated bytes address = 2;
	   * This is a type-conversion wrapper around `getAddressList()`
	   * @return {!Array.<string>}
	   */


	  proto.types.Input.prototype.getAddressList_asB64 = function () {
	    return (
	      /** @type {!Array.<string>} */
	      googleProtobuf.Message.bytesListAsB64(this.getAddressList())
	    );
	  };
	  /**
	   * repeated bytes address = 2;
	   * Note that Uint8Array is not supported on all browsers.
	   * @see http://caniuse.com/Uint8Array
	   * This is a type-conversion wrapper around `getAddressList()`
	   * @return {!Array.<!Uint8Array>}
	   */


	  proto.types.Input.prototype.getAddressList_asU8 = function () {
	    return (
	      /** @type {!Array.<!Uint8Array>} */
	      googleProtobuf.Message.bytesListAsU8(this.getAddressList())
	    );
	  };
	  /** @param {!(Array<!Uint8Array>|Array<string>)} value */


	  proto.types.Input.prototype.setAddressList = function (value) {
	    googleProtobuf.Message.setField(this, 2, value || []);
	  };
	  /**
	   * @param {!(string|Uint8Array)} value
	   * @param {number=} opt_index
	   */


	  proto.types.Input.prototype.addAddress = function (value, opt_index) {
	    googleProtobuf.Message.addToRepeatedField(this, 2, value, opt_index);
	  };

	  proto.types.Input.prototype.clearAddressList = function () {
	    this.setAddressList([]);
	  };
	  /**
	   * optional bytes value = 3;
	   * @return {!(string|Uint8Array)}
	   */


	  proto.types.Input.prototype.getValue = function () {
	    return (
	      /** @type {!(string|Uint8Array)} */
	      googleProtobuf.Message.getFieldWithDefault(this, 3, "")
	    );
	  };
	  /**
	   * optional bytes value = 3;
	   * This is a type-conversion wrapper around `getValue()`
	   * @return {string}
	   */


	  proto.types.Input.prototype.getValue_asB64 = function () {
	    return (
	      /** @type {string} */
	      googleProtobuf.Message.bytesAsB64(this.getValue())
	    );
	  };
	  /**
	   * optional bytes value = 3;
	   * Note that Uint8Array is not supported on all browsers.
	   * @see http://caniuse.com/Uint8Array
	   * This is a type-conversion wrapper around `getValue()`
	   * @return {!Uint8Array}
	   */


	  proto.types.Input.prototype.getValue_asU8 = function () {
	    return (
	      /** @type {!Uint8Array} */
	      googleProtobuf.Message.bytesAsU8(this.getValue())
	    );
	  };
	  /** @param {!(string|Uint8Array)} value */


	  proto.types.Input.prototype.setValue = function (value) {
	    googleProtobuf.Message.setField(this, 3, value);
	  };
	  /**
	   * optional bytes script = 4;
	   * @return {!(string|Uint8Array)}
	   */


	  proto.types.Input.prototype.getScript = function () {
	    return (
	      /** @type {!(string|Uint8Array)} */
	      googleProtobuf.Message.getFieldWithDefault(this, 4, "")
	    );
	  };
	  /**
	   * optional bytes script = 4;
	   * This is a type-conversion wrapper around `getScript()`
	   * @return {string}
	   */


	  proto.types.Input.prototype.getScript_asB64 = function () {
	    return (
	      /** @type {string} */
	      googleProtobuf.Message.bytesAsB64(this.getScript())
	    );
	  };
	  /**
	   * optional bytes script = 4;
	   * Note that Uint8Array is not supported on all browsers.
	   * @see http://caniuse.com/Uint8Array
	   * This is a type-conversion wrapper around `getScript()`
	   * @return {!Uint8Array}
	   */


	  proto.types.Input.prototype.getScript_asU8 = function () {
	    return (
	      /** @type {!Uint8Array} */
	      googleProtobuf.Message.bytesAsU8(this.getScript())
	    );
	  };
	  /** @param {!(string|Uint8Array)} value */


	  proto.types.Input.prototype.setScript = function (value) {
	    googleProtobuf.Message.setField(this, 4, value);
	  };
	  /**
	   * Generated by JsPbCodeGenerator.
	   * @param {Array=} opt_data Optional initial data array, typically from a
	   * server response, or constructed directly in Javascript. The array is used
	   * in place and becomes part of the constructed object. It is not cloned.
	   * If no data is provided, the constructed object will be empty, but still
	   * valid.
	   * @extends {jspb.Message}
	   * @constructor
	   */


	  proto.types.Output = function (opt_data) {
	    googleProtobuf.Message.initialize(this, opt_data, 0, -1, null, null);
	  };

	  goog.inherits(proto.types.Output, googleProtobuf.Message);

	  if (googleProtobuf.Message.GENERATE_TO_OBJECT) {
	    /**
	     * Creates an object representation of this proto suitable for use in Soy templates.
	     * Field names that are reserved in JavaScript and will be renamed to pb_name.
	     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	     * For the list of reserved names please see:
	     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
	     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
	     *     for transitional soy proto support: http://goto/soy-param-migration
	     * @return {!Object}
	     */
	    proto.types.Output.prototype.toObject = function (opt_includeInstance) {
	      return proto.types.Output.toObject(opt_includeInstance, this);
	    };
	    /**
	     * Static version of the {@see toObject} method.
	     * @param {boolean|undefined} includeInstance Whether to include the JSPB
	     *     instance for transitional soy proto support:
	     *     http://goto/soy-param-migration
	     * @param {!proto.types.Output} msg The msg instance to transform.
	     * @return {!Object}
	     * @suppress {unusedLocalVariables} f is only used for nested messages
	     */


	    proto.types.Output.toObject = function (includeInstance, msg) {
	      var obj = {
	        index: googleProtobuf.Message.getFieldWithDefault(msg, 1, 0),
	        address: msg.getAddress_asB64(),
	        value: msg.getValue_asB64(),
	        script: msg.getScript_asB64()
	      };

	      if (includeInstance) {
	        obj.$jspbMessageInstance = msg;
	      }

	      return obj;
	    };
	  }
	  /**
	   * Deserializes binary data (in protobuf wire format).
	   * @param {jspb.ByteSource} bytes The bytes to deserialize.
	   * @return {!proto.types.Output}
	   */


	  proto.types.Output.deserializeBinary = function (bytes) {
	    var reader = new googleProtobuf.BinaryReader(bytes);
	    var msg = new proto.types.Output();
	    return proto.types.Output.deserializeBinaryFromReader(msg, reader);
	  };
	  /**
	   * Deserializes binary data (in protobuf wire format) from the
	   * given reader into the given message object.
	   * @param {!proto.types.Output} msg The message object to deserialize into.
	   * @param {!jspb.BinaryReader} reader The BinaryReader to use.
	   * @return {!proto.types.Output}
	   */


	  proto.types.Output.deserializeBinaryFromReader = function (msg, reader) {
	    while (reader.nextField()) {
	      if (reader.isEndGroup()) {
	        break;
	      }

	      var field = reader.getFieldNumber();

	      switch (field) {
	        case 1:
	          var value =
	          /** @type {number} */
	          reader.readUint32();
	          msg.setIndex(value);
	          break;

	        case 2:
	          var value =
	          /** @type {!Uint8Array} */
	          reader.readBytes();
	          msg.setAddress(value);
	          break;

	        case 3:
	          var value =
	          /** @type {!Uint8Array} */
	          reader.readBytes();
	          msg.setValue(value);
	          break;

	        case 4:
	          var value =
	          /** @type {!Uint8Array} */
	          reader.readBytes();
	          msg.setScript(value);
	          break;

	        default:
	          reader.skipField();
	          break;
	      }
	    }

	    return msg;
	  };
	  /**
	   * Serializes the message to binary data (in protobuf wire format).
	   * @return {!Uint8Array}
	   */


	  proto.types.Output.prototype.serializeBinary = function () {
	    var writer = new googleProtobuf.BinaryWriter();
	    proto.types.Output.serializeBinaryToWriter(this, writer);
	    return writer.getResultBuffer();
	  };
	  /**
	   * Serializes the given message to binary data (in protobuf wire
	   * format), writing to the given BinaryWriter.
	   * @param {!proto.types.Output} message
	   * @param {!jspb.BinaryWriter} writer
	   * @suppress {unusedLocalVariables} f is only used for nested messages
	   */


	  proto.types.Output.serializeBinaryToWriter = function (message, writer) {
	    var f = undefined;
	    f = message.getIndex();

	    if (f !== 0) {
	      writer.writeUint32(1, f);
	    }

	    f = message.getAddress_asU8();

	    if (f.length > 0) {
	      writer.writeBytes(2, f);
	    }

	    f = message.getValue_asU8();

	    if (f.length > 0) {
	      writer.writeBytes(3, f);
	    }

	    f = message.getScript_asU8();

	    if (f.length > 0) {
	      writer.writeBytes(4, f);
	    }
	  };
	  /**
	   * optional uint32 index = 1;
	   * @return {number}
	   */


	  proto.types.Output.prototype.getIndex = function () {
	    return (
	      /** @type {number} */
	      googleProtobuf.Message.getFieldWithDefault(this, 1, 0)
	    );
	  };
	  /** @param {number} value */


	  proto.types.Output.prototype.setIndex = function (value) {
	    googleProtobuf.Message.setField(this, 1, value);
	  };
	  /**
	   * optional bytes address = 2;
	   * @return {!(string|Uint8Array)}
	   */


	  proto.types.Output.prototype.getAddress = function () {
	    return (
	      /** @type {!(string|Uint8Array)} */
	      googleProtobuf.Message.getFieldWithDefault(this, 2, "")
	    );
	  };
	  /**
	   * optional bytes address = 2;
	   * This is a type-conversion wrapper around `getAddress()`
	   * @return {string}
	   */


	  proto.types.Output.prototype.getAddress_asB64 = function () {
	    return (
	      /** @type {string} */
	      googleProtobuf.Message.bytesAsB64(this.getAddress())
	    );
	  };
	  /**
	   * optional bytes address = 2;
	   * Note that Uint8Array is not supported on all browsers.
	   * @see http://caniuse.com/Uint8Array
	   * This is a type-conversion wrapper around `getAddress()`
	   * @return {!Uint8Array}
	   */


	  proto.types.Output.prototype.getAddress_asU8 = function () {
	    return (
	      /** @type {!Uint8Array} */
	      googleProtobuf.Message.bytesAsU8(this.getAddress())
	    );
	  };
	  /** @param {!(string|Uint8Array)} value */


	  proto.types.Output.prototype.setAddress = function (value) {
	    googleProtobuf.Message.setField(this, 2, value);
	  };
	  /**
	   * optional bytes value = 3;
	   * @return {!(string|Uint8Array)}
	   */


	  proto.types.Output.prototype.getValue = function () {
	    return (
	      /** @type {!(string|Uint8Array)} */
	      googleProtobuf.Message.getFieldWithDefault(this, 3, "")
	    );
	  };
	  /**
	   * optional bytes value = 3;
	   * This is a type-conversion wrapper around `getValue()`
	   * @return {string}
	   */


	  proto.types.Output.prototype.getValue_asB64 = function () {
	    return (
	      /** @type {string} */
	      googleProtobuf.Message.bytesAsB64(this.getValue())
	    );
	  };
	  /**
	   * optional bytes value = 3;
	   * Note that Uint8Array is not supported on all browsers.
	   * @see http://caniuse.com/Uint8Array
	   * This is a type-conversion wrapper around `getValue()`
	   * @return {!Uint8Array}
	   */


	  proto.types.Output.prototype.getValue_asU8 = function () {
	    return (
	      /** @type {!Uint8Array} */
	      googleProtobuf.Message.bytesAsU8(this.getValue())
	    );
	  };
	  /** @param {!(string|Uint8Array)} value */


	  proto.types.Output.prototype.setValue = function (value) {
	    googleProtobuf.Message.setField(this, 3, value);
	  };
	  /**
	   * optional bytes script = 4;
	   * @return {!(string|Uint8Array)}
	   */


	  proto.types.Output.prototype.getScript = function () {
	    return (
	      /** @type {!(string|Uint8Array)} */
	      googleProtobuf.Message.getFieldWithDefault(this, 4, "")
	    );
	  };
	  /**
	   * optional bytes script = 4;
	   * This is a type-conversion wrapper around `getScript()`
	   * @return {string}
	   */


	  proto.types.Output.prototype.getScript_asB64 = function () {
	    return (
	      /** @type {string} */
	      googleProtobuf.Message.bytesAsB64(this.getScript())
	    );
	  };
	  /**
	   * optional bytes script = 4;
	   * Note that Uint8Array is not supported on all browsers.
	   * @see http://caniuse.com/Uint8Array
	   * This is a type-conversion wrapper around `getScript()`
	   * @return {!Uint8Array}
	   */


	  proto.types.Output.prototype.getScript_asU8 = function () {
	    return (
	      /** @type {!Uint8Array} */
	      googleProtobuf.Message.bytesAsU8(this.getScript())
	    );
	  };
	  /** @param {!(string|Uint8Array)} value */


	  proto.types.Output.prototype.setScript = function (value) {
	    googleProtobuf.Message.setField(this, 4, value);
	  };
	  /**
	   * Generated by JsPbCodeGenerator.
	   * @param {Array=} opt_data Optional initial data array, typically from a
	   * server response, or constructed directly in Javascript. The array is used
	   * in place and becomes part of the constructed object. It is not cloned.
	   * If no data is provided, the constructed object will be empty, but still
	   * valid.
	   * @extends {jspb.Message}
	   * @constructor
	   */


	  proto.types.Empty = function (opt_data) {
	    googleProtobuf.Message.initialize(this, opt_data, 0, -1, null, null);
	  };

	  goog.inherits(proto.types.Empty, googleProtobuf.Message);

	  if (googleProtobuf.Message.GENERATE_TO_OBJECT) {
	    /**
	     * Creates an object representation of this proto suitable for use in Soy templates.
	     * Field names that are reserved in JavaScript and will be renamed to pb_name.
	     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	     * For the list of reserved names please see:
	     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
	     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
	     *     for transitional soy proto support: http://goto/soy-param-migration
	     * @return {!Object}
	     */
	    proto.types.Empty.prototype.toObject = function (opt_includeInstance) {
	      return proto.types.Empty.toObject(opt_includeInstance, this);
	    };
	    /**
	     * Static version of the {@see toObject} method.
	     * @param {boolean|undefined} includeInstance Whether to include the JSPB
	     *     instance for transitional soy proto support:
	     *     http://goto/soy-param-migration
	     * @param {!proto.types.Empty} msg The msg instance to transform.
	     * @return {!Object}
	     * @suppress {unusedLocalVariables} f is only used for nested messages
	     */


	    proto.types.Empty.toObject = function (includeInstance, msg) {
	      var obj = {};

	      if (includeInstance) {
	        obj.$jspbMessageInstance = msg;
	      }

	      return obj;
	    };
	  }
	  /**
	   * Deserializes binary data (in protobuf wire format).
	   * @param {jspb.ByteSource} bytes The bytes to deserialize.
	   * @return {!proto.types.Empty}
	   */


	  proto.types.Empty.deserializeBinary = function (bytes) {
	    var reader = new googleProtobuf.BinaryReader(bytes);
	    var msg = new proto.types.Empty();
	    return proto.types.Empty.deserializeBinaryFromReader(msg, reader);
	  };
	  /**
	   * Deserializes binary data (in protobuf wire format) from the
	   * given reader into the given message object.
	   * @param {!proto.types.Empty} msg The message object to deserialize into.
	   * @param {!jspb.BinaryReader} reader The BinaryReader to use.
	   * @return {!proto.types.Empty}
	   */


	  proto.types.Empty.deserializeBinaryFromReader = function (msg, reader) {
	    while (reader.nextField()) {
	      if (reader.isEndGroup()) {
	        break;
	      }

	      var field = reader.getFieldNumber();

	      switch (field) {
	        default:
	          reader.skipField();
	          break;
	      }
	    }

	    return msg;
	  };
	  /**
	   * Serializes the message to binary data (in protobuf wire format).
	   * @return {!Uint8Array}
	   */


	  proto.types.Empty.prototype.serializeBinary = function () {
	    var writer = new googleProtobuf.BinaryWriter();
	    proto.types.Empty.serializeBinaryToWriter(this, writer);
	    return writer.getResultBuffer();
	  };
	  /**
	   * Serializes the given message to binary data (in protobuf wire
	   * format), writing to the given BinaryWriter.
	   * @param {!proto.types.Empty} message
	   * @param {!jspb.BinaryWriter} writer
	   * @suppress {unusedLocalVariables} f is only used for nested messages
	   */


	  proto.types.Empty.serializeBinaryToWriter = function (message, writer) {
	  };
	  /**
	   * Generated by JsPbCodeGenerator.
	   * @param {Array=} opt_data Optional initial data array, typically from a
	   * server response, or constructed directly in Javascript. The array is used
	   * in place and becomes part of the constructed object. It is not cloned.
	   * If no data is provided, the constructed object will be empty, but still
	   * valid.
	   * @extends {jspb.Message}
	   * @constructor
	   */


	  proto.types.SingleBytes = function (opt_data) {
	    googleProtobuf.Message.initialize(this, opt_data, 0, -1, null, null);
	  };

	  goog.inherits(proto.types.SingleBytes, googleProtobuf.Message);

	  if (googleProtobuf.Message.GENERATE_TO_OBJECT) {
	    /**
	     * Creates an object representation of this proto suitable for use in Soy templates.
	     * Field names that are reserved in JavaScript and will be renamed to pb_name.
	     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	     * For the list of reserved names please see:
	     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
	     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
	     *     for transitional soy proto support: http://goto/soy-param-migration
	     * @return {!Object}
	     */
	    proto.types.SingleBytes.prototype.toObject = function (opt_includeInstance) {
	      return proto.types.SingleBytes.toObject(opt_includeInstance, this);
	    };
	    /**
	     * Static version of the {@see toObject} method.
	     * @param {boolean|undefined} includeInstance Whether to include the JSPB
	     *     instance for transitional soy proto support:
	     *     http://goto/soy-param-migration
	     * @param {!proto.types.SingleBytes} msg The msg instance to transform.
	     * @return {!Object}
	     * @suppress {unusedLocalVariables} f is only used for nested messages
	     */


	    proto.types.SingleBytes.toObject = function (includeInstance, msg) {
	      var obj = {
	        value: msg.getValue_asB64()
	      };

	      if (includeInstance) {
	        obj.$jspbMessageInstance = msg;
	      }

	      return obj;
	    };
	  }
	  /**
	   * Deserializes binary data (in protobuf wire format).
	   * @param {jspb.ByteSource} bytes The bytes to deserialize.
	   * @return {!proto.types.SingleBytes}
	   */


	  proto.types.SingleBytes.deserializeBinary = function (bytes) {
	    var reader = new googleProtobuf.BinaryReader(bytes);
	    var msg = new proto.types.SingleBytes();
	    return proto.types.SingleBytes.deserializeBinaryFromReader(msg, reader);
	  };
	  /**
	   * Deserializes binary data (in protobuf wire format) from the
	   * given reader into the given message object.
	   * @param {!proto.types.SingleBytes} msg The message object to deserialize into.
	   * @param {!jspb.BinaryReader} reader The BinaryReader to use.
	   * @return {!proto.types.SingleBytes}
	   */


	  proto.types.SingleBytes.deserializeBinaryFromReader = function (msg, reader) {
	    while (reader.nextField()) {
	      if (reader.isEndGroup()) {
	        break;
	      }

	      var field = reader.getFieldNumber();

	      switch (field) {
	        case 1:
	          var value =
	          /** @type {!Uint8Array} */
	          reader.readBytes();
	          msg.setValue(value);
	          break;

	        default:
	          reader.skipField();
	          break;
	      }
	    }

	    return msg;
	  };
	  /**
	   * Serializes the message to binary data (in protobuf wire format).
	   * @return {!Uint8Array}
	   */


	  proto.types.SingleBytes.prototype.serializeBinary = function () {
	    var writer = new googleProtobuf.BinaryWriter();
	    proto.types.SingleBytes.serializeBinaryToWriter(this, writer);
	    return writer.getResultBuffer();
	  };
	  /**
	   * Serializes the given message to binary data (in protobuf wire
	   * format), writing to the given BinaryWriter.
	   * @param {!proto.types.SingleBytes} message
	   * @param {!jspb.BinaryWriter} writer
	   * @suppress {unusedLocalVariables} f is only used for nested messages
	   */


	  proto.types.SingleBytes.serializeBinaryToWriter = function (message, writer) {
	    var f = undefined;
	    f = message.getValue_asU8();

	    if (f.length > 0) {
	      writer.writeBytes(1, f);
	    }
	  };
	  /**
	   * optional bytes value = 1;
	   * @return {!(string|Uint8Array)}
	   */


	  proto.types.SingleBytes.prototype.getValue = function () {
	    return (
	      /** @type {!(string|Uint8Array)} */
	      googleProtobuf.Message.getFieldWithDefault(this, 1, "")
	    );
	  };
	  /**
	   * optional bytes value = 1;
	   * This is a type-conversion wrapper around `getValue()`
	   * @return {string}
	   */


	  proto.types.SingleBytes.prototype.getValue_asB64 = function () {
	    return (
	      /** @type {string} */
	      googleProtobuf.Message.bytesAsB64(this.getValue())
	    );
	  };
	  /**
	   * optional bytes value = 1;
	   * Note that Uint8Array is not supported on all browsers.
	   * @see http://caniuse.com/Uint8Array
	   * This is a type-conversion wrapper around `getValue()`
	   * @return {!Uint8Array}
	   */


	  proto.types.SingleBytes.prototype.getValue_asU8 = function () {
	    return (
	      /** @type {!Uint8Array} */
	      googleProtobuf.Message.bytesAsU8(this.getValue())
	    );
	  };
	  /** @param {!(string|Uint8Array)} value */


	  proto.types.SingleBytes.prototype.setValue = function (value) {
	    googleProtobuf.Message.setField(this, 1, value);
	  };
	  /**
	   * Generated by JsPbCodeGenerator.
	   * @param {Array=} opt_data Optional initial data array, typically from a
	   * server response, or constructed directly in Javascript. The array is used
	   * in place and becomes part of the constructed object. It is not cloned.
	   * If no data is provided, the constructed object will be empty, but still
	   * valid.
	   * @extends {jspb.Message}
	   * @constructor
	   */


	  proto.types.AccountAndRoot = function (opt_data) {
	    googleProtobuf.Message.initialize(this, opt_data, 0, -1, null, null);
	  };

	  goog.inherits(proto.types.AccountAndRoot, googleProtobuf.Message);

	  if (googleProtobuf.Message.GENERATE_TO_OBJECT) {
	    /**
	     * Creates an object representation of this proto suitable for use in Soy templates.
	     * Field names that are reserved in JavaScript and will be renamed to pb_name.
	     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	     * For the list of reserved names please see:
	     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
	     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
	     *     for transitional soy proto support: http://goto/soy-param-migration
	     * @return {!Object}
	     */
	    proto.types.AccountAndRoot.prototype.toObject = function (opt_includeInstance) {
	      return proto.types.AccountAndRoot.toObject(opt_includeInstance, this);
	    };
	    /**
	     * Static version of the {@see toObject} method.
	     * @param {boolean|undefined} includeInstance Whether to include the JSPB
	     *     instance for transitional soy proto support:
	     *     http://goto/soy-param-migration
	     * @param {!proto.types.AccountAndRoot} msg The msg instance to transform.
	     * @return {!Object}
	     * @suppress {unusedLocalVariables} f is only used for nested messages
	     */


	    proto.types.AccountAndRoot.toObject = function (includeInstance, msg) {
	      var obj = {
	        account: msg.getAccount_asB64(),
	        root: msg.getRoot_asB64(),
	        compressed: googleProtobuf.Message.getFieldWithDefault(msg, 3, false)
	      };

	      if (includeInstance) {
	        obj.$jspbMessageInstance = msg;
	      }

	      return obj;
	    };
	  }
	  /**
	   * Deserializes binary data (in protobuf wire format).
	   * @param {jspb.ByteSource} bytes The bytes to deserialize.
	   * @return {!proto.types.AccountAndRoot}
	   */


	  proto.types.AccountAndRoot.deserializeBinary = function (bytes) {
	    var reader = new googleProtobuf.BinaryReader(bytes);
	    var msg = new proto.types.AccountAndRoot();
	    return proto.types.AccountAndRoot.deserializeBinaryFromReader(msg, reader);
	  };
	  /**
	   * Deserializes binary data (in protobuf wire format) from the
	   * given reader into the given message object.
	   * @param {!proto.types.AccountAndRoot} msg The message object to deserialize into.
	   * @param {!jspb.BinaryReader} reader The BinaryReader to use.
	   * @return {!proto.types.AccountAndRoot}
	   */


	  proto.types.AccountAndRoot.deserializeBinaryFromReader = function (msg, reader) {
	    while (reader.nextField()) {
	      if (reader.isEndGroup()) {
	        break;
	      }

	      var field = reader.getFieldNumber();

	      switch (field) {
	        case 1:
	          var value =
	          /** @type {!Uint8Array} */
	          reader.readBytes();
	          msg.setAccount(value);
	          break;

	        case 2:
	          var value =
	          /** @type {!Uint8Array} */
	          reader.readBytes();
	          msg.setRoot(value);
	          break;

	        case 3:
	          var value =
	          /** @type {boolean} */
	          reader.readBool();
	          msg.setCompressed(value);
	          break;

	        default:
	          reader.skipField();
	          break;
	      }
	    }

	    return msg;
	  };
	  /**
	   * Serializes the message to binary data (in protobuf wire format).
	   * @return {!Uint8Array}
	   */


	  proto.types.AccountAndRoot.prototype.serializeBinary = function () {
	    var writer = new googleProtobuf.BinaryWriter();
	    proto.types.AccountAndRoot.serializeBinaryToWriter(this, writer);
	    return writer.getResultBuffer();
	  };
	  /**
	   * Serializes the given message to binary data (in protobuf wire
	   * format), writing to the given BinaryWriter.
	   * @param {!proto.types.AccountAndRoot} message
	   * @param {!jspb.BinaryWriter} writer
	   * @suppress {unusedLocalVariables} f is only used for nested messages
	   */


	  proto.types.AccountAndRoot.serializeBinaryToWriter = function (message, writer) {
	    var f = undefined;
	    f = message.getAccount_asU8();

	    if (f.length > 0) {
	      writer.writeBytes(1, f);
	    }

	    f = message.getRoot_asU8();

	    if (f.length > 0) {
	      writer.writeBytes(2, f);
	    }

	    f = message.getCompressed();

	    if (f) {
	      writer.writeBool(3, f);
	    }
	  };
	  /**
	   * optional bytes Account = 1;
	   * @return {!(string|Uint8Array)}
	   */


	  proto.types.AccountAndRoot.prototype.getAccount = function () {
	    return (
	      /** @type {!(string|Uint8Array)} */
	      googleProtobuf.Message.getFieldWithDefault(this, 1, "")
	    );
	  };
	  /**
	   * optional bytes Account = 1;
	   * This is a type-conversion wrapper around `getAccount()`
	   * @return {string}
	   */


	  proto.types.AccountAndRoot.prototype.getAccount_asB64 = function () {
	    return (
	      /** @type {string} */
	      googleProtobuf.Message.bytesAsB64(this.getAccount())
	    );
	  };
	  /**
	   * optional bytes Account = 1;
	   * Note that Uint8Array is not supported on all browsers.
	   * @see http://caniuse.com/Uint8Array
	   * This is a type-conversion wrapper around `getAccount()`
	   * @return {!Uint8Array}
	   */


	  proto.types.AccountAndRoot.prototype.getAccount_asU8 = function () {
	    return (
	      /** @type {!Uint8Array} */
	      googleProtobuf.Message.bytesAsU8(this.getAccount())
	    );
	  };
	  /** @param {!(string|Uint8Array)} value */


	  proto.types.AccountAndRoot.prototype.setAccount = function (value) {
	    googleProtobuf.Message.setField(this, 1, value);
	  };
	  /**
	   * optional bytes Root = 2;
	   * @return {!(string|Uint8Array)}
	   */


	  proto.types.AccountAndRoot.prototype.getRoot = function () {
	    return (
	      /** @type {!(string|Uint8Array)} */
	      googleProtobuf.Message.getFieldWithDefault(this, 2, "")
	    );
	  };
	  /**
	   * optional bytes Root = 2;
	   * This is a type-conversion wrapper around `getRoot()`
	   * @return {string}
	   */


	  proto.types.AccountAndRoot.prototype.getRoot_asB64 = function () {
	    return (
	      /** @type {string} */
	      googleProtobuf.Message.bytesAsB64(this.getRoot())
	    );
	  };
	  /**
	   * optional bytes Root = 2;
	   * Note that Uint8Array is not supported on all browsers.
	   * @see http://caniuse.com/Uint8Array
	   * This is a type-conversion wrapper around `getRoot()`
	   * @return {!Uint8Array}
	   */


	  proto.types.AccountAndRoot.prototype.getRoot_asU8 = function () {
	    return (
	      /** @type {!Uint8Array} */
	      googleProtobuf.Message.bytesAsU8(this.getRoot())
	    );
	  };
	  /** @param {!(string|Uint8Array)} value */


	  proto.types.AccountAndRoot.prototype.setRoot = function (value) {
	    googleProtobuf.Message.setField(this, 2, value);
	  };
	  /**
	   * optional bool Compressed = 3;
	   * Note that Boolean fields may be set to 0/1 when serialized from a Java server.
	   * You should avoid comparisons like {@code val === true/false} in those cases.
	   * @return {boolean}
	   */


	  proto.types.AccountAndRoot.prototype.getCompressed = function () {
	    return (
	      /** @type {boolean} */
	      googleProtobuf.Message.getFieldWithDefault(this, 3, false)
	    );
	  };
	  /** @param {boolean} value */


	  proto.types.AccountAndRoot.prototype.setCompressed = function (value) {
	    googleProtobuf.Message.setField(this, 3, value);
	  };
	  /**
	   * Generated by JsPbCodeGenerator.
	   * @param {Array=} opt_data Optional initial data array, typically from a
	   * server response, or constructed directly in Javascript. The array is used
	   * in place and becomes part of the constructed object. It is not cloned.
	   * If no data is provided, the constructed object will be empty, but still
	   * valid.
	   * @extends {jspb.Message}
	   * @constructor
	   */


	  proto.types.Peer = function (opt_data) {
	    googleProtobuf.Message.initialize(this, opt_data, 0, -1, null, null);
	  };

	  goog.inherits(proto.types.Peer, googleProtobuf.Message);

	  if (googleProtobuf.Message.GENERATE_TO_OBJECT) {
	    /**
	     * Creates an object representation of this proto suitable for use in Soy templates.
	     * Field names that are reserved in JavaScript and will be renamed to pb_name.
	     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	     * For the list of reserved names please see:
	     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
	     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
	     *     for transitional soy proto support: http://goto/soy-param-migration
	     * @return {!Object}
	     */
	    proto.types.Peer.prototype.toObject = function (opt_includeInstance) {
	      return proto.types.Peer.toObject(opt_includeInstance, this);
	    };
	    /**
	     * Static version of the {@see toObject} method.
	     * @param {boolean|undefined} includeInstance Whether to include the JSPB
	     *     instance for transitional soy proto support:
	     *     http://goto/soy-param-migration
	     * @param {!proto.types.Peer} msg The msg instance to transform.
	     * @return {!Object}
	     * @suppress {unusedLocalVariables} f is only used for nested messages
	     */


	    proto.types.Peer.toObject = function (includeInstance, msg) {
	      var f,
	          obj = {
	        address: (f = msg.getAddress()) && node_pb.PeerAddress.toObject(includeInstance, f),
	        bestblock: (f = msg.getBestblock()) && p2p_pb.NewBlockNotice.toObject(includeInstance, f),
	        state: googleProtobuf.Message.getFieldWithDefault(msg, 3, 0)
	      };

	      if (includeInstance) {
	        obj.$jspbMessageInstance = msg;
	      }

	      return obj;
	    };
	  }
	  /**
	   * Deserializes binary data (in protobuf wire format).
	   * @param {jspb.ByteSource} bytes The bytes to deserialize.
	   * @return {!proto.types.Peer}
	   */


	  proto.types.Peer.deserializeBinary = function (bytes) {
	    var reader = new googleProtobuf.BinaryReader(bytes);
	    var msg = new proto.types.Peer();
	    return proto.types.Peer.deserializeBinaryFromReader(msg, reader);
	  };
	  /**
	   * Deserializes binary data (in protobuf wire format) from the
	   * given reader into the given message object.
	   * @param {!proto.types.Peer} msg The message object to deserialize into.
	   * @param {!jspb.BinaryReader} reader The BinaryReader to use.
	   * @return {!proto.types.Peer}
	   */


	  proto.types.Peer.deserializeBinaryFromReader = function (msg, reader) {
	    while (reader.nextField()) {
	      if (reader.isEndGroup()) {
	        break;
	      }

	      var field = reader.getFieldNumber();

	      switch (field) {
	        case 1:
	          var value = new node_pb.PeerAddress();
	          reader.readMessage(value, node_pb.PeerAddress.deserializeBinaryFromReader);
	          msg.setAddress(value);
	          break;

	        case 2:
	          var value = new p2p_pb.NewBlockNotice();
	          reader.readMessage(value, p2p_pb.NewBlockNotice.deserializeBinaryFromReader);
	          msg.setBestblock(value);
	          break;

	        case 3:
	          var value =
	          /** @type {number} */
	          reader.readInt32();
	          msg.setState(value);
	          break;

	        default:
	          reader.skipField();
	          break;
	      }
	    }

	    return msg;
	  };
	  /**
	   * Serializes the message to binary data (in protobuf wire format).
	   * @return {!Uint8Array}
	   */


	  proto.types.Peer.prototype.serializeBinary = function () {
	    var writer = new googleProtobuf.BinaryWriter();
	    proto.types.Peer.serializeBinaryToWriter(this, writer);
	    return writer.getResultBuffer();
	  };
	  /**
	   * Serializes the given message to binary data (in protobuf wire
	   * format), writing to the given BinaryWriter.
	   * @param {!proto.types.Peer} message
	   * @param {!jspb.BinaryWriter} writer
	   * @suppress {unusedLocalVariables} f is only used for nested messages
	   */


	  proto.types.Peer.serializeBinaryToWriter = function (message, writer) {
	    var f = undefined;
	    f = message.getAddress();

	    if (f != null) {
	      writer.writeMessage(1, f, node_pb.PeerAddress.serializeBinaryToWriter);
	    }

	    f = message.getBestblock();

	    if (f != null) {
	      writer.writeMessage(2, f, p2p_pb.NewBlockNotice.serializeBinaryToWriter);
	    }

	    f = message.getState();

	    if (f !== 0) {
	      writer.writeInt32(3, f);
	    }
	  };
	  /**
	   * optional PeerAddress address = 1;
	   * @return {?proto.types.PeerAddress}
	   */


	  proto.types.Peer.prototype.getAddress = function () {
	    return (
	      /** @type{?proto.types.PeerAddress} */
	      googleProtobuf.Message.getWrapperField(this, node_pb.PeerAddress, 1)
	    );
	  };
	  /** @param {?proto.types.PeerAddress|undefined} value */


	  proto.types.Peer.prototype.setAddress = function (value) {
	    googleProtobuf.Message.setWrapperField(this, 1, value);
	  };

	  proto.types.Peer.prototype.clearAddress = function () {
	    this.setAddress(undefined);
	  };
	  /**
	   * Returns whether this field is set.
	   * @return {!boolean}
	   */


	  proto.types.Peer.prototype.hasAddress = function () {
	    return googleProtobuf.Message.getField(this, 1) != null;
	  };
	  /**
	   * optional NewBlockNotice bestblock = 2;
	   * @return {?proto.types.NewBlockNotice}
	   */


	  proto.types.Peer.prototype.getBestblock = function () {
	    return (
	      /** @type{?proto.types.NewBlockNotice} */
	      googleProtobuf.Message.getWrapperField(this, p2p_pb.NewBlockNotice, 2)
	    );
	  };
	  /** @param {?proto.types.NewBlockNotice|undefined} value */


	  proto.types.Peer.prototype.setBestblock = function (value) {
	    googleProtobuf.Message.setWrapperField(this, 2, value);
	  };

	  proto.types.Peer.prototype.clearBestblock = function () {
	    this.setBestblock(undefined);
	  };
	  /**
	   * Returns whether this field is set.
	   * @return {!boolean}
	   */


	  proto.types.Peer.prototype.hasBestblock = function () {
	    return googleProtobuf.Message.getField(this, 2) != null;
	  };
	  /**
	   * optional int32 state = 3;
	   * @return {number}
	   */


	  proto.types.Peer.prototype.getState = function () {
	    return (
	      /** @type {number} */
	      googleProtobuf.Message.getFieldWithDefault(this, 3, 0)
	    );
	  };
	  /** @param {number} value */


	  proto.types.Peer.prototype.setState = function (value) {
	    googleProtobuf.Message.setField(this, 3, value);
	  };
	  /**
	   * Generated by JsPbCodeGenerator.
	   * @param {Array=} opt_data Optional initial data array, typically from a
	   * server response, or constructed directly in Javascript. The array is used
	   * in place and becomes part of the constructed object. It is not cloned.
	   * If no data is provided, the constructed object will be empty, but still
	   * valid.
	   * @extends {jspb.Message}
	   * @constructor
	   */


	  proto.types.PeerList = function (opt_data) {
	    googleProtobuf.Message.initialize(this, opt_data, 0, -1, proto.types.PeerList.repeatedFields_, null);
	  };

	  goog.inherits(proto.types.PeerList, googleProtobuf.Message);
	  /**
	   * List of repeated fields within this message type.
	   * @private {!Array<number>}
	   * @const
	   */


	  proto.types.PeerList.repeatedFields_ = [1];

	  if (googleProtobuf.Message.GENERATE_TO_OBJECT) {
	    /**
	     * Creates an object representation of this proto suitable for use in Soy templates.
	     * Field names that are reserved in JavaScript and will be renamed to pb_name.
	     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	     * For the list of reserved names please see:
	     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
	     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
	     *     for transitional soy proto support: http://goto/soy-param-migration
	     * @return {!Object}
	     */
	    proto.types.PeerList.prototype.toObject = function (opt_includeInstance) {
	      return proto.types.PeerList.toObject(opt_includeInstance, this);
	    };
	    /**
	     * Static version of the {@see toObject} method.
	     * @param {boolean|undefined} includeInstance Whether to include the JSPB
	     *     instance for transitional soy proto support:
	     *     http://goto/soy-param-migration
	     * @param {!proto.types.PeerList} msg The msg instance to transform.
	     * @return {!Object}
	     * @suppress {unusedLocalVariables} f is only used for nested messages
	     */


	    proto.types.PeerList.toObject = function (includeInstance, msg) {
	      var obj = {
	        peersList: googleProtobuf.Message.toObjectList(msg.getPeersList(), proto.types.Peer.toObject, includeInstance)
	      };

	      if (includeInstance) {
	        obj.$jspbMessageInstance = msg;
	      }

	      return obj;
	    };
	  }
	  /**
	   * Deserializes binary data (in protobuf wire format).
	   * @param {jspb.ByteSource} bytes The bytes to deserialize.
	   * @return {!proto.types.PeerList}
	   */


	  proto.types.PeerList.deserializeBinary = function (bytes) {
	    var reader = new googleProtobuf.BinaryReader(bytes);
	    var msg = new proto.types.PeerList();
	    return proto.types.PeerList.deserializeBinaryFromReader(msg, reader);
	  };
	  /**
	   * Deserializes binary data (in protobuf wire format) from the
	   * given reader into the given message object.
	   * @param {!proto.types.PeerList} msg The message object to deserialize into.
	   * @param {!jspb.BinaryReader} reader The BinaryReader to use.
	   * @return {!proto.types.PeerList}
	   */


	  proto.types.PeerList.deserializeBinaryFromReader = function (msg, reader) {
	    while (reader.nextField()) {
	      if (reader.isEndGroup()) {
	        break;
	      }

	      var field = reader.getFieldNumber();

	      switch (field) {
	        case 1:
	          var value = new proto.types.Peer();
	          reader.readMessage(value, proto.types.Peer.deserializeBinaryFromReader);
	          msg.addPeers(value);
	          break;

	        default:
	          reader.skipField();
	          break;
	      }
	    }

	    return msg;
	  };
	  /**
	   * Serializes the message to binary data (in protobuf wire format).
	   * @return {!Uint8Array}
	   */


	  proto.types.PeerList.prototype.serializeBinary = function () {
	    var writer = new googleProtobuf.BinaryWriter();
	    proto.types.PeerList.serializeBinaryToWriter(this, writer);
	    return writer.getResultBuffer();
	  };
	  /**
	   * Serializes the given message to binary data (in protobuf wire
	   * format), writing to the given BinaryWriter.
	   * @param {!proto.types.PeerList} message
	   * @param {!jspb.BinaryWriter} writer
	   * @suppress {unusedLocalVariables} f is only used for nested messages
	   */


	  proto.types.PeerList.serializeBinaryToWriter = function (message, writer) {
	    var f = undefined;
	    f = message.getPeersList();

	    if (f.length > 0) {
	      writer.writeRepeatedMessage(1, f, proto.types.Peer.serializeBinaryToWriter);
	    }
	  };
	  /**
	   * repeated Peer peers = 1;
	   * @return {!Array.<!proto.types.Peer>}
	   */


	  proto.types.PeerList.prototype.getPeersList = function () {
	    return (
	      /** @type{!Array.<!proto.types.Peer>} */
	      googleProtobuf.Message.getRepeatedWrapperField(this, proto.types.Peer, 1)
	    );
	  };
	  /** @param {!Array.<!proto.types.Peer>} value */


	  proto.types.PeerList.prototype.setPeersList = function (value) {
	    googleProtobuf.Message.setRepeatedWrapperField(this, 1, value);
	  };
	  /**
	   * @param {!proto.types.Peer=} opt_value
	   * @param {number=} opt_index
	   * @return {!proto.types.Peer}
	   */


	  proto.types.PeerList.prototype.addPeers = function (opt_value, opt_index) {
	    return googleProtobuf.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.types.Peer, opt_index);
	  };

	  proto.types.PeerList.prototype.clearPeersList = function () {
	    this.setPeersList([]);
	  };
	  /**
	   * Generated by JsPbCodeGenerator.
	   * @param {Array=} opt_data Optional initial data array, typically from a
	   * server response, or constructed directly in Javascript. The array is used
	   * in place and becomes part of the constructed object. It is not cloned.
	   * If no data is provided, the constructed object will be empty, but still
	   * valid.
	   * @extends {jspb.Message}
	   * @constructor
	   */


	  proto.types.ListParams = function (opt_data) {
	    googleProtobuf.Message.initialize(this, opt_data, 0, -1, null, null);
	  };

	  goog.inherits(proto.types.ListParams, googleProtobuf.Message);

	  if (googleProtobuf.Message.GENERATE_TO_OBJECT) {
	    /**
	     * Creates an object representation of this proto suitable for use in Soy templates.
	     * Field names that are reserved in JavaScript and will be renamed to pb_name.
	     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	     * For the list of reserved names please see:
	     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
	     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
	     *     for transitional soy proto support: http://goto/soy-param-migration
	     * @return {!Object}
	     */
	    proto.types.ListParams.prototype.toObject = function (opt_includeInstance) {
	      return proto.types.ListParams.toObject(opt_includeInstance, this);
	    };
	    /**
	     * Static version of the {@see toObject} method.
	     * @param {boolean|undefined} includeInstance Whether to include the JSPB
	     *     instance for transitional soy proto support:
	     *     http://goto/soy-param-migration
	     * @param {!proto.types.ListParams} msg The msg instance to transform.
	     * @return {!Object}
	     * @suppress {unusedLocalVariables} f is only used for nested messages
	     */


	    proto.types.ListParams.toObject = function (includeInstance, msg) {
	      var obj = {
	        hash: msg.getHash_asB64(),
	        height: googleProtobuf.Message.getFieldWithDefault(msg, 2, 0),
	        size: googleProtobuf.Message.getFieldWithDefault(msg, 3, 0),
	        offset: googleProtobuf.Message.getFieldWithDefault(msg, 4, 0),
	        asc: googleProtobuf.Message.getFieldWithDefault(msg, 5, false)
	      };

	      if (includeInstance) {
	        obj.$jspbMessageInstance = msg;
	      }

	      return obj;
	    };
	  }
	  /**
	   * Deserializes binary data (in protobuf wire format).
	   * @param {jspb.ByteSource} bytes The bytes to deserialize.
	   * @return {!proto.types.ListParams}
	   */


	  proto.types.ListParams.deserializeBinary = function (bytes) {
	    var reader = new googleProtobuf.BinaryReader(bytes);
	    var msg = new proto.types.ListParams();
	    return proto.types.ListParams.deserializeBinaryFromReader(msg, reader);
	  };
	  /**
	   * Deserializes binary data (in protobuf wire format) from the
	   * given reader into the given message object.
	   * @param {!proto.types.ListParams} msg The message object to deserialize into.
	   * @param {!jspb.BinaryReader} reader The BinaryReader to use.
	   * @return {!proto.types.ListParams}
	   */


	  proto.types.ListParams.deserializeBinaryFromReader = function (msg, reader) {
	    while (reader.nextField()) {
	      if (reader.isEndGroup()) {
	        break;
	      }

	      var field = reader.getFieldNumber();

	      switch (field) {
	        case 1:
	          var value =
	          /** @type {!Uint8Array} */
	          reader.readBytes();
	          msg.setHash(value);
	          break;

	        case 2:
	          var value =
	          /** @type {number} */
	          reader.readUint64();
	          msg.setHeight(value);
	          break;

	        case 3:
	          var value =
	          /** @type {number} */
	          reader.readUint32();
	          msg.setSize(value);
	          break;

	        case 4:
	          var value =
	          /** @type {number} */
	          reader.readUint32();
	          msg.setOffset(value);
	          break;

	        case 5:
	          var value =
	          /** @type {boolean} */
	          reader.readBool();
	          msg.setAsc(value);
	          break;

	        default:
	          reader.skipField();
	          break;
	      }
	    }

	    return msg;
	  };
	  /**
	   * Serializes the message to binary data (in protobuf wire format).
	   * @return {!Uint8Array}
	   */


	  proto.types.ListParams.prototype.serializeBinary = function () {
	    var writer = new googleProtobuf.BinaryWriter();
	    proto.types.ListParams.serializeBinaryToWriter(this, writer);
	    return writer.getResultBuffer();
	  };
	  /**
	   * Serializes the given message to binary data (in protobuf wire
	   * format), writing to the given BinaryWriter.
	   * @param {!proto.types.ListParams} message
	   * @param {!jspb.BinaryWriter} writer
	   * @suppress {unusedLocalVariables} f is only used for nested messages
	   */


	  proto.types.ListParams.serializeBinaryToWriter = function (message, writer) {
	    var f = undefined;
	    f = message.getHash_asU8();

	    if (f.length > 0) {
	      writer.writeBytes(1, f);
	    }

	    f = message.getHeight();

	    if (f !== 0) {
	      writer.writeUint64(2, f);
	    }

	    f = message.getSize();

	    if (f !== 0) {
	      writer.writeUint32(3, f);
	    }

	    f = message.getOffset();

	    if (f !== 0) {
	      writer.writeUint32(4, f);
	    }

	    f = message.getAsc();

	    if (f) {
	      writer.writeBool(5, f);
	    }
	  };
	  /**
	   * optional bytes hash = 1;
	   * @return {!(string|Uint8Array)}
	   */


	  proto.types.ListParams.prototype.getHash = function () {
	    return (
	      /** @type {!(string|Uint8Array)} */
	      googleProtobuf.Message.getFieldWithDefault(this, 1, "")
	    );
	  };
	  /**
	   * optional bytes hash = 1;
	   * This is a type-conversion wrapper around `getHash()`
	   * @return {string}
	   */


	  proto.types.ListParams.prototype.getHash_asB64 = function () {
	    return (
	      /** @type {string} */
	      googleProtobuf.Message.bytesAsB64(this.getHash())
	    );
	  };
	  /**
	   * optional bytes hash = 1;
	   * Note that Uint8Array is not supported on all browsers.
	   * @see http://caniuse.com/Uint8Array
	   * This is a type-conversion wrapper around `getHash()`
	   * @return {!Uint8Array}
	   */


	  proto.types.ListParams.prototype.getHash_asU8 = function () {
	    return (
	      /** @type {!Uint8Array} */
	      googleProtobuf.Message.bytesAsU8(this.getHash())
	    );
	  };
	  /** @param {!(string|Uint8Array)} value */


	  proto.types.ListParams.prototype.setHash = function (value) {
	    googleProtobuf.Message.setField(this, 1, value);
	  };
	  /**
	   * optional uint64 height = 2;
	   * @return {number}
	   */


	  proto.types.ListParams.prototype.getHeight = function () {
	    return (
	      /** @type {number} */
	      googleProtobuf.Message.getFieldWithDefault(this, 2, 0)
	    );
	  };
	  /** @param {number} value */


	  proto.types.ListParams.prototype.setHeight = function (value) {
	    googleProtobuf.Message.setField(this, 2, value);
	  };
	  /**
	   * optional uint32 size = 3;
	   * @return {number}
	   */


	  proto.types.ListParams.prototype.getSize = function () {
	    return (
	      /** @type {number} */
	      googleProtobuf.Message.getFieldWithDefault(this, 3, 0)
	    );
	  };
	  /** @param {number} value */


	  proto.types.ListParams.prototype.setSize = function (value) {
	    googleProtobuf.Message.setField(this, 3, value);
	  };
	  /**
	   * optional uint32 offset = 4;
	   * @return {number}
	   */


	  proto.types.ListParams.prototype.getOffset = function () {
	    return (
	      /** @type {number} */
	      googleProtobuf.Message.getFieldWithDefault(this, 4, 0)
	    );
	  };
	  /** @param {number} value */


	  proto.types.ListParams.prototype.setOffset = function (value) {
	    googleProtobuf.Message.setField(this, 4, value);
	  };
	  /**
	   * optional bool asc = 5;
	   * Note that Boolean fields may be set to 0/1 when serialized from a Java server.
	   * You should avoid comparisons like {@code val === true/false} in those cases.
	   * @return {boolean}
	   */


	  proto.types.ListParams.prototype.getAsc = function () {
	    return (
	      /** @type {boolean} */
	      googleProtobuf.Message.getFieldWithDefault(this, 5, false)
	    );
	  };
	  /** @param {boolean} value */


	  proto.types.ListParams.prototype.setAsc = function (value) {
	    googleProtobuf.Message.setField(this, 5, value);
	  };
	  /**
	   * Generated by JsPbCodeGenerator.
	   * @param {Array=} opt_data Optional initial data array, typically from a
	   * server response, or constructed directly in Javascript. The array is used
	   * in place and becomes part of the constructed object. It is not cloned.
	   * If no data is provided, the constructed object will be empty, but still
	   * valid.
	   * @extends {jspb.Message}
	   * @constructor
	   */


	  proto.types.BlockHeaderList = function (opt_data) {
	    googleProtobuf.Message.initialize(this, opt_data, 0, -1, proto.types.BlockHeaderList.repeatedFields_, null);
	  };

	  goog.inherits(proto.types.BlockHeaderList, googleProtobuf.Message);
	  /**
	   * List of repeated fields within this message type.
	   * @private {!Array<number>}
	   * @const
	   */


	  proto.types.BlockHeaderList.repeatedFields_ = [1];

	  if (googleProtobuf.Message.GENERATE_TO_OBJECT) {
	    /**
	     * Creates an object representation of this proto suitable for use in Soy templates.
	     * Field names that are reserved in JavaScript and will be renamed to pb_name.
	     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	     * For the list of reserved names please see:
	     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
	     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
	     *     for transitional soy proto support: http://goto/soy-param-migration
	     * @return {!Object}
	     */
	    proto.types.BlockHeaderList.prototype.toObject = function (opt_includeInstance) {
	      return proto.types.BlockHeaderList.toObject(opt_includeInstance, this);
	    };
	    /**
	     * Static version of the {@see toObject} method.
	     * @param {boolean|undefined} includeInstance Whether to include the JSPB
	     *     instance for transitional soy proto support:
	     *     http://goto/soy-param-migration
	     * @param {!proto.types.BlockHeaderList} msg The msg instance to transform.
	     * @return {!Object}
	     * @suppress {unusedLocalVariables} f is only used for nested messages
	     */


	    proto.types.BlockHeaderList.toObject = function (includeInstance, msg) {
	      var obj = {
	        blocksList: googleProtobuf.Message.toObjectList(msg.getBlocksList(), blockchain_pb.Block.toObject, includeInstance)
	      };

	      if (includeInstance) {
	        obj.$jspbMessageInstance = msg;
	      }

	      return obj;
	    };
	  }
	  /**
	   * Deserializes binary data (in protobuf wire format).
	   * @param {jspb.ByteSource} bytes The bytes to deserialize.
	   * @return {!proto.types.BlockHeaderList}
	   */


	  proto.types.BlockHeaderList.deserializeBinary = function (bytes) {
	    var reader = new googleProtobuf.BinaryReader(bytes);
	    var msg = new proto.types.BlockHeaderList();
	    return proto.types.BlockHeaderList.deserializeBinaryFromReader(msg, reader);
	  };
	  /**
	   * Deserializes binary data (in protobuf wire format) from the
	   * given reader into the given message object.
	   * @param {!proto.types.BlockHeaderList} msg The message object to deserialize into.
	   * @param {!jspb.BinaryReader} reader The BinaryReader to use.
	   * @return {!proto.types.BlockHeaderList}
	   */


	  proto.types.BlockHeaderList.deserializeBinaryFromReader = function (msg, reader) {
	    while (reader.nextField()) {
	      if (reader.isEndGroup()) {
	        break;
	      }

	      var field = reader.getFieldNumber();

	      switch (field) {
	        case 1:
	          var value = new blockchain_pb.Block();
	          reader.readMessage(value, blockchain_pb.Block.deserializeBinaryFromReader);
	          msg.addBlocks(value);
	          break;

	        default:
	          reader.skipField();
	          break;
	      }
	    }

	    return msg;
	  };
	  /**
	   * Serializes the message to binary data (in protobuf wire format).
	   * @return {!Uint8Array}
	   */


	  proto.types.BlockHeaderList.prototype.serializeBinary = function () {
	    var writer = new googleProtobuf.BinaryWriter();
	    proto.types.BlockHeaderList.serializeBinaryToWriter(this, writer);
	    return writer.getResultBuffer();
	  };
	  /**
	   * Serializes the given message to binary data (in protobuf wire
	   * format), writing to the given BinaryWriter.
	   * @param {!proto.types.BlockHeaderList} message
	   * @param {!jspb.BinaryWriter} writer
	   * @suppress {unusedLocalVariables} f is only used for nested messages
	   */


	  proto.types.BlockHeaderList.serializeBinaryToWriter = function (message, writer) {
	    var f = undefined;
	    f = message.getBlocksList();

	    if (f.length > 0) {
	      writer.writeRepeatedMessage(1, f, blockchain_pb.Block.serializeBinaryToWriter);
	    }
	  };
	  /**
	   * repeated Block blocks = 1;
	   * @return {!Array.<!proto.types.Block>}
	   */


	  proto.types.BlockHeaderList.prototype.getBlocksList = function () {
	    return (
	      /** @type{!Array.<!proto.types.Block>} */
	      googleProtobuf.Message.getRepeatedWrapperField(this, blockchain_pb.Block, 1)
	    );
	  };
	  /** @param {!Array.<!proto.types.Block>} value */


	  proto.types.BlockHeaderList.prototype.setBlocksList = function (value) {
	    googleProtobuf.Message.setRepeatedWrapperField(this, 1, value);
	  };
	  /**
	   * @param {!proto.types.Block=} opt_value
	   * @param {number=} opt_index
	   * @return {!proto.types.Block}
	   */


	  proto.types.BlockHeaderList.prototype.addBlocks = function (opt_value, opt_index) {
	    return googleProtobuf.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.types.Block, opt_index);
	  };

	  proto.types.BlockHeaderList.prototype.clearBlocksList = function () {
	    this.setBlocksList([]);
	  };
	  /**
	   * Generated by JsPbCodeGenerator.
	   * @param {Array=} opt_data Optional initial data array, typically from a
	   * server response, or constructed directly in Javascript. The array is used
	   * in place and becomes part of the constructed object. It is not cloned.
	   * If no data is provided, the constructed object will be empty, but still
	   * valid.
	   * @extends {jspb.Message}
	   * @constructor
	   */


	  proto.types.CommitResult = function (opt_data) {
	    googleProtobuf.Message.initialize(this, opt_data, 0, -1, null, null);
	  };

	  goog.inherits(proto.types.CommitResult, googleProtobuf.Message);

	  if (googleProtobuf.Message.GENERATE_TO_OBJECT) {
	    /**
	     * Creates an object representation of this proto suitable for use in Soy templates.
	     * Field names that are reserved in JavaScript and will be renamed to pb_name.
	     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	     * For the list of reserved names please see:
	     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
	     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
	     *     for transitional soy proto support: http://goto/soy-param-migration
	     * @return {!Object}
	     */
	    proto.types.CommitResult.prototype.toObject = function (opt_includeInstance) {
	      return proto.types.CommitResult.toObject(opt_includeInstance, this);
	    };
	    /**
	     * Static version of the {@see toObject} method.
	     * @param {boolean|undefined} includeInstance Whether to include the JSPB
	     *     instance for transitional soy proto support:
	     *     http://goto/soy-param-migration
	     * @param {!proto.types.CommitResult} msg The msg instance to transform.
	     * @return {!Object}
	     * @suppress {unusedLocalVariables} f is only used for nested messages
	     */


	    proto.types.CommitResult.toObject = function (includeInstance, msg) {
	      var obj = {
	        hash: msg.getHash_asB64(),
	        error: googleProtobuf.Message.getFieldWithDefault(msg, 2, 0),
	        detail: googleProtobuf.Message.getFieldWithDefault(msg, 3, "")
	      };

	      if (includeInstance) {
	        obj.$jspbMessageInstance = msg;
	      }

	      return obj;
	    };
	  }
	  /**
	   * Deserializes binary data (in protobuf wire format).
	   * @param {jspb.ByteSource} bytes The bytes to deserialize.
	   * @return {!proto.types.CommitResult}
	   */


	  proto.types.CommitResult.deserializeBinary = function (bytes) {
	    var reader = new googleProtobuf.BinaryReader(bytes);
	    var msg = new proto.types.CommitResult();
	    return proto.types.CommitResult.deserializeBinaryFromReader(msg, reader);
	  };
	  /**
	   * Deserializes binary data (in protobuf wire format) from the
	   * given reader into the given message object.
	   * @param {!proto.types.CommitResult} msg The message object to deserialize into.
	   * @param {!jspb.BinaryReader} reader The BinaryReader to use.
	   * @return {!proto.types.CommitResult}
	   */


	  proto.types.CommitResult.deserializeBinaryFromReader = function (msg, reader) {
	    while (reader.nextField()) {
	      if (reader.isEndGroup()) {
	        break;
	      }

	      var field = reader.getFieldNumber();

	      switch (field) {
	        case 1:
	          var value =
	          /** @type {!Uint8Array} */
	          reader.readBytes();
	          msg.setHash(value);
	          break;

	        case 2:
	          var value =
	          /** @type {!proto.types.CommitStatus} */
	          reader.readEnum();
	          msg.setError(value);
	          break;

	        case 3:
	          var value =
	          /** @type {string} */
	          reader.readString();
	          msg.setDetail(value);
	          break;

	        default:
	          reader.skipField();
	          break;
	      }
	    }

	    return msg;
	  };
	  /**
	   * Serializes the message to binary data (in protobuf wire format).
	   * @return {!Uint8Array}
	   */


	  proto.types.CommitResult.prototype.serializeBinary = function () {
	    var writer = new googleProtobuf.BinaryWriter();
	    proto.types.CommitResult.serializeBinaryToWriter(this, writer);
	    return writer.getResultBuffer();
	  };
	  /**
	   * Serializes the given message to binary data (in protobuf wire
	   * format), writing to the given BinaryWriter.
	   * @param {!proto.types.CommitResult} message
	   * @param {!jspb.BinaryWriter} writer
	   * @suppress {unusedLocalVariables} f is only used for nested messages
	   */


	  proto.types.CommitResult.serializeBinaryToWriter = function (message, writer) {
	    var f = undefined;
	    f = message.getHash_asU8();

	    if (f.length > 0) {
	      writer.writeBytes(1, f);
	    }

	    f = message.getError();

	    if (f !== 0.0) {
	      writer.writeEnum(2, f);
	    }

	    f = message.getDetail();

	    if (f.length > 0) {
	      writer.writeString(3, f);
	    }
	  };
	  /**
	   * optional bytes hash = 1;
	   * @return {!(string|Uint8Array)}
	   */


	  proto.types.CommitResult.prototype.getHash = function () {
	    return (
	      /** @type {!(string|Uint8Array)} */
	      googleProtobuf.Message.getFieldWithDefault(this, 1, "")
	    );
	  };
	  /**
	   * optional bytes hash = 1;
	   * This is a type-conversion wrapper around `getHash()`
	   * @return {string}
	   */


	  proto.types.CommitResult.prototype.getHash_asB64 = function () {
	    return (
	      /** @type {string} */
	      googleProtobuf.Message.bytesAsB64(this.getHash())
	    );
	  };
	  /**
	   * optional bytes hash = 1;
	   * Note that Uint8Array is not supported on all browsers.
	   * @see http://caniuse.com/Uint8Array
	   * This is a type-conversion wrapper around `getHash()`
	   * @return {!Uint8Array}
	   */


	  proto.types.CommitResult.prototype.getHash_asU8 = function () {
	    return (
	      /** @type {!Uint8Array} */
	      googleProtobuf.Message.bytesAsU8(this.getHash())
	    );
	  };
	  /** @param {!(string|Uint8Array)} value */


	  proto.types.CommitResult.prototype.setHash = function (value) {
	    googleProtobuf.Message.setField(this, 1, value);
	  };
	  /**
	   * optional CommitStatus error = 2;
	   * @return {!proto.types.CommitStatus}
	   */


	  proto.types.CommitResult.prototype.getError = function () {
	    return (
	      /** @type {!proto.types.CommitStatus} */
	      googleProtobuf.Message.getFieldWithDefault(this, 2, 0)
	    );
	  };
	  /** @param {!proto.types.CommitStatus} value */


	  proto.types.CommitResult.prototype.setError = function (value) {
	    googleProtobuf.Message.setField(this, 2, value);
	  };
	  /**
	   * optional string detail = 3;
	   * @return {string}
	   */


	  proto.types.CommitResult.prototype.getDetail = function () {
	    return (
	      /** @type {string} */
	      googleProtobuf.Message.getFieldWithDefault(this, 3, "")
	    );
	  };
	  /** @param {string} value */


	  proto.types.CommitResult.prototype.setDetail = function (value) {
	    googleProtobuf.Message.setField(this, 3, value);
	  };
	  /**
	   * Generated by JsPbCodeGenerator.
	   * @param {Array=} opt_data Optional initial data array, typically from a
	   * server response, or constructed directly in Javascript. The array is used
	   * in place and becomes part of the constructed object. It is not cloned.
	   * If no data is provided, the constructed object will be empty, but still
	   * valid.
	   * @extends {jspb.Message}
	   * @constructor
	   */


	  proto.types.CommitResultList = function (opt_data) {
	    googleProtobuf.Message.initialize(this, opt_data, 0, -1, proto.types.CommitResultList.repeatedFields_, null);
	  };

	  goog.inherits(proto.types.CommitResultList, googleProtobuf.Message);
	  /**
	   * List of repeated fields within this message type.
	   * @private {!Array<number>}
	   * @const
	   */


	  proto.types.CommitResultList.repeatedFields_ = [1];

	  if (googleProtobuf.Message.GENERATE_TO_OBJECT) {
	    /**
	     * Creates an object representation of this proto suitable for use in Soy templates.
	     * Field names that are reserved in JavaScript and will be renamed to pb_name.
	     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	     * For the list of reserved names please see:
	     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
	     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
	     *     for transitional soy proto support: http://goto/soy-param-migration
	     * @return {!Object}
	     */
	    proto.types.CommitResultList.prototype.toObject = function (opt_includeInstance) {
	      return proto.types.CommitResultList.toObject(opt_includeInstance, this);
	    };
	    /**
	     * Static version of the {@see toObject} method.
	     * @param {boolean|undefined} includeInstance Whether to include the JSPB
	     *     instance for transitional soy proto support:
	     *     http://goto/soy-param-migration
	     * @param {!proto.types.CommitResultList} msg The msg instance to transform.
	     * @return {!Object}
	     * @suppress {unusedLocalVariables} f is only used for nested messages
	     */


	    proto.types.CommitResultList.toObject = function (includeInstance, msg) {
	      var obj = {
	        resultsList: googleProtobuf.Message.toObjectList(msg.getResultsList(), proto.types.CommitResult.toObject, includeInstance)
	      };

	      if (includeInstance) {
	        obj.$jspbMessageInstance = msg;
	      }

	      return obj;
	    };
	  }
	  /**
	   * Deserializes binary data (in protobuf wire format).
	   * @param {jspb.ByteSource} bytes The bytes to deserialize.
	   * @return {!proto.types.CommitResultList}
	   */


	  proto.types.CommitResultList.deserializeBinary = function (bytes) {
	    var reader = new googleProtobuf.BinaryReader(bytes);
	    var msg = new proto.types.CommitResultList();
	    return proto.types.CommitResultList.deserializeBinaryFromReader(msg, reader);
	  };
	  /**
	   * Deserializes binary data (in protobuf wire format) from the
	   * given reader into the given message object.
	   * @param {!proto.types.CommitResultList} msg The message object to deserialize into.
	   * @param {!jspb.BinaryReader} reader The BinaryReader to use.
	   * @return {!proto.types.CommitResultList}
	   */


	  proto.types.CommitResultList.deserializeBinaryFromReader = function (msg, reader) {
	    while (reader.nextField()) {
	      if (reader.isEndGroup()) {
	        break;
	      }

	      var field = reader.getFieldNumber();

	      switch (field) {
	        case 1:
	          var value = new proto.types.CommitResult();
	          reader.readMessage(value, proto.types.CommitResult.deserializeBinaryFromReader);
	          msg.addResults(value);
	          break;

	        default:
	          reader.skipField();
	          break;
	      }
	    }

	    return msg;
	  };
	  /**
	   * Serializes the message to binary data (in protobuf wire format).
	   * @return {!Uint8Array}
	   */


	  proto.types.CommitResultList.prototype.serializeBinary = function () {
	    var writer = new googleProtobuf.BinaryWriter();
	    proto.types.CommitResultList.serializeBinaryToWriter(this, writer);
	    return writer.getResultBuffer();
	  };
	  /**
	   * Serializes the given message to binary data (in protobuf wire
	   * format), writing to the given BinaryWriter.
	   * @param {!proto.types.CommitResultList} message
	   * @param {!jspb.BinaryWriter} writer
	   * @suppress {unusedLocalVariables} f is only used for nested messages
	   */


	  proto.types.CommitResultList.serializeBinaryToWriter = function (message, writer) {
	    var f = undefined;
	    f = message.getResultsList();

	    if (f.length > 0) {
	      writer.writeRepeatedMessage(1, f, proto.types.CommitResult.serializeBinaryToWriter);
	    }
	  };
	  /**
	   * repeated CommitResult results = 1;
	   * @return {!Array.<!proto.types.CommitResult>}
	   */


	  proto.types.CommitResultList.prototype.getResultsList = function () {
	    return (
	      /** @type{!Array.<!proto.types.CommitResult>} */
	      googleProtobuf.Message.getRepeatedWrapperField(this, proto.types.CommitResult, 1)
	    );
	  };
	  /** @param {!Array.<!proto.types.CommitResult>} value */


	  proto.types.CommitResultList.prototype.setResultsList = function (value) {
	    googleProtobuf.Message.setRepeatedWrapperField(this, 1, value);
	  };
	  /**
	   * @param {!proto.types.CommitResult=} opt_value
	   * @param {number=} opt_index
	   * @return {!proto.types.CommitResult}
	   */


	  proto.types.CommitResultList.prototype.addResults = function (opt_value, opt_index) {
	    return googleProtobuf.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.types.CommitResult, opt_index);
	  };

	  proto.types.CommitResultList.prototype.clearResultsList = function () {
	    this.setResultsList([]);
	  };
	  /**
	   * Generated by JsPbCodeGenerator.
	   * @param {Array=} opt_data Optional initial data array, typically from a
	   * server response, or constructed directly in Javascript. The array is used
	   * in place and becomes part of the constructed object. It is not cloned.
	   * If no data is provided, the constructed object will be empty, but still
	   * valid.
	   * @extends {jspb.Message}
	   * @constructor
	   */


	  proto.types.VerifyResult = function (opt_data) {
	    googleProtobuf.Message.initialize(this, opt_data, 0, -1, null, null);
	  };

	  goog.inherits(proto.types.VerifyResult, googleProtobuf.Message);

	  if (googleProtobuf.Message.GENERATE_TO_OBJECT) {
	    /**
	     * Creates an object representation of this proto suitable for use in Soy templates.
	     * Field names that are reserved in JavaScript and will be renamed to pb_name.
	     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	     * For the list of reserved names please see:
	     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
	     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
	     *     for transitional soy proto support: http://goto/soy-param-migration
	     * @return {!Object}
	     */
	    proto.types.VerifyResult.prototype.toObject = function (opt_includeInstance) {
	      return proto.types.VerifyResult.toObject(opt_includeInstance, this);
	    };
	    /**
	     * Static version of the {@see toObject} method.
	     * @param {boolean|undefined} includeInstance Whether to include the JSPB
	     *     instance for transitional soy proto support:
	     *     http://goto/soy-param-migration
	     * @param {!proto.types.VerifyResult} msg The msg instance to transform.
	     * @return {!Object}
	     * @suppress {unusedLocalVariables} f is only used for nested messages
	     */


	    proto.types.VerifyResult.toObject = function (includeInstance, msg) {
	      var f,
	          obj = {
	        tx: (f = msg.getTx()) && blockchain_pb.Tx.toObject(includeInstance, f),
	        error: googleProtobuf.Message.getFieldWithDefault(msg, 2, 0)
	      };

	      if (includeInstance) {
	        obj.$jspbMessageInstance = msg;
	      }

	      return obj;
	    };
	  }
	  /**
	   * Deserializes binary data (in protobuf wire format).
	   * @param {jspb.ByteSource} bytes The bytes to deserialize.
	   * @return {!proto.types.VerifyResult}
	   */


	  proto.types.VerifyResult.deserializeBinary = function (bytes) {
	    var reader = new googleProtobuf.BinaryReader(bytes);
	    var msg = new proto.types.VerifyResult();
	    return proto.types.VerifyResult.deserializeBinaryFromReader(msg, reader);
	  };
	  /**
	   * Deserializes binary data (in protobuf wire format) from the
	   * given reader into the given message object.
	   * @param {!proto.types.VerifyResult} msg The message object to deserialize into.
	   * @param {!jspb.BinaryReader} reader The BinaryReader to use.
	   * @return {!proto.types.VerifyResult}
	   */


	  proto.types.VerifyResult.deserializeBinaryFromReader = function (msg, reader) {
	    while (reader.nextField()) {
	      if (reader.isEndGroup()) {
	        break;
	      }

	      var field = reader.getFieldNumber();

	      switch (field) {
	        case 1:
	          var value = new blockchain_pb.Tx();
	          reader.readMessage(value, blockchain_pb.Tx.deserializeBinaryFromReader);
	          msg.setTx(value);
	          break;

	        case 2:
	          var value =
	          /** @type {!proto.types.VerifyStatus} */
	          reader.readEnum();
	          msg.setError(value);
	          break;

	        default:
	          reader.skipField();
	          break;
	      }
	    }

	    return msg;
	  };
	  /**
	   * Serializes the message to binary data (in protobuf wire format).
	   * @return {!Uint8Array}
	   */


	  proto.types.VerifyResult.prototype.serializeBinary = function () {
	    var writer = new googleProtobuf.BinaryWriter();
	    proto.types.VerifyResult.serializeBinaryToWriter(this, writer);
	    return writer.getResultBuffer();
	  };
	  /**
	   * Serializes the given message to binary data (in protobuf wire
	   * format), writing to the given BinaryWriter.
	   * @param {!proto.types.VerifyResult} message
	   * @param {!jspb.BinaryWriter} writer
	   * @suppress {unusedLocalVariables} f is only used for nested messages
	   */


	  proto.types.VerifyResult.serializeBinaryToWriter = function (message, writer) {
	    var f = undefined;
	    f = message.getTx();

	    if (f != null) {
	      writer.writeMessage(1, f, blockchain_pb.Tx.serializeBinaryToWriter);
	    }

	    f = message.getError();

	    if (f !== 0.0) {
	      writer.writeEnum(2, f);
	    }
	  };
	  /**
	   * optional Tx tx = 1;
	   * @return {?proto.types.Tx}
	   */


	  proto.types.VerifyResult.prototype.getTx = function () {
	    return (
	      /** @type{?proto.types.Tx} */
	      googleProtobuf.Message.getWrapperField(this, blockchain_pb.Tx, 1)
	    );
	  };
	  /** @param {?proto.types.Tx|undefined} value */


	  proto.types.VerifyResult.prototype.setTx = function (value) {
	    googleProtobuf.Message.setWrapperField(this, 1, value);
	  };

	  proto.types.VerifyResult.prototype.clearTx = function () {
	    this.setTx(undefined);
	  };
	  /**
	   * Returns whether this field is set.
	   * @return {!boolean}
	   */


	  proto.types.VerifyResult.prototype.hasTx = function () {
	    return googleProtobuf.Message.getField(this, 1) != null;
	  };
	  /**
	   * optional VerifyStatus error = 2;
	   * @return {!proto.types.VerifyStatus}
	   */


	  proto.types.VerifyResult.prototype.getError = function () {
	    return (
	      /** @type {!proto.types.VerifyStatus} */
	      googleProtobuf.Message.getFieldWithDefault(this, 2, 0)
	    );
	  };
	  /** @param {!proto.types.VerifyStatus} value */


	  proto.types.VerifyResult.prototype.setError = function (value) {
	    googleProtobuf.Message.setField(this, 2, value);
	  };
	  /**
	   * Generated by JsPbCodeGenerator.
	   * @param {Array=} opt_data Optional initial data array, typically from a
	   * server response, or constructed directly in Javascript. The array is used
	   * in place and becomes part of the constructed object. It is not cloned.
	   * If no data is provided, the constructed object will be empty, but still
	   * valid.
	   * @extends {jspb.Message}
	   * @constructor
	   */


	  proto.types.Personal = function (opt_data) {
	    googleProtobuf.Message.initialize(this, opt_data, 0, -1, null, null);
	  };

	  goog.inherits(proto.types.Personal, googleProtobuf.Message);

	  if (googleProtobuf.Message.GENERATE_TO_OBJECT) {
	    /**
	     * Creates an object representation of this proto suitable for use in Soy templates.
	     * Field names that are reserved in JavaScript and will be renamed to pb_name.
	     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	     * For the list of reserved names please see:
	     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
	     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
	     *     for transitional soy proto support: http://goto/soy-param-migration
	     * @return {!Object}
	     */
	    proto.types.Personal.prototype.toObject = function (opt_includeInstance) {
	      return proto.types.Personal.toObject(opt_includeInstance, this);
	    };
	    /**
	     * Static version of the {@see toObject} method.
	     * @param {boolean|undefined} includeInstance Whether to include the JSPB
	     *     instance for transitional soy proto support:
	     *     http://goto/soy-param-migration
	     * @param {!proto.types.Personal} msg The msg instance to transform.
	     * @return {!Object}
	     * @suppress {unusedLocalVariables} f is only used for nested messages
	     */


	    proto.types.Personal.toObject = function (includeInstance, msg) {
	      var f,
	          obj = {
	        passphrase: googleProtobuf.Message.getFieldWithDefault(msg, 1, ""),
	        account: (f = msg.getAccount()) && account_pb.Account.toObject(includeInstance, f)
	      };

	      if (includeInstance) {
	        obj.$jspbMessageInstance = msg;
	      }

	      return obj;
	    };
	  }
	  /**
	   * Deserializes binary data (in protobuf wire format).
	   * @param {jspb.ByteSource} bytes The bytes to deserialize.
	   * @return {!proto.types.Personal}
	   */


	  proto.types.Personal.deserializeBinary = function (bytes) {
	    var reader = new googleProtobuf.BinaryReader(bytes);
	    var msg = new proto.types.Personal();
	    return proto.types.Personal.deserializeBinaryFromReader(msg, reader);
	  };
	  /**
	   * Deserializes binary data (in protobuf wire format) from the
	   * given reader into the given message object.
	   * @param {!proto.types.Personal} msg The message object to deserialize into.
	   * @param {!jspb.BinaryReader} reader The BinaryReader to use.
	   * @return {!proto.types.Personal}
	   */


	  proto.types.Personal.deserializeBinaryFromReader = function (msg, reader) {
	    while (reader.nextField()) {
	      if (reader.isEndGroup()) {
	        break;
	      }

	      var field = reader.getFieldNumber();

	      switch (field) {
	        case 1:
	          var value =
	          /** @type {string} */
	          reader.readString();
	          msg.setPassphrase(value);
	          break;

	        case 2:
	          var value = new account_pb.Account();
	          reader.readMessage(value, account_pb.Account.deserializeBinaryFromReader);
	          msg.setAccount(value);
	          break;

	        default:
	          reader.skipField();
	          break;
	      }
	    }

	    return msg;
	  };
	  /**
	   * Serializes the message to binary data (in protobuf wire format).
	   * @return {!Uint8Array}
	   */


	  proto.types.Personal.prototype.serializeBinary = function () {
	    var writer = new googleProtobuf.BinaryWriter();
	    proto.types.Personal.serializeBinaryToWriter(this, writer);
	    return writer.getResultBuffer();
	  };
	  /**
	   * Serializes the given message to binary data (in protobuf wire
	   * format), writing to the given BinaryWriter.
	   * @param {!proto.types.Personal} message
	   * @param {!jspb.BinaryWriter} writer
	   * @suppress {unusedLocalVariables} f is only used for nested messages
	   */


	  proto.types.Personal.serializeBinaryToWriter = function (message, writer) {
	    var f = undefined;
	    f = message.getPassphrase();

	    if (f.length > 0) {
	      writer.writeString(1, f);
	    }

	    f = message.getAccount();

	    if (f != null) {
	      writer.writeMessage(2, f, account_pb.Account.serializeBinaryToWriter);
	    }
	  };
	  /**
	   * optional string passphrase = 1;
	   * @return {string}
	   */


	  proto.types.Personal.prototype.getPassphrase = function () {
	    return (
	      /** @type {string} */
	      googleProtobuf.Message.getFieldWithDefault(this, 1, "")
	    );
	  };
	  /** @param {string} value */


	  proto.types.Personal.prototype.setPassphrase = function (value) {
	    googleProtobuf.Message.setField(this, 1, value);
	  };
	  /**
	   * optional Account account = 2;
	   * @return {?proto.types.Account}
	   */


	  proto.types.Personal.prototype.getAccount = function () {
	    return (
	      /** @type{?proto.types.Account} */
	      googleProtobuf.Message.getWrapperField(this, account_pb.Account, 2)
	    );
	  };
	  /** @param {?proto.types.Account|undefined} value */


	  proto.types.Personal.prototype.setAccount = function (value) {
	    googleProtobuf.Message.setWrapperField(this, 2, value);
	  };

	  proto.types.Personal.prototype.clearAccount = function () {
	    this.setAccount(undefined);
	  };
	  /**
	   * Returns whether this field is set.
	   * @return {!boolean}
	   */


	  proto.types.Personal.prototype.hasAccount = function () {
	    return googleProtobuf.Message.getField(this, 2) != null;
	  };
	  /**
	   * Generated by JsPbCodeGenerator.
	   * @param {Array=} opt_data Optional initial data array, typically from a
	   * server response, or constructed directly in Javascript. The array is used
	   * in place and becomes part of the constructed object. It is not cloned.
	   * If no data is provided, the constructed object will be empty, but still
	   * valid.
	   * @extends {jspb.Message}
	   * @constructor
	   */


	  proto.types.ImportFormat = function (opt_data) {
	    googleProtobuf.Message.initialize(this, opt_data, 0, -1, null, null);
	  };

	  goog.inherits(proto.types.ImportFormat, googleProtobuf.Message);

	  if (googleProtobuf.Message.GENERATE_TO_OBJECT) {
	    /**
	     * Creates an object representation of this proto suitable for use in Soy templates.
	     * Field names that are reserved in JavaScript and will be renamed to pb_name.
	     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	     * For the list of reserved names please see:
	     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
	     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
	     *     for transitional soy proto support: http://goto/soy-param-migration
	     * @return {!Object}
	     */
	    proto.types.ImportFormat.prototype.toObject = function (opt_includeInstance) {
	      return proto.types.ImportFormat.toObject(opt_includeInstance, this);
	    };
	    /**
	     * Static version of the {@see toObject} method.
	     * @param {boolean|undefined} includeInstance Whether to include the JSPB
	     *     instance for transitional soy proto support:
	     *     http://goto/soy-param-migration
	     * @param {!proto.types.ImportFormat} msg The msg instance to transform.
	     * @return {!Object}
	     * @suppress {unusedLocalVariables} f is only used for nested messages
	     */


	    proto.types.ImportFormat.toObject = function (includeInstance, msg) {
	      var f,
	          obj = {
	        wif: (f = msg.getWif()) && proto.types.SingleBytes.toObject(includeInstance, f),
	        oldpass: googleProtobuf.Message.getFieldWithDefault(msg, 2, ""),
	        newpass: googleProtobuf.Message.getFieldWithDefault(msg, 3, "")
	      };

	      if (includeInstance) {
	        obj.$jspbMessageInstance = msg;
	      }

	      return obj;
	    };
	  }
	  /**
	   * Deserializes binary data (in protobuf wire format).
	   * @param {jspb.ByteSource} bytes The bytes to deserialize.
	   * @return {!proto.types.ImportFormat}
	   */


	  proto.types.ImportFormat.deserializeBinary = function (bytes) {
	    var reader = new googleProtobuf.BinaryReader(bytes);
	    var msg = new proto.types.ImportFormat();
	    return proto.types.ImportFormat.deserializeBinaryFromReader(msg, reader);
	  };
	  /**
	   * Deserializes binary data (in protobuf wire format) from the
	   * given reader into the given message object.
	   * @param {!proto.types.ImportFormat} msg The message object to deserialize into.
	   * @param {!jspb.BinaryReader} reader The BinaryReader to use.
	   * @return {!proto.types.ImportFormat}
	   */


	  proto.types.ImportFormat.deserializeBinaryFromReader = function (msg, reader) {
	    while (reader.nextField()) {
	      if (reader.isEndGroup()) {
	        break;
	      }

	      var field = reader.getFieldNumber();

	      switch (field) {
	        case 1:
	          var value = new proto.types.SingleBytes();
	          reader.readMessage(value, proto.types.SingleBytes.deserializeBinaryFromReader);
	          msg.setWif(value);
	          break;

	        case 2:
	          var value =
	          /** @type {string} */
	          reader.readString();
	          msg.setOldpass(value);
	          break;

	        case 3:
	          var value =
	          /** @type {string} */
	          reader.readString();
	          msg.setNewpass(value);
	          break;

	        default:
	          reader.skipField();
	          break;
	      }
	    }

	    return msg;
	  };
	  /**
	   * Serializes the message to binary data (in protobuf wire format).
	   * @return {!Uint8Array}
	   */


	  proto.types.ImportFormat.prototype.serializeBinary = function () {
	    var writer = new googleProtobuf.BinaryWriter();
	    proto.types.ImportFormat.serializeBinaryToWriter(this, writer);
	    return writer.getResultBuffer();
	  };
	  /**
	   * Serializes the given message to binary data (in protobuf wire
	   * format), writing to the given BinaryWriter.
	   * @param {!proto.types.ImportFormat} message
	   * @param {!jspb.BinaryWriter} writer
	   * @suppress {unusedLocalVariables} f is only used for nested messages
	   */


	  proto.types.ImportFormat.serializeBinaryToWriter = function (message, writer) {
	    var f = undefined;
	    f = message.getWif();

	    if (f != null) {
	      writer.writeMessage(1, f, proto.types.SingleBytes.serializeBinaryToWriter);
	    }

	    f = message.getOldpass();

	    if (f.length > 0) {
	      writer.writeString(2, f);
	    }

	    f = message.getNewpass();

	    if (f.length > 0) {
	      writer.writeString(3, f);
	    }
	  };
	  /**
	   * optional SingleBytes wif = 1;
	   * @return {?proto.types.SingleBytes}
	   */


	  proto.types.ImportFormat.prototype.getWif = function () {
	    return (
	      /** @type{?proto.types.SingleBytes} */
	      googleProtobuf.Message.getWrapperField(this, proto.types.SingleBytes, 1)
	    );
	  };
	  /** @param {?proto.types.SingleBytes|undefined} value */


	  proto.types.ImportFormat.prototype.setWif = function (value) {
	    googleProtobuf.Message.setWrapperField(this, 1, value);
	  };

	  proto.types.ImportFormat.prototype.clearWif = function () {
	    this.setWif(undefined);
	  };
	  /**
	   * Returns whether this field is set.
	   * @return {!boolean}
	   */


	  proto.types.ImportFormat.prototype.hasWif = function () {
	    return googleProtobuf.Message.getField(this, 1) != null;
	  };
	  /**
	   * optional string oldpass = 2;
	   * @return {string}
	   */


	  proto.types.ImportFormat.prototype.getOldpass = function () {
	    return (
	      /** @type {string} */
	      googleProtobuf.Message.getFieldWithDefault(this, 2, "")
	    );
	  };
	  /** @param {string} value */


	  proto.types.ImportFormat.prototype.setOldpass = function (value) {
	    googleProtobuf.Message.setField(this, 2, value);
	  };
	  /**
	   * optional string newpass = 3;
	   * @return {string}
	   */


	  proto.types.ImportFormat.prototype.getNewpass = function () {
	    return (
	      /** @type {string} */
	      googleProtobuf.Message.getFieldWithDefault(this, 3, "")
	    );
	  };
	  /** @param {string} value */


	  proto.types.ImportFormat.prototype.setNewpass = function (value) {
	    googleProtobuf.Message.setField(this, 3, value);
	  };
	  /**
	   * Generated by JsPbCodeGenerator.
	   * @param {Array=} opt_data Optional initial data array, typically from a
	   * server response, or constructed directly in Javascript. The array is used
	   * in place and becomes part of the constructed object. It is not cloned.
	   * If no data is provided, the constructed object will be empty, but still
	   * valid.
	   * @extends {jspb.Message}
	   * @constructor
	   */


	  proto.types.Staking = function (opt_data) {
	    googleProtobuf.Message.initialize(this, opt_data, 0, -1, null, null);
	  };

	  goog.inherits(proto.types.Staking, googleProtobuf.Message);

	  if (googleProtobuf.Message.GENERATE_TO_OBJECT) {
	    /**
	     * Creates an object representation of this proto suitable for use in Soy templates.
	     * Field names that are reserved in JavaScript and will be renamed to pb_name.
	     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	     * For the list of reserved names please see:
	     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
	     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
	     *     for transitional soy proto support: http://goto/soy-param-migration
	     * @return {!Object}
	     */
	    proto.types.Staking.prototype.toObject = function (opt_includeInstance) {
	      return proto.types.Staking.toObject(opt_includeInstance, this);
	    };
	    /**
	     * Static version of the {@see toObject} method.
	     * @param {boolean|undefined} includeInstance Whether to include the JSPB
	     *     instance for transitional soy proto support:
	     *     http://goto/soy-param-migration
	     * @param {!proto.types.Staking} msg The msg instance to transform.
	     * @return {!Object}
	     * @suppress {unusedLocalVariables} f is only used for nested messages
	     */


	    proto.types.Staking.toObject = function (includeInstance, msg) {
	      var obj = {
	        amount: googleProtobuf.Message.getFieldWithDefault(msg, 1, 0),
	        when: googleProtobuf.Message.getFieldWithDefault(msg, 2, 0)
	      };

	      if (includeInstance) {
	        obj.$jspbMessageInstance = msg;
	      }

	      return obj;
	    };
	  }
	  /**
	   * Deserializes binary data (in protobuf wire format).
	   * @param {jspb.ByteSource} bytes The bytes to deserialize.
	   * @return {!proto.types.Staking}
	   */


	  proto.types.Staking.deserializeBinary = function (bytes) {
	    var reader = new googleProtobuf.BinaryReader(bytes);
	    var msg = new proto.types.Staking();
	    return proto.types.Staking.deserializeBinaryFromReader(msg, reader);
	  };
	  /**
	   * Deserializes binary data (in protobuf wire format) from the
	   * given reader into the given message object.
	   * @param {!proto.types.Staking} msg The message object to deserialize into.
	   * @param {!jspb.BinaryReader} reader The BinaryReader to use.
	   * @return {!proto.types.Staking}
	   */


	  proto.types.Staking.deserializeBinaryFromReader = function (msg, reader) {
	    while (reader.nextField()) {
	      if (reader.isEndGroup()) {
	        break;
	      }

	      var field = reader.getFieldNumber();

	      switch (field) {
	        case 1:
	          var value =
	          /** @type {number} */
	          reader.readUint64();
	          msg.setAmount(value);
	          break;

	        case 2:
	          var value =
	          /** @type {number} */
	          reader.readUint64();
	          msg.setWhen(value);
	          break;

	        default:
	          reader.skipField();
	          break;
	      }
	    }

	    return msg;
	  };
	  /**
	   * Serializes the message to binary data (in protobuf wire format).
	   * @return {!Uint8Array}
	   */


	  proto.types.Staking.prototype.serializeBinary = function () {
	    var writer = new googleProtobuf.BinaryWriter();
	    proto.types.Staking.serializeBinaryToWriter(this, writer);
	    return writer.getResultBuffer();
	  };
	  /**
	   * Serializes the given message to binary data (in protobuf wire
	   * format), writing to the given BinaryWriter.
	   * @param {!proto.types.Staking} message
	   * @param {!jspb.BinaryWriter} writer
	   * @suppress {unusedLocalVariables} f is only used for nested messages
	   */


	  proto.types.Staking.serializeBinaryToWriter = function (message, writer) {
	    var f = undefined;
	    f = message.getAmount();

	    if (f !== 0) {
	      writer.writeUint64(1, f);
	    }

	    f = message.getWhen();

	    if (f !== 0) {
	      writer.writeUint64(2, f);
	    }
	  };
	  /**
	   * optional uint64 amount = 1;
	   * @return {number}
	   */


	  proto.types.Staking.prototype.getAmount = function () {
	    return (
	      /** @type {number} */
	      googleProtobuf.Message.getFieldWithDefault(this, 1, 0)
	    );
	  };
	  /** @param {number} value */


	  proto.types.Staking.prototype.setAmount = function (value) {
	    googleProtobuf.Message.setField(this, 1, value);
	  };
	  /**
	   * optional uint64 when = 2;
	   * @return {number}
	   */


	  proto.types.Staking.prototype.getWhen = function () {
	    return (
	      /** @type {number} */
	      googleProtobuf.Message.getFieldWithDefault(this, 2, 0)
	    );
	  };
	  /** @param {number} value */


	  proto.types.Staking.prototype.setWhen = function (value) {
	    googleProtobuf.Message.setField(this, 2, value);
	  };
	  /**
	   * Generated by JsPbCodeGenerator.
	   * @param {Array=} opt_data Optional initial data array, typically from a
	   * server response, or constructed directly in Javascript. The array is used
	   * in place and becomes part of the constructed object. It is not cloned.
	   * If no data is provided, the constructed object will be empty, but still
	   * valid.
	   * @extends {jspb.Message}
	   * @constructor
	   */


	  proto.types.Vote = function (opt_data) {
	    googleProtobuf.Message.initialize(this, opt_data, 0, -1, null, null);
	  };

	  goog.inherits(proto.types.Vote, googleProtobuf.Message);

	  if (googleProtobuf.Message.GENERATE_TO_OBJECT) {
	    /**
	     * Creates an object representation of this proto suitable for use in Soy templates.
	     * Field names that are reserved in JavaScript and will be renamed to pb_name.
	     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	     * For the list of reserved names please see:
	     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
	     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
	     *     for transitional soy proto support: http://goto/soy-param-migration
	     * @return {!Object}
	     */
	    proto.types.Vote.prototype.toObject = function (opt_includeInstance) {
	      return proto.types.Vote.toObject(opt_includeInstance, this);
	    };
	    /**
	     * Static version of the {@see toObject} method.
	     * @param {boolean|undefined} includeInstance Whether to include the JSPB
	     *     instance for transitional soy proto support:
	     *     http://goto/soy-param-migration
	     * @param {!proto.types.Vote} msg The msg instance to transform.
	     * @return {!Object}
	     * @suppress {unusedLocalVariables} f is only used for nested messages
	     */


	    proto.types.Vote.toObject = function (includeInstance, msg) {
	      var obj = {
	        candidate: msg.getCandidate_asB64(),
	        amount: googleProtobuf.Message.getFieldWithDefault(msg, 2, 0)
	      };

	      if (includeInstance) {
	        obj.$jspbMessageInstance = msg;
	      }

	      return obj;
	    };
	  }
	  /**
	   * Deserializes binary data (in protobuf wire format).
	   * @param {jspb.ByteSource} bytes The bytes to deserialize.
	   * @return {!proto.types.Vote}
	   */


	  proto.types.Vote.deserializeBinary = function (bytes) {
	    var reader = new googleProtobuf.BinaryReader(bytes);
	    var msg = new proto.types.Vote();
	    return proto.types.Vote.deserializeBinaryFromReader(msg, reader);
	  };
	  /**
	   * Deserializes binary data (in protobuf wire format) from the
	   * given reader into the given message object.
	   * @param {!proto.types.Vote} msg The message object to deserialize into.
	   * @param {!jspb.BinaryReader} reader The BinaryReader to use.
	   * @return {!proto.types.Vote}
	   */


	  proto.types.Vote.deserializeBinaryFromReader = function (msg, reader) {
	    while (reader.nextField()) {
	      if (reader.isEndGroup()) {
	        break;
	      }

	      var field = reader.getFieldNumber();

	      switch (field) {
	        case 1:
	          var value =
	          /** @type {!Uint8Array} */
	          reader.readBytes();
	          msg.setCandidate(value);
	          break;

	        case 2:
	          var value =
	          /** @type {number} */
	          reader.readUint64();
	          msg.setAmount(value);
	          break;

	        default:
	          reader.skipField();
	          break;
	      }
	    }

	    return msg;
	  };
	  /**
	   * Serializes the message to binary data (in protobuf wire format).
	   * @return {!Uint8Array}
	   */


	  proto.types.Vote.prototype.serializeBinary = function () {
	    var writer = new googleProtobuf.BinaryWriter();
	    proto.types.Vote.serializeBinaryToWriter(this, writer);
	    return writer.getResultBuffer();
	  };
	  /**
	   * Serializes the given message to binary data (in protobuf wire
	   * format), writing to the given BinaryWriter.
	   * @param {!proto.types.Vote} message
	   * @param {!jspb.BinaryWriter} writer
	   * @suppress {unusedLocalVariables} f is only used for nested messages
	   */


	  proto.types.Vote.serializeBinaryToWriter = function (message, writer) {
	    var f = undefined;
	    f = message.getCandidate_asU8();

	    if (f.length > 0) {
	      writer.writeBytes(1, f);
	    }

	    f = message.getAmount();

	    if (f !== 0) {
	      writer.writeUint64(2, f);
	    }
	  };
	  /**
	   * optional bytes candidate = 1;
	   * @return {!(string|Uint8Array)}
	   */


	  proto.types.Vote.prototype.getCandidate = function () {
	    return (
	      /** @type {!(string|Uint8Array)} */
	      googleProtobuf.Message.getFieldWithDefault(this, 1, "")
	    );
	  };
	  /**
	   * optional bytes candidate = 1;
	   * This is a type-conversion wrapper around `getCandidate()`
	   * @return {string}
	   */


	  proto.types.Vote.prototype.getCandidate_asB64 = function () {
	    return (
	      /** @type {string} */
	      googleProtobuf.Message.bytesAsB64(this.getCandidate())
	    );
	  };
	  /**
	   * optional bytes candidate = 1;
	   * Note that Uint8Array is not supported on all browsers.
	   * @see http://caniuse.com/Uint8Array
	   * This is a type-conversion wrapper around `getCandidate()`
	   * @return {!Uint8Array}
	   */


	  proto.types.Vote.prototype.getCandidate_asU8 = function () {
	    return (
	      /** @type {!Uint8Array} */
	      googleProtobuf.Message.bytesAsU8(this.getCandidate())
	    );
	  };
	  /** @param {!(string|Uint8Array)} value */


	  proto.types.Vote.prototype.setCandidate = function (value) {
	    googleProtobuf.Message.setField(this, 1, value);
	  };
	  /**
	   * optional uint64 amount = 2;
	   * @return {number}
	   */


	  proto.types.Vote.prototype.getAmount = function () {
	    return (
	      /** @type {number} */
	      googleProtobuf.Message.getFieldWithDefault(this, 2, 0)
	    );
	  };
	  /** @param {number} value */


	  proto.types.Vote.prototype.setAmount = function (value) {
	    googleProtobuf.Message.setField(this, 2, value);
	  };
	  /**
	   * Generated by JsPbCodeGenerator.
	   * @param {Array=} opt_data Optional initial data array, typically from a
	   * server response, or constructed directly in Javascript. The array is used
	   * in place and becomes part of the constructed object. It is not cloned.
	   * If no data is provided, the constructed object will be empty, but still
	   * valid.
	   * @extends {jspb.Message}
	   * @constructor
	   */


	  proto.types.VoteList = function (opt_data) {
	    googleProtobuf.Message.initialize(this, opt_data, 0, -1, proto.types.VoteList.repeatedFields_, null);
	  };

	  goog.inherits(proto.types.VoteList, googleProtobuf.Message);
	  /**
	   * List of repeated fields within this message type.
	   * @private {!Array<number>}
	   * @const
	   */


	  proto.types.VoteList.repeatedFields_ = [1];

	  if (googleProtobuf.Message.GENERATE_TO_OBJECT) {
	    /**
	     * Creates an object representation of this proto suitable for use in Soy templates.
	     * Field names that are reserved in JavaScript and will be renamed to pb_name.
	     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	     * For the list of reserved names please see:
	     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
	     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
	     *     for transitional soy proto support: http://goto/soy-param-migration
	     * @return {!Object}
	     */
	    proto.types.VoteList.prototype.toObject = function (opt_includeInstance) {
	      return proto.types.VoteList.toObject(opt_includeInstance, this);
	    };
	    /**
	     * Static version of the {@see toObject} method.
	     * @param {boolean|undefined} includeInstance Whether to include the JSPB
	     *     instance for transitional soy proto support:
	     *     http://goto/soy-param-migration
	     * @param {!proto.types.VoteList} msg The msg instance to transform.
	     * @return {!Object}
	     * @suppress {unusedLocalVariables} f is only used for nested messages
	     */


	    proto.types.VoteList.toObject = function (includeInstance, msg) {
	      var obj = {
	        votesList: googleProtobuf.Message.toObjectList(msg.getVotesList(), proto.types.Vote.toObject, includeInstance)
	      };

	      if (includeInstance) {
	        obj.$jspbMessageInstance = msg;
	      }

	      return obj;
	    };
	  }
	  /**
	   * Deserializes binary data (in protobuf wire format).
	   * @param {jspb.ByteSource} bytes The bytes to deserialize.
	   * @return {!proto.types.VoteList}
	   */


	  proto.types.VoteList.deserializeBinary = function (bytes) {
	    var reader = new googleProtobuf.BinaryReader(bytes);
	    var msg = new proto.types.VoteList();
	    return proto.types.VoteList.deserializeBinaryFromReader(msg, reader);
	  };
	  /**
	   * Deserializes binary data (in protobuf wire format) from the
	   * given reader into the given message object.
	   * @param {!proto.types.VoteList} msg The message object to deserialize into.
	   * @param {!jspb.BinaryReader} reader The BinaryReader to use.
	   * @return {!proto.types.VoteList}
	   */


	  proto.types.VoteList.deserializeBinaryFromReader = function (msg, reader) {
	    while (reader.nextField()) {
	      if (reader.isEndGroup()) {
	        break;
	      }

	      var field = reader.getFieldNumber();

	      switch (field) {
	        case 1:
	          var value = new proto.types.Vote();
	          reader.readMessage(value, proto.types.Vote.deserializeBinaryFromReader);
	          msg.addVotes(value);
	          break;

	        default:
	          reader.skipField();
	          break;
	      }
	    }

	    return msg;
	  };
	  /**
	   * Serializes the message to binary data (in protobuf wire format).
	   * @return {!Uint8Array}
	   */


	  proto.types.VoteList.prototype.serializeBinary = function () {
	    var writer = new googleProtobuf.BinaryWriter();
	    proto.types.VoteList.serializeBinaryToWriter(this, writer);
	    return writer.getResultBuffer();
	  };
	  /**
	   * Serializes the given message to binary data (in protobuf wire
	   * format), writing to the given BinaryWriter.
	   * @param {!proto.types.VoteList} message
	   * @param {!jspb.BinaryWriter} writer
	   * @suppress {unusedLocalVariables} f is only used for nested messages
	   */


	  proto.types.VoteList.serializeBinaryToWriter = function (message, writer) {
	    var f = undefined;
	    f = message.getVotesList();

	    if (f.length > 0) {
	      writer.writeRepeatedMessage(1, f, proto.types.Vote.serializeBinaryToWriter);
	    }
	  };
	  /**
	   * repeated Vote votes = 1;
	   * @return {!Array.<!proto.types.Vote>}
	   */


	  proto.types.VoteList.prototype.getVotesList = function () {
	    return (
	      /** @type{!Array.<!proto.types.Vote>} */
	      googleProtobuf.Message.getRepeatedWrapperField(this, proto.types.Vote, 1)
	    );
	  };
	  /** @param {!Array.<!proto.types.Vote>} value */


	  proto.types.VoteList.prototype.setVotesList = function (value) {
	    googleProtobuf.Message.setRepeatedWrapperField(this, 1, value);
	  };
	  /**
	   * @param {!proto.types.Vote=} opt_value
	   * @param {number=} opt_index
	   * @return {!proto.types.Vote}
	   */


	  proto.types.VoteList.prototype.addVotes = function (opt_value, opt_index) {
	    return googleProtobuf.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.types.Vote, opt_index);
	  };

	  proto.types.VoteList.prototype.clearVotesList = function () {
	    this.setVotesList([]);
	  };
	  /**
	   * @enum {number}
	   */


	  proto.types.CommitStatus = {
	    TX_OK: 0,
	    TX_NONCE_TOO_LOW: 1,
	    TX_ALREADY_EXISTS: 2,
	    TX_INVALID_HASH: 3,
	    TX_INVALID_SIGN: 4,
	    TX_INVALID_FORMAT: 5,
	    TX_INSUFFICIENT_BALANCE: 6,
	    TX_HAS_SAME_NONCE: 7,
	    TX_INTERNAL_ERROR: 9
	  };
	  /**
	   * @enum {number}
	   */

	  proto.types.VerifyStatus = {
	    VERIFY_STATUS_OK: 0,
	    VERIFY_STATUS_SIGN_NOT_MATCH: 1,
	    VERIFY_STATUS_INVALID_HASH: 2
	  };
	  goog.object.extend(exports, proto.types);
	});
	var rpc_pb_1 = rpc_pb.Empty;
	var rpc_pb_2 = rpc_pb.Personal;
	var rpc_pb_3 = rpc_pb.SingleBytes;
	var rpc_pb_4 = rpc_pb.TxList;
	var rpc_pb_5 = rpc_pb.TxBody;
	var rpc_pb_6 = rpc_pb.Tx;
	var rpc_pb_7 = rpc_pb.CommitStatus;
	var rpc_pb_8 = rpc_pb.ListParams;
	var rpc_pb_9 = rpc_pb.Query;

	var rpcTypes = /*#__PURE__*/Object.freeze({
		default: rpc_pb,
		__moduleExports: rpc_pb,
		Empty: rpc_pb_1,
		Personal: rpc_pb_2,
		SingleBytes: rpc_pb_3,
		TxList: rpc_pb_4,
		TxBody: rpc_pb_5,
		Tx: rpc_pb_6,
		CommitStatus: rpc_pb_7,
		ListParams: rpc_pb_8,
		Query: rpc_pb_9
	});

	var safeBuffer = createCommonjsModule(function (module, exports) {
	/* eslint-disable node/no-deprecated-api */

	var Buffer = bufferEs6.Buffer;

	// alternative to using Object.keys for old browsers
	function copyProps (src, dst) {
	  for (var key in src) {
	    dst[key] = src[key];
	  }
	}
	if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
	  module.exports = bufferEs6;
	} else {
	  // Copy properties from require('buffer')
	  copyProps(bufferEs6, exports);
	  exports.Buffer = SafeBuffer;
	}

	function SafeBuffer (arg, encodingOrOffset, length) {
	  return Buffer(arg, encodingOrOffset, length)
	}

	// Copy static methods from Buffer
	copyProps(Buffer, SafeBuffer);

	SafeBuffer.from = function (arg, encodingOrOffset, length) {
	  if (typeof arg === 'number') {
	    throw new TypeError('Argument must not be a number')
	  }
	  return Buffer(arg, encodingOrOffset, length)
	};

	SafeBuffer.alloc = function (size, fill, encoding) {
	  if (typeof size !== 'number') {
	    throw new TypeError('Argument must be a number')
	  }
	  var buf = Buffer(size);
	  if (fill !== undefined) {
	    if (typeof encoding === 'string') {
	      buf.fill(fill, encoding);
	    } else {
	      buf.fill(fill);
	    }
	  } else {
	    buf.fill(0);
	  }
	  return buf
	};

	SafeBuffer.allocUnsafe = function (size) {
	  if (typeof size !== 'number') {
	    throw new TypeError('Argument must be a number')
	  }
	  return Buffer(size)
	};

	SafeBuffer.allocUnsafeSlow = function (size) {
	  if (typeof size !== 'number') {
	    throw new TypeError('Argument must be a number')
	  }
	  return bufferEs6.SlowBuffer(size)
	};
	});
	var safeBuffer_1 = safeBuffer.Buffer;

	// base-x encoding
	// Forked from https://github.com/cryptocoinjs/bs58
	// Originally written by Mike Hearn for BitcoinJ
	// Copyright (c) 2011 Google Inc
	// Ported to JavaScript by Stefan Thomas
	// Merged Buffer refactorings from base58-native by Stephen Pair
	// Copyright (c) 2013 BitPay Inc

	var Buffer$2 = safeBuffer.Buffer;

	var baseX = function base (ALPHABET) {
	  var ALPHABET_MAP = {};
	  var BASE = ALPHABET.length;
	  var LEADER = ALPHABET.charAt(0);

	  // pre-compute lookup table
	  for (var z = 0; z < ALPHABET.length; z++) {
	    var x = ALPHABET.charAt(z);

	    if (ALPHABET_MAP[x] !== undefined) throw new TypeError(x + ' is ambiguous')
	    ALPHABET_MAP[x] = z;
	  }

	  function encode (source) {
	    if (source.length === 0) return ''

	    var digits = [0];
	    for (var i = 0; i < source.length; ++i) {
	      for (var j = 0, carry = source[i]; j < digits.length; ++j) {
	        carry += digits[j] << 8;
	        digits[j] = carry % BASE;
	        carry = (carry / BASE) | 0;
	      }

	      while (carry > 0) {
	        digits.push(carry % BASE);
	        carry = (carry / BASE) | 0;
	      }
	    }

	    var string = '';

	    // deal with leading zeros
	    for (var k = 0; source[k] === 0 && k < source.length - 1; ++k) string += LEADER;
	    // convert digits to a string
	    for (var q = digits.length - 1; q >= 0; --q) string += ALPHABET[digits[q]];

	    return string
	  }

	  function decodeUnsafe (string) {
	    if (typeof string !== 'string') throw new TypeError('Expected String')
	    if (string.length === 0) return Buffer$2.allocUnsafe(0)

	    var bytes = [0];
	    for (var i = 0; i < string.length; i++) {
	      var value = ALPHABET_MAP[string[i]];
	      if (value === undefined) return

	      for (var j = 0, carry = value; j < bytes.length; ++j) {
	        carry += bytes[j] * BASE;
	        bytes[j] = carry & 0xff;
	        carry >>= 8;
	      }

	      while (carry > 0) {
	        bytes.push(carry & 0xff);
	        carry >>= 8;
	      }
	    }

	    // deal with leading zeros
	    for (var k = 0; string[k] === LEADER && k < string.length - 1; ++k) {
	      bytes.push(0);
	    }

	    return Buffer$2.from(bytes.reverse())
	  }

	  function decode (string) {
	    var buffer = decodeUnsafe(string);
	    if (buffer) return buffer

	    throw new Error('Non-base' + BASE + ' character')
	  }

	  return {
	    encode: encode,
	    decodeUnsafe: decodeUnsafe,
	    decode: decode
	  }
	};

	var ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';

	var bs58 = baseX(ALPHABET);

	function encodeTxHash(bytes) {
	  return bs58.encode(bytes);
	}
	function decodeTxHash(bs58string) {
	  return bs58.decode(bs58string);
	}

	var ADDRESS_PREFIXES = {
	  ACCOUNT: 0x42,
	  CONTRACT: 0xC0
	};
	var UNITS = {
	  NATIVE_TOKEN: {
	    baseLabel: 'Aergo',
	    baseLabelShort: 'ARG',
	    baseDigits: 9,
	    subUnits: [{
	      e: 0,
	      label: 'aer'
	    }, {
	      e: 9,
	      label: 'ARG'
	    }]
	  }
	};
	var constants = {
	  ADDRESS_PREFIXES: ADDRESS_PREFIXES,
	  UNITS: UNITS
	};

	var empty = {};

	var empty$1 = /*#__PURE__*/Object.freeze({
		default: empty
	});

	var require$$0 = ( empty$1 && empty ) || empty$1;

	var createHash = require$$0.createHash;

	// base-x encoding
	// Forked from https://github.com/cryptocoinjs/bs58
	// Originally written by Mike Hearn for BitcoinJ
	// Copyright (c) 2011 Google Inc
	// Ported to JavaScript by Stefan Thomas
	// Merged Buffer refactorings from base58-native by Stephen Pair
	// Copyright (c) 2013 BitPay Inc

	var Buffer$3 = safeBuffer.Buffer;

	var baseX$1 = function base (ALPHABET) {
	  var ALPHABET_MAP = {};
	  var BASE = ALPHABET.length;
	  var LEADER = ALPHABET.charAt(0);

	  // pre-compute lookup table
	  for (var z = 0; z < ALPHABET.length; z++) {
	    var x = ALPHABET.charAt(z);

	    if (ALPHABET_MAP[x] !== undefined) throw new TypeError(x + ' is ambiguous')
	    ALPHABET_MAP[x] = z;
	  }

	  function encode (source) {
	    if (source.length === 0) return ''

	    var digits = [0];
	    for (var i = 0; i < source.length; ++i) {
	      for (var j = 0, carry = source[i]; j < digits.length; ++j) {
	        carry += digits[j] << 8;
	        digits[j] = carry % BASE;
	        carry = (carry / BASE) | 0;
	      }

	      while (carry > 0) {
	        digits.push(carry % BASE);
	        carry = (carry / BASE) | 0;
	      }
	    }

	    var string = '';

	    // deal with leading zeros
	    for (var k = 0; source[k] === 0 && k < source.length - 1; ++k) string += LEADER;
	    // convert digits to a string
	    for (var q = digits.length - 1; q >= 0; --q) string += ALPHABET[digits[q]];

	    return string
	  }

	  function decodeUnsafe (string) {
	    if (typeof string !== 'string') throw new TypeError('Expected String')
	    if (string.length === 0) return Buffer$3.allocUnsafe(0)

	    var bytes = [0];
	    for (var i = 0; i < string.length; i++) {
	      var value = ALPHABET_MAP[string[i]];
	      if (value === undefined) return

	      for (var j = 0, carry = value; j < bytes.length; ++j) {
	        carry += bytes[j] * BASE;
	        bytes[j] = carry & 0xff;
	        carry >>= 8;
	      }

	      while (carry > 0) {
	        bytes.push(carry & 0xff);
	        carry >>= 8;
	      }
	    }

	    // deal with leading zeros
	    for (var k = 0; string[k] === LEADER && k < string.length - 1; ++k) {
	      bytes.push(0);
	    }

	    return Buffer$3.from(bytes.reverse())
	  }

	  function decode (string) {
	    var buffer = decodeUnsafe(string);
	    if (buffer) return buffer

	    throw new Error('Non-base' + BASE + ' character')
	  }

	  return {
	    encode: encode,
	    decodeUnsafe: decodeUnsafe,
	    decode: decode
	  }
	};

	var ALPHABET$1 = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';

	var bs58$1 = baseX$1(ALPHABET$1);

	var Buffer$4 = safeBuffer.Buffer;

	var base = function (checksumFn) {
	  // Encode a buffer as a base58-check encoded string
	  function encode (payload) {
	    var checksum = checksumFn(payload);

	    return bs58$1.encode(Buffer$4.concat([
	      payload,
	      checksum
	    ], payload.length + 4))
	  }

	  function decodeRaw (buffer) {
	    var payload = buffer.slice(0, -4);
	    var checksum = buffer.slice(-4);
	    var newChecksum = checksumFn(payload);

	    if (checksum[0] ^ newChecksum[0] |
	        checksum[1] ^ newChecksum[1] |
	        checksum[2] ^ newChecksum[2] |
	        checksum[3] ^ newChecksum[3]) return

	    return payload
	  }

	  // Decode a base58-check encoded string to a buffer, no result if checksum is wrong
	  function decodeUnsafe (string) {
	    var buffer = bs58$1.decodeUnsafe(string);
	    if (!buffer) return

	    return decodeRaw(buffer)
	  }

	  function decode (string) {
	    var buffer = bs58$1.decode(string);
	    var payload = decodeRaw(buffer, checksumFn);
	    if (!payload) throw new Error('Invalid checksum')
	    return payload
	  }

	  return {
	    encode: encode,
	    decode: decode,
	    decodeUnsafe: decodeUnsafe
	  }
	};

	// SHA256(SHA256(buffer))
	function sha256x2 (buffer) {
	  var tmp = createHash('sha256').update(buffer).digest();
	  return createHash('sha256').update(tmp).digest()
	}

	var bs58check = base(sha256x2);

	/**
	 * A wrapper around addresses. Internally addresses are stored and sent as raw bytes,
	 * but client-side they are displayed as base58-check encoded strings.
	 * The encoding requires some computation, so you should only convert address objects to strings when needed.
	 */
	class Address {
	    constructor(address) {
	        if (address instanceof Address) {
	            // Copy buffer
	            this.value = Buffer.from(address.value);
	        }
	        else if (typeof address === 'string') {
	            // Decode string
	            this.value = Address.decode(address);
	            this.encoded = address;
	        }
	        else if (address instanceof Buffer) {
	            // Treat array-like as buffer
	            this.value = address;
	        }
	        else if (address instanceof Uint8Array) {
	            // Treat array-like as buffer
	            this.value = Buffer.from(address);
	        }
	        else {
	            throw new Error('Instantiate Address with raw bytes or string in base58-check encoding, not ' + address);
	        }
	    }
	    asBytes() {
	        return this.value;
	    }
	    toJSON() {
	        return this.toString();
	    }
	    toString() {
	        if (!this.encoded) {
	            this.encoded = Address.encode(this.value);
	        }
	        return this.encoded;
	    }
	    static decode(bs58string) {
	        return bs58check.decode(bs58string).slice(1);
	    }
	    static encode(byteArray) {
	        if (!byteArray || byteArray.length === 0)
	            return ''; // return empty string for null address
	        const buf = Buffer.from([ADDRESS_PREFIXES.ACCOUNT, ...byteArray]);
	        return bs58check.encode(buf);
	    }
	}

	class Tx$$1 {
	    constructor(data) {
	        Object.assign(this, data);
	    }
	    static fromGrpc(grpcObject) {
	        return new Tx$$1({
	            hash: encodeTxHash(grpcObject.getHash()),
	            nonce: grpcObject.getBody().getNonce(),
	            from: new Address(grpcObject.getBody().getAccount_asU8()),
	            to: new Address(grpcObject.getBody().getRecipient_asU8()),
	            amount: grpcObject.getBody().getAmount(),
	            payload: grpcObject.getBody().getPayload(),
	            sign: grpcObject.getBody().getSign_asB64(),
	            type: grpcObject.getBody().getType(),
	            limit: grpcObject.getBody().getLimit(),
	            price: grpcObject.getBody().getPrice()
	        });
	    }
	    toGrpc() {
	        const msgtxbody = new blockchain_pb_2();
	        msgtxbody.setNonce(this.nonce);
	        if (typeof this.from === 'undefined' || !this.from) {
	            throw new Error('Missing required transaction parameter \'from\'');
	        }
	        msgtxbody.setAccount((new Address(this.from)).asBytes());
	        if (typeof this.to !== 'undefined' && this.to !== null) {
	            msgtxbody.setRecipient((new Address(this.to)).asBytes());
	        }
	        msgtxbody.setAmount(this.amount);
	        if (this.payload != null) {
	            msgtxbody.setPayload(Buffer.from(this.payload));
	        }
	        if (typeof this.sign === 'string') {
	            msgtxbody.setSign(Buffer.from(this.sign, 'base64'));
	        }
	        else {
	            msgtxbody.setSign(this.sign);
	        }
	        msgtxbody.setType(this.type);
	        if (typeof this.limit !== 'undefined') {
	            msgtxbody.setLimit(this.limit);
	        }
	        if (typeof this.price !== 'undefined') {
	            msgtxbody.setPrice(this.price);
	        }
	        const msgtx = new blockchain_pb_3();
	        if (this.hash != null) {
	            let hash = this.hash;
	            let hashBuffer;
	            if (typeof hash === 'string') {
	                hashBuffer = Buffer.from(decodeTxHash(hash));
	            }
	            else {
	                hashBuffer = Buffer.from(hash);
	            }
	            msgtx.setHash(hashBuffer);
	        }
	        msgtx.setBody(msgtxbody);
	        return msgtx;
	    }
	}

	var getOwnPropertyDescriptors = function getOwnPropertyDescriptors(originalObject) {
	  return Object.getOwnPropertyNames(originalObject).reduce(function (descriptors, name) {
	    descriptors[name] = Object.getOwnPropertyDescriptor(originalObject, name);
	    return descriptors;
	  }, {});
	};

	var kCustomPromisifiedSymbol = Symbol('util.promisify.custom');
	function promisify(original, context) {
	  if (typeof context === 'undefined') {
	    context = this;
	  }

	  if (typeof original !== 'function') {
	    throw new Error('original', 'Function', original);
	  }

	  function fn() {
	    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return new Promise(function (resolve, reject) {
	      original.call.apply(original, [context].concat(args, [function (err, value) {
	        if (err) {
	          return reject(err);
	        }

	        resolve(value);
	      }]));
	    });
	  }

	  Object.setPrototypeOf(fn, Object.getPrototypeOf(original));
	  Object.defineProperty(fn, kCustomPromisifiedSymbol, {
	    value: fn,
	    enumerable: false,
	    writable: false,
	    configurable: true
	  });
	  return Object.defineProperties(fn, getOwnPropertyDescriptors(original));
	}

	/**
	 * Accounts controller. It is exposed at `aergoClient.accounts`.
	 */
	class Accounts {
	    constructor(aergo) {
	        this.client = aergo.client;
	    }
	    /**
	     * Create a new account in the node.
	     * @param {string} passphrase
	     * @returns {Promise<string>} newly created account address
	     */
	    create(passphrase) {
	        return new Promise((resolve, reject) => {
	            const personal = new rpc_pb_2();
	            personal.setPassphrase(passphrase);
	            try {
	                this.client.createAccount(personal, (err, rsp) => {
	                    if (err) {
	                        reject(err);
	                    }
	                    else {
	                        const createdAddress = rsp.getAddress_asU8();
	                        resolve(new Address(createdAddress));
	                    }
	                });
	            }
	            catch (exception) {
	                reject(exception);
	            }
	        });
	    }
	    /**
	     * Get list of accounts.
	     * @returns {Promise<string[]>} list of account addresses
	     */
	    get() {
	        return new Promise((resolve, reject) => {
	            const empty = new rpc_pb_1();
	            try {
	                this.client.getAccounts(empty, (err, rsp) => {
	                    if (err) {
	                        reject(err);
	                    }
	                    else {
	                        const accounts = rsp.getAccountsList();
	                        const addresses = accounts.map(account => new Address(account.getAddress_asU8()));
	                        resolve(addresses);
	                    }
	                });
	            }
	            catch (exception) {
	                reject(exception);
	            }
	        });
	    }
	    /**
	     * Unlock account.
	     * @param {string} address
	     * @param {string} passphrase
	     * @returns {Promise<string>} unlocked account address
	     */
	    unlock(address, passphrase) {
	        return new Promise((resolve, reject) => {
	            const account = new account_pb_1();
	            account.setAddress((new Address(address)).asBytes());
	            const personal = new rpc_pb_2();
	            personal.setPassphrase(passphrase);
	            personal.setAccount(account);
	            try {
	                this.client.unlockAccount(personal, (err, rsp) => {
	                    if (err) {
	                        reject(err);
	                    }
	                    else {
	                        const createdAddress = rsp.getAddress_asU8();
	                        resolve(new Address(createdAddress));
	                    }
	                });
	            }
	            catch (exception) {
	                reject(exception);
	            }
	        });
	    }
	    /**
	     * Lock account.
	     * @param {string} address
	     * @param {string} passphrase
	     * @returns {Promise<Address>} locked account address
	     */
	    lock(address, passphrase) {
	        return new Promise((resolve, reject) => {
	            const account = new account_pb_1();
	            account.setAddress((new Address(address)).asBytes());
	            const personal = new rpc_pb_2();
	            personal.setPassphrase(passphrase);
	            personal.setAccount(account);
	            try {
	                this.client.lockAccount(personal, (err, rsp) => {
	                    if (err) {
	                        reject(err);
	                    }
	                    else {
	                        const createdAddress = rsp.getAddress_asU8();
	                        resolve(new Address(createdAddress));
	                    }
	                });
	            }
	            catch (exception) {
	                reject(exception);
	            }
	        });
	    }
	    /**
	     * Convenience method to send transaction from account.
	     * This method automatically retrieves the nonce, signs the transaction, and sends it to the network.
	     * @param {Tx} tx transaction data
	     * @returns {Promise<string>} transaction hash
	     */
	    sendTransaction(tx) {
	        if (!(tx instanceof Tx$$1)) {
	            tx = new Tx$$1(tx);
	        }
	        return promisify(this.client.sendTX, this.client)(tx.toGrpc()).then(result => encodeTxHash(result.getHash()));
	    }
	    /**
	     * Sign transaction.
	     * @param {Tx} tx transaction data
	     * @returns {Promise<Tx>} transaction data including signature
	     */
	    signTransaction(_tx) {
	        let tx;
	        if (!(_tx instanceof Tx$$1)) {
	            tx = new Tx$$1(_tx);
	        }
	        else {
	            tx = _tx;
	        }
	        return promisify(this.client.signTX, this.client)(tx.toGrpc()).then(signedtx => Tx$$1.fromGrpc(signedtx));
	    }
	}

	var CommitStatus = rpcTypes.CommitStatus;

	var fromNumber = function fromNumber(d) {
	  var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 8;

	  if (d >= Math.pow(2, length * 8)) {
	    throw new Error('Number exeeds range');
	  }

	  var arr = new Uint8Array(length);

	  for (var i = 0, j = 1; i < 8; i++, j *= 0x100) {
	    arr[i] = d / j & 0xff;
	  }

	  return arr;
	};

	var toBytesUint32 = function toBytesUint32(num) {
	  var arr = new ArrayBuffer(8);
	  var view = new DataView(arr);
	  view.setUint32(0, num, true); // byteOffset = 0; litteEndian = true
	  // view.setBigUint64(0, num, true)

	  return arr;
	};

	var errorMessageForCode = function errorMessageForCode(code) {
	  var errorMessage = 'UNDEFINED_ERROR';

	  if (code && code < Object.values(CommitStatus).length) {
	    errorMessage = Object.keys(CommitStatus)[Object.values(CommitStatus).indexOf(code)];
	  }

	  return errorMessage;
	};

	var waitFor = function waitFor(ms) {
	  return new Promise(function (resolve) {
	    setTimeout(resolve, ms);
	  });
	};

	var basicCheck = function basicCheck(result) {
	  return result instanceof Error === false;
	};

	var longPolling =
	/*#__PURE__*/
	function () {
	  var _ref = _asyncToGenerator(
	  /*#__PURE__*/
	  regeneratorRuntime.mark(function _callee(func) {
	    var check,
	        timeout,
	        wait,
	        started,
	        lastError,
	        result,
	        timePassed,
	        _args = arguments;
	    return regeneratorRuntime.wrap(function _callee$(_context) {
	      while (1) {
	        switch (_context.prev = _context.next) {
	          case 0:
	            check = _args.length > 1 && _args[1] !== undefined ? _args[1] : basicCheck;
	            timeout = _args.length > 2 && _args[2] !== undefined ? _args[2] : 10000;
	            wait = _args.length > 3 && _args[3] !== undefined ? _args[3] : 250;
	            // keep calling func until it does not throw and also satifies check(result) or until timeout is reached
	            started = +new Date();
	            lastError = '';
	            _context.prev = 5;
	            _context.next = 8;
	            return func();

	          case 8:
	            result = _context.sent;

	            if (check(result)) {
	              _context.next = 11;
	              break;
	            }

	            throw new Error('Condition not satisfied');

	          case 11:
	            return _context.abrupt("return", result);

	          case 14:
	            _context.prev = 14;
	            _context.t0 = _context["catch"](5);
	            lastError = _context.t0;

	          case 17:
	            timePassed = new Date() - started;
	            timeout -= timePassed;

	            if (!(timeout < 0)) {
	              _context.next = 21;
	              break;
	            }

	            throw new Error('Long polling timed out. ' + lastError);

	          case 21:
	            _context.next = 23;
	            return waitFor(wait);

	          case 23:
	            _context.next = 25;
	            return longPolling(func, check, timeout - wait, wait);

	          case 25:
	            return _context.abrupt("return", _context.sent);

	          case 26:
	          case "end":
	            return _context.stop();
	        }
	      }
	    }, _callee, this, [[5, 14]]);
	  }));

	  return function longPolling(_x) {
	    return _ref.apply(this, arguments);
	  };
	}();

	class Block {
	    constructor(data) {
	        Object.assign(this, data);
	    }
	    static fromGrpc(grpcObject) {
	        const obj = grpcObject.toObject();
	        obj.hash = Block.encodeHash(grpcObject.getHash_asU8());
	        obj.header.prevblockhash = Block.encodeHash(grpcObject.getHeader().getPrevblockhash_asU8());
	        if (obj.body) {
	            obj.body.txsList = grpcObject.getBody().getTxsList().map(tx => Tx$$1.fromGrpc(tx));
	        }
	        return new Block(obj);
	    }
	    toGrpc() {
	        throw new Error('Not implemented');
	    }
	    static encodeHash(bytes) {
	        return bs58.encode(bytes);
	    }
	    static decodeHash(bs58string) {
	        return bs58.decode(bs58string);
	    }
	}

	var CommitStatus$1 = rpcTypes.CommitStatus;
	/**
	 * Main aergo client controller.
	 */

	var AergoClient =
	/*#__PURE__*/
	function () {
	  /**
	   * Create a new auto-configured client with:
	   * 
	   * .. code-block:: javascript
	   * 
	   *     import AergoClient from '@herajs/client';
	   *     const aergo = new AergoClient();
	   * 
	   * @param [object] configuration. Unused at the moment.
	   * @param [Provider] custom configured provider. By default a provider is configured automatically depending on the environment.
	   */
	  function AergoClient(config) {
	    var provider = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

	    _classCallCheck(this, AergoClient);

	    this.version = 0.1;
	    this.config = _objectSpread({}, config);
	    this.client = provider || this.defaultProvider();
	    this.accounts = new Accounts(this);
	  }

	  _createClass(AergoClient, [{
	    key: "defaultProvider",
	    value: function defaultProvider() {} // Platform-specific override, see ../platforms/**
	    // for auto-configuration of a provider.
	    // Can also manually pass provider to constructor.

	    /**
	     * Set a new provider
	     * @param {Provider} provider
	     */

	  }, {
	    key: "setProvider",
	    value: function setProvider(provider) {
	      this.client = provider;
	    }
	  }, {
	    key: "getConfig",
	    value: function getConfig() {
	      return this.config;
	    }
	  }, {
	    key: "isConnected",
	    value: function isConnected() {
	      return false;
	    }
	    /**
	     * Request current status of blockchain.
	     * @returns {Promise<object>} an object detailing the current status
	     */

	  }, {
	    key: "blockchain",
	    value: function blockchain() {
	      var empty = new rpc_pb_1();
	      return promisify(this.client.blockchain, this.client)(empty).then(function (result) {
	        return _objectSpread({}, result.toObject(), {
	          bestBlockHash: Block.encodeHash(result.getBestBlockHash_asU8())
	        });
	      });
	    }
	    /**
	     * Get transaction information in the aergo node. 
	     * If transaction is in the block return result with block hash and index.
	     * @param {string} txhash transaction hash
	     * @returns {Promise<object>} transaction details, object of tx: <Tx> and block: { hash, idx }
	     */

	  }, {
	    key: "getTransaction",
	    value: function getTransaction(txhash) {
	      var _this = this;

	      var singleBytes = new rpcTypes.SingleBytes();
	      singleBytes.setValue(Buffer$1.from(decodeTxHash(txhash)));
	      return new Promise(function (resolve, reject) {
	        _this.client.getBlockTX(singleBytes, function (err, result) {
	          if (err) {
	            _this.client.getTX(singleBytes, function (err, result) {
	              if (err) {
	                reject(err);
	              } else {
	                var res = {};
	                res.tx = Tx$$1.fromGrpc(result);
	                resolve(res);
	              }
	            });
	          } else {
	            var res = {};
	            res.block = {
	              hash: Block.encodeHash(result.getTxidx().getBlockhash_asU8()),
	              idx: result.getTxidx().getIdx()
	            };
	            res.tx = Tx$$1.fromGrpc(result.getTx());
	            resolve(res);
	          }
	        });
	      });
	    }
	    /**
	     * Retrieve information about a block.
	     * 
	     * @param {string|number} hashOrNumber either 32-byte block hash encoded as a bs58 string or block height as a number.
	     * @returns {Promise<Block>} block details
	     */

	  }, {
	    key: "getBlock",
	    value: function getBlock(hashOrNumber) {
	      if (typeof hashOrNumber === 'undefined') {
	        throw new Error('Missing argument block hash or number');
	      }

	      if (typeof hashOrNumber === 'string') {
	        hashOrNumber = Block.decodeHash(hashOrNumber);
	      } else if (typeof hashOrNumber === 'number') {
	        hashOrNumber = fromNumber(hashOrNumber);
	      }

	      if (hashOrNumber.length != 32 && hashOrNumber.length != 8) {
	        throw new Error('Invalid block hash. Must be 32 byte encoded in bs58. Did you mean to pass a block number?');
	      }

	      var singleBytes = new rpcTypes.SingleBytes();
	      singleBytes.setValue(Buffer$1.from(hashOrNumber));
	      return promisify(this.client.getBlock, this.client)(singleBytes).then(function (result) {
	        return Block.fromGrpc(result);
	      });
	    }
	    /**
	     * Retrieve the last n blocks, beginning from given block .
	     * 
	     * @param {string|number} hashOrNumber either 32-byte block hash encoded as a bs58 string or block height as a number.
	     * @param {number} size number of blocks to return
	     * @returns {Promise<Block[]>} list of block headers (blocks without body)
	     */

	  }, {
	    key: "getBlockHeaders",
	    value: function getBlockHeaders(hashOrNumber) {
	      var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
	      var offset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
	      var desc = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
	      var params = new rpcTypes.ListParams();

	      if (typeof hashOrNumber === 'string') {
	        hashOrNumber = Block.decodeHash(hashOrNumber);

	        if (hashOrNumber.length != 32) {
	          throw new Error('Invalid block hash. Must be 32 byte encoded in bs58. Did you mean to pass a block number?');
	        }

	        params.setHash(Buffer$1.from(hashOrNumber));
	      } else if (typeof hashOrNumber === 'number') {
	        params.setHeight(hashOrNumber);
	      } else {
	        throw new Error('Block hash or number required.');
	      }

	      params.setSize(size);
	      params.setOffset(offset);
	      params.setAsc(!desc);
	      return promisify(this.client.listBlockHeaders, this.client)(params).then(function (result) {
	        return result.getBlocksList().map(function (item) {
	          return Block.fromGrpc(item);
	        });
	      });
	    }
	  }, {
	    key: "getBlockStream",
	    value: function getBlockStream() {
	      var empty = new rpcTypes.Empty();
	      var stream = this.client.listBlockStream(empty);

	      try {
	        stream.on('error', function (error) {
	          if (error.code === 1) {
	            // grpc.status.CANCELLED
	            return;
	          }
	        });
	      } catch (e) {// ignore. 'error' does not work on grpc-web implementation
	      }

	      return {
	        _stream: stream,
	        on: function on(ev, callback) {
	          return stream.on(ev, function (data) {
	            return callback(Block.fromGrpc(data));
	          });
	        },
	        cancel: function cancel() {
	          return stream.cancel();
	        }
	      };
	    }
	    /**
	     * Retrieve account state, including current balance and nonce.
	     * @param {string} address Account address encoded in Base58check
	     * @returns {Promise<object>} account state
	     */

	  }, {
	    key: "getState",
	    value: function getState(address) {
	      var singleBytes = new rpcTypes.SingleBytes();
	      singleBytes.setValue(Buffer$1.from(new Address(address).asBytes()));
	      return promisify(this.client.getState, this.client)(singleBytes).then(function (state) {
	        return state.toObject();
	      });
	    }
	  }, {
	    key: "getNonce",
	    value: function getNonce(address) {
	      var singleBytes = new rpcTypes.SingleBytes();
	      singleBytes.setValue(Buffer$1.from(new Address(address).asBytes()));
	      return promisify(this.client.getState, this.client)(singleBytes).then(function (state) {
	        return state.getNonce();
	      });
	    }
	  }, {
	    key: "verifyTransaction",
	    value: function verifyTransaction()
	    /*tx*/
	    {
	      // Untested
	      return promisify(this.client.verifyTX, this.client)()(function (grpcObject) {
	        return Tx$$1.fromGrpc(grpcObject);
	      });
	    }
	    /**
	     * Send a signed transaction to the network.
	     * @param {Tx} tx signed transaction
	     * @returns {Promise<string>} transaction hash
	     */

	  }, {
	    key: "sendSignedTransaction",
	    value: function sendSignedTransaction(tx) {
	      var _this2 = this;

	      return new Promise(function (resolve, reject) {
	        var txs = new rpcTypes.TxList();

	        if (!(tx instanceof Tx$$1)) {
	          tx = new Tx$$1(tx);
	        }

	        txs.addTxs(tx.toGrpc(), 0);

	        _this2.client.commitTX(txs, function (err, result) {
	          if (err == null && result.getResultsList()[0].getError()) {
	            err = new Error();
	            err.code = result.getResultsList()[0].getError();
	            err.message = errorMessageForCode(err.code);
	          }

	          if (err) {
	            reject(err);
	          } else {
	            resolve(encodeTxHash(result.getResultsList()[0].getHash()));
	          }
	        });
	      });
	    }
	  }, {
	    key: "getVoteResult",
	    value: function getVoteResult(count) {
	      var singleBytes = new rpcTypes.SingleBytes();
	      singleBytes.setValue(new Uint8Array(toBytesUint32(count)));
	      return promisify(this.client.getVotes, this.client)(singleBytes).then(function (state) {
	        return state.getVotesList();
	      });
	    }
	    /**
	     * Retrieve the transaction receipt for a transaction
	     * @param {string} txhash transaction hash
	     * @return {Promise<object>} transaction receipt
	     */

	  }, {
	    key: "getTransactionReceipt",
	    value: function getTransactionReceipt(txhash) {
	      var singleBytes = new rpcTypes.SingleBytes();
	      singleBytes.setValue(Buffer$1.from(decodeTxHash(txhash)));
	      return promisify(this.client.getReceipt, this.client)(singleBytes).then(function (grpcObject) {
	        var obj = grpcObject.toObject();
	        return {
	          contractaddress: new Address(grpcObject.getContractaddress_asU8()),
	          result: obj.ret,
	          //JSON.parse(obj.ret),
	          status: obj.status
	        };
	      });
	    }
	    /**
	     * Query contract state
	     * @param {FunctionCall} functionCall call details
	     * @returns {Promise<object>} result of query
	     */

	  }, {
	    key: "queryContract",
	    value: function queryContract(functionCall) {
	      var query = new rpcTypes.Query();
	      query.setContractaddress(Buffer$1.from(new Address(functionCall.contractInstance.address).asBytes()));
	      query.setQueryinfo(Buffer$1.from(JSON.stringify(functionCall.asQueryInfo())));
	      return promisify(this.client.queryContract, this.client)(query).then(function (grpcObject) {
	        return JSON.parse(Buffer$1.from(grpcObject.getValue()).toString());
	      });
	    }
	    /**
	     * Query contract ABI
	     * @param {string} address of contract
	     * @returns {Promise<object>} abi
	     */

	  }, {
	    key: "getABI",
	    value: function getABI(address) {
	      var singleBytes = new rpcTypes.SingleBytes();
	      singleBytes.setValue(Buffer$1.from(new Address(address).asBytes()));
	      return promisify(this.client.getABI, this.client)(singleBytes).then(function (grpcObject) {
	        var obj = grpcObject.toObject();
	        return {
	          language: obj.language,
	          version: obj.version,
	          functions: obj.functionsList.map(function (item) {
	            return {
	              name: item.name,
	              arguments: item.argumentsList
	            };
	          })
	        };
	      });
	    }
	    /**
	     * Get list of peers of connected node
	     */

	  }, {
	    key: "getPeers",
	    value: function getPeers() {
	      var empty = new rpcTypes.Empty();
	      return promisify(this.client.getPeers, this.client)(empty).then(function (grpcObject) {
	        return grpcObject.toObject();
	      });
	    }
	  }]);

	  return AergoClient;
	}();

	var Provider = function Provider(config) {
	  _classCallCheck(this, Provider);

	  this.config = _objectSpread({}, this.defaultConfig, config); // Proxy that passes method calls to the provider's client object

	  return new Proxy(this, {
	    get: function get(obj, field) {
	      if (field in obj) return obj[field];
	      return obj.client[field];
	    }
	  });
	};

	// This function is written in JS (ES5) to avoid an issue with TypeScript targeting ES5, but requiring Symbol.iterator
	function iterateHeaders(headers, callback) {
	  var iterator = headers[Symbol.iterator]();
	  var entry = iterator.next();
	  while(!entry.done) {
	    callback(entry.value[0]);
	    entry = iterator.next();
	  }
	}

	function iterateHeadersKeys(headers, callback) {
	  var iterator = headers.keys();
	  var entry = iterator.next();
	  while(!entry.done) {
	    callback(entry.value);
	    entry = iterator.next();
	  }
	}

	var iterateHeaders_1 = {
	  iterateHeaders: iterateHeaders,
	  iterateHeadersKeys: iterateHeadersKeys
	};

	var util = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	function normalizeName(name) {
	    if (typeof name !== "string") {
	        name = String(name);
	    }
	    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
	        throw new TypeError("Invalid character in header field name");
	    }
	    return name.toLowerCase();
	}
	exports.normalizeName = normalizeName;
	function normalizeValue(value) {
	    if (typeof value !== "string") {
	        value = String(value);
	    }
	    return value;
	}
	exports.normalizeValue = normalizeValue;
	function getHeaderValues(headersAsNative, key) {
	    var headers = toWindowHeaders(headersAsNative);
	    if (headers instanceof Headers && headers.getAll) {
	        return headers.getAll(key);
	    }
	    var getValue = headers.get(key);
	    if (getValue && typeof getValue === "string") {
	        return [getValue];
	    }
	    return getValue;
	}
	exports.getHeaderValues = getHeaderValues;
	function toWindowHeaders(headersAsNative) {
	    return headersAsNative;
	}
	function getHeaderKeys(headersAsNative) {
	    var headers = toWindowHeaders(headersAsNative);
	    var asMap = {};
	    var keys = [];
	    if (headers.keys) {
	        iterateHeaders_1.iterateHeadersKeys(headers, function (key) {
	            if (!asMap[key]) {
	                asMap[key] = true;
	                keys.push(key);
	            }
	        });
	    }
	    else if (headers.forEach) {
	        headers.forEach(function (_, key) {
	            if (!asMap[key]) {
	                asMap[key] = true;
	                keys.push(key);
	            }
	        });
	    }
	    else {
	        iterateHeaders_1.iterateHeaders(headers, function (entry) {
	            var key = entry[0];
	            if (!asMap[key]) {
	                asMap[key] = true;
	                keys.push(key);
	            }
	        });
	    }
	    return keys;
	}
	exports.getHeaderKeys = getHeaderKeys;
	function splitHeaderValue(str) {
	    var values = [];
	    var commaSpaceValues = str.split(", ");
	    commaSpaceValues.forEach(function (commaSpaceValue) {
	        commaSpaceValue.split(",").forEach(function (commaValue) {
	            values.push(commaValue);
	        });
	    });
	    return values;
	}
	exports.splitHeaderValue = splitHeaderValue;

	});

	unwrapExports(util);
	var util_1 = util.normalizeName;
	var util_2 = util.normalizeValue;
	var util_3 = util.getHeaderValues;
	var util_4 = util.getHeaderKeys;
	var util_5 = util.splitHeaderValue;

	var BrowserHeaders_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	function isBrowserHeaders(arg) {
	    return typeof arg === "object" && typeof arg.headersMap === "object" && typeof arg.forEach === "function";
	}
	var BrowserHeaders = (function () {
	    function BrowserHeaders(init, options) {
	        if (init === void 0) { init = {}; }
	        if (options === void 0) { options = { splitValues: false }; }
	        var _this = this;
	        this.headersMap = {};
	        if (init) {
	            if (typeof Headers !== "undefined" && init instanceof Headers) {
	                var keys = util.getHeaderKeys(init);
	                keys.forEach(function (key) {
	                    var values = util.getHeaderValues(init, key);
	                    values.forEach(function (value) {
	                        if (options.splitValues) {
	                            _this.append(key, util.splitHeaderValue(value));
	                        }
	                        else {
	                            _this.append(key, value);
	                        }
	                    });
	                });
	            }
	            else if (isBrowserHeaders(init)) {
	                init.forEach(function (key, values) {
	                    _this.append(key, values);
	                });
	            }
	            else if (typeof Map !== "undefined" && init instanceof Map) {
	                var asMap = init;
	                asMap.forEach(function (value, key) {
	                    _this.append(key, value);
	                });
	            }
	            else if (typeof init === "string") {
	                this.appendFromString(init);
	            }
	            else if (typeof init === "object") {
	                Object.getOwnPropertyNames(init).forEach(function (key) {
	                    var asObject = init;
	                    var values = asObject[key];
	                    if (Array.isArray(values)) {
	                        values.forEach(function (value) {
	                            _this.append(key, value);
	                        });
	                    }
	                    else {
	                        _this.append(key, values);
	                    }
	                });
	            }
	        }
	    }
	    BrowserHeaders.prototype.appendFromString = function (str) {
	        var pairs = str.split("\r\n");
	        for (var i = 0; i < pairs.length; i++) {
	            var p = pairs[i];
	            var index = p.indexOf(":");
	            if (index > 0) {
	                var key = p.substring(0, index).trim();
	                var value = p.substring(index + 1).trim();
	                this.append(key, value);
	            }
	        }
	    };
	    BrowserHeaders.prototype.delete = function (key, value) {
	        var normalizedKey = util.normalizeName(key);
	        if (value === undefined) {
	            delete this.headersMap[normalizedKey];
	        }
	        else {
	            var existing = this.headersMap[normalizedKey];
	            if (existing) {
	                var index = existing.indexOf(value);
	                if (index >= 0) {
	                    existing.splice(index, 1);
	                }
	                if (existing.length === 0) {
	                    delete this.headersMap[normalizedKey];
	                }
	            }
	        }
	    };
	    BrowserHeaders.prototype.append = function (key, value) {
	        var _this = this;
	        var normalizedKey = util.normalizeName(key);
	        if (!Array.isArray(this.headersMap[normalizedKey])) {
	            this.headersMap[normalizedKey] = [];
	        }
	        if (Array.isArray(value)) {
	            value.forEach(function (arrayValue) {
	                _this.headersMap[normalizedKey].push(util.normalizeValue(arrayValue));
	            });
	        }
	        else {
	            this.headersMap[normalizedKey].push(util.normalizeValue(value));
	        }
	    };
	    BrowserHeaders.prototype.set = function (key, value) {
	        var normalizedKey = util.normalizeName(key);
	        if (Array.isArray(value)) {
	            var normalized_1 = [];
	            value.forEach(function (arrayValue) {
	                normalized_1.push(util.normalizeValue(arrayValue));
	            });
	            this.headersMap[normalizedKey] = normalized_1;
	        }
	        else {
	            this.headersMap[normalizedKey] = [util.normalizeValue(value)];
	        }
	    };
	    BrowserHeaders.prototype.has = function (key, value) {
	        var keyArray = this.headersMap[util.normalizeName(key)];
	        var keyExists = Array.isArray(keyArray);
	        if (!keyExists) {
	            return false;
	        }
	        if (value !== undefined) {
	            var normalizedValue = util.normalizeValue(value);
	            return keyArray.indexOf(normalizedValue) >= 0;
	        }
	        else {
	            return true;
	        }
	    };
	    BrowserHeaders.prototype.get = function (key) {
	        var values = this.headersMap[util.normalizeName(key)];
	        if (values !== undefined) {
	            return values.concat();
	        }
	        return [];
	    };
	    BrowserHeaders.prototype.forEach = function (callback) {
	        var _this = this;
	        Object.getOwnPropertyNames(this.headersMap)
	            .forEach(function (key) {
	            callback(key, _this.headersMap[key]);
	        }, this);
	    };
	    BrowserHeaders.prototype.toHeaders = function () {
	        if (typeof Headers !== "undefined") {
	            var headers_1 = new Headers();
	            this.forEach(function (key, values) {
	                values.forEach(function (value) {
	                    headers_1.append(key, value);
	                });
	            });
	            return headers_1;
	        }
	        else {
	            throw new Error("Headers class is not defined");
	        }
	    };
	    return BrowserHeaders;
	}());
	exports.BrowserHeaders = BrowserHeaders;

	});

	unwrapExports(BrowserHeaders_1);
	var BrowserHeaders_2 = BrowserHeaders_1.BrowserHeaders;

	var lib = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	exports.BrowserHeaders = BrowserHeaders_1.BrowserHeaders;

	});

	unwrapExports(lib);
	var lib_1 = lib.BrowserHeaders;

	var metadata = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	exports.Metadata = lib.BrowserHeaders;

	});

	unwrapExports(metadata);
	var metadata_1 = metadata.Metadata;

	var debug_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	function debug() {
	    var args = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        args[_i] = arguments[_i];
	    }
	    if (console.debug) {
	        console.debug.apply(null, args);
	    }
	    else {
	        console.log.apply(null, args);
	    }
	}
	exports.debug = debug;

	});

	unwrapExports(debug_1);
	var debug_2 = debug_1.debug;

	var detach_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	var awaitingExecution = null;
	function runCallbacks() {
	    if (awaitingExecution) {
	        var thisCallbackSet = awaitingExecution;
	        awaitingExecution = null;
	        for (var i = 0; i < thisCallbackSet.length; i++) {
	            try {
	                thisCallbackSet[i]();
	            }
	            catch (e) {
	                if (awaitingExecution === null) {
	                    awaitingExecution = [];
	                    setTimeout(function () {
	                        runCallbacks();
	                    }, 0);
	                }
	                for (var k = thisCallbackSet.length - 1; k > i; k--) {
	                    awaitingExecution.unshift(thisCallbackSet[k]);
	                }
	                throw e;
	            }
	        }
	    }
	}
	function detach(cb) {
	    if (awaitingExecution !== null) {
	        awaitingExecution.push(cb);
	        return;
	    }
	    awaitingExecution = [cb];
	    setTimeout(function () {
	        runCallbacks();
	    }, 0);
	}
	exports.default = detach;

	});

	unwrapExports(detach_1);

	var fetch_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });



	function fetchRequest(options) {
	    options.debug && debug_1.debug("fetchRequest", options);
	    return new Fetch(options);
	}
	exports.default = fetchRequest;
	var Fetch = (function () {
	    function Fetch(transportOptions) {
	        this.cancelled = false;
	        this.controller = window.AbortController && new AbortController();
	        this.options = transportOptions;
	    }
	    Fetch.prototype.pump = function (readerArg, res) {
	        var _this = this;
	        this.reader = readerArg;
	        if (this.cancelled) {
	            this.options.debug && debug_1.debug("Fetch.pump.cancel at first pump");
	            this.reader.cancel();
	            return;
	        }
	        this.reader.read()
	            .then(function (result) {
	            if (result.done) {
	                detach_1.default(function () {
	                    _this.options.onEnd();
	                });
	                return res;
	            }
	            detach_1.default(function () {
	                _this.options.onChunk(result.value);
	            });
	            _this.pump(_this.reader, res);
	            return;
	        });
	    };
	    Fetch.prototype.send = function (msgBytes) {
	        var _this = this;
	        fetch(this.options.url, {
	            headers: this.metadata.toHeaders(),
	            method: "POST",
	            body: msgBytes,
	            credentials: "same-origin",
	            signal: this.controller && this.controller.signal
	        }).then(function (res) {
	            _this.options.debug && debug_1.debug("Fetch.response", res);
	            detach_1.default(function () {
	                _this.options.onHeaders(new metadata.Metadata(res.headers), res.status);
	            });
	            if (res.body) {
	                _this.pump(res.body.getReader(), res);
	                return;
	            }
	            return res;
	        }).catch(function (err) {
	            if (_this.cancelled) {
	                _this.options.debug && debug_1.debug("Fetch.catch - request cancelled");
	                return;
	            }
	            _this.options.debug && debug_1.debug("Fetch.catch", err.message);
	            detach_1.default(function () {
	                _this.options.onEnd(err);
	            });
	        });
	    };
	    Fetch.prototype.sendMessage = function (msgBytes) {
	        this.send(msgBytes);
	    };
	    Fetch.prototype.finishSend = function () {
	    };
	    Fetch.prototype.start = function (metadata$$1) {
	        this.metadata = metadata$$1;
	    };
	    Fetch.prototype.cancel = function () {
	        this.cancelled = true;
	        if (this.reader) {
	            this.options.debug && debug_1.debug("Fetch.abort.cancel");
	            this.reader.cancel();
	        }
	        else {
	            this.options.debug && debug_1.debug("Fetch.abort.cancel before reader");
	        }
	        if (this.controller) {
	            this.controller.abort();
	        }
	    };
	    return Fetch;
	}());
	function detectFetchSupport() {
	    return typeof Response !== "undefined" && Response.prototype.hasOwnProperty("body") && typeof Headers === "function";
	}
	exports.detectFetchSupport = detectFetchSupport;

	});

	unwrapExports(fetch_1);
	var fetch_2 = fetch_1.detectFetchSupport;

	var xhr = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });



	function xhrRequest(options) {
	    options.debug && debug_1.debug("xhrRequest", options);
	    return new XHR(options);
	}
	exports.default = xhrRequest;
	var XHR = (function () {
	    function XHR(transportOptions) {
	        this.options = transportOptions;
	    }
	    XHR.prototype.onProgressEvent = function () {
	        var _this = this;
	        this.options.debug && debug_1.debug("XHR.onProgressEvent.length: ", this.xhr.response.length);
	        var rawText = this.xhr.response.substr(this.index);
	        this.index = this.xhr.response.length;
	        var asArrayBuffer = stringToArrayBuffer(rawText);
	        detach_1.default(function () {
	            _this.options.onChunk(asArrayBuffer);
	        });
	    };
	    XHR.prototype.onLoadEvent = function () {
	        var _this = this;
	        this.options.debug && debug_1.debug("XHR.onLoadEvent");
	        detach_1.default(function () {
	            _this.options.onEnd();
	        });
	    };
	    XHR.prototype.onStateChange = function () {
	        var _this = this;
	        this.options.debug && debug_1.debug("XHR.onStateChange", this.xhr.readyState);
	        if (this.xhr.readyState === XMLHttpRequest.HEADERS_RECEIVED) {
	            detach_1.default(function () {
	                _this.options.onHeaders(new metadata.Metadata(_this.xhr.getAllResponseHeaders()), _this.xhr.status);
	            });
	        }
	    };
	    XHR.prototype.sendMessage = function (msgBytes) {
	        this.xhr.send(msgBytes);
	    };
	    XHR.prototype.finishSend = function () {
	    };
	    XHR.prototype.start = function (metadata$$1) {
	        var _this = this;
	        this.metadata = metadata$$1;
	        var xhr = new XMLHttpRequest();
	        this.xhr = xhr;
	        xhr.open("POST", this.options.url);
	        xhr.responseType = "text";
	        xhr.overrideMimeType("text/plain; charset=x-user-defined");
	        this.metadata.forEach(function (key, values) {
	            xhr.setRequestHeader(key, values.join(", "));
	        });
	        xhr.addEventListener("readystatechange", this.onStateChange.bind(this));
	        xhr.addEventListener("progress", this.onProgressEvent.bind(this));
	        xhr.addEventListener("loadend", this.onLoadEvent.bind(this));
	        xhr.addEventListener("error", function (err) {
	            _this.options.debug && debug_1.debug("XHR.error", err);
	            detach_1.default(function () {
	                _this.options.onEnd(err.error);
	            });
	        });
	    };
	    XHR.prototype.cancel = function () {
	        this.options.debug && debug_1.debug("XHR.abort");
	        this.xhr.abort();
	    };
	    return XHR;
	}());
	function codePointAtPolyfill(str, index) {
	    var code = str.charCodeAt(index);
	    if (code >= 0xd800 && code <= 0xdbff) {
	        var surr = str.charCodeAt(index + 1);
	        if (surr >= 0xdc00 && surr <= 0xdfff) {
	            code = 0x10000 + ((code - 0xd800) << 10) + (surr - 0xdc00);
	        }
	    }
	    return code;
	}
	function stringToArrayBuffer(str) {
	    var asArray = new Uint8Array(str.length);
	    var arrayIndex = 0;
	    for (var i = 0; i < str.length; i++) {
	        var codePoint = String.prototype.codePointAt ? str.codePointAt(i) : codePointAtPolyfill(str, i);
	        asArray[arrayIndex++] = codePoint & 0xFF;
	    }
	    return asArray;
	}
	exports.stringToArrayBuffer = stringToArrayBuffer;
	function detectXHRSupport() {
	    return typeof XMLHttpRequest !== "undefined" && XMLHttpRequest.prototype.hasOwnProperty("overrideMimeType");
	}
	exports.detectXHRSupport = detectXHRSupport;

	});

	unwrapExports(xhr);
	var xhr_1 = xhr.stringToArrayBuffer;
	var xhr_2 = xhr.detectXHRSupport;

	var xhrUtil = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	var xhr;
	function getXHR() {
	    if (xhr !== undefined)
	        return xhr;
	    if (XMLHttpRequest) {
	        xhr = new XMLHttpRequest();
	        try {
	            xhr.open("GET", "https://localhost");
	        }
	        catch (e) { }
	    }
	    return xhr;
	}
	function xhrSupportsResponseType(type) {
	    var xhr = getXHR();
	    if (!xhr) {
	        return false;
	    }
	    try {
	        xhr.responseType = type;
	        return xhr.responseType === type;
	    }
	    catch (e) { }
	    return false;
	}
	exports.xhrSupportsResponseType = xhrSupportsResponseType;

	});

	unwrapExports(xhrUtil);
	var xhrUtil_1 = xhrUtil.xhrSupportsResponseType;

	var mozXhr = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });




	function mozXhrRequest(options) {
	    options.debug && debug_1.debug("mozXhrRequest", options);
	    return new MozXHR(options);
	}
	exports.default = mozXhrRequest;
	var MozXHR = (function () {
	    function MozXHR(transportOptions) {
	        this.options = transportOptions;
	    }
	    MozXHR.prototype.onProgressEvent = function () {
	        var _this = this;
	        var resp = this.xhr.response;
	        this.options.debug && debug_1.debug("MozXHR.onProgressEvent: ", new Uint8Array(resp));
	        detach_1.default(function () {
	            _this.options.onChunk(new Uint8Array(resp));
	        });
	    };
	    MozXHR.prototype.onLoadEvent = function () {
	        var _this = this;
	        this.options.debug && debug_1.debug("MozXHR.onLoadEvent");
	        detach_1.default(function () {
	            _this.options.onEnd();
	        });
	    };
	    MozXHR.prototype.onStateChange = function () {
	        var _this = this;
	        this.options.debug && debug_1.debug("MozXHR.onStateChange", this.xhr.readyState);
	        this.options.debug && debug_1.debug("MozXHR.XMLHttpRequest.HEADERS_RECEIVED", XMLHttpRequest.HEADERS_RECEIVED);
	        if (this.xhr.readyState === XMLHttpRequest.HEADERS_RECEIVED) {
	            detach_1.default(function () {
	                _this.options.onHeaders(new metadata.Metadata(_this.xhr.getAllResponseHeaders()), _this.xhr.status);
	            });
	        }
	    };
	    MozXHR.prototype.sendMessage = function (msgBytes) {
	        this.options.debug && debug_1.debug("MozXHR.sendMessage");
	        this.xhr.send(msgBytes);
	    };
	    MozXHR.prototype.finishSend = function () {
	    };
	    MozXHR.prototype.start = function (metadata$$1) {
	        var _this = this;
	        this.options.debug && debug_1.debug("MozXHR.start");
	        this.metadata = metadata$$1;
	        var xhr = new XMLHttpRequest();
	        this.xhr = xhr;
	        xhr.open("POST", this.options.url);
	        xhr.responseType = "moz-chunked-arraybuffer";
	        this.metadata.forEach(function (key, values) {
	            xhr.setRequestHeader(key, values.join(", "));
	        });
	        xhr.addEventListener("readystatechange", this.onStateChange.bind(this));
	        xhr.addEventListener("progress", this.onProgressEvent.bind(this));
	        xhr.addEventListener("loadend", this.onLoadEvent.bind(this));
	        xhr.addEventListener("error", function (err) {
	            _this.options.debug && debug_1.debug("MozXHR.error", err);
	            detach_1.default(function () {
	                _this.options.onEnd(err.error);
	            });
	        });
	    };
	    MozXHR.prototype.cancel = function () {
	        this.options.debug && debug_1.debug("MozXHR.cancel");
	        this.xhr.abort();
	    };
	    return MozXHR;
	}());
	function detectMozXHRSupport() {
	    return typeof XMLHttpRequest !== "undefined" && xhrUtil.xhrSupportsResponseType("moz-chunked-arraybuffer");
	}
	exports.detectMozXHRSupport = detectMozXHRSupport;

	});

	unwrapExports(mozXhr);
	var mozXhr_1 = mozXhr.detectMozXHRSupport;

	var nodeHttp = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });




	function nodeHttpRequest(options) {
	    options.debug && console.log("nodeHttpRequest", options);
	    return new NodeHttp(options);
	}
	exports.default = nodeHttpRequest;
	var NodeHttp = (function () {
	    function NodeHttp(transportOptions) {
	        this.options = transportOptions;
	    }
	    NodeHttp.prototype.sendMessage = function (msgBytes) {
	        this.request.write(toBuffer(msgBytes));
	        this.request.end();
	    };
	    NodeHttp.prototype.finishSend = function () {
	    };
	    NodeHttp.prototype.responseCallback = function (response) {
	        var _this = this;
	        this.options.debug && console.log("NodeHttp.response", response.statusCode);
	        var headers = filterHeadersForUndefined(response.headers);
	        this.options.onHeaders(new metadata.Metadata(headers), response.statusCode);
	        response.on("data", function (chunk) {
	            _this.options.debug && console.log("NodeHttp.data", chunk);
	            _this.options.onChunk(toArrayBuffer(chunk));
	        });
	        response.on("end", function () {
	            _this.options.debug && console.log("NodeHttp.end");
	            _this.options.onEnd();
	        });
	    };
	    NodeHttp.prototype.start = function (metadata$$1) {
	        var _this = this;
	        var headers = {};
	        metadata$$1.forEach(function (key, values) {
	            headers[key] = values.join(", ");
	        });
	        var parsedUrl = url.parse(this.options.url);
	        var httpOptions = {
	            host: parsedUrl.hostname,
	            port: parsedUrl.port ? parseInt(parsedUrl.port) : undefined,
	            path: parsedUrl.path,
	            headers: headers,
	            method: "POST"
	        };
	        if (parsedUrl.protocol === "https:") {
	            this.request = https.request(httpOptions, this.responseCallback.bind(this));
	        }
	        else {
	            this.request = http.request(httpOptions, this.responseCallback.bind(this));
	        }
	        this.request.on("error", function (err) {
	            _this.options.debug && console.log("NodeHttp.error", err);
	            _this.options.onEnd(err);
	        });
	    };
	    NodeHttp.prototype.cancel = function () {
	        this.options.debug && console.log("NodeHttp.abort");
	        this.request.abort();
	    };
	    return NodeHttp;
	}());
	function filterHeadersForUndefined(headers) {
	    var filteredHeaders = {};
	    for (var key in headers) {
	        var value = headers[key];
	        if (headers.hasOwnProperty(key)) {
	            if (value !== undefined) {
	                filteredHeaders[key] = value;
	            }
	        }
	    }
	    return filteredHeaders;
	}
	function toArrayBuffer(buf) {
	    var view = new Uint8Array(buf.length);
	    for (var i = 0; i < buf.length; i++) {
	        view[i] = buf[i];
	    }
	    return view;
	}
	function toBuffer(ab) {
	    var buf = new Buffer$1(ab.byteLength);
	    for (var i = 0; i < buf.length; i++) {
	        buf[i] = ab[i];
	    }
	    return buf;
	}
	function detectNodeHTTPSupport() {
	    return module.exports;
	}
	exports.detectNodeHTTPSupport = detectNodeHTTPSupport;

	});

	unwrapExports(nodeHttp);
	var nodeHttp_1 = nodeHttp.detectNodeHTTPSupport;

	var ChunkParser_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	var HEADER_SIZE = 5;
	var isAllowedControlChars = function (char) { return char === 0x9 || char === 0xa || char === 0xd; };
	function isValidHeaderAscii(val) {
	    return isAllowedControlChars(val) || (val >= 0x20 && val <= 0x7e);
	}
	function decodeASCII(input) {
	    for (var i = 0; i !== input.length; ++i) {
	        if (!isValidHeaderAscii(input[i])) {
	            throw new Error("Metadata is not valid (printable) ASCII");
	        }
	    }
	    return String.fromCharCode.apply(String, Array.prototype.slice.call(input));
	}
	exports.decodeASCII = decodeASCII;
	function encodeASCII(input) {
	    var encoded = new Uint8Array(input.length);
	    for (var i = 0; i !== input.length; ++i) {
	        var charCode = input.charCodeAt(i);
	        if (!isValidHeaderAscii(charCode)) {
	            throw new Error("Metadata contains invalid ASCII");
	        }
	        encoded[i] = charCode;
	    }
	    return encoded;
	}
	exports.encodeASCII = encodeASCII;
	function isTrailerHeader(headerView) {
	    return (headerView.getUint8(0) & 0x80) === 0x80;
	}
	function parseTrailerData(msgData) {
	    return new metadata.Metadata(decodeASCII(msgData));
	}
	function readLengthFromHeader(headerView) {
	    return headerView.getUint32(1, false);
	}
	function hasEnoughBytes(buffer, position, byteCount) {
	    return buffer.byteLength - position >= byteCount;
	}
	function sliceUint8Array(buffer, from, to) {
	    if (buffer.slice) {
	        return buffer.slice(from, to);
	    }
	    var end = buffer.length;
	    if (to !== undefined) {
	        end = to;
	    }
	    var num = end - from;
	    var array = new Uint8Array(num);
	    var arrayIndex = 0;
	    for (var i = from; i < end; i++) {
	        array[arrayIndex++] = buffer[i];
	    }
	    return array;
	}
	var ChunkType;
	(function (ChunkType) {
	    ChunkType[ChunkType["MESSAGE"] = 1] = "MESSAGE";
	    ChunkType[ChunkType["TRAILERS"] = 2] = "TRAILERS";
	})(ChunkType = exports.ChunkType || (exports.ChunkType = {}));
	var ChunkParser = (function () {
	    function ChunkParser() {
	        this.buffer = null;
	        this.position = 0;
	    }
	    ChunkParser.prototype.parse = function (bytes, flush) {
	        if (bytes.length === 0 && flush) {
	            return [];
	        }
	        var chunkData = [];
	        if (this.buffer == null) {
	            this.buffer = bytes;
	            this.position = 0;
	        }
	        else if (this.position === this.buffer.byteLength) {
	            this.buffer = bytes;
	            this.position = 0;
	        }
	        else {
	            var remaining = this.buffer.byteLength - this.position;
	            var newBuf = new Uint8Array(remaining + bytes.byteLength);
	            var fromExisting = sliceUint8Array(this.buffer, this.position);
	            newBuf.set(fromExisting, 0);
	            var latestDataBuf = new Uint8Array(bytes);
	            newBuf.set(latestDataBuf, remaining);
	            this.buffer = newBuf;
	            this.position = 0;
	        }
	        while (true) {
	            if (!hasEnoughBytes(this.buffer, this.position, HEADER_SIZE)) {
	                return chunkData;
	            }
	            var headerBuffer = sliceUint8Array(this.buffer, this.position, this.position + HEADER_SIZE);
	            var headerView = new DataView(headerBuffer.buffer, headerBuffer.byteOffset, headerBuffer.byteLength);
	            var msgLength = readLengthFromHeader(headerView);
	            if (!hasEnoughBytes(this.buffer, this.position, HEADER_SIZE + msgLength)) {
	                return chunkData;
	            }
	            var messageData = sliceUint8Array(this.buffer, this.position + HEADER_SIZE, this.position + HEADER_SIZE + msgLength);
	            this.position += HEADER_SIZE + msgLength;
	            if (isTrailerHeader(headerView)) {
	                chunkData.push({ chunkType: ChunkType.TRAILERS, trailers: parseTrailerData(messageData) });
	                return chunkData;
	            }
	            else {
	                chunkData.push({ chunkType: ChunkType.MESSAGE, data: messageData });
	            }
	        }
	    };
	    return ChunkParser;
	}());
	exports.ChunkParser = ChunkParser;

	});

	unwrapExports(ChunkParser_1);
	var ChunkParser_2 = ChunkParser_1.decodeASCII;
	var ChunkParser_3 = ChunkParser_1.encodeASCII;
	var ChunkParser_4 = ChunkParser_1.ChunkType;
	var ChunkParser_5 = ChunkParser_1.ChunkParser;

	var websocket = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });



	var WebsocketSignal;
	(function (WebsocketSignal) {
	    WebsocketSignal[WebsocketSignal["FINISH_SEND"] = 1] = "FINISH_SEND";
	})(WebsocketSignal || (WebsocketSignal = {}));
	var finishSendFrame = new Uint8Array([1]);
	function websocketRequest(options) {
	    options.debug && debug_1.debug("websocketRequest", options);
	    var webSocketAddress = constructWebSocketAddress(options.url);
	    var sendQueue = [];
	    var ws;
	    function sendToWebsocket(toSend) {
	        if (toSend === WebsocketSignal.FINISH_SEND) {
	            ws.send(finishSendFrame);
	        }
	        else {
	            var byteArray = toSend;
	            var c = new Int8Array(byteArray.byteLength + 1);
	            c.set(new Uint8Array([0]));
	            c.set(byteArray, 1);
	            ws.send(c);
	        }
	    }
	    return {
	        sendMessage: function (msgBytes) {
	            if (!ws || ws.readyState === ws.CONNECTING) {
	                sendQueue.push(msgBytes);
	            }
	            else {
	                sendToWebsocket(msgBytes);
	            }
	        },
	        finishSend: function () {
	            if (!ws || ws.readyState === ws.CONNECTING) {
	                sendQueue.push(WebsocketSignal.FINISH_SEND);
	            }
	            else {
	                sendToWebsocket(WebsocketSignal.FINISH_SEND);
	            }
	        },
	        start: function (metadata) {
	            ws = new WebSocket(webSocketAddress, ["grpc-websockets"]);
	            ws.binaryType = "arraybuffer";
	            ws.onopen = function () {
	                options.debug && debug_1.debug("websocketRequest.onopen");
	                ws.send(headersToBytes(metadata));
	                sendQueue.forEach(function (toSend) {
	                    sendToWebsocket(toSend);
	                });
	            };
	            ws.onclose = function (closeEvent) {
	                options.debug && debug_1.debug("websocketRequest.onclose", closeEvent);
	                detach_1.default(function () {
	                    options.onEnd();
	                });
	            };
	            ws.onerror = function (error) {
	                options.debug && debug_1.debug("websocketRequest.onerror", error);
	            };
	            ws.onmessage = function (e) {
	                detach_1.default(function () {
	                    options.onChunk(new Uint8Array(e.data));
	                });
	            };
	        },
	        cancel: function () {
	            options.debug && debug_1.debug("websocket.abort");
	            detach_1.default(function () {
	                ws.close();
	            });
	        }
	    };
	}
	exports.default = websocketRequest;
	function constructWebSocketAddress(url$$1) {
	    if (url$$1.substr(0, 8) === "https://") {
	        return "wss://" + url$$1.substr(8);
	    }
	    else if (url$$1.substr(0, 7) === "http://") {
	        return "ws://" + url$$1.substr(7);
	    }
	    throw new Error("Websocket transport constructed with non-https:// or http:// host.");
	}
	function headersToBytes(headers) {
	    var asString = "";
	    headers.forEach(function (key, values) {
	        asString += key + ": " + values.join(", ") + "\r\n";
	    });
	    return ChunkParser_1.encodeASCII(asString);
	}

	});

	unwrapExports(websocket);

	var Transport = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });





	var selectedTransport;
	function DefaultTransportFactory(transportOptions) {
	    if (transportOptions.methodDefinition.requestStream) {
	        return new Error("No transport available for client-streaming (requestStream) method");
	    }
	    if (!selectedTransport) {
	        selectedTransport = detectTransport();
	    }
	    return selectedTransport(transportOptions);
	}
	exports.DefaultTransportFactory = DefaultTransportFactory;
	function detectTransport() {
	    if (fetch_1.detectFetchSupport()) {
	        return fetch_1.default;
	    }
	    if (mozXhr.detectMozXHRSupport()) {
	        return mozXhr.default;
	    }
	    if (xhr.detectXHRSupport()) {
	        return xhr.default;
	    }
	    if (nodeHttp.detectNodeHTTPSupport()) {
	        return nodeHttp.default;
	    }
	    throw new Error("No suitable transport found for gRPC-Web");
	}
	function WebsocketTransportFactory(transportOptions) {
	    return websocket.default(transportOptions);
	}
	exports.WebsocketTransportFactory = WebsocketTransportFactory;

	});

	unwrapExports(Transport);
	var Transport_1 = Transport.DefaultTransportFactory;
	var Transport_2 = Transport.WebsocketTransportFactory;

	var Code_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	var Code;
	(function (Code) {
	    Code[Code["OK"] = 0] = "OK";
	    Code[Code["Canceled"] = 1] = "Canceled";
	    Code[Code["Unknown"] = 2] = "Unknown";
	    Code[Code["InvalidArgument"] = 3] = "InvalidArgument";
	    Code[Code["DeadlineExceeded"] = 4] = "DeadlineExceeded";
	    Code[Code["NotFound"] = 5] = "NotFound";
	    Code[Code["AlreadyExists"] = 6] = "AlreadyExists";
	    Code[Code["PermissionDenied"] = 7] = "PermissionDenied";
	    Code[Code["ResourceExhausted"] = 8] = "ResourceExhausted";
	    Code[Code["FailedPrecondition"] = 9] = "FailedPrecondition";
	    Code[Code["Aborted"] = 10] = "Aborted";
	    Code[Code["OutOfRange"] = 11] = "OutOfRange";
	    Code[Code["Unimplemented"] = 12] = "Unimplemented";
	    Code[Code["Internal"] = 13] = "Internal";
	    Code[Code["Unavailable"] = 14] = "Unavailable";
	    Code[Code["DataLoss"] = 15] = "DataLoss";
	    Code[Code["Unauthenticated"] = 16] = "Unauthenticated";
	})(Code = exports.Code || (exports.Code = {}));
	function httpStatusToCode(httpStatus) {
	    switch (httpStatus) {
	        case 0:
	            return Code.Internal;
	        case 200:
	            return Code.OK;
	        case 400:
	            return Code.InvalidArgument;
	        case 401:
	            return Code.Unauthenticated;
	        case 403:
	            return Code.PermissionDenied;
	        case 404:
	            return Code.NotFound;
	        case 409:
	            return Code.Aborted;
	        case 412:
	            return Code.FailedPrecondition;
	        case 429:
	            return Code.ResourceExhausted;
	        case 499:
	            return Code.Canceled;
	        case 500:
	            return Code.Unknown;
	        case 501:
	            return Code.Unimplemented;
	        case 503:
	            return Code.Unavailable;
	        case 504:
	            return Code.DeadlineExceeded;
	        default:
	            return Code.Unknown;
	    }
	}
	exports.httpStatusToCode = httpStatusToCode;

	});

	unwrapExports(Code_1);
	var Code_2 = Code_1.Code;
	var Code_3 = Code_1.httpStatusToCode;

	var util$2 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	function frameRequest(request) {
	    var bytes = request.serializeBinary();
	    var frame = new ArrayBuffer(bytes.byteLength + 5);
	    new DataView(frame, 1, 4).setUint32(0, bytes.length, false);
	    new Uint8Array(frame, 5).set(bytes);
	    return new Uint8Array(frame);
	}
	exports.frameRequest = frameRequest;

	});

	unwrapExports(util$2);
	var util_1$1 = util$2.frameRequest;

	var client_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });







	function client(methodDescriptor, props) {
	    return new GrpcClient(methodDescriptor, props);
	}
	exports.client = client;
	var GrpcClient = (function () {
	    function GrpcClient(methodDescriptor, props) {
	        this.started = false;
	        this.sentFirstMessage = false;
	        this.completed = false;
	        this.closed = false;
	        this.finishedSending = false;
	        this.onHeadersCallbacks = [];
	        this.onMessageCallbacks = [];
	        this.onEndCallbacks = [];
	        this.parser = new ChunkParser_1.ChunkParser();
	        this.methodDefinition = methodDescriptor;
	        this.props = props;
	        this.createTransport();
	    }
	    GrpcClient.prototype.createTransport = function () {
	        var url$$1 = this.props.host + "/" + this.methodDefinition.service.serviceName + "/" + this.methodDefinition.methodName;
	        var transportOptions = {
	            methodDefinition: this.methodDefinition,
	            debug: this.props.debug || false,
	            url: url$$1,
	            onHeaders: this.onTransportHeaders.bind(this),
	            onChunk: this.onTransportChunk.bind(this),
	            onEnd: this.onTransportEnd.bind(this),
	        };
	        var transportConstructor = this.props.transport;
	        if (transportConstructor) {
	            var constructedTransport = transportConstructor(transportOptions);
	            if (constructedTransport instanceof Error) {
	                throw constructedTransport;
	            }
	            this.transport = constructedTransport;
	        }
	        else {
	            var factoryTransport = Transport.DefaultTransportFactory(transportOptions);
	            if (factoryTransport instanceof Error) {
	                throw factoryTransport;
	            }
	            this.transport = factoryTransport;
	        }
	    };
	    GrpcClient.prototype.onTransportHeaders = function (headers, status) {
	        this.props.debug && debug_1.debug("onHeaders", headers, status);
	        if (this.closed) {
	            this.props.debug && debug_1.debug("grpc.onHeaders received after request was closed - ignoring");
	            return;
	        }
	        if (status === 0) ;
	        else {
	            this.responseHeaders = headers;
	            this.props.debug && debug_1.debug("onHeaders.responseHeaders", JSON.stringify(this.responseHeaders, null, 2));
	            var code = Code_1.httpStatusToCode(status);
	            this.props.debug && debug_1.debug("onHeaders.code", code);
	            var gRPCMessage = headers.get("grpc-message") || [];
	            this.props.debug && debug_1.debug("onHeaders.gRPCMessage", gRPCMessage);
	            if (code !== Code_1.Code.OK) {
	                var statusMessage = this.decodeGRPCStatus(gRPCMessage[0]);
	                this.rawOnError(code, statusMessage);
	                return;
	            }
	            this.rawOnHeaders(headers);
	        }
	    };
	    GrpcClient.prototype.onTransportChunk = function (chunkBytes) {
	        var _this = this;
	        if (this.closed) {
	            this.props.debug && debug_1.debug("grpc.onChunk received after request was closed - ignoring");
	            return;
	        }
	        var data = [];
	        try {
	            data = this.parser.parse(chunkBytes);
	        }
	        catch (e) {
	            this.props.debug && debug_1.debug("onChunk.parsing error", e, e.message);
	            this.rawOnError(Code_1.Code.Internal, "parsing error: " + e.message);
	            return;
	        }
	        data.forEach(function (d) {
	            if (d.chunkType === ChunkParser_1.ChunkType.MESSAGE) {
	                var deserialized = _this.methodDefinition.responseType.deserializeBinary(d.data);
	                _this.rawOnMessage(deserialized);
	            }
	            else if (d.chunkType === ChunkParser_1.ChunkType.TRAILERS) {
	                if (!_this.responseHeaders) {
	                    _this.responseHeaders = new metadata.Metadata(d.trailers);
	                    _this.rawOnHeaders(_this.responseHeaders);
	                }
	                else {
	                    _this.responseTrailers = new metadata.Metadata(d.trailers);
	                    _this.props.debug && debug_1.debug("onChunk.trailers", _this.responseTrailers);
	                }
	            }
	        });
	    };
	    GrpcClient.prototype.onTransportEnd = function () {
	        this.props.debug && debug_1.debug("grpc.onEnd");
	        if (this.closed) {
	            this.props.debug && debug_1.debug("grpc.onEnd received after request was closed - ignoring");
	            return;
	        }
	        if (this.responseTrailers === undefined) {
	            if (this.responseHeaders === undefined) {
	                this.rawOnError(Code_1.Code.Unknown, "Response closed without headers");
	                return;
	            }
	            var grpcStatus_1 = getStatusFromHeaders(this.responseHeaders);
	            var grpcMessage_1 = this.responseHeaders.get("grpc-message");
	            this.props.debug && debug_1.debug("grpc.headers only response ", grpcStatus_1, grpcMessage_1);
	            if (grpcStatus_1 === null) {
	                this.rawOnEnd(Code_1.Code.Unknown, "Response closed without grpc-status (Headers only)", this.responseHeaders);
	                return;
	            }
	            var statusMessage_1 = this.decodeGRPCStatus(grpcMessage_1[0]);
	            this.rawOnEnd(grpcStatus_1, statusMessage_1, this.responseHeaders);
	            return;
	        }
	        var grpcStatus = getStatusFromHeaders(this.responseTrailers);
	        if (grpcStatus === null) {
	            this.rawOnError(Code_1.Code.Internal, "Response closed without grpc-status (Trailers provided)");
	            return;
	        }
	        var grpcMessage = this.responseTrailers.get("grpc-message");
	        var statusMessage = this.decodeGRPCStatus(grpcMessage[0]);
	        this.rawOnEnd(grpcStatus, statusMessage, this.responseTrailers);
	    };
	    GrpcClient.prototype.decodeGRPCStatus = function (src) {
	        if (src) {
	            try {
	                return decodeURIComponent(src);
	            }
	            catch (err) {
	                return src;
	            }
	        }
	        else {
	            return "";
	        }
	    };
	    GrpcClient.prototype.rawOnEnd = function (code, message, trailers) {
	        this.props.debug && debug_1.debug("rawOnEnd", code, message, trailers);
	        if (this.completed)
	            return;
	        this.completed = true;
	        this.onEndCallbacks.forEach(function (callback) {
	            detach_1.default(function () {
	                callback(code, message, trailers);
	            });
	        });
	    };
	    GrpcClient.prototype.rawOnHeaders = function (headers) {
	        this.props.debug && debug_1.debug("rawOnHeaders", headers);
	        if (this.completed)
	            return;
	        this.onHeadersCallbacks.forEach(function (callback) {
	            detach_1.default(function () {
	                callback(headers);
	            });
	        });
	    };
	    GrpcClient.prototype.rawOnError = function (code, msg) {
	        this.props.debug && debug_1.debug("rawOnError", code, msg);
	        if (this.completed)
	            return;
	        this.completed = true;
	        this.onEndCallbacks.forEach(function (callback) {
	            detach_1.default(function () {
	                callback(code, msg, new metadata.Metadata());
	            });
	        });
	    };
	    GrpcClient.prototype.rawOnMessage = function (res) {
	        this.props.debug && debug_1.debug("rawOnMessage", res.toObject());
	        if (this.completed)
	            return;
	        this.onMessageCallbacks.forEach(function (callback) {
	            detach_1.default(function () {
	                callback(res);
	            });
	        });
	    };
	    GrpcClient.prototype.onHeaders = function (callback) {
	        this.onHeadersCallbacks.push(callback);
	    };
	    GrpcClient.prototype.onMessage = function (callback) {
	        this.onMessageCallbacks.push(callback);
	    };
	    GrpcClient.prototype.onEnd = function (callback) {
	        this.onEndCallbacks.push(callback);
	    };
	    GrpcClient.prototype.start = function (metadata$$1) {
	        if (this.started) {
	            throw new Error("Client already started - cannot .start()");
	        }
	        this.started = true;
	        var requestHeaders = new metadata.Metadata(metadata$$1 ? metadata$$1 : {});
	        requestHeaders.set("content-type", "application/grpc-web+proto");
	        requestHeaders.set("x-grpc-web", "1");
	        this.transport.start(requestHeaders);
	    };
	    GrpcClient.prototype.send = function (msg) {
	        if (!this.started) {
	            throw new Error("Client not started - .start() must be called before .send()");
	        }
	        if (this.closed) {
	            throw new Error("Client already closed - cannot .send()");
	        }
	        if (this.finishedSending) {
	            throw new Error("Client already finished sending - cannot .send()");
	        }
	        if (!this.methodDefinition.requestStream && this.sentFirstMessage) {
	            throw new Error("Message already sent for non-client-streaming method - cannot .send()");
	        }
	        this.sentFirstMessage = true;
	        var msgBytes = util$2.frameRequest(msg);
	        this.transport.sendMessage(msgBytes);
	    };
	    GrpcClient.prototype.finishSend = function () {
	        if (!this.started) {
	            throw new Error("Client not started - .finishSend() must be called before .close()");
	        }
	        if (this.closed) {
	            throw new Error("Client already closed - cannot .send()");
	        }
	        if (this.finishedSending) {
	            throw new Error("Client already finished sending - cannot .finishSend()");
	        }
	        this.finishedSending = true;
	        this.transport.finishSend();
	    };
	    GrpcClient.prototype.close = function () {
	        if (!this.started) {
	            throw new Error("Client not started - .start() must be called before .close()");
	        }
	        if (!this.closed) {
	            this.closed = true;
	            this.props.debug && debug_1.debug("request.abort aborting request");
	            this.transport.cancel();
	        }
	        else {
	            throw new Error("Client already closed - cannot .close()");
	        }
	    };
	    return GrpcClient;
	}());
	function getStatusFromHeaders(headers) {
	    var fromHeaders = headers.get("grpc-status") || [];
	    if (fromHeaders.length > 0) {
	        try {
	            var asString = fromHeaders[0];
	            return parseInt(asString, 10);
	        }
	        catch (e) {
	            return null;
	        }
	    }
	    return null;
	}

	});

	unwrapExports(client_1);
	var client_2 = client_1.client;

	var invoke_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	function invoke(methodDescriptor, props) {
	    if (methodDescriptor.requestStream) {
	        throw new Error(".invoke cannot be used with client-streaming methods. Use .client instead.");
	    }
	    var grpcClient = client_1.client(methodDescriptor, {
	        host: props.host,
	        transport: props.transport,
	        debug: props.debug,
	    });
	    if (props.onHeaders) {
	        grpcClient.onHeaders(props.onHeaders);
	    }
	    if (props.onMessage) {
	        grpcClient.onMessage(props.onMessage);
	    }
	    if (props.onEnd) {
	        grpcClient.onEnd(props.onEnd);
	    }
	    grpcClient.start(props.metadata);
	    grpcClient.send(props.request);
	    return {
	        close: function () {
	            grpcClient.close();
	        }
	    };
	}
	exports.invoke = invoke;

	});

	unwrapExports(invoke_1);
	var invoke_2 = invoke_1.invoke;

	var unary_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });


	function unary(methodDescriptor, props) {
	    if (methodDescriptor.responseStream) {
	        throw new Error(".unary cannot be used with server-streaming methods. Use .invoke or .client instead.");
	    }
	    if (methodDescriptor.requestStream) {
	        throw new Error(".unary cannot be used with client-streaming methods. Use .client instead.");
	    }
	    var responseHeaders = null;
	    var responseMessage = null;
	    var grpcClient = client_1.client(methodDescriptor, {
	        host: props.host,
	        transport: props.transport,
	        debug: props.debug,
	    });
	    grpcClient.onHeaders(function (headers) {
	        responseHeaders = headers;
	    });
	    grpcClient.onMessage(function (res) {
	        responseMessage = res;
	    });
	    grpcClient.onEnd(function (status, statusMessage, trailers) {
	        props.onEnd({
	            status: status,
	            statusMessage: statusMessage,
	            headers: responseHeaders ? responseHeaders : new metadata.Metadata(),
	            message: responseMessage,
	            trailers: trailers
	        });
	    });
	    grpcClient.start(props.metadata);
	    grpcClient.send(props.request);
	    return {
	        close: function () {
	            grpcClient.close();
	        }
	    };
	}
	exports.unary = unary;

	});

	unwrapExports(unary_1);
	var unary_2 = unary_1.unary;

	var dist = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });






	var grpc;
	(function (grpc) {
	    grpc.DefaultTransportFactory = Transport.DefaultTransportFactory;
	    grpc.WebsocketTransportFactory = Transport.WebsocketTransportFactory;
	    grpc.Code = Code_1.Code;
	    grpc.Metadata = lib.BrowserHeaders;
	    function client(methodDescriptor, props) {
	        return client_1.client(methodDescriptor, props);
	    }
	    grpc.client = client;
	    grpc.invoke = invoke_1.invoke;
	    grpc.unary = unary_1.unary;
	})(grpc = exports.grpc || (exports.grpc = {}));

	});

	unwrapExports(dist);
	var dist_1 = dist.grpc;

	// file: rpc.proto

	var grpc = dist.grpc;

	var AergoRPCService = function () {
	  function AergoRPCService() {}

	  AergoRPCService.serviceName = "types.AergoRPCService";
	  return AergoRPCService;
	}();

	AergoRPCService.NodeState = {
	  methodName: "NodeState",
	  service: AergoRPCService,
	  requestStream: false,
	  responseStream: false,
	  requestType: rpc_pb.SingleBytes,
	  responseType: rpc_pb.SingleBytes
	};
	AergoRPCService.Blockchain = {
	  methodName: "Blockchain",
	  service: AergoRPCService,
	  requestStream: false,
	  responseStream: false,
	  requestType: rpc_pb.Empty,
	  responseType: rpc_pb.BlockchainStatus
	};
	AergoRPCService.ListBlockHeaders = {
	  methodName: "ListBlockHeaders",
	  service: AergoRPCService,
	  requestStream: false,
	  responseStream: false,
	  requestType: rpc_pb.ListParams,
	  responseType: rpc_pb.BlockHeaderList
	};
	AergoRPCService.ListBlockStream = {
	  methodName: "ListBlockStream",
	  service: AergoRPCService,
	  requestStream: false,
	  responseStream: true,
	  requestType: rpc_pb.Empty,
	  responseType: blockchain_pb.Block
	};
	AergoRPCService.GetBlock = {
	  methodName: "GetBlock",
	  service: AergoRPCService,
	  requestStream: false,
	  responseStream: false,
	  requestType: rpc_pb.SingleBytes,
	  responseType: blockchain_pb.Block
	};
	AergoRPCService.GetTX = {
	  methodName: "GetTX",
	  service: AergoRPCService,
	  requestStream: false,
	  responseStream: false,
	  requestType: rpc_pb.SingleBytes,
	  responseType: blockchain_pb.Tx
	};
	AergoRPCService.GetBlockTX = {
	  methodName: "GetBlockTX",
	  service: AergoRPCService,
	  requestStream: false,
	  responseStream: false,
	  requestType: rpc_pb.SingleBytes,
	  responseType: blockchain_pb.TxInBlock
	};
	AergoRPCService.GetReceipt = {
	  methodName: "GetReceipt",
	  service: AergoRPCService,
	  requestStream: false,
	  responseStream: false,
	  requestType: rpc_pb.SingleBytes,
	  responseType: blockchain_pb.Receipt
	};
	AergoRPCService.GetABI = {
	  methodName: "GetABI",
	  service: AergoRPCService,
	  requestStream: false,
	  responseStream: false,
	  requestType: rpc_pb.SingleBytes,
	  responseType: blockchain_pb.ABI
	};
	AergoRPCService.SendTX = {
	  methodName: "SendTX",
	  service: AergoRPCService,
	  requestStream: false,
	  responseStream: false,
	  requestType: blockchain_pb.Tx,
	  responseType: rpc_pb.CommitResult
	};
	AergoRPCService.CommitTX = {
	  methodName: "CommitTX",
	  service: AergoRPCService,
	  requestStream: false,
	  responseStream: false,
	  requestType: blockchain_pb.TxList,
	  responseType: rpc_pb.CommitResultList
	};
	AergoRPCService.GetState = {
	  methodName: "GetState",
	  service: AergoRPCService,
	  requestStream: false,
	  responseStream: false,
	  requestType: rpc_pb.SingleBytes,
	  responseType: blockchain_pb.State
	};
	AergoRPCService.GetStateAndProof = {
	  methodName: "GetStateAndProof",
	  service: AergoRPCService,
	  requestStream: false,
	  responseStream: false,
	  requestType: rpc_pb.AccountAndRoot,
	  responseType: blockchain_pb.StateProof
	};
	AergoRPCService.CreateAccount = {
	  methodName: "CreateAccount",
	  service: AergoRPCService,
	  requestStream: false,
	  responseStream: false,
	  requestType: rpc_pb.Personal,
	  responseType: account_pb.Account
	};
	AergoRPCService.GetAccounts = {
	  methodName: "GetAccounts",
	  service: AergoRPCService,
	  requestStream: false,
	  responseStream: false,
	  requestType: rpc_pb.Empty,
	  responseType: account_pb.AccountList
	};
	AergoRPCService.LockAccount = {
	  methodName: "LockAccount",
	  service: AergoRPCService,
	  requestStream: false,
	  responseStream: false,
	  requestType: rpc_pb.Personal,
	  responseType: account_pb.Account
	};
	AergoRPCService.UnlockAccount = {
	  methodName: "UnlockAccount",
	  service: AergoRPCService,
	  requestStream: false,
	  responseStream: false,
	  requestType: rpc_pb.Personal,
	  responseType: account_pb.Account
	};
	AergoRPCService.ImportAccount = {
	  methodName: "ImportAccount",
	  service: AergoRPCService,
	  requestStream: false,
	  responseStream: false,
	  requestType: rpc_pb.ImportFormat,
	  responseType: account_pb.Account
	};
	AergoRPCService.ExportAccount = {
	  methodName: "ExportAccount",
	  service: AergoRPCService,
	  requestStream: false,
	  responseStream: false,
	  requestType: rpc_pb.Personal,
	  responseType: rpc_pb.SingleBytes
	};
	AergoRPCService.SignTX = {
	  methodName: "SignTX",
	  service: AergoRPCService,
	  requestStream: false,
	  responseStream: false,
	  requestType: blockchain_pb.Tx,
	  responseType: blockchain_pb.Tx
	};
	AergoRPCService.VerifyTX = {
	  methodName: "VerifyTX",
	  service: AergoRPCService,
	  requestStream: false,
	  responseStream: false,
	  requestType: blockchain_pb.Tx,
	  responseType: rpc_pb.VerifyResult
	};
	AergoRPCService.QueryContract = {
	  methodName: "QueryContract",
	  service: AergoRPCService,
	  requestStream: false,
	  responseStream: false,
	  requestType: blockchain_pb.Query,
	  responseType: rpc_pb.SingleBytes
	};
	AergoRPCService.GetPeers = {
	  methodName: "GetPeers",
	  service: AergoRPCService,
	  requestStream: false,
	  responseStream: false,
	  requestType: rpc_pb.Empty,
	  responseType: rpc_pb.PeerList
	};
	AergoRPCService.GetVotes = {
	  methodName: "GetVotes",
	  service: AergoRPCService,
	  requestStream: false,
	  responseStream: false,
	  requestType: rpc_pb.SingleBytes,
	  responseType: rpc_pb.VoteList
	};
	AergoRPCService.GetStaking = {
	  methodName: "GetStaking",
	  service: AergoRPCService,
	  requestStream: false,
	  responseStream: false,
	  requestType: rpc_pb.SingleBytes,
	  responseType: rpc_pb.Staking
	};

	function AergoRPCServiceClient(serviceHost, options) {
	  this.serviceHost = serviceHost;
	  this.options = options || {};
	}

	AergoRPCServiceClient.prototype.nodeState = function nodeState(requestMessage, metadata, callback) {
	  if (arguments.length === 2) {
	    callback = arguments[1];
	  }

	  grpc.unary(AergoRPCService.NodeState, {
	    request: requestMessage,
	    host: this.serviceHost,
	    metadata: metadata,
	    transport: this.options.transport,
	    debug: this.options.debug,
	    onEnd: function onEnd(response) {
	      if (callback) {
	        if (response.status !== grpc.Code.OK) {
	          callback(Object.assign(new Error(response.statusMessage), {
	            code: response.status,
	            metadata: response.trailers
	          }), null);
	        } else {
	          callback(null, response.message);
	        }
	      }
	    }
	  });
	};

	AergoRPCServiceClient.prototype.blockchain = function blockchain(requestMessage, metadata, callback) {
	  if (arguments.length === 2) {
	    callback = arguments[1];
	  }

	  grpc.unary(AergoRPCService.Blockchain, {
	    request: requestMessage,
	    host: this.serviceHost,
	    metadata: metadata,
	    transport: this.options.transport,
	    debug: this.options.debug,
	    onEnd: function onEnd(response) {
	      if (callback) {
	        if (response.status !== grpc.Code.OK) {
	          callback(Object.assign(new Error(response.statusMessage), {
	            code: response.status,
	            metadata: response.trailers
	          }), null);
	        } else {
	          callback(null, response.message);
	        }
	      }
	    }
	  });
	};

	AergoRPCServiceClient.prototype.listBlockHeaders = function listBlockHeaders(requestMessage, metadata, callback) {
	  if (arguments.length === 2) {
	    callback = arguments[1];
	  }

	  grpc.unary(AergoRPCService.ListBlockHeaders, {
	    request: requestMessage,
	    host: this.serviceHost,
	    metadata: metadata,
	    transport: this.options.transport,
	    debug: this.options.debug,
	    onEnd: function onEnd(response) {
	      if (callback) {
	        if (response.status !== grpc.Code.OK) {
	          callback(Object.assign(new Error(response.statusMessage), {
	            code: response.status,
	            metadata: response.trailers
	          }), null);
	        } else {
	          callback(null, response.message);
	        }
	      }
	    }
	  });
	};

	AergoRPCServiceClient.prototype.listBlockStream = function listBlockStream(requestMessage, metadata) {
	  var listeners = {
	    data: [],
	    end: [],
	    status: []
	  };
	  var client = grpc.invoke(AergoRPCService.ListBlockStream, {
	    request: requestMessage,
	    host: this.serviceHost,
	    metadata: metadata,
	    transport: this.options.transport,
	    debug: this.options.debug,
	    onMessage: function onMessage(responseMessage) {
	      listeners.data.forEach(function (handler) {
	        handler(responseMessage);
	      });
	    },
	    onEnd: function onEnd(status, statusMessage, trailers) {
	      listeners.end.forEach(function (handler) {
	        handler();
	      });
	      listeners.status.forEach(function (handler) {
	        handler({
	          code: status,
	          details: statusMessage,
	          metadata: trailers
	        });
	      });
	      listeners = null;
	    }
	  });
	  return {
	    on: function on(type, handler) {
	      listeners[type].push(handler);
	      return this;
	    },
	    cancel: function cancel() {
	      listeners = null;
	      client.close();
	    }
	  };
	};

	AergoRPCServiceClient.prototype.getBlock = function getBlock(requestMessage, metadata, callback) {
	  if (arguments.length === 2) {
	    callback = arguments[1];
	  }

	  grpc.unary(AergoRPCService.GetBlock, {
	    request: requestMessage,
	    host: this.serviceHost,
	    metadata: metadata,
	    transport: this.options.transport,
	    debug: this.options.debug,
	    onEnd: function onEnd(response) {
	      if (callback) {
	        if (response.status !== grpc.Code.OK) {
	          callback(Object.assign(new Error(response.statusMessage), {
	            code: response.status,
	            metadata: response.trailers
	          }), null);
	        } else {
	          callback(null, response.message);
	        }
	      }
	    }
	  });
	};

	AergoRPCServiceClient.prototype.getTX = function getTX(requestMessage, metadata, callback) {
	  if (arguments.length === 2) {
	    callback = arguments[1];
	  }

	  grpc.unary(AergoRPCService.GetTX, {
	    request: requestMessage,
	    host: this.serviceHost,
	    metadata: metadata,
	    transport: this.options.transport,
	    debug: this.options.debug,
	    onEnd: function onEnd(response) {
	      if (callback) {
	        if (response.status !== grpc.Code.OK) {
	          callback(Object.assign(new Error(response.statusMessage), {
	            code: response.status,
	            metadata: response.trailers
	          }), null);
	        } else {
	          callback(null, response.message);
	        }
	      }
	    }
	  });
	};

	AergoRPCServiceClient.prototype.getBlockTX = function getBlockTX(requestMessage, metadata, callback) {
	  if (arguments.length === 2) {
	    callback = arguments[1];
	  }

	  grpc.unary(AergoRPCService.GetBlockTX, {
	    request: requestMessage,
	    host: this.serviceHost,
	    metadata: metadata,
	    transport: this.options.transport,
	    debug: this.options.debug,
	    onEnd: function onEnd(response) {
	      if (callback) {
	        if (response.status !== grpc.Code.OK) {
	          callback(Object.assign(new Error(response.statusMessage), {
	            code: response.status,
	            metadata: response.trailers
	          }), null);
	        } else {
	          callback(null, response.message);
	        }
	      }
	    }
	  });
	};

	AergoRPCServiceClient.prototype.getReceipt = function getReceipt(requestMessage, metadata, callback) {
	  if (arguments.length === 2) {
	    callback = arguments[1];
	  }

	  grpc.unary(AergoRPCService.GetReceipt, {
	    request: requestMessage,
	    host: this.serviceHost,
	    metadata: metadata,
	    transport: this.options.transport,
	    debug: this.options.debug,
	    onEnd: function onEnd(response) {
	      if (callback) {
	        if (response.status !== grpc.Code.OK) {
	          callback(Object.assign(new Error(response.statusMessage), {
	            code: response.status,
	            metadata: response.trailers
	          }), null);
	        } else {
	          callback(null, response.message);
	        }
	      }
	    }
	  });
	};

	AergoRPCServiceClient.prototype.getABI = function getABI(requestMessage, metadata, callback) {
	  if (arguments.length === 2) {
	    callback = arguments[1];
	  }

	  grpc.unary(AergoRPCService.GetABI, {
	    request: requestMessage,
	    host: this.serviceHost,
	    metadata: metadata,
	    transport: this.options.transport,
	    debug: this.options.debug,
	    onEnd: function onEnd(response) {
	      if (callback) {
	        if (response.status !== grpc.Code.OK) {
	          callback(Object.assign(new Error(response.statusMessage), {
	            code: response.status,
	            metadata: response.trailers
	          }), null);
	        } else {
	          callback(null, response.message);
	        }
	      }
	    }
	  });
	};

	AergoRPCServiceClient.prototype.sendTX = function sendTX(requestMessage, metadata, callback) {
	  if (arguments.length === 2) {
	    callback = arguments[1];
	  }

	  grpc.unary(AergoRPCService.SendTX, {
	    request: requestMessage,
	    host: this.serviceHost,
	    metadata: metadata,
	    transport: this.options.transport,
	    debug: this.options.debug,
	    onEnd: function onEnd(response) {
	      if (callback) {
	        if (response.status !== grpc.Code.OK) {
	          callback(Object.assign(new Error(response.statusMessage), {
	            code: response.status,
	            metadata: response.trailers
	          }), null);
	        } else {
	          callback(null, response.message);
	        }
	      }
	    }
	  });
	};

	AergoRPCServiceClient.prototype.commitTX = function commitTX(requestMessage, metadata, callback) {
	  if (arguments.length === 2) {
	    callback = arguments[1];
	  }

	  grpc.unary(AergoRPCService.CommitTX, {
	    request: requestMessage,
	    host: this.serviceHost,
	    metadata: metadata,
	    transport: this.options.transport,
	    debug: this.options.debug,
	    onEnd: function onEnd(response) {
	      if (callback) {
	        if (response.status !== grpc.Code.OK) {
	          callback(Object.assign(new Error(response.statusMessage), {
	            code: response.status,
	            metadata: response.trailers
	          }), null);
	        } else {
	          callback(null, response.message);
	        }
	      }
	    }
	  });
	};

	AergoRPCServiceClient.prototype.getState = function getState(requestMessage, metadata, callback) {
	  if (arguments.length === 2) {
	    callback = arguments[1];
	  }

	  grpc.unary(AergoRPCService.GetState, {
	    request: requestMessage,
	    host: this.serviceHost,
	    metadata: metadata,
	    transport: this.options.transport,
	    debug: this.options.debug,
	    onEnd: function onEnd(response) {
	      if (callback) {
	        if (response.status !== grpc.Code.OK) {
	          callback(Object.assign(new Error(response.statusMessage), {
	            code: response.status,
	            metadata: response.trailers
	          }), null);
	        } else {
	          callback(null, response.message);
	        }
	      }
	    }
	  });
	};

	AergoRPCServiceClient.prototype.getStateAndProof = function getStateAndProof(requestMessage, metadata, callback) {
	  if (arguments.length === 2) {
	    callback = arguments[1];
	  }

	  grpc.unary(AergoRPCService.GetStateAndProof, {
	    request: requestMessage,
	    host: this.serviceHost,
	    metadata: metadata,
	    transport: this.options.transport,
	    debug: this.options.debug,
	    onEnd: function onEnd(response) {
	      if (callback) {
	        if (response.status !== grpc.Code.OK) {
	          callback(Object.assign(new Error(response.statusMessage), {
	            code: response.status,
	            metadata: response.trailers
	          }), null);
	        } else {
	          callback(null, response.message);
	        }
	      }
	    }
	  });
	};

	AergoRPCServiceClient.prototype.createAccount = function createAccount(requestMessage, metadata, callback) {
	  if (arguments.length === 2) {
	    callback = arguments[1];
	  }

	  grpc.unary(AergoRPCService.CreateAccount, {
	    request: requestMessage,
	    host: this.serviceHost,
	    metadata: metadata,
	    transport: this.options.transport,
	    debug: this.options.debug,
	    onEnd: function onEnd(response) {
	      if (callback) {
	        if (response.status !== grpc.Code.OK) {
	          callback(Object.assign(new Error(response.statusMessage), {
	            code: response.status,
	            metadata: response.trailers
	          }), null);
	        } else {
	          callback(null, response.message);
	        }
	      }
	    }
	  });
	};

	AergoRPCServiceClient.prototype.getAccounts = function getAccounts(requestMessage, metadata, callback) {
	  if (arguments.length === 2) {
	    callback = arguments[1];
	  }

	  grpc.unary(AergoRPCService.GetAccounts, {
	    request: requestMessage,
	    host: this.serviceHost,
	    metadata: metadata,
	    transport: this.options.transport,
	    debug: this.options.debug,
	    onEnd: function onEnd(response) {
	      if (callback) {
	        if (response.status !== grpc.Code.OK) {
	          callback(Object.assign(new Error(response.statusMessage), {
	            code: response.status,
	            metadata: response.trailers
	          }), null);
	        } else {
	          callback(null, response.message);
	        }
	      }
	    }
	  });
	};

	AergoRPCServiceClient.prototype.lockAccount = function lockAccount(requestMessage, metadata, callback) {
	  if (arguments.length === 2) {
	    callback = arguments[1];
	  }

	  grpc.unary(AergoRPCService.LockAccount, {
	    request: requestMessage,
	    host: this.serviceHost,
	    metadata: metadata,
	    transport: this.options.transport,
	    debug: this.options.debug,
	    onEnd: function onEnd(response) {
	      if (callback) {
	        if (response.status !== grpc.Code.OK) {
	          callback(Object.assign(new Error(response.statusMessage), {
	            code: response.status,
	            metadata: response.trailers
	          }), null);
	        } else {
	          callback(null, response.message);
	        }
	      }
	    }
	  });
	};

	AergoRPCServiceClient.prototype.unlockAccount = function unlockAccount(requestMessage, metadata, callback) {
	  if (arguments.length === 2) {
	    callback = arguments[1];
	  }

	  grpc.unary(AergoRPCService.UnlockAccount, {
	    request: requestMessage,
	    host: this.serviceHost,
	    metadata: metadata,
	    transport: this.options.transport,
	    debug: this.options.debug,
	    onEnd: function onEnd(response) {
	      if (callback) {
	        if (response.status !== grpc.Code.OK) {
	          callback(Object.assign(new Error(response.statusMessage), {
	            code: response.status,
	            metadata: response.trailers
	          }), null);
	        } else {
	          callback(null, response.message);
	        }
	      }
	    }
	  });
	};

	AergoRPCServiceClient.prototype.importAccount = function importAccount(requestMessage, metadata, callback) {
	  if (arguments.length === 2) {
	    callback = arguments[1];
	  }

	  grpc.unary(AergoRPCService.ImportAccount, {
	    request: requestMessage,
	    host: this.serviceHost,
	    metadata: metadata,
	    transport: this.options.transport,
	    debug: this.options.debug,
	    onEnd: function onEnd(response) {
	      if (callback) {
	        if (response.status !== grpc.Code.OK) {
	          callback(Object.assign(new Error(response.statusMessage), {
	            code: response.status,
	            metadata: response.trailers
	          }), null);
	        } else {
	          callback(null, response.message);
	        }
	      }
	    }
	  });
	};

	AergoRPCServiceClient.prototype.exportAccount = function exportAccount(requestMessage, metadata, callback) {
	  if (arguments.length === 2) {
	    callback = arguments[1];
	  }

	  grpc.unary(AergoRPCService.ExportAccount, {
	    request: requestMessage,
	    host: this.serviceHost,
	    metadata: metadata,
	    transport: this.options.transport,
	    debug: this.options.debug,
	    onEnd: function onEnd(response) {
	      if (callback) {
	        if (response.status !== grpc.Code.OK) {
	          callback(Object.assign(new Error(response.statusMessage), {
	            code: response.status,
	            metadata: response.trailers
	          }), null);
	        } else {
	          callback(null, response.message);
	        }
	      }
	    }
	  });
	};

	AergoRPCServiceClient.prototype.signTX = function signTX(requestMessage, metadata, callback) {
	  if (arguments.length === 2) {
	    callback = arguments[1];
	  }

	  grpc.unary(AergoRPCService.SignTX, {
	    request: requestMessage,
	    host: this.serviceHost,
	    metadata: metadata,
	    transport: this.options.transport,
	    debug: this.options.debug,
	    onEnd: function onEnd(response) {
	      if (callback) {
	        if (response.status !== grpc.Code.OK) {
	          callback(Object.assign(new Error(response.statusMessage), {
	            code: response.status,
	            metadata: response.trailers
	          }), null);
	        } else {
	          callback(null, response.message);
	        }
	      }
	    }
	  });
	};

	AergoRPCServiceClient.prototype.verifyTX = function verifyTX(requestMessage, metadata, callback) {
	  if (arguments.length === 2) {
	    callback = arguments[1];
	  }

	  grpc.unary(AergoRPCService.VerifyTX, {
	    request: requestMessage,
	    host: this.serviceHost,
	    metadata: metadata,
	    transport: this.options.transport,
	    debug: this.options.debug,
	    onEnd: function onEnd(response) {
	      if (callback) {
	        if (response.status !== grpc.Code.OK) {
	          callback(Object.assign(new Error(response.statusMessage), {
	            code: response.status,
	            metadata: response.trailers
	          }), null);
	        } else {
	          callback(null, response.message);
	        }
	      }
	    }
	  });
	};

	AergoRPCServiceClient.prototype.queryContract = function queryContract(requestMessage, metadata, callback) {
	  if (arguments.length === 2) {
	    callback = arguments[1];
	  }

	  grpc.unary(AergoRPCService.QueryContract, {
	    request: requestMessage,
	    host: this.serviceHost,
	    metadata: metadata,
	    transport: this.options.transport,
	    debug: this.options.debug,
	    onEnd: function onEnd(response) {
	      if (callback) {
	        if (response.status !== grpc.Code.OK) {
	          callback(Object.assign(new Error(response.statusMessage), {
	            code: response.status,
	            metadata: response.trailers
	          }), null);
	        } else {
	          callback(null, response.message);
	        }
	      }
	    }
	  });
	};

	AergoRPCServiceClient.prototype.getPeers = function getPeers(requestMessage, metadata, callback) {
	  if (arguments.length === 2) {
	    callback = arguments[1];
	  }

	  grpc.unary(AergoRPCService.GetPeers, {
	    request: requestMessage,
	    host: this.serviceHost,
	    metadata: metadata,
	    transport: this.options.transport,
	    debug: this.options.debug,
	    onEnd: function onEnd(response) {
	      if (callback) {
	        if (response.status !== grpc.Code.OK) {
	          callback(Object.assign(new Error(response.statusMessage), {
	            code: response.status,
	            metadata: response.trailers
	          }), null);
	        } else {
	          callback(null, response.message);
	        }
	      }
	    }
	  });
	};

	AergoRPCServiceClient.prototype.getVotes = function getVotes(requestMessage, metadata, callback) {
	  if (arguments.length === 2) {
	    callback = arguments[1];
	  }

	  grpc.unary(AergoRPCService.GetVotes, {
	    request: requestMessage,
	    host: this.serviceHost,
	    metadata: metadata,
	    transport: this.options.transport,
	    debug: this.options.debug,
	    onEnd: function onEnd(response) {
	      if (callback) {
	        if (response.status !== grpc.Code.OK) {
	          callback(Object.assign(new Error(response.statusMessage), {
	            code: response.status,
	            metadata: response.trailers
	          }), null);
	        } else {
	          callback(null, response.message);
	        }
	      }
	    }
	  });
	};

	AergoRPCServiceClient.prototype.getStaking = function getStaking(requestMessage, metadata, callback) {
	  if (arguments.length === 2) {
	    callback = arguments[1];
	  }

	  grpc.unary(AergoRPCService.GetStaking, {
	    request: requestMessage,
	    host: this.serviceHost,
	    metadata: metadata,
	    transport: this.options.transport,
	    debug: this.options.debug,
	    onEnd: function onEnd(response) {
	      if (callback) {
	        if (response.status !== grpc.Code.OK) {
	          callback(Object.assign(new Error(response.statusMessage), {
	            code: response.status,
	            metadata: response.trailers
	          }), null);
	        } else {
	          callback(null, response.message);
	        }
	      }
	    }
	  });
	};

	var AergoRPCServiceClient_1 = AergoRPCServiceClient;

	/**
	 * Provider for GRPC-WEB connections over HTTP.
	 * This is compatible with both Web browser and Node.js environments.
	 * Note that the transport is considerably slower than over standard GRPC.
	 */

	var GrpcWebProvider =
	/*#__PURE__*/
	function (_Provider) {
	  _inherits(GrpcWebProvider, _Provider);

	  /**
	   * .. code-block:: javascript
	   * 
	   *     import { GrpcWebProvider } from '@herajs/client';
	   *     const provider = new GrpcWebProvider({url: 'http://localhost:7845'});
	   * 
	   * @param {object} config
	   * @param {string} config.url URL to connect to (including https:// or http:// protocol)
	   */
	  function GrpcWebProvider(config) {
	    var _this;

	    _classCallCheck(this, GrpcWebProvider);

	    _this = _possibleConstructorReturn(this, _getPrototypeOf(GrpcWebProvider).call(this, config));
	    var options = {
	      transport: dist_1.WebsocketTransportFactory
	    };
	    _this.client = new AergoRPCServiceClient_1(_this.config.url, options);
	    return _this;
	  }

	  _createClass(GrpcWebProvider, [{
	    key: "defaultConfig",
	    get: function get() {
	      return {
	        url: 'http://localhost:7845'
	      };
	    }
	  }]);

	  return GrpcWebProvider;
	}(Provider);

	/**
	 * Data structure for contract function calls.
	 * You should not need to build these yourself, they are returned from contract instance functions and
	 * can be passed to the client.
	 */
	class FunctionCall {
	    constructor(contractInstance, definition, args) {
	        this.definition = definition;
	        this.args = args;
	        this.contractInstance = contractInstance;
	    }
	    /**
	     * Generate transaction object that can be passed to :meth:`aergoClient.accounts.sendTrasaction`
	     *
	     * .. code-block:: javascript
	     *
	     *     import { Contract } from '@herajs/client';
	     *     const contract = Contract.fromAbi(abi).atAddress(address);
	     *     const functionCall = contract.someAbiFunction();
	     *     aergo.accounts.sendTransaction(functionCall.asTransaction({
	     *         from: myAddress
	     *     })).then(result => {
	     *         console.log(result);
	     *     })
	     * @param {obj} extraArgs
	     * @param {string} extraArgs.from set from address for the transaction
	     * @return {obj} transaction data
	     */
	    asTransaction(extraArgs) {
	        const payload = JSON.stringify({
	            Name: this.definition.name,
	            Args: this.args
	        });
	        if (!this.contractInstance.address)
	            throw new Error('Set address of contract before creating transactions');
	        if (typeof extraArgs === 'undefined' || !extraArgs.from || extraArgs.from.length === 0) {
	            throw new Error('Missing required transaction parameter \'from\'. Call with asTransaction({from: ...})');
	        }
	        return Object.assign({ to: this.contractInstance.address, amount: 0, payload }, extraArgs);
	    }
	    /**
	     * Generate query info that can be passed to the API.
	     * You usually do not need to call this function yourself, :meth:`AergoClient.queryContract` takes care of that.
	     *
	     * .. code-block:: javascript
	     *
	     *     import { Contract } from '@herajs/client';
	     *     const contract = Contract.fromAbi(abi).atAddress(address);
	     *     const functionCall = contract.someAbiFunction();
	     *     aergo.queryContract(functionCall).then(result => {
	     *         console.log(result);
	     *     })
	     *
	     * @return {obj} queryInfo data
	     */
	    asQueryInfo() {
	        return {
	            Name: this.definition.name,
	            Args: this.args
	        };
	    }
	}
	/**
	 * Smart contract interface.
	 * You usually instantiante this class by using one of the static methods.
	 * Most of the instance methods return the contract so they can be chained.
	 * When an ABI is loaded, its functions will be added to the instance and can be called directly.
	 * ABI functions return `FunctionCall` objects that can be queried or called.
	 *
	 * .. code-block:: javascript
	 *
	 *     import { Contract } from '@herajs/client';
	 *     const contract = Contract.fromAbi(abi).atAddress(address);
	 *     aergo.queryContract(contract.someAbiFunction()).then(result => {
	 *         console.log(result);
	 *     })
	 *
	 */
	class Contract {
	    constructor(data) {
	        Object.assign(this, data);
	        this.functions = {};
	        // This class acts as a proxy that passes ABI method calls
	        return new Proxy(this, {
	            get(obj, field) {
	                if (field in obj)
	                    return obj[field];
	                if (field in obj.functions)
	                    return obj.functions[field];
	                return undefined;
	            }
	        });
	    }
	    /**
	     * Create contract instance from code
	     * @param {string} bs58checkCode base58-check encoded code
	     * @return {Contract} contract instance
	     */
	    static fromCode(bs58checkCode) {
	        const decoded = Contract.decodeCode(bs58checkCode);
	        return new Contract({
	            code: decoded
	        });
	    }
	    /**
	     * Create contract instance and set address
	     * @param {Address} address
	     * @return {Contract} contract instance
	     */
	    static atAddress(address) {
	        const contract = new Contract({});
	        contract.setAddress(address);
	        return contract;
	    }
	    /**
	     * Create contract instance from ABI
	     * @param {obj} abi parsed JSON ABI
	     * @return {Contract} contract instance
	     */
	    static fromAbi(abi) {
	        const contract = new Contract({});
	        contract.loadAbi(abi);
	        return contract;
	    }
	    /**
	     * Set address of contract instance
	     * @param {Address|string} address
	     * @return {Contract} contract instance
	     */
	    setAddress(address) {
	        this.address = new Address(address);
	        return this;
	    }
	    /**
	     * Load contract ABI
	     * @param {obj} abi parsed JSON ABI
	     * @return {Contract} contract instance
	     */
	    loadAbi(abi) {
	        for (const definition of abi.functions) {
	            this.functions[definition.name] = (...args) => new FunctionCall(this, definition, args);
	        }
	        return this;
	    }
	    /**
	     * Return contract code as payload for transaction
	     * @return {Buffer} a byte buffer
	     */
	    asPayload() {
	        if (!this.code || !this.code.length) {
	            throw new Error('Code is required to generate payload');
	        }
	        // First 4 bytes are the length
	        return Buffer.concat([Buffer.from(fromNumber(4 + this.code.length, 4)), this.code]);
	    }
	    static encodeCode(byteArray) {
	        const buf = Buffer.from([ADDRESS_PREFIXES.CONTRACT, ...byteArray]);
	        return bs58check.encode(buf);
	    }
	    static decodeCode(bs58checkCode) {
	        return bs58check.decode(bs58checkCode).slice(1);
	        //return bs58.decode(bs58checkCode);
	    }
	}

	AergoClient.prototype.target = 'web';
	AergoClient.prototype.defaultProvider = () => {
	    return new GrpcWebProvider();
	};

	exports.AergoClient = AergoClient;
	exports.GrpcWebProvider = GrpcWebProvider;
	exports.constants = constants;
	exports.Address = Address;
	exports.Contract = Contract;
	exports.default = AergoClient;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
