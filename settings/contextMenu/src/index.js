"use strict"

require("./css/style.css")

import PageAddContextMenu from './menuStoryAddPage.js'
import PageAddTransitionContextMenu from './menuPageAddTransition.js'
import DeleteContextMenu from './menuDelete.js'
import AddBricksContextMenu from './menuAddBricks'

var AddBricksMenu = AddBricksContextMenu.AddBricksMenu;
var AddBricksListMenu = AddBricksContextMenu.AddBricksListMenu;

var PageAddTransitionMenu = PageAddTransitionContextMenu.PageAddTransitionMenu;
var PageAddTranstionList = PageAddTransitionContextMenu.PageAddTranstionList;

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
    this.componentPositionReload();
    var self = this;
    $(this.refs.AivicsPageContextMenu).hide();
    $(".story").click(function(event){
      self.onContextMenuClose();
    })
  }

  componentDidUpdate() {
    this.componentPositionReload();
  }

  componentPositionReload() {
    var position = this.props.position;
    console.log(position)
    var $this = $(this.refs.AivicsPageContextMenu)
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
      $(this.refs.AivicsPageContextMenu).hide();
    }else {
      $(this.refs.AivicsPageContextMenu).show();
      $(".AddBricksListMenu").css('display', 'inline-block');
      // this.props.onBrickAdd(this.props.activeBrickId, top, left);
    }

  }

  onAddNewBrick(brickType, settings=[]) {
    var self = this;
    var top = this.props.position.top,
        left = this.props.position.left,
        width = 200,
        height = 50;

    var parent = this.props.dataStorage.model("Bricks").find({ id: this.props.activeBrickId }, this.props.treeName);
    var offset = parent.offset;
    top -= offset.top;
    left -= offset.left;
    top -= (64 + height/2);
    this.props.onBrickAdd(this.props.activeBrickId, top, left, 200, 50, brickType, settings)
    $(".AddBricksListMenu").hide();
  }

  onContextMenuClose(event) {
    $(this.refs.AivicsPageContextMenu).hide();
    $(".PageAddTranstionList").hide();
    $(".AddBricksListMenu").hide();
  }

  onContextTransitionMenu(show) {
    var self = this;
    $(this.refs.AivicsPageContextMenu).show();
    if (show) {
      $(".PageAddTranstionList").css('display', 'inline-block');
    }else {
      $(".PageAddTranstionList").hide();
    }
  }

  onNewTransitionSubmit(selectedToPageId) {
    this.props.onNewTransitionSubmit(this.props.activeBrickId, selectedToPageId, "")
    $(this.refs.AivicsPageContextMenu).hide();
    $(".PageAddTranstionList").hide();
  }

  onPageAdd(event) {
    event.preventDefault();
    var self = this;
    var top = this.props.position.top,
        left = this.props.position.left,
        width = 375,
        height = 667;

    this.props.onPageAdd(top, left);
    $(this.refs.AivicsPageContextMenu).hide();
  }

  onDeleteBrick() {
    this.props.onPageDelete();
    $(this.refs.AivicsPageContextMenu).hide();
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
    if (this.props.activeBrickId) {
      //From now, we only have page context menu
      //TODO: support other brickType

      content = this.renderPageContextMenuItems();

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
          ref = "AivicsContextTransitionPages"
          dataStorage={this.props.dataStorage}
          activeBrickId={this.props.activeBrickId}
          onAddNewBrick={this.onAddNewBrick}
          onNewTransitionSubmit={this.onNewTransitionSubmit}
        />

      </div>
    )

  }
}

module.exports = ContextMenu;
