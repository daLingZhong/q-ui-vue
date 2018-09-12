<template>
  <div class="tooltip" ref="tooltip">
    <transition name="fade">
      <div ref="contentWrapper" :class="[{'tooltip__contentDark' : theme === 'Dark'},{'tooltip__contentLight': theme === 'Light'}]" class="tooltip__content" v-if="visible">
        {{ content }}
        <slot name="content" :close="close"></slot>
        <span ref="arrow" class="tooltip__arrow" :class="[`tooltip__arrow__${position}${theme}`]"></span>
      </div>
    </transition>
    <span ref="triggerWrapper" style="display: inline-block;">
      <slot></slot>
    </span>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class QTooltip extends Vue {
  @Prop({
    default: 'top',
    validator(value) {
      return ['top', 'bottom', 'left', 'right'].indexOf(value) >= 0
    },
  }) private position !: string
  @Prop({
    default: 'Dark',
    validator(value) {
      return ['Dark', 'Light'].indexOf(value) >= 0
    },
  }) private theme !: string
  @Prop(String) private content !: string
  private visible = false

  private mounted() {
    const tooltip = this.$refs.tooltip as HTMLDivElement
    tooltip.addEventListener('mouseenter', this.open)
    tooltip.addEventListener('mouseleave', this.close)
  }

  private beforeDestroy() {
    const tooltip = this.$refs.tooltip as HTMLDivElement
    tooltip.removeEventListener('mouseenter', this.open)
    tooltip.removeEventListener('mouseleave', this.close)
  }

  private positionContent() {
    const contentWrapper = this.$refs.contentWrapper as HTMLDivElement
    const triggerWrapper = this.$refs.triggerWrapper as HTMLDivElement
    const arrow = this.$refs.arrow as HTMLSpanElement
    document.body.appendChild(contentWrapper)
    const {width, height, top, left} = triggerWrapper.getBoundingClientRect()
    const {height: contentHeight, width: contentWidth} = contentWrapper.getBoundingClientRect()
    const positions = {
      top: {
        top: top + window.scrollY - contentHeight - 14,
        left: left + window.scrollX + (width - contentWidth) / 2,
        arrowLeft: contentWidth / 2 - 14,
        arrowTop: 8,
      },
      bottom: {
        top: top + height + window.scrollY + 8,
        left: left + (width - contentWidth) / 2 - window.scrollX,
        arrowLeft: contentWidth / 2 - 14,
        arrowTop: - (contentHeight - 2),
      },
      left: {
        top: top + window.scrollY - 6,
        left: left + window.scrollX - contentWidth - 6,
        arrowTop: - (contentHeight / 2 - 2),
        arrowLeft: contentWidth - 8,
      },
      right: {
        top: top + window.scrollY - 6,
        left: left + window.scrollX + width + 6,
        arrowTop: - (contentHeight / 2  - 2),
        arrowLeft: -14,
      },
    }
    contentWrapper.style.left = positions[this.position].left + 'px'
    contentWrapper.style.top = positions[this.position].top + 'px'
    arrow.style.marginLeft = positions[this.position].arrowLeft + 'px'
    arrow.style.marginTop = positions[this.position].arrowTop + 'px'
    if (this.position !== 'top') {
      arrow.style.marginTop = positions[this.position].arrowTop + 'px'
    }
  }

  private open() {
    this.visible = true
    this.$nextTick(() => {
      this.positionContent()
    })
  }

  private close() {
    this.visible = false
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
    padding: 8px 8px;
    font-size: 12px;
  }
  .tooltip__contentDark {
    color: #ffffff;
    background-color: #000000;
  }
  .tooltip__contentLight {
    background-color: #fff;
    color: #000000;
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
    border-color: #000000 transparent transparent;
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
  .tooltip__arrow__topLight::after {
    box-shadow: 1px 2px 0px 0px rgba(0,0,0,.1);
  }
  .tooltip__arrow__topLight::before {
    box-shadow: 2px 1px 0px 0px rgba(0,0,0,.1);    
  }
  .tooltip__arrow__bottomDark,
  .tooltip__arrow__bottomLight{
    border-width:0 6px 6px;
  }
  .tooltip__arrow__bottomDark {
    border-color:transparent transparent #000000;
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
  .tooltip__arrow__bottomLight::after {
    box-shadow: -1px -2px 0px 0px rgba(0,0,0,.1);
  }
  .tooltip__arrow__bottomLight::before {
    box-shadow: -2px -1px 0px 0px rgba(0,0,0,.1);    
  }
  .tooltip__arrow__leftDark,
  .tooltip__arrow__leftLight{
    border-width:6px 0 6px 6px;
  }
  .tooltip__arrow__leftDark {
    border-color:transparent transparent transparent #000000;
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
  .tooltip__arrow__leftLight::after {
    box-shadow: 2px -1px 0px 0px rgba(0,0,0,.1);
  }
  .tooltip__arrow__leftLight::before {
    box-shadow: 1px -2px 0px 0px rgba(0,0,0,.1);    
  }
  .tooltip__arrow__rightDark,
  .tooltip__arrow__rightLight {
    border-width:6px 6px 6px 0;
  }
  .tooltip__arrow__rightDark {
    border-color:transparent #000000 transparent transparent;
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
  .tooltip__arrow__rightLight::after {
    box-shadow: -2px 1px 0px 0px rgba(0,0,0,.1);
  }
  .tooltip__arrow__rightLight::before {
    box-shadow: -1px 2px 0px 0px rgba(0,0,0,.1);    
  }
</style>
