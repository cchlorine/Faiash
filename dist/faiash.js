/**
 * Faiash Core
 *
 * @author Rakume Hayashi<i@fake.moe>
 */

var Faiash = (function() {
    var emptyArray = [], document = window.document

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

/**
 * Ajax
 *
 * @author Rakume Hayashi<i@fake.moe>
 */

;(function($) {
    $.ajax = function() {
        // Init the vars
        var req, url, method, data, upload,
            progress, dc, callback, error,
            args = $.toArr(arguments);

        // Get the method if it is in the arguments
        if (args[0].match(/^get|post|put|delete$/i)) {
            method = args.shift();
        }

        // Set the url
        url = args.shift();

        if (!url) {
            return false;
        }

        // Get the data
        if (typeof[0] === 'string') {
            data = args.shift();
        } else if (typeof[0] === 'object' && args[0].constructor === FormData) {
            upload = true;
            data = args.shift();
        } else if (typeof args[0] === 'object') { // When array
            dc = args.shift();

            data = [];

            for (var o in dc) {
                data.push(i + '=' + encodeURIComponent(o));
            }

            data = data.join('&');
        } else { // When nothing
            data = null;
        }

        // Set the method
        if (!method) {
            method = data ? 'POST' : 'GET';
        }

        // Get the callback
        if (typeof args[0] === 'function') {
            callback = args.shift();
        }

        // Get the error
        if (typeof args[0] === 'function') {
            error = args.shift();
        }

        // Get progress
        if (typeof args[0] === 'function' && upload === true) {
            progress = args.shift();
        }

        // Open a XHR
        req = new XMLHttpRequest();
        req.open(method, url, true);

        if (progress) {
            req.upload.onprogress = function(e) {
                progress(e.loaded / e.total);
            }
        }

        // When is POST
        (!data || upload) || req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        if (callback || error) {
            req.onreadystatechange = function() {
                if (this.readyState === 4) {
                    if (this.status >= 200 && this.status < 400) {
                        if ((this.getResponseHeader('Content-Type') || '').match(/json/)) {
                            if (typeof callback === 'function') {
                                callback(JSON.parse(req.responseText || null));
                            }
                        } else if ((this.getResponseHeader('Content-Type') || '').match(/xml/)) {
                            if (typeof callback === 'function') {
                                callback(req.responseXML);
                            }
                        } else {
                            if (typeof callback === 'function') {
                                callback(req.responseText); // Callback to the function
                            }
                        }
                    } else if (typeof error === 'function') {
                        error(this.status); // Error
                    }
                }
            }
        }

      req.send(data || '');
      return req; // Return the detail
    }

    $.get = function() {
        var args = $.toArr(arguments);
        args.unshift('GET');

        return this.ajax.apply(this, args);
    }

    $.post = function() {
        var args = $.toArr(arguments);
        args.unshift('POST');

        return this.ajax.apply(this, args);
    }
})(Faiash);

/**
 * Dom
 *
 * @author Rakume Hayashi<i@fake.moe>
 */

;(function($) {
    var emptyArray = [];

    $.ise.extend({
        addClass: function(name) {
            if (!name) {
                return this;
            }

            return document.body.classList ?
                this.each(function() {
                    this.classList.add(name);
                }) :
                this.each(function() {
                    this.className += ' ' + name;
                });
        },

        removeClass: function(name) {
            if (!name) {
                return this;
            }

            return document.body.classList ?
                this.each(function() {
                    this.classList.remove(name);
                }) :
                this.each(function() {
                    this.className = this.className.replace(new RegExp('(^|\\b)' + name.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
                });
        },

        hasClass: function(name) {
            if (!name) {
                return false;
            }

            if (document.body.classList) {
                this.each(function() {
                    check = this.classList.contains(name);
                });
            } else {
                this.each(function() {
                    check = new RegExp('(^|)' + name + '(|$)', 'gi').test(this.className);
                });
            }

            if (check) {
                return true;
            } else {
                return false;
            }
        },

        toggleClass: function(name) {
            if (!name) {
                return this;
            }

            return document.body.classList ?
                this.each(function() {
                    this.classList.toggle(name);
                }) :
                this.each(function() {
                    if (this.className.indexOf(v) >= 0) {
                        this.className = this.className.replace(new RegExp('(^|\\b)' + name.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
                    } else {
                        this.className += ' ' + name;
                    }
                });
        },

        attr: function(name, value) {
            return value ?
                  this.each(function() {
                      this.setAttribute(name, value);
                  }) :
                  this[0].getAttribute(name);
        },

        css: function(value) {
            if (value.substr(-1) == ';') {
                value = value.substr(0, v.length - 1);
            }

            return value ?
                this.each(function() {
                    this.style.cssText += (';' + value);
                }) :
                this[0].style.cssText;
        },

        html: function(value) {
            return value ?
                this.each(function() {
                    this.innerHTML = value;
                }) :
                this[0].innerHTML;
        },

        val: function(value) {
            return value ?
                this.each(function() {
                    this.value = value;
                }) :
                this[0].value;
        },

        data: function(name, value) {
            var attrName = 'data-' + name.toLowerCase();

            return 0 in arguments ?
                  this.attr(attrName, value) :
                  this.attr(attrName);
        }
    });
})(Faiash);

/**
 * Event
 *
 * @author Rakume Hayashi<i@fake.moe>
 */

;(function($) {
    $.ise.on = function() {
        var args = $.toArr(arguments);

        if (typeof args[0] === 'string') {
            if (!args[0] || !args[1]) {
                return this;
            }

            this.each(function() {
                this.addEventListener(args[0], args[1], (args[2] ? args[2] : false));
            });
        } else if (typeof args[0] === 'object') {
            args.forEach(function(obj) {
                this.each(function() {
                    for (var event in obj) {
                        this.addEventListener(event, obj[event][1]);
                    }
                });
            });
        }

        return this;
    }

    $.ise.off = function() {
        var args = $.toArr(arguments);

        if (typeof args[0] === 'string') {
            this.each(function(el) {
                el.removeEventListener(args[0], args[1], args[2]);
            });
        }  else if (typeof args[0] === 'object' && args.length === 1) {
            args.forEach(function(obj) {
                this.each(function() {
                    for (var event in obj) {
                        this.removeEventListener(event, obj[event][1]);
                    }
                });
            });
        }

        return this;
    }
})(Faiash);
