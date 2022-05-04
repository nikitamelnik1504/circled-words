import store from "../../index";
import { providers } from "ethers";

const state = {
  walletConnectProvider: {
    web3Provider: {},
    provider: {},
  },
};

const getters = {
  getWalletConnectProvider: (state) => {
    return state.walletConnectProvider.provider;
  },
  getWeb3WalletConnectProvider: (state) => {
    return state.walletConnectProvider.web3Provider;
  },
};

const actions = {
  setWeb3WalletConnectProvider({ commit }, provider) {
    commit("setWeb3WalletConnectProvider", provider);
  },
  setWalletConnectProvider({ commit }, provider) {
    commit("setWalletConnectProvider", provider);
  },
  async addWalletConnectEventListeners({ getters }, events) {
    let provider = await getters.getWalletConnectProvider;
    for (let event_id in events) {
      provider.on(event_id, events[event_id]);
    }
  },
  async removeWalletConnectEventListeners({ getters }, events) {
    let provider = await getters.getWalletConnectProvider;
    for (let event_id in events) {
      provider.removeListener(event_id, events[event_id]);
    }
  },
  async connectToWalletConnect({ commit, getters }) {
    let provider = getters.getWalletConnectProvider;
    return await provider
      .enable()
      .then((address) => {
        const web3Provider = new providers.Web3Provider(provider);
        commit("setWeb3WalletConnectProvider", web3Provider);
        commit("setWalletAddress", address[0]);
        commit("setWalletType", "walletConnect");
        commit("setConnected");
        return "connected";
      })
      .catch((error) => {
        console.log(error);
        return "not_connected";
      });
  },
};

const mutations = {
  setWeb3WalletConnectProvider(state, provider) {
    state.walletConnectProvider.web3Provider = provider;
  },
  setWalletConnectProvider(state, provider) {
    state.walletConnectProvider.provider = provider;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
