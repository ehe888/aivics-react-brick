"use strict"

require("./css/style.css")

class TransitionSettings extends React.Component {

  constructor(props) {
    super(props);
  }

  onAnimationSelected(effectIn, effectOut) {
    console.info(this.props.transitionId)
    var transition = this.props.dataStorage.model("Transitions").find({id: this.props.transitionId})
    transition.toPageTransition = effectIn;
    transition.fromPageTransition = effectOut;
    $(".transitionEffectTitle").html(effectIn)
  }

  render() {

    var transition = this.props.dataStorage.model("Transitions").find({id: this.props.transitionId})
    var title = transition?transition.toPageTransition || "Animation" : "Animation"
    console.info(this.props.transitionId)
    if (transition) {
      console.info(transition.toPageTransition);
    }
    return (
      <div className="transitionSettings">
        <div className="btn-group">
          <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span className="transitionEffectTitle">{title}</span> <span className="caret"></span>
          </button>
          <ul className="dropdown-menu">
            <li><a href="#" onClick={(event)=>this.onAnimationSelected("fadeIn", "fadeOut")}>fadeIn</a></li>
            <li><a href="#" onClick={(event)=>this.onAnimationSelected("slideInUp", "slideOutUp")}>slideInUp</a></li>
          </ul>
        </div>
      </div>
    )
  }
}

TransitionSettings.effects = [
  "fadeIn", "fadeOut", "slideInUp", "slideOutUp"
]

module.exports = TransitionSettings;
