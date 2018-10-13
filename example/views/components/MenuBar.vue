<template>
  <nav>
    <router-link to="tooltip">tooltip</router-link><br>
    <router-link to="button">button</router-link><br>
    <router-link to="tabs">tabs</router-link><br>
    <router-link to="input">input</router-link>
  </nav>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class MenuBar extends Vue {}
</script>

<style>
  nav {
    width: 120px;
    height: 500px;
    background-color: rgb(238, 238, 238);
    position: fixed;
    top: 50%;
    left: 0;
    margin-top: -250px;
  }
</style>
