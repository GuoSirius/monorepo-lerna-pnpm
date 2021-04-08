import dayjs from 'dayjs'

import BillboardModel from './BillboardModel'

import { getCardListsByBillboardId } from './card'

// 新增 看板
export async function addBillboard(name) {
  await BillboardModel.connect()

  const billboard = BillboardModel.create({ name })

  return billboard.save()
}

// 编辑 看板
export async function editBillboard(id, name) {
  await BillboardModel.connect()

  return BillboardModel.findOneAndUpdate({ _id: id }, { name, updateTime: new Date() })
}

// 删除 看板
export async function deleteBillboard(id, isHardDelete = false) {
  await BillboardModel.connect()

  return isHardDelete
    ? BillboardModel.deleteOne({ _id: id })
    : BillboardModel.findOneAndUpdate({ _id: id }, { updateTime: new Date(), deleteTime: new Date() })
}

// 获取 看板列表
export async function getBillboardLists(name = '', isCompleted = null) {
  await BillboardModel.connect()

  let method = 'some'

  if (isCompleted) method = 'every'

  return BillboardModel.find(
    {
      $or: [{ deleteTime: null }, { deleteTime: { $exists: false } }],
      $where() {
        return !name || this.name.includes(name)
      }
    },
    { sort: ['-createTime'] }
  )
    .then(lists => {
      if (isCompleted === null) return lists

      return Promise.all(
        lists.map(async item => {
          const { _id } = item
          const lists = await getCardListsByBillboardId(_id)

          return { ...item, lists }
        })
      )
    })
    .then(lists => {
      return lists
        .map(item => item.toJSON?.() || item)
        .filter(item => isCompleted === null || item.lists[method](card => card.isCompleted === isCompleted))
        .map(item => ({ ...item, createDate: dayjs(item.createTime).format('MM/DD/YYYY') }))
    })
}
