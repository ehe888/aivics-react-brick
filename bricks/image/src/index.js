"use strict"

require("./style.css")

import Brick from "../../base/src"

class ImageBrick extends React.Component {
  constructor(props) {
    super(props)

    this.renderContent = this.renderContent.bind(this);
  }

  renderContent() {
    return(
      <div className="aivics-brick-image-wrapper">
        <img src={this.props.src}/>
      </div>
    )
  }

  render() {
    return(
      <Brick id={this.props.id}
            dataStorage={this.props.dataStorage}
            onBrickSelect={this.props.onBrickSelect}
            renderContent={this.renderContent} >
      </Brick>
    )
  }
}

module.exports = ImageBrick;
