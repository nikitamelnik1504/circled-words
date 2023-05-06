const getDefaultWalletState = () => {
  return <State>{
    type: "",
    walletAddress: "",
    connected: false,
  };
};

interface State {
  type: string;
  walletAddress: string;
  connected: boolean;
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
      const default_state = getDefaultWalletState();
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
