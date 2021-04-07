<template>
  <el-container class="wrapper">
    <el-header class="header">
      <div class="header-title">
        <h2>我的看板</h2>
      </div>
      <el-divider direction="vertical" />
      <div class="header-form">
        <el-input v-model="keywords" placeholder="搜索看板、卡片……" prefix-icon="el-icon-search" />
      </div>
    </el-header>

    <el-container class="body">
      <el-aside class="aside" width="240px">
        <div class="aside-tools">
          <el-button
            type="default"
            size="medium"
            icon="el-icon-plus"
            round
            class="new-billboard"
            @click.stop="newBillboardHandler"
            >新建看板</el-button
          >
        </div>
        <div class="aside-menu">
          <el-menu :default-active="activePath">
            <template v-for="menu in MENU_LISTS">
              <el-submenu v-if="menu?.children?.length" :key="menu.title + menu.href" :index="menu.href">
                <template #title> <i v-if="menu.icon" :class="menu.icon"></i>{{ menu.title }} </template>

                <el-menu-item
                  v-for="subMenu in menu.childre"
                  :key="menu.href + subMenu.title + subMenu.href"
                  :index="`${menu.href}/${subMenu.href}`"
                  @click="menuClickedHandler"
                >
                  <template #title> <i v-if="subMenu.icon" :class="subMenu.icon"></i>{{ subMenu.title }} </template>
                </el-menu-item>
              </el-submenu>

              <el-menu-item v-else :key="menu.title + menu.href" :index="menu.href" @click="menuClickedHandler">
                <template #title> <i v-if="menu.icon" :class="menu.icon"></i>{{ menu.title }} </template>
              </el-menu-item>
            </template>
          </el-menu>
        </div>
      </el-aside>

      <el-main class="main">
        <router-view />
      </el-main>
    </el-container>

    <billboard-dialog v-model:visible="isVisibleForBillboard" @confirm="confirmHandler" />
  </el-container>
</template>

<script>
import { defineComponent, defineAsyncComponent, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { MENU_LISTS } from './constant'

import { mapState, mapMutations } from 'vuex'

export default defineComponent({
  name: 'Layout',
  computed: {
    ...mapState(['name']),
    keywords: {
      get() {
        return this.name
      },
      set(val) {
        this.setName(val)
      }
    }
  },
  components: {
    BillboardDialog: defineAsyncComponent(() => import('@/views/index/BillboardDialog.vue'))
  },
  setup() {
    const route = useRoute()
    const router = useRouter()

    const activePath = ref(route.fullPath)

    const isVisibleForBillboard = ref(false)

    return { route, router, activePath, isVisibleForBillboard, MENU_LISTS }
  },
  methods: {
    ...mapMutations(['setName', 'setRefreshTime']),
    confirmHandler() {
      this.setRefreshTime()
    },
    newBillboardHandler() {
      this.isVisibleForBillboard = true
    },
    menuClickedHandler(params) {
      const { router } = this
      const { index } = params

      this.activePath = index
      router.push({ path: index })
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

    &-title {
      color: #504a4a;
      font-size: 16px;
      font-weight: normal;
    }
  }

  .body {
    background-color: rgb(243, 245, 249);
    overflow: hidden;
  }

  .aside {
    border-right: 1px solid #e6e6e6;

    &-tools {
      display: flex;
      flex: 0 0 auto;
      flex-direction: column;
      align-items: center;
      padding: 12px 0;

      .new-billboard {
        width: 80%;
        font-size: 14px;
      }
    }

    &-menu {
      text-align: left;
    }
  }
}
</style>
