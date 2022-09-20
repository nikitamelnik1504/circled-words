<template>
  <footer id="footer">
    <div class="container-fluid">
      <div class="row py-4 w-100 mx-auto">
        <div class="col-7 col-sm-6 px-md-5 mx-auto">
          <h3 class="m-0 copyright">© 2022 CircledWords</h3>
        </div>
        <div class="col-5 col-sm-6 px-md-5 mx-auto text-end">
          <h3 class="m-0 version">Version: {{ version }}</h3>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { Vue } from "vue-property-decorator";

export default class TheFooter extends Vue {
  version = process.env.npm_package_version;
}
</script>
