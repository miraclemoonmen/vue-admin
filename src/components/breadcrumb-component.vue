<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

const route = useRoute()
const store = useStore()
const matched = computed(() => route.matched)
const pushBreadcrumb = () => {
  store.commit('addTab', { name: route.meta.name, url: route.fullPath })
}
</script>

<template>
  <el-breadcrumb separator-icon="ArrowRight">
    <el-breadcrumb-item v-for="(item, index) in matched" :key="index" :to="item.path" @click="pushBreadcrumb">{{
        item.meta.name
    }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>
