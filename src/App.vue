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
import detectEthereumProvider from "@metamask/detect-provider";
import type { MetamaskProvider } from "@/utils/Service/MetamaskService";
import { loadFull } from "tsparticles";
import WalletConnectProvider from "@walletconnect/web3-provider";
import MetamaskService from "@/utils/Service/MetamaskService";
import WalletConnectService from "@/utils/Service/WalletConnectService";
import PhantomWalletService from "@/utils/Service/PhantomWalletService";
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
  @Provide({
    to: "metamaskService",
    reactive: true,
  })
  metamaskService: MetamaskService | false = false;

  @Provide({ to: "walletConnectService", reactive: true })
  walletConnectService: WalletConnectService | false = false;

  @Provide({ to: "phantomWalletService", reactive: true })
  phantomWalletService: PhantomWalletService | false = false;

  @wallet.Mutation
  public setDefaultWalletState!: () => string;

  private events = {
    metamask: {},
    walletConnect: {},
    phantomWallet: {},
  };

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
    this.$store.commit("initialiseStore");
  }

  created(): void {
    this.events = {
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
      phantomWallet: {},
    };

    // Ethereum.
    detectEthereumProvider().then((result: MetamaskProvider | unknown) => {
      if (!(result as MetamaskProvider)) {
        return;
      }
      MetamaskService.create(
        result as MetamaskProvider,
        this.$store,
        this.events.metamask
      ).then((result) => (this.metamaskService = result));
    });

    // WalletConnect.
    WalletConnectService.create(
      new WalletConnectProvider({
        infuraId: "270dd5535d1344b2a5a507a081f3d45b",
      }),
      this.$store,
      this.events.walletConnect
    ).then((result) => {
      this.walletConnectService = result;
    });

    // PhantomWallet.
    if ("phantom" in window) {
      const provider = window.phantom?.solana;

      if (provider?.isPhantom && (provider as PhantomWalletAdapter)) {
        PhantomWalletService.create(
          provider,
          this.$store,
          this.events.phantomWallet
        ).then((result) => {
          this.phantomWalletService = result;
        });
      }
    }
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
