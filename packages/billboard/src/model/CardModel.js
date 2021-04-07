import CamoModel from './CamoModel'

export default class CardModel extends CamoModel {
  constructor() {
    super()

    this.scheme()
  }

  scheme() {
    super.schema({
      billboardId: {
        type: String,
        required: true
      },
      listId: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      description: {
        type: String
      },
      maturityTime: {
        type: Date
      },
      order: {
        type: Number,
        default: 0
      },
      isCompleted: {
        type: Boolean,
        default: false
      },
      createTime: {
        type: Date,
        default: Date.now
      },
      updateTime: {
        type: Date,
        default: Date.now
      },
      deleteTime: {
        type: Date,
        default: null
      }
    })
  }
}
