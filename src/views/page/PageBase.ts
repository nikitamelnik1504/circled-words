import { Vue, Options } from "vue-property-decorator";
import { getFreeHeight } from "@/utils/layout-space";

@Options({})
export default class PageBase extends Vue {
  heightValue: { [key: string]: number } = getFreeHeight();
  minHeightValue: number =
    this.heightValue["clientHeight"] -
    this.heightValue["headerHeight"] -
    this.heightValue["footerHeight"];

  mounted(): void {
    this.$nextTick((): void => {
      window.addEventListener("resize", this.onResize);
    });
  }

  onResize(): void {
    this.heightValue = getFreeHeight();
  }
}
