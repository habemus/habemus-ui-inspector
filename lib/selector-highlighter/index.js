// third-party
const $     = require('jquery');
const clone = require('clone');
const debounce = require('debounce');

const ElementHighlighter = require('../element-highlighter');

function SelectorHighlighter() {

  /**
   * Array holding all elements in current
   * selection
   * @type {Array}
   */
  this.selectedElements = [];

  /**
   * Array holding all element highlighters
   * @type {Array}
   */
  this.elementHighlighters = [];
}

SelectorHighlighter.prototype.highlight = function (CSSSelector) {

  var selectedElements = document.querySelectorAll(CSSSelector);

  this.selectedElements = Array.prototype.slice.call(selectedElements, 0);

  this.selectedElements.forEach(function (el) {

    var elementHighlighter = new ElementHighlighter({
      elementRect: {
        // border: '4px dashed red',
        backgroundColor: 'rgba(206, 135, 250, 0.4)',
        // transition: 'all 0.1s',
      }
    });
    elementHighlighter.attach(el);

    this.elementHighlighters.push(elementHighlighter);

  }.bind(this));

};

SelectorHighlighter.prototype.hide = function () {

};

module.exports = SelectorHighlighter;
