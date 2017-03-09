import AlgoliaSearch from 'algoliasearch';
import AlgoliaSearchHelper from 'algoliasearch-helper';

/*
config
*/
const API_KEY = 'a7ce9b2cfe389e073605d61c2ae49973';
const APP_ID = 'CUAF7PQEXB';
const indexDb = 'Restaurants';
const client = AlgoliaSearch(APP_ID, API_KEY);



/*
helper and utility methods
*/
export const helper = AlgoliaSearchHelper(client, indexDb, {
  hitsPerPage: 3,
  facets: ['food_type', 'stars_count', 'payment_options']
});





console.log('client', client);
console.log('helper', helper);
