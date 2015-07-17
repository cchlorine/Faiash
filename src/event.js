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
        } else if (typeof args[0] === 'object') {
            Faiash.each(args, function(obj) {
                this.each(function(el) {
                    for (var event in obj) {
                        if (object.hasOwnProperty(event)) {
                            el.addEventListener(event, obj[event][1]);
                        }
                    }
                });
            });
        }
    },

    unbind: function() {
        var args = $.toArr(arguments);

        if (typeof args[0] === 'string') {
            this.each(function(el) {
                el.removeEventListener(args[0], args[1], args[2]);
            });
        }  else if (typeof args[0] === 'object' && args.length === 1) {
            Faiash.each(args, function(obj) {
                this.each(function(el) {
                    for (var event in obj) {
                        if (object.hasOwnProperty(event)) {
                            el.removeEventListener(event, obj[event][1]);
                        }
                    }
                });
            });
        }
    }
});
