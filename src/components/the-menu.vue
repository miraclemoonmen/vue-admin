<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import theMenuItems from './the-menu-items.vue'
import { useMenuStore } from '@/stores'

const route = useRoute()
const useMenu = useMenuStore()
const defaultPath = computed(() => route.name)
const menuList = computed(() => useMenu.list)
</script>

<template>
  <el-menu :default-active="defaultPath">
    <li class="logo"></li>
    <the-menu-items :menuList="menuList" />
  </el-menu>
</template>

<style lang="scss" scoped>
.logo {
  height: 64px;
}

.el-menu {
  position: fixed;
  border: none;
}
</style>
