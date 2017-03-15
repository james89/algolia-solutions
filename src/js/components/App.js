import React from 'react';
import Search from './Search.js';
import { Container, Grid, Segment } from 'semantic-ui-react';
import Cuisines from './Sidebar/CuisineFilter.js'
import ResultsList from './Results.js'
import { helper } from '../utils/Algolia.js';
import update from 'immutability-helper';
import RatingFilter from './Sidebar/RatingFilter.js';
import PaymentFilter from './Sidebar/PaymentFilter.js';

let geoLoc = window.userLocation || null;

/*
Container component to handle state
*/


const App = React.createClass({

  getInitialState() {
    return {
      searchTerm: '',
      results: [],
      data: [],
      foodTypes: [],
      page: null,
      activeCuisine: null,
      activePaymentItem: null,
      ratings: {'1': false, '2': false, '3': false, '4': false, '5': false}
    }
  },

  handleSearch(event){
    let query = event.target.value;
    // clear any refinements that may be active, and reset the hitsPerPage back to default
    helper.clearRefinements().setQueryParameter('hitsPerPage', 3).setQuery(query).search();

  },

  handleShowMore(){
    let totalHits = this.state.data.hitsPerPage;
    helper.setQueryParameter('hitsPerPage', totalHits + 3).search()
  },

  handleFilterClick(val, facet){
    //handle active style for food facets
    if(facet === 'food_type'){
      var isCuisineActive = this.state.activeCuisine === val ? null : val;
      this.setState({activeCuisine: isCuisineActive})
    } else {
      this.setState({activeCuisine: null})
    }

    //always toggle the facet regardless of type
    helper.setQueryParameter('hitsPerPage', 3).toggleFacetRefinement(facet, val).search()
    
  },

  handleRatingToggle(key){
    console.log(key)
    var newVal = !this.state.ratings[key]
    var ratingNum = key;
    var oldKeyArr = Object.values(this.state.ratings);
    //if there are already active ratings, lets group them for a disjunctive numeric search (helper doesn't support OR for same facet numeric ranges)
    if(oldKeyArr.includes(true) && newVal === true){
      helper.clearRefinements('stars_count');
      var lowerBound = oldKeyArr.indexOf(true) + 1;
      helper.addNumericRefinement('stars_count', '>=', Math.min(lowerBound, Number(ratingNum)) );
      helper.addNumericRefinement('stars_count', '<', Math.max(lowerBound, Number(ratingNum)) );

    } else if (!oldKeyArr.includes(true) && newVal === true) {
      helper.clearRefinements('stars_count');

      helper.addNumericRefinement('stars_count', '>=', Number(ratingNum));
      helper.addNumericRefinement('stars_count', '<', Number(ratingNum) + 1);
    } else {
       helper.removeNumericRefinement('stars_count', '>=', Number(ratingNum));
       helper.removeNumericRefinement('stars_count', '<', Number(ratingNum) + 1);
            helper.clearRefinements('stars_count');

    }

    helper.search();

     this.setState((previousState) => update(previousState, {ratings: {[ratingNum]: {$set: newVal}} }));
    // this.setState((previousState) => update(previousState, {ratings: {[ratingNum]: {$set: newVal}} }), () =>{
    //   //create numeric filter for particular rating (if checked). 
      
    //   if(newVal === true){
        
    //     // if(Object.values(this.state.ratings).includes(true)){
          
    //     } else {
    //       helper.addNumericRefinement('stars_count', '>=', Number(ratingNum));
    //       helper.addNumericRefinement('stars_count', '<', Number(ratingNum) + 1);
    //     }
        
    //   } else {
    //     helper.removeNumericRefinement('stars_count', '>=', Number(ratingNum));
    //     helper.removeNumericRefinement('stars_count', '<', Number(ratingNum) + 1);
    //   }
    //   helper.search();
    //   console.log(helper.get)
    // });
  },

  handlePaymentClick(val, facet){
      //handle payment options
      // var isPaymentActive = helper.hasRefinements('payment_options');
      // this.setState({activePaymentItem: isPaymentActive ? null : val})
      if(facet === 'payment_options'){

        var isPaymentActive = this.state.activePaymentItem === val ? null : val;
        this.setState({activePaymentItem: isPaymentActive})
      } else {
        this.setState({activePaymentItem: null})
      }
      
      helper.setQueryParameter('hitsPerPage', 3).toggleFacetRefinement(facet, val).search()
  },

  componentDidMount(){
    if(geoLoc){

          let geoLatLong = geoLoc.coords.lat.toString() + ',' + geoLoc.coords.long.toString();
          helper.setQueryParameter('aroundLatLng', geoLatLong).search();

    } else {
      helper.setQueryParameter('aroundLatLngViaIP', true).search();

    }

    // initial search on page load, set page number for later use
    helper.on('result', (data) => {
      console.log('data', data)
      this.setState({
        page: 1,
        results: data.hits,
        resultCt: data.nbHits,
        processingTime: data.processingTimeMS,
        data: data
      })
    });


  },

  render(){

    let currentHitsPerPage = helper.getQueryParameter('hitsPerPage');

    return (
      <Container>

        <Search handleSearch={this.handleSearch} />
        <Grid divided className={ currentHitsPerPage === 3 ? 'hide-overflow' : 'show-overflow'}>
          <Grid.Column width={4} only='computer' className="filter-bar">
            <Cuisines handleFilterClick={this.handleFilterClick} activeCuisine={this.state.activeCuisine} data={this.state.data} />
            <RatingFilter ratingObj={this.state.ratings} handleRatingToggle={this.handleRatingToggle} data={this.state.data}/>
            <PaymentFilter handlePaymentClick={this.handlePaymentClick} activePaymentItem={this.state.activePaymentItem} data={this.state.data}/>
          </Grid.Column>
          <Grid.Column computer={12} tablet={12} mobile={16}>
            <ResultsList
              count={this.state.resultCt}
              time={this.state.processingTime}
              handleShowMore={this.handleShowMore}
              results={this.state.results}
              data={this.state.data}
              />
          </Grid.Column>
        </Grid>
      </Container>
    )
  }
})

export default App;
