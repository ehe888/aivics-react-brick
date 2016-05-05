"use strict"

class PageTransitionList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps, prevState){
  }

  render() {
    var model = this.props.dataStorage.model("Pages");

    return (
      <div className="pageTransitionList">
        <ul className="list-group">
          <li className="list-group-item">Cras justo odio</li>
          <li className="list-group-item">Dapibus ac facilisis in</li>
        </ul>
      </div>
    )
  }
}

module.exports = PageTransitionList;
