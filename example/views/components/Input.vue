<template>
  <div class="components">
    <h2>Input</h2>
    <div class="line"></div>
    <div class="item__content">
      <h3>基础输入框</h3>
      <div class="item">
        <q-input placeholder="请输入内容"></q-input>
      </div>
      <pre v-highlight>
        <code>
    &lt;q-input placeholder="请输入内容"&gt;&lt;/q-input&gt;
        </code>
      </pre>
      <h3>输入框尺寸</h3>
      <p>共有三种尺寸： 大（默认 36px）、中（32px）、小（24px）</p>
      <div class="item">
        <q-input placeholder="Large Size"></q-input>
        <div style="height: 20px;"></div>
        <q-input placeholder="Medium Size" size="medium"></q-input>
        <div style="height: 20px;"></div>
        <q-input placeholder="Small Size" size="small"></q-input>
      </div>
      <pre v-highlight>
        <code>
    &lt;q-input placeholder="Large Size"&gt;&lt;/q-input&gt;
    &lt;q-input placeholder="Medium Size" size="medium"&gt;&lt;/q-input&gt;
    &lt;q-input placeholder="Small Size" size="small"&gt;&lt;/q-input&gt;
        </code>
      </pre>
      <h3>复合型输入框</h3>
      <p>通过前置和后置实现复合型输入框</p>
      <div class="item">
        <q-input style="width: 400px;">
          <template slot="prepend">http://</template>
          <template slot="append">.com</template>
        </q-input>
        <div style="height: 20px;"></div>
        <q-input style="width: 400px;">
          <template slot="append">
            <i class="icon icon-setting"></i>
          </template>
        </q-input>
      </div>
      <pre v-highlight>
        <code>
    &lt;q-input style="width: 400px;"&gt;
      &lt;template slot="prepend"&gt;http://&lt;/template&gt;
      &lt;template slot="append"&gt;.com&lt;/template&gt;
    &lt;/q-input&gt;
    &lt;q-input style="width: 400px;"&gt;
      &lt;template slot="append"&gt;
        &lt;i class="icon icon-setting"&gt;&lt;/i&gt;
      &lt;/template&gt;
    &lt;/q-input&gt;
        </code>
      </pre>
      <h3>带 icon 的输入框</h3>
      <p>通过前置和后置添加自带或自定义icon</p>
      <div class="item">
        <span>属性方式：</span>
        <q-input placeholder="请输入搜索内容" prefix="search" style="width: 200px;"></q-input>
        <q-input suffix="calendar" style="width: 200px; margin-left: 20px;"></q-input>
        <div style="height: 20px;"></div>
        <span>slot 方式：</span>
        <q-input placeholder="请输入搜索内容" style="width: 200px;">
          <template slot="prefix">
            <i class="icon icon-search"></i>
          </template>
        </q-input>
        <q-input style="width: 200px; margin-left: 20px;">
          <template slot="suffix">
            <i class="icon icon-calendar"></i>
          </template>
        </q-input>
      </div>
      <pre v-highlight>
        <code>
    &lt;span&gt;属性方式：&lt;/span&gt;
    &lt;q-input placeholder="请输入搜索内容" prefix="search" style="width: 200px;"&gt;&lt;/q-input&gt;
    &lt;q-input suffix="calendar" style="width: 200px; margin-left: 20px;""&gt;&lt;/q-input&gt;

    &lt;span&gt;slot 方式：&lt;/span&gt;
    &lt;q-input placeholder="请输入搜索内容" style="width: 200px;"&gt;
      &lt;template slot="prefix"&gt;
        &lt;i class="icon icon-search"&gt;&lt;/i&gt;
      &lt;/template&gt;
    &lt;/q-input&gt;
    &lt;q-input style="width: 200px; margin-left: 20px;"&gt;
      &lt;template slot="suffix"&gt;
        &lt;i class="icon icon-calendar"&gt;&lt;/i&gt;
      &lt;/template&gt;
    &lt;/q-input&gt;
        </code>
      </pre>
      <h3>搜索输入框</h3>
      <p>带有搜索按钮的输入框</p>
      <div class="item">
        <q-input placeholder="请输入搜索内容" suffix="search" style="width: 400px;"></q-input>
        <div style="height: 20px;"></div>
        <q-input placeholder="请输入搜索内容" style="width: 400px;">
          <template slot="enterButton">
            <q-button type="primary" size="large" icon="search"></q-button>
          </template>
        </q-input>
        <div style="height: 20px;"></div>
        <q-input placeholder="请输入搜索内容" style="width: 400px;">
          <template slot="enterButton">
            <q-button type="primary" size="large">Search</q-button>
          </template>
        </q-input>
      </div>
      <pre v-highlight>
        <code>
    &lt;q-input placeholder="请输入搜索内容" suffix="search" style="width: 400px;"&gt;&lt;/q-input&gt;
    &lt;q-input placeholder="请输入搜索内容" style="width: 400px;"&gt;
      &lt;template slot="enterButton"&gt;
        &lt;q-button type="primary" size="large" icon="search"&gt;&lt;/q-button&gt;
      &lt;/template&gt;
    &lt;/q-input&gt;
    &lt;q-input placeholder="请输入搜索内容" style="width: 400px;"&gt;
      &lt;template slot="enterButton"&gt;
        &lt;q-button type="primary" size="large"&gt;Search&lt;/q-button&gt;
      &lt;/template&gt;
    &lt;/q-input&gt;
        </code>
      </pre>
      <h3>适应文本高度的文本域</h3>
      <p>文本域会自动适应高度变化</p>
      <div class="item">
        <q-input placeholder="请输入文本内容" type="textarea" style="width: 600px;"></q-input>
      </div>
      <pre v-highlight>
        <code>
      &lt;q-input placeholder="请输入文本内容" type="textarea" style="width: 600px;"&gt;&lt;/q-input&gt;
        </code>
      </pre>
      <h3>内容提示</h3>
      <p>文本域会自动适应高度变化</p>
      <div class="item">
        <q-tooltip trigger="click" :content="value">
          <q-input maxlength="1" v-model="value" placeholder="请输入文本内容" style="width: 400px;"></q-input>
        </q-tooltip>
      </div>
      <pre v-highlight>
        <code>
      &lt;q-tooltip trigger="click" :content="value"&gt;
        &lt;q-input v-model="value" placeholder="请输入文本内容" style="width: 400px;"&gt;&lt;/q-input&gt;
      &lt;/q-tooltip&gt;
      &lt;script&gt;
        export default {
          return {
            data: {
              value: '123'
            }
          }
        }
      &lt;/script&gt;
        </code>
      </pre>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
@Component
export default class Input extends Vue {
  private value: string = '123'
}
</script>
