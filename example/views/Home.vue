<template>
  <div class="content">
    <div>
      <h2>Tooltip</h2>
      <div class="line"></div>
      <div class="item__content">
        <h3>四种位置</h3>
        <div class="item">
          <q-tooltip content="上方文字提示" position="top">
            <button>上面</button>
          </q-tooltip>
        </div>
        <div class="item">
          <q-tooltip content="下方文字提示" position="bottom">
            <button>下面</button>
          </q-tooltip>
        </div>
        <div class="item">
          <q-tooltip content="左边文字提示" position="left">
            <button>左边</button>
          </q-tooltip>
        </div>
        <div class="item">
          <q-tooltip content="右边文字提示" position="right">
            <button>右边</button>
          </q-tooltip>
        </div>
        <pre>
          <code>
      &lt;q-tooltip content="上方文字提示" position="top"&gt;
        &lt;button&gt;上面&lt;/button&gt;
      &lt;/q-tooltip&gt;
          </code>
        </pre>
        <h3>两种主题</h3>
        <div class="item">
          <q-tooltip content="黑色主题">
            <button>黑色</button>
          </q-tooltip>
        </div>
        <div class="item">
          <q-tooltip content="白色主题" theme="Light" position="bottom">
            <button>白色</button>
          </q-tooltip>
        </div>
        <pre>
          <code>
      &lt;q-tooltip content="白色主题" theme="Light" position="bottom"&gt;
        &lt;button&gt;白色&lt;/button&gt;
      &lt;/q-tooltip&gt;
          </code>
        </pre>
        <h3>支持HTML代码段</h3>
        <div class="item">
          <q-tooltip>
            <button>支持HTML</button>
            <template slot="content">
              <span>支持多行信息</span><br>
              <span>123</span>
            </template>
          </q-tooltip>
        </div>
        <pre>
          <code>
      &lt;q-tooltip&gt;
        &lt;button&gt;支持HTML&lt;/button&gt;
        &lt;template slot="content"&gt;
          &lt;span&gt;支持多行信息&lt;/span&gt;&lt;/br&gt;
          &lt;span&gt;123&lt;/span&gt;
        &lt;/template&gt;
      &lt;/q-tooltip&gt;
          </code>
        </pre>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class Home extends Vue {
}
</script>

<style>
  .content {
    height: 100%;
    width: 80%;
    margin: 0 auto;
    margin-top: 100px;
  }
  .line {
    width: 100%;
    height: 8px;
    background-color: rgb(98, 98, 218)
  }
  .item__content {
    text-align: center;
    margin-top: 50px;
  }
  .item {
    display: inline-block;
    margin-left: 5px;
  }
  pre {
    text-align:left; 
    margin: 20px auto; 
    width: 800px; 
    background-color: #000; 
    color: #fff;
  }
  code {
    font-family: Menlo,Monaco,Consolas,Courier,monospace
  }
</style>
