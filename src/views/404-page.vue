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
  <div class="grid w-full h-screen justify-items-center content-around bg-white">
    <div class="errPage_image h-[31rem]"></div>
    <div class="text-center">
      <h1 class="text-3xl font-bold">你怎么到这来的?</h1>
      <p class="mt-2 text-sm font-semibold">抱歉，我们找不到你要找的网页</p>
    </div>
    <el-button class=" w-44" @click="goHome" type="primary">带我回去</el-button>
  </div>
</template>
