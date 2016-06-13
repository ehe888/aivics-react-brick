'use strick'

import BaseCollection from './Base.js'
import BrickModel from '../models/Bricks'

class BrickCollections extends BaseCollection {

  constructor(props) {
    super(props)

    this.model = BrickModel
  }

}

module.exports = BrickCollections;
