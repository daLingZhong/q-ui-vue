<template>
  <div class="qtab" ref="container" id="qtab">
    <slot v-if="position === 'bottom'||position === 'right'"></slot>
    <ul ref="list" :class="`qtab__list-${position}`">
      <!-- <li style="display: inline-block">123</li> -->
      <li
        v-for="(tab, index, key) in tabPanes"
        :class="[
          `qtab__nav-${position}`,
          {'qtab__active-horizontal': selectedIndex === index && isHorizontal && !type},
          {'qtab__active-left': selectedIndex === index && position === 'left' && !type},
          {'qtab__active-right': selectedIndex === index && position === 'right' && !type},
          {'qtab__list__card': type === 'card' && isHorizontal},
          {'qtab__list__card__active': selectedIndex === index &&  type === 'card' && isHorizontal},
          {'qtab__disabled': tab.disabled}
        ]"
        :key="key" 
        @click="select(index)"
      >
        <i v-if="tab.icon" class="icon" :class="`icon-${tab.icon}`"></i>
        {{ tab.label }}
        <i v-if="editable" class="icon icon-close" @click.stop="handleDelete(index)"></i>
      </li>
      <i v-if="editable" class="icon icon-plus qtab__addButton" @click="addPane()"></i>
    </ul>
    <slot v-if="position === 'top' || position === 'left'"></slot>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'

import TabPane from './TabPane.vue'

@Component
export default class QTabs extends Vue {
  @Prop({
    default: 'top',
    validator(value) {
      return ['top', 'bottom', 'left', 'right'].indexOf(value) >= 0
    },
  }) private position !: string
  @Prop({default: null}) private type !: string | null
  @Prop(Boolean) private editable !: boolean

  private tabPanes: any[] = []
  private selectedIndex: number = -1
  private containerWidth: string | null = ''

  private mounted() {
    // window.addEventListener('resize', this.onResize)
    const container: any = this.$refs.container as HTMLDivElement
    this.containerWidth = getComputedStyle(container).width
    // const a: any = this.$refs.list as HTMLDivElement
    // a.style.transform = 'translateX(-50px)'
    // console.log(getComputedStyle(a).getPropertyValue('transform'))
    // console.log(a.style.transform.replace(/[^\d.]/g, ''))
    this.update()
    if (this.selectedIndex === -1) {
      this.select(0)
    }
  }

  private update() {
    for (const tabPane of this.tabPanes) {
      if (!tabPane.disabled && tabPane.selected) {
        this.select(tabPane.index)
        break
      }
    }
  }

  private handleDelete(index) {
    this.$emit('tab-remove', this.tabPanes[index].label)
    this.selectedIndex = this.tabPanes.length - 2
    if (this.tabPanes.length > 1) {
      this.tabPanes[this.selectedIndex].selected = false
    }
    Vue.nextTick(() => {
      this.tabPanes[index].close()
      this.tabPanes.splice(index, 1)
      this.tabPanes[this.selectedIndex].selected = true
    })
  }

  private addPane() {
    this.$emit('tab-add')
    Vue.nextTick(() => {
      this.selectedIndex = this.tabPanes.length - 1
    })
  }

  get activeClass() {
    return 'qtab__active'
  }

  get isHorizontal(): boolean {
    if (this.position === 'top' || 'bottom') {
      return true
    } else {
      return false
    }
  }

  private select(index) {
    this.$emit('tab-selected', this.tabPanes[index])
    this.selectedIndex = index
  }

  // @Watch('containerWidth')
  // private onResize() {
  //   const container: any = this.$refs.container as HTMLDivElement
  //   this.containerWidth = getComputedStyle(container).width
  // }
}
</script>

<style scoped>
  @keyframes width {
    0% {
      width: 0;
      left: 50%;
    }
    100% {
      width: 100%;
      left: 0;
    }
  }
  @-webkit-keyframes width {
    0% {
      width: 0;
    }
    100% {
      width: 100%;
    }
  }
  @keyframes height {
    0% {
      height: 0;
      margin-top: -20px;
    }
    100% {
      height: 40px;
      margin-top: -40px;
    }
  }
  @-webkit-keyframes height {
    0% {
      height: 0;
      margin-top: -20px;
    }
    100% {
      height: 40px;
      margin-top: -40px;
    }
  }
  .qtab {
    margin-top: 20px;
    width: 100%;
    text-align: left;
  }
  .qtab > ul {
    padding: 0;
    list-style: none;
  }
  .qtab__addButton {
    line-height: 40px;
    font-size: 16px;
    cursor: pointer;
    color: #555555;
  }
  .qtab__list__card {
    border: 1px solid #e4e6e8;
    border-bottom: none;
    margin:0 2px 0 0 !important;
  }
  .qtab__list__card__active {
    color: #44a0f1 !important;
  }
  .qtab__list__card__active::after{
    content: '';
    background-color: #fff;
    width: 100%;
    height: 1px;
    display: block;
    position: absolute;
    left: 0;
  }
  .qtab__list-top,
  .qtab__list-bottom {
    max-height: 42px;
    overflow: hidden;
  }
  .qtab__list-left,
  .qtab__list-right {
    height: 100%;
    width: 160px;
    display: inline-block;
    position: relative;
  }
  .qtab__list-left::after,
  .qtab__list-top::after,
  .qtab__list-bottom::after,
  .qtab__list-right::before {
    content: '';
    background-color: #e4e6e8;
    display: block;
  }
  .qtab__list-left::after,
  .qtab__list-right::before {
    height: 100%;
    width: 1px;
    position: absolute;
    top: 0;
  }
  .qtab__list-left::after {
    right: 0;
  }
  .qtab__list-right::before {
    left: 0
  }
  .qtab__list-top::after,
  .qtab__list-bottom::after {
    width: 100%;
    height: 1px;
  }
  .qtab__list-top li:first-child {
    margin-left: 0;
  }
  .qtab__nav-top,
  .qtab__nav-left,
  .qtab__nav-bottom,
  .qtab__nav-right {
    font-size: 14px;
    color: #555555;
    height: 40px;
    cursor: pointer;
    line-height: 40px;
  }
  .qtab__nav-top,
  .qtab__nav-bottom {
    display: inline-block;
    width: auto;
    margin: 0 8px;
    padding: 0 16px;
    position: relative;
  }
  .qtab__nav-left,
  .qtab__nav-right {
    text-align: center
  }
  .qtab__active-horizontal,
  .qtab__active-left,
  .qtab__active-right {
    color: #44a0f1
  }
  .qtab__disabled {
    color: #999999;
    pointer-events: none;
  }
  .qtab__active-horizontal::after {
    content: '';
    display: block;
    position: absolute;
    height: 2px;
    background-color: #44a0f1;
    animation: width .5s forwards;
    margin-top: -1px;
  }
  .qtab__active-left::after,
  .qtab__active-right::after {
    content: '';
    display: block;
    position: absolute;
    width: 2px;
    background-color: #44a0f1;
    height: 40px;
    animation: height .5s forwards;
  }
  .qtab__active-left::after {
    right: 0;
  }
  .qtab__active-right::after {
    left: 0;
  }
</style>

