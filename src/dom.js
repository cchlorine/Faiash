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
