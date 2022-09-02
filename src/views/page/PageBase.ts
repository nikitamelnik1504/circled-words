import { Vue, Options } from "vue-property-decorator";
import { getFreeHeight } from "@/utils/layout-space";

@Options({})
export default class PageBase extends Vue {
  heightValues: { [key: string]: number } = getFreeHeight();
  minHeightValue: number =
    this.heightValues["clientHeight"] -
    this.heightValues["headerHeight"] -
    this.heightValues["footerHeight"];

  constructor(...args: Array<unknown>) {
    super(args);
  }

  mounted(): void {
    this.$nextTick((): void => {
      window.addEventListener("resize", this.onResize);
    });
  }

  onResize(): void {
    this.heightValues = getFreeHeight();
  }
}
