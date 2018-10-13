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

<style scoped>
  .qbutton {
    font-size: 14px;
    border-radius: 2px;
    font-family: 'PingFangSC', 'Microsoft YaHei';
    outline: none;
    margin: 0 5px;
    color: #555555;
  }
  .qbutton i {
    display: inline-block;
    margin-right: 8px;
    color: #9195AA;
  }
  .qbutton__content {
    display: inline-block;
    margin-top: -1px;
  }
  .qbutton__disabled {
    opacity: .6;
    border-color: transparent;
  }
  .qbutton__disabled__normal {
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
  .qbutton__loading {
    animation: spin 2s infinite linear;
  }
  .qbutton__large {
    min-width: 78px;
    min-height: 36px;
    padding: 0 20px;
  }
  .qbutton__medium {
    min-width: 72px;
    min-height: 32px;
    padding: 0 16px;
  }
  .qbutton__large i,
  .qbutton__medium i {
    margin: 0 8px;
  }
  .qbutton__small {
    min-width: 56px;
    min-height: 28px;
    padding: 0 12px;
  }
  .qbutton__small i {
    margin: 0 6px;
  }
  .qbutton__mini {
    min-width: 48px;
    min-height: 24px;
    padding: 0 8px;
  }
  .qbutton__mini i {
    margin: 0 4px
  }
  .qbutton__normal {
    background-color: #fff;
    border: 1px solid #e4e6e8;
  }
  .qbutton__success {
    background-color: #4ad886;
    border: 1px solid #4ad886;
    color: #fff;
  }
  .qbutton__primary {
    background-color: #44A0f1;
    border: 1px solid #44A0f1;
    color: #fff;
  }
  .qbutton__warning {
    background-color: #fa8e3b;
    border: 1px solid #fa8e3b;
    color: #fff;
  }
  .qbutton__danger {
    background-color: #f83b3b;
    border: 1px solid #f83b3b;
    color: #fff;
  }
  .qbutton__danger:hover,
  .qbutton__warning:hover,
  .qbutton__success:hover,
  .qbutton__primary:hover {
    opacity: .6;
    border-color: transparent;
  }
  .qbutton__danger:active,
  .qbutton__warning:active,
  .qbutton__success:active,
  .qbutton__primary:active {
    opacity: 1;
  }
  .qbutton__success i,
  .qbutton__warning i,
  .qbutton__danger i,
  .qbutton__primary i {
    color: #fff
  }
  .qbutton__dashed {
    background-color: #fff;
    border: 1px dashed #e4e6e8;
  }
  .qbutton__normal:hover,
  .qbutton__dashed:hover{
    color: #44A0f1;
    border-color:#44A0f1;
  }
  .qbutton__normal:active,
  .qbutton__dashed:active{
    color: #555555;
    border-color:#e4e6e8;
  }
  .qbutton__text {
    background-color: transparent !important;
    border: none;
    min-width: auto;
    padding: 0;
    font-size: 13px;
  }
  .qbutton__text:hover {
    color: #44A0f1;
  }

  @keyframes dot {
    25% {
      box-shadow: none;
    }
    50% {
      box-shadow: 2px 0 currentColor;
    }
    75% {
      box-shadow: 2px 0 currentColor, 6px 0 currentColor;
    }
  }

  @-webkit-keyframes dot {
    25% {
      box-shadow: none;
    }
    50% {
      box-shadow: 2px 0 currentColor;
    }
    75% {
      box-shadow: 2px 0 currentColor, 6px 0 currentColor;
    }
  }

  .dotting {
    display: inline-block;
    min-width: 2px;
    min-height: 2px;
    box-shadow: 2px 0 currentColor, 6px 0 currentColor, 10px 0 currentColor;
    animation: dot 4s infinite step-start both;
  }
  .dotting:before {
    content: '...'
  }
  .dotting::before {
    content: ''
  }
</style>
