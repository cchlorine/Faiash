;(function($) {
    /**
     * Attributes / Classes
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
                this.each(function(el) {
                    el.classList.add(v);
                });
            } else {
                this.each(function(el) {
                    el.className += ' ' + v;
                });
            }

            return this;
        },

        removeClass: function(v) {
            // Return false when v is '', void, undefined, false or when v is not a string
            if (!v || typeof v !== 'string') {
                return false;
            }

            if (document.body.classList) {
                this.each(function(el) {
                    el.classList.remove(v);
                });
            } else {
                this.each(function(el) {
                    el.className = el.className.replace(new RegExp('(^|\\b)' + v.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
                });
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
                this.each(function(el) {
                    check = el.classList.contains(v);
                });
            } else {
                this.each(function(el) {
                    check = new RegExp('(^|)' + cls + '(|$)', 'gi').test(el.className);
                });
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
                this.each(function(el) {
                    el.classList.toggle(v);
                });
            } else {
                this.each(function(el) {
                    if (el.className.indexOf(v) >= 0) {
                        el.className = el.className.replace(new RegExp('(^|\\b)' + v.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
                    } else {
                        el.className += ' ' + v;
                    }
                });
            }

            return this;
        }
    });
})(Faiash);
