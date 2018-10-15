<template>
  <div class="tooltip" ref="tooltip">
    <transition name="fade">
      <div ref="contentWrapper" :class="[{'tooltip__contentDark' : theme === 'Dark'},{'tooltip__contentLight': theme === 'Light'}]" class="tooltip__content" v-if="visible">
        {{ content }}
        <slot name="content" :close="close"></slot>
        <span 
          ref="arrow" 
          class="tooltip__arrow" 
          :class="[
          `tooltip__arrow__${filterPos(position)}${theme}`
          ]"
        ></span>
      </div>
    </transition>
    <span ref="triggerWrapper" style="display: inline-block;">
      <slot></slot>
    </span>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'

@Component
export default class QTooltip extends Vue {
  @Prop({
    default: 'top',
    validator(value) {
      return ['top', 'bottom', 'left', 'right', 'topLeft'].indexOf(value) >= 0
    },
  }) private position !: string
  @Prop({
    default: 'Dark',
    validator(value) {
      return ['Dark', 'Light'].indexOf(value) >= 0
    },
  }) private theme !: string
  @Prop(String) private content !: string
  @Prop({
    default: 'hover',
    validator(value) {
      return ['hover', 'click'].indexOf(value) >= 0
    },
  }) private trigger !: string
  private visible = false
  private triggerWrapper: any = {}

  private mounted() {
    const tooltip = this.$refs.tooltip as HTMLDivElement
    if (this.trigger === 'click') {
      tooltip.addEventListener('click', this.onClick)
    } else {
      tooltip.addEventListener('mouseenter', this.open)
      tooltip.addEventListener('mouseleave', this.close)
    }
  }

  private beforeDestroy() {
    const tooltip = this.$refs.tooltip as HTMLDivElement
    const triggerWrapper = this.$refs.triggerWrapper as HTMLDivElement
    if (this.trigger === 'click') {
      tooltip.removeEventListener('click', this.onClick)
    } else {
      tooltip.removeEventListener('mouseenter', this.open)
      tooltip.removeEventListener('mouseleave', this.close)
    }
    triggerWrapper.removeEventListener('ondrag', this.positionContent)
  }

  private filterPos(value) {
    if (value.length > 6) {
      if (value.substring(0, 3) === 'top') {
        return 'top'
      } else if (value.substring(0, 6) === 'bottom') {
        return 'bottom'
      }
    } else {
      return value
    }
  }

  private createContent() {
    const contentWrapper = this.$refs.contentWrapper as HTMLDivElement
    document.body.appendChild(contentWrapper)
    this.positionContent()
  }

  private positionContent() {
    const contentWrapper = this.$refs.contentWrapper as HTMLDivElement
    const triggerWrapper = this.$refs.triggerWrapper as HTMLDivElement
    const arrow = this.$refs.arrow as HTMLSpanElement
    const {width, height, top, left} = triggerWrapper.getBoundingClientRect()
    triggerWrapper.addEventListener('ondrag', this.positionContent)
    // const node: any = triggerWrapper.firstChild
    // console.log(getComputedStyle(node).marginTop)
    const {height: contentHeight, width: contentWidth} = contentWrapper.getBoundingClientRect()
    const positions = {
      top: {
        top: top + window.scrollY - contentHeight - 14,
        left: left + window.scrollX + (width - contentWidth) / 2,
        arrowLeft: contentWidth / 2 - 14,
        arrowTop: 10,
      },
      bottom: {
        top: top + height + window.scrollY + 8,
        left: left + (width - contentWidth) / 2 - window.scrollX,
        arrowLeft: contentWidth / 2 - 14,
        arrowTop: - (contentHeight - 4),
      },
      left: {
        top: top + window.scrollY - 6,
        left: left + window.scrollX - contentWidth - 10,
        arrowTop: - (contentHeight / 2 - 2),
        arrowLeft: contentWidth - 8,
      },
      right: {
        top: top + window.scrollY - 6,
        left: left + window.scrollX + width + 10,
        arrowTop: - (contentHeight / 2  - 2),
        arrowLeft: -14,
      },
      topLeft: {
        top: top + window.scrollY - contentHeight - 14,
        left: left + window.scrollX,
        arrowLeft: 8,
        arrowTop: 10,
      },
      topRight: {
        top: top + window.scrollY - contentHeight - 14,
        left: left - contentWidth + width + window.scrollX,
        arrowLeft: contentWidth - width + 8,
        arrowTop: 10,
      },
      bottomLeft: {
        top: top + height + window.scrollY + 8,
        left: left + window.scrollX,
        arrowLeft: 8,
        arrowTop: - (contentHeight - 4),
      },
      bottomRight: {
        top: top + height + window.scrollY + 8,
        left: left - contentWidth + width + window.scrollX,
        arrowLeft: contentWidth - width + 8,
        arrowTop: - (contentHeight - 4),
      }
    }
    contentWrapper.style.left = positions[this.position].left + 'px'
    contentWrapper.style.top = positions[this.position].top + 'px'
    arrow.style.marginLeft = positions[this.position].arrowLeft + 'px'
    arrow.style.marginTop = positions[this.position].arrowTop + 'px'
    if (this.position !== 'top') {
      arrow.style.marginTop = positions[this.position].arrowTop + 'px'
    }
  }

