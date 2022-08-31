import { Vue, Options } from "vue-property-decorator";
import { getFreeHeight } from "@/utils/layout-space";

@Options({})
export default class PageBase extends Vue {
  freeHeight: { [key: string]: number } = getFreeHeight();

  mounted(): void {
    this.$nextTick((): void => {
      window.addEventListener("resize", this.onResize);
    });
  }

  onResize(): void {
    this.freeHeight = getFreeHeight();
  }
}
