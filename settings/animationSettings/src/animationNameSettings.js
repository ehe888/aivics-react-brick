/**
 * settings/animationSettings/animationNameSettings.js
 */

"use strict"

class AnimationNameSettings extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.jqueryMap = {
      $animationName : $(this.refs.animationName)
    }
  }

  handleAnimationSelected(name, effect) {
    this.jqueryMap.$animationName.html(effect);
    this.props.handleAnimationSelected(name, effect)
  }

  render() {
    return (
      <div className="animationName">
        <div>Name: </div>
        <div className="dropdown">
          <button className="btn btn-default dropdown-toggle" type="button" id="animationSettingsMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
            <span className="animationName" ref="animationName">{this.props.animationName}</span>
            <span className="caret"></span>
          </button>
          <ul className="dropdown-menu" aria-labelledby="animationSettingsMenu">
            <li><a onClick={(event)=>this.handleAnimationSelected('name', 'fadeIn')}>fadeIn</a></li>
            <li><a onClick={(event)=>this.handleAnimationSelected('name', 'bounceIn')}>bounceIn</a></li>
            <li><a onClick={(event)=>this.handleAnimationSelected('name', 'slideIn')}>slideIn</a></li>
          </ul>
        </div>
      </div>
    )
  }
}

module.exports = AnimationNameSettings;
