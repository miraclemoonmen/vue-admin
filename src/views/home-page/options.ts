import { reactive } from 'vue'

export const optionLine = reactive({
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    bottom: '5%'
  },
  color: ['rgb(126,87,194)', 'rgb(30,136,229)'],
  dataset: {
    dimensions: ['day', 'ThisMonth', 'prevMonth'],
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
  xAxis: [{
    type: 'category'
    // boundaryGap: false
  }],
  yAxis: [{}],
  series: [
    { name: '本月', type: 'line' },
    { name: '上月', type: 'line' }
  ]
})

export const optionPie = reactive({
  tooltip: {},
  legend: {
    bottom: '5%'
  },
  color: ['#2e65fd', '#76c15c', '#1fcaa8', '#fec02a', '#ee6565'],
  dataset: {
    dimensions: ['product', 'value'],
    source: [
      { product: 'A类', value: 43.3 },
      { product: 'B类', value: 83.1 },
      { product: 'C类', value: 86.4 },
      { product: 'D类', value: 72.4 },
      { product: 'E类', value: 22.4 }
    ]
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

export const columns1 = [
  {
    label: '姓名',
    prop: 'name',
    width: 160,
    slot: 'name'
  },
  {
    label: '年龄',
    prop: 'age',
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
    width: 120,
    fixed: 'right'
  }
]

export const columns2 = [
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
  }
]

export const paginationAndSortOptions1 = reactive({
  currentPage: 1,
  pageSize: 10,
  prop: '',
  order: ''
})

export const paginationAndSortOptions2 = reactive({
  currentPage: 1,
  pageSize: 10,
  prop: '',
  order: ''
})
