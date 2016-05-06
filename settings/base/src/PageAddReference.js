"use strict"

class PageAddReference extends React.Component {

  constructor(props) {
    super (props)
  }

  render() {
    return (
      <button className="btn btn-primary btn-block" type="button"
              onClick={this.props.onPageAddReference}>Add Reference</button>
    )
  }

}

module.exports = PageAddReference;
