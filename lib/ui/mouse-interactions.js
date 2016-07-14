// third-party
const ElementHighlighter = require('dom-highlighter').ElementHighlighter;

// own
const aux = require('../auxiliary');

module.exports = function (inspector, options) {

  /**
   * Instance of element inspector
   * that is used for mouse interactions
   * both in the editor and in the previewer itself.
   * @type {ElementHighlighter}
   */
  var mouseElementHighlighter = new ElementHighlighter({
    overlayStyle: {
      backgroundColor: 'rgba(135, 206, 250, 0.4)',
    }
  });

  /**
   * Make the element inspector follow the mouse movements
   * within the previewer
   */
  document.addEventListener('mousemove', function (e) {
    var el = document.elementFromPoint(e.clientX, e.clientY);
    var filepath = el.getAttribute('data-hf');

    if (filepath && !mouseElementHighlighter.isTarget(el)) {
      mouseElementHighlighter.highlight(el);
    }
  });

  /**
   * Hide the inspector once the mouse leaves the previewer
   */
  document.addEventListener('mouseleave', function (e) {
    mouseElementHighlighter.hide();
  });

  // remote
  
  inspector.hDev.subscribe('mouse-position-change', function (data) {
    if (data.c === null) { return; }
    
    var el = aux.findElementForPathAndCharIndex(data.f, data.c);

    mouseElementHighlighter.highlight(el);
  });

};