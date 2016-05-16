"use strict"

class BrickAddEventMenuItem extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <button type="button" className="list-group-item"
        onClick={this.props.onShowBrickAddEventList}>Add Event</button>
    )
  }
}

class BrickAddEventList extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {

    var contents = "";
    var self = this;
    var ids = this.props.activeBrickId.split("/");
    if (ids.length > 1) {
      var pageId = ids[0];
      var transitions = this.props.dataStorage.model("Transitions").find();
      if (transitions && transitions.length > 0) {
        contents = transitions.map(function(transition){

          if (transition.fromPageId == pageId) {
            var id = transition.id,
                title = "To " + transition.toPageId
            return (
              <button id={id} key={id} type="button" className="list-group-item"
                onClick={(event)=>self.props.onBrickAddEvent(event)}>{title}</button>
            )
          }

          return "";

        })
      }
    }

    return (
      <div className="list-group pages BrickAddEventList">
        {contents}

      </div>
    )
  }
}

var BrickAddEventMenu = {};
BrickAddEventMenu.BrickAddEventMenuItem = BrickAddEventMenuItem;
BrickAddEventMenu.BrickAddEventList = BrickAddEventList;

module.exports = BrickAddEventMenu;
