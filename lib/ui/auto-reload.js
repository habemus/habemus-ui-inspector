module.exports = function (inspector, options) {

  function reload(eventName, data) {
    window.location.reload(true);
  }

  inspector.hDev.subscribe('file-updated', reload.bind(null, 'file-updated'));
  inspector.hDev.subscribe('file-created', reload.bind(null, 'file-created'));
  inspector.hDev.subscribe('file-removed', reload.bind(null, 'file-removed'));
};