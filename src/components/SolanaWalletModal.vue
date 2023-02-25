<template>
  <div
    id="connectSolanaWalletModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="connectSolanaWalletModal"
    aria-hidden="true"
  >
    <div
      class="modal-dialog position-absolute top-0 bottom-0 start-0 end-0 d-flex justify-content-center align-items-center"
    >
      <div class="modal-content">
        <div class="modal-header justify-content-center">
          <h5 id="modalLabel" class="modal-title">Select your wallet</h5>
          <button
            ref="closeWalletModal"
            type="button"
            class="btn-close d-none"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <div class="modal-body d-flex justify-content-center py-0">
          <div class="row flex-column flex-sm-row w-100">
            <div class="blockchain-wrapper">
              <div class="row text-center h-100">
                <div
                  class="col-sm-11 wallet-links-wrapper mx-auto p-3 px-sm-4 pb-sm-4"
                >
                  <div class="row">
                    <div class="mb-2">
                      <h6 class="blockchain-title solana d-inline-block">
                        Solana
                      </h6>
                    </div>
                    <div class="col-6 mx-auto">
                      <a
                        :href="
                          phantomWalletService ? '#' : 'https://phantom.app'
                        "
                        class="wallet-link phantom-link h-100 d-flex justify-content-between align-items-center flex-column text-center position-relative p-2"
                        @click.prevent="showPhantomWalletModal()"
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
                    <div class="col-6 mx-auto">
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
          </div>
        </div>
        <div class="modal-footer justify-content-center">
          <a
            href="#"
            data-bs-toggle="modal"
            data-bs-target="#connectEthereumWalletModal"
          >
            I'm Ethereum user
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type PhantomWalletService from "@/utils/Service/PhantomWalletService";
import { ref, inject } from "vue";

const phantomWalletService = inject<Ref<PhantomWalletService | false>>(
  "phantomWalletService"
);

const walletEvents = inject("walletEvents", {
  phantomWallet: {},
});

const closeWalletModal = ref<HTMLButtonElement | null>(null);

const showPhantomWalletModal = async () => {
  if (!phantomWalletService?.value) {
    return;
  }

  const connectionToPhantomWallet = await phantomWalletService.value.connect();
  if (connectionToPhantomWallet === "connected") {
    phantomWalletService.value.addEventsGroup(walletEvents.phantomWallet);
    closeWalletModal.value?.click();
  }
};
</script>
