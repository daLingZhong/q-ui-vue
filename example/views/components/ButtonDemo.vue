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
        <q-button type="text">文字按钮</q-button>
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
    <div class="item__content">
      <h3>图标按钮</h3>
      <q-button icon="search"></q-button>
      <q-button icon="search">搜索</q-button>
      <q-button icon="search" type="primary"></q-button>
      <q-button icon="search" type="primary">搜索</q-button>
      <pre>
        <code>
    &lt;q-button icon="search"&gt;&lt;/q-button&gt;
    &lt;q-button icon="search"&gt;搜索&lt;/q-button&gt;
    &lt;q-button icon="search" type="primary"&gt;&lt;/q-button&gt;
    &lt;q-button icon="search" type="primary"&gt;搜索&lt;/q-button&gt;
        </code>
      </pre>
    </div>
    <div class="item__content">
      <h3>按钮尺寸</h3>
      <q-button size="large">大号</q-button>
      <q-button>默认</q-button>
      <q-button size="small">小号</q-button>
      <q-button size="mini">超小</q-button>
      <pre>
        <code>
    &lt;q-button size="large"&gt;大号&lt;/q-button&gt;
    &lt;q-button&gt;默认&lt;/q-button&gt;
    &lt;q-button size="small"&gt;小号&lt;/q-button&gt;
    &lt;q-button size="mini"&gt;超小&lt;/q-button&gt;
        </code>
      </pre>
    </div>
    <div class="item__content">
      <h3>禁用状态</h3>
      <q-button disabled>默认</q-button>
      <q-button type="primary" disabled>主要</q-button>
      <q-button type="dashed" disabled>虚线</q-button>
      <q-button type="text" disabled>文字按钮</q-button>
      <pre>
        <code>
    &lt;q-button disabled&gt;默认&lt;/q-button&gt;
    &lt;q-button type="primary" disabled&gt;主要&lt;/q-button&gt;
    &lt;q-button type="dashed" disabled&gt;虚线&lt;/q-button&gt;
    &lt;q-button type="text" disabled&gt;文字按钮&lt;/q-button&gt;
        </code>
      </pre>
    </div>
    <div class="item__content">
      <h3>加载状态</h3>
      <q-button :loading="isLoading" type="primary" @click="click">点击</q-button>
      <q-button :loading="true" type="primary">点击</q-button>
      <q-button :loading="isLoading1" type="primary" icon="search" @click="click1"></q-button>
      <!-- <q-button :loading="true" type="primary" icon="search"></q-button> -->
      <pre>
        <code>
    &lt;q-button :loading="isLoading" type="primary" @click="click"&gt;点击&lt;/q-button&gt;
    &lt;q-button :loading="true" type="primary"&gt;点击&lt;/q-button&gt;
    &lt;q-button :loading="isLoading1" type="primary" icon="search" @click="click1"&gt;&lt;/q-button&gt;
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
  private isLoading1: boolean = false

  private click() {
    this.isLoading = true
    // const that = this
    // setTimeout(function(){
    //   that.isLoading = false
    // },2000)
  }
  private click1() {
    this.isLoading1 = true
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
