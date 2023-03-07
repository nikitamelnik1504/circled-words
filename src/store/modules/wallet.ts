const getDefaultWalletState = () => {
  return {
    type: "",
    walletAddress: "",
    connected: false,
    chainId: "",
  };
};

interface State {
  type: string;
  walletAddress: string;
  connected: boolean;
  chainId: string;
}

export default {
  namespaced: true,
  state: () => getDefaultWalletState(),
  getters: {
    getActiveType(state: State): string {
      return state.type;
    },
    getStatus(state: State): string {
      return state.connected ? "connected" : "not_connected";
    },
    getWalletAddress(state: State): string {
      return state.walletAddress;
    },
    getChainId(state: State): string {
      return state.chainId;
    },
    isPhantomWalletConnected(
      state: State,
      getters: { getActiveType: string; getStatus: string }
    ): boolean {
      return (
        getters.getActiveType === "phantomWallet" &&
        getters.getStatus === "connected"
      );
    },
  },
  mutations: {
    setDefaultWalletState(state: State): void {
      const default_state = getDefaultWalletState() as State;
      for (const key in default_state) {
        state[key] = default_state[key];
      }
    },
    setWalletType(state: State, { type }): void {
      state.type = type;
    },
    setConnected(state: State): void {
      state.connected = true;
    },
    setDisconnected(state: State): void {
      state.connected = false;
    },
    setWalletAddress(state: State, { address }): void {
      state.walletAddress = address;
    },
  },
};
