/**
 * settings/animationSettings/animationDelaySettings.js
 */

"use strict"

class AnimationDelaySettings extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.jqueryMap = {
      $animationDelay : $(this.refs.animationDelay)
    }
  }

  handleAnimationSelected(name, delay) {
    this.jqueryMap.$animationDelay.html(delay);
    this.props.handleAnimationDuration(name, delay)
  }

  render() {
    return (
      <div className="animationDelaySettings">
        <div>Delay: </div>
        <div className="dropdown">
          <button className="btn btn-default dropdown-toggle" type="button" id="animationSettingsMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
            <span className="animationDelay" ref="animationDelay">{this.props.animationDelay}</span>
            <span className="caret"></span>
          </button>
          <ul className="dropdown-menu" aria-labelledby="animationSettingsMenu">
            <li><a onClick={(event)=>this.handleAnimationSelected('delay', '0')}>0</a></li>
            <li><a onClick={(event)=>this.handleAnimationSelected('delay', '1')}>1</a></li>
            <li><a onClick={(event)=>this.handleAnimationSelected('delay', '2')}>2</a></li>
            <li><a onClick={(event)=>this.handleAnimationSelected('delay', '3')}>3</a></li>
            <li><a onClick={(event)=>this.handleAnimationSelected('delay', '4')}>4</a></li>
            <li><a onClick={(event)=>this.handleAnimationSelected('delay', '5')}>5</a></li>
            <li><a onClick={(event)=>this.handleAnimationSelected('delay', '6')}>6</a></li>
            <li><a onClick={(event)=>this.handleAnimationSelected('delay', '7')}>7</a></li>
          </ul>
        </div>
      </div>
    )
  }
}

module.exports = AnimationDelaySettings;
