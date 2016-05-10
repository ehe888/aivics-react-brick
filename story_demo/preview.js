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

    this.state = {
      pageId: this.props.pageId || ''
    }
  }

  componentDidUpdate() {

  }

  showStory() {
    this.props.showStory();
    var pageId = DataStorage.model("Pages").find()[0].id;
    this.setState({
      'pageId': pageId
    })
  }

  onBrickSelect(e, id, position) {
    var toPageId = "";
    var transitions = DataStorage.model("Transitions").find();
    transitions.map(function(transition){
      if (transition.fromPageId == id) {
        toPageId = transition.toPageId;
        return;
      }
    })
    if (toPageId.length > 0) {
      this.setState({
        pageId: toPageId
      })
    }

  }

  render() {

    var homePage;
    var model = DataStorage.model("Pages");

    if (this.state.pageId.length <= 0) {
      homePage = model.find()[0];
    }else {
      homePage = model.find({id: this.state.pageId});
    }

    return (
      <div className="preview-content">
        <div ref="header" className="header">
          <div className="btn-group preview" role="group">
            <button type="button"
                    className="btn btn-default"
                    onClick={(event)=>this.showStory(event)}>BACK</button>
          </div>
        </div>
        <div ref="content" className="preview">
          <Page id={homePage.id} key={homePage.id}
            dataStorage={DataStorage}
            preview= {true}
            onBrickSelect={(e, id, position)=>this.onBrickSelect(e, id, position)}
          />
        </div>
      </div>
    )
  }

}
module.exports = Preview;
