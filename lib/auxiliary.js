// matches 'filename' - 'digits' - 'digits'
const HID_REGEXP = /(.+?)-(\d+?)-(\d+?)$/;

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