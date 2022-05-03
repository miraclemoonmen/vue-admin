<script lang="ts" setup>
import theMenu from '@/components/the-menu.vue'
import theViewsTabs from '@/components/the-views-tabs.vue'
// import Breadcrumb from "@/components/Breadcrumb.vue";
import theAvatar from '@/components/the-avatar.vue'
</script>

 <template>
  <el-container>
    <el-aside>
      <the-menu />
    </el-aside>
    <el-container>
      <el-header>
        <div class="header_top">
          <the-avatar />
        </div>
        <the-views-tabs />
      </el-header>
      <el-main>
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

<style lang="scss" scoped>
.el-aside {
  width: 215px;
}

.el-header {
  position: fixed;
  z-index: 1000;
  width: calc(100% - 215px);
  left: auto;
  right: 0px;
  padding: 0px;
  height: auto;
  background-color: #fff;

  .header_top {
    display: flex;
    padding: 0px 20px 0px 20px;
    height: 64px;
    align-items: center;
    justify-content: end;
  }
}

.el-main {
  margin-top: 115px;
  background-color: #f5f8fa;
}
</style>
