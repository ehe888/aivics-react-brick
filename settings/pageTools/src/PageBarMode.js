/**
 * settings/base/PageBarMode.js
 */

"use strict"

import ReactDOM from 'react-dom'

class PageBarMode extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.jqueryMap = {
      $PageBarDropdownTitle: $(this.refs.PageBarDropdownTitle)
    }
  }

  handlePageBarClick(event, barMode) {
    var $item = $(event.target),
        title = $item.html();
    this.jqueryMap.$PageBarDropdownTitle.html(title)
    this.props.onPageBarModeChange(barMode)
  }

  render() {
    return (
      <div className="dropdown PageBarMode">
        <button ref="PageBarDropdown" className="btn btn-default dropdown-toggle" type="button" id="dropdownMenuBar" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
          <span ref="PageBarDropdownTitle">NavigationBar only</span>
          <span className="caret"></span>
        </button>
        <ul className="dropdown-menu"  aria-labelledby="dropdownMenuBar">
          <li><a href="#" onClick={(event)=>this.handlePageBarClick(event, 0)}>NavigationBar only</a></li>
          <li><a href="#" onClick={(event)=>this.handlePageBarClick(event, 1)}>NavigationBar and TabBar</a></li>
        </ul>
      </div>
    )
  }

}

module.exports = PageBarMode;
