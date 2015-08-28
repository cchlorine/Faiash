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
                args.forEach(function(obj) {
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
                args.forEach(function(obj) {
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
