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
    this.jqueryMap = {
      $brickSetting: $(ReactDOM.findDOMNode(this.refs.BrickSetting)),
      $pageTransitionSettings: $(ReactDOM.findDOMNode(this.refs.PageTransitionSettings)),
      $lineTransitionSettings: $(ReactDOM.findDOMNode(this.refs.LineTransitionSettings)),
      $eventSettings: $(ReactDOM.findDOMNode(this.refs.EventSettings))
    }
  }

  onPageSettingsClick() {
    console.log(this.jqueryMap);
    this.jqueryMap.$brickSetting.show();
    this.jqueryMap.$pageTransitionSettings.hide();
    this.jqueryMap.$lineTransitionSettings.hide();
    this.jqueryMap.$eventSettings.hide();
  }

  onPageTransitionClick() {
    this.jqueryMap.$brickSetting.hide();
    this.jqueryMap.$pageTransitionSettings.show();
    this.jqueryMap.$lineTransitionSettings.hide();
    this.jqueryMap.$eventSettings.hide();
  }

  onEventClick() {
    this.jqueryMap.$brickSetting.hide();
    this.jqueryMap.$pageTransitionSettings.hide();
    this.jqueryMap.$lineTransitionSettings.hide();
    this.jqueryMap.$eventSettings.show();
  }

  render() {
    return (
      <div className="Settings">
        <div className="btn-group settings-tab" role="group" aria-label="...">
          <button type="button"
                  className="btn btn-default"
                  onClick={(event)=>this.onPageSettingsClick()}>P</button>
          <button type="button"
                  className="btn btn-default"
                  onClick={(event)=>this.onPageTransitionClick()}>T</button>
          <button type="button"
                  className="btn btn-default"
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
