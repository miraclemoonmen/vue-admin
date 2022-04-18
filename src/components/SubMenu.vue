<template>
  <template v-for="(item, index) in menuList" :key="index">
    <el-menu-item
      :index="item.path"
      v-if="!item?.children && item.meta?.hide !== true"
      @click="onClickMenu(item.meta.name, item.path)"
    >
      <el-icon>
        <component :is="item.meta?.icon" />
      </el-icon>
      <template #title>
        <span>{{ item.meta.name }}</span>
      </template>
    </el-menu-item>
    <el-sub-menu :index="item.path" v-else-if="item?.children">
      <template #title>
        <el-icon>
          <component :is="item.meta?.icon" />
        </el-icon>
        <span>{{ item.meta.name }}</span>
      </template>
      <SubMenu :menuList="item?.children" />
    </el-sub-menu>
  </template>
</template>

<script lang="ts" setup>
import { useStore } from 'vuex'
// eslint-disable-next-line no-undef
defineProps<{
  menuList: any[]
}>()
const store = useStore()
const onClickMenu = (name: string, url: string) => {
  store.dispatch('ADD_TABS', { name, url })
}
</script>

<style lang="scss" scoped>
.el-menu {
  overflow: hidden;
  height: 100%;
  &:not(.el-menu--collapse) {
    width: 210px;
    .el-menu-item,
    .el-sub-menu__title {
      height: 50px;
      margin: 5px 8px;
      border-radius: 5px;
      &:hover {
        background-color: var(--el-fill-color-light);
      }
      &.is-active {
        background-color: var(--el-color-primary-light-9);
      }
    }
    .el-sub-menu .el-menu-item {
      min-width: auto;
    }
  }
}
</style>
