export const DRAGGABLE_OPTIONS = {
  // delay: 100,
  animation: 300,
  filter: '.main-more',
  ghostClass: 'sortable-ghost',
  chosenClass: 'sortable-chosen',
  dragClass: 'sortable-drag'
}

export const MATURITY_REMIND_LISTS = [
  { label: '无', value: -1 },
  { label: '准时', value: 0 },
  { label: '提前 5 分钟', value: 5 },
  { label: '提前 1 小时', value: 60 },
  { label: '提前 1 天', value: 60 * 24 },
  { label: '提前 2 天', value: 60 * 24 * 2 }
]
