<template>
  <div class="q-button-group" ref="content">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class QButtonGroup extends Vue {
  private mounted() {
    this.group()
  }
  private updated() {
    this.group()
  }
  private group() {
    const buttonContent = this.$refs.content as HTMLDivElement
    const buttonGroup = buttonContent.querySelectorAll('.qbutton')
    if (buttonGroup.length < 2) {
      return
    } else {
      for (let i = 0; i < buttonGroup.length; i++) {
        const button = buttonGroup[i] as HTMLButtonElement
        button.style.margin = '0 .5px'
        if (i === 0) {
          button.style.borderRadius = '2px 0 0 2px'
        } else if (i === buttonGroup.length - 1) {
          button.style.borderRadius = '0 2px 2px 0'
        } else {
          button.style.borderRadius = '0'
        }
      }
    }
  }
}
</script>

<style>
  .q-button-group{
    margin: 10px auto;
  }
</style>
