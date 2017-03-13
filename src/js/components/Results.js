import React from 'react';
import { Image, List, Rating, Button, Divider, Header } from 'semantic-ui-react';

const Restaurant = (props) => {

  let rating = Math.round(props.stars_count);

  return (
    <List.Item className="restaurant-item">
      {/* { console.log(props) }
      */}
      <Image src={props.image} height={80} width={80} verticalAlign='middle' shape='rounded'/>
      <List.Content verticalAlign="middle">
        <List.Header>{props.name}</List.Header>
        <span className="restaurant-score">{props.stars_count}</span> <Rating defaultRating={rating} maxRating={5} disabled /> <span>({props.reviews_count} reviews)</span>
        <List.Description>{props.food_type} | {props.neighborhood} | {props.price_range}</List.Description>
      </List.Content>
    </List.Item>
  )
}

const ResultsList = (props) => {

  return (

    <List className="restaurant-list">

      <Divider />
      <div className="results-info"><span className="results-count">{props.count} results found</span> in .00{props.time} seconds</div>
      { props.results.map((result, i) => (

        <Restaurant  {...result} key={i} image={result.image_url} />
      )) }

      <Button basic color='grey'
        onClick={props.handleShowMore}
      >Show More</Button>

    </List>
  )

}
export default ResultsList
