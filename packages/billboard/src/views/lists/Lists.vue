<template>
  <el-container class="wrapper">
    <el-header class="header" height="48px">
      <div class="header-back">
        <!-- <i class="header-back-icon el-icon-back" @click.stop="backHandler"></i> -->
        <i class="header-back-icon el-icon-arrow-left" @click.stop="backHandler"></i>
      </div>

      <p class="header-title">{{ title }}</p>
    </el-header>

    <el-main class="main">
      <vue-draggable
        v-model="cardLists"
        tag="transition-group"
        :component-data="{
          tag: 'div',
          type: 'transition-group',
          name: isDraggingList ? null : 'flip-list'
        }"
        disabled
        item-key="_id"
        group="card-list"
        class="main-lists"
        v-bind="{ ...DRAGGABLE_OPTIONS, handle: '.main-header==' }"
        @start="startDragListHandler"
        @end="endDragListHandler"
      >
        <template #item="{ element: item }">
          <div :key="item._id" class="main-item">
            <div class="main-header" @click.stop="renameListHandler(item)">
              <!-- <h2 class="main-header-title">{{ item.name }}</h2> -->
              <el-input
                v-model="item.name"
                autofocus
                :readonly="!isEdittingList || item._id !== activeListId"
                placeholder=""
                class="main-header-title"
                @change="changeListNameHandler"
              />
              <span class="main-header-count">({{ item.lists?.length || 0 }})</span>

              <el-popover
                :key="item._id"
                :show-after="300"
                :tabindex="-1"
                width="100px"
                trigger="hover"
                placement="right"
              >
                <template #reference>
                  <i tabindex="-1" class="el-icon-more main-more main-header-more" @click.stop></i>
                </template>

                <ul class="main-actions">
                  <li class="main-action" @click.stop="renameListHandler(item)">重命名列表</li>
                  <li class="main-action" @click.stop="deleteListHandler(item)">删除列表</li>
                  <li class="main-action" @click.stop="completeListHandler(item)">完成列表</li>
                </ul>
              </el-popover>
            </div>
            <div class="main-box">
              <vue-draggable
                v-model="item.lists"
                tag="transition-group"
                :component-data="{
                  tag: 'ul',
                  type: 'transition-group',
                  name: isDraggingCard ? null : 'flip-card'
                }"
                item-key="_id"
                group="card-item"
                :move="moveCardHandler"
                class="lists"
                v-bind="DRAGGABLE_OPTIONS"
                @start="startDragCardHandler"
                @end="endDragCardHandler"
              >
                <template #item="{ element }">
                  <li :key="element._id" class="item" @click.stop="cardClickedHandler(element)">
                    <p class="card-item-title">{{ element.name }}</p>
                    <p v-if="element.isCompleted" class="card-item-status">
                      <i class="el-icon-check card-item-status-icon"></i>
                      <span class="card-item-status-text">已完成</span>
                    </p>

                    <el-popover
                      :key="element._id"
                      :show-after="300"
                      :tabindex="-1"
                      width="100px"
                      trigger="hover"
                      placement="right"
                    >
                      <template #reference>
                        <i tabindex="-1" class="el-icon-more main-more main-card-more" @click.stop></i>
                      </template>

                      <ul class="main-actions">
                        <li class="main-action" @click.stop="deleteCardHandler(element)">删除卡片</li>
                        <li class="main-action" @click.stop="completeCardHandler(element)">
                          {{ element.isCompleted ? '取消完成' : '完成卡片' }}
                        </li>
                      </ul>
                    </el-popover>
                  </li>
                </template>
              </vue-draggable>

              <div class="new-card">
                <div v-if="item._id === activeListId && isAddingCard" class="main-form">
                  <el-input
                    v-model="cardTitle"
                    :autosize="{ minRows: 3 }"
                    type="textarea"
                    rows="2"
                    autofocus
                    placeholder="请输入卡片名称"
                    @keyup.enter.stop.prevent="newCardConfirmHandler"
                  />

                  <div class="main-form-actions">
                    <el-button type="text" class="main-form-cancel" @click.stop="newCardCancelHandler">取消</el-button>
                    <el-button
                      type="warning"
                      size="mini"
                      round
                      :disabled="!cardTitle"
                      @click.stop="newCardConfirmHandler"
                      >确定</el-button
                    >
                  </div>
                </div>

                <el-button
                  v-else
                  type="default"
                  size="medium"
                  icon="el-icon-plus"
                  round
                  class="new-card-button"
                  @click.stop="newCardHandler(item)"
                  >新建卡片</el-button
                >
              </div>
            </div>
          </div>
        </template>

        <template #footer>
          <div key="list-footer" class="main-item main-item-create">
            <div v-if="isAddingList" class="main-form">
              <el-input
                v-model="listTitle"
                :autosize="{ minRows: 2 }"
                type="textarea"
                rows="2"
                autofocus
                placeholder="请输入列表名称"
                @keyup.enter.stop.prevent="addListConfirmHandler"
              />

              <div class="main-form-actions">
                <el-button type="text" class="main-form-cancel" @click.stop="addListCancelHandler">取消</el-button>
                <el-button type="warning" size="mini" round :disabled="!listTitle" @click.stop="addListConfirmHandler"
                  >确定</el-button
                >
              </div>
            </div>

            <el-button
              v-else
              type="text"
              size="medium"
              icon="el-icon-plus"
              class="main-item-create-button"
              @click.stop="addListHandler"
              >添加列表</el-button
            >
          </div>
        </template>
      </vue-draggable>
    </el-main>

    <card-dialog v-model:visible="isVisibleForCard" :card-information="activeCard" @confirm="confirmCardHandler" />
  </el-container>
