/**
 * F Core
 *
 * @author Rakume Hayashi<i@fake.moe>
 */

var Faiash = (function() {
    // Define the F
    var F = function(selector, context) {
        return new F.ise.init(selector, context);
    };

    F.ise = F.prototype = {
        // Version of F
        version: 0.1,
        constructor: F,

        // Behaves like array
        push: [].push,
    	  sort: [].sort,
    	  splice: [].splice
    };

    var init = F.ise.init = function(selector, context) {
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

    init.prototype = F.ise;

    F.toArr = function(r) {
        return Array.prototype.slice.apply(r);
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

    F.each = function(arr, func) {
        var forEach = Function.prototype.call.bind(Array.prototype.forEach);
        return forEach(arr, func);
    }

    F.ready = function(callback) {
        return F(document).ready(callback);
    }

    F.ise.each = function(callback) {
        return F.each(this, callback);
    }

    F.ise.ready = function(callback) {
        if (this[0].readyState != 'loading') {
            callback();
        } else {
            this[0].addEventListener('DOMContentLoaded', callback);
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

/**
 * Ajax
 *
 * @author Rakume Hayashi<i@fake.moe>
 */

;(function($) {
  $.extend({
      ajax: function() {
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
              $.each(dc, function(o, i) {
                  // Need to urlencode it
                  data.push(i + '=' + encodeURIComponent(o));
              });

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
                  if(this.readyState === 4) {
                      if(this.status >= 200 && this.status < 400) {
                          var _data = req.responseText;

                          // When the data is json
                          if ((this.getResponseHeader('Content-Type') || '').match(/json/)) {
                              _data = JSON.parse(_data || null);
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
        var args = $.toArr(arguments);
        args.unshift('GET');

        return this.ajax.apply(this, args);
      },

      post: function() {
          var args = $.toArr(arguments);
          args.unshift('POST');

          return this.ajax.apply(this, args);
      }
  });
})(Faiash);

/**
 * Dom
 *
 * @author Rakume Hayashi<i@fake.moe>
 */

;(function($) {
    $.ise.extend({
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

            return this;
        },

        attr: function() {
            var args = $.toArr(arguments);

            if (args[1] && typeof args[0] === 'string') {
                this.each(function(el) {
                    el.setAttribute(args[0], args[1]);
                });
            } else if (typeof args[0] === 'object'){
                $.each(args, function(obj) {
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

            return this;
        },

        html: function(v) {
            if (!v) {
                return this[0].innerHTML;
            }

            this.each(function(el) {
                el.innerHTML = v;
            })

            return this;
        }
    });
})(Faiash);
/**
 * Event
 *
 * @author Rakume Hayashi<i@fake.moe>
 */

;(function($) {
    $.ise.extend({
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
                $.each(args, function(obj) {
                    this.each(function(el) {
                        for (var event in obj) {
                            if (object.hasOwnProperty(event)) {
                                el.addEventListener(event, obj[event][1]);
                            }
                        }
                    });
                });
            }

            return this;
        },

        off: function() {
            var args = $.toArr(arguments);

            if (typeof args[0] === 'string') {
                this.each(function(el) {
                    el.removeEventListener(args[0], args[1], args[2]);
                });
            }  else if (typeof args[0] === 'object' && args.length === 1) {
                $.each(args, function(obj) {
                    this.each(function(el) {
                        for (var event in obj) {
                            if (object.hasOwnProperty(event)) {
                                el.removeEventListener(event, obj[event][1]);
                            }
                        }
                    });
                });
            }

            return this;
        }
    });
})(Faiash);
