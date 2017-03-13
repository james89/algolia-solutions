import React from 'react'
import { Menu } from 'semantic-ui-react'
import { helper } from '../../utils/Algolia.js';

const Cuisines = (props) => {


  let activeItem = null;


  return (
    <Menu text vertical>
      <Menu.Item header>Cuisine/Food Type</Menu.Item>
      <Menu.Item name='foodtype1' active={activeItem === 'foodtype1'} onClick={props.handleFilterClick} />
      <Menu.Item name='foodtype2' active={activeItem === 'foodtype2'} onClick={props.handleFilterClick} />
      <Menu.Item name='foodtype3' active={activeItem === 'foodtype3'} onClick={props.handleFilterClick} />
      {/* { props.renderFacets('food_type').map((cuisine, index) => {
        return (
          <Menu.Item name={cuisine} active={activeItem === cuisine} onClick={props.handleFilterClick} />
        )
      }) } */}
    </Menu>
  )
}
export default Cuisines
