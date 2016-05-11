"use strict"

require("./css/style.css")

import PageAddReference from './menuPageAddReference.js'
import PageAddTransitionContextMenu from './menuPageAddTransition.js'
import DeleteContextMenu from './menuDelete.js'

var PageAddTransitionMenu = PageAddTransitionContextMenu.PageAddTransitionMenu;
var PageAddTranstionList = PageAddTransitionContextMenu.PageAddTranstionList;

class ContextMenu extends React.Component {

  constructor(props) {
    super(props)

    this.onPageAddReference = this.onPageAddReference.bind(this);
    this.onContextTransitionMenu = this.onContextTransitionMenu.bind(this);
    this.onNewTransitionSubmit = this.onNewTransitionSubmit.bind(this);
    this.onDeleteBrick = this.onDeleteBrick.bind(this);
  }

  componentDidMount() {
    this.componentPositionReload();
    var self = this;
    $(this.refs.AivicsPageContextMenu).hide();
    $(".story").click(function(){
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

  onPageAddReference(event) {
    event.preventDefault();
    var self = this;
    var top = this.props.position.top,
        left = this.props.position.left,
        width = 200,
        height = 50;

    var parent = this.props.dataStorage.model("Pages").find({ id: this.props.activeBrickId });
    var offset = parent.offset;
    top -= offset.top;
    left -= offset.left;
    top -= (64 + height/2);
    this.props.onPageAddReference(this.props.activeBrickId, top, left);
    $(this.refs.AivicsPageContextMenu).hide();
  }

  onContextMenuClose(event) {
    $(this.refs.AivicsPageContextMenu).hide();
    // $(this.refs.AivicsContextTransitionPages).hide();
    $(".PageAddTranstionList").hide();
  }

  onContextTransitionMenu(show) {
    var self = this;
    if (show) {
      //why not working?
      // $(self.refs.AivicsContextTransitionPages).css('display', 'inline-block');
      $(".PageAddTranstionList").css('display', 'inline-block');
    }else {
      $(".PageAddTranstionList").hide();
      // $(self.refs.AivicsContextTransitionPages).hide();
    }
  }

  onNewTransitionSubmit(selectedToPageId) {
    this.props.onNewTransitionSubmit(this.props.activeBrickId, selectedToPageId, "")
    $(this.refs.AivicsPageContextMenu).hide();
    // $(this.refs.AivicsContextTransitionPages).hide();
    $(".PageAddTranstionList").hide();
  }

  onDeleteBrick() {
    this.props.onPageDelete();
    $(this.refs.AivicsPageContextMenu).hide();
  }

  render() {

    return (
      <div className="pageContextMenu" ref="AivicsPageContextMenu">
        <div className="list-group pageMainContextMenu">
          <PageAddReference
            onPageAddReference = {this.onPageAddReference}
            ref = "AivicsContextAddReference"
          />
          <PageAddTransitionMenu
            onContextTransitionMenu = {this.onContextTransitionMenu}
            ref = "AivicsContextTransition"
          />
          <DeleteContextMenu
            onPageDelete={this.onDeleteBrick}
          />

        </div>
        <PageAddTranstionList
          ref = "AivicsContextTransitionPages"
          dataStorage={this.props.dataStorage}
          activeBrickId={this.props.activeBrickId}
          onNewTransitionSubmit={this.onNewTransitionSubmit}
        />


      </div>
    )

  }
}

module.exports = ContextMenu;
