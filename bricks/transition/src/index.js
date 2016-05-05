"use strict"

require("./style.css")

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

    var startX = fromLeft < toLeft? (fromPage.dimension.left + fromPage.dimension.width) : (fromPage.dimension.left),
        startY = fromPage.dimension.top + fromPage.dimension.height/2,
        endX = fromLeft < toLeft? (toPage.dimension.left) : (toPage.dimension.left + toPage.dimension.width),
        endY = toPage.dimension.top + toPage.dimension.height/2;

    return(
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
        <line x1={startX} y1={startY} x2={endX} y2={endY} fill="none" stroke="black" markerEnd="url(#Triangle)" strokeWidth="2">
        </line>
      </svg>
    )
  }

}

module.exports = Transition;
