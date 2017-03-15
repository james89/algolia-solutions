import React from 'react'
import { Rating, Checkbox } from 'semantic-ui-react'


const RatingFilter = React.createClass({
  
  toggleRating(val){
   this.props.handleRatingToggle(val)
  },

  render(){
    return (
    <div className="filter">
      <h4>Rating</h4>
      <div><Rating defaultRating={1} maxRating={5} disabled /><Checkbox value={'1'} onClick={() => this.toggleRating('1')} checked={this.props.ratingObj[this.props.value]} /></div>
      <div><Rating defaultRating={2} maxRating={5} disabled /><Checkbox value={'2'} onClick={() => this.toggleRating('2')} checked={this.props.ratingObj[this.props.value]} /></div>
      <div><Rating defaultRating={3} maxRating={5} disabled /><Checkbox value={'3'} onClick={() => this.toggleRating('3')} checked={this.props.ratingObj[this.props.value]} /></div>
      <div><Rating defaultRating={4} maxRating={5} disabled /><Checkbox value={'4'} onClick={() => this.toggleRating('4')} checked={this.props.ratingObj[this.props.value]} /></div>
      <div><Rating defaultRating={5} maxRating={5} disabled /><Checkbox value={'5'} onClick={() => this.toggleRating('5')} checked={this.props.ratingObj[this.props.value]} /></div>

    </div>
  )
  }
  
})
export default RatingFilter
