import {
  OPEN_VALUE_PRESET_LISTS,
  NORMAL_OPEN_VALUE_LISTS,
  NORMAL_CLOSE_VALUE_LISTS,
  ACCIDENT_CLOSE_VALUE_LISTS
} from './constant'

// 切换 状态
export function switchStatus(pipeLists = [], statusLists = []) {
  pipeLists.forEach(item => {
    item.isReverse = false
    item.needAnimate = false

    const pipe = statusLists.find(v => v.id === item.id)

    if (!pipe) return

    item.isReverse = pipe.isReverse
    item.needAnimate = pipe.needAnimate
  })
}

// 开阀预置
export function openValuePreset(pipeLists = []) {
  switchStatus(pipeLists, OPEN_VALUE_PRESET_LISTS)
}

// 正常开阀
export function normalOpenValue(pipeLists = []) {
  switchStatus(pipeLists, NORMAL_OPEN_VALUE_LISTS)
}

// 正常关阀
export function normalCloseValue(pipeLists = []) {
  switchStatus(pipeLists, NORMAL_CLOSE_VALUE_LISTS)
}

// 事故关阀
export function accidentCloseValue(pipeLists = []) {
  switchStatus(pipeLists, ACCIDENT_CLOSE_VALUE_LISTS)
}
