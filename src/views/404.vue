<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
const router = useRouter()
const route = useRoute()
const store = useStore()
const goHome = async () => {
  store.dispatch('ADD_TABS', { name: '首页', url: '/' })
  store.dispatch('DEL_TABS', route.fullPath)
  router.push('/')
}
</script>

<template>
  <div class="errPage">
    <div class="errPage_content">
      <div class="errPage_content_image"></div>
      <div class="errPage_content_text">
        <h1>你怎么到这来的？</h1>
        <p>抱歉，我们找不到你要找的网页。</p>
      </div>
      <el-button @click="goHome" class="errPage_content_button">带我回去</el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.errPage {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  &_content {
    @include whiteContent;
    height: 90%;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 24px;
    flex: 0 0 500px;
    &_image {
      width: 100%;
      height: 391px;
      background: url("../assets/404-illustration.svg") center / cover no-repeat;
    }
    &_text {
      text-align: center;
      h1 {
        font-size: 36px;
      }
      p {
        font-size: 14px;
      }
    }
    &_button {
      width: 100%;
      height: 40px;
      color: #fff;
      font-size: 15px;
      border: none;
      background-color: $color;
      box-shadow: var(--el-box-shadow-light);
      border-radius: var(--el-border-radius-base);
    }
  }
}
</style>
