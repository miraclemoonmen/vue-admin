 <template>
  <section class="layout">
    <router-view v-slot="{ Component }">
      <transition name="route-transition" mode="out-in">
        <component :is="Component" />
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
