"use strict"

import Backbone from 'backbone'
import uuid from 'uuid'
import BaseModel from './index.js'


class TransitionModel extends BaseModel{

  constructor(props) {
    super(props)

    var defaults = {
        "id": uuid.v4(),
        name: "Transition",
        brickType: "Transition",
        "zIndex": 1,
        "fromPageId": props.fromPageId,
        "toPageId": props.toPageId,
        "remark": props.remark,
        "fromPageTransition": "fadeOut",
        "toPageTransition": "fadeIn",
        "background": "black"
    }
    var allKeys = Object.keys(defaults)
    for (let key of allKeys) {
      this.set(key, defaults[key])
    }
  }
}



module.exports = TransitionModel;
