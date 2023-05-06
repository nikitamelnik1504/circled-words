import { createStore } from "vuex";
import wallet from "./modules/wallet";
import modal from "./modules/modal";

const store = createStore({
  modules: {
    wallet, modal
  },
  mutations: {
    initialiseStore(state): void {
      if (localStorage.getItem("walletStore")) {
        state.wallet = JSON.parse(
          localStorage.getItem("walletStore") as string
        );
      }
    },
  },
});

store.subscribe((mutation, state) => {
  localStorage.setItem("walletStore", JSON.stringify(state.wallet));
});

export default store;
