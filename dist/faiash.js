(function() {

/**
 * Faiash Core
 *
 * @author Rakume Hayashi<i@fake.moe>
 */

// Define the Faiash
var Faiash = function(selector, context) {
    return new Faiash.ise.init(selector, context);
};

Faiash.ise = Faiash.prototype = {
    // Version of Faiash
    version: 0.1,
    constructor: Faiash,

    // Behaves like array
    push: [].push,
	sort: [].sort,
	splice: [].splice
};

var init = Faiash.ise.init = function(selector, context) {
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
        return [].push.call(this, selector);
    } else {
        selector = (context || document).querySelectorAll(selector);
    }

    for (i = 0; i < +selector.length; i++) {
        this[i] = selector[i];
    }

    this.length = i;
    return this;
}

init.prototype = Faiash.ise;

Faiash.extend = Faiash.ise.extend = function() {
    var copy;

    // No arguments
    if (arguments.length < 1) {
        return;
    }

    // There are an array outside the object
    for (var i = 0; i < arguments.length; i++) {
        for (var name in arguments[i]) {
            copy = arguments[i][name];

            // Prevent never-ending loop
            if (this === copy) {
                continue;
            }

            // Don't bring in undefined values
            if (copy !== undefined) {
                this[name] = copy;
            }
        }
    }

    return this;
}

Faiash.extend({
    toArr: function(r) {
        return Array.prototype.slice.apply(r);
    },

    each: function(arr, func) {
        var forEach = Function.prototype.call.bind(Array.prototype.forEach);
        return forEach(arr, func);
    },

    ready: function(callback) {
        return Faiash(document).ready(callback);
    }
});

Faiash.ise.extend({
    each: function(func) {
        return Faiash.each(this, func);
    },

    ready: function(callback) {
        if (this[0].readyState != 'loading') {
            callback();
        } else {
            this[0].addEventListener('DOMContentLoaded', callback);
        }

        return this;
    }
});

/**
 * Ajax
 *
 * @author Rakume Hayashi<i@fake.moe>
 */

// Set the cached array
var ajaxcached = [];

Faiash.extend({
    ajax: function() {
        // Init the vars
        var req, url, method,
            data, dc, callback, error,
            args = Faiash.toArr(arguments);

        // Get the method if it is in the arguments
        if (args[0].match(/^put|get|post|delete$/i)) {
            method = args.shift();
        }

        // Set the url
        url = args.shift();

        if (!url) {
            return false;
        }

        // Get the data
        if (typeof args[0] === 'object') { // When array
            dc = args.shift();

            data = [];
            Faiash.each(dc, function(o, i) {
                // Need to urlencode it
                data.push(i + '=' + encodeURIComponent(o));
            });

            data = data.join('&');
        } else if (typeof[0] == 'string') { // When string
            data = args.shift();
        } else { // When nothing
            data = null;
        }

        // Set the method
        if (!method) {
            method = data ? 'POST' : 'GET';
        }

        // Get the callback
        if (typeof args[0] !== 'function') {
            callback = args.shift();
        }

        // Get the error
        if (typeof args[0] !== 'function') {
            error = args.shift();
        }

        // Open a XHR
        req = new XMLHttpRequest();
        req.open(method, url, true);

        // If chached run it
        if (ajaxcached[url] && method == 'GET' && typeof callback === 'function') {
            callback(ajaxcached[url]);
        }

        // When is POST
        method !== 'POST' || req.setRequestHeader('Content-Type','application/x-www-form-urlencoded');

        if (callback || error) {
            req.onreadystatechange = function() {
                if(this.readyState === 4) {
                    if(this.status >= 200 && this.status < 400) {
                        var _data = req.responseText;

                        // When the data is json
                        if ((this.getResponseHeader('Content-Type') || '').match(/json/)) {
                            _data = JSON.parse(data || null);
                        }

                        // Cache it
                        if (method === 'GET' && !data) {
                            ajaxcached[url] = _data;
                        }

                        if (typeof callback === 'function') {
                            callback(_data); // Callback to the function
                        }
                    } else if (typeof error === 'function') {
                        error(this.status); // Error
                    }
                }
            }
        }

        req.send(data || '');
        return req; // Return the detail
    },

    get: function() {
        return this.ajax('GET', arguments[0], arguments[1], arguments[2]);
    },

    post: function() {
        return this.ajax('POST', arguments[0], arguments[1], arguments[2]);
    },

    put: function() {
        return this.ajax('PUT', arguments[0], arguments[1], arguments[2]);
    },

    delete: function() {
        return this.ajax('DELETE', arguments[0], arguments[1], arguments[2]);
    }
});

/**
 * Event
 *
 * @author Rakume Hayashi<i@fake.moe>
 */

Faiash.ise.extend({
    on: function() {
        var args = $.toArr(arguments);

        if (typeof args[0] === 'string') {
            if (!args[0] || !args[1]) {
                return this;
            }

            this.each(function(el) {
                el.addEventListener(args[0], args[1], (args[2] ? args[2] : false));
            });
        } else if (typeof args[0] === 'object') {
            Faiash.each(args, function(obj) {
                this.each(function(el) {
                    for (var event in obj) {
                        if (object.hasOwnProperty(event)) {
                            el.addEventListener(event, obj[event][1]);
                        }
                    }
                });
            });
        }
    },

    off: function() {
        var args = $.toArr(arguments);

        if (typeof args[0] === 'string') {
            this.each(function(el) {
                el.removeEventListener(args[0], args[1], args[2]);
            });
        }  else if (typeof args[0] === 'object' && args.length === 1) {
            Faiash.each(args, function(obj) {
                this.each(function(el) {
                    for (var event in obj) {
                        if (object.hasOwnProperty(event)) {
                            el.removeEventListener(event, obj[event][1]);
                        }
                    }
                });
            });
        }
    }
});


if (typeof module === "object" && typeof module.exports === "object") {
    moudle.exports = Faiash;
} else {
    window.Faiash = Faiash;
    if (!window.$) {
        window.$ = Faiash;
    }
}
})();

