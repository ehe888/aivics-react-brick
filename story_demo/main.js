"use strict"

/**
 * Demo entry
 */
import uuid from 'uuid'
import React from "react"
import ReactDOM from "react-dom"
import Bricks from '../src'
import SettingPanel from '../settings'
import PageSettingPanel from '../settings/pageTools/src'
import PageTransitionSettings from '../settings/pageTransitionSettings/src'
import PageContextMenu from '../settings/contextMenu/src'
import TransitionSettings from '../settings/transitionSettings/src'
import GalleryMenu from '../settings/gallery/src'
import Models from '../models'

import Collections from '../collections'

$.Bricks = Bricks;

let BrickMask = Bricks.Mask;
let Brick = Bricks.Base;
let LabelBrick = Bricks.Label;
let Page = Bricks.Page;
let BrickSetting = Bricks.settings.Base;
let Transition = Bricks.Transition;

import DataStorage from './DataStorage'


//--------------BEGIN CREATE TEST BRICKS---------------------
//
// var demoPage = new Models.PageModel();
// var data = demoPage.getValue()
// Collections.BrickCollections.add(demoPage)




//--------------END CREATE TEST BRICKS---------------------

class Story extends React.Component {
  constructor(props) {
    super(props);

    var self = this;

    this.onBrickSelect = this.onBrickSelect.bind(this);
    this.onBrickResize = this.onBrickResize.bind(this);
    this.onBrickSettingChange = this.onBrickSettingChange.bind(this);
    this.onPageAdd = this.onPageAdd.bind(this);
    this.onBrickAdd = this.onBrickAdd.bind(this);
    this.onPageDelete = this.onPageDelete.bind(this);

    this.onNewTransitionSubmit = this.onNewTransitionSubmit.bind(this);
    this.onTransitionDeleteClick = this.onTransitionDeleteClick.bind(this);
    this.onPageScaleSmall = this.onPageScaleSmall.bind(this);
    this.onPageScaleLarge = this.onPageScaleLarge.bind(this);
    this.onPageAddReference = this.onPageAddReference.bind(this);
    this.onPageContextMenu = this.onPageContextMenu.bind(this);
    this.onTransitionSelected = this.onTransitionSelected.bind(this);
    this.onTransitionChanged = this.onTransitionChanged.bind(this);

    this.onPreview = this.onPreview.bind(this);

    this.lastSettings = 0;
    this.inBricks = true;

    this.state = {
        activeBrickId: null,
        activeBrickPosition: {left: 0, top: 0},
        activeBrickType: null,
        settingChangeName: null,
        settingChangeValue: null,
        storyScale: 1.0,
        contextMenuPosition: {left: 0, top: 0},
        activeTransitionId: null
    }

    Collections.BrickCollections.load(function() {
      // self.setState(self.state)
      Collections.TransitionCollections.load(function() {
        Collections.EventCollections.load(function() {
          self.setState(self.state)
        })
      })
    });
  }

  //======================BEGIN STORY LIFE CYCLE METHOD=========================

  componentDidMount() {
    //define jquery object map
    this.jqueryMap = {
      $story : $(this.refs.story)
    }
  }

  //======================END STORY LIFE CYCLE METHOD===========================


  //===================BEGIN BRICK METHOD========================================


  //Begin brick add method /onBrickAdd/
  //Purpose: add new brick in selected brick
  //Arguments:
  //  * id: the id of brick which has been selected
  //  * top: the top value of new brick. default value is 50
  //  * left: the left value of new brick. default value is 120
  //  * width: the width value of new brick. default value is 200
  //  * height: the height value of new brick. default value is 50
  //  * brickType: the brickType of new brick. default is "Base"
  //  * settings: the special setting fileds of new brick. default is empty
  onBrickAdd(id = this.state.activeBrickId, top = 50, left = 120
        , width = 200, height = 50, brickType = "Base", settings=[]) {

      var page = Collections.BrickCollections.find({id: id}, this.props.treeName).getValue();
      if (!page.engineeringTree) {
        page.engineeringTree = [];
      }

      var brickModel = new Models.BaseBrickModel({
        brickType: brickType,
        offset: {
          top: top,
          left: left,
          width: width,
          height: height
        },
        "settings": settings
      });
      var newBrick = brickModel.getValue();
      page.engineeringTree.push(brickModel)
      this.setState({
        activeBrickId: id+"/"+newBrick.id,
        activeBrickPosition: newBrick.offset,
        activeBrickType: newBrick.brickType,
        settingChangeName: null,
        settingChangeValue: null,
        activeTransitionId: null
      });

  }
  //End brick add method /onBrickAdd/


