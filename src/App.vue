<template>
  <Particles
    id="liveBackground"
    class="live-background"
    :particles-init="particlesInit"
    :particles-loaded="particlesLoaded"
    :options="particlesConfig"
  />
  <Header />
  <router-view />
  <Footer />
  <canvas id="circledCanvas" class="d-none" width="3000" height="3000" />
  <VerifyModal v-if="verificationModalState" ref="verificationModal" :metadata="store.state.modal.verification.props.metadata" />
</template>

<script lang="ts" setup>
import particlesJson from "./assets/json/particles.json";
import particlesIcon from "./assets/images/live-bg-icon.svg";
import Header from "./components/TheHeader.vue";
import Footer from "./components/TheFooter.vue";
import { loadFull } from "tsparticles";
import PhantomWalletService from "./utils/Service/PhantomWalletService";
import MetaplexService from "@/utils/Service/NFT/MetaplexService";
import type { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { computed, nextTick, onUnmounted, provide, ref, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import VerifyModal from "@/views/page/MyWords/components/VerifyModal.vue";
import { Modal } from "bootstrap";

const store = useStore();

const router = useRouter();

const verificationModalState = computed(() => store.getters["modal/verificationModalState"])
const verificationModal = ref(null);

const particlesConfig = particlesJson;
// Use particles image as relative path.
particlesConfig.particles.shape.options.image.src = particlesIcon as string;
store.commit("initialiseStore");

const particlesInit = async (engine: never) => {
  if (document.documentElement.clientWidth >= 576) {
    await loadFull(engine);
  }
};

const particlesLoaded = async (container: {
  canvas: { element: HTMLCanvasElement };
}) => {
  container.canvas.element.style.zIndex = "-1";
  container.canvas.element.style.width = "100vw";
  container.canvas.element.style.height = "100vh";
};

const setDefaultWalletState = () => {
  store.commit("wallet/setDefaultWalletState");
};

const walletEvents = {
  phantomWallet: {
    accountChanged: [
      {
        callback: () => {
          setDefaultWalletState();
          router.go(0);
        },
        connected: true,
      },
    ],
  },
};
provide("walletEvents", walletEvents);

const phantomWalletService = ref<PhantomWalletService | false>(false);
provide("phantomWalletService", phantomWalletService);

const metaplexService = ref<MetaplexService | false>(false);
provide("metaplexService", metaplexService);

const initializePhantomWallet = async () => {
  const getPhantomInWindow = () => {
    return "phantom" in window;
  };

  // Wait a while until phantom wallet injected to the window.
  if (!getPhantomInWindow()) {
    const result = await new Promise((resolve) => {
      const timeout = 3000;
      let time = 0;

      const interval = setInterval(() => {
        time += 1000;

        if (getPhantomInWindow()) {
          resolve(true);
        }

        if (time > timeout) {
          clearInterval(interval);
          resolve(false);
        }
      }, 1000);
    });
    if (!result) {
      return;
    }
  }

  const provider = window.phantom?.solana;

  if (!provider?.isPhantom || !(provider as PhantomWalletAdapter)) {
    return;
  }

  return provider;
};

initializePhantomWallet().then((provider) => {
  if (provider) {
    PhantomWalletService.create(
      provider,
      store,
      walletEvents.phantomWallet
    ).then((result) => {
      phantomWalletService.value = result;
    });
  }
});

watch(
  phantomWalletService,
  (service: unknown) => {
    if (!(service instanceof PhantomWalletService)) {
      return;
    }

    if (
      service.connected &&
      service.connectedToSite &&
      metaplexService.value === false
    ) {
      metaplexService.value = new MetaplexService(
        (phantomWalletService.value as PhantomWalletService).provider,
        store
      );
    }
  },
  { deep: true }
);

watch(verificationModalState, (newValue) => {
  if (newValue) {
    nextTick(() => {
      const modal = new Modal(verificationModal.value!.element);
      modal.show();
    })
  }
})

onUnmounted(() => {
  if (phantomWalletService.value instanceof PhantomWalletService) {
    phantomWalletService.value.removeEventsGroup(walletEvents.phantomWallet);
  }
});
</script>

<style lang="scss">
@import "main";
</style>
