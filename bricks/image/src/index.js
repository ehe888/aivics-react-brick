"use strict"

require("./style.css")

import Brick from "../../base/src"

class ImageBrick extends React.Component {
  constructor(props) {
    super(props)

    this.renderContent = this.renderContent.bind(this);
    this.refName = "AivicsBrickImage";

    this.lastUrl = "";
  }

  componentDidMount() {
    
  }

  componentDidUpdate() {

  }

  handleImageLoad(event) {
    var currentUrl = event.target.src;
    if (currentUrl == this.lastUrl) {
      return;
    }
    this.lastUrl = currentUrl;
    var imageBrick = this.props.dataStorage.model("Bricks").find({id: this.props.id}, this.props.treeName);
    var parent = this.props.dataStorage.model("Bricks").find({id: this.props.parentId}, this.props.treeName);
    var $img = $(event.target);
    if ($img.width() > parent.offset.width) {
      $img.width(parent.offset.width);
      parent.offset.left = 0;
    }

    var $brick = $(this.refs[this.refName].getDOMElement())
    $brick.height($img.height())
    imageBrick.offset.height = $img.height();
    this.props.onBrickSelect(event, this.props.id, imageBrick.offset);
  }

  renderContent() {

    // test
    // http://cc.cocimg.com/api/uploads/20160512/1463023394508339.jpg
    var imageBrick = this.props.dataStorage.model("Bricks").find({id: this.props.id}, this.props.treeName)
    return(
      <div ref="AivicsBrickImage" className="aivics-brick-image-wrapper">
        <img src={imageBrick.imageUrl}
             onLoad={(event)=>this.handleImageLoad(event)}/>
      </div>
    )
  }

  render() {
    return(
      <Brick id={this.props.id}
            ref={this.refName}
            dataStorage={this.props.dataStorage}
            onBrickSelect={this.props.onBrickSelect}
            renderContent={this.renderContent} >
      </Brick>
    )
  }
}

module.exports = ImageBrick;
