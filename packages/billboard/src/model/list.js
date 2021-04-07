import ListModel from './ListModel'

import { getCardListsByListId } from './card'

// 新增 列表
export async function addList(billboardId, name) {
  await ListModel.connect()

  const list = ListModel.create({ billboardId, name })

  return list.save()
}

// 编辑 列表
export async function editList(id, name) {
  await ListModel.connect()

  return ListModel.findOneAndUpdate({ _id: id }, { name, updateTime: new Date() })
}

// 编辑 列表
export async function updateListOrder(id, order = 0) {
  await ListModel.connect()

  return ListModel.findOneAndUpdate({ _id: id }, { order, updateTime: new Date() })
}

// 删除 列表
export async function deleteList(id, isHardDelete = false) {
  await ListModel.connect()

  return isHardDelete
    ? ListModel.deleteOne({ _id: id })
    : ListModel.findOneAndUpdate({ _id: id }, { updateTime: new Date(), deleteTime: new Date() })
}

// 获取 列表
export async function getListLists() {
  await ListModel.connect()

  return ListModel.find(
    { $or: [{ deleteTime: null }, { deleteTime: { $exists: false } }] },
    { sort: ['order', 'createTime'] }
  ).then(lists => {
    return Promise.all(
      lists
        .map(item => item.toJSON())
        .map(async item => {
          const lists = await getCardListsByListId(item._id)

          return { ...item, lists }
        })
    )
  })
}
