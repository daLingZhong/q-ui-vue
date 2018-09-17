<template>
  <div class="components">
    <h2>Button</h2>
    <div class="line"></div>
    <div class="item__content">
      <h3>按钮类型</h3>
      <div class="button__group">
        <q-button>默认</q-button>
        <q-button type="primary">主要</q-button>
        <q-button type="dashed">虚线</q-button>
        <q-button type="text">文字</q-button>
        <br><br>
        <q-button type="success">成功</q-button>
        <q-button type="warning">警告</q-button>
        <q-button type="danger">危险</q-button>
      </div>
      <pre>
        <code>
    &lt;q-button&gt;默认&lt;/q-button&gt;
    &lt;q-button type="primary"&gt;主要&lt;/q-button&gt;
    &lt;q-button type="dashed"&gt;虚线&lt;/q-button&gt;
    &lt;q-button type="text"&gt;文字&lt;/q-button&gt;
    &lt;q-button type="success"&gt;成功&lt;/q-button&gt;
    &lt;q-button type="warning"&gt;警告&lt;/q-button&gt;
    &lt;q-button type="danger"&gt;危险&lt;/q-button&gt;
        </code>
      </pre>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class ButtonDemo extends Vue {
  private isLoading: boolean = false

  private click() {
    this.isLoading = true
    const that = this
    // setTimeout(function(){
    //   that.isLoading = false
    // },2000)
  }
}
</script>

<style>
  .button__group {
    width: 400px;
    margin: 10px auto;
    text-align: left;
  }
</style>
