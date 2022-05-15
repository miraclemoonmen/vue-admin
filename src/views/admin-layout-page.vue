<script lang="ts" setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import theMenu from '@/components/the-menu.vue'
import theViewsTabs from '@/components/the-views-tabs.vue'
// import Breadcrumb from "@/components/Breadcrumb.vue";
import theAvatar from '@/components/the-avatar.vue'
const store = useStore()
const isDark = computed(() => store.state.user.isDark)

</script>

 <template>
  <el-container>
    <el-aside class="!w-52 dark:bg-slate-800 border-r border-slate-900/10 dark:border-slate-50/[0.06]">
      <the-menu />
    </el-aside>
    <el-container>
      <el-header class="!p-0 !h-auto right-0 fixed z-50 bg-white/90 dark:bg-slate-800/90 backdrop-blur-lg" style="width: calc(100% - 13rem)">
        <div class="flex h-16 justify-end items-center px-5">
          <el-switch class="mr-3" size="large" inline-prompt inactive-icon="Sunrise"
            active-icon="MoonNight" :model-value="isDark" @click="store.dispatch('SET_ISDARK', !isDark)" />
          <the-avatar />
        </div>
        <the-views-tabs class="border-t border-[#f6f6f6] dark:border-slate-50/[0.06]" />
      </el-header>
      <el-main class="mt-[7.2rem] bg-[#f5f8fa] dark:bg-slate-900">
        <router-view v-slot="{ Component }">
          <transition name="route-transition" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </el-main>
    </el-container>
    <el-backtop />
  </el-container>
</template>
