// third-party
const DOMHighlighter      = require('dom-highlighter');
const ElementHighlighter  = DOMHighlighter.ElementHighlighter;
const SelectorHighlighter = DOMHighlighter.SelectorHighlighter;

/**
 * Inspector constructor
 */
function Inspector(hDev) {
  if (!hDev) { throw new Error('hDev is required'); }

  if (typeof hDev.subscribe !== 'function') {
    throw new TypeError('hDev.subscribe MUST be a function');
  }

  /**
   * Reference to the hDev API
   */
  this.hDev = hDev;

  /**
   * List of elementHighlighters in use
   * @type {Array}
   */
  // this.elementHighlighters = [];

  // setup mouse interactions
  require('./ui/mouse-interactions')(this);

  // setup cursor interactions
  require('./ui/cursor-interactions')(this);

  // setup auto-reload
  require('./ui/auto-reload')(this);
}

// Inspector.prototype.highlightElement = function (element) {

//   console.warn('highlightElement deprecated')

//   var elHlt = new ElementHighlighter({
//     elementRect: {
//       // border: '4px dashed red',
//       backgroundColor: 'rgba(206, 135, 250, 0.4)',
//       // transition: 'all 0.1s',
//     }
//   });

//   elHlt.attach(element);
// };

// Inspector.prototype.highlightSelector = function (CSSSelector) {

//   console.warn('highlightSelector deprecated');

//   var selectorHlt = new SelectorHighlighter({});

//   selectorHlt.highlight(CSSSelector);
// };

module.exports = Inspector;