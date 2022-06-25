<script lang="ts" setup>
import { ref, onBeforeUnmount } from 'vue'
import { searchFormData, paginationAndSortOptions } from './options'
import type { ElForm } from 'element-plus'
const emit = defineEmits<{(e: 'search'): void }>()
const ruleFormRef = ref<InstanceType<typeof ElForm>>()
const resetFields = () => {
  ruleFormRef.value && ruleFormRef.value.resetFields()
}
onBeforeUnmount(() => {
  resetFields()
  paginationAndSortOptions.currentPage = 1
})
</script>

<template>
  <el-form ref="ruleFormRef" :model="searchFormData" label-width="auto" inline>
    <el-form-item label="姓名" prop="name">
      <el-input v-model="searchFormData.name" />
    </el-form-item>
    <el-form-item label="年龄" prop="age">
      <el-input v-model="searchFormData.age" />
    </el-form-item>
    <!-- <el-form-item label="状态" prop="action">
      <el-select v-model="searchFormData.action" placeholder="please select your zone">
        <el-option label="Zone one" value="shanghai" />
        <el-option label="Zone two" value="beijing" />
      </el-select>
    </el-form-item> -->
    <el-form-item label="创建时间" prop="date">
      <el-date-picker v-model="searchFormData.date" type="date" value-format="YYYY-MM-DD" />
    </el-form-item>
    <!-- <el-form-item></el-form-item>
    <el-form-item></el-form-item>
    <el-form-item></el-form-item> -->
    <el-form-item class="el-form-item-action">
      <el-button type="primary" icon="Search" @click="emit('search')">搜索</el-button>
      <el-button icon="Refresh" @click="resetFields">重置</el-button>
    </el-form-item>
  </el-form>
</template>
