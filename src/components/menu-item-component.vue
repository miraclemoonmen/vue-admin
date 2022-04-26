<script lang="ts" setup>
import { useStore } from 'vuex'

defineProps<{
  menuList: any[]
}>()
const store = useStore()
const onClickMenu = (name: string, url: string) => {
  store.dispatch('ADD_TABS', { name, url })
}
</script>

<template>
  <template v-for="(item, index) in menuList" :key="index">
    <el-menu-item :index="item.path" v-if="!item?.children && item.meta?.hide !== true"
      @click="onClickMenu(item.meta.name, item.path)">
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
      <menu-item-component :menuList="item?.children" />
    </el-sub-menu>
  </template>
</template>

<style lang="scss">
.el-aside {
  .el-menu {
    overflow: hidden;
    height: 100%;

    &:not(.el-menu--collapse) {
      width: 215px;

      .el-menu-item,
      .el-sub-menu__title {
        height: 50px;
        margin: 5px 8px;
        border-radius: 5px;

        &:hover {
          background-color: rgb(243, 246, 249);
        }

        &.is-active {
          font-weight: bold;
          background-color: rgb(224, 239, 255);
        }
      }

      .el-sub-menu .el-menu-item {
        min-width: auto;
      }
    }
  }
}
</style>
