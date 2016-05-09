"use strict"

/**
 * Demo entry
 */
import uuid from 'uuid'
import React from "react"
import Bricks from '../src'
import PageSettingPanel from '../settings/pageTools/src'
import PageTransitionSettings from '../settings/pageTransitionSettings/src'

$.Bricks = Bricks;

let BrickMask = Bricks.Mask;
let Brick = Bricks.Base;
let LabelBrick = Bricks.Label;
let Page = Bricks.Page;
let BrickSetting = Bricks.settings.Base;
let Transition = Bricks.Transition;

import DataStorage from './DataStorage'

//defin BrickType and ModelType name
const _pageBrickType = 'Page';
const _pageModelType = 'Pages';
const _pageReferenceBrickType = 'PageReference';
const _pageReferenceModelType = 'Pages';
const _transitionBrickType = 'Transition';
const _transitionModelType = 'Transitions';

var data = DataStorage.model('Pages').upsert({
    name: "a brick",
    brickType: "Page",
    offset: {
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
    settings: ["pageTitle", "imageUrl", "pageReference"],
    bricks: []
});

var data2 = DataStorage.model('Pages').upsert({
    name: "a brick",
    brickType: "Page",
    offset: {
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
    settings: ["pageTitle", "imageUrl", "pageReference"]
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
    this.onPageAddReference = this.onPageAddReference.bind(this);

    this.state = {
        activeBrickId: data.id,
        activeBrickPosition: data.offset,
        activeBrickType: data.brickType,
        settingChangeName: null,
        settingChangeValue: null,
        storyScale: 1.0
    }
  }

  onBrickSelect(e, brickId, position) {
    console.log("on brick selected");
    var activeBrick = DataStorage.model(this.mapBrickTypeToModelType(this.state.activeBrickType))
                      .find({id: brickId});

    this.setState({
      activeBrickId: brickId,
      activeBrickPosition: position,
      settingChangeName: null,
      settingChangeValue: null,
      activeBrickType: activeBrick.brickType
    });

  }

  onBrickSettingChange(brickId, fieldName, changeToValue) {
    var record = DataStorage.model("Pages").find({ id: brickId });

    console.log({ fieldName: fieldName, changeToValue: changeToValue });
    let position = this.state.activeBrickPosition,
        brickType = this.state.activeBrickType;

    this.setState({
      activeBrickId: brickId,
      settingChangeName: fieldName,
      settingChangeValue: changeToValue,
      activeBrickPosition: position,
      activeBrickType: brickType
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

    //Page cannot change width & height
    if (this.state.activeBrickType == "Page") {
      position.width = record.offset.width;
      position.height = record.offset.height;
    }

    //delte parents' offset
    var ids = activeBrickId.split("/");
    if (ids.length > 1) {
      ids.map(function(id, i){
        if (i == ids.length-1) {
          return;
        }
        var parent = DataStorage.model("Pages").find({ id: id });
        var offset = parent.offset;
        position.top -= offset.top;
        position.left -= offset.left;
      })
    }

    _.merge(record, { offset: position });

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
        offset: {
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
        settings: ["pageTitle", "imageUrl", "pageReference"]
    })
    this.setState({
      activeBrickId: newPage.id,
      activeBrickPosition: newPage.offset,
      activeBrickType: newPage.brickType,
      settingChangeName: null,
      settingChangeValue: null
    });
  }

  onPageDelete(){
    var activeBrickId = this.state.activeBrickId

    var model = DataStorage.model('Pages'),
        pages = model.find();

    if (pages.length > 1) {
      model.delete({id: activeBrickId});

      //also delete related transitions
      var transitions = DataStorage.model('Transitions').find();
      if (transitions) {
        transitions.map(function(transition){
          if (transition.fromPageId == activeBrickId || transition.toPageId == activeBrickId) {
            DataStorage.model('Transitions').delete({id: transition.id})
          }
        })
      }
      pages = model.find();

      var lastPage = _.last(pages)
      this.setState({
        activeBrickId: lastPage.id,
        activeBrickPosition: lastPage.offset,
        activeBrickType: lastPage.brickType,
        settingChangeName: null,
        settingChangeValue: null
      });

    }
  }

  onPageScaleLarge() {
    if (this.state.storyScale < 2) {
      this.state.storyScale += 0.2;
      var width = 200 * this.state.storyScale;
      $(".story").css({
        'transform': 'scale('+this.state.storyScale+')',
        'transform-origin': '0 0'
      })
    }
  }

  onPageScaleSmall() {
    if (this.state.storyScale > 0.4) {
      this.state.storyScale -= 0.2;
      var width = 200 * this.state.storyScale;
      $(".story").css({
        'transform': 'scale('+this.state.storyScale+')',
        'transform-origin': '0 0'
      })
    }
  }

  onNewTransitionSubmit(fromPageId, toPageId, remark) {
    var transitions = DataStorage.model('Transitions').find();
    var hasTransition = false;
    if (transitions) {
      //ignore submit if transition exits
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
        "fromPageId": fromPageId,
        "toPageId": toPageId,
        "remark": remark
    })
    this.setState(this.state)
  }

  onTransitionDeleteClick(transitionId) {
    DataStorage.model('Transitions').delete({id: transitionId});
    this.setState(this.state)
  }

  onPageAddReference() {
    console.log("onPageAddReference")
    if (this.state.activeBrickType == "Page") {
      var page = DataStorage.model("Pages").find({id: this.state.activeBrickId});
      if (!page.bricks) {
        page.bricks = [];
      }

      var newReference = {
        id: uuid.v4(),
        name: "reference",
        brickType: "PageReference",
        offset: {
          top: 50,
          left: 120,
          width: 200,
          height: 50
        },
        "zIndex": 100,
        "backgroundColor": "#FFFFFF",
        "backgroundOpacity": 1,
        "title": "reference",
        "settings": ["pageTitle"]
      };
      page.bricks.push(newReference)
      console.info("newReference: " + newReference.id);
      this.setState({
        activeBrickId: page.id+"/"+newReference.id,
        activeBrickPosition: newReference.offset,
        activeBrickType: newReference.brickType,
        settingChangeName: null,
        settingChangeValue: null
      });

    }
  }


  mapBrickTypeToModelType(brickType){
    switch (brickType) {
      case 'Page':
        return 'Pages';break;
      case 'PageReference':
        return 'Pages';break;
      case 'Transition':
        return 'Transitions';break;
      default:
        return 'Bricks';
    }
  }




  render() {

    var self = this;
    let brickPosition = {
      top: this.state.activeBrickPosition.top,
      left: this.state.activeBrickPosition.left,
      width: this.state.activeBrickPosition.width,
      height: this.state.activeBrickPosition.height
    };
    var ids = this.state.activeBrickId.split("/");
    if (ids.length > 1) {
      ids.map(function(id, i){
        if (i == ids.length -1) {
          return;
        }
        var component = DataStorage.model("Pages").find({id: id});
        var position = component.offset;
        brickPosition.top += position.top;
        brickPosition.left += position.left;
      })
    }

    var components = DataStorage.model("Pages").find();

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
            remark={transition.remark}
          />
        )
      });
    }
    var brickType = this.mapBrickTypeToModelType(this.state.activeBrickType);
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
              activeBrickPosition={brickPosition}
              storyScale = {this.state.storyScale}
              dataStorage = {DataStorage}
              brickType = {brickType}
              onBrickResize={this.onBrickResize} />
          {transition}
        </div>
        <BrickSetting
            activeBrickId={this.state.activeBrickId}
            dataStorage={DataStorage}
            brickType={brickType}
            onPageAddReference={this.onPageAddReference}
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
