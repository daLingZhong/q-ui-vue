<template>
  <div class="qinput"
    :class="[
      {
        'qinput-group--prepend': $slots.prepend || $slots.append || $slots.enterButton
      }
    ]"
  >
    <!-- 前置内容 -->
    <div class="qinput-group__prepend" v-if="$slots.prepend">
      <slot name="prepend"></slot>
    </div>
    <!-- 前置图标 -->
    <span class="qinput__prefix__icon" v-if="$slots.prefix || prefix">
      <slot name="prefix"></slot>
      <i class="icon"
          v-if="prefix"
          :class="`icon-${prefix}`">
      </i>
    </span>
    <input 
      v-bind="$attrs"
      :placeholder="placeholder" 
      :class="[
        `qinput-${size}`,
        {
          'qinput__normal': !$slots.prepend || !$slots.append,
          'qinput__prepend': $slots.prepend,
          'qinput__append': $slots.append,
          'qinput__prefix': $slots.prefix || prefix,
          'qinput__suffix': $slots.suffix || suffix,
        }
      ]" 
      :value="currentValue" 
      v-if="type === 'text'" 
      :disabled="disabled"
      ref="qinput"
      @input="handleInput($event)"
      @focus="$emit('focus', $event)"
      @blur="$emit('blur', $event)"
      @change="$emit('change', $event.target.value)"
    >
    <!-- 后置内容 -->
    <div class="qinput-group__append" v-if="$slots.append">
      <slot name="append"></slot>
    </div>
    <!-- 后置图标 -->
    <span class="qinput__suffix__icon" v-if="$slots.suffix || suffix">
      <slot name="suffix"></slot>
      <i class="icon"
          v-if="suffix"
          :class="`icon-${suffix}`">
      </i>
    </span>
    <!-- 后置按钮 -->
    <div v-if="$slots.enterButton" class="qinput__enterButton" ref="enterButton">
      <slot name="enterButton"></slot>
    </div>
    <textarea 
      :placeholder="placeholder" 
      :value="value"
      v-if="type === 'textarea'" 
      oninput="this.style.height = this.scrollHeight + 4 + 'px'" 
      :disabled="disabled"
      @input="handleInput($event)"
      @focus="$emit('focus', $event)"
      @blur="$emit('blur', $event)"
      @change="$emit('change', $event.target.value)"
    >
    </textarea>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'

@Component
export default class QInput extends Vue {
  @Prop({ default: '请输入内容' }) private placeholder !: string
  @Prop({
    default: 'large',
    validator(value) {
      return ['large', 'medium', 'small'].indexOf(value) >= 0
    },
  }) private size !: string
  @Prop([String, Number]) private value !: string | number
  @Prop({
    default: 'text',
    validator(value) {
      return ['text', 'textarea'].indexOf(value) >= 0
    },
  }) private type !: string
  @Prop({ default: false }) private disabled !: boolean
  @Prop(String) private prefix !: string
  @Prop(String) private suffix !: string
  // @Prop(Number) private rows !: number

  private currentValue: string | number = this.value === undefined || this.value === null 
  ? ''
  : this.value

  private mounted() {
    if (this.$slots.enterButton) {
      const enterButton = (this.$refs.enterButton as HTMLDivElement).querySelector('button')
      const input = this.$refs.qinput as HTMLInputElement
      if (enterButton) {
        input.style.borderRight = 'none'
        enterButton.style.margin = '0'
        enterButton.style.borderBottomLeftRadius = '0'
        enterButton.style.borderTopLeftRadius = '0'
        enterButton.style.cursor = 'pointer'
      }
    }
  }

  private setCurrentValue(value) {
    this.currentValue = value
  }

  private handleInput(event) {
    const value = event.target.value
    this.setCurrentValue(value)
    this.$emit('input', value)
  }

  @Watch('value')
  private changeValue(val, oldVal) {
    this.setCurrentValue(val)
  }

}
</script>

<style lang="css">
@import "../styles/index.css";

.qinput {
  position: relative;
  display: inline-block;
  width: 100%;
}

.qinput > input, textarea {
  border: 1px solid #e6e8ea;
  box-sizing: border-box;
  outline: none;
  vertical-align: middle;
}

.qinput__normal, .qinput__prepend, .qinput__append {
  padding: 0 16px;
}

.qinput__normal {
  display: inline-block;
  border-radius: 2px;
}

.qinput__prepend, .qinput__append {
  display: table-cell;
  border-radius: 2px;
}

.qinput__prepend {
  border-top-left-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
}

.qinput__append {
  border-top-right-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
}

.qinput__prefix {
  padding-left: 30px;
}

.qinput__suffix {
  padding-right: 30px;
}

.qinput > input {
  width: 100%;
  font-size: 14px;
}

.qinput__enterButton {
  display: table-cell;
  vertical-align: middle;
  width: 1px;
}

.qinput__prefix__icon > i {
  color: #9195aa;
  position: absolute;
  top: 50%;
  margin-top: -8px;
  margin-left: 8px;
}

.qinput__suffix__icon > i {
  color: #9195aa;
  position: absolute;
  top: 50%;
  margin-left: -24px;
  margin-top: -8px;
}

.qinput-group__prepend, .qinput-group__append {
  color: #939393;
  display: table-cell;
  border: 1px solid #e6e8ea;
  border-radius: 2px;
  vertical-align: middle;
  font-size: 13px;
  background-color: #fafafa;
  padding: 0 8px;
}

.qinput-group__prepend {
  border-right: none;
}

.qinput-group__append {
  border-left: none;
}

.qinput-group--prepend {
  display: inline-table;
}

.qinput > textarea {
  resize: vertical;
  padding-top: 8px;
  padding-left: 8px;
  padding-right: 8px;
  padding-bottom: 8px;
  height: 36px;
  font-size: 14px;
  min-height: 36px;
  overflow: visible;
  border: 1px solid #e6e8ea;
  width: 100%;
}

.qinput-large {
  height: 36px;
  line-height: 36px;
}

.qinput-medium {
  height: 32px;
  line-height: 32px;
}

.qinput-small {
  height: 24px;
  line-height: 24px;
}

</style>

