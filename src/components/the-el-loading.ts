import { ElLoading } from 'element-plus'
import { computed } from 'vue'
import { useUserStore } from '@/stores'

let fullscreenLoading: any
const show = (text = '页面初始化中，请稍后...'): void => {
  const userStore = useUserStore()
  const isDark = computed(() => userStore.isDark)
  fullscreenLoading = ElLoading.service({
    background: isDark.value ? 'rgb(30,41,59)' : '#fff',
    text,
    svg: `
    <path class="path" d="
      M 30 15
      L 28 17
      M 25.61 25.61
      A 15 15, 0, 0, 1, 15 30
      A 15 15, 0, 1, 1, 27.99 7.5
      L 15 15
    " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
  `,
    svgViewBox: '-10, -10, 50, 50'
  })
}

const close = (): void => {
  fullscreenLoading.close()
}

export { show, close }
