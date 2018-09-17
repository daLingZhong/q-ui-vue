<template>
  <button 
    class="button"
    ref="button"
    @click="handleClick"
    :disabled="loading"
    :style="{
      'backgroundColor': bgColor,
      'borderColor': borderColor,
      'borderStyle': borderStyle,
      'width': buttonWidth,
      'height': buttonHeight,
      'padding': buttonPadding,
      'fontSize': fontSize,
      'cursor': mouseSyle
    }"
  >
    <i class="iconfont icon-loading button__loading" :style="{'margin': iconMargin, 'color': iconColor}" v-if="loading"></i>
    <i class="icon" :class="`icon-${icon}`" v-if="icon && !loading" :style="{'margin': iconMargin, 'color': iconColor}" ref="icon"></i>
    <div class="button__content" :style="{'color': fontColor}" ref="content">
      <div v-if="!loading">
        <slot></slot>
      </div>
      <div v-if="loading && haveContent">Loading...</div>
    </div>
  </button>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

const TYPE: string[] = ['primary', 'success', 'warning', 'danger', 'text', 'dashed']
const COLOR: string[] = ['#4ad886', '#fa8e3b', '#f83b3b', '#44A0f1']
const DISCOLOR: string[] = ['#4ad886', '#fa8e3b', '#f83b3b', '#92c9f9', '#f4f4f4']
const WIDTH: string[] = ['78px', '72px', '56px', '48px']
const HEIGHT: string[] = ['36px', '32px', '28px', '24px']

import '../../style/iconfont.css'

@Component
export default class QButton extends Vue {
  @Prop(String) private icon !: string
  @Prop({
    validator(value) {
      return ['primary', 'success', 'warning', 'danger', 'text', 'dashed'].indexOf(value) >= 0
    },
  }) private type !: string
  @Prop({
    validator(value) {
      return ['large', 'small', 'mini'].indexOf(value) >= 0
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
      (this.$refs.button as HTMLDivElement).style.padding = '0'
      this.haveContent = false
    } else {
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

  get fontColor(): string {
    const type = ['success', 'warning', 'danger', 'primary']
    if (type.indexOf(this.type) >= 0) {
      return '#fff'
    } else {
      if (this.buttonDisabled) {
        return '#ADADAD'
      } else {
        return '#555555'
      }
    }
  }

  get bgColor(): string {
    if (this.type === 'text') {
      return 'transparent'
    } else {
      let color
      if (this.buttonDisabled) {
        switch (this.type) {
          case 'success':
            color = DISCOLOR[0]
            break;
          case 'warning':
            color = DISCOLOR[1]
            break;
          case 'danger':
            color = DISCOLOR[2]
            break;
          case 'primary':
            color = DISCOLOR[3]
            break;
          default:
            color = DISCOLOR[4]
        }
      } else {
        switch (this.type) {
          case 'success':
            color = COLOR[0]
            break;
          case 'warning':
            color = COLOR[1]
            break;
          case 'danger':
            color = COLOR[2]
            break;
          case 'primary':
            color = COLOR[3]
            break;
          default:
            color = '#fff'
        }
      }
      return color
    }
  }

  get borderColor(): string {
    let color
    if (this.buttonDisabled) {
      switch (this.type) {
        case 'success':
          color = DISCOLOR[0]
          break;
        case 'warning':
          color = DISCOLOR[1]
          break;
        case 'danger':
          color = DISCOLOR[2]
          break;
        case 'primary':
          color = DISCOLOR[3]
          break;
        default:
          color = DISCOLOR[4]
      }
    } else {
      switch (this.type) {
        case 'success':
          color = COLOR[0]
          break;
        case 'warning':
          color = COLOR[1]
          break;
        case 'danger':
          color = COLOR[2]
          break;
        case 'primary':
          color = COLOR[3]
          break;
        default:
          color = '#e4e6e8'
      }
    }
    return color
  }

  get borderStyle(): string {
    if (this.type === 'text') {
      return 'none'
    } else if (this.type === 'dashed') {
      return 'dashed'
    } else {
      return 'solid'
    }
  }

  get buttonWidth(): string {
    if (this.icon || this.type === 'text' || this.loading) {
      return 'auto'
    } else {
      let width
      switch (this.size) {
        case 'large':
          width = WIDTH[0]
          break;
        case 'small':
          width = WIDTH[2]
          break;
        case 'mini':
          width = WIDTH[3]
          break;
        default:
          width = WIDTH[1]
      }
      return width
    }
  }

  get buttonHeight(): string {
    if (this.type === 'text') {
      return 'auto'
    } else {
      let height
      switch (this.size) {
        case 'large':
          height = HEIGHT[0]
          break;
        case 'small':
          height = HEIGHT[2]
          break;
        case 'mini':
          height = HEIGHT[3]
          break;
        default:
          height = HEIGHT[1]
      }
      return height
    }
  }

  get buttonPadding(): string {
    let padding
    switch (this.size) {
      case 'large':
        padding = '0 20px'
        break;
      case 'small':
        padding = '0 12px'
        break;
      case 'mini':
        padding = '0 8px'
        break;
      default:
        padding = '0 16px'
    }
    return padding
  }

  get fontSize(): string {
    if (this.type === 'text') {
      return '13px'
    } else {
      return '14px'
    }
  }

  get iconMargin(): string {
    let margin
    switch (this.size) {
      case 'large':
        margin = '0 8px'
        break;
      case 'small':
        margin = '0 6px'
        break;
      case 'mini':
        margin = '0 4px'
        break;
      default:
        margin = '0 8px'
    }
    return margin
  }

  get iconColor(): string {
    const array = ['success', 'warning', 'danger', 'primary']
    if (array.indexOf(this.type) >= 0) {
      return '#fff'
    } else {
      return '#9195AA'
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
    height: 32px;
    width: 72px;
    border-radius: 2px;
    border: 1px solid #e4e6e8;
    font-family: 'PingFangSC', 'Microsoft YaHei';
    background: #fff;
    outline: none;
    margin: 0 5px;
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
</style>

