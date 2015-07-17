/**
 * Event
 *
 * @author Rakume Hayashi<i@fake.moe>
 */

Faiash.ise.extend({
    bind: function() {
        var args = $.toArr(arguments);

        if (typeof args[0] === 'string') {
            this.each(function(el) {
                el.addEventListener(args[0], args[1], args[2]);
            });
        }
    },

    unbind: function() {
        var args = $.toArr(arguments);

        if (typeof args[0] === 'string') {
            this.each(function(el) {
                el.removeEventListener(args[0], args[1], args[2]);
            });
        }
    }
});
