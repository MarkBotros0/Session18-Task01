import React, { Component } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';

export default class Card extends Component {
    render() {
        const book = this.props.book
        return (
            <div className='book col-2 justify-content-between d-flex flex-column'>
                <div>
                    <img className='img-fluid w-100 cover-image' src={`https://covers.openlibrary.org/b/ID/${book.cover_i}-M.jpg`} alt='book cover' />
                </div>
                <div>
                    <h1 className='book-title'>{book.title}</h1>
                    <h1 className='author-name'>{book.author_name}</h1>
                </div>

                <Dropdown className="my-dropdown-container rounded-0" onSelect={this.props.onchange}>
                    <Dropdown.Toggle className="my-dropdown-button" variant="success" id="dropdown-basic">
                    </Dropdown.Toggle>

                    <Dropdown.Menu >
                        <Dropdown.Item id="currentlyReading">Currently Reading</Dropdown.Item>
                        <Dropdown.Item id="wantToRead">Want to Read</Dropdown.Item>
                        <Dropdown.Item id="read">Read</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        )
    }
}
