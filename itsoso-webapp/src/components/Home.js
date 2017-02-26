import React, { Component } from 'react'
import styles from '../styles/App.css';
import QuestionAsk from './QuestionAsk';

class Home extends Component {
  render () {
    return (
      <div className={styles.pageContainer}>
        Home
        <QuestionAsk></QuestionAsk>
      </div>
    )
  }
}

export default Home