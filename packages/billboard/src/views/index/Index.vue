<template>
  <div class="wrapper">
    <div class="recent-maturity">
      <h3 class="recent-maturity-title">最近到期的卡片</h3>
      <div v-if="recentMaturityLists.length" class="recent-maturity-box">
        <el-card v-for="index in 15" :key="index" class="card" @click.stop="viewCardHandler">
          <template #header>
            <div class="card-header">
              <p class="card-datetime"><i class="el-icon-time"></i><span>3/26/2021</span></p>

              <el-popover width="100px" trigger="focus" placement="right">
                <template #reference>
                  <i tabindex="-1" class="el-icon-more card-more" @click.stop></i>
                </template>

                <ul class="card-actions">
                  <li class="card-action">重命名卡片</li>
                  <li class="card-action">删除卡片</li>
                  <li class="card-action">完成卡片</li>
                </ul>
              </el-popover>
            </div>
          </template>
          <div class="card-body">
            <p class="card-body-title">标题</p>
          </div>
        </el-card>
      </div>
      <p v-else class="recent-maturity-empty">没有最近到期的卡片</p>
    </div>

    <div class="all">
      <h3 class="all-title">{{ title }}</h3>
      <div class="all-box">
        <el-card v-for="index in 5" :key="index" class="card" @click.stop="viewBillboardHandler">
          <template #header>
            <div class="card-header">
              <p class="card-datetime"><span>创建于</span><i class="el-icon-date"></i><span>3/26/2021</span></p>

              <el-popover width="100px" trigger="focus" placement="right">
                <template #reference>
                  <i tabindex="-1" class="el-icon-more card-more" @click.stop></i>
                </template>

                <ul class="card-actions">
                  <li class="card-action">重命名标题</li>
                  <li class="card-action">删除看板</li>
                  <li class="card-action">完成看板</li>
                </ul>
              </el-popover>
            </div>
          </template>
          <div class="card-body">
            <p class="card-body-title">标题标题标题标题标题标题标题标题标题标题标题标题标题</p>
          </div>
        </el-card>

        <div class="card new-card" @click.stop="newBillboardHandler">
          <el-button type="text" icon="el-icon-plus" class="new-card-button">新建看板</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'

import { LIST_TYPE_ALL } from './constant'

export default defineComponent({
  name: 'Index',
  props: {
    title: {
      type: String,
      default: '全部看板'
    },
    listType: {
      type: String,
      default: LIST_TYPE_ALL
    }
  },
  setup() {
    const router = useRouter()

    const recentMaturityLists = ref([])

    return { router, recentMaturityLists }
  },
  methods: {
    viewCardHandler() {},
    viewBillboardHandler() {
      const { router } = this

      router.push({ path: '/lists' })
    },
    newBillboardHandler() {}
  }
})
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;

  .recent-maturity,
  .all {
    display: flex;
    flex-direction: column;

    &-title {
      margin-bottom: 12px;
      text-align: left;
      color: rgba(3, 14, 44, 0.85);
    }

    &-box {
      display: flex;
      flex-wrap: wrap;
    }

    &-empty {
      text-align: left;
      color: rgba(3, 14, 44, 0.25);
      font-size: 12px;
    }
  }

  .recent-maturity {
    margin-bottom: 16px;
  }

  .card {
    display: flex;
    flex: 0 0 auto;
    width: 220px;
    height: 100px;
    margin: 0 16px 16px 0;
    position: relative;
    transition: transform 0.5s ease-out 0s;
    cursor: pointer;

    &:not(.new-card):hover {
      transform: translateY(-5px);

      .card-more {
        opacity: 1;
      }
    }

    &.new-card {
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px dashed rgba(3, 14, 44, 0.25);
      border-radius: 8px;
      background-color: transparent;
      user-select: none;

      .new-card-button {
        color: rgba(3, 14, 44, 0.65);
      }
    }

    &-header,
    &-body {
      position: relative;
      text-align: left;

      &-title {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
    }

    &-datetime {
      & > * {
        &:not(:last-child) {
          margin-right: 6px;
        }
      }
    }

    &-more {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      position: absolute;
      top: 0;
      right: 0;
      transform: rotate(90deg);
      border-radius: 50%;
      box-shadow: rgb(3 14 44 / 9%) 0px 2px 4px 0px;
      background-color: rgba(255, 255, 255, 0.95);
      opacity: 0;
      outline: none;
    }
  }
}

.card-actions {
  display: flex;
  flex-direction: column;
}

.card-action {
  height: 36px;
  line-height: 36px;
  padding: 0 12px;
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 202, 25, 0.25);
  }
}
</style>
