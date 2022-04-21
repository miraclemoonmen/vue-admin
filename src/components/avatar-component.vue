<template>
  <el-dropdown @command="handleCommand">
    <div class="avatar">
      <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
      <span class="name">Hi, 管理员</span>
      <el-icon>
        <ArrowDownBold />
      </el-icon>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item disabled>编辑个人信息</el-dropdown-item>
        <el-dropdown-item command="signOut">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { show } from '@/components/elLoading-component'
import { ElMessageBox } from 'element-plus'
const store = useStore()
const router = useRouter()
const handleCommand = (command: string) => {
  switch (command) {
    case 'signOut':
      ElMessageBox.confirm('要退出登录吗？', '提示', {
        confirmButtonText: '退出',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        signOut()
      })
      break
  }
}
const signOut = () => {
  show('退出登录中，请稍后...')
  setTimeout(() => {
    store.dispatch('CLEAR_TOKEN')
    router.go(0)
  }, 700)
}
</script>

<style lang="scss" scoped>
.el-dropdown {
  .avatar {
    cursor: pointer;
    display: flex;
    align-items: center;
    margin: 0 20px;
    padding: 0 10px;
    transition: background-color 0.25s;
    .name {
      font-size: 12px;
      margin-left: 15px;
      margin-right: 15px;
    }
    .el-avatar {
      width: 35px;
      height: 35px;
    }
  }
}
</style>
