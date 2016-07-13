// matches 'filename' - 'digits' - 'digits'
const HID_REGEXP = /(.+?)-(\d+?)-(\d+?)$/;

// TODO: DEPRECATE
exports.parseHid = function (hid) {
  var match = hid.match(HID_REGEXP);

  if (!match) {
    return false;
  } else {
    return {
      path: match[1],
      start: match[2],
      end: match[3]
    };
  }
};

/**
 * Finds element that contains the given charIndex
 * @param  {String} filepath
 * @param  {Number} charIndex
 * @return {DOMElement}
 */
function findElementForPathAndCharIndex(filepath, charIndex) {

  var fileElements = document.querySelectorAll('[data-hf="' + filepath + '"]');

  var elObj = Array.prototype.reduce.call(fileElements, function (currentElObj, candidateEl) {
    // hsi = habemus start index
    // hei = habemus end index
    var elStart = parseInt(candidateEl.getAttribute('data-hsi'), 10);
    var elEnd   = parseInt(candidateEl.getAttribute('data-hei'), 10);

    if (!currentElObj) {
      // start
      return {
        startIndex: elStart,
        endIndex: elEnd,
        element: candidateEl
      };

    } else {

      var cursorIsWithinElement = (charIndex >= elStart && charIndex <= elEnd);
      var candidateIsMoreSpecific = (elStart > currentElObj.startIndex);

      // console.log('----')
      // console.log('elStart', elStart);
      // console.log('charIndex', charIndex);
      // console.log('elEnd', elEnd);
      // console.log(cursorIsWithinElement);
      // console.log(candidateIsMoreSpecific);
      // console.log(elStart)
      // console.log(currentElObj.startIndex);
      // console.log(candidateEl)

      if (cursorIsWithinElement && candidateIsMoreSpecific) {
        // console.log('selected');
        return {
          startIndex: elStart,
          endIndex: elEnd,
          element: candidateEl
        };
      } else {
        // console.log('rejected');
        return currentElObj;
      }

    }

  }, false);

  if (elObj) {
    return elObj.element;
  } else {
    return null;
  }
}


/**
 * Scrolls the element specified by selector into
 * the window viewable area.
 * @param  {String|CSSSelector or Element} selector
 */
function scrollIntoView(selector) {
  var target = (typeof selector === 'string') ? document.querySelector(selector) : selector;

  if (target) {

    var windowHeight = window.innerHeight;
    var windowYOffset = window.pageYOffset;

    var targetRect = target.getBoundingClientRect();

    var targetWindowScrollTop = windowYOffset + targetRect.top - (windowHeight / 3);

    window.scrollTo(0, targetWindowScrollTop);
  }
}


exports.findElementForPathAndCharIndex = findElementForPathAndCharIndex;
exports.scrollIntoView = scrollIntoView;