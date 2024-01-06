<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from './components/HelloWorld.vue'
import { onMounted } from 'vue'
onMounted(() => {

})


</script>

<template>
  <router-view v-slot="{ Component }">
    <transition name="slide-fade" enter-active-class="animate__animated animate__fadeIn">
      <component class="child-view" :is="Component" />
    </transition>
  </router-view>
  <!-- <router-view></router-view> -->
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
