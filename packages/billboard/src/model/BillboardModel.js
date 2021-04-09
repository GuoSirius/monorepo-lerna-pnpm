import CamoModel from './CamoModel'

export default class BillboardModel extends CamoModel {
  constructor() {
    super()

    this.scheme()
  }

  static collectionName() {
    return 'billboard'
  }

  scheme() {
    super.schema({
      name: {
        type: String,
        unique: true,
        required: true
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