  //Begin brick select method /onBrickSelect/
  //Purpose: click brick and show mask on it
  //Arguments:
  //  * e - jquery event object
  //  * brickId - the id of brick which has been clicked
  //  * position - offset of the brick
  onBrickSelect(e, brickId, position) {

    var activeBrick = Collections.BrickCollections.find({id: brickId}, this.props.treeName).getValue();
    this.setState({
      activeBrickId: brickId,
      activeBrickPosition: position,
      settingChangeName: null,
      settingChangeValue: null,
      activeBrickType: activeBrick.brickType,
      activeTransitionId: null
    });
  }
  //End brick select method /onBrickSelect/


  //Begin brick base setting change method /onBrickSettingChange/
  //Purpose: change brick style or offset when we input base settings
  //Arguments:
  //  * brickId - the id of brick which has been selected
  //  * fieldName - name of setting
  //  * changeToValue - value of setting
  onBrickSettingChange(brickId, fieldName, changeToValue) {
    var record = Collections.BrickCollections.find({ id: brickId }, this.props.treeName).getValue();

    let position = this.state.activeBrickPosition,
        brickType = this.state.activeBrickType;

    this.setState({
      activeBrickId: brickId,
      settingChangeName: fieldName,
      settingChangeValue: changeToValue,
      activeBrickPosition: position,
      activeBrickType: brickType,
      activeTransitionId: null
    })
  }
  //End brick base setting change method /onBrickSettingChange/


  //Begin brick resize by mask method /onBrickResize/
  //Purpose: change brick size or position.
  //         if brickType is not page, delete its parent's offset
  //         else if brickType is page, lock its size
  //Arguments:
  //   * activeBrickId - the id of brick which has been selected
  //   * position - the current offset of selected brick
  onBrickResize(activeBrickId, position) {
    var editorLeft = this.jqueryMap.$story.position().left;
    var editorTop = this.jqueryMap.$story.position().top;
    var editorWidth = this.jqueryMap.$story.width();
    var editorHeight = this.jqueryMap.$story.height();

    var self = this;
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

    var record = Collections.BrickCollections.find({ id: activeBrickId }, this.props.treeName).getValue();
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
    var lastBrickId = "";
    if (ids.length > 1) {
      ids.map(function(id, i){
        if (i == ids.length-1) {
          return;
        }
        var brickId = i==0?id: lastBrickId+"/"+id;
        lastBrickId = brickId;
        var parent = Collections.BrickCollections.find({ id: lastBrickId }, self.props.treeName).getValue();
        var offset = parent.offset;
        position.top -= offset.top;
        position.left -= offset.left;
      })
      position.top -= 64;
    }

    _.merge(record, { offset: position });

    this.setState({
      activeBrickId: activeBrickId,
      activeBrickPosition: position,
      settingChangeName: null,
      settingChangeValue: null,
      activeTransitionId: null
    });
  }
  //End brick resize by mask method /onBrickResize/

  //Begin brick animation method /onBrickAnimationChange/
  //Purpose: change animation of bricks.
  //Arguments:
  //  * brickId: the id of brick which has been selected
  //  * animation: animation object which the brick need to change
  //               animation object: {
  //                "name": animationName,
  //                "duration": animationDuration
  //                "delay": animationDelay
  //               }
  onBrickAnimationChange(brickId, animation) {
    var brick = Collections.BrickCollections.find({id: brickId}, this.props.treeName).getValue();
    brick.animation = animation;
  }
  //End brick animation method /onBrickAnimationChange/