  private onClickDocument(e) {
    const tooltip = this.$refs.tooltip as HTMLDivElement
    const contentWrapper = this.$refs.contentWrapper as HTMLDivElement
    if (tooltip &&
      (tooltip === e.target || tooltip.contains(e.target))
    ) { return }
    if (contentWrapper &&
      (contentWrapper === e.target || contentWrapper.contains(e.target))
    ) { return }
    this.close()
  }

  private open() {
    this.visible = true
    this.$nextTick(() => {
      this.createContent()
      document.addEventListener('click', this.onClickDocument)
    })
  }

  private close() {
    this.visible = false
    document.removeEventListener('click', this.onClickDocument)
  }

  private onClick(event) {
    const triggerWrapper = this.$refs.triggerWrapper as HTMLDivElement
    if (triggerWrapper.contains(event.target)) {
      if (this.visible === true) {
        this.close()
      } else {
        this.open()
      }
    }
  }
}
</script>

<style scoped>
  .tooltip {
    display: inline-block;
    vertical-align: top;
    /* position: relative; */
  }
  .tooltip__content {
    position: absolute;
    z-index: 9999;
    text-align: center;
    box-sizing: border-box;
    border-radius: 4px;
    padding: 10px 8px;
    font-size: 12px;
  }
  .tooltip__contentDark {
    color: #d3d3d3;
    background-color: #414141;
  }
  .tooltip__contentLight {
    background-color: #fff;
    color: #414141;
    box-shadow:  0px 2px 8px rgba(0,0,0,.15);
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s
  }
  .fade-enter, .fade-leave-active {
    opacity: 0
  }
  .tooltip__arrow {
    display: block;
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
  }
  .tooltip__arrow__topDark,
  .tooltip__arrow__topLight {
    border-width: 6px 6px 0;
  }
  .tooltip__arrow__topDark {
    border-color: #414141 transparent transparent;
  }
  .tooltip__arrow__topLight {
    border-color: #fff transparent transparent;
  }
  .tooltip__arrow__topLight::before,
  .tooltip__arrow__topLight::after {
    content: '';
    position: absolute;
    top: -10px;
    left: -4px;
    z-index: -1;
    transform: rotate(45deg);
    width: 8px;
    height: 8px;
  }
  /* .tooltip__arrow__topLight::after {
    box-shadow: 1px 2px 0px 0px rgba(0,0,0,.1);
  } */
  .tooltip__arrow__topLight::before {
    box-shadow: 1px 1px 2px 0px rgba(0,0,0,.1);    
  }
  .tooltip__arrow__bottomDark,
  .tooltip__arrow__bottomLight{
    border-width:0 6px 6px;
  }
  .tooltip__arrow__bottomDark {
    border-color:transparent transparent #414141;
  }
  .tooltip__arrow__bottomLight {
    border-color:transparent transparent #fff;
  }
  .tooltip__arrow__bottomLight::before,
  .tooltip__arrow__bottomLight::after {
    content: '';
    position: absolute;
    top: 2px;
    left: -4px;
    z-index: -1;
    transform: rotate(45deg);
    width: 8px;
    height: 8px;
  }
  /* .tooltip__arrow__bottomLight::after {
    box-shadow: -1px -2px 0px 0px rgba(0,0,0,.1);
  } */
  .tooltip__arrow__bottomLight::before {
    box-shadow: -1px -1px 2px 0px rgba(0,0,0,.1);    
  }
  .tooltip__arrow__leftDark,
  .tooltip__arrow__leftLight{
    border-width:6px 0 6px 6px;
  }
  .tooltip__arrow__leftDark {
    border-color:transparent transparent transparent #414141;
  }
  .tooltip__arrow__leftLight{
    border-color:transparent transparent transparent #fff;
  }
  .tooltip__arrow__leftLight::before,
  .tooltip__arrow__leftLight::after {
    content: '';
    position: absolute;
    top: -4px;
    left: -10px;
    z-index: -1;
    transform: rotate(45deg);
    width: 8px;
    height: 8px;
  }
  /* .tooltip__arrow__leftLight::after {
    box-shadow: 2px -1px 0px 0px rgba(0,0,0,.1);
  } */
  .tooltip__arrow__leftLight::before {
    box-shadow: 1px -1px 2px 0px rgba(0,0,0,.1);    
  }
  .tooltip__arrow__rightDark,
  .tooltip__arrow__rightLight {
    border-width:6px 6px 6px 0;
  }
  .tooltip__arrow__rightDark {
    border-color:transparent #414141 transparent transparent;
  }
  .tooltip__arrow__rightLight {
    border-color:transparent #fff transparent transparent;
  }
  .tooltip__arrow__rightLight::before,
  .tooltip__arrow__rightLight::after {
    content: '';
    position: absolute;
    top: -4px;
    left: 2px;
    z-index: -1;
    transform: rotate(45deg);
    width: 8px;
    height: 8px;
  }
  /* .tooltip__arrow__rightLight::after {
    box-shadow: -2px 1px 0px 0px rgba(0,0,0,.1);
  } */
  .tooltip__arrow__rightLight::before {
    box-shadow: -1px 1px 2px 0px rgba(0,0,0,.1);    
  }
</style>