</template>

<script>
import debounce from 'lodash/debounce'

import { defineComponent, defineAsyncComponent, ref } from 'vue'
import { useRouter } from 'vue-router'

import VueDraggable from 'vuedraggable'

import {
  addList,
  editList,
  deleteList,
  getListLists,
  addCard,
  deleteCard,
  changeCardStatusById,
  changeCardStatusByListId,
  updateCardAffiliationAndOrder
} from '@/api/lists'

import { DRAGGABLE_OPTIONS } from './constant'

export default defineComponent({
  name: 'Lists',
  props: {
    title: {
      type: String,
      default: '看板标题'
    },
    billboardId: {
      type: String,
      required: true
    }
  },
  components: { VueDraggable, CardDialog: defineAsyncComponent(() => import('./CardDialog.vue')) },
  setup() {
    const router = useRouter()

    const listTitle = ref('')
    const isAddingList = ref(false)
    const isEdittingList = ref(false)
    const isDraggingList = ref(false)

    const cardTitle = ref('')
    const isAddingCard = ref(false)
    const isDraggingCard = ref(false)
    const isVisibleForCard = ref(false)

    const cardLists = ref([])
    const activeCard = ref({})
    const activeListId = ref('')

    return {
      router,
      listTitle,
      isAddingList,
      isEdittingList,
      isDraggingList,
      cardTitle,
      isAddingCard,
      isDraggingCard,
      isVisibleForCard,
      cardLists,
      activeCard,
      activeListId,
      DRAGGABLE_OPTIONS
    }
  },
  created() {
    this.getCardLists()
    this.debounceUpdateCardAffiliationAndOrder = debounce(updateCardAffiliationAndOrder, 300, {
      leading: false,
      trailing: true
    })
  },
  methods: {
    getCardLists(billboardId = this.billboardId) {
      getListLists(billboardId)
        .then(lists => {
          this.cardLists = lists
        })
        .catch(error => this.$message.error(error.message))
    },
    moveCardHandler() {
      // const { cardLists } = this
      // this.debounceUpdateCardAffiliationAndOrder(cardLists)
    },
    cardClickedHandler(card) {
      this.activeCard = card
      this.isVisibleForCard = true
    },
    confirmCardHandler() {
      this.getCardLists()
    },
    startDragListHandler() {
      this.isDraggingList = true
    },
    endDragListHandler() {
      this.isDraggingList = false
    },
    startDragCardHandler() {
      this.isDraggingCard = true
    },
    endDragCardHandler() {
      const { cardLists } = this

      this.isDraggingCard = false

      this.debounceUpdateCardAffiliationAndOrder(cardLists)
    },
    backHandler() {
      const { router } = this

      router.back()
    },
    addListHandler() {
      this.isAddingList = true
      this.isEdittingList = false
      this.isAddingCard = false
    },
    addListCancelHandler() {
      this.isAddingList = false
    },
    addListConfirmHandler() {
      const { billboardId, listTitle } = this

      addList(billboardId, listTitle)
        .then(() => this.getCardLists())
        .catch(error => this.$message.error(error.message))

      this.listTitle = ''
    },
    changeListNameHandler(name) {
      const { activeListId } = this

      this.isEdittingList = false

      editList(activeListId, name)
        .then(() => this.getCardLists())
        .catch(error => this.$message.error(error.message))
    },
    renameListHandler(item) {
      const { _id } = item

      this.activeListId = _id

      this.isAddingList = false
      this.isEdittingList = true
      this.isAddingCard = false
    },
    deleteListHandler(item) {
      const { _id } = item

      this.$confirm('您确定要删除这个列表项吗?', '温馨提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        distinguishCancelAndClose: true
      })
        .then(() => deleteList(_id))
        .then(() => {
          this.$message.success('列表项删除成功')
          this.getCardLists()
        })
        .catch(error => console.log(error))
    },
    completeListHandler(item) {
      const { _id } = item

      changeCardStatusByListId(_id)
        .then(() => {
          this.$message.success('列表项已完成')
          this.getCardLists()
        })
        .catch(error => this.$message.error(error.message))
    },
    newCardHandler(item) {
      const { _id } = item

      this.activeListId = _id

      this.isAddingList = false
      this.isEdittingList = false
      this.isAddingCard = true
    },
    newCardCancelHandler() {
      this.isAddingCard = false
    },
    newCardConfirmHandler() {
      const { cardLists, cardTitle, activeListId, billboardId } = this

      const cardList = cardLists.find(item => item._id === activeListId)
      const order = cardList.lists?.length || 0

      addCard({ billboardId, listId: activeListId, name: cardTitle, order })
        .then(() => this.getCardLists())
        .catch(error => this.$message.error(error.message))

      this.cardTitle = ''
    },
    deleteCardHandler(card) {
      const { _id } = card

      this.$confirm('您确定要删除这个卡片吗?', '温馨提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        distinguishCancelAndClose: true
      })
        .then(() => deleteCard(_id))
        .then(() => {
          this.$message.success('卡片删除成功')
          this.getCardLists()
        })
        .catch(error => console.log(error))
    },
    completeCardHandler(card) {
      const { _id, isCompleted } = card

      const message = isCompleted ? '成功取消卡片完成状态' : '卡片已完成'

      changeCardStatusById(_id, !isCompleted)
        .then(() => {
          this.$message.success(message)
          this.getCardLists()
        })
        .catch(error => this.$message.error(error.message))
    }
  }
})
</script>

