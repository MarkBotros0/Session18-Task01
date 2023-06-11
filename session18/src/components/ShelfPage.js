import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Card from './Card'

export default class ShelfPage extends Component {
  constructor() {
    super()
    this.state = {
      currentlyReading: JSON.parse(localStorage.getItem("currentlyReading")),
      wantToRead: JSON.parse(localStorage.getItem("wantToRead")),
      read: JSON.parse(localStorage.getItem("read"))
    }
    this.handleClick.bind(this)
  }

  handleClick(e, book) {
    const destination = e.target.id
    const current = e.target.parentNode.parentNode.parentNode.parentNode.id

    if (current !== destination) {
      const modifiedArrayCurr = this.state[current].filter(element => element.key !== book.key)
      const modifiedArrayDest = Array.isArray(this.state[destination]) ? [...this.state[destination], book] : [book]

      localStorage.setItem(current, JSON.stringify(modifiedArrayCurr))
      localStorage.setItem(destination, JSON.stringify(modifiedArrayDest))

      this.setState({ ...this.state, [current]: modifiedArrayCurr, [destination]: modifiedArrayDest })
    }
  }

  render() {
    const shelfs = [
      { key: "currentlyReading", title: "Currently Reading", books: this.state.currentlyReading },
      { key: "wantToRead", title: "Want To Read", books: this.state.wantToRead },
      { key: "read", title: "Read", books: this.state.read },
    ]

    return (
      <>
        <FontAwesomeIcon className='add-btn' onClick={() => { this.props.setView(false) }} icon={faPlus} />
        <div className='myReads-container text-center'>
          <h1 className='myReads-title'> MyReads</h1>
        </div>
        {shelfs.map((shelf) => {
          return (
            <div className='section' key={shelf.key}>
              <h2 className='shelf-title'>{shelf.title}</h2>
              <div className='container-fluid p-5'>
                <div className="row justify-content-center g-5" id={shelf.key}>
                  {shelf.books?.map(book => {
                    return (
                      <Card key={book.key} book={book} onchange={(i, e) => this.handleClick(e, book)} />
                    )
                  })}
                </div>
              </div>
            </div>
          )
        })}
      </>
    )
  }
}
