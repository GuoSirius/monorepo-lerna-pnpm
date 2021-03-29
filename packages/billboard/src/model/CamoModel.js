import kebabCase from 'lodash/kebabCase'

import { Document } from 'camo'

export default class CamoModel extends Document {
  static collectionName() {
    const collectionName = this.name.slice(0, -5)

    return kebabCase(collectionName)
  }
}
