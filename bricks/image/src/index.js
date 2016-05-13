"use strict"

require("./style.css")

import Brick from "../../base/src"

class ImageBrick extends React.Component {
  constructor(props) {
    super(props)

    this.renderContent = this.renderContent.bind(this);
    this.refName = "AivicsBrickImage";

    this.lastUrl = "";
    this.size = {
      width: 0,
      height: 0,
      ratio: 1
    }
  }

  componentDidMount() {
    var $brick = $(this.refs[this.refName].getDOMElement())
    this.size.width = $brick.width();
    this.size.height = $brick.height();
    this.size.ratio = this.size.width / this.size.height;
  }

  componentDidUpdate() {

    var $brick = $(this.refs[this.refName].getDOMElement())
    var currentUrl = $brick.find($("img"))[0].src;
    if (currentUrl == this.lastUrl) {

      //lock width/height ratio
      var imageBrick = this.props.dataStorage.model("Bricks").find({id: this.props.id}, this.props.treeName);
      if (Math.abs(imageBrick.offset.width / imageBrick.offset.height - this.size.ratio) > 0.001) {
        imageBrick.offset.height = imageBrick.offset.width / this.size.ratio;
        this.props.onBrickSelect("", this.props.id, imageBrick.offset);
      }
    }

  }

  handleImageLoad(event) {
    var currentUrl = event.target.src;
    var parent = this.props.dataStorage.model("Bricks").find({id: this.props.parentId}, this.props.treeName);
    var $img = $(event.target);
    // if (currentUrl == this.lastUrl && $img.width() == parent.offset.width && $img.height == parent.offset.height) {
    //   return;
    // }
    this.lastUrl = currentUrl;
    var imageBrick = this.props.dataStorage.model("Bricks").find({id: this.props.id}, this.props.treeName);

    if ($img.width() > parent.offset.width) {
      $img.width(parent.offset.width);
      parent.offset.left = 0;
    }

    var $brick = $(this.refs[this.refName].getDOMElement())
    $brick.height($img.height())
    imageBrick.offset.width = $img.width();
    imageBrick.offset.height = $img.height();

    this.size.width = imageBrick.offset.width;
    this.size.height = imageBrick.offset.height;
    this.size.ratio = parseFloat(this.size.width / this.size.height);

    this.props.onBrickSelect(event, this.props.id, imageBrick.offset);

  }

  renderContent() {

    // test
    // http://cc.cocimg.com/api/uploads/20160512/1463023394508339.jpg
    var imageBrick = this.props.dataStorage.model("Bricks").find({id: this.props.id}, this.props.treeName)
    return(
      <div  ref={this.refName} className="aivics-brick-image-wrapper">
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
