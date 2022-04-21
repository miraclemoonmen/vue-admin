<template>
  <div ref="container" class="chart"></div>
</template>

<script lang="ts" setup>
import {
  ref,
  watch,
  onMounted,
  onUnmounted,
  onDeactivated,
  onActivated
} from 'vue'
import * as echarts from 'echarts'

const container = ref()

// eslint-disable-next-line no-undef
const props = defineProps<{
  option: any
}>()

// eslint-disable-next-line no-undef
const emit = defineEmits<{(e: 'chartClick', params: any): void }>()

onMounted(() => {
  const chart = echarts.init(container.value)
  const chartResize = chart.resize as () => void
  const initChart = () => {
    chart.setOption(props.option)
  }
  initChart()
  chart.on('click', (params) => {
    emit('chartClick', params)
  })
  watch([props.option, () => props.option], () => {
    chart.resize()
    initChart()
  })
  window.addEventListener('resize', chartResize)
  onActivated(() => {
    chart.resize()
    window.addEventListener('resize', chartResize)
  })
  onDeactivated(() => {
    window.removeEventListener('resize', chartResize)
  })
  onUnmounted(() => {
    window.removeEventListener('resize', chartResize)
    setTimeout(() => {
      chart.dispose()
    }, 200)
  })
})
</script>

<style lang="scss" scoped>
.chart {
  width: 100%;
  height: 100%;
}
</style>
