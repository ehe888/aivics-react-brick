"use strict"

require("./style.css")

class TransitionRemark extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount(){
    this.componentPostionReload();
  }

  componentDidUpdate(){
    this.componentPostionReload();
  }

  componentPostionReload() {
    var top = this.props.top,
        left= this.props.left;
    var div = $("#"+this.props.id);
    div.css({
      'top': top,
      'left': left,
      'width': this.props.width
    })
  }

  render() {
    return (
      <p id={this.props.id}>{this.props.remark}</p>
    )
  }
}

class Transition extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidMount(){

  }

  componentDidUpdate(){

  }

  render() {

    var fromPageId = this.props.fromPageId,
        toPageId = this.props.toPageId,
        model = this.props.dataStorage.model("Pages"),
        fromPage = model.find({id: fromPageId}),
        toPage = model.find({id: toPageId});

    var fromLeft = fromPage.dimension.left,
        toLeft = toPage.dimension.left;
    var fromTop = fromPage.dimension.top,
        toTop = toPage.dimension.top;

    var startX = (fromPage.dimension.left + fromPage.dimension.width),
        startY = fromPage.dimension.top + fromPage.dimension.height/2,
        middle0X = fromPage.dimension.left + fromPage.dimension.width + 80,
        middle0Y = startY,
        middle1X = (toPage.dimension.left - 80),
        middle1Y = toPage.dimension.top + toPage.dimension.height/2,
        endX = (toPage.dimension.left-5),
        endY = middle1Y;

    var points = startX+","+startY+" " + middle0X+","+middle0Y+" " + middle1X+","+middle1Y+" "+endX+","+endY;

    return(
      <div className="transition">
        <TransitionRemark
          id = {this.props.id}
          remark={this.props.remark}
          top = {Math.max(startY, endY) - (endY>startY?((endY-startY)/2):((startY-endY)/2))}
          left = {Math.min(startX, endX)}
          width = {startX>endX?(startX-endX):(endX-startX)}
        />
        <svg width={startX+endX} height={endX + endY}>
          <defs>
              <marker id="Triangle"
                      viewBox="0 0 10 10"
                      refX="1" refY="5"
                      markerWidth="6"
                      markerHeight="6"
                      orient="auto">
                  <path d="M 0 0 L 10 5 L 0 10 z" />
            </marker>
          </defs>
          <polyline points={points} fill="none" stroke="black" markerEnd="url(#Triangle)" strokeWidth="3" />
        </svg>
      </div>
    )
  }

}

module.exports = Transition;
