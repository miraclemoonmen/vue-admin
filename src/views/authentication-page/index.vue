<template>
  <div class="authentication">
    <div class="authentication_bg">
      <img src="@/assets/auth-mask-bg.png" class="authentication_bg_mask" />
      <div class="authentication_bg_cube"></div>
    </div>
    <div class="authentication_content">
      <transition name="route-transition" mode="out-in">
        <component :is="isComponent" @changeComponent="changeComponent"></component>
      </transition>
    </div>
  </div>
</template>
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

<style lang="scss" scoped>
.authentication {
  display: flex;
  width: 100%;
  height: 100%;
  background-color: #f2f5f8;
  &_bg {
    position: relative;
    flex: 1;
    &_cube {
      position: absolute;
      height: 200px;
      left: 50px;
      bottom: 100px;
    }
    &_mask {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 362px;
    }
  }
  &_content {
    display: flex;
    z-index: 1;
    flex: 0 0 500px;
    flex-direction: column;
    justify-content: center;
    box-sizing: border-box;
    padding: 0px 46px;
    height: 100%;
    background-color: #fff;
    box-shadow: var(--el-box-shadow-light);
  }
}
</style>
