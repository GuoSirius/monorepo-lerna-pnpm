import CardModel from './CardModel'

// 新增 卡片
export async function addCard({ billboardId, listId, name } = {}) {
  await CardModel.connect()

  const card = CardModel.create({ billboardId, listId, name })

  return card.save()
}

// 编辑 卡片
export async function editCard({ id, name, maturityTime, description } = {}) {
  await CardModel.connect()

  return CardModel.findOneAndUpdate({ _id: id }, { name, maturityTime, description, updateTime: new Date() })
}

// 改变 卡片状态
export async function changeCardStatusById(id, isCompleted = true) {
  await CardModel.connect()

  return CardModel.findOneAndUpdate({ _id: id }, { isCompleted, updateTime: new Date() })
}
export async function changeCardStatusByListId(listId, isCompleted = true) {
  await CardModel.connect()

  return CardModel.findOneAndUpdate({ listId }, { isCompleted, updateTime: new Date() })
}
export async function changeCardStatusByBillboardId(billboardId, isCompleted = true) {
  await CardModel.connect()

  return CardModel.findOneAndUpdate({ billboardId }, { isCompleted, updateTime: new Date() })
}

// 删除 卡片
export async function deleteCard(id, isHardDelete = false) {
  await CardModel.connect()

  return isHardDelete
    ? CardModel.deleteOne({ _id: id })
    : CardModel.findOneAndUpdate({ _id: id }, { updateTime: new Date(), deleteTime: new Date() })
}

// 获取 卡片列表
export async function getCardLists() {
  await CardModel.connect()

  return CardModel.find(
    { $or: [{ deleteTime: null }, { deleteTime: { $exists: false } }] },
    { sort: ['order', 'createTime'] }
  ).then(lists => {
    return lists.map(item => item.toJSON())
  })
}
export async function getCardListsByListId(listId) {
  await CardModel.connect()

  return CardModel.find(
    { listId, $or: [{ deleteTime: null }, { deleteTime: { $exists: false } }] },
    { sort: ['order', 'createTime'] }
  ).then(lists => {
    return lists.map(item => item.toJSON())
  })
}
export async function getCardListsByBillboardId(billboardId) {
  await CardModel.connect()

  return CardModel.find(
    { billboardId, $or: [{ deleteTime: null }, { deleteTime: { $exists: false } }] },
    { sort: ['order', 'createTime'] }
  ).then(lists => {
    return lists.map(item => item.toJSON())
  })
}
