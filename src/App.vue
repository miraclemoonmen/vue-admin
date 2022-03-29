<template>
  <el-container>
    <el-aside v-if="isLogin">
      <Menu />
    </el-aside>
    <el-container>
      <el-header v-show="isLogin">
        <div class="header_top">
          <div></div>
          <Avatar />
        </div>
        <Tabs v-show="isLogin" />
      </el-header>
      <el-main :class="{ 'none-padding': !isLogin }">
        <router-view v-slot="{ Component, route }">
          <transition name="route-transition" mode="out-in">
            <keep-alive :max="10">
              <component :is="Component" :key="route.path" />
            </keep-alive>
          </transition>
        </router-view>
      </el-main>
    </el-container>

    <el-backtop target=".el-main" :bottom="60" />
  </el-container>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

import { GlobalDataProps } from '@/store'
import Menu from '@/components/Menu.vue'
import Tabs from '@/components/Tabs.vue'
// import Breadcrumb from "@/components/Breadcrumb.vue";
import Avatar from '@/components/Avatar.vue'
import { useStore } from 'vuex'
const store = useStore<GlobalDataProps>()
const isLogin = computed(() => store.state.menuList.data.length)
</script>

<style lang="scss">
html,
body,
#app {
  height: 100%;
}
#app {
  display: flex;
  color: #2c3e50;
  .el-aside {
    z-index: 2;
    width: auto;
    box-shadow: 0 2px 10px -1px rgba(85, 85, 85, 0.08),
      0 1px 10px 0 rgba(85, 85, 85, 0.06), 0 1px 30px 0 rgba(85, 85, 85, 0.03);
  }
  .el-header {
    z-index: 1;
    padding: 0px;
    height: auto;
    box-shadow: 0 2px 30px -1px rgb(85 85 85 / 8%),
      0 4px 30px 0 rgb(85 85 85 / 6%), 0 1px 30px 0 rgb(85 85 85 / 3%);
    .header_top {
      display: flex;
      padding: 0px 20px 0px 20px;
      height: 64px;
      align-items: center;
      justify-content: space-between;
    }
    .logo {
      padding-left: 10px;
      font-size: 24px;
      font-weight: bold;
    }
    .collapseIcon {
      font-size: 23px;
      cursor: pointer;
      margin-right: 30px;
      transition: color 0.25s;
      &:hover {
        color: $color;
      }
    }
  }
  .el-main {
    background-color: #f2f5f8;
    &.none-padding {
      overflow: hidden;
      padding: 0px;
    }
  }
}
.route-transition-enter-active {
  animation: route-transition 0.2s;
}
.route-transition-leave-active {
  animation: route-transition 0.2s reverse;
}
@keyframes route-transition {
  0% {
    transform: translateY(10px);
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
::-webkit-scrollbar {
  width: 7px;
  height: 7px;
}
::-webkit-scrollbar-thumb {
  border-radius: 20px;
  background-color: #cccccc;
  &:hover {
    background-color: #b2b2b2;
  }
}
</style>
