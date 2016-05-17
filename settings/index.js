/**
 * settings/index.js
 */

"use strict"

require("./style.css")

import ReactDOM from "react-dom"
import Bricks from '../src'
import PageSettingPanel from './pageTools/src'
import PageTransitionSettings from './pageTransitionSettings/src'
import PageContextMenu from './contextMenu/src'
import TransitionSettings from './transitionSettings/src'
import GalleryMenu from './gallery/src'
import EventSettings from './eventSettings/src'

$.Bricks = Bricks;
let BrickSetting = Bricks.settings.Base;


class Settings extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    var self = this;
    this.jqueryMap = {
      $brickSetting: $(ReactDOM.findDOMNode(this.refs.BrickSetting)),
      $pageTransitionSettings: $(ReactDOM.findDOMNode(this.refs.PageTransitionSettings)),
      $lineTransitionSettings: $(ReactDOM.findDOMNode(this.refs.LineTransitionSettings)),
      $eventSettings: $(ReactDOM.findDOMNode(this.refs.EventSettings)),
      $brickSettingBtn: $(ReactDOM.findDOMNode(this.refs.brickSettingBtn)),
      $pageTransitionBtn: $(ReactDOM.findDOMNode(this.refs.pageTransitionBtn)),
      $eventBtn: $(ReactDOM.findDOMNode(this.refs.eventBtn))
    }

    this.activeSettingMenu = this.jqueryMap.$brickSetting

  }

  componentDidUpdate() {
    var activeBrickId = this.props.activeBrickId,
        transitionId = this.props.activeTransitionId;

    if (transitionId) {
      //transition
      this.onLineTransitionClick();

    }else {
      this.jqueryMap.$brickSetting.hide();
      this.jqueryMap.$pageTransitionSettings.hide();
      this.jqueryMap.$lineTransitionSettings.hide();
      this.jqueryMap.$eventSettings.hide();
      this.activeSettingMenu.show();
    }

  }

  onPageSettingsClick() {
    this.jqueryMap.$brickSetting.show();
    this.jqueryMap.$pageTransitionSettings.hide();
    this.jqueryMap.$lineTransitionSettings.hide();
    this.jqueryMap.$eventSettings.hide();
    this.activeSettingMenu = this.jqueryMap.$brickSetting

  }

  onPageTransitionClick() {
    this.jqueryMap.$brickSetting.hide();
    this.jqueryMap.$pageTransitionSettings.show();
    this.jqueryMap.$lineTransitionSettings.hide();
    this.jqueryMap.$eventSettings.hide();
    this.activeSettingMenu = this.jqueryMap.$pageTransitionSettings;
  }

  onLineTransitionClick() {
    this.jqueryMap.$brickSetting.hide();
    this.jqueryMap.$pageTransitionSettings.hide();
    this.jqueryMap.$lineTransitionSettings.show();
    this.jqueryMap.$eventSettings.hide();
  }

  onEventClick() {
    this.jqueryMap.$brickSetting.hide();
    this.jqueryMap.$pageTransitionSettings.hide();
    this.jqueryMap.$lineTransitionSettings.hide();
    this.jqueryMap.$eventSettings.show();
    this.activeSettingMenu = this.jqueryMap.$eventSettings

  }

  render() {
    return (
      <div className="Settings">
        <div className="btn-group settings-tab" role="group" aria-label="...">
          <button type="button"
                  className="btn btn-default"
                  ref = "brickSettingBtn"
                  onClick={(event)=>this.onPageSettingsClick()}>P</button>
          <button type="button"
                  className="btn btn-default"
                  ref = "pageTransitionBtn"
                  onClick={(event)=>this.onPageTransitionClick()}>T</button>
          <button type="button"
                  className="btn btn-default"
                  ref = "eventBtn"
                  onClick={(event)=>this.onEventClick()}>E</button>
        </div>
        <BrickSetting
            ref = "BrickSetting"
            activeBrickId={this.props.activeBrickId}
            dataStorage={this.props.dataStorage}
            brickType={this.props.brickType}
            onPageAddReference={this.props.onPageAddReference}
            settingChangeName={this.props.settingChangeName}
            settingChangeValue={this.props.settingChangeValue}
            treeName = {this.props.treeName}
            onBrickSettingChange={this.props.onBrickSettingChange} />
        <PageTransitionSettings
          ref = "PageTransitionSettings"
          activeBrickId={this.props.activeBrickId}
          dataStorage={this.props.dataStorage}
          onTransitionDeleteClick = {this.props.onTransitionDeleteClick}
          onNewTransitionSubmit={this.props.onNewTransitionSubmit}
        />
        <TransitionSettings
          ref = "LineTransitionSettings"
          dataStorage={this.props.dataStorage}
          transitionId={this.props.activeTransitionId}
          onTransitionDeleteClick={this.props.onTransitionDeleteClick}
          onTransitionChanged={this.props.onTransitionChanged}
        />
        <EventSettings
          ref = "EventSettings"
          dataStorage={this.props.dataStorage}
          treeName = {this.props.treeName}
          activeBrickId = {this.props.activeBrickId}
        />
      </div>
    )
  }
}

module.exports = Settings
