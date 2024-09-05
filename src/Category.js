import React,{Component} from "react";

import Selectpicker from './Selectpicker'

class Currently extends Component{
  constructor(props){
    super(props);
      this.state ={
        Currently:''
      } 
  }
render(){
    const data=this.props;
    return(
        <div className="bookshelf">
        <h2 className="bookshelf-title">{data.Title} </h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
          
          {data.Data ? data.Data.map((e)=>( 
                <li>
                <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${e.imageLinks.smallThumbnail})` }}></div>
                    <div className="book-shelf-changer">
                    <Selectpicker id={e.id} onChange={data=>{
console.log('data:',data)     
if (this.props.onChange) {
  this.props.onChange(data);
}
}                 
                  } option={e.shelf} />
                    </div>
                </div>
                <div className="book-title">{e.title}</div>
                <div className="book-authors">{e.authors}</div>
                </div>
            </li>
          )):<div></div>}  

          </ol>
        </div>
      </div>
    );
}

}

export default Currently;