/**
 * contextMenu/index.js
 */

"use strict"

require("./css/style.css")

import ReactDOM from 'react-dom'

import PageAddContextMenu from './menuStoryAddPage.js'
import PageAddTransitionContextMenu from './menuPageAddTransition.js'
import DeleteContextMenu from './menuDelete.js'
import AddBricksContextMenu from './menuAddBricks'
import BrickAddEventMenu from './menuBrickAddEvent'

var AddBricksMenu = AddBricksContextMenu.AddBricksMenu;
var AddBricksListMenu = AddBricksContextMenu.AddBricksListMenu;

var PageAddTransitionMenu = PageAddTransitionContextMenu.PageAddTransitionMenu;
var PageAddTranstionList = PageAddTransitionContextMenu.PageAddTranstionList;

var BrickAddEventList = BrickAddEventMenu.BrickAddEventList;
var BrickAddEventMenuItem = BrickAddEventMenu.BrickAddEventMenuItem;

class ContextMenu extends React.Component {

  constructor(props) {
    super(props)

    this.onAddBricksContextMenu = this.onAddBricksContextMenu.bind(this);
    this.onContextTransitionMenu = this.onContextTransitionMenu.bind(this);
    this.onNewTransitionSubmit = this.onNewTransitionSubmit.bind(this);
    this.onAddNewBrick = this.onAddNewBrick.bind(this);
    this.onDeleteBrick = this.onDeleteBrick.bind(this);
  }

  componentDidMount() {

    this.jqueryMap = {
      $AddBricksListMenu: $(ReactDOM.findDOMNode(this.refs.AivicsContextAddBricks)),
      $BrickAddEventList: $(ReactDOM.findDOMNode(this.refs.AivicsContextAddEvents)),
      $PageAddTranstionList: $(ReactDOM.findDOMNode(this.refs.AivicsContextTransitionPages)),
      $AivicsPageContextMenu: $(this.refs.AivicsPageContextMenu)
    }
    // console.info(this.jqueryMap.$AivicsPageContextMenu)
    this.componentPositionReload();
    var self = this;
    this.jqueryMap.$AivicsPageContextMenu.hide();
    $(".story").click(function(event){
      self.onContextMenuClose();
    })
  }

  componentDidUpdate() {


    this.componentPositionReload();
  }

  componentPositionReload() {
    var position = this.props.position;

    var $this = this.jqueryMap.$AivicsPageContextMenu
    $this.css({
      'top': position.top,
      'left': position.left
    })
  }

  onAddBricksContextMenu(event) {
    event.preventDefault();
    var self = this;

    if (this.props.treeName == this.props.config.mode.referenceTree) {
      var top = this.props.position.top,
          left = this.props.position.left,
          width = 200,
          height = 50;

      var parent = this.props.dataStorage.model("Bricks").find({ id: this.props.activeBrickId }, this.props.treeName);
      var offset = parent.offset;
      top -= offset.top;
      left -= offset.left;
      top -= (64 + height/2);
      this.props.onPageAddReference(this.props.activeBrickId, top, left);
      this.jqueryMap.$AivicsPageContextMenu.hide();
    }else {
      this.jqueryMap.$AivicsPageContextMenu.show();
      this.jqueryMap.$AddBricksListMenu.css('display', 'inline-block');
    }

  }

  onAddNewBrick(brickType, settings=[]) {
    var self = this;

    var parent = this.props.dataStorage.model("Bricks").find({ id: this.props.activeBrickId }, this.props.treeName);
    var offset = parent.offset;
    var top = this.props.position.top,
        left = this.props.position.left,
        width = offset.width/2,
        height = width;

    top -= offset.top;
    left -= offset.left;
    if (this.props.activeBrickId && this.props.activeBrickId.split("/").length <= 1) {
      top -= (64 + height/2);
    }
    this.props.onBrickAdd(this.props.activeBrickId, top, left, width, height, brickType, settings)
    this.jqueryMap.$AddBricksListMenu.hide();
  }

  onContextMenuClose(event) {
    this.jqueryMap.$AivicsPageContextMenu.hide();
    this.jqueryMap.$PageAddTranstionList.hide();
    this.jqueryMap.$AddBricksListMenu.hide();
    this.jqueryMap.$BrickAddEventList.hide();
  }

