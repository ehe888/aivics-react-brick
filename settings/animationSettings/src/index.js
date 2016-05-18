/**
 * settings/animationSettings/index.js
 */

"use strict"

require('./css/style.css')

import AnimationNameSettings from './animationNameSettings'
import AnimationDurationSettings from './animationDurationSettings'
import AnimationDelaySettings from './animationDelaySettings'

class AnimationSettings extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.jqueryMap = {
      $animationName : $(this.refs.animationName)
    }
  }

  handleAnimationSelected(key, value) {

    var brick = this.props.dataStorage.model("Bricks")
              .find({id: this.props.activeBrickId}, this.props.treeName);
    var animation = brick.animation || {
      name: "",
      duration: "",
      delay: ""
    };
    animation[key] = value;
    brick.animation = animation;
  }

  render() {
    var animationName="None", animationDuration="", animationDelay="";
    var activeBrickId = this.props.activeBrickId;
    if (activeBrickId.split("/").length > 1) {
      var brick = this.props.dataStorage.model("Bricks").find({id: activeBrickId}, this.props.treeName);
      var animation = brick.animation;
      console.info(animation)
      if (animation) {
        animationName = animation.name;
        animationDuration = animation.duration;
        animationDelay = animation.delay;
      }
    }

    return (
      <div className="animationSettings">
        <AnimationNameSettings
          animationName={animationName}
          handleAnimationSelected={this.handleAnimationSelected.bind(this)}
        />
        <AnimationDurationSettings
          animationDuration={animationDuration}
          handleAnimationDuration={this.handleAnimationSelected.bind(this)}
        />
        <AnimationDelaySettings
          animationDelay={animationDelay}
          handleAnimationDuration={this.handleAnimationSelected.bind(this)}
        />
      </div>
    )
  }
}

module.exports = AnimationSettings;
