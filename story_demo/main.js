"use strict"

/**
 * Demo entry
 */
import uuid from 'uuid'
import React from "react"
import Bricks from '../src'
import PageSettingPanel from '../settings/pageTools/src'

$.Bricks = Bricks;

let BrickMask = Bricks.Mask;
let Brick = Bricks.Base;
let LabelBrick = Bricks.Label;
let Page = Bricks.Page;
let BrickSetting = Bricks.settings.Base;

import DataStorage from './DataStorage'

//window.DataStorage = DataStorage;

var data = DataStorage.model('Bricks').upsert({
    name: "a brick",
    brickType: "Page",
    dimension: {
      top: 10,
      left: 400,
      width: 375,
      height: 667
    },
    "zIndex": 100,
    "backgroundColor": "#d3f9dd",
    "backgroundOpacity": 1,
    classNames: [ 'aClass', 'bClass' ],
    title: "new page",
    settings: ["pageTitle", "imageUrl"]
});


class Story extends React.Component {
  constructor(props) {
    super(props);
    this.onBrickSelect = this.onBrickSelect.bind(this);
    this.onBrickResize = this.onBrickResize.bind(this);
    this.onBrickSettingChange = this.onBrickSettingChange.bind(this);
    this.onPageAdd = this.onPageAdd.bind(this);
    this.onPageDelete = this.onPageDelete.bind(this);
    this.onPageSettingsClick = this.onPageSettingsClick.bind(this);
    this.onPageTransitionClick = this.onPageTransitionClick.bind(this);

    this.state = {
        activeBrickId: data.id,
        activeBrickPosition: data.dimension,
        settingChangeName: null,
        settingChangeValue: null
    };
  }

  onBrickSelect(e, brickId, position) {
    console.log("on brick selected");
    this.setState({
      activeBrickId: brickId,
      activeBrickPosition: position,
      settingChangeName: null,
      settingChangeValue: null
    });
  }

  onBrickSettingChange(brickId, fieldName, changeToValue) {
    var record = DataStorage.model("Bricks").find({ id: brickId });

    console.log({ fieldName: fieldName, changeToValue: changeToValue });
    this.setState({
      activeBrickId: brickId,
      settingChangeName: fieldName,
      settingChangeValue: changeToValue,
      activeBrickPosition: record.dimension
    });
  }

  onBrickResize(activeBrickId, position) {
    var editorLeft = $(this.refs.story).position().left;
    var editorTop = $(this.refs.story).position().top;
    var editorWidth = $(this.refs.story).width();
    var editorHeight = $(this.refs.story).height();

    //Constrain the component inside the container
    if(position.left < 0){
      position.left = 0;
    }
    if(position.top < 0){
      position.top = 0;
    }

    if( position.left + position.width > editorWidth ){
      position.left = editorWidth - position.width;
    }

    if(position.top + position.height > editorHeight){
      position.top = editorHeight - position.height;
    }

    if(position.left >= editorWidth ){
      position.left = 0;
      //position.width = 1;
    }

    if(position.top >= editorHeight){
      position.top = 0;
      //position.height = 1;
    }

    var record = DataStorage.model("Bricks").find({ id: activeBrickId });
    if(!record){
      return;
    }

    _.merge(record, { dimension: position });

    this.setState({
      activeBrickId: activeBrickId,
      activeBrickPosition: position,
      settingChangeName: null,
      settingChangeValue: null
    });
  }

  onPageAdd(){
    var newPage = DataStorage.model('Bricks').upsert({
        name: "a brick",
        brickType: "Page",
        dimension: {
          top: 10,
          left: 400,
          width: 375,
          height: 667
        },
        "zIndex": 100,
        "backgroundColor": "#d3f9dd",
        "backgroundOpacity": 1,
        classNames: [ 'aClass', 'bClass' ],
        settings: ["pageTitle", "imageBtn"]
    })
    this.setState({
      activeBrickId: newPage.id,
      activeBrickPosition: newPage.dimension,
      settingChangeName: null,
      settingChangeValue: null
    });
  }

  onPageDelete(){
    var activeBrickId = this.state.activeBrickId
    console.log(activeBrickId);

    var model = DataStorage.model('Bricks'),
        pages = model.find();

    if (pages.length > 1) {
      model.delete({id: activeBrickId});
      pages = model.find();

      var lastPage = _.last(pages)
      this.setState({
        activeBrickId: lastPage.id,
        activeBrickPosition: lastPage.dimension,
        settingChangeName: null,
        settingChangeValue: null
      });

    }
  }

  onPageSettingsClick() {
    console.log("onPageSettingsClick")
  }

  onPageTransitionClick() {
    console.log("onPageTransitionClick")
  }

  render() {
    var activeBrickPosition = this.state.activeBrickPosition;

    var components = DataStorage.model("Bricks").find();

    console.log("render of editor");

    var self = this;
    var contents = components.map(function(comp){
      var DynaBrick = Bricks[comp.brickType];
      //console.log(brick);

      return (
        <DynaBrick id={comp.id} key={comp.id}
          dataStorage={DataStorage}
          onBrickSelect={self.onBrickSelect} />
      )
    });

    return (
      <div>
        <div ref="header" className="header">
          <PageSettingPanel
            onPageAdd = {this.onPageAdd}
            onPageDelete = {this.onPageDelete}
            onPageSettingsClick = {this.onPageSettingsClick}
            onPageTransitionClick = {this.onPageTransitionClick}
            dataStorage={DataStorage}
          />
        </div>
        <div ref="story" className="story">
          {contents}
          <BrickMask activeBrickId={this.state.activeBrickId}
              activeBrickPosition={activeBrickPosition}
              onBrickResize={this.onBrickResize} />
        </div>
        <BrickSetting
            activeBrickId={this.state.activeBrickId}
            dataStorage={DataStorage}
            settingChangeName={this.state.settingChangeName}
            settingChangeValue={this.state.settingChangeValue}
            onBrickSettingChange={this.onBrickSettingChange} />
      </div>
    )
  }
}

ReactDOM.render(<Story />,
    document.getElementById('workspace')
);
