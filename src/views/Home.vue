<template>
  <div class="home">
    <div class="home_top">
      <div v-for="(item, index) in 4" :key="index" class="home_top_item_num">
        <div class="home_top_item_num_title">总收入</div>
        <div class="home_top_item_num_middle">￥28,425.00</div>
        <div class="home_top_item_num_foot">自从上周以来</div>
      </div>
    </div>
    <div class="home_topmidlle">
      <div class="home_topmidlle_line">
        <div class="title">
          <p>统计数据</p>
        </div>
        <Echarts class="home_topmidlle_line_content" :option="optionLine" />
      </div>
      <div class="home_topmidlle_pie">
        <div class="title">处置调度</div>
        <Echarts class="home_topmidlle_pie_content" :option="optionPie" />
      </div>
    </div>
    <div class="home_midlle">
      <div class="home_midlle_left">
        <div class="title">指挥中心</div>
        <div class="home_midlle_left_content">
          <Table :columns="columns" url="/mock/getList">
            <template #name="{ scope }">
              <el-tag>{{ scope.name }}</el-tag>
            </template>
            <template #action="{ scope }">
              <el-button type="text" size="small" @click="seeIt(scope)">查看</el-button>
              <el-button type="text" size="small">删除</el-button>
            </template>
          </Table>
        </div>
      </div>
      <div class="home_midlle_right">
        <div class="title">指挥中心</div>
        <div class="home_midlle_right_content">
          <Table :columns="[]" url="/mock/getLis">
            <template #name="{ scope }">
              <el-button type="text">{{ scope.name }}</el-button>
            </template>
          </Table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import Echarts from '@/components/Echarts.vue'
import Table from '@/components/Table.vue'
const seeIt = (val: any) => {
  console.log(val)
}
const columns = [
  {
    label: '姓名',
    prop: 'name',
    width: 160,
    slot: 'name'
  },
  {
    label: '年龄',
    prop: 'age',
    type: 'link',
    width: 160,
    edit: true
  },
  {
    label: '姓名',
    prop: 'name',
    width: 160
  },
  {
    label: '年龄',
    prop: 'age',
    type: 'link',
    width: 160
  },
  {
    label: '姓名',
    prop: 'name',
    width: 160
  },
  {
    label: '年龄',
    prop: 'age',
    type: 'link',
    width: 160
  },
  {
    label: '操作',
    slot: 'action',
    align: 'center',
    width: 100,
    fixed: 'right'
  }
]
const optionLine = reactive({
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    bottom: '5%'
  },
  dimensions: ['day', 'ThisMonth', 'prevMonth'],
  color: ['#0052d9', '#0594fa'],
  dataset: {
    source: [
      {
        day: '12-20',
        ThisMonth: 60,
        prevMonth: 85
      },
      {
        day: '12-21',
        ThisMonth: 80,
        prevMonth: 82
      },
      {
        day: '12-22',
        ThisMonth: 45,
        prevMonth: 45
      },
      {
        day: '12-23',
        ThisMonth: 60,
        prevMonth: 20
      },
      {
        day: '12-24',
        ThisMonth: 80,
        prevMonth: 75
      },
      {
        day: '12-25',
        ThisMonth: 45,
        prevMonth: 40
      },
      {
        day: '12-26',
        ThisMonth: 60,
        prevMonth: 20
      }
    ]
  },
  grid: {
    left: '6%',
    right: '6%'
  },
  xAxis: [{ type: 'category', boundaryGap: false }],
  yAxis: [{}],
  series: [
    { name: '本月', type: 'line', areaStyle: { color: '#e5edfb' } },
    { name: '上月', type: 'line', areaStyle: { color: '#e5edfb' } }
  ]
})
const optionPie = reactive({
  tooltip: {},
  legend: {
    bottom: '5%'
  },
  dimensions: ['product', 'value'],
  color: ['#2e65fd', '#76c15c', '#1fcaa8', '#fec02a', '#ee6565'],
  dataset: {
    source: [] as Record<string, unknown>[]
  },
  height: '80%',
  series: [
    {
      name: '处置调度',
      type: 'pie',
      radius: ['40%', '70%'],
      center: ['50%', '50%'],
      roseType: 'area',
      itemStyle: {
        borderRadius: 8
      }
    }
  ]
})
setTimeout(() => {
  optionPie.dataset.source = [
    { product: 'A类', value: 43.3 },
    { product: 'B类', value: 83.1 },
    { product: 'C类', value: 86.4 },
    { product: 'D类', value: 72.4 },
    { product: 'E类', value: 22.4 }
  ]
}, 1000)
optionLine.dataset.source = [
  {
    day: '12-20',
    ThisMonth: 60,
    prevMonth: 85
  },
  {
    day: '12-21',
    ThisMonth: 80,
    prevMonth: 82
  },
  {
    day: '12-22',
    ThisMonth: 45,
    prevMonth: 45
  },
  {
    day: '12-23',
    ThisMonth: 60,
    prevMonth: 20
  },
  {
    day: '12-24',
    ThisMonth: 80,
    prevMonth: 75
  },
  {
    day: '12-25',
    ThisMonth: 45,
    prevMonth: 40
  },
  {
    day: '12-26',
    ThisMonth: 60,
    prevMonth: 20
  }
]
</script>

<style lang="scss" scoped>
.home {
  &_top {
    display: flex;
    justify-content: space-between;

    &_item_num {
      @include whiteContent;
      flex: 0 0 384px;
      justify-content: inherit;
      box-sizing: border-box;
      padding: 34px;
      height: 168px;
      color: #999999;
      font-size: 12px;

      &_middle {
        font-size: 28px;
        color: #191919;
      }
    }
  }

  &_topmidlle {
    display: flex;
    width: 100%;
    height: 405px;
    margin-top: 18px;

    &_line {
      box-sizing: border-box;
      @include whiteContent;
      margin-right: 40px;

      &_content {
        flex: 1;
      }
    }

    &_pie {
      @include whiteContent;
      flex: 0 0 384px;

      &_content {
        flex: 1;
      }
    }
  }

  &_midlle {
    display: flex;
    margin-top: 20px;
    width: 100%;
    height: 465px;

    &_left {
      @include whiteContent;
      margin-right: 20px;
      padding-bottom: 20px;
      overflow: hidden;

      &_content {
        flex: 1;
        padding: 20px 40px 0px 40px;
        overflow: hidden;
      }
    }

    &_right {
      @include whiteContent;
      padding-bottom: 20px;
      overflow: hidden;

      &_content {
        flex: 1;
        padding: 20px 40px 0px 40px;
        overflow: hidden;
      }
    }
  }

  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 22px;
    padding: 30px 40px 0px 40px;
  }
}
</style>
