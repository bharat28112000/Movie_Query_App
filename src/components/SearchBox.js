import React from "react"

const SearchBox = (props) => {

    const handleChange = (event) => {
        props.setSearchValue(event.target.value)
    }

    return (
        <div className="col col-sm-4">
            <input 
                className="form-control"
                value={props.searchValue}
                onChange={handleChange} 
                placeholder="Type to Search...">

            </input>
        </div>
    )
}

export default SearchBox;