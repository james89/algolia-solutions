import React from 'react';
import { Input } from 'semantic-ui-react';

const Search = React.createClass({
  render(){
    return (
      <div className='search-bar'>
        <Input onChange={this.props.handleSearch} fluid icon='search' placeholder='Search for Restaurants by Name, Cuisine, Location' />
      </div>
    )
  }
})

export default Search;