<style lang="scss" scoped>
.wrapper {
  height: 100%;

  .header {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    color: #fff;
    background-color: rgb(246, 175, 5);

    &-back {
      margin-right: 12px;
      cursor: pointer;

      &-icon {
        font-size: 32px;
      }
    }

    &-title {
    }
  }

  .main {
    padding: 0;
    background-color: rgb(245, 246, 248);
    overflow: hidden;
    overflow-x: auto;

    &-lists {
      display: flex;
      flex-wrap: nowrap;
      height: 100%;
      padding-top: 6px;
    }

    &-item {
      display: flex;
      flex-direction: column;
      flex: 0 0 auto;
      width: 288px;
      padding: 0 12px;
      border-radius: 12px;

      &:not(.main-item-create):hover {
        background-color: rgba(3, 14, 44, 0.04);

        .main-header-more {
          opacity: 1;
        }
      }

      &-create-button {
        padding: 0;
        color: rgb(246, 175, 5);
        text-align: left;
      }
    }

    &-header {
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      line-height: 36px;
      padding-right: 28px;
      position: relative;

      &-title {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;

        :deep(.el-input__inner) {
          width: 100%;
          padding: 0;
          background-color: #fff;

          &[readonly],
          &[readonly]:focus {
            border: none;
            outline: none;
            background-color: transparent;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
        }
      }

      &-count {
        margin-left: 12px;
        color: rgba(3, 14, 44, 0.45);
      }
    }

    &-more {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      position: absolute;
      top: 6px;
      right: 0;
      transform: rotate(90deg);
      border-radius: 50%;
      opacity: 0;
      outline: none;
      cursor: pointer;

      &.main-card-more {
        box-shadow: rgb(3 14 44 / 9%) 0px 2px 4px 0px;
        background-color: rgba(255, 255, 255, 0.95);
      }
    }

    &-box {
      overflow: hidden;
      overflow-y: auto;
    }

    &-form {
      &-actions {
        margin-top: 6px;
        text-align: right;
      }

      &-cancel {
        padding-left: 8px;
        padding-right: 8px;
        color: #666;
      }
    }

    .lists {
      display: flex;
      flex-direction: column;
      text-align: left;
    }

    .item {
      padding: 10px 24px 10px 12px;
      margin-bottom: 12px;
      position: relative;
      border-radius: 8px;
      background-color: #fff;
      cursor: pointer;

      &:hover {
        .main-card-more {
          opacity: 1;
        }
      }
    }

    .new-card {
      &-button {
        width: 100%;
      }
    }

    .card-item {
      &-title {
      }

      &-status {
        display: flex;
        flex-wrap: nowrap;
        align-items: center;

        &-icon {
          margin-right: 6px;
          color: #fff;
          border-radius: 50%;
          background-color: rgb(58, 163, 97);
        }

        &-text {
          color: rgb(58, 163, 97);
          font-size: 14px;
        }
      }
    }

    .flip-list-move,
    .flip-card-move {
      transition: transform 0.5s;
    }

    .sortable-chosen,
    .sortable-drag {
      &.sortable-ghost {
        transform-origin: center;
        transform: rotate(3deg);
      }
    }

    .sortable-ghost {
      opacity: 0;
    }
  }
}

.main-actions {
  display: flex;
  flex-direction: column;
}

.main-action {
  height: 36px;
  line-height: 36px;
  padding: 0 12px;
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 202, 25, 0.25);
  }
}
</style>
