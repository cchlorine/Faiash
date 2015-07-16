(function() {

/**
 * Faiash Core
 *
 * @author Rakume Hayashi<i@fake.moe>
 */

// Define the Faiash
var Faiash = function(selector, context) {
    return new Faiash.ise.init(selector, context);
};

Faiash.ise = Faiash.prototype = {
    // Version of Faiash
    version: 0.1,

    constructor: Faiash,

    // Behaves like array
    push: [].push,
	sort: [].sort,
	splice: [].splice
};

var init = Faiash.ise.init = function(selector, context) {
    // Return self when selector is "", void, undefined, false
    if (!selector) {
        return this;
    }

    if (selector === doucment) {
        return document;
    } else if (selector === window) {
        return window;
    }

    // When context is string
    if (typeof context == 'string') {
        context = document.querySelector(context);
    }

    selector = (context || document).querySelectorAll(selector);

    for (i = 0; i < +selector.length; i++) {
        this[i] = selector[i];
    }

    this.length = i;
    return this;
}

init.prototype = Faiash.ise;

Faiash.extend = Faiash.ise.extend = function() {
    var copy;

    // No arguments
    if (arguments.length < 1) {
        return;
    }

    // There are an array outside the object
    for (var i = 0; i < arguments.length; i++) {
        for (var name in arguments[i]) {
            copy = arguments[i][name];

            // Prevent never-ending loop
            if (this === copy) {
                continue;
            }

            // Don't bring in undefined values
            if (copy !== undefined) {
                this[name] = copy;
            }
        }
    }

    return this;
}

/**
 * Event
 *
 * @author Rakume Hayashi<i@fake.moe>
 */

Faiash.ise.extend({
    on: function() {
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
    }
});


if (typeof module === "object" && typeof module.exports === "object") {
    moudle.exports = Faiash;
} else {
    window.Faiash = Faiash;
    if (!window.$) {
        window.$ = Faiash;
    }
}
})();
