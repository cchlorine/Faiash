/**
 * Ajax
 *
 * @author Rakume Hayashi<i@fake.moe>
 */

;(function($) {
  $.extend({
      ajax: function() {
          // Init the vars
          var req, url, method, data, upload,
              progress, dc, callback, error,
              args = $.toArr(arguments);

          // Get the method if it is in the arguments
          if (args[0].match(/^get|post$/i)) {
              method = args.shift();
          }

          // Set the url
          url = args.shift();

          if (!url) {
              return false;
          }

          // Get the data
          if (typeof[0] === 'string') {
              data = args.shift();
          } else if (args[0].constructor === FormData) {
              upload = true;
              data = args.shift();
          } else if (typeof args[0] === 'object') { // When array
              dc = args.shift();

              data = [];
              $.each(dc, function(o, i) {
                  // Need to urlencode it
                  data.push(i + '=' + encodeURIComponent(o));
              });

              data = data.join('&');
          } else { // When nothing
              data = null;
          }

          // Set the method
          if (!method) {
              method = data ? 'POST' : 'GET';
          }

          // Get the callback
          if (typeof args[0] === 'function') {
              callback = args.shift();
          }

          // Get the error
          if (typeof args[0] === 'function') {
              error = args.shift();
          }

          // Get progress
          if (typeof args[0] === 'function' && upload === true) {
              progress = args.shift();
          }

          // Open a XHR
          req = new XMLHttpRequest();
          req.open(method, url, true);

          if (progress) {
              req.upload.onprogress = function(e) {
                  progress(e.loaded / e.total);
              }
          }

          // When is POST
          (!data || upload) || req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

          if (callback || error) {
              req.onreadystatechange = function() {
                  if(this.readyState === 4) {
                      if(this.status >= 200 && this.status < 400) {
                          var _data = req.responseText;

                          // When the data is json
                          if ((this.getResponseHeader('Content-Type') || '').match(/json/)) {
                              _data = JSON.parse(_data || null);
                          }

                          if (typeof callback === 'function') {
                              callback(_data); // Callback to the function
                          }
                      } else if (typeof error === 'function') {
                          error(this.status); // Error
                      }
                  }
              }
          }

          req.send(data || '');
          return req; // Return the detail
      },

      get: function() {
          return this.ajax('GET', arguments[0], arguments[1], arguments[2]);
      },

      post: function() {
          return this.ajax('POST', arguments[0], arguments[1], arguments[2]);
      }
  });
})(Faiash);
