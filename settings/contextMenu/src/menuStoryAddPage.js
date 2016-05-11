"use strict"

class AddPageContextMenu extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <button type="button" className="list-group-item"
        onClick={this.props.onPageAdd}>Add Page</button>
    )
  }
}

module.exports = AddPageContextMenu;
