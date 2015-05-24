class Faiash
  E = Element.prototype;
  constructor: (@selector) ->
    item = document.querySelectorAll selector

    if item.length > 1
      item.css = (v) ->
        return this.style.cssText if !v

        for e in item
          e.css v

      return item
    else
      return item[0]

  E.css = (v) ->
    return this.style.cssText if !v

    if v.substr(-1) == ';'
      this.style.cssText += v.substr(0, v.length - 1)
    else
      this.style.cssText += (';' + v)

    this.style.cssText

  E.on = E.addEventlistener

  E.addClass = (cls) ->
    return if !cls

    if (this.classList)
      this.classList.add(cls);
    else
      this.className += ' ' + cls;

  E.removeClass = (cls) ->
    return if !cls

    if (this.classList)
      this.classList.remove(cls);
    else
      this.className = this.className.replace new RegExp('(^|\\b)' + cls.split(' ').join('|') + '(\\b|$)', 'gi'), ' ';

  E.hasClass = (cls) ->
    if (this.classList)
      this.classList.contains(cls);
    else
      new RegExp('(^| )' + cls + '( |$)', 'gi').test el.className;
