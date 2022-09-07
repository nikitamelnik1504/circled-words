import { createStore } from "vuex";
import wallet from "./modules/wallet";

const store = createStore({
  modules: {
    wallet,
  },
  mutations: {
    initialiseStore(state): void {
      if (localStorage.getItem("walletStore")) {
        state.wallet.wallet = JSON.parse(
          localStorage.getItem("walletStore") as string
        );
      }
    },
  },
});

store.subscribe((mutation, state) => {
  localStorage.setItem("walletStore", JSON.stringify(state.wallet.wallet));
});

export default store;
