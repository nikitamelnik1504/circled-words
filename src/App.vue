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
</template>

<script lang="ts" setup>
import particlesJson from "./assets/json/particles.json";
import particlesIcon from "./assets/images/live-bg-icon.svg";
import Header from "./components/TheHeader.vue";
import Footer from "./components/TheFooter.vue";
import detectEthereumProvider from "@metamask/detect-provider";
import type { MetamaskProvider } from "./utils/Service/MetamaskService";
import { loadFull } from "tsparticles";
import WalletConnectProvider from "@walletconnect/web3-provider";
import MetamaskService from "./utils/Service/MetamaskService";
import WalletConnectService from "./utils/Service/WalletConnectService";
import PhantomWalletService from "./utils/Service/PhantomWalletService";
import MetaplexService from "@/utils/Service/NFT/MetaplexService";
import type { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { onUnmounted, provide, ref, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();

const router = useRouter();

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
  metamask: {
    accountsChanged: [
      {
        callback: () => {
          setDefaultWalletState();
          router.go(0);
        },
        connected: true,
      },
    ],
  },
  walletConnect: {
    disconnect: [
      {
        callback: () => {
          setDefaultWalletState();
          router.go(0);
        },
        connected: true,
      },
    ],
  },
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

const metamaskService = ref<MetamaskService | false>(false);
provide("metamaskService", metamaskService);

const walletConnectService = ref<WalletConnectService | false>(false);
provide("walletConnectService", walletConnectService);

const phantomWalletService = ref<PhantomWalletService | false>(false);
provide("phantomWalletService", phantomWalletService);

const metaplexService = ref<MetaplexService | false>(false);
provide("metaplexService", metaplexService);

const initializeMetamask = async () => {
  return detectEthereumProvider();
};

const initializeWalletConnect = () => {
  return new WalletConnectProvider({
    infuraId: "270dd5535d1344b2a5a507a081f3d45b",
  });
};

const initializePhantomWallet = () => {
  if (!("phantom" in window)) {
    return false;
  }
  const provider = window.phantom?.solana;

  if (!provider?.isPhantom || !(provider as PhantomWalletAdapter)) {
    return false;
  }

  return provider;
};

initializeMetamask().then((result: MetamaskProvider | unknown) => {
  if (!(result as MetamaskProvider)) {
    return;
  }
  MetamaskService.create(
    result as MetamaskProvider,
    store,
    walletEvents.metamask
  ).then((result) => (metamaskService.value = result));
});

WalletConnectService.create(
  initializeWalletConnect(),
  store,
  walletEvents.walletConnect,
  initializeWalletConnect
).then((result) => {
  walletConnectService.value = result;
});

const phantomWalletProvider = initializePhantomWallet();
if (phantomWalletProvider) {
  PhantomWalletService.create(
    phantomWalletProvider,
    store,
    walletEvents.phantomWallet
  ).then((result) => {
    phantomWalletService.value = result;
  });
}

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
        (phantomWalletService.value as PhantomWalletService).provider
      );
    }
  },
  { deep: true }
);

onUnmounted(() => {
  if (metamaskService.value instanceof MetamaskService) {
    metamaskService.value.removeEventsGroup(walletEvents.metamask);
  }
  if (phantomWalletService.value instanceof PhantomWalletService) {
    phantomWalletService.value.removeEventsGroup(walletEvents.phantomWallet);
  }
});
</script>

<style lang="scss">
@import "main";
</style>
