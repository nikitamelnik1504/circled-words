import { Vue, Options } from "vue-property-decorator";

@Options({})
export default class PageBase extends Vue {
  constructor(...args: Array<unknown>) {
    super(args);
  }
}
