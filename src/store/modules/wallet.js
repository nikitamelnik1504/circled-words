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
};

const getters = {
  isMetamaskConnected: (state) => {
    return state.wallet.type === "metamask" && state.wallet.connected === true;
  },
  getWalletAddress: (state) => {
    return state.wallet.walletAddress;
  },
  isWalletConnectConnected: (state) => {
    return (
      state.wallet.type === "walletConnect" && state.wallet.connected === true
    );
  },
  getChainId: (state) => {
    return state.wallet.chainId;
  },
};

const mutations = {
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
  resetWalletState(state) {
    state.wallet = getDefaultWalletState();
  },
};

const actions = {
  resetWalletState({ getters, commit }, closeSession = false) {
    if (closeSession && getters.isWalletConnectConnected) {
      getters.getWalletConnectProvider.disconnect();
    }
    commit("resetWalletState");
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
