<template>
  <div ref="container"></div>
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

let containerList: echarts.ECharts[] = []
const echartsResize = (): void => {
  containerList.forEach((element) => {
    element.resize()
  })
}

const container = ref()

// eslint-disable-next-line no-undef
const props = defineProps<{
  option: any
}>()

// eslint-disable-next-line no-undef
const emit = defineEmits<{(e: 'chartClick', params: any): void }>()

onMounted(() => {
  const chart = echarts.init(container.value)
  containerList.push(chart)
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
  window.addEventListener('resize', echartsResize)
  onActivated(() => {
    echartsResize()
    window.addEventListener('resize', echartsResize)
  })
  onDeactivated(() => {
    window.removeEventListener('resize', echartsResize)
  })
  onUnmounted(() => {
    window.removeEventListener('resize', echartsResize)
    containerList.forEach((element) => {
      setTimeout(() => {
        element.dispose()
      }, 200)
    })
    containerList = []
  })
})
</script>
