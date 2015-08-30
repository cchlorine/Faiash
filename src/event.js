/**
 * Event
 *
 * @author Rakume Hayashi<i@fake.moe>
 */

;(function($) {
    $.ise.on = function() {
        var args = $.toArr(arguments);

        if (typeof args[0] === 'string') {
            if (!args[0] || !args[1]) {
                return this;
            }

            this.each(function() {
                this.addEventListener(args[0], args[1], (args[2] ? args[2] : false));
            });
        } else if (typeof args[0] === 'object') {
            args.forEach(function(obj) {
                this.each(function() {
                    for (var event in obj) {
                        this.addEventListener(event, obj[event][1]);
                    }
                });
            });
        }

        return this;
    }

    $.ise.off = function() {
        var args = $.toArr(arguments);

        if (typeof args[0] === 'string') {
            this.each(function(el) {
                el.removeEventListener(args[0], args[1], args[2]);
            });
        }  else if (typeof args[0] === 'object' && args.length === 1) {
            args.forEach(function(obj) {
                this.each(function() {
                    for (var event in obj) {
                        this.removeEventListener(event, obj[event][1]);
                    }
                });
            });
        }

        return this;
    }
})(Faiash);
