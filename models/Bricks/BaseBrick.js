"use strick"

import Backbone from 'backbone'
import uuid from 'uuid'
import BaseModel from './index.js'


class BaseBrickModel extends BaseModel{

  constructor(props) {
    props = props || {
      offset: {
        top: 80,
        left: 500,
        width: 200,
        height: 50
      }
    }
    super(props)

    var defaults = {
        id: props.id || uuid.v4(),
        name: "a brick",
        brickType: props.brickType || "Base",
        offset: props.offset,
        "zIndex": 100,
        "backgroundColor": "#ffffff",
        "backgroundOpacity": 1,
        classNames: [ 'aClass', 'bClass' ],
        title: props.title || "new brick",
        settings: props.settings || [],
        "engineeringTree": [],
        "referenceTree": [],
        "animation": {
          name: "",
          duration: "",
          delay: ""
        }
    }
    var allKeys = Object.keys(defaults)
    for (let key of allKeys) {
      this.set(key, defaults[key])
    }
  }
}

module.exports = BaseBrickModel;
