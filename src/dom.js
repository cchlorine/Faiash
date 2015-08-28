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
                args.forEach(function(obj) {
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
        },

        val: function() {
          //
        }
    });
})(Faiash);
