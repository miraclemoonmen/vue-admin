<script lang="ts" setup>
import { useTabsStore } from '@/stores'
defineProps<{
  menuList: any[]
}>()
const useTabs = useTabsStore()
const onClickMenu = (name: string, url: string) => {
  useTabs.ADD_TABS({ name, url })
}
</script>

<template>
  <template v-for="(item, index) in menuList" :key="index">
    <el-menu-item :index="item.path" v-if="!item?.children && item.meta?.hide !== true"
      @click="onClickMenu(item.name, item.path)">
      <el-icon>
        <component :is="item.meta?.icon" />
      </el-icon>
      <template #title>
        <span>{{ item.name }}</span>
      </template>
    </el-menu-item>
    <el-sub-menu :index="item.path" v-else-if="item?.children">
      <template #title>
        <el-icon>
          <component :is="item.meta?.icon" />
        </el-icon>
        <span>{{ item.name }}</span>
      </template>
      <the-menu-items :menuList="item?.children" />
    </el-sub-menu>
  </template>
</template>

<style lang="scss">
.el-aside {
  .el-menu {
    overflow: hidden;
    height: 100%;

    &:not(.el-menu--collapse) {
      width: 208px;

      .el-menu-item,
      .el-sub-menu__title {
        height: 50px;
        margin: 5px 8px;
        border-radius: 5px;

        &:hover {
          background-color: var(--el-fill-color-light);
        }

        &.is-active {
          // font-weight: bold;
          background-color: var(--el-color-primary-light-9);
        }
      }

      .el-sub-menu .el-menu-item {
        min-width: auto;
      }
    }
  }
}
</style>
