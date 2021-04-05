<template>
  <el-dialog title="新建看板" v-model="isVisible" width="512px" top="auto" append-to-body :close-on-click-modal="false" v-bind="$attrs">
    <span>This is a message</span>

    <template #footer>
        <el-button @click="isVisible = false">Cancel</el-button>
        <el-button type="primary" @click="isVisible = false">Confirm</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BillboardDialog',
  inheritAttrs: false,
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:visible'],
  computed: {
    isVisible: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.wrapper {
}
</style>
