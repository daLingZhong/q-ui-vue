<template>
  <div 
    v-show="selected" 
    :class="[
      {'qtabpane-leftRight': !position},
      {'qtabpane-topBottom': position}
    ]"
    >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import index from 'src';

@Component
export default class QTabPane extends Vue {
  @Prop(String) private label !: string
  @Prop(Boolean) private active !: boolean
  @Prop(Boolean) private disabled !: boolean
  @Prop(String) private icon !: string

  private selected: boolean = this.active

  private mounted() {
    const parent: any = this.$parent
    parent.tabPanes.push(this)
    if (this.selected) {
      parent.selectedIndex = this.index
    }
  }

  private close() {
    this.$el.remove()
    this.$destroy()
  }

  get index(): number {
    const parent: any = this.$parent
    return parent.tabPanes.indexOf(this)
  }

  get position(): boolean {
    const parent: any = this.$parent
    if (parent.position === 'top' || parent.position === 'bottom') {
      return true
    } else {
      return false
    }
  }

  @Watch('$parent.selectedIndex')
  private onIndexChange(val, oldVal) {
    this.selected = this.index === val
  }
}
</script>

<style>
.qtabpane-topBottom,
.qtabpane-leftRight {
  display: inline-block; 
  word-wrap: break-word;
}
.qtabpane-topBottom {
  width: 100%;
  height: calc(100% - 41px)
}
.qtabpane-leftRight {
  width: calc(100% - 160px)
}
</style>

