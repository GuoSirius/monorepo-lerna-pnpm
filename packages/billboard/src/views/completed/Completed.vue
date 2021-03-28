<template>
  <index title="已完成看板" :list-type="LIST_TYPE_COMPLETED" />
</template>

<script>
import { defineComponent, defineAsyncComponent } from 'vue'

import { LIST_TYPE_COMPLETED } from '@/views/index/constant'

export default defineComponent({
  name: 'Completed',
  components: {
    Index: defineAsyncComponent(() => import('@/views/index/Index.vue'))
  },
  setup() {
    return { LIST_TYPE_COMPLETED }
  }
})
</script>

<style lang="scss" scoped>
.wrapper {
}
</style>
