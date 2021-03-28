<template>
  <index title="未完成看板" :list-type="LIST_TYPE_UNFINISHED" />
</template>

<script>
import { defineComponent, defineAsyncComponent } from 'vue'

import { LIST_TYPE_UNFINISHED } from '@/views/index/constant'

export default defineComponent({
  name: 'Unfinished',
  components: {
    Index: defineAsyncComponent(() => import('@/views/index/Index.vue'))
  },
  setup() {
    return { LIST_TYPE_UNFINISHED }
  }
})
</script>

<style lang="scss" scoped>
.wrapper {
}
</style>
