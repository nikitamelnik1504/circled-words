<template>
  <div
    id="connectEthereumWalletModal"
    ref="connectEthereumWalletModal"
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
            ref="closeWalletModal"
            type="button"
            class="btn-close d-none"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <div class="modal-body d-flex justify-content-center">
          <div class="row flex-column flex-sm-row w-100">
            <div class="blockchain-wrapper">
              <div class="row text-center h-100">
                <div class="col-sm-11 wallet-links-wrapper mx-auto p-3 p-sm-4">
                  <div class="row">
                    <div class="mb-2">
                      <h3 class="blockchain-title ethereum">
                        Ethereum<br />(deprecated)
                      </h3>
                    </div>
                    <div class="col-6 mx-auto">
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
                    <div class="col-6 mx-auto">
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
        <div class="modal-footer justify-content-center">
          <button
            type="button"
            class="px-5 py-2"
            data-bs-toggle="modal"
            data-bs-target="#connectSolanaWalletModal"
            @click="props.toggleWalletState()"
          >
            I'm Solana user
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type MetamaskService from "@/utils/Service/MetamaskService";
import type WalletConnectService from "@/utils/Service/WalletConnectService";
import { ref, inject } from "vue";

interface Props {
  toggleWalletState: void;
}

const props = defineProps<Props>();

const metamaskService = inject<Ref<MetamaskService | false>>("metamaskService");

const walletConnectService = inject<Ref<WalletConnectService | false>>(
  "walletConnectService"
);

const walletEvents = inject("walletEvents", {
  metamask: {},
  walletConnect: {},
});

const closeWalletModal = ref<HTMLButtonElement | null>(null);

const showWalletConnectModal = async (): Promise<void> => {
  if (!walletConnectService?.value) {
    return;
  }

  const connectionToWalletConnect = await walletConnectService.value.connect();
  if (connectionToWalletConnect === "connected") {
    walletConnectService.value.addEventsGroup(walletEvents.walletConnect);
    closeWalletModal.value?.click();
  }
};

const showMetamaskModal = async (event: Event): Promise<void> => {
  if (!metamaskService?.value) {
    return;
  }

  event.preventDefault();
  const connectionToMetamask = await metamaskService.value.connect();
  if (connectionToMetamask === "connected") {
    metamaskService.value.addEventsGroup(walletEvents.metamask);
    closeWalletModal.value?.click();
  }
};
</script>
