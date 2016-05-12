"use strict"

class PageAddReference extends React.Component {
  constructor(props) {
    super(props)
  }

  render () {
    return (
      <button type="button" className="list-group-item"
        onClick={(event)=>this.props.onPageAddReference(event)}>Add Bricks</button>
    )
  }
}

module.exports = PageAddReference;
