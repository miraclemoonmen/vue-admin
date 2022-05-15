import store from '@/store'
import { computed } from 'vue'
export const isDark = computed(() => store.state.user.isDark)
