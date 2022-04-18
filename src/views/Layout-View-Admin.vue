 <template>
  <el-container>
    <el-aside>
      <Menu />
    </el-aside>
    <el-container>
      <el-header>
        <div class="header_top">
          <div></div>
          <Avatar />
        </div>
        <Tabs />
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

<script lang="ts" setup>
import Menu from '@/components/Menu.vue'
import Tabs from '@/components/Tabs.vue'
// import Breadcrumb from "@/components/Breadcrumb.vue";
import Avatar from '@/components/Avatar.vue'
</script>

<style lang="scss" scoped>
.el-container {
  overflow: hidden;
}

.el-aside {
  z-index: 2;
  width: auto;
  box-shadow: 0 2px 10px -1px rgba(85, 85, 85, 0.08),
    0 1px 10px 0 rgba(85, 85, 85, 0.06), 0 1px 30px 0 rgba(85, 85, 85, 0.03);
}

.el-header {
  z-index: 1;
  padding: 0px;
  height: auto;
  background-color: #fff;
  box-shadow: 0 2px 30px -1px rgb(85 85 85 / 8%),
    0 4px 30px 0 rgb(85 85 85 / 6%), 0 1px 30px 0 rgb(85 85 85 / 3%);

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
  background-color: #f2f5f8;
}
</style>
