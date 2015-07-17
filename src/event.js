/**
 * Event
 *
 * @author Rakume Hayashi<i@fake.moe>
 */

Faiash.ise.extend({
    bind: function() {
        var args = $.toArr(arguments);

        if (typeof args[0] === 'string') {
            for (var i = 0; i < this.length; i++) {
                this[i].addEventListener(args[0], args[1], args[2]);
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
        var args = $.toArr(arguments);

        if (typeof args[0] === 'string') {
            for (var i = 0; i < this.length; i++) {
                this[i].removeEventListener(args[0], args[1], args[2]);
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
