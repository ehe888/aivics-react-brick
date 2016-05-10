"use strict"

require("./style.css")

class PagePreview extends React.Component {

  constructor(props) {
    super(props)

    this.refName = "aivicsPage";
    this.model = this.props.dataStorage.model("Pages");
    this.handleOverlayClick = this.handleOverlayClick.bind(this);
    // this.reload = this.reload.bind(this);
    this.getDOMElement = this.getDOMElement.bind(this);

    this.dataStorage = this.props.dataStorage;
    this.renderContent = this.renderContent.bind(this);
  }

  // reload(data){
  //
  //   var offset = data.offset;
  //   $(this.refs[this.refName])
  //             .css(offset)
  //             .css(data);
  // }

  getDOMElement(){
    return this.refs[this.refName];
  }


  componentDidMount(){
    var record = this.model.find({ id: this.props.id });
    var offset = record.offset;
    var height = offset.height;
    height -= 64;
    $(this.refs[this.refName])
              .css(offset)
              .css(record);
    $(this.refs[this.refName]).height(height)
    // this.updateContentView();
  }


  componentDidUpdate(){
    // var record = this.model.find({ id: this.props.id });
    // this.reload(record);
    // this.updateContentView();
  }

  handleOverlayClick(e) {
    e.preventDefault();
    e.stopPropagation();
    if(e.target.className !== e.currentTarget.className){
      return;
    }

    var $this = $(this.getDOMElement());

    var left = _.replace($this[0].style.left, 'px', '');
    var top  = _.replace($this[0].style.top, 'px', '');
    var width = $this.width();
    var height = $this.height();

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
            onBrickSelect:self.props.onBrickSelect,
            title: b.title,
            position: b.offset
        });
      })
    }
  }

  renderContent(record) {
    return (
      <div>
        <img className="aivics-page-image" src={record.imageUrl}/>

      </div>
    )
  }

  render() {
    var record = this.model.find({ id: this.props.id });
    var subContent = this.renderContent(record);

    return (
      <div id={this.props.id}
          ref={this.refName}
          data-preview-id={this.props.id}
          className="aivics-page-preview" >
          <div ref="brickContentWrapper"
              className="aivics-page-content-wrapper">
            {this.renderNest()}
            {subContent}
          </div>
          <div ref="brickContentOverlay"
              className="aivics-brick-content-overlay"
              onClick={this.handleOverlayClick}>
          </div>
      </div>
    )
  }

}

module.exports = PagePreview;
