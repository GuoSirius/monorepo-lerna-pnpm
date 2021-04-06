import CamoModel from './CamoModel'

export default class ListModel extends CamoModel {
  constructor() {
    super()

    this.scheme()
  }

  scheme() {
    super.schema({
      name: {
        type: String,
        unique: true,
        required: true
      }
    })
  }
}