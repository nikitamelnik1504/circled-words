<template>
  <Particles
    id="liveBackground"
    class="live-background"
    :particles-init="particlesInit"
    :particles-loaded="particlesLoaded"
    url="src/assets/json/particles.json"
  />
  <Header />
  <router-view />
  <Footer />
</template>

<script lang="ts">
import { Vue, Options, Provide } from "vue-property-decorator";
import Header from "./components/TheHeader.vue";
import Footer from "./components/TheFooter.vue";
import store from "@/store";
import detectEthereumProvider from "@metamask/detect-provider";
import type { MetamaskProvider } from "@/utils/Service/MetamaskService";
import { loadFull } from "tsparticles";
import router from "@/router";
import WalletConnectProvider from "@walletconnect/web3-provider";
import MetamaskService from "@/utils/Service/MetamaskService";
import WalletConnectService from "@/utils/Service/WalletConnectService";

@Options({
  name: "App",
  components: {
    Header,
    Footer,
  },
})
export default class App extends Vue {
  @Provide({
    to: "metamaskService",
    reactive: true,
  })
  metamaskService: MetamaskService | false = false;

  @Provide({ to: "walletConnectService", reactive: true })
  walletConnectService: WalletConnectService | false = false;

  private events = {
    metamask: {
      accountsChanged: [
        {
          callback: () => {
            store.commit("wallet/setDefaultWalletState");
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
            store.commit("wallet/setDefaultWalletState");
            router.go(0);
          },
          connected: true,
        },
      ],
    },
    phantomWallet: {},
  };

  public async particlesInit(engine: never): Promise<void> {
    await loadFull(engine);
  }

  public async particlesLoaded(container: {
    canvas: { element: HTMLCanvasElement };
  }): Promise<void> {
    container.canvas.element.style.zIndex = "-1";
  }

  beforeCreate(): void {
    store.commit("initialiseStore");
  }

  created(): void {
    detectEthereumProvider().then((result: MetamaskProvider | unknown) => {
      if (!(result as MetamaskProvider)) {
        return;
      }
      MetamaskService.create(
        result as MetamaskProvider,
        store,
        this.events.metamask
      ).then((result) => (this.metamaskService = result));
    });

    WalletConnectService.create(
      new WalletConnectProvider({
        infuraId: "270dd5535d1344b2a5a507a081f3d45b",
      }),
      store,
      this.events.walletConnect
    ).then((result) => {
      this.walletConnectService = result;
    });
  }

  unmounted(): void {
    if (this.metamaskService instanceof MetamaskService) {
      this.metamaskService.removeEventsGroup(this.events.metamask);
    }
  }
}
</script>

<style lang="scss">
@import "main";
</style>
