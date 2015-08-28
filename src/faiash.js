/**
 * F Core
 *
 * @author Rakume Hayashi<i@fake.moe>
 */

var Faiash = (function() {
    var emptyArray = [],

    // Define the F
    F = function(selector, context) {
        return new F.ise.init(selector, context);
    }

    F.ise = F.prototype = {
        // Version of F
        version: 0.1,
        constructor: F,

        // Behaves like array
        push: emptyArray.push,
    	  sort: emptyArray.sort,
    	  splice: emptyArray.splice,

        init: function(selector, context) {
            // Return self when selector is "", void, undefined, false
            if (!selector) {
                return this;
            }

            // When context is string
            if (typeof context === 'string') {
                context = document.querySelector(context);
            }

            // When selector is an objcet
            if (typeof selector === 'object') {
                return emptyArray.push.call(this, selector);
            } else {
                selector = (context || document).querySelectorAll(selector);
            }

            for (i = 0; i < +selector.length; i++) {
                this[i] = selector[i];
            }

            this.length = i;
            return this;
        },

        each: function(callback) {
            emptyArray.every.call(this, function(el, idx) {
                return callback.call(el, el, idx) !== false;
            });

            return this;
        },

        ready: function(callback) {
            if (this[0].readyState != 'loading') {
                callback();
            } else {
                this[0].addEventListener('DOMContentLoaded', callback);
            }

            return this;
        }
    }

    F.ise.init.prototype = F.ise;

    F.toArr = function(array) {
        return Array.prototype.slice.apply(array);
    }

    F.ready = function(callback) {
        return F(document).ready(callback);
    }

    F.extend = F.ise.extend = function() {
        var args = F.toArr(arguments),
            tmp = {}, copy;

        // No args
        if (args.length < 1) {
            return;
        }

        for (var i = 0; i < args.length; i++) {
            for (var name in args[i]) {
                copy = args[i][name];

                // Prevent never-ending loop and undefined values
                if (this === copy || typeof(copy) === 'undefined') {
                    continue;
                }

                if (args.length === 1) {
                    this[name] = copy;
                    continue;
                }

                if (typeof(copy) === 'object') {
                    tmp[name] = $.each(tmp[name], copy, true);
                } else {
                    if (typeof(tmp[name]) !== 'undefined' && !args[2]) {
                      continue;
                    }

                    tmp[name] = copy;
                }
            }
        }

        if (args.length > 1) {
          return tmp;
        }

        return this;
    }

    return F;
})();

if (typeof module === "object" && typeof module.exports === "object") {
    moudle.exports = F;
} else {
    window.Faiash = Faiash;
    window.$ === undefined && (window.$ = Faiash);
}
