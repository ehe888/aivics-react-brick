/**
 * settings/eventSettings
 */

"use strict"

require('./css/style.css')

class EventSettings extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    var self = this;
    var events = this.props.dataStorage.EventCollections.find();
    var contents = "";
    if (events && events.length > 0) {
      contents = events.map(function(event){
        var event = event.getValue();
        try {
          if (event.targetId == self.props.activeBrickId) {
            var transitionId = event.transitionId;
            var transition = self.props.dataStorage.TransitionCollections
                          .find({id: transitionId}, self.props.treeName).getValue()
            var toPageId = transition.toPageId,
                fromPageId = transition.fromPageId;
            var toPage = self.props.dataStorage.BrickCollections
                .find({id: toPageId}, self.props.treeName).getValue(),
                fromPage = self.props.dataStorage.BrickCollections
                  .find({id: fromPageId}, self.props.treeName).getValue();
            var title = "Transition " + fromPage.title + " => " + toPage.title
            return (
              <li id={event.id} key={event.id} className="list-group-item">{title}</li>
            )
          }else {
            return "";
          }

        } catch (e) {
          console.error(e);
          return "";
        }
      })
    }

    return (
      <div ref="EventSettingsPanel" className="aivics-page-event-panel">
        <h3>Event List</h3>
        <ul className="list-group">
          {contents}
        </ul>
      </div>
    )
  }
}

module.exports = EventSettings;
