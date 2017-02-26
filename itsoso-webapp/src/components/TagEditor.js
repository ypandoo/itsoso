import React, { Component } from 'react'
var $ = require('jquery');

class TagEditor extends Component {
  constructor(props){
    super(props);
    this.state={
      tagId:props.tagId
    }
  }

  componentDidMount(){
    $('#'+this.state.tagId).tagEditor({
        delimiter: ', ', /* space and comma */
        placeholder: '请输入标签',
        removeDuplicates: false
    });
  }

  render () {
    return (
            <input type="text" id={this.state.tagId}></input>
    )
  }
}

export default TagEditor