/**
 * Attributes / Classes
 *
 * @author Rakume Hayashi<i@fake.moe>
 */

Faiash.ise.extend({
    addClass: function(v) {
        // Return false when v is '', void, undefined, false or when v is not a string
        if (!v || typeof v !== 'string') {
            return false;
        }

        if (document.body.classList) {
            this.each(function(el) {
                el.classList.add(v);
            });
        } else {
            this.each(function(el) {
                el.className += ' ' + v;
            });
        }

        return this;
    },

    removeClass: function(v) {
        // Return false when v is '', void, undefined, false or when v is not a string
        if (!v || typeof v !== 'string') {
            return false;
        }

        if (document.body.classList) {
            this.each(function(el) {
                el.classList.remove(v);
            });
        } else {
            this.each(function(el) {
                el.className = el.className.replace(new RegExp('(^|\\b)' + v.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
            });
        }

        return this;
    },

    hasClass: function(v) {
        var check;

        // Return false when v is '', void, undefined, false or when v is not a string
        if (!v || typeof v !== 'string') {
            return false;
        }

        if (document.body.classList) {
            this.each(function(el) {
                check = el.classList.contains(v);
            });
        } else {
            this.each(function(el) {
                check = new RegExp('(^|)' + cls + '(|$)', 'gi').test(el.className);
            });
        }

        if (check) {
            return true;
        } else {
            return false;
        }
    },

    toggleClass: function(v) {
        // Return false when v is '', void, undefined, false or when v is not a string
        if (!v || typeof v !== 'string') {
            return false;
        }

        if (document.body.classList) {
            this.each(function(el) {
                el.classList.toggle(v);
            });
        } else {
            this.each(function(el) {
                if (el.className.indexOf(v) >= 0) {
                    el.className = el.className.replace(new RegExp('(^|\\b)' + v.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
                } else {
                    el.className += ' ' + v;
                }
            });
        }
    }
});

/**
 * Attributes / Common
 *
 * @author Rakume Hayashi<i@fake.moe>
 */

Faiash.ise.extend({
    attr: function() {
        var args = $.toArr(arguments);

        if (args[1] && typeof args[0] === 'string') {
            this.each(function(el) {
                el.setAttribute(args[0], args[1]);
            });
        } else if (typeof args[0] === 'object'){
            Faiash.each(args, function(obj) {
                this.each(function(el) {
                    for (var attr in obj) {
                        if (object.hasOwnProperty(attr)) {
                            el.setAttribute(attr, obj[event][1]);
                        }
                    }
                });
            });
        } else {
            return this[0].getAttribute(args[0]);
        }

        return this;
    },

    css: function(v) {
        if (!v) {
            return this[0].style.cssText;
        }

        if (v.substr(-1) == ';') {
            v = v.substr(0, v.length - 1);
        }

        this.each(function(el) {
            el.style.cssText += (';' + v);
        });

        return this.style.cssText;
    },

    html: function(v) {
        if (!v) {
            return this;
        }

        this.innerHTML = v;
        return this;
    }
});
