"use strict"

require("./style.css")

import Brick from "../../base/src"

class Page extends React.Component  {
  constructor(props){   //Equals to getInitialState
    super(props);

    this.refName = "aivicsPage";
    this.model = this.props.dataStorage.model("Pages");
    this.handleOverlayClick = this.handleOverlayClick.bind(this);
    this.reload = this.reload.bind(this);
    this.getDOMElement = this.getDOMElement.bind(this);

    this.dataStorage = this.props.dataStorage;
    this.updateContentView = this.updateContentView.bind(this);
    this.renderContent = this.renderContent.bind(this);
  }

  reload(data){
    $(this.getDOMElement())
              .css(data.dimension)
              .css(data);
  }

  getDOMElement(){
    return this.refs[this.refName];
  }

  updateContentView() {

    var $brick = $("#" + this.props.id);
    var height = $brick.outerHeight();
    var para = $brick.find("h3.aivcis-page-title-paragraph");
    var pHeight = para.outerHeight();

    console.log(height, pHeight);
    console.log((100 * ((height - pHeight)/height) / 2.0) + "%");

    para.css({
      "top": (100 * ((height - pHeight)/height) / 2.0) + "%"
    });

  }

  componentDidMount(){
    var record = this.model.find({ id: this.props.id });
    this.reload(record);
    this.updateContentView();
  }


  componentDidUpdate(){
    var record = this.model.find({ id: this.props.id });
    this.reload(record);
    this.updateContentView();
  }

  handleOverlayClick(e) {
    e.preventDefault();
    if(e.target.className !== e.currentTarget.className){
      return;
    }

    var $this = $(this.getDOMElement());

    var left = _.replace($this[0].style.left, 'px', '');
    var top  = _.replace($this[0].style.top, 'px', '');
    var width = $this.width();
    var height = $this.height();

    if(this.props.containerId){
        var container = this.model.find({ id: this.props.containerId });
        left +=container.dimension.left;
        top += container.dimension.top;
    }

    var position = {
      left: left,
      top: top,
      width: width,
      height: height
    };

    this.props.onBrickSelect(e, this.props.id, position);
  }

  renderNest(){
    var self = this;
    var parentId = this.props.id;
    var record = this.model.find({ id: this.props.id });

    if(!_.isEmpty(record.bricks)){
      return record.bricks.map(function(b){
        var bid = parentId + "/" + b.id;

        var TagName = $.Bricks[b.brickType];
        return React.createElement(TagName, {
          id:bid, key:bid, containerId: parentId,
            dataStorage:self.props.dataStorage,
            onBrickSelect:self.props.onBrickSelect
        });
      })
    }
  }

  renderContent() {
    var record = this.model.find({ id: this.props.id });
    return (
      <div>
        <img className="aivics-page-image" src={record.imageUrl}/>
        <h3 className="aivcis-page-title-paragraph"
          dangerouslySetInnerHTML={ { __html: record.title} } ></h3>
      </div>
    )
  }

  render() {
    var subContent = this.renderContent();
    return (
      <div id={this.props.id}
          ref={this.refName}
          className="aivics-brick" >
          <div ref="brickContentWrapper"
              className="aivics-brick-content-wrapper">
            {this.renderNest()}
            {subContent}
          </div>
          <div ref="brickContentForegrond"
              className="aivics-brick-content-foreground">
          </div>
          <div ref="brickContentOverlay"
              className="aivics-brick-content-overlay"
              onClick={this.handleOverlayClick} >
          </div>
      </div>
    )
  }
}

module.exports = Page;
