<template>
  <echarts-component class="map" :option="option" @chartClick="chartClick" />
</template>
<script lang="ts">
import * as echarts from 'echarts'
import echartsComponent from '@/components/echarts-component.vue'
import { getMap } from '@/api/index'
import { defineComponent, reactive } from 'vue'

const initMap = async () => {
  const map = await getMap()
  echarts.registerMap('map', map as never)
  const option = reactive({
    tooltip: {},
    legend: {
      bottom: 0,
      left: 'center',
      data: ['红色', '黄色']
    },
    geo: {
      map: 'map',
      itemStyle: {
        areaColor: '#24CFF4',
        borderColor: '#53D9FF',
        borderWidth: 1.3,
        shadowBlur: 15,
        shadowColor: 'rgb(58,115,192)',
        shadowOffsetX: 7,
        shadowOffsetY: 6
      },
      emphasis: {
        label: {
          show: false
        },
        itemStyle: {
          areaColor: '#8dd7fc',
          borderWidth: 1.6,
          shadowBlur: 25
        }
      }
    },
    series: [
      {
        name: '预警数',
        type: 'map',
        geoIndex: 0,
        selectedMode: false,
        data: [{ name: '济南市', value: 300 }]
      },
      {
        type: 'effectScatter',
        zlevel: 2,
        coordinateSystem: 'geo',
        itemStyle: {
          color: '#F4E925'
        },
        label: {
          show: true,
          formatter: '{b}',
          position: 'right',
          distance: 10,
          color: '#fff',
          fontSize: 14
        },
        symbolSize: function (val: number[]) {
          return val[2] / 15
        },
        tooltip: {
          show: false
        },
        data: [
          { name: '济南市', value: [117.221211, 36.640013, 300] },
          { name: '青岛市', value: [120.150883, 36.451227, 100] },
          { name: '德州市', value: [116.307428, 37.453968, 200] },
          { name: '临沂市', value: [118.326443, 35.065282, 50] }
        ]
      },
      {
        type: 'lines',
        name: '黄色',
        lineStyle: {
          width: 3,
          opacity: 1,
          color: '#F4E925',
          curveness: 0.3,
          cap: 'round'
        },
        effect: {
          show: true,
          period: 5,
          trailLength: 0,
          symbol: 'arrow',
          symbolSize: 8
        },
        zlevel: 1,
        animationDuration (idx: number) {
          return idx * 1000
        },
        data: [
          {
            coords: [
              [117.221211, 36.640013],
              [120.150883, 36.451227]
            ]
          },
          {
            coords: [
              [120.150883, 36.451227],
              [116.307428, 37.453968]
            ]
          },
          {
            coords: [
              [116.307428, 37.453968],
              [118.326443, 35.065282]
            ]
          }
        ]
      },
      {
        type: 'lines',
        name: '红色',
        lineStyle: {
          width: 3,
          color: '#F56C6C',
          opacity: 1,
          curveness: 0.35,
          cap: 'round'
        },
        effect: {
          show: true,
          period: 5,
          trailLength: 0,
          symbol: 'arrow',
          symbolSize: 8
        },
        zlevel: 2,
        animationDuration (idx: number) {
          return idx * 1000
        },
        data: [
          {
            fromName: '济南市',
            toName: '青岛市',
            coords: [
              [117.221211, 36.640013],
              [120.150883, 36.451227]
            ]
          },
          {
            coords: [
              [120.150883, 36.451227],
              [116.307428, 37.453968]
            ]
          },
          {
            coords: [
              [116.307428, 37.453968],
              [118.326443, 35.065282]
            ]
          }
        ]
      }
    ]
  })
  return {
    option,
    map
  }
}
export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Map',
  components: {
    echartsComponent
  },
  async setup () {
    const { option, map } = await initMap()
    const chartClick = (params: Record<string, never>) => {
      console.log(map.features[params.dataIndex].properties.name)
    }
    return {
      option,
      chartClick
    }
  }
})
</script>

<style lang="scss" scoped>
.map {
  margin: 0 auto;
  width: 800px;
  height: 600px;
}
</style>
