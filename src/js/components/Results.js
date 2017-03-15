import React from 'react';
import { Image, List, Rating, Button, Divider, Header } from 'semantic-ui-react';

const Restaurant = (props) => {

  let rating = Math.round(props.stars_count);

  return (
    <List.Item className="restaurant-item">
      <Image src={props.image} height={80} width={80} verticalAlign='middle' shape='rounded'/>
      <List.Content verticalAlign="middle">
        <List.Header>{props.name}</List.Header>
        <span className="restaurant-score">{Math.round(props.stars_count)}</span> <Rating defaultRating={Math.round(props.stars_count)} maxRating={5} disabled /> <span>({props.reviews_count} reviews)</span>
        <List.Description>{props.food_type} | {props.neighborhood} | {props.price_range}</List.Description>
      </List.Content>
    </List.Item>
  )
}

const ResultsList = (props) => {

  return (

    <List className="restaurant-list">

      <Divider />
      <div className="results-info"><span className="results-count">{props.count} results found</span> in {props.time / 1000} seconds</div>
      { props.results.map((result, i) => (

        <Restaurant  {...result} key={i} image={result.image_url} />
      )) }

     { props.data.nbHits > 3 ? (
       <Button basic color='grey' onClick={props.handleShowMore}>Show More</Button>
      ) : null}
      

    </List>
  )

}
export default ResultsList
