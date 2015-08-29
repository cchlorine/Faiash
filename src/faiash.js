/**
 * Faiash Core
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

        forEach: emptyArray.forEach,
        reduce: emptyArray.reduce,
        indexOf: emptyArray.indexOf,

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
            this.forEach(function(el, idx) {
                callback(el, idx);
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
        var name, target, copy,
            args = F.toArr(arguments),
            i = 0, deep = false, tmp = {};

        // No args
        if (args.length < 1) {
            return;
        }

        if (typeof args[0] === 'boolean') {
            deep = args.shift();
        }

        if (1 === args.length) {
            target = this;
        } else {
            target = args.shift();
        }

        if (typeof target !== 'object' && typeof target !== 'function') {
            target = {};
        }

        for (; i < args.length; i++) {
            options = args[i];

            if (options === null) {
              continue;
            }

            for (name in options) {
                src = target[name];
                copy = options[name];

                // Prevent never-ending loop
                if (target === copy) {
                    continue;
                }

                if (deep && copy && typeof copy === 'object') {
                    $.extend(deep, src, copy);
                } else if (copy !== undefined) {
                    target[name] = copy;
                }
            }
        }

        return target;
    }

    return F;
})();

if (typeof module === "object" && typeof module.exports === "object") {
    moudle.exports = F;
} else {
    window.Faiash = Faiash;
    window.$ === undefined && (window.$ = Faiash);
}
