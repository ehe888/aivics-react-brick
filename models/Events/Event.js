"use strict"

import Backbone from 'backbone'
import uuid from 'uuid'
import BaseModel from './index.js'


class EventModel extends BaseModel{

  constructor(props) {
    super(props)

    var defaults = {
        "id": props.id || uuid.v4(),
        "transitionId": props.transitionId,
        "targetId": props.targetId
    }
    var allKeys = Object.keys(defaults)
    for (let key of allKeys) {
      this.set(key, defaults[key])
    }
  }
}



module.exports = EventModel;