  //Begin brick delete method /onBrickDelete/
  //Purpose: delete the actived brick and relatived events
  onBrickDelete() {
    var parents = this.state.activeBrickId.split("/");
    if (parents.length > 1) {
      var parentId = "",
          activeBrickId = parents[parents.length-1]
      for (var i = 0; i < parents.length; i++) {
        var id = parents[i];
        if (i == 0) {
          parentId = id;
        }else if (i < parents.length-1) {
          parentId = parentId + "/" + id
        }
      }

      var parent = Collections.BrickCollections.find({id: parentId}, this.props.treeName).getValue();
      var index = -1;
      if (parent) {

        _.remove(parent[this.props.treeName], function(brick){
          return brick.id == activeBrickId;
        })

        var events = Collections.EventCollections.find();
        if (events) {
          for (var i = 0; i < events.length; i++) {
            var event = events[i];
            if (event.targetId == activeBrickId) {
              Collections.EventCollections.delete({id: event.id})
            }
          }
        }
        this.setState({
          activeBrickId: parentId,
          activeBrickPosition: parent.offset,
          activeBrickType: parent.brickType,
          settingChangeName: null,
          settingChangeValue: null,
          activeTransitionId: null
        });
      }


    }
  }
  //End brick delete method /onBrickDelete/

  //===================END BRICK METHOD=========================================


  //===================BEGIN PAGE METHOD==========================================

  //Begin add new page method /onPageAdd/
  //Purpose: add new page
  //Arguments:
  //  * top - the top value of new page , default value is 10
  //  * left - the left value of new page, default value is 400
  onPageAdd(top = 10, left = 400){
    var currentPages = Collections.BrickCollections.find();
    var title = "new page " + currentPages.length;
    var newPageModel = new Models.PageModel({
      offset: {top: top, left: left, width: 375, height: 667},
      title: title,
      barMode: this.props.barMode
    });
    Collections.BrickCollections.add(newPageModel)
    var newPage = newPageModel.getValue();

    this.setState({
      activeBrickId: newPage.id,
      activeBrickPosition: newPage.offset,
      activeBrickType: newPage.brickType,
      settingChangeName: null,
      settingChangeValue: null,
      activeTransitionId: null
    })
  }
  //End add new page method /onPageAdd/


  //Begin delete the selected page method /onPageDelete/
  //Purpose: delete the selected page if count of pages over 2, relatived transitions and events.
  //          Then select the last page as active page
  //Arguments: none
  onPageDelete(){
    var activeBrickId = this.state.activeBrickId

    var model = Collections.BrickCollections,
        pages = model.find();

    if (pages.length > 1) {
      model.delete({id: activeBrickId});

      //also delete related transitions and events
      var transitions = Collections.TransitionCollections.find();
      if (transitions) {
        transitions.map(function(transition){
          if (transition.fromPageId == activeBrickId || transition.toPageId == activeBrickId) {
            Collections.TransitionCollections.delete({id: transition.id})
          }
        })
      }

      var events = Collections.EventCollections.find();
      if (events) {
        events.map(function(event){
          if (event.targetId == activeBrickId) {
            Collections.EventCollections.delete({id: event.id})
          }
        })
      }

      pages = model.find();
      var lastPage = _.last(pages).getValue()
      this.setState({
        activeBrickId: lastPage.id,
        activeBrickPosition: lastPage.offset,
        activeBrickType: lastPage.brickType,
        settingChangeName: null,
        settingChangeValue: null,
        activeTransitionId: null
      });
    }
  }
  //End delete the selected page method /onPageDelete/


  //Begin page context menu method /onPageContextMenu/
  //Purpose: show the context menu.
  //        this method is also used in brick context menu
  //Arguments:
  //  * brickId - the id of selected brick
  //  * position - the position of selected brick
  onPageContextMenu(brickId, position) {
    var record = Collections.BrickCollections.find({id: brickId}, this.props.treeName);
    record = record?record.getValue():null
    $(".pageContextMenu").show();

    var scroll = {
      left: this.jqueryMap.$story[0].scrollLeft,
      top: this.jqueryMap.$story[0].scrollTop
    }

    position.left += scroll.left;
    position.top += scroll.top - 40;

    position.left/= this.state.storyScale;
    position.top /= this.state.storyScale;

    this.setState({
        activeBrickId:brickId,
        activeBrickPosition: record?record.offset : this.state.activeBrickPosition,
        activeBrickType: record? record.brickType : this.state.activeBrickType,
        settingChangeName: null,
        settingChangeValue: null,
        storyScale: this.state.storyScale,
        activeTransitionId: null,
        contextMenuPosition: position
    })
  }
  //End page context menu method /onPageContextMenu/


