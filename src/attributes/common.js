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
    }
});
