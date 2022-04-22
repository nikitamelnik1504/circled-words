// @TODO: Implement chain validation.

import detectEthereumProvider from '@metamask/detect-provider'
import store from "../index";

const provider = await detectEthereumProvider()

const getDefaultState = () => {
    return {
        metamask: {
            connected: false,
            chainId: '',
            walletAddress: '',
        },
    }
};

const state = getDefaultState()

const getters = {
    isMetaMaskConnected: state => state.metamask.connected
}

const mutations = {
    setMetaMaskConnected(state) {
        state.metamask.connected = true
    },
    setWalletAddress(state, address) {
        state.metamask.walletAddress = address
    },
    resetState(state) {
        Object.assign(state, getDefaultState())
    },
}

const actions = {
    resetWalletState({commit}) {
        commit('resetState')
    },
    connectToMetaMask() {
        return provider.request({method: 'eth_requestAccounts'})
            .then(walletAddress => {
                // @TODO: Implement multiple accounts.
                store.commit('setWalletAddress', walletAddress[0])
                store.commit('setMetaMaskConnected')
                return 'connected'
            })
            .catch((error) => {
                return 'not_connected'
            })
    }
}

export default {
    state,
    getters,
    actions,
    mutations,
}