  //Begin page scale method /onPageScaleLarge/
  //Purpose: page scale large.default scale value is 1. max value is 2
  onPageScaleLarge() {
    if (this.state.storyScale < 2) {
      this.state.storyScale += 0.2;
      var width = 200 * this.state.storyScale;
      this.jqueryMap.$story.css({
        'transform': 'scale('+this.state.storyScale+')',
        'transform-origin': '0 0'
      })
    }
  }
  //End page scale method /onPageScaleLarge/


  //Begin page scale method /onPageScaleLarge/
  //Purpose: page scale large.default scale value is 1. min value is 0.4
  onPageScaleSmall() {
    if (this.state.storyScale > 0.4) {
      this.state.storyScale -= 0.2;
      var width = 200 * this.state.storyScale;
      this.jqueryMap.$story.css({
        'transform': 'scale('+this.state.storyScale+')',
        'transform-origin': '0 0'
      })
    }
  }
  //End page scale method /onPageScaleLarge/


  //Begin add new page reference method /onPageAddReference/
  //Purpose: add new page reference in page when mode is reference mode
  //Arguments:
  //  * id - the id of selected page
  //  * top - the top value of reference, default is 50
  //  * left - the left value of reference, default is 120
  //  * width - the width value of reference, default is 200
  //  * height - the height value of reference, default is 50
  onPageAddReference(id = this.state.activeBrickId, top = 50, left = 120, width = 200, height = 50) {

    if (this.state.activeBrickType == "Page") {
      var page = Collections.BrickCollections.find({id: id}).getValue();
      if (!page.referenceTree) {
        page.referenceTree = [];
      }

      var newReference = {
        id: uuid.v4(),
        name: "reference",
        brickType: "PageReference",
        offset: {
          top: top,
          left: left,
          width: width,
          height: height
        },
        "zIndex": 100,
        "backgroundColor": "#FFFFFF",
        "backgroundOpacity": 1,
        "title": "reference",
        "settings": ["pageTitle"]
      };
      page.referenceTree.push(newReference)
      this.setState({
        activeBrickId: page.id+"/"+newReference.id,
        activeBrickPosition: newReference.offset,
        activeBrickType: newReference.brickType,
        settingChangeName: null,
        settingChangeValue: null
      });
      $(".transitionSettings").hide();
      $(".aivics-brick-setting-panel").show();
    }
  }
  //End add new page reference method /onPageAddReference/


  //Begin change page bar mode method /onPageBarModeChange/
  //Purpose: change page bar mode, navigation bar only or both navigation bar and tab bar
  //Arguments:
  //  * barMode - 0:navigationBar only, 1: Both navigation bar and tab bar
  onPageBarModeChange(barMode) {
    var pages = Collections.BrickCollections.find();
    pages.map(function(page){
      page.set("barMode", barMode);
    });
    this.props.onPageBarModeChange(barMode)
  }
  //End change page bar mode method /onPageBarModeChange/

  //===================END PAGE METHOD==========================================

  //===================BEGIN TRANSITION METHOD==================================

  //Begin add new transition method /onNewTransitionSubmit/
  //Purpose: add new transition from 2 page. ignore if transition exits
  //Arguments:
  //  * fromPageId: the id of page as source page
  //  * toPageId: the id of page as destination page
  //  * remark: the remark of transition
  onNewTransitionSubmit(fromPageId, toPageId ,remark) {
    var transitions = Collections.TransitionCollections.find();
    var hasTransition = false;
    if (transitions) {
      //ignore submit if transition exits
      transitions.map(function(transition){
        var transition = transition.getValue();
        if (transition.fromPageId == fromPageId && transition.toPageId == toPageId) {
          hasTransition = true;
          return
        }
      })
    }
    if (hasTransition) {
      return;
    }
    var transitionModel = new Models.TransitionModel({
      fromPageId: fromPageId,
      toPageId: toPageId,
      remark: remark
    });
    Collections.TransitionCollections.add(transitionModel)
    console.log(Collections.TransitionCollections)
    this.setState(this.state)
  }
  //End add new transition method /onNewTransitionSubmit/


