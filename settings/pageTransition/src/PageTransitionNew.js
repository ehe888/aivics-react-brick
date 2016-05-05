"use strict"

class PageTransitionTo extends React.Component {
  constructor(props){
    super(props);

    this.onToPageClick = this.onToPageClick.bind(this)
  }

  componentDidUpdate(prevProps, prevState){
  }

  onToPageClick(e){
    var toPage = $(e.target).html();
    var dropdownTitle = $(".pageTransitionTo").find($(".title"));
    dropdownTitle.html(toPage)
  }

  render() {

    var self = this;
    var model = this.props.dataStorage.model("Bricks");
    var activeBrickId = this.props.activeBrickId;
    var contents = model.find().map(function(brick, i){
      if (brick.id == activeBrickId) {
        return;
      }
      return (
        <li id={brick.id} key={brick.id}><a href="#" onClick={self.onToPageClick}> {brick.title}</a></li>
      )
    })

    return (
      <div className="btn-group pageTransitionTo">
        <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <span className="title">To Which Page?</span>
          <span className="caret"></span>
        </button>
        <ul className="dropdown-menu">
          {contents}
        </ul>
      </div>
    )
  }
}


class PageTransitionNew extends React.Component {

  constructor(props){
    super(props);
  }

  componentDidUpdate(prevProps, prevState){
  }

  render() {
    var model = this.props.dataStorage.model("Bricks")
    var activeBrick = model.find({id: this.props.activeBrickId})

    return (
      <div className="pageTransitionNew">
        <div>Add New Transition</div>
        <div className="input-group">
          <span className="input-group-addon" id="from-addon1">from</span>
          <input type="text" className="form-control" value={activeBrick.title} placeholder="from" disabled="disabled" aria-describedby="from-addon1" />
        </div>
        <PageTransitionTo
          activeBrickId = {this.props.activeBrickId}
          dataStorage = {this.props.dataStorage}
        />
        <button className="btn btn-primary">新建</button>
      </div>
    )
  }

}

module.exports = PageTransitionNew;
