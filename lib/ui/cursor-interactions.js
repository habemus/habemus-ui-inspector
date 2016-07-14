// third-party
const ElementHighlighter = require('dom-highlighter').ElementHighlighter;

// own
const aux = require('../auxiliary');

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
  var cursorElementHighlighter = new ElementHighlighter({
    overlayStyle: {
      backgroundColor: 'rgba(250, 206, 135, 0.4)',
    }
  });

  // remote

  inspector.hDev.subscribe('cursor-position-change', function (data) {
    if (data.c === null) { return; }

    var el = aux.findElementForPathAndCharIndex(data.f, data.c);

    cursorElementHighlighter.highlight(el);

    aux.scrollIntoView(el);
  });

};