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
 * Classes
 *
 * @author Rakume Hayashi<i@fake.moe>
 */

Faiash.ise.extend({
    addClass: function(v) {
        // Return false when v is '', void, undefined, false or when v is not a string
        if (!v || typeof v !== 'string') {
            return false;
        }

        if (document.body.classList) {
            for (var i = 0; i < this.length; i++) {
                this[i].classList.add(v);
            }
        } else {
            for (var i = 0; i < this.length; i++) {
                this[i].className += ' ' + v;
            }
        }

        return this;
    },

    removeClass: function(v) {
        // Return false when v is '', void, undefined, false or when v is not a string
        if (!v || typeof v !== 'string') {
            return false;
        }

        if (document.body.classList) {
            for (var i = 0; i < this.length; i++) {
                this[i].classList.remove(v);
            }
        } else {
            for (var i = 0; i < this.length; i++) {
                this[i].className = this[i].className.replace(new RegExp('(^|\\b)' + v.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
            }
        }

        return this;
    },

    hasClass: function(v) {
        var check;

        // Return false when v is '', void, undefined, false or when v is not a string
        if (!v || typeof v !== 'string') {
            return false;
        }

        if (document.body.classList) {
            for (var i = 0; i < this.length; i++) {
                check = this[i].classList.contains(v);
            }
        } else {
            for (var i = 0; i < this.length; i++) {
                check = new RegExp('(^|)' + cls + '(|$)', 'gi').test(this[i].className);
            }
        }

        if (check) {
            return true;
        } else {
            return false;
        }
    },

    toggleClass: function(v) {
        // Return false when v is '', void, undefined, false or when v is not a string
        if (!v || typeof v !== 'string') {
            return false;
        }

        if (document.body.classList) {
            for (var i = 0; i < this.length; i++) {
                this[i].classList.toggle(v);
            }
        } else {
            for (var i = 0; i < this.length; i++) {
                if (this[i].className.indexOf(v) >= 0) {
                    this[i].className = this[i].className.replace(new RegExp('(^|\\b)' + v.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
                } else {
                    this[i].className += ' ' + v;
                }
            }
        }
    }
});



if (typeof module === "object" && typeof module.exports === "object") {
    moudle.exports = Faiash;
}
})();
