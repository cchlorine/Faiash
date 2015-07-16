/**
 * Classes
 *
 * @author Rakume Hayashi<i@fake.moe>
 */

define(['./core'], function(Faiash) {
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
});
