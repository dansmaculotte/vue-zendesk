module.exports = {
  install: function install(Vue, options = {}) {
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

    const root = new Vue();

    let isLoaded = false;

    root.load = zendeskKey => {
      if (isLoaded) {
        return;
      }

      const script = document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.id = "ze-snippet";
      const actualZendeskKey = zendeskKey || options.key;
      script.src =
        "https://static.zdassets.com/ekr/snippet.js?key=" + actualZendeskKey;

      delete window.zE;
      const first = document.getElementsByTagName("script")[0];
      first.parentNode.insertBefore(script, first);

      script.onload = event => {
        isLoaded = true;

        if (options.hideOnLoad) {
          root.hide();
        }

        root.$emit("loaded", event);

        window.zE("webWidget:on", "open", () => {
          root.$emit("open");
        });

        window.zE("webWidget:on", "close", () => {
          root.$emit("close");
        });
      };
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
      get: function get() {
        return window.zE;
      }
    });

    Vue.prototype.$zendesk = root;
  }
};
