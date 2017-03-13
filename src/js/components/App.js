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
      page: null
    }
  },

  handleSearch(event){
    let query = event.target.value;
    helper.setQuery(query).search();

  },

  handleShowMore(){
    let page = this.state.page;
    let results = this.state.results;

    console.log('page', page)

    helper.setPage(page).search();
    helper.on('result', (data) => {
      this.setState({
        page: data.page + 1,
        results: update(results, {$push: data.hits}),
        resultCt: data.nbHits,
        processingTime: data.processingTimeMS,
        data: data
      })
    })




  },

  renderFacets(type){
    this.state.results.getFacetValues(type, {sortBy: ['count:desc', 'selected']})
  },

  componentDidMount(){
    if(geoLoc){

          let geoLatLong = geoLoc.coords.lat.toString() + ',' + geoLoc.coords.long.toString();
          helper.setQueryParameter('aroundLatLng', geoLatLong).search();

    } else {
      helper.setQuery('').search();

    }

    var that = this;
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

      console.log(this.state.data.getFacetValues('food_type'))
    });


  },

  render(){

    return (
      <Container>

        <Search handleSearch={this.handleSearch} />
        <Grid divided>
          <Grid.Column width={5} only='computer'>
            <Cuisines renderFacets={this.renderFacets} />
            <RatingFilter />
            <PaymentFilter />
          </Grid.Column>
          <Grid.Column computer={11} tablet={11} mobile={16}>
            <ResultsList
              count={this.state.resultCt}
              time={this.state.processingTime}
              handleShowMore={this.handleShowMore}
              results={this.state.results}
              />
          </Grid.Column>
        </Grid>
      </Container>
    )
  }
})

export default App;
