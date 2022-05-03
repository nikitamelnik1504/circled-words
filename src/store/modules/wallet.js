// @TODO: Implement chain validation.

import store from "../index";
import { providers } from "ethers";

const getDefaultWalletState = () => {
  return {
    type: "",
    walletAddress: "",
    connected: false,
    chainId: "",
  };
};

const state = {
  wallet: getDefaultWalletState(),
  metamaskProvider: {},
  walletConnectProvider: {},
};

const getters = {
  isMetamaskConnected: (state) => {
    return state.wallet.type === "metamask" && state.wallet.connected === true;
  },
  getChainId: (state) => {
    return state.wallet.chainId;
  },
  getMetamaskProvider: (state) => {
    return state.metamaskProvider;
  },
  isWalletConnectConnected: (state) => {
    return (
      state.wallet.type === "walletConnect" && state.wallet.connected === true
    );
  },
  isMetamaskInstalled: (state) => Boolean(state.metamaskProvider),
};

const mutations = {
  setMetamaskProvider(state, provider) {
    state.metamaskProvider = provider;
  },
  setWalletType: (state, type) => {
    state.wallet.type = type;
  },
  setConnected: (state) => {
    state.wallet.connected = true;
  },
  setDisconnected: (state) => {
    state.wallet.connected = false;
  },
  setWalletAddress(state, address) {
    state.wallet.walletAddress = address;
  },
  setWalletConnectAddress(state, address) {
    state.walletConnect.walletAddress = address;
  },
  setWalletConnectConnected(state) {
    state.walletConnect.connected = true;
  },
  resetWalletState(state) {
    state.wallet = getDefaultWalletState();
  },
  setMetaMaskInstalled(state) {
    state.metamask.installed = true;
  },
  setMaskMaskUninstalled(state) {
    state.metamask.installed = false;
  },
};

const metamaskDisconnectEvent = (dispatch) => {
  dispatch("resetWalletState");
};

const actions = {
  resetWalletState({ commit }) {
    commit("resetWalletState");
  },
  setMetamaskProvider({ commit }, provider) {
    commit("setMetamaskProvider", provider);
  },
  async connectMetamaskEvents({ getters }) {
    let provider = getters.getMetamaskProvider;
    provider.on("disconnect", function () {
      alert("f");
    });
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
  async connectToWalletConnect() {
    await provider.enable();
    const web3Provider = new providers.Web3Provider(provider);
    provider.on("disconnect", (code, reason) => {
      alert("Disconnected" + code + reason);
      // console.log(code, reason);
    });
    web3Provider
      .getSigner()
      .getAddress()
      .then((walletAddress) => {
        store.commit("setWalletConnectAddress", walletAddress);
        store.commit("setWalletConnectConnected");
      });
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
