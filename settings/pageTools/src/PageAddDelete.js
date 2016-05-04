"use strict"

import React from "react"

class PageAddDelete extends React.Component {
  constructor(props) {
    super(props);

    this.refName = "PageAddDelete"
    this.getDOMElement = function(){
      return this.refs[this.refName];
    };
  }

  componentDidMount(){

  }

  componentDidUpdate(prevProps, prevState){

  }

  addPageEvent(event){
    this.props.onPageAdd();
  }

  deletePageEvent(event){
    this.props.onPageDelete();
  }

  render() {

    return (
      <div className="btn-group" role="group">
        <button type="button"
                className="btn btn-default"
                onClick={(event)=>this.addPageEvent(event)}>ADD</button>
        <button type="button"
                className="btn btn-default"
                onClick={(event)=>this.deletePageEvent(event)}>DELETE</button>
      </div>
    );
  }
}

module.exports = PageAddDelete;
