// third-party
const $ = require('jquery');

// own
const ElementHighlighter = require('../element-highlighter');
const aux                = require('../auxiliary');

function _eventToEl(e) {
  var x = e.clientX;
  var y = e.clientY;

  return $(document.elementFromPoint(x, y));
}

module.exports = function (inspector, options) {

  /**
   * Instance of element inspector
   * that is used for mouse interactions
   * both in the editor and in the previewer itself.
   * @type {ElementHighlighter}
   */
  var mouseElementHighlighter = new ElementHighlighter({
    elementRect: {
      // border: '4px dashed red',
      backgroundColor: 'rgba(135, 206, 250, 0.4)',
      // transition: 'all 0.1s',
    }
  });

  /**
   * Make the element inspector follow the mouse movements
   * within the previewer
   */
  $(document).on('mousemove', function (e) {
    var $el = _eventToEl(e);
    var hid = $el.attr('data-hid');

    if (hid && !mouseElementHighlighter.isAttachedTo($el)) {
      var data = aux.parseHid(hid);

      mouseElementHighlighter.attach($el);
    }
  });

  /**
   * Hide the inspector once the mouse leaves the previewer
   */
  $(window).on('mouseleave', function (e) {
    mouseElementHighlighter.hide();
  });

};