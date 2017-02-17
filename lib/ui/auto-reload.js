module.exports = function (inspector, options) {

  function reload(eventName, data) {
    // https://developer.mozilla.org/pt-BR/docs/Web/API/Location/reload
    // forceReload: prevents browser from using cache,
    // but in FF prevents ServiceWorker from intercepting request as well.
    // 
    // We will remove the forceReload now and add cache control
    // headers that prevent the browser from caching the content
    // window.location.reload(true);
    window.location.reload();
  }

  inspector.hDev.subscribe('file-updated', reload.bind(null, 'file-updated'));
  inspector.hDev.subscribe('file-created', reload.bind(null, 'file-created'));
  inspector.hDev.subscribe('file-removed', reload.bind(null, 'file-removed'));
};