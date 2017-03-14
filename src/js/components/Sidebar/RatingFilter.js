import React from 'react'
import { Rating } from 'semantic-ui-react'


const RatingFilter = (props) => {


  return (
    <div className="filter">
      <h4> Rating</h4>
      <div><Rating defaultRating={1} maxRating={5} disabled /></div>
      <div><Rating defaultRating={2} maxRating={5} disabled /></div>
      <div><Rating defaultRating={3} maxRating={5} disabled /></div>
      <div><Rating defaultRating={4} maxRating={5} disabled /></div>
      <div><Rating defaultRating={5} maxRating={5} disabled /></div>

    </div>
  )
}
export default RatingFilter
