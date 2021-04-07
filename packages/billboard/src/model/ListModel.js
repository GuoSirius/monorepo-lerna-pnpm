import CamoModel from './CamoModel'

export default class ListModel extends CamoModel {
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
      name: {
        type: String,
        required: true
      },
      order: {
        type: Number,
        default: 0
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
