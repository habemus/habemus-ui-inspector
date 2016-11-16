// third-party
const ElementHighlighter = require('dom-highlighter').ElementHighlighter;
const SelectorHighlighter = require('dom-highlighter').SelectorHighlighter;

// own
const aux = require('../auxiliary');

module.exports = function (inspector, options) {

  /**
   * TODO improve highlighter shared usage and docs.
   */

  /**
   * SelectorHighlighter used for mouse interactions
   * both in the editor and in the previewer itself.
   *
   * Highlights elements that match a given CSS selector
   *
   * mainly used for css mode
   * 
   * @type {SelectorHighlighter}
   */
  var selectorHighlighter = new SelectorHighlighter({
    overlayStyle: {
      backgroundColor: 'rgba(135, 206, 250, 0.4)',
    }
  });

  /**
   * Element highlighter highlights a specific element.
   *
   * Mainly used for html mode
   * 
   * @type {ElementHighlighter}
   */
  var elementHighlighter = new ElementHighlighter({
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

    if (filepath && !elementHighlighter.isTarget(el)) {
      elementHighlighter.highlight(el);
    }
  });

  /**
   * Hide the inspector once the mouse leaves the previewer
   */
  document.addEventListener('mouseleave', function (e) {
    elementHighlighter.hide();
  });

  // remote
  
  inspector.hDev.subscribe('mouse-position-change', function (data) {

    switch (data.mode) {
      case 'text/html':

        // hide the selector highlighter
        selectorHighlighter.hide();

        if (data.c === null) {
          return;
        }
        
        var el = aux.findElementForPathAndCharIndex(data.f, data.c);
        elementHighlighter.highlight(el);

        break;
      case 'text/css':

        // hide the elementHighlighter
        elementHighlighter.hide();

        if (!data.astNode || !data.astNode.selectors) {
          return;
        }

        var selectorString = data.astNode.selectors.join(',');
        selectorHighlighter.highlight(selectorString);

        break;
      default:
        // console.warn('unsupported mouse-position-change mode', data.mode);
        break;
    }
  });

};