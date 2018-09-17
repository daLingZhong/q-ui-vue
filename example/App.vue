<template>
  <div id="app" class="content">
    <menuBar></menuBar>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

import MenuBar from './views/components/MenuBar.vue'

@Component({
  components: {
    MenuBar,
  },
})
export default class App extends Vue {}
</script>

<style src="./style/app.css"></style>
