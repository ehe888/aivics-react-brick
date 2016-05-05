"use strict"

class PageTransitionList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps, prevState){
  }

  render() {
    var transitions = this.props.dataStorage.model("Transitions").find();
    var pageModels = this.props.dataStorage.model("Pages");
    var activeBrickId = this.props.activeBrickId;
    var activePage = pageModels.find({id: activeBrickId});
    var lists = "";
    if (transitions) {
      lists = transitions.map(function(transition){
        if (transition.fromPageId == activeBrickId) {
          var toPageId = transition.toPageId,
              toPage = pageModels.find({id: toPageId});
          return (
            <li className="list-group-item" id={transition.id} key={transition.id}>
              {activePage.title+" -> " +toPage.title}
            </li>
          )
        }else if (transition.toPageId == activeBrickId) {
          var fromPageId = transition.fromPageId,
              fromPage = pageModels.find({id: fromPageId});
          return (
            <li className="list-group-item" id={transition.id} key={transition.id}>
              {activePage.title+" <- " +fromPage.title}
            </li>
          )
        }
      })
    }

    return (
      <div className="pageTransitionList">
        <ul className="list-group">
          {lists}
        </ul>
      </div>
    )
  }
}

module.exports = PageTransitionList;
