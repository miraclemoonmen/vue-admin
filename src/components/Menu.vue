<template>
  <el-menu :default-active="defaultPath" router>
    <li class="logo"></li>
    <SubMenu :menuList="menuList" />
  </el-menu>
</template>

<script lang="ts" setup>
import { GlobalDataProps } from '@/store'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import SubMenu from './SubMenu.vue'

const route = useRoute()
const store = useStore<GlobalDataProps>()
const defaultPath = computed(() => route.fullPath)
const menuList = computed(() => store.state.menuList.data)
</script>

<style lang="scss" scoped>
.logo {
  height: 64px;
}
.el-menu {
  border: none;
}
</style>
