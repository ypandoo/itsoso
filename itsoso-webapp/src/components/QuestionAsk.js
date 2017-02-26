import React, { Component } from 'react'
import TagEditor from './TagEditor'

class QuestionAsk extends Component {
  render () {
    return (
      <div className="container">

        <div className="row">
          <div className="col-md-12">
            <input type="text" placeholder="请输入您的问题"></input>
          </div>
        </div>
        
        <div className="row">
            <div className="col-md-12">
              <TagEditor tagId="tagQuestionAsk"></TagEditor>
            </div>
        </div>
        
      </div>
    )
  }
}

export default QuestionAsk