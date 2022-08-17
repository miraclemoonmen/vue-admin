<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { show, close } from '@/components/the-el-loading'
import { ElMessageBox } from 'element-plus'
const router = useRouter()
const userStore = useUserStore()
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
  setTimeout(async () => {
    userStore.CLEAR_TOKEN()
    await router.push('/authentication')
    close()
  }, 1000)
}
</script>

<template>
  <el-dropdown trigger="click" @command="handleCommand">
    <div class="avatar">
      <el-avatar icon="UserFilled" />
      <span class="name">Hi, 管理员</span>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item icon="edit-pen" disabled>
          编辑个人信息
        </el-dropdown-item>
        <el-dropdown-item icon="switch-button" command="signOut">
          退出登录
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style lang="scss" scoped>
.el-dropdown {
  .avatar {
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 5px 10px;
    border-radius: 20px;
    transition: background-color 0.25s;

    &:hover {
      background-color: var(--el-fill-color-light);
    }

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
