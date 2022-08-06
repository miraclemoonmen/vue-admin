<script lang="ts" setup>
import { shallowRef, onMounted, computed } from 'vue'
import lottie from 'lottie-web'
import signinPage from './signin-page.vue'
import registerPage from './register-page.vue'
import { useUserStore } from '@/stores'
const userStore = useUserStore()
const isDark = computed(() => userStore.isDark)
const isComponent = shallowRef(signinPage)
const changeComponent = () => {
  isComponent.value = isComponent.value === signinPage ? registerPage : signinPage
}
onMounted(() => {
  const box = document.querySelector('.authentication_bg_cube') as HTMLElement
  lottie.loadAnimation({
    container: box,
    renderer: 'svg',
    loop: false || isDark.value,
    autoplay: true,
    path: isDark.value ? '/moon.json' : '/cqcatzzi.json'
  })
})
</script>

<template>
  <div class="flex h-screen justify-end bg-[#f5f8fa] dark:bg-slate-900">
    <img v-if="!isDark" src="@/assets/auth-mask-bg.png" class="absolute bottom-0 w-full h-96" />
    <img v-else src="@/assets/docs-dark.avif" class="absolute bottom-0 w-full h-full" />
    <div class="absolute bottom-24 left-12 h-52 authentication_bg_cube"></div>
    <div
      class="grid w-3/12 p-8 h-full place-items-center bg-white dark:bg-slate-800/50 z-10 dark:border-l dark:border-slate-50/[0.06]">
      <transition name="route-transition" mode="out-in">
        <component class="w-full" :is="isComponent" @changeComponent="changeComponent"></component>
      </transition>
    </div>
  </div>
</template>
