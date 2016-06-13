"use strict"

class PageTransitionList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps, prevState){
  }

  openCloseList(event) {
    event.stopPropagation()
    var list = $(event.target).parent();
    if (list.hasClass('li-active')) {
      list.removeClass('li-active');
      list.find($("button")).hide();
    }else{
      list.addClass('li-active');
      list.find($("button")).show();
    }
  }

  onTransitionDeleteClick(event) {
    event.stopPropagation()
    var list = $(event.target).parent(),
        transitionId = list.attr('id');

    this.props.onTransitionDeleteClick(transitionId);
  }

  render() {
    var self = this;
    var transitions = this.props.dataStorage.TransitionCollections.find();
    var pageModels = this.props.dataStorage.BrickCollections;
    var activeBrickId = this.props.activeBrickId;
    var activePage = pageModels.find({id: activeBrickId}).getValue();
    var lists = "";
    if (transitions) {
      lists = transitions.map(function(transition){
        var transition = transition.getValue();
        if (transition.fromPageId == activeBrickId) {
          var toPageId = transition.toPageId,
              toPage = pageModels.find({id: toPageId});
          return (
            <li className="list-group-item" id={transition.id} key={transition.id}>
              <div onClick={(event)=>self.openCloseList(event)}>{activePage.title+" -> " +toPage.title}</div>
              <button type="button" className="btn btn-danger btn-block transitionDelete"
                onClick={(event)=>self.onTransitionDeleteClick(event)}>删除</button>
            </li>
          )
        }else if (transition.toPageId == activeBrickId) {
          var fromPageId = transition.fromPageId,
              fromPage = pageModels.find({id: fromPageId}).getValue();
          return (
            <li className="list-group-item" id={transition.id} key={transition.id}
                onClick={(event)=>self.openCloseList(event)}
            >
              <div onClick={(event)=>self.openCloseList(event)}>{activePage.title+" <- " +fromPage.title}</div>
              <button type="button" className="btn btn-danger btn-block transitionDelete"
                onClick={(event)=>self.onTransitionDeleteClick(event)}>删除</button>
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
