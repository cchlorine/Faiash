/**
 * Attributes / Common
 *
 * @author Rakume Hayashi<i@fake.moe>
 */

Faiash.ise.extend({
    attr: function() {
        var args = $.toArr(arguments);

        if (args[1]) {
            if (typeof args[0] === 'string') {
                this.each(function(el) {
                    el.setAttribute(args[0], args[1]);
                });
            }
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
            el.cssText += (';' + v);
        });

        return this.style.cssText;
    }
});
