import { Vue, Options } from "vue-property-decorator";
import { getFreeHeight } from "@/utils/layout-space";
import { computed } from "vue";
import type { ComputedRef } from "vue";

@Options({})
export default class PageBase extends Vue {
  constructor(...args: Array<unknown>) {
    super(args);
  }

  heightValues: { [key: string]: number } = getFreeHeight();

  minHeightValue: ComputedRef<number> = computed(() => {
    return (
      this.heightValues.clientHeight -
      this.heightValues.headerHeight -
      this.heightValues.footerHeight
    );
  });

  mounted(): void {
    this.$nextTick((): void => {
      window.addEventListener("resize", this.onResize);
    });
  }

  onResize(): void {
    this.heightValues = getFreeHeight();
  }
}
