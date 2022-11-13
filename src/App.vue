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

<script lang="ts">
import particlesJson from "./assets/json/particles.json";
import particlesIcon from "./assets/images/live-bg-icon.svg";
import { Vue, Options, Provide, Watch } from "vue-property-decorator";
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
import { namespace } from "s-vuex-class";
import type { Store } from "vuex";
import type { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";

const wallet = namespace("wallet");

@Options({
  name: "App",
  components: {
    Header,
    Footer,
  },
})
export default class App extends Vue {
  particlesConfig = particlesJson;

  @Provide({
    to: "metamaskService",
    reactive: true,
  })
  metamaskService: MetamaskService | false = false;

  @Provide({ to: "walletConnectService", reactive: true })
  walletConnectService: WalletConnectService | false = false;

  @Provide({ to: "phantomWalletService", reactive: true })
  phantomWalletService: PhantomWalletService | false = false;

  @Provide({ to: "walletEvents", reactive: true })
  walletEvents = {
    metamask: {},
    walletConnect: {},
    phantomWallet: {},
  };

  @Provide({ to: "metaplexService", reactive: true })
  metaplexService: MetaplexService | false = false;

  @wallet.Mutation
  public setDefaultWalletState!: () => string;

  private $store!: Store<unknown>;

  public async particlesInit(engine: never): Promise<void> {
    await loadFull(engine);
  }

  public async particlesLoaded(container: {
    canvas: { element: HTMLCanvasElement };
  }): Promise<void> {
    container.canvas.element.style.zIndex = "-1";
    container.canvas.element.style.width = "100vw";
    container.canvas.element.style.height = "100vh";
  }

  beforeCreate(): void {
    // Use particles image as relative path.
    this.particlesConfig.particles.shape.options.image.src =
      particlesIcon as string;

    this.$store.commit("initialiseStore");
  }

  created(): void {
    this.walletEvents = {
      metamask: {
        accountsChanged: [
          {
            callback: () => {
              this.setDefaultWalletState();
              this.$router.go(0);
            },
            connected: true,
          },
        ],
      },
      walletConnect: {
        disconnect: [
          {
            callback: () => {
              this.setDefaultWalletState();
              this.$router.go(0);
            },
            connected: true,
          },
        ],
      },
      phantomWallet: {
        accountChanged: [
          {
            callback: () => {
              this.setDefaultWalletState();
              this.$router.go(0);
            },
            connected: true,
          },
        ],
      },
    };

    this.initializeMetamask().then((result: MetamaskProvider | unknown) => {
      if (!(result as MetamaskProvider)) {
        return;
      }
      MetamaskService.create(
        result as MetamaskProvider,
        this.$store,
        this.walletEvents.metamask
      ).then((result) => (this.metamaskService = result));
    });

    WalletConnectService.create(
      this.initializeWalletConnect(),
      this.$store,
      this.walletEvents.walletConnect,
      this.initializeWalletConnect
    ).then((result) => {
      this.walletConnectService = result;
    });

    const phantomWalletProvider = this.initializePhantomWallet();
    if (phantomWalletProvider) {
      PhantomWalletService.create(
        phantomWalletProvider,
        this.$store,
        this.walletEvents.phantomWallet
      ).then((result) => {
        this.phantomWalletService = result;
      });
    }
  }

  async initializeMetamask(): Promise<unknown> {
    return detectEthereumProvider();
  }

  initializeWalletConnect(): WalletConnectProvider {
    return new WalletConnectProvider({
      infuraId: "270dd5535d1344b2a5a507a081f3d45b",
    });
  }

  initializePhantomWallet(): PhantomWalletAdapter | false {
    if (!("phantom" in window)) {
      return false;
    }
    const provider = window.phantom?.solana;

    if (!provider?.isPhantom || !(provider as PhantomWalletAdapter)) {
      return false;
    }

    return provider;
  }

  @Watch("phantomWalletService", { deep: true })
  onPhantomWalletConnected(service: unknown) {
    if (!(service instanceof PhantomWalletService)) {
      return;
    }

    if (
      service.connected &&
      service.connectedToSite &&
      this.metaplexService === false
    ) {
      this.metaplexService = new MetaplexService(
        (this.phantomWalletService as PhantomWalletService).provider
      );
    }
  }

  unmounted(): void {
    if (this.metamaskService instanceof MetamaskService) {
      this.metamaskService.removeEventsGroup(this.walletEvents.metamask);
    }
    if (this.phantomWalletService instanceof PhantomWalletService) {
      this.phantomWalletService.removeEventsGroup(
        this.walletEvents.phantomWallet
      );
    }
  }
}
</script>

<style lang="scss">
@import "main";
</style>
