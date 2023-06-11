import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { DebounceInput } from 'react-debounce-input'
import Card from './Card';

export default class SearchPage extends Component {
    constructor() {
        super()
        this.state = { data: [] }
        this.updateSearchQuery.bind(this)
    }

    async fetchData(endpoint) {
        try {
            const response = await fetch(`http://openlibrary.org/search.json?q=${endpoint.replace(/\s/g, '-')}`)
            const jsonData = await response.json()
            this.setState({ data: jsonData.docs })
            console.log(`Success: http://openlibrary.org/search.json?q=${endpoint.replace(/\s/g, '-')}`)
        } catch (error) {
            console.log(error)
        }
    }
    updateSearchQuery(e) {
        this.fetchData(e.target.value)
    }

    componentDidMount() {
        this.fetchData("hello")
    }

    handleClick(e, book) {
        const shelfsStored = ["currentlyReading", "wantToRead", "read"]

        for (let i = 0; i < shelfsStored.length; i++) {
            const shelf = JSON.parse(localStorage.getItem(shelfsStored[i]))
            if (shelf) {
                for (var j = 0; j < shelf.length; j++) {
                    if (shelf[j].key === book.key) {
                        shelf.splice(j, 1);
                        localStorage.setItem(shelfsStored[i], JSON.stringify(shelf))
                    }
                }
            }
        }

        const booksStored = JSON.parse(localStorage.getItem(e.target.id))
        Array.isArray(booksStored) ? localStorage.setItem(e.target.id, JSON.stringify([...booksStored, book])) : localStorage.setItem(e.target.id, JSON.stringify([book]))
    }


    render() {
        return (
            <>
                <div className="input-group mb-3 shadow align-items-center px-3">
                    <FontAwesomeIcon className='back-btn' icon={faArrowLeft} onClick={() => { this.props.setView(true) }} />
                    <DebounceInput minLength={3} debounceTimeout={500} type="text" onChange={(e) => this.updateSearchQuery(e)} className="form-control my-input px-4 shadow-none border-0" placeholder="Search by title or author" />
                </div>
                <div className='container-fluid p-5'>
                    <div className="row justify-content-center g-5">
                        {this.state.data.map(book => {
                            return book.cover_i ? <Card key={book.key} book={book} onchange={(i, e) => this.handleClick(e, book)} /> : null
                        })}
                    </div>
                </div>
            </>
        )
    }
}
