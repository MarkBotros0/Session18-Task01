import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import React from 'react';
import ShelfPage from './components/ShelfPage';
import SearchPage from './components/SearchPage';

class App extends React.Component {
  constructor() {
    super()
    this.state = { shelfPageActive: true }
    this.pageHandler.bind(this)
  }

  pageHandler(value) {
    this.setState({ shelfPageActive: value })
  }

  render() {
    return (
      <>
        {this.state.shelfPageActive ? <ShelfPage setView={(value) => this.pageHandler(value)} /> : <SearchPage setView={(value) => this.pageHandler(value)} />}
      </>
    );
  }
}

export default App;
