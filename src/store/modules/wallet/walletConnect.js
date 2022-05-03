import store from "../../index";
import { providers } from "ethers";

const state = {
  walletConnectProvider: {},
};

const getters = {};

const actions = {
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

const mutations = {
  setWalletConnectAddress(state, address) {
    state.walletConnect.walletAddress = address;
  },
  setWalletConnectConnected(state) {
    state.walletConnect.connected = true;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
