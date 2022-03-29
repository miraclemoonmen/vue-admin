 <template>
  <section class="layout">
    <router-view v-slot="{ Component, route }">
      <transition name="route-transition" mode="out-in">
        <keep-alive>
          <component :is="Component" :key="route.path" />
        </keep-alive>
      </transition>
    </router-view>
  </section>
</template>

<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100%;
}
</style>
