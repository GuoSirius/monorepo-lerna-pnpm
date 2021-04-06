import CardModel from './CardModel'

// 新增 看板
export async function addCard(name) {
  await CardModel.connect()

  const card = CardModel.create({ name })

  return card.save()
}

// 编辑 看板
export async function editCard({ id, name, maturityTime, description }) {
  await CardModel.connect()

  return CardModel.findOneAndUpdate({ _id: id }, { name, maturityTime, description, updateTime: new Date() })
}

// 删除 看板
export async function deleteCard(id, isHardDelete = false) {
  await CardModel.connect()

  return isHardDelete
    ? CardModel.deleteOne({ _id: id })
    : CardModel.findOneAndUpdate({ _id: id }, { deleteTime: new Date() })
}

// 获取 看板列表
export async function getCardLists() {
  await CardModel.connect()

  return CardModel.find(
    { $or: [{ deleteTime: null }, { deleteTime: { $exists: false } }] },
    { sort: ['-createTime'] }
  ).then(lists => {
    return lists.map(item => item.toJSON())
  })
}
