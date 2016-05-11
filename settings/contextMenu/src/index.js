"use strict"

require("./css/style.css")

class ContextMenu extends React.Component {

  constructor(props) {
    super(props)
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
    $(this.refs.AivicsContextTransitionPages).hide();
  }

  onContextTransitionMenu(show) {
    var self = this;
    if (show) {
      $(self.refs.AivicsContextTransitionPages).css('display', 'inline-block');
    }else {
      $(self.refs.AivicsContextTransitionPages).hide();
    }
  }

  onNewTransitionSubmit(selectedToPageId) {
    this.props.onNewTransitionSubmit(this.props.activeBrickId, selectedToPageId, "")
    $(this.refs.AivicsPageContextMenu).hide();
    $(this.refs.AivicsContextTransitionPages).hide();
  }

  render() {

    var self = this;
    var model = this.props.dataStorage.model("Pages");
    var activeBrickId = this.props.activeBrickId;
    var contents = model.find().map(function(brick, i){
      if (brick.id == activeBrickId) {
        return;
      }
      return (
        <button id={brick.id} key={brick.id} type="button" className="list-group-item"
          onClick={(event)=>self.onNewTransitionSubmit(brick.id)}>{brick.title}</button>
      )
    })

    return (
      <div className="pageContextMenu" ref="AivicsPageContextMenu">
        <div className="list-group pageMainContextMenu">
          <button type="button" className="list-group-item"
            onClick={(event)=>this.onPageAddReference(event)}>Add Reference</button>
            <button type="button" className="list-group-item" ref="AivicsContextTransition"
              onClick={(event)=>this.onContextTransitionMenu(true)}>Add Transition</button>

        </div>
        <div className="list-group pages" ref="AivicsContextTransitionPages">
          {contents}

        </div>
      </div>
    )

  }

}

module.exports = ContextMenu;
