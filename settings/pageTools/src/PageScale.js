"use strict"

class PageScale extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="btn-group" role="group">
        <button type="button"
                className="btn btn-default scaleLarge"
                onClick={this.props.onPageScaleLarge}>
          Scale+
        </button>
        <button type="button"
                className="btn btn-default scaleSmall"
                onClick={this.props.onPageScaleSmall}>
          Scale-
        </button>
      </div>
    )
  }
}

module.exports = PageScale;
