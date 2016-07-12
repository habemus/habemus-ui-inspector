// internal
const ElementHighlighter = require('./element-highlighter');
const SelectorHighlighter = require('./selector-highlighter');

/**
 * Inspector constructor
 */
function Inspector() {
  this.elementHighlighters = [];

  // setup mouse interactions
  require('./ui/mouse-interactions')(this);
}

Inspector.prototype.highlightElement = function (element) {

  var elHlt = new ElementHighlighter({
    elementRect: {
      // border: '4px dashed red',
      backgroundColor: 'rgba(206, 135, 250, 0.4)',
      // transition: 'all 0.1s',
    }
  });

  elHlt.attach(element);
};

Inspector.prototype.highlightSelector = function (CSSSelector) {
  var selectorHlt = new SelectorHighlighter({});

  selectorHlt.highlight(CSSSelector);
};

module.exports = Inspector;