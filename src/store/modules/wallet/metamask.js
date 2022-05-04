// @TODO: Implement chain validation.
import store from "../../index";

const state = {
  metamaskProvider: {},
};

const getters = {
  getMetamaskProvider: (state) => {
    return state.metamaskProvider;
  },
  isMetamaskInstalled: (state) =>
    Object.keys(state.metamaskProvider).length !== 0,
};

const actions = {
  setMetamaskProvider({ commit }, provider) {
    commit("setMetamaskProvider", provider);
  },
  async connectToMetamask({ getters }) {
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
  async addMetamaskEventListeners({ getters }, events) {
    let provider = await getters.getMetamaskProvider;
    for (let event_id in events) {
      provider.on(event_id, events[event_id]);
    }
  },
  async removeMetamaskEventListeners({ getters }, events) {
    let provider = await getters.getMetamaskProvider;
    for (let event_id in events) {
      provider.removeListener(event_id, events[event_id]);
    }
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