  //Begin delete transition method /onTransitionDeleteClick/
  //Purpose: delete the selected transition and relatived events
  //Arguments:
  //  * transitionId: the id of transition which need to delete
  onTransitionDeleteClick(transitionId) {
    var events = Collections.EventCollections.find();
    for (var i = 0; i < events.length; i++) {
      var event = events[i].getValue();
      if (event.transitionId == transitionId) {
        Collections.EventCollections.delete({id: event.id})
      }
    }
    Collections.TransitionCollections.delete({id: transitionId});
    this.setState(this.state)
  }
  //End delete transition method /onTransitionDeleteClick/


  //Begin click transition method /onTransitionSelected/
  //Purpose: set the clicked transition as activeTransition, change its color to red
  //Arguments:
  //  * transitionId - the id of clicked transition
  onTransitionSelected(transitionId) {
    this.setState({
      activeTransitionId: transitionId
    });
  }
  //End click transition method /onTransitionSelected/


  //Begin transition settings change method /onTransitionChanged/
  //Purpose: change transition remark when input transition remark settings
  //Arguments:
  //  * transitionId - the id of selected transitionId
  //  * remark - remark of transition
  onTransitionChanged(transitionId, remark) {
    var transition = Collections.TransitionCollections.find({id: transitionId});
    if (transition) {
      transition.set("remark", remark)
      this.setState(this.state)
    }
  }
  //End transition settings change method /onTransitionChanged/

  //==================END TRANSITION METHOD====================================


  //===================BEGIN EVENT METHOD============================================
  //Begin event method /onEventAdd/
  //Purpose: success to add event into the active brick
  //Arguments:
  //  * transitionId
  //Returns: none
  onEventAdd(transitionId) {
    var activeBrickId = this.state.activeBrickId

    //ignore the same event
    var events = Collections.EventCollections.find();
    if (events && events.length > 1) {
      for (var i = 0; i<events.length; i++) {
        var event = events[i].getValue()
        if (event.targetId == activeBrickId && event.transitionId == transitionId) {
          return;
        }
      }
    }
    //insert the event
    var eventModel = new Models.EventModel({
      "transitionId": transitionId,
      "targetId": activeBrickId
    })
    Collections.EventCollections.add(eventModel)

    this.setState(this.state)

  }
  //End event method /onEventAdd/

  //====================END EVENT METHOD=======================================


  //======================BEGIN STORYBOARD METHOD===============================

  //Begin show preview method /onPreview/
  //Purpose: show preview when click preview button
  onPreview() {
    this.props.showPreview();
  }
  //End show preview method /onPreview/

  //Begin show contextMenu method /contextMenu/
  //Purpose: click empty storyboard
  //         , then show contextMenu with storyboard contextMenu items
  //Arguments:
  //  * event - jquery event object
  contextMenu(event) {
    event.preventDefault();
    event.stopPropagation();

    var position = {
      left: event.pageX,
      top: event.pageY
    }
    this.onPageContextMenu(null, position);

    return false;
  }
  //End show contextMenu method /contextMenu/

  //======================END STORYBOARD METHOD=================================

  //==========================BEGIN UTILITY METHOD==============================

  //==========================END UTILITY METHOD================================

