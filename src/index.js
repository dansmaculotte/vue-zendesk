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

    Vue._script = document.createElement("script");
    Vue._script.type = "text/javascript";
    Vue._script.async = true;
    Vue._script.id = "ze-snippet";
    Vue._script.src =
      "https://static.zdassets.com/ekr/snippet.js?key=" + options.key;

    Vue.load = () => {
      delete window.zE;
      const first = document.getElementsByTagName("script")[0];
      first.parentNode.insertBefore(Vue._script, first);
    };

    Vue.mixin({
      created() {
        if (!options.disabled) {
          Vue.load(options.key);
        }

        Vue._script.addEventListener("load", this.zendeskLoaded);
      },
      destroyed() {
        Vue._script.removeEventListener("load", this.zendeskLoaded);
      },
      methods: {
        zendeskLoaded(event) {
          this.$emit("zendeskLoaded", event);

          if (options.hideOnLoad) {
            Vue.hide();
          }
        }
      }
    });

    Vue.hide = () => window.zE("webWidget", "hide");
    Vue.show = () => window.zE("webWidget", "show");
    Vue.logout = () => window.zE("webWidget", "logout");
    Vue.identify = user => window.zE("webWidget", "identify", user);
    Vue.prefill = user => window.zE("webWidget", "prefill", user);
    Vue.setLocale = locale => window.zE("webWidget", "setLocale", locale);
    Vue.updateSettings = settings =>
      window.zE("webWidget", "updateSettings", settings);
    Vue.clear = () => window.zE("webWidget", "clear");
    Vue.updatePath = options => window.zE("updatePath", "clear", options);
    Vue.toggle = () => window.zE("webWidget", "toggle");
    Vue.reset = () => window.zE("webWidget", "reset");
    Vue.close = () => window.zE("webWidget", "close");
    Vue.open = () => window.zE("webWidget", "open");

    Object.defineProperty(Vue, "zE", {
      get() {
        return window.zE;
      }
    });

    Vue.prototype.$zendesk = Vue;
  }
};
