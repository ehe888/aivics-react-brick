"use strict"

/**
 * Demo entry
 */
import uuid from 'uuid'
import React from "react"
import Bricks from '../src'
import PageSettingPanel from '../settings/pageTools/src'
import PageTransitionSettings from '../settings/pageTransitionSettings/src'
import PageContextMenu from '../settings/contextMenu/src'

$.Bricks = Bricks;

let BrickMask = Bricks.Mask;
let Brick = Bricks.Base;
let LabelBrick = Bricks.Label;
let Page = Bricks.Page;
let BrickSetting = Bricks.settings.Base;
let Transition = Bricks.Transition;

import DataStorage from './DataStorage'

class Preview extends React.Component {

  constructor(props){
    super(props)
  }

  render() {
    return (
      <div className="preview-content">
        <div ref="header" className="header">
        <div className="btn-group preview" role="group">
          <button type="button"
                  className="btn btn-default"
                  onClick={this.props.showStory}>BACK</button>
        </div>
        </div>
      </div>
    )
  }

}
module.exports = Preview;
