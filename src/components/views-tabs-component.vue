<template>
  <el-tabs :model-value="active" type="card" closable @tab-remove="removeTab" @tab-click="clickTab">
    <el-tab-pane v-for="item in data" :key="item.url" :label="item.name" :name="item.url" />
  </el-tabs>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { GlobalDataProps } from '@/store'
const store = useStore<GlobalDataProps>()
const router = useRouter()
const route = useRoute()
const active = computed(() => route.fullPath)
const data = computed(() => store.state.tabs.data)

const clickTab = (item: { paneName: string }) => {
  router.push(item.paneName)
  store.dispatch('SET_ACTIVE', item.paneName)
}

const removeTab = (targetName: string) => {
  store.dispatch('DEL_TABS', targetName)
}
</script>

<style lang="scss">
.el-header {
  .el-tabs {
    padding-top: 10px;
    border-top: 1px solid #f6f6f6;
  }
  > .el-tabs--card > {
    .el-tabs__header {
      margin: 0px;
      padding: 0px 20px;
      border: none;
      .el-tabs__nav {
        border: none;
        border-radius: 0px;
      }
      .el-tabs__item {
        padding: 0 35px !important;
        margin-right: -18px;
        border: none;
        -webkit-mask: url("../assets/tabBgImg.png");
        mask: url("../assets/tabBgImg.png");
        -webkit-mask-size: 100% 100%;
        mask-size: 100% 100%;
        transition: background-color 0.4s;
        &:hover {
          background-color: var(--el-fill-color-light);
          color: var(--el-text-color-primary);
        }
        &.is-active {
          background-color: var(--el-color-primary-light-9);
        }
      }
    }
  }
  .el-tabs__nav-wrap {
    margin-bottom: 0px;
  }
}
</style>
