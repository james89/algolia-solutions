import React from 'react'
import { Menu, Label } from 'semantic-ui-react'
import { helper } from '../../utils/Algolia.js';

const Cuisines = (props) => {


  let activeCuisine = props.activeCuisine;

  
  return (
    <Menu text vertical className="filter">
    <Menu.Item header>Cuisine/Food Type</Menu.Item>
      {/* <Menu.Item header>Cuisine/Food Type</Menu.Item>
        <Menu.Item name='foodtype1' active={activeItem === 'foodtype1'} onClick={props.handleFilterClick} />
        <Menu.Item name='foodtype2' active={activeItem === 'foodtype2'} onClick={props.handleFilterClick} />
      <Menu.Item name='foodtype3' active={activeItem === 'foodtype3'} onClick={props.handleFilterClick} /> */}
      {
          props.data.facets && props.data.getFacetValues('food_type').map((cuisine, index) => {
            return (
              <Menu.Item name={cuisine.name} key={index} active={activeCuisine === cuisine.name } onClick={() => props.handleFilterClick(cuisine.name, 'food_type')} >
                <Label>{cuisine.count}</Label>
                {cuisine.name}
              </Menu.Item>
            ) 
          }) 
      }
      

    </Menu>
  )
}

export default Cuisines
