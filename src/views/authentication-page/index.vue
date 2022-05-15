<script lang="ts" setup>
import { ref, markRaw, onMounted } from 'vue'
import lottie from 'lottie-web'
import signinPage from './signin-page.vue'
import registerPage from './register-page.vue'
const isComponent = ref(markRaw(signinPage))
const changeComponent = () => {
  isComponent.value = isComponent.value === signinPage ? markRaw(registerPage) : markRaw(signinPage)
}
onMounted(() => {
  const box = document.querySelector('.authentication_bg_cube') as HTMLElement
  lottie.loadAnimation({
    container: box,
    renderer: 'svg',
    loop: false,
    autoplay: true,
    path: '/cqcatzzi.json'
  })
})
</script>

<template>
  <div class="flex h-screen justify-end bg-[#f5f8fa]">
    <img src="@/assets/auth-mask-bg.png" class="absolute bottom-0 w-full h-96" />
    <div class="absolute bottom-24 left-12 h-52 authentication_bg_cube"></div>
    <div class="grid w-3/12 p-8 h-full place-items-center bg-white z-10">
      <transition name="route-transition" mode="out-in">
        <component class="w-full" :is="isComponent" @changeComponent="changeComponent"></component>
      </transition>
    </div>
  </div>
</template>
