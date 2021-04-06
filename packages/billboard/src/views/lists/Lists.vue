<template>
  <el-container class="wrapper">
    <el-header class="header" height="48px">
      <div class="header-back">
        <!-- <i class="header-back-icon el-icon-back" @click.stop="backHandler"></i> -->
        <i class="header-back-icon el-icon-arrow-left" @click.stop="backHandler"></i>
      </div>

      <p class="header-title">看板标题</p>
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
        item-key="title"
        group="card-list"
        class="main-lists"
        v-bind="{ ...DRAGGABLE_OPTIONS, handle: '.main-header' }"
        @start="startDragListHandler"
        @end="endDragListHandler"
      >
        <template #item="{ element: item, index: listIndex }">
          <div :key="item.title" class="main-item">
            <div class="main-header">
              <h2 class="main-header-title">{{ item.title }}</h2>
              <span class="main-header-count">({{ item.lists?.length || 0 }})</span>

              <el-popover width="100px" trigger="focus" placement="right">
                <template #reference>
                  <i tabindex="-1" class="el-icon-more main-more main-header-more" @click.stop></i>
                </template>

                <ul class="main-actions">
                  <li class="main-action">重命名列表</li>
                  <li class="main-action">删除列表</li>
                  <li class="main-action">完成列表</li>
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
                item-key="title"
                group="card-item"
                class="lists"
                v-bind="DRAGGABLE_OPTIONS"
                @start="startDragCardHandler"
                @end="endDragCardHandler"
              >
                <template #item="{ element, index }">
                  <li :key="element.title" class="item" @click.stop="cardClickedHandler(item, index, listIndex)">
                    {{ element.title }}

                    <el-popover width="100px" trigger="focus" placement="right">
                      <template #reference>
                        <i tabindex="-1" class="el-icon-more main-more main-card-more" @click.stop></i>
                      </template>

                      <ul class="main-actions">
                        <li class="main-action">删除卡片</li>
                        <li class="main-action">完成卡片</li>
                      </ul>
                    </el-popover>
                  </li>
                </template>
              </vue-draggable>

              <div class="new-card">
                <div v-if="listIndex === activeListId && isAddingCard" class="main-form">
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
                  @click.stop="newCardHandler(item, listIndex)"
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
  </el-container>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'

import VueDraggable from 'vuedraggable'

import { DRAGGABLE_OPTIONS, CARD_LISTS } from './constant'

export default defineComponent({
  name: 'Lists',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  components: { VueDraggable },
  setup() {
    const router = useRouter()

    const listTitle = ref('')
    const isAddingList = ref(false)
    const isEdittingList = ref(false)
    const isDraggingList = ref(false)

    const cardTitle = ref('')
    const isAddingCard = ref(false)
    const isDraggingCard = ref(false)

    const cardLists = ref([])
    const activeListId = ref(0)

    return {
      router,
      listTitle,
      isAddingList,
      isEdittingList,
      isDraggingList,
      cardTitle,
      isAddingCard,
      isDraggingCard,
      cardLists,
      activeListId,
      DRAGGABLE_OPTIONS
    }
  },
  created() {
    this.getCardLists()
  },
  methods: {
    getCardLists() {
      this.cardLists = CARD_LISTS
    },
    cardClickedHandler() {
      console.log(123)
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
      this.isDraggingCard = false
    },
    backHandler() {
      const { router } = this

      router.back()
    },
    addListHandler() {
      this.isAddingList = true
      this.isAddingCard = false
    },
    addListCancelHandler() {
      this.isAddingList = false
    },
    addListConfirmHandler() {
      const { cardLists, listTitle } = this

      cardLists.push({ title: listTitle, lists: [] })

      this.listTitle = ''
    },
    newCardHandler(item, listIndex) {
      this.activeListId = listIndex

      this.isAddingList = false
      this.isAddingCard = true
    },
    newCardCancelHandler() {
      this.isAddingCard = false
    },
    newCardConfirmHandler() {
      const { cardTitle, activeListId, cardLists } = this

      cardLists[activeListId].lists.push({ title: cardTitle })

      this.cardTitle = ''
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
</style>