  //===========================BEGIN RENDER METHOD==============================
  //Begin render method /render/
  //Purpose: render page tools bar, pages, mask, transitions, settings panels
  render() {

    var self = this;
    let brickPosition = {
      top: this.state.activeBrickPosition.top,
      left: this.state.activeBrickPosition.left,
      width: this.state.activeBrickPosition.width,
      height: this.state.activeBrickPosition.height
    };

    //brick offset add its parents' offset

    if (this.state.activeBrickId) {
      var ids = this.state.activeBrickId.split("/");
      var lastBrickId = "";
      if (ids.length > 1) {
        ids.map(function(id, i){
          if (i == ids.length -1) {
            return;
          }
          var brickId = i==0?id: lastBrickId+"/"+id;
          lastBrickId = brickId;
          var component = Collections.BrickCollections.find({id: lastBrickId}, self.props.treeName).getValue();

          if (component) {
            var position = component.offset;
            brickPosition.top += position.top;
            brickPosition.left += position.left;
          }
        })
        brickPosition.top += 64;
      }
    }

    //create page bricks
    // var components = DataStorage.model("Bricks").find();
    var components = Collections.BrickCollections.find();
    var contents = components.map(function(comp){
      var data = comp.getValue();
      var DynaBrick = Bricks[data.brickType];
      return (
        <DynaBrick id={data.id} key={data.id}
          dataStorage={Collections.BrickCollections}
          onPageContextMenu = {self.onPageContextMenu}
          preview={false}
          treeName={self.props.treeName}
          onBrickSelect={self.onBrickSelect} />
      )
    });

    //create transitions
    var transitionModels = Collections.TransitionCollections.find();
    var transition = "";
    if (transitionModels) {
      transition = transitionModels.map(function(transition){
        var transition = transition.getValue();
        return (
          <Transition
            id={transition.id}
            key={transition.id}
            dataStorage={Collections}
            fromPageId={transition.fromPageId}
            toPageId={transition.toPageId}
            remark={transition.remark}
            activeTransitionId = {self.state.activeTransitionId}
            onTransitionSelected={self.onTransitionSelected}
          />
        )
      })
    }

    return (
      <div className="story-content">
        <div ref="header" className="header">
          <PageSettingPanel
            activeBrickId = {this.state.activeBrickId}
            onPageAdd = {this.onPageAdd}
            onPageDelete = {this.onPageDelete}
            onPageSettingsClick = {this.onPageSettingsClick}
            onPageTransitionClick = {this.onPageTransitionClick}
            onPageScaleLarge = {this.onPageScaleLarge}
            onPageScaleSmall = {this.onPageScaleSmall}
            onPageBarModeChange = {this.onPageBarModeChange.bind(this)}
            onPreview = {this.onPreview}
            dataStorage={Collections}
            treeName = {this.props.treeName}
          />
        </div>
        <div ref="story" className="story" onContextMenu={(event)=>this.contextMenu(event)}>
          {contents}
          <BrickMask
              ref = "BrickMask"
              key = "BrickMask"
              activeBrickId={this.state.activeBrickId}
              activeBrickPosition={brickPosition}
              storyScale = {this.state.storyScale}
              dataStorage = {DataStorage}
              treeName = {this.props.treeName}
              onPageContextMenu = {self.onPageContextMenu}
              onBrickResize={this.onBrickResize} />
          {transition}

          <PageContextMenu
            activeBrickId={this.state.activeBrickId}
            position={this.state.contextMenuPosition}
            onPageAddReference={this.onPageAddReference}
            dataStorage = {Collections}
            onNewTransitionSubmit = {this.onNewTransitionSubmit}
            onPageAdd = {this.onPageAdd}
            onBrickAdd = {this.onBrickAdd}
            onBrickDelete = {this.onBrickDelete.bind(this)}
            onPageDelete = {this.onPageDelete}
            onEventAdd = {this.onEventAdd.bind(this)}
            treeName = {this.props.treeName}
            config = {this.props.config}
          />
        </div>
        <SettingPanel
          activeBrickId={this.state.activeBrickId}
          activeTransitionId = {this.state.activeTransitionId}
          dataStorage={Collections}
          onPageAddReference={this.onPageAddReference}
          settingChangeName={this.state.settingChangeName}
          settingChangeValue={this.state.settingChangeValue}
          treeName = {this.props.treeName}
          onBrickSettingChange={this.onBrickSettingChange}
          onTransitionDeleteClick = {this.onTransitionDeleteClick}
          onNewTransitionSubmit={this.onNewTransitionSubmit}
          onTransitionDeleteClick={this.onTransitionDeleteClick}
          onTransitionChanged={this.onTransitionChanged}
        />
        <GalleryMenu
          dataStorage={Collections}
          treeName = {this.props.treeName}
          activeBrickId={this.state.activeBrickId}
          onBrickSettingChange={this.onBrickSettingChange}
        />


      </div>

    )
  }
  //End render method /render/
  //===========================BEGIN RENDER METHOD==============================
}
module.exports = Story;
