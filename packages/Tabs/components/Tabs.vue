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
