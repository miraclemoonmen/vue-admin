<script lang="ts" setup>
import { onMounted } from 'vue'
import lottie from 'lottie-web'
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

onMounted(() => {
  const box = document.querySelector('.errPage_image') as HTMLElement
  lottie.loadAnimation({
    container: box,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: '/error-doodle-animation.json'
  })
})
</script>

<template>
  <div class="errPage">
    <div class="errPage_image"></div>
    <div class="errPage_text">
      <h1>你怎么到这来的</h1>
      <p>抱歉，我们找不到你要找的网页</p>
    </div>
    <el-button @click="goHome" class="errPage_button">带我回去</el-button>
  </div>
</template>

<style lang="scss" scoped>
.errPage {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  height: 100%;
  box-shadow: none;
  box-sizing: border-box;
  padding: 24px;

  &_image {
    width: 100%;
    height: 500px;
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
    margin: 0 auto;
    height: 40px;
    color: #fff;
    font-size: 15px;
    border: none;
    background-color: $color;
    border-radius: var(--el-border-radius-base);
  }
}
</style>
