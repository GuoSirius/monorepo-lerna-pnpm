<template>
  <el-dialog
    custom-class="wrapper"
    title="新建看板"
    v-model="isVisible"
    width="512px"
    top="auto"
    append-to-body
    :close-on-click-modal="false"
    v-bind="$attrs"
    @open="openHandler"
    @close="closeHandler"
  >
    <el-form ref="form" :model="formModel" label-width="auto" @key.enter.stop.prevent="enterHandler">
      <el-form-item label="名称" prop="name">
        <el-input v-model="formModel.name" placeholder="请输入要新建的看板名称" />
      </el-form-item>

      <!-- <el-form-item label="主题色" prop="theme">
        <el-input v-model="formModel.theme" />
      </el-form-item> -->
    </el-form>

    <template #footer>
      <div class="footer-actions">
        <el-button type="text" class="footer-cancel" @click.stop="cancelHandler">取消</el-button>
        <el-button type="warning" size="medium" round :disabled="!formModel.name" @click.stop="confirmHandler"
          >确定</el-button
        >
      </div>
    </template>
  </el-dialog>
</template>

<script>
import { defineComponent } from 'vue'

import { addBillboard } from '@/api/index'

export default defineComponent({
  name: 'BillboardDialog',
  inheritAttrs: false,
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:visible', 'confirm'],
  data() {
    return {
      formModel: {
        name: '',
        theme: ''
      }
    }
  },
  computed: {
    isVisible: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      }
    }
  },
  methods: {
    enterHandler() {
      this.confirmHandler()
    },
    openHandler() {},
    closeHandler() {
      this.formModel = { name: '', theme: '' }
    },
    cancelHandler() {
      this.isVisible = false
    },
    confirmHandler() {
      const { formModel } = this
      const { name } = formModel

      addBillboard(name).then((data) => {
        this.isVisible = false
        console.log(data)

        this.$emit('confirm')
      }).catch(error => {
        this.$message.error(error.message)
      })
    }
  }
})
</script>

<style lang="scss" scoped>
.wrapper {
  .footer-actions {
    text-align: right;
  }

  .footer-cancel {
    padding-left: 8px;
    padding-right: 8px;
    color: #666;
    font-size: 16px;
  }
}
</style>
