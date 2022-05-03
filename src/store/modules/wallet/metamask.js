// @TODO: Implement chain validation.
import store from "../../index";

const state = {
  metamaskProvider: {},
};

const getters = {
  getMetamaskProvider: (state) => {
    return state.metamaskProvider;
  },
  isMetamaskInstalled: (state) => Boolean(state.metamaskProvider),
};

const actions = {
  setMetamaskProvider({ commit }, provider) {
    commit("setMetamaskProvider", provider);
  },
  async connectToMetaMask({ getters }) {
    let provider = getters.getMetamaskProvider;
    return provider
      .request({ method: "eth_requestAccounts" })
      .then((walletAddress) => {
        // @TODO: Implement multiple accounts.
        store.commit("setWalletAddress", walletAddress[0]);
        store.commit("setWalletType", "metamask");
        store.commit("setConnected");
        return "connected";
      })
      .catch((error) => {
        console.log(error);
        return "not_connected";
      });
  },
};

const mutations = {
  setMetamaskProvider(state, provider) {
    state.metamaskProvider = provider;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
