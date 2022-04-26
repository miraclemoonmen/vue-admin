<template>
  <div ref="container" class="chart"></div>
</template>

<script lang="ts" setup>
import {
  ref,
  watch,
  onMounted,
  onBeforeUnmount
} from 'vue'
import * as echarts from 'echarts'

const container = ref()

const props = defineProps<{
  option: any
}>()

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
  onBeforeUnmount(() => {
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
