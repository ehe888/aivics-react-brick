"use strict"

class DeleteContextMenu extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <button type="button" className="list-group-item"
        onClick={this.props.onPageDelete}>Delete</button>
    )
  }
}

module.exports = DeleteContextMenu;
