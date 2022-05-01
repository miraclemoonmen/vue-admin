<script lang="ts" setup>
import { GlobalDataProps } from '@/store'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import theMenuItems from './the-menu-items.vue'

const route = useRoute()
const store = useStore<GlobalDataProps>()
const defaultPath = computed(() => route.fullPath)
const menuList = computed(() => store.state.menuList.data)
</script>

<template>
  <el-menu :default-active="defaultPath" router>
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
