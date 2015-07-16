/**
 * Attributes / Common
 *
 * @author Rakume Hayashi<i@fake.moe>
 */

Faiash.ise.extend({
    attr: function() {
        if (arguments[1]) {
            if (typeof arguments[0] === 'string') {
                for (var i = 0; i < this.length; i++) {
                    this[i].setAttribute(arguments[0], arguments[1]);
                }
            } else {
                for (var i = 0; i < arguments.length; i++) {
                    for (var attr in arguments[i]) {
                        if (object.hasOwnProperty(attr)) {
                            this[i].setAttribute(arguments[0], arguments[1]);
                        }
                    }
                }
            }
        } else {
            return this[0].getAttribute(arguments[0]);
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

        for (var i = 0; i < this.length; i++) {
            this.style.cssText += (';' + v);
        }

        return this.style.cssText;
    }
});
