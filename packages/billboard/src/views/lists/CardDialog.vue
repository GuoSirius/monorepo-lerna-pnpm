<template>
  <el-dialog
    custom-class="wrapper"
    title="新建卡片"
    v-model="isVisible"
    width="512px"
    top="auto"
    append-to-body
    :close-on-click-modal="false"
    v-bind="$attrs"
    @open="openHandler"
    @close="closeHandler"
  >
    <el-form ref="form" :model="formModel" label-width="auto" @keyup.enter.stop.prevent="enterHandler">
      <el-form-item label="卡片名称" prop="name">
        <el-input v-model="formModel.name" autofocus placeholder="请输入要新建的卡片名称" />
      </el-form-item>

      <el-form-item label="到期时间" prop="maturityTime">
        <el-date-picker
          v-model="formModel.maturityTime"
          type="datetime"
          format="YYYY/MM/DD HH:mm"
          placeholder="添加到期日期"
        />
      </el-form-item>

      <el-form-item label="到期提醒" prop="reminderTime">
        <el-select v-model="formModel.reminderTime" value-key="value" placeholder="添加到期提醒">
          <el-option v-for="item in MATURITY_REMIND_LISTS" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>

      <el-form-item label="卡片描述" prop="description">
        <el-input
          v-model="formModel.description"
          :autosize="{ minRows: 2 }"
          type="textarea"
          rows="2"
          autofocus
          placeholder="添加描述……"
        />
      </el-form-item>
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

import { editCard } from '@/api/lists'

import { MATURITY_REMIND_LISTS } from './constant'

export default defineComponent({
  name: 'CardDialog',
  inheritAttrs: false,
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    cardInformation: {
      type: Object,
      required: true
    }
  },
  emits: ['update:visible', 'confirm'],
  data() {
    return {
      formModel: {
        name: '',
        maturityTime: '',
        reminderTime: -1,
        description: ''
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
  created() {
    this.MATURITY_REMIND_LISTS = MATURITY_REMIND_LISTS
  },
  methods: {
    enterHandler() {
      this.confirmHandler()
    },
    openHandler() {
      const { formModel, cardInformation } = this
      const { name, maturityTime, reminderTime = -1, description } = cardInformation

      formModel.name = name
      formModel.maturityTime = maturityTime
      formModel.reminderTime = reminderTime
      formModel.description = description
    },
    closeHandler() {
      this.formModel = { name: '', maturityTime: '', reminderTime: -1, description: '' }
    },
    cancelHandler() {
      this.isVisible = false
    },
    confirmHandler() {
      const { formModel, cardInformation } = this
      const { _id: id } = cardInformation

      editCard({ ...formModel, id })
        .then(() => {
          this.isVisible = false

          this.$emit('confirm')
        })
        .catch(error => {
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
