"use strict"

/**
 * Demo entry
 */
import uuid from 'uuid'
import React from "react"
import Bricks from '../src'
import PageSettingPanel from '../settings/pageTools/src'
import PageTransitionSettings from '../settings/pageTransitionSettings/src'
import PageSettings from '../settings/pageSettings/src'

$.Bricks = Bricks;

let BrickMask = Bricks.Mask;
let Brick = Bricks.Base;
let LabelBrick = Bricks.Label;
let Page = Bricks.Page;
let BrickSetting = Bricks.settings.Base;
let Transition = Bricks.Transition;

import DataStorage from './DataStorage'

//window.DataStorage = DataStorage;

var data = DataStorage.model('Pages').upsert({
    name: "a brick",
    brickType: "Page",
    dimension: {
      top: 10,
      left: 100,
      width: 375,
      height: 667
    },
    "zIndex": 100,
    "backgroundColor": "#d3f9dd",
    "backgroundOpacity": 1,
    classNames: [ 'aClass', 'bClass' ],
    title: "new page 0",
    settings: ["pageTitle", "imageUrl"]
});

var data2 = DataStorage.model('Pages').upsert({
    name: "a brick",
    brickType: "Page",
    dimension: {
      top: 50,
      left: 800,
      width: 375,
      height: 667
    },
    "zIndex": 100,
    "backgroundColor": "#d3f9dd",
    "backgroundOpacity": 1,
    classNames: [ 'aClass', 'bClass' ],
    title: "new page 1",
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

    this.onNewTransitionSubmit = this.onNewTransitionSubmit.bind(this);
    this.onTransitionDeleteClick = this.onTransitionDeleteClick.bind(this);
    this.onPageScaleSmall = this.onPageScaleSmall.bind(this);
    this.onPageScaleLarge = this.onPageScaleLarge.bind(this);

    this.state = {
        activeBrickId: data.id,
        activeBrickPosition: data.dimension,
        settingChangeName: null,
        settingChangeValue: null
    };

    this.storyScale = 1.0;
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
    var record = DataStorage.model("Pages").find({ id: brickId });

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

    var record = DataStorage.model("Pages").find({ id: activeBrickId });
    if(!record){
      return;
    }
    position.width = record.dimension.width;
    position.height = record.dimension.height;

    _.merge(record, { dimension: position });

    this.setState({
      activeBrickId: activeBrickId,
      activeBrickPosition: position,
      settingChangeName: null,
      settingChangeValue: null
    });
  }

  onPageAdd(){
    var currentPages = DataStorage.model('Pages').find();
    var title = "new page " + currentPages.length;
    var newPage = DataStorage.model('Pages').upsert({
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
        "title": title,
        classNames: [ 'aClass', 'bClass' ],
        settings: ["pageTitle", "imageUrl"]
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

    var model = DataStorage.model('Pages'),
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

  onPageScaleLarge() {
    if (this.storyScale < 2) {
      this.storyScale += 0.2;
      var width = 200 * this.storyScale;
      $(".story").css({
        'transform': 'scale('+this.storyScale+')',
        'transform-origin': '0 0'
      })
      var state = this.state;
      this.setState(state)
    }
  }

  onPageScaleSmall() {
    if (this.storyScale > 0.4) {
      this.storyScale -= 0.2;
      var width = 200 * this.storyScale;
      $(".story").css({
        'transform': 'scale('+this.storyScale+')',
        'transform-origin': '0 0'
      })
      var state = this.state;
      this.setState(state)
    }
  }

  onPageSettingsClick() {
    $(".aivics-page-transition-panel").hide();
    $(".aivics-brick-setting-panel").show();
  }

  onPageTransitionClick() {
    $(".aivics-page-transition-panel").show();
    $(".aivics-brick-setting-panel").hide();
  }

  onNewTransitionSubmit(fromPageId, toPageId) {
    var transitions = DataStorage.model('Transitions').find();
    var hasTransition = false;
    if (transitions) {
      transitions.map(function(transition){
        if (transition.fromPageId == fromPageId && transition.toPageId == toPageId) {
          hasTransition = true;
          return
        }
      })
    }
    if (hasTransition) {
      return;
    }
    var newTransition = DataStorage.model('Transitions').upsert({
        name: "Transition",
        brickType: "Transition",
        "zIndex": 1,
        "backgroundColor": "#000000",
        "backgroundOpacity": 1,
        "fromPageId": fromPageId,
        "toPageId": toPageId
    })
    this.setState(this.state)
  }

  onTransitionDeleteClick(transitionId) {
    DataStorage.model('Transitions').delete({id: transitionId});
    this.setState(this.state)
  }

  render() {
    var activeBrickPosition = this.state.activeBrickPosition;

    var components = DataStorage.model("Pages").find();

    var self = this;
    var contents = components.map(function(comp){
      var DynaBrick = Bricks[comp.brickType];


      return (
        <DynaBrick id={comp.id} key={comp.id}
          dataStorage={DataStorage}
          onBrickSelect={self.onBrickSelect} />
      )
    });

    var transitionModels = DataStorage.model("Transitions").find();
    var transition = "";
    if (transitionModels) {
      transition = transitionModels.map(function(transition){
        console.log(transition)
        return (
          <Transition
            id={transition.id}
            key={transition.id}
            dataStorage={DataStorage}
            fromPageId={transition.fromPageId}
            toPageId={transition.toPageId}
          />
        )
      });
    }

    return (
      <div>
        <div ref="header" className="header">
          <PageSettingPanel
            onPageAdd = {this.onPageAdd}
            onPageDelete = {this.onPageDelete}
            onPageSettingsClick = {this.onPageSettingsClick}
            onPageTransitionClick = {this.onPageTransitionClick}
            onPageScaleLarge = {this.onPageScaleLarge}
            onPageScaleSmall = {this.onPageScaleSmall}
            dataStorage={DataStorage}
          />
        </div>
        <div ref="story" className="story">
          {contents}
          <BrickMask activeBrickId={this.state.activeBrickId}
              activeBrickPosition={activeBrickPosition}
              storyScale = {this.storyScale}
              onBrickResize={this.onBrickResize} />
          {transition}
        </div>
        <PageSettings
            activeBrickId={this.state.activeBrickId}
            dataStorage={DataStorage}
            settingChangeName={this.state.settingChangeName}
            settingChangeValue={this.state.settingChangeValue}
            onBrickSettingChange={this.onBrickSettingChange} />
        <PageTransitionSettings
          activeBrickId={this.state.activeBrickId}
          dataStorage={DataStorage}
          onTransitionDeleteClick = {this.onTransitionDeleteClick}
          onNewTransitionSubmit={this.onNewTransitionSubmit}
        />
      </div>

    )
  }
}

ReactDOM.render(<Story />,
    document.getElementById('workspace')
);
