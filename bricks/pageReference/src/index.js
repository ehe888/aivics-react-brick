"use strict"

require('./style.css')

class PageReference extends React.Component {

  constructor(props) {
    super(props)

    var ids = this.props.id.split("/");
    this.refName = ids[ids.length-1];

    this.model = this.props.dataStorage.model("Pages");
  }

  componentDidMount() {
    this.componentPositionReload();
  }

  componentDidUpdate () {
    this.componentPositionReload();
  }

  componentPositionReload() {
    var postion = this.props.position;
    var $this = $("#"+this.refName)
    $this.css({
      'top': postion.top,
      'left': postion.left,
      'width': postion.width,
      'height': postion.height
    })
  }

  handleOverlayClick(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log("handleOverlayClick")
    if(e.target.className !== e.currentTarget.className){
      return;
    }

    var $this = $("#"+this.refName)

    var left = parseFloat(_.replace($this[0].style.left, 'px', ''));
    var top  = parseFloat(_.replace($this[0].style.top, 'px', ''));
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

  render() {

    return (
      <div className="pageReference" id={this.refName}>
        <p>{this.props.title}</p>
        <div ref="brickContentOverlay"
            className="aivics-brick-content-overlay"
            onClick={(event)=>this.handleOverlayClick(event)} >
        </div>
      </div>
    )
  }

}

module.exports = PageReference
