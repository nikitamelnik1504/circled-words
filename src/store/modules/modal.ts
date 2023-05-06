interface State {
  verification: {
    value: boolean,
    props: {
      metadata: NFTMetadata | null
    }
  },
}

export default {
  namespaced: true,
  state: <State>{
    verification: {
      value: false,
      props: {
        metadata: null
      }
    },
  },
  getters: {
    verificationModalState: (state: State) => state.verification.value,
  },
}
