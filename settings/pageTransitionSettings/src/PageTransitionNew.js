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
    var toPaeId = $(e.target).parent().attr("id");
    this.props.onToPageClick(toPaeId)
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
        <li id={brick.id} key={brick.id}><a id={brick.id} href="#" onClick={self.onToPageClick}> {brick.title}</a></li>
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

    this.selectedToPage = "";

    this.onToPageClick = this.onToPageClick.bind(this)
  }

  componentDidUpdate(prevProps, prevState){
  }

  onToPageClick(toPageId) {
    this.selectedToPage = toPageId;
  }

  onNewTransitionSubmit(event) {
    if (this.selectedToPage.length > 0){
      var remark = $(".transition-remark").val();
      this.props.onNewTransitionSubmit(this.props.activeBrickId, this.selectedToPage, remark)
      $(".transition-remark").val("");

    }
  }

  render() {
    var model = this.props.dataStorage.model("Bricks")
    var activeBrick = model.find({id: this.props.activeBrickId})
    var title = activeBrick?activeBrick.title: "";

    return (
      <div className="pageTransitionNew">
        <div>Add New Transition</div>
        <div className="input-group">
          <span className="input-group-addon" id="from-addon1">from</span>
          <input type="text" className="form-control" value={title} placeholder="from" disabled="disabled" aria-describedby="from-addon1" />
        </div>
        <PageTransitionTo
          activeBrickId = {this.props.activeBrickId}
          dataStorage = {this.props.dataStorage}
          onToPageClick = {this.onToPageClick}
        />
        <div className="input-group">
          <span className="input-group-addon" id="from-addon2">remark</span>
          <input type="text" className="form-control transition-remark" placeholder="remark" aria-describedby="from-addon2" />
        </div>
        <button className="btn btn-primary"
                onClick={(event)=>this.onNewTransitionSubmit(event)}>新建</button>
      </div>
    )
  }

}

module.exports = PageTransitionNew;
