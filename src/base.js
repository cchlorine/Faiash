var Faiash = function (W, E) {
  var F = function(selector) {
    var item = document.querySelectorAll(selector);

    if (item.length > 1) {
      item.css = function (v) {
        if (!v || v == '') return this.style.cssText;

        for (var e in item) {
          e.css(v);
        }
      }

      item.on = function (type, listener, useCapture) {
        for (var e in item) {
          e.on(type, listener, useCapture);
        }
      }

      return item;
    }

    return item[0];
  };

  F.prototype.on = function(name, func) {
    if ((!name || name == '') && !this[name]) return false;

    this[name] = func;
  }

  E.css = function (v) {
    if (!v || v == '') return this.style.cssText;

    if (v.substr(-1) == ';') {
      this.style.cssText += v.substr(0, v.length - 1);
    } else {
      this.style.cssText += (';' + v);
    }

    return this.style.cssText;
  }

  E.on = E.addEventlistener;

  E.addClass = function (cls) {
    if (!cls || cls == '') return false;

    if (this.classList) {
      this.classList.add(cls);
    } else {
      this.className += ' ' + cls;
    }
  }

  E.removeClass = function (cls) {
    if (!cls || cls == '') return false;

    if (this.classList) {
      this.classList.remove(cls);
    } else {
      this.className = this.className.replace(new RegExp('(^|\\b)' + cls.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
  }

  E.hasClass = function (cls) {
    if (this.classList) {
      return this.classList.contains(cls);
    } else {
      return new RegExp('(^| )' + cls + '( |$)', 'gi').test(el.className);
    }
  }

  if (!W.$)
    W.$ = F;

  return F;
}(window, Element.prototype);
