'use strick'

import BaseCollection from './Base.js'
import EventModel from '../models/Events'

class EventCollections extends BaseCollection {

  constructor(props) {
    super(props)

    this.model = EventModel
  }

}

module.exports = EventCollections;
