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
      <div class="modal-content">
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
          <div class="row flex-column flex-sm-row">
            <div class="col-sm-6 mb-4 mb-sm-0">
              <a
                :href="
                  isMetamaskInstalled ? '#' : 'https://metamask.io/download/'
                "
                class="wallet-link metamask-link h-100 d-flex justify-content-between align-items-center flex-column text-center position-relative"
                @click="metamaskLink($event)"
              >
                <!--            <span class="position-absolute wallet-network-error-background"-->
                <!--                 ></span>-->
                <img
                  src="../assets/images/metamask.svg"
                  class="w-100"
                  alt="metamask"
                />
                <h6>Metamask</h6>
                <!--            <p class="wallet-network-error" >Please change your network to-->
                <!--              Ethereum</p>-->
              </a>
            </div>
            <div class="col-sm-6">
              <a
                href="#"
                class="wallet-link wallet-connect-link h-100 d-flex justify-content-between align-items-center flex-column text-center position-relative"
                @click.prevent="
                  isWalletConnectInitialized
                    ? showWalletConnectModal()
                    : undefined
                "
              >
                <span
                  :class="{ 'd-none': isWalletConnectInitialized }"
                  class="position-absolute wallet-loader top-0 bottom-0 end-0 start-0 d-flex justify-content-center align-items-center"
                  >Loading...</span
                >
                <img
                  class="w-100"
                  src="../assets/images/walletconnect.svg"
                  alt="walletconnect"
                />
                <h6>WalletConnect</h6>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options, Ref } from "vue-property-decorator";
import { namespace } from "s-vuex-class";
import router from "@/router";

const wallet = namespace("wallet");
const metamask = namespace("metamask");
const walletConnect = namespace("walletConnect");

@Options({})
export default class WalletModal extends Vue {
  @wallet.Getter
  public isMetamaskConnected!: string;

  @wallet.Getter
  public isWalletConnectConnected!: string;

  @wallet.Action
  public resetWalletState!: (closeSession: boolean) => void;

  @metamask.Getter
  public isMetamaskInstalled!: boolean;

  @metamask.Action
  public connectToMetamask!: () => Promise<string>;

  @metamask.Action
  public removeMetamaskEventListeners!: (
    events: Record<string, unknown>
  ) => Promise<void>;

  @metamask.Action
  public addMetamaskEventListeners!: (
    events: Record<string, unknown>
  ) => Promise<void>;

  @walletConnect.Getter
  public isWalletConnectInitialized!: boolean;

  @walletConnect.Action
  public connectToWalletConnect!: () => Promise<string>;

  @walletConnect.Action
  public addWalletConnectEventListeners!: (
    events: Record<string, unknown>
  ) => Promise<void>;

  @walletConnect.Action
  public removeWalletConnectEventListeners!: (
    events: Record<string, unknown>
  ) => Promise<void>;

  @Ref("CloseWalletModal") readonly closeWalletModal!: HTMLButtonElement;

  public metamaskLink(event: Event): void {
    if (this.isMetamaskInstalled) {
      event.preventDefault();
      this.showMetamaskModal();
    }
  }

  public async showWalletConnectModal(): Promise<void> {
    const connectionToWalletConnect = this.connectToWalletConnect();
    const walletConnectEvents = this.getWalletConnectEvents();
    connectionToWalletConnect.then((result) => {
      if (result === "connected") {
        this.addWalletConnectEventListeners(walletConnectEvents);
        this.closeWalletModal.click();
      }
    });
  }

  public async showMetamaskModal(): Promise<void> {
    const connectionToMetaMask = this.connectToMetamask();
    const metamaskEvents = this.getMetamaskEvents();
    connectionToMetaMask.then((result) => {
      if (result === "connected") {
        this.addMetamaskEventListeners(metamaskEvents);
        this.closeWalletModal.click();
      }
    });
  }

  public metamaskAccountsChangedEvent(): void {
    this.resetWalletState(false);
    router.go(0);
  }

  public walletConnectAccountsChangedEvent(): void {
    this.resetWalletState(false);
    router.go(0);
  }

  public getMetamaskEvents(): Record<string, () => void> {
    return {
      accountsChanged: this.metamaskAccountsChangedEvent,
    };
  }

  public getWalletConnectEvents(): Record<string, () => void> {
    return {
      disconnect: this.walletConnectAccountsChangedEvent,
    };
  }

  async unmounted(): Promise<void> {
    if (this.isMetamaskConnected) {
      await this.removeMetamaskEventListeners(this.getMetamaskEvents());
    }
    if (this.isWalletConnectConnected) {
      await this.removeWalletConnectEventListeners(
        this.getWalletConnectEvents()
      );
    }
  }
}
</script>
