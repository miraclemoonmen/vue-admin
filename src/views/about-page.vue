<template>
  <div class="about">
    <h1>This is an about page</h1>
    <el-button @click="dialogVisible = true" v-permission:button="permission">Dialog</el-button>
    <el-button @click="openDrawer('created')" v-permission:button="permission">add</el-button>
    <el-button @click="openDrawer()" v-permission:button="permission">see</el-button>
    <suspense>
      <Map />
    </suspense>
    <el-dialog v-model="dialogVisible" title="Tips" width="30%" @open="open">
      <echarts-component class="bar" :option="option" />
    </el-dialog>
    <el-drawer size="35%" v-model="drawer" title="I am the title" destroy-on-close>
      <form-component
        :formOptions="formOptions"
        :data="tmpObject"
        :fromType="fromType"
        ref="form"
        label-width="auto"
      >
        <template #upload>
          <el-button type="primary">Click to upload</el-button>
        </template>
        <template #tip>
          <p>jpg/png files with a size less than 500kb</p>
        </template>
      </form-component>
      <template #footer>
        <el-button>cancel</el-button>
        <el-button type="primary" @click="submitForm">confirm</el-button>
      </template>
    </el-drawer>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import Map from '@/components/Map.vue'
import formComponent from '@/components/form-component.vue'
import echartsComponent from '@/components/echarts-component.vue'
import dayjs from 'dayjs'
const {
  meta: { permission }
} = useRoute()
const dialogVisible = ref(false)
const fromType = ref('created')
const drawer = ref(false)
const option = ref({})
const open = async () => {
  await nextTick()
  option.value = {
    title: {
      text: 'ECharts 入门示例'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {},
    dimensions: ['year', 'a', 'b'],
    dataset: [
      {
        source: [
          {
            year: 2015,
            a: 1,
            b: 2
          },
          {
            year: 2016,
            a: 3,
            b: 4
          },
          {
            year: 2017,
            a: 5,
            b: 6
          }
        ]
      },
      {
        source: [
          {
            year: 2015,
            a: 3,
            b: 2
          },
          {
            year: 2016,
            a: 3,
            b: 4
          },
          {
            year: 2017,
            a: 2,
            b: 6
          }
        ]
      }
    ],
    grid: [
      {
        left: 50,
        right: 50,
        height: '35%'
      },
      {
        left: 50,
        right: 50,
        top: '55%',
        height: '35%'
      }
    ],
    xAxis: [{ type: 'category' }, { gridIndex: 1, type: 'category' }],
    yAxis: [{}, { gridIndex: 1 }],
    series: [
      { name: 'A', type: 'line', datasetIndex: 0 },
      { name: 'B', type: 'line', datasetIndex: 0 },
      {
        name: 'A',
        type: 'line',
        datasetIndex: 1,
        xAxisIndex: 1,
        yAxisIndex: 1
      },
      {
        name: 'B',
        type: 'line',
        datasetIndex: 1,
        xAxisIndex: 1,
        yAxisIndex: 1
      }
    ]
  }
}
const options = ref([{}])
const form = ref()
const submitForm = () => {
  form.value.submitForm(
    (val: Record<string, never>) => {
      console.log(val)
    },
    () => {
      console.log('失败')
    }
  )
}
setTimeout(() => {
  options.value = [
    {
      value: 'Option1',
      label: 'Option1',
      type: 'option'
    },
    {
      value: 'Option2',
      label: 'Option2',
      type: 'option'
    }
  ]
})
const options1 = ref()
const formOptions = reactive([
  {
    type: 'input',
    lable: 'Activity name',
    prop: 'user',
    value: '',
    attrs: {
      // disabled: true
    },
    rules: [
      {
        required: true,
        message: 'Please input Activity name',
        trigger: 'blur'
      },
      {
        min: 3,
        max: 5,
        message: 'Length should be 3 to 5',
        trigger: 'blur'
      }
    ]
  },
  {
    type: 'cascader',
    lable: 'cascader',
    prop: 'cascader',
    value: '',
    attrs: {
      options: options1
    }
  },
  {
    type: 'date-picker',
    lable: 'date-picker',
    prop: 'date-picker',
    value: [],
    attrs: {
      type: 'datetimerange'
    }
  },
  {
    type: 'input',
    lable: 'Activity zone',
    prop: 'password',
    value: ''
  },
  {
    type: 'input',
    lable: 'Activity zone2',
    prop: 'password2',
    value: ''
  },
  {
    type: 'select',
    lable: 'Instant delivery',
    prop: 'region',
    value: 'Option1',
    options,
    attrs: {
      placeholder: 'test'
    }
  },
  {
    type: 'switch',
    lable: 'Instant delivery',
    prop: 'delivery',
    value: true
  },
  {
    type: 'checkbox-group',
    lable: '多选框',
    prop: 'type',
    value: ['Online activities'],
    options: [
      {
        type: 'checkbox',
        label: 'Online activities',
        name: 'type'
      },
      {
        type: 'checkbox',
        label: 'Promotion activities',
        name: 'type'
      }
    ]
  },
  {
    type: 'radio-group',
    lable: '单选框',
    prop: 'resource',
    value: 'Sponsorship',
    options: [
      {
        type: 'radio',
        label: 'Sponsorship'
      },
      {
        type: 'radio',
        label: 'Venue'
      }
    ]
  },
  {
    type: 'upload',
    lable: '上传',
    prop: 'upload',
    value: [],
    attrs: {
      action: 'https://www.fastmock.site/mock/9610740db4aff3d4fa9b3f816a2ced43/mock/posts/',
      data: {
        key: 'test'
      }
    }
  },
  {
    type: 'editor',
    prop: 'editor',
    lable: '富文本',
    value: null,
    style: {
      height: '300px'
    }
  }
])
const tmpObject = ref()
const openDrawer = (type?: string) => {
  drawer.value = true
  switch (type) {
    case 'created':
      fromType.value = 'created'
      break
    default:
      fromType.value = ''
      setTimeout(() => {
        tmpObject.value = {
          password: '数据',
          editor: [{ type: 'paragraph', children: [{ text: 'HELLO WORLD' }] }],
          upload: [
            {
              name: 'food.jpeg',
              url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
            },
            {
              name: 'food2.jpeg',
              url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
            }
          ],
          'date-picker': [dayjs().format('YYYY-MM-DD HH:mm:ss'), dayjs().add(7, 'day').format('YYYY-MM-DD HH:mm:ss')],
          delivery: false
        }
        options1.value = [
          {
            value: 'guide',
            label: 'Guide',
            children: [
              {
                value: 'disciplines',
                label: 'Disciplines',
                children: [
                  {
                    value: 'consistency',
                    label: 'Consistency'
                  },
                  {
                    value: 'feedback',
                    label: 'Feedback'
                  },
                  {
                    value: 'efficiency',
                    label: 'Efficiency'
                  },
                  {
                    value: 'controllability',
                    label: 'Controllability'
                  }
                ]
              },
              {
                value: 'navigation',
                label: 'Navigation',
                children: [
                  {
                    value: 'side nav',
                    label: 'Side Navigation'
                  },
                  {
                    value: 'top nav',
                    label: 'Top Navigation'
                  }
                ]
              }
            ]
          },
          {
            value: 'component',
            label: 'Component',
            children: [
              {
                value: 'basic',
                label: 'Basic',
                children: [
                  {
                    value: 'layout',
                    label: 'Layout'
                  },
                  {
                    value: 'color',
                    label: 'Color'
                  },
                  {
                    value: 'typography',
                    label: 'Typography'
                  },
                  {
                    value: 'icon',
                    label: 'Icon'
                  },
                  {
                    value: 'button',
                    label: 'Button'
                  }
                ]
              },
              {
                value: 'form',
                label: 'Form',
                children: [
                  {
                    value: 'radio',
                    label: 'Radio'
                  },
                  {
                    value: 'checkbox',
                    label: 'Checkbox'
                  },
                  {
                    value: 'input',
                    label: 'Input'
                  },
                  {
                    value: 'input-number',
                    label: 'InputNumber'
                  },
                  {
                    value: 'select',
                    label: 'Select'
                  },
                  {
                    value: 'cascader',
                    label: 'Cascader'
                  },
                  {
                    value: 'switch',
                    label: 'Switch'
                  },
                  {
                    value: 'slider',
                    label: 'Slider'
                  },
                  {
                    value: 'time-picker',
                    label: 'TimePicker'
                  },
                  {
                    value: 'date-picker',
                    label: 'DatePicker'
                  },
                  {
                    value: 'datetime-picker',
                    label: 'DateTimePicker'
                  },
                  {
                    value: 'upload',
                    label: 'Upload'
                  },
                  {
                    value: 'rate',
                    label: 'Rate'
                  },
                  {
                    value: 'form',
                    label: 'Form'
                  }
                ]
              },
              {
                value: 'data',
                label: 'Data',
                children: [
                  {
                    value: 'table',
                    label: 'Table'
                  },
                  {
                    value: 'tag',
                    label: 'Tag'
                  },
                  {
                    value: 'progress',
                    label: 'Progress'
                  },
                  {
                    value: 'tree',
                    label: 'Tree'
                  },
                  {
                    value: 'pagination',
                    label: 'Pagination'
                  },
                  {
                    value: 'badge',
                    label: 'Badge'
                  }
                ]
              },
              {
                value: 'notice',
                label: 'Notice',
                children: [
                  {
                    value: 'alert',
                    label: 'Alert'
                  },
                  {
                    value: 'loading',
                    label: 'Loading'
                  },
                  {
                    value: 'message',
                    label: 'Message'
                  },
                  {
                    value: 'message-box',
                    label: 'MessageBox'
                  },
                  {
                    value: 'notification',
                    label: 'Notification'
                  }
                ]
              },
              {
                value: 'navigation',
                label: 'Navigation',
                children: [
                  {
                    value: 'menu',
                    label: 'Menu'
                  },
                  {
                    value: 'tabs',
                    label: 'Tabs'
                  },
                  {
                    value: 'breadcrumb',
                    label: 'Breadcrumb'
                  },
                  {
                    value: 'dropdown',
                    label: 'Dropdown'
                  },
                  {
                    value: 'steps',
                    label: 'Steps'
                  }
                ]
              },
              {
                value: 'others',
                label: 'Others',
                children: [
                  {
                    value: 'dialog',
                    label: 'Dialog'
                  },
                  {
                    value: 'tooltip',
                    label: 'Tooltip'
                  },
                  {
                    value: 'popover',
                    label: 'Popover'
                  },
                  {
                    value: 'card',
                    label: 'Card'
                  },
                  {
                    value: 'carousel',
                    label: 'Carousel'
                  },
                  {
                    value: 'collapse',
                    label: 'Collapse'
                  }
                ]
              }
            ]
          },
          {
            value: 'resource',
            label: 'Resource',
            children: [
              {
                value: 'axure',
                label: 'Axure Components'
              },
              {
                value: 'sketch',
                label: 'Sketch Templates'
              },
              {
                value: 'docs',
                label: 'Design Documentation'
              }
            ]
          }
        ]
      })
      break
  }
}
</script>

<style lang="scss" scoped>
.bar {
  width: 100%;
  height: 600px;
}
</style>
