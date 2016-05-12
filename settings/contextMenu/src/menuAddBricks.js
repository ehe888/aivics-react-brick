"use strict"

class AddBricksMenu extends React.Component {
  constructor(props) {
    super(props)
  }

  render () {
    return (
      <button type="button" className="list-group-item"
        onClick={(event)=>this.props.onAddBricksContextMenu(event)}>Add Bricks</button>
    )
  }
}

class AddBricksListMenu extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    var self = this;

    return (
      <div className="list-group pages AddBricksListMenu">
        <button type="button" className="list-group-item"
          onClick={(event)=>this.props.onAddNewBrick("Base")}>Base</button>
        <button type="button" className="list-group-item"
          onClick={(event)=>this.props.onAddNewBrick("Label", ["labelText"])}>Label</button>
      </div>
    )
  }
}

var AddBricksContextMenu = {};
AddBricksContextMenu.AddBricksMenu = AddBricksMenu;
AddBricksContextMenu.AddBricksListMenu = AddBricksListMenu;

module.exports = AddBricksContextMenu;
