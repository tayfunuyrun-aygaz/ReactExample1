import React from 'react'

import './App.css'
import Category from './Category'



import * as BooksApi from './BooksAPI'
import { Link, Route } from 'react-router-dom'


class BooksApp extends React.Component {
  state = {
    SearchData: [],
    Data: [],
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }
  componentDidMount() {
    BooksApi.getAll().then((alldata) => {
      this.setState(() => ({
        Data: alldata
      }))
      console.log(this.state.Data)
    })
  }

  OnchangeSelect(data) {

console.log('tetik select',data)
    BooksApi.update(data, data.value).then((alldata) => {

    

      BooksApi.getAll().then((alldata) => {
        this.setState(() => ({
          Data: alldata
        }))
        console.log(this.state.Data)
      })
    })
  }
  InputSearch = event => {

if(event.target.value.length===0){
this.setState({
  SearchData:[]
})
}else{
  console.log('value',event.target.value)
   BooksApi.search(event.target.value).then((alldata) => {
    console.log('ilk',alldata)
    if(alldata.length>0)     
    this.setState({
      SearchData: alldata
    })
    else
    this.setState({
      SearchData: []
    })
    console.log('adata',this.state.SearchData)
    console.log('all',alldata)
   })
}
   

  }


  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (

          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Category Data={this.state.Data.filter(f => f.shelf === 'currentlyReading')} onChange={data => this.OnchangeSelect(data)} Title='Currently Reading' />
                <Category Data={this.state.Data.filter(f => f.shelf === 'wantToRead')} onChange={data => this.OnchangeSelect(data)} Title='Want to Read' />
                <Category Data={this.state.Data.filter(f => f.shelf === 'read')} onChange={data => this.OnchangeSelect(data)} Title='Read' />

              </div>
            </div>
            <div className="open-search">
              <Link  to='/search'>Add a book</Link>
            </div>
          </div>

        )} />

        <Route   path='/search' render={() => (

          <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to='/' onClick= {()=>this.setState({SearchData:[]})}>Close</Link>
              <div className="search-books-input-wrapper">
     
                <input type="text" onChange={this.InputSearch} placeholder="Search by title or author" />
                <Category Data={this.state.SearchData} onChange={data => this.OnchangeSelect(data)} Title='Search' />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>

            </div>
          </div>


        )} />
    
      </div>
    )
  }
}

export default BooksApp
