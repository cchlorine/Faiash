/**
 * Event
 *
 * @author Rakume Hayashi<i@fake.moe>
 */

Faiash.ise.extend({
    bind: function() {
        if (typeof arguments[0] === 'string') {
            for (var i = 0; i < this.length; i++) {
                this[i].addEventListener(arguments[0], arguments[1], arguments[2]);
            }
        } else {
            for (var i = 0; i < this.length; i++) {
                for (var event in this[i]) {
                    if (object.hasOwnProperty(event)) {
                        this[i].addEventListener(event, this[i][event]);
                    }
                }
            }
        }
    },

    unbind: function() {
        if (typeof arguments[0] === 'string') {
            for (var i = 0; i < this.length; i++) {
                this[i].removeEventListener(arguments[0], arguments[1], arguments[2]);
            }
        } else {
            for (var i = 0; i < this.length; i++) {
                for (var event in this[i]) {
                    if (object.hasOwnProperty(event)) {
                        this[i].removeEventListener(event, this[i][event]);
                    }
                }
            }
        }
    }
});
