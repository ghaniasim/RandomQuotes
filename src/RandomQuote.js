import React, { Component } from 'react';
import axios from 'axios';
import './RandomQuote.css';

class RandomQuote extends Component {
  constructor (props) {
    super(props)

    this.state = {
      quote: '',
      author: ''
    }
  }

  componentDidMount () {
    this.getQuote()
  }

  getQuote () {
    let url = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'

    axios.get(url)
      .then(res => {
        let data = res.data.quotes
        let quoteNum = Math.floor(Math.random() * data.length)
        let randomQuote = data[quoteNum]

        this.setState({
          quote: randomQuote['quote'],
          author: randomQuote['author']
        })
      })
  }

  getNewQuote = () => {
    this.getQuote()
  }

  render () {
    const { quote, author } = this.state
    return (
      <div id='wrapper'>
            <h1 className='title'>Random Quote App</h1>

            <div id='quote-box'>
               <QuoteBox quote={quote} author={author} />

               <div id='buttons'>
                  <TwitterShare quote={quote} author={author} />
                  <Button id='new-quote' title='New Quote' onClick={this.getNewQuote} />
               </div>
            </div>
         </div>
    )
  }
}

const QuoteBox = ({ quote, author }) => { 
  return (
     <React.Fragment>
        <div id='text'><p>{quote}</p></div>
        <div id='author'><h5>{author}</h5></div>
     </React.Fragment>
  )
}

const Button = ({ onClick, title }) => {
  return (
     <button className='button' id='new-quote' onClick={onClick}>{title}</button>
  )
}

const TwitterShare = ({ quote, author }) => {
  return (
     <React.Fragment>
        <a href={`https://twitter.com/intent/tweet?text= ${quote} ${author}`} 
            target="_blank" title="Post this quote on twitter!" 
            id='tweet-quote'>
           <i className="fab fa-twitter twitter-icon" />
        </a>
     </React.Fragment>
  )
}

export default RandomQuote;
