import { createApp } from "vue";
import App from "./App.vue";
import store from "@/store";
import router from "@/router";
import "@popperjs/core/dist/umd/popper.min.js";
import Particles from "vue3-particles";

const app = createApp(App);
router.beforeEach(async (to) => {
  const { requiresAuth } = to.meta;

  if (requiresAuth) {
    if (!(await store.getters.isPhantomWalletConnected)) {
      return "/403-error";
    }
  }
});
app.use(router);
app.use(store);
app.use(Particles);

app.mount("#app");
