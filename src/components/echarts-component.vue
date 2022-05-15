<script lang="ts" setup>
import {
  ref,
  watch,
  computed,
  onMounted,
  onBeforeUnmount
} from 'vue'
import { useStore } from 'vuex'
import * as echarts from 'echarts'
const props = defineProps<{
  option: any
}>()
const emit = defineEmits<{(e: 'chartClick', params: any): void }>()
const store = useStore()
const isDark = computed(() => store.state.user.isDark)
const container = ref()
const themeDark = {
  title: {
    textStyle: {
      color: '#E6EBF5'
    }
  },
  textStyle: {
    color: '#E6EBF5'
  },
  legend: {
    textStyle: {
      color: '#E6EBF5'
    }
  },
  valueAxis: {
    splitLine: {
      show: true,
      lineStyle: {
        color: '#2B3647'
      }
    }
  },
  label: {
    color: '#E6EBF5'
  }
}

onMounted(() => {
  let chart = echarts.init(container.value, isDark.value && themeDark)
  let chartResize = chart.resize as () => void
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
  watch(isDark, (value) => {
    window.removeEventListener('resize', chartResize)
    chart.dispose()
    chart = value ? echarts.init(container.value, themeDark) : echarts.init(container.value)
    initChart()
    chartResize = chart.resize
    window.addEventListener('resize', chartResize)
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

<template>
  <div ref="container" class="chart"></div>
</template>

<style lang="scss" scoped>
.chart {
  width: 100%;
  height: 100%;
}
</style>
