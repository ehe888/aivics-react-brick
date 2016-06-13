'use strick'

import BaseCollection from './Base.js'
import TransitionModel from '../models/Transitions'

class TransitionCollections extends BaseCollection {

  constructor(props) {
    super(props)

    this.model = TransitionModel
  }

}

module.exports = TransitionCollections;
