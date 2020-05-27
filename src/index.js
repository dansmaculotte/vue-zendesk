module.exports = {
  install(Vue, options = {}) {
    if (!options.disabled && (!options.key || options.key.length === 0)) {
      console.warn("Please enter a Zendesk Web Widget Key");
    }

    const disabledLogger = function(method, ...args) {
      console.log("Zendesk is disabled, you called:", { method, args });
    };

    if (options.disabled) {
      window.zE = disabledLogger;
    }

    window.zESettings = options.settings;

    const root = new Vue()
    root._script = document.createElement("script");
    root._script.type = "text/javascript";
    root._script.async = true;
    root._script.id = "ze-snippet";
    root._script.src =
      "https://static.zdassets.com/ekr/snippet.js?key=" + options.key;

    let isLoaded = false

    root.load = () => {
      if (isLoaded) {
        return;
      }

      delete window.zE;
      const first = document.getElementsByTagName("script")[0];
      first.parentNode.insertBefore(root._script, first);

      root._script.onload = (event) => {
        isLoaded = true

        if (options.hideOnLoad) {
          root.hide();
        }

        root.$emit("loaded", event);
      }

    };

    if (!options.disabled) {
      root.load(options.key);
    }

    root.hide = () => window.zE("webWidget", "hide");
    root.show = () => window.zE("webWidget", "show");
    root.logout = () => window.zE("webWidget", "logout");
    root.identify = user => window.zE("webWidget", "identify", user);
    root.prefill = user => window.zE("webWidget", "prefill", user);
    root.setLocale = locale => window.zE("webWidget", "setLocale", locale);
    root.updateSettings = settings =>
      window.zE("webWidget", "updateSettings", settings);
    root.clear = () => window.zE("webWidget", "clear");
    root.updatePath = options => window.zE("updatePath", "clear", options);
    root.toggle = () => window.zE("webWidget", "toggle");
    root.reset = () => window.zE("webWidget", "reset");
    root.close = () => window.zE("webWidget", "close");
    root.open = () => window.zE("webWidget", "open");

    Object.defineProperty(root, "zE", {
      get() {
        return window.zE;
      }
    });

    Vue.prototype.$zendesk = root;
  }
};
