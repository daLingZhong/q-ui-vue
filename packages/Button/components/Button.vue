<template>
  <button 
    class="button"
    ref="button"
    @click="handleClick"
    :disabled="loading || disabled"
    :class="[
      `button__${size}`, 
      `button__${type}`,
      {'button__disabled__normal': buttonDisabled && (['normal', 'dashed', 'text'].indexOf(type) >= 0)},
      {'button__disabled': buttonDisabled && (['primary', 'success', 'warning', 'danger'].indexOf(type) >= 0)}
    ]"
    :style="[{'cursor': mouseSyle}]"
  >
    <i class="iconfont icon-loading button__loading" v-if="loading" ref="loadingIcon"></i>
    <i class="icon" :class="`icon-${icon}`" v-if="icon && !loading" ref="icon"></i>
    <div class="button__content" ref="content">
      <div v-if="!loading">
        <slot></slot>
      </div>
      <div v-if="loading && haveContent">Loading...</div>
    </div>
  </button>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

import '../../style/iconfont.css'

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
      button .style.minWidth = 'auto'
      this.haveContent = false
    } else {
      if ((this.$refs.loadingIcon as HTMLDivElement)) {
        (this.$refs.loadingIcon as HTMLDivElement).style.marginLeft = '0'
        this.haveContent = true
      }
      if ((this.$refs.icon as HTMLDivElement)) {
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

<style scoped>
  .button {
    font-size: 14px;
    border-radius: 2px;
    font-family: 'PingFangSC', 'Microsoft YaHei';
    outline: none;
    margin: 0 5px;
    color: #555555;
  }
  .button i {
    display: inline-block;
    margin-right: 8px;
    color: #9195AA;
  }
  .button__content {
    display: inline-block;
    margin-top: -1px;
  }
  .button__disabled {
    opacity: .6;
    border-color: transparent;
  }
  .button__disabled__normal {
    background-color: #f4f4f4 !important;
    border-color: #e4e6e8 !important;
    color: #a3a3a3 !important;
  }
  @-webkit-keyframes spin {
    0%   {
        -webkit-transform: rotate(0deg);
        -ms-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(360deg);
        -ms-transform: rotate(360deg);
        transform: rotate(360deg);
    }
  }
  @keyframes spin {
    0%   {
        -webkit-transform: rotate(0deg);
        -ms-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(360deg);
        -ms-transform: rotate(360deg);
        transform: rotate(360deg);
    }
  }
  .button__loading {
    animation: spin 2s infinite linear;
  }
  .button__large {
    min-width: 78px;
    min-height: 36px;
    padding: 0 20px;
  }
  .button__medium {
    min-width: 72px;
    min-height: 32px;
    padding: 0 16px;
  }
  .button__large i,
  .button__medium i {
    margin: 0 8px;
  }
  .button__small {
    min-width: 56px;
    min-height: 28px;
    padding: 0 12px;
  }
  .button__small i {
    margin: 0 6px;
  }
  .button__mini {
    min-width: 48px;
    min-height: 24px;
    padding: 0 8px;
  }
  .button__mini i {
    margin: 0 4px
  }
  .button__normal {
    background-color: #fff;
    border: 1px solid #e4e6e8;
  }
  .button__normal:hover {
    color: #44A0f1;
    border-color:#44A0f1;
  }
  .button__success {
    background-color: #4ad886;
    border: 1px solid #4ad886;
    color: #fff;
  }
  .button__success:hover {
    opacity: .6;
    border-color: transparent;
  }
  .button__primary {
    background-color: #44A0f1;
    border: 1px solid #44A0f1;
    color: #fff;
  }
  .button__primary:hover {
    opacity: .6;
    border-color: transparent;
  }
  .button__warning {
    background-color: #fa8e3b;
    border: 1px solid #fa8e3b;
    color: #fff;
  }
  .button__warning:hover {
    opacity: .6;
    border-color: transparent;
  }
  .button__danger {
    background-color: #f83b3b;
    border: 1px solid #f83b3b;
    color: #fff;
  }
  .button__danger:hover {
    opacity: .6;
    border-color: transparent;
  }
  .button__success i,
  .button__warning i,
  .button__danger i,
  .button__primary i {
    color: #fff
  }
  .button__dashed {
    background-color: #fff;
    border: 1px dashed #e4e6e8;
  }
  .button__dashed:hover{
    color: #44A0f1;
    border-color:#44A0f1;
  }
  .button__text {
    background-color: transparent;
    border: none;
    min-width: auto;
    padding: 0;
    font-size: 13px;
  }
  .button__text:hover {
    color: #44A0f1;
  }
</style>

