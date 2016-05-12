"use strict"

class AddBricksContextMenu extends React.Component {
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

module.exports = AddBricksContextMenu;
