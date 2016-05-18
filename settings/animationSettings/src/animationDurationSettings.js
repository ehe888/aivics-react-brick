/**
 * settings/animationSettings/animationDurationSettings.js
 */

"use strict"

class AnimationDurationSettings extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.jqueryMap = {
      $animationDuration: $(this.refs.animationDuration)
    }
  }

  handleAnimationDuration(name, duration) {
    this.jqueryMap.$animationDuration.html(duration)

    this.props.handleAnimationDuration(name, duration)
  }

  render() {
    return (
      <div className="animationDurationSettings">
        <div>Duration: </div>
        <div className="dropdown">
          <button className="btn btn-default dropdown-toggle" type="button" id="animationDurationSettingsMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
            <span className="animationDuration" ref="animationDuration">{this.props.animationDuration}</span>
            <span className="caret"></span>
          </button>
          <ul className="dropdown-menu" aria-labelledby="animationDurationSettingsMenu">
            <li><a onClick={(event)=>this.handleAnimationDuration('duration', 'short')}>short</a></li>
            <li><a onClick={(event)=>this.handleAnimationDuration('duration', 'normal')}>normal</a></li>
            <li><a onClick={(event)=>this.handleAnimationDuration('duration', 'long')}>long</a></li>
          </ul>
        </div>
      </div>
    )
  }
}

module.exports = AnimationDurationSettings;
