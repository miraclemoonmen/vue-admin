<script lang="ts" setup>
import { GlobalDataProps } from '@/store'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import menuItemComponent from './menu-item-component.vue'

const route = useRoute()
const store = useStore<GlobalDataProps>()
const defaultPath = computed(() => route.fullPath)
const menuList = computed(() => store.state.menuList.data)
</script>

<template>
  <el-menu :default-active="defaultPath" router>
    <li class="logo"></li>
    <menu-item-component :menuList="menuList" />
  </el-menu>
</template>

<style lang="scss" scoped>
.logo {
  height: 64px;
}

.el-menu {
  border: none;
}
</style>
