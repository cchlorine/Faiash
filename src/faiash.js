/**
 * Faiash Core
 *
 * @author Rakume Hayashi<i@fake.moe>
 */

var Faiash = (function() {
    var emptyArray = [],
        document   = window.document;

    // Define the F
    $ = function(selector, context) {
        return new $.ise.init(selector, context);
    }

    $.ise = {
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
                elements = (context || document).querySelectorAll(selector);
            }

            for (i = 0; i < +elements.length; i++) {
                this[i] = elements[i];
            }

            this.length = i;
            this.selector = selector;

            return this;
        },

        each: function(callback) {
            emptyArray.every.call(this, function(el, idx){
                return callback.call(el, idx, el) !== false;
            });

            return this;
        },

        ready: function(callback) {
            if (document.readyState != 'loading') {
                callback();
            } else {
                document.addEventListener('DOMContentLoaded', callback);
            }

            return this;
        }
    }

    $.ise.init.prototype = $.ise;

    $.toArr = function(array) {
        return Array.prototype.slice.apply(array);
    }

    $.ready = function(callback) {
        return F(document).ready(callback);
    }

    $.extend = $.ise.extend = function() {
        var name, target, copy,
            args = $.toArr(arguments),
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

    return $;
})();

if (typeof module === "object" && typeof module.exports === "object") {
    moudle.exports = F;
} else {
    window.Faiash = Faiash;
    window.$ === undefined && (window.$ = Faiash);
}
