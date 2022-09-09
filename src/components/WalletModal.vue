<template>
  <div
    id="connectWalletModal"
    ref="connectWalletModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div
      class="modal-dialog position-absolute top-0 bottom-0 start-0 end-0 d-flex justify-content-center align-items-center"
    >
      <div class="modal-content px-md-3">
        <div class="modal-header justify-content-center">
          <h5 id="exampleModalLabel" class="modal-title">Select your wallet</h5>
          <button
            ref="CloseWalletModal"
            type="button"
            class="btn-close d-none"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <div class="modal-body d-flex justify-content-center">
          <div class="row flex-column flex-sm-row w-100">
            <div class="blockchain-wrapper col-sm-6">
              <div class="row text-center h-100">
                <div
                  class="col-sm-11 mb-4 mb-sm-0 wallet-links-wrapper mx-auto p-3 p-sm-4"
                >
                  <div class="row">
                    <div class="mb-2">
                      <h3 class="blockchain-title solana">
                        Solana<br />(recommended)
                      </h3>
                    </div>
                    <div class="col-6 col-sm-10 mx-auto mb-sm-3">
                      <a
                        :href="
                          phantomWalletService ? '#' : 'https://phantom.app'
                        "
                        class="wallet-link phantom-link h-100 d-flex justify-content-between align-items-center flex-column text-center position-relative p-2"
                        @click="showPhantomWalletModal($event)"
                      >
                        <div
                          class="image-wrapper d-flex justify-content-center py-2"
                        >
                          <img
                            src="../assets/images/phantom.svg"
                            class="w-100"
                            alt="phantom-wallet"
                          />
                        </div>
                        <h6>Phantom Wallet</h6>
                      </a>
                    </div>
                    <div class="col-6 col-sm-10 mx-auto">
                      <a
                        href="#"
                        class="wallet-link solflare-link h-100 d-flex justify-content-between align-items-center flex-column text-center position-relative p-2 disabled"
                      >
                        <div
                          class="image-wrapper d-flex justify-content-center py-2"
                        >
                          <img
                            src="../assets/images/solflare.svg"
                            class="w-100"
                            alt="solflare"
                          />
                        </div>
                        <h6>Solflare</h6>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="blockchain-wrapper col-sm-6 mb-4 mb-sm-0">
              <div class="row text-center h-100">
                <div class="col-sm-11 wallet-links-wrapper mx-auto p-3 p-sm-4">
                  <div class="row">
                    <div class="mb-2">
                      <h3 class="blockchain-title ethereum">
                        Ethereum<br />(deprecated)
                      </h3>
                    </div>
                    <div class="col-6 col-sm-10 mx-auto mb-sm-3">
                      <a
                        :href="
                          metamaskService
                            ? '#'
                            : 'https://metamask.io/download/'
                        "
                        class="wallet-link metamask-link h-100 d-flex justify-content-between align-items-center flex-column text-center position-relative py-2"
                        @click="showMetamaskModal($event)"
                      >
                        <!--            <span class="position-absolute wallet-network-error-background"-->
                        <!--                 ></span>-->
                        <div
                          class="image-wrapper d-flex justify-content-center py-2"
                        >
                          <img
                            src="../assets/images/metamask.svg"
                            class="w-100"
                            alt="metamask"
                          />
                        </div>
                        <h6>Metamask</h6>
                        <!--            <p class="wallet-network-error" >Please change your network to-->
                        <!--              Ethereum</p>-->
                      </a>
                    </div>
                    <div class="col-6 col-sm-10 mx-auto">
                      <a
                        href="#"
                        class="wallet-link wallet-connect-link h-100 d-flex justify-content-between align-items-center flex-column text-center position-relative p-2"
                        @click.prevent="showWalletConnectModal()"
                      >
                        <span
                          :class="{ 'd-none': walletConnectService }"
                          class="position-absolute wallet-loader top-0 bottom-0 end-0 start-0 d-flex justify-content-center align-items-center"
                          >Loading...</span
                        >
                        <div
                          class="image-wrapper d-flex justify-content-center py-2"
                        >
                          <img
                            class="w-100"
                            src="../assets/images/walletconnect.svg"
                            alt="walletconnect"
                          />
                        </div>
                        <h6>WalletConnect</h6>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options, Ref, Inject } from "vue-property-decorator";
import type MetamaskService from "@/utils/Service/MetamaskService";
import type WalletConnectService from "@/utils/Service/WalletConnectService";
import type PhantomWalletService from "@/utils/Service/PhantomWalletService";

import { namespace } from "s-vuex-class";

const wallet = namespace("wallet");

@Options({})
export default class WalletModal extends Vue {
  @Inject({ from: "metamaskService" }) metamaskService:
    | MetamaskService
    | false = false;

  @Inject({ from: "walletConnectService" }) walletConnectService:
    | WalletConnectService
    | false = false;

  @Inject({ from: "phantomWalletService" }) phantomWalletService:
    | PhantomWalletService
    | false = false;

  @Inject({ from: "walletEvents" })
  walletEvents = {
    metamask: {},
    walletConnect: {},
    phantomWallet: {},
  };

  @Ref("CloseWalletModal") readonly closeWalletModal!: HTMLButtonElement;

  @wallet.Mutation
  public setDefaultWalletState!: () => string;

  public async showPhantomWalletModal(event: Event): Promise<void> {
    if (!this.phantomWalletService) {
      return;
    }

    event.preventDefault();
    const connectionToPhantomWallet = await this.phantomWalletService.connect();
    if (connectionToPhantomWallet === "connected") {
      // this.phantomWalletService.addEventsGroup(this.events.phantomWallet);
      this.closeWalletModal.click();
    }
  }

  public async showWalletConnectModal(): Promise<void> {
    if (!this.walletConnectService) {
      return;
    }

    const connectionToWalletConnect = await this.walletConnectService.connect();
    if (connectionToWalletConnect === "connected") {
      this.walletConnectService.addEventsGroup(this.walletEvents.walletConnect);
      this.closeWalletModal.click();
    }
  }

  public async showMetamaskModal(event: Event): Promise<void> {
    if (!this.metamaskService) {
      return;
    }

    event.preventDefault();
    const connectionToMetamask = await this.metamaskService.connect();
    if (connectionToMetamask === "connected") {
      this.metamaskService.addEventsGroup(this.walletEvents.metamask);
      this.closeWalletModal.click();
    }
  }
}
</script>
