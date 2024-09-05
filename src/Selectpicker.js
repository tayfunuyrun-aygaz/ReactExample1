import React, { Component } from "react";


class Selectpicker extends Component {

    constructor(props) {
        super(props);
        this.state = { selectedValue: '' };
    }

    OnchangeSelect = event => {
        var dataid = { id: event.target.getAttribute('data-id') }

        const value = event.target.value;
        this.setState({ selectedValue: dataid });
console.log('select',value)
        if (this.props.onChange) {
            this.props.onChange({
              id:  dataid.id,
                value
            });
        }

        // BooksApi.update(id,event.target.value).then((alldata)=>{

        //     console.log(alldata)

        //     this.setState(()=>({
        //         Data:alldata      
        //       }))   
        //   })
    }
    render() {

        const { id, option } = this.props;
        const selectdata = [{ key: "currentlyReading", value: "currently Reading" }, { key: "wantToRead", value: "want To Read" }, { key: "read", value: "read" }, { key: "none", value: "none" }]
        return (
            <div>
                <select onChange={this.OnchangeSelect} data-id={id}>
                    {selectdata.map((e) => (<option id={e.key} selected={option === e.key} value={e.key}>{e.value} </option>))}
                    
                </select>
            </div>
        )
    }
}

export default Selectpicker