<template>
  <button 
    class="qbutton"
    ref="button"
    @click="handleClick"
    :disabled="loading || disabled"
    :class="[
      `qbutton__${size}`, 
      `qbutton__${type}`,
      {'qbutton__disabled__normal': buttonDisabled && (['normal', 'dashed', 'text'].indexOf(type) >= 0)},
      {'qbutton__disabled': buttonDisabled && (['primary', 'success', 'warning', 'danger'].indexOf(type) >= 0)}
    ]"
    :style="[{'cursor': mouseSyle}]"
  >
    <i class="icon icon-loading qbutton__loading" v-if="loading" ref="loadingIcon"></i>
    <i class="icon" :class="`icon-${icon}`" v-if="icon && !loading" ref="icon"></i>
    <div class="qbutton__content" ref="content">
      <div v-if="!loading">
        <slot></slot>
      </div>
      <div v-if="loading && haveContent" style="margin-right: 10px;">Loading<span class="dotting"></span></div>
    </div>
  </button>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class QButton extends Vue {
  @Prop(String) private icon !: string
  @Prop({
    default: 'normal',
    validator(value) {
      return ['primary', 'success', 'warning', 'danger', 'text', 'dashed', 'normal'].indexOf(value) >= 0
    },
  }) private type !: string
  @Prop({
    default: 'medium',
    validator(value) {
      return ['large', 'medium', 'small', 'mini'].indexOf(value) >= 0
    },
  }) private size !: string
  @Prop(Boolean) private disabled !: boolean
  @Prop({default: false}) private loading !: boolean
  private haveContent: boolean = true

  private mounted() {
    this.resize()
  }

  private updated() {
    this.resize()
  }

  private resize() {
    if (getComputedStyle((this.$refs.content as HTMLDivElement)).width === '0px') {
      const button = this.$refs.button as HTMLDivElement
      button.style.padding = '0'
      button.style.minWidth = 'auto'
      this.haveContent = false
    } else {
      if ((this.$refs.loadingIcon as HTMLDivElement)) {
        (this.$refs.loadingIcon as HTMLDivElement).style.marginLeft = '0'
        this.haveContent = true
      } else if ((this.$refs.icon as HTMLDivElement)) {
        (this.$refs.icon as HTMLDivElement).style.marginLeft = '0'
        this.haveContent = true
      }
    }
  }

  private handleClick(e) {
    this.$emit('click', e);
  }

  get buttonDisabled(): boolean {
    if (this.disabled || this.loading) {
      return true
    } else {
      return false
    }
  }

  get mouseSyle(): string {
    if (this.buttonDisabled) {
      return 'not-allowed'
    } else {
      return 'pointer'
    }
  }
}
</script>
