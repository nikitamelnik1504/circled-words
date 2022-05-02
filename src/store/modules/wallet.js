// @TODO: Implement chain validation.

import detectEthereumProvider from "@metamask/detect-provider";
import store from "../index";

const getDefaultState = () => {
  return {
    metamask: {
      installed: false,
      connected: false,
      chainId: "",
      walletAddress: "",
    },
  };
};

const state = getDefaultState();

const getters = {
  isMetaMaskConnected: (state) => state.metamask.connected,
  isMetaMaskInstalled: (state) => state.metamask.installed,
};

const mutations = {
  setMetaMaskConnected(state) {
    state.metamask.connected = true;
  },
  setWalletAddress(state, address) {
    state.metamask.walletAddress = address;
  },
  resetState(state) {
    let metamask_installed = state.metamask.installed;
    Object.assign(state, getDefaultState());
    state.metamask.installed = metamask_installed;
  },
  setMetaMaskInstalled(state) {
    state.metamask.installed = true;
  },
  setMaskMaskUninstalled(state) {
    state.metamask.installed = false;
  },
};

const actions = {
  resetWalletState({ commit }) {
    commit("resetState");
  },
  async checkMetaMaskInstalled() {
    let provider = await detectEthereumProvider();
    if (provider !== null) {
      store.commit("setMetaMaskInstalled");
    } else {
      store.commit("setMaskMaskUninstalled");
    }
  },
  async connectToMetaMask() {
    let provider = await detectEthereumProvider();
    return provider
      .request({ method: "eth_requestAccounts" })
      .then((walletAddress) => {
        // @TODO: Implement multiple accounts.
        store.commit("setWalletAddress", walletAddress[0]);
        store.commit("setMetaMaskConnected");
        return "connected";
      })
      .catch((error) => {
        console.log(error);
        return "not_connected";
      });
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
