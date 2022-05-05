import { createStore } from "vuex";
import metamask from "./modules/wallet/metamask";
import walletConnect from "./modules/wallet/walletConnect";
import wallet from "./modules/wallet";

const store = createStore({
  modules: {
    wallet,
    metamask,
    walletConnect,
  },
  mutations: {
    initialiseStore(state) {
      if (localStorage.getItem("walletStore")) {
        state.wallet.wallet = JSON.parse(localStorage.getItem("walletStore"));
      }
    },
  },
});

store.subscribe((mutation, state) => {
  localStorage.setItem("walletStore", JSON.stringify(state.wallet.wallet));
});

export default store;
