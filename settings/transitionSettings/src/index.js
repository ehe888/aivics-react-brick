"use strict"

require("./css/style.css")

class TransitionSettings extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      effect: ''
    }

    this.remarkName = "remarkName";
  }

  onAnimationSelected(effectIn, effectOut) {
    console.info(this.props.transitionId)
    var transition = this.props.dataStorage.model("Transitions").find({id: this.props.transitionId})
    transition.toPageTransition = effectIn;
    transition.fromPageTransition = effectOut;
    $(".transitionEffectTitle").html(effectIn)
    this.setState({
      effect: effectIn
    })
  }

  onRemarkInput(e) {
    var changeToValue = e.target.value;
    var self = this;
    self.props.onTransitionChanged(self.props.transitionId, changeToValue);
  }

  render() {

    var transition = this.props.dataStorage.model("Transitions").find({id: this.props.transitionId})
    var title = transition?transition.toPageTransition || "Animation" : "Animation",
        remark = transition?transition.remark : "";
    if (transition) {
      console.info(transition.toPageTransition);
    }
    return (
      <div className="transitionSettings">

        <div className="btn-group">
          <p>Animation Effect</p>
          <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span className="transitionEffectTitle">{title}</span> <span className="caret"></span>
          </button>
          <ul className="dropdown-menu">
            <li><a href="#" onClick={(event)=>this.onAnimationSelected("fadeIn", "fadeOut")}>fadeIn</a></li>
            <li><a href="#" onClick={(event)=>this.onAnimationSelected("slideInUp", "slideOutUp")}>slideInUp</a></li>
          </ul>
        </div>
        <div className="input-group">
          <span className="input-group-addon" id="basic-addon1">Remark</span>
          <input type="text" className="form-control"
                  placeholder="Remark"
                  ref={this.remarkName}
                  aria-describedby="basic-addon1"
                  value={remark}
                  onInput={(event)=>this.onRemarkInput(event)}/>
        </div>
        <button type="button" className="btn btn-danger btn-block transitionDelete"
          onClick={(event)=>this.props.onTransitionDeleteClick(this.props.transitionId)}>删除</button>
      </div>
    )
  }
}

TransitionSettings.effects = [
  "fadeIn", "fadeOut", "slideInUp", "slideOutUp"
]

module.exports = TransitionSettings;
