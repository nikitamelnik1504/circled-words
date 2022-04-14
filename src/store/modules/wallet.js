// @TODO: Implement chain validation.

import detectEthereumProvider from '@metamask/detect-provider'
import store from "../index";

const provider = await detectEthereumProvider()

const state = () => ({
    metamask: {
        connected: localStorage.getItem('metaMaskConnected') === 'true',
        chainId: '',
        walletAddress: '',
    },
})

const getters = {
    isMetaMaskConnected(state) {
        return state.metamask.connected
    }
}

const mutations = {
    setMetaMaskConnected(state) {
        state.metamask.connected = true
    },
    setWalletAddress(state, address) {
        state.metamask.walletAddress = address
    }
}

const actions = {
    connectToMetaMask() {
        provider.request({method: 'eth_requestAccounts'})
            .then(walletAddress => {
                // @TODO: Implement multiple accounts.
                store.commit('setWalletAddress', walletAddress[0])
                store.commit('setMetaMaskConnected')
                localStorage.setItem('metaMaskConnected', 'true')
            })
    }
}

export default {
    state,
    getters,
    actions,
    mutations,
}