  onContextTransitionMenu(show) {
    var self = this;
    this.jqueryMap.$AivicsPageContextMenu.show();
    if (show) {
      this.jqueryMap.$PageAddTranstionList.css('display', 'inline-block');
    }else {
      this.jqueryMap.$PageAddTranstionList.hide();
    }
  }

  onNewTransitionSubmit(selectedToPageId) {
    this.props.onNewTransitionSubmit(this.props.activeBrickId, selectedToPageId, "")
    this.jqueryMap.$AivicsPageContextMenu.hide();
    this.jqueryMap.$PageAddTranstionList.hide();

  }

  onPageAdd(event) {
    event.preventDefault();
    var self = this;
    var top = this.props.position.top,
        left = this.props.position.left,
        width = 375,
        height = 667;

    this.props.onPageAdd(top, left);
    this.jqueryMap.$AivicsPageContextMenu.hide();
  }

  onDeleteBrick() {
    var bricks = this.props.activeBrickId.split("/");
    if (bricks.length > 1) {
      this.props.onBrickDelete();
    }else {
      this.props.onPageDelete();
    }

    this.jqueryMap.$AivicsPageContextMenu.hide();
  }

  //Purpose: Show Transition List which relative to the page
  //Arguments: none
  //Return: none
  onShowBrickAddEventList() {
    this.jqueryMap.$BrickAddEventList.css('display', 'inline-block');
    this.jqueryMap.$AivicsPageContextMenu.show();
  }

  onBrickAddEvent(event) {
    var $item = $(event.target),
        transitionId = $item.attr("id");

    this.props.onEventAdd(transitionId);
  }

  renderPageContextMenuItems() {
    //Pages context menu item: [AddReference, AddTransition, Delete]
    return (
      <div>
        <AddBricksMenu
          onAddBricksContextMenu = {this.onAddBricksContextMenu}
          ref = "AivicsContextAddBricksContextMenu"
        />
        <PageAddTransitionMenu
          onContextTransitionMenu = {this.onContextTransitionMenu}
          ref = "AivicsContextTransition"
        />
        <BrickAddEventMenuItem
          onShowBrickAddEventList={this.onShowBrickAddEventList.bind(this)}
        />
        <DeleteContextMenu
          onPageDelete={this.onDeleteBrick}
        />
      </div>
    )
  }

  renderBricksContextMenuItems() {
    return (
      <div>
        <BrickAddEventMenuItem
          onShowBrickAddEventList={this.onShowBrickAddEventList.bind(this)}
        />
        <DeleteContextMenu
          onPageDelete={this.onDeleteBrick}
        />
      </div>
    )
  }

  renderStoryContextMenuItems() {
    return (
      <PageAddContextMenu
        onPageAdd={(event)=>this.onPageAdd(event)}
      />
    )
  }

  render() {
    var content = "";
    // console.info(this.props.activeBrickId)
    if (this.props.activeBrickId) {

      var bricks = this.props.activeBrickId.split("/");
      if (bricks.length > 1) {
        content = this.renderBricksContextMenuItems();
      }else{
        content = this.renderPageContextMenuItems();
      }


    }else {
      //click in storyboard
      content = this.renderStoryContextMenuItems();
    }

    return (
      <div className="pageContextMenu" ref="AivicsPageContextMenu">
        <div className="list-group pageMainContextMenu">
          {content}
        </div>
        <PageAddTranstionList
          ref = "AivicsContextTransitionPages"
          dataStorage={this.props.dataStorage}
          activeBrickId={this.props.activeBrickId}
          onNewTransitionSubmit={this.onNewTransitionSubmit}
        />
        <AddBricksListMenu
          ref = "AivicsContextAddBricks"
          dataStorage={this.props.dataStorage}
          activeBrickId={this.props.activeBrickId}
          onAddNewBrick={this.onAddNewBrick}
          onNewTransitionSubmit={this.onNewTransitionSubmit}
        />
        <BrickAddEventList
          ref = "AivicsContextAddEvents"
          dataStorage={this.props.dataStorage}
          activeBrickId={this.props.activeBrickId}
          onBrickAddEvent={this.onBrickAddEvent.bind(this)}
        />

      </div>
    )

  }
}

module.exports = ContextMenu;
