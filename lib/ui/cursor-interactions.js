// third-party
const ElementHighlighter = require('dom-highlighter').ElementHighlighter;
const SelectorHighlighter = require('dom-highlighter').SelectorHighlighter;

// own
const aux = require('../auxiliary');

module.exports = function (inspector, options) {

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

  // remote

  inspector.hDev.subscribe('cursor-position-change', function (data) {

    switch (data.mode) {
      case 'text/html':

        // hide the selector highlighter
        selectorHighlighter.hide();

        if (data.c === null) {
          return;
        }

        var el = aux.findElementForPathAndCharIndex(data.f, data.c);

        elementHighlighter.highlight(el);

        aux.scrollIntoView(el);

        break;
      case 'text/css':

        // hide the elementHighlighter
        elementHighlighter.hide();

        if (!data.astNode || !data.astNode.selectors) {
          return;
        }

        var selectorString = data.astNode.selectors.join(',');
        selectorHighlighter.highlight(selectorString);

        // TODO: improve scroll into view for css
        // if (selectorHighlighter.elHighlighters.length > 0) {
        //   aux.scrollIntoView(selectorHighlighter.elHighlighters[0].target);
        // }

        break;
      default:
        // console.warn('unsupported mouse-position-change mode', data.mode);
        break;
    }
  });

};