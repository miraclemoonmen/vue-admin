<script lang="ts" setup>
import menuComponent from '@/components/menu-component.vue'
import viewsTabsComponent from '@/components/views-tabs-component.vue'
// import Breadcrumb from "@/components/Breadcrumb.vue";
import avatarComponent from '@/components/avatar-component.vue'
</script>

 <template>
  <el-container>
    <el-aside>
      <menu-component />
    </el-aside>
    <el-container>
      <el-header>
        <div class="header_top">
          <div></div>
          <avatar-component />
        </div>
        <views-tabs-component />
      </el-header>
      <el-main>
        <router-view v-slot="{ Component }">
          <transition name="route-transition" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </el-main>
    </el-container>

    <el-backtop target=".el-main" :bottom="60" />
  </el-container>
</template>

<style lang="scss" scoped>
.el-container {
  overflow: hidden;
}

.el-aside {
  z-index: 2;
  width: auto;
}

.el-header {
  z-index: 1;
  padding: 0px;
  height: auto;
  background-color: #fff;

  .header_top {
    display: flex;
    padding: 0px 20px 0px 20px;
    height: 64px;
    align-items: center;
    justify-content: space-between;
  }

  .logo {
    padding-left: 10px;
    font-size: 24px;
    font-weight: bold;
  }

  .collapseIcon {
    font-size: 23px;
    cursor: pointer;
    margin-right: 30px;
    transition: color 0.25s;

    &:hover {
      color: $color;
    }
  }
}

.el-main {
  background-color: #f5f8fa;
}
</style